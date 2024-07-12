---
title: Rangeable indexes
sidebar_position: 50
image: og/docs/configuration.jpg
# tags: ['configuration', 'vector index']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

import PyCode from '!!raw-loader!/_includes/code/config/multi-vector-examples.py';

:::info Added in 1.26

:::

Object properties in Weaviate are indexed and searchable. The rangeable index is a efficient way to search ranges of data.

The rangeable index is available for data that is stored as an `int`, `number`, or `date` type. It is not available for arrays of these data types or for `floats`.

Internally, rangeable is implemented as a [roaring bitmap slice](https://www.featurebase.com/blog/range-encoded-bitmaps). This data structure limits the index to values that can be stored as 64 bit integers.

Use the rangeable index instead when you want to filter properties using comparison operators like  `GreaterThan`, `GreaterThanEqual`, `LessThan`, and `LessThanEqual`. For keyword-search, the [inverted-index](/developers/weaviate/more-resources/performance#inverted-index) is a better choice.

## Define a rangeable index

Configure the index when you define your [collection properties](/developers/weaviate/manage-data/collections#property-level-settings).

<FilteredTextBlock
  text={PyCode}
  startMarker="# START LoadDataNamedVectors"
  endMarker="# END LoadDataNamedVectors"
  language="py"
/>

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
