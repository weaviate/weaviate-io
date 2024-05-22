---
title: text2vec-palm
sidebar_position: 14
image: og/docs/modules/text2vec-palm.jpg
# tags: ['text2vec', 'text2vec-palm', 'palm', 'gcp']
---

import ModuleDocDeprecation from '/developers/weaviate/modules/_components/module.doc.deprecation.md';

<ModuleDocDeprecation provider="openai" />

## Overview

The `text2vec-palm` module enables Weaviate to obtain vectors using a Google API. You can use this with [Google Cloud Vertex AI](https://cloud.google.com/vertex-ai), or with [Google AI Studio](https://ai.google.dev/?utm_source=weaviate&utm_medium=referral&utm_campaign=partnerships&utm_content=).

:::info Releases and versions

<!-- TODO - UNHIDE WHEN MODULE NAME CHANGE IS LIVE -->
<!-- `text2vec-google` was added in version `v1.19.1` with its original name, `text2vec-palm`. -->

AI Studio (previously called MakerSuite) support was added in version `1.22.4`.
:::

Key notes:

- As it uses a third-party API, you will need an API key.
- **Its usage may incur costs**.
    - Please check the vendor pricing (e.g. check Google Vertex AI pricing), especially before vectorizing large amounts of data.
- This module is available on Weaviate Cloud (WCD).
- Enabling this module will enable the [`nearText` search operator](/developers/weaviate/api/graphql/search-operators.md#neartext).
- Model names differ between Vertex AI and AI Studio.
    - The default model for Vertex AI is `textembedding-gecko@001`.
    - The default model for AI Studio `embedding-001`.


<!-- TODO - UNHIDE WHEN MODULE NAME CHANGE IS LIVE -->
<!-- ### Changes from `text2vec-palm` to `text2vec-google`

Prior to Weaviate `v1.22.7`, the `text2vec-google` module was called `text2vec-palm`. The module is still available under the old name, but it will be removed in a future release.

Along with the name change:
- The API key header was renamed to `X-Google-Api-Key` from `X-Palm-Api-Key`.
 -->

## Configuring `text2vec-palm` for VertexAI or AI Studio

The module can be used with either Google Cloud Vertex AI or AI Studio. The configurations vary slightly for each.

import ApiKeyNote from '/developers/weaviate/model-providers/_includes/google-api-key-note.md';

<ApiKeyNote />

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

### AI Studio

#### API key for AI Studio users

You can obtain an API key [from this page](https://aistudio.google.com/app/prompts/new_chat/?utm_source=weaviate&utm_medium=referral&utm_campaign=partnerships&utm_content=). This is the key to pass on to Weaviate. This key does not have an expiry date.

#### `apiEndpoint` for AI Studio users

In the Weaviate [class configuration](#class-configuration), set the `apiEndpoint` to `generativelanguage.googleapis.com`.

## Weaviate instance configuration

:::tip
If you use Weaviate Cloud (WCD), this module is already enabled and pre-configured. You cannot edit the configuration in WCS.
:::

### Docker Compose file

To use `text2vec-palm`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `text2vec-palm` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `text2vec-palm` to make it the default for all classes.

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
      ENABLE_MODULES: text2vec-palm
      DEFAULT_VECTORIZER_MODULE: text2vec-palm
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
...
```

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### API settings

#### Parameters

- `projectId` (Only required if using Vertex AI): e.g. `cloud-large-language-models`
- `apiEndpoint` (Optional): e.g. `us-central1-aiplatform.googleapis.com`
- `modelId` (Optional): e.g. `textembedding-gecko@001` (Vertex AI) or `embedding-001` (AI Studio)
- `titleProperty` (Optional): The Weaviate property name for the `gecko-002` or `gecko-003` model to use as the title.

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
          "projectId": "YOUR-GOOGLE-CLOUD-PROJECT-ID",    // Only required if using Vertex AI. Replace with your value: (e.g. "cloud-large-language-models")
          "apiEndpoint": "YOUR-API-ENDPOINT",             // Optional. Defaults to "us-central1-aiplatform.googleapis.com".
          "modelId": "YOUR-MODEL-ID",                     // Optional.
          "titleProperty": "YOUR-TITLE-PROPERTY"          // Optional (e.g. "title")
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
- `vectorizePropertyName` – whether to vectorize the property name. Default: `false`

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
          "projectId": "YOUR-GOOGLE-CLOUD-PROJECT-ID",    // Only required if using Vertex AI. Replace with your value: (e.g. "cloud-large-language-models")
          "apiEndpoint": "YOUR-API-ENDPOINT",             // Optional. Defaults to "us-central1-aiplatform.googleapis.com".
          "modelId": "YOUR-MODEL-ID",                     // Optional.
          "titleProperty": "YOUR-TITLE-PROPERTY"          // Optional (e.g. "title")
          // highlight-start
          "vectorizeClassName": false
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
- `"X-Google-Vertex-Api-Key"`: `"YOUR-VERTEX-API-KEY"` (For Vertex AI)
- `"X-Google-Studio-Api-Key"`: `"YOUR-AI-STUDIO-API-KEY"` (For AI Studio)

## Additional information

### Available models

You can specify the model as a part of the schema as shown earlier. Model names differ between Vertex AI and AI Studio.

The available models for Vertex AI are:
- `textembedding-gecko@001` (default)
- `textembedding-gecko@002`
- `textembedding-gecko@003`
- `textembedding-gecko@latest`
- `textembedding-gecko-multilingual@001`
- `textembedding-gecko-multilingual@latest`
- `text-embedding-preview-0409`
- `text-multilingual-embedding-preview-0409`

The available models for AI Studio are:
- `embedding-001` (default)
- `text-embedding-004`

<details>
  <summary>For legacy <code>embedding-gecko-001</code> model users</summary>

The `embedding-gecko-001` has been deprecated by Google, and will not be available for new users. However, Google may deprecate the endpoint for existing users in the future.

</details>


#### Task type

The Google API requires a `task_type` parameter at the time of vectorization for some models.

This is not required with the `text2vec-palm` module, as Weaviate determines the `task_type` Google API parameter based on the usage context.

During object creation, Weaviate supplies `RETRIEVAL_DOCUMENT` as the task type. During search, Weaviate supplies `RETRIEVAL_QUERY` as the task type.

#### Note

For more information, please see the [official documentation](https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-text-embeddings).

### API rate limits

Since this module uses your API key, your account's corresponding rate limits will also apply to the module. Weaviate will output any rate-limit related error messages generated by the API.

If you exceed your rate limit, Weaviate will output the error message generated by the API. If this persists, we suggest requesting to increase your rate limit by contacting [Vertex AI support](https://cloud.google.com/vertex-ai/docs/support/getting-support) describing your use case with Weaviate.

### Import throttling

One potential solution to rate limiting would be to throttle the import within your application. We include an example below.

import CodeThrottlingExample from '/_includes/code/text2vec-api.throttling.example.mdx';

<details>
  <summary>See code example</summary>

<CodeThrottlingExample />

</details>

## Usage example

This is an example of a `nearText` query with `text2vec-palm`.

import CodeNearText from '/_includes/code/graphql.filters.nearText.palm.mdx';

<CodeNearText />


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
