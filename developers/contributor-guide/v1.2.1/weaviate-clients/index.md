---
layout: layout-documentation
solution: contributor-guide
sub-menu: Weaviate Clients
title: Weaviate Clients
intro: An overview of the Weaviate Client development
description: An overview of the Weaviate Client development
tags: ['contributor-guide', 'clients']
menu-order: 0
open-graph-type: article
og-img: documentation.jpg
toc: true
redirect_from:
  - /documentation/contributor-guide/current/weaviate-clients/index.html
  - /documentation/contributor-guide/current/weaviate-clients/
---

# Contributor guidelines 

There are currently three clients developed for Weaviate's API: [Python](../../../weaviate/current/client-libraries/python.html), [Go](../../../weaviate/current/client-libraries/go.html) and [JavaScript](../../../weaviate/current/client-libraries/javascript.html). These clients, and all future clients are and will be developed according to the following guidelines:

1. Every client *must* reflect all features of the RESTful API one-to-one.
2. Every client *must* reflect all functions of GraphQL API (1-1 where possible).
3. Clients *can* have client-specific, extra or unique features:
   1. These features on top of the 1-1 RESTful and GraphQL functionalities must be defined through a user story, which will also be reflected in the documentation.
   2. These features can be solved in a client's native way (follow the current design of the client for consistency)
   3. Preferably the functionalities are consistent across clients.
4. Keep the design (nomenclature and builder structures) as consistent as possible, with the nomenclature of the RESTful and GraphQL API functions as base, then adopting names from similar functions in a client in another language.

# Overview of current clients and features

| Feature | Python client | JavaScript client | Go client |
| --- | --- | --- |
| RESTful API endpoints | **V** | X | X |
| GraphQL Get | **V** | **V** | **V** |
| GraphQL Aggregate | **V** | **V** | **V** |
| GraphQL Explore | **V** | **V** | **V** |
| Authentication | **V** | **V** | **V** |
| Uploading a full JSON schema | **V** | X | X |
| Deleting a full JSON schema | **V** | X | X |
| Check schema | **V** | X | X |
