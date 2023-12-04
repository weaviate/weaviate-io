---
title: Generative Search - Anyscale
sidebar_position: 10
image: og/docs/modules/generative-aws.jpg
# tags: ['generative', 'transformers', 'aws']
---


## In short

:::info Added in `v1.23.0`
:::

* The Generative Anyscale (`generative-anyscale`) module performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.
* The module can generate a response for each object returned from Weaviate, or a combined response for a group of objects.
* The module enables generative search operations on the Weaviate instance.

### API Authentication

[Learn more here about how to get an API key for Anyscale inference endpoints.](https://docs.anyscale.com/endpoints/overview)

## Introduction

`generative-anyscale` performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.

The module works in two steps:
1. (Weaviate) Run a search query in Weaviate to find relevant objects.
2. (Anyscale Inference API) Use a Large Language Model to generate a response based on the results (from the previous step) and the provided prompt or task.

:::note
You can use the Generative Anyscale module with any other upstream modules. For example, you could use `text2vec-cohere`, `text2vec-huggingface` or `text2vec-openai` to vectorize and query your data, but then rely on the `generative-aws` module to generate a response.
:::

The generative module can perform RAG for:
* each returned object - `singlePrompt`
* the group of all results together – `groupedTask`

You need to input both a query and a prompt (for individual responses) or a task (for all responses).


## Weaviate instance configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file

To use `generative-anyscale`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `generative-anyscale` to enable the module.
- `ANYSCALE_APIKEY` Your Anyscale API key. You can also provide the key at query time.

#### Example

This configuration enables `generative-anyscale` and sets the AWS authentication credentials.

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 50051:50051
    volumes:
    - weaviate_data:/var/lib/weaviate
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      # Optional. assumes use with a vectorizer, in this case a text embedding model hosted with aws bedrock APIs.
      DEFAULT_VECTORIZER_MODULE: text2vec-aws
      AWS_ACCESS_KEY: sk-foobar  # Optional. Can be set at query time.
      AWS_SECRET_KEY: sk-foobar  # Optional. Can be set at query time.
      # highlight-start
      ANYSCALE_APIKEY: escecret-foobar # Optional. Can be set at query time.
      ENABLE_MODULES: 'text2vec-aws,generative-anyscale'
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
volumes:
  weaviate_data:
...
```


## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/configuration/schema-configuration.md).

### API settings

#### Parameters

| Parameter | Required | Default | Purpose |
| :- | :- | :- | :- |
| `model` | No | `"meta-llama/Llama-2-70b-chat-hf"` | The model to use. Defaults to Llama 70B.
| `temperature` | No | 0 | Control of LLM stochasticity. |

### Supported models

You can use any of the following models with `generative-anyscale`:

* `meta-llama/Llama-2-70b-chat-hf`
* `meta-llama/Llama-2-13b-chat-hf`
* `meta-llama/Llama-2-7b-chat-hf`
* `codellama/CodeLlama-34b-Instruct-hf`
* `HuggingFaceH4/zephyr-7b-beta`
* `mistralai/Mistral-7B-Instruct-v0.1`

#### Example

The following example configures the `Document` class to use the `generative-anyscale` module with the `Document` class, with the `meta-llama/Llama-2-70b-chat-hf` model.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      ...,
      "moduleConfig": {
        // highlight-start
        "generative-anyscale": {
          "model": "meta-llama/Llama-2-70b-chat-hf",
        },
        // highlight-end
      }
    }
  ]
}
```

<details>
  <summary>New to Weaviate Schemas?</summary>

If you are new to Weaviate, check out the [Weaviate schema tutorial](/developers/weaviate/tutorials/schema.md).

</details>


## How to use

### Query-time parameters

You can supply parameters at query time by adding it to the HTTP header.

| HTTP Header | Value | Purpose | Note |
| :- | :- | :- | :- |
| `"X-Anyscale-Api-Key"` | Your Anyscale API key. | Authentication | [Learn more](https://docs.anyscale.com/endpoints/overview)|

### Queries

This module extends the  `_additional {...}` property with a `generate` operator.

`generate` takes the following arguments:

| Field | Data Type | Required | Example | Description |
|- |- |- |- |- |
| `singleResult {prompt}`  | string | no | `Summarize the following in a tweet: {summary}`  | Generates a response for each individual search result. You need to include at least one result field in the prompt, between braces. |
| `groupedResult {task}`  | string | no | `Explain why these results are similar to each other`  | Generates a single response for all search results |

#### Example of properties in the prompt

When piping the results to the prompt, at least one field returned by the query must be added to the prompt. If you don't add any fields, Weaviate will throw an error.

For example, assume your schema looks like this:

```graphql
{
  Article {
    title
    summary
  }
}
```

You can add both `title` and `summary` to the prompt by enclosing them in curly brackets:

```graphql
{
  Get {
    Article {
      title
      summary
      _additional {
        generate(
          singleResult: {
            prompt: """
            Summarize the following in a tweet:

            {title} - {summary}
            """
          }
        ) {
          singleResult
          error
        }
      }
    }
  }
}
```

#### Example - single result

Here is an example of a query where:
* we run a vector search (with `nearText`) to find articles about "Italian food"
* then we ask the generator module to describe each result as a Facebook ad.
  * the query asks for the `summary` field, which it then includes in the `prompt` argument of the `generate` operator.

import AWSSingleResult from '/_includes/code/generative.aws.singleresult.mdx';

<AWSSingleResult/>

#### Example response - single result

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "Italian food, as we know it today, might be a relatively modern concept. But it's hard to deny that there's something special about it. It could be the way the pasta tastes or the way the sauce smells. It could be the way the cheese stretches or the way the bread soaks up the sauce. Whatever it is, Italian food has a way of capturing our hearts and our stomachs. So if you're looking for a way to spice up your meal routine, why not try Italian? You might just find that it's your new favorite cuisine."
            }
          },
          "summary": "Even the emoji for pasta isn't just pasta -- it's a steaming plate of spaghetti heaped with tomato sauce on top. But while today we think of tomatoes as inextricably linked to Italian food, that hasn't always been the case. \"People tend to think Italian food was always as it is now -- that Dante was eating pizza,\" says Dr Eva Del Soldato , associate professor of romance languages at the University of Pennsylvania, who leads courses on Italian food history. In fact, she says, Italy's complex history -- it wasn't unified until 1861 -- means that what we think of Italian food is, for the most part, a relatively modern concept. Diego Zancani, emeritus professor of medieval and modern languages at Oxford University and author of \"How We Fell in Love with Italian Food,\" agrees.",
          "title": "How this fruit became the star of Italian cooking"
        }
      ]
    }
  }
}
```

#### Example - grouped result

Here is an example of a query where:
* we run a vector search (with `nearText`) to find publications about finance,
* then we ask the generator module to explain why these articles are about finance.

import AWSGroupedResult from '/_includes/code/generative.aws.groupedresult.mdx';

<AWSGroupedResult />

#### Example response - grouped result

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "groupedResult": "These magazines or newspapers are about finance because they cover topics related to finance, such as business news, financial markets, and economic trends. They also often feature articles about personal finance, such as investing, budgeting, and retirement planning."
            }
          },
          "name": "Financial Times"
        },
        {
          "_additional": {
            "generate": null
          },
          "name": "Wall Street Journal"
        },
        {
          "_additional": {
            "generate": null
          },
          "name": "The New York Times Company"
        }
      ]
    }
  }
}
```


## Additional information

Weaviate 1.23 introduces the `generative-anyscale` module, bringing open-source LLM heavyweights such as the Llama 70B, 13B, and 7B series, as well as CodeLlama 34B and Mistral 7B. Stay tuned for further integrations with Anyscale's Fine-tuning APIs and adding custom model paths to Weaviate's Generative Search modules.

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
