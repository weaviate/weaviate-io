---
title: BlockMax WAND migration guide
sidebar_label: 1.30 (BlockMax WAND migration)
sidebar_position: 9
image: og/docs/more-resources.jpg
---

This comprehensive guide covers how to migrate existing data to use the BlockMax WAND algorithm for the inverted index in Weaviate `v1.30` and above.

**BlockMax WAND** offers improved search performance for BM25 and hybrid searches. While new collections created in Weaviate `v1.30` or newer will automatically use this optimized format, existing collections created before `v1.30` require migration to take advantage of these improvements.

To learn more about the technical details of this change, you can refer to [the BlockMax WAND blog post](https://weaviate.io/blog/blockmax-wand).

## Prerequisites

Before beginning the migration, ensure that:

- You have a Weaviate version before `v1.30` that doesn't use the BlockMax WAND algorithm
- You're on the latest version of Weaviate before migrating (currently `||site.weaviate_version||`)

## Migration considerations

Before starting the migration process, be aware of the following:

- Migration is recommended primarily if you use BM25 or hybrid search and aren't satisfied with your current query times
- Migration will increase server resource load, especially during the re-indexing stage
- Migration can take hours for shards with millions of documents, depending on the number of searchable properties
- If possible, schedule migration to avoid large data imports/updates/deletes, especially during the re-indexing stage
- BlockMax WAND may return slightly different scores than WAND if you search on multiple properties or have a delete-heavy workflow, as it computes term statistics differently

## Migration process

The migration involves three main stages:

1. **Re-indexing**: Converting the internal representation from `mapcollection` to the inverted `blockmax` format
2. **Swapping**: Making the system use the new format while maintaining the ability to roll back
3. **Cleanup**: Cleaning up old data after successful migration

### Stage 1: Re-indexing

:::info

During this stage:

- Existing data will be re-ingested in the new BlockMax format
- New incoming data/updates/deletes will be persisted in both old and BlockMax formats (double writing)
- Searches will continue using the old format

:::

1. Restart your Weaviate instance with the following configuration:

```
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=weaviate
```

:::note

If your node has a different name than "weaviate", replace it with your actual node name.

:::

2. Monitor the migration progress by checking:

   ```
   http://<node_name>:<<debug_endpoint_port>/debug/index/rebuild/inverted/status?collection=<collection_name>
   ```

:::note

Replace:
- `<node_name>` with the name of your Weaviate node
- `<debug_endpoint_port>` with the actual port (default is `6060`)
- `<collection_name>` with the name of the collection being migrated.

:::

3. Track the migration status through the returned JSON:
   - Initially, you may see `collection not found or not ready`
   - During migration, the status will be `in progress`
   - Progress updates appear in the `latest_snapshot` field approximately every 5 minutes. If not, there is likely an error in the process, and you will need to check the logs for more information.
   ```json
   {
     "shards": [
       {
         "latest_snapshot": "2025-03-31T16:34:08.477558Z, 00000000-0000-0000-0000-00000003b38f, all 241446, idx 241446",
         "message": "migration started recently, no snapshots yet",
         "properties": "<searchable properties to migrate>",
         "shard": "<shard path>",
         "snapshot_count": "1",
         "objects_migrated": "241446",
         "start_time": "2025-03-31T16:33:20.21005Z",
         "status": "in progress"
       }
     ]
   }
   ```
   - When re-indexing completes, the `status` field will change to `reindexed` and the message will show `reindexing done, merging buckets`

### Stage 2: Swapping

:::info

During this stage:

- The system begins using the BlockMax format
- Double writing continues
- Old format data is kept on disk
- Rolling back to the old format remains possible

:::

After re-indexing is finished (`status` is `reindexed`), proceed to swap buckets:

1. Restart your Weaviate instance with these settings:

```
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=weaviate
REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=weaviate
```

2. After restart, check the status endpoint again:

   - The status will briefly change to `merged` (may be too fast to see in logs)
   - Then it will show `done`

3. At this point, keyword search on your node will start using BlockMax WAND by default
   - We recommend testing BM25 and hybrid search performance and results before proceeding to the next stage

### Stage 3: Cleanup

:::caution

Perform this step only after detailed validation and verification that your migration completed successfully. After this step, rolling back is no longer possible.

:::

:::info

During this stage:

- Double writing is disabled, using BlockMax format only
- Old format data is cleaned from disk

:::

When everything is working as expected and you've validated keyword search functionality, restart all nodes with:

```
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=true
REINDEX_MAP_TO_BLOCKMAX_TIDY_BUCKETS=true
```

## Multi-node deployments

For multi-node servers deployed with the same configuration, you can migrate one server at a time:

1. Set the node name for the current node being migrated.
2. Maintain a comma-separated list of already migrated nodes.

For a node currently being migrated (`<node_name>`) and previously migrated nodes (`<migrated_node_names>`):

```
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=<migrated_node_names>,<node_name>
REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=<migrated_node_names>,<node_name>
```

<details>
    <summary>Example steps for multi-node migration</summary>

With nodes named `weaviate-0`, `weaviate-1`, `weaviate-2`, etc.

1. Migrate `weaviate-0`:

```
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=weaviate-0
```

2. Once `weaviate-0` is done, migrate `weaviate-1`:

```
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=weaviate-0,weaviate-1
REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=weaviate-1
```

3. Once `weaviate-1` is done, migrate `weaviate-2`:

```
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=weaviate-0,weaviate-1,weaviate-2
REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=weaviate-1,weaviate-2
```

4. Repeat the process for other nodes.

5. At the end of migration, before cleaning up, you can use `true` instead of the full node list:

```
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=true
REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=true
```

</details>

## Multi-tenancy specific notes

Due to the dynamic nature of tenants, multi-tenancy collections behave slightly differently:

- With `REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP` set, tenants will be migrated as they are activated
- Deactivation stops migration and should be avoided as the migration may not make enough progress if the tenant is only activated for a short period
- Reactivation of a tenant (active → cold → active) is equivalent to a restart:
  - To swap buckets on a tenant, you need to reactivate it (with `REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=true` set)
  - For tidying up, if `REINDEX_MAP_TO_BLOCKMAX_TIDY_BUCKETS=true` is set, a swapped tenant will tidy on reactivation
  - Setting server variables between steps still requires a restart
- Tenants created during migration will be created in the old format and migrated like other tenants
  - They'll start using BlockMax format by default if `REINDEX_MAP_TO_BLOCKMAX_TIDY_BUCKETS` is set
- After the final tidying step, the server should keep all migration variables set to ensure all tenants are eventually migrated

## Monitoring migration status

The migration process progresses through several stages, which can be monitored via the status endpoint:

1. **Not active** (Multi-tenancy only)

   - Status: `shard_not_loaded`
   - Message: `shard not loaded`
   - Tenant isn't active

2. **Not Started**

   - Status: `not_started`
   - Message: `no searchable_map_to_blockmax found` or `no started.mig found`
   - No migration files exist yet or process hasn't been initiated

3. **Started**

   - Status: `started`
   - Records start time from started.mig
   - If properties.mig doesn't exist, message is `computing properties to reindex`

4. **In Progress**

   - Status: `in progress`
   - Tracks progress through `progress.mig.*` files (snapshots)
   - Updates `latest_snapshot` approximately every 15 minutes
   - If no progress files found, message is `no progress.mig.* files found, no snapshots created yet`

5. **Reindexed**

   - Status: `reindexed`
   - Message: `reindexing done` or `reindexing done, merging buckets`
   - Indicates reindexing is complete

6. **Merged**

   - Status: `merged`
   - Message: `merged reindex and ingest buckets`
   - Buckets have been merged but not yet swapped

7. **Swapped**

   - Status: `swapped`
   - Message: `swapped buckets` or `swapped X files`
   - Multiple `swapped.mig.*` files may exist

8. **Done**

   - Status: `done`
   - Message: `reindexing done`
   - Final state indicating migration is complete

9. **Error** (can occur at any stage)
   - Status: `error`
   - Various error messages depending on which file operation failed

## Troubleshooting

### Weaviate crashes during migration

- The conversion will resume when Weaviate is restarted if the migration variables are still set
- If your environment variables are reset during restart, the migration will stop
- With variables unset and new data incoming, you'll need to restart the migration process from the beginning

### Aborting migration and rolling back

If you have issues with the reindexing process and want to stop it:

1. Call the abort endpoint:

   ```
   http://<node_name>:<<debug_endpoint_port>/debug/index/rebuild/inverted/abort
   ```

2. To fully stop and rollback data to the initial stage, restart the server with:
   ```
   REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=true
   REINDEX_MAP_TO_BLOCKMAX_ROLLBACK=true
   ```

:::caution

Rolling back is only possible before cleanup!

:::

## Environment variable reference

- `REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=<node_names>`: Enables and starts the migration process that converts the `property_<property_name>_searchable` from mapcollection to the inverted blockmax format (double writes are done). Required for other `REINDEX_MAP_TO_BLOCKMAX_*` variables to work
- `REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=<node_names>`: Swaps `mapcollection` buckets to inverted/`blockmax`, keeping double writes. Only runs on restart and if migration is finished
- `REINDEX_MAP_TO_BLOCKMAX_UNSWAP_BUCKETS=<node_names>`: Unswaps inverted/`blockmax` buckets back to `mapcollection`, keeping double writes. Only runs on restart and if buckets were already swapped
- `REINDEX_MAP_TO_BLOCKMAX_TIDY_BUCKETS=<node_names>`: Deletes the `mapcollection` buckets and stops double writes
- `REINDEX_MAP_TO_BLOCKMAX_ROLLBACK=<node_names>`: Rollback migration process, restores `mapcollection` buckets (if not yet tidied) and removes created inverted/`blockmax` buckets

## Using BlockMax WAND in `v1.29` (technical preview)

:::caution BlockMax WAND technical preview

BlockMax WAND algorithm is available in `v1.29` as a **technical preview**. **We do not recommend using this feature in production environments in this version and suggest you use `v1.30+`.**

:::

**To use BlockMax WAND in Weaviate `v1.29`, it must be enabled prior to collection creation.** As of this version, Weaviate will not migrate existing collections to use BlockMax WAND.

Enable BlockMax WAND by setting the environment variables `USE_BLOCKMAX_WAND` and `USE_INVERTED_SEARCHABLE` to `true`.

Now, all new data added to Weaviate will use BlockMax WAND for BM25 and hybrid searches. However, preexisting data will continue to use the default WAND algorithm.
