---
title: multi2vec-bind
sidebar_position: 35
image: og/docs/modules/multi2vec-bind.jpg
# tags: ['multi2vec', 'multi2vec-bind']
---


## Overview

:::info Added in `v1.21`
:::

The `multi2vec-bind` module enables Weaviate to use the [ImageBind](https://github.com/facebookresearch/ImageBind) model to vectorize data at import time.

Key notes:

- This module is not available on Weaviate Cloud Services (WCS).
- Enabling this module will enable multiple [`near<Media>` search operators](#additional-search-operators).
- Model encapsulated in Docker container.
- This module is not compatible with Auto-schema. You must define your classes manually as [shown below](#class-configuration).

`multi2vec-bind` allows Weaviate to generate vectors data containing any number of the following modalities:
- text
- images
- videos
- audio
- inertial measurement unit (IMU, i.e. accelerometer and gyroscope data)
- single channel depth images, and
- single channel thermal images.

## Weaviate instance configuration

:::info Not applicable to WCS
This module is not available on Weaviate Cloud Services.
:::

### Memory requirements

The `multi2vec-bind` module requires a significant amount of memory to run. You may need to increase the memory limit for the `multi2vec-bind` container to 12 GB or more, such as through Docker Desktop's settings. You can additionally set a limit on your Docker Compose file as shown below, however your Docker Desktop memory limit must be equal to or higher than the limit set in the Docker Compose file.

### Docker Compose file

To use `multi2vec-bind`, you must enable it in your Docker Compose file (e.g. `docker-compose.yml`).

:::tip Use the configuration tool
While you can do so manually, we recommend using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator) to generate the `Docker Compose` file.
:::

#### Parameters

Weaviate:

- `ENABLE_MODULES` (Required): The modules to enable. Include `multi2vec-bind` to enable the module.
- `DEFAULT_VECTORIZER_MODULE` (Optional): The default vectorizer module. You can set this to `multi2vec-bind` to make it the default for all classes.
- `BIND_INFERENCE_API` (Required): The URL of the inference container.

Inference container:

- `image` (Required): The image name of the inference container.
- `mem_limit` (Optional): The memory limit for the inference container. Suggest setting to `12G` or higher. (Also review the memory limit in Docker Desktop settings.)
- `ENABLE_CUDA` (Optional): Set to `1` to enable GPU usage. Default is `0` (CPU only).


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
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 50051:50051
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      # highlight-start
      DEFAULT_VECTORIZER_MODULE: 'multi2vec-bind'
      ENABLE_MODULES: 'multi2vec-bind'
      BIND_INFERENCE_API: 'http://multi2vec-bind:8080'
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
# highlight-start
  multi2vec-bind:
    mem_limit: 12g
    image: cr.weaviate.io/semitechnologies/multi2vec-bind:imagebind
    environment:
      ENABLE_CUDA: '0'
# highlight-end
...
```

:::note Have you enabled CUDA?
This module will benefit greatly from GPU usage. Make sure to enable CUDA if you have a compatible GPU available (`ENABLE_CUDA=1`).
:::

## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### Vectorization settings

You can set vectorizer behavior using the `moduleConfig` section under each class and property:

#### Class-level

- `vectorizer` - what module to use to vectorize the data.
- `vectorizeClassName` – whether to vectorize the class name. Default: `true`.
- `<media>Fields` - property names to map for different modalities (under `moduleConfig.multi2vec-bind`).
    - i.e. one or more of [`textFields`, `imageFields`, `audioFields`, `videoFields`, `depthFields`, `thermalFields`, `IMUFields`]
- `weights` - optional parameter to weigh the different modalities in producing the final vector.

#### Property-level

- `skip` – whether to skip vectorizing the property altogether. Default: `false`
- `vectorizePropertyName` – whether to vectorize the property name. Default: `false`
- `dataType` - the data type of the property. For use in the appropriate `<media>Fields`, must be set to `text` or `blob` as appropriate.

#### Example

The following example class definition sets the `multi2vec-bind` module as the `vectorizer` for the class `BindExample`. It also sets:

- `name` property as a `text` datatype and as the text field,
- `image` property as a `blob` datatype and as the image field,
- `audio` property as a `blob` datatype and as the audio field, and
- `video` property as a `blob` datatype and as the video field.

```json
{
  "classes": [
    {
      "class": "BindExample",
      // highlight-start
      "vectorizer": "multi2vec-bind",
      "moduleConfig": {
        "multi2vec-bind": {
          "textFields": ["name"],
          "imageFields": ["image"],
          "audioFields": ["audio"],
          "videoFields": ["video"],
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
        },
        {
          "dataType": ["blob"],
          "name": "audio"
        },
        {
          "dataType": ["blob"],
          "name": "video"
        }
      ]
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
      "class": "BindExample",
      "moduleConfig": {
        "multi2vec-bind": {
          ...
          // highlight-start
          "weights": {
            "textFields": [0.4],
            "imageFields": [0.2],
            "audioFields": [0.2],
            "videoFields": [0.2],
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

The `multi2vec-bind` vectorizer module will enable the following search operators: `nearText`, `nearImage`, `nearAudio`, `nearVideo`, `nearDepth`, `nearThermal`,  and `nearIMU`.

These operators can be used to perform cross-modal search and retrieval.

This means that when using the `multi2vec-bind` module any query using one modality (e.g. text) will include results in all available modalities, as all objects will be encoded into a single vector space.

## Model license(s)

The `multi2vec-bind` module uses the [ImageBind](https://github.com/facebookresearch/ImageBind) model. ImageBind code and model weights are released under the CC-BY-NC 4.0 license. See the [LICENSE](https://github.com/facebookresearch/ImageBind/blob/main/LICENSE) for additional details.

It is your responsibility to evaluate whether the terms of its license(s), if any, are appropriate for your intended use.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
