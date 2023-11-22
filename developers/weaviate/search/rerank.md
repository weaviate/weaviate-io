---
title: How to rank results
sidebar_position: 75
image: og/docs/howto.jpg
# tags: ['how to', 'rank']
---



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.rerank.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.rerank-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.rerank.ts';

## IGNORE PAGE CONTENTS

This page shows you how to rerank a result set returned by a search.

A reranker algorithm is applied after a search on the retrieved results. Thus a reranker algorithm can apply a different set of criteria, or simply use a different algorithm.

For example, a more computationally expensive (and accurate) algorithm can be used for reranking, as it is only applied to a subset of the data.

:::info Related pages
- [API References: GraphQL - Additional properties](../api/graphql/additional-properties.md#rerank)
- [Concepts: Reranking](../concepts/reranking.md)
- [References: Modules: reranker-cohere](../modules/retriever-vectorizer-modules/reranker-cohere.md)
- [References: Modules: reranker-transformers](../modules/retriever-vectorizer-modules/reranker-transformers.md)
:::


## Requirements

To rerank search results, you'll need set the class with an enabled reranker [module](../configuration/modules.md).

You can rerank results using:
- The same query as the initial search, or
- A different reranking query.

<details>
  <summary>How do I <strong>set the reranker module</strong> in the target class?</summary>

<p>

If there is only one `reranker` module enabled, you don't need to do anything. The `reranker` module will be used by default.
<br/>

Where multiple `reranker` modules are enabled, you must specify the reranker module to be used in the `moduleConfig` section of the schema. For example, this configures the `Article` class to use the `reranker-cohere` module:

```json
{
  "classes": [
    {
      "class": "Article",
      ...,
      "moduleConfig": {
        "reranker-cohere": {},  // This will configure the 'Article' class to use the 'reranker-cohere' module
      }
    }
  ]
}
```

You may be able to set additional module parameters here. Please refer to the "Schema configuration" section in the relevant module page.

</p>

</details>

## Reranking vector search results

Using the [JeopardyQuestions dataset](../quickstart/index.md), let's say we want to find Q&As about flying, and further sort towards the top those about floating. We can start with a `nearText` search for `flying`, limited to 10 results:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START nearText Python"
      endMarker="# END nearText Python"
      language="py"
    />
  </TabItem>
  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
      text={PyCodeV3}
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
    text={PyCode}
    startMarker="# START Expected nearText results"
    endMarker="# END Expected nearText results"
    language="json"
  />

</details>

We can see that results pertaining to floating aircraft (balloons/blimps/dirigibles) are mixed in with other results (animals, mail). To sort floating results to the top, we can apply the `rerank` operator:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START nearTextRerank Python"
      endMarker="# END nearTextRerank Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START nearTextRerank Python"
      endMarker="# END nearTextRerank Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RerankNearText"
      endMarker="// END RerankNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
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
    text={PyCode}
    startMarker="# START Expected nearTextRerank results"
    endMarker="# END Expected nearTextRerank results"
    language="json"
  />

</details>

We can see in the `rerank`ed result set, that answers are sorted descending by the `_additional.rerank[0].score` field, and those involving balloons/dirigibles/blimps are sorted towards the top.


## Reranking bm25 search results

The example below uses `rerank` in a `bm25` query to sort the top results for the query `"paper"` towards `"publication"` to disambiguate from those related to other meanings, such as the material "paper".

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START bm25Rerank Python"
      endMarker="# END bm25Rerank Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START bm25Rerank Python"
      endMarker="# END bm25Rerank Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START bm25Rerank"
      endMarker="// END bm25Rerank"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
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
    text={PyCode}
    startMarker="# START Expected bm25Rerank results"
    endMarker="# END Expected bm25Rerank results"
    language="json"
  />

</details>



import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
