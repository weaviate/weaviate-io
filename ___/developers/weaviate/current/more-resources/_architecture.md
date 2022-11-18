---
layout: layout-documentation
solution: weaviate
sub-menu: More resources
title: Architecture
intro: 
tags: ['Architecture']
sidebar_position: 4
open-graph-type: article
toc: true
redirect_from:
    - /documentation/weaviate/current/more-resources/architecture.html
---

...

# More resources - bullet points, not ready for publishing (!)

The following are some bullet points, that need to be converted to proper text.
I tried to be quite detailed, if there are details in there that should not be
published, feel free to remove them, as long as the general message still makes
sense. Simiarly all bullet points are brutally honest, for some there might be
a more marketing-suited way of saying the same things. Feel free to adopt.

## 0.22.x ("Third-party setup")

### 10,000 feet few
* The "Core" Weaviate application (not to be confused with the Weviate Stack)
  itself is statelss and stores its data in third-party databases
* The two databases used are `etcd` and `Elasticsearch`. 
* `Etcd` has mostly historic reasons and is currently used to store
  configuration, the schema and contextionary extensions
* `Elasticsearch` stores all data objects and provides search functionalities
* The "Core" Weaviate application handles converting text-to-vector, enrichting
  the schema in dataobjects, building and resolving of cross-references,
  validation and the APIs

### Vector Search
* When a vector search happens, Core uses the Contextionary to convert the
  query text to a vector and passes it to Elasticsearch. 
* Elasticsearch does a consine similarity comparison using the OSS plugin
  `lior-k/fast-elasticsearch-vector-scoring`
* This is a primitive, exhaustive approach, in other words, the query vector is
  compared to every other vector in the index with O(n) time complexity

### Structured Search
* A structured search uses the default ES/Lucene inverted indices

### Other
* One weaviate schema class maps to one Elasticsearch index
* By default, 3 Elasticsearch shards are created for one index
* Weaviate Core is stateless, so it can be horizontally scaled at will
* Elasticsearch can be scaled horizontally
* Etcd can be scaled horizontally, but it is unlikely that etcd will become the
  bottleneck in the stack.
* The contextionary container (only present when the "Semantic Search
  Extension" is enbaled), converts text to vectors, both on import, as well as
  at query time.
* During an import load typically peaks in both the contextionary containers,
  as well as in the Elasticsearch containers. They are usually the first
  components that require scaling. As a rule of thumb, monitor your cluster and
  scale whatever requires the most resources, as different dataset have
  different requirements.

## 1.0.0 ("Standalone")

### 10,000 feet few
* The "Core" Weaviate application handles all persistence, no third-party
  databases are involved.
* Weaviate's persistence layer is built to be vector-native. At the same time
  it provides the benefits of combined structured search with vector-search
  that has been popular in 0.22.x.
* Each class maps to an index. An index is a self-contained unit consisting
  of 1..n shards.
* Each shard is a self-contained unit consisting of 3 parts: (1) A key-value
  store holding all data objects as presented by the user, (2) a Lucene-like
  inverted index allowing for structured search, (3) a vector index allowing
  for vector search.
* The key-value store and inverted index use `boltdb` for its disk-interaction
* The vector-index is a custom `hnsw` implementation, optimized for
  persistence. In the future, other vector indices can be used, however HNSW
  should be a good fit for most cases.

### Vector-Search
* If the "Semantic Search Extension" is used, the Contextionary translates the
  text to a query vector, otherwise the user provides a query vector directly.
* The internal HNSW index for that particular class-index is used for a kNN search.
* HNSW returns document ids, they are "resolved" to their full data objects
  using the inverted index and object data key-value store
* This process roughly has O(log n) time complexity and is therefore orders of
  magnitude faster on large indices

### Structured search
* If the search is a pure structured search (without combining it with a vector
  search), the inverted indices are used to retrieve the document ids. The
  document ids are resolved to data objects, which are then served to the user.
* If the search is a combined vector and structured search, the inverted index
  is used to build an allow list of matching document ids. This allow list is
  passed to the vector index. (The rest of this answer is specific to HNSW:)
  The vector index follows all links normally, but in the lowest level, it only
  includes document ids which are present on the allow list in the result list.
* A future optimization will skip the vector index and perform a primitive
  search on the allow list. There is a point where a primitive search can be
  more efficient for two reasons: (1) If the allow list is already short, only
  few vector comparisons have to be made, in other words a primitive approach
  becomes faster with fewer items. (2) HNSW on the other hand can actually
  become slower with a short allow list. Because if the allowed items happen to
  be very-far from the query vector - in other words, there are closer matches,
  but they aren't contained on the allowlist - the search can become
  exhaustive. However, exhaustive in this case means exhaustive against the
  entire index, which can be considerably slower. Imagine the following extreme
  example. The index contains 1bn elements, the allow list contains two
  elements. There are 500m items closer to the query vector than the two
  results, but they are not contained on the allow list. The primitive approach
  will have to do only two comparisons. The HNSW approach will have to do 500m
  vector comparisons until it even discovers the allowed items.

### Multi-node setup / distributed setup / horizontal scaling
* This feature will not be present in `1.0.0` yet, it will follow in a future
  released. However, the entire persistence layer has been build with
  horizontal scalability in mind.
* The purpose of shards is to distribute parts of the index among multiple
  nodes in the cluster. 
* Replication is masterless, i.e. there are no primary or secondary shards,
  each replication can accept writes. Therefore true horizontal scaling is
  possible, even when the number of shards is set to 1
* Examples:
  * in a 5-node cluster with 1 index made up of 1 shard and replication set to
    5, each node owns a copy of the entire index. The total disk/memory
    requirements are five times that of the index. The cluster is highly
    available, as up to 4 nodes could fail and all data could still be served.
    Additionally, this configuration has the highest query performance - even
    on queries which are biased towards a certain area of the index - as every
    node can fully answer every query.
  * in a 5-node cluster with 1 index made up of 5 shards and replication set to
    three, each node owns three (different) shards. Therefore the total
    disk/memory requirements are three times that of the index (5 shards each
    containing one 5th of the index replicated 3 times -> 5/5 * 3 = 3). The
    cluster is highly-available, up to 2 nodes can fail and the cluster can
    still serve everything. If more than 2 nodes fail, there is a chance that
    all 3 nodes containing a shard are down. In this case the affected shard
    (i.e. one fifth of the total index) cannot be served.
  * in a 5-node cluster with 1 index made up of 1 shard and replication is set
    to 3: The cluster is not utilized properly. The single shard is replicated
    onto 3 nodes, therefore two nodes don't hold any data at all and are
    idling. In this case the index should have been made up of more shards.
* Weaviate is an AP-database with respect to the CAP theorem.

### Memory usage
* The HNSW index needs to fit into memory. Note that this doesn't mean that
  every single vector has to fit into memory, just the index structure (a graph
  with plenty of links) needs to fit. Failing to provide enough memory for the
  index to fit, Weaviate cannot start up.
* Vectors which are commonly used in similarity comparisons are cached, it is
  therefore not required that every single vector fits into memory. If the
  cache runs full, items are deleted. If the cache is deleted to frequently a
  lot of disk reads are required. For maximum performance the cache should be
  designed so that it fits all vectors. However - on very large clusters, which
  is where memory requirements are most relevant - it is unlikely that incoming
  search queries are evenly distributed over the entire index. So, most real
  life cases can use a vector cache that is smaller than all vectors and still
  achieve great performance.
* The key-value stores for the inverted indices and object storage are
  memory-mapped. So roughly 50% of the available memory (YMMV, depends on the
  data set and query profile) should be left as linux page cache.

## Standalone mode in 0.22.x
**NOTE: KEEP THIS HEADER FOR REFS FROM THE SOFTWARE ERROR MESSAGES (https://semi.technology/documentation/weaviate/current/more-resources/architecture.html#standalone-mode-in-022x)**

* **Important**: While standalone mode is a preview of the standalone feature
  which will become the standard in 1.0.0, standalone mode is **not a preview
  of 1.0.0**. In other words, the switch to 1.0.0 will probably contain
  breaking changes which are not currently reflected in 0.22.x standalone mode
* As of 0.22.16, standalone mode is not feature complete, the limitations can
  be seen in [link to limitations page in contributor docs]
* Instead standalone mode in 0.22.x is meant as a preview to see what Weaviate
  will be like once it no longer depends on third-party DBs for its persistence
* As of 0.22.16, standalone mode currently still requires `etcd` in the stack.
  This has no technical reasons, a replacement for the data currently stored
  there, simply hasn't been built yet into Weaviate Standalone. `Etcd` will be
  removed completely before `1.0.0`
* as of 0.22.16 each index has a single shard. Support for a custom number of
  shards will be added before `1.0.0`

{% include docs-support-links.html %}
