---
title: multi2vec-clip
sidebar_position: 33
image: og/docs/modules/multi2vec-clip.jpg
# tags: ['multi2vec', 'multi2vec-clip']
---


## Overview

The `multi2vec-clip` module enables Weaviate to obtain vectors locally from text or images using a Sentence-BERT CLIP model.

`multi2vec-clip` encapsulates the model in a Docker container, which allows independent scaling on GPU-enabled hardware while keeping Weaviate on CPU-only hardware, as Weaviate is CPU-optimized.

Key notes:

- This module is not available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearText` and `nearImage` search operators](#additional-search-operators).
- Model encapsulated in a Docker container.
- This module is not compatible with Auto-schema. You must define your classes manually as [shown below](#class-configuration).

## Weaviate instance configuration

:::info Not applicable to WCS
This module is not available on Weaviate Cloud Services.
:::

### Docker Compose file

To use `multi2vec-clip`, you must enable it in your Docker Compose file (e.g. `docker-compose.yml`).

:::tip Use the configuration tool
While you can do so manually, we recommend using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator) to generate the `Docker Compose` file.
:::

#### Parameters

Weaviate:

- `ENABLE_MODULES` (Required): The modules to enable. Include `multi2vec-clip` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `multi2vec-clip` to make it the default for all classes.
- `CLIP_INFERENCE_API` (Required): The URL of the inference container.

Inference container:

- `image` (Required): The image name of the inference container.
- `ENABLE_CUDA` (Optional): Set to `1` to enable GPU usage. Default is `0` (CPU only).

#### Example

This configuration enables `multi2vec-clip`, sets it as the default vectorizer, and sets the parameters for the Docker container, including setting it to use `multi2vec-clip:sentence-transformers-clip-ViT-B-32-multilingual-v1` image and to disable CUDA acceleration.

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
      ENABLE_MODULES: multi2vec-clip
      DEFAULT_VECTORIZER_MODULE: multi2vec-clip
      CLIP_INFERENCE_API: http://multi2vec-clip:8080
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
# highlight-start
  multi2vec-clip:
    image: cr.weaviate.io/semitechnologies/multi2vec-clip:sentence-transformers-clip-ViT-B-32-multilingual-v1
    environment:
      ENABLE_CUDA: 0 # set to 1 to enable
# highlight-end
...
```

:::note Have you enabled CUDA?
This module will benefit greatly from GPU usage. Make sure to enable CUDA if you have a compatible GPU available (`ENABLE_CUDA=1`).
:::


### Alternative: Run a separate container

As an alternative, you can run the inference container independently from Weaviate. To do so, you can:

- Enable `multi2vec-clip` in your Docker Compose file,
- Omit `multi2vec-clip` parameters,
- Run the inference container separately, e.g. using Docker, and
- Set `CLIP_INFERENCE_API` to the URL of the inference container.

Then, for example if Weaviate is running outside of Docker, set `CLIP_INFERENCE_API="http://localhost:8000"`. Alternatively if Weaviate is part of the same Docker network, e.g. because they are part of the same `docker-compose.yml` file, you can use Docker networking/DNS, such as `CLIP_INFERENCE_API=http://multi2vec-clip:8080`.


## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Class-level

- `vectorizer` - what module to use to vectorize the data.
- `vectorizeClassName` – whether to vectorize the class name. Default: `true`.
- `<media>Fields` - property names to map for different modalities (under `moduleConfig.multi2vec-clip`).
    - i.e. one or more of [`textFields`, `imageFields`]
- `weights` - optional parameter to weigh the different modalities in producing the final vector.

#### Property-level

- `skip` – whether to skip vectorizing the property altogether. Default: `false`
- `vectorizePropertyName` – whether to vectorize the property name. Default: `false`
- `dataType` - the data type of the property. For use in the appropriate `<media>Fields`, must be set to `text` or `blob` as appropriate.

#### Example

The following example class definition sets the `multi2vec-clip` module as the `vectorizer` for the class `ClipExample`. It also sets:

- `name` property as a `text` datatype and as the text field,
- `image` property as a `blob` datatype and as the image field,

```json
{
  "classes": [
    {
      "class": "ClipExample",
      "description": "An example class for multi2vec-clip",
      // highlight-start
      "vectorizer": "multi2vec-clip",
      "moduleConfig": {
        "multi2vec-clip": {
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

The following example adds weights for various properties, with the `textFields` at 0.4, and the `imageFields`, `audioFields`, and `videoFields` at 0.2 each.

```json
{
  "classes": [
    {
      "class": "ClipExample",
      "moduleConfig": {
        "multi2vec-clip": {
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

The `multi2vec-clip` vectorizer module will enable the following `nearText` and `nearImage` search operators.

These operators can be used to perform cross-modal search and retrieval.

This means that when using the `multi2vec-clip` module any query using one modality (e.g. text) will include results in all available modalities, as all objects will be encoded into a single vector space.

## Usage example

### NearText

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

### NearImage

import CodeNearImage from '/_includes/code/img2vec-neural.nearimage.mdx';

<CodeNearImage />

## Model selection

To select a model, please point `multi2vec-clip` to the appropriate Docker container.

You can use our pre-built Docker image as shown above, or build your own (with just a few lines of code).

This allows you to use any suitable model from the [Hugging Face model hub](https://huggingface.co/models) or your own custom model.

### Using a public Hugging Face model

You can build a Docker image to use any **public SBERT CLIP** model from the [Hugging Face model hub](https://huggingface.co/models) with a two-line Dockerfile. In the following example, we are going to build a custom image for the [`clip-ViT-B-32` model](https://huggingface.co/sentence-transformers/clip-ViT-B-32).

:::note This is the same model used in the pre-built image
:::

#### Step 1: Create a `Dockerfile`
Create a new `Dockerfile`. We will name it `clip.Dockerfile`. Add the following lines to it:

```
FROM semitechnologies/multi2vec-clip:custom
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

to your `multi2vec-clip`.

Then you can send REST requests to it directly, e.g.:

```shell
localhost:9090/vectorize -d '{"texts": ["foo bar"], "images":[]}'
```

and it will print the created vector(s) directly.

## Model license(s)

The `multi2vec-clip` module uses the [`clip-ViT-B-32` model](https://huggingface.co/sentence-transformers/clip-ViT-B-32) from the [Hugging Face model hub](https://huggingface.co/models). Please see the [model page](https://huggingface.co/sentence-transformers/clip-ViT-B-32) for the license information.

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
