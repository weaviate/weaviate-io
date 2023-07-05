---
title: Reranking
sidebar_position: 100
image: og/docs/howto.jpg
# tags: ['how to', 'rank']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.rerank.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.rerank.ts';

## Overview

This page shows you how to rerank a search result set returned by [vector](similarity.md), [bm25](bm25.md), or [hybrid](hybrid.md) operators. Reranking is useful to improve search relevance by reordering the result set returned by a [retriever](../modules/retriever-vectorizer-modules/index.md). This operation comes at a performance cost because reranking uses a different model to score the results. 

Weaviate supports two reranker modules:
* [reranker-cohere](../modules/retriever-vectorizer-modules/reranker-cohere.md)
* [reranker-transformers](../modules/retriever-vectorizer-modules/reranker-transformers.md)

:::info Related pages
- [API References: GraphQL - Additional properties](../api/graphql/additional-properties.md#rerank)
:::

import BasicPrereqs from '/_includes/prerequisites-quickstart.md';

<BasicPrereqs />


## Requirements

To rerank search results, you'll need:
* a reranker module enabled
* a vector, bm25, or hybrid query
 

## Reranking vector search results

Using the [JeopardyQuestions dataset](../quickstart/index.md), let's say we want to find Q&As about flying, and further sort towards the top those about floating. We can start with a `nearText` search for `flying`, limited to 10 results:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START nearText Python"
      endMarker="# END nearText Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START nearText"
      endMarker="// END nearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START nearText GraphQL"
      endMarker="# END nearText GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The response should look like this:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START Expected nearText results"
    endMarker="# END Expected nearText results"
    language="json"
  />

</details>

We can see that results pertaining to floating aircraft (balloons/blimps/dirigibles) are mixed in with other results (animals, mail). To sort floating results to the top, we can apply the `rerank` operator:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START nearTextReranker Python"
      endMarker="# END nearTextReranker Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RerankerNearText"
      endMarker="// END RerankerNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START nearTextReranker GraphQL"
      endMarker="# END nearTextReranker GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The response should look like this:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START Expected nearTextReranker results"
    endMarker="# END Expected nearTextReranker results"
    language="json"
  />

</details>

We can see in the `rerank`ed result set, that answers are sorted descending by the `_additional.rerank[0].score` field, and those involving balloons/dirigibles/blimps are sorted towards the top.


## Reranking bm25 search results

