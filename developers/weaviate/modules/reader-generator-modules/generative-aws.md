---
title: Generative Search - AWS
sidebar_position: 11
image: og/docs/modules/generative-aws.jpg
# tags: ['generative', 'rag', 'aws']
---


## In short

:::info Added in `v1.22.5`
:::

* The Generative AWS (`generative-aws`) module performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.
* The module can generate a response for each object returned from Weaviate, or a combined response for a group of objects.
* The module enables generative search operations on the Weaviate instance.

### API Authentication

You must provide [access key based AWS credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to use the API, including an AWS access key and a corresponding AWS secret access key. You can [set them as environment variables](#parameters), or [provide them at query time](#query-time-parameters).

## Introduction

`generative-aws` performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.

The module works in two steps:
1. (Weaviate) Run a search query in Weaviate to find relevant objects.
2. (AWS Bedrock) Use a Large Language Model to generate a response based on the results (from the previous step) and the provided prompt or task.

:::note
You can use the Generative AWS module with any other upstream modules. For example, you could use `text2vec-cohere`, `text2vec-huggingface` or `text2vec-openai` to vectorize and query your data, but then rely on the `generative-aws` module to generate a response.
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

To use `generative-aws`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `generative-aws` to enable the module.
- `AWS_ACCESS_KEY` or `AWS_ACCESS_KEY_ID` (Optional): Your AWS access key. You can also provide the key at query time.
- `AWS_SECRET_KEY` or `AWS_SECRET_ACCESS_KEY` (Optional): Your AWS secret access key. You can also provide the key at query time.

#### Example

This configuration enables `generative-aws` and sets the AWS authentication credentials.

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
      DEFAULT_VECTORIZER_MODULE: text2vec-aws
      # highlight-start
      AWS_ACCESS_KEY: sk-foobar  # Optional. Can be set at query time.
      AWS_SECRET_KEY: sk-foobar  # Optional. Can be set at query time.
      ENABLE_MODULES: 'text2vec-aws,generative-aws'
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
volumes:
  weaviate_data:
...
```


## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

[See this page](../../manage-data/collections.mdx#specify-a-generative-module) for code examples on how to specify a generative module.

### API settings

#### Parameters

| Parameter | Required | Default | Purpose |
| :- | :- | :- | :- |
| `model` | No | NONE | The model to use. You must provide an available & supported model name. |
| `region` | Yes | NONE | AWS region name, e.g. `us-east-1`. |

#### Example

The following example configures the `Document` class to use the `generative-aws` module with the `Document` class, with the `command-xlarge-nightly` model and the AWS region to `us-east-1`.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      ...,
      "moduleConfig": {
        // highlight-start
        "generative-aws": {
          "model": "cohere.command-text-v14",  // REQUIRED
          "region": "us-east-1"                // REQUIRED
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

You can supply parameters at query time by adding it to the HTTP header.

| HTTP Header | Value | Purpose | Note |
| :- | :- | :- | :- |
| `"X-AWS-Access-Key"` | `"YOUR-AWS-API-ACCESS-KEY"` | Your AWS access key. | |
| `"X-AWS-Secret-Key"` | `"YOUR-AWS-API-SECRET-KEY"` | Your AWS secret access key | |

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

### Supported models

You can use any of the following models with `generative-aws`:

* cohere.command-text-v14
* cohere.command-light-text-v14


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
