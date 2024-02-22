---
title: Multiple vectors
sidebar_position: 20
image: og/docs/configuration.jpg
# tags: ['configuration', 'vector index']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import MultiVectorSupport from '/_includes/multi-vector-support.mdx';

<MultiVectorSupport />

## Syntax

Single vector collections are valid and continue to use the original collection syntax. If, however, you configure multiple vectors, you must use the new, named vector syntax. 

### JSON
The legacy single vector syntax is valid for  use with legacy collections:

```json
{
    "class": "Article",
    "vector": [0.3, -0.012, 0.071, ..., -0.09], 
    "properties": {
        "content": Really cool things",
    }
}
```

Collections with multiple, named vectors use the new syntax.

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

### GraphQL

When there is only one vector, a `nearObject` query looks like this:

```json
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

If a collection has multiple vectors, use the `_additional {vectors {name}}` field to specify the vector in the query.

These examples show GraphQL queries:
 
import GraphQLExamples from '/_includes/code/config/multi-vector-examples.mdx';

<GraphQLExamples />

## Hybrid search

Named vector collections support [hybrid search](/weaviate/search/hybrid.md), but only for one vector at a time. To run a hybrid search, specify the vector to use:

```json
{
  Get {
    Article (
      hybrid: {
        properties: ["content"]
        targetVectors: ["title"] # Only one vector is supported
				query: "foo"
      })
     {
      content
      _additional {
				score
			}
    }
  }
}``` 

## Related pages

- [Create objects](/weaviate/manage-data/create.mdx)
- [BQ Compression](/weaviate/configuration/bq-compression.md)
- [PQ Compression](/weaviate/configuration/pq-compression.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
