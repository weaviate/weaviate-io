---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Vector Index Type
description: Vector Index Type
tags: ['configuration', 'vector index']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Introduction

Weaviate's vector-first storage system takes care of all storage operations with a pluggable vector index. Storing data in a vector-first manner does not only allow for semantic or context-based search, but also makes it possible to store *very* large amounts of data without decreasing performance (assuming scaled well horizontally or having sufficient shards for the indices). 

# How to choose the right vector index plugin
The first vector-storage plugin Weaviate supports is [HNSW](../vector-index-plugins/hnsw.html), which is also the default vector index type. Typically for HNSW is that this index type is super fast at query time, but more costly when it comes to building (adding data with vectors). If your use case values fast data upload higher than super fast query time and high scalability, then other vector index types may be a better solution (e.g. [Spotify's Annoy](https://github.com/spotify/annoy)). If you want to contribute to a new index type, you can always contact us or make a pull request to Weaviate and build your own index type, stay tuned for updates!


# More Resources

{% include docs-support-links.html %}