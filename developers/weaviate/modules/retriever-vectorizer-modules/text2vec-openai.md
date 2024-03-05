---
title: text2vec-openai
sidebar_position: 18
image: og/docs/modules/text2vec-openai.jpg
# tags: ['text2vec', 'text2vec-openai', 'openai']
---


## Overview

The `text2vec-openai` module enables Weaviate to obtain vectors using OpenAI or Azure OpenAI.

- [OpenAI](https://platform.openai.com/docs/guides/embeddings)
- [Azure OpenAI](https://learn.microsoft.com/en-us/azure/cognitive-services/openai/concepts/understand-embeddings)

Key notes:

- As it uses a third-party API, you will need an API key.
- **Its usage may incur costs**.
    - Please check the vendor pricing (e.g. [OpenAI pricing page](https://openai.com/api/pricing/)), especially before vectorizing large amounts of data.
- This module is available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- The default model is `text-embedding-ada-002`.

import OpenAIOrAzureOpenAI from '/_includes/openai.or.azure.openai.mdx';

<OpenAIOrAzureOpenAI/>

import ModuleParameterPrecedenceNote from '/_includes/module-parameter-precedence-note.mdx';

<ModuleParameterPrecedenceNote />

## Weaviate instance configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file

To use `text2vec-openai`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

|Parameter|Required|Purpose|
|:-|:-|:-|
|`ENABLE_MODULES`|Required|The modules to enable. Include `text2vec-openai` to enable the module.|
|`DEFAULT_VECTORIZER_MODULE`|Optional|The default vectorizer module. You can set this to `text2vec-openai` to make it the default for all classes.|
|`OPENAI_APIKEY`|Optional|Your OpenAI API key (if using OpenAI). You can also provide the key at query time.|
|`AZURE_APIKEY`|Optional|Your Azure OpenAI API key (if using Azure OpenAI). You can also provide the key at query time.|

#### Example

This configuration enables `text2vec-openai`, sets it as the default vectorizer, and sets various other parameters such as the API key as environment variables.

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
      ENABLE_MODULES: text2vec-openai
      DEFAULT_VECTORIZER_MODULE: text2vec-openai
      OPENAI_APIKEY: sk-foobar  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at query time.
      OPENAI_ORGANIZATION: your-orgname  # For use with OpenAI. Setting this parameter is optional; you can also provide the key at runtime.
      AZURE_APIKEY: sk-foobar  # For use with Azure OpenAI. Setting this parameter is optional; you can also provide the key at query time.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### API settings (OpenAI)

#### Parameters

| Parameter | Data type | Required | Default | Purpose |
| :- | :- | :- | :- | :- |
| `model` | string | Optional | `ada` | For v3 OpenAI embedding models, the model name. For earlier models, model family, e.g. `ada`. |
| `dimensions` | int | Optional | `1536` for `text-embedding-3-small`<br/>`3072` for `text-embedding-3-large` | Number of dimensions. Applicable to v3 OpenAI models only. |
| `modelVersion` | string | Optional | | Version string, e.g. `003`. |
| `type` | string | Optional | | Model type. Can be `text` or `code`. |
| `baseURL` | string | Optional | `https://api.openai.com`|Sets a proxy or other URL instead of the default OpenAI URL. <br/><br/> Use a the protocol domain format: `https://your.domain.com`. |

#### Example

The following example configures the `Document` class by setting the vectorizer to `text2vec-openai`, model to `ada`, the model version to `002` and the type to `text`:

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      // highlight-start
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          // "model": "ada",
          // "modelVersion": "002",  // Parameter only applicable for `ada` model family and older
          "model": "text-embedding-3-large",
          "dimensions": 3072,  // Parameter only applicable for `v3` model family and newer
          "type": "text",
          "baseURL": "https://proxy.yourcompanydomain.com"  // Optional. Can be overridden by one set in the HTTP header.
        }
      },
      // highlight-end
    }
  ]
}
```

### API settings (Azure OpenAI)

#### Parameters

|Parameter||Purpose|
|:-|:-|
|`resourceName`|Azure resource name|
|`deploymentId`|Azure deployment ID (your model name)|
| `baseURL` |Set the endpoint of your Azure Open AI Deployments e.g. `https://eastus.api.cognitive.microsoft.com`|

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      // highlight-start
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          "resourceName": "<YOUR-RESOURCE-NAME>",
          "deploymentId": "<YOUR-MODEL-NAME>",
        }
      }
      // highlight-end
    }
  ]
}
```

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Collection level settings

| Parameter | Type | Default | Purpose |
| :- | :- | :- |
| `vectorizer` | string | - | Sets the module for vectorization. |
| `vectorizeClassName`| boolean | `true` | Whether to include the class name during vectorization. |

#### Property level settings

| Parameter | Type | Default | Purpose |
| :- | :- | :- |
| `skip` | boolean | `false` | When `true`, does not include the property during vectorization. |
| `vectorizePropertyName` | boolean | `false` | Whether to include the property name during vectorization. |

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-openai",
      "moduleConfig": {
        "text2vec-openai": {
          // "model": "ada",
          // "modelVersion": "002",  // Parameter only applicable for `ada` model family and older
          "model": "text-embedding-3-large",
          "dimensions": 3072,  // Parameter only applicable for `v3` model family and newer
          "type": "text",
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
            "text2vec-openai": {
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
| `"X-OpenAI-Api-Key"` | `"YOUR-OPENAI-API-KEY"` | OpenAI API key | |
| `"X-Azure-Api-Key"` | `"YOUR-AZURE-API-KEY"` | Azure OpenAI API key | |
| `"X-OpenAI-Organization"` | `"YOUR-OPENAI-ORGANIZATION"` | OpenAI organization name | Available from version `v1.21.1` |
| `"X-OpenAI-BaseURL"` | `"YOUR-OPENAI-BASE-URL"` | OpenAI base URL | Available from version `v1.22.3` <br /><br />Use the protocol domain format: `https://your.domain.com`. <br /><br /> If specified, this will have precedence over the class-level setting. |

## Additional information

### Available models (OpenAI)

You can use any OpenAI embedding model with `text2vec-openai`.

For document embeddings, choose from the following [embedding models](https://platform.openai.com/docs/models/embeddings):
* text-embedding-3
    * Available dimensions:
        * `text-embedding-3-large`: `256`, `1024`, `3072` (default)
        * `text-embedding-3-small`: `512`, `1536` (default)
* ada
* babbage
* davinci

### The following models are now deprecated

[Source](https://platform.openai.com/docs/deprecations)

* Codex
* babbage-001
* davinci-001
* curie

:::note Model size vs resource requirements
The more dimensions a model produces, the larger your data footprint will be. You can estimate the total size of your dataset [here](/developers/weaviate/concepts/resources.md#an-example-calculation).
:::

### API rate limits

Since this module uses your API key, your account's corresponding rate limits will also apply to the module. Weaviate will output any rate-limit related error messages generated by the API.

You can request to increase your rate limit by emailing OpenAI at `support@openai.com` describing your use case with Weaviate.

The current rate limit will appear in the error message, as shown below:

```json
{
  "message": "Rate limit reached for requests. Limit: 600.000000 / min. Current: 1024.000000 / min. Contact support@openai.com if you continue to have issues."
}
```

### Import throttling

One potential solution to rate limiting would be to throttle the import within your application. We include an example below.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<details>
  <summary>See code example</summary>

<CodeThrottlingExample />

</details>

## Usage example

This is an example of a `nearText` query with `text2vec-openai`.

import CodeNearText from '/_includes/code/graphql.filters.nearText.openai.mdx';

<CodeNearText />


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
