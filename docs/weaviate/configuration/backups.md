---
title: Backups
sidebar_position: 5
# layout: layout-documentation
# solution: weaviate
# sub-menu: Configuration
# title: Backups
# description: |-
#   Weaviate cloud-native backups allow backing up to and restoring
#   from S3, GCS, etc. Supports backups without downtimes, even accepts new write requests
#   while backups are running.
# tags: ['configuration', 'backups']
# sidebar_position: 2
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.8.0/configuration/backups-and-persistence.html
#     - /developers/weaviate/v1.9.0/configuration/backups-and-persistence.html
---

# Introduction

Weaviate's Backup feature is designed to feel very easy to use and work natively with
cloud technology. Most notably, it allows:

* Seamless integration with widely-used cloud blob storage, such as AWS S3 or GCS
* Backup and Restore between different storage providers
* Single-command backup and restore from the REST API
* Choice of backing up an entire instance, or selected classes only
* Zero downtime & minimal impact for your users when backups are running
* Easy Migration to new environments

_Note: The backup functionality was introduced in Weaviate `v1.15`, but for single-node instances only. Support for multi-node backups was introduced in `v1.16`_

# Configuration

In order to perform backups, a backup provider module must be activated.
Multiple backup providers can be active at the same time. Currently `backup-s3`, `backup-gcs`, and `backup-filesystem` modules are available for S3, GCS or filesystem backups.
Built on Weaviate's [module system](/developers/weaviate/current/configuration/modules.html), additional providers can be added in the
future.

All service-discovery and authentication-related configuration is set using
environment variables.

## S3 (AWS or S3-compatible)

Use the `backup-s3` module to enable backing up to and restoring from any
S3-compatible blob storage. This includes AWS S3, and MinIO.

To enable the module set the following environment variable:

```
ENABLE_MODULES=backup-s3
```

Modules are comma-separated, for example to combine the module with the
`text2vec-transformers` module, set:

```
ENABLE_MODULES=backup-s3,text2vec-transformers
```

### S3 Configuration (vendor-agnostic)
In addition to activating the module, you need to provide configuration. This
configuration applies to any S3-compatible backend.

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_S3_BUCKET` | yes | The name of the S3 bucket for all backups. |
| `BACKUP_S3_PATH` | no | The root path inside your bucket that all your backups will be copied into and retrieved from. Optional, defaults to `""` which means that the backups will be stored in the bucket root instead of a sub-folder. |
| `BACKUP_S3_ENDPOINT` | no | The S3 endpoint to be used. Optional, defaults to `"s3.amazonaws.com"`. |
| `BACKUP_S3_USE_SSL` | no | Whether the connection should be secured with SSL/TLS. Optional, defaults to `"true"`. |

### S3 Configuration (AWS-specific)

In addition to the vendor-agnostic configuration from above, you can set
AWS-specific configuration for authentication. You can choose between
access-key or ARN-based authentication:

### Option 1: With IAM and ARN roles

The backup module will first try to authenticate itself using AWS IAM. If the authentication fails then it will try to authenticate with `Option 2`.

### Option 2: With access key and secret access key

| Environment variable | Description |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The id of the AWS access key for the desired account. |
| `AWS_SECRET_ACCESS_KEY` | The secret AWS access key for the desired account. |
| `AWS_REGION` | The AWS Region. If not provided, the module will try to parse `AWS_DEFAULT_REGION`. |


## GCS (Google Cloud Storage)

Use the `backup-gcs` module to enable backing up to and restoring from any
Google Cloud Storage.

To enable the module set the following environment variable:

```
ENABLE_MODULES=backup-gcs
```

Modules are comma-separated, for example to combine the module with the `text2vec-transformers` module, set:

```
ENABLE_MODULES=backup-gcs,text2vec-transformers
```

In addition to activating the module, you need to provide configuration:

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_GCS_BUCKET` | yes | The name of the GCS bucket for all backups. |
| `BACKUP_GCS_PATH` | no | The root path inside your bucket that all your backups will be copied into and retrieved from. Optional, defaults to `""` which means that the backups will be stored in the bucket root instead of a sub-folder. |

### Google Application Default Credentials

The `backup-gcs` module follows the Google [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials) best-practices. This means that credentials can be discovered through the environment, through a local Google Cloud CLI setup, or through an attached service account.

This makes it easy to use the same module in different setups. For example, you can use the environment-based approach in production, and the CLI-based approach on your local machine. This way you can easily pull a backup that was created in a remote environment to your local system. This can be helpful in debugging an issue, for example.

#### Environment-based Configuration

| Environment variable | Example value | Description |
| --- | --- | --- |
| `GOOGLE_APPLICATION_CREDENTIALS` | `/your/google/credentials.json` | The path to the secret GCP service account or workload identity file. |
| `GCP_PROJECT` | `my-gcp-project` | Optional. If you use a service account with `GOOGLE_APPLICATION_CREDENTIALS` the service account will already contain a Google project. You can use this variable to explicitly set a project if you are using user credentials which may have access to more than one project. |


## Filesystem

> ### ⚠️ Caution ⚠️
>
> `backup-filesystem` is only compatible with single-node backups. Use `backup-gcs` or `backup-s3` if support for multi-node backups is needed.
>
> The filesystem provider is not intended for production use, as its availability is directly tied to the node on which it operates.

Instead of backing up to a remote backend, you can also back up to the local
filesystem. This may be helpful during development, for example to be able to
quickly exchange setups, or to save a state from accidental future changes.

To allow backups to the local filesystem, enable the `backup-filesystem` module like so:

```
ENABLE_MODULES=backup-filesystem
```

Modules are comma-separated. For example, to combine the module with the `text2vec-transformers` module, set:

```
ENABLE_MODULES=backup-filesystem,text2vec-transformers
```

In addition to activating the module, you need to provide configuration:

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_FILESYSTEM_PATH` | yes | The root path that all your backups will be copied into and retrieved from |

## Other Backup Backends

Weaviate uses its [module system](/developers/weaviate/current/configuration/modules.html) 
to decouple the backup orchestration from the remote backup storage backends. 
It is easy to add new providers and use them with the existing backup API. 
If you are missing your desired backup module, you can open a feature request 
or contribute it yourself. For either option, join our Slack community to have 
a quick chat with us on how to get started.

# API

## Create Backup

Once the modules are enabled and the configuration is provided, you can start a
backup on any running instance with a single HTTP request.

### Method and URL

```js
POST /v1/backups/{backend}
```

### Parameters

#### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, or `filesystem`. |

#### Request Body

The request takes a json object with the following properties:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `id` | string (lowercase letters, numbers, underscore, minus) | yes | The id of the backup. This string must be provided on all future requests, such as status checking or restoration. |
| `include` | list of strings | no | An optional list of class names to be included in the backup. If not set, all classes are included. |
| `exclude` | list of strings | no | An optional list of class names to be excluded from the backup. If not set, no classes are excluded. |

*Note: You cannot set `include` and `exclude` at the same time. Set none or exactly one of those.*

{% include code/1.x/backup.create.html %}

While you are waiting for a backup to complete, [Weaviate stays fully usable](#read--write-requests-while-a-backup-is-running).


### Asynchronous Status Checking

All client implementations have a "wait for completion" option which will poll the backup status in the background and only return once the backup has completed (successfully or unsuccessfully).

If you set the "wait for completion" option to false, you can also check the status yourself using the Backup Creation Status API.

```js
GET /v1/backups/{backend}/{backup_id}
```

#### Parameters

##### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the request to create the backup. |

The response contains a `"status"` field. If the status is `SUCCESS`, the
backup is complete. If the status is `FAILED`, an additional error is provided.

{% include code/1.x/backup.status.create.html %}

## Restore Backup

You can restore any backup to any machine as long as the name and number of nodes
between source and target are identical. The backup does not need to be created
on the same instance. Once a backup backend is configured, you can restore a
backup with a single HTTP request.

Note that a restore fails if any of the classes already exist on this instance.

### Method and URL

```js
POST /v1/backups/{backend}/{backup_id}/restore
```

### Parameters

#### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the request to create the backup. |

#### Request Body

The request takes a json object with the following properties:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `include` | list of strings | no | An optional list of class names to be included in the backup. If not set, all classes are included. |
| `exclude` | list of strings | no | An optional list of class names to be excluded from the backup. If not set, no classes are excluded. |

*Note 1: You cannot set `include` and `exclude` at the same time. Set none or exactly one of those.*

*Note 2: `include` and `exclude` are relative to the classes contained in the backup. The restore process does not know which classes existed on the source machine if they were not part of the backup.*

{% include code/1.x/backup.restore.html %}

### Asynchronous Status Checking

All client implementations have a "wait for completion" option which will poll the backup status in the background and only return once the backup has completed (successfully or unsuccessfully).

If you set the "wait for completion" option to false, you can also check the status yourself using the Backup Restore Status API.

```js
GET /v1/backups/{backend}/{backup_id}/restore
```

#### Parameters

##### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the requests to create and restore the backup. |

The response contains a `"status"` field. If the status is `SUCCESS`, the
restore is complete. If the status is `FAILED`, an additional error is provided.

{% include code/1.x/backup.status.restore.html %}

# Technical Considerations

## Read &amp; Write requests while a backup is running

The backup process is designed to be minimally invasive to a running setup.
Even on very large setups, where terabytes of data need to be copied, Weaviate
stays fully usable during backup. It even accepts write requests while a backup process is
running. This sections explains how backups work under the hood and why
Weaviate can safely accept writes while a backup is copied.

Weaviate uses a custom [LSM
Store](../architecture/storage.html#object-and-inverted-index-store) for it's
object store and inverted index. LSM stores are a hybrid of immutable disk
segments and an in-memory structure called a memtable that accepts all writes
(including updates and deletes). Most of the time, files on disk are
immutable, there are only three situations where files are changed:

1. Anytime a memtable is flushed. This creates a new segment. Existing segments
   are not changed.
2. Any write into the memtable is also written into a Write-Ahead-Log (WAL).
   The WAL is only needed for disaster-recovery. Once a segment has been
   orderly flushed, the WAL can be discarded.
3. There is an async background process called Compaction that optimizes
   existing segments. It can merge two small segments into a single larger segment
   and remove redundant data as part of the process.

Weaviate's Backup implementation makes use of the above properties in the
following ways:

1. Weaviate first flushes all active memtables to disk. This process takes in
   the 10s or 100s of milliseconds. Any pending write requests simply waits for
   a new memtable to be created without any failing requests or substantial
   delays.
2. Now that the memtables are flushed, there is a guarantee: All data that
   should be part of the backup is present in the existing disk segments. Any
   data that will be imported after the backup request ends up in new disk
   segments. The backup references a list of immutable files.
3. To prevent a compaction process from changing the files on disk while they
   are being copied, compactions are temporarily paused until all files have
   been copied. They are automatically resumed right after.

This way the backup process can guarantee that the files that are transferred to the remote backend are immutable (and thus safe to copy) even with new writes coming in. Even if it takes minutes or hours to backup a very large setup, Weaviate stays fully usable without any user impact while the backup process is running.

It is not just safe - but even recommended - to create backups on live production
instances while they are serving user requests.

## Async nature of the Backup API

The backup API is built in a way that no long-running network requests are
required. The request to create a new backup returns immediately. It does some
basic validation, then returns to the user. The backup is now in status
`STARTED`. To get the status of a running backup you can poll the [status
endpoint](#asynchronous-status-checking). This makes the backup itself
resilient to network or client failures.

If you would like your application to wait for the background backup process to complete,
you can use the "wait for completion" feature that is present in all language
clients. The clients will poll the status endpoint in the background and block
until the status is either `SUCCESS` or `FAILED`. This makes it easy to write
simple synchronous backup scripts, even with the async nature of the API.

# Limitations & Outlook

In Weaviate v1.15, backups were limited to single-node setups. Weaviate v1.16 introduces support for multi-node setups. Currently, an unexpected node restart during a backup or restore operation leads to a failed operation. In the future, backups will become resilient to this problem. You can read the technical proposal
and track the progress on the feature [here](https://github.com/semi-technologies/weaviate/issues/2153).

# Other Use cases

## Migrating to another environment

The flexibility around backup providers opens up new use cases. Besides using
the backup & restore feature for disaster recovery, you can also use it for
duplicating environments or migrating between clusters. 

For example, consider the following situation: You would like to do a load test
on production data. If you would do the load test in production it might affect
users. An easy way to get meaningful results without affecting uses it to
duplicate your entire environment. Once the new production-like "loadtest"
environment is up, create a backup from your production environment and
restore it into your "loadtest" environment. This even works if the production
environment is running on a completely different cloud provider than the new
environment.

# More Resources

{% include docs-support-links.html %}
