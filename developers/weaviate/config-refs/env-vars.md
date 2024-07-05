---
title: Environment variables
sidebar_position: 40
image: og/docs/configuration.jpg
# tags: ['HNSW']
---

To configure Weaviate in a [Docker](../installation/docker-compose.md) or a [Kubernetes](../installation/kubernetes.md) deployment, set these environment variables

:::tip Boolean environment variables
For Boolean environment variables, `"on"`, `"enabled"`, `"1"`, and `"true"` are interpreted as `true`.

All other values are interpreted as `false`.
:::

## General

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `ASYNC_INDEXING` | (Experimental as of `v1.22`.) <br/><br/>If set, Weaviate creates vector indexes asynchronously to the object creation process. This can be useful for importing large amounts of data. (default: `false`) | `boolean` | `false` |
| `AUTOSCHEMA_ENABLED` | Whether to infer the schema where necessary with the autoschema (default: `true`) | `boolean` | `true` |
| `BACKUP_*` | Various configuration variables for backup provider modules. They are outlined in detail on the [Backups page](/developers/weaviate/configuration/backups.md). | |
| `DEFAULT_VECTORIZER_MODULE` | Default vectorizer module - will be overridden by any class-level value defined in the schema | `string` | `text2vec-contextionary` |
| `DISABLE_LAZY_LOAD_SHARDS` | New in v1.23. When `false`, enable lazy shard loading to improve mean time to recovery in multi-tenant deployments. | `string` | `false` |
| `DISABLE_TELEMETRY` | Disable [telemetry](./telemetry.md) data collection | boolean | `false` |
| `DISK_USE_READONLY_PERCENTAGE` | If disk usage is higher than the given percentage all shards on the affected node will be marked as `READONLY`, meaning all future write requests will fail. See [Disk Pressure Warnings and Limits for details](/developers/weaviate/configuration/persistence.md#disk-pressure-warnings-and-limits). | `string - number` | `90` |
| `DISK_USE_WARNING_PERCENTAGE` | If disk usage is higher than the given percentage a warning will be logged by all shards on the affected node's disk. See [Disk Pressure Warnings and Limits for details](/developers/weaviate/configuration/persistence.md#disk-pressure-warnings-and-limits). | `string - number` | `80` |
| `DISABLE_GO_PROFILING` | If `true`, disables Go profiling. Default: `false`. | `boolean` | `false` |
| `ENABLE_MODULES` | Specify Weaviate modules to enable | `string - comma separated names` | `text2vec-openai,generative-openai` |
| `ENABLE_TOKENIZER_GSE` | Enable the [`GSE` tokenizer](../config-refs/schema/index.md#gse-and-trigram-tokenization-methods) for use | `boolean` | `true` |
| `ENABLE_TOKENIZER_KAGOME_KR` | Enable the [`Kagome` tokenizer for Korean](../config-refs/schema/index.md#kagome_kr-tokenization-method) for use (Experimental as of `v1.25.7`) | `boolean` | `true` |
| `GODEBUG` | Controls debugging variables within the runtime. [See official Go docs](https://pkg.go.dev/runtime). | `string - comma-separated list of name=val pairs` | `gctrace=1` |
| `GOMAXPROCS` | Set the maximum number of threads that can be executing simultaneously. If this value is set, it be respected by `LIMIT_RESOURCES`. | `string - number` | `NUMBER_OF_CPU_CORES` |
| `GOMEMLIMIT` | Set the memory limit for the Go runtime. This should match your available memory, such as 10-20% of your total memory for Weaviate. The Go runtime tries to make sure that long-lived and temporary memory allocations do not exceed this value by making the garbage collector more aggressive as the memory usage approaches the limit. [Learn more about GOMEMLIMIT](/blog/gomemlimit-a-game-changer-for-high-memory-applications). | `string - memory limit in SI units` | `4096MiB` |
| `LIMIT_RESOURCES` | If `true`, Weaviate will automatically attempt to auto-detect and limit the amount of resources (memory & threads) it uses to (0.8 * total memory) and (number of cores-1). It will override any `GOMEMLIMIT` values, however it will respect `GOMAXPROCS` values. | `boolean` | `false` |
| `LOG_FORMAT` | Set the Weaviate logging format <br/><br/>Default: Outputs log data to json. e.g.: `{"action":"startup","level":"debug","msg":"finished initializing modules","time":"2023-04-12T05:07:43Z"}` <br/>`text`: Outputs log data to a string. e.g. `time="2023-04-12T04:54:23Z" level=debug msg="finished initializing modules" action=startup` | `string` |  |
| `LOG_LEVEL` | Sets the Weaviate logging level. Default: `info`<br/><br/>`panic`: Panic entries only. (new in `v1.24`) <br/>`fatal`: Fatal entries only. (new in `v1.24`)  <br/> `error`: Error entries only. (new in `v1.24`) <br/>`warning`: Warning entries only. (new in `v1.24`) <br/>`info`: General operational entries. <br/> `debug`: Very verbose logging. <br/>`trace`: Even finer-grained informational events than `debug`. | `string` | |
| `MODULES_CLIENT_TIMEOUT` | Timeout for requests to Weaviate modules. Default: `50s` | `string - duration` | `5s`, `10m`, `1h` |
| `ORIGIN` | Set the http(s) origin for Weaviate | `string - HTTP origin` | `https://my-weaviate-deployment.com` |
| `PERSISTENCE_DATA_PATH` | Path to the Weaviate data store | `string - file path` | `/var/lib/weaviate` <br/> Starting in v1.24, defaults to `./data`|
| `PERSISTENCE_HNSW_MAX_LOG_SIZE` | Maximum size of the HNSW [write-ahead-log](../concepts/storage.md#hnsw-vector-index-storage). Increase this to improve log compaction efficiency, or decrease to reduce memory requirements. (Default: 500MiB) | `string` | `4GiB` (IEC units), `4GB` (SI units), `4000000000` (bytes) |
| `PERSISTENCE_LSM_ACCESS_STRATEGY` | Function used to access disk data in virtual memory | `string` | `mmap` (default) or `pread` |
| `PERSISTENCE_LSM_MAX_SEGMENT_SIZE` | Maximum size of a segment in the [LSM store](../concepts/storage.md#object-and-inverted-index-store). Set this to limit disk usage spikes during compaction to ~2x the segment size. (Default: no limit) | `string` | `4GiB` (IEC units), `4GB` (SI units), `4000000000` (bytes) |
| `PROFILING_PORT` | Sets the port for the Go profiler. Default: `6060` | `integer` | `6060` |
| `PROMETHEUS_MONITORING_ENABLED`  | If set, Weaviate collects [metrics in a Prometheus-compatible format](/developers/weaviate/configuration/monitoring.md) | `boolean` | `false` |
| `PROMETHEUS_MONITORING_GROUP` | If set, Weaviate groups metrics for the same class across all shards. | `boolean` | `true` |
| `QUERY_DEFAULTS_LIMIT` | Sets the default number of objects to be returned in a query. | `string - number` | `25` <br/> Starting in v1.24, defaults to `10`|
| `QUERY_MAXIMUM_RESULTS` | Sets the maximum total number of objects that can be retrieved. | `string - number` | `10000` |
| `QUERY_SLOW_LOG_ENABLED` | Log slow queries for debugging. Requires a restart to update. <br/> (New in 1.24.16, 1.25.3) | `boolean` | `False` |
| `QUERY_SLOW_LOG_THRESHOLD` | Set a threshold time for slow query logging. Requires a restart to update. <br/> (New in 1.24.16, 1.25.3) | `string` | `2s` <br/> Values are times: `3h`, `2s`, `100ms` |
| `REINDEX_SET_TO_ROARINGSET_AT_STARTUP` | Allow Weaviate to perform a one-off re-indexing to [use Roaring Bitmaps](../concepts/prefiltering.md#migration-to-roaring-bitmaps). <br/><br/>Available in versions `1.18` and higher. | `boolean` | `true` |
| `TOMBSTONE_DELETION_MAX_PER_CYCLE` | Maximum number of tombstones to delete per cleanup cycle. Set this to limit cleanup cycles, as they are resource-intensive. As an example, set a maximum of 10000000 (10M) for a cluster with 300 million-object shards. (Default: none) | `string - int` (Available from `v1.24.15` / `v1.25.2`) | `10000000` |
| `TOMBSTONE_DELETION_MIN_PER_CYCLE` | Minimum number of tombstones to delete per cleanup cycle. Set this to prevent triggering unnecessary cleanup cycles below a threshold. As an example, set a minimum of 1000000 (1M) for a cluster with 300 million-object shards. (Default: 0) (Available from `v1.24.15` / `v1.25.2`) | `string - int` | `100000` |
| `USE_GSE` | Enable the [`GSE` tokenizer](../config-refs/schema/index.md#gse-and-trigram-tokenization-methods) for use. <br/> (The same as `ENABLE_TOKENIZER_GSE`. We recommend using `ENABLE_TOKENIZER_GSE` for consistency in naming with other optional tokenizers.) | `boolean` | `true` |

## Module-specific

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `CLIP_INFERENCE_API` | The endpoint where to reach the clip module if enabled | `string` | `http://multi2vec-clip:8000` |
| `CONTEXTIONARY_URL` | Service-Discovery for the contextionary container | `string - URL` | `http://contextionary` |
| `IMAGE_INFERENCE_API` | The endpoint where to reach the img2vec-neural module if enabled | `string` | `http://localhost:8000` |
| `TRANSFORMERS_INFERENCE_API` | The endpoint where to reach the transformers module if enabled | `string` | `http://t2v-transformers:8080` |
| `USE_SENTENCE_TRANSFORMERS_VECTORIZER` | (EXPERIMENTAL) Use the `sentence-transformer` vectorizer instead of the default vectorizer (from the `transformers` library). Applies to custom images only. | `boolean` | `true` |

## Authentication and authorization

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Allow users to interact with weaviate without auth | `boolean` | `true` <br/> Starting in v1.24, defaults to `true` |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | Allowed API keys. <br/><br/> Each key corresponds to a specific user identity below. | `string - comma-separated list` | `jane-secret-key,ian-secret-key` |
| `AUTHENTICATION_APIKEY_ENABLED` | Enable API key-based authentication | `boolean` | `false` |
| `AUTHENTICATION_APIKEY_USERS` | API key-based identities. <br/><br/> Each identity corresponds to a specific key above. | `string - comma-separated list` | `jane@doe.com,ian-smith` |
| `AUTHENTICATION_OIDC_CLIENT_ID` | OIDC Client ID | `string` | `my-client-id` |
| `AUTHENTICATION_OIDC_ENABLED` | Enable OIDC-based authentication | `boolean` | `false` |
| `AUTHENTICATION_OIDC_GROUPS_CLAIM` | OIDC Groups Claim | `string` | `groups` |
| `AUTHENTICATION_OIDC_ISSUER` | OIDC Token Issuer | `string - URL` | `https://myissuer.com` |
| `AUTHENTICATION_OIDC_USERNAME_CLAIM` | OIDC Username Claim | `string` | `email` |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Enable AdminList Authorization mode | `boolean` | `true` |
| `AUTHORIZATION_ADMINLIST_USERS` | Users with admin permission| `string - comma-separated list` | `jane@example.com,john@example.com` |
| `AUTHORIZATION_ADMINLIST_READONLY_USERS` | Users with read-only permission| `string - comma-separated list` | `alice@example.com,dave@example.com` |

## Multi-node instances

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `CLUSTER_DATA_BIND_PORT` | Port for exchanging data. | `string - number` | `7103` |
| `CLUSTER_GOSSIP_BIND_PORT` | Port for exchanging network state information. | `string - number` | `7102` |
| `CLUSTER_HOSTNAME` | Hostname of a node | `string` | `node1` |
| `CLUSTER_JOIN` | The service name of the "founding" member node in a cluster setup | `string` | `weaviate-node-1:7100` |
| `HNSW_STARTUP_WAIT_FOR_VECTOR_CACHE` | If `true`, vector cache prefill is synchronous when a node starts. The node reports ready to serve when the cache is hot. Defaults to `false`. Added in 1.24.20 and 1.25.5. | `boolean` | `false` |
| `RAFT_BOOTSTRAP_EXPECT` | The number of voter notes at bootstrapping time | `string - number` | `1` |
| `RAFT_BOOTSTRAP_TIMEOUT` | The time in seconds to wait for the cluster to bootstrap | `string - number` | `90` |
| `RAFT_GRPC_MESSAGE_MAX_SIZE` | The maximum internal raft gRPC message size in bytes. Defaults to 1073741824 | `string - number` | `1073741824` |
| `RAFT_JOIN` | Manually set Raft voter nodes. If set, RAFT_BOOTSTRAP_EXPECT needs to be adjusted manually to match the number of Raft voters. | `string` | `weaviate-0,weaviate-1` |
| `RAFT_METADATA_ONLY_VOTERS` | If `true`, voter nodes only handle the schema. They do not accept any data. | `boolean` | `false` |

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
