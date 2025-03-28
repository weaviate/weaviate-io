---
title: 1.30 (BlockMax WAND)
sidebar_position: 9
image: og/docs/more-resources.jpg
# tags: ['migration']
---

# Weaviate 1.30 migration guide

This guide covers how to migrate existing data to use the BlockMax WAND algorithm for the inverted index.

## Assumptions & requirements

This migration guide assumes that you have:

- A Weaviate version before `v1.30` that doesn't use the BlockMax WAND algorithm
- Async replication enabled and a properly initialized hashtree (verified by logs showing either `"msg":"hashtree successfully initialized"` or `hashbeat iteration successfully completed: no differences were found`)

## Migration overview

All BM25 and hybrid searches will use BlockMax WAND algorithm for searches, potentially improving search performance.
However, any existing collections will continue to use the default (pre-BlockMax WAND) disk structure and search algorithm. To take advantage of BlockMax WAND, you must migrate your existing collections.

This migration process involves:
1. Converting the `property_<property_name>_searchable` from `mapcollection` to the inverted `blockmax` format
2. Swapping the original buckets to use the new format
3. Cleaning up old data after successful migration

:::note
This guide is subject to changes as the process is refined. The latest image tag to use for migration is:  
`semitechnologies/weaviate:1.29.1-ea997c7`
:::

### Step 1: Start the migration

1. Restart your Weaviate instance with the following configuration:

```
USE_INVERTED_SEARCHABLE=true
USE_BLOCKMAX_WAND=true
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=weaviate
REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=weaviate
MAINTENANCE_NODES=weaviate
```

:::note
If your node has a different name than "weaviate", replace it with your actual node name in the configuration above.
:::

2. Monitor the migration progress by checking:
   ```
   http://localhost:6060/debug/index/rebuild/inverted/status?collection=Products_v2
   ```
   
   Replace "Products_v2" with your actual collection name if different.

   The migration process may take some time to start (up to an hour, depending on shard vector initialization time).

3. Track the migration status through the returned JSON:
   - During migration, the status will be "in progress"
   - Progress updates appear in the "latest_snapshot" field approximately every 15 minutes
   - When complete, the "status" field will change to "reindexed" and the message will show "reindexing done, merging buckets"

4. After migration completes, restart your Weaviate instance with these settings:

```
USE_INVERTED_SEARCHABLE=true
USE_BLOCKMAX_WAND=true
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=weaviate
REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=weaviate
```

5. The status will briefly change to "merged" and then "done"

### Step 2: Finalize the migration

Once the migration is complete, you can simplify the configuration:

```
USE_BLOCKMAX_WAND=true
USE_INVERTED_SEARCHABLE=true
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=true
REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=true
```

### Step 3: Clean up old data

:::caution
Perform this step ONLY after detailed validation and verification that your migration completed successfully.
:::

To delete the old data format and stop double writes:

```
USE_BLOCKMAX_WAND=true
USE_INVERTED_SEARCHABLE=true
REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=true
REINDEX_MAP_TO_BLOCKMAX_TIDY_BUCKETS=true
```

### Final configuration

After the migration and cleanup is complete, use:

```
USE_BLOCKMAX_WAND=true
USE_INVERTED_SEARCHABLE=true
```

## Monitoring migration status

The migration process progresses through several stages:

1. **Not Started**
   - Status: "not_started"
   - Message: "no searchable_map_to_blockmax found" or "no started.mig found"

2. **Started**
   - Status: "started"
   - Records start time from started.mig

3. **In Progress**
   - Status: "in progress"
   - Tracks progress through progress.mig.* files
   - Updates "latest_snapshot" approximately every 15 minutes

4. **Reindexed**
   - Status: "reindexed"
   - Message: "reindexing done" or "reindexing done, merging buckets"

5. **Merged**
   - Status: "merged"
   - Message: "merged reindex and ingest buckets"

6. **Swapped**
   - Status: "swapped"
   - Message: "swapped buckets" or "swapped X files"

7. **Done**
   - Status: "done"
   - Message: "reindexing done"

8. **Error** (can occur at any stage)
   - Status: "error"
   - Various error messages depending on which file operation failed

## Troubleshooting

### Weaviate crashes during migration

- The conversion will resume when Weaviate is restarted if the migration variables are still set
- If your environment variables are reset during restart, the migration will stop. In this case, with variables unset and new data incoming, you'll need to restart the migration process from the beginning

### Rolling back the migration

If you need to roll back:

- To roll back before completion, use `REINDEX_MAP_TO_BLOCKMAX_ROLLBACK=weaviate` (replace with your node name if different)
- After a restart with `REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS`, rolling back requires manually moving a set of folders (contact support for assistance)

## Environment variable reference

- `USE_INVERTED_SEARCHABLE=true`: All new searchable buckets will be written in the inverted `blockmax` ready format
- `USE_BLOCKMAX_WAND=true`: Use BlockMax WAND as the default search algorithm (will be the default in 1.30)
- `REINDEX_MAP_TO_BLOCKMAX_AT_STARTUP=<node names>`: Enables and starts the migration process
- `REINDEX_MAP_TO_BLOCKMAX_SWAP_BUCKETS=<node names>`: Swaps `mapcollection` buckets to inverted/`blockmax`, keeping double writes
- `REINDEX_MAP_TO_BLOCKMAX_UNSWAP_BUCKETS=<node names>`: Unswaps inverted/`blockmax` buckets back to `mapcollection`
- `REINDEX_MAP_TO_BLOCKMAX_TIDY_BUCKETS=<node names>`: Deletes the `mapcollection` buckets and stops double writes
- `REINDEX_MAP_TO_BLOCKMAX_ROLLBACK=<node names>`: Rollback migration process, restores `mapcollection` buckets

## Using BlockMax WAND in `v1.29`

:::caution BlockMax WAND technical preview
BlockMax WAND algorithm is available in `v1.29` as a **technical preview**. **We do not recommend using this feature in production environments in this version and suggest you use `v1.30`.**
:::

**To use BlockMax WAND in Weaviate `v1.29`, it must be enabled prior to collection creation.** As of this version, Weaviate will not migrate existing collections to use BlockMax WAND.

Enable BlockMax WAND by setting the [environment variables](../../config-refs/env-vars.md#general) `USE_BLOCKMAX_WAND` and `USE_INVERTED_SEARCHABLE` to `true`.

Now, all new data added to Weaviate will use BlockMax WAND for BM25 and hybrid searches. However, preexisting data will continue to use the default WAND algorithm.