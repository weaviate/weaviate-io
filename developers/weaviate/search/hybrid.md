---
title: Hybrid search
sidebar_position: 30
image: og/docs/howto.jpg
# tags: ['how to', 'perform a hybrid search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.hybrid.py';
import JavaScriptCode from '!!raw-loader!/_includes/code/howto/search.hybrid.ts';

## Overview

This page shows you how to perform `hybrid` searches using Weaviate.

The `hybrid` parameter uses both the `bm25` (i.e. sparse vector) and vector (i.e. dense vector) search algorithms, and combines their outputs to produce results.

The results are determined by a weighted combination of the two search outputs.

:::info Related pages
- [API References: Vector search parameters # Hybrid](../api/graphql/vector-search-parameters.md#hybrid)
:::

import BasicPrereqs from '/_includes/prerequisites-quickstart.md';

<BasicPrereqs />

## Basic hybrid search

To use hybrid search, you must provide a search string as a minimum.

The below example uses default settings, looking for:
- Objects containing the keyword `food` anywhere in the object, and
- Objects most similar to the vector of `food`.

It ranks the results using a combination of the `bm25` and vector search rankings, and returns the top 3.

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridBasicPython"
  endMarker="# END HybridBasicPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchHybridBasic"
  endMarker="// END searchHybridBasic"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridBasicGraphQL"
  endMarker="# END HybridBasicGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected HybridBasic results"
  endMarker="# END Expected HybridBasic results"
  language="json"
/>

</details>


### Score / explainScore

The `score` and `explainScore` sub-properties aim to explain the outputs. They can be retrieved under the `_additional` property.

The below example adds the two properties to the list of retrieved properties.


<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithScorePython"
  endMarker="# END HybridWithScorePython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchHybridWithScore"
  endMarker="// END searchHybridWithScore"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithScoreGraphQL"
  endMarker="# END HybridWithScoreGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected HybridWithScore results"
  endMarker="# END Expected HybridWithScore results"
  language="json"
/>

</details>


## Weight keyword vs vector results

You can use the `alpha` argument to weight the keyword (`bm25`) or vector search results. An `alpha` of `1` is for a pure vector search and `0` is for a pure keyword search. The default is `0.75`.

The following example uses an alpha of `0.25`, favoring keyword search results.

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithAlphaPython"
  endMarker="# END HybridWithAlphaPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchHybridWithAlpha"
  endMarker="// END searchHybridWithAlpha"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithAlphaGraphQL"
  endMarker="# END HybridWithAlphaGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected HybridWithAlpha results"
  endMarker="# END Expected HybridWithAlpha results"
  language="json"
/>

</details>

## Selected properties only

You can specify the object `properties` for the `bm25` portion of the search.

The below example performs a `bm25` search for the keyword `food` in the `question` property only, and combines it with vector search results for `food`.

:::info Why does this not affect the vector search?
This is not possible as doing so will require the entire database to be re-vectorized and re-indexed with the new vectorization options.
:::

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithPropertiesPython"
  endMarker="# END HybridWithPropertiesPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchHybridWithProperties"
  endMarker="// END searchHybridWithProperties"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithPropertiesGraphQL"
  endMarker="# END HybridWithPropertiesGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected HybridWithVector results"
  endMarker="# END Expected HybridWithVector results"
  language="json"
/>

</details>


## With a custom vector

You can provide your own `vector` input to the hybrid query. In this scenario, Weaviate will use the query string for the `bm25` search and the input vector for the vector search.

The below example supplies the vector for "italian food", while using "food" as the query text. Note how the results have now skewed towards Italian food.

<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithVectorPython"
  endMarker="# END HybridWithVectorPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchHybridWithVector"
  endMarker="// END searchHybridWithVector"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithVectorGraphQL"
  endMarker="# END HybridWithVectorGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected HybridWithVector results"
  endMarker="# END Expected HybridWithVector results"
  language="json"
/>

</details>

## Add a conditional (`where`) filter

You can add a conditional filter to any hybrid search query, which will filter the outputs but not impact the ranking.

The below example performs a hybrid search for `food` in any field from objects that have the `round` property of `Double Jeopardy!`, and returns the top 3.


<Tabs groupId="languages">
<TabItem value="py" label="Python">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithFilterPython"
  endMarker="# END HybridWithFilterPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={JavaScriptCode}
  startMarker="// searchHybridWithFilter"
  endMarker="// END searchHybridWithFilter"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PythonCode}
  startMarker="# HybridWithFilterGraphQL"
  endMarker="# END HybridWithFilterGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Expected HybridWithFilter results"
  endMarker="# END Expected HybridWithFilter results"
  language="json"
/>

</details>

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
