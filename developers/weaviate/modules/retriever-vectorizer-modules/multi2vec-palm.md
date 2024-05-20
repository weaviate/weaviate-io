---
title: multi2vec-palm
sidebar_position: 37
image: og/docs/modules/multi2vec-palm.jpg
# tags: ['multi2vec', 'multi2vec-palm']
---

import ModuleDocDeprecation from '/developers/weaviate/modules/_components/module.doc.deprecation.md';

<ModuleDocDeprecation provider="google" />

:::info Added in `v1.24.3`
:::

The `multi2vec-palm` module uses a Google multimodal embedding model to create vectors from text or images

## Considerations

- This module enables the `nearText` and `nearImage` [search operators](#additional-search-operators).
- `multi2vec-palm` uses an external API.
  - Check vendor pricing before you vectorize data.
  - Obtain an API key from the vendor.

- This module is only compatible with [Google Vertex AI](https://cloud.google.com/vertex-ai). It is not compatible with Google AI Studio.
- The module s not compatible with Auto-schema. [Define](#collection-configuration) your collections manually.

## Weaviate instance configuration

:::tip
If you use Weaviate Cloud (WCD), this module is already enabled and pre-configured. You cannot edit the configuration in WCS.
:::

### Docker Compose file

To use the `multi2vec-palm` module, enable it in your [Docker Compose](/developers/weaviate/installation/docker-compose) file. Edit your `docker-compose.yml` manually or use the Weaviate [configuration tool](/developers/weaviate/installation/docker-compose.md#configurator) to generate the file.

#### Parameters

| Parameter | Required | Default | Description |
|:--|:--|:--|:--|
| `location` | Yes | None | Where the model runs (e.g. `"us-central1"`). |
| `projectId` | Yes | `"<Your GCP project>"` | The name of your GCP project. |
| `modelId` |  No | `"multimodalembedding@001"` | Current the only model available. |
| `dimensions` | No | `1408` | Must be one of: `128`, `256`, `512`, `1408`. |

## Configure `multi2vec-palm` for VertexAI

This module is only supported in [Google Vertex AI](https://cloud.google.com/vertex-ai). It is not supported in Google AI Studio.

To enable the Vertex AI API on your Google Cloud project, follow [Google's instructions](https://cloud.google.com/vertex-ai/docs/featurestore/setup).

import ApiKeyNote from '/developers/weaviate/model-providers/_includes/google-api-key-note.md';

<ApiKeyNote />

### Vertex AI API key

The Vertex AI API key is called an `access token` in Google Cloud.

To retrieve your token, install the [Google Cloud CLI tool](https://cloud.google.com/cli) and run this command:

```shell
gcloud auth print-access-token
```

### Token expiration

import GCPTokenExpiryNotes from '/_includes/gcp.token.expiry.notes.mdx';

<GCPTokenExpiryNotes/>

### Example

This configuration does the following:

- enables  `multi2vec-palm`
- sets `multi2vec-palm` as the default vectorizer
- uses an environment variable to set the PaLM API key

```yaml
...
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
      ENABLE_MODULES: multi2vec-palm
      DEFAULT_VECTORIZER_MODULE: multi2vec-palm
      CLUSTER_HOSTNAME: 'node1'
...
```

## Collection configuration

To specify module behavior in a collection, edit the Weaviate [schema](/developers/weaviate/manage-data/collections.mdx).

### Vectorization settings

Set vectorizer behavior in the `moduleConfig` section for each collection and property.

#### Collection-level settings

| Parameter | Description |
| :-- | :-- |
| `vectorizer` | The module to use to vectorize the data. |
| `vectorizeClassName` | When `true`, vectorize the collection name. Defaults to `true`. |
| `<media>Fields` | Map property names to modalities (under `moduleConfig.multi2vec-palm`).<br/>One of: `textFields`, `imageFields` |
| `weights` | Change the contribution of the different modalities when calculating the vector. |


#### Property-level settings

| Parameter | Description |
| :-- | :-- |
| `skip` | When true, do not vectorize the property. Defaults to `false` |
| `vectorizePropertyName` | When `true`, vectorize the property name. Defaults to `true`. |
| `dataType` | The property's data type. Use in `<media>Fields`. <br/>One of: `text`,`blob` |

#### Example

This collection definition sets the following:

- The `multi2vec-palm` module is the `vectorizer` for the collection `MultimodalExample`.
- The `name` property is `text` datatype and is a text field.
- The `image` property is a `blob` datatype and is an image field.

```json
{
  "classes": [
    {
      "class": "MultimodalExample",
      "description": "An example collection for multi2vec-palm",
      // highlight-start
      "vectorizer": "multi2vec-palm",
      "moduleConfig": {
        "multi2vec-palm": {
          "textFields": ["name"],
          "imageFields": ["image"],
        }
      },
      "properties": [
        {
          "dataType": ["text"],
          "name": "name"
        },
        {
          "dataType": ["blob"],
          "name": "image"
        }
      ],
      // highlight-end
    }
  ]
}
```

#### Example with weights

The following example adds weights:

- `textFields` is 0.7
- `imageFields` is 0.3

```json
{
  "classes": [
    {
      "class": "MultimodalExample",
      "moduleConfig": {
        "multi2vec-palm": {
          ...
          // highlight-start
          "weights": {
            "textFields": [0.7],
            "imageFields": [0.3],
          }
          // highlight-end
        }
      }
    }
  ]
}
```

### `blob` data objects

Data that has the `blob` property type must be base64 encoded. To get the base64-encoded value of an image, use the helper methods in the Weaviate clients or run the following command:

```bash
cat my_image.png | base64
```

## Additional information

### Available models

Currently, the only available model is `multimodalembedding@001`.

## Additional search operators

The `multi2vec-palm` vectorizer module enables the `nearText` and `nearImage` search operators.

These operators can do cross-modal search and retrieval.

All objects are encoded into a single vector space. This means, a query that use one modality, such as text, returns results from all available modalities.

## Usage example

### NearText

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

### NearImage

import CodeNearImage from '/_includes/code/img2vec-neural.nearimage.mdx';

<CodeNearImage />


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
