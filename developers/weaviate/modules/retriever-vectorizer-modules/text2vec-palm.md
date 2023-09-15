---
title: text2vec-palm
sidebar_position: 15
image: og/docs/modules/text2vec-palm.jpg
# tags: ['text2vec', 'text2vec-palm', 'palm', 'gcp']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

The `text2vec-palm` module enables Weaviate to obtain vectors using PaLM embeddings.

:::info Available from version `v1.19.1`
:::

Key notes:

- As it uses a third-party API, you will need an API key. The module uses the Google Cloud `access token`.
- **Its usage may incur costs**.
    - Please check the vendor pricing (e.g. check Google Vertex AI pricing), especially before vectorizing large amounts of data.
- This module is available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- The default model is `textembedding-gecko@001`.

:::caution Ensure PaLM API is enabled on your Google Cloud project
As of the time of writing (September 2023), you must manually enable the Vertex AI API on your Google Cloud project. You can do so by following the instructions [here](https://cloud.google.com/vertex-ai/docs/featurestore/setup).
:::

## Weaviate instance configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file

To use `text2vec-palm`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `text2vec-palm` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `text2vec-palm` to make it the default for all classes.
- `PALM_APIKEY` (Optional): Your PaLM API key. You can also provide the key at query time.

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
      ENABLE_MODULES: text2vec-palm
      DEFAULT_VECTORIZER_MODULE: text2vec-palm
      PALM_APIKEY: sk-foobar  # Optional; you can also provide the key at query time.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/configuration/schema-configuration.md).

### API settings

#### Parameters

- `projectId` (Required): e.g. `cloud-large-language-models`
- `apiEndpoint` (Optional): e.g. `us-central1-aiplatform.googleapis.com`
- `modelId` (Optional): e.g. `textembedding-gecko@001` or `textembedding-gecko-multilingual@latest`

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-palm",
      "moduleConfig": {
        // highlight-start
        "text2vec-palm": {
          "projectId": "YOUR-GOOGLE-CLOUD-PROJECT-ID",    // Required. Replace with your value: (e.g. "cloud-large-language-models")
          "apiEndpoint": "YOUR-API-ENDPOINT",             // Optional. Defaults to "us-central1-aiplatform.googleapis.com".
          "modelId": "YOUR-GOOGLE-CLOUD-MODEL-ID",        // Optional. Defaults to "textembedding-gecko@001".
        },
        // highlight-end
      },
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
- `vectorizePropertyName` – whether to vectorize the property name. Default: `true`

#### Example

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      "vectorizer": "text2vec-palm",
      "moduleConfig": {
        "text2vec-palm": {
          "projectId": "YOUR-GOOGLE-CLOUD-PROJECT-ID",    // Required. Replace with your value: (e.g. "cloud-large-language-models")
          "apiEndpoint": "YOUR-API-ENDPOINT",             // Optional. Defaults to "us-central1-aiplatform.googleapis.com".
          "modelId": "YOUR-GOOGLE-CLOUD-MODEL-ID",        // Optional. Defaults to "textembedding-gecko@001".
          // highlight-start
          "vectorizeClassName": "false"
          // highlight-end
        },
      },
      "properties": [
        {
          "name": "content",
          "dataType": ["text"],
          "description": "Content that will be vectorized",
          // highlight-start
          "moduleConfig": {
            "text2vec-palm": {
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
- `"X-Palm-Api-Key": "YOUR-PALM-API-KEY"`

### API key on Google Cloud

This is called an `access token` in Google Cloud.

If you have the [Google Cloud CLI tool](https://cloud.google.com/cli) installed and set up, you can view your token by running the following command:

```shell
gcloud auth print-access-token
```

### Token expiry for Google Cloud users

import GCPTokenExpiryNotes from '/_includes/gcp.token.expiry.notes.mdx';

<GCPTokenExpiryNotes/>

## Additional information

### Available models

You can specify the model as a part of the schema as shown earlier.

The available models are:
- `textembedding-gecko@001` (stable)
- `textembedding-gecko@latest` (public preview: an embeddings model with enhanced AI quality)
- `textembedding-gecko-multilingual@latest` (public preview: an embeddings model designed to use a wide range of non-English languages.)

At the time of writing, the `textembedding-gecko` models accept a maximum of 3,072 input tokens, and outputs 768-dimensional vector embeddings. For more information, please see the [official documentation](https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-text-embeddings).

### API rate limits

Since this module uses your API key, your account's corresponding rate limits will also apply to the module. Weaviate will output any rate-limit related error messages generated by the API.

If you exceed your rate limit, Weaviate will output the error message generated by the PaLM API. If this persists, we suggest requesting to increase your rate limit by contacting [Vertex AI support](https://cloud.google.com/vertex-ai/docs/support/getting-support) describing your use case with Weaviate.

### Import throttling

One potential solution to rate limiting would be to throttle the import within your application. We include an example below.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<details>
  <summary>See code example</summary>

<CodeThrottlingExample />

</details>

## Usage example

The below shows a code example of how to use a `nearText` query with `text2vec-palm`.

import CodeNearText from '/_includes/code/graphql.filters.nearText.palm.mdx';

<CodeNearText />

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
