---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Persistence
description: Persistence
tags: ['configuration', 'persistence']
sidebar_position: 5
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.11.0/configuration/persistence.html
    - /developers/weaviate/current/configuration/backups-and-persistence.html
---

## Introduction

Because Weaviate is run using Docker or Kubernetes, you can create a backup of your data by mounting a volume to store the data outside of the containers. When restarting a Weaviate instance, the data from the mounted volume is used to restore the dataset.

## Docker Compose

Creating backups is divided into two sections. First, we want to make the setup persistent. Second, we can create backups by copying the folder outside the container that contains the Weaviate DB.

### Persistence

When running Weaviate with docker-compose, you can set the `volumes` variable under the `weaviate` service and a unique cluster hostname as an environment variable.

```yaml
services:
  weaviate:
    volumes:
      - /var/weaviate:/var/lib/weaviate
    environment:
      CLUSTER_HOSTNAME: 'node1' 
```

* About the volumes
  * `/var/weaviate` is the location where you want to store the data on the local machine
  * `/var/lib/weaviate` (after the colon) is the location inside the container, don't change this
* About the hostname
  * The `CLUSTER_HOSTNAME` can be any arbitrarily chosen name

In the case you want a more verbose output, you can change the environment variable for the `LOG_LEVEL`

```yaml
services:
  weaviate:
    environment:
      LOG_LEVEL: 'debug'
```

A complete example of a Weaviate without modules but with an externally mounted volume and more verbose output:

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: semitechnologies/weaviate:{{ site.weaviate_version }}
    ports:
    - 8080:8080
    restart: on-failure:0
    volumes:
      - /var/weaviate:/var/lib/weaviate # <== set a volume here
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      ENABLE_MODULES: ''
      CLUSTER_HOSTNAME: 'node1' # <== this can be set to an arbitrary name
...
```

### Backups

See [Backups](./backups.html).

## Kubernetes

For Kubernetes setup, the only thing to bear in mind is that Weaviate needs a `PersistentVolumes` through `PersistentVolumeClaims` ([more info](../getting-started/installation.html#requirements)) but the Helm chart is already configured to store the data on an external volume.

## Disk Pressure Warnings and Limits

Starting with `v1.12.0` there are two levels of disk usage notifications and actions configured through environment variables. Both variables are optional. If not set they default to the values outlined below:

| Variable | Default Value | Description |
| --- | --- | --- |
| `DISK_USE_WARNING_PERCENTAGE` | `80` | If disk usage is higher than the given percentage a warning will be logged by all shards on the affected node's disk |
| `DISK_USE_READONLY_PERCENTAGE` | `90` | If disk usage is higher than the given percentage all shards on the affected node will be marked as `READONLY`, meaning all future write requests will fail. |

If a shard was marked `READONLY` due to disk pressure and you want to mark the
shard as ready again (either because you have made more space available or
changed the thresholds) you can use the [Shards API](../restful-api-references/schema.html#inspect-the-shards-of-a-class) to do so.

# More Resources

{% include docs-support-links.html %}
