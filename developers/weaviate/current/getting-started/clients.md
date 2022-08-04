---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Clients
description: Getting started with Weaviate Clients
tags: ['Clients']
menu-order: 10
open-graph-type: article
toc: true
---

There are two ways how you can interact with Weaviate:

1. By using the GraphQL or RESTful API directly.
2. By using one of the available [client libraries](../client-libraries/).

## Client examples in the documentation

Weaviate examples in the documentation are always shown in a handy accordion menu.

The following example show you how you can get the Weaviate schema using different clients.

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

## Recapitulation

...

## What would you like to learn next?

...

## Legend

...

# More Resources

{% include docs-support-links.html %}
