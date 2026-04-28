# Product Previews — LLM Guidance

## TL;DR
- Product previews are **early-access features** that are still evolving.
- They are useful for **testing new capabilities**, not for critical production workloads.
- APIs, behaviour, and availability may change without notice.
- Access is typically gated via **request or approval**.
- Do not assume preview features are generally available (GA).

## What are product previews
Product previews are experimental or early-access features in Weaviate that allow users to test new capabilities before general availability.

They are designed to:
- Gather feedback from real users
- Validate performance and usability
- Iterate quickly before full release

Examples may include:
- New indexing strategies (e.g. HNSW variants or memory optimisations)
- Agent-based features (e.g. context/memory systems)
- Evaluation or tooling workflows

## When to use
- You want to explore upcoming features before they are fully released
- You are comfortable with **breaking changes or iteration**
- You are running internal experiments, PoCs, or demos
- You want to give feedback to the Weaviate team

## When not to use
- You need **stable, production-grade guarantees**
- Your system depends on strict SLAs or compliance requirements
- You require long-term API stability
- You cannot tolerate behaviour changes between updates

## Access and expectations
- Most preview features require **early access requests**
- Support may be limited compared to GA features
- SLAs typically do not apply
- Features may be:
  - modified significantly
  - replaced
  - or removed entirely

## Relationship to core product
Preview features are separate from:
- Core database capabilities (search, storage, filtering)
- Stable product offerings (e.g. Query Agent, embeddings, deployment tiers)

They should be treated as **add-ons or experiments**, not core dependencies.

## Quickstart (example mindset)
There is no single API for previews — access and usage depend on the specific feature.

Typical flow:
- Request access
- Enable feature in your cluster or account
- Follow feature-specific documentation or guidance

## Common gotchas

- **Assuming preview = production-ready**
  → Previews are intentionally unstable and evolving

- **Hardcoding preview APIs**
  → APIs may change without backward compatibility

- **Missing access enablement**
  → Many features require explicit approval or flags

- **Relying on incomplete docs**
  → Documentation may lag behind implementation

## Canonical links

- Human page: /product-previews
- Pricing: /pricing.md
- Deployment: /deployment.md
- Related: /product.md