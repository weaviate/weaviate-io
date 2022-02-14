---
layout: layout-documentation
solution: weaviate
sub-menu: More resources
title: Migration Guide
intro: 
tags: ['Migration']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Migration to version 0.23.x (Standalone)

With Weaviate version 0.23.x (also known as Weaviate Standalone), Weaviate is no longer dependent on third-party database services. The major change in this release is switching to Weaviate's own storing mechanism, replacing all third-party databases services which were required in previous versions. In practice this means, Weaviate no longer has a runtime dependency to Elasticsearch and etcd. Instead all storage operations are taken care of by Weaviate's custom vector-first storage system. It relies on a pluggable vector index. 

**As a result, Weaviate is now a vector-native search engine. All similarity-based search mechanism (explore concepts query, classifications, etc.) are considerably faster than before**. Sub-50ms 20NN-vector queries on datasets of over 1-100M objects are possible. Weaviate relies on a number of caches, but does not require keeping all vectors in memory. Thus it is also possible to run Weaviate on machines where the available memory is smaller than the size of all vectors. For an in-depth look at Weaviate's caching and mem/disk strategies, check out [this video](https://www.youtube.com/watch?v=tY_cAPQLwVU).

Important breaking changes and how to deal with them to upgrade your Weaviate instance:
1. **Reimport of data is required when upgrading from `0.22.x`.**
   As outlined above, Weaviate now uses a completely different storage mechanism. Thus a live upgrade from 0.22.x is not possible. Instead, all data needs to be reimported into an instance running 0.23.x.
2. **Deprecations removed.**
    The following items where already deprecated, and from `0.23.0` officially not removed:
    * `/v1/c11y/words` removed, use `/v1/c11y/concepts` instead
    * `?meta=true` on GET requests, use `?include=...` instead
    * `meta` property in object body removed, instead use the underscore fields directly, e.g. `_classification`
    * `meta` field in cross-references removed, instead use the `_classification` field directly
    * `cardinality` on properties already no longer had an effect in previous releases, but now the field is also removed
    * `keywords` on classes and properties no longer had an effect in in previous releases, but now the fields are also removed

# Vector-storage plugin: HNSW
The first (and currently only) vector-storage plugin supported is [HNSW](https://arxiv.org/abs/1603.09320). Weaviate does not rely on a third-party HNSW implementation, but instead provides a custom HNSW implementation optimized for real-life database usage. This means it supports all CRUD operations, makes sure any change is always persisted using a Write-Ahead-Commit-Log and performs various ongoing maintenance tasks under the hood to guarantee the health of a long-running database system. All inverted index and object storage operations use a custom Weaviate storage implementation that in turn relies on [bolt](https://github.com/boltdb/bolt)/[bbolt](https://github.com/etcd-io/bbolt) for disk operations.


# Limitations and roadmap
* As of `0.23.0` Weaviate is not horizontally scalable yet. It can therefore not be used as a distributed database or in HA-settings yet. However, all internals are designed to support horizontal scalability later on. This is a feature that will be made available in a future release.
* Performance improvements are suggested [here](https://github.com/semi-technologies/weaviate/milestone/15). This includes a suggestion regarding data object update (speed) performance. These issues are currently being researched or will be researched soon. Feel free to add an issue if you have any further ideas or suggestions on performance improvements.
* Version 1.0.0 of Weaviate is planned to be released in January. This involves some major breaking changes is the API. Keep updated by following us on [Github](https://github.com/semi-technologies/weaviate), our [newsletter](http://weaviate-newsletter.semi.technology/) or through [social media](https://www.linkedin.com/company/semi-technologies/).

# Official release notes
Official release notes can be found on [Github](https://github.com/semi-technologies/weaviate/releases/tag/0.23.0). 


# More resources

{% include docs-support-links.html %}