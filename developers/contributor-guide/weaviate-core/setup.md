---
title: Weaviate development setup
sidebar_position: 4
image: og/contributor-guide/weaviate-core.jpg
# tags: ['contributor-guide']
---
This page describes how to run Weaviate from source (git checkout / tarball) locally. Prerequisites:
* [Go](https://go.dev/dl/) v1.20 or higher
* (optional) [Docker](https://docs.docker.com/desktop/)

## Running from source

The fastest way to run Weaviate from source is to issue the command below:

```bash
tools/dev/run_dev_server.sh <configuration>
```

Replace `<configuration>` with _one_ of the server configuration values in [`/tools/dev/run_dev_server.sh`](https://github.com/weaviate/weaviate/blob/master/tools/dev/run_dev_server.sh#L26), e.g. `debug`, `local-development` (the default), `local-transformers` etc. For example, to run the server locally with the OpenAI module:

```bash
tools/dev/run_dev_server.sh local-openai
```

If you need a more complex configuration (e.g. combining two or more modules), you can clone an entry (`local-all-openai-cohere-palm` is a good start) and add the required [environment variables](../../weaviate/config-refs/env-vars.md).


## Running with Docker

To run with Docker, start up the Weaviate container and the container(s) for any additional services with

```bash
tools/dev/restart_dev_environment.sh [additional_services]
```

then run the development server as described in the section above.

For example, the setup below uses Docker Compose to spin up Prometheus and Grafana instances. Those are pre-configured to scrape metrics from Weaviate. Using this setup, you can:
- access Weaviate on port `8080`
- access Grafana on port `3000` (Login: `weaviate`/`weaviate`)
- if necessary for debugging -  access prometheus directly on port `9090`

```bash
tools/dev/restart_dev_environment.sh --prometheus && tools/dev/run_dev_server.sh local-no-modules
```

:::info
This setup is only meant for contributors, as it requires a local Go runtime. If a user is looking for a Prometheus-enabled example, you can point them either to the [documentation page](/developers/weaviate/configuration/monitoring.md) or straight to the [Weaviate examples repo](https://github.com/weaviate/weaviate-examples/tree/main/monitoring-prometheus-grafana).
:::

Below are more examples of running Weaviate with Docker.

### Transformers t2v only

```bash
tools/dev/restart_dev_environment.sh --transformers && ./tools/dev/run_dev_server.sh local-transformers
```

### Contextionary t2v & Transformers QnA

```bash
tools/dev/restart_dev_environment.sh --qna && ./tools/dev/run_dev_server.sh local-qna
```

The above commands are subject to change as we add more modules and require specific combinations for local testing. You can always inspect [restart_dev_environment.sh](https://github.com/weaviate/weaviate/blob/master/tools/dev/restart_dev_environment.sh) and [run_dev_server.sh](https://github.com/weaviate/weaviate/blob/master/tools/dev/run_dev_server.sh) to see which options are available. The first option without any arguments is always guaranteed to work.

To make queries from a web interface, use the [WCS console](https://console.weaviate.cloud) to connect to `localhost:8080`.


## More Resources

import ContributorGuideMoreResources from '/_includes/more-resources-contributor-guide.md';

<ContributorGuideMoreResources />
