---
title: Migration Guide
sidebar_position: 10
image: og/docs/more-resources.jpg
# tags: ['migration']
---

## Upgrades

Weaviate is under active development, with new features and improvements being added regularly, including bugfixes. To take advantage of these updates, we recommend upgrading your Weaviate instance regularly.

### General upgrade instructions

When upgrading Weaviate, we recommend that you:

1. Create a complete [backup](../../configuration/backups.md) of your current Weaviate instance before beginning any upgrade process.
1. Plan to upgrade one minor version at a time, always using the latest patch version of each minor release.

This approach of upgrading one minor version at a time helps to minimize the risk of issues during the upgrade process, by mirroring our testing and release process. Upgrading to the latest patch version of each minor release ensures that you have the latest bugfixes and improvements.

:::tip Scenario: upgrading from `v1.25.10` to `v1.27`

Between `v1.25` and `v1.27`, there are two minor versions, `v1.26` and `v1.27`. So:
<br/>

1. Create a backup of your current Weaviate instance.
1. Go to the [Weaviate releases page](https://github.com/weaviate/weaviate/tags):
    1. Find the latest `v1.26` patch version (e.g.: `1.26.11`).
    1. Find the latest `v1.27` patch version (e.g.: `1.27.5`).
1. Upgrade to the latest patch version of `v1.26`.
1. Upgrade to the latest patch version of `v1.27`.

:::

## Version-specific migration guides

### Raft Migration (v1.25.0+)

Weaviate `v1.25.0` introduced Raft [as the consensus algorithm for cluster metadata](../../concepts/replication-architecture/cluster-architecture.md#metadata-replication-raft). This requires a one-time migration of the cluster metadata.

In [Docker-based self-hosted instances](../../installation/docker-compose.md), the migration is automatic.

In [Kubernetes-based self-hosted instances](../../installation/kubernetes.md), you must perform a manual migration step. For more information, see the [Weaviate `v1.25.0` migration guide](./weaviate-1-25.md).

This was a significant change to the Weaviate architecture. Accordingly, we suggest performing another backup after upgrading to `v1.25.latest`, before proceeding with further upgrades to ensure that you have a recent backup.

### Backup Restoration Fix (v1.23.13+)

Before `v1.23.13`, there was a bug with the backup restoration process, which could lead to data not being stored correctly.

If you are upgrading from a version before `v1.23.13`, we recommend that you:

1. Create a backup of your current Weaviate instance.
2. Upgrade to at least `v1.23.13` (preferably to `v1.23.16`) or higher, using the [general upgrade instructions above](#general-upgrade-instructions).
3. Restore your backup to the upgraded instance.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
