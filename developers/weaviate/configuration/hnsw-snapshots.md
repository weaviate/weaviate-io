---
title: HNSW Snapshots
sidebar_position: 47
sidebar_label: HNSW Snapshots
description: Learn about HNSW snapshots in Weaviate for faster startup times and how to manage them.
---

:::info Added in `v1.31`
:::

HNSW (Hierarchical Navigable Small World) snapshots can significantly reduce startup times for instances with large vector indexes.

By default, HNSW snapshotting is **disabled**. To use this feature, configure the [environment variable](../config-refs/env-vars/index.md) shown below.

:::info Concepts: HNSW snapshots
See this [concepts page](../concepts/storage.md#hnsw-snapshots) for a detailed description.
:::

## 1. Enabling HNSW snapshots

Set `PERSISTENCE_HNSW_DISABLE_SNAPSHOTS` to `false` to enable HNSW snapshotting. (Default: `true`)

## 2. Configuring snapshot creation

Set the following optional environment variables to configure the snapshotting behavior.

### Snapshot on startup

Enable or disable snapshot creation on startup:

- `PERSISTENCE_HNSW_SNAPSHOT_ON_STARTUP`: If `true`,
  - **Default:** `true`

### Periodic snapshots

Set the following to configure periodic snapshot creation. Note **all** of the following conditions must be met to trigger a snapshot:

1.  **A time interval has passed:**

    - `PERSISTENCE_HNSW_SNAPSHOT_INTERVAL_SECONDS`: The minimum time in seconds since the previous snapshot.
      - **Default:** `21600` seconds (6 hours)

2.  **Sufficient new commit logs (by number):**

    - `PERSISTENCE_HNSW_SNAPSHOT_MIN_DELTA_COMMITLOGS_NUMBER`: The minimum number of new commit log files created since the last snapshot.
      - **Default:** `1`

3.  **Sufficient new commit logs (by size percentage):**
    - `PERSISTENCE_HNSW_SNAPSHOT_MIN_DELTA_COMMITLOGS_SIZE_PERCENTAGE`: The minimum total size of new commit logs (as a percentage of the previous snapshot's size) required to trigger a new snapshot.
      - **Default:** `5` (meaning 5% of the previous snapshot's size in new commit logs). For example, if the previous snapshot was 1000MB, at least 50MB of new commit log data is required.

## Further resources

- [Concepts: Storage - Persistence and Crash Recovery](../concepts/storage.md#persistence-and-crash-recovery)

## Questions and feedback

import DocsFeedback from '/\_includes/docs-feedback.mdx';

<DocsFeedback/>
