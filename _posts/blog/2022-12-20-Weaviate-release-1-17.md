---
layout: post
title: Weaviate 1.17 release
description: "Learn, what is new in Weaviate 1.17. New "
published: true
author: Sebastian Witalec
author-img: /img/people/icon/sebastian.jpg
card-img: /img/blog/hero/Weaviate-release-1-17.png
hero-img: /img/blog/hero/Weaviate-release-1-17.png
og: /img/blog/hero/Weaviate-release-1-17.png
date: 2022-12-16
toc: false
---

We are happy to announce the release of Weaviate `1.17`, which brings a set of great features, performance improvements, and fixes.

## The brief
If you like your content brief and to the point, here is the TL;DR of this release:
1. [Replication (Architecture)](#replication-architecture) - 
1. [Replication (Usage)](#replication-usage) - 
1. [Hybrid Search](#hybrid-search) - combine dense and sparse vectors to deliver best of both search methods
1. [BM25](#bm25) - 
1. [Faster Startup](#faster-startup) - 
1. [Fixes](#fixes) - 

Read below to learn more about each of these points in more detail.

## Replication (Architecture)

## Replication (Usage)

## Hybrid Search
Hybrid search is a search engine technology that combines the best features of both traditional search algorithms with vector search techniques. In hybrid search, sparse and dense vectors are used to represent the meaning and context of search queries and documents. Sparse vectors have mostly zero values with only a few non-zero values, while dense vectors mostly contain non-zero values. Sparse embeddings are generated from models like [BM25](https://en.wikipedia.org/wiki/Okapi_BM25) and [SPLADE](https://arxiv.org/abs/2107.05720). Dense embeddings are generated from machine learning models like [GloVe](https://text2vec.org/glove.html) and [Transformers](https://huggingface.co/docs/transformers/index).

Using both sparse and dense search methods combines the power of keyword matching with contextual semantics. For example, in the query “How to catch an Alaskan Pollock”, the semantic meaning of “catch” is revealed to be related to fishing from the context; this is where dense vectors thrive. Sparse methods on their own would not be able to associate ‘catch’ with fishing any differently from catching a baseball or a cold. On the other hand, sparse methods can capture specific entities such as “Alaskan Pollock.” This query illustrates an example where hybrid search combines the best of both sparse and dense vectors.

### Hybrid Search in Weaviate
To use hybrid search in Weaviate, you only need to confirm that you’re using Weaviate `v1.17` or a later version. You can run the hybrid queries in GraphQL or the other various client programming languages. 

There are five new parameters in the hybrid search query:
`hybrid`: shows that you want to use hybrid search
`query`: search query
`alpha`: weighting for each search algorithm (alpha = 0 (sparse only), alpha = 1 (dense only), alpha = 0.5 (equal weight for sparse and dense)) 
`vector`: optional to supply your own vectors 
`score`: ranked score that is assigned to each document    

Here is an example of how to run a hybrid search query in GraphQL:

```
{
  Get {
    Corpus (
      hybrid: {
        query: "How to catch an Alaskan Pollock?",
        alpha: 0.5,
        vector: [ ]  # optional. Not needed if Weaviate handles the vectorization.
      })
    {
      document
      _additional {score}
    }
  }
}
```

Similar to how you use `nearText`, `hybrid` is passed as an argument to a Weaviate class object. Hybrid has two parameters: `query` and `alpha`. Query is fairly straightforward, whereas alpha is a new idea. Alpha describes the weighting between dense and sparse search methods. An alpha closer to 0 weighs sparse search more than dense, and an alpha closer to 1 weighs dense search more than sparse. Additionally, if alpha is set to 0, it only uses sparse search, and if alpha equals 1, then it uses dense search only. Including the vector parameter is optional - it is not needed if Weaviate handles the vectorization. If you would like to see the score of each document add in the `score` parameter.

Work on the hybrid search feature is not over! There will be continuous improvements and updates happening in the (near) future. For example, there is already something in the [backlog](https://github.com/semi-technologies/weaviate/issues/2393) to add where filters to hybrid search (give it a thumbs up while you’re there). 🙂 

Check out the [documentation](/developers/weaviate/current/graphql-references/vector-search-parameters.html#hybrid) for more information and learn how to write the query in the other client programming languages.  

## BM25

## Faster Startup

## Fixes

## Stay Connected
Thank you so much for reading! If you would like to talk to us more about this topic, please connect with us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/weaviate_io){:target="_blank"}. 

Weaviate is open-source, you can follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don’t forget to give us a ⭐️ while you are there.