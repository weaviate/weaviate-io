---
layout: layout-documentation
solution: weaviate
sub-menu: Architecture
title: Filtered Vector Search
description: Weaviate allows for efficiently combining vector and scalar search
tags: ['architecture', 'filtered vector search', 'pre-filtering']
sidebar_position: 4
open-graph-type: article
toc: true
---

# Introduction

Weaviate provides powerful filtered vector search capabilities, meaning that you can eliminate
candidates in your "fuzzy" vector search based on individual properties. Thanks
to Weaviate's efficient pre-filtering mechanism, you can keep the recall high -
even when filters are very restrictive. Additionally, the process is efficient
and has minimal overhead compared to an unfiltered vector search.

# Post-Filtering vs Pre-Filtering

Systems that cannot make use of pre-filtering typically have to make use of
post-filtering. This is an approach where a vector search is performed first
and then some results are removed which do not match the filter. This leads to two major disadvantages:

1. You cannot easily predict how many elements will be contained in the search,
   as the filter is applied to an already reduced list of candidates.
2. If the filter is very restrictive, i.e. it matches only a small percentage
   of data points relative to the size of the data set, there is a chance that
   the original vector search does not contain any match at all.

The limitations of post-filtering are overcome by pre-filtering. Pre-Filtering
describes an approach where eligible candidates are determined before a vector
search is started. The vector search then only considers candidates that are
present on the "allow" list.

*Note: Some authors make a distinction between "pre-filtering" and
"single-stage filtering" where the former implies a brute-force search and the
latter does not. We do not make this distinction, as Weaviate does not have to
resort to brute-force searches, even when pre-filtering due to the its
combined inverted index and HNSW index.*

# Efficient Pre-Filtered Searches in Weaviate

In the section about Storage, [we have described in detail which parts make up a
shard in Weaviate](./storage.html). Most notably, each shard contains an
inverted index right next to the HNSW index. This allows for efficient
pre-filtering. The process is as follows:

1. An inverted index (similar to a traditional search engine) is used to create
   an allow-list of eligible candidates. This list is essentially a list of
   `uint64` ids, so it can grow very large without sacrificing efficiency.
2. A vector search is performed where the allow-list is passed to the HNSW
   index. The index will move along any node's edges normally, but will only
   add ids to the result set that are present on the allow list. The exit
   conditions for the search are the same as for an unfiltered search: The
   search will stop when the desired limit is reached and additional candidates
   no longer improve the result quality.

# Recall on Pre-Filtered Searches

Thanks to Weaviate's custom HNSW implementation, which persists in following all links in
the HNSW graph normally and only applying the filter condition when considering
the result set, graph integrity is kept intact. The recall of a filtered search is
typically not any worse than that of an unfiltered search.

The graphic below shows filters of varying levels of restrictiveness. From left
(100% of dataset matched) to right (1% of dataset matched) the filters become
more restrictive without negatively affecting recall on `k=10`, `k=15` and
`k=20` vector searches with filters.

<!-- ![Recall for filtered vector search](/img/recall-of-filtered-vector-search.png "Recall of filtered vector search in Weaviate") -->

# Flat-Search Cutoff

Version `v1.8.0` introduces the ability to automatically switch to a flat
(brute-force) vector search when a filter becomes too restrictive. This
scenario only applies to combined vector and scalar searches. For a detailed
explanation of why HNSW requires switching to a flat search on certain filters,
see this article in [towards data
science](https://towardsdatascience.com/effects-of-filtered-hnsw-searches-on-recall-and-latency-434becf8041c).
In short, if a filter is very restrictive (i.e. a small percentage of the
dataset is matched), an HNSW traversal becomes exhaustive. In other words, the
more restrictive the filter becomes, the closer the performance of HNSW is to a
brute-force search on the entire dataset. However, with such a restrictive
filter, we have already narrowed down the dataset to a small fraction. So if the
performance is close to brute-force anyway, it is much more efficient to only
search on the matching subset as opposed to the entire dataset. 

The following graphic shows filters with varying restrictiveness. From left (0%)
to right (100%), the filters become more restrictive. The **cut-off is configured at
~15% of the dataset** size.  This means the right side of the dotted line uses a
brute-force search.

<!-- ![Prefiltering with flat search cutoff](/img/prefiltering-response-times-with-filter-cutoff.png "Prefiltering with flat search cutoff") -->

As a comparison, with pure HNSW - without the cutoff - the same filters would
look like the following:

<!-- ![Prefiltering with pure HNSW](/img/prefiltering-pure-hnsw-without-cutoff.png "Prefiltering without cutoff, i.e. pure HNSW") -->

The cutoff value can be configured as [part of the `vectorIndexConfig` settings
in the schema](../vector-index-plugins/hnsw.html#how-to-use-hnsw-and-parameters)
for each class separately.

# Cachable Filters

Starting with `v1.8.0`, the inverted index portion of a filter can be cached and
reused - even across different vector searches. As outlined in the sections
above, pre-filtering is a two-step process. First, the inverted index is queried
and potential matches are retrieved. This list is then passed to the HNSW
index. Reading the potential matches from disk (step 1) can become a bottleneck
in the following scenarios:

* when a very large amount of IDs match the filter or
* when complex query operations (e.g. wildcards, long filter chains) are used

If the state of the inverted index has not changed since the last query, these
"allow lists" can now be reused. **Note: Even with the filter portion from
cache, each vector search is still performed at query time. This means that two
previously unseen vector searches can still make use of the cache as long as
they use the same filter.**

Example:

```graphql
# search 1
where: {
  operator: Equal
  path: ["publication"]
  valueString: "NYT"
}
nearText: {
  concepts: ["housing prices in the western world"]
}

# search 2
where: {
  operator: Equal
  path: ["publication"]
  valueString: "NYT"
}
nearText: {
  concepts: ["where do the best wines come from?"]
}
```

The two semantic queries have very little relation and most likely there will
be no overlap in the results. However, because the scalar filter
(`publication==NYT`) was the same on both it can be reused on the second query.
This makes the second query as fast as an unfiltered vector search.

## Performance of vector searches with cached filters

The following was run single-threaded (i.e. you can add more CPU threads to
increase throughput) on a dataset of 1M objects with random vectors of 384d
with a warm filter cache.

Please note that each search uses a completely unique (random) search vector,
meaning that only the filter portion is cached, but not the vector search
portion, i.e. on `count=100`, 100 unique query vectors were used with the same
filter.

<!-- [![Performance of filtered vector search with caching](/img/filtered-vector-search-with-caches-performance.png "Performance of filtered vector searches with 1M 384d objects")](/img/filtered-vector-search-with-caches-performance.png) -->

*Note that wildcard filters show considerably worse performance than exact
match filters. This is because - even with caching - multiple rows need to be
read from disk to make sure that no stale entries are served when using
wildcards. See also "Automatic Cache Invalidation" below.*

## Automatic Cache Invalidation

The cache is built in a way that it cannot ever serve a stale entry. Any write
to the inverted index updates a hash for the specific row. This hash is used as
part of the key in the cache. This means that if the underlying inverted index
is changed, the new query would first read the updated hash and then run into a
cache miss (as opposed to ever serving a stale entry). The cache has a fixed
size and entries for stale hashes - which cannot be accessed anymore - are
overwritten when it runs full.
