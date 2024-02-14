---
title: Embedded Weaviate
sidebar_position: 4
image: og/docs/installation.jpg
# tags: ['installation', 'embedded', 'client']
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Overview

Embedded Weaviate is a new deployment model, which allows you to start a Weaviate instance, straight in your application code using a Weaviate Client library.

:::caution Experimental
Embedded Weaviate is still in the **Experimental** phase.

Some of the APIs and parameters might change over time, as we refine and improve it.
:::

### How does it work?

With every Weaviate release we also publish executable Linux binaries (see the **Assets** section on the [releases](https://github.com/weaviate/weaviate/releases) page).

This allows launching the Weaviate database server from the client instantiation call, which makes the "installation" step invisible by pushing it to the background:

import EmbeddedInstantiation from '/_includes/code/embedded.instantiate.mdx';

<EmbeddedInstantiation />

## Embedded options

The Weaviate server spawned from the client can be configured via parameters passed at instantiation time, and via environment variables. All parameters are optional.

| Parameter | Type | Description | Default value |
| --------- | ---- | ----------- | ------------- |
| persistence_data_path | string | Directory where the files making up the database are stored. | When the `XDG_DATA_HOME` env variable is set, the default value is:<br/>`XDG_DATA_HOME/weaviate/`<br/><br/>Otherwise it is:<br/>`~/.local/share/weaviate` |
| binary_path | string | Directory where to download the binary. If deleted, the client will download the binary again. | When the `XDG_CACHE_HOME` env variable is set, the default value is:<br/>`XDG_CACHE_HOME/weaviate-embedded/`<br/><br/>Otherwise it is:<br/>`~/.cache/weaviate-embedded` |
| version | string | Version takes two types of input:<br/>- **version number** - for example `"1.19.6"` or `"latest"`<br/>- **full URL** pointing to a Linux AMD64 or ARM64 binary | Latest stable version |
| port | integer | Which port the Weaviate server will listen to. Useful when running multiple instances in parallel. | 8079 |
| hostname | string | Hostname/IP to bind to. | 127.0.0.1 |
| additional_env_vars | key: value | Useful to pass additional environment variables to the server, such as API keys. |

:::danger XDG Base Directory standard values
It is **not recommended** to modify the `XDG_DATA_HOME` and `XDG_CACHE_HOME` environment variables from the standard **XDG Base Directory** values, as that might affect many other (non-Weaviate related) applications and services running on the same server.
:::

:::tip Providing the Weaviate version as a URL
To find the **full URL** for `version`:
* head to [Weaviate releases](https://github.com/weaviate/weaviate/releases),
* find the **Assets** section for the required Weaviate version
* and copy the link to the `(name).tar.gz` file for the desired architecture.

For example, here is the URL of the Weaviate `1.19.6` `AMD64` binary: `https://github.com/weaviate/weaviate/releases/download/v1.19.6/weaviate-v1.19.6-linux-amd64.tar.gz`.
:::

### Default modules

The following modules are enabled by default:
- `generative-openai`
- `qna-openai`
- `ref2vec-centroid`
- `text2vec-cohere`
- `text2vec-huggingface`
- `text2vec-openai`

Additional modules can be enabled by setting additional environment variables as [laid out above](#embedded-options). For instance, to add a module called `backup-s3` to the set, you would pass it at instantiation as follows:

import EmbeddedInstantiationVerbose from '/_includes/code/embedded.instantiate.verbose.mdx';

<EmbeddedInstantiationVerbose />

## Starting Embedded Weaviate under the hood

Here's what happens behind the scenes when the client uses the embedded options in the instantiation call:
1. The client downloads a Weaviate release from GitHub and caches it
2. It then spawns a Weaviate process with a data directory configured to a specific location, and listening to the specified port (by default [8079](http://127.0.0.1:8079))
3. The server's STDOUT and STDERR are piped to the client
4. The client connects to this server process (e.g. to `http://127.0.0.1:8079`) and runs the client code
5. After running the code (when the application terminates), the client shuts down the Weaviate process
6. The data directory is preserved, so subsequent invocations have access to the data from all previous invocations, across all clients using the embedded option.

### Lifecycle

The embedded instance will stay alive for as long as the parent application is running.

When the application exits (e.g. due to an exception or by reaching the end of the script), Weaviate will shut down the embedded instance, but the data will persist.

:::note Embedded with Jupyter Notebooks
An Embedded instance will stay alive for as long as the Jupyter notebook is active.

This is really useful, as it will let you experiment and work with your Weaviate projects and examples.
:::

## Supported Environments

### Operating Systems

Embedded Weaviate is currently supported on:
- Linux
- macOS


## Language Clients

### Python

[Python client](../client-libraries/python/index.md) support was added in `v3.15.4` for Linux, and in `v3.21.0` for macOS.

### TypeScript

Due to use of server-side dependencies which are not available in the browser platform, the embedded TypeScript client has been split out into its own project. Therefore the original non-embedded TypeScript client can remain isomorphic.

The TypeScript embedded client simply extends the original TypeScript client, so once instantiated it can be used exactly the same way to interact with Weaviate. It can be installed with the following command:

```
npm install weaviate-ts-embedded
```

macOS support was added in `v1.2.0`.

GitHub repositories:
* [TypeScript embedded client](https://github.com/weaviate/typescript-embedded)
* [Original TypeScript client](https://github.com/weaviate/typescript-client)



import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
