---
title: multi2vec-palm
sidebar_position: 37
# image: og/docs/modules/multi2vec-palm.jpg
# tags: ['multi2vec', 'multi2vec-palm']
---

The `multi2vec-palm` module uses a PaLM module to create vectors from text or images

## Considerations

- This module enables the `nearText` and `nearImage` [search operators](#additional-search-operators).
- `multi2vec-palm` is hosted by a third party. 

  - Check vendor pricing before you vectorize data.
  - Obtain an API key from the vendor.

- This module is only supported in [Google Vertex AI](https://cloud.google.com/vertex-ai). It is not supported in Google AI Studio.
- The module s not compatible with Auto-schema. [Define](#collection-configuration) your collections manually.

## Weaviate instance configuration

This module is available on self-hosted Weaviate instances and in Weaviate Cloud Services.

### Docker Compose file

To use the `multi2vec-palm` module, enable it in your [Docker Compose](/developers/weaviate/installation/docker-compose) file. Edit your `docker-compose.yml` manually or use the Weaviate [configuration tool](/developers/weaviate/installation/docker-compose.md#configurator) to generate the file.

#### Parameters

All parameters are required. 

| Parameter | Default | Description |
|:--|:--|:--|
| `location` | `us-central1` | Where the model runs. |
| `projectId` | `Your GCP project` | The name of your GCP project. |
| `modelId` | `multimodalembedding@001` | Current the only model available. |
| `dimensions` | `1408` | Must be one of: `128`, `256`, `512`, `1408`.

Specify the API key as a request header or an environment variable. 

- Request header: `X-Palm-Api-Key`
- Environment variable: `PALM_APIKEY`

## Configure `multi2vec-palm` for VertexAI

This module is only supported in [Google Vertex AI](https://cloud.google.com/vertex-ai). It is not supported in Google AI Studio.

To enable the Vertex AI API on your Google Cloud project, follow [Google's instructions](https://cloud.google.com/vertex-ai/docs/featurestore/setup).

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
      ENABLE_MODULES: text2vec-palm
      DEFAULT_VECTORIZER_MODULE: text2vec-palm
      PALM_APIKEY: sk-replace-with-your-api-key  # Or provide the key at query time.
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

- The `multi2vec-palm` module is the `vectorizer` for the collection `ClipExample`.
- The `name` property is `text` datatype and is a text field.
- The `image` property is a `blob` datatype and is an image field.

```json
{
  "classes": [
    {
      "class": "ClipExample",
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

- `textFields` is 0.4
- `imageFields` is 0.2
- `audioFields` is 0.2
- `videoFields` is 0.2

```json
{
  "classes": [
    {
      "class": "ClipExample",
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

## Additional search operators

The `multi2vec-palm` vectorizer module enables the `nearText` and `nearImage` search operators.

These operators can do cross-modal search and retrieval.

This means that when using the `multi2vec-palm` module any query using one modality (e.g. text) will include results in all available modalities, as all objects will be encoded into a single vector space.

## Usage example

### NearText

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

### NearImage

import CodeNearImage from '/_includes/code/img2vec-neural.nearimage.mdx';

<CodeNearImage />


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
