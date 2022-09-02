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

## Introduction

Weaviate's Backup feature is designed to feel very easy to use and work natively with
cloud technology. Most notably:

* Neatless integration with widely-used cloud blob storage, such as AWS S3 or GCS
* Backup and Restore between different storage providers
* Single-command backup and restore from the REST API
* Supports whole instance backups, as well as selecting specific classes
* Zero downtimes & minimal effects for your users when backups are running
* Easy Migrations to new environments

_Note: The backup functionality was introduced in Weaviate `v1.15`_

## Configuration

In order to perform backups, a backup provider module must be activated.
Multiple backup providers can be active at the same time. Currently Weaviate
supports the the `backup-s3`, `backup-gcs`, and `backup-filesystem` providers.
Providers are well decoupled which makes it easy to add new ones in the future.

All service-discovery and authentication-related configuration is set using
environment variables.

### S3 (AWS or S3-compatible)

Use the `backup-s3` module to enable backing up to and restoring from any
S3-compatible blob storage. This includes AWS S3, and minIO.

To enable the module set the following environment variable

```
ENABLE_MODULES=backup-s3
```

Modules are comma-separated, for example to combine the module with the `text2vec-transformers` module, set:

```
ENABLE_MODULES=backup-s3,text2vec-transformers
```

In addition to activating the module, you need to provide configuration:

| Environment variable | Description |
| --- | --- |
| TODO | TODO |


### GCS (Google Cloud Storage)

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

| Environment variable | Description |
| --- | --- |
| TODO | TODO |

#### Google Application Default Credentials

The `backup-gcs` module follows the Google [Application Default Credentials](https://cloud.google.com/docs/authentication/application-default-credentials) best-practices. This means that credentials can be discovered through the environment, through a local Google Cloud CLI setup, or through an attached service account.

This makes it easy to use the same module in different setups. For example, you can use the environment-based approach in production, and the CLI-based approach on your local machine. This way you can easily pull a backup that was created in a remote environment to your local system. This can be helpful in debugging an issue, for example.

### Filesystem

### Other Storage Backends

## API

### Create Backup

TODO

{% include code/1.x/backup.create.html %}

#### Asynchronous Status Checking

TODO

{% include code/1.x/backup.status.create.html %}
### Restore Backup

TODO

{% include code/1.x/backup.restore.html %}

#### Asynchronous Status Checking

TODO

{% include code/1.x/backup.status.restore.html %}

## Technical Considerations

### Read &amp; Write requests while a backup is running

### Async Components of a backup

## Limitations & Outlook

## Other Use cases

### Migrating to another environment

# More Resources

{% include docs-support-links.html %}
