---
title: Multiple vectors
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

Single vector collections are valid and continue to use the original collection syntax. However, if you configure multiple vectors, you must use the new, named vector syntax to query your collections.

### Collection definition

Use the collection definition to [configure the vector spaces](/developers/weaviate/manage-data/collections#define-multiple-named-vectors) for each data object.

### Query a named vector

To do a vector search on a collection with named vectors, specify the vector space to search.

Use named vectors with [vector similarity searches](/developers/weaviate/search/similarity#named-vectors) (`near_text`, `near_object`, `near_vector`, `near_image`) and [hybrid search](/developers/weaviate/search/hybrid#named-vectors).

Named vector collections support hybrid search, but only for one vector at a time.

[Keyword search](/developers/weaviate/search/bm25) syntax does not change if a collection has named vectors.

## Related pages

- [How-to: manage data](/developers/weaviate/manage-data/collections#define-multiple-named-vectors): Configure collections
- [How-to: search](/developers/weaviate/search/index.md): Code examples for search
- [Weaviate academy: Named vectors](../../../academy/py/named_vectors/index.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
