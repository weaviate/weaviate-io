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

[Scalar quantization (SQ)](/developers/weaviate/concepts/vector-quantization#scalar-quantization) is a vector compression technique that can reduce the size of a vector.

To use SQ, enable it in the collection definition, then add data to the collection.

## Basic configuration

SQ must be enabled at collection creation time. You cannot enable SQ after you add data to a collection.

To enable SQ, set `vector_index_config`.

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


## Custom configuration

To tune SQ, set these `vectorIndexConfig` parameters.

| Parameter | Type | Default | Details |
| :-- | :-- | :-- | :-- |
| `sq` : `enabled` | boolean | `false` | Uses SQ when `true`.  <br/><br/> The Python client v4 does not use the `enabled` parameter. To enable SQ with the v4 client, set a `quantizer` in the collection definition. |
| `sq` : `rescoreLimit` | integer | -1 | The minimum number of candidates to fetch before rescoring. |
| `sq` : `cache` | boolean | `false` | Use the vector cache when true. |
| `vectorCacheMaxObjects` | integer | `1e12` | Maximum number of objects in the memory cache. By default, this limit is set to one trillion (`1e12`) objects when a new collection is created. For sizing recommendations, see [Vector cache considerations](/developers/weaviate/concepts/vector-index.md#vector-cache-considerations). |


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

Compression must be enabled independently for each vector. The procedure varies slightly by client language, but in each case the idea is the same. Each vector is independent and can use [PQ](/weaviate/configuration/compression/pq-compression.md), [BQ](/weaviate/configuration/compression/bq-compression.md), or no compression.

## Related pages
- [Configuration: Vector index](/developers/weaviate/config-refs/schema/vector-index.md)
- [Concepts: Vector index](/developers/weaviate/concepts/vector-index.md)
- [Concepts: Vector quantization](/developers/weaviate/concepts/vector-quantization.md)
- [Tutorial: Schema](/developers/weaviate/starter-guides/schema)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
