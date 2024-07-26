---
title: Indexing
sidebar_position: 20
image: og/docs/concepts.jpg
# tags: ['basics']
---

Weaviate supports several types of indices.

1. **Vector indexes** - a vector index (e.g. HNSW or flat) is used to serve all vector-search queries.
1. **Inverted indexes** - inverted indexes enable BM25 queries, or speed up filtering.

You can configure indices in Weaviate per collection.

Some things to bear in mind:

* Especially for large datasets, configuring the indices is important because the more you index, the more storage is needed.
* A rule of thumb -- if you don't query over a specific field or vector space, don't index it.
* One of Weaviate's unique features is how the indices are configured (learn more about this [here](../concepts/prefiltering.md)).

## Vector indexes

A vector index is used to serve all vector-search queries. Weaviate supports multiple types of vector indexes:

1. **HNSW** - an approximate nearest neighbor (ANN) search based vector index. HNSW indexes scale well with large datasets.
2. **Flat** - a vector index that is used for brute-force searches. This is useful for small datasets.
2. **Dynamic** - a vector index that is flat when the dataset is small and switches to HNSW when the dataset is large.

For more information on vector indexes, see the [Vector Indexing](./vector-index.md) page.

## Inverted indexes

### Configure the inverted index

There are three inverted index types in Weaviate:

- `indexSearchable` - a searchable index for BM25 or hybrid search
- `indexFilterable` - a match-based index for fast [filtering](./prefiltering.md) by matching criteria
- `indexRangeFilters` - a range-based index for [filtering](./prefiltering.md) by numerical ranges

Each inverted index can be set to `true` (on) or `false` (off) on a property level. The `indexSearchable` and `indexFilterable` indices are on by default, while the `indexRangeFilters` index is off by default.

The filterable indexes are only capable of [filtering](./prefiltering.md), while the searchable index can be used for both searching and filtering (though not as fast as the filterable index).

So, setting `"indexFilterable": false` and `"indexSearchable": true` (or not setting it at all) will have the trade-off of worse filtering performance but faster imports (due to only needing to update one index) and lower disk usage.

See the [related how-to section](../manage-data/collections.mdx#property-level-settings) to learn how to enable or disable inverted indexes on a property level.

A rule of thumb to follow when determining whether to switch off indexing is: _if you will never perform queries based on this property, you can turn it off._

#### Inverted index types summary

import InvertedIndexTypesSummary from '/_includes/inverted-index-types-summary.mdx';

<InvertedIndexTypesSummary/>

- Enable one or both of `indexFilterable` and `indexRangeFilters` to index a property for faster filtering.
    - If only one is enabled, the respective index is used for filtering.
    - If both are enabled, `indexRangeFilters` is used for operations involving comparison operators, and `indexFilterable` is used for equality and inequality operations.

This chart shows which filter makes the comparison when one or both index type is `true` for an applicable property.

| Operator | `indexRangeFilters` only | `indexFilterable` only | Both enabled |
| :- | :- | :- | :- |
| Equal | `indexRangeFilters` | `indexFilterable` | `indexFilterable` |
| Not equal | `indexRangeFilters` | `indexFilterable` | `indexFilterable` |
| Greater than | `indexRangeFilters` | `indexFilterable` | `indexRangeFilters` |
| Greater than equal | `indexRangeFilters` | `indexFilterable` | `indexRangeFilters` |
| Less than | `indexRangeFilters` | `indexFilterable` | `indexRangeFilters` |
| Less than equal | `indexRangeFilters` | `indexFilterable` | `indexRangeFilters` |

#### Inverted index for timestamps

You can also enable an inverted index to search [based on timestamps](/developers/weaviate/config-refs/schema/index.md#invertedindexconfig--indextimestamps).

Timestamps are currently indexed using the `indexFilterable` index.

## Collections without indices

If you don't want to set an index at all, this is possible too.

To create a collection without any indexes, skip indexing on the collection and on the properties.

```js
{
    "class": "Author",
    "description": "A description of this collection, in this case, it's about authors",
    "vectorIndexConfig": {
        "skip": true // <== disable vector index
    },
    "properties": [
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "indexSearchable": false,  // <== disable searchable index for this property
            "dataType": [
                "text"
            ],
            "description": "The name of the Author",
            "name": "name"
        },
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "dataType": [
                "int"
            ],
            "description": "The age of the Author",
            "name": "age"
        },
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "dataType": [
                "date"
            ],
            "description": "The date of birth of the Author",
            "name": "born"
        },
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "dataType": [
                "boolean"
            ],
            "description": "A boolean value if the Author won a nobel prize",
            "name": "wonNobelPrize"
        },
        {
            "indexFilterable": false,  // <== disable filterable index for this property
            "indexSearchable": false,  // <== disable searchable index for this property
            "dataType": [
                "text"
            ],
            "description": "A description of the author",
            "name": "description"
        }
    ]
}
```

## Further resources

:::info Related pages
- [Concepts: Vector Indexing](./vector-index.md)
- [Configuration: Vector index](../config-refs/schema/vector-index.md)
:::



## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
