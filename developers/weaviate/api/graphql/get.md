---
title: GraphQL - Get{}
sidebar_position: 10
image: og/docs/api.jpg
# tags: ['graphql', 'get{}']
---

import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />

## Overview

:::info Related pages
- [How-to: Search: Basics](../../search/basics.md)
:::

The `Get{}` function is for retrieving individual objects.

## Syntax and query structure

The `Get{}` function requires the target class name, and the properties to be fetched.

For example, the following will fetch `JeopardyQuestion` objects and their `question`, `answer` and `points`  properties:

import GraphQLGetSimple from '/_includes/code/graphql.get.simple.mdx';

<GraphQLGetSimple/>

<details>
  <summary>Example response</summary>

The above query will result in something like the following:

import GraphQLGetSimpleUnfiltered from '!!raw-loader!/_includes/code/graphql.get.simple.py';

<FilteredTextBlock
  text={GraphQLGetSimpleUnfiltered}
  startMarker="// ===== EXPECTED RESULT ====="
  endMarker="// ===== END EXPECTED RESULT ====="
  language="json"
/>

</details>

<details>
  <summary>Order of retrieved objects</summary>

Without any arguments, the objects are retrieved according to their ID.

Accordingly, such a `Get` query is not suitable for a substantive object retrieval strategy. Consider the [Cursor API](./additional-operators.md#cursor-with-after) for that purpose.

</details>

:::tip Read more
- [How-to search: Basics](../../search/basics.md)
:::

### groupBy argument

You can use `groupBy` to retrieve groups of objects from Weaviate. The `groupBy{}` argument is structured as follows for the `Get{}` function:

:::info Single-level grouping only
As of `1.19`, the `groupBy` `path` is limited to one property or cross-reference. Nested paths are current not supported.
:::

```graphql
{
  Get{
    <Class>(
      <vectorSearchOperator>  # e.g. nearVector, nearObject, nearText
      groupBy:{
        path: [<propertyName>]  # Property to group by (only one property or cross-reference)
        groups: <number>  # Max. number of groups
        objectsPerGroup: <number>  # Max. number of objects per group
      }
    ) {
      _additional {
        group {
          id  # An identifier for the group in this search
          groupedBy{ value path }  # Value and path of the property grouped by
          count  # Count of objects in this group
          maxDistance  # Maximum distance from the group to the query vector
          minDistance  # Minimum distance from the group to the query vector
          hits {  # Where the actual properties for each grouped objects will be
            <properties>  # Properties of the individual object
            _additional {
              id  # UUID of the individual object
              vector  # The vector of the individual object
              distance  # The distance from the individual object to the query vector
            }
          }
        }
      }
    }
  }
}
```

:::tip Read more
- [How-to search: Basics # groupBy](../../search/basics.md#groupby)
:::

### Consistency levels

:::info Available from version `v1.19`
:::

Where replication is configured, the `Get{}` function can be configured to return results with different levels of consistency. This is useful when you want to retrieve the most up-to-date data, or when you want to retrieve data as fast as possible.

The available consistency options are:
- `ONE`
- `QUORUM`
- `ALL`

Read more about consistency levels [here](../../concepts/replication-architecture/consistency.md).

import GraphQLGetConsistency from '/_includes/code/graphql.get.consistency.mdx';

<GraphQLGetConsistency/>

### Multi-tenancy

:::info Available from version `v1.20`
:::

Where multi-tenancy is configured, the `Get{}` function can be configured to return results from a specific tenant.

You can do so by specifying the `tenant` parameter in the GraphQL query as shown below, or using the equivalent client function.

```graphql
{
  Get {
    Article (
      tenant: "tenantA"
      limit: 1
    ) {
      name
    }
  }
}
```

:::tip Read more
- [How-to manage data: Multi-tenancy operations](../../manage-data/multi-tenancy.md)
:::

## Cross-references

You can retrieve any cross-referenced properties.

import GraphQLGetBeacon from '/_includes/code/graphql.get.beacon.mdx';

<GraphQLGetBeacon/>

import GraphQLGetBeaconUnfiltered from '!!raw-loader!/_includes/code/graphql.get.beacon.py';

<details>
  <summary>Expected response</summary>

<FilteredTextBlock
  text={GraphQLGetBeaconUnfiltered}
  startMarker="// ===== EXPECTED RESULT ====="
  endMarker="// ===== END EXPECTED RESULT ====="
  language="json"
/>

</details>

:::tip Read more
- [How-to retrieve cross-referenced properties](../../search/basics.md#retrieve-cross-referenced-properties)
:::

## Additional properties / metadata

Various metadata properties may be retrieved with `Get{}` requests. They include:

Property | Description |
-------- | ----------- |
`id` | Object id |
`vector` | Object vector |
`generate` | Generative module outputs |
`rerank` | Reranker module outputs |
`creationTimeUnix` | Object creation time |
`lastUpdateTimeUnix` | Object last updated time |
`distance` | Vector distance to query (vector search only) |
`certainty` | Vector distance to query, normalized to certainty (vector search only) |
`score` | Search score (BM25 and hybrid only) |
`explainScore` | Explanation of the score (BM25 and hybrid only) |
`classification` | Classification outputs |
`featureProjection` | Feature projection outputs |

They are returned through the `_additional` properties in the response.

For further information see:

:::tip Read more
- [References: GraphQL: Additional properties](./additional-properties.md)
- [How-to search: Specify fetched properties](../../search/basics.md#specify-the-fetched-properties)
:::


## Search operators

The following search operators are available.

| Argument | Description | Required modules (at least one of) | Learn more |
| --- | --- | --- | --- |
| `nearObject` | Vector search using a Weaviate object | *none* | [Learn more](./search-operators.md#nearobject) |
| `nearVector` | Vector search using a raw vector | *none* | [Learn more](./search-operators.md#nearvector) |
| `nearText` | Vector search using a text query | `text2vec-xxx` | [Transformers](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers.md#how-to-use), [Contextionary](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-contextionary.md#how-to-use), [OpenAI](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-openai.md#how-to-use), [CLIP](/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip.md#how-to-use), [Hugging Face](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-huggingface.md#how-to-use), [Cohere](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-cohere.md#how-to-use) |
| `nearImage` | Vector search using an image | `multi2vec-clip`, `img2vec-neural` | [CLIP](/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip.md#neartext), [Img2Vec](/developers/weaviate/modules/retriever-vectorizer-modules/img2vec-neural.md#nearimage-search) |
| `hybrid` | Combine vector and BM25 search results |   *none* | [Learn more](../graphql/search-operators.md#hybrid) |
| `bm25`   | Keyword search with BM25F ranking  | *none* | [Learn more](../graphql/search-operators.md#bm25) |

For further information see:

:::tip Read more
- [References: GraphQL: Search operators](./search-operators.md)
- [How-to search: Similarity search](../../search/similarity.md)
- [How-to search: Image search](../../search/image.md)
- [How-to search: BM25 search](../../search/bm25.md)
- [How-to search: Hybrid search](../../search/hybrid.md)
:::

## Conditional filters

`Get{}` queries can be combined with a conditional filter.

For further information see:

:::tip Read more
- [References: GraphQL: Conditional Filters](./filters.md)
- [How-to search: Filters](../../search/filters.md)
:::


## Additional operators

`Get{}` queries can be combined with additional operators such as `limit`, `offset`, `autocut`, `after` or `sort`.

For further information see:

:::tip Read more
- [References: GraphQL: Additional Operators](./additional-operators.md)
:::


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
