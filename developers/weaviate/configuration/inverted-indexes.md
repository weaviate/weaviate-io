---
title: Inverted indexes
sidebar_position: 15
image: og/docs/indexes.jpg
# tags: ['configuration']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCodeV4 from '!!raw-loader!/_includes/code/howto/indexes/indexes-inverted-v4.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/indexes/indexes-inverted-v3.py';
import TSCodeV3 from '!!raw-loader!/_includes/code/howto/indexes/indexes-inverted-v3.ts';
import TSCodeV2 from '!!raw-loader!/_includes/code/howto/indexes/indexes-inverted-v2.ts';

Weaviate uses [inverted indexes](/developers/weaviate/concepts/indexing#inverted-indexes), also known as keyword indexes, to make textual and numeric searches more efficient. Weaviate provides different kinds to inverted index so you can match better match the index to your data.

These indexes are normally configured on a property level:

- [indexSearchable](#indexSearchable)
- [indexFilterable](#indexfilterable)
- [indexRangeFilters](#indexrangefilters)

To tune inverted indexes at the collection level, adjust these configuration settings:

- [BM25 search algorithm](#bm25)
- [indexNullState](#collection-level-properties)
- [indexPropertyLength](#collection-level-properties)
- [indexTimestamps](#collection-level-properties)

## indexSearchable

The `indexSearchable` index improves property search times. This index is enabled by default. [Keyword search](/developers/weaviate/search/bm25) and [hybrid search](/developers/weaviate/search/hybrid) use this index.

If you don't anticipate searching on a property field, you can disable this index to save disk space and import time. The property is still searchable. The search is just less efficient.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START SearchIndex"
      endMarker="# END SearchIndex"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START SearchIndex"
        endMarker="# END SearchIndex"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START SearchIndex"
        endMarker="// END SearchIndex"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START SearchIndex"
        endMarker="// END SearchIndex"
        language="js"
    />
  </TabItem>
</Tabs>

## indexFilterable

The `indexFilterable` index improves [filtering](/developers/weaviate/search/filters). This index is enabled by default.

If you don't anticipate searching on a property field, disable this index to save disk space and import time. The property is still filterable.

Set these indexes on the property level.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START FilterIndex"
      endMarker="# END FilterIndex"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START FilterIndex"
        endMarker="# END FilterIndex"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START FilterIndex"
        endMarker="// END FilterIndex"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START FilterIndex"
        endMarker="// END FilterIndex"
        language="js"
    />
  </TabItem>
</Tabs>

## indexRangeFilters

The `indexRangeFilters` is a range-based index for filtering by [numerical ranges](/developers/weaviate/release-notes/release_1_26#improved-range-queries). This index is not enabled by default.

Set these indexes on the property level.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START RangeIndex"
      endMarker="# END RangeIndex"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START RangeIndex"
        endMarker="# END RangeIndex"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START RangeIndex"
        endMarker="// END RangeIndex"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START RangeIndex"
        endMarker="// END RangeIndex"
        language="js"
    />
  </TabItem>
</Tabs>

## bm25

The [`bm25`](/developers/weaviate/config-refs/schema#bm25) ranking algorithm is configured on the collection level. The BM25 algorithm does not specify values for `b` or `k1`. Use these ["free parameters"](https://en.wikipedia.org/wiki/Free_parameter) to tailor the ranking algorithm for your data.

To adjust for document length, modify `b`. Values range from 0 to 1.

To adjust for word frequency within a document, modify `k1`. Values are usually in the range from 0 to 3. There isn't an upper limit.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START BM25Index"
      endMarker="# END BM25Index"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START BM25Index"
        endMarker="# END BM25Index"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START BM25Index"
        endMarker="// END BM25Index"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START BM25Index"
        endMarker="// END BM25Index"
        language="js"
    />
  </TabItem>
</Tabs>

## Collection level properties

These properties are configured on the collection level.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START CollLevIndex"
      endMarker="# END CollLevIndex"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START CollLevIndex"
        endMarker="# END CollLevIndex"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START CollLevIndex"
        endMarker="// END CollLevIndex"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START CollLevIndex"
        endMarker="// END CollLevIndex"
        language="js"
    />
  </TabItem>
</Tabs>

## Related pages

- [Indexes overview](/developers/weaviate/starter-guides/managing-resources/indexing)
- [Configure vector indexes](/developers/weaviate/configuration/indexing-vector)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>