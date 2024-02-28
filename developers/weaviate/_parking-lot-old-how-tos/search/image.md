## Overview

This page covers additional, unique aspects related to similarity searches using an image as an input.

If you wish to search for images using a vector or another object, please refer to the [How-to: similarity search](./similarity.md) page.

:::info Related pages
- [How-to: Similarity search](./similarity.md)
:::


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
    image: cr.weaviate.io/semitechnologies/img2vec-pytorch:resnet50
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
    image: cr.weaviate.io/semitechnologies/multi2vec-clip:sentence-transformers-clip-ViT-B-32-multilingual-v1
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

You can find similar objects with the [`nearImage`](../modules/retriever-vectorizer-modules/img2vec-neural.md#nearimage-search) operator, using the based64-encoded representation as the input.


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

