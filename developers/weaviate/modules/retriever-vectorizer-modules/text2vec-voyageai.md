---
title: text2vec-voyageai
sidebar_position: 19
image: og/docs/modules/text2vec-voyageai.jpg
# tags: ['text2vec', 'text2vec-voyageai', 'voyageai']
---


## Overview

The `text2vec-voyageai` module enables Weaviate to obtain vectors using [Voyage AI](https://docs.voyageai.com/docs/embeddings).

Key notes:

- As it uses a third-party API, you will need an API key.
- **Its usage may incur costs**.
    - Please check the Voyage AI [pricing page](https://docs.voyageai.com/docs/pricing), especially before vectorizing large amounts of data.
- This module is available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- The default model is `voyage-large-2`.

import ModuleParameterPrecedenceNote from '/_includes/module-parameter-precedence-note.mdx';

<ModuleParameterPrecedenceNote />

## Weaviate instance configuration

:::tip
If you use Weaviate Cloud Services (WCS), this module is already enabled and pre-configured. You cannot edit the configuration in WCS.
:::

### Docker Compose file

To use `text2vec-voyageai`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `text2vec-voyageai` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `text2vec-voyageai` to make it the default for all classes.
- `VOYAGEAI_APIKEY` (Optional): Your Voyage AI API key. You can also provide the key at query time.

#### Example

This configuration enables `text2vec-voyageai`, sets it as the default vectorizer, and sets the API keys.

```yaml
---
version: '3.4'
services:
  weaviate:
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    restart: on-failure:0
    ports:
     - 8080:8080
     - 50051:50051
    environment:
      QUERY_DEFAULTS_LIMIT: 20
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: "./data"
      # highlight-start
      ENABLE_MODULES: text2vec-voyageai
      DEFAULT_VECTORIZER_MODULE: text2vec-voyageai
      VOYAGEAI_APIKEY: sk-foobar # Setting this parameter is optional, you can also provide the API key at query time.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### API settings

#### Parameters

| Parameter | Required | Default | Purpose |
| :- | :- | :- | :- |
| `model` | No | `voyage-large-2` | The model to use. |
| `truncate` | No | true | Sets the Voyage AI API input truncation behavior (true/false). |
| `baseURL` | No | `https://api.voyageai.com/v1` | Sets a proxy or other URL instead of the default URL. <br/><br/> Use a the protocol domain format: `https://your.domain.com`. |

#### Example

The following example configures the `Document` class by setting the vectorizer to `text2vec-voyageai`, model to `voyage-large-2` and explicitly enables input truncation by the Voyage AI API.

:::info
Different Voyage AI models use different distance metrics. Make sure to set this accordingly. See the [distance metric](#distance-metric) section for more information.
:::

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      // highlight-start
      "vectorizer": "text2vec-voyageai",
      "moduleConfig": {
        "text2vec-voyageai": {
          "model": "voyage-law-2", // Defaults to voyage-large-2 if not set, available models: https://docs.voyageai.com/docs/embeddings
          "truncate": true, // Defaults to true if not set
          "baseURL": "https://proxy.yourcompanydomain.com"  // Optional. Can be overridden by one set in the HTTP header.
        }
      },
      // highlight-end
    }
  ]
}
```

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Class-level

- `vectorizer` - what module to use to vectorize the data.
- `vectorizeClassName` – whether to vectorize the class name. Default: `true`.

#### Property-level

- `skip` – whether to skip vectorizing the property altogether. Default: `false`
- `vectorizePropertyName` – whether to vectorize the property name. Default: `false`

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-voyageai",
      "moduleConfig": {
        "text2vec-voyageai": {
          "model": "voyage-law-2", // Defaults to voyage-large-2 if not set, available models: https://docs.voyageai.com/docs/embeddings
          "truncate": true, // Defaults to true if not set
          // highlight-start
          "vectorizeClassName": false
          // highlight-end
        }
      },
      "properties": [
        {
          "name": "content",
          "dataType": ["text"],
          "description": "Content that will be vectorized",
          // highlight-start
          "moduleConfig": {
            "text2vec-voyageai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          }
          // highlight-end
        }
      ]
    }
  ]
}
```

## Query-time parameters

You can supply parameters at query time by adding it to the HTTP header.

| HTTP Header | Value | Purpose | Note |
| :- | :- | :- | :- |
| `"X-VoyageAI-Api-Key"` | `"YOUR-VOYAGEAI-API-KEY"` | Voyage AI API key | |
| `"X-VoyageAI-BaseURL"` | `"YOUR-VOYAGEAI-BASE-URL"` | Voyage AI base URL | Use the protocol domain format: `https://your.domain.com`. <br /><br /> If specified, this will have precedence over the class-level setting. |

## Additional information

### Available models

You can use any of the following models with `text2vec-voyageai` ([source](https://docs.voyageai.com/docs/embeddings)):

- `voyage-large-2` (default)
- `voyage-code-2`
- `voyage-2`
- `voyage-law-2`
- `voyage-lite-02-instruct`

### Truncation

The Voyage AI API can be set to automatically truncate your input text.

You can set the truncation option with the `truncate` parameter to `true`, `false`, or omitted altogether. Voyage AI's default behavior is to truncate the input text if it slightly exceeds the context window length. If it significantly exceeds the context window length, an error will be raised.

### API rate limits

Since this module uses your API key, your account's corresponding rate limits will also apply to the module. Weaviate will output any rate-limit related error messages generated by the API.

More information about Voyage AI rate limits can be found [here](https://docs.cohere.com/docs/going-live).

### Import throttling

One potential solution to rate limiting would be to throttle the import within your application. We include an example below.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<details>
  <summary>See code example</summary>

<CodeThrottlingExample />

</details>

## Usage example

This is an example of a `nearText` query with `text2vec-voyageai`.

import GraphQLFiltersNearNextVoyageAI from '/_includes/code/graphql.filters.nearText.voyageai.mdx';

<GraphQLFiltersNearNextVoyageAI/>


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
