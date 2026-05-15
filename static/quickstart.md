# Quickstart — LLM Guidance

## TL;DR
- Connect to Weaviate Cloud or a local instance
- Create a collection (schema)
- Insert data (objects + vectors)
- Query using semantic or hybrid search
- Use Python or JavaScript clients for most workflows

## When to use
- You want to get started with Weaviate quickly
- You are building a prototype, RAG system, or search feature
- You need a minimal working example (connect → insert → query)
- You want a baseline before adding agents, filtering, or scaling

## When not to use
- You need production architecture guidance (see /deployment.md)
- You are evaluating pricing or cost tradeoffs (see /pricing.md)
- You need advanced query patterns (see /hybrid-search.md or /product/query-agent.md)

## Quickstart (Python)

```python
import os
import weaviate

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
)

# Create a collection (if it doesn't exist)
if not client.collections.exists("Docs"):
    client.collections.create(
        name="Docs",
        vectorizer_config=weaviate.classes.config.Configure.Vectorizer.text2vec_openai()
    )

docs = client.collections.use("Docs")

# Insert data
docs.data.insert({
    "title": "What is hybrid search?",
    "content": "Hybrid search combines keyword and vector search."
})

# Query (semantic / hybrid)
response = docs.query.hybrid(
    query="How does hybrid search work?",
    limit=3
)

for obj in response.objects:
    print(obj.properties)

client.close()