---
title: Embedded Weaviate
sidebar_position: 4
image: og/docs/installation.jpg
# tags: ['installation', 'embedded', 'client']
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

:::caution Experimental
Embedded Weaviate is **experimental** software. APIs and parameters may change.

:::

Embedded Weaviate is a new deployment model that runs a Weaviate instance from your application code rather than from a stand-alone Weaviate server installation.

Embedded Weaviate creates a permanent datastore, but it does not install a permanent Weaviate instance. Even though the Embedded Weaviate instance disappears when your client exits, the data persists in the location set in your `persistence_data_path`.

## Start an Embedded Weaviate instance

import EmbeddedInstantiation from '/_includes/code/embedded.instantiate.mdx';

<EmbeddedInstantiation />

When you exit the client, the Embedded Weaviate instance also exits.

- Scripts. The Embedded Weaviate instance exists when the script finishes.
- Applications. The Embedded Weaviate instance exists when the application exits.
- Jupyter Notebooks. The Embedded Weaviate instance exists when the Jupyter notebook is no longer active.

The Python client v3 closes server connections automatically.  

## Configuration options

To configure Embedded Weaviate, set these variables in your instantiation code or pass them as parameters when you invoke your client. You can also pass them as system environment variables. All parameters are optional.

| Parameter | Type | Default | Description |
| :-- | :-- | :-- | :-- |
| `additional_env_vars` | string | None. | Pass additional environment variables, such as API keys, to the server. |
| `binary_path` | string | varies | Binary download directory. If the binary is not present, the client downloads the binary. <br/><br/> If `XDG_CACHE_HOME` is set, the default is: `XDG_CACHE_HOME/weaviate-embedded/`<br/><br/>If `XDG_CACHE_HOME` is not set, the default is: `~/.cache/weaviate-embedded` |
| `hostname` | string | 127.0.0.1 | Hostname or IP address  |
| `persistence_data_path` | string | varies | Data storage directory.<br/><br/> If `XDG_DATA_HOME` is set, the default is: `XDG_DATA_HOME/weaviate/`<br/><br/>If `XDG_DATA_HOME` is not set, the default is: `~/.local/share/weaviate` |
| `port` | integer | 8079 | The Weaviate server request port. |
| `version` | string | Latest stable | Specify the version with one of the following:<br/>-`"latest"`<br/>- The version number as a string: `"1.19.6"`<br/>- The URL of a Weaviate binary ([See below](/developers/weaviate/installation/embedded.md#file-url)) |

:::warning Do not modify `XDG_CACHE_HOME` or `XDG_DATA_HOME`
The `XDG_DATA_HOME` and `XDG_CACHE_HOME` environment variables are widely used system variable. If you modify them, you may break other applications.
:::

## Default modules

The following modules are enabled by default:
- `generative-openai`
- `qna-openai`
- `ref2vec-centroid`
- `text2vec-cohere`
- `text2vec-huggingface`
- `text2vec-openai`

To enabled additional modules, add them to your instantiation code. 

For example, to add the `backup-s3` module, instantiate the embedded client like this:

import EmbeddedInstantiationModule from '/_includes/code/embedded.instantiate.module.mdx';

<EmbeddedInstantiationModule />

## Binary sources

Weaviate core releases include executable Linux binaries. When you instantiate a connection with Embedded Weaviate, the client uses the binary packages to create a temporary Weaviate instance that persists while your client code runs.

### File list
For a list of files included in a release, see the Assets section for that release on [GitHub](https://github.com/weaviate/weaviate/releases).

### File URL
To get the URL for a particular binary, follow these steps:
1. Find the Weaviate core release you want on the [Release Notes](/developers/weaviate/release-notes.mdx#weaviate-core) page.
1. Click to the release notes for that version.
1. The Assets section includes `linux-and64` and `linux-arm64` binaries in `tar.gz` format.
1. Copy the link to the full URL of the `tar.gz` file for your platform.

For example, the URL for the Weaviate `1.19.6` `AMD64` binary is:

`https://github.com/weaviate/weaviate/releases/download/v1.19.6/weaviate-v1.19.6-linux-amd64.tar.gz`.

## Starting Embedded Weaviate under the hood

Here's what happens behind the scenes when the client uses the embedded options in the instantiation call:
1. The client downloads a Weaviate release from GitHub and caches it
2. It then spawns a Weaviate process with a data directory configured to a specific location, and listening to the specified port (by default 8079)
3. The server's STDOUT and STDERR are piped to the client
4. The client connects to this server process (e.g. to `http://127.0.0.1:8079`) and runs the client code
5. After running the code (when the application terminates), the client shuts down the Weaviate process
6. The data directory is preserved, so subsequent invocations have access to the data from all previous invocations, across all clients using the embedded option.


## Supported Environments

### Operating Systems

Embedded Weaviate is supported on:
- Linux
- macOS


## Language Clients

### Python

[Python client](../client-libraries/python/index.md) support is new in `v3.15.4` for Linux and `v3.21.0` for macOS.

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
