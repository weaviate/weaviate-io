---
title: Environment variables
sidebar_position: 0
image: og/docs/configuration.jpg
# tags: ['HNSW']
---

To configure Weaviate in a [Docker](../../installation/docker-compose.md) or a [Kubernetes](../../installation/kubernetes.md) deployment, you can set these environment variables.

:::info Boolean environment variables
For Boolean environment variables, `"on"`, `"enabled"`, `"1"`, and `"true"` are interpreted as `true`.

All other values are interpreted as `false`.
:::

:::tip Runtime configuration updates

Weaviate supports runtime configuration management. Check out how to [configure it and the available environment variables](./runtime-config.md).

:::

## General

import Link from '@docusaurus/Link';

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `ASYNC_INDEXING` | (Experimental, added in `v1.22`.) <br/><br/>If set, Weaviate creates vector indexes asynchronously to the object creation process. This can be useful for importing large amounts of data. (default: `false`) | `boolean` | `false` |
| `AUTOSCHEMA_ENABLED` | Whether to infer the schema where necessary with the autoschema (default: `true`) | `boolean` | `true` |
| `DEFAULT_VECTORIZER_MODULE` | Default vectorizer module - will be overridden by any class-level value defined in the schema | `string` | `text2vec-contextionary` |
| `DISABLE_LAZY_LOAD_SHARDS` | New in v1.23. When `false`, enable lazy shard loading to improve mean time to recovery in multi-tenant deployments. | `string` | `false` |
| `DISABLE_TELEMETRY` | Disable [telemetry](../telemetry.md) data collection | boolean | `false` |
| `DISK_USE_READONLY_PERCENTAGE` | If disk usage is higher than the given percentage all shards on the affected node will be marked as `READONLY`, meaning all future write requests will fail. See [Disk Pressure Warnings and Limits for details](/developers/weaviate/configuration/persistence.md#disk-pressure-warnings-and-limits). | `string - number` | `90` |
| `DISK_USE_WARNING_PERCENTAGE` | If disk usage is higher than the given percentage a warning will be logged by all shards on the affected node's disk. See [Disk Pressure Warnings and Limits for details](/developers/weaviate/configuration/persistence.md#disk-pressure-warnings-and-limits). | `string - number` | `80` |
| `ENABLE_API_BASED_MODULES` | Enable all API-based modules. (Experimental as of `v1.26.0`) | `boolean` | `true` |
| `ENABLE_MODULES` | Specify Weaviate modules to enable | `string - comma separated names` | `text2vec-openai,generative-openai` |
| `ENABLE_TOKENIZER_GSE` | Enable the [`GSE` tokenizer](../../config-refs/schema/index.md#gse-and-trigram-tokenization-methods) for use | `boolean` | `true` |
| `ENABLE_TOKENIZER_KAGOME_JA` | Enable the [`Kagome` tokenizer for Japanese](../../config-refs/schema/index.md#kagome_ja-tokenization-method) for use (Experimental as of `v1.28.0`) | `boolean` | `true` |
| `ENABLE_TOKENIZER_KAGOME_KR` | Enable the [`Kagome` tokenizer for Korean](../../config-refs/schema/index.md#kagome_kr-tokenization-method) for use (Experimental as of `v1.25.7`) | `boolean` | `true` |
| `GODEBUG` | Controls debugging variables within the runtime. [See official Go docs](https://pkg.go.dev/runtime). | `string - comma-separated list of name=val pairs` | `gctrace=1` |
| `GOMAXPROCS` | Set the maximum number of threads that can be executing simultaneously. If this value is set, it be respected by `LIMIT_RESOURCES`. | `string - number` | `NUMBER_OF_CPU_CORES` |
| `GOMEMLIMIT` | Set the memory limit for the Go runtime. A suggested value is between 90-80% of your total memory for Weaviate. The Go runtime tries to make sure that long-lived and temporary memory allocations do not exceed this value by making the garbage collector more aggressive as the memory usage approaches the limit. [Learn more about GOMEMLIMIT](/blog/gomemlimit-a-game-changer-for-high-memory-applications). | `string - memory limit in SI units` | `4096MiB` |
| `GO_PROFILING_DISABLE` | If `true`, disables Go profiling. Default: `false`. | `boolean` | `false` |
| `GO_PROFILING_PORT` | Sets the port for the Go profiler. Default: `6060` | `integer` | `6060` |
| `GRPC_MAX_MESSAGE_SIZE` | Maximum gRPC message size in bytes. (Added in `v1.27.1`) Default: 10MB | `string - number` | `2000000000` |
| `GRPC_PORT` | The port on which Weaviate's gRPC server listens for incoming requests. Default: `50051` | `string - number` | `50052` |
| `LIMIT_RESOURCES` | If `true`, Weaviate will automatically attempt to auto-detect and limit the amount of resources (memory & threads) it uses to (0.8 * total memory) and (number of cores-1). It will override any `GOMEMLIMIT` values, however it will respect `GOMAXPROCS` values. | `boolean` | `false` |
| `LOG_FORMAT` | Set the Weaviate logging format <br/><br/>Default: Outputs log data to json. e.g.: `{"action":"startup","level":"debug","msg":"finished initializing modules","time":"2023-04-12T05:07:43Z"}` <br/>`text`: Outputs log data to a string. e.g. `time="2023-04-12T04:54:23Z" level=debug msg="finished initializing modules" action=startup` | `string` |  |
| `LOG_LEVEL` | Sets the Weaviate logging level. Default: `info`<br/><br/>`panic`: Panic entries only. (new in `v1.24`) <br/>`fatal`: Fatal entries only. (new in `v1.24`)  <br/> `error`: Error entries only. (new in `v1.24`) <br/>`warning`: Warning entries only. (new in `v1.24`) <br/>`info`: General operational entries. <br/> `debug`: Very verbose logging. <br/>`trace`: Even finer-grained informational events than `debug`. | `string` | | 
| `MAXIMUM_ALLOWED_COLLECTIONS_COUNT` | Maximum allowed number of collections in a Weaviate node. A value of `-1` removes the limit. Default: `1000` <br/><br/>Instead of raising the collections count limit, consider [rethinking your architecture](../../starter-guides/managing-collections/collections-scaling-limits.mdx).<br/>Added in `v1.30`| `string - number` | `20` |
| `MEMORY_READONLY_PERCENTAGE` | If memory usage is higher than the given percentage all shards on the affected node will be marked as `READONLY`, meaning all future write requests will fail. (Default: `0` - i.e. no limit) | `string - number` | `75` |
| `MEMORY_WARNING_PERCENTAGE` | If memory usage is higher than the given percentage a warning will be logged by all shards on the affected node's disk. (Default: `0` - i.e. no limit) | `string - number` | `85` |
| `MODULES_CLIENT_TIMEOUT` | Timeout for requests to Weaviate modules. Default: `50s` | `string - duration` | `5s`, `10m`, `1h` |
| `ORIGIN` | Set the http(s) origin for Weaviate | `string - HTTP origin` | `https://my-weaviate-deployment.com` |
| `PERSISTENCE_DATA_PATH` | Path to the Weaviate data store.<br/>[Note about file systems and performance](../../concepts/resources.md#file-system). | `string - file path` | `/var/lib/weaviate` <br/> Starting in v1.24, defaults to `./data`|
| `PERSISTENCE_HNSW_DISABLE_SNAPSHOTS` | If set, [HNSW snapshotting](../../concepts/storage.md#persistence-and-crash-recovery) will be disabled. Default: `true`<br/>Added in `v1.31` | `boolean` | `false` |
| `PERSISTENCE_HNSW_SNAPSHOT_INTERVAL_SECONDS` | The minimum time in seconds that must pass before the next snapshot is created. Default: `21600` seconds (6 hours)<br/>Added in `v1.31` | `string - number` | `3600` |
| `PERSISTENCE_HNSW_SNAPSHOT_MIN_DELTA_COMMITLOGS_NUMBER` | The minimum number of new commit log files created since the last snapshot. Default: `1`<br/>Added in `v1.31` | `string - number` | `100` |
| `PERSISTENCE_HNSW_SNAPSHOT_MIN_DELTA_COMMITLOGS_SIZE_PERCENTAGE` | The minimum total size of new commit logs (as a percentage of the previous snapshot's size) required to trigger a new snapshot. Default: `5` (meaning 5% of the previous snapshot's size in new commit logs)<br/>Added in `v1.31` | `string - number` | `15` |
| `PERSISTENCE_HNSW_SNAPSHOT_ON_STARTUP` | If set, Weaviate will try to create a new snapshot during startup if there are changes in the commit log since the last snapshot. If there are no changes, then the existing snapshot will be loaded. Default: `true`<br/>Added in `v1.31` | `boolean` | `false` |
| `PERSISTENCE_HNSW_MAX_LOG_SIZE` | Maximum size of the HNSW [write-ahead-log](../../concepts/storage.md#hnsw-vector-index-storage). Increase this to improve log compaction efficiency, or decrease to reduce memory requirements. Default: 500MiB | `string` | `4GiB` (IEC units), `4GB` (SI units), `4000000000` (bytes) |
| `PERSISTENCE_LSM_ACCESS_STRATEGY` | Function used to access disk data in virtual memory. Default: `mmap` | `string` | `mmap` or `pread` |
| `PERSISTENCE_LSM_MAX_SEGMENT_SIZE` | Maximum size of a segment in the [LSM store](../../concepts/storage.md#object-and-inverted-index-store). Set this to limit disk usage spikes during compaction to ~2x the segment size. Default: no limit | `string` | `4GiB` (IEC units), `4GB` (SI units), `4000000000` (bytes) |
| `PROMETHEUS_MONITORING_ENABLED`  | If set, Weaviate collects [metrics in a Prometheus-compatible format](/developers/weaviate/configuration/monitoring.md) | `boolean` | `false` |
| `PROMETHEUS_MONITORING_GROUP` | If set, Weaviate groups metrics for the same class across all shards. | `boolean` | `true` |
| `QUERY_CROSS_REFERENCE_DEPTH_LIMIT` | Sets the maximum depth of cross-references to be resolved in a query. Defaults to 5. <br/>Added in `v1.24.25`, `v1.25.18`, `v1.26.5`. | `string - number` | `3` |
| `QUERY_DEFAULTS_LIMIT` | Sets the default number of objects to be returned in a query. | `string - number` | `25` <br/> Starting in v1.24, defaults to `10`|
| `QUERY_MAXIMUM_RESULTS` | Sets the maximum total number of objects that can be retrieved. | `string - number` | `10000` |
| `QUERY_SLOW_LOG_ENABLED` | Log slow queries for debugging. Requires a restart to update. <br/> (New in 1.24.16, 1.25.3) | `boolean` | `False` |
| `QUERY_SLOW_LOG_THRESHOLD` | Set a threshold time for slow query logging. Requires a restart to update. <br/> (New in 1.24.16, 1.25.3) | `string` | `2s` <br/> Values are times: `3h`, `2s`, `100ms` |
| `REINDEX_SET_TO_ROARINGSET_AT_STARTUP` | Allow Weaviate to perform a one-off re-indexing to [use Roaring Bitmaps](../../concepts/filtering.md#migration-to-roaring-bitmaps). <br/><br/>Available in versions `1.18` and higher. | `boolean` | `true` |
| `TOKENIZER_CONCURRENCY_COUNT` | Limit the combined number of GSE and Kagome tokenizers running at the same time. Default: `GOMAXPROCS` | `string - number` | `NUMBER_OF_CPU_CORES` |
| `TOMBSTONE_DELETION_CONCURRENCY` | The maximum number of cores to use for tombstone deletion. Set this to limit the number of cores used for cleanup. Default: Half of the available cores. (New in `v1.24.0`) | `string - int` | `4` |
| `TOMBSTONE_DELETION_MAX_PER_CYCLE` | Maximum number of tombstones to delete per cleanup cycle. Set this to limit cleanup cycles, as they are resource-intensive. As an example, set a maximum of 10000000 (10M) for a cluster with 300 million-object shards. Default: none | `string - int` (New in `v1.24.15` / `v1.25.2`) | `10000000` |
| `TOMBSTONE_DELETION_MIN_PER_CYCLE` | Minimum number of tombstones to delete per cleanup cycle. Set this to prevent triggering unnecessary cleanup cycles below a threshold. As an example, set a minimum of 1000000 (1M) for a cluster with 300 million-object shards. Default: 0 (New in `v1.24.15`, `v1.25.2`) | `string - int` | `100000` |
| `USE_GSE` | Enable the [`GSE` tokenizer](../../config-refs/schema/index.md#gse-and-trigram-tokenization-methods) for use. <br/> (The same as `ENABLE_TOKENIZER_GSE`. We recommend using `ENABLE_TOKENIZER_GSE` for consistency in naming with other optional tokenizers.) | `boolean` | `true` |
| `USE_INVERTED_SEARCHABLE` | Store searchable properties using a more efficient in-disk format, designed for the BlockMax WAND algorithm. Set as `true` together with `USE_BLOCKMAX_WAND` to enable BlockMax WAND at query time. <br/><br/>Added in `v1.28` default: `false` <br/> From `v1.30` default: `true` <br/><Link to="/developers/weaviate/concepts/indexing#blockmax-wand-algorithm">Read more</Link> | `boolean` | `true` |
| `USE_BLOCKMAX_WAND` | Use BlockMax WAND algorithm for BM25 and hybrid searches. Enable it together with `USE_INVERTED_SEARCHABLE` to get the performance benefits. <br/><br/>Added in `v1.28` default: `false` <br/> From `v1.30` default: `true` <br/><Link to="/developers/weaviate/concepts/indexing#blockmax-wand-algorithm">Read more</Link> | `boolean` | `true` |

## Module-specific

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `BACKUP_*` | Various configuration variables for backup provider modules. They are outlined in detail on the [Backups page](/developers/weaviate/configuration/backups.md). | |
| `AZURE_BLOCK_SIZE` | The block size for Azure Blob Storage for backups. Default: `41943040` (40MB) | `int - bytes` | `10000000` |
| `AZURE_CONCURRENCY` | The maximum number of parts that will be concurrently uploaded/downloaded during backup operations. Default: `1` | `int` | `3` |
| `CLIP_INFERENCE_API` | The endpoint where to reach the clip module if enabled | `string` | `http://multi2vec-clip:8000` |
| `CONTEXTIONARY_URL` | Service-Discovery for the contextionary container | `string - URL` | `http://contextionary` |
| `IMAGE_INFERENCE_API` | The endpoint where to reach the img2vec-neural module if enabled | `string` | `http://localhost:8000` |
| `LOWERCASE_VECTORIZATION_INPUT` | If `true`, Weaviate lowercases all input text before vectorization. <br/>Added in `v1.27` (default: `false`) <br/>For `text2vec-contextionary`, set this to `true` | `boolean` | `true` |
| `OFFLOAD_S3_BUCKET` | The S3 bucket to use for offloading (default: `weaviate-offload`) | `string` | `my-custom-offload-bucket` |
| `OFFLOAD_S3_BUCKET_AUTO_CREATE` | Whether to automatically create the S3 bucket for offloading if it does not exist (default: `false`) | `boolean` | `true` |
| `OFFLOAD_S3_CONCURRENCY` | The maximum number of parts that will be uploaded/downloaded in parallel during offloading operations (default: `25`) | `string - number` | `10` |
| `OFFLOAD_TIMEOUT` | The request timeout value, in seconds (default: `120`) | `string - number` | `60` |
| `TRANSFORMERS_INFERENCE_API` | The endpoint where to reach the transformers module if enabled | `string` | `http://t2v-transformers:8080` |
| `USE_GOOGLE_AUTH` | Automatically look for Google Cloud credentials, and generate Vertex AI access tokens for Weaviate to use as needed ([read more](../../model-providers/google/index.md)). (default: `false`) | `boolean` | `true` |
| `USE_SENTENCE_TRANSFORMERS_VECTORIZER` | (EXPERIMENTAL) Use the `sentence-transformer` vectorizer instead of the default vectorizer (from the `transformers` library). Applies to custom images only. | `boolean` | `true` |
| `CLIP_WAIT_FOR_STARTUP` | If `true`, Weaviate waits for the `multi2vec-clip` module to start up before starting (default: `true`).  | `boolean` | `true` |
| `NER_WAIT_FOR_STARTUP` | If `true`, Weaviate waits for the `ner-transformers` module to start up before starting (default: `true`). (Available from `v1.25.27`, `v1.26.12`, `v1.27.7`) | `boolean` | `true` |
| `QNA_WAIT_FOR_STARTUP` | If `true`, Weaviate waits for the `qna-transformers` module to start up before starting (default: `true`). (Available from `v1.25.27`, `v1.26.12`, `v1.27.7`) | `boolean` | `true` |
| `RERANKER_WAIT_FOR_STARTUP` | If `true`, Weaviate waits for the `reranker-transformers` module to start up before starting (default: `true`). (Available from `v1.25.27`, `v1.26.12`, `v1.27.7`) | `boolean` | `true` |
| `SUM_WAIT_FOR_STARTUP` | If `true`, Weaviate waits for the `sum-transformers` module to start up before starting (default: `true`). (Available from `v1.25.27`, `v1.26.12`, `v1.27.7`) | `boolean` | `true` |
| `GPT4ALL_WAIT_FOR_STARTUP` | If `true`, Weaviate waits for the `text2vec-gpt4all` module to start up before starting (default: `true`). (Available from `v1.25.27`, `v1.26.12`, `v1.27.7`) | `boolean` | `true` |
| `TRANSFORMERS_WAIT_FOR_STARTUP` | If `true`, Weaviate waits for the `text2vec-transformers` module to start up before starting (default: `true`). (Available from `v1.25.27`, `v1.26.12`, `v1.27.7`) | `boolean` | `true` |

## Authentication and authorization

:::info Authentication & Authorization documentation
For more information on authentication and authorization, see the [Authentication](../../configuration/authentication.md) and [Authorization](../../configuration/authorization.md) pages.
:::

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Allow users to interact with weaviate without auth | `boolean` | `true` <br/> Starting in v1.24, defaults to `true` |
| `AUTHENTICATION_APIKEY_ALLOWED_KEYS` | Allowed API keys. <br/><br/> Each key corresponds to a specific user identity below. | `string - comma-separated list` | `jane-secret-key,ian-secret-key` |
| `AUTHENTICATION_APIKEY_ENABLED` | Enable API key-based authentication | `boolean` | `false` |
| `AUTHENTICATION_APIKEY_USERS` | API key-based identities. <br/><br/> Each identity corresponds to a specific key above. | `string - comma-separated list` | `jane@doe.com,ian-smith` |
| `AUTHENTICATION_DB_USERS_ENABLED` | Allow runtime [user management](../../configuration/rbac/manage-users.mdx). Default: `false` | `boolean` | `true` |
| `AUTHENTICATION_OIDC_CLIENT_ID` | OIDC Client ID | `string` | `my-client-id` |
| `AUTHENTICATION_OIDC_ENABLED` | Enable OIDC-based authentication | `boolean` | `false` |
| `AUTHENTICATION_OIDC_GROUPS_CLAIM` | OIDC Groups Claim | `string` | `groups` |
| `AUTHENTICATION_OIDC_ISSUER` | OIDC Token Issuer | `string - URL` | `https://myissuer.com` |
| `AUTHENTICATION_OIDC_USERNAME_CLAIM` | OIDC Username Claim | `string` | `email` |
| `AUTHORIZATION_ADMINLIST_ENABLED` | Enable AdminList authorization scheme (mutually exclusive with `AUTHORIZATION_RBAC_ENABLED`) | `boolean` | `true` |
| `AUTHORIZATION_ADMINLIST_USERS` | Users with admin permission when AdminList scheme used | `string - comma-separated list` | `jane@example.com,john@example.com` |
| `AUTHORIZATION_ADMINLIST_READONLY_USERS` | Users with read-only permission when AdminList scheme used | `string - comma-separated list` | `alice@example.com,dave@example.com` |

### RBAC Authorization

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `AUTHORIZATION_RBAC_ENABLED` | Enable RBAC authorization scheme (mutually exclusive with `AUTHORIZATION_ADMINLIST_ENABLED`). | `boolean` | `true` |
| `AUTHORIZATION_RBAC_ROOT_USERS` | Users with the built-in root/administrator role when RBAC scheme used. At least one root user must be defined with RBAC. | `string - comma-separated list` | `admin-user,another-admin-user` |

## Multi-node instances

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `CLUSTER_DATA_BIND_PORT` | Port for exchanging data. | `string - number` | `7103` |
| `CLUSTER_GOSSIP_BIND_PORT` | Port for exchanging network state information. | `string - number` | `7102` |
| `CLUSTER_HOSTNAME` | Hostname of a node. Always set this value if the default OS hostname might change over time. | `string` | `node1` |
| `CLUSTER_JOIN` | The service name of the "founding" member node in a cluster setup | `string` | `weaviate-node-1:7100` |
| `HNSW_STARTUP_WAIT_FOR_VECTOR_CACHE` | If `true`, vector cache prefill is synchronous when a node starts. The node reports ready to serve when the cache is hot. Defaults to `false`. Added in 1.24.20 and 1.25.5. | `boolean` | `false` |
| `COLLECTION_RETRIEVAL_STRATEGY`| Set collection definition retrieval behavior for a data request. <br/><br/> <ul><li>`LeaderOnly` (default): Always requests the definition from the leader node. </li><li>`LocalOnly`: Always use the local definition</li><li>`LeaderOnMismatch`: Requests the definition if outdated.</li></ul> ([Read more](../../concepts/replication-architecture/consistency.md#collection-definition-requests-in-queries)) (Added in `v1.27.10`, `v1.28.4`) | `string` | `LeaderOnly` |
| `RAFT_BOOTSTRAP_EXPECT` | The number of voter notes at bootstrapping time | `string - number` | `1` |
| `RAFT_BOOTSTRAP_TIMEOUT` | The time in seconds to wait for the cluster to bootstrap | `string - number` | `90` |
| `RAFT_ENABLE_FQDN_RESOLVER` | If `true`, use DNS lookup instead of memberlist lookup for Raft. Added in `v1.25.15` and removed in `v1.30`. ([Read more](../../concepts/cluster.md#fqdn-for-node-discovery)) | `boolean` | `true` |
| `RAFT_ENABLE_ONE_NODE_RECOVERY` | Enable running the single node recovery routine on restart. This is useful if the default hostname has changed and a single node cluster believes there are supposed to be two nodes. | `boolean` | `false` |
| `RAFT_FQDN_RESOLVER_TLD` | The top-level domain to use for DNS lookup, in `[node-id].[tld]` format. Added in `v1.25.15` and removed in `v1.30`. ([Read more](../../concepts/cluster.md#fqdn-for-node-discovery)) | `string` | `example.com` |
| `RAFT_GRPC_MESSAGE_MAX_SIZE` | The maximum internal raft gRPC message size in bytes. Defaults to 1073741824 | `string - number` | `1073741824` |
| `RAFT_JOIN` | Manually set Raft voter nodes. If set, RAFT_BOOTSTRAP_EXPECT needs to be adjusted manually to match the number of Raft voters. | `string` | `weaviate-0,weaviate-1` |
| `RAFT_METADATA_ONLY_VOTERS` | If `true`, voter nodes only handle the schema. They do not accept any data. | `boolean` | `false` |
| `REPLICATION_MINIMUM_FACTOR` | The minimum replication factor for all collections in the cluster. | `string - number` | `3` |

### Async replication

:::info Added in `v1.29`
The environment variables for configuring async replication have been introduced in `v1.29`.
To learn more about their usage, visit the **[replication how-to guide](/developers/weaviate/configuration/replication#async-replication-settings)**.
:::

| Variable | Description | Type | Example Value |
| --- | --- | --- | --- |
| `ASYNC_REPLICATION_DISABLED` | Disable async replication. Default: `false` | `boolean` | `false` |
| `ASYNC_REPLICATION_HASHTREE_HEIGHT` | Height of the hash tree used for data comparison between nodes. If the height is `0` each node will store just one digest per shard. Default: `16`, Min: `0`, Max: `20`<br/> [Read more about potentially increased memory consumption.](/developers/weaviate/concepts/replication-architecture/consistency#memory-and-performance-considerations-for-async-replication) | `string - number` | `10` |
| `ASYNC_REPLICATION_FREQUENCY` |  Frequency of periodic data comparison between nodes in seconds. Default: `30` | `string - number` | `60` |
| `ASYNC_REPLICATION_FREQUENCY_WHILE_PROPAGATING` | Frequency of data comparison between nodes after a node has been synced in milliseconds. Default: `10` | `string - number` | `20` |
| `ASYNC_REPLICATION_ALIVE_NODES_CHECKING_FREQUENCY` | Frequency of how often the background process checks for changes in the availability of nodes in seconds. Default: `5` | `string - number` | `20` |
| `ASYNC_REPLICATION_LOGGING_FREQUENCY` | Frequency of how often the background process logs any events in seconds. Default: `5` | `string - number` | `7` |
| `ASYNC_REPLICATION_DIFF_BATCH_SIZE` | Specifies the batch size for comparing digest information between nodes. Default: `1000`, Min: `1`, Max: `10000` |`string - number`  | `2000` |
| `ASYNC_REPLICATION_DIFF_PER_NODE_TIMEOUT` | Defines the time limit a node has to provide a comparison response in seconds. Default: `10` | `string - number` | `30` |
| `ASYNC_REPLICATION_PROPAGATION_TIMEOUT` | Defines the time limit a node has to provide a propagation response in seconds. Default: `30` | `string - number` | `60` |
| `ASYNC_REPLICATION_PROPAGATION_LIMIT` | Limits the number of out-of-sync objects that can be propagated in one asynchronous replication iteration. Default: `10000`, Min: `1`, Max: `1000000` | `string - number` | `5000` |
| `ASYNC_REPLICATION_PROPAGATION_DELAY` | Sets a delay period to allow asynchronous write operations to reach all nodes in a shard/tenant before propagating new or updated objects. Default: `30` | `string - number` | `40` |
| `ASYNC_REPLICATION_PROPAGATION_CONCURRENCY` | Defines the number of workers which will concurrently propagate a batch of objects. Default: `5`, Min: `1`, Max: `20` | `string - number` | `10` |
| `ASYNC_REPLICATION_PROPAGATION_BATCH_SIZE` | Sets the maximum number of objects to propagate in a single batch. Default: `100`, Min: `1`, Max: `1000` |`string - number`  | `200` |

<!-- Docs notes:
Undocumented environment variables - for internal use only:
MAINTENANCE_NODES
ASYNC_BRUTE_FORCE_SEARCH_LIMIT
RAFT_FORCE_ONE_NODE_RECOVERY
-->

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
