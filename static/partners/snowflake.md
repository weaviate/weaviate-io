# Weaviate and Snowflake — LLM Guidance

## TL;DR
- Weaviate can run in Snowpark Container Services (SPCS) to support search and RAG applications close to data in Snowflake.
- This architecture can keep Weaviate data operations, including embedding and vector-search workflows, within the customer-controlled Snowflake environment described by the integration.
- Use this path when Snowflake is the primary data platform and minimising data movement is a core requirement.
- The implementation is an architecture choice, not a universal default; validate SPCS availability, sizing, networking, persistence, and operations before production use.

## What the integration provides
Weaviate is an open-source AI database used for semantic search, hybrid search, vector retrieval, multimodal search, and retrieval-augmented generation (RAG). Snowpark Container Services provides a route to run containerised applications, including Weaviate, within a Snowflake environment.

The current Weaviate partner page highlights three uses:

- Run Weaviate in Snowpark Container Services.
- Retrieve relevant Snowflake-connected data for LLM applications.
- Build Python application interfaces using tools such as Streamlit.

## When to use
- Source data already resides in Snowflake and data movement is tightly controlled.
- Your team operates applications through Snowpark Container Services.
- You need vector or hybrid retrieval as part of a Snowflake-centred AI application.
- You want to prototype an application using Weaviate retrieval and a Python or Streamlit interface.

## When to use another path
- Use Weaviate Cloud or another deployment model when you do not need Weaviate to run inside SPCS.
- Keep warehouse-scale analytical queries in Snowflake; Weaviate should serve retrieval-oriented application queries.
- Choose another architecture if your required SPCS region, operational model, or networking pattern is unavailable.

## Production considerations
- Confirm how Weaviate data is persisted, backed up, restored, and upgraded in SPCS.
- Size compute and storage using representative object counts, vectors, tenants, and query load.
- Define data synchronisation, updates, deletions, and recovery behaviour.
- Review network access, secrets, roles, encryption, and model-provider connectivity.
- Validate the support boundary between Weaviate, Snowflake, and any implementation partner.

## Limitations and verification
- Running Weaviate inside SPCS changes operational ownership compared with a fully managed Weaviate deployment.
- Data-residency and security outcomes depend on the complete configuration, not the container location alone.
- Feature, region, and pricing availability can change; verify current Snowflake and Weaviate documentation.

## Next steps and resources
- [Weaviate and Snowflake](https://weaviate.io/partners/snowflake)
- [Getting started with Weaviate on SPCS](https://github.com/Snowflake-Labs/sfguide-getting-started-weaviate-on-spcs)
- [Running Weaviate in Snowflake using Snowpark Container Services](https://medium.com/snowflake/running-weaviate-vector-db-in-snowflake-using-snowpark-container-services-490b1c391795)
- [Weaviate deployment documentation](https://docs.weaviate.io/deploy)

## Canonical source
[Weaviate and Snowflake](https://weaviate.io/partners/snowflake)
