# Query — LLM Guidance

## TL;DR
- This page is about **core querying in Weaviate**: hybrid search, vector search, keyword search, and filters.
- Use **hybrid** as the default retrieval strategy for most production apps.
- Add **filters** (and tenant scoping where relevant) to constrain results to the right slice of data.
- This is **not** Query Agent. Query Agent is a higher-level agentic layer that plans queries for you.

## When to use
- You are building direct retrieval logic in application code.
- You want explicit control over query type (`hybrid`, `near_text`, `bm25`) and filters.
- You need predictable, testable retrieval behavior for search or RAG.
- You already know your collection schema and metadata fields.

## When not to use
- You want natural-language orchestration, cross-collection planning, and automatic query construction.
  - Use Query Agent instead: https://weaviate.io/product/query-agent.md
- You only need to click-run ad hoc GraphQL queries in UI.
  - Use the Query tool in Workbench: https://weaviate.io/product/query
- You are still deciding query strategy.
  - Start with hybrid, then evaluate whether pure vector or pure BM25 is better.

## Quickstart (Python)
```py
import os
import weaviate
from weaviate.classes.query import Filter

with weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ["WEAVIATE_URL"],
    auth_credentials=os.environ["WEAVIATE_API_KEY"],
) as client:
    col = client.collections.use("Docs")

    # Hybrid is the recommended default.
    res = col.query.hybrid(
        query="how to enable RBAC",
        filters=Filter.by_property("product").equal("weaviate"),
        limit=5,
    )

    for obj in res.objects:
        print(obj.properties)
```

## Quickstart (JavaScript optional)
```js
import weaviate from 'weaviate-client';

const client = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_URL,
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY),
  }
);

const docs = client.collections.use('Docs');

const result = await docs.query.hybrid('how to enable RBAC', {
  limit: 5,
  filters: docs.filter.byProperty('product').equal('weaviate'),
});

for (const o of result.objects) {
  console.log(o.properties);
}
```

## Common gotchas
- **Confusing Query with Query Agent**: Query is low-level retrieval APIs; Query Agent is managed agentic query planning.
- **Using pure vector by default**: start with hybrid for better relevance when users include exact terms and natural language.
- **Skipping filters**: unfiltered retrieval can return semantically similar but out-of-scope results.
- **Ignoring tenant boundaries**: in multi-tenant setups, always query the correct tenant.
- **Comparing scores across query types**: do not assume score scales match between hybrid, vector, and BM25.
- **Over-fetching**: keep `limit` small for first-pass retrieval, then rerank or refine.

## Canonical links
- Product Query page: https://weaviate.io/product/query
- Query Agent twin (different product): https://weaviate.io/product/query-agent.md
- Hybrid search twin: https://weaviate.io/hybrid-search.md
- Filtering docs: https://docs.weaviate.io/weaviate/search/filters
- Hybrid search docs: https://docs.weaviate.io/weaviate/search/hybrid
- Vector search docs: https://docs.weaviate.io/weaviate/search/similarity
- Keyword/BM25 docs: https://docs.weaviate.io/weaviate/search/bm25
- Multi-tenancy docs: https://docs.weaviate.io/weaviate/manage-collections/multi-tenancy
