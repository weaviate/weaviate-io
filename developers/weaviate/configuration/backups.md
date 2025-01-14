---
title: Backups
sidebar_position: 12
image: og/docs/configuration.jpg
# tags: ['configuration', 'backups']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/configure.backups.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/configure.backups-v3.py';
import TSCodeBackup from '!!raw-loader!/_includes/code/howto/configure.backups.backup.ts';
import TSCodeRestore from '!!raw-loader!/_includes/code/howto/configure.backups.restore.ts';
import TSCodeStatus from '!!raw-loader!/_includes/code/howto/configure.backups.status.ts';
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/configure.backups-v2.ts';
import GoCode from '!!raw-loader!/_includes/code/howto/configure.backups.go';
import JavaCode from '!!raw-loader!/_includes/code/howto/configure.backups.java';
import CurlCode from '!!raw-loader!/_includes/code/howto/configure.backups.sh';

Weaviate's Backup feature is designed to work natively with cloud technology. Most notably, it allows:

* Seamless integration with widely-used cloud blob storage, such as AWS S3, GCS, or Azure Storage
* Backup and Restore between different storage providers
* Single-command backup and restore
* Choice of backing up an entire instance, or selected collections only
* Easy migration to new environments

:::caution Important backup considerations

- **Version Requirements**: If you are running Weaviate `v1.23.12` or older, you must [update](../more-resources/migration/index.md) to `v1.23.13` or higher before restoring a backup to prevent data corruption.
- **[Multi-tenancy](../concepts/data.md#multi-tenancy) limitations**: Backups will only include `active` tenants. `Inactive` or `offloaded` tenants in multi-tenant collections will not be included. Be sure to [activate](../manage-data/multi-tenancy.md#activate-tenant) any required tenants before creating a backup.
:::

## Backup Quickstart

This quickstart demonstrates using backups in Weaviate using the local filesystem as a backup provider, which is suitable for development and testing environments.

### 1. Configure Weaviate

Add these environment variables to your Weaviate configuration (e.g. Docker or Kubernetes configuration file):

```yaml
# Enable the filesystem backup module
ENABLE_MODULES=backup-filesystem

# Set backup location (e.g. within a Docker container or on a Kubernetes pod)
BACKUP_FILESYSTEM_PATH=/var/lib/weaviate/backups
```

### 2. Start a backup

Restart Weaviate to apply the new configuration. Then, you are ready to start a backup:

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CreateBackup"
      endMarker="# END CreateBackup"
      language="py"
    />
  </TabItem>

  <TabItem value="pyv3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START CreateBackup"
      endMarker="# END CreateBackup"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeBackup}
      startMarker="// START CreateBackup"
      endMarker="// END CreateBackup"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// START CreateBackup"
      endMarker="// END CreateBackup"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START CreateBackup"
      endMarker="// END CreateBackup"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START CreateBackup"
      endMarker="// END CreateBackup"
      language="java"
    />
  </TabItem>

  <TabItem value="curl" label="curl">
    <FilteredTextBlock
      text={CurlCode}
      startMarker="# START CreateBackup"
      endMarker="# END CreateBackup"
      language="bash"
    />
  </TabItem>
</Tabs>

That's all there is to getting started with backups in Weaviate. The backup will be stored in the specified location on the local filesystem.

You can also:
- [Restore the backup](#restore-backup) to a Weaviate instance
- [Check the status](#asynchronous-status-checking) of the backup (if you did not wait for completion)
- [Cancel the backup](#cancel-backup) if needed

Note that local backups are not suitable for production environments. For production, use a cloud provider like S3, GCS, or Azure Storage.

The following sections provide more details on how to configure and use backups in Weaviate.

## Configuration

Weaviate supports four backup storage options:

| Provider | Module Name | Best For | Multi-Node Support |
|----------|------------|-----------|-------------------|
| AWS S3 | `backup-s3` | Production deployments, AWS environments | Yes |
| Google Cloud Storage | `backup-gcs` | Production deployments, GCP environments | Yes |
| Azure Storage | `backup-azure` | Production deployments, Azure environments | Yes |
| Local Filesystem | `backup-filesystem` | Development, testing, single-node setups | No |

To use any provider:
1. Enable the module
    - Add the module name to the `ENABLE_MODULES` environment variable
    - On Weaviate Cloud instances, a relevant default module is enabled
2. Configure the required modules
    - Option 1: Set the necessary environment variables
    - Option 2 (Kubernetes): Configure the [Helm chart values](#kubernetes-configuration)

Note multiple providers can be enabled simultaneously

### S3 (AWS or S3-compatible)

- Works with AWS S3 and S3-compatible services (e.g., MinIO)
- Supports multi-node deployments
- Recommended for production use

To configure `backup-s3`, you need to enable the module and provide the necessary configuration.

#### Enable module

Add `backup-s3` to the `ENABLE_MODULES` environment variable. For example, to enable the S3 module along with the `text2vec-cohere` module, set:

```
ENABLE_MODULES=backup-s3,text2vec-cohere
```

#### S3 Configuration (vendor-agnostic)

This configuration applies to any S3-compatible backend.

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_S3_BUCKET` | yes | The name of the S3 bucket for all backups. |
| `BACKUP_S3_PATH` | no | The root path inside your bucket that all your backups will be copied into and retrieved from. <br/><br/>Optional, defaults to `""` which means that the backups will be stored in the bucket root instead of a sub-folder. |
| `BACKUP_S3_ENDPOINT` | no | The S3 endpoint to be used. <br/><br/>Optional, defaults to `"s3.amazonaws.com"`. |
| `BACKUP_S3_USE_SSL` | no | Whether the connection should be secured with SSL/TLS. <br/><br/>Optional, defaults to `"true"`. |

#### S3 Configuration (AWS-specific)

For AWS, provide Weaviate with authentication details. You can choose between access-key or ARN-based authentication:

#### Option 1: With IAM and ARN roles

The backup module will first try to authenticate itself using AWS IAM. If the authentication fails then it will try to authenticate with `Option 2`.

#### Option 2: With access key and secret access key

| Environment variable | Description |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The id of the AWS access key for the desired account. |
| `AWS_SECRET_ACCESS_KEY` | The secret AWS access key for the desired account. |
| `AWS_REGION` | (Optional) The AWS Region. If not provided, the module will try to parse `AWS_DEFAULT_REGION`. |


### GCS (Google Cloud Storage)

- Works with Google Cloud Storage
- Supports multi-node deployments
- Recommended for production use

To configure `backup-gcs`, you need to enable the module and provide the necessary configuration.

#### Enable module

Add `backup-gcs` to the `ENABLE_MODULES` environment variable. For example, to enable the S3 module along with the `text2vec-cohere` module, set:

```
ENABLE_MODULES=backup-gcs,text2vec-cohere
```

#### GCS bucket-related variables

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_GCS_BUCKET` | yes | The name of the GCS bucket for all backups. |
| `BACKUP_GCS_USE_AUTH` | no | Whether or not credentials will be used for authentication. Defaults to `true`. A case for `false` would be for use with a local GCS emulator. |
| `BACKUP_GCS_PATH` | no | The root path inside your bucket that all your backups will be copied into and retrieved from. <br/><br/>Optional, defaults to `""` which means that the backups will be stored in the bucket root instead of a sub-folder. |

#### Google Application Default Credentials

The `backup-gcs` module follows the Google [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials) best-practices. This means that credentials can be discovered through the environment, through a local Google Cloud CLI setup, or through an attached service account.

This makes it easy to use the same module in different setups. For example, you can use the environment-based approach in production, and the CLI-based approach on your local machine. This way you can easily pull a backup that was created in a remote environment to your local system. This can be helpful in debugging an issue, for example.

#### Environment-based Configuration

| Environment variable | Example value | Description |
| --- | --- | --- |
| `GOOGLE_APPLICATION_CREDENTIALS` | `/your/google/credentials.json` | The path to the secret GCP service account or workload identity file. |
| `GCP_PROJECT` | `my-gcp-project` | Optional. If you use a service account with `GOOGLE_APPLICATION_CREDENTIALS` the service account will already contain a Google project. You can use this variable to explicitly set a project if you are using user credentials which may have access to more than one project. |

### Azure Storage

- Works with Microsoft Azure Storage
- Supports multi-node deployments
- Recommended for production use

To configure `backup-azure`, you need to enable the module and provide the necessary configuration.

#### Enable module

Add `backup-azure` to the `ENABLE_MODULES` environment variable. For example, to enable the Azure module along with the `text2vec-cohere` module, set:

```
ENABLE_MODULES=backup-azure,text2vec-cohere
```

In addition to enabling the module, you need to configure it using environment variables. There are container-related variables, as well as credential-related variables.

#### Azure container-related variables

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_AZURE_CONTAINER` | yes | The name of the Azure container for all backups. |
| `BACKUP_AZURE_PATH` | no | The root path inside your container that all your backups will be copied into and retrieved from. <br/><br/>Optional, defaults to `""` which means that the backups will be stored in the container root instead of a sub-folder. |

#### Azure Credentials

There are two different ways to authenticate against Azure with `backup-azure`. You can use either:

1. An Azure Storage connection string, or
1. An Azure Storage account name and key.

Both options can be implemented using environment variables as follows:

| Environment variable | Required | Description |
| --- | --- | --- |
| `AZURE_STORAGE_CONNECTION_STRING` | yes (*see note) | A string that includes the authorization information required ([Azure documentation](https://learn.microsoft.com/en-us/azure/storage/common/storage-configure-connection-string)). <br/><br/> This variable is checked and used first before `AZURE_STORAGE_ACCOUNT`. |
| `AZURE_STORAGE_ACCOUNT` | yes (*see note) | The name of your Azure Storage account. |
| `AZURE_STORAGE_KEY` | no | An access key for your Azure Storage account. <br/><br/>For anonymous access, specify `""`. |

If both of `AZURE_STORAGE_CONNECTION_STRING` and `AZURE_STORAGE_ACCOUNT` are provided, Weaviate will use `AZURE_STORAGE_CONNECTION_STRING` to authenticate.

:::note At least one credential option is required
At least one of `AZURE_STORAGE_CONNECTION_STRING` or `AZURE_STORAGE_ACCOUNT` must be present.
:::


### Filesystem

- Works with Google Cloud Storage
- Supports single-node deployments only
- Not recommended for production use

To configure `backup-filesystem`, you need to enable the module and provide the necessary configuration.

#### Enable module

Add `backup-filesystem` to the `ENABLE_MODULES` environment variable. For example, to enable the S3 module along with the `text2vec-cohere` module, set:

```
ENABLE_MODULES=backup-filesystem,text2vec-cohere
```

#### Backup Configuration

In addition to enabling the module, you need to configure it using environment variables:

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_FILESYSTEM_PATH` | yes | The root path that all your backups will be copied into and retrieved from |

### Other Backup Backends

If you are missing your desired backup module, you can open a feature request on the [Weaviate GitHub repository](https://github.com/weaviate/weaviate/issues). We are also open to community contributions for new backup modules.

## API

For REST API documentation, see the [Backups section](https://weaviate.io/developers/weaviate/api/rest#tag/backups).

### Create Backup

Once the modules are enabled and the configuration is provided, you can start a backup on any running instance with a single request.

You can choose to include or exclude specific collections in the backup. If you do not specify any collections, all collections are included by default.

The `include` and `exclude` options are mutually exclusive. You can set none or exactly one of those.

##### Available `config` object properties

| name | type | required | default | description |
| ---- | ---- | ---- | ---- |---- |
| `CPUPercentage`   | number | no | `50%` | An optional integer to set the desired CPU core utilization ranging from 1%-80%. |
| `ChunkSize`       | number | no | `128MB` | An optional integer represents the desired size for chunks. Weaviate will attempt to come close the specified size, with a minimum of 2MB, default of 128MB, and a maximum of 512MB.|
| `CompressionLevel`| string | no | `DefaultCompression` | An optional compression level used by compression algorithm from options. (`DefaultCompression`, `BestSpeed`, `BestCompression`) Weaviate uses [gzip compression](https://pkg.go.dev/compress/gzip#pkg-constants) by default. |
| `Path`            | string | no | `""` | An optional string to manually set the backup location. If not provided, the backup will be stored in the default location. Introduced in Weaviate `v1.27.2`. |

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CreateBackup"
      endMarker="# END CreateBackup"
      language="py"
    />
  </TabItem>

  <TabItem value="pyv3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START CreateBackup"
      endMarker="# END CreateBackup"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeBackup}
      startMarker="// START CreateBackup"
      endMarker="// END CreateBackup"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// START CreateBackup"
      endMarker="// END CreateBackup"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START CreateBackup"
      endMarker="// END CreateBackup"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START CreateBackup"
      endMarker="// END CreateBackup"
      language="java"
    />
  </TabItem>

  <TabItem value="curl" label="curl">
    <FilteredTextBlock
      text={CurlCode}
      startMarker="# START CreateBackup"
      endMarker="# END CreateBackup"
      language="bash"
    />
  </TabItem>
</Tabs>


While you are waiting for a backup to complete, [Weaviate stays available](#read--write-requests-while-a-backup-is-running).


#### Asynchronous Status Checking

All client implementations have a "wait for completion" option which will poll the backup status in the background and only return once the backup has completed (successfully or unsuccessfully).

If you set the "wait for completion" option to false, you can also check the status yourself using the Backup Creation Status API.

```js
GET /v1/backups/{backend}/{backup_id}
```

#### Parameters

##### URL Parameters

| Name | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the request to create the backup. |

The response contains a `"status"` field. If the status is `SUCCESS`, the backup is complete. If the status is `FAILED`, an additional error is provided.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START StatusCreateBackup"
      endMarker="# END StatusCreateBackup"
      language="py"
    />
  </TabItem>
  <TabItem value="pyv3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START StatusCreateBackup"
      endMarker="# END StatusCreateBackup"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeStatus}
      startMarker="// START StatusCreateBackup"
      endMarker="// END StatusCreateBackup"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// START StatusCreateBackup"
      endMarker="// END StatusCreateBackup"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START StatusCreateBackup"
      endMarker="// END StatusCreateBackup"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START StatusCreateBackup"
      endMarker="// END StatusCreateBackup"
      language="java"
    />
  </TabItem>

  <TabItem value="curl" label="curl">
    <FilteredTextBlock
      text={CurlCode}
      startMarker="# START StatusCreateBackup"
      endMarker="# END StatusCreateBackup"
      language="bash"
    />
  </TabItem>
</Tabs>

### Cancel Backup

An ongoing backup can be cancelled at any time. The backup process will be stopped, and the backup will be marked as `CANCELLED`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CancelBackup"
      endMarker="# END CancelBackup"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeStatus}
      startMarker="// START CancelBackup"
      endMarker="// END CancelBackup"
      language="ts"
    />
  </TabItem>
</Tabs>

This operation is particularly useful if you have started a backup by accident, or if you would like to stop a backup that is taking too long.

### Restore Backup

You can restore any backup to any machine as long as the name and number of nodes between source and target are identical. The backup does not need to be created on the same instance. Once a backup backend is configured, you can restore a backup with a single request.

As with backup creation, the `include` and `exclude` options are mutually exclusive. You can set none or exactly one of those. In a restore operation, `include` and `exclude` are relative to the collections contained in the backup. The restore process is not aware of collections that existed on the source machine if they were not part of the backup.

Note that a restore fails if any of the collections already exist on this instance.

:::caution Restoring backups from `v1.23.12` and older
If you are running Weaviate `v1.23.12` or older, first **[update Weaviate](../more-resources/migration/index.md) to version 1.23.13** or higher before restoring a backup.
Versions prior to `v1.23.13` had a bug that could lead to data not being stored correctly from a backup of your data.
:::

##### Available `config` object properties

| name | type | required | default | description |
| ---- | ---- | ---- | ---- |---- |
| `cpuPercentage`   | number | no | `50%` | An optional integer to set the desired CPU core utilization ranging from 1%-80%. |
| `Path`            | string | Required if created at a custom path | `""` | An optional string to manually set the backup location. If not provided, the backup will be restored from the default location. Introduced in Weaviate `v1.27.2`. |

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RestoreBackup"
      endMarker="# END RestoreBackup"
      language="py"
    />
  </TabItem>
  <TabItem value="pyv3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START RestoreBackup"
      endMarker="# END RestoreBackup"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeRestore}
      startMarker="// START RestoreBackup"
      endMarker="// END RestoreBackup"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// START RestoreBackup"
      endMarker="// END RestoreBackup"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START RestoreBackup"
      endMarker="// END RestoreBackup"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START RestoreBackup"
      endMarker="// END RestoreBackup"
      language="java"
    />
  </TabItem>

  <TabItem value="curl" label="curl">
    <FilteredTextBlock
      text={CurlCode}
      startMarker="# START RestoreBackup"
      endMarker="# END RestoreBackup"
      language="bash"
    />
  </TabItem>
</Tabs>


#### Asynchronous Status Checking

All client implementations have a "wait for completion" option which will poll the restore status in the background and only return once the restore has completed (successfully or unsuccessfully).

If you set the "wait for completion" option to false, you can also check the status yourself using the Backup Restore Status API.

The response contains a `"status"` field. If the status is `SUCCESS`, the restore is complete. If the status is `FAILED`, an additional error is provided.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START StatusRestoreBackup"
      endMarker="# END StatusRestoreBackup"
      language="py"
    />
  </TabItem>
  <TabItem value="pyv3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START StatusRestoreBackup"
      endMarker="# END StatusRestoreBackup"
      language="pyv3"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeStatus}
      startMarker="// START StatusRestoreBackup"
      endMarker="// END StatusRestoreBackup"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// START StatusRestoreBackup"
      endMarker="// END StatusRestoreBackup"
      language="tsv2"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START StatusRestoreBackup"
      endMarker="// END StatusRestoreBackup"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START StatusRestoreBackup"
      endMarker="// END StatusRestoreBackup"
      language="java"
    />
  </TabItem>

  <TabItem value="curl" label="curl">
    <FilteredTextBlock
      text={CurlCode}
      startMarker="# START StatusRestoreBackup"
      endMarker="# END StatusRestoreBackup"
      language="bash"
    />
  </TabItem>
</Tabs>

## Kubernetes configuration

When running Weaviate on Kubernetes, you can configure the backup provider using Helm chart values.

These values are available under the `backups` key in the `values.yaml` file. Refer to the inline documentation in the `values.yaml` file for more information.

<!-- TODO - update this page with proper Helm docs. -->

## Technical Considerations

### Read & Write requests while a backup is running

The backup process is designed to be minimally invasive to a running setup. Even on very large setups, where terabytes of data need to be copied, Weaviate stays available during backup. It even accepts write requests while a backup process is running. This sections explains how backups work under the hood and why Weaviate can safely accept writes while a backup is copied.

Weaviate uses a custom [LSM Store](../concepts/storage.md#object-and-inverted-index-store) for its object store and inverted index. LSM stores are a hybrid of immutable disk segments and an in-memory structure called a memtable that accepts all writes (including updates and deletes). Most of the time, files on disk are immutable, there are only three situations where files are changed:

1. Anytime a memtable is flushed. This creates a new segment. Existing segments are not changed.
2. Any write into the memtable is also written into a Write-Ahead-Log (WAL). The WAL is only needed for disaster-recovery. Once a segment has been orderly flushed, the WAL can be discarded.
3. There is an async background process called Compaction that optimizes existing segments. It can merge two small segments into a single larger segment and remove redundant data as part of the process.

Weaviate's Backup implementation makes use of the above properties in the following ways:

1. Weaviate first flushes all active memtables to disk. This process takes in the 10s or 100s of milliseconds. Any pending write requests simply waits for a new memtable to be created without any failing requests or substantial delays.
2. Now that the memtables are flushed, there is a guarantee: All data that should be part of the backup is present in the existing disk segments. Any data that will be imported after the backup request ends up in new disk segments. The backup references a list of immutable files.
3. To prevent a compaction process from changing the files on disk while they are being copied, compactions are temporarily paused until all files have been copied. They are automatically resumed right after.

This way the backup process can guarantee that the files that are transferred to the remote backend are immutable (and thus safe to copy) even with new writes coming in. Even if it takes minutes or hours to backup a very large setup, Weaviate stays available without any user impact while the backup process is running.

It is not just safe - but even recommended - to create backups on live production instances while they are serving user requests.

### Async nature of the Backup API

The backup API is built in a way that no long-running network requests are required. The request to create a new backup returns immediately. It does some basic validation, then returns to the user. The backup is now in status `STARTED`. To get the status of a running backup you can poll the [status endpoint](#asynchronous-status-checking). This makes the backup itself resilient to network or client failures.

If you would like your application to wait for the background backup process to complete, you can use the "wait for completion" feature that is present in all language clients. The clients will poll the status endpoint in the background and block until the status is either `SUCCESS` or `FAILED`. This makes it easy to write simple synchronous backup scripts, even with the async nature of the API.

## Other Use cases

### Migrating to another environment

The flexibility around backup providers opens up new use cases. Besides using the backup & restore feature for disaster recovery, you can also use it for duplicating environments or migrating between clusters.

For example, consider the following situation: You would like to do a load test on production data. If you would do the load test in production it might affect users. An easy way to get meaningful results without affecting uses it to duplicate your entire environment. Once the new production-like "loadtest" environment is up, create a backup from your production environment and restore it into your "loadtest" environment. This even works if the production environment is running on a completely different cloud provider than the new environment.

## Troubleshooting and notes

- Single node backup is available starting in Weaviate `v1.15`. Multi-node backups is available starting in `v1.16`.
- In some cases, backups can take a long time, or get "stuck", causing Weaviate to be unresponsive. If this happens, you can [cancel the backup](#cancel-backup) and try again.
- If a backup module is misconfigured, such as having an invalid backup path, it can cause Weaviate to not start. Review the system logs for any errors.

## Related pages
- [References: REST API: Backups](/developers/weaviate/api/rest#tag/backups)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
