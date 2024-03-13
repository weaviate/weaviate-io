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
| `<media>Fields` | Map property names to modalities (under `moduleConfig.multi2vec-palm`).<br/>One of `textFields`, `imageFields` |
| `weights` | Change the contribution of the different modalities when calculating the vector. |


#### Property-level settings

- `skip` – whether to skip vectorizing the property altogether. Default: `false`
- `vectorizePropertyName` – whether to vectorize the property name. Default: `false`
- `dataType` - the data type of the property. For use in the appropriate `<media>Fields`, must be set to `text` or `blob` as appropriate.

#### Example

The following example collection definition sets the `multi2vec-palm` module as the `vectorizer` for the collection `ClipExample`. It also sets:

- `name` property as a `text` datatype and as the text field,
- `image` property as a `blob` datatype and as the image field,

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
          "inferenceUrl": "http://multi2vec-palm:8080"  // Optional. Set to use a different inference container when using multiple inference containers.
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

The following example adds weights for various properties, with the `textFields` at 0.4, and the `imageFields`, `audioFields`, and `videoFields` at 0.2 each.

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

:::note All `blob` properties must be in base64-encoded data.
:::


### Adding `blob` data objects

Any `blob` property type data must be base64 encoded. To obtain the base64-encoded value of an image for example, you can use the helper methods in the Weaviate clients or run the following command:

```bash
cat my_image.png | base64
```

## Additional search operators

The `multi2vec-palm` vectorizer module will enable the following `nearText` and `nearImage` search operators.

These operators can be used to perform cross-modal search and retrieval.

This means that when using the `multi2vec-palm` module any query using one modality (e.g. text) will include results in all available modalities, as all objects will be encoded into a single vector space.

## Usage example

### NearText

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

### NearImage

import CodeNearImage from '/_includes/code/img2vec-neural.nearimage.mdx';

<CodeNearImage />

## Model selection

To select a model, please point `multi2vec-palm` to the appropriate Docker container.

You can use our pre-built Docker image as shown above, or build your own (with just a few lines of code).

This allows you to use any suitable model from the [Hugging Face model hub](https://huggingface.co/models) or your own custom model.

### Using a public Hugging Face model

You can build a Docker image to use any **public SBERT CLIP** model from the [Hugging Face model hub](https://huggingface.co/models) with a two-line Dockerfile. In the following example, we are going to build a custom image for the [`clip-ViT-B-32` model](https://huggingface.co/sentence-transformers/clip-ViT-B-32).

:::note This is the same model used in the pre-built image
:::

#### Step 1: Create a `Dockerfile`
Create a new `Dockerfile`. We will name it `clip.Dockerfile`. Add the following lines to it:

```
FROM semitechnologies/multi2vec-palm:custom
RUN CLIP_MODEL_NAME=clip-ViT-B-32 TEXT_MODEL_NAME=clip-ViT-B-32 ./download.py
```

#### Step 2: Build and tag your Dockerfile.

We will tag our Dockerfile as `clip-inference`:

```shell
docker build -f clip.Dockerfile -t clip-inference .
```

#### Step 3: Use the image

You can now push your image to your favorite registry or reference it locally in your Weaviate `docker-compose.yml` using the docker tag `clip-inference`.

### Using a private or local model

You can build a Docker image which supports any model which is compatible with Hugging Face's `SentenceTransformers` and `ClIPModel`.

To ensure that text embeddings will output compatible vectors to image embeddings, you should only use models that have been specifically trained for use with CLIP models.

In the following example, we are going to build a custom image for a non-public model which we have locally stored at `./my-clip-model` and `./my-text-model`.

Both models were trained to produce embeddings which are compatible with one another.

Create a new `Dockerfile` (you do not need to clone this repository, any folder on your machine is fine), we will name it `my-models.Dockerfile`. Add the following lines to it:

```
FROM semitechnologies/transformers-inference:custom
COPY ./my-text-model /app/models/text
COPY ./my-clip-model /app/models/clip
```

The above will make sure that your model ends up in the image at `/app/models/clip` and `/app/models/text` respectively.. This path is important, so that the application can find the model.

Now you just need to build and tag your Dockerfile, we will tag it as `my-models-inference`:

```shell
docker build -f my-models.Dockerfile -t my-models-inference .
```

That's it! You can now push your image to your favorite registry or reference it locally in your Weaviate `docker-compose.yml` using the Docker tag `my-models-inference`.

To debug if your inference container is working correctly, you can send queries to the vectorizer module's inference container directly, so you can see exactly what vectors it would produce for which input.

To do so – you need to expose the inference container in your Docker Compose file – add something like this:

```yaml
ports:
  - "9090:8080"
```

to your `multi2vec-palm`.

Then you can send REST requests to it directly, e.g.:

```shell
localhost:9090/vectorize -d '{"texts": ["foo bar"], "images":[]}'
```

and it will print the created vector(s) directly.

## Model license(s)

The `multi2vec-palm` module uses the [`clip-ViT-B-32` model](https://huggingface.co/sentence-transformers/clip-ViT-B-32) from the [Hugging Face model hub](https://huggingface.co/models). Please see the [model page](https://huggingface.co/sentence-transformers/clip-ViT-B-32) for the license information.

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
