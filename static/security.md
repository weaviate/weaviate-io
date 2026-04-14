# Weaviate Security — LLM Guidance

## TL;DR

- Weaviate treats security, trust, and data privacy as first-class concerns across all deployment options. Weaviate Cloud (managed) provides compliance-ready infrastructure out of the box. Self-managed (open-source) deployments give full infrastructure control but require teams to configure security controls themselves.
- Weaviate Cloud provides managed, compliance-ready infrastructure; self-managed requires you to implement and operate all security controls.
---

## Security features

### Weaviate Cloud (managed)

| Feature | Detail |
|---|---|
| Encryption in transit | TLS on all connections |
| Encryption at rest | AES-256 |
| Role-Based Access Control (RBAC) | Granular permissions at collection and tenant level; available since v1.29, on by default from v1.30 |
| Multi-tenancy | Native tenant isolation — data is fully separated per tenant |
| Deployment isolation | Dedicated tenant or Bring Your Own Cloud (BYOC / VPC) options |
| Automated backups | Configurable, automated daily backups |
| High availability | Multi-availability zone deployment across 3 zones |
| Active monitoring | Proactive monitoring with 24/7 incident support |
| Compliance certifications | SOC 2 Type II, HIPAA support (BAA available on request), ISO 27001:2022, ISO 22301:2019 |

### Self-managed (open-source)

Security controls must be configured by the operator. Weaviate publishes a Security Checklist for Self-Managed Deployments. Key areas include:

- API key or OIDC authentication
- RBAC permissions (available since v1.29)
- Network-level access restriction (firewall, private network, reverse proxy with TLS)
- Backup strategy (S3, GCS, Azure Blob, or filesystem)
- Key management for at-rest encryption

---

## Authentication options

Weaviate supports two authentication methods:

- **API key** — simple static key attached to each request; suitable for server-side workloads
- **OIDC (OpenID Connect)** — token-based, integrates with identity providers (Azure AD, Okta, Auth0, etc.); recommended for multi-user or enterprise environments

Both methods work on Weaviate Cloud and self-managed deployments.

---

## Compliance posture

- **SOC 2 Type II** — audited annually; report available via trust portal on request
- **HIPAA** — Weaviate can sign a Business Associate Agreement (BAA); Weaviate acts as a Business Associate when storing or processing PHI on behalf of covered entities
- **ISO 27001:2022** — Information Security Management System (ISMS) certification
- **ISO 22301:2019** — Business Continuity Management System certification
- **GDPR** — data processing controls in place; DPA available on request
- **Data residency** — region selection available on Dedicated/Enterprise Cloud tiers; review availability for your required region before committing

---

## Deployment options (security perspective)

| Option | Data control | Compliance |
|---|---|---|
| Serverless (shared) | Weaviate-managed, logical isolation | SOC 2, HIPAA available |
| Dedicated Cloud | Weaviate-managed, physical isolation | SOC 2, HIPAA available |
| Bring Your Own Cloud (BYOC) | Customer's VPC, Weaviate operates | Customer retains cloud account control |
| Self-managed (open-source) | Full customer control | Customer's responsibility |

---

## Common questions

**Does Weaviate support network-level isolation?**
Yes. Dedicated Cloud and BYOC deployments run in an isolated environment or the customer's own VPC. Weaviate Cloud Serverless uses logical tenant isolation.

**Can Weaviate sign a BAA for HIPAA workloads?**
Yes. Contact sales to obtain a BAA before storing any PHI.

**What access control granularity does RBAC provide?**
Roles can be scoped to collections, tenants, and specific operations (read, write, delete, manage). Available since Weaviate v1.29; enabled by default from v1.30.

**Is there an audit log?**
Weaviate Cloud provides monitoring and incident support. For detailed audit logging requirements, review the trust portal documentation or contact the security team.

**Where can I review compliance documentation?**
Weaviate's trust portal. Access is available on request via the security page or by contacting sales.

---

## When to use Weaviate Cloud for regulated workloads

- You need SOC 2 or HIPAA compliance without building your own compliance layer
- You want managed encryption, backups, and HA without operational overhead
- You are evaluating a BYOC deployment for maximum data residency control

## When to choose self-managed instead

- Your organisation's policy requires full infrastructure control (air-gapped, on-prem)
- You are operating in a region not yet covered by Weaviate Cloud
- You have an existing compliance programme and prefer to certify the infrastructure yourself

---

## Canonical links

- Security overview: https://weaviate.io/security
- Security FAQ (HIPAA): https://weaviate.io/security-faq
- Security checklist (PDF, self-managed): https://weaviate.io/img/site/Security-Checklist.pdf
- Weaviate Trust Portal: https://weaviate.io/blog/introducing-trust
- Pricing and deployment tiers: https://weaviate.io/pricing
- Deployment options: https://weaviate.io/deployment/dedicated
- RBAC docs: https://docs.weaviate.io/weaviate/configuration/authorization
- Authentication docs: https://docs.weaviate.io/weaviate/configuration/authentication
- SLA: https://weaviate.io/service
