---
title: Multiple target vectors
sidebar_position: 50
image: og/docs/howto.jpg
# tags: ['how to', 'hybrid search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.hybrid.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.hybrid-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.hybrid.ts';
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/search.hybrid-v2.ts';

`Multi target vector` uses a single query to search multiple target vectors. The results are combined automatically.

The [fusion method](#change-the-fusion-method) and the [relative weights](#balance-keyword-and-vector-search) are configurable.

## Multi target vector search

Combine the results of a vector search and a keyword search. The search uses a single query string.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCode}
  startMarker="# HybridBasicPython"
  endMarker="# END HybridBasicPython"
  language="python"
/>
</TabItem>

<TabItem value="py3" label="Python Client v3">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridBasicPython"
  endMarker="# END HybridBasicPython"
  language="python"
/>
</TabItem>

<TabItem value="js" label="JS/TS Client v3">
<FilteredTextBlock
  text={TSCode}
  startMarker="// searchHybridBasic"
  endMarker="// END searchHybridBasic"
  language="js"
/>
</TabItem>

<TabItem value="js2" label="JS/TS Client v2">
<FilteredTextBlock
  text={TSCodeLegacy}
  startMarker="// searchHybridBasic"
  endMarker="// END searchHybridBasic"
  language="js"
/>
</TabItem>

<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridBasicGraphQL"
  endMarker="# END HybridBasicGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridBasic results"
  endMarker="# END Expected HybridBasic results"
  language="json"
/>

</details>

## Related pages

- [Connect to Weaviate](/developers/weaviate/connections/index.mdx)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
