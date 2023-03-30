---
title: Embedding Weaviate (experimental)
sidebar_position: 4
# image: TODO
# tags: ['installation', 'embedded', 'client']
## Overview

Embedded Weaviate is a new deployment model, which allows you to start a Weaviate instance, straight in your application code using a Weaviate Client library.

:::warning Experimental phase
Embedded Weaviate is still in the **Experimental** phase.

Some of the APIs and parameters might change over time, as we work towards a perfect implementation.
:::

### How is this possible?

With every Weaviate [release](https://github.com/weaviate/weaviate/releases) we also publish a single-executalbe Linux binary ([see assets](https://github.com/weaviate/weaviate/releases)).

This allows launching the Weaviate database server from the client instantiation call, which makes the "installation" step transparent in the background:

import EmbeddedInstantiation from '/_includes/code/embedded.instantiate.mdx';

<EmbeddedInstantiation />

## Embedded options

The Weaviate server spwaned from the client can be configured via parameters passed to the at instantiation time, and via environment variables. All parameters are optional.

| Parameter | Type | Description | Default value | Environment variable |
| --------- | ---- | ----------- | ------------- | ------------------- |
| persistence_data_path | string | Directory where the files making up the database are stored | `/.local/share/weaviate` | `XDG_DATA_HOME` |
| binary_path | string | Where the binary is downloaded. If deleted, the client will download the binary again. | `~/.cache/weaviate-embedded` | `XDG_CACHE_HOME` |
| version | string | Full URL pointing to the Linux AMD64 binary | [Varies](https://github.com/weaviate/weaviate/releases) | |
| port | integer | Which port the Weaviate server will listen to. Useful when running multiple instances in parallel. | 6666 | |
| hostname | string | Hostname/IP to bind to. | 127.0.0.1 | |
| cluster_hostname | string | The label for the cluster hostname | "embedded" | CLUSTER_HOSTNAME |
| additional_env_vars | key = value | Useful to pass additional environment variables to the server, such as API keys. | |

## Starting Embedded Weaviate under the hood

Here's what happens behind the scenes when the client uses the embedded options in the instantiation call:
1. The client downloads a Weaviate release from GitHub and caches it
2. It then spawns a Weaviate process with a data directory configured to a specific location, and listening to the specified port (by default 6666)
3. The server's STDOUT and STDERR are piped to the client
4. The client connect to this server process (e.g. to `http://127.0.0.1:6666`) and runs the client code
5. After running the code (when the application reaches the end), the client shuts down the Weaviate process
6. The data directory is preserved, so subsequent invocations have access to the data from all previous invocations, across all clients using the embedded option.

## Supported Environments

### Operating Systems

Embedded Weaviate is currently supported on Linux only.

We are actively working to provide support for MacOS. We hope to share an update in the near future.

### Language Clients

Embedded Weaviate is supported in the following language clients:

* [Python client](../client-libraries/python.md) – version `3.15.4` or newer
<!-- * [JavaScript client](../client-libraries/javascript.md) – version `v` or newer -->

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
