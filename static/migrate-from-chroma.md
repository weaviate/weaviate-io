---
title: "Migrate from Chroma Cloud to Weaviate"
description: "Plan a trial migration, verify your search results, and switch your application to Weaviate."
canonical: https://weaviate.io/migrate-from-chroma
last-updated: 2026-11-13
---

# Migrate from Chroma Cloud to Weaviate

Start with one collection. Map your documents and embeddings, compare search results, then move your application traffic.

[Start your migration](https://weaviate.io/migrate-from-chroma#migration-tool) or [talk to our team](https://weaviate.io/migrate-from-chroma#contact-team).

## Migration steps

1. Start with one collection. Map its IDs, documents, metadata, and embeddings to Weaviate.
2. Compare search results. Run the same filtered query in both systems and check the IDs and their order.
3. Move your traffic. Redirect writes, then switch reads once your collections validate.

### Example field mapping

| Chroma Cloud | Weaviate |
| --- | --- |
| ID, such as faq-42 | UUID plus sourceId |
| Document text | body property |
| topic metadata, such as billing | topic property |
| Embedding | Object vector |

## Migrate with to-weaviate

Use the migration tool maintained by the Weaviate team to move your Chroma collections, including vectors, text, and metadata. Review a migration plan, resume interrupted copies, and verify the results against your source.

Start by configuring your Chroma and Weaviate connections using the Chroma guide. Follow its instructions for pausing source writes during the migration.

- [Read the Chroma guide](https://github.com/weaviate/to-weaviate/blob/main/docs/sources/chroma.md)
- [View on GitHub](https://github.com/weaviate/to-weaviate)
- [View on PyPI](https://pypi.org/project/to-weaviate/)

### Install the migration tool

```bash
pip install to-weaviate
```

1. Inspect your Chroma collection and review the generated migration plan.
2. Check the plan, then copy your records to Weaviate.
3. Pause source writes, sync changes, and verify the copy before switching your application.

## Chroma Cloud deadlines

See [Chroma's wind-down notice](https://www.trychroma.com/cloud-wind-down) for the official dates.

### Before December 7, 2026

Redirect writes and verify that new and updated documents reach Weaviate. Chroma Cloud becomes read-only on December 7.

### Before December 22, 2026

Finish exports, validate your collections, and switch application reads before Chroma Cloud stops serving queries.

## Why teams move to Weaviate

### Hybrid search built in.

Combine vector and keyword search in one query.

### Multi-tenancy from day one.

Keep each customer's data separate as you grow.

### Open source or fully managed.

Run it yourself under BSD-3, or let us run it on Weaviate Cloud.

### Ready for production.

Replication and role-based access control, with Weaviate Cloud audited for SOC 2 Type II.

### Ask your data questions.

The Query Agent turns plain-language questions into database operations, with 1,000 free requests a month.

### Free to start.

A free Weaviate Cloud database with 100,000 objects and no credit card.

## Teams building with Weaviate

### Loti

> I need peace of mind. When we are scaling our systems, I don't want to worry about scalability and uptime of our vector database as it serves as a core foundation supporting all our services.

Dr. Hirak Chhatbar, Co-Founder and CTO. Loti reports 200+ hours saved on database maintenance and 9B vectors in production. [Read the Loti case study](https://weaviate.io/case-studies/loti).

### DocsBot

> Weaviate stood out as it’s clearly built for production use, not just testing. It was the only solution with an efficient tenant system that scaled to our workload of tens of thousands of segmented indexes.

Aaron Edwards, Founder. DocsBot reports 50K+ tenants stored in a single cluster and 6.1M+ customer questions answered. [Read the DocsBot case study](https://weaviate.io/case-studies/docsbot).

## Migration FAQ

### Do I have to re-embed my data?

Not if you keep the same embedding model. You can bring your existing vectors into Weaviate.

### Will my Chroma code work with Weaviate?

No. Weaviate has its own client libraries, including Python, TypeScript, Go and Java, so your query code will change.

### Does this affect open-source Chroma?

No. Chroma's notice only covers Chroma Cloud. If you self-host Chroma and want to move, the same steps apply.

### Can someone help us move?

Yes. Tell us about your migration and our team will help you plan it.

## Talk to our team about your migration

Planning a larger migration? Talk to our team about your workloads, requirements, and timeline.

[Contact the migration team](https://weaviate.io/migrate-from-chroma#contact-team).
