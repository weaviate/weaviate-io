---
title: Generative Search - Mistral
sidebar_position: 16
image: og/docs/modules/generative-mistral.jpg
# tags: ['generative', 'rag', 'mistral']
---


## In short

:::info Added in `v1.24.2`
:::

* The Generative Mistral (`generative-mistral`) module performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.
* The module can generate a response for each object returned from Weaviate, or a combined response for a group of objects.
* The module enables generative search operations on the Weaviate instance.
* The default model is `open-mistral-7b`.
* The module requires an [API key for Mistral inference endpoints](https://docs.mistral.ai/) to perform the generation task.

## Introduction

`generative-mistral` performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.

The module works in two steps:
1. (Weaviate) Run a search query in Weaviate to find relevant objects.
2. (Mistral Inference API) Use a Large Language Model to generate a response based on the results (from the previous step) and the provided prompt or task.

:::note
You can use the Generative Mistral module with any other upstream modules. For example, you could use `text2vec-cohere`, `text2vec-huggingface` or `text2vec-openai` to vectorize and query your data, but then rely on the `generative-mistral` module to generate a response.
:::

The generative module can perform RAG for:
* each returned object - `singlePrompt`
* the group of all results together – `groupedTask`

You need to input both a query and a prompt (for individual responses) or a task (for all responses).


## Weaviate instance configuration

:::tip
This module is enabled and pre-configured in Weaviate Cloud Services. You cannot edit the configuration in WCS.
:::

### Docker Compose file

To use `generative-mistral`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `generative-mistral` to enable the module.
- `MISTRAL_APIKEY` Your Mistral API key. You can also provide the key at query time.

#### Example

This configuration enables `generative-mistral` and sets the Mistral authentication credentials.

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
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
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
      # highlight-start
      MISTRAL_APIKEY: escecret-foobar  # Optional. Can be set at query time.
      ENABLE_MODULES: 'text2vec-cohere,generative-mistral'  # Can include any modules
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
volumes:
  weaviate_data:
...
```


## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### API settings

#### Parameters

| Parameter | Required | Default | Purpose |
| :- | :- | :- | :- |
| `model` | No | `"open-mistral-7b"` | The model to use.
| `temperature` | No | `0` | Control of LLM stochasticity. |
| `maxTokens` | No | `2048` | Maximum number of tokens to generate. |

### Supported models

You can use any of the following models with `generative-mistral`:

* `open-mistral-7b` (aka `mistral-tiny-2312`)
* `open-mixtral-8x7b` (aka `mistral-small-2312`)
* `mistral-tiny`
* `mistral-small`
* `mistral-small-latest` (aka `mistral-small-2402`)
* `mistral-medium`
* `mistral-medium-latest` (aka `mistral-medium-2312`)
* `mistral-large`
* `mistral-large-latest` (aka `mistral-large-2402`)

#### Example

The following example configures the `Document` class to use the `generative-mistral` module with the `Document` class, with the `mistral-medium-latest` model.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      ...,
      "moduleConfig": {
        // highlight-start
        "generative-mistral": {
          "model": "mistral-medium-latest",
        },
        // highlight-end
      }
    }
  ]
}
```

<details>
  <summary>New to Weaviate Schemas?</summary>

If you are new to Weaviate, check out the [Weaviate schema tutorial](/developers/weaviate/starter-guides/schema.md).

</details>


## How to use

### Query-time parameters

You can supply parameters at query time by adding them to the HTTP header.

| HTTP Header | Value | Purpose | Note |
| :- | :- | :- | :- |
| `"X-Mistral-Api-Key"` | Your Mistral API key. | Authentication | [Learn more](https://docs.mistral.ai/platform/overview/)|

### Queries

This module enables generative search queries.

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
* we get a podcast clip (with limit 1)
* then we ask the generator module to summarize the content into one sentence.
  * the query asks for the `speaker` and `content` fields, which are then included in the `prompt` argument of the `generate` operator.

import MistralSingleResult from '/_includes/code/generative.mistral.singleresult.mdx';

<MistralSingleResult/>

#### Example - grouped result

Here is an example of a query where:
* we run a vector search (with `nearText`) to find podcast clips semantically similar to `"What is ref2vec?"`
* then we ask the generator module to answer the question: `"What is ref2vec?"` based on the search results.

import MistralGroupedResult from '/_includes/code/generative.mistral.groupedresult.mdx';

<MistralGroupedResult />

#### Further examples

For further usage examples, please see the [how-to search: generative](../../search/generative.md) page.



import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
