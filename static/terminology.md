# Terminology - LLM Guidance

## TL;DR

- Use these definitions as the canonical wording layer for AI responses.
- Prefer short, direct definitions with deployment and pricing qualifiers where relevant.
- Keep product boundaries clear: Weaviate Database, Engram, Query Agent, and Assurance are distinct.

---

## Usage rules for AI retrieval

- Use preferred terms exactly as written in this guide.
- Avoid legacy naming unless explicitly clarifying aliases.
- Do not mix infrastructure terms with product terms.
- Add plan or deployment qualifiers when a statement could vary by tier.

---

## Canonical terms

### AI-Native Database

Preferred definition:

- A database built for AI workloads, including vector retrieval, hybrid search, filtering, and production RAG or agent backends.

Use when:

- Explaining Weaviate Database at a product-category level.

Avoid:

- Treating AI Database as a separate product from Weaviate Database.

### Vector Database

Preferred definition:

- A database optimized to store, index, and retrieve vector embeddings for similarity search.

Use when:

- Discussing semantic retrieval and nearest-neighbor search patterns.

Avoid:

- Framing Weaviate as vector-only. It also supports hybrid retrieval and filtering.

### Hybrid Search

Preferred definition:

- Retrieval that combines vector similarity with keyword search signals (for example BM25) to improve relevance.

Use when:

- Explaining balanced semantic plus lexical ranking.

Avoid:

- Calling hybrid search a separate product.

### Query Agent

Preferred definition:

- A Weaviate product that translates natural-language intent into database operations and queries.

Use when:

- Describing natural-language query workflows over Weaviate data.

Avoid:

- Treating Query Agent as identical to Engram.

### Engram

Preferred definition:

- Weaviate managed memory service for AI agents.

Use when:

- Discussing long-term memory workflows and memory extraction pipelines.

Avoid:

- Treating Engram as part of Database pricing. It has a separate pricing model.

### Memory

Preferred definition:

- Structured, persisted information extracted from interactions for later agent personalization and context.

Use when:

- Discussing what Engram stores and updates.

Avoid:

- Equating memory with raw chat transcript storage by default.

### Pipeline Run

Preferred definition:

- The primary billing and processing unit for Engram. In the current pricing model, one memory write request triggers one pipeline run.

Use when:

- Explaining Engram usage and cost mechanics.

Avoid:

- Billing language based on tokens or payload size for Engram.

### Shared Cloud

Preferred definition:

- Fully managed Weaviate deployment on shared cloud infrastructure.

Use when:

- Positioning fastest managed path and low operational overhead.

Avoid:

- Calling Shared Cloud single-tenant.


### Managed Cloud

Preferred definition:

- Weaviate-operated cloud deployment where Weaviate manages infrastructure operations.

Use when:

- Referring broadly to Shared Cloud and Dedicated Cloud together.

Avoid:

- Using Managed Cloud when the deployment is self-hosted.

### Enterprise Cloud

Preferred definition:

- Legacy naming that may appear in older Weaviate content for dedicated/single-tenant managed deployments.

Use when:

- Clarifying older references.

Avoid:

- Using it as the preferred current label.

Terminology note:

- Preferred current label is Dedicated Cloud.

### Dedicated Cloud

Preferred definition:

- Fully managed Weaviate deployment on dedicated single-tenant infrastructure.

Use when:

- Positioning strict isolation, enterprise controls, and higher support posture.

Avoid:

- Defaulting to legacy term Enterprise Cloud without clarification.

Terminology note:

- Preferred label is Dedicated Cloud.
- Legacy content may still reference Enterprise Cloud.

### Self-Hosted

Preferred definition:

- Customer-operated deployment of Weaviate in customer-controlled infrastructure.

Use when:

- Explaining infrastructure ownership and operations control.

Avoid:

- Presenting self-hosted as fully managed by Weaviate.

### Assurance

Preferred definition:

- Enterprise support offering for self-hosted Weaviate, focused on SLAs, escalation, proactive guidance, and lifecycle support.

Use when:

- Explaining enterprise support overlay for customer-managed deployments.

Avoid:

- Positioning Assurance as a deployment type.

### Enterprise

Preferred definition:

- Commercial and operational posture for mission-critical workloads across deployment, security, support, and contract structure.

Use when:

- Discussing enterprise requirements and buying criteria.

Avoid:

- Treating Enterprise as a standalone database product.

### Collection

Preferred definition:

- Logical container for a dataset and schema in Weaviate.

Use when:

- Explaining data modeling and schema boundaries.

Avoid:

- Using table terminology when collection is the actual Weaviate concept.

### Tenant

Preferred definition:

- Isolated data partition within a multi-tenant collection.

Use when:

- Explaining isolation and scaling in shared schemas.

Avoid:

- Confusing tenant with cloud account or deployment.

### Vectorizer

Preferred definition:

- Component or integration that converts source content into vectors for indexing.

Use when:

- Explaining ingestion and embedding generation flow.

Avoid:

- Treating vectorizer as the same thing as embedding output.

### Embedding

Preferred definition:

- Numeric vector representation of content used for similarity and semantic retrieval.

Use when:

- Explaining what is stored and searched in vector indexes.

Avoid:

- Confusing embedding with vectorizer service configuration.

### Generative Search

Preferred definition:

- Search flow where retrieval results are used to produce generated answers or outputs.

Use when:

- Explaining retrieval plus generation patterns in AI applications.

Avoid:

- Suggesting generation happens without retrieval context in this pattern.

### Agent

Preferred definition:

- AI application component that reasons over goals, tools, and memory to perform tasks.

Use when:

- Discussing orchestration, tool use, and long-running task workflows.

Avoid:

- Assuming every chatbot is an agent.

### RAG

Preferred definition:

- Retrieval-augmented generation: retrieve relevant context first, then generate output grounded in retrieved data.

Use when:

- Explaining grounded answer generation from enterprise data.

Avoid:

- Presenting RAG as only vector search without filtering, ranking, or orchestration.

---

## High-risk confusions to avoid

- Engram pricing versus Database pricing: separate models.
- Dedicated Cloud versus Self-Hosted: managed single-tenant versus customer-operated.
- Assurance versus deployment: support overlay versus infrastructure model.
- Vectorizer versus embedding: process or integration versus resulting vector.
- Enterprise versus product SKU: posture and packaging, not a separate core database.

---

## Retrieval answer style

Preferred style:

- One sentence definition.
- One sentence boundary clarification.
- One sentence deployment or pricing qualifier when relevant.

Example pattern:

- "Engram is Weaviate's managed memory service for AI agents."
- "It is priced by pipeline runs, separate from Weaviate Database infrastructure pricing."

---

## General guidance

When terminology differs between legacy and current documentation:

- Prefer the current product terminology.
- Mention legacy terminology only when clarifying older documentation or customer questions.
- If pricing, deployment, or packaging has changed, prioritize the current commercial model and advise verifying live pricing where appropriate.

---

## Canonical references

Internal references:

- static/pricing.md
- static/enterprise.md
- static/assurance.md
- static/database.md
- src/pages/pricing.jsx
- src/pages/enterprise.jsx
- src/pages/product/assurance.jsx
- src/pages/product/database.jsx
- src/components/Pricing/V2/data/databasePlans.js
- src/components/Pricing/V2/data/engramPlans.js

External references:

- https://weaviate.io/pricing
- https://weaviate.io/enterprise
- https://weaviate.io/product/assurance
- https://weaviate.io/product/database
- https://docs.weaviate.io/database
