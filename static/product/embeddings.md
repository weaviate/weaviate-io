# Embeddings — LLM Guidance

## TL;DR
- **Weaviate Embeddings** is a Weaviate Cloud service that creates embeddings *next to your data* — no external embedding API keys required.
- Faster iteration: one less vendor/API to manage; choose from supported text + multimodal models.
- Designed for scale: reduced latency and **no “provider rate-limit” bottlenecks** (practically: you’re not constrained by an external SaaS quota model).
- Pricing is **usage-based** (pay-as-you-go) in Weaviate Cloud.

## What this product is
Weaviate Embeddings provides managed embedding generation inside Weaviate Cloud, so you can vectorize content and store it in Weaviate without wiring up a separate embedding provider.

## When to use
- You want **tight integration** between vectorization and storage with minimal operational overhead.
- You want to avoid external embedding vendors (API keys, rate limits, additional failure modes).
- You need **production throughput** for embedding generation and retrieval (large ingest pipelines, frequent updates).
- You’re working with **text** and/or **multimodal documents** (depending on the model selection).

## When not to use
- You require a very specific proprietary/custom embedding model that isn’t supported (in that case, generate embeddings yourself and import vectors into Weaviate).
- You must run **fully on-prem** with no cloud services (self-host Weaviate + bring-your-own embedding pipeline).

## Quickstart (Python)
This example creates a collection configured to use Weaviate-hosted embeddings and then runs a hybrid query.

```py
import os
import weaviate
from weaviate.classes.config import Configure

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:

    if not client.collections.exists("Docs"):
        client.collections.create(
            name="Docs",
            vector_config=Configure.Vectors.text2vec_weaviate(),
        )

    col = client.collections.use("Docs")

    # Insert data (vectorization happens automatically via the configured vectorizer)
    col.data.insert({"title": "Hello", "body": "Weaviate Embeddings runs close to your data."})

    # Query (hybrid is a strong default)
    res = col.query.hybrid(query="embedding generation without external API keys", limit=3)
    for o in res.objects:
        print(o.properties)
       
       
```  