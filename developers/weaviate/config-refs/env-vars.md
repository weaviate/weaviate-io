---
title: Environment variables
sidebar_position: 1
image: og/docs/configuration.jpg
# tags: ['HNSW']
---

<!-- TODO - create OG image -->



## Overview

This page includes a comprehensive list of environment variables that can be used to configure Weaviate in a [Docker](../installation/docker-compose.md) or a [Kubernetes](../installation/kubernetes.md) deployment.

## List of environment variables

### General

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| <code>ENABLE<wbr />_MODULES</code> | Which modules to enable in the setup? | `string - comma-separated list` | `text2vec-openai,generative-openai` |
| <code>DEFAULT<wbr />_VECTORIZER<wbr />_MODULE</code> | Default vectorizer module - will be overridden by any class-level value defined in the schema | `string` | `text2vec-contextionary` |
| <code>AUTOSCHEMA<wbr />_ENABLED</code> | Whether to infer the schema where necessary with the autoschema (default: `true`) | `string - true/false` | `true` |
| <code>QUERY<wbr />_MAXIMUM<wbr />_RESULTS</code> | Sets the maximum total number of objects that can be retrieved. | `string - number` | `10000` |
| <code>QUERY<wbr />_DEFAULTS<wbr />_LIMIT</code> | Sets the default number of objects to be returned in a query. | `string - number` | `25` |
| `LIMIT_RESOURCES` | If `true`, Weaviate will automatically attempt to auto-detect and limit the amount of resources (memory & threads) it uses to (0.8 * total memory) and (number of cores-1). It will override any `GOMEMLIMIT` values, however it will respect `GOMAXPROCS` values. | `string - true/false` | `false` |
| <code>DISABLE<wbr />_LAZY<wbr />_LOAD<wbr />_SHARDS</code> | New in v1.23. When `false`, enable lazy shard loading to improve mean time to recovery in multi-tenant deployments. | `string` | `false` |
| `GOMEMLIMIT` | Set the memory limit for the Go runtime. This should match your available memory, such as 10-20% of your total memory for Weaviate. The Go runtime tries to make sure that long-lived and temporary memory allocations do not exceed this value by making the Gargabe Collector more aggressive as the memory usage approaches the limit. [Learn more about GOMEMLIMIT](/blog/gomemlimit-a-game-changer-for-high-memory-applications). | `string - memory limit in SI uints` | `4096MiB` |
| `GOMAXPROCS` | Set the maximum number of threads that can be executing simultaneously. If this value is set, it be respected by `LIMIT_RESOURCES`. | `string - number` | `NUMBER_OF_CPU_CORES` |
| `GODEBUG` | Controls debugging variables within the runtime. [See official Go docs](https://pkg.go.dev/runtime). | `string - comma-separated list of name=val pairs` | `gctrace=1` |
| `LOG_LEVEL` | Sets the Weaviate logging level. <br/><br/> Default: `info`. General operational entries. <br/><br/> `panic`: Log only panic entries. (new in `v1.24`) <br/>`fatal`: Log only fatal entries. (new in `v1.24`)  <br/>`error`: Log only error entries. (new in `v1.24`)  <br/>`warning`: Log only  warning entries. (new in `v1.24`) <br/> `info`. General operational entries.<br/>`debug`: Very verbose logging. <br/>`trace`: Even finer-grained informational events. | `string` | |
| `LOG_FORMAT` | Set the Weaviate logging format <br/><br/>Default: Outputs log data to json. e.g.: `{"action":"startup","level":"debug","msg":"finished initializing modules","time":"2023-04-12T05:07:43Z"}` <br/>`text`: Outputs log data to a string. e.g. `time="2023-04-12T04:54:23Z" level=debug msg="finished initializing modules" action=startup` | `string` |  |
| `ORIGIN` | Set the http(s) origin for Weaviate | `string - HTTP origin` | `https://my-weaviate-deployment.com` |
| <code>PERSISTENCE<wbr />_DATA<wbr />_PATH</code> | Where should Weaviate Standalone store its data? | `string - file path` | `/var/lib/weaviate` |
| <code>PERSISTENCE<wbr />_LSM<wbr />_ACCESS<wbr />_STRATEGY</code> | Function used to access disk data in virtual memory | `string` | `mmap` (default) or `pread` |
| <code>DISK_USE<wbr />_WARNING<wbr />_PERCENTAGE</code> | If disk usage is higher than the given percentage a warning will be logged by all shards on the affected node's disk. See [Disk Pressure Warnings and Limits for details](/developers/weaviate/configuration/persistence.md#disk-pressure-warnings-and-limits). | `string - number` | `80` |
| <code>DISK_USE<wbr />_READONLY<wbr />_PERCENTAGE</code> | If disk usage is higher than the given percentage all shards on the affected node will be marked as `READONLY`, meaning all future write requests will fail. See [Disk Pressure Warnings and Limits for details](/developers/weaviate/configuration/persistence.md#disk-pressure-warnings-and-limits). | `string - number` | `90` |
| <code>ASYNC<wbr />_INDEXING</code> | (Experimental as of `v1.22`.) <br/><br/>If set, Weaviate creates vector indexes asynchronously to the object creation process. This can be useful for importing large amounts of data. (default: `false`) | `string - true/false` | `false` |
| <code>REINDEX<wbr />_SET_TO<wbr />_ROARINGSET<wbr />_AT_STARTUP</code> | Allow Weaviate to perform a one-off re-indexing to [use Roaring Bitmaps](../concepts/prefiltering.md#migration-to-roaring-bitmaps). <br/><br/>Available in versions `1.18` and higher. | `string - true/false` | `true` |
| <code>PROMETHEUS<wbr />_MONITORING<wbr />_ENABLED</code>  | If set, Weaviate will collect [metrics in a Prometheus-compatible format](/developers/weaviate/configuration/monitoring.md) | `string - true/false` | `false` |
| <code>PROMETHEUS<wbr />_MONITORING<wbr />_GROUP</code> | If set, Weaviate will group metrics for the same class across all shards. | `string - true/false` | `true` |
| `BACKUP_*` | Various configuration variables for backup provider modules. They are outlined in detail on the [Backups page](/developers/weaviate/configuration/backups.md). | |
| `MODULES_CLIENT_TIMEOUT` | Timeout for requests to Weaviate modules. Default: `50s` | `string - duration` | `5s`, `10m`, `1h` |

### Module-specific

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| <code>CONTEXTIONARY<wbr />_URL</code> | Service-Discovery for the contextionary container | `string - URL` | `http://contextionary` |
| <code>TRANSFORMERS<wbr />_INFERENCE<wbr />_API</code> | The endpoint where to reach the transformers module if enabled | `string` | `http://t2v-transformers:8080` |
| <code>CLIP<wbr />_INFERENCE<wbr />_API</code> | The endpoint where to reach the clip module if enabled | `string` | `http://multi2vec-clip:8000` |
| <code>IMAGE<wbr />_INFERENCE<wbr />_API</code> | The endpoint where to reach the img2vec-neural module if enabled | `string` | `http://localhost:8000` |
| <code>USE_SENTENCE<wbr />_TRANSFORMERS<wbr />_VECTORIZER</code> | (EXPERIMENTAL) Use the `sentence-transformer` vectorizer instead of the default vectorizer (from the `transformers` library). Applies to custom images only. | `string - true/false` | `true` |

### Authentication & Authorization

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| <code>AUTHENTICATION<wbr/>_ANONYMOUS<wbr/>_ACCESS<wbr/>_ENABLED</code> | Allow users to interact with weaviate without auth | `string - true/false` | `true` |
| <code>AUTHENTICATION<wbr/>_APIKEY<wbr/>_ENABLED</code> | Enable API key-based authentication | `string - true/false` | `false` |
| <code>AUTHENTICATION<wbr/>_APIKEY<wbr/>_ALLOWED<wbr/>_KEYS</code> | Allowed API keys. <br/><br/> Each key corresponds to a specific user identity below. | `string - comma-separated list` | `jane-secret-key,ian-secret-key` |
| <code>AUTHENTICATION<wbr/>_APIKEY<wbr/>_USERS</code> | API key-based identities. <br/><br/> Each identity corresponds to a specific key above. | `string - comma-separated list` | `jane@doe.com,ian-smith` |
| <code>AUTHENTICATION<wbr />_OIDC<wbr />_ENABLED</code> | Enable OIDC-based authentication | `string - true/false` | `false` |
| <code>AUTHENTICATION<wbr />_OIDC<wbr />_ISSUER</code> | OIDC Token Issuer | `string - URL` | `https://myissuer.com` |
| <code>AUTHENTICATION<wbr />_OIDC<wbr />_CLIENT<wbr />_ID</code> | OIDC Client ID | `string` | `my-client-id` |
| <code>AUTHENTICATION<wbr />_OIDC<wbr />_USERNAME<wbr />_CLAIM</code> | OIDC Username Claim | `string` | `email` |
| <code>AUTHENTICATION<wbr />_OIDC<wbr />_GROUPS<wbr />_CLAIM</code> | OIDC Groups Claim | `string` | `groups` |
| <code>AUTHORIZATION<wbr />_ADMINLIST<wbr />_ENABLED</code> | Enable AdminList Authorization mode | `string - true/false` | `true` |
| <code>AUTHORIZATION<wbr />_ADMINLIST<wbr />_USERS</code> | Users with admin permission| `string - comma-separated list` | <code>jane<wbr />@example.com,<wbr />john<wbr />@example.com</code> |
| <code>AUTHORIZATION<wbr />_ADMINLIST<wbr />_READONLY<wbr />_USERS</code> | Users with read-only permission| `string - comma-separated list` | <code>alice<wbr />@example.com,<wbr />dave<wbr />@example.com</code> |

### Multi-node setups

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| <code>CLUSTER<wbr />_HOSTNAME</code> | Hostname of a node | `string` | `node1` |
| <code>CLUSTER<wbr />_GOSSIP<wbr />_BIND<wbr />_PORT</code> | Port for exchanging network state information. | `string - number` | `7102` |
| <code>CLUSTER<wbr />_DATA<wbr />_BIND<wbr />_PORT</code> | Port for exchanging data. | `string - number` | `7103` |
| <code>CLUSTER<wbr />_JOIN</code> | The service name of the "founding" member node in a cluster setup | `string` | `weaviate-node-1:7100` |


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
