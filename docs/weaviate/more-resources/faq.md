---
title: FAQ
sidebar_position: 3
# layout: layout-documentation
# solution: weaviate
# sub-menu: More resources
# title: FAQ
# intro: Aha, you have a question! We hope that you can find the answer here, but if you don't, you can reach us via Stackoverflow (make sure to tag your question with weaviate), Github, or Slack. If your question serves a general-purpose, we will add it to this page.
# description: Frequently Asked Questions about Weaviate
# tags: ['FAQ']
# sidebar_position: 1
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.9.0/more-resources/faq.html
#     - /documentation/weaviate/current/more-resources/faq.html
#     - /developers/weaviate/more-resources/faq.html
---

<!-- IMPORTANT                                     -->
<!-- WHEN ADDING ANSWERS TO THIS OVERVIEW          -->
<!-- ALSO INCLUDE THEM INTO THE _data/faq.yml FILE -->

## Q: Why would I use Weaviate as my vector search engine?

A: Our goal is three-folded. Firstly, we want to make it as easy as possible for others to create their own semantic systems or vector search engines (hence, our APIs are GraphQL based). Secondly, we have a strong focus on the semantic element (the "knowledge" in "vector search engine," if you will). Our ultimate goal is to have Weaviate help you manage, index, and "understand" your data so that you can build newer, better, and faster applications. And thirdly, we want you to be able to run it everywhere. This is the reason why Weaviate comes containerized.

## Q: Do you offer Weaviate as a managed service?

A: Yes, it is called the [Weaviate Console](https://console.semi.technology/).

## Q: How to configure the size of your instance?

A: You can find this in the [architecture section](../architecture/resources.html#an-example-calculation) of the docs.

## Q: Does Weaviate use Hnswlib?

A: No

Weaviate uses a custom implementation of HNSW that overcomes certain limitations of [hnswlib](https://github.com/nmslib/hnswlib), such as durability requirements, CRUD support, pre-filtering, etc.

Custom HNSW implementation in Weaviate references:

- [HNSW plugin (Github)](https://github.com/semi-technologies/weaviate/tree/master/adapters/repos/db/vector/hnsw)
- [vector dot product ASM](https://github.com/semi-technologies/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s)

More information:

- [Weaviate, an ANN Database with CRUD support – DB-Engines.com](https://db-engines.com/en/blog_post/87) ⬅️ best resource on the topic
- [Weaviate's HNSW implementation in the docs)[/developers/weaviate/current/vector-index-plugins/hnsw.html)

_Note I: HNSW is just one implementation in Weaviate, but Weaviate can support multiple indexing algoritmns as outlined [here)[/developers/weaviate/current/vector-index-plugins/)_

## Q: Are all ANN algorithms potential candidates to become an indexation plugin in Weaviate?

A: No

Some algorithms (e.g., Annoy or ScaNN) are entirely immutable once built, they can neither be changed nor built up incrementally. Instead, they require you to have all of your vectors present, then you build the algorithm once. After a build, you can only query them, but cannot add more elements or change existing elements. Thus, they aren’t capable of the CRUD operations we want to support in Weaviate.

## Q: Does Weaviate use pre- or post-filtering ANN index search?

A: Weaviate currently uses pre-filtering exclusively on filtered ANN search.
See "How does Weaviate's vector and scalar filtering work" for more details.

## Q: How does Weaviate's vector and scalar filtering work?

A: It’s a 2-step process:

1. The inverted index (which is [built at import time](#q-does-weaviate-use-hnswlib)) queries to produce an allowed list of the specified document ids. Then the ANN index is queried with this allow list (the list being one of the reasons for our custom implementation).
2. If we encounter a document id which would be a close match, but isn’t on the allow list the id is treated as a candidate (i.e. we add it to our list of links to evaluate), but is never added to the result set. Since we only add allowed IDs to the set, we don’t exit early, i.e. before the top `k` elements are reached.

For more information on the technical implementations, see [this video](https://www.youtube.com/watch?v=6hdEJdHWXRE).

## Q: What is Weaviate's consistency model in a distributed setup?

A: Weaviate is generally modeled to prefer Availability over Consistency (AP over CP). It is designed to deliver low search latencies under high throughput in situations where availability is more business-critical than consistency. If strict serializability is required on your data, we generally recommend storing your data in a different primary data store, use Weaviate as an auxiliary data store, and set up replication between the two. If you do not need serializability and eventual consistency is enough for your use case, Weaviate can be used as a primary datastore.

Weaviate has no notion of transactions, operations always affect exactly a single key, therefore Serializability is not applicable. In a distributed setup (under development) Weaviate's consistency model is eventual consistency. When a cluster is healthy, all changes are replicated to all affected nodes by the time the write is acknowledged by the user. Objects will immediately be present in search results on all nodes after the import request completes. If a search query occurs concurrently with an import operation nodes may not be in sync yet. This means some nodes might already include the newly added or updated objects, while others don't yet. In a healthy cluster, all nodes will have converged by the time the import request has been completed successfully. If a node is temporarily unavailable and rejoins a cluster it may temporarily be out of sync. It will then sync the missed changes from other replica nodes and eventually serve the same data again. 

## Q: Can I train my own text2vec-contextionary vectorizer module?

A: Not yet (but soon), you can currently use the [available contextionaries](../getting-started/installation.html) in a variety of languages and use the transfer learning feature to add custom concepts if needed. Sign up to our [newsletter](http://weaviate-newsletter.semi.technology/) or [Slack channel]({{ site.slack_signup_url }}) to keep updated about the release of custom contextionary training

<!-- ## Q: Why is the contextionary created using GloVe?

A: There are many natural language processing vectorization models available. The reason we choose GloVe at the root of the model is that we rely on the spacial element that GloVe brings. Weaviate aims to _index data objects based on their semantics_ therefore, we need to calculate where the data object will be located in the vector space. Bidirectional models (e.g., BERT, ELMo, and co) don't provide a unique representation and are therefore not suited for our case. -->

## Q: Why does Weaviate have a schema and not an ontology?

A: We use a schema because it focusses on the representation of your data (in our case in the GraphQL API) but you can use a Weaviate schema to express an ontology. One of Weaviate's core features is that it semantically interprets your schema (and with that your ontology) so that you can search for concepts rather than formally defined entities.

## Q: What is the difference between a Weaviate data schema, ontologies and taxonomies?

A: Read about how taxonomies, ontologies and schemas are related to Weaviate in [this blog post](https://medium.com/semi-technologies/taxonomies-ontologies-and-schemas-how-do-they-relate-to-weaviate-9f76739fc695).

## Q: Can I use Weaviate to create a traditional knowledge graph.

A: Yes, you can! Weaviate support ontology, RDF-like definitions in its schema, and it runs out of the box. It is scalable, and the GraphQL API will allow you to query through your knowledge graph easily. But now you are here. We like to suggest you really try its semantic features. After all, you are creating a _knowledge_ graph 😉.

## Q: Why isn't there a text2vec-contextionary in my language?

A: Because you are probably one of the first that needs one! Ping us [here on Github](https://github.com/semi-technologies/weaviate/issues), and we will make sure in the next iteration it will become available (unless you want it in [Silbo Gomero](https://en.wikipedia.org/wiki/Silbo_Gomero) or another language which is whistled).

## Q: How to deal with custom terminology?

A: Sometimes, users work with custom terminology, which often comes in the form of abbreviations or jargon. You can find more information on how to use the endpoint [here)[/developers/weaviate/current/retriever-vectorizer-modules/text2vec-contextionary.html#extending-the-contextionary-v1modulestext2vec-contextionaryextensions)

## Q: How can you index data near-realtime without losing semantic meaning?

A: Every data object [gets its vector representation](../) based on its semantic meaning. In a nutshell, we calculate the vector position of the data object based on the words and concepts used in the data object. The existing model in the contextionary gives already enough context. If you want to get in the nitty-gritty, you can [browse the code here](https://github.com/semi-technologies/contextionary/tree/master/server), but you can also ask a [specific question on Stackoverflow](https://stackoverflow.com/tags/weaviate/) and tag it with Weaviate.

## Q: How do you deal with words that have multiple meanings?

A: How can Weaviate interpret that you mean a company, as in business, and not as the division of the army? We do this based on the structure of the schema and the data you add. A schema in Weaviate might contain a company class with the property name and the value Apple. This simple representation (company, name, apple) is already enough to gravitate the vector position of the data object towards businesses or the iPhone. You can read [here](../) how we do this, or you can ask a specific question on [Stackoverflow](https://stackoverflow.com/tags/weaviate/) and tag it with Weaviate.

## Q: Can I connect my own module?

[Yes!](../other-modules/custom-modules.html)

## Q: What is the difference between Weaviate and for example Elasticsearch?

A: Other database systems like Elasticsearch rely on inverted indices, which makes search super fast. Weaviate also uses inverted indices to store data and values. But additionally, Weaviate is also a vector-native search database, which means that data is stored as vectors, which enables semantic search. This combination of data storage is unique, and enables fast, filtered and semantic search from end-to-end.

## Q: How can slow queries be optimized?

A: Queries containing deeply nested references that need to be filtered or resolved can take some time. Read on optimization strategies [here](./performance.html#costs-of-queries-and-operations).

## Q: Data import takes long / is slow (slower than before v1.0.0), what is causing this and what can I do?

A: The first supported vector index type HNSW is super fast at query time, but slower on vectorization. This means that adding and updating data objects costs relatively more time. When there are other vector index types available, you van try another vector index type. 

## Q: Why did you use GraphQL instead of SPARQL?

A: Two words, user experience. We want to make it as simple as possible to integrate Weaviate into your stack, and we believe that GraphQL is the answer to this. The community and client libraries around GraphQL are enormous, and you can use almost all of them with Weaviate.

## Q: Do I need to know about Docker (Compose) to use Weaviate?

A: Weaviate uses Docker images as a means to distribute releases and uses Docker Compose to tie a module-rich runtime together. If you are new to those technologies, we recommend reading the [Docker Introduction for Weaviate Users](https://medium.com/semi-technologies/what-weaviate-users-should-know-about-docker-containers-1601c6afa079).

## Q: Can I request a feature in Weaviate?

A: Sure (also, feel free to [issue a pull request](https://github.com/semi-technologies/weaviate/pulls) 😉) you can [add those requests here](https://github.com/semi-technologies/weaviate/issues). The only thing you need is a Github account, and while you're there, make sure to give us a star 😇.

## Q: Does Weaviate require NFS volumes on Kubernetes?

A: By default, no NFS volumes are active. In a production setting, we recommend turning etcd disaster recovery on which requires an NFS volume. However, [the helm docs](../getting-started/installation.html) contain instructions on how to deploy an nfs-provisioner. For more details, see also this [stack overflow answer](https://stackoverflow.com/a/60505796/5322199).

## Q: When scalar and vector search are combined, will the scalar filter happen before or after the nearest neighbor (vector) search?

A: The mixed structured vector searches in Weaviate are pre-filter. There is an inverted index which is queried first to basically form an allow-list, in the HNSW search the allow list is then used to treat non-allowed doc ids only as nodes to follow connections, but not to add to the result set.

## Q: What would you say is more important for query speed in Weaviate: More CPU power, or more RAM?

More concretely: If you had to pick between a machine that has 16 GB of RAM and 2 CPUs, or a machine that has 8 GB of RAM and 4 CPUs, which would you pick?

A: This is a very difficult to answer 100% correctly, because there are several factors in play:
* **The vector search itself**. This part is CPU-bound, however only with regards to throughput: A single search is single-threaded. Multiple parallel searches can use multiple threads. So if you measure the time of a single request (otherwise idle), it will be the same whether the machine has 1 core or 100. However, if your QPS approach the throughput of a CPU, you'll see massive benefits by adding more Cores
* **The retrieval of the objects**. Once the vector search part is done, we are essentially left with a list of n IDs which need to be resolved to actual objects. This is IO-bound in general. However, all disk files are memory-mapped. So generally, more mem will allow you to hold more of the disk state in memory. In real life however, it's not that simple. Searches are rarely evenly distributed. So let's pretend that 90% of searches will return just 10% of objects (because these are more popular search results). Then if those 10% of the disk objects are already cached in mem, there's no benefit in adding more memory.

Taking the above in mind: we can carefully say: If throughput is the problem, increase CPU, if response time is the problem increase mem. However, note that the latter only adds value if there are more things that can be cached. If you have enough mem to cache your entire disk state (or at least the parts that are relevant for most queries), additional memory won't add any additional benefit.
If we are talking about imports on the other hand, they are almost always CPU-bound because of the cost of creating the HNSW index. So, if you can resize between import and query, my recommendation would be roughly prefer CPUs while importing and then gradually replace CPU with memory at query time - until you see no more benefits. (This assumes that there is a separation between importing and querying which might not always be the case in real life).

## Q: With relation to "filtered vector search”: Since this is a two-phase pipeline, how big can that list of IDs get? Do you know how that size might affect query performance?

A: Essentially the list ids uses the internal doc id which is a `uint64` or 8 bytes per ID. The list can grow as long as you have memory available. So for example with 2GB of free memory, it could hold 250M ids, with 20GB it could hold 2.5B ids, etc.

Performance wise there are two things to consider:
1. Building the lookup list
2. Filtering the results when vector searching

Building the list is a typical inverted index look up, so depending on the operator this is just a single read on == (or a set of range reads, e.g. for >7, we'd read the value rows from 7 to infinity). This process is pretty efficient, similar to how the same thing would happen in a traditional search engine, such as elasticsearch

Performing the filtering during the vector search depends on whether the filter is very restrictive or very loose. In the case you mentioned where a lot of IDs are included, it will be very efficient. Because the equivalent of an unfiltered search would be the one where your ID list contains all possible IDs. So the HNSW index would behave normally. There is however, a small penalty whenever a list is present: We need to check if the current ID is contained an the allow-list. This is essentially a hashmap lookup, so it should be O(1) per object. Nevertheless, there is a slight performance penalty.

Now the other extreme, a very restrictive list, i.e few IDs on the list, actually takes considerably more time. Because the HNSW index will find neighboring IDs, but since they're not contained, they cannot be added as result candidates, meaning that all we can do with them is evaluating their connections, but not the points themselves. In the extreme case of a list that is very, very restrictive, say just 10 objects out of 1B in the worst case the search would become exhaustive if you the filtered ids are very far from the query. In this extreme case, it would actually be much more efficient to just skip the index and do a brute-force indexless vector search on the 10 ids. So, there is a cut-off when a brute-force search becomes more efficient than a heavily-restricted vector search with HNSW. We do not yet have any optimization to discovery such a cut-off point and skip the index, but this should be fairly simple to implement if this ever becomes an actual problem.

## Q: Are there any 'best practices' or guidelines to consider when designing a schema? E.g. if I was looking to perform a semantic search over a the content of a Book would I look to have Chapter and Paragraph represented in the schema etc, would this be preferred over including the entire content of the novel in a single property?

A: As a rule of thumb, the smaller the units, the more accurate the search will be. Two objects of e.g. a sentence would most likely contain more information in their vector embedding than a common vector (which is essentially just the mean of sentences). At the same time more objects leads to a higher import time and (since each vector also makes up some data) more space. (E.g. when using transformers, a single vector is 768xfloat32 = 3KB. This can easily make a difference if you have millions, etc.) of vectors. As a rule of thumb, the more vectors you have the more memory you’re going to need.

So, basically, it’s a set of tradeoffs. Personally we’ve had great success with using paragraphs as individual units, as there’s little benefit in going even more granular, but it’s still much more precise than whole chapters, etc.

You can use cross-references to link e.g. chapters to paragraphs. Note that resolving a cross-references takes a slight performance penalty. Essentially resolving A1->B1 is the same cost as looking up both A1 and B1 indvidually. This cost however, will probably only matter at really large scale.

## Q: Should I use references in my schema?

A: In short: for convenience you can add relations to your data schema, because you need less code and queries to get data. But resolving references in queries takes some of the performance.

1. If your ultimate goal is performance, references probably don’t add any value, as resolving them adds a cost.
2. If your goal is represent complex relationships between your data items, they can help a lot. You can resolve references in a single query, so if you have classes with multiple links, it could definitely be helpful to resolve some of those connections in a single query. On the other hand, if you have a single (bi-directional) reference in your data, you could also just denormalize the links (e.g. with an ID field) and resolve them during search. 

## Q: Is it possible to create one-to-many relationships in the schema?

A: Yes, it is possible to reference to one or more objects (Class -> one or more Classes) through cross-references. [This example)[/developers/weaviate/current/tutorials/how-to-create-a-schema.html#creating-your-first-schema-with-the-python-client) shows how the `hasArticles` has references to the `Article` class. Referring to lists or arrays of primitives, this will be available [soon](https://github.com/semi-technologies/weaviate/issues/1611).

## Q: What is the different between `text` and `string` and `valueText` and `valueString`?

A: In general `value<Text|String>` should always match the data type in your schema. `text` is tokenized into basically just letters and numbers, whereas `string` is not tokenized. So if you want to have exact matches like email addresses use `string` and `valueString` because `text`/`valueText` would also match e.g. `jane doe` for `jane@doe.com`.

## Q: If I run a cluster (multiple instances) of Weaviate, do all the instances have to share a filesystem(PERSISTENCE_DATA_PATH)?

A: Horizontal Scalability is currently under development with an ETA for end of Q3 in 2021. Once it’s in it will not share filesystems, but each node will be truly independent with their own filesystem. The partitioning and replication strategies are modelled after Cassandra and Elasticsearch (Cassandra with regards to the virtual nodes in a ring, ES with regards to shards, because we need explicit shards for searching, whereas cassandra would only support direct access by (primary and partitioning) key. Until then Weaviate is currently confined to a single node. If you were to try to run two processes trying to access the same classes, I think it would fail, as each process would try to obtain a lock on the same files.

We have recently implemented a LSM tree based approached to storage in Weaviate v1.5: Object and Index storage is no longer done using a B+Tree approach (bolb/bbolt), but uses a custom LSM tree approach. This speeds up imports by over 100% depending on the use case.

## Q: With your aggregations I could not see how to do time buckets, is this possible?

A: At the moment, we cannot aggregate over timeseries into time buckets yet, but architecturally there's nothing in the way. If there is demand, this seems like a nice feature request, you can submit an [issue here](https://github.com/semi-technologies/weaviate/issues). (We're a very small company though and the priority is on Horizontal Scaling at the moment.)

## Q: Is there support to multiple versions of the query/document embedding models to co-exist at a given time? (helps with live experiments of new model versions)

A: You can create multiple classes in the Weaviate schema, where one class will act like a namespace in Kubernetes or an index in Elasticsearch. So the spaces will be completely independent, this allows space 1 to use completely different embeddings from space 2. The configured vectorizer is always scoped only to a single class. You can also use Weaviate's Cross-Reference features to make a graph-like connection between an object of Class 1 to the corresponding object of Class 2 to make it easy to see the equivalent in the other space.

## Q: Are there restrictions on UUID formatting? Do I have to adhere to any standards? 

A: The UUID must be presented as a string matching the [Canonical Textual representation](https://en.wikipedia.org/wiki/Universally_unique_identifier#Format). If you don’t specify a UUID, Weaviate will generate a `v4` i.e. a random UUID. If you generate them yourself you could either use random ones or deterministically determine them based on some fields that you have. For this you’ll need to use [`v3` or `v5`](https://en.wikipedia.org/wiki/Universally_unique_identifier#Versions_3_and_5_(namespace_name-based)). There are plenty of python packages available to do this.

## Q: What is the best way to iterate through objects? Can I do paginated API calls? 

A: Yes, pagination is supported. You can use the `offset` and `limit` parameters for GraphQL API calls. [Here's)[/developers/weaviate/current/graphql-references/filters.html#offset-filter-pagination) described how to use these parameters, including tips on performance and limitations.


## Q: What happens when the weaviate docker container restarts? Is my data in the weaviate database lost?

A: There are three levels:
1. You have no volume configured (the default in our `docker-compose` files), if the container restarts (e.g. due to a crash, or because of `docker stop/start`) your data is kept
2. You have no volume configured (the default in our `docker-compose` files), if the container is removed (e.g. from `docker-compose down` or `docker rm`) your data is gone
3. If a volume is configured, your data is persisted regardless of what happens to the container. They can be completely removed or replaced, next time they start up with a volume, all your data will be there

## Q: If I do not specify an UUID during adding data objects, will weaviate create one automatically?

A: Yes, a UUID will be created if not specified. 

## Q: What is best practice for updating data?

A: Here are top 3 best practices for updating data:
1. Use the [batch API](../restful-api-references/batch.html)
2. Start with a small-ish batch size e.g. 100 per batch. Adjust up if it is very fast, adjust down if you run into timeouts
3. If you have unidirectional relationships (e.g. `Foo -> Bar`.) it's easiest to first import all `Bar` objects, then import all `Foo` objects with the refs already set. If you have more complex relationships, you can also import the objects without references, then use the [`/v1/batch/references API`](../restful-api-references/batch.html) to set links between classes in arbitrary directions.

## Q: How can I run the latest master branch with docker-compose?

A: You can run Weaviate with `docker-compose`, you can build your own container off the [`master`](https://github.com/semi-technologies/weaviate) branch. Note that this is not an officially released Weaviate version, so this might contain bugs.

```sh
git clone https://github.com/semi-technologies/weaviate.git
cd weaviate
docker build --target weaviate -t name-of-your-weaviate-image .
```

Then, make a `docker-compose.yml` file with this new image. For example:

```yml
version: '3.4'
services:
  weaviate:
    image: name-of-your-weaviate-image
    ports:
      - 8080:8080
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: './data'
      ENABLE_MODULES: 'text2vec-contextionary'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-contextionary'
      AUTOSCHEMA_ENABLED: 'false'
  contextionary:
    environment:
      OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
      EXTENSIONS_STORAGE_MODE: weaviate
      EXTENSIONS_STORAGE_ORIGIN: http://weaviate:8080
      NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
      ENABLE_COMPOUND_SPLITTING: 'false'
    image: semitechnologies/contextionary:en0.16.0-v1.0.2
```

After the build is complete, you can run this Weaviate build with docker-compose: `docker-compose up`. 

## Q: How do I get the cosine similarity from Weaviate's certainty?

A: To obtain the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) from weaviate's `certainty`, you can do `cosine_sim = 2*certainty - 1`

## Q: My Weaviate setup is using more memory than what I think is reasonable. How can I debug this?

A: First of all, make sure your import runs with the latest version of Weaviate,
since `v1.12.0`/`v1.12.1` fixed an issue where [too much data was written to
disk](https://github.com/semi-technologies/weaviate/issues/1868) which then
lead to unreasonable memory consumption after restarts. If this did not fix the
issue yet, please see this post on [how to profile the memory usage of a
Weaviate setup](https://stackoverflow.com/a/71793178/5322199). 

## Q: The quality of my search results change depending on the specified limit. Why? How can I fix this?

Weaviate makes use of ANN indices to serve vector searches. An ANN index is an
approximate nearest neighbor index. The "approximate" part refers to an explicit
recall-query-speed tradeoff. This trade-off is
presented in detail in the [ANN benchmarks
section](../benchmarks/ann.html#results). For example, a 98% recall for a given
set of HNSW parameters means that 2% of results will not match the true
nearest neighbors. What build parameters lead to what recall depends on the
dataset used. The benchmark pages shows 4 different example datasets. Based on
the characteristic of each dataset you can pick the one closest to your
production load and draw conclusions about the expected recall for the
respective build and query-time parameters.

Generally if you need a higher recall than the default parameters provide you
with, you can use stronger parameters. This can either be done at build time
(`efConstruction`, `maxConnections`) or at query time (`ef`). Roughly speaking,
a higher `ef` value at query time means a more thorough search. It will have a
slightly higher latency, but also lead to a slightly better recall.

By changing the specified limit, you are implicitly changing the `ef`
parameter. This is because the default `ef` value is set to `-1`, indicating
that Weaviate should pick the paremeter based on the limit. The dynamic `ef`
value is controlled using the configuration fields `dynamicEfMin` which acts as
a lower boundary, `dynamicEfMax` which acts as an upper boundary and
`dynamicEfFactor` which is the factor to derive the target `ef` based on the
limit within the lower and upper boundary.

Example: Using the default parameters `ef=-1`, `dynamicEfMin=100`,
`dynamicEfMax=500`, `dynamicEfFactor=8`, you will end up with the following ef
values based on the limit:

* `limit=1`, dynamically calculated: `ef=1*8=8`. This value is below the lower boundary, so `ef` is set to `100`.
* `limit=20`, dynamically calculated: `ef=20*8=160`. This value is within the boundaries, so `ef` is `160`.
* `limit=100`, dynamically calculated: `ef=100*8=800`. This value is above the upper boundary, so `ef` is set to `500`.

If you need a higher search quality for a given limit you can consider the following options:

1. Instead of using a dynamic `ef` value, use a fixed one that provides the desired recall.
1. If your search quality varies a lot depending on the query-time `ef` values,
   you should also consider choosing stronger build parameters. The [ANN
   benchmarks section](../benchmarks/ann.html#results) present a combination of
   many different parameter combination for various datasets.

## More questions? 

Look at the:

1. [Knowledge base of old issues](https://github.com/semi-technologies/weaviate/issues?utf8=%E2%9C%93&q=label%3Abug). Or,
1. For questions: [Stackoverflow](https://stackoverflow.com/questions/tagged/weaviate). Or,
1. For issues: [Github](https://github.com/semi-technologies/weaviate/issues). Or,
1. Ask your question in the Slack channel: [Slack]({{ site.slack_signup_url }}).
