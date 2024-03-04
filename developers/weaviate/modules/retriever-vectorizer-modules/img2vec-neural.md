---
title: img2vec-neural
sidebar_position: 30
image: og/docs/modules/img2vec-neural.jpg
# tags: ['img2vec', 'img2vec-neural']
---


## Overview

The `img2vec-neural` module enables Weaviate to obtain vectors locally images using a [`resnet50`](https://arxiv.org/abs/1512.03385) model.

`img2vec-neural` encapsulates the model in a Docker container, which allows independent scaling on GPU-enabled hardware while keeping Weaviate on CPU-only hardware, as Weaviate is CPU-optimized.

Key notes:

- This module is not available on Weaviate Cloud Services (WCS).
- Enabling this module will enable the [`nearImage` search operator](#additional-search-operator).
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

- `ENABLE_MODULES` (Required): The modules to enable. Include `img2vec-neural` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `img2vec-neural` to make it the default for all classes.
- `IMAGE_INFERENCE_API` (Required): The URL of the inference container.

Inference container:

- `image` (Required): The image name of the inference container. (e.g. `semitechnologies/img2vec-pytorch:resnet50` or `semitechnologies/img2vec-keras:resnet50`)

#### Example

This configuration enables `img2vec-neural`, sets it as the default vectorizer, and sets the parameters for the Docker container, including setting it to use `img2vec-pytorch:resnet50` image.

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
      ENABLE_MODULES: 'img2vec-neural'
      DEFAULT_VECTORIZER_MODULE: 'img2vec-neural'
      IMAGE_INFERENCE_API: "http://i2v-neural:8080"
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
# highlight-start
  i2v-neural:
    image: cr.weaviate.io/semitechnologies/img2vec-pytorch:resnet50
# highlight-end
...
```

### Alternative: Run a separate container

As an alternative, you can run the inference container independently from Weaviate. To do so, you can:

- Enable `img2vec-neural` in your Docker Compose file,
- Omit `img2vec-neural` parameters,
- Run the inference container separately, e.g. using Docker, and
- Set `IMAGE_INFERENCE_API` to the URL of the inference container.

Then, for example if Weaviate is running outside of Docker, set `IMAGE_INFERENCE_API="http://localhost:8000"`. Alternatively if Weaviate is part of the same Docker network, e.g. because they are part of the same `docker-compose.yml` file, you can use Docker networking/DNS, such as `IMAGE_INFERENCE_API=http://i2v-clip:8080`.

For example, can spin up an inference container with the following command:

```shell
docker run -itp "8000:8080" semitechnologies/img2vec-neural:resnet50-61dcbf8
```


## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Class-level

- `vectorizer` - what module to use to vectorize the data.
- `imageFields` - property names for images to be vectorized

#### Property-level

- `dataType` - the data type of the property. For use in `imageFields`, must be set to `blob`.

#### Example

The following example class definition sets the `img2vec-neural` module as the `vectorizer` for the class `FashionItem`. It also sets:

- `image` property as a `blob` datatype and as the image field,

```json
{
  "classes": [
    {
      "class": "FashionItem",
      "description": "Each example is a 28x28 grayscale image, associated with a label from 10 classes.",
      // highlight-start
      "vectorizer": "img2vec-neural",
      "moduleConfig": {
        "img2vec-neural": {
          "imageFields": [
            "image"
          ]
        }
      },
      // highlight-end
      "properties": [
        // highlight-start
        {
          "dataType": [
            "blob"
          ],
          "description": "Grayscale image",
          "name": "image"
        },
        // highlight-end
        {
          "dataType": [
            "number"
          ],
          "description": "Label number for the given image.",
          "name": "labelNumber"
        },
        {
          "dataType": [
            "text"
          ],
          "description": "label name (description) of the given image.",
          "name": "labelName"
        }
      ],
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

## Additional search operator

The `img2vec-neural` vectorizer module will enable the `nearImage` search operator.

## Usage example

### NearImage

import CodeNearImage from '/_includes/code/img2vec-neural.nearimage.mdx';

<CodeNearImage />

## About the model

[`resnet50`](https://arxiv.org/abs/1512.03385) is a residual convolutional neural network with 25.5 million parameters trained on more than a million images from the [ImageNet database](https://www.image-net.org/). As the name suggests, it has a total of 50 layers: 48 convolution layers, 1 MaxPool layer and 1 Average Pool layer.

### Available img2vec-neural models

There are two different inference models you can choose from. Depending on your machine (`arm64` or other) and whether you prefer to use multi-threading to extract feature vectors or not, you can choose between `keras` and `pytorch`. There are no other differences between the two models.
- `resnet50` (`keras`):
  - Supports `amd64`, but not `arm64`.
  - Does not currently support `CUDA`
  - Supports multi-threaded inference
- `resnet50` (`pytorch`):
  - Supports both `amd64` and `arm64`.
  - Supports `CUDA`
  - Does not support multi-threaded inference

## Model license(s)

The `img2vec-neural` module uses the `resnet50` model.

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
