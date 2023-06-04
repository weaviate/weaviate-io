---
title: Image search
sidebar_position: 100
image: og/docs/howto.jpg
# tags: ['how to', 'image']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.image.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.image.ts';

## Overview

This page shows you how to search for similar images in Weaviate.


## Requirements

To search for similar images, you must
* have installed the `img2vec-neural` module in the Weaviate cluster
* have configured a class in the schema to use the `img2vec-neural` vectorizer
* have defined the [image field(s)](../modules/retriever-vectorizer-modules/img2vec-neural.md#schema-configuration) in the module configuration
* prepare an image to search for, OR
  * a based64 representation of an image

:::info Related pages
- [img2vec-neural vectorizer module](../modules/retriever-vectorizer-modules/img2vec-neural.md)
:::


## base64 nearImage search

The most general way to search for similar images is to perform a [`nearImage`](../modules/retriever-vectorizer-modules/img2vec-neural.md#nearimage-search) search for the based64-encoded representation of the image. You can obtain this representation (a long string) using various programming language library functions or operating system commands:

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


Once you have this base64-encoded representation of the image, you can search for similar images as follows:

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

If your target image is stored in a file, the Python client offers a [convenience method to search for the image](https://weaviate-python-client.readthedocs.io/en/stable/weaviate.gql.html#weaviate.gql.get.GetBuilder.with_near_image) by simply passing its filename. The client will read the file and do the base64 conversion automatically:

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


## Distance threshold

You can set a threshold for similarity search by setting a maximum `distance`. The distance indicates how dissimilar two images are.

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# Distance START"
      endMarker="# Distance END"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// Distance START"
      endMarker="// Distance END"
      language="ts"
    />
  </TabItem>
</Tabs>


<details>
  <summary>Example response</summary>

  <FilteredTextBlock
    text={PyCode}
    startMarker="# Expected Distance results START"
    endMarker="# Expected Distance results END"
    language="json"
  />

</details>

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
