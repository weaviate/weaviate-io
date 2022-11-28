---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Configuration
description: Configuration overview
tags: ['configuration']
menu-order: 0
open-graph-type: article
toc: false
redirect_from:
    - /documentation/weaviate/current/configuration/index.html
    - /documentation/weaviate/current/configuration/
    - /documentation/weaviate/current/setup/health_check.html
---

When setting up a Weaviate instance, by default, it will be:
- With the [vector index type](./vector-index-type.html) `hnsw`. This will be configurable soon.
- Without any form of authentication and authorization. Check the pages about [authentication](./authentication.html) and [authorization](./authorization.html) how to enable this.

You may have seen in the [Installation section](../installation/index.html) for Docker Compose or Kubernetes that Weaviate's settings can be changed by modifying the relevant configuration file.

This section is a collection of guides to delve further into the details on how to configure various settings and customize Weaviate to suit your needs. 

You do not need to read this section linearly. But we do recommend that you browse through this section so that you are aware of the available main customization options, including features that will help you to take it into production.

For configuration of your data schema, check the [Tutorial](../tutorials/how-to-create-a-schema.html) or the [data schema reference page](../schema/schema-configuration.html).