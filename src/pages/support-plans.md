---
title: Support plans
description: "Available support tiers and plans for Weaviate Cloud users with different service levels."
---

## **Support Plans**

[Weaviate Cloud (WCD)](https://weaviate.io/go/console?utm_source=docs&utm_content=cloud) offers multiple levels of support integrated into each pricing plan. Choose the plan that best meets your needs.
<br></br>

### Available plans

Sandboxes are not eligible for paid support. Paid support is available for **Shared Cloud** and **Dedicated Cloud** clusters with Flex, Plus, and Premium plans.

All paid plans include highly available (HA) clusters by default. Weaviate provides comprehensive [service level agreements (SLA)](https://weaviate.io/sla) that define availability guarantees, backup policies, and service credits.

<br></br>

### Availability guarantees

| Plan    | Availability per Quarter | Deployment options              |
| :------ | :----------------------- | :------------------------------ |
| Flex    | 99.5%                    | Shared Cloud                    |
| Plus    | 99.9%                    | Shared Cloud or Dedicated Cloud |
| Premium | 99.95%                   | Dedicated Cloud                 |

Exclusions from availability calculations include planned maintenance windows (announced at least one week in advance), customer-requested maintenance, and downtime resulting from third-party interruptions or factors beyond Weaviate's control.

<br></br>

### Sandbox

Free sandbox clusters for experimentation and prototyping.
<br></br>

**Features:**

- Full core database toolkit (hybrid search, dynamic index, compression, multi-tenancy)
- Baseline security with RBAC
- Community support only

**Support channels:**

- [Community forum](https://forum.weaviate.io)
- [Slack](https://weaviate.io/slack)

Sandboxes are not eligible for paid support.
<br></br>

### Flex

The most versatile pay-as-you-go plan for prototypes, pilots, and small production use cases.
<br></br>

**Features:**



- Shared Cloud deployment
- All core database features
- Built-in RBAC
- AI services (Embeddings and Agents)
- Automated upgrades
- Various compression techniques
- Daily full backup, stored in the same region for 7 days
- 99.5% availability per quarter

**Support:**

- Email-based support during business hours
- Public status page monitoring
- Response times based on severity

<br></br>

### Plus

Everything in Flex, plus annual commitment options, enhanced security, and stronger SLAs for mission-critical workloads.
<br></br>

**Features:**

- Choice of Shared or Dedicated Cloud deployment
- All Flex features
- Annual commitment options for predictable billing
- Enhanced security features
- Metrics endpoint for external monitoring
- Daily full backup, stored in the same region for 30 days
- 99.9% availability per quarter

**Support:**

- Enterprise support available 24/7
- Email-based support with priority response
- Enhanced incident response times

### Premium

For teams with the highest requirements around security, compliance, and performance.
<br></br>

**Features:**

- Dedicated Cloud infrastructure only
- All Plus features
- Premium security: RBAC, SSO/SAML, PrivateLink (AWS), Bring Your Own Key, bring-your-own IdP
- HIPAA compliant (AWS, with Azure and GCP in development)
- Any region on AWS, GCP, or Azure
- Daily full backup, stored in the same region for 45 days
- 99.95% availability per quarter

**Support:**

- White-glove support available 24/7
- Email-based and telephone hotline
- Technical Account Team
- Access to training and experts
- Priority incident response times

<br></br>

### Pricing

Weaviate Cloud uses transparent, metric-based pricing based on three dimensions:

- **Vector dimensions**: Number of objects × vector dimensionality × replication factor (varies by index type and compression)
- **Storage**: Total disk space for indexes, metadata, and database state
- **Backups**: Volume of snapshots and retention period

Pricing varies by cloud provider, region, and deployment type. All paid plans include highly available clusters as standard.

<br></br>

### Payment options

- **Flex**: Pay-as-you-go, monthly billing
- **Plus**: Annual contracts with predictable spend
- **Premium**: Annual contracts with predictable spend

To estimate costs for your specific use case, visit the [pricing page](https://weaviate.io/pricing).

