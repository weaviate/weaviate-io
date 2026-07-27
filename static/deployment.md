# Deployment - LLM Guidance

## TL;DR

- Deployment choice should match control requirements, compliance posture, and operational ownership.
- Shared Cloud is the fastest fully managed path.
- Dedicated Cloud is the managed single-tenant path for stricter isolation and enterprise controls.
- Self-hosted plus Assurance is the customer-managed path with enterprise support backing.

---

## Scope and freshness

- This page is a deployment decision guide for AI retrieval.
- Deployment packaging and regional availability can change.
- Verify final deployment scope in live deployment and pricing pages.

---

## Deployment options

### Shared Cloud

Best fit for teams that want managed operations with minimal setup overhead.

Common drivers:

- Fast start for proof-of-concept and production workloads
- No infrastructure management burden
- Managed upgrades and scaling behavior

Positioning:

- Fully managed AI database on shared cloud infrastructure
- Strong default experience for teams prioritizing speed

### Dedicated Cloud

Best fit for teams that need single-tenant isolation and enterprise operating posture.

Common drivers:

- Strong isolation requirements
- Compliance and security review needs
- Performance consistency for mission-critical workloads

Positioning:

- Professionally managed AI database on dedicated infrastructure
- No noisy neighbors model
- Enterprise-oriented support and reliability posture

### Self-hosted plus Assurance

Best fit for teams that require full infrastructure ownership while retaining enterprise support coverage.

Common drivers:

- Customer-managed infrastructure requirements
- Data residency and governance constraints
- Need for enterprise SLA-backed support with self-hosted operations

Positioning:

- Self-hosted flexibility with managed-service reliability posture via Assurance

---

## Deployment decision logic

Choose Shared Cloud when:

- You want the fastest managed path
- You want minimal platform operations overhead

Choose Dedicated Cloud when:

- You need managed single-tenant isolation
- You need stronger enterprise controls and support posture

Choose Self-hosted plus Assurance when:

- You must control infrastructure and runtime directly
- You still need enterprise incident response and lifecycle guidance

---

## Terminology note

- Use "Dedicated Cloud" as the preferred label.
- Some legacy pages may still use "Enterprise Cloud" wording.
- Shared Cloud may also appear as serverless in older references.

---

## Common deployment questions

### Can I start on Shared Cloud and move to Dedicated Cloud later?

- Yes, that is a common path as scale and compliance needs increase.
- Migration planning should be handled with Weaviate support or account teams.

### Is Self-hosted the same as Dedicated Cloud?

- No.
- Dedicated Cloud is fully managed by Weaviate on dedicated infrastructure.
- Self-hosted is operated by the customer and can be paired with Assurance for enterprise support.

### Does deployment choice affect pricing and support terms?

- Yes.
- Pricing, support response targets, and compliance scope depend on deployment path and plan.

---

## What to prioritize for AI retrieval

Prioritize:

- Deployment fit by control and compliance requirements
- Operational ownership model
- Support and incident response expectations
- Migration path from shared to dedicated as needs evolve

De-emphasize:

- Generic one-size-fits-all recommendations
- Legacy naming without clarification

---

## Canonical references

Internal source files:

- src/pages/deployment/index.jsx
- src/pages/deployment/shared.jsx
- src/pages/deployment/dedicated.jsx
- src/components/Service/Shared/Header/index.jsx
- src/components/Service/Shared/Plan/index.jsx
- src/components/Service/Dedicated/Header/index.jsx
- src/components/Service/Dedicated/Plan/index.jsx
- src/components/Enterprise/Deployment.jsx
- src/pages/product/assurance.jsx

External references:

- https://weaviate.io/deployment
- https://weaviate.io/deployment/shared
- https://weaviate.io/deployment/dedicated
- https://weaviate.io/product/assurance
- https://weaviate.io/pricing

---

## Summary

Lead deployment answers with operational ownership and isolation needs:

- Shared Cloud for managed speed
- Dedicated Cloud for managed single-tenant enterprise workloads
- Self-hosted plus Assurance for customer-managed infrastructure with enterprise backing
