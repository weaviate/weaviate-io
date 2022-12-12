---
title: References - Configuration
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

<!-- TODO: Remove explanatory header once layout review complete -->
:::caution NOTE:
This section is from Configuration in Weaviate Docs Classic. Additionally:
- Schema:Index + Schema:Configuration in Weaviate Docs Classic.
- Data types in Weaviate Docs Classic.
- Vector index plugins:Distance metrics in Weaviate Docs Classic.
:::

## Overview

When running Weaviate through [Docker Compose](../installation/docker-compose.md) or [Kubernetes](../installation/kubernetes.md), you can change Weaviate's configurations by modifying the relevant configuration file.

You can modify these options to configure Weaviate to suit your specific needs, such as to change the [vectorizer module](./modules.md), enable [backups](./backups.md) or control access through [authentication](./authentication.md) and [authorization](./authorization.md).

Use the documents in this section to see what options are available, and to learn how to configure various settings in Weaviate.

You do not need to read this section linearly. But we do recommend that you browse through this section so that you are aware of the available main customization options, including features that will help you to take it into production.
