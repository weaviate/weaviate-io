---
title: Resource Planning
sidebar_position: 90
image: og/docs/concepts.jpg
# tags: ['architecture', 'resource', 'cpu', 'memory', 'gpu']
---


## Introduction

Weaviate scales well for large projects. Smaller projects, less than 1M objects, do not require resource planning. For medium and large-scale projects, you should plan how to get the best performance from your resources. While you design you system, keep in mind CPU and memory management. CPU and memory are the primary resources for Weaviate instances. Depending on the modules you use, GPUs may also play a role.


## Limit available resources

You can set [environment variables](../config-refs/env-vars.md) to manage Weaviate's resource usage, as to prevent Weaviate from using all available resources. The following environment variables are available:

- `LIMIT_RESOURCES`: When set to true, Weaviate automatically limits its resource usage. It sets memory usage to 80% of the total memory and uses all but one CPU core. It overrides any `GOMEMLIMIT` values but respects `GOMAXPROCS` settings.

- `GOMEMLIMIT`: This sets the memory limit for the Go runtime, which should be around 10-20% of the total memory available for Weaviate. It controls the aggressiveness of the Garbage Collector as memory usage approaches this limit.

- `GOMAXPROCS`: This sets the maximum number of threads for concurrent execution. If set, it's respected by `LIMIT_RESOURCES`, allowing users to specify the exact number of CPU cores Weaviate should use.

These settings help in optimizing Weaviate's performance by balancing resource utilization with the available system resources.


## The role of CPUs

:::tip Rule of thumb
The CPU has a direct effect on query and import speed, but does not affect dataset size.
:::

Vector search is the most CPU intensive process in Weaviate operations. Queries are CPU-bound, but imports are also CPU-bound because imports rely on vector search for indexing. Weaviate uses the HNSW (Hierarchical Navigable Small World) algorithm to index vectors. You can [tune the HNSW index](../config-refs/schema/vector-index.md) on a per collection basis in order to maximize performance for your primary use case.

To use multiple CPUs efficiently, create multiple shards for your collection. For the fastest imports, create multiple shards even on a single node.

Each insert, or search, is single-threaded. However, if you make multiple searches or inserts at the same time, Weaviate can make use of multiple threads. [Batch inserts](/developers/weaviate/manage-data/import) use multiple threads to process data in parallel.

### When to add more CPUs

When CPU utilization is high during importing, add CPUs to increases import speed.

When search throughput is limited, add CPUs to increase the number of queries per second.

## The role of memory

:::tip Rule of thumb
Memory determines the maximum supported dataset size. Memory does not directly influence query speed.
:::

The HNSW index must be stored in memory. The memory required is directly related to the size of your dataset. There is no correlation between the size of your dataset and the current query load. You can use [`product quantization (PQ)`](/developers/weaviate/concepts/vector-index#hnsw-with-product-quantization-pq) to compress the vectors in your dataset in increase the number of vectors your can hold in memory.

Weaviate let's you configure a limit to the number of vectors held in memory in order to prevent unexpected Out-of-Memory ("OOM") situations. The default value is one trillion (`1e12`) objects.  per collection. To adjust the number of objects, update the value of [`vectorCacheMaxObjects`](../config-refs/schema/vector-index.md) in your index settings.

Weaviate also uses [memory-mapped files](https://en.wikipedia.org/wiki/Memory-mapped_file) for data stored on disks. Memory-mapped files are efficient, but disk storage is much slower than in-memory storage.

### Which factors drive memory usage?

The HNSW vector index is the primary driver of memory usage. These factors influence the amount of memory Weaviate uses:

- **The total number of object vectors**. The number of vectors is important, but the raw size of the original objects is not important. Only the vector is stored in memory. The size of the original text or other data is not a limiting factor.
- **The `maxConnections` HNSW index setting**. Each object in memory has at most [`maxConnections`](../config-refs/schema/vector-index.md) connections per layer. Each of the connections uses 8-10B of memory. Note that the base layer allows for `2 * maxConnections`.

### An example calculation

:::note
The following calculation assumes that you want to hold all vectors in memory. For a hybrid approach that combines in memory and on-disk storage, see [Vector Cache](#vector-cache) below.
:::

To estimate your memory needs, use the following rule of thumb:

`Memory usage = 2x the memory footprint of all vectors`

For example, if you have a model that uses 384-dimensional vectors of type `float32`, the size of a single vector is `384 * 4B == 1536 B`. Applying the rule of thumb, the memory requirements for 1M objects would be `2 * 1e6 * 1536 B == 3 GB`

For a more accurate calculation you also need to take the `maxConnections` setting into account.

Assuming `maxConnections` is 64 and the other values are the same, a more accurate memory estimate is `1e6 * (1536B + 64*10) = 2.2 GB`.

The estimate that includes `maxConnections` is smaller than the rule of thumb estimate. However, the `maxConnections` estimate doesn't account for garbage collection. Garbage collection adds overhead that is explained in the next section.

## Effects of garbage collection

Weaviate is written in Go, which is a garbage-collected language. This means some memory is not immediately available for reuse when it is no longer needed. The application has to wait for an asynchronous process, the garbage collector to free up the memory. This has two distinct effects on memory use:

### Memory overhead for the garbage collector
The memory calculation that includes `maxConnections` describes the system state at rest. However, while Weaviate imports vectors, additional memory is allocated and eventually freed by the garbage collector. Since garbage collection is an asynchronous process, this additional memory must also be accounted for. The 'rule of thumb' formula accounts for garbage collection.

### Out-of-Memory issues due to garbage collection
In rare situations - typically on large machines with very high import speeds - Weaviate can allocate memory faster than the garbage collector can free it. When this happens, the system kernel can trigger an `out of memory kill (OOM-Kill)`. This is a known issue that Weaviate is actively working on.

### Data import
To avoid out-of-memory issues during imports, set `LIMIT_RESOURCES` to `True` or configure the `GOMEMLIMIT` environment variable. For details, see [Environment variables](../config-refs/env-vars.md).

## Strategies to reduce memory usage

The following tactics can help to reduce Weaviate's memory usage:

- **Use vector compression**. Product quantization (PQ) is a technique that reduces the size of vectors. Vector compression impacts recall performance, so we recommend testing PQ on your dataset before using it in production. <br/><br/> For more information, see [Product Quantization](../concepts/vector-index.md#hnsw-with-product-quantization-pq). <br/> To configure PQ, see [Compression](../configuration/pq-compression.md).

- **Reduce the dimensionality of your vectors.** The most effective approach to reducing memory size, is to reduce the number of dimensions per vector. If you have high dimension vectors, consider using a model that uses fewer dimensions. For example, a model that has 384 dimensions uses far less memory than a model with 1536 dimensions.

- **Reduce the number of `maxConnections` in your HNSW index settings**. Each object in memory has up to `maxConnections` connections. Each of those connections uses 8-10B of memory. To reduce the overall memory footprint, reduce `maxConnections`.

Reducing `maxConnections` adversely affects HNSW recall performance. To mitigate this effect,increase one or both of the `efConstruction` and `ef` parameters.

- Increasing `efConstruction` increases import time without affecting query times.
- Increasing `ef` increases query times without affecting import times.

- **Use a vector cache that is smaller than the total amount of your vectors (not recommended)**. This strategy is described under [Vector Cache](#vector-cache) below. It has a significant performance impact, and is only recommended in specific, limited situations.

## Vector Cache

For optimal search and import performance, all previously imported vectors need to be held in memory. The size of the vector cache is specified by the [`vectorCacheMaxObjects`](../config-refs/schema/vector-index.md) parameter in the collection definition. By default this limit is set to one trillion (`1e12`) objects when you create a new collection.

You can reduce the size of `vectorCacheMaxObjects`, but a disk lookup for a vector is orders of magnitudes slower than memory lookup. Only reduce the size of `vectorCacheMaxObjects` with care and as a last resort.

Generally we recommend that:
- During import set `vectorCacheMaxObjects` high enough that all vectors can be held in memory. Each import requires multiple searches. Import performance drop drastically when there isn't enough memory to hold all of the vectors in the cache.

- After import, when your workload is mostly querying, experiment with vector cache limits that are less than your total dataset size.

  Vectors that aren't currently in cache are added to the cache if there is still room. If the cache fills, Weaviate drops the whole cache. All future vectors have to be read from disk for the first time. Then, subsequent queries runs against the cache, until it fills again and the procedure repeats. Note that the cache can be a very valuable tool if you have a large dataset, and a large percentage of users only query a specific subset of vectors. In this case you might be able to serve the largest user group from cache while requiring disk lookups for "irregular" queries.

### When to add more Memory to your Weaviate machine or cluster

Consider adding more memory if:
- You want to import a larger dataset (more common).
- Exact lookups are disk-bound and more memory will improve page-caching (less common).

## The role of GPUs in Weaviate

Weaviate Core itself does not make use of GPUs. However, some of the models that Weaviate includes as modules are meant to run with GPUs, for example `text2vec-transformers`, `qna-transformers`, and `ner-transformers`. These modules run in isolated containers, so you can run the module containers on GPU-accelerated hardware while running Weaviate Core on low-cost CPU-only hardware.

## Disks: SSD vs Spinning Disk

Weaviate is optimized to work with Solid-State Disks (SSDs). However, spinning hard-disks can also be used with some performance penalties.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
