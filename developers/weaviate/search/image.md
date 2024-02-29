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
import SimilarityPyCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import SimilarityPyCodeV3 from '!!raw-loader!/_includes/code/howto/search.similarity-v3.py';
import SimilarityTSCode from '!!raw-loader!/_includes/code/howto/search.similarity.ts';

`Image` search uses an **image as a search input** to perform vector similarity search.

<details>
  <summary>
    Additional information
  </summary>

**Configure image search**

To use images as search inputs, configure an image vectorizer [module](../configuration/modules.md) for your collection.

For details, see the modules reference page:

- [img2vec-neural](/developers/weaviate/modules/retriever-vectorizer-modules/img2vec-neural.md)
- [multi2vec-clip](/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip.md)
- [multi2vec-bind](/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-bind.md)

</details>

## Named vectors

:::info Added in `v1.24`
:::

Any vector-based search on collections with [named vectors](../config-refs/schema/multi-vector.md) configured must include a `target` vector name in the query. This allows Weaviate to find the correct vector to compare with the query vector.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={SimilarityPyCode}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={SimilarityPyCodeV3}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={SimilarityTSCode}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={SimilarityPyCodeV3}
      startMarker="# NamedVectorNearTextGraphql"
      endMarker="# END NamedVectorNearTextGraphql"
      language="graphql"
    />
  </TabItem>
</Tabs>

## By local image path

Use the `Near Image` operator to execute image search.<br/>
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

A `Near Image` search can be combined with any other operators (like filter, limit, etc.), just as other similarity search operators.

See the [`similarity search`](./similarity.md) page for more details.

## Related pages

- [Connect to Weaviate](/developers/weaviate/tutorials/connect.mdx)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
