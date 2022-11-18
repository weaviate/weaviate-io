---
layout: layout-documentation
solution: weaviate
sub-menu: Vector Index (ANN) Plugins
title: Vector Index (ANN) Plugins
intro: With Weaviate, data is stored in a vector-first manner. A well performing ANN algorithm is used for indexing data with vectors, namely HNSW. Since Weaviate's vector indexing is pluggable, other (ANN) methods could be used, instead of HNSW. Stay tuned for updates on the software.
description: Vector Index (ANN) Plugins. With Weaviate, data is stored in a vector-first manner. A well performing ANN algorithm is used for indexing data with vectors, namely HNSW. Since Weaviate's vector indexing is pluggable, other (ANN) methods could be used, instead of HNSW. Stay tuned for updates on the software.
tags: ['Vector Index Plugins']
menu-order: 0
open-graph-type: article
toc: true
redirect_from:
    - /documentation/weaviate/current/vector-index-plugins/index.html
    - /documentation/weaviate/current/vector-index-plugins/
---

# Introduction

Weaviate's vector-first storage system takes care of all storage operations with a pluggable vector index. Storing data in a vector-first manner not only allows for semantic or context-based search, but also makes it possible to store *very* large amounts of data without decreasing performance (assuming scaled well horizontally or having sufficient shards for the indices). 

## What is a vector? 
A [vector](https://en.wikipedia.org/wiki/Euclidean_vector) is a long list of numbers. Data objects can be stored by choosing the numbers in this vector particular to this data object. 

## Why index data as vectors?
Now, a long list of numbers does not carry any meaning by itself. But if the numbers in this list are chosen to indicate the [semantic similarity](https://en.wikipedia.org/wiki/Semantic_similarity) between the data objects represented by other vectors, then the new vector contains information about the data object's meaning and relation to other data. 

To make this concept more tangible, think of vectors as coordinates in a *n*-dimensional space. For example, we can represent *words* in a 2-dimensional space. If you use an algorithm that learned the relations of words or co-occurrence statistics between words from a corpus (like [GloVe](https://github.com/stanfordnlp/GloVe)), then single words can be given the coordinates (vectors) according to their similarity to other words. These algorithms are powered by Machine Learning and Natural Language Processing concepts. In the picture below, you see how this concept looks (simplified). The words `Apple` and `Banana` are close to each other. The distance between those words, given by the distance between the vectors, is small. But these two fruits are further away from the words `Newspaper` and `Magazine`. 

![2D Vectors visualization](/img/guides/vectors-2d.svg "2D Vectors visualization"){:height="60%" width="60%"}

Another way to think of this is how products are placed in a supermarket. You'd expect to find `Apples` close to `Bananas`, because they are both fruit. But when you are searching for a `Magazine`, you would move away from the `Apples` and `Bananas`, more towards the aisle with, for example, `Newspapers`. This is how the semantics of concepts can be stored in Weaviate as well, depending on the module you're using to calculate the numbers in the vectors. Not only words or text can be indexed as vectors, but also images, video, DNA sequences, etc. Read more about which model to use [here](../modules/index.html).

![Supermarket map visualization](/img/guides/supermarket.svg "Supermarket map visualization"){:height="75%" width="75%"}

# How to choose the right vector index plugin
The first vector-storage plugin Weaviate supports is [HNSW](./hnsw.html), which is also the default vector index type. Typical for HNSW is that this index type is super fast at query time, but more costly when it comes to the building process (adding data with vectors). If your use case values fast data upload higher than super fast query time and high scalability, then other vector index types may be a better solution (e.g. [Spotify's Annoy](https://github.com/spotify/annoy)). If you want to contribute to a new index type, you can always contact us or make a pull request to Weaviate and build your own index type, stay tuned for updates!

# Configuration of vector index type
The index type can be specified per data class. Currently the only index type is HNSW, so all data objects will be indexed using the HNSW algorithm unless you specify otherwise in your [data schema](../schema/schema-configuration.html). 

Example of a class [vector index configuration in your data schema](../schema/schema-configuration.html): 
```json
{
  "class": "Article",
  "description": "string",
  "properties": [ 
    {
      "name": "title",
      "description": "string",
      "dataType": ["string"]
    }
  ],
  "vectorIndexType": " ... ",
  "vectorIndexConfig": { ... }
}
```

Note that the vector index type only specifies how the vectors of data objects are *indexed* and this is used for data retrieval and similarity search. How the data vectors are determined (which numbers the vectors contain) is specified by the `"vectorizer"` parameter which points to a [module](../modules/index.html) such as `"text2vec-contextionary"` (or to `"none"` if you want to import your own vectors). Learn more about all parameters in the data schema [here](../schema/schema-configuration.html).

# Can Weaviate support multiple vector index (ANN) plugins?

* The short answer: _yes_
* The longer answer: currently, we have a [custom implementation](../more-resources/faq.html#q-does-weaviate-use-hnswlib) of HNSW to have [full CRUD-support](https://db-engines.com/en/blog_post/87) in Weaviate. In principle, if an ANN algorithm allows for full CRUD support, Weaviate can support it. If you have ideas, suggestions, or plans (e.g., for a research project) for another ANN plugin besides HNSW, please let us know in our [Slack channel]({{ site.slack_signup_url }}) or by emailing us at [hello@semi.technology](mailto:hello@semi.technology).

# More Resources

{% include docs-support-links.html %}
