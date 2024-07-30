---
title: Compression
sidebar_position: 5
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'pq']
---

Weaviate provides compression methods that you can tune to balance cost and performance.

Vectors are indexed and the index is loaded in RAM memory so you can search your data quickly. Unfortunately, RAM is expensive and RAM requirements increase quickly for high-dimension vectors.

To lower RAM requirements, use one of these compression methods.

- [Binary Quantization (BQ)](/developers/weaviate/configuration/compression/bq-compression)
- [Product Quantization (PQ)](/developers/weaviate/configuration/compression/pq-compression)
- [Scalar Quantization (SQ)](/developers/weaviate/configuration/compression/sq-compression)