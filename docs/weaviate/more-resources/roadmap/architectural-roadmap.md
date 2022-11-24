---
layout: layout-documentation
solution: weaviate
sub-menu: Roadmap
title: Architectural roadmap
description: Weaviate's architectural roadmap
tags: ['architecture', 'roadmap']
sidebar_position: 2
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/current/architecture/roadmap.html
---

<!-- style for roadmap table -->
<!-- <style>
.roadmap-table td {
  padding: 0
}
.roadmap-table-img {
    width: 120px;
    background-size: 90px;
    background-repeat: no-repeat;
}
</style> -->

# Introduction

Scalability is one of Weaviate's core features. The following roadmap aims to give you an understanding of where we are taking Weaviate from a scalability and implementation perspective.

# Video: introduction to the Weaviate architecture

<iframe width="100%" height="375" src="https://www.youtube.com/embed/6hdEJdHWXRE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# Complete Roadmap

<!-- <table class="roadmap-table">
  <tr>
    <td rowspan="3" class="roadmap-table-img" style="background-image: url('/img/roadmap-1.svg');"></td>
    <td>
      <b>HNSW Performance Boosts</b>
    </td>
  </tr>
  <tr>
    <td>
      <i>status: done in <a href="https://github.com/semi-technologies/weaviate/releases/tag/v1.4.0">v1.4.0</a></i>
    </td>
  </tr>
  <tr>
    <td>
      Hardware-acceleration and efficiency improvements reduce the time it takes to perform a vector search or index into the vector index by up to 50%.
    </td>
  </tr>
</table>

<table class="roadmap-table">
  <tr>
    <td rowspan="3" class="roadmap-table-img" style="background-image: url('/img/roadmap-2.svg');"></td>
    <td>
      <b>LSM Tree Migration</b>
    </td>
  </tr>
  <tr>
    <td>
      <i>status: done in <a href="https://github.com/semi-technologies/weaviate/releases/tag/v1.5.0">v1.5.0</a></i>
    </td>
  </tr>
  <tr>
    <td>

    The way that objects and the inverted index are stored within Weaviate are migrated from a <a href="https://en.wikipedia.org/wiki/B%2B_tree">B+Tree</a>-based approach to an <a href="https://en.wikipedia.org/wiki/Log-structured_merge-tree">LSM-Tree</a> approach. This can speed up import times up to 50%. Also addresses import times degrading over time.

    </td>
  </tr>
</table>

<table class="roadmap-table">
  <tr>
    <td rowspan="3" class="roadmap-table-img" style="background-image: url('/img/roadmap-3.svg');"></td>
    <td>
      <b>Multi-shard indices</b>
    </td>
  </tr>
  <tr>
    <td>
      <i>status: done, to be released with next milestone</i>

    </td>
  </tr>
  <tr>
    <td>
      A monolithic index (one index per class) can be broken up into smaller independent shards. This allows utilizing resources on large (single) machines better and allows for tweaking storage settings for specific large-scale cases.
    </td>
  </tr>
</table>

<table class="roadmap-table">
  <tr>
    <td rowspan="3" class="roadmap-table-img" style="background-image: url('/img/roadmap-4.svg');"></td>
    <td>
      <b>Horizontal Scalability without replication</b>
    </td>
  </tr>
  <tr>
    <td>
      <i>status: done, released in v1.8.0</i>
    </td>
  </tr>
  <tr>
    <td>
      An index, comprised of many shards, can be distributed among multiple nodes. A search will touch multiple shards on multiple nodes and combine the results. Major benefit: If a use case does not fit on a single node, you can use *n* nodes to achieve *n* times the use case size. At this point every node in the cluster is still a potential single point of failure.
    </td>
  </tr>
</table>

<table class="roadmap-table">
  <tr>
    <td rowspan="3" class="roadmap-table-img" style="background-image: url('/img/roadmap-5.svg');"></td>
    <td>
      <b>Replication shards distributed across nodes</b>
    </td>
  </tr>
  <tr>
    <td>
      <i>status: in progress (<a href="https://github.com/semi-technologies/weaviate/milestone/21">follow on GitHub</a>)</i>
    </td>
  </tr>
  <tr>
    <td>  
      A node can contain shards which are already present on other nodes as well. This means if a node goes down, another node can take up the load without the loss of availability or data. Note that the design plans for a leaderless replication, so there is no distinction between primary and secondary shards. Removes all single point of failures.
    </td>
  </tr>
</table>

<table class="roadmap-table">
  <tr>
    <td rowspan="3" class="roadmap-table-img" style="background-image: url('/img/roadmap-6.svg');"></td>
    <td>
      <b>Dynamic scaling</b>
    </td>
  </tr>
  <tr>
    <td>
      <i>pending</i>
    </td>
  </tr>
  <tr>
    <td>
      Instead of starting out with a cluster with *n* nodes, the cluster size can be increased or shrunk at runtime. Weaviate automatically distributes the existing shards accordingly.
    </td>
  </tr>
</table>

# Download the Roadmap

<a href="/img/timeline_Weaviate_architecture_isometric.jpg" rel="Weaviate vector search engine Architecture Roadmap" target="_blank">
  You can download the complete roadmap (as an image) here too
</a> -->

# More Resources

{% include docs-support-links.html %}





