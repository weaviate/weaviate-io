---
title: Flat indexes
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

import FlatIntro from '/_includes/indexes/flat-intro.mdx';

<FlatIntro/>

import ConsiderComp from '/_includes/indexes/consider-compression.mdx';

<ConsiderComp/>

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCodeV4}
      startMarker="# START EnableFlat"
      endMarker="# END EnableFlat"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
        startMarker="# START EnableFlat"
        endMarker="# END EnableFlat"
        language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeV3}
        startMarker="// START EnableFlat"
        endMarker="// END EnableFlat"
        language="js"
    />
  </TabItem>
  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeV2}
        startMarker="// START EnableFlat"
        endMarker="// END EnableFlat"
        language="js"
    />
  </TabItem>
</Tabs>

See also:

- [Flat index parameters](/developers/weaviate/config-refs/schema/vector-index#flat-indexes)

## Compression

import IndexCompression from '/_includes/indexes/index-compression.mdx';

<IndexCompression/>

## Related pages

- [Indexes overview](/developers/weaviate/starter-guides/managing-resources/indexing)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>