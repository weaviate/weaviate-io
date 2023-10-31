---
title: Resource Planning
sidebar_position: 90
image: og/docs/concepts.jpg
# tags: ['architecture', 'resource', 'cpu', 'memory', 'gpu']
---


## Introduction

Weaviate scales well for large projects. Smaller projects, less than 1M objects, do not require resource planning. For medium and large-scale projects, you should plan how to get the best performance from your resources. While you design you system, keep in mind CPU and memory management. CPU and memory are the primary resources for Weaviate instances. Depending on the modules you use, GPUs may also play a role.

## The role of CPUs

:::tip Rule of thumb
The CPU has a direct effect on query and import speed, but does not affect dataset size.
:::

Vector search is the most CPU intensive process in Weaviate operations. Queries are CPU-bound, but imports are also CPU-bound because imports rely on vector search for indexing. Weaviate uses the HNSW (Hierarchical Navigable Small World) algorithm to index vectors. You can [tune the HNSW index](/developers/weaviate/configuration/indexes) on a per collection basis in order to maximize performance for your primary use case.

Each insert, or search, is single-threaded. However, if you make multiple searches or inserts at the same time, Weaviate can make use of multiple threads. [Batch inserts](/developers/weaviate/manage-data/import) use multiple threads to process data in parallel.

### When to add more CPUs to your Weaviate machine or cluster

When CPU utilization is high during importing, add CPUs to increases import speed.

When search throughput is limited, add CPUs to increase the number of queries per second.

## The role of memory

:::tip Rule of thumb
Memory determines the maximum supported dataset size. Memory does not directly influence query speed.
:::

The HNSW index must be stored in memory. The memory required is directly related to the size of your dataset. There is no correlation between the size of your dataset and the current query load. You can use [`product quantization (PQ)`](/developers/weaviate/concepts/vector-index#hnsw-with-product-quantization-pq) to compress the vectors in your dataset in increase the number of vectors your can hold in memory.

Weaviate let's you configure a limit to the number of vectors held in memory in order to prevent unexpected Out-of-Memory ("OOM") situations. The default value is one trillion (`1e12`) objects.  per collection. To adjust the number of objects, update the value of [`vectorCacheMaxObjects`](/developers/weaviate/configuration/indexes) in your index settings.

Weaviate also uses [memory-mapped files](https://en.wikipedia.org/wiki/Memory-mapped_file) for data stored on disks. Memory-mapped files are efficient, but disk storage is much slower than in-memory storage.

### Which factors drive memory usage?

The HNSW vector index is the primary driver of memory usage. These factors influence the amount of memory Weaviate uses:

- **The total number of object vectors**. The number of vectors is important, but the raw size of the original objects is not important. Only the vector is stored in memory. The size of the original text or other data is not a limiting factor.
- **The `maxConnections` HNSW index setting**. Each object in memory has at most [`maxConnections`](/developers/weaviate/configuration/indexes) connections per layer. Each of the connections uses 8-10B of memory. Note that the base layer allows for `2 * maxConnections`.

### An example calculation

:::note
The following calculation assumes that you want to hold all vectors in memory. For a hybrid approach that combines in memory and on-disk storage, see [Vector Cache](#vector-cache) below.
:::

To estimate your memory needs, use the following rule of thumb:

`Memory usage = 2x the memory footprint of all vectors`

For example, if you have a model that uses 384-dimensional vectors of type `float32`, the size of a single vector is `384 * 4B == 1536 B`. Applying the rule of thumb, the memory requirements for 1M objects would be `2 * 1e6 * 1536 B == 3 GB`

For a more accurate calculation you also need to take the `maxConnections` setting into account.

Assuming `maxConnections` is 64 and the other values are the same. A more accurate memory estimate is `1e6 * (1536B + 64*10) = 2.2 GB`.

The estimate that includes `maxConnections` is smaller than the rule of thumb estimate. However, the `maxConnections` estimate doesn't account for garbage collection. Garbage collection adds overhead that is explained in the next section.

## Effects of garbage collection

Weaviate is written in Go, which is a garbage-collected language. This means some memory is not immediately available for reuse when it is no longer needed. The application has to wait for an asynchronous process, the garbage collector to free up the memory. This has two distinct effects on memory use:

### Memory overhead for the garbage collector
The memory calculation that includes `maxConnections` describes the system state at rest. However, while Weaviate imports vectors, additional memory is allocated and eventually freed by the garbage collector. Since garbage collection is an asynchronous process, this additional memory must also be accounted for. The 'rule of thumb' formula accounts for garbage collection.

### Out-of-Memory issues due to garbage collection
In rare situations - typically on large machines with very high import speeds - Weaviate can allocate memory faster than the garbage collector can free it. When this happens, the system kernel can trigger an `out of memory kill (OOM-Kill)`. This is a known issue that Weaviate is actively working on.

## Strategies to reduce memory usage

The following tactics can help to reduce Weaviate's memory usage:

- **Use vector compression (i.e. product quantization)**. This is a technique that can reduce the memory footprint of vectors. This can be enabled by setting `vectorIndexConfig/pq/enabled` to `true` in the collection definition. This may impact recall performance, so we recommend to test this setting on your dataset before using it in production. For more information, see [Product Quantization](../concepts/vector-index.md#hnsw-with-product-quantization-pq).

- **Reduce the dimensionality of your vectors.** The most effective approach reduce the number of dimensions per fector. Consider whether a model that uses fewer dimensions may be suitable for your use-case (e.g. 384d instead of 1536).

- **Reduce the number of `maxConnections` in your HNSW index settings**. Because each edge uses 8-10B of memory, reducing the maximum number can reduce the memory footprint. If this change adversely affects the recall performance of the HNSW index, you can mitigate this effect by increasing one or both of the `efConstruction` and `ef` parameters. Increasing `efConstruction` will increase the import time without affecting query times. Increasing `ef` will increase query times without affecting import times.

- **Use a vector cache that is smaller than the total amount of your vectors (not recommended)**. This strategy is described under [Vector Cache](#vector-cache) below. It can have a significant performance impact, and thus it is only recommended in specific situations.

## Vector Cache

For optimal search and import performance, all previously imported vectors need to be held in memory. The size of the vector cache is specified by the `vectorIndexConfig/vectorCacheMaxObjects` parameter in the collection definition. By default, when creating a new collection, this limit is set to one trillion (i.e. `1e12`) objects.

A disk lookup for a vector is orders of magnitudes slower than memory lookup, so reducing the `vectorCacheMaxObjects` should be done with care and we suggest this be done only as a last resort.

Generally we recommend that:
- During imports, set the limit so that all vectors can be held in memory. Each import requires multiple searches so import performance will drop drastically as not all vectors can be held in the cache.
- When only or mostly querying (as opposed to bulk importing), you can experiment with vector cache limits which are lower than your total dataset size. Vectors which aren't currently in cache will be added to the cache if there is still room. If the cache runs full, it is dropped entirely and all future vectors need to be read from disk the first time. Subsequent queries will be taken from the cache, until it runs full again and the procedure repeats. Note that the cache can be a very valuable tool if you have a large dataset, but a large percentage of users only query a specific subset of vectors. In this case, you might be able to serve the largest user group from cache while requiring disk lookups for "irregular" queries.

### When to add more Memory to your Weaviate machine or cluster

Typically you should consider adding more memory if:
- (more common) you want to import a larger dataset
- (less common) exact lookups are disk-bound and could be sped up by more memory for page-caching.

## The role of GPUs in Weaviate

Weaviate Core itself does not make use of GPUs, however some of the models included in various modules (`text2vec-transformers`, `qna-transformers`, `ner-transformers`, etc.) are meant to be run with GPUs. These modules run in isolated containers, so you can run them on GPU-accelerated hardware while running Weaviate Core on low-cost CPU-only hardware.

## Disks: SSD vs Spinning Disk

Weaviate is optimized to work with Solid-State Disks (SSDs). However, spinning hard-disks can be used with some performance penalties.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
