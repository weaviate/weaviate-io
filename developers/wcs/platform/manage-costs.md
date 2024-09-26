---
title: Manage resource costs
sidebar_position: 20
image: og/wcs/user_guides.jpg
---

Weaviate Cloud provides flexible resource management features that let you balance system performance and system resource costs. This page discusses configuration strategies to help you to get the most value from Weaviate Cloud.

## Indexes

Weaviate is a vector database. Individual vectors can have thousands of dimensions. Most objects in Weaviate collections have one or more vectors. Collections can have millions of objects. Weaviate uses vector indexes to search collections efficiently. A lot of space is required to store the indexes, and the underlying vectors.

Disk based storage is relatively cheap. RAM memory is expensive. Loading an index and its vectors into RAM costs more than storing them on disk, but there are other considerations too. Besides storage costs, speed and accuracy are perhaps the most prominent considerations.


The default vector index in Weaviate Cloud is a [Hierarchical Navigable Small World (HNSW) index](/developers/weaviate/concepts/vector-index#hierarchical-navigable-small-world-hnsw-index).

## Compression

## Tenant states

## Support

import SupportAndTrouble from '/_includes/wcs/support-and-troubleshoot.mdx';

<SupportAndTrouble />

import CustomScriptLoader from '/src/components/scriptSwitch';

<CustomScriptLoader/>
