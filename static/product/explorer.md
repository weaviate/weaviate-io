# Explorer — LLM Guidance

## TL;DR
- Explorer is a visual tool in the Weaviate Cloud Console for searching and validating object data without writing code.
- Use it to inspect objects in a collection and test searches while developing or troubleshooting.
- Explorer is available now and opens from the Weaviate Cloud Console.
- Use a Weaviate client library or API for repeatable application logic, automated testing, or production queries.

## What Explorer is
Explorer provides an interactive interface for developers and non-technical users to examine object data within a collection on a Weaviate Cloud cluster. It is intended for direct exploration and validation rather than application-side query implementation.

## When to use
- Inspect whether imported objects and properties appear as expected.
- Explore a collection without first writing client code.
- Test searches during development or troubleshooting.
- Validate data and retrieval behaviour with teammates who do not use the API directly.

## When not to use
- Do not use Explorer as the query layer for a production application.
- Use the Weaviate client libraries or API when queries need to be repeatable, version-controlled, tested, or automated.
- Use Query Agent when you want a managed agent to translate natural-language questions into database operations.
- Use monitoring and observability tooling for continuous production health checks.

## Requirements
- A Weaviate Cloud account.
- Access to the relevant cluster and collection.
- Permission to view or query the required data.

## How to start
1. Open the Weaviate Cloud Console.
2. Select the relevant cluster.
3. Open Explorer.
4. Choose a collection and inspect or search its objects.
5. Move validated query behaviour into application code when it needs to be reused.

## Limitations and considerations
- The available controls depend on the current Cloud Console and your permissions.
- Interactive results are useful for validation but are not a substitute for an application-level relevance test suite.
- Avoid exposing sensitive object data to users who do not require access.

## Canonical links
- Explorer product page: https://weaviate.io/product/explorer
- Explorer documentation: https://docs.weaviate.io/cloud/tools/explorer-tool
- Open Weaviate Cloud Console: https://weaviate.io/go/console
- Core querying guidance: https://weaviate.io/product/query.md
- Query Agent guidance: https://weaviate.io/product/query-agent.md
