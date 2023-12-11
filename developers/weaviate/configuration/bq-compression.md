---
title: BQ vector compression
sidebar_position: 6
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'bq']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/pq-compression.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/pq-compression-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/pq-compression.ts';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/pq-compression.java';
import GoCode from '!!raw-loader!/_includes/code/howto/pq-compression.go';

:::info Added in `v1.23`
:::

Binary quantization (BQ) is a technique that reduces the size of a vector index. BQ is available for the `flat` index type.

<details>
  <summary>Additional information</summary>

- How to [set the index type](../manage-data/collections.mdx#ve)

</details>

## Enable BQ compression

Each collection can be configured to use BQ compression. This can be done by setting the `vector index config` of the collection to enable BQ compression.

:::warning
TODO - ADD code
:::



