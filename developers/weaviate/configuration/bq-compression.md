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
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/bq-compression-v3.py';
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

Each collection can be configured to use BQ compression. BQ must be enabled at collection creation time, before data is added to it.

This can be done by setting the `vector index config` of the collection to enable BQ compression.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
      <FilteredTextBlock
        text={PyCode}
        startMarker="# START DownloadData"
        endMarker="# END DownloadData"
        language="py"
      />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
      <FilteredTextBlock
        text={PyCodeV3}
        startMarker="# START EnableBQ"
        endMarker="# END EnableBQ"
        language="py"
      />
  </TabItem>

  <TabItem value="ts" label="JavaScript/TypeScript">
      <FilteredTextBlock
        text={TSCode}
        startMarker="// START FetchData"
        endMarker="// END FetchData"
        language="ts"
      />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START DownloadData"
      endMarker="// END DownloadData"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START DownloadData"
      endMarker="// END DownloadData"
      language="java"
    />
  </TabItem>
</Tabs>


## Set BQ parameters

The following parameters are available for BQ compression, under `vectorIndexConfig:bq`:

| Parameter | Type | Default | Details |
| :-- | :-- | :-- | :-- |
| `enabled` | boolean | `false` | Enable BQ. Weaviate uses binary quantization (BQ) compression when `true`. |
| `rescoreLimit` | integer | -1 | The minimum number of candidates to fetch before rescoring. |
| `cache` | boolean | `false` | Whether to use the vector cache. |

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
      <FilteredTextBlock
        text={PyCode}
        startMarker="# START DownloadData"
        endMarker="# END DownloadData"
        language="py"
      />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
      <FilteredTextBlock
        text={PyCodeV3}
        startMarker="# START EnableBQ"
        endMarker="# END EnableBQ"
        language="py"
      />
  </TabItem>

  <TabItem value="ts" label="JavaScript/TypeScript">
      <FilteredTextBlock
        text={TSCode}
        startMarker="// START FetchData"
        endMarker="// END FetchData"
        language="ts"
      />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START DownloadData"
      endMarker="// END DownloadData"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START DownloadData"
      endMarker="// END DownloadData"
      language="java"
    />
  </TabItem>
</Tabs>


## Related pages

- [Configuration: Vector index](../config-refs/schema/vector-index.md)
- [Concepts: Vector index](../concepts/vector-index.md)
- [Tutorial: Schema](../tutorials/schema.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
