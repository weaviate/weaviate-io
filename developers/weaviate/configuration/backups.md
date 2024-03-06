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
import TSCode from '!!raw-loader!/_includes/code/howto/configure.backups.ts';
import GoCode from '!!raw-loader!/_includes/code/howto/configure.backups.go';
import JavaCode from '!!raw-loader!/_includes/code/howto/configure.backups.java';
import CurlCode from '!!raw-loader!/_includes/code/howto/configure.backups.sh';


:::info Related pages
- [References: REST API: Backups](../api/rest/backups.md)
:::

## Introduction

Weaviate's Backup feature is designed to feel very easy to use and work natively with cloud technology. Most notably, it allows:

* Seamless integration with widely-used cloud blob storage, such as AWS S3, GCS or Azure
* Backup and Restore between different storage providers
* Single-command backup and restore from the REST API
* Choice of backing up an entire instance, or selected classes only
* Zero downtime & minimal impact for your users when backups are running
* Easy Migration to new environments

:::note
_The backup functionality was introduced in Weaviate `v1.15`, but for single-node instances only. Support for multi-node backups was introduced in `v1.16`_.
:::


## Configuration

In order to perform backups, a backup provider module must be activated. Multiple backup providers can be active at the same time. Currently `backup-s3`, `backup-gcs`, `backup-azure`, and `backup-filesystem` modules are available for S3, GCS, Azure or filesystem backups respectively.

As it is built on Weaviate's [module system](/developers/weaviate/configuration/modules.md), additional providers can be added in the future.

All service-discovery and authentication-related configuration is set using
environment variables.

### S3 (AWS or S3-compatible)

Use the `backup-s3` module to enable backing up to and restoring from any S3-compatible blob storage. This includes AWS S3, and MinIO.

To enable the module, add its name to the `ENABLE_MODULES` environment variable. Modules are comma-separated. To enable the module along with the `text2vec-transformers` module for example, set:

```
ENABLE_MODULES=backup-s3,text2vec-transformers
```

#### S3 Configuration (vendor-agnostic)
In addition to enabling the module, you need to configure it using environment variables. This configuration applies to any S3-compatible backend.

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_S3_BUCKET` | yes | The name of the S3 bucket for all backups. |
| `BACKUP_S3_PATH` | no | The root path inside your bucket that all your backups will be copied into and retrieved from. <br/><br/>Optional, defaults to `""` which means that the backups will be stored in the bucket root instead of a sub-folder. |
| `BACKUP_S3_ENDPOINT` | no | The S3 endpoint to be used. <br/><br/>Optional, defaults to `"s3.amazonaws.com"`. |
| `BACKUP_S3_USE_SSL` | no | Whether the connection should be secured with SSL/TLS. <br/><br/>Optional, defaults to `"true"`. |

#### S3 Configuration (AWS-specific)

In addition to the vendor-agnostic configuration from above, you can set AWS-specific configuration for authentication. You can choose between access-key or ARN-based authentication:

#### Option 1: With IAM and ARN roles

The backup module will first try to authenticate itself using AWS IAM. If the authentication fails then it will try to authenticate with `Option 2`.

#### Option 2: With access key and secret access key

| Environment variable | Description |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The id of the AWS access key for the desired account. |
| `AWS_SECRET_ACCESS_KEY` | The secret AWS access key for the desired account. |
| `AWS_REGION` | The AWS Region. If not provided, the module will try to parse `AWS_DEFAULT_REGION`. |


### GCS (Google Cloud Storage)

Use the `backup-gcs` module to enable backing up to and restoring from any Google Cloud Storage bucket.

To enable the module, add its name to the `ENABLE_MODULES` environment variable. Modules are comma-separated. To enable the module along with the `text2vec-transformers` module for example, set:

```
ENABLE_MODULES=backup-gcs,text2vec-transformers
```

In addition to enabling the module, you need to configure it using environment variables. There are bucket-related variables, as well as credential-related variables.

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

Use the `backup-azure` module to enable backing up to and restoring from any Microsoft Azure Storage container.

To enable the module, add its name to the `ENABLE_MODULES` environment variable. Modules are comma-separated. To enable the module along with the `text2vec-transformers` module for example, set:

```
ENABLE_MODULES=backup-azure,text2vec-transformers
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

:::caution `backup-filesystem` - limitations
`backup-filesystem` is only compatible with single-node backups. Use `backup-gcs` or `backup-s3` if support for multi-node backups is needed.

The filesystem provider is not intended for production use, as its availability is directly tied to the node on which it operates.
:::

Instead of backing up to a remote backend, you can also back up to the local filesystem. This may be helpful during development, for example to be able to quickly exchange setups, or to save a state from accidental future changes.

To allow backups to the local filesystem, add `backup-filesystem` to the `ENABLE_MODULES` environment variable. Modules are comma-separated. To enable the module along with the `text2vec-transformers` module for example, set:

```
ENABLE_MODULES=backup-filesystem,text2vec-transformers
```

In addition to enabling the module, you need to configure it using environment variables:

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_FILESYSTEM_PATH` | yes | The root path that all your backups will be copied into and retrieved from |

### Other Backup Backends

Weaviate uses its [module system](/developers/weaviate/configuration/modules.md) to decouple the backup orchestration from the remote backup storage backends. It is easy to add new providers and use them with the existing backup API. If you are missing your desired backup module, you can open a feature request or contribute it yourself. For either option, join our Slack community to have a quick chat with us on how to get started.


## API

### Create Backup

Once the modules are enabled and the configuration is provided, you can start a backup on any running instance with a single HTTP request.

#### Method and URL

```js
POST /v1/backups/{backend}
```

#### Parameters

##### URL Parameters

| Name | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, or `filesystem`. |

##### Request Body

The request takes a JSON object with the following properties:

| Name | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `id` | string (lowercase letters, numbers, underscore, minus) | yes | The id of the backup. This string must be provided on all future requests, such as status checking or restoration. |
| `include` | list of strings | no | An optional list of class names to be included in the backup. If not set, all classes are included. |
| `exclude` | list of strings | no | An optional list of class names to be excluded from the backup. If not set, no classes are excluded. |
| `config`  | object          | no | An optional object to configure the backup.  If not set, it will assign defaults from config table.|

:::note
You cannot set `include` and `exclude` at the same time. Set none or exactly one of those.
:::

##### Config object properties
| name | type | required | default | description |
| ---- | ---- | ---- | ---- |---- |
| `cpuPercentage`   | number | no | `50%` | An optional integer to set the desired CPU core utilization ranging from 1%-80%. |
| `chunkSize`       | number | no | `128MB` | An optional integer represents the desired size for chunks. Weaviate will attempt to come close the specified size, with a minimum of 2MB, default of 128MB, and a maximum of 512MB.|
| `compressionLevel`| string | no | `DefaultCompression` | An optional compression level used by compression algorithm from options. `DefaultCompression`, `BestSpeed`, `BestCompression`|
:::note
Weaviate uses [gzip compression](https://pkg.go.dev/compress/gzip#pkg-constants) by default.
:::
<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CreateBackup"
      endMarker="# END CreateBackup"
      language="py"
    />
  </TabItem>

  <TabItem value="pyv3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START CreateBackup"
      endMarker="# END CreateBackup"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START CreateBackup"
      endMarker="// END CreateBackup"
      language="ts"
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


While you are waiting for a backup to complete, [Weaviate stays fully usable](#read--write-requests-while-a-backup-is-running).


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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START StatusCreateBackup"
      endMarker="# END StatusCreateBackup"
      language="py"
    />
  </TabItem>
  <TabItem value="pyv3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START StatusCreateBackup"
      endMarker="# END StatusCreateBackup"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START StatusCreateBackup"
      endMarker="// END StatusCreateBackup"
      language="ts"
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


### Restore Backup
You can restore any backup to any machine as long as the name and number of nodes between source and target are identical. The backup does not need to be created on the same instance. Once a backup backend is configured, you can restore a backup with a single HTTP request.

Note that a restore fails if any of the classes already exist on this instance.

#### Method and URL

```js
POST /v1/backups/{backend}/{backup_id}/restore
```

#### Parameters

##### URL Parameters

| Name | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the request to create the backup. |

##### Request Body
The request takes a json object with the following properties:

| Name | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `include` | list of strings | no | An optional list of class names to be included in the backup. If not set, all classes are included. |
| `exclude` | list of strings | no | An optional list of class names to be excluded from the backup. If not set, no classes are excluded. |
| `config`  | object          | no | An optional object to configure the restore.  If not set, it will assign defaults from config table.|

*Note 1: You cannot set `include` and `exclude` at the same time. Set none or exactly one of those.*

*Note 2: `include` and `exclude` are relative to the classes contained in the backup. The restore process does not know which classes existed on the source machine if they were not part of the backup.*

##### Config object properties
| name | type | required | default | description |
| ---- | ---- | ---- | ---- |---- |
| `cpuPercentage`   | number | no | `50%` | An optional integer to set the desired CPU core utilization ranging from 1%-80%. |

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RestoreBackup"
      endMarker="# END RestoreBackup"
      language="py"
    />
  </TabItem>
  <TabItem value="pyv3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START RestoreBackup"
      endMarker="# END RestoreBackup"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RestoreBackup"
      endMarker="// END RestoreBackup"
      language="ts"
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

```js
GET /v1/backups/{backend}/{backup_id}/restore
```

#### Parameters

##### URL Parameters

| Name | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the requests to create and restore the backup. |

The response contains a `"status"` field. If the status is `SUCCESS`, the restore is complete. If the status is `FAILED`, an additional error is provided.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START StatusRestoreBackup"
      endMarker="# END StatusRestoreBackup"
      language="py"
    />
  </TabItem>
  <TabItem value="pyv3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START StatusRestoreBackup"
      endMarker="# END StatusRestoreBackup"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START StatusRestoreBackup"
      endMarker="// END StatusRestoreBackup"
      language="ts"
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


## Technical Considerations

### Read & Write requests while a backup is running

The backup process is designed to be minimally invasive to a running setup. Even on very large setups, where terabytes of data need to be copied, Weaviate stays fully usable during backup. It even accepts write requests while a backup process is running. This sections explains how backups work under the hood and why Weaviate can safely accept writes while a backup is copied.

Weaviate uses a custom [LSM Store](../concepts/storage.md#object-and-inverted-index-store) for it's object store and inverted index. LSM stores are a hybrid of immutable disk segments and an in-memory structure called a memtable that accepts all writes (including updates and deletes). Most of the time, files on disk are immutable, there are only three situations where files are changed:

1. Anytime a memtable is flushed. This creates a new segment. Existing segments are not changed.
2. Any write into the memtable is also written into a Write-Ahead-Log (WAL). The WAL is only needed for disaster-recovery. Once a segment has been orderly flushed, the WAL can be discarded.
3. There is an async background process called Compaction that optimizes existing segments. It can merge two small segments into a single larger segment and remove redundant data as part of the process.

Weaviate's Backup implementation makes use of the above properties in the following ways:

1. Weaviate first flushes all active memtables to disk. This process takes in the 10s or 100s of milliseconds. Any pending write requests simply waits for a new memtable to be created without any failing requests or substantial delays.
2. Now that the memtables are flushed, there is a guarantee: All data that should be part of the backup is present in the existing disk segments. Any data that will be imported after the backup request ends up in new disk segments. The backup references a list of immutable files.
3. To prevent a compaction process from changing the files on disk while they are being copied, compactions are temporarily paused until all files have been copied. They are automatically resumed right after.

This way the backup process can guarantee that the files that are transferred to the remote backend are immutable (and thus safe to copy) even with new writes coming in. Even if it takes minutes or hours to backup a very large setup, Weaviate stays fully usable without any user impact while the backup process is running.

It is not just safe - but even recommended - to create backups on live production instances while they are serving user requests.

### Async nature of the Backup API

The backup API is built in a way that no long-running network requests are required. The request to create a new backup returns immediately. It does some basic validation, then returns to the user. The backup is now in status `STARTED`. To get the status of a running backup you can poll the [status endpoint](#asynchronous-status-checking). This makes the backup itself resilient to network or client failures.

If you would like your application to wait for the background backup process to complete, you can use the "wait for completion" feature that is present in all language clients. The clients will poll the status endpoint in the background and block until the status is either `SUCCESS` or `FAILED`. This makes it easy to write simple synchronous backup scripts, even with the async nature of the API.

## Other Use cases

### Migrating to another environment

The flexibility around backup providers opens up new use cases. Besides using the backup & restore feature for disaster recovery, you can also use it for duplicating environments or migrating between clusters.

For example, consider the following situation: You would like to do a load test on production data. If you would do the load test in production it might affect users. An easy way to get meaningful results without affecting uses it to duplicate your entire environment. Once the new production-like "loadtest" environment is up, create a backup from your production environment and restore it into your "loadtest" environment. This even works if the production environment is running on a completely different cloud provider than the new environment.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
