---
title: REST - /v1/backups
sidebar_position: 14
# layout: layout-documentation
# solution: weaviate
# sub-menu: RESTful API references
# title: /v1/backups
# intro: |-
#   Weaviate's backup API allows you to backup to and restore from any attached backend with a single command.
# description: RESTful API batch reference
# tags: ['RESTful API', 'references', 'batching']
# sidebar_position: 4
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/current/add-data/batching.html
#     - /documentation/weaviate/current/restful-api-references/batch.html
#     - /documentation/weaviate/current/add-data/add_and_modify.html
#     - /documentation/weaviate/current/tutorials/how-to-import-data.html
#     - /developers/weaviate/current/tutorials/how-to-import-data.html
---

# Introduction

See the [Backups page](../configuration/backups.html) for a general introduction, configuration, and tech backround of Backups.

# API

## Create Backup

Once the modules are enabled and the [configuration](../configuration/backups.html#configuration) is provided, you can start a
backup on any running instance with a single HTTP request.

### Method and URL

```js
POST /v1/backups/{backend}
```

### Parameters

#### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcp`, or `filesystem`. |

#### Request Body

The request takes a json object with the following properties:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `id` | string (lowercase letters, numbers, underscore, minus) | yes | The id of the backup. This string must be provided on all future requests, such as status checking or restoration. |
| `include` | list of strings | no | An optional list of class names to be included in the backup. If not set, all classes are included. |
| `exclude` | list of strings | no | An optional list of class names to be excluded from the backup. If not set, no classes are excluded. |

*Note: You cannot set `include` and `exclude` at the same time. Set none or exactly one of those.*

{% include code/1.x/backup.create.html %}

While you are waiting for a backup to complete, [Weaviate stays fully usable](../configuration/backups.html#read--write-requests-while-a-backup-is-running).


### Asynchronous Status Checking

All client implentations have a "wait for completion" option which will poll the backup status in the background and only return once the backup has completed (successfully or unsuccessfully).

If you set the "wait for completion" option to false, you can also check the status yourself using the Backup Creation Status API.

```js
GET /v1/backups/{backend}/{backup_id}
```

#### Parameters

##### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcp`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the request to create the backup. |

The response contains a `"status"` field. If the status is `SUCCESS`, the
backup is complete. If the status is `FAILED`, an additional error is provided.

{% include code/1.x/backup.status.create.html %}

## Restore Backup

You can restore any backup to any machine as long as the number of nodes
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
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcp`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the request to create the backup. |

#### Request Body

The request takes a json object with the following properties:

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `include` | list of strings | no | An optional list of class names to be included in the backup. If not set, all classes are included. |
| `exclude` | list of strings | no | An optional list of class names to be excluded from the backup. If not set, no classes are excluded. |

*Note 1: You cannot set `include` and `exclude` at the same time. Set none or exactly one of those.*

*Note 2: `include` and `exclude` is relative to the classes contained in the backup. The restore process does not know which classes existed on the source machine if they were not part of the backup.*

{% include code/1.x/backup.restore.html %}

### Asynchronous Status Checking

All client implentations have a "wait for completion" option which will poll the backup status in the background and only return once the backup has completed (successfully or unsuccessfully).

If you set the "wait for completion" option to false, you can also check the status yourself using the Backup Restore Status API.

```js
GET /v1/backups/{backend}/{backup_id}/restore
```

#### Parameters

##### URL Parameters

| name | type | required | description |
| ---- | ---- | ---- | ---- |
| `backend` | string | yes | The name of the backup provider module without the `backup-` prefix, for example `s3`, `gcp`, or `filesystem`. |
| `backup_id` | string | yes | The user-provided backup identifier that was used when sending the requests to create and restore the backup. |

The response contains a `"status"` field. If the status is `SUCCESS`, the
restore is complete. If the status is `FAILED`, an additional error is provided.

{% include code/1.x/backup.status.restore.html %}

# Learn more about Backups

Discover more about [Backups Configuration](../configuration/backups.html#configuration), inlcuding Backups to [S3](../configuration/backups.html#s3-aws-or-s3-compatible) or [GCS](../configuration/backups.html#gcs-google-cloud-storage), [Technical Considerations of Backups](../configuration/backups.html#technical-considerations), as well as [additional use cases](../configuration/backups.html#other-use-cases).
