---
title: text2vec-cohere
sidebar_position: 12
image: og/docs/modules/text2vec-cohere.jpg
# tags: ['text2vec', 'text2vec-cohere', 'cohere']
---


## Overview

The `text2vec-cohere` module enables Weaviate to obtain vectors using [Cohere](https://docs.cohere.com/docs/embeddings).

Key notes:

- As it uses a third-party API, you will need an API key.
- **Its usage may incur costs**.
    - Please check the Cohere [pricing page](https://cohere.com/pricing), especially before vectorizing large amounts of data.
- This module is available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- The default model is `embed-multilingual-v3.0`.
- Set the appropriate [distance metric](#distance-metric) in your class configuration, depending on the model used.

import ModuleParameterPrecedenceNote from '/_includes/module-parameter-precedence-note.mdx';

<ModuleParameterPrecedenceNote />

## Weaviate instance configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file

To use `text2vec-cohere`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `text2vec-cohere` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `text2vec-cohere` to make it the default for all classes.
- `COHERE_APIKEY` (Optional): Your Cohere API key. You can also provide the key at query time.

#### Example

This configuration enables `text2vec-cohere`, sets it as the default vectorizer, and sets the API keys.

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
      ENABLE_MODULES: text2vec-cohere
      DEFAULT_VECTORIZER_MODULE: text2vec-cohere
      COHERE_APIKEY: sk-foobar # Setting this parameter is optional, you can also provide the API key at query time.
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
| `model` | No | `embed-multilingual-v3.0` | The model to use. |
| `truncate` | No | `END` | Sets Cohere API input truncation behavior (`NONE`, `START` or `END` - [read more](#truncation)). |
| `baseURL` | No | `https://api.cohere.ai` | Sets a proxy or other URL instead of the default URL. <br/><br/> Use a the protocol domain format: `https://your.domain.com`. |

#### Example

The following example configures the `Document` class by setting the vectorizer to `text2vec-cohere`, distance metric to `cosine`, model to `embed-multilingual-v3.0` and without input truncation by the Cohere API.

:::info
Different Cohere models use different distance metrics. Make sure to set this accordingly. See the [distance metric](#distance-metric) section for more information.
:::

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      // highlight-start
      "vectorizer": "text2vec-cohere",
      "vectorIndexConfig": {
        "distance": "cosine"
      },
      "moduleConfig": {
        "text2vec-cohere": {
          "model": "embed-multilingual-v3.0", // Defaults to embed-multilingual-v3.0 if not set
          "truncate": "END", // Defaults to END if not set
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
      "vectorizer": "text2vec-cohere",
      "vectorIndexConfig": {
        "distance": "cosine"
      },
      "moduleConfig": {
        "text2vec-cohere": {
          "model": "embed-multilingual-v3.0", // Defaults to embed-multilingual-v3.0 if not set
          "truncate": "END", // Defaults to END if not set
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
            "text2vec-cohere": {
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
| `"X-Cohere-Api-Key"` | `"YOUR-COHERE-API-KEY"` | Cohere API key | |
| `"X-Cohere-BaseURL"` | `"YOUR-COHERE-BASE-URL"` | Cohere base URL | Available from version `v1.22.3` <br /><br />Use the protocol domain format: `https://your.domain.com`. <br /><br /> If specified, this will have precedence over the class-level setting. |

## Additional information

### Available models

You can use any of the following models with `text2vec-cohere` ([source](https://docs.cohere.com/reference/embed)):

- `embed-multilingual-v3.0` (Default)
- `embed-multilingual-light-v3.0`
- `embed-multilingual-v2.0`
- `embed-english-v3.0`
- `embed-english-light-v3.0`
- `embed-english-v2.0`
- `embed-english-light-v2.0`

:::info Deprecated models
The following models are available, but deprecated:
- `multilingual-22-12`
- `large`
- `medium`
- `small`
:::

`text2vec-cohere` defaults to the `embed-multilingual-v3.0` embedding model unless specified otherwise.

:::info `embed-multilingual-v2.0` == `multilingual-22-12`
`embed-multilingual-v2.0` reflects the new name.
:::

### Distance metric

Cohere's `embed-multilingual-v2.0` model uses dot product distances. With the `v3` models, you can use any distance metric (dot, cosine or Euclidean) ([source](https://txt.cohere.com/introducing-embed-v3/)).

You can see a list of supported distance metrics [here](../../config-refs/distances.md).

### Truncation

If the input text contains too many tokens and is not truncated, the Cohere API will throw an error. The Cohere API can be set to automatically truncate your input text.

You can set the truncation option with the `truncate` parameter to any of `"NONE"`, `"START"`, `"END"`. Passing `END` will discard the right side of the input, and passing `START` will discard the left side of the input. The remaining input is exactly the maximum input token length for the model. Cohere's default behavior is to truncate at the `END` if it is not set. ([source](https://docs.cohere.com/reference/embed))

* The _upside_ of truncating is that a batch import always succeeds.
* The _downside_ of truncating (i.e., `NONE`) is that a large text will be partially vectorized without the user being made aware of the truncation.

### API rate limits

Since this module uses your API key, your account's corresponding rate limits will also apply to the module. Weaviate will output any rate-limit related error messages generated by the API.

More information about Cohere rate limits can be found [here](https://docs.cohere.com/docs/going-live).

### Import throttling

One potential solution to rate limiting would be to throttle the import within your application. We include an example below.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<details>
  <summary>See code example</summary>

<CodeThrottlingExample />

</details>

## Usage example

This is an example of a `nearText` query with `text2vec-cohere`.

import GraphQLFiltersNearNextCohere from '/_includes/code/graphql.filters.nearText.cohere.mdx';

<GraphQLFiltersNearNextCohere/>


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
