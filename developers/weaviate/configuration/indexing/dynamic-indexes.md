---
title: Dynamic indexes
sidebar_position: 30
image: og/docs/indexes.jpg
# tags: ['configuration']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCodeV4 from '!!raw-loader!/_includes/code/howto/indexes/indexes-v4.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/indexes/indexes-v3.py';
import TSCodeV3 from '!!raw-loader!/_includes/code/howto/indexes/indexes-v3.ts';
import TSCodeV2 from '!!raw-loader!/_includes/code/howto/indexes/indexes-v2.ts';

import VectorIntro from '/_includes/indexes/vector-intro.mdx';

<VectorIntro/>

HNSW indexes are the default index type. If your collection has more than 10,000 objects, you should use an HNSW index. A flat index works best for smaller collections. Collections that start small and grow beyond 10,000 objects should consider a dynamic index.

When you configure your indexes, consider using [compression](#compression) to manage resource usage. Some compression methods have to be enabled when you create your collection.

## HNSW indexes

import HNSWIntro from '/_includes/indexes/hnsw-intro.mdx';

<HNSWIntro/>

### Collection configuration

Configure an HNSW index for a collection:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START EnableHNSW"
      endMarker="# END EnableHNSW"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START EnableHNSW"
        endMarker="# END EnableHNSW"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START EnableHNSW"
        endMarker="// END EnableHNSW"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START EnableHNSW"
        endMarker="// END EnableHNSW"
        language="js"
    />
  </TabItem>
</Tabs>

See also:

 - [HNSW index parameters](/developers/weaviate/config-refs/schema/vector-index#hnsw-index-parameters)

## Flat indexes

import FlatIntro from '/_includes/indexes/flat-intro.mdx';

<FlatIntro/>

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START EnableFlat"
      endMarker="# END EnableFlat"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START EnableFlat"
        endMarker="# END EnableFlat"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START EnableFlat"
        endMarker="// END EnableFlat"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START EnableFlat"
        endMarker="// END EnableFlat"
        language="js"
    />
  </TabItem>
</Tabs>

See also:

- [Flat index parameters](/developers/weaviate/config-refs/schema/vector-index#flat-indexes)

## Dynamic indexes

import DynamicIntro from '/_includes/indexes/dynamic-intro.mdx';

<DynamicIntro/>

Dynamic indexes require [asynchronous indexing](/developers/weaviate/config-refs/schema/vector-index#asynchronous-indexing). Enable asynchronous indexing before you configure a collection to use dynamic indexing.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START EnableDynamic"
      endMarker="# END EnableDynamic"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START EnableDynamic"
        endMarker="# END EnableDynamic"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START EnableDynamic"
        endMarker="// END EnableDynamic"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START EnableDynamic"
        endMarker="// END EnableDynamic"
        language="js"
    />
  </TabItem>
</Tabs>

See also:

- [Dynamic index parameters](/developers/weaviate/config-refs/schema/vector-index#dynamic-index-parameters)

## Multiple named vectors

Configure a collection to use [multiple named vectors](/developers/weaviate/config-refs/schema/multi-vector):

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START EnableMulti"
      endMarker="# END EnableMulti"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START EnableMulti"
        endMarker="# END EnableMulti"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START EnableMulti"
        endMarker="// END EnableMulti"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START EnableMulti"
        endMarker="// END EnableMulti"
        language="js"
    />
  </TabItem>
</Tabs>

## Additional considerations

These are some additional things to consider when you configure indexing.

### Compression

Vector indexes can be large. Compressed vectors lose some information, but they use fewer resources and can be very cost effective. In most cases the resource savings significantly outweigh the slight loss in performance.

Weaviate provides these compression methods:

import CompressMethods from '/_includes/configuration/compression-methods.mdx';

<CompressMethods/>

See also:

- [Compression overview](/developers/weaviate/starter-guides/managing-resources/compression)
- [Enable compression](/developers/weaviate/configuration/compression)

### Asynchronous indexing

Asynchronous indexing is a prerequisite for dynamic indexing and [AutoPQ](/developers/weaviate/configuration/compression/pq-compression#configure-autopq).

import EnableAsynch from '/_includes/indexes/enable-async.mdx';

<EnableAsynch/>

### Availability levels

## Related pages
- [Indexes overview](/developers/weaviate/starter-guides/managing-resources/indexing)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>