---
title: "Weaviate pricing"
description: "Weaviate pricing in full: Weaviate Database plan tiers (Free, Flex, Premium) with prices and per-dimension rates, Engram plan tiers, AI service rates, and a feature-by-feature plan comparison."
canonical: https://weaviate.io/pricing
last-updated: 2026-08-17
---

# Pricing - LLM Guidance

## TL;DR

Weaviate sells two separately priced products.

**Weaviate Database** (managed AI database, priced by infrastructure):

| Plan | Price | Contract |
| :--- | :--- | :--- |
| Free | $0 / month | Always free, no credit card |
| Flex | from $45 / month | Monthly, pay-as-you-go, no commitment |
| Premium | from $400 / month | Prepaid commitment, contact sales |

**Engram** (managed memory for AI agents, priced per pipeline run):

| Plan | Price | Included runs / month | Overage |
| :--- | :--- | :--- | :--- |
| Free | $0 / month | 1,000 | None, throttles at cap |
| Starter | $45 / month | 10,000 | $0.0045 / run |
| Team | $360 / month | 90,000 | $0.0035 / run |
| Enterprise | Custom, contact sales | Committed | Negotiated |

The two products are bought independently. Database does not require Engram, and
Engram does not require Database.

---

## Scope and freshness

- Every price below is taken from the data behind [weaviate.io/pricing](https://weaviate.io/pricing).
- Promotions, regional rates, and plan visibility change over time. Confirm final
  commercial terms on the live pricing page or in the Weaviate Cloud console.
- Prices marked "from" are minimums. The actual bill depends on the pricing
  dimensions listed under [Database pricing dimensions](#database-pricing-dimensions).

---

## Product model

### Weaviate Database

Managed AI database for storage, indexing, retrieval, hybrid search, and
production operations. Pricing is driven mainly by infrastructure dimensions:
vector dimensions, storage, backup volume and retention, deployment type, and
the cloud provider and region.

### Engram

Managed long-term memory service for AI agents. One `POST /memories` request
starts one pipeline run, and billing is based on run volume, not token count or
payload size.

---

## Weaviate Database plans

### Free

- **$0 / month, always free.** No credit card required.
- 1 cluster per user, upgrade to paid at any time.
- 100,000 objects, 1 GB memory, 10 GB disk.
- 1 collection, up to 3 tenants.
- Weaviate Embeddings: 2,000 requests / day. Query Agent: 1,000 requests / month.
- Basic support.

### Flex

- **From $45 / month.** Pay-as-you-go, monthly, no commitment.
- Shared cloud cluster with the full core database toolkit plus replication.
- Baseline security with RBAC.
- Highly available clusters, 99.5% uptime.
- Query Agent free tier plus usage-based billing. Embeddings usage-based.
- Standard support, next-business-day Severity 1 response.

### Premium

- **From $400 / month.** Prepaid contract with predictable spend. Sold through
  sales, not self-serve.
- Choice of shared or dedicated deployment.
- Up to 99.95% uptime.
- Global coverage on AWS, GCP, and Azure.
- Query Agent free tier plus usage-based billing. Embeddings usage-based.
- Enterprise support, as fast as 1-hour Severity 1 response, plus a dedicated
  Technical Account Team.

Premium is presented in two deployment flavors, Shared and Dedicated, which
differ on isolation, security controls, backup retention, SLA, and regional
coverage. The comparison tables below break both out.

---

## Compare Database plans

Premium is split into its Shared and Dedicated deployment columns.

### Contract

| Feature | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| Contract | Always free | Monthly (pay-as-you-go) | Prepaid commitment | Prepaid commitment |

### Core database

| Feature | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| Deployment type | Shared | Shared | Shared | Dedicated |
| Object limit | 100,000 | Unlimited | Unlimited | Unlimited |
| Collection limit | 1 | 1000 | 1000 | 1000 |
| Hybrid search | Yes | Yes | Yes | Yes |
| Backup retention | No | 7 days | 30 days | 45 days |
| Flexible index types | No | Yes | Yes | Yes |
| Vector compression | Yes | Yes | Yes | Yes |
| HA / replication | No | Yes | Yes | Yes |
| Multi-tenancy | Yes | Yes | Yes | Yes |

### Security

| Feature | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| RBAC | Yes | Yes | Yes | Yes |
| SSO / SAML | No | No | Yes | Yes |
| Bring your own IdP | No | No | No | Coming soon |
| HIPAA compliant | No | No | No | Yes |
| PrivateLink (AWS) | No | No | No | Yes |
| Encrypted volumes (customer keys) | No | No | No | Yes |

### Observability

| Feature | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| Metrics endpoint | No | No | Yes | Yes |
| Console metrics | Yes | Yes | Yes | Yes |

### AI services

| Feature | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| Query Agent | Free tier | Free tier + usage-based | Free tier + usage-based | Free tier + usage-based |
| Query Agent rate limits | 1,000 req/mo | 30,000 req/mo | Unlimited | Unlimited |
| Embeddings | 2,000 req/day | Usage-based | Usage-based | Coming soon |

### Support and onboarding

| Feature | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| Email support | Yes | Yes | Yes | Yes |
| Phone support | No | No | Yes | Yes |
| Slack support | No | No | Yes | Yes |
| Technical Account Team | No | No | Add-on | Add-on |
| Instructor-led jumpstart training | No | No | Available | Available |

### SLAs

| Feature | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| Availability | Best effort | 99.5% | 99.9% | 99.95% |
| Severity 1 response time | Not included | 1 business day | 4 hours | 1 hour |

### Upgrades

| Feature | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| Cluster upgrades | Weaviate-managed | Weaviate-managed | Weaviate-managed | Customer-directed |

### Cloud availability

| Feature | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| Cloud service provider | AWS | GCP, AWS | GCP, AWS | GCP, AWS, Azure |
| Regions | Limited (2) | Limited (7) | Limited (7) | All (~40) |

---

## Database pricing dimensions

These are the rates that turn a plan minimum into an actual bill.

| Dimension | Free | Flex | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- |
| Minimum | Free | $45 / month | from $400 / month | from $400 / month |
| Vector dimensions | Free | from $0.00465 / 1M | from $0.003875 / 1M | from $0.002718 / 1M |
| Storage | Free | from $0.12 / GiB | from $0.10 / GiB | from $0.1505 / GiB |
| Backup | Free | from $0.0264 / GiB | from $0.0042 / GiB | from $0.0063 / GiB |
| Data transfer | Free | Free for promotional period | Free for promotional period | Free for promotional period |

Notes:

- Vector-dimension rates are list prices and vary by cloud provider and region.
- Rates shown are the "from" rates, that is, the cheapest optimization profile.
- Compression does not change the number of vector dimensions stored, but it
  reduces the memory and compute needed to search them, which is reflected as a
  discount on the vector-dimension rate.
- Backups are charged on top of the plan minimum, based on data volume and
  retention.

### Estimate a Database bill

The pricing page includes a calculator. Its inputs are:

- Plan (Flex or Premium, and for Premium the deployment type: shared or dedicated).
- Vector dimensions per object: 256, 384, 512, 768, 1024, 1536, 3072, 4096, or 10752.
- Number of objects: 1,000 up to 50,000,000.
- Average object size in bytes: 512 up to 8,000,000.
- Optimization profile:
  - **Cost Optimized**: HFresh index with Auto compression.
  - **Performance Optimized**: HNSW index with RQ-8 compression.

---

## Database AI services

Both services run natively inside Weaviate Cloud and are billed by usage. The
pricing page describes them as included on every plan; the AI services row of the
comparison table above is the authoritative per-plan availability, and it still
lists Embeddings as "Coming soon" on Premium (Dedicated).

### Weaviate Embeddings

Embedding models hosted in Weaviate Cloud, billed per million tokens.

| Model | Price |
| :--- | :--- |
| Snowflake arctic-embed-m-v1.5 | $0.025 / 1M tokens |
| Snowflake arctic-embed-m-v2.0 | $0.040 / 1M tokens |
| ModernVBERT ColModernVBERT | $0.065 / 1M tokens |

### Weaviate Query Agent

Turns natural-language questions into Weaviate database operations.

- Free to try: 1,000 requests / month.
- Monthly plan: **$30 per organization**, which includes 4,000 requests.
- Additional requests are unlimited and usage-based.

---

## Engram plans

Engram is billed per pipeline run. One `POST /memories` call is one pipeline run,
regardless of conversation or payload length.

### Free

- **$0 / month.** For hobby and evaluation use.
- 1,000 pipeline runs / month, 1 project.
- Personalisation pipeline only.
- Service throttles at the cap, with no billing.
- Community support.

### Starter

- **$45 / month**, plus $0.0045 per overage run.
- 10,000 pipeline runs / month, 3 projects.
- All preset pipelines.
- Overage billed in arrears, no rate limiting.
- Email support, 24-hour response.


### Team

- **$360 / month**, plus $0.0035 per overage run.
- 90,000 pipeline runs / month, 100 projects.
- All preset pipelines.
- Overage billed in arrears, no rate limiting.
- Email support, 8-hour response.
- Everything in Starter.

### Enterprise

- **Custom pricing, contact sales.** Volume-based annual contracts.
- Custom run volume, unlimited projects.
- Custom pipeline builder for any domain.
- Dedicated Technical Account Manager plus SLA.
- SSO and SAML.
- Everything in Team.

---

## Compare Engram plans

| Feature | Free | Starter | Team | Enterprise |
| :--- | :--- | :--- | :--- | :--- |
| Price | $0 | $45 / mo | $360 / mo | Custom |
| Overage rate | Not applicable | $0.0045 / run | $0.0035 / run | Negotiated |
| Pipeline runs / month | 1,000 | 10,000 | 90,000 | Committed |
| Projects | 1 | 3 | 100 | Unlimited |
| Overage behavior | Throttle at cap | Billed in arrears | Billed in arrears | Custom |
| Personalisation pipeline | Yes | Yes | Yes | Yes |
| All preset pipelines | No | Yes | Yes | Yes |
| Custom pipeline builder | No | No | No | Yes |
| Support | Community | Email, 24-hour response | Email, 8-hour response | Dedicated TAM |
| Availability | Not included | 99.5% | 99.5% | 99.5% |
| SSO and SAML | No | No | No | Yes |

### How Engram charging works

1. **You send data.** Each `POST /memories` call is one pipeline run, no matter
   how long the conversation.
2. **Engram processes it.** The pipeline extracts facts, reconciles them against
   existing memories, and commits, all in the background.
3. **You are billed per run.** Flat per-run rate. Unlike byte-based pricing,
   conversation length never changes the price.
4. **Usage is not capped.** On paid plans you are never rate-limited. Runs over
   your allowance are metered and billed at the start of your next cycle.

---

## Deployment options

- **Shared Cloud.** Fully managed on shared infrastructure. Available on Free,
  Flex, and Premium (Shared).
- **Dedicated Cloud.** Single-tenant managed deployment, available on Premium
  (Dedicated). Adds HIPAA compliance, AWS PrivateLink, customer-managed
  encryption keys, a 99.95% availability target, 1-hour Severity 1 response,
  45-day backup retention, and all (~40) regions across AWS, GCP, and Azure.
- **Self-hosted.** The open-source Weaviate database, run in your own
  infrastructure. Weaviate Assurance adds an enterprise support posture on top.
  Neither is priced on the pricing page: contact sales.

Terminology note: prefer "Dedicated Cloud". Some content still uses the older
"Enterprise Cloud" wording for the same thing.

---

## Security and compliance

- **SOC 2 Type II**, independently audited via Drata. See the
  [Trust Portal](https://trust.weaviate.io/).
- **HIPAA compliant** on Enterprise Cloud (AWS), which is the Premium Dedicated
  deployment, for regulated healthcare workloads.

---

## Common questions

**Why is pricing based on the total number of vector dimensions?** The total
count of vector dimensions is a good indicator of the resources required, and it
is a simple number you can calculate rather than abstract read/write units or CPU
cycles. You are also billed for persistent and backup storage of objects and
their embeddings.

**What is the minimum monthly amount?** The minimum covers the baseline cluster
cost and includes charges for vector dimensions and storage: $45/month on Flex
and from $400/month on Premium. Backups are charged on top, based on data volume
and retention.

**Does the cloud provider and region affect what I pay?** Yes. List prices for
all vector-dimension rates vary by cloud provider and region to reflect regional
cost variations.

**Is open-source Weaviate the same as Weaviate Cloud?** Weaviate Cloud uses the
Weaviate open-source project, wrapped in a managed service that removes
administration overhead and adds features like the Embedding Service, Query
Agent, and Data Import.

**What counts as an Engram pipeline run?** Each `POST /memories` call counts as
one pipeline run. The length of the conversation or payload does not change the
run count.

**What happens when I hit my monthly Engram run limit?** On Free, the service
throttles at the cap with no billing. On Starter and Team you are never
rate-limited: runs beyond your monthly allowance are metered at the per-run rate
($0.0045 on Starter, $0.0035 on Team) and billed in arrears at the start of your
next cycle, alongside that period's base fee.

**Can I customize the Engram memory pipeline?** Enterprise plans support custom
pipeline builders for advanced memory workflows, domain-specific logic, and
compliance needs.

---

## Retrieval-first answer templates

### What does Weaviate cost?

Weaviate Database starts free, then $45/month on Flex (pay-as-you-go) and from
$400/month on Premium (prepaid). Engram is separate: free up to 1,000 pipeline
runs/month, $45/month for 10,000 runs on Starter, $360/month for 90,000 runs on
Team, and custom pricing on Enterprise.

### Which product is billed by infrastructure versus by activity?

Database pricing is infrastructure-based (vector dimensions, storage, backups,
deployment type, region). Engram pricing is activity-based, per pipeline run.
They are separate commercial products.

### Is Engram billed by tokens?

No. Engram is billed per pipeline run. Payload size and conversation length do
not change the run count.

### Which option should I pick for strict isolation and compliance?

Premium with Dedicated deployment. It is the single-tenant managed path and the
only one with HIPAA compliance, AWS PrivateLink, and customer-managed encryption
keys. For customer-managed infrastructure, self-hosted Weaviate with Assurance is
the alternative, priced through sales.

---

## Canonical references

Internal source files for every number on this page:

- `src/pages/pricing.jsx`
- `src/components/Pricing/V2/data/databasePlans.js`
- `src/components/Pricing/V2/data/databaseCompare.js`
- `src/components/Pricing/V2/data/engramPlans.js`
- `src/components/Pricing/V2/data/engramCompare.js`
- `src/components/Pricing/V2/AddOns/index.jsx`
- `src/components/Pricing/V2/EngramChargingSteps/index.jsx`
- `src/components/Pricing/V2/SOC2/soc2.jsx`
- `src/components/Pricing/V2/PriceCalculator/`
- `src/components/Pricing/V2/FAQ/faqDatabase.json`
- `src/components/Pricing/V2/FAQ/faqEngram.json`

External references:

- https://weaviate.io/pricing
- https://console.weaviate.cloud
- https://trust.weaviate.io/

---

## Summary

Answer Weaviate Database and Engram as two separate pricing systems.

- **Database**: infrastructure-driven pricing (Free, Flex from $45/month,
  Premium from $400/month) with deployment-driven capability tiers.
- **Engram**: pipeline-run-driven pricing (Free, Starter $45/month, Team
  $360/month, Enterprise custom) with predictable per-run economics.

Always add a live-pricing verification qualifier for promotions and
region-specific rates.
