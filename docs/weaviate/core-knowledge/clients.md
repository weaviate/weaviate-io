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
2. By using one of the available [client libraries](../client-libraries/).

## Client examples in the documentation

Weaviate examples in the documentation are always shown in a handy accordion menu.

The following example shows you how to get the Weaviate schema using different clients.

{% include code/1.x/schema.dump.html %}

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

Clients have their [own installation pages](../client-libraries/) per language.

Currently Weaviate supports:

- [Python](../client-libraries/python.html)
- [Javascript](../client-libraries/javascript.html)
- [Go](../client-libraries/go.html)
- [Java](../client-libraries/java.html)
- Do you want to contribute one? Please let us know on our [Slack]({{ site.slack_signup_url }})

## Recapitulation

Weaviate clients are an easy way to connect with your Weaviate instance or cluster through a language of choice. Some users prefer to use a client and others prefer to connect directly with the APIs directly. Both are possible.

## What would you like to learn next?

- [Show me how to query](../getting-started/query.html)
- [Show me how the schema works](../getting-started/schema.html)
- [One more time the basics](./basics.html)

# More Resources

{% include docs-support-links.html %}
