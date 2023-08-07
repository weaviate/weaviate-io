---
title: multi2vec-bind
sidebar_position: 35
image: og/docs/modules/multi2vec-clip.jpg
# tags: ['multi2vec', 'multi2vec-bind']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## In short

* Added in Weaviate `v1.21.0`.
* Runs a local inference container.
* Not available in Weaviate Cloud Services (WCS).

## Introduction

The `multi2vec-bind` module uses the [ImageBind](https://github.com/facebookresearch/ImageBind) model to vectorize data in Weaviate.

The ImageBind model allows users to generate vectors from data that includes up to 7 different modalities. This includes:
- text
- images
- videos
- audio
- inertial measurement unit (IMU, i.e. accelerometer and gyroscope data)
- single channel depth images, and
- single channel thermal images.

## How to enable

### Weaviate Cloud Services

The `multi2vec-bind` module is not available on the WCS.

### Weaviate open source

You can find an example Docker Compose file below, which will spin up Weaviate with the `multi2vec-bind` module.

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

:::tip
- If you have a CUDA-capable GPU available, set `ENABLE_CUDA=1` to enable GPU acceleration.
- You can also use the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator) to generate the Docker-Compose file.
:::

## How to use

To use `multi2vec-bind` for your data, you must set it as the vectorizer for your desired class, and set the properties that you want to vectorize.

You must map at least one of the parameters for different modalities (under `moduleConfig.multi2vec-bind`) to class properties.

More specifically, you must set one of [`textFields`, `imageFields`, `audioFields`, `videoFields`, `depthFields`, `thermalFields`, `IMUFields`] to class properties.

### Class definition

#### Example

The following example class definition sets the `multi2vec-bind` module as the `vectorizer` for the class `BindExample`. It also sets:

- `name` property as a `text` datatype and as the text field
- `image` property as a `blob` datatype and as the image field
- `audio` property as a `blob` datatype and as the audio field
- `video` property as a `blob` datatype and as the video field

```json
{
  "classes": [
    {
      "class": "BindExample",
      "moduleConfig": {
        "multi2vec-bind": {
          "textFields": [
            "name"
          ],
          "imageFields": [
            "image"
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

:::note
- You can optionally add `weights` in `moduleConfig.multi2vec-bind` to weigh the difference modalities. The following example weights the `textFields` at 0.4, and the `imageFields`, `audioFields`, and `videoFields` at 0.2 each.
```json
{
  "classes": [
    {
      "class": "BindExample",
      "moduleConfig": {
        "multi2vec-bind": {
          ...
          "weights": {
            "textFields": [0.4],
            "imageFields": [0.2],
            "audioFields": [0.2],
            "videoFields": [0.2],
          }
        }
      }
    }
  ]
}
```
- The `blob` property must be in base64-encoded data.
:::

### Adding `blob` data objects

Any `blob` property type data must be base64 encoded. To obtain the base64-encoded value of an image for example, you can use the helper methods in the Weaviate clients or run the following command:

```bash
cat my_image.png | base64
```

## Additional search operators

The `multi2vec-bind` vectorizer module will enable the following search operators in Weaviate: `nearText`, `nearImage`, `nearAudio`, `nearVideo`, `nearDepth`, `nearThermal`,  and `nearIMU`.

These operators can be used to perform cross-modal search and retrieval. This means that when using the `multi2vec-bind` module you can query with and retrieve any of the above combinations of modalities.

## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
