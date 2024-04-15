---
title: Generative Search - OpenAI
sidebar_position: 18
image: og/docs/modules/generative-openai.jpg
# tags: ['generative', 'rag', 'openai']
---


## In short

* The Generative OpenAI (`generative-openai`) module performs retrieval augmented generation, or RAG, using the data stored in your Weaviate instance.
* The module can generate a response for each returned object, or a single response for a group of objects.
* The module enables generative search operations on the Weaviate instance.
* Added in Weaviate `v1.17.3`.
* The default OpenAI model is `gpt-3.5-turbo`, but other [models](#supported-models-openai) (e.g. `gpt-4`) are supported.
* For Azure OpenAI, a model must be specified.

import OpenAIOrAzureOpenAI from '/_includes/openai.or.azure.openai.mdx';

<OpenAIOrAzureOpenAI/>

## Introduction

`generative-openai` performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.

The module works in two steps:
1. (Weaviate) Run a search query in Weaviate to find relevant objects.
2. (OpenAI) Use an OpenAI model to generate a response based on the results (from the previous step) and the provided prompt or task.

:::note
You can use the Generative OpenAI module with non-OpenAI upstream modules. For example, you could use `text2vec-cohere` or `text2vec-huggingface` to vectorize and query your data, but then rely on the `generative-openai` module to generate a response.
:::

The generative module can provide results for:
* each returned object - `singlePrompt`
* the group of all results together – `groupedTask`

You need to input both a query and a prompt (for individual responses) or a task (for all responses).

## Inference API key

`generative-openai` requires an API key from OpenAI or Azure OpenAI.

:::tip
You only need to provide one of the two keys, depending on which service (OpenAI or Azure OpenAI) you are using.
:::

### Providing the key to Weaviate

You can provide your API key in two ways:

1. During the **configuration** of your Docker instance, by adding `OPENAI_APIKEY` or `AZURE_APIKEY` as appropriate under `environment` to your `Docker Compose` file, like this:

  ```yaml
  environment:
    OPENAI_APIKEY: 'your-key-goes-here'  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
    AZURE_APIKEY: 'your-key-goes-here'  # For use with Azure OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
    ...
  ```

2. At **run-time** (recommended), by providing `"X-OpenAI-Api-Key"` or `"X-Azure-Api-Key"` through the request header. You can provide it using the Weaviate client, like this:

import ClientKey from '/_includes/code/core.client.openai.apikey.mdx';

<ClientKey />

## Organization name

:::info AAdded in `v1.21.1`
:::

For requests that require the OpenAI organization name, you can provide it at query time by adding it to the HTTP header:
- `"X-OpenAI-Organization": "YOUR-OPENAI-ORGANIZATION"` for OpenAI

## Module configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file (Weaviate open source only)

You can enable the Generative OpenAI module in your Docker Compose file (e.g. `docker-compose.yml`). Add the `generative-openai` module (alongside any other module you may need) to the `ENABLE_MODULES` property, like this:

```
ENABLE_MODULES: 'text2vec-openai,generative-openai'
```

Here is a full example of a Docker configuration, which uses the `generative-openai` module in combination with `text2vec-openai`:

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
      DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
      // highlight-next-line
      ENABLE_MODULES: 'text2vec-openai,generative-openai'
      OPENAI_APIKEY: sk-foobar  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      OPENAI_ORGANIZATION: your-orgname  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      AZURE_APIKEY: sk-foobar  # For use with Azure OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      CLUSTER_HOSTNAME: 'node1'
```

## Schema configuration

You can define settings for this module in the schema.

[See this page](../../manage-data/collections.mdx#specify-a-generative-module) for code examples on how to specify a generative module.

### OpenAI vs Azure OpenAI

- **OpenAI** users can optionally set the `model` parameter.
- **Azure OpenAI** users must set the parameters `resourceName` and `deploymentId`.

### Model parameters

You can also configure additional parameters for the generative model through the `xxxProperty` parameters shown below.

### Example schema

For example, the following schema configuration will set Weaviate to use the `generative-openai` model with the `Document` class.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      ...,
      "moduleConfig": {
        // highlight-start
        "generative-openai": {
          "model": "gpt-3.5-turbo",  // Optional - Defaults to `gpt-3.5-turbo`
          "resourceName": "<YOUR-RESOURCE-NAME>",  // For Azure OpenAI - Required
          "deploymentId": "<YOUR-MODEL-NAME>",  // For Azure OpenAI - Required
          "temperatureProperty": <temperature>,  // Optional, applicable to both OpenAI and Azure OpenAI
          "maxTokensProperty": <max_tokens>,  // Optional, applicable to both OpenAI and Azure OpenAI
          "frequencyPenaltyProperty": <frequency_penalty>,  // Optional, applicable to both OpenAI and Azure OpenAI
          "presencePenaltyProperty": <presence_penalty>,  // Optional, applicable to both OpenAI and Azure OpenAI
          "topPProperty": <top_p>,  // Optional, applicable to both OpenAI and Azure OpenAI
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

import OpenAISingleResult from '/_includes/code/generative.openai.singleresult.mdx';

<OpenAISingleResult/>

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
              "singleResult": "This Facebook Ad will explore the fascinating history of Italian food and how it has evolved over time. Learn from Dr Eva Del Soldato and Diego Zancani, two experts in Italian food history, about how even the emoji for pasta isn't just pasta -- it's a steaming plate of spaghetti heaped with tomato sauce on top. Discover how Italy's complex history has shaped the Italian food we know and love today."
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

import OpenAIGroupedResult from '/_includes/code/generative.openai.groupedresult.mdx';

<OpenAIGroupedResult />

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
              "groupedResult": "The Financial Times, Wall Street Journal, and The New York Times Company are all about finance because they provide news and analysis on the latest financial markets, economic trends, and business developments. They also provide advice and commentary on personal finance, investments, and other financial topics."
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

### Supported models (OpenAI)

You can use any of the following models with `generative-openai`:

* [gpt-3.5-turbo](https://platform.openai.com/docs/models/gpt-3-5) (default)
* [gpt-3.5-turbo-16k](https://platform.openai.com/docs/models/gpt-3-5)
* [gpt-3.5-turbo-1106](https://platform.openai.com/docs/models/gpt-3-5)
* [gpt-4](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)
* [gpt-4-1106-preview](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)
* [gpt-4-32k](https://platform.openai.com/docs/models/gpt-4-and-gpt-4-turbo)

The module also supports these legacy models. However, their use is not recommended.

* [davinci 002](https://platform.openai.com/docs/models/overview)
* [davinci 003](https://platform.openai.com/docs/models/overview)


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
