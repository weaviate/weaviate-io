---
title: Image search
sidebar_position: 25
image: og/docs/howto.jpg
# tags: ['how to', 'image']
---



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.image.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.image-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.image.ts';

## Overview

This page covers additional, unique aspects related to similarity searches using an image as an input.

If you wish to search for images using a vector or another object, please refer to the [How-to: similarity search](./similarity.md) page.

:::info Related pages
- [How-to: Similarity search](./similarity.md)
:::

:::info Not available in WCS
Image-based search is currently not available in WCS, as the required modules are not available.
:::

### Target object types

To search using an image as an input, you must use the `img2vec-neural` or the `multi2vec-clip` vectorizer module. More specifically:
- To find similar images, you can use `img2vec-neural` or `multi2vec-clip`
- To find related text and image objects (i.e. for multi-modal search), you must use `multi2vec-clip`

## Requirements

To search using an input image, you must:
* Configure Weaviate with an image vectorizer module (`img2vec-neural` or `multi2vec-clip`), and
* Configure the target class to use the image vectorizer module

<details>
  <summary>How do I <strong>configure Weaviate</strong> with an image vectorizer module?</summary>

You must enable the desired vectorizer module and specify the inference API address in the relevant Docker Compose file (e.g. `docker-compose.yml`). You can generate this file using the [Weaviate configuration tool](../installation/docker-compose.md#configurator).

An example `img2vec-neural` configuration is shown below:

```yaml
services:
  weaviate:
    environment:
      IMAGE_INFERENCE_API: "http://i2v-neural:8080"
      DEFAULT_VECTORIZER_MODULE: 'img2vec-neural'
      ENABLE_MODULES: 'img2vec-neural'
  i2v-neural:
    image: semitechnologies/img2vec-pytorch:resnet50
```

And an example `multi2vec-clip` configuration is shown below:

```yaml
services:
  weaviate:
    environment:
      CLIP_INFERENCE_API: 'http://multi2vec-clip:8080'
      DEFAULT_VECTORIZER_MODULE: 'multi2vec-clip'
      ENABLE_MODULES: 'multi2vec-clip'
  multi2vec-clip:
    image: semitechnologies/multi2vec-clip:sentence-transformers-clip-ViT-B-32-multilingual-v1
    environment:
      ENABLE_CUDA: '0'
```

</details>

<details>
  <summary>How do I <strong>configure the target class</strong> with the image vectorizer module?</summary>

You must configure the target class to:
- Ensure that the target class is configured to use the image vectorizer module, such as by explicitly setting it as the vectorizer for the class. And
- Specify in the `imageFields` property the [blob](../config-refs/datatypes.md#datatype-blob) field(s) that will store the images.

For using `img2vec-neural`, an example class definition may look as follows:

```json
{
  "classes": [
    {
      "class": "ImageExample",
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
        }
      ],
      "vectorizer": "img2vec-neural"
    }
  ]
}
```

For using `multi2vec-clip`, an example class definition may look as follows:

```json
{
  "classes": [
    {
      "class": "ClipExample",
      "moduleConfig": {
        "multi2vec-clip": {
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
          "name": "image"
        }
      ],
      "vectorizer": "multi2vec-clip"
    }
  ]
}
```

Note that for the [multi2vec-clip vectorizer module](../modules/retriever-vectorizer-modules/multi2vec-clip.md), there are additional settings available such as how to balance text and image-derived vectors.

</details>

:::info For more detail
See the relevant module page for:
- [img2vec-neural](../modules/retriever-vectorizer-modules/img2vec-neural.md)
- [multi2vec-clip](../modules/retriever-vectorizer-modules/multi2vec-clip.md)
- [multi2vec-bind](../modules/retriever-vectorizer-modules/multi2vec-bind.md)
:::

## base64 nearImage search

You can find similar images by performing a [`nearImage`](../modules/retriever-vectorizer-modules/img2vec-neural.md#nearimage-search) search for the based64-encoded representation of the image.

You can obtain this representation (a long string) as below:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START helper base64 functions"
      endMarker="# END helper base64 functions"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START helper base64 functions"
      endMarker="# END helper base64 functions"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START helper base64 functions"
      endMarker="// END helper base64 functions"
      language="ts"
    />
  </TabItem>

  <TabItem value="curl" label="Shell">

  ```shell
  base64 -i Corgi.jpg
  ```

  </TabItem>
</Tabs>

Then, you can search for similar images as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START search with base64"
      endMarker="# END search with base64"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START search with base64"
      endMarker="# END search with base64"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START search with base64"
      endMarker="// END search with base64"
      language="ts"
    />
  </TabItem>
</Tabs>


<details>
  <summary>Example response</summary>

  <FilteredTextBlock
    text={PyCode}
    startMarker="# START Expected base64 results"
    endMarker="# END Expected base64 results"
    language="json"
  />

</details>


## Specify image by filename

If your target image is stored in a file, you can [use the Python client to search for the image](https://weaviate-python-client.readthedocs.io/en/stable/weaviate.gql.html#weaviate.gql.get.GetBuilder.with_near_image) by its filename.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ImageFileSearch"
      endMarker="# END ImageFileSearch"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START ImageFileSearch"
      endMarker="# END ImageFileSearch"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">

  > Not available yet. Vote for the [feature request](https://github.com/weaviate/typescript-client/issues/65). DYI code below.

  <FilteredTextBlock
    text={TSCode}
    startMarker="// START ImageFileSearch"
    endMarker="// END ImageFileSearch"
    language="ts"
  />

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  <FilteredTextBlock
    text={PyCode}
    startMarker="# START Expected base64 results"
    endMarker="# END Expected base64 results"
    language="json"
  />

</details>

## Distance threshold

You can set a threshold for similarity search by setting a maximum `distance`. The distance indicates how dissimilar two images are.
The syntax is the same as for [the other `nearXXX` operators](./similarity.md#distance-threshold).

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START Distance"
      endMarker="# END Distance"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START Distance"
      endMarker="# END Distance"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">

  > Not available yet. Vote for the [feature request](https://github.com/weaviate/typescript-client/issues/65). DYI code below.

  <FilteredTextBlock
    text={TSCode}
    startMarker="// START Distance"
    endMarker="// END Distance"
    language="ts"
  />

  </TabItem>
</Tabs>


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
