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
redirect_from:
  - /documentation/contributor-guide/current/build-run-test/setup.html
  - /developers/contributor-guide/current/build-run-test/setup.html
---

## Prerequisities

1. Go
2. Docker
3. Docker compose

In order to run local dev env issue:

Start up all dependencies (e.g. modules inference containers) and compile/run
Weaviate locally. This script assumes a contextionary-based setup:

### Default setup (contextionary module)
```bash
tools/dev/restart_dev_environment.sh && ./tools/dev/run_dev_server.sh
```

You can also run with different modules, e.g.:

### Transformers t2v only
```bash
tools/dev/restart_dev_environment.sh --transformers && ./tools/dev/run_dev_server.sh local-transformers
```

### Contextionary t2v & Transformers QnA
```bash
tools/dev/restart_dev_environment.sh --qna && ./tools/dev/run_dev_server.sh local-qna
```

The above commands are subject to change as we add more modules and require
specific combinations for local testing. You can always inspect the two files
to see which options are contained. The first option without any arguments is
always guarateed to work.


To make query search use this link for console:
[https://console.semi.technology/](https://console.semi.technology/).


## More Resources

{% include docs-support-links.html %}
