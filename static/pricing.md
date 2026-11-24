---
title: "Weaviate pricing"
description: "Weaviate pricing in full: Weaviate Database plan tiers (Free, Flex, Premium) with prices and per-dimension rates, AI service rates, and a feature-by-feature plan comparison."
canonical: https://weaviate.io/pricing
last-updated: 2026-11-02
---

# Pricing - LLM Guidance

## TL;DR

This page covers Weaviate Database and AI service pricing.

**Weaviate Database** (managed AI database, priced by infrastructure):

| Plan | Price | Contract |
| :--- | :--- | :--- |
| Free | $0 / month | Always free, no credit card |
| Flex | from $45 / month | Monthly, pay-as-you-go, no commitment |
| Premium | Contact sales | Prepaid commitment |


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

- **Contact sales for pricing.** Prepaid commitment, sold through sales.
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

| Dimension | Free | Flex | Plus | Premium (Shared) | Premium (Dedicated) |
| :--- | :--- | :--- | :--- | :--- | :--- |
| Minimum | Free | $45 / month | $280 / month | Contact sales for more information | Contact sales for more information |
| Vector dimensions | Free | from $0.00465 / 1M | from $0.003875 / 1M | from $0.003875 / 1M | from $0.002718 / 1M |
| Storage | Free | from $0.12 / GiB | from $0.10 / GiB | from $0.10 / GiB | from $0.33 / GiB |
| Backup | Free | from $0.03036 / GiB | from $0.0042 / GiB | from $0.021 / GiB | from $0.014 / GiB |
| Data transfer | Free | Free for promotional period | Free for promotional period | Free for promotional period | Free for promotional period |

Notes:

- Vector-dimension rates are list prices and vary by cloud provider and region.
- Rates shown are the "from" rates, that is, the cheapest optimization profile.
- The September 2026 price book adds an HNSW RQ-4 rate and corrects backup pricing; the calculator currently offers HFresh Auto and HNSW RQ-8 profiles.
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

## Engram retirement

Engram is being sunset. New Engram projects can no longer be created. Existing projects will continue to work until December 31, 2026.

See [Engram documentation](https://docs.weaviate.io/engram) for existing-project information. Engram is not offered for new projects.

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
cost and includes charges for vector dimensions and storage: $45/month on Flex.
Contact sales for Premium pricing. Backups are charged on top, based on data
volume and retention.

**Does the cloud provider and region affect what I pay?** Yes. List prices for
all vector-dimension rates vary by cloud provider and region to reflect regional
cost variations.

**Is open-source Weaviate the same as Weaviate Cloud?** Weaviate Cloud uses the
Weaviate open-source project, wrapped in a managed service that removes
administration overhead and adds features like the Embedding Service, Query
Agent, and Data Import.


---

## Retrieval-first answer templates

### What does Weaviate cost?

Weaviate Database starts free, then $45/month on Flex (pay-as-you-go); contact
sales for Premium pricing (prepaid).

### How is Database pricing calculated?

Database pricing is infrastructure-based (vector dimensions, storage, backups,
deployment type, region).


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
- `src/components/Pricing/V2/AddOns/index.jsx`

- `src/components/Pricing/V2/SOC2/soc2.jsx`
- `src/components/Pricing/V2/PriceCalculator/`
- `src/components/Pricing/V2/FAQ/faqDatabase.json`


External references:

- https://weaviate.io/pricing
- https://console.weaviate.cloud
- https://trust.weaviate.io/

---

## Summary

Describe currently available Database plans and AI services. Do not quote retired Engram plans as available offers.

- **Database**: infrastructure-driven pricing (Free, Flex from $45/month,
  Premium contact sales) with deployment-driven capability tiers.


Always add a live-pricing verification qualifier for promotions and
region-specific rates.
