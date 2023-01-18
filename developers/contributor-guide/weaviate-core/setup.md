---
title: Weaviate development setup
sidebar_position: 4
image: og/contributor-guide/weaviate-core.jpg
# tags: ['contributor-guide']
---

## Prerequisities

1. Go
2. Docker
3. Docker compose

In order to run local dev env issue:

Start up all dependencies (e.g. modules inference containers) and compile/run
Weaviate locally. This script assumes a contextionary-based setup:

### Without any modules
This is the simplest setup, it requires no Docker/Docker compose:

```bash
tools/dev/run_dev_server.sh local-no-modules
```

### Without any modules, but with Grafana & Prometheus
This setup is identical to the one above, but it uses Docker & Docker-compose to spin up Prometheus and Grafana instances. Those are pre-configured to scrape metrics from Weaviate. 

Using this setup, you can 
- access Weaviate on port `8080`
- access Grafana on port `3000` (Login: `weaviate`/`weaviate`)
- if necessary for debugging -  access prometheus directly on port `9090`

```bash
tools/dev/restart_dev_environment.sh --prometheus && tools/dev/run_dev_server.sh local-no-modules
```

*Note: You can also combine some of the below setups with the `--prometheus` flag on `tools/dev/restart_dev_environment.sh`*

*Note: This setup is only meant for contributors, as it requires a local go runtime. If a user is looking for a Prometheus-Enabled example, you can point them either to the [documentation page](/developers/weaviate/configuration/monitoring.md) or straight to the [Weaviate examples repo](https://github.com/weaviate/weaviate-examples/tree/main/monitoring-prometheus-grafana).*

### With contextionary module
*requires Docker & Docker Compose*

```bash
tools/dev/restart_dev_environment.sh && ./tools/dev/run_dev_server.sh
```

### Transformers t2v only
*requires Docker & Docker Compose*

```bash
tools/dev/restart_dev_environment.sh --transformers && ./tools/dev/run_dev_server.sh local-transformers
```

### Contextionary t2v & Transformers QnA
*requires Docker & Docker Compose*

```bash
tools/dev/restart_dev_environment.sh --qna && ./tools/dev/run_dev_server.sh local-qna
```

The above commands are subject to change as we add more modules and require
specific combinations for local testing. You can always inspect the two files
to see which options are contained. The first option without any arguments is
always guaranteed to work.


To make query search use this link for console:
[https://console.weaviate.io/](https://console.weaviate.io/).

## More Resources

import ContributorGuideMoreResources from '/_includes/more-resources-contributor-guide.md';

<ContributorGuideMoreResources />
