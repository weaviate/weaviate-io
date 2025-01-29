---
title: Weaviate Features & Resources
---

## Search & Querying

| Feature | How-to | Tutorial | Reference | Concepts | Other |
| ------- | ------ | -------- |---------- |--------- | ----- |
| Vector similarity search | [Vector similarity search](/developers/weaviate/search/similarity) | [Queries in detail [OUTDATED]](/developers/weaviate/tutorials/query) | [Search operators - Vector search operators](/developers/weaviate/api/graphql/search-operators#vector-search-operators) | [Vector Search](/developers/weaviate/concepts/search/vector-search) | - |
| Keyword search | [Keyword search](/developers/weaviate/search/bm25) | - | [Search operators - BM25](/developers/weaviate/api/graphql/search-operators#bm25) | [Keyword search](/developers/weaviate/concepts/search/keyword-search) | - |
| Image search | [Image search](/developers/weaviate/search/image) | - | [Search operators - MISSING](/developers/weaviate/api/graphql/search-operators#vector-search-operators) | [Vector search - Query vectors](/developers/weaviate/concepts/search/vector-search#query-vectors) | - |
| Video search | - | - | - | - | - |
| Hybrid search | [Hybrid search](/developers/weaviate/search/hybrid) | - | [Search operators - hybrid](/developers/weaviate/api/graphql/search-operators#hybrid) | [Hybrid search](/developers/weaviate/concepts/search/hybrid-search) | - |
| Multiple vectors | [Multiple target vectors](/developers/weaviate/search/multi-vector) | - | [Multiple vectors](/developers/weaviate/config-refs/schema/multi-vector) | [Vector search - Multi-target vector search](developers/weaviate/concepts/search/vector-search#multi-target-vector-search) | - |
| RAG | [Retrieval Augmented Generation (RAG)](/developers/weaviate/search/generative) | - | [Additional properties (metadata) - generate](developers/weaviate/api/graphql/additional-properties#generate) | - | [Starter Guides - Retrieval augmented generation (RAG)](/developers/weaviate/starter-guides/generative) |
| Reranking | [Reranking](/developers/weaviate/search/rerank) | - | [Additional properties (metadata) - rerank](/developers/weaviate/api/graphql/additional-properties#rerank) | [Reranking](/developers/weaviate/concepts/reranking) | - |
| Aggregate | [](/developers/weaviate/search/aggregate) | - | [Aggregate](/developers/weaviate/api/graphql/aggregate) | - | - |
| Filters | [Filters](/developers/weaviate/search/filters) | - | [Conditional filters](/developers/weaviate/api/graphql/filters) | - | - |
| Explore | - | - | [Explore](/developers/weaviate/api/graphql/explore) | - | - |
| Distance metrics | - | - | [Distance metrics](/developers/weaviate/config-refs/distances) | - | - |

## Data Management

| Feature | How-to | Tutorial | Reference | Concepts | Other |
| ------- | ------ | -------- |---------- |--------- | ----- |
| Backups | [Backups](/developers/weaviate/configuration/backups) | - | [backups](/developers/weaviate/api/rest#tag/backups) | - | [Blog - Tutorial - Backup and Restore in Weaviate](/blog/tutorial-backup-and-restore-in-weaviate) |
| Cross-references | [Cross-references](/developers/weaviate/manage-data/cross-references) | - | - | [Cross-references](/developers/weaviate/concepts/data#cross-references) | - |
| Multi-tenancy | [Multi-tenancy operations](/developers/weaviate/manage-data/multi-tenancy) | - | - | [Data strcture - Multi-tenancy](/developers/weaviate/concepts/data#multi-tenancy) | - |
| Tenant states | [Manage tenant states & temperature](/developers/weaviate/manage-data/tenant-states)<br />[Tenant Offloading](/developers/weaviate/configuration/tenant-offloading) | - | - | - | [Starter Guides - Tenant states](/developers/weaviate/starter-guides/managing-resources/tenant-states) |
| Replication | [Replication](/developers/weaviate/configuration/replication) | - | - | [Replication Architecture](/developers/weaviate/concepts/replication-architecture) | - |
| Data types | - | - | [Data types](/developers/weaviate/config-refs/datatypes) | - | - |

## Performance & Indexing

| Feature | How-to | Tutorial | Reference | Concepts | Other |
| ------- | ------ | -------- |---------- |--------- | ----- |
| Quantization | [Product Quantization (PQ)](/developers/weaviate/configuration/compression/pq-compression)<br />[Binary Quantization (BQ)](/developers/weaviate/configuration/compression/bq-compression)<br />[Scalar Quantization (SQ)](/developers/weaviate/configuration/compression/sq-compression) | - | - | [Compression (Vector Quantization)](/developers/weaviate/concepts/vector-quantization) | [Starter Guides - Compression](/developers/weaviate/starter-guides/managing-resources/compression) |
| Vector indexes | - | - | [Vector indexes](/developers/weaviate/config-refs/schema/vector-index) | [Vector Indexing](/developers/weaviate/concepts/vector-index) | - |
| Inverted indexes | - | - | - | [Indexing - Inverted indexes](/developers/weaviate/concepts/indexing#inverted-indexes) | - |
| Environment variables | - | - | [Environment variables](/developers/weaviate/config-refs/env-vars) | - | - |


## Security & Access Control

| Feature | How-to | Tutorial | Reference | Concepts | Other |
| ------- | ------ | -------- |---------- |--------- | ----- |
| Authentication | [Authentication](/developers/weaviate/configuration/authentication) | - | [Environment variables - Authentication and authorization](/developers/weaviate/config-refs/env-vars#authentication-and-authorization) | - | - |
| Authorization | [Authorization & RBAC](/developers/weaviate/configuration/authorization)<br />[RBAC Roles](/developers/weaviate/configuration/roles) | - | [Environment variables - Authentication and authorization](/developers/weaviate/config-refs/env-vars#authentication-and-authorization) | - | - |

## APIs & Interfaces

| Feature | How-to | Tutorial | Reference | Concepts | Other |
| ------- | ------ | -------- |---------- |--------- | ----- |
| RESTful API | - | - | [RESTful API](/developers/weaviate/api/rest) | - | - |
| gRPC | - | - | [gRPC](/developers/weaviate/api/grpc) | - | - |
| Modules | [Modules](/developers/weaviate/configuration/modules) | - | [Modules](/developers/weaviate/modules) | [Modules](/developers/weaviate/concepts/modules) | - |