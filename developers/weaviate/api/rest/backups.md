---
title: REST - /v1/backups
sidebar_position: 14
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'batching']
---


## Introduction

See the [Backups page](/developers/weaviate/configuration/backups.md) for a general introduction, configuration, and tech background of Backups.

## API

### Create Backup

Once the modules are enabled and the [configuration](/developers/weaviate/configuration/backups.md#configuration) is provided, you can start a
backup on any running instance with a single HTTP request.

### Method and URL

```js
POST /v1/backups/{backend}
```

#### Parameters

##### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, `azure`, or `filesystem`. |

##### Request Body

The request takes a json object with the following properties:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `id` | string (lowercase letters, numbers, underscore, minus) | yes | The id of the backup. This string must be provided on all future requests, such as status checking or restoration. |
| `include` | list of strings | no | An optional list of class names to be included in the backup. If not set, all classes are included. |
| `exclude` | list of strings | no | An optional list of class names to be excluded from the backup. If not set, no classes are excluded. |
| `config`  | object          | no | An optional object to configure the backup. If not set, it will assign defaults from config table.|

*Note: You cannot set `include` and `exclude` at the same time. Set none or exactly one of those.*

##### Config object properties
| name | type | required | default | description |
| ---- | ---- | ---- | ---- |---- |
| `cpuPercentage`   | integer | no | `50%` | Sets the desired CPU core utilization ranging from 1%-80%. |
| `chunkSize`       | integer | no | `128MB` | Sets the chunk size. Sizes range from 2MB to 512MB The default is 128MB. The actual chunk size may not be exactly `chunkSize`. |
| `compressionLevel`| string | no | `DefaultCompression` | Sets the compression level. Possible values are: `DefaultCompression`, `BestSpeed`, `BestCompression`|

*Note: Weaviate uses [gzip compression](https://pkg.go.dev/compress/gzip#pkg-constants) by default.*

For client code examples, see the [How-to: Configure / Backups](../../configuration/backups.md#create-backup) page.

While you are waiting for a backup to complete, [Weaviate stays fully usable](/developers/weaviate/configuration/backups.md#read--write-requests-while-a-backup-is-running).


#### Asynchronous Status Checking

All client implementations have a "wait for completion" option which will poll the backup status in the background and only return once the backup has completed (successfully or unsuccessfully).

If you set the "wait for completion" option to false, you can also check the status yourself using the Backup Creation Status API.

```js
GET /v1/backups/{backend}/{backup_id}
```

##### Parameters

##### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, `azure`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the request to create the backup. |

The response contains a `"status"` field. If the status is `SUCCESS`, the
backup is complete. If the status is `FAILED`, an additional error is provided.

For client code examples, see the [How-to: Configure / Backups](../../configuration/backups.md#asynchronous-status-checking) page.


### Restore Backup

You can restore any backup to any machine as long as the number of nodes
between source and target are identical. The backup does not need to be created
on the same instance. Once a backup backend is configured, you can restore a
backup with a single HTTP request.

There are two important conditions to note, which can cause a restore to fail:
- If any of the classes already exist on the target restoration node(s).
- If the node names of the backed-up class' node(s) do not match those of the target restoration node(s).

#### Method and URL

```js
POST /v1/backups/{backend}/{backup_id}/restore
```

#### Parameters

##### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, `azure`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the request to create the backup. |

##### Request Body

The request takes a json object with the following properties:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `include` | list of strings | no | An optional list of class names to be included in the backup. If not set, all classes are included. |
| `exclude` | list of strings | no | An optional list of class names to be excluded from the backup. If not set, no classes are excluded. |
| `config`  | object          | no | An optional object to configure the restore. If not set, it will assign defaults from config table.|

*Note 1: You cannot set `include` and `exclude` at the same time. Set none or exactly one of those.*

*Note 2: `include` and `exclude` is relative to the classes contained in the backup. The restore process does not know which classes existed on the source machine if they were not part of the backup.*

##### Config object properties
| name | type | required | default | description |
| ---- | ---- | ---- | ---- |---- |
| cpuPercentage | integer | no | `50%` | Sets CPU core utilization from `1%-80%`. |

For client code examples, see the [How-to: Configure / Backups](../../configuration/backups.md#restore-backup) page.


#### Asynchronous Status Checking

All client implementations have a "wait for completion" option which will poll the backup status in the background and only return once the backup has completed (successfully or unsuccessfully).

If you set the "wait for completion" option to false, you can also check the status yourself using the Backup Restore Status API.

```js
GET /v1/backups/{backend}/{backup_id}/restore
```

#### Parameters

##### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcs`, `azure`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the requests to create and restore the backup. |

The response contains a `"status"` field. If the status is `SUCCESS`, the
restore is complete. If the status is `FAILED`, an additional error is provided.

For client code examples, see the [How-to: Configure / Backups](../../configuration/backups.md#asynchronous-status-checking-1) page.

## Learn more about Backups

Discover more about [Backups Configuration](/developers/weaviate/configuration/backups.md#configuration), including Backups to [S3](/developers/weaviate/configuration/backups.md#s3-aws-or-s3-compatible), [GCS](/developers/weaviate/configuration/backups.md#gcs-google-cloud-storage), or [Azure](/developers/weaviate/configuration/backups.md#azure-storage), [Technical Considerations of Backups](/developers/weaviate/configuration/backups.md#technical-considerations), as well as [additional use cases](/developers/weaviate/configuration/backups.md#other-use-cases).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
