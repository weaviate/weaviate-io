---
title: Managing resources (Hot, Warm, Cold)
sidebar_position: 60
image: og/docs/tutorials.jpg
# tags: ['basics']
---

## Overview

Effective resource management is crucial for building scalable, cost-efficient, and high-performing AI applications. As your data grows and query demands increase, understanding how to balance storage tiers, optimize vector indexing, and manage tenants becomes essential.

Weaviate provides flexible resource management options to help build cost-effective and high-performing AI-native applications. This guide will help you make informed decisions about resource allocation, enabling you to minimize costs while maintaining optimal performance for your specific use case.

This guide covers:

- **[Storage tiers (*hot, warm, cold*)](#temperatures)**
- **[Vector index types](#vector-index-types)**
- **[Vector compression](#vector-compression)**
- **[Tenant states](#tenant-states)**
- **[Tips](#tips)**

## Temperatures

![Storage Tiers](../manage-data/img/storage-tiers.jpg)

Storage resources are divided into three tiers: [*hot*](#-hot), [*warm*](#-warm), and [*cold*](#-cold). Each tier has different performance characteristics and costs.

| Tier     | Vector <br/> Index Type | Vector <br/> Compression | Tenant State  | Storage    | Performance           | Cost      |
|----------|-------------------|--------------------|---------------|------------|-----------------------|----------|
| 🟥 Hot   | HNSW              | PQ, SQ, BQ         | Active        | Memory | Fastest                | High     |
| 🟨 Warm  | Flat              | BQ                 | Active        | SSD       | Slower                 | Moderate |
| 🟦 Cold  | Any               | Any                | Inactive      | Cloud     | Resource not available | Low      |

### 🟥 Hot

![Storage Tiers - Hot](./img/storage-tiers-hot.jpg)

- Describes memory usage
- Fastest and most expensive
- Primarily driven by [`HNSW`](../concepts/vector-index.md#hierarchical-navigable-small-world-hnsw-index) vector indexes
- Always available (active) for use
- Costs increase rapidly with scale

### 🟨 Warm

![Storage Tiers - Warm](./img/storage-tiers-warm.jpg)

- Describes data stored on disk (SSD)
- Slower than [hot](#-hot) tier but less expensive
- Driven by [flat](../concepts/vector-index.md#flat-index) vector index, object data, and [inverted indexes](../concepts/indexing.md#inverted-indexes)
- Always available (active) for use
- Costs increase more slowly than hot tier as data grows

### 🟦 Cold

:::info Added in `v1.26`
:::

![Storage Tiers - Cold](./img/storage-tiers-cold.jpg)

- Describes data stored in cloud storage (e.g., AWS S3)
- Slowest and least expensive tier
- Primarily driven by [offloaded tenants](#tenant-states)
- Resources are not available (inactive) for use
- Requires [reactivation](#tenant-states) to access

## Vector index types

Weaviate supports HNSW, flat, and dynamic vector index types.

| Index Type | Resource Usage | Performance | Suitable for      | Description |
|------------|----------------|-------------|-------------------|-------------|
| HNSW       | 🟥 Hot         | Fast        | Any object count  | A memory-based, fast index ([read more](../concepts/vector-index.md#hierarchical-navigable-small-world-hnsw-index)) |
| Flat       | 🟨 Warm        | Medium      | <~10k objects    | A disk-based, brute-force index ([read more](../concepts/vector-index.md#flat-index)) |
| Dynamic    | Depends        | Depends     | Any object count  | Transitions from flat to HNSW index at a specified threshold ([read more](../concepts/vector-index.md#dynamic-index)) |

The choice of index type depends on the number of objects and the desired performance. As a rule of thumb, use the following guidelines for a multi-tenant collection:

![Index type selection rule of thumb flowchart](./img/vector_index_selection.png)

If you are unsure which index type to use, the dynamic index type is a good starting point, as it automatically transitions from a flat to an HNSW index based on the number of objects.

[Read more about vector indexes here](../concepts/vector-index.md).

## Vector compression

Vector compression techniques reduce the size of vectors by quantizing them into a smaller representation.

This can have the impact of reducing memory usage, or improving performance by reducing the amount of data that needs to be read from disk. The trade-off is that the resulting search quality may be lower.

Weaviate supports the following vector compression methods:

| Compression Method        | Index Type | Requires Training | Description |
|---------------------------|------------|-------------------|-------------|
| Product Quantization (PQ) | HNSW       | Yes               | Each vector becomes an array of integer-based centroids ([read more](../concepts/vector-quantization.md#product-quantization)) |
| Binary Quantization (BQ)  | HNSW, Flat | No                | Each vector dimension becomes a bit ([read more](../concepts/vector-quantization.md#binary-quantization)) |
| Scalar Quantization (SQ)  | HNSW       | Yes               | Each vector dimension becomes an integer ([read more](../concepts/vector-quantization.md#scalar-quantization)) |

As a starting point, use the following guidelines for selecting a compression method:

![Vector compression selection rule of thumb flowchart](./img/vector_compression_selection.png)

If you are unsure which index type to use, scalar quantization is a good starting point, provided that you have a representative sample of your likely final dataset.

<!-- Replace with compression guide in the future when ready -->

[Read more about vector compression here](../concepts/vector-quantization.md).

## Tenant states

Multi-tenant collections enable you to efficiently manage isolated subsets of data that share the same schema and configuration. Weaviate supports the following tenant states:

| Tenant state     | CRUD & Queries | Vector Index | Inverted Index | Object Data | Time to Activate |Description |
|------------------|----------------|--------------|----------------|-------------|------------------|------------|
| Active (default) | **Yes**        | Hot/Warm     | Warm           | Warm        | None             |Tenant is available for use |
| Inactive         | **No**         | Warm         | Warm           | Warm        | Fast             |Tenant is locally stored but not available for use |
| Offloaded        | **No**         | Cold         | Cold           | Cold        | Slow             |Tenant is stored in cloud storage and not available for use |

A tenant status management strategy can help you to balance cost and performance. Here's why. An active tenant with an HNSW index uses *hot* resources, which are the most expensive. At the other end of the spectrum, an offloaded tenant uses *cold* resources, which are the least expensive.

*Hot* tenants can be deactivated to *warm* storage to reduce memory usage, and any tenant can be offloaded to *cold* storage to reduce memory and disk usage. Conversely, any tenant can be reactivated when needed.

Therefore, consider a strategy of deactivating tenants that are not frequently accessed, and offloading tenants that are rarely accessed.

For example, imagine an e-commerce platform with separate tenants for each vendor. During a holiday sale, the tenant for a popular electronics vendor might be kept active for quick access, while tenants for seasonal vendors (e.g., Christmas decorations in July) could be offloaded to cold storage to save resources.

Understanding how tenant states interact with different index types is crucial for developing an effective resource management strategy. Let's explore this relationship in more detail.

### Tenant states and index types

Tenant states management strategies are tied to index types. This is because the index type determines the resources used by a tenant. For example, a tenant with an HNSW index type uses *hot* resources, while a tenant with a flat index type uses *warm* resources.

If a multi-tenant collection is configured with a dynamic index type, some tenants may be stored in *warm* storage (flat index) and others in *hot* storage (HNSW index). As a result, effectively managing tenants with HNSW indexes may have the most significant impact on resource usage.

We suggest following the following guidelines for selecting a tenant state:

![Tenant state selection rule of thumb flowchart](./img/tenant_state_selection.png)

If you are unsure which tenants can be made inactive or offloaded, consider a strategy of deactivating tenants that have not been accessed for a certain period of time. And offloading tenants that have not been accessed for a longer period of time.

## Tips

### Best Practices

- Start with the dynamic [index type](#vector-index-types) for new collections. This is particularly useful for multi-tenant collections, as it allows each tenant to use the most appropriate index type.
- Use [vector compression](#vector-compression) techniques to optimize storage and query performance, especially for large collections or tenants.
- Conduct thorough testing when changing index types or compression methods to ensure performance meets your requirements.

### Common Pitfalls

- Overprovisioning hot storage: Keeping all data in hot storage can lead to unnecessary costs. Regularly assess what data truly needs the fastest access.
- Neglecting to plan for growth: Not anticipating data growth can lead to performance issues. Always design your resource management strategy with scalability in mind.
- Improper tenant management: In multi-tenant scenarios, forgetting to [offload inactive tenants](#tenant-states) can lead to resource waste. Implement automated processes to manage tenant states based on usage patterns.
- Mismatch between quantization techniques, model and data: When using compression technique, ensure that the quantization technique is compatible with the model (e.g. BQ) and that the data is sufficient and representative for training (e.g. PQ, SQ).

## Related pages

- [Concepts: Vector Index](../concepts/vector-index.md)
- [Concepts: Vector Quantization](../concepts/vector-quantization.md)
- [Concepts: Multi-Tenancy](../concepts/data.md#multi-tenancy)
- [How-to: Set the vector index type](../manage-data/collections.mdx#set-vector-index-type)
- [How-to: Configure vector compression](../configuration/compression/index.md)
- [How-to: Perform multi-tenancy operations](../manage-data/multi-tenancy.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
