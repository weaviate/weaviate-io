---
title: Environment variables
sidebar_position: 40
image: og/docs/configuration.jpg
# tags: ['HNSW']
---

To configure Weaviate in a [Docker](../installation/docker-compose.md) or a [Kubernetes](../installation/kubernetes.md) deployment, set these environment variables

## General

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `ASYNC_INDEXING` | (Experimental as of `v1.22`.) <br/><br/>If set, Weaviate creates vector indexes asynchronously to the object creation process. This can be useful for importing large amounts of data. (default: `false`) | `boolean` | `false` |
| `AUTOSCHEMA_ENABLED` | Whether to infer the schema where necessary with the autoschema (default: `true`) | `boolean` | `true` |
| `BACKUP_*` | Various configuration variables for backup provider modules. They are outlined in detail on the [Backups page](/developers/weaviate/configuration/backups.md). | |
| `DEFAULT_VECTORIZER_MODULE` | Default vectorizer module - will be overridden by any class-level value defined in the schema | `string` | `text2vec-contextionary` |
| `DISABLE_LAZY_LOAD_SHARDS` | New in v1.23. When `false`, enable lazy shard loading to improve mean time to recovery in multi-tenant deployments. | `string` | `false` |
| `DISABLE_TELEMETRY` | Disable [telemetry](./telemetry.md) data collection | boolean | `false` |
| `DISK_USE_WARNING_PERCENTAGE` | If disk usage is higher than the given percentage a warning will be logged by all shards on the affected node's disk. See [Disk Pressure Warnings and Limits for details](/developers/weaviate/configuration/persistence.md#disk-pressure-warnings-and-limits). | `string - number` | `80` |
| `DISK_USE_READONLY_PERCENTAGE` | If disk usage is higher than the given percentage all shards on the affected node will be marked as `READONLY`, meaning all future write requests will fail. See [Disk Pressure Warnings and Limits for details](/developers/weaviate/configuration/persistence.md#disk-pressure-warnings-and-limits). | `string - number` | `90` |
| `ENABLE_MODULES` | Which modules to enable in the setup? | comma-separated list of strings | `text2vec-openai,generative-openai` |
| `GOMEMLIMIT` | Set the memory limit for the Go runtime. This should match your available memory, such as 10-20% of your total memory for Weaviate. The Go runtime tries to make sure that long-lived and temporary memory allocations do not exceed this value by making the garbage collector more aggressive as the memory usage approaches the limit. [Learn more about GOMEMLIMIT](/blog/gomemlimit-a-game-changer-for-high-memory-applications). | `string - memory limit in SI units` | `4096MiB` |
| `GOMAXPROCS` | Set the maximum number of threads that can be executing simultaneously. If this value is set, it be respected by `LIMIT_RESOURCES`. | `string - number` | `NUMBER_OF_CPU_CORES` |
| `GODEBUG` | Controls debugging variables within the runtime. [See official Go docs](https://pkg.go.dev/runtime). | `string - comma-separated list of name=val pairs` | `gctrace=1` |
| `LIMIT_RESOURCES` | If `true`, Weaviate will automatically attempt to auto-detect and limit the amount of resources (memory & threads) it uses to (0.8 * total memory) and (number of cores-1). It will override any `GOMEMLIMIT` values, however it will respect `GOMAXPROCS` values. | `boolean` | `false` |
| `LOG_LEVEL` | Sets the Weaviate logging level. Default: `info`<br/><br/>`panic`: Panic entries only. (new in `v1.24`) <br/>`fatal`: Fatal entries only. (new in `v1.24`)  <br/> `error`: Error entries only. (new in `v1.24`) <br/>`warning`: Warning entries only. (new in `v1.24`) <br/>`info`: General operational entries. <br/> `debug`: Very verbose logging. <br/>`trace`: Even finer-grained informational events than `debug`. | `string` | |
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
| `ORIGIN` | Set the http(s) origin for Weaviate | `string - HTTP origin` | `https://my-weaviate-deployment.com` |
| `PERSISTENCE_DATA_PATH` | Path to the Weaviate data store | `string - file path` | `/var/lib/weaviate` <br/> Starting in v1.24, defaults to `./data`|
| `PERSISTENCE_LSM_ACCESS_STRATEGY` | Function used to access disk data in virtual memory | `string` | `mmap` (default) or `pread` |
| `QUERY_MAXIMUM_RESULTS` | Sets the maximum total number of objects that can be retrieved. | `string - number` | `10000` |
| `QUERY_DEFAULTS_LIMIT` | Sets the default number of objects to be returned in a query. | `string - number` | `25` <br/> Starting in v1.24, defaults to `10`|
| `REINDEX_SET_TO_ROARINGSET_AT_STARTUP` | Allow Weaviate to perform a one-off re-indexing to [use Roaring Bitmaps](../concepts/prefiltering.md#migration-to-roaring-bitmaps). <br/><br/>Available in versions `1.18` and higher. | `boolean` | `true` |
| `PROMETHEUS_MONITORING_ENABLED`  | If set, Weaviate will collect [metrics in a Prometheus-compatible format](/developers/weaviate/configuration/monitoring.md) | `boolean` | `false` |
| `PROMETHEUS_MONITORING_GROUP` | If set, Weaviate will group metrics for the same class across all shards. | `boolean` | `true` |

## Module-specific

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `CONTEXTIONARY_URL` | Service-Discovery for the contextionary container | `string - URL` | `http://contextionary` |
| `TRANSFORMERS_INFERENCE_API` | The endpoint where to reach the transformers module if enabled | `string` | `http://t2v-transformers:8080` |
| `CLIP_INFERENCE_API` | The endpoint where to reach the clip module if enabled | `string` | `http://multi2vec-clip:8000` |
| `IMAGE_INFERENCE_API` | The endpoint where to reach the img2vec-neural module if enabled | `string` | `http://localhost:8000` |
| `USE_SENTENCE_TRANSFORMERS_VECTORIZER` | (EXPERIMENTAL) Use the `sentence-transformer` vectorizer instead of the default vectorizer (from the `transformers` library). Applies to custom images only. | `boolean` | `true` |

## Authentication and authorization

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Allow users to interact with weaviate without auth | `boolean` | `true` <br/> Starting in v1.24, defaults to `true` |
| `AUTHENTICATION_APIKEY_ENABLED` | Enable API key-based authentication | `boolean` | `false` |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | Allowed API keys. <br/><br/> Each key corresponds to a specific user identity below. | `string - comma-separated list` | `jane-secret-key,ian-secret-key` |
| `AUTHENTICATION_APIKEY_USERS` | API key-based identities. <br/><br/> Each identity corresponds to a specific key above. | `string - comma-separated list` | `jane@doe.com,ian-smith` |
| `AUTHENTICATION_OIDC_ENABLED` | Enable OIDC-based authentication | `boolean` | `false` |
| `AUTHENTICATION_OIDC_ISSUER` | OIDC Token Issuer | `string - URL` | `https://myissuer.com` |
| `AUTHENTICATION_OIDC_CLIENT_ID` | OIDC Client ID | `string` | `my-client-id` |
| `AUTHENTICATION_OIDC_USERNAME_CLAIM` | OIDC Username Claim | `string` | `email` |
| `AUTHENTICATION_OIDC_GROUPS_CLAIM` | OIDC Groups Claim | `string` | `groups` |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Enable AdminList Authorization mode | `boolean` | `true` |
| `AUTHORIZATION_ADMINLIST_USERS` | Users with admin permission| `string - comma-separated list` | `jane@example.com,john@example.com` |
| `AUTHORIZATION_ADMINLIST_READONLY_USERS` | Users with read-only permission| `string - comma-separated list` | `alice@example.com,dave@example.com` |

## Multi-node instances

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `CLUSTER_HOSTNAME` | Hostname of a node | `string` | `node1` |
| `CLUSTER_GOSSIP_BIND_PORT` | Port for exchanging network state information. | `string - number` | `7102` |
| `CLUSTER_DATA_BIND_PORT` | Port for exchanging data. | `string - number` | `7103` |
| `CLUSTER_JOIN` | The service name of the "founding" member node in a cluster setup | `string` | `weaviate-node-1:7100` |

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
