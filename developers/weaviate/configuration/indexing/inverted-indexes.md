---
title: Inverted indexes
sidebar_position: 20
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

Properties use an [inverted indexes](/developers/weaviate/concepts/indexing#inverted-indexes), also known as keyword indexes, to make property searches more efficient. Weaviate provides different kinds to inverted index so you can match better match the index to your data:

- [indexSearchable](#indexSearchable)
- [indexFilterable](#indexfilterable)
- [indexRangeFilters](#indexrangefilters)

Use these indexes to improve your searches.

## indexSearchable

The `indexSearchable` index improves property search times. This index is enabled by default. [Keyword search](/developers/weaviate/search/bm25) and [hybrid search](/developers/weaviate/search/hybrid) use this index.

If you don't anticipate searching on a property field, you can disable this index to save disk space and import time. The property is still searchable. The search is just less efficient.

## indexFilterable

The `indexFilterable` index improves [filtering](/developers/weaviate/search/filters). This index is enabled by default.

If you don't anticipate searching on a property field, you can disable this index to save disk space and import time. The property is still filterable.

## indexRangeFilters
The `indexRangeFilters` is a range-based index for filtering by [numerical ranges](/developers/weaviate/release-notes/release_1_26#improved-range-queries). This index is not enabled by default.

## Configuration example

Set these indexes on the property level.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START PropIndex"
      endMarker="# END PropIndex"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START PropIndex"
        endMarker="# END PropIndex"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START PropIndex"
        endMarker="// END PropIndex"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START PropIndex"
        endMarker="// END PropIndex"
        language="js"
    />
  </TabItem>
</Tabs>


## Related pages
- [Indexes overview](/developers/weaviate/starter-guides/managing-resources/indexing)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>