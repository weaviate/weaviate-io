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

For example, to add the `backup-s3` module, instantiate your client like this:

import EmbeddedInstantiationModule from '/_includes/code/embedded.instantiate.module.mdx';

<EmbeddedInstantiationModule />

## Binary sources

Weaviate core releases include executable Linux binaries. When you instantiate a client with Embedded Weaviate, the client uses the binary packages to create a temporary Weaviate instance that persists while your client code runs.

### File list
For a list of the files that are included in a release, see the Assets section for that release on [GitHub](https://github.com/weaviate/weaviate/releases).

### File URL
To get the URL for a particular binary archive file, follow these steps:
1. Find the Weaviate core release you want on the [Release Notes](/developers/weaviate/release-notes.mdx#weaviate-core) page.
1. Click to the release notes for that version.
1. The Assets section includes `linux-amd64` and `linux-arm64` binaries in `tar.gz` format.
1. Copy the link to the full URL of the `tar.gz` file for your platform.

For example, the URL for the Weaviate `1.19.6` `AMD64` binary is:

`https://github.com/weaviate/weaviate/releases/download/v1.19.6/weaviate-v1.19.6-linux-amd64.tar.gz`.

## Functional overview

Weaviate core server usually runs as a stand-alone server that clients connect to in order to access data. An Embedded Weaviate instance is a process that runs as part of a client script or application. The instance can access a persistent datastore, but it exists when the client exists. 

When your client runs, it checks for a stored Weaviate binary. If it finds one, the client uses that binary to create an Embedded Weaviate instance. If not, teh client downloads the binary.

When the embedded instance starts, it checks for a data store. Other clients can also use the same data store. 

The embedded server pipes `STDOUT` and `STDERR` to the client. To redirect `STDERR` in a command terminal, run your script like this:

```bash
python3 your_embedded_client_script.py 2>/dev/null 
```

When you exit the client script or application, the Embedded Weaviate instance also exits: 

- Scripts: The Embedded Weaviate instance exists when the script exits.
- Applications: The Embedded Weaviate instance exists when the application exits.
- Jupyter Notebooks: The Embedded Weaviate instance exists when the Jupyter notebook is no longer active.

## Supported Environments

Embedded Weaviate is supported on:
- Linux
- macOS

## Client languages

Embedded Weaviate is supported for Python and Typescript clients.

### Python clients

[Python](../client-libraries/python/index.md) v3 client support is new in `v3.15.4` for Linux and `v3.21.0` for macOS. The Python client v4 requires server version v1.23.7 or higher. 

### TypeScript clients

The embedded TypeScript client is no longer a part of the standard Typescript client. 

The embedded client has additional dependencies that are not included in the standard client. However, the embedded client extends the original TypeScript client. After you instantiate Embedded Weaviate instance, the embedded TypeScript client works the same way as the standard client.

To install the embedded TypeScript client, run this command:

```
npm install weaviate-ts-embedded
```

The TypeScript clients are in these GitHub repositories:
- [Embedded TypeScript client](https://github.com/weaviate/typescript-embedded)
- [Standard TypeScript client](https://github.com/weaviate/typescript-client)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
