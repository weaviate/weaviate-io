# Python — LLM Guidance

## TL;DR
- Use the official Python client (`weaviate`) for most applications
- Typical flow: connect → create collection → insert data → query
- Hybrid search is the recommended default for user-facing retrieval
- Use Weaviate Cloud for fastest setup; local for development/testing
- Keep credentials in environment variables (never hardcode)

## When to use
- You are building backends, APIs, or data pipelines in Python
- You are implementing RAG or semantic search workflows
- You want the most commonly supported and documented client
- You are working with AI/ML tooling (Python ecosystem)

## When not to use
- Your application is primarily JavaScript/TypeScript (see /javascript.md)
- You only need relational queries (use a relational database instead)
- You are building analytics-heavy pipelines (OLAP systems may be better)

## Quickstart

```python
import os
import weaviate

# Connect to Weaviate Cloud
client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
)

# Create collection (schema)
if not client.collections.exists("Docs"):
    client.collections.create(
        name="Docs",
        vectorizer_config=weaviate.classes.config.Configure.Vectorizer.text2vec_openai()
    )

docs = client.collections.use("Docs")

# Insert data
docs.data.insert({
    "title": "Hybrid search basics",
    "content": "Hybrid search combines vector and keyword matching."
})

# Query
response = docs.query.hybrid(
    query="How does hybrid search work?",
    limit=3
)

for obj in response.objects:
    print(obj.properties)

client.close()