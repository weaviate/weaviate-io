---
title: Generative Search - PaLM
sidebar_position: 16
image: og/docs/modules/generative-palm.jpg
# tags: ['generative', 'transformers', 'palm', 'gcp']
---


## Overview

* The `generative-palm` module performs retrieval augmented generation, or RAG, using the data stored in your Weaviate instance.
* The module can generate a response for each returned object, or a single response for a group of objects.
* The module enables generative search operations on the Weaviate instance.
* You need an API key for a PaLM API to use this module.
* **Its usage may incur costs**.
    * Please check the vendor pricing (e.g. check Google Vertex AI pricing).
* You can use this with [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai), or with [Google MakerSuite](https://developers.generativeai.google/products/makersuite).

:::info Requirements

`generative-palm` was added in version `v1.19.1`.

Google MakerSuite support was added in version `1.22.4`.

`gemini-pro` MakerSuite support was added in version `1.22.7`.

:::

## Configuring `generative-palm` for VertexAI vs MakerSuite

The module can be used with either Google Cloud Vertex AI or Google MakerSuite. The configurations vary slightly for each.

### Google Cloud Vertex AI

As of the time of writing (September 2023), you must manually enable the Vertex AI API on your Google Cloud project. You can do so by following the instructions [here](https://cloud.google.com/vertex-ai/docs/featurestore/setup).

#### API key for Vertex AI users

This is called an `access token` in Google Cloud.

If you have the [Google Cloud CLI tool](https://cloud.google.com/cli) installed and set up, you can view your token by running the following command:

```shell
gcloud auth print-access-token
```

#### Token expiry for Vertex AI users

import GCPTokenExpiryNotes from '/_includes/gcp.token.expiry.notes.mdx';

<GCPTokenExpiryNotes/>

### Google MakerSuite

At the time of writing (November 2023), MakerSuite is not available in all regions. See [this page](https://ai.google.dev/available_regions) for the latest information.

#### API key for MakerSuite users

You can obtain an API key by logging in to your MakerSuite account and creating an API key. This is the key to pass on to Weaviate. This key does not have an expiry date.

#### `apiEndpoint` for MakerSuite users

In the Weaviate [schema configuration](#schema-configuration), set the `apiEndpoint` to `generativelanguage.googleapis.com`.

## Introduction

`generative-palm` performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.

The module works in two steps:
1. (Weaviate) Run a search query in Weaviate to find relevant objects.
2. (PaLM) Use a PaLM model to generate a response based on the results (from the previous step) and the provided prompt or task.

:::note
You can use the Generative PaLM module with non-PaLM upstream modules. For example, you could use `text2vec-openai`, `text2vec-cohere` or `text2vec-huggingface` to vectorize and query your data, but then rely on the `generative-palm` module to generate a response.
:::

The generative module can provide results for:
* each returned object - `singlePrompt`
* the group of all results together – `groupedTask`

You need to input both a query and a prompt (for individual responses) or a task (for all responses).

## Inference API key

:::caution Important: Provide PaLM API key to Weaviate
As the `generative-palm` uses a PaLM API endpoint, you must provide a valid PaLM API key to weaviate.
:::

### Providing the key to Weaviate

You can provide your PaLM API key by providing `"X-Palm-Api-Key"` through the request header. If you use the Weaviate client, you can do so like this:

import ClientKey from '/_includes/code/core.client.palm.apikey.mdx';

<ClientKey />

Optionally (not recommended), you can provide the PaLM API key as an environment variable.

<details>
  <summary>How to provide the PaLM API key as an environment variable</summary>

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

Here is a full example of a Docker configuration, which uses the `generative-palm` module in combination with `text2vec-palm`, and provides the API key:

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
      semitechnologies/weaviate:||site.weaviate_version||
    ports:
      - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-palm'
      // highlight-next-line
      ENABLE_MODULES: 'text2vec-palm,generative-palm'
      PALM_APIKEY: sk-foobar  # Setting this parameter is optional; you can also provide the key at runtime.
      CLUSTER_HOSTNAME: 'node1'
```

</details>

## Schema configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

Note that the `projectId` parameter is required.

### Example schema

For example, the following schema configuration will set the PaLM API information, as well as the optional parameters.

- The `"projectId"` is only required if using Vertex AI, and may be something like `"cloud-large-language-models"`
- The `"apiEndpoint"` is optional, and may be something like: `"us-central1-aiplatform.googleapis.com"`, and
- The `"modelId"` is optional, and may be something like `"chat-bison"` for Vertex AI and `"chat-bison-001"` for MakerSuite.

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
          "modelId": "YOUR-GOOGLE-CLOUD-ENDPOINT-ID",     // Optional. Defaults to `"chat-bison"` for Vertex AI and `"chat-bison-001"` for MakerSuite.
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

See the relevant PaLM API documentation for further details on these parameters.

<details>
  <summary>New to Weaviate Schemas?</summary>

If you are new to Weaviate, check out the [Weaviate schema tutorial](/developers/weaviate/tutorials/schema.md).

</details>

## How to use

This module extends the `_additional {...}` property with a `generate` operator.

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

Here is an example of a query where:
* we run a vector search (with `nearText`) to find publications about finance,
* then we ask the generator module to explain why these articles are about finance.

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

You can specify the model as a part of the schema as shown earlier. Available models and names differ between Vertex AI and MakerSuite.

Vertex AI:
- `chat-bison` (default)

MakerSuite:
- `chat-bison-001` (default)
- `gemini-pro`

:::info Additional model support in progress

- `gemini-pro-vision` for Vertex AI and MakerSuite
- `gemini-pro` on Vertex AI

:::

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
