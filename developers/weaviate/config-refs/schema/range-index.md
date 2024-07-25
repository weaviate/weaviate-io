---
title: Rangeable indexes
sidebar_position: 50
image: og/docs/configuration.jpg
# tags: ['configuration', 'vector index']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

import PyCodeV4 from '!!raw-loader!/_includes/code/indexes/indexes-v4.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/indexes/indexes-v3.py';
import TSCodeV3 from '!!raw-loader!/_includes/code/indexes/indexes-v3.ts';
import TSCodeV2 from '!!raw-loader!/_includes/code/indexes/indexes-v2.ts';

:::info Added in 1.26

:::

Object properties in Weaviate can be indexed for faster filtering. The rangeable index is an efficient way to filter by numerical ranges of data. This is particularly advantageous for properties housing high-cardinality numerical data.

The rangeable index is available `int`, `number`, or `date` properties. The index is not available for arrays of these data types.

Enable the rangeable index when you want to filter properties using comparison operators like  `GreaterThan`, `GreaterThanEqual`, `LessThan`, and `LessThanEqual`.

## Define a rangeable index

Configure the index when you define your [collection properties](/developers/weaviate/manage-data/collections#property-level-settings).

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
</Tabs>

## Considerations

- **Default value** The default value of `indexRangeFilters` is `false`. In contrast, `indexSearchable` and `indexFilterable` both default to `true`.

- **Filterable index compatibility** `indexRangeFilters` and `indexFilterable` can be used together or independently.

    - If only one of `indexRangeFilters` or `indexFilterable` is set to `true`, the respective index is used for filtering.
    - If both are set to `true`, the `indexRangeFilters` is used for operations involving comparison operators, and `indexFilterable` is used for equality and inequality operations.

  This chart shows which filter makes the comparison when one or both index type is `true` for a property.

  | Operator | `indexRangeFilters` only | `indexFilterable` only | Range and  `indexFilterable` |
  | :- | :- | :- | :- |
  | Equal | Range | Filter | Filter |
  | Not equal | Range | Filter | Filter |
  | Greater than | Range | Filter | Range |
  | Greater than equal | Range | Filter | Range |
  | Less than | Range | Filter | Range |
  | Less than equal | Range | Filter | Range |

- **Implementation** Internally, rangeable indexes are implemented as [roaring bitmap slices](https://www.featurebase.com/blog/range-encoded-bitmaps). This data structure limits the index to values that can be stored as 64 bit integers.

- **Availability** This feature is only available for new properties. Existing properties cannot be converted to use the rangeable index.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
