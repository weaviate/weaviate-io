---
title: Vector index overview
sidebar_position: 10
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

[Configure an HNSW index](/developers/weaviate/configuration/indexing/hnsw-indexes.md).

See also:

 - [HNSW index parameters](/developers/weaviate/config-refs/schema/vector-index#hnsw-index-parameters)

## Flat indexes

import FlatIntro from '/_includes/indexes/flat-intro.mdx';

<FlatIntro/>

[Configure a flat index](/developers/weaviate/configuration/indexing/flat-indexes.md).

See also:

- [Flat index parameters](/developers/weaviate/config-refs/schema/vector-index#flat-indexes)

## Dynamic indexes

import DynamicIntro from '/_includes/indexes/dynamic-intro.mdx';

<DynamicIntro/>

Dynamic indexes require [asynchronous indexing](/developers/weaviate/config-refs/schema/vector-index#asynchronous-indexing). Enable asynchronous indexing before you configure a collection to use dynamic indexing.

[Configure a dynamic index](/developers/weaviate/configuration/indexing/dynamic-indexes.md).

See also:

- [Dynamic index parameters](/developers/weaviate/config-refs/schema/vector-index#dynamic-index-parameters)

## Multiple named vectors

Items in a collection can have multiple named vectors. Each named vectors has it's own vector index. These vector indexes can be configured independently.

Configure a collection to use named vectors:

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

See also:

- [Multiple named vectors](/developers/weaviate/config-refs/schema/multi-vector)

## Compression

import IndexCompression from '/_includes/indexes/index-compression.mdx';

<IndexCompression/>

## Asynchronous indexing

import AsynchIndexing from '/_includes/indexes/async-indexing.mdx';

<AsynchIndexing/>

## Related pages

- [Indexes overview](/developers/weaviate/starter-guides/managing-resources/indexing)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>