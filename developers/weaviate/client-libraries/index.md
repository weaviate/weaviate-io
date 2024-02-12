---
title: References - Client Libraries
sidebar_position: 0
image: og/docs/client-libraries.jpg
# tags: ['client libraries', 'cli']
---


## Overview

You can interact with Weaviate by using the GraphQL or RESTful API directly, or with one of the available client libraries.

Currently, Weaviate supports:

- [Python](/developers/weaviate/client-libraries/python/index.md)
- [TypeScript/JavaScript](/developers/weaviate/client-libraries/typescript.mdx)
- [Go](/developers/weaviate/client-libraries/go.md)
- [Java](/developers/weaviate/client-libraries/java.md)

import ClientCapabilitiesOverview from '/_includes/client.capabilities.mdx'

<ClientCapabilitiesOverview />

### Community clients

There also exist [community clients](./community.md) that were prepared by our wonderful community members. These clients are not maintained by the core Weaviate team, but by the community members themselves. If you want to contribute to these clients, please contact the maintainers of the client.

:::note Don't see your preferred language?
If you want to contribute one or request for us to work on a particular client, please let us know on [the forum](https://forum.weaviate.io/)
:::

## Native vs GraphQL queries

When querying Weaviate you can choose to write your queries in GraphQL and send the raw GraphQL query to Weaviate, or you can write the query natively to the client language you are using.

For example, if you were using the Weaviate Python client:

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

## Client-specific functions

Additional to complete reflection of the RESTful and GraphQL API, the clients have some client-specific functions. These functions are documented on the client pages.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
