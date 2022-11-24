---
title: (MAYBE MOVE) Index types and performance
sidebar_position: 7
# layout: layout-documentation
# bodyclass: ["page--guides", " "]
# solution: weaviate
# sub-menu: More resources
# title: Index types and performance
# intro: 
# description: 
# tags: ['Weaviate', 'performance']
# sidebar_position: 5
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.11.0/more-resources/performance.html
---

# Index types
Weaviate uses two types of data indexing. Next to the vector indexes that are created and powers the semantic search capability, there is also the [inverted index](https://en.wikipedia.org/wiki/Inverted_index).

## Inverted index
The inverted index is essentially what powers all the [GraphQL `where` filters](../graphql-references/filters.html#where-filter), where vectors or semantics are needed to find results. With inverted indexes, contents or data object properties such as words and numbers are mapped to its location in the database. This is the opposite of the more traditional forward index, which maps from documents to its content.

Inverted indices are used often in document retrieval systems and search engines, because it allows fast full-text search and fast key-based search instead of brute-force. This fast data retrieval comes with the only cost of slight increase of processing time when a new data object is added, since the data object will indexed and stored in an inverted way, rather than only storing the index of the data object. In the database (Weaviate), there is a big lookup table which contains all the inverted indices. If you want to retrieve objects with a specific property or content, then the database starts looking for only one row with this property which points to the relevant data objects (the row contains pointers to the data object IDs). This makes data object retrieval with these kind of queries very fast. Even if there are more than a billion entries, if you only care about the entries that contain the specific words or properties you're looking for, only one row will be read with the document pointers. 

The inverted index currently does not do any weighing (e.g. tf-idf) for sorting, since the vector index is used for these features like sorting. The inverted index is thus, at the moment, rather a binary operation: including or excluding data objects from the query result list, which results in an 'allow list'. 

## Vector index
Everything that has a vector, thus every data object in Weaviate, is also indexed in the vector index. The vector index type is [pluggable](../vector-index-plugins/index.html). Currently, we only provide the vector index type [HNSW](https://arxiv.org/abs/1603.09320). 

### HNSW 
[HNSW](https://arxiv.org/abs/1603.09320) is the first vector index type [supported by Weaviate](../vector-index-plugins/hnsw.html). Typically for HNSW is that this index type is super fast at query time, but more costly when it comes to building (adding data with vectors). This means that the process of adding data objects might take longer than you expect or to what you are used to (with other database systems for example). Other database systems, like Elasticsearch, do not make use of vector indexing, but only rely on inverted index. By adding vectorization of data with HNSW, semantic and context-based search is enables, with very high performance on query time. 

### Other vector index types
The vector index type used Weaviate is pluggable. This means that other types than HNSW can be used for vectorization and querying. If your use case values fast data upload higher than super fast query time and high scalability, then other vector index types may be a better solution (e.g. [Spotify's Annoy](https://github.com/spotify/annoy)). If you want to contribute to a new index type, you can always contact us or make a pull request to Weaviate and build your own index type, stay tuned for updates!


# Costs of queries and operations

## Cost of data import
At the moment, data import is relatively slow compared to the query times, because of the HNSW indexing. The cheapest data import operation is a simple 'write' operation of a data object that was not seen before. It will get a completely new index. If you update a data object, the update itself is also really cheap, because in the backend an entirely new object will be created and indexed as if it was new. The 'old' object will be cleaned up, which happens asynchronous and will thus add up to the operation time.

## Cost of queries
Simple `Get` queries that only have a `where` filter are very cheap, because the [inverted index](#inverted-index) is used. A simple `Get` query that uses only the `explore` filter (vector search) is also very cheap, since the very efficient vector index HNSW is used. Sub-50ms 20NN-vector queries on datasets of over 1-100M objects are possible. Weaviate relies on a number of caches, but does not require keeping all vectors in memory. Thus it is also possible to run Weaviate on machines where the available memory is smaller than the size of all vectors. 

Combining the `explore` (vector) and `where` filters in one search query (which is what makes Weaviate unique), is slightly more expensive. The inverted index is called first which returns all data items that match the `where` filter. This list is then passed on to the vector index search with HNSW. The cost of this combined operation depends on the dataset size and the amount of data returned by the inverted index search. The less items that are returned from the `where` filter search, the more items the vector search needs to skip, thus the longer it will take. These differences are however very small, perhaps not even noticeable.

## Cost of resolving referencing
Weaviate is a database with a graph-like data model, not a pure graph database. Graph databases are built in a fashion where following links and references are very cheap, where querying links is cheaper than querying multiple items. Weaviate, on the other hand, is a search engine. This means that one of the cheapest operations you can do with Weaviate is listing data. In a traditional graph database that is quite expensive. Weaviate does however have graph functionalities on top of the search engine focus. So although its primary focus is on searching through data objects with the inverted index and/or vector index, we offer graph references between data objects. Searching, following and retrieving graph references between data objects is therefore less optimized than pure search. This means that using the graph-like features like resolving object references need more query time than pure data object search as described above. 

Important to know is that the more connections between data objects and the deeper you try to query in a single query, the more costly the query operation gets. The best you can deal with these kind of queries is to not do *wide* and *deep* searches at the same time. If you have to resolve a lot of nested references, try to set a low limit (a low number of data objects to be returned). A second tip is to not try to resolve all the references. This could perhaps be split into separate queries, depending on your query. In practice, this could mean that you do a first search to retrieve the top 100 data objects of your query, and only get the deeper references of the top 5 results you're actually interested in. 

## Cost of filtering by reference
If you have a nested reference filter, Weaviate starts by resolving the deepest reference and from there go upwards to the inner layers resolving other references. It thus finds the beacons of the deepest references first. This allows to use inverted index lookups for the other layers, which makes matching of results relatively cheap. However, queries that have nested references in the filter are still relatively costly because multiple search queries (for each nested layer) are performed and the results need to be combined into one result. The cost increases when a lot of results are returned on an inner layer, which needs to be searched through by the one layer deeper, and so on. Thus, this cost could in theory go up exponentially. 

A tip is to avoid deeply nested filters in the queries. Additionally, try to make your queries as restrictive as possible, because a ten-level deep query would for example not be so expensive if all levels return only a single ID. In that case only ten one ID searches need to be performed, which is a lot of searches in one query, but each search is very cheap. 


# More Resources

{% include docs-support-links.html %}