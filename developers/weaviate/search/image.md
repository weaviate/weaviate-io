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


## By local image path

If your query image is stored in a file, you can use the client library to search by its filename.

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


## By the base64 representation

You can search by a base64 representation of an image:

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

## Create a base64 representation of an online image.

You can create a base64 representation of an online image, and use it as input for similarity search [as shown above](#by-the-base64-representation).

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
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
      language="js"
    />
  </TabItem>
</Tabs>


## Combination with other operators

A `nearImage` search can be combined with any other operators, just as other similarity search operators such as `nearText` or `nearVector` can.

See the [`similarity search`](./similarity.md) page for more details.

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
