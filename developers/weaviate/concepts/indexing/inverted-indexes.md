---
title: Inverted indexes
sidebar_position: 100
image: og/docs/indexing.jpg
# tags: ['basics']
---

[Inverted indexes](https://en.wikipedia.org/wiki/Inverted_index) map the contents of documents to improve search performance. The Weaviate database uses inverted indexes to search object properties efficiently.

There are three inverted index types in Weaviate:

- [`indexSearchable`](#indexsearchable) A default index. BM25 (keyword) and hybrid search use `indexSearchable`.
- [`indexFilterable`](#indexfilterable) A default index. Filters use the `indexFilterable` index.
- [`indexRangeFilters`](#indexrangefilters) An optional index. Numerical filters use the `indexRangeFilter`.

## Configuration

These indexes are set on the property level. `indexSearchable` and `indexFilterable` indexes are enabled by default. The `indexRangeFilters` index is off by default.

If you do not plan to search or filter on an object property, disable the index. Unused indexes waste space and they slow import processing.

To configure an inverted index see these examples:

- [`indexSearchable`](/developers/weaviate/configuration/inverted-indexes#indexsearchable)
- [`indexFilterable`](/developers/weaviate/configuration/inverted-indexes#indexfilterable)
- [`indexRangeFilters](/developers/weaviate/configuration/inverted-indexes#indexrangefilters)

Keyword searches and hybrid searches use the BM25 ranking algorithm in conjunction with the `indexSearchable` index. To configure the BM25 algorithm, see these examples:

- [BM25](/developers/weaviate/configuration/inverted-indexes#bm25)

## indexSearchable

[Keyword searches](/developers/weaviate/search/bm25) and [hybrid searches](/developers/weaviate/search/hybrid) use the BM25 ranking algorithm in conjunction with the `indexSearchable` index. These searches match the search terms in a query to the same term in the database. They only match terms, not meanings. To match meanings, a semantic search, use a [vector similarity search](/developers/weaviate/search/similarity).

`indexSearchable` is enabled by default. This index is required for BM25 search.

For simple (non-BM25) filters, the `indexFilterable` index enables faster filtering. However, if the `indexFilterable` index is not enabled, Weaviate uses the `indexSearchable` index to [filter](/developers/weaviate/concepts/prefiltering).

For configuration examples, see [`indexSearchable`](/developers/weaviate/configuration/inverted-indexes#indexsearchable).

## indexFilterable

`indexFilterable` is enabled by default. This index is not required for filtering of BM25 search. However, this index is much faster for filtering than the `indexSearchable` index.

You can also enable an inverted index to search [based on timestamps](/developers/weaviate/config-refs/schema/index.md#invertedindexconfig--indextimestamps).
If you do not expect to filter on a property often, disable this filter to save space and to improve import times. For occasional filtered queries, the `indexSearchable` index is sufficient. If you expect to filter on a property regularly, leave this index enabled.

For configuration examples, see [`indexFilterable`](/developers/weaviate/configuration/inverted-indexes#indexfilterable).

## indexRangeFilters

:::info Added in `1.26`
:::

The `indexRangeFilters` index is for filtering by numerical ranges. This index is not enabled by default.

Internally, rangeable indexes are implemented as [roaring bitmap slices](https://www.featurebase.com/blog/range-encoded-bitmaps). The roaring bitmap data structure limits the `indexRangeFilters` index to values that can be stored as 64 bit integers. This index is available for properties of type `int`, `number`, or `date`. The `indexRangeFilters` index is not available for arrays of these data types.

The `indexRangeFilters` index is only available for new properties. Existing properties cannot be converted to use the rangeable index.

For configuration examples, see [`indexRangeFilters](/developers/weaviate/configuration/inverted-indexes#indexrangefilters).

## Inverted index types summary

import InvertedIndexTypesSummary from '/_includes/inverted-index-types-summary.mdx';

<InvertedIndexTypesSummary/>

## Multiple filter indexes

`indexFilterable` and `indexRangeFilters` both enable faster filtering.

- If only one of them is enabled on a property, that index is used for filtering.
- If both are enabled on a property, `indexRangeFilters` is used with numeric comparison operators, and `indexFilterable` is used for equality and inequality operations.

This chart shows Weaviate applies the filters:

| Operator | `indexRangeFilters` only | `indexFilterable` only | Both enabled |
| :- | :- | :- | :- |
| Equal | `indexRangeFilters` | `indexFilterable` | `indexFilterable` |
| Not equal | `indexRangeFilters` | `indexFilterable` | `indexFilterable` |
| Greater than | `indexRangeFilters` | `indexFilterable` | `indexRangeFilters` |
| Greater than equal | `indexRangeFilters` | `indexFilterable` | `indexRangeFilters` |
| Less than | `indexRangeFilters` | `indexFilterable` | `indexRangeFilters` |
| Less than equal | `indexRangeFilters` | `indexFilterable` | `indexRangeFilters` |

## Collection level settings

Some inverted index values are configured at the collection level. These settings allow you do create indexes for [timestamps](/developers/weaviate/config-refs/schema#indextimestamps), filter on [`null`](/developers/weaviate/config-refs/schema#indexnullstate) and filter on [property length](/developers/weaviate/config-refs/schema#indexpropertylength).

If you so not intend to filter on these properties, do not enable these indexes.

## BM25 ranking algorithm

The [BM25 ranking algorithm](https://en.wikipedia.org/wiki/Okapi_BM25) ranks documents based on how frequently particular words appear in the document. Weaviate uses BM25 with [keyword searches](/developers/weaviate/search/bm25) and [hybrid searches](/developers/weaviate/search/hybrid).

The `indexSearchable` index enables BM25 on a property. You cannot do a hybrid search or a keyword search on a property if `indexSearchable` is disabled.

The BM25 algorithm has two parameters that change how the `indexSearchable` index is created:

- To adjust for document length, modify `b`. Values range from 0 to 1.
- To adjust for word frequency within a document, modify `k1`. Values are usually in the range from 0 to 3. There isn't an upper limit.

For configuration examples, see [BM25](/developers/weaviate/configuration/inverted-indexes#bm25).


## Further resources

- [Concepts: Vector Indexing](/developers/weaviate/concepts/indexing/vector-indexes)
- [Configuration: Inverted indexes](/developers/weaviate/configuration/inverted-indexes)
- [Concepts: Inverted Indexes](/developers/weaviate/concepts/indexing/inverted-indexes)
- [Configuration: BM25 algorithm](/developers/weaviate/configuration/inverted-indexes#bm25)
- [Blog: Ranking models](https://weaviate.io/blog/ranking-models-for-better-search)
- [Blog: Hybrid search](https://weaviate.io/blog/hybrid-search-for-web-developers)
- [Blog: Fusion algorithms](https://weaviate.io/blog/hybrid-search-fusion-algorithms)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
