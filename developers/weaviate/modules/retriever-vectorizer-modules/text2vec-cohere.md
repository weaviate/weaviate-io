---
title: text2vec-cohere
sidebar_position: 10
image: og/docs/modules/text2vec-cohere.jpg
# tags: ['text2vec', 'text2vec-cohere', 'cohere']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

The `text2vec-cohere` module enables Weaviate to obtain vectors using [Cohere](https://docs.cohere.com/docs/embeddings).

Key notes:

- As it uses a third-party API, you will need an API key.
- **Its usage may incur costs**.
    - Please check the Cohere [pricing page](https://cohere.com/pricing), especially before vectorizing large amounts of data.
- This module is available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- The default model is `embed-multilingual-v2.0` (this is the same model as the previous `multilingual-22-12`).
- Make sure to set the right [distance metric](#distance-metric) in your class configuration.


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
    image: semitechnologies/weaviate:||site.weaviate_version||
    restart: on-failure:0
    ports:
     - "8080:8080"
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

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/configuration/schema-configuration.md).

### API settings

#### Parameters

- `model` (Optional): The model to use. Defaults to `embed-multilingual-v2.0`.
- `truncate` (Optional): Sets Cohere API input truncation behavior. Defaults to `RIGHT`. Options: `RIGHT` or `NONE`.

#### Example

The following example configures the `Document` class by setting the vectorizer to `text2vec-cohere`, distance metric to `dot`, model to `embed-multilingual-v2.0` and without input truncation by the Cohere API.

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
        "distance": "dot" // Set to "cosine" for English models; "dot" for multilingual models
      },
      "moduleConfig": {
        "text2vec-cohere": {
          "model": "embed-multilingual-v2.0", // Defaults to embed-multilingual-v2.0 if not set
          "truncate": "RIGHT" // Defaults to RIGHT if not set
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
        "distance": "dot"  // Set to "cosine" for English models; "dot" for multilingual models
      },
      "moduleConfig": {
        "text2vec-cohere": {
          "model": "embed-multilingual-v2.0", // Defaults to embed-multilingual-v2.0 if not set
          "truncate": "RIGHT", // Defaults to RIGHT if not set
          // highlight-start
          "vectorizeClassName": "false"
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

### API key

You can supply the API key at query time by adding it to the HTTP header:
- `"X-Cohere-Api-Key": "YOUR-COHERE-API-KEY"`

## Additional information

### Available models

`text2vec-cohere` defaults to the `embed-multilingual-v2.0` embedding model unless specified otherwise.

For example, the following schema configuration will set Weaviate to vectorize the `Document` class with `text2vec-cohere` using the `embed-multilingual-v2.0` model.

:::info `embed-multilingual-v2.0` == `multilingual-22-12`
`embed-multilingual-v2.0` reflects the new name.
:::

### Distance metric

Cohere's multilingual models use dot product distances, while the English model uses cosine distances.

Make sure to set this accordingly in your Weaviate class configuration. You can see supported distance metrics [here](../../config-refs/distances.md).

### Truncation

If the input text contains too many tokens and is not truncated, the Cohere API will throw an error. The Cohere API can be set to automatically truncate your input text.

You can set the truncation option with the `truncate` parameter to `RIGHT` or `NONE`. Passing RIGHT will discard the right side of the input, the remaining input is exactly the maximum input token length for the model. [source](https://docs.cohere.com/reference/embed)

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

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
