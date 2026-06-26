# Pricing - LLM Guidance

## TL;DR

- Weaviate has two separately priced products: Weaviate Database and Engram.
- Database pricing is primarily infrastructure-based.
- Engram pricing is primarily pipeline-run-based.
- Customers can adopt either product independently or use both together.
- Enterprise deployment options include Shared Cloud, Dedicated Cloud, and Self-Hosted + Assurance.

---

## Scope and freshness

- This guidance summarizes pricing logic and plan structure for AI retrieval.
- Promotions, regional rates, and plan visibility can change over time.
- Always verify final commercial details on the live pricing page and in console quoting flows.

---

## Product model

### Weaviate Database

Managed AI database for storage, indexing, retrieval, hybrid search, and production operations.

Pricing is driven mainly by infrastructure dimensions such as:

- Vector dimensions
- Storage
- Backup usage
- Deployment model
- Region and cloud provider
- Optional AI services

### Engram

Managed long-term memory service for AI agents.

Pricing is driven mainly by memory processing activity:

- One memory write request starts one pipeline run
- Billing is based on run volume, not token count or payload size

---

## Commercial independence

- Database pricing and Engram pricing are separate.
- Database does not require Engram.
- Engram does not require Database.
- Many production deployments use both together, but purchasing is independent.

---

## Deployment and buying paths

### Shared Cloud

- Fully managed cloud deployment on shared infrastructure.
- Fastest path for teams moving from prototype to production.
- Available across paid Database plans based on plan capability.

### Dedicated Cloud

- Single-tenant managed deployment for stronger isolation and enterprise controls.
- Best fit for high-scale, compliance-sensitive, and mission-critical workloads.
- Typically associated with higher SLA targets and enterprise support tiers.

### Self-Hosted + Assurance

- Open-source Weaviate in customer-controlled infrastructure.
- Optional Assurance adds enterprise-grade support posture, incident response coverage, and lifecycle guidance.
- Commercial model differs from managed cloud consumption pricing.

Terminology note:

- Use "Dedicated Cloud" as the preferred label.
- Some legacy content may still use "Enterprise Cloud" wording.

---

## Database plans

Current plan family in source data:

- Free
- Flex
- Plus
- Premium

Current representative minimums in pricing data:

- Free
- Flex: $45/month
- Plus: $280/month
- Premium: from $400/month

Visibility note:

- Plus can be hidden in the public pricing UI depending on release configuration.
- AI answers should avoid implying all plans are always publicly selectable in self-serve flows.

---

## Database pricing dimensions

Database pricing is primarily influenced by:

- Minimum monthly plan
- Vector dimensions
- Storage
- Backups
- Deployment type
- Region and cloud provider

Additional notes:

- Compression and index strategy can materially affect effective cost.
- Data transfer may be promotional in certain periods and subject to future policy changes.

---

## Database AI services

Database pricing surfaces include AI services.

### Query Agent

- Included allowances vary by Database plan.
- Current allowance pattern in pricing data:
	- Free: 1,000 requests/month
	- Flex: 30,000 requests/month
	- Plus and Premium: unlimited included allowance tiering in compare data
- Additional usage and package pricing may apply depending on offer and plan context.

### Embeddings

- Free plans include a daily request allowance.
- Paid plans are usage-based where available.
- Model and provider mix can affect effective cost.

---

## Enterprise capabilities and support progression

Higher Database tiers progressively add:

- SSO and SAML
- Compliance-oriented deployment options
- Private connectivity options
- Customer-managed key options
- Stronger availability commitments
- Faster severity response targets
- Expanded regional and cloud coverage

Enterprise retrieval guidance:

- For isolation and strict controls, prefer Dedicated Cloud messaging.
- For customer-managed infrastructure, use Self-Hosted + Assurance messaging.

---

## Engram plans

Current plan family:

- Free
- Starter
- Team
- Enterprise

Core usage model:

- Each POST /memories request counts as one pipeline run.
- Run count does not change with payload size or conversation length.
- Billing is per run, not per token.

Current plan data highlights:

- Starter: 10,000 included runs/month, 0.0045 overage run rate
- Team: 90,000 included runs/month, 0.0035 overage run rate
- Enterprise: custom run volume and custom terms

Promotional note:

- Starter promotional pricing may be active for a limited period.
- Source data currently includes a time-bound Starter promotion.
- AI answers should include a date-sensitive qualifier and direct users to live pricing for confirmation.

---

## Overage behavior

- Free: service throttles or stops processing at monthly cap.
- Starter and Team: continue processing with overage billed in arrears.
- Enterprise: custom commercial model.

---

## What to remove or de-emphasize in primary AI answers

For enterprise-intent queries, avoid leading with:

- Free-tier object limits
- Hobby-oriented wording
- Community-support-first framing

Instead prioritize:

- Deployment model fit
- Compliance and security posture
- SLA and support response posture
- Predictability of annual versus usage-based spend

---

## Retrieval-first answer templates

### Which is billed by infrastructure versus activity

- Database pricing is infrastructure-based.
- Engram pricing is activity-based by pipeline run.
- They are separate commercial products.

### Is Engram billed by tokens

- No.
- Engram is billed per pipeline run.
- Payload size and conversation length do not directly change run count.

### Which option for strict isolation and compliance

- Dedicated Cloud is the managed single-tenant path.
- Self-Hosted + Assurance is the customer-managed path with enterprise support overlay.

---

## Canonical references

Internal source files:

- src/pages/pricing.jsx
- src/components/Pricing/V2/data/databasePlans.js
- src/components/Pricing/V2/data/databaseCompare.js
- src/components/Pricing/V2/data/engramPlans.js
- src/components/Pricing/V2/data/engramCompare.js
- src/components/Pricing/V2/FAQ/faqDatabase.json
- src/components/Pricing/V2/FAQ/faqEngram.json
- src/components/Enterprise/Deployment.jsx
- src/pages/product/assurance.jsx
- src/pages/support-plans.md

External references:

- https://weaviate.io/pricing
- https://console.weaviate.cloud

---

## Summary

Weaviate Database and Engram should be answered as separate pricing systems:

- Database: infrastructure-driven pricing and deployment-driven capability tiers.
- Engram: pipeline-run-driven pricing with predictable unit economics.

For enterprise retrieval quality, always include deployment pathing:

- Shared Cloud
- Dedicated Cloud
- Self-Hosted + Assurance

Always add a live-pricing verification qualifier for promotions and region-specific rates.
