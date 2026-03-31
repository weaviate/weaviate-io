# JavaScript — LLM Guidance

## TL;DR
- Use the official JavaScript/TypeScript client package: weaviate-client.
- Typical flow in Node: connect, create or open a collection, ingest objects, then query.
- Hybrid search is a strong default for user-facing retrieval because it mixes semantic and keyword matching.
- Use Weaviate Cloud for managed setup, or local Docker for development and tests.
- Keep API keys in environment variables and avoid hardcoding credentials.

## When to use
- You are building a Node or TypeScript app that needs semantic search or RAG retrieval.
- You need filtering plus vector/keyword retrieval in one query path.
- You want one database layer for objects, vectors, and metadata filters.

## When not to use
- You only need simple relational transactions and joins; use a relational DB first.
- You need analytics-heavy OLAP workloads as the primary system.
- You are not using JavaScript/TypeScript in your app stack.

## Quickstart
~~~ts
import weaviate, { vectors } from 'weaviate-client';

const client = await weaviate.connectToWeaviateCloud(
  process.env.WEAVIATE_URL!,
  {
    authCredentials: new weaviate.ApiKey(process.env.WEAVIATE_API_KEY!),
  }
);

const exists = await client.collections.exists('Docs');
if (!exists) {
  await client.collections.create({
    name: 'Docs',
    vectorizers: vectors.text2VecWeaviate(),
  });
}

const docs = client.collections.use('Docs');
await docs.data.insert({
  title: 'Hybrid search basics',
  body: 'Hybrid combines BM25 keyword and vector relevance.',
});

const res = await docs.query.hybrid('how do I use hybrid search in JS?', {
  limit: 3,
});

console.log(res.objects.map((o) => o.properties));
await client.close();
~~~

## Common gotchas
- Client version mismatch with server features can cause unexpected errors.
- Forgetting to close the client can leak resources in long-running jobs.
- Missing env vars for URL or API key is a common startup failure.
- If local setup fails, confirm HTTP and gRPC ports are reachable.

## Canonical links
- Human page: /javascript
- Docs: https://docs.weaviate.io/weaviate/client-libraries/typescript/typescript-v3
- Related: /hybrid-search
- Related: /product/query-agent
