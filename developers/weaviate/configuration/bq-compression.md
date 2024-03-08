---
title: BQ vector compression
sidebar_position: 6
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'bq']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/bq-compression.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/bq-compression-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/bq-compression.ts';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/bq-compression.java';
import GoCode from '!!raw-loader!/_includes/code/howto/bq-compression.go';

:::info Added in `v1.23`
:::

Binary quantization (BQ) is a technique that reduces the size of a vector index. BQ is available for the `flat` index type from `v1.23` onwards and for the `hnsw` index type from `v1.24`.

To use BQ, enable it as shown below and add data to the collection.

<details>
  <summary>Additional information</summary>

- How to [set the index type](../manage-data/collections.mdx#ve)

</details>


## Simple BQ configuration

Each collection can be configured to use BQ compression. BQ must be enabled at collection creation time, before data is added to it.

This can be done by setting the `vector index config` of the collection to enable BQ compression.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
      <FilteredTextBlock
        text={PyCode}
        startMarker="# START EnableBQ"
        endMarker="# END EnableBQ"
        language="py"
      />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
      <FilteredTextBlock
        text={PyCodeV3}
        startMarker="# START EnableBQ"
        endMarker="# END EnableBQ"
        language="py"
      />
  </TabItem>

  <TabItem value="ts" label="JavaScript/TypeScript">
      <FilteredTextBlock
        text={TSCode}
        startMarker="// START EnableBQ"
        endMarker="// END EnableBQ"
        language="ts"
      />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START EnableBQ"
      endMarker="// END EnableBQ"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START EnableBQ"
      endMarker="// END EnableBQ"
      language="java"
    />
  </TabItem>
</Tabs>


## BQ with custom settings

The following parameters are available for BQ compression, under `vectorIndexConfig`:

| Parameter | Type | Default | Details |
| :-- | :-- | :-- | :-- |
| `bq` : `enabled` | boolean | `false` | Enable BQ. Weaviate uses binary quantization (BQ) compression when `true`.  <br/><br/> The Python client v4 does not use the `enabled` parameter. To enable BQ with the v4 client, set a `quantizer` in the collection definition. |
| `bq` : `rescoreLimit` | integer | -1 | The minimum number of candidates to fetch before rescoring. |
| `bq` : `cache` | boolean | `false` | Whether to use the vector cache. |
| `vectorCacheMaxObjects` | integer | `1e12` | Maximum number of objects in the memory cache. By default, this limit is set to one trillion (`1e12`) objects when a new collection is created. For sizing recommendations, see [Vector cache considerations](../concepts/vector-index.md#vector-cache-considerations). |


For example:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
      <FilteredTextBlock
        text={PyCode}
        startMarker="# START BQWithOptions"
        endMarker="# END BQWithOptions"
        language="py"
      />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
      <FilteredTextBlock
        text={PyCodeV3}
        startMarker="# START BQWithOptions"
        endMarker="# END BQWithOptions"
        language="py"
      />
  </TabItem>

  <TabItem value="ts" label="JavaScript/TypeScript">
      <FilteredTextBlock
        text={TSCode}
        startMarker="// START BQWithOptions"
        endMarker="// END BQWithOptions"
        language="ts"
      />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START BQWithOptions"
      endMarker="// END BQWithOptions"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START BQWithOptions"
      endMarker="// END BQWithOptions"
      language="java"
    />
  </TabItem>
</Tabs>

## Multiple vectors

import MultiVectorSupport from '/_includes/multi-vector-support.mdx';

<MultiVectorSupport />

Similarly, compression must be enabled independently for each vector. The procedure varies slightly by client language, but in each case the idea is the same. Each vector is independent and can use [PQ](/weaviate/configuration/pq-compression.md), [BQ](/weaviate/configuration/bq-compression.md), or no compression.

## Related pages

- [Configuration: Vector index](../config-refs/schema/vector-index.md)
- [Concepts: Vector index](../concepts/vector-index.md)
- [Tutorial: Schema](/developers/weaviate/starter-guides/schema)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
