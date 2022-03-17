---
layout: layout-documentation
solution: contributor-guide
sub-menu: Weaviate Core
solution-order: 1
title: Weaviate development setup
intro: This page contains how to set up your local environment for development on Weaviate.
description: How to setup for development on Weaviate
tags: ['contributor-guide', 'item']
menu-order: 4
open-graph-type: article
og-img: documentation.jpg
toc: false
---

## Prerequisities

1. Go
2. Docker
3. Docker compose

In order to run local dev env issue:

for Elastic search based:
```bash
tools/dev/restart_dev_environment.sh && ./tools/dev/run_dev_server.sh
```

for Standalone:
```bash
tools/dev/restart_dev_environment.sh --customdb && tools/dev/run_dev_server.sh local-customdb
```

To make query search use this link for console:
[https://console.semi.technology/](https://console.semi.technology/).


## More Resources

{% include docs-support-links.html %}
