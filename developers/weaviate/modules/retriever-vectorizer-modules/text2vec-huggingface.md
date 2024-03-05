---
title: text2vec-huggingface
sidebar_position: 16
image: og/docs/modules/text2vec-huggingface.jpg
# tags: ['text2vec', 'text2vec-huggingface', 'huggingface']
---


## Overview

The `text2vec-huggingface` module enables Weaviate to obtain vectors using the [Hugging Face](https://huggingface.co/models) Inference API.

Key notes:

- As it uses a third-party API, you will need an API key.
- **Its usage may incur costs**.
    - Please check the inference [pricing page](https://huggingface.co/inference-api#pricing), especially before vectorizing large amounts of data.
- This module is available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- This module only supports [sentence similarity](https://huggingface.co/models?pipeline_tag=sentence-similarity) models.


## Weaviate instance configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file

To use `text2vec-huggingface`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `text2vec-huggingface` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `text2vec-huggingface` to make it the default for all classes.
- `HUGGINGFACE_APIKEY` (Optional): Your Hugging Face API key. You can also provide the key at query time.

#### Example

This configuration enables `text2vec-huggingface`, sets it as the default vectorizer, and sets the API keys.

```yaml
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
      ENABLE_MODULES: text2vec-huggingface
      DEFAULT_VECTORIZER_MODULE: text2vec-huggingface
      HUGGINGFACE_APIKEY: sk-foobar # Setting this parameter is optional, you can also provide the API key at query time.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
```

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### API settings

#### Parameters

The following parameters are available for the API.

Note that you should only set one of:

- `model`,
- `passageModel` and `queryModel`, or
- `endpointURL`

| setting | type | description | example | notes |
| --- | --- | --- | --- | --- |
| `model` | `string` | The model to use. Do not use with `queryModel` nor `passageModel`. | `"bert-base-uncased"` | Can be any public or private Hugging Face model, [sentence similarity models](https://huggingface.co/models?pipeline_tag=sentence-similarity&sort=downloads) work best for vectorization.
| `passageModel` | `string` | DPR passage model.<br/><br/>Should be set together with `queryModel`, but without `model`. |`"sentence-transformers/facebook-dpr-ctx_encoder-single-nq-base"` | |
| `queryModel` | `string` | DPR query model.<br/><br/>Should be set together with `passageModel`, but without `model`. | `"sentence-transformers/facebook-dpr-question_encoder-single-nq-base"` | |
| `endpointURL` | `string` | (Private or public) Endpoint URL to use<br/><br/>Note: when this variable is set, the module will ignore model settings like `model` `queryModel` and `passageModel`. | | [Read more on](https://huggingface.co/inference-endpoints) how to deploy your own Hugging Face Inference Endpoint. |
| `options.waitForModel` | `boolean` | If the model is not ready, wait for it instead of receiving 503. | | |
| `options.useGPU` | `boolean` | Use GPU instead of CPU for inference.<br/>(If your [account plan](https://huggingface.co/inference-api#pricing) supports it) | | |
| `options.useCache` | `boolean` | Use the HF cache to speed up results. | | If you use a non-deterministic model, you can set this parameter to prevent the caching mechanism from being used. |

#### Example

The following example configures the `Document` class by setting the vectorizer to `text2vec-huggingface`, model to `sentence-transformers/all-MiniLM-L6-v2` as well as to wait for the model to load, use GPU and use the cache.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-huggingface",
      "moduleConfig": {
        "text2vec-huggingface": {
          "model": "sentence-transformers/all-MiniLM-L6-v2",
          "options": {
            "waitForModel": true,
            "useGPU": true,
            "useCache": true
          }
        }
      }
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
      "vectorizer": "text2vec-huggingface",
      "moduleConfig": {
        "text2vec-huggingface": {
          "model": "sentence-transformers/all-MiniLM-L6-v2",
          "options": {
            "waitForModel": true,
            "useGPU": true,
            "useCache": true
          },
          "vectorizeClassName": false
        }
      },
      "properties": [
        {
          "name": "content",
          "dataType": ["text"],
          "description": "Content that will be vectorized",
          // highlight-start
          "moduleConfig": {
            "text2vec-huggingface": {
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
- `"X-Huggingface-Api-Key": "YOUR-HUGGINGFACE-API-KEY"`

## Additional information

### API rate limits

Since this module uses your API key, your account's corresponding rate limits will also apply to the module. Weaviate will output any rate-limit related error messages generated by the API.

### Import throttling

One potential solution to rate limiting would be to throttle the import within your application. We include an example below.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<details>
  <summary>See code example</summary>

<CodeThrottlingExample />

</details>

### Support for Hugging Face Inference Endpoints

The `text2vec-huggingface` module also supports [Hugging Face Inference Endpoints](https://huggingface.co/inference-endpoints), where you can deploy your own model as an endpoint.

To use your own Hugging Face Inference Endpoint for vectorization with the `text2vec-huggingface` module, pass the endpoint url in the class configuration as the `endpointURL` setting.

Please note that only `feature extraction` inference endpoint types are supported.

## Usage example

import CodeNearText from '/_includes/code/graphql.filters.nearText.huggingface.mdx';

<CodeNearText />

## Model license(s)

The `text2vec-huggingface` module is compatible with various models, each with their own license. For detailed information, please review the license of the model you are using in the [Hugging Face Model Hub](https://huggingface.co/models).

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
