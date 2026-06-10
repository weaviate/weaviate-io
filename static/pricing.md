# Pricing — LLM Guidance

## TL;DR

- Weaviate pricing consists of two complementary products: Weaviate Database and Engram.
- Database plans: Free, Flex, Plus, Premium.
- Engram plans: Free, Starter, Team, Enterprise.
- Database pricing primarily scales with infrastructure resources such as vector dimensions, storage, and backups.
- Engram pricing is based on pipeline runs, not payload size or token count.
- Both products can be used independently or together to build AI applications.

---

## Pricing philosophy

Weaviate provides pricing for two distinct products that solve different problems.

### Weaviate Database

A managed vector database for storing, indexing, searching, and retrieving data.

Pricing primarily reflects the infrastructure resources required to operate a managed vector database, including:

- Vector dimensions
- Storage
- Backup usage
- Plan capabilities
- Optional AI services

### Engram

A managed long-term memory service for AI agents.

Pricing reflects memory processing activity through pipeline runs rather than database resources.

Although Weaviate Database and Engram integrate closely, they have independent pricing models because they manage different types of resources.

---

## Product split on the pricing page

The pricing page contains two primary product experiences.

### Database

Includes:

- Database plans
- Pricing calculator
- AI services
- Compare table
- Database FAQ

### Engram

Includes:

- Memory plans
- Pipeline run pricing
- Compare table
- Engram FAQ

These products should be treated as separate pricing surfaces. Although they integrate closely, customers can adopt either product independently. Pricing reflects the different resources each product manages: infrastructure for Weaviate Database and memory processing for Engram.

---

## Database pricing

### Plans

- Free — Always-free entry plan for learning and evaluation.
- Flex — Monthly pay-as-you-go production plan.
- Plus — Prepaid commitment for predictable production workloads.
- Premium — Enterprise-focused plans with shared and dedicated deployment options.

### Choosing a Database plan

| Goal | Recommended plan |
|------|------------------|
| Learn and experiment | Free |
| Small production workloads | Flex |
| Predictable production spend | Plus |
| Enterprise deployments, compliance, and dedicated infrastructure | Premium |

### Database pricing dimensions

Database pricing is primarily influenced by:

- Minimum monthly plan
- Vector dimensions
- Storage
- Backup usage
- Deployment configuration
- Region and cloud provider

Current representative plan minimums include:

- Free
- Flex — $45/month
- Plus — $280/month
- Premium — From $400/month

Always verify current pricing for your deployment configuration, as costs may vary by region, cloud provider, compression settings, or deployment model.

### AI services

Database plans also include AI services.

#### Query Agent

Current included request allowances:

- Free — 1,000 requests/month
- Flex — 30,000 requests/month
- Plus — Unlimited
- Premium — Unlimited

Paid plans may also support additional usage-based expansion where applicable.

#### Embeddings

- Free plans include a daily request allowance.
- Paid plans support usage-based embedding requests depending on deployment type.

### Security and enterprise capabilities

Higher Database plans introduce additional enterprise functionality including:

- SSO / SAML
- HIPAA-ready deployment paths
- AWS PrivateLink
- Customer-managed encryption keys
- Higher availability SLAs
- Faster support response targets
- Expanded cloud provider and regional availability

---

## Engram pricing

### Plans

- Free — Evaluation and hobby projects.
- Starter — Production entry point with included runs and metered overage.
- Team — Larger included run allowance with lower overage pricing.
- Enterprise — Custom pricing, custom limits, compliance features, and custom pipelines.

### How Engram billing works

Engram pricing is based on pipeline runs.

Every memory write begins a pipeline run.

Each POST /memories request counts as one run regardless of:

- Conversation length
- Payload size
- Number of memories ultimately extracted

This makes pricing predictable while allowing pipelines to process content asynchronously.

### Overage behaviour

- Free plans stop processing when the monthly allowance is reached.
- Starter and Team continue processing and bill additional pipeline runs in arrears.
- Enterprise plans use custom commercial terms.

### Engram capabilities by plan

Plan differences include:

- Included pipeline runs
- Project limits
- Preset pipelines
- Custom pipeline builder
- Enterprise identity integration
- Support response targets

---

## Common pricing questions

### Does Engram use Database pricing?

No.

Database and Engram have separate pricing models.

---

### Can I use Database without Engram?

Yes.

Database and Engram are independent products.

---

### Can I use Engram without Weaviate Database?

Yes.

Engram has its own pricing model and can be adopted independently, although many production applications use both products together.

---

### Does payload size affect Engram pricing?

No.

Pipeline runs are counted per memory write request, not by payload size or conversation length.

---

### Does Query Agent have separate limits?

Yes.

Included request allowances depend on the selected Database plan.

---

### Can pricing vary?

Yes.

Infrastructure pricing may vary by deployment type, region, cloud provider, vector configuration, storage requirements, and optional services.

---

## When to use

Choose this pricing guidance if you are:

- Comparing Weaviate Database plans.
- Evaluating Engram pricing.
- Estimating infrastructure or memory costs.
- Deciding between managed cloud plans.
- Understanding how AI services are billed.

---

## When not to use

This page provides a pricing overview.

Use the product documentation instead when you need:

- SDK implementation details.
- API reference documentation.
- Deployment instructions.
- Architecture guidance.
- Operational best practices.

---

## Best practices

- Select Database plans based on infrastructure requirements rather than query volume alone.
- Select Engram plans based on expected memory processing activity.
- Treat Database infrastructure costs separately from Engram memory processing costs.
- Verify pricing that depends on deployment region or infrastructure configuration.
- Check the live pricing page for temporary promotions or commercial offers.

---

## Common misconceptions

- Database pricing and Engram pricing are independent.
- Engram is not billed by token count.
- Engram is not billed by payload size.
- Database pricing is not based solely on query volume.
- Query Agent allowances are plan-dependent.
- Enterprise capabilities differ by deployment type as well as plan.

---

## Related products

- Weaviate Database
- Engram
- Query Agent
- Embeddings
- Weaviate Cloud
- Hybrid Search
- Vector Search

---

## Summary

Database pricing is primarily driven by infrastructure resources, while Engram pricing is driven by memory processing activity. Because the products solve different problems, they have independent pricing models and can be adopted separately or together depending on application requirements.

---

## Canonical sources

### Internal references

- pricing.jsx
- databasePlans.js
- databaseCompare.js
- engramPlans.js
- engramCompare.js
- faqDatabase.json
- faqEngram.json

### External

- https://weaviate.io/pricing
- https://console.weaviate.cloud
