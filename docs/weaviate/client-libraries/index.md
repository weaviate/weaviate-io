---
title: Client Libraries
sidebar_position: 0
# layout: layout-documentation
# solution: weaviate
# sub-menu: Client libraries
# title: Client libraries & CLI
# intro: Weaviate now has four client libraries available, for Python, JavaScript, Java and Go. Additionally, you can interact with Weaviate via a command line interface (CLI).
# description: An overview of client libraries and CLI.
# tags: ['client libraries', 'cli']
# sidebar_position: 0
# open-graph-type: article
# toc: false
# redirect_from:
#     - /docs/weaviate/v1.1.0/client-libraries/index.html
#     - /documentation/weaviate/current/client-libraries/index.html
#     - /documentation/weaviate/current/client-libraries/
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview
:::caution Migrated From:
- `Client libraries`
- `Index` adds info from `Core Knowledge/Clients`
:::

You can interact with Weaviate by using the GraphQL or RESTful API directly, or with one of the available client libraries.

Currently Weaviate supports:

- [Python](/docs/weaviate/client-libraries/python.md)
- [Javascript](/docs/weaviate/client-libraries/javascript.md)
- [Go](/docs/weaviate/client-libraries/go.md)
- [Java](/docs/weaviate/client-libraries/java.md)

:::note Don't see your preferred language?
If you want to contribute one or request for us to work on a particualar client, please let us know on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw)
:::

With these clients you can perform *all* RESTful and GraphQL requests. This means you can use any endpoint, and perform all GraphQL queries directly from your Python, JS, Java or Go scripts!

How to use these clients for RESTful API requests and GraphQL queries, code snippets are included in the code blocks on the dedicated [Restful API](../references/rest/index.md) and [GraphQL](../references/graphql/index.md) reference pages. The methods of the clients are designed to reflect the API functions 1-1, but are designed (structured and named) in the way native to the language.

## Native vs GraphQL queries

When querying Weaviate you can choose to write your queries in GraphQL and send the raw GraphQL query to Weaviate or you can write the query natively to the client language you are using.

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

Additional to complete reflection of the RESTful and GraphQL API, the clients have some client-specific functions. These functions are documented on the client pages ([Python](./python.md), [JavaScript](./javascript.md), [Java](./java.md) and [Go](./go.md)). An overview of features of the clients: 

| Feature  | Python client | JavaScript client | Java client | Go client | 
| --- | --- | --- | --- | --- |
| RESTful API endpoints | **V** | **V** | **V** | **V** |
| GraphQL Get | **V** | **V** | **V** | **V** |
| GraphQL Aggregate | **V** | **V** | **V** | **V** |
| GraphQL Explore | **V** | **V** | **V** | **V** |
| Uploading a full JSON schema | **V** | X | X | X |
| Deleting a full JSON schema | **V** | X | X | X |
| Check schema | **V** | X | X | X |

## Command Line Interface (CLI)
You can interact with Weaviate via a command line interface. Information about how to install and use can be found [here](./cli.md).

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
