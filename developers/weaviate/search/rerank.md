---
title: Reranking
sidebar_position: 75
image: og/docs/howto.jpg
# tags: ['how to', 'rank']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.rerank.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.rerank.ts';

## Overview

This page shows you how to rerank a search result set returned by [vector](similarity.md), [bm25](bm25.md), or [hybrid](hybrid.md) operators.

There are two reranker modules available:
* [reranker-cohere](../modules/retriever-vectorizer-modules/reranker-cohere.md)
* [reranker-transformers](../modules/retriever-vectorizer-modules/reranker-transformers.md)

:::info Related pages
- [API References: GraphQL - Additional properties](../api/graphql/additional-properties.md#rerank)
- [Concepts: Reranking](../concepts/reranking.md)
:::

import BasicPrereqs from '/_includes/prerequisites-quickstart.md';

<BasicPrereqs />


## Requirements

To rerank search results, you'll need a reranker module enabled.
You can rerank results using:
- The same query as the initial search, or
- A different reranking query.


## Reranking vector search results

Using the [JeopardyQuestions dataset](../quickstart/index.md), let's say we want to find Q&As about flying, and further sort towards the top those about floating. We can start with a `nearText` search for `flying`, limited to 10 results:

<Tabs groupId="languages">
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
  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START nearTextRerank GraphQL"
      endMarker="# END nearTextRerank GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The response should look like this:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START Expected nearTextRerank results"
    endMarker="# END Expected nearTextRerank results"
    language="json"
  />

</details>

We can see in the `rerank`ed result set, that answers are sorted descending by the `_additional.rerank[0].score` field, and those involving balloons/dirigibles/blimps are sorted towards the top.


## Reranking bm25 search results

The example below is a uses `rerank` in a `bm25` query to sort towards the top results for the query "paper" that have to do with "publication"s rather than with the material paper.

<Tabs groupId="languages">
  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START bm25Rerank GraphQL"
      endMarker="# END bm25Rerank GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The response should look like this:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START Expected bm25Rerank results"
    endMarker="# END Expected bm25Rerank results"
    language="json"
  />

</details>


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
