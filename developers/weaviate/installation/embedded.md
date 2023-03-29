---  
title: Embedding Weaviate  
sidebar_position: 4
# image: TODO
# tags: ['installation', 'embedded', 'client']
---  
## Overview

Starting with `v1.18`, Weaviate is also [distributed](https://github.com/weaviate/weaviate/releases) as a single-executable Linux binary (MacOS to follow). This allows launching the Weaviate database server from the client instantiation call, which makes the "installation" step transparent in the background:

import EmbeddedInstantiation from '/_includes/code/embedded.instantiate.mdx';

<EmbeddedInstantiation />  

Here's what happens behind the scenes when the client uses the embedded options in the instantiation call:
1. The client downloads a Weaviate release from GitHub and caches it
2. It then spawns a Weaviate process with a data directory configured to a specific location, and listening to the specified port (by default 6666)
3. The server's STDOUT and STDERR are piped to the client
4. The client connect to this server process (e.g. to http://127.0.0.1:6666) and runs the client code
5. After running the code, the client shuts down the Weaviate process
6. The data directory is preserved, so subsequent invocations have access to the data from all previous invocations, across all clients using the embedded option.

## Embedded options

The Weaviate server spwaned from the client can be configured via parameters passed to the at instantiation time, and via environment variables. All parameters are optional.

| Parameter | Type | Description | Default value | Environment variable |
| --------- | ---- | ----------- | ------------- | ------------------- |
| persistence_data_path | string | Directory where the files making up the database are stored | `/.local/share/weaviate` | `XDG_DATA_HOME` |
| binary_path | string | Where the binary is downloaded. If deleted, the client will download the binary again. | `~/.cache/weaviate-embedded` | `XDG_CACHE_HOME` |
| version | string | Full URL pointing to the Linux AMD64 binary | [Varies](https://github.com/weaviate/weaviate/releases) | |
| port | integer | Which port the Weaviate server will listen to. Useful when running multiple instances in parallel. | 6666 | |
| hostname | string | Hostname/IP to bind to. | 127.0.0.1 | |
| cluster_hostname | string | | "embedded" | CLUSTER_HOSTNAME |
| additional_env_vars | key = value | Useful to pass additional environment variables to the server, such as API keys. | |

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
