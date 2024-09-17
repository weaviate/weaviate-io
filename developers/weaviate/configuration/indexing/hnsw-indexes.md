---
title: HNSW indexes
sidebar_position: 13
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


import HNSWIntro from '/_includes/indexes/hnsw-intro.mdx';

<HNSWIntro/>

import ConsiderComp from '/_includes/indexes/consider-compression.mdx';

<ConsiderComp/>

## Enable an HNSW index

HNSW is the default vector index. You do not have to explicitly enable HNSW if you want to use the default vector index type.

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

## Configure an HNSW index

Configure an HNSW index for a collection:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START ConfigHNSW"
      endMarker="# END ConfigHNSW"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START ConfigHNSW"
        endMarker="# END ConfigHNSW"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START ConfigHNSW"
        endMarker="// END ConfigHNSW"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START ConfigHNSW"
        endMarker="// END ConfigHNSW"
        language="js"
    />
  </TabItem>
</Tabs>

See also:

 - [HNSW index parameters](/developers/weaviate/config-refs/schema/vector-index#hnsw-index-parameters)

## Multiple named vectors

import MultiNameVec from '/_includes/indexes/multiple-named-vectors.mdx';

<MultiNameVec/>

## Compression

import IndexCompression from '/_includes/indexes/index-compression.mdx';

<IndexCompression/>

### Enable compression

Enable compression on an HNSW index:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START CompressHNSW"
      endMarker="# END CompressHNSW"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START CompressHNSW"
        endMarker="# END CompressHNSW"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START CompressHNSW"
        endMarker="// END CompressHNSW"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START CompressHNSW"
        endMarker="// END CompressHNSW"
        language="js"
    />
  </TabItem>
</Tabs>

## Related pages

- [Indexes overview](/developers/weaviate/starter-guides/managing-resources/indexing)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>