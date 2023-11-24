---
title: How to do hybrid search
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

import ClassToCollection from '/_includes/class-to-collection-transition-note.mdx' ;

<ClassToCollection /> 


This page contains short, task oriented code snip-its. 

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Basic hybrid search

Hybrid search combines `bm25` search and the vector search rankings. This query returns the top three results.

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

The output looks like this.

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridBasic results"
  endMarker="# END Expected HybridBasic results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Explain search results

Use the object sub-properties and metadata to explain search results. 

The Python client v3 uses the `_additional` property to specify `score` and `explainScore`. The Python client v4 returns the information as metadata.

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

The output looks like this.

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridWithScore results"
  endMarker="# END Expected HybridWithScore results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Filter results with `limit`

Use the `limit` argument to specify the maximum number of search results.

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

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Filter results with `autocut`

The result scores for vector and keyword search cannot be compared directly. Cut points may not be intuitive.

The Python client v3 uses `autocut`. The Python client v4 uses `auto_limit`.

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

The output looks like this.

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# START Expected autocut results"
  endMarker="# END Expected autocut results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Change result proportions

Use the `alpha` argument to add weight to the keyword or vector search results.

- An `alpha` of `1` is a pure vector search.
- An `alpha` of `0` is a pure keyword search. 

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

The output looks like this.

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridWithAlpha results"
  endMarker="# END Expected HybridWithAlpha results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Combine and rank results

:::info Available from `v1.20` onwards
:::

Set the fusion type to change how results are ranked.

- `rankedFusion` is default
- `relativeScoreFusion` normalizes rankings

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# HybridWithFusionTypePython"
  endMarker="# END HybridWithFusionTypePython"
  language="python"
/>
</TabItem>

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

The output looks like this.

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridWithFusionType results"
  endMarker="# END Expected HybridWithFusionType results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Return selected properties

Starting in v1.19.0, you can specify the object `properties` for the `bm25` portion of the search.

:::info Limitations
This only affects the keyword search, not the vector search.
:::

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# HybridWithPropertiesPython"
  endMarker="# END HybridWithPropertiesPython"
  language="python"
/>
</TabItem>

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

The output looks like this.

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridWithProperties results"
  endMarker="# END Expected HybridWithProperties results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Emphasize selected properties

Emphasize `properties` so they contribute proportionally more to the keyword result score.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# HybridWithPropertyWeightingPython"
  endMarker="# END HybridWithPropertyWeightingPython"
  language="python"
/>
</TabItem>

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

The output looks like this.

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridWithPropertyWeighting results"
  endMarker="# END Expected HybridWithPropertyWeighting results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Use a custom vector

Use your own `vector` instead of the vectorized keyword search string for the vector search. Keyword search uses the query string.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# HybridWithVectorPython"
  endMarker="# END HybridWithVectorPython"
  language="python"
/>
</TabItem>

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

The output looks like this.

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridWithVector results"
  endMarker="# END Expected HybridWithVector results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

## Use a `where` filter

The filter parses the results but does not change ranks.

The Python client v3 uses `with_where`. The Python client v4 uses the `Filter` class from `weaviate.classes`.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# HybridWithFilterPython"
  endMarker="# END HybridWithFilterPython"
  language="python"
/>
</TabItem>

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

The output looks like this.

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected HybridWithFilter results"
  endMarker="# END Expected HybridWithFilter results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>
- For indexing concepts, see [link]. 
- For in depth guides see, link. 
- For tutorials see link. 
- For reference pages see link

</details>

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
