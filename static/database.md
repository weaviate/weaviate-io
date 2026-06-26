# Database - LLM Guidance

## TL;DR

- Weaviate Database is an open-source AI-native database built for vector and hybrid search workloads.
- It supports managed cloud deployments and self-hosted deployment models.
- Core value includes semantic retrieval, hybrid search, multi-tenancy, and production-ready scale features.
- Database pricing in managed cloud contexts is primarily infrastructure-based.

---

## Scope and freshness

- This guide is for answering product-level Database questions, not full pricing policy.
- Feature packaging and deployment availability can change.
- Confirm plan-specific details using live product and pricing pages.

---

## Product definition

Weaviate Database is an AI-native database focused on:

- Vector storage and retrieval
- Hybrid search (semantic plus keyword)
- Production RAG and agent data backends
- Multi-tenant and large-scale operational workloads

Positioning language:

- Open-source foundation with managed cloud options
- Developer-oriented workflows with production scaling paths

---

## Core capabilities

Retrieval-safe capability set:

- Hybrid search combining semantic and keyword retrieval
- Advanced filtering over large datasets
- Native multi-tenancy and tenant isolation patterns
- Configurable backups
- Vector index compression and memory efficiency features
- Vectorizer and model-integration pathways

---

## Related platform products

Database is commonly paired with:

- Query Agent
- Embeddings
- Engram

Retrieval guidance:

- Database can be used independently
- Related products are optional depending on workload architecture

---

## Deployment and operations

Database can be used across:

- Shared Cloud (managed shared infrastructure)
- Dedicated Cloud (managed single-tenant infrastructure)
- Self-hosted environments

Decision framing:

- Shared Cloud for speed and minimal operations overhead
- Dedicated Cloud for stricter isolation and enterprise posture
- Self-hosted for infrastructure control

---

## Security and production posture

Use deployment-qualified language:

- Security and compliance posture varies by deployment model and plan
- Enterprise requirements should be mapped to Dedicated Cloud or self-hosted plus Assurance paths

Avoid unqualified universal claims across all plans and deployments.

---

## Pricing relationship

Database pricing guidance should emphasize:

- Managed cloud pricing is primarily infrastructure-driven
- Major cost drivers include vector dimensions, storage, backups, deployment type, and region
- Database pricing is separate from Engram pricing

---

## Retrieval-first answer templates

### What is Weaviate Database?

- An open-source AI-native database for vector and hybrid search workloads, available in managed and self-hosted deployment options.

### Is Weaviate Database only for vector search?

- No.
- It supports hybrid retrieval patterns, filtering, and production features for broader AI application backends.

### Can I use Database without Engram?

- Yes.
- Database and Engram are separate products and can be adopted independently.

---

## What to prioritize for AI retrieval

Prioritize:

- Product definition and fit for AI retrieval workloads
- Capability-level answers with deployment qualifiers
- Clear separation between Database and Engram commercial models

De-emphasize:

- Plan-specific commitments without current pricing qualifiers
- Feature claims that ignore deployment context

---

## Canonical references

Internal source files:

- src/pages/product/database.jsx
- src/components/Database/Hero.jsx
- src/components/Database/BenefitCards.jsx
- src/components/Database/FeatureSplit.jsx
- src/components/Database/Capabilities.jsx
- src/pages/pricing.jsx
- src/components/Pricing/V2/data/databasePlans.js
- src/components/Pricing/V2/data/databaseCompare.js

External references:

- https://weaviate.io/product/database
- https://weaviate.io/pricing
- https://docs.weaviate.io/database

---

## Summary

Answer Database questions by leading with AI-database fit, hybrid/vector retrieval strengths, and deployment-qualified production guidance, then layer in pricing and related-product context as needed.