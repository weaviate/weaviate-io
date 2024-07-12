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

Object properties in Weaviate are indexed and searchable. The rangeable index is a efficient way to search ranges of data that are stored as 64 bit numbers. This includes the `int`, `number` and `date` types. It does not include arrays of these data types, only the basic data types.

The [inverted-index](/developers/weaviate/more-resources/performance#inverted-index) is well suited for key-word search, use the rangeable index instead when you want to filter properties using comparison operators like  `GreaterThan`, `GreaterThanEqual`, `LessThan`, and `LessThanEqual`.

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
