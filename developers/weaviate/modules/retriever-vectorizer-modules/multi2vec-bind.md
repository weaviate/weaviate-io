---
title: multi2vec-bind
sidebar_position: 6
image: og/docs/modules/multi2vec-clip.jpg
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Introduction

The `multi2vec-bind` module allows you to use the [ImageBind](https://github.com/facebookresearch/ImageBind) model as a Weaviate vectorization module. To use ImageBind with Weaviate, the `multi2vec-bind` module needs to be enabled. The models typically bring separate inference containers. This allows for efficient scaling and resource planning. Neural-Network-based models run most efficiently on GPU-enabled serves, yet Weaviate is CPU-optimized. This separate-container microservice setup allows you to very easily host (and scale) the model independently on GPU-enabled hardware while keeping Weaviate on cheap CPU-only hardware.

The ImageBind model allows users to generate vectors for 7 different modalities of data. This includes text, images, videos, audio files, inertial measurement unit(IMU) - accelerometer and gyroscope data, single channel depth images, and single channel thermal images.

To choose your specific model, you simply need to select the correct Docker container. There is a selection of pre-built Docker images available, but you can also build your own with a simple two-line Dockerfile.

## How to use

You have three options to select your desired model:

1. **Use [any of our pre-built clip model containers](#pre-built-images).** These model containers are pre-built by us, and packed in a container. (If you think we should support another model out-of-the-box [please open an issue or pull request here](https://github.com/weaviate/weaviate/issues)).

## Option 1: Use a pre-built transformer model container

### Example docker-compose file
Note: you can also use the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

You can find an example Docker-compose file below, which will spin up Weaviate with the multi2vec-clip module. In this example we have selected the `sentence-transformers/clip-ViT-B-32-multilingual` which works great for vectorizing images and text in the same vector space. It even supports multiple languages. See below for how to select an alternative model.

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
    image: semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'multi2vec-bind'
      ENABLE_MODULES: 'multi2vec-bind'
      BIND_INFERENCE_API: 'http://multi2vec-bind:8080'
      CLUSTER_HOSTNAME: 'node1'
...
```

Note that running Weaviate with the multi2vec-bind module but without a GPU will be
slower than on CPUs. Enable CUDA if you have a GPU available (`ENABLE_CUDA=1`).

### Alternative: configure your custom setup

*Note: The following steps are only required if you want to manually add the module to an existing setup. If you are starting from scratch, a much more convenient option is to use our [configuration and customization tool](/developers/weaviate/installation/docker-compose.md#configurator).*

#### Step 1: Enable the `multi2vec-bind` module
Make sure you set the `ENABLE_MODULES=multi2vec-bind` environment variable. Additionally, make this module the default vectorizer, so you don't have to specify it on each schema class: `DEFAULT_VECTORIZER_MODULE=multi2vec-bind`

#### Step 2: Tell Weaviate where to find the inference

Set the Weaviate environment variable `BIND_INFERENCE_API` to where your inference container is running, for example `BIND_INFERENCE_API="http://multi2vec-bind:8080"` (Adjust hostname and port accordingly)

You can now use Weaviate normally and all vectorization during import and search time will be done with the selected CLIP transformers model.

## Schema Configuration for ImageBind-vectorized Classes

The following is a valid payload for a class that vectorizes audio, text, video and image fields using the `multi2vec-bind` module as a `vectorizer`:

```json
{
  "classes": [
    {
      "class": "BindExample",
      "moduleConfig": {
        "multi2vec-bind": {
          "imageFields": [
            "image"
          ],
          "textFields": [
            "name"
          ],
         "audioFields": [
            "audio"
          ],
         "videoFields": [
            "video"
          ],
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "name": "name"
        },
        {
          "dataType": [
            "blob"
          ],
          "name": "image"
        },
        {
          "dataType": [
            "blob"
          ],
          "name": "audio"
        },
        {
          "dataType": [
            "blob"
          ],
          "name": "video"
        }
      ],
      "vectorIndexType": "hnsw",
      "vectorizer": "multi2vec-bind"
    }
  ]
}
```

Note that:
 - `depthFields`, `thermalFields`, `IMUFields` can also be specified in addition to the above fields specified
 - `imageFields`, `audioFields`, `videoFields`, `textFields` above in `moduleConfig.multi2vec-bind` don't all
    need to be set. However, at least one of the seven must be set.
 - You can optionally add `weights` in `moduleConfig.multi2vec-bind` to weigh the difference modalities. If only a single
   property is provided, the property takes all the weight. If multiple properties exist and
   no weights are specified, the properties are equal-weighted.

You can then import data objects for the class as usual. Fill the `text` or
fields with text and/or fill the `blob` fields with the corresponding base64-encoded
modality data.

### Limitations
  -  As of `v1.9.0`, the module requires explicit creation of a class. If you
     rely on auto-schema to create the class for you, it will be missing the
     required configuration about which fields should be vectorized. This will
     be addressed in a future release. You can always manually update a class
     schema config that was incorrectly created by Auto-schema and fix it
     yourself.

## Additional GraphQL API parameters

### nearText, nearImage, nearAudio, nearVideo, nearIMU, nearDepth, nearThermal

The `multi2vec-bind` vectorizer module adds five additional search operators for `Get {}`
and `Explore {}` GraphQL functions in addition to the `nearText: {}` and `nearImage: {}` that `multi2vec-clip` added: `nearAudio: {}`, `nearVideo: {}`, `nearDepth: {}`, `nearThermal: {}`, `nearIMU: {}` These
operators can be used to perform cross-modal search and retrieval! This means that when using the `multi2vec-bind` module you can query with and retrieve any of the above combinations of modalities.

Note: In the same query, you cannot use multiple `'near'` filters, or a `'near'`
filter along with an [`'ask'`](../reader-generator-modules/qna-transformers.md)
filter!

#### Example GraphQL Get(`nearText{}`) operator

import CodeNearText from '/_includes/code/graphql.filters.nearText.mdx';

<CodeNearText />

#### Example GraphQL Get(`nearImage{}`) operator

import CodeNearImage from '/_includes/code/img2vec-neural.nearimage.mdx';

<CodeNearImage />

Alternatively, you can use a helper function in the Python, Java or Go client (not with the JavaScript client). With an encoder function, you can input your image as `png` file, and the helper function encodes this to a `base64` encoded value.

import CodeNearImageEncode from '/_includes/code/img2vec-neural.nearimage.encode.mdx';

<CodeNearImageEncode />

### Distance

You can set a maximum allowed `distance`, which will be used to determine which
data results to return. The interpretation of the value of the distance field
depends on the [distance metric used](/developers/weaviate/config-refs/distances.md).

If the distance metric is `cosine` you can also use `certainty` instead of
`distance`. Certainty normalizes the distance in a range of 0..1, where 0
represents a perfect opposite (cosine distance of 2) and 1 represents vectors
with an identical angle (cosine distance of 0). Certainty is not available on
non-cosine distance metrics.

### Moving

Because pagination is not possible in multidimensional storage, you can improve your results with additional explore functions which can move away from semantic concepts or towards semantic concepts. E.g., if you look for the concept 'New York Times' but don't want to find the city New York, you can use the `moveAwayFrom{}` function by using the words 'New York'. This is also a way to exclude concepts and to deal with negations (`not` operators in similar query languages). Concepts in the `moveAwayFrom{}` filter are not per definition excluded from the result, but the resulting concepts are further away from the concepts in this filter.

Moving can be done based on `concepts` and/or `objects`.
* `concepts` requires a list of one or more words
* `objects` requires a list of one or more objects, given by their `id` or `beacon`. For example:

```graphql
{
  Get{
    Publication(
      nearText: {
        concepts: ["fashion"],
        distance: 0.6,
        moveTo: {
            objects: [{
                beacon: "weaviate://localhost/Article/e5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf"
            }, {
                id: "9f0c7463-8633-30ff-99e9-fd84349018f5"
            }],
            concepts: ["summer"],
            force: 0.9
        }
      }
    ){
      name
      _additional {
        distance
        id
      }
    }
  }
}
```

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
