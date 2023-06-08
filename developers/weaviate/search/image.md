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
import TSCode from '!!raw-loader!/_includes/code/howto/search.image.ts';

## Overview

This page covers additional, unique aspects related to similarity searches using an image as an input.

If you wish to search for images using a vector or another object, please refer to the [How-to: similarity search ](./similarity.md) page.

:::info Not available in WCS
Image-based search is currently not available in WCS, as the required modules are not available.
:::

### Target object types

To search using an image as an input, you must use the `img2vec-neural` or the `multi2vec-clip` vectorizer module. More specifically:
- To find similar images, you can use `img2vec-neural` or `multi2vec-clip`
- To find related text and image objects (i.e. for multi-modal search), you must use `multi2vec-clip`

## Requirements

To search using an images, you must:
* configure Weaviate with image vectorizer module (`img2vec-neural` or `multi2vec-clip`),
* configure the target class by specifying the vectorizer module, and the [image field(s)](../modules/retriever-vectorizer-modules/img2vec-neural.md#schema-configuration) for the module

:::info Related pages
- [img2vec-neural vectorizer module](../modules/retriever-vectorizer-modules/img2vec-neural.md)
- [multi2vec-clip vectorizer module](../modules/retriever-vectorizer-modules/multi2vec-clip.md)
:::

<details>
  <summary>How do I configure Weaviate with an image vectorizer module?</summary>

You must enable the desired vectorizer module and specify the inference API address in the relevant configuration file (e.g. `docker-compose.yml`). 

For example, to enable the `multi2vec-clip` module, configure it as follows:

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

And 


</details>

<details>
  <summary>How do I configure the vectorizer module with an Image field?</summary>

Add 

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-transformers,multi2vec-clip'
```

</details>

## base64 nearImage search

You can find similar images by performing a [`nearImage`](../modules/retriever-vectorizer-modules/img2vec-neural.md#nearimage-search) search for the based64-encoded representation of the image. 

You can obtain this representation (a long string) as below:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">

  ```python
  base64_string = base64.b64encode(content).decode('utf-8')  # standard library module
  ```
  </TabItem>
  <TabItem value="js" label="TypeScript">

  ```typescript
  base64String = content.toString('base64');
  ```
  </TabItem>
  <TabItem value="curl" label="Shell">

  ```shell
  base64 -i Corgi.jpg
  ```
  </TabItem>
</Tabs>


Then, you can search for similar images as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# base64 START"
      endMarker="# base64 END"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// base64 START"
      endMarker="// base64 END"
      language="ts"
    />
  </TabItem>
</Tabs>


<details>
  <summary>Example response</summary>

  <FilteredTextBlock
    text={PyCode}
    startMarker="# Expected base64 results START"
    endMarker="# Expected base64 results END"
    language="json"
  />

</details>


## Specify image by filename

If your target image is stored in a file, you can [use the Python client to search for the image](https://weaviate-python-client.readthedocs.io/en/stable/weaviate.gql.html#weaviate.gql.get.GetBuilder.with_near_image) by its filename.

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# ImageFileSearch START"
      endMarker="# ImageFileSearch END"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="TypeScript">

  > Not available yet. Vote for the [feature request](https://github.com/weaviate/typescript-client/issues/65).

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  <FilteredTextBlock
    text={PyCode}
    startMarker="# Expected base64 results START"
    endMarker="# Expected base64 results END"
    language="json"
  />

</details>

[//]: # (## Distance threshold)

[//]: # ()
[//]: # (You can set a threshold for similarity search by setting a maximum `distance`. The distance indicates how dissimilar two images are.)

[//]: # ()
[//]: # (<Tabs groupId="languages">)

[//]: # (  <TabItem value="py" label="Python">)

[//]: # (    <FilteredTextBlock)

[//]: # (      text={PyCode})

[//]: # (      startMarker="# Distance START")

[//]: # (      endMarker="# Distance END")

[//]: # (      language="py")

[//]: # (    />)

[//]: # (  </TabItem>)

[//]: # ()
[//]: # (  <TabItem value="js" label="TypeScript">)

[//]: # (    <FilteredTextBlock)

[//]: # (      text={TSCode})

[//]: # (      startMarker="// Distance START")

[//]: # (      endMarker="// Distance END")

[//]: # (      language="ts")

[//]: # (    />)

[//]: # (  </TabItem>)

[//]: # (</Tabs>)

[//]: # ()
[//]: # ()
[//]: # (<details>)

[//]: # (  <summary>Example response</summary>)

[//]: # ()
[//]: # (  <FilteredTextBlock)

[//]: # (    text={PyCode})

[//]: # (    startMarker="# Expected Distance results START")

[//]: # (    endMarker="# Expected Distance results END")

[//]: # (    language="json")

[//]: # (  />)

[//]: # ()
[//]: # (</details>)

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
