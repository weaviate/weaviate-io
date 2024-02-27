---
title: Generative Search - Google
sidebar_position: 14
image: og/docs/modules/generative-palm.jpg
# tags: ['generative', 'gemini', 'palm', 'gcp']
---


## Overview

* The `generative-palm` module performs retrieval augmented generation, or RAG, using the data stored in your Weaviate instance.
* The module can generate a response for each returned object, or a single response for a group of objects.
* The module enables generative search operations on the Weaviate instance.
* You need an API key for a Google generative model API to use this module.
* **You may incur costs when you use this module**.
    * Please check the vendor pricing.
* You can use this module with [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai), or with [Google Google AI Studio](https://ai.google.dev/tutorials/ai-studio_quickstart).

:::info Releases and versions

<!-- TODO - UNHIDE WHEN MODULE NAME CHANGE IS LIVE -->
<!-- `generative-google` was added in version `v1.19.1` under its previous name, `generative-palm`. -->

AI Studio (previously called MakerSuite) support was added in version `1.22.4`.

:::


<!-- TODO - UNHIDE WHEN MODULE NAME CHANGE IS LIVE -->
<!-- ### Changes from `generative-palm` to `generative-google`

Prior to Weaviate `v1.22.7`, the `generative-google` module was called `generative-palm`. The module is still available under the old name, but it will be removed in a future release.

Along with the name change:
- The API key header was renamed to `X-Google-Api-Key` from `X-Palm-Api-Key`.
- The environment variable was renamed to `GOOGLE_APIKEY` from `PALM_APIKEY`. -->


## Configuring `generative-palm` for VertexAI or AI Studio

The module can be used with either Google Cloud Vertex AI or AI Studio. The configurations vary slightly for each.

### Google Cloud Vertex AI

You must enable the Vertex AI API on your Google Cloud project. To enable the API, following these [instructions](https://cloud.google.com/vertex-ai/docs/featurestore/setup).

#### API key for Vertex AI users

The API key for Vertex AI users is called an `access token` in Google Cloud.

If you have the [Google Cloud CLI tool](https://cloud.google.com/cli) installed and set up, you can view your token by running the following command:

```shell
gcloud auth print-access-token
```

#### Token expiration for Vertex AI users

import GCPTokenExpiryNotes from '/_includes/gcp.token.expiry.notes.mdx';

<GCPTokenExpiryNotes/>

### AI Studio

AI Studio may not be available in all regions. See [this page](https://developers.generativeai.google/available_regions) for the latest information.

#### API key for AI Studio users

You can obtain an API key by logging in to your AI Studio account and creating an API key. This is the key to pass on to Weaviate. This key does not have an expiration date.

#### `apiEndpoint` for AI Studio users

In the Weaviate [schema configuration](#schema-configuration), set the `apiEndpoint` to `generativelanguage.googleapis.com`.

## Introduction

`generative-palm` performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.

The module works in two steps:
1. Run a search query in Weaviate to find relevant objects.
2. Use a PaLM or Gemini model to generate a response. The response is based on the results of the previous step and a prompt or task that you provide.

:::note
You can use the `generative-palm` module with any upstream modules. For example, you could use `text2vec-openai`, `text2vec-cohere`, or `text2vec-huggingface` to vectorize and query your data. Then, you can pass the query results to the `generative-palm` module to generate a response.
:::

The generative module provides results for individual objects or groups of objects:

* `singlePrompt` returns a response for each object.
* `groupedTask` groups the results to return a single response.

You need to input both a query and a prompt (for individual responses) or a task (for all responses).

## Inference API key

:::caution Important: Provide the google API key to Weaviate
`generative-palm` uses a google API endpoint, you must provide a valid google API key to Weaviate.
:::

### Provide the key to Weaviate

To provide your Google API key, use the `"X-PaLM-Api-Key"` request header. If you use a Weaviate client, follow these examples:

import ClientKey from '/_includes/code/core.client.palm.apikey.mdx';

<ClientKey />

Optionally (not recommended), you can provide the Google API key as an environment variable.

<details>
  <summary>How to provide the Google API key as an environment variable</summary>

During the **configuration** of your Docker instance, by adding `PALM_APIKEY` under `environment` to your `Docker Compose` file, like this:

  ```yaml
  environment:
    PALM_APIKEY: 'your-key-goes-here'  # Setting this parameter is optional; you can also provide the key at runtime.
    ...
  ```

</details>

## Module configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file (Weaviate open source only)

You can enable the Generative Palm module in your Docker Compose file (e.g. `docker-compose.yml`). Add the `generative-palm` module (alongside any other module you may need) to the `ENABLE_MODULES` property, like this:

```
ENABLE_MODULES: 'text2vec-palm,generative-palm'
```

<details>
  <summary>See a full example of a Docker configuration with <code>generative-palm</code></summary>

Here is a full example of a Docker configuration that uses the `generative-palm` module in combination with `text2vec-palm`. The configuration also provides the API key:

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
      DEFAULT_VECTORIZER_MODULE: 'text2vec-palm'
      // highlight-next-line
      ENABLE_MODULES: 'text2vec-palm,generative-palm'
      PALM_APIKEY: sk-yourKeyGoesHere  # This parameter is optional; you can also provide the key at runtime.
      CLUSTER_HOSTNAME: 'node1'
```

</details>

## Schema configuration

To configure how the module behaves in a collection, see [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

Note that the `projectId` parameter is required for Vertex AI.

[See this page](../../manage-data/collections.mdx#specify-a-generative-module) for code examples on how to specify a generative module.

### Example schema

This schema configuration sets the Google API information, as well as some optional parameters.

| Parameter | Purpose | Example |
|:--|:--|:--|
| `"projectId"` | Only required with Vertex AI | `"cloud-large-language-models"` |
| `"apiEndpoint"` | Optional | `"us-central1-aiplatform.googleapis.com"` |
| `"modelId"` | Optional | `"chat-bison"` (Vertex AI) <br/> `"chat-bison-001"` (AI Studio) |

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      ...,
      "moduleConfig": {
        // highlight-start
        "generative-palm": {
          "projectId": "YOUR-GOOGLE-CLOUD-PROJECT-ID",    // Only required if using Vertex AI. Replace with your value: (e.g. "cloud-large-language-models")
          "apiEndpoint": "YOUR-API-ENDPOINT",             // Optional. Defaults to "us-central1-aiplatform.googleapis.
          "modelId": "YOUR-GOOGLE-CLOUD-ENDPOINT-ID",     // Optional. Defaults to `"chat-bison"` for Vertex AI and `"chat-bison-001"` for AI Studio.
          "temperature": 0.2,      // Optional
          "maxOutputTokens": 512,  // Optional
          "topK": 3,               // Optional
          "topP": 0.95,            // Optional
        }
        // highlight-end
      }
    }
  ]
}
```

See the relevant Google API documentation for further details on these parameters.

<details>
  <summary>New to Weaviate Schemas?</summary>

If you are new to Weaviate, check out the [Weaviate schema tutorial](/developers/weaviate/starter-guides/schema.md).

</details>

## How to use the module

This module extends the `_additional {...}` property with a `generate` operator.

`generate` takes the following arguments:

| Field | Data Type | Required | Example | Description |
|- |- |- |- |- |
| `singleResult {prompt}`  | string | no | `Summarize the following in a tweet: {summary}`  | Generates a response for each individual search result. You need to include at least one result field in the prompt, between braces. |
| `groupedResult {task}`  | string | no | `Explain why these results are similar to each other`  | Generates a single response for all search results |

### Example of properties in the prompt

When you pipe query results to the prompt, the query pass at least one field. If your results don't pass any fields, Weaviate throws an error.

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

Here is an example of a single result query:
* A vector search (with `nearText`) finds articles about "Italian food."
* The generator module describes each result as a Facebook ad.
  * The query asks for the `summary` field
  * The query adds `summary` field to the `prompt` for the `generate` operator.

import PalmSingleResult from '/_includes/code/generative.palm.singleresult.mdx';

<PalmSingleResult/>

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

Here is an example of a grouped result query:
* A vector search (with `nearText`) finds publications about finance.
* The generator module explains why these articles are about finance.

import PalmGroupedResult from '/_includes/code/generative.palm.groupedresult.mdx';

<PalmGroupedResult />

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

### Supported models

You can specify the model as a part of the schema as shown earlier. Available models and names differ between Vertex AI and AI Studio.

Vertex AI:
- `chat-bison` (default)

AI Studio:
- `chat-bison-001` (default)
- `gemini-pro`

:::info Additional model support in progress

- `gemini-pro-vision` for Vertex AI and AI Studio
- `gemini-pro` on Vertex AI

:::

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
