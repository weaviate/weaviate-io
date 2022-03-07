---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Configuration
description: Configuration overview
tags: ['configuration']
menu-order: 0
open-graph-type: article
og: /img/og/og-documentation/configuration-index.jpg
toc: false
redirect_from:
    - /documentation/weaviate/current/configuration/index.html
    - /documentation/weaviate/current/configuration/
    - /documentation/weaviate/current/setup/health_check.html
---

When setting up a Weaviate instance, by default, it will by default:
- With the [vector index type](./vector-index-type.html) `hnsw`. This will be configurable soon.
- Without any form of authentication and authorization. Check the pages about [authentication](./authentication.html) and [authorization](./authorization.html) how to enable this.

How to configure your docker-compose file, check the [Installation page](../getting-started/installation.html#docker-compose).

For configuration of your data schema, check the [Tutorial](../tutorials/how-to-create-a-schema.html) or the [data schema reference page](../data-schema/schema-configuration.html).
