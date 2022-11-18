---
layout: layout-documentation
solution: weaviate
sub-menu: Architecture
title: Resource Planning
description: Size your Weaviate nodes according to your needs
tags: ['architecture', 'resource', 'cpu', 'memory', 'gpu']
sidebar_position: 4
open-graph-type: article
toc: true
---

# Introduction

When using Weaviate for medium to large-scale cases, it is recommended to plan your
resources accordingly. Typically, small use cases (less than 1M objects) do not
require resource planning. For use cases larger than that, you
should be aware of the roles of CPU and memory which are the primary resources
used by Weaviate. Depending on the (optional) modules used, GPUs may also play
a role.

Note that Weaviate has an option to limit the amount of vectors held in memory
to prevent unexpected Out-of-Memory ("OOM") situations. This limit is entirely
configurable and by default is set to 2M objects per class. If your import
performance drops drastically after reaching 2M objects, see section [Vector
Cache](#vector-cache) below.

# The role of CPUs 

Rule of thumb: **The amount of available CPUs has a direct effect on query and
import speed, but does not affect dataset size.**

The most common operation that is CPU-bound in Weaviate is a vector search.
Vector searches occur at query time, but also at import time. When using the
HNSW vector index, an insert operation makes use of several search operations.
This is how the HNSW algorithm knows where to place new entries in the existing
graph. 

A single insert or single search is single-threaded. But multiple searches or
inserts can occur at the same time and will make use of multiple threads. A
batch insert will run over multiple threads in parallel. It is therefore quite
common to max out CPU utilization by using decently sized batches for
importing. 

## Motivations to add more CPUs to your Weaviate machine or cluster

Typically you should consider adding more CPUs if:
- you want to increase import speed and CPU utilization is high during importing
- you want to increase search throughput (measured in queries per second) 

# The role of memory

Rule of thumb: **The amount of available Memory has a direct effect on the
maximum supported dataset size, but does not directly influence query speed.**

Memory has two distinct roles in Weaviate with one role typically being more
critical than the other. Weaviate uses [memory-mapped
files](https://en.wikipedia.org/wiki/Memory-mapped_file) for data stored on
disks, which helps make disk lookups more efficient. In addition, Weaviate must
hold portions of the HNSW index in memory. The latter is typically more
restrictive, as memory required for holding the HNSW index is purely related to
the size of your dataset and has no correlation to the current query load.

## Which concrete factors drive memory usage?

On an otherwise idle machine, memory usage is driven almost entirely by the
HNSW vector index. Factors that influence the amount of memory include:

- **The total number of objects with vectors**. The raw size of an object (e.g. how
  many KB of text are included) does not influence memory consumption, as the
  object itself is not kept in memory, but only its vector.
- **The HNSW index setting `maxConnections`**. This setting describes the
  outgoing edges of an object in the HNSW index, each edge uses 8-10B of
  memory. Each object has at most `maxConnections` edges. The base layer allows
  for `2 * maxConnections` as per the HNSW specification.

## An example calculation

*The following calculation assumes that you want to hold all vectors in memory.
For a memory/disk hybrid approach, see [Vector Cache](#vector-cache) below.*

To find an approximate number for your memory needs, you can use the
following rule of thumb: 

`Memory usage = 2x the memory footprint of all vectors`

For example, if you are using a model that uses 384-dimensional vectors of type
`float32`, the size of a single vector is `384 * 4B == 1536 B`. With the above
rule of thumb, the memory requirements for 1M objects would be `2 * 1e6 * 1536
B == 3 GB`

For a more accurate calculation you need to take the `maxConnections` setting
into account. Assuming a value of 64, the more accurate calculation would be
`1e6 * (1536B + 64*10) = 2.2 GB`. This value appears smaller than what the
approximate formula produced, however this calculation does not yet take into
account overhead for Garbage Collection which is explained in the next section.

## Motivations to add more Memory to your Weaviate machine or cluster

Typically you should consider adding more memory if:
- (more common) you want to import a larger dataset
- (less common) exact lookups are disk-bound and could be sped up by more memory
  for page-caching.

# Effect of Garbage Collection

Weaviate is written in Go, which is a Garbage-Collected Language. This means
in-heap memory (that is memory that has a lifetime longer than a typical
function call stack) is not made available to the application or the OS
immediately after it is no longer in use. Instead an asynchronous process, the
Garbage Collection cycle, will free up the memory, eventually. This has two
distinct effects on memory utilization:

## Effect 1: Memory Overhead for the Garbage Collector
The exact memory footprint formula from above describes the state at rest.
However, while importing, more temporary memory is allocated and eventually
freed up. Due to the async nature of Garbage collection, this additional memory
must be accounted for, which is done by the approximate formula from above. 

## Effect 2: Out-of-Memory issues due to Garbage Collection
In rare situations - typically on large machines with very high import speeds -
Weaviate may get into situations where memory is allocated faster than the
Garbage Collector can free it up, leading to an OOM-Kill from the system's
Kernel. This is a known issue, which is constantly being improved upon by
Weaviate's contributors.

Noticeably, the `v1.8.0` release contains a large series of memory improvements
which make the above situation considerably more unlikely. These improvements
include rewriting structures to be allocation-free or reduce the number of
allocations required. This means temporary memory can be used on the stack and
does not have to be allocated on the heap. As a result, this temporary memory
is not subject to garbage collection. This is an ongoing improvement process
and future releases will further reduce the number of heap-allocations for
temporary usage.

# Strategies to reduce Memory Requirements

If memory usage (or expected memory usage) is higher than your resources
permit, you may choose one of the following strategies to reduce memory
requirements:

- **Reduce the dimensionality of your vectors.** The most effective approach is
  often to make sure that vectors have fewer dimensions. If you are using one
  of the out-of-the-box models, consider using a model that uses fewer
  dimensions (e.g. 384d instead of 768d or 300d instead of 600d). Very often,
  there is no noticeable quality impact on real-life queries.

- **Reduce the number of `maxConnections` in your HNSW index**. Reducing this
  setting will typically reduce the quality of your HNSW index. However, you can
  make up for the quality loss of fewer edges by increasing either the
  `efConstruction` or `ef` parameters. Increasing the `efConstruction`
  parameter will increase the import time without affecting query times.
  Increasing the `ef` parameter, will increase query times without affecting
  import times.

- **Use a vector cache that is smaller than the total amount of your vectors**.
  This strategy is described under [Vector Cache](#vector-cache) below. It does
  however come with a drastic performance impact and is only recommended in
  specific situations.

# Vector Cache

For optimal search and import performance, all previously imported vectors need
to be held in memory. However, Weaviate also allows for limiting the number of
vectors in memory. By default, when creating a new class, this limit is set to
2M objects. A disk lookup for a vector is orders of magnitudes slower than
memory lookup, so the cache should be used sparingly.

Generally we recommend that:
- During imports, set the limit so that all vectors can be held in memory. Each
  import requires multiple searches so import performance will drop drastically
  as not all vectors can be held in the cache.
- When only or mostly querying (as opposed to bulk importing), you can
  experiment with vector cache limits which are lower than your total dataset
  size. Vectors which aren't currently in cache will be added to the cache if
  there is still room. If the cache runs full, it is dropped entirely and all
  future vectors need to be read from disk the first time. Subsequent
  queries will be taken from the cache, until it runs full again and the
  procedure repeats. Note that the cache can be a very valuable tool if you
  have a large dataset, but a large percentage of users only query a specific
  subset of vectors. In this case, you might be able to serve the largest user
  group from cache while requiring disk lookups for "irregular" queries.

## Imports slowed down after crossing ~2M objects - what can I do?

If you notice that your import performance drops drastically after the 2M
objects (per class) mark, you are most likely running into the default 2M limit
of the vector cache. You can [adjust the limit on existing
classes](../vector-index-plugins/hnsw.html#how-to-use-hnsw-and-parameters)
without having to recreate the class or reimport.

# The role of GPUs in Weaviate

Weaviate Core itself does not make use of GPUs, however some of the models
included in various modules (`text2vec-transformers`, `qna-transformers`,
`ner-transformers`, etc.) are meant to be run with GPUs. These modules run in
isolated containers, so you can run them on GPU-accelerated hardware while
running Weaviate Core on low-cost CPU-only hardware.

# Disks: SSD vs Spinning Disk

Weaviate is optimized to work with Solid-State Disks (SSDs). However, spinning
hard-disks can be used with some performance penalties.

# More Resources

{% include docs-support-links.html %}
