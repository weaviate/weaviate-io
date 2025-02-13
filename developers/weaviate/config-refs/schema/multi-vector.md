---
title: Multiple vector embeddings
sidebar_position: 20
image: og/docs/configuration.jpg
# tags: ['configuration', 'vector index']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

[comment]: # ( This section is duplicated, with a link to this page, in: multi-vector-support dot mdx )

Collections can have multiple named vectors.

The vectors in a collection can have their own configurations. Each vector space can set its own index, its own compression algorithm, and its own vectorizer. This means you can use different vectorization models, and apply different distance metrics, to the same object.

To work with named vectors, adjust your queries to specify a target vector for [vector search](/developers/weaviate/search/similarity#named-vectors) or [hybrid search](/developers/weaviate/search/hybrid#named-vectors) queries.

## Syntax

Single vector collections are valid and continue to use the original collection syntax. However, if you configure multiple vector embeddings, you must use the new, named vector syntax to query your collections.

### Collection definition

Use the collection definition to [configure the vector spaces](/developers/weaviate/manage-data/collections#define-multiple-named-vectors) for each data object.

:::info Named vectors must be defined at collection creation
All named vectors must be defined when you create a collection. Currently, it is not possible to add or remove named vectors from a collection after it has been created.
:::

### Query a named vector

To do a vector search on a collection with named vectors, specify the vector space to search.

Use named vectors with [vector similarity searches](/developers/weaviate/search/similarity#named-vectors) (`near_text`, `near_object`, `near_vector`, `near_image`) and [hybrid search](/developers/weaviate/search/hybrid#named-vectors).

Named vector collections support hybrid search, but only for one vector at a time.

[Keyword search](/developers/weaviate/search/bm25) syntax does not change if a collection has named vectors.

### Query multiple named vectors

:::info Added in `v1.26`
:::

Where multiple named vectors are defined in a collection, you can query them in a single search. This is useful for comparing the similarity of an object to multiple named vectors.

This is called a "multi-target vector search".

In a multi-target vector search, you can specify:

- The target vectors to search
- The query(ies) to compare to the target vectors
- The weights to apply to each distance (raw, or normalized) for each target vector

Read more in [How-to: Multi-target vector search](../../search/multi-vector.md).

## Related pages

- [How-to: manage data](/developers/weaviate/manage-data/collections#define-multiple-named-vectors): Configure collections
- [How-to: search](/developers/weaviate/search/index.md): Code examples for search
- [Weaviate academy: Named vectors](../../../academy/py/named_vectors/index.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
