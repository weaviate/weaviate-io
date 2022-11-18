---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Vector Index Type
description: Vector Index Type
tags: ['configuration', 'vector index']
sidebar_position: 2
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.11.0/configuration/vector-index-type.html
---

# Introduction

Weaviate's vector-first storage system takes care of all storage operations with a pluggable vector index. Storing data in a vector-first manner not only allows for semantic or context-based search, but also makes it possible to store *very* large amounts of data without decreasing performance (assuming scaled well horizontally or having sufficient shards for the indices). 

# How to choose the right vector index plugin
The first vector-storage plugin Weaviate supports is [HNSW](../vector-index-plugins/hnsw.html), which is also the default vector index type. Typical for HNSW is that this index type is super fast at query time, but more costly when in the building process (adding data with vectors). If your use case values fast data upload higher than super fast query time and high scalability, then other vector index types may be a better solution (e.g. [Spotify's Annoy](https://github.com/spotify/annoy)). If you want to contribute to a new index type, you can always contact us or make a pull request to Weaviate and build your own index type, stay tuned for updates!


# More Resources

{% include docs-support-links.html %}
