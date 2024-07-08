---
title: Scalar Quantization
sidebar_position: 25
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'bq']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/configure.bq-compression.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/configure.bq-compression-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/configure.bq-compression.ts';
import TSCodeBQOptions from '!!raw-loader!/_includes/code/howto/configure.bq-compression.options.ts';
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/configure.bq-compression-v2.ts';
import GoCode from '!!raw-loader!/_includes/code/howto/configure.bq-compression.go';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/bq-compression.java';

:::info Added in `v1.23`
BQ is available for the [`flat` index](../concepts/vector-index.md#flat-index) type from `v1.23` onwards and for the [`hnsw` index](../concepts/vector-index.md#hnsw-index)  type from `v1.24`.
:::

Binary quantization (BQ) is a vector compression technique that can reduce the size of a vector.

To use BQ, enable it as shown below and add data to the collection.

<details>
  <summary>Additional information</summary>

- How to [set the index type](../manage-data/collections.mdx#ve)

</details>


## Simple BQ configuration

Each collection can be configured to use BQ compression. BQ must be enabled at collection creation time, before data is added to it.

This can be done by setting the `vector_index_config` of the collection to enable BQ compression.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
      <FilteredTextBlock
        text={PyCode}
        startMarker="# START EnableBQ"
        endMarker="# END EnableBQ"
        language="py"
      />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
      <FilteredTextBlock
        text={PyCodeV3}
        startMarker="# START EnableBQ"
        endMarker="# END EnableBQ"
        language="py"
      />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
      <FilteredTextBlock
        text={TSCode}
        startMarker="// START EnableBQ"
        endMarker="// END EnableBQ"
        language="ts"
      />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
      <FilteredTextBlock
        text={TSCodeLegacy}
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
  <TabItem value="py" label="Python Client v4">
      <FilteredTextBlock
        text={PyCode}
        startMarker="# START BQWithOptions"
        endMarker="# END BQWithOptions"
        language="py"
      />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
      <FilteredTextBlock
        text={PyCodeV3}
        startMarker="# START BQWithOptions"
        endMarker="# END BQWithOptions"
        language="py"
      />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
      <FilteredTextBlock
        text={TSCodeBQOptions}
        startMarker="// START BQWithOptions"
        endMarker="// END BQWithOptions"
        language="ts"
      />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
      <FilteredTextBlock
        text={TSCodeLegacy}
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
- [Concepts: Vector quantization](../concepts/vector-quantization.md)
- [Tutorial: Schema](/developers/weaviate/starter-guides/schema)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
