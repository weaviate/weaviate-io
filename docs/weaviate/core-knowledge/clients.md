---
title: Clients
sidebar_position: 4

# layout: layout-documentation
# solution: weaviate
# sub-menu: Core Knowledge
# description: Core Knowledge for the Weaviate Clients
# tags: ['Clients']
# open-graph-type: article
# toc: true
---

There are two ways how you can interact with Weaviate:

1. By using the GraphQL or RESTful API directly.
2. By using one of the available [client libraries](../client-libraries/index.md).

<!-- TODO - I think this whole page should be merged into client-libraries, or move to Guides: Essential (JPH). This is not really about any theory or concepts, it's more about how to use a client library -->
## Client examples in the documentation

Weaviate examples in the documentation are always shown in a handy accordion menu.

The following example shows you how to get the Weaviate schema using different clients.

import CodeSchemaDump from '/_includes/code/schema.dump.mdx';

<CodeSchemaDump />

## Native vs GraphQL queries

When querying Weaviate you can choose to write your queries in GraphQL and send the raw GraphQL query to Weaviate or you can write the query natively to the client language you are using.

For example:

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

result = client.query.get("Article", ["title", "url", "wordCount"]).do()

print(result)
```

Yields the same result as:

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

query = """
{
  Get {
    Article {
      title
      url
      wordCount
    }
  }
}
"""

result = client.query.raw(query)

print(result)
```

## Installation

Clients have their [own installation pages](/docs/weaviate/client-libraries/index.md) per language.

Currently Weaviate supports:

- [Python](/docs/weaviate/client-libraries/python.md)
- [Javascript](/docs/weaviate/client-libraries/javascript.md)
- [Go](/docs/weaviate/client-libraries/go.md)
- [Java](/docs/weaviate/client-libraries/java.md)
- Do you want to contribute one? Please let us know on our [Slack]({{ site.slack_signup_url }})

## Recap

Weaviate clients are an easy way to connect with your Weaviate instance or cluster through a language of choice. Some users prefer to use a client and others prefer to connect directly with the APIs directly. Both are possible.

## What would you like to learn next?

- [Show me how to query](../getting-started/query.md)
- [Show me how the schema works](/docs/weaviate/getting-started/schema.md)
- [One more time the basics](./basics.md)

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
