---
title: Compression
sidebar_position: 5
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'pq']
---

Uncompressed vectors can be large. Compressed vectors lose some information, but they use fewer resources and can be very cost effective. 

To balance resource costs and system performance, consider one of these options:

- [Binary Quantization (BQ)](/developers/weaviate/configuration/compression/bq-compression)
- [Product Quantization (PQ)](/developers/weaviate/configuration/compression/pq-compression)
- [Scalar Quantization (SQ)](/developers/weaviate/configuration/compression/sq-compression)
