---
layout: layout-documentation
solution: weaviate
sub-menu: Client libraries & CLI
title: Client libraries & CLI
intro: Weaviate now has three client libraries available, for Python, JavaScript and Go. Additionally, you can interact with Weaviate via a command line interface (CLI).
description: An overview of client libraries and CLI.
tags: ['client libraries', 'cli']
menu-order: 0
open-graph-type: article
og: /img/og/og-documentation/client-libraries-index.jpg
toc: false
redirect_from:
    - /documentation/weaviate/current/client-libraries/index.html
    - /documentation/weaviate/current/client-libraries/
---

# Client libraries
To interact with Weaviate's APIs from Python, JavaScript or Go codes, you can use client libraries. With these clients you can perform *all* RESTful and GraphQL requests. This means you can use any endpoint, and perform all GraphQL queries directly from your Python, JS or Go scripts!

How to use these clients for RESTful API requests and GraphQL queries, code snippets are included in the code blocks on the dedicated [Restful API](../restful-api-references/index.html) and [GraphQL](../graphql-references/index.html) reference pages. The methods of the clients are designed to reflect the API functions 1-1, but are designed (structured and named) in the way native to the language.

Additional to complete reflection of the RESTful and GraphQL API, the clients have some client-specific functions. These functions are documented on the client pages ([Python](./python.html), [JavaScript](./javascript.html) and [Go](./go.html)). An overview of features of the clients: 

| Feature  | Python client | JavaScript client | Go client | Java client | 
| --- | --- | --- | --- | --- |
| RESTful API endpoints | **V** | **V** | **V** | **V** |
| GraphQL Get | **V** | **V** | **V** | **V** |
| GraphQL Aggregate | **V** | **V** | **V** | **V** |
| GraphQL Explore | **V** | **V** | **V** | **V** |
| Uploading a full JSON schema | **V** | X | X | X |
| Deleting a full JSON schema | **V** | X | X | X |
| Check schema | **V** | X | X | X |

# Command Line Interface (CLI)
You can interact with Weaviate via a command line interface. Information about how to install and use can be found [here](./cli.html).