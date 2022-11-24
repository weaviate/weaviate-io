---
layout: layout-documentation
solution: weaviate
sub-menu: Retrievers & Vectorizers
nav-parent: Modules
title: img2vec-neural
description: Use Resnet models in Weaviate
tags: ['img2vec-neural']
sidebar_position: 5
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.11.0/retriever-vectorizer-modules/img2vec-neural.html
    - /developers/weaviate/current/modules/img2vec-neural.html
---

# Introduction
This module vectorizes images using neural networks. Pre-trained modules can be used. `resnet50` is the first model that is supported, other models will be released soon. [`resnet50`](https://arxiv.org/abs/1512.03385) is a residual convolutional neural network with 25.5 million parameters trained on more than a million images from the [ImageNet database](https://www.image-net.org/). As the name suggests, it has a total of 50 layers: 48 convolution layers, 1 MaxPool layer and 1 Average Pool layer.

# Available img2vec-neural models

There are two different inference models you can choose from. Depending on your machine (`arm64` or other) and whether you prefer to use multi-threading to extract feature vectors or not, you can choose between `keras` and `pytorch`. There are no other differences between the two models.
- `resnet50` (`keras`): 
  - Supports `amd64`, but not `arm64`. 
  - Does not support `CUDA` (yet)
  - Supports multi-threaded inference
- `resnet50` (`pytorch`): 
  - Supports both `amd64` and `arm64`.
  - Supports `CUDA`
  - Does not support multi-threaded inference

# How to enable in Weaviate

Note: you can also use the [Weaviate configuration tool](../installation/docker-compose.html#configurator).

## Docker-compose file
You can find an example Docker-compose file below, which will spin up Weaviate with the image vectorization module. This example spins up a Weaviate with only one vectorization module, the  `img2vec-neural` module of `pytorch` with the `resnet50` model.

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: semitechnologies/weaviate:{{ site.weaviate_version | remove_first: "v" }}
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      IMAGE_INFERENCE_API: "http://i2v-neural:8080"
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'img2vec-neural'
      ENABLE_MODULES: 'img2vec-neural'
      CLUSTER_HOSTNAME: 'node1'
  i2v-neural:
    image: semitechnologies/img2vec-pytorch:resnet50
```

You can substitute `semitechnologies/img2vec-pytorch:resnet50` with `semitechnologies/img2vec-keras:resnet50` in case you want to use the `keras` module.

You can combine the image vectorization module with a text vectorization module. In the following example, we use both the [`text2vec-contextionary`](./text2vec-contextionary.html) module as well as the `img2vec-neural` module. We set `text2vec-contextionary` to default vectorizer module, which means we need to specify in a data schema when we want a class to be vectorized as with the `img2vec-neural` module instead of the `text2vec-contextionary` module.

<!-- ```yaml
---
  version: '3.4'
  services:
    weaviate:
      command:
      - --host
      - 0.0.0.0
      - --port
      - '8080'
      - --scheme
      - http
    image: semitechnologies/weaviate:{{ site.weaviate_version | remove_first: "v" }}
      ports:
      - 8080:8080
      restart: on-failure:0
      environment:
        CONTEXTIONARY_URL: contextionary:9999
        IMAGE_INFERENCE_API: "http://i2v-neural:8080" 
        QUERY_DEFAULTS_LIMIT: 25
        AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
        PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
        DEFAULT_VECTORIZER_MODULE: 'text2vec-contextionary'
        ENABLE_MODULES: 'text2vec-contextionary,img2vec-neural'
        CLUSTER_HOSTNAME: 'node1'
    contextionary:
      environment:
        OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
        EXTENSIONS_STORAGE_MODE: weaviate
        EXTENSIONS_STORAGE_ORIGIN: http://weaviate:8080
        NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
        ENABLE_COMPOUND_SPLITTING: 'false'
      image: semitechnologies/contextionary:en0.16.0-v1.0.2
      ports:
      - 9999:9999
    i2v-neural:
      image: semitechnologies/img2vec-pytorch:resnet50
...
``` -->

## Other methods
If you prefer not to use Docker-compose (but instead for example Kubernetes in a production setup), make you can use the `img2vec-neural` module after taking the following steps:
1. Enable the `img2vec-neural` module. Make sure you set the `ENABLE_MODULES=img2vec-neural` environment variable. This can be combined with a text vectorization module: `ENABLE_MODULES: 'text2vec-contextionary,img2vec-neural'`. Additionally, you can make one of the modules the default vectorizer, so you don’t have to specify it on each schema class: `DEFAULT_VECTORIZER_MODULE=text2vec-contextionary`
2. Run the `img2vec-neural` module, for example using `docker run -itp "8000:8080" semitechnologies/img2vec-neural:resnet50-61dcbf8`. 
3. Tell Weaviate where to find the inference module. Set the Weaviate environment variable `IMAGE_INFERENCE_API`to where your inference container is running, for example `IMAGE_INFERENCE_API="http://localhost:8000"`
4. You can now use Weaviate normally and all vectorization of images during import and search time will be done with the selected image vectorization model (given that the [schema is configured]() correctly).


# Schema configuration

You can specify to use the image vectorizer per class in the schema. To find details on how to configure a data schema, go [here](../schema/schema-configuration.html). When you set the `vectorizer` of a class to `img2vec-neural`, only the property fields that are specified in the `moduleConfig` will be taken into the computation of the vector. 

When adding a class with vectorizer type `img2vec-neural`, the configuration must contain information about which field holds the image. The dataType of the `imageFields` should be [`blob`](../schema/datatypes.html#datatype-blob). This can be achieved with the following config in a class object:

```json
  "moduleConfig": {
    "img2vec-neural": {
      "imageFields": [
        "image"
      ]
    }
  }
```

If multiple fields are specified, the module will vectorize them separately and use the mean vector of both.

A full example of a class using the `img2vec-neural` module is shown below. This module makes use of the `blob` dataType.


```json
{
  "classes": [
    {
      "class": "FashionItem",
      "description": "Each example is a 28x28 grayscale image, associated with a label from 10 classes.",
      "moduleConfig": {
        "img2vec-neural": {
          "imageFields": [
            "image"
          ]
        }
      },
      "properties": [
        {
          "dataType": [
            "blob"
          ],
          "description": "Grayscale image",
          "name": "image"
        },
        {
          "dataType": [
            "number"
          ],
          "description": "Label number for the given image.",
          "name": "labelNumber"
        },
        {
          "dataType": [
            "string"
          ],
          "description": "label name (description) of the given image.",
          "name": "labelName"
        }
      ],
      "vectorIndexType": "hnsw",
      "vectorizer": "img2vec-neural"
    }
  ]
}
```

_Note:_ Other properties, for example the name of the image that is given in another field, will not be taken into consideration. This means that you can only find the image with semantic search by [another image](#nearimage-search), [data object](../graphql-references/filters.html#nearobject-filter), or [raw vector](../graphql-references/filters.html#nearvector-filter). Semantic search of images by text field (using `nearText`) is not possible, because this requires a `text2vec` vectorization module. Multiple modules cannot be combined at class level yet (might become possible in the future, since `image-text-combined transformers` exists). We recommend to use one of the following workarounds:
1. Best practice for multi-module search: create an image class and a text class in which you refer to each other by cross-reference. This way you can always hop along the reference and search either by “text labels” (using a `text2vec-....` module) or by image (using a `img2vec-...` module).
2. If you don't want to create multiple classes, you are limited to using a `where` filter to find images by other search terms than an `image`, `data object`, or `vector`. A `where` filter does not use semantic features of a module.


# Adding image data objects

When adding data, make sure that the specified fields are filled with valid image data (e.g. jpg, png, etc.), encoded as `base64` (string) value in the property that has a `blob` dataType. The blob type itself (see below) requires that all blobs are base64 encoded. To obtain the base64-encoded value of an image, you can run the following command - or use the helper methods in the Weaviate clients - to do so:

```bash
cat my_image.png | base64
```

You can then import data with `blob` dataType in to Weaviate as follows:

{% include code/1.x/img2vec-neural.create.html %}


# Additional GraphQL API parameters

## nearImage search

At search time you can use the "standard" vector-search operators, such as `nearVector` and `nearObject`. But in addition, you can also vectorize a new image at search time and search by using the image's vector. To do so, you can use the nearImage search operator like so:

{% include code/1.x/img2vec-neural.nearimage.html %}

Alternatively, you can use a helper function in the Python, Java or Go client (not with the JavaScript client). With an encoder function, you can input your image as `png` file, and the helper function encodes this to a `base64` encoded value.

{% include code/1.x/img2vec-neural.nearimage.encode.html %}


# More resources

{% include docs-support-links.html %}
