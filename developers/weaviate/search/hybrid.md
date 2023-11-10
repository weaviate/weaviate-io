---
title: Hybrid search
sidebar_position: 40
image: og/docs/howto.jpg
# tags: ['how to', 'hybrid search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.hybrid.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.hybrid-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.hybrid.ts';

## Overview

This page shows you how to perform `hybrid` searches.

import ClassToCollection from '/_includes/class-to-collection-transition.mdx' ;

<ClassToCollection /> 

## Basic hybrid search

To use hybrid search, you must provide a search string.

This example uses default settings to search. It matches objects in multiple ways.

- If the object contains the keyword `food` anywhere
- If the object's vector is similar to the vector for `food`

Hybrid search ranks the results using a combination of the `bm25` search ranking and the vector search ranking. The query returns the top three results.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# HybridBasicPython"
  endMarker="# END HybridBasicPython"
  language="python"
/>
</TabItem>

<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridBasicPython"
  endMarker="# END HybridBasicPython"
  language="python"
/>
</TabItem>

<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCode}
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

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridBasic results"
  endMarker="# END Expected HybridBasic results"
  language="json"
/>

</details>


### Explain the search results

To understand why particular objects are returned, use the object sub-properties to explain the results. 

To retrieve the sub-properties with one of the legacy clients, use the `_additional` property to specify `score` and `explainScore`. The new Python client returns the information as metadata.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# HybridWithScorePython"
  endMarker="# END HybridWithScorePython"
  language="python"
/>
</TabItem>

<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridWithScorePython"
  endMarker="# END HybridWithScorePython"
  language="python"
/>
</TabItem>

<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCode}
  startMarker="// searchHybridWithScore"
  endMarker="// END searchHybridWithScore"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PyCodeV3}
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
  text={PyCodeV3}
  startMarker="# Expected HybridWithScore results"
  endMarker="# END Expected HybridWithScore results"
  language="json"
/>

</details>


## Limit the results

You can limit the number of results returned by a `hybrid` search,
- to a fixed number, using the `limit: <N>` operator
- to the first N "drops" in `score`, using the `autocut` operator

`autocut` can be combined with `limit: N`, which would limit autocut's input to the first `N` objects.

### Limiting results with `limit`

Use the `limit` argument to specify the maximum number of results that should be returned:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START limit Python"
      endMarker="# END limit Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START limit Python"
      endMarker="# END limit Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START limit"
      endMarker="// END limit"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START limit GraphQL"
      endMarker="# END limit GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

### Limiting results with `autocut` and `auto_limit`

Weaviate can also limit results based on discontinuities in the result set. In the legacy client, this filter is called `autocut`. The filter is called `auto_limit` in the new client. 

The [filter](../api/graphql/additional-operators.md#autocut) looks for discontinuities, or jumps, in the result [score](#score--explainscore). In your query, you specify how many jumps there should be. The query stops returning results after the specified number of jumps. 

`hybrid` search combines a vector search and a keyword (BM25F) search. The scores are different for each type of search so they cannot be compared directly. This means the cut points the filter chooses may not be intuitive.

<!-- TODO: add detailed explanation -->

Autocut can be used as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START autocut Python"
      endMarker="# END autocut Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START autocut Python"
      endMarker="# END autocut Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START autocut"
      endMarker="// END autocut"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START autocut GraphQL"
      endMarker="# END autocut GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# START Expected autocut results"
  endMarker="# END Expected autocut results"
  language="json"
/>

</details>


## Weight the keyword and vector results

You can use the `alpha` argument to add weight to the keyword or vector search results.

- An `alpha` of `1` is a pure vector search.
- An `alpha` of `0` is a pure keyword search. 

In the legacy clients, the default value for `alpha` is `0.75`. The new client uses a default value of `0.5`.

The following example uses an alpha of `0.25` to increase the importance of the keyword search results.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# HybridWithAlphaPython"
  endMarker="# END HybridWithAlphaPython"
  language="python"
/>
</TabItem>

<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridWithAlphaPython"
  endMarker="# END HybridWithAlphaPython"
  language="python"
/>
</TabItem>

<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCode}
  startMarker="// searchHybridWithAlpha"
  endMarker="// END searchHybridWithAlpha"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PyCodeV3}
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
  text={PyCodeV3}
  startMarker="# Expected HybridWithAlpha results"
  endMarker="# END Expected HybridWithAlpha results"
  language="json"
/>

</details>

## Fusion (ranking) method

:::info Available from `v1.20` onwards
:::

You can select how the BM25 and vector search results are combined to determine the ranking using the `fusionType` argument.

The default is `rankedFusion`, which adds inverted ranks of the BM25 and vector search methods. Alternatively, you can  use `relativeScoreFusion` which adds normalized (between 0-1) scores of the BM25 and vector search methods.

The following example specifies the fusion type of `relativeScoreFusion`.

<Tabs groupId="languages">
<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridWithFusionTypePython"
  endMarker="# END HybridWithFusionTypePython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCode}
  startMarker="// searchHybridWithFusionType"
  endMarker="// END searchHybridWithFusionType"
  language="ts"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridWithFusionTypeGraphQL"
  endMarker="# END HybridWithFusionTypeGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridWithFusionType results"
  endMarker="# END Expected HybridWithFusionType results"
  language="json"
/>

</details>


## Selected properties only

Starting in v1.19.0, you can specify the object `properties` for the `bm25` portion of the search.

The next example performs a `bm25` search for the keyword `food` in the `question` property only. It combines the results of the keyword search with the vector search results for `food`.

:::info Why does this not affect the vector search?
This is not possible as doing so will require the entire database to be re-vectorized and re-indexed with the new vectorization options.
:::

<Tabs groupId="languages">
<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridWithPropertiesPython"
  endMarker="# END HybridWithPropertiesPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCode}
  startMarker="// searchHybridWithProperties"
  endMarker="// END searchHybridWithProperties"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PyCodeV3}
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
  text={PyCodeV3}
  startMarker="# Expected HybridWithProperties results"
  endMarker="# END Expected HybridWithProperties results"
  language="json"
/>

</details>

### Weight (boost) searched properties

You can specify weighting of object `properties` in how they affect the BM25F component of hybrid searches.

This example searches for objects containing the keyword `food`. The BM25 search is done in the `question` property and the `answer` property, with the `question` property's weighting boosted by 2, and returns the top 3.

<Tabs groupId="languages">
<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridWithPropertyWeightingPython"
  endMarker="# END HybridWithPropertyWeightingPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCode}
  startMarker="// searchHybridWithPropertyWeighting"
  endMarker="// END searchHybridWithPropertyWeighting"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridWithPropertyWeightingGraphQL"
  endMarker="# END HybridWithPropertyWeightingGraphQL"
  language="graphql"
/>
</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridWithPropertyWeighting results"
  endMarker="# END Expected HybridWithPropertyWeighting results"
  language="json"
/>

</details>


## With a custom vector

You can provide your own `vector` input to the hybrid query. In this scenario, Weaviate will use the query string for the `bm25` search and the input vector for the vector search.

This example supplies the vector for "italian food", while using "food" as the query text. Note how the results have now skewed towards Italian food.

<Tabs groupId="languages">
<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridWithVectorPython"
  endMarker="# END HybridWithVectorPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCode}
  startMarker="// searchHybridWithVector"
  endMarker="// END searchHybridWithVector"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PyCodeV3}
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
  text={PyCodeV3}
  startMarker="# Expected HybridWithVector results"
  endMarker="# END Expected HybridWithVector results"
  language="json"
/>

</details>

## Add a conditional (`where`) filter

You can add a conditional filter to any hybrid search query, which will filter the outputs but not impact the ranking.

This example performs a hybrid search for `food` in any field on objects that have the `round` property of `Double Jeopardy!`. It returns the top 3.


<Tabs groupId="languages">
<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# HybridWithFilterPython"
  endMarker="# END HybridWithFilterPython"
  language="python"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCode}
  startMarker="// searchHybridWithFilter"
  endMarker="// END searchHybridWithFilter"
  language="js"
/>
</TabItem>
<TabItem value="graphql" label="GraphQL">
<FilteredTextBlock
  text={PyCodeV3}
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
  text={PyCodeV3}
  startMarker="# Expected HybridWithFilter results"
  endMarker="# END Expected HybridWithFilter results"
  language="json"
/>

</details>

## Related pages

- [API References: Search operators # Hybrid](../api/graphql/search-operators.md#hybrid)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
