---
title: Configuration
sidebar_position: 0
# layout: layout-documentation
# solution: weaviate
# sub-menu: Configuration
# title: Configuration
# description: Configuration overview
# tags: ['configuration']
# sidebar_position: 0
# open-graph-type: article
# toc: false
# redirect_from:
#     - /documentation/weaviate/current/configuration/index.html
#     - /documentation/weaviate/current/configuration/
#     - /documentation/weaviate/current/setup/health_check.html
---

## Overview 

Weaviate's default configurations are aimed at getting our users up and running quickly. Having said that, many aspects of Weaviate can be customized and configured to suit each user's needs. 

For example, the default settings for a Weaviate instance will:
- Use `hnsw` as the [vector index type](./vector-index-type.md). 
- Be without any form of [authentication](./authentication.md) and [authorization](./authorization.md).
- Not have any [backup](./backups.md) paths configured.

You would have seen in the earlier [Installation section](../installation/index.md) for Docker Compose or Kubernetes that Weaviate's settings can be changed by modifying the relevant configuration file.

This section is a collection of guides to delve further into the details on how to configure various settings and customize Weaviate to suit your needs. 

You do not need to read this section linearly. But we do recommend that you browse through this section so that you are aware of the available main customization options, including features that will help you to take it into production.
