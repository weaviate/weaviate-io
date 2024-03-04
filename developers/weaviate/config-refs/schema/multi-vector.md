---
title: Multiple vectors
sidebar_position: 20
image: og/docs/configuration.jpg
# tags: ['configuration', 'vector index']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

import PyCode from '!!raw-loader!/_includes/code/config/multi-vector-examples.py';

import MultiVectorSupport from '/_includes/multi-vector-support.mdx';

<MultiVectorSupport />

## Syntax

Single vector collections are valid and continue to use the original collection syntax. However, if you configure multiple vectors, you must use the new, named vector syntax.

### Python client v4

Starting in v4.5.0, the [Python client](/developers/weaviate/client-libraries/python) supports named vectors.

#### Create a schema

Weaviate collections require a schema. Use the schema definition to configure the vector spaces for each data object.

- To configure named vectors, use `NamedVectors`.
- To specify which inputs go to which vectorizers, set `source_properties`.

<FilteredTextBlock
  text={PyCode}
  startMarker="# START SetSourceSchemaExample"
  endMarker="# END SetSourceSchemaExample"
  language="py"
/>

Data values can be stored as properties, vectors or both. In this example, each data object has two named vectors, `jeopardy_questions_vector` and `jeopardy_answers_vector`. Each object also has three properties, `question`, `answer`, and `category`. The schema specifies how Weaviate manages your data.

| Data field | Property | Vectorizer |
| :-- | :-- | :-- |
| `category` | yes | none |
| `question` | yes | `text2vec_cohere` |
| `answer` | yes | `text2vec_openai` |

#### Query a named vector

[Keyword searches](/developers/weaviate/search/bm25) in collections with named vectors use the same syntax as keyword searches in collections without named vectors. However, if you run a vector search on a collection with named vectors, specify the vector space to search.

Use named vectors with [vector similarity searches](/developers/weaviate/search/similarity) (`near_text`, `near_object`, `near_vector`, `near_image`) and [hybrid search](/developers/weaviate/search/hybrid).

To run the example query, first create the sample collection.

<details>
  <summary>Create sample collection.</summary>

This code creates a sample collection and imports a small amount of data.<br/><br/>To run the code, you must have an OpenAI API key and a Cohere API key defined as local variables on your system.<br/><br/>OpenAI and Cohere are third party services. You may incur a cost if you exceed the limits of their free tiers.

<FilteredTextBlock
  text={PyCode}
  startMarker="# START LoadDataNamedVectors"
  endMarker="# END LoadDataNamedVectors"
  language="py"
/>

</details>

<FilteredTextBlock
  text={PyCode}
  startMarker="# START NamedVectorQueryExample"
  endMarker="# END NamedVectorQueryExample"
  language="py"
/>



### REST API

The legacy, single vector syntax is valid for use with collections that don't have named vectors:

```json
{
    "class": "Article",
    "vector": [0.3, -0.012, 0.071, ..., -0.09],
    "properties": {
        "content": Really cool things",
    }
}
```

To specify named vectors in collections with multiple, named vectors use the new syntax.

```json
{
    "class": "ArticleNamedVector",
    "vectors": {
        "title_vector": [0.3, 0.2, 0.6, ..., 0.1]},
        "image_vector": [1,2,3,4]
    },
    "properties": {
        "content": "Really cool things",
    }
}
```

To retrieve all vectors at once, use this endpoint:

```bash
GET /v1/objects/<ClassName>/<uuid>?include=vector
```

### GraphQL

If a collection has one vector, you don't have to specify a vector name. For example, a `nearVector` query with a single vector looks like this:

```graphql
{
  Get {
    Publication(
      nearVector: {
        vector: [0.1, -0.15, 0.3]
      }
    ){
      content
      _additional {
        vector # backward compatible if only one vector present
        vectors {
          title
        }
        distance
      }
    }
  }
}
```

If a collection has multiple vectors, use the `_additional {vectors {name}}` field in the query to specify the vector that you want to search.

These examples show GraphQL queries:

import GraphQLExamples from '/_includes/code/config/multi-vector-examples.mdx';

<GraphQLExamples />

## Hybrid search

Named vector collections support [hybrid search](../../search/hybrid.md), but only for one vector at a time. To run a hybrid search, specify the vector to use:

import HybridPyCode from '!!raw-loader!/_includes/code/howto/search.hybrid.py';
import HybridPyCodeV3 from '!!raw-loader!/_includes/code/howto/search.hybrid-v3.py';
import HybridTSCode from '!!raw-loader!/_includes/code/howto/search.hybrid.ts';

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={HybridPyCode}
      startMarker="# NamedVectorHybridPython"
      endMarker="# END NamedVectorHybridPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={HybridPyCodeV3}
      startMarker="# NamedVectorHybridPython"
      endMarker="# END NamedVectorHybridPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={HybridTSCode}
      startMarker="// NamedVectorHybrid"
      endMarker="// END NamedVectorHybrid"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={HybridPyCodeV3}
      startMarker="# NamedVectorHybridGraphQL"
      endMarker="# END NamedVectorHybridGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Related pages

- [Weaviate academy: Named vectors](../../../academy/py/named_vectors/index.md)
- [How-to: manage data](/developers/weaviate/manage-data/index.md): Code examples for *create*, *update* and *delete* operations, including those with named vectors.
- [How-to: search](/developers/weaviate/search/index.md): Code examples for all types of search operations, including those with named vectors.
- [BQ Compression](../../configuration/bq-compression.md)
- [PQ Compression](../../configuration/pq-compression.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
