---
title: Generative Search - Cohere
sidebar_position: 12
image: og/docs/modules/generative-cohere.jpg
# tags: ['generative', 'rag', 'cohere']
---


## In short

:::info Added in `v1.19.0`
:::

* The Generative Cohere (`generative-cohere`) module performs retrieval augmented generation, or RAG, using the data stored in your Weaviate instance.
* The module can generate a response for each object returned from Weaviate, or a combined response for a group of objects.
* The module enables generative search operations on the Weaviate instance.
* The default model is `command-xlarge-nightly`, which the Cohere team trains nightly and pushes updates.

## Introduction

`generative-cohere` performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.

The module works in two steps:
1. (Weaviate) Run a search query in Weaviate to find relevant objects.
2. (Cohere) Use a Cohere Large Language Model to generate a response based on the results (from the previous step) and the provided prompt or task.

:::note
You can use the Generative Cohere module with non-Cohere upstream modules. For example, you could use `text2vec-openai` or `text2vec-huggingface` to vectorize and query your data, but then rely on the `generative-cohere` module to generate a response.
:::

The generative module can provide results for:
* each returned object - `singlePrompt`
* the group of all results together – `groupedTask`

You need to input both a query and a prompt (for individual responses) or a task (for all responses).

## Cohere API key

`generative-cohere` requires an [Cohere API key](https://dashboard.cohere.com/welcome/login) to perform the generation task.

### Providing the key to Weaviate

You can provide your Cohere API key in two ways:

1. During the **configuration** of your Docker instance, by adding `COHERE_APIKEY` under `environment` to your `Docker Compose` file, like this:

  ```
  environment:
    COHERE_APIKEY: 'your-key-goes-here'
    ...
  ```

2. At **run-time** (recommended), by providing `"X-Cohere-Api-Key"` to the Weaviate client, like this:

import ClientKey from '/_includes/code/core.client.cohere.apikey.mdx';

<ClientKey />

## Module configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

:::caution
Your Weaviate instance must be on `1.19.0` or newer.

If your instance is older than `1.19.0` then you need to migrate or upgrade it to a newer version.
:::

### Docker Compose file (Weaviate open source only)

You can enable the Generative Cohere module in your Docker Compose file (e.g. `docker-compose.yml`). Add the `generative-cohere` module (alongside any other module you may need) to the `ENABLE_MODULES` property, like this:

```
ENABLE_MODULES: 'text2vec-cohere,generative-cohere'
```

Here is a full example of a Docker configuration, which uses the `generative-cohere` module in combination with `text2vec-cohere`:

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
    image:
      cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
      - 8080:8080
      - 50051:50051
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-cohere'
      // highlight-next-line
      ENABLE_MODULES: 'text2vec-cohere,generative-cohere'
      COHERE_APIKEY: sk-foobar # this parameter is optional, as you can also provide it through the client
      CLUSTER_HOSTNAME: 'node1'
```

## Schema configuration

In your Weaviate schema, you can define settings for this module.

[See this page](../../manage-data/collections.mdx#specify-a-generative-module) for code examples on how to specify a generative module.

For example, the following schema configuration will set Weaviate to use the `generative-cohere` module with the `Document` class, with the `command-xlarge-nightly` model. You can also configure additional parameters for the Cohere endpoint through the parameters shown below. Other models you can use from Cohere are `command-xlarge-beta` and `command-xlarge`.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      ...,
      "moduleConfig": {
        // highlight-start
        "generative-cohere": {
          "model": "command-xlarge-nightly",  // Optional - Defaults to `command-xlarge-nightly`. Can also use`command-xlarge-beta` and `command-xlarge`
          "temperatureProperty": <temperature>,  // Optional
          "maxTokensProperty": <maxTokens>,  // Optional
          "kProperty": <k>, // Optional
          "stopSequencesProperty": <stopSequences>, // Optional
          "returnLikelihoodsProperty": <returnLikelihoods>, // Optional
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

This module extends the  `_additional {...}` property with a `generate` operator.

`generate` takes the following arguments:

| Field | Data Type | Required | Example | Description |
|- |- |- |- |- |
| `singleResult {prompt}`  | string | no | `Summarize the following in a tweet: {summary}`  | Generates a response for each individual search result. You need to include at least one result field in the prompt, between braces. |
| `groupedResult {task}`  | string | no | `Explain why these results are similar to each other`  | Generates a single response for all search results |

### Example of properties in the prompt

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

### Example - single result

Here is an example of a query where:
* we run a vector search (with `nearText`) to find articles about "Italian food"
* then we ask the generator module to describe each result as a Facebook ad.
  * the query asks for the `summary` field, which it then includes in the `prompt` argument of the `generate` operator.

import CohereSingleResult from '/_includes/code/generative.cohere.singleresult.mdx';

<CohereSingleResult/>

### Example response - single result

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

### Example - grouped result

Here is an example of a query where:
* we run a vector search (with `nearText`) to find publications about finance,
* then we ask the generator module to explain why these articles are about finance.

import CohereGroupedResult from '/_includes/code/generative.cohere.groupedresult.mdx';

<CohereGroupedResult />

### Example response - grouped result

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

You can use any of

* [`command-xlarge-nightly`](https://docs.cohere.com/docs/command-beta)(default)
* `command-xlarge-beta`
* `command-xlarge`


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
