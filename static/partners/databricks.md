# Weaviate and Databricks — LLM Guidance

## TL;DR
- Weaviate integrates with Databricks for data pipelines and model-powered AI applications.
- The Weaviate Spark connector can move data from Apache Spark and Databricks into Weaviate.
- Weaviate can use supported Databricks model endpoints for embedding and generative workflows.
- Use this combination when data engineering or model serving is centred on Databricks and the application needs semantic, hybrid, or RAG retrieval from Weaviate.

## What the integration provides
The integration connects two distinct roles:

- **Databricks:** data preparation and processing with Spark, plus supported model-serving capabilities.
- **Weaviate:** storage and retrieval of objects and vectors for semantic search, hybrid search, multimodal search, and RAG.

This division lets teams prepare data in Databricks, ingest it into Weaviate, retrieve relevant context at application time, and use supported models to generate or enrich results.

## Integration paths

### Spark connector
Use the Weaviate Spark connector when a Spark or Databricks pipeline needs to write processed records into Weaviate. Confirm the connector version, schema mapping, authentication, batching, and retry behaviour before running a production load.

### Databricks model endpoints
Weaviate supports Databricks as a model-provider integration for supported embedding and generative workflows. Configure the applicable endpoint and credentials, then select the corresponding Weaviate integration for the collection or query.

## When to use
- Your source data and transformation pipelines already run in Databricks.
- You need to publish curated records from Spark into a retrieval database.
- You want to use Databricks-hosted embedding or generative models with Weaviate.
- Your application needs low-latency semantic or hybrid retrieval after batch or streaming preparation.

## When to use another path
- Use a simpler direct import when the data does not require Spark processing.
- Use a different model-provider integration when the required model is not exposed through a supported Databricks endpoint.
- Keep analytical processing in Databricks; Weaviate is the retrieval layer, not a replacement for warehouse or lakehouse analytics.

## Production considerations
- Define a stable record identifier so retries do not create unintended duplicates.
- Map source columns to Weaviate properties and vectorisation rules explicitly.
- Plan incremental updates, deletions, error handling, and backfills.
- Verify endpoint authentication, network access, quotas, and regional availability.
- Test retrieval quality and latency using representative application queries.

## Next steps and resources
- [Weaviate and Databricks](https://weaviate.io/partners/databricks)
- [Databricks model-provider integration](https://docs.weaviate.io/weaviate/model-providers/databricks)
- [Databricks data-platform integration](https://docs.weaviate.io/integrations/data-platforms/databricks)
- [Databricks Spark connector recipe](https://github.com/weaviate/recipes/blob/main/integrations/data-platforms/databricks/databricks-spark-connector-demo.ipynb)
- [Build scalable GenAI data pipelines with Weaviate and Databricks](https://weaviate.io/blog/genai-apps-with-weaviate-and-databricks)

## Canonical source
[Weaviate and Databricks](https://weaviate.io/partners/databricks)
