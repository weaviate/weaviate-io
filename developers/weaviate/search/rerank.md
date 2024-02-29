---
title: Reranking
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
import SimilarityPyCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import SimilarityPyCodeV3 from '!!raw-loader!/_includes/code/howto/search.similarity-v3.py';
import SimilarityTSCode from '!!raw-loader!/_includes/code/howto/search.similarity.ts';

Reranking modules reorder the search result set according to a different set of criteria or a different (e.g. more expensive) algorithm.

<details>
  <summary>
    Additional information
  </summary>

**Configure reranking**

To rerank search results, enable a reranker [module](../configuration/modules.md) for your collection. For details, see the reranker's reference page:

- [reranker-cohere](../modules/retriever-vectorizer-modules/reranker-cohere.md)
- [reranker-transformers](../modules/retriever-vectorizer-modules/reranker-transformers.md)

A collection can have multiple rerankers. If multiple `reranker` modules are enabled, specify the module you want to use in the `moduleConfig` section of your schema.

</details>

## Named vectors

:::info Added in `v1.24`
:::

Any vector-based search on collections with [named vectors](../config-refs/schema/multi-vector.md) configured must include a `target` vector name in the query. This allows Weaviate to find the correct vector to compare with the query vector.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={SimilarityPyCode}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={SimilarityPyCodeV3}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={SimilarityTSCode}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={SimilarityPyCodeV3}
      startMarker="# NamedVectorNearTextGraphql"
      endMarker="# END NamedVectorNearTextGraphql"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Rerank vector search results

To rerank the results of a vector search, configure the object properties to sort on.

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
      text={PyCodeV3}
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
    text={PyCodeV3}
    startMarker="# START Expected nearTextRerank results"
    endMarker="# END Expected nearTextRerank results"
    language="json"
  />

</details>

## Rerank keyword search results

To rerank the results of a keyword search, configure the object properties to sort on.

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
      text={PyCodeV3}
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
    text={PyCodeV3}
    startMarker="# START Expected bm25Rerank results"
    endMarker="# END Expected bm25Rerank results"
    language="json"
  />

</details>

## Related pages

- [Connect to Weaviate](/developers/weaviate/tutorials/connect.mdx)
- [API References: GraphQL - Additional properties](../api/graphql/additional-properties.md#rerank)
- [API References: GraphQL - Sorting](/developers/weaviate/api/graphql/additional-operators#sorting-api)
- [Concepts: Reranking](../concepts/reranking.md)
- [References: Modules: reranker-cohere](../modules/retriever-vectorizer-modules/reranker-cohere.md)
- [References: Modules: reranker-transformers](../modules/retriever-vectorizer-modules/reranker-transformers.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
