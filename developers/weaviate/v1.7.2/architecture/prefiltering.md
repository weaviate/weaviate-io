---
layout: layout-documentation
solution: weaviate
sub-menu: Architecture
title: Filtered Vector Search
description: Weaviate allows for efficiently combining vector and scalar search
tags: ['architecture', 'filtered vector search', 'pre-filtering']
menu-order: 4
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Introduction

Weaviate allows for filtered vector search, meaning that you can elimate
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
describes an approach where eligble candidates are determined before a vector
search is started. The vector search then only considers candidates that are
present on the allow list.

*Note: Some authors make a distinction between "pre-filtering" and
"single-stage filtering" where the former implies a brute-force search and the
latter does not. We do not make this distinction, as Weaviate does not have to
resort to brute-force searches, even when pre-filtering due to the its
combined inverted index and HNSW index.*

# Efficient Pre-Filtered Searches in Weaviate

In the section about Storage [we have described in detail which parts make up a
shard in Weaviate](../storage.html). Most notably, each shard contains an
inverted index right next to the HNSW index. This allows for efficient
pre-filtering. The process is as follows:

1. An inverted index (similar to a traditional search engine) is used to create
   an allow-list of eligble candidates. This list is essentially a list of
   `uint64` ids, so it can grow very large without sacrifycing efficiency.
2. A vector search is performed where the allow-list is passed to the HNSW
   index. The index will move along any node's edges normally, but will only
   add ids to the result set that are present on the allow list. The exit
   conditions for the search are the same as for an unfiltered search: The
   search will stop when the desired limit is reached and additional candidates
   no longer improve the result quality.

# Recall on Pre-Filtered Searches

Thanks to Weaviate's custom HNSW implementation still following all links in
the HNSW graph normally and only applying the filter condition when considering
the result set, the graph integrity is kept. The recall of a filtered search is
typically not any worse than that of an unfiltered search.

# Performance Benchmarks

We will publish performance benchmarks on recall and speed of a filtered vector
search in this place shortly.
