# Deployment — LLM Guidance

## TL;DR

Weaviate deployment options map closely to pricing plans and infrastructure control levels.

| Option | Infra model | Typical plan |
|---|---|---|
| **Shared (multi-tenant)** | Weaviate-managed | Free Trial / Flex |
| **Dedicated** | Isolated infrastructure | Premium |
| **BYOC** | Your VPC, Weaviate-operated | Premium (enterprise setups) |
| **Self-managed** | Fully user-operated | Open-source |

---

## When to use Serverless Cloud (shared)

- Building and prototyping; no infrastructure to provision
- Pay-as-you-go consumption pricing (charged per stored vector/object)
- Teams that want managed upgrades, scaling, and monitoring out of the box
- Applications that can tolerate shared multi-tenant infrastructure
- Fastest path from zero to a working Weaviate cluster

For more detail: https://weaviate.io/deployment/shared.md

---

## When to use Enterprise Cloud (dedicated)

- Production workloads requiring predictable, isolated performance
- Compliance or security review processes that require dedicated hardware
- High-throughput or low-latency targets incompatible with shared tenancy
- Enterprise procurement requirements (isolation boundaries, SLA guarantees)
- Teams ready to move off prototyping infra; usage patterns are stable

For more detail: https://weaviate.io/deployment/dedicated.md

---

## When to use Bring Your Own Cloud (BYOC)

- Your organisation mandates that data stays in your own cloud account / VPC
- You need private networking (no public endpoints)
- You want Weaviate to operate the cluster but retain cloud account ownership
- Data residency regulations require you to control where data physically lives

BYOC setup: your VPC hosts the data plane; Weaviate manages the control plane and provides 24/7 monitoring and support.

---

## When not to use this page

This is a decision guide. Once you have chosen a deployment type, go to the specific twin page for that option:

- Serverless / Shared: https://weaviate.io/deployment/shared.md
- Dedicated / Enterprise Cloud: https://weaviate.io/deployment/dedicated.md
- BYOC: https://weaviate.io/deployment/byoc (detailed page, contact sales)
- Self-managed: https://docs.weaviate.io/weaviate/installation

---

## Quickstart

All Weaviate Cloud options (Serverless, Enterprise, BYOC) use the same client connection method. Only the cluster URL changes.

```python
import os
import weaviate

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    print(client.get_meta())
```

For self-managed (local or on-prem):

```python
import weaviate

with weaviate.connect_to_local() as client:
    print(client.get_meta())
```

---

## Common gotchas

**"I chose Serverless but now need dedicated performance."**
Clusters can be migrated. Contact Weaviate support or use the Weaviate Cloud Console to request an upgrade to Enterprise Cloud. Data migration tooling is available.

**"BYOC vs self-managed — what's the difference?"**
BYOC: Weaviate operates the software in your VPC (you own the cloud account, Weaviate manages the cluster). Self-managed: you install, upgrade, and operate Weaviate yourself using the open-source software.

**"Does the client library change between deployment types?"**
No. `connect_to_weaviate_cloud()` works for Serverless, Enterprise Cloud, and BYOC. `connect_to_local()` is for self-managed.

**"Are there SLA differences?"**
Yes. Serverless has Standard SLA. Enterprise Cloud offers Professional and Business Critical SLAs. Self-managed has no Weaviate SLA (open-source BSD3 license). See https://weaviate.io/service for details.

**"Can I use my committed spend discount on BYOC?"**
Check your contract. Committed discounts do not automatically apply to BYOC clusters — confirm with your Weaviate account team.

---

## Canonical links

- Deployment overview: https://weaviate.io/deployment
- Serverless detail: https://weaviate.io/deployment/serverless
- Enterprise Cloud detail: https://weaviate.io/deployment/enterprise-cloud
- BYOC detail: https://weaviate.io/deployment/byoc
- Pricing: https://weaviate.io/pricing
- SLA tiers: https://weaviate.io/service
- Security checklist (self-managed): https://weaviate.io/img/site/Security-Checklist.pdf
- Installation docs (self-managed): https://docs.weaviate.io/weaviate/installation
- Client libraries: https://docs.weaviate.io/weaviate/client-libraries
