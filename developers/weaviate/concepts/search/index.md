---
title: Search
sidebar_position: 0
image: og/docs/concepts.jpg
# tags: ['architecture']
---

import ClassToCollection from '/_includes/class-to-collection-transition-note.mdx' ;

:::note

<ClassToCollection /> 

:::

Weaviate offers vector search, keyword search, and hybrid search. Hybrid search combines a vector search and a keyword search.

## Search basics

To retrieve objects, use the `get` function and specify the collection to search. Each client library has it's own syntax, but the concepts are similar between languages.

Specify the information that you want your query to return. You can return object properties, object IDs, and object metadata.

## Vector similarity search

Vector search is a similarity based search. The vector search operators searching for objects with vector representations that are similar to the query's vector representation. 

If you use unvectorized inputs to search with, the collection must have a [vectorizer](../../modules/retriever-vectorizer-modules/index.md) configured.

The distance between vectors indicates how dissimilar two objects are. Weaviate offers several [distance metrics](../../config-refs/distances.md). Set the metric in the [collection schema](../../config-refs/schema.md#default-distance-metric).
  
## Keyword search

## Hybrid search

## More resources

- [GraphQL API](/developers/weaviate/api/graphql)
- [GraphQL additional operators](/developers/weaviate/api/graphql/additional-operators)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
