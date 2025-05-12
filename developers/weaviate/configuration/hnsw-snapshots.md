---
title: HNSW Snapshots
sidebar_label: HNSW Snapshots
description: Learn about HNSW snapshots in Weaviate for faster startup times and how to manage them.
---

:::info Added in `v1.31`
:::

HNSW (Hierarchical Navigable Small World) snapshots is a feature in Weaviate designed to significantly reduce startup times for instances with large vector indexes. This guide explains what HNSW snapshots are, their benefits, and how to configure them.

## What are HNSW Snapshots?

Traditionally, when Weaviate starts, it reconstructs the HNSW index state by replaying entries from its Write-Ahead Log (WAL), also known as the commit log. For large indexes, this process can be time-consuming.

A snapshot is a representation of the HNSW index's state at a specific point in time. When Weaviate starts, if a valid snapshot exists and snapshotting is enabled, Weaviate loads this snapshot into memory first. It then only needs to process WAL entries made _after_ the snapshot was taken. This significantly reduces the number of operations compared to replaying the entire WAL from the beginning.

:::note
If a snapshot cannot be loaded for any reason (e.g., corruption), it is safely removed, and Weaviate automatically falls back to the traditional method of loading the full commit log.
:::

## 1. Enabling HNSW snapshots

By default, HNSW snapshotting is **disabled**. To enable and use this feature, you must set the following [environment variable](../config-refs/env-vars/index.md):

- `PERSISTENCE_HNSW_DISABLE_SNAPSHOTS`: Set to `false` to enable HNSW snapshotting.
  - **Default:** `true` (Snapshots are disabled)

Setting this to `false` allows Weaviate to create and use snapshots according to the other configuration settings.

## 2. Configuring snapshot creation

Once enabled, you can control how and when snapshots are created using several environment variables.

### Snapshot on startup

You can configure Weaviate to attempt creating a snapshot during its startup sequence.

- `PERSISTENCE_HNSW_SNAPSHOT_ON_STARTUP`: If `true`, Weaviate will try to create a new snapshot during startup if there are changes in the commit log since the last snapshot. If there are no changes, then the existing snapshot will be loaded.
  - **Default:** `true`

### Periodic snapshots

Weaviate can periodically create new HNSW snapshots based on the previous snapshot and newer (delta) commit logs. This is handled by the same background process that manages commit log combining and condensing, ensuring stability as the commit logs used for snapshot creation are not mutable during this process.

A new periodic snapshot is created only if **all** the following conditions are met:

1.  **Interval has passed:**

    - `PERSISTENCE_HNSW_SNAPSHOT_INTERVAL_SECONDS`: The minimum time in seconds that must have passed since the previous snapshot was created.
      - **Default:** `21600` seconds (6 hours)

2.  **Sufficient new commit logs (by number):**

    - `PERSISTENCE_HNSW_SNAPSHOT_MIN_DELTA_COMMITLOGS_NUMBER`: The minimum number of new commit log files created since the last snapshot.
      - **Default:** `1`

3.  **Sufficient new commit logs (by size percentage):**
    - `PERSISTENCE_HNSW_SNAPSHOT_MIN_DELTA_COMMITLOGS_SIZE_PERCENTAGE`: The minimum total size of new commit logs (as a percentage of the previous snapshot's size) required to trigger a new snapshot.
      - **Default:** `5` (meaning 5% of the previous snapshot's size in new commit logs)
      - Example: If the previous snapshot was 1000MB, at least 50MB of new commit log data is required.

## Further resources

- [Concepts: Storage](../concepts/storage.md#persistence-and-crash-recovery)

## Questions and feedback

import DocsFeedback from '/\_includes/docs-feedback.mdx';

<DocsFeedback/>
