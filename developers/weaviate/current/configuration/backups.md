---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Backups
description: Backups TODO
tags: ['configuration', 'backups']
menu-order: 5
open-graph-type: article
toc: true
---

# Introduction

Weaviate's Backup feature is designed to feel very easy to use and work natively with
cloud technology. Most notably:

* Neatless integration with widely-used cloud blob storage, such as AWS S3 or GCS
* Backup and Restore between different storage providers
* Single-command backup and restore from the REST API
* Supports whole instance backups, as well as selecting specific classes
* Zero downtimes & minimal effects for your users when backups are running
* Easy Migrations to new environments

_Note: The backup functionality was introduced in Weaviate `v1.15`_

# Configuration

In order to perform backups, a backup provider module must be activated.
Multiple backup providers can be active at the same time. Currently Weaviate
supports the the `backup-s3`, `backup-gcs`, and `backup-filesystem` providers.
Providers are well decoupled which makes it easy to add new ones in the future.

All service-discovery and authentication-related configuration is set using
environment variables.

## S3 (AWS or S3-compatible)

Use the `backup-s3` module to enable backing up to and restoring from any
S3-compatible blob storage. This includes AWS S3, and minIO.

To enable the module set the following environment variable

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

### Option 1: With access key and secret access key

| Environment variable | Description |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The id of the AWS access key for the desired account. |
| `AWS_SECRET_ACCESS_KEY` | The secret AWS access key for the desired account. |

### Option 2: With IAM and ARN roles

| Environment variable | Description |
| --- | --- |
| `AWS_ROLE_ARN` | The unique AWS identifier of the role. |
| `AWS_WEB_IDENTITY_TOKEN_FILE` | The path to the web identity token file. |
| `AWS_REGION` | The AWS Region. If not provided, the module will try to parse `AWS_DEFAULT_REGION`. |

## GCS (Google Cloud Storage)

Use the `backup-gcs` module to enable backing up to and restoring from any
Google Cloud Storage.

To enable the module set the following environment variable

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
| `BACKUP_GCS_PATH` | no | The root path inside your bucket that all your backups will be copied into and retrieved from. Optional, defaults to `""` which means that the backups will be stored in the bucket root instead of a sub-folder. |

### Google Application Default Credentials

The `backup-gcs` module follows the Google [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials) best-practices. This means that credentials can be discovered through the environment, through a local Google Cloud CLI setup, or through an attached service account.

This makes it easy to use the same module in different setups. For example, you can use the environment-based approach in production, and the CLI-based approach on your local machine. This way you can easily pull a backup that was created in a remote environment to your local system. This can be helpful in debugging an issue, for example.

#### Environment-based Configuration

| Environment variable | Example value | Description |
| --- | --- | --- |
| `GOOGLE_APPLICATION_CREDENTIALS` | `/your/google/credentials.json` | The path to the secret GCP service account or workload identity file. |


## Filesystem

Instead of backing up to a remote backend, you can also backup to the local
filesystem. This may be helpful during development, for example to be able to
quickly exchange setups, or to save a state from accidental future changes.

To allow backups to the local filesystem, simply enable the `backup-filesystem` module like so:

```
ENABLE_MODULES=backup-filesystem
```

Modules are comma-separated, for example to combine the module with the `text2vec-transformers` module, set:

```
ENABLE_MODULES=backup-filesystem,text2vec-transformers
```

In addition to activating the module, you need to provide configuration:

| Environment variable | Required | Description |
| --- | --- | --- |
| `BACKUP_FILESYSTEM_PATH` | yes | The root path that all your backups will be copied into and retrieved from |

## Other Backup Backends

Weaviate uses its module system to decouple the backup orchestration from the
remote backup storage backends. It is easy to add new providers and use them
with the existing backup API. If you are missing your desired backup module,
you can open a feature request or contribute it yourself. For either option,
join our Slack community to have a quick chat with us on how to get started.

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

While you are waiting for a backup to complete, [Weaviate stays fully usable](#read--write-requests-while-a-backup-is-running).


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

TODO

{% include code/1.x/backup.restore.html %}

### Asynchronous Status Checking

TODO

{% include code/1.x/backup.status.restore.html %}

# Technical Considerations

## Read &amp; Write requests while a backup is running

## Async Components of a backup

# Limitations & Outlook

# Other Use cases

## Migrating to another environment

# More Resources

{% include docs-support-links.html %}
