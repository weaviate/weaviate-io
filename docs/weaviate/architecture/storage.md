---
layout: layout-documentation
solution: weaviate
sub-menu: Architecture
title: Storage
description: Weaviate - storage
tags: ['architecture', 'storage']
sidebar_position: 3
open-graph-type: article
toc: true
---

# Introduction

Weaviate is a persistent and fault-tolerant database. This page gives you an
overview of how objects and vectors are stored within Weaviate and how an
inverted index is created at import time.

The components mentioned on this page aid Weaviate in creating some of its
unique features:

* Each write operation is immediately persisted and also tolerant to
  application and system crashes.
* On a vector search query, Weaviate returns the entire object (in other
  databases sometimes called a "document"), not just a reference, such as an ID.
* When combining structured search with vector search, filters are applied
  prior to performing the vector search. This means that you will always
  receive the specified number of elements as opposed to post-filtering when
  the final result count is unpredictable.
* Objects and their vectors can be updated or deleted at will; even while
  reading from the database.

## Logical Storage Units: Indices, Shards, Stores

Each class in Weaviate's user-defined schema leads to the creation of an index
internally. An index is a wrapper type that is comprised of one or many shards.
Shards within an index are self-contained storage units. Multiple shards can be
used to distribute the load among multiple server nodes automatically.

### Components of a Shard

Each shard houses three main components:

* An object store, essentially a key-value store
* An [inverted index](https://en.wikipedia.org/wiki/Inverted_index)
* A vector index store (pluggable, currently a [custom implementation of HNSW](/developers/weaviate/current/vector-index-plugins/hnsw.html))

**Important: Weaviate doesn't rely on any third-party databases. The three
components of a shard are all housed within Weaviate. This means that there are
no runtime dependencies to other services and all components will scale equally
with Weaviate.**

#### Object and Inverted Index Store

Since version `v1.5.0`, the object and inverted store are implemented using an 
[LSM-Treeapproach](https://en.wikipedia.org/wiki/Log-structured_merge-tree).
This means that data can be ingested at the speed of memory
and after meeting a configured threshold, Weaviate will write the entire
(sorted) memtable into a disk segment. When a read request comes in, Weaviate
will first check the Memtable for the latest update for a specific object. If
it is not present in the memtable, Weaviate will then check all previously
written segments starting with the newest. To avoid checking segments which
don't contain the desired objects, [Bloom
filters](https://en.wikipedia.org/wiki/Bloom_filter) are used.

Weaviate periodically merges older smaller segments into fewer larger segments.
Since segments are already sorted, this is a relatively cheap operation - happening
constantly in the background. Fewer, larger segments will make lookups more
efficient. Especially on the inverted index where data is rarely replaced and
often appended, instead of checking all past segments and aggregating potential
results, Weaviate can check a single segment (or few large segments) and
immediately find all required object pointers. In addition, segments are used
to remove past versions of an object that are no longer required, e.g. after a
delete or multiple updates.

**Important: Object/Inverted Storage use an LSM approach which makes use of
segmentation. However, the Vector Index is independent from those object
stores and is not affected by segmentation.**

*Note: Prior to version `v1.5.0`, Weaviate used a B+Tree storage mechanism
which could not keep up with the write requirements of an inverted index and
started becoming congested over time. With the LSM index, the pure write speed (ignoring
vector index building costs) is constant. There is no congestion over time.*

#### HNSW Vector Index Storage

Each shard contains its own vector index next to the structured stores
mentioned above. The vector store, however, is agnostic of the internals of the
object storage. As a result it does not suffer from segmentation problems. 

By grouping a vector index with the object storage within a shard, Weaviate can
make sure that each shard is a fully self-contained unit which can independently
serve requests for the data it owns. By placing the vector index next to
the object store (instead of within), Weaviate can avoid the downsides of a
segmented vector index.

### Shard Components Optimizations

As a rule of thumb: For structured/object data, Weaviate's storage mechanisms
accept and embrace segmentation as segments are cheap to merge and even
unmerged segments can be navigated efficiently thanks to Bloom filters. In turn,
the ingestion speed is high and does not degrade over time. For the vector
index, Weaviate aims to keep the index as large as possible within a shard, as
HNSW indices cannot efficiently be merged and querying a single large index is
more efficient that sequentially querying many small indices.

## Persistence and Crash Recovery

Both the LSM stores used for object and inverted storage, as well as the HNSW
vector index store make use of memory at some point of the ingestion journey.
To prevent data loss on a crash, each operation is additionally written into a
[Write-Ahead-Log
(WAL)](https://martinfowler.com/articles/patterns-of-distributed-systems/wal.html).
WALs are append-only files, which are very efficient to write and rarely the
bottleneck in ingestion.

By the time Weaviate has responded with a successful status to your ingestion
request, a WAL entry will have been created. If a WAL entry could not be
created - for example because the disks are full - Weaviate will respond with
an error to the insert or update request.

The LSM stores will try to flush a segment on an orderly shutdown. Only if the
operation is successful, will the WAL be marked as "complete". This means that
if an unexpected crash happens and Weaviate encounters an "incomplete" WAL,
it will recover from it. As part of the recovery process, Weaviate will flush a
new segment based on the WAL and mark it as complete. As a result, future
restarts will no longer have to recover from this WAL.

For the HNSW vector index, the WAL serves two purposes: It is both the
disaster-recovery mechanism, as well as the primary persistence mechanism. The
cost in building up an HNSW index is in figuring out where to place a new
object and how to link it with its neighbors. The WAL contains only the result
of those calculations. Therefore, by reading the WAL into memory, the HNSW index
will be in the same state as it was prior to a shutdown. 

Over time, an append only WAL will contain a lot of redundant information. For
example, imagine two subsequent entries which reassign all the links of a
specific node. The second operation will completely replace the result of the
first operation, thus the WAL no longer needs the first entry. To keep the WALs
fresh, a background process will continuously compact WAL files and remove
redundant information. This keeps the disk footprint small and the startup
times fast, as Weaviate does not need to store (or load) outdated information.

As a result, any change to the HNSW index is immediately persisted and there is
no need for periodic snapshots.

## Conclusions

This page introduced you to the storage mechanisms of Weaviate. It outlined how
all writes are persisted immediately and outlined the patterns used within
Weaviate to make datasets scale well. For structured data, Weaviate makes use of
segmentation to keep the write times constant. For the HNSW vector index,
Weaviate avoids segmentation to keep query times efficient. 

# More Resources

{% include docs-support-links.html %}
