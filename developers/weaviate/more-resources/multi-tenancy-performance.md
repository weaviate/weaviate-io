---
title: Multi-tenancy vs "One collection per tenant"
label: Multi-tenancy performance
sidebar_position: 7
image: og/docs/more-resources.jpg
# tags: ['performance']
---

When designing the data schema architecture of a vector database, you are faced with the decision between implementing **multi-tenancy** or creating **multiple collections**. Both approaches have their use cases and trade-offs, particularly in the context of performance, scalability, and manageability.  

This guide aims to clarify these concepts and highlight the implications of each aproach, fucusing on the benefits and drawbacks:
- **[Multi-tenancy in Vector Databases](#multi-tenancy-in-vector-databases)**
- **["One collection per tenant" strategy](#one-collection-per-tenant-strategy)** 

## Multi-tenancy in Vector Databases

Multi-tenancy refers to the practice of using a single collection to store data for multiple tenants. Each tenant’s data is logically isolated through the use of metadata fields like tenant IDs. Multi-tenancy is especially useful when you want to store data for multiple customers, or when you want to store data for multiple projects.

### Advantages

- **Efficient resource utilization**: By consolidating data into a single collection, multi-tenancy reduces overhead associated with maintaining multiple database structures such as collections with their respective data schemas and configurations.
- **Scalability**: Indexes can be optimized with a single collection in mind rather than being fragmented across multiple collections. Each tenant has a dedicated, high-performance vector index which results in faster query speeds. Instead of searching a shared index space, each tenant responds as if it was the only user on the cluster.
- **Data isolation**: Each tenant’s data is completely segregated, simplifying access control and compliance requirements. This also means that data deletion is much easier and faster.
- **Cost reduction**: You can change the status of a tenant into `inactive` (stored locally on disk) or `offloaded` (stored on cloud storage) in order to save resources.

### Challenges

- **Access control complexity**: Fine-grained access control must be implemented to ensure data isolation between tenants.

## "One collection per tenant" strategy

In this approach, each tenant is assigned a dedicated collection to ensures physical separation of data between them. Before the implementation of multi-tenancy in Weaviate this was the best aproach for managing data for multiple tenants. 

### Advantages

- **Customizability**: Schema changes or optimizations can be tailored to individual colletions without affecting others.
- **Simpler queries**: Queries do not require tenant-specific filters, as each collection inherently belongs to a single tenant.
- **Data isolation**: In theory, each tenant’s data is completely segregated through the use of separate collections. 

### Challenges

- **Performance drawbacks**: Each collection requires its own index, increasing memory and storage consumption.
- **Lots of duplication**: Schema changes must be applied to each collection individually which results in unneccesary duplicate operations.
- **Scaling limits**: Managing metadata for a large number of collections can strain the database’s internal systems, particularly during operations like backups and restores. In practice, having more than 100 (TODO) collections has proven to be disadvantages.

## Recommendations

### When to Use Multi-tenancy
- Use multi-tenancy when you need to support a large number of tenants and prioritize resource efficiency and scalability.
- Ideal for scenarios where tenant-specific access control and query performance can be addressed through well-optimized filters.

### When to Use Multiple Collections
- Suitable for scenarios with a limited number of tenants where schema customizability outweighs operational overhead.

## Conclusion

The choice between multi-tenancy and multiple collections depends on your specific use case, including the number of tenants, query patterns, and performance requirements. While multi-tenancy offers scalability and resource efficiency, multiple collections provide stronger data isolation and flexibility. Regularly monitor query performance, index size, and resource utilization to adjust the architecture as needed. Understanding the trade-offs will help you design an architecture that meets both current and future needs.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
