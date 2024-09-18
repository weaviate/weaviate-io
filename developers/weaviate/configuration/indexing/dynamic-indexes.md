---
title: Dynamic indexes
sidebar_position: 30
image: og/docs/indexes.jpg
# tags: ['configuration']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCodeV4 from '!!raw-loader!/_includes/code/howto/indexes/indexes-dynamic-v4.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/indexes/indexes-dynamic-v3.py';
import TSCodeV3 from '!!raw-loader!/_includes/code/howto/indexes/indexes-dynamic-v3.ts';
import TSCodeV2 from '!!raw-loader!/_includes/code/howto/indexes/indexes-dynamic-v2.ts';

import DynamicIntro from '/_includes/indexes/dynamic-intro.mdx';

<DynamicIntro/>

Dynamic indexes require [asynchronous indexing](/developers/weaviate/config-refs/schema/vector-index#asynchronous-indexing). Enable asynchronous indexing before you configure a collection to use dynamic indexing.

import ConsiderComp from '/_includes/indexes/consider-compression.mdx';

<ConsiderComp/>

## Enable dynamic indexes

Enable a dynamic index that uses default parameters for the dynamic, HNSW, and flat indexes:

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

## Configure dynamic indexes

Configure the dynamic, HNSW, and flat indexes:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START ConfigDynamic"
      endMarker="# END ConfigDynamic"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START ConfigDynamic"
        endMarker="# END ConfigDynamic"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START ConfigDynamic"
        endMarker="// END ConfigDynamic"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START ConfigDynamic"
        endMarker="// END ConfigDynamic"
        language="js"
    />
  </TabItem>
</Tabs>

See also:

- [Dynamic index parameters](/developers/weaviate/config-refs/schema/vector-index#dynamic-index-parameters)

## Asynchronous indexing

import AsynchIndexing from '/_includes/indexes/async-indexing.mdx';

<AsynchIndexing/>

## Related pages

- [Indexes overview](/developers/weaviate/starter-guides/managing-resources/indexing)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>