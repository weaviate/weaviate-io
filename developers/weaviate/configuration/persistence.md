---
title: Persistence
sidebar_position: 45
image: og/docs/configuration.jpg
# tags: ['configuration', 'persistence']
---


:::info Related pages
- [Configuration: Backups](./backups.md)
:::

## Overview

When running Weaviate with Docker or Kubernetes, you can persist its data by mounting a volume to store the data outside of the containers. Doing so will cause the Weaviate instance to also load the data from the mounted volume when it is restarted.

Note that Weaviate now offers native backup modules starting with `v1.15` for single-node instances, and `v1.16` for multi-node instances. For older versions of Weaviate, persisting data as described here will allow you to back up Weaviate.

## Docker Compose

### Persistence

When running Weaviate with Docker Compose, you can set the `volumes` variable under the `weaviate` service and a unique cluster hostname as an environment variable.

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
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 50051:50051
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

See [Backups](./backups.md).

## Kubernetes

For Kubernetes setup, the only thing to bear in mind is that Weaviate needs a `PersistentVolumes` through `PersistentVolumeClaims` ([more info](/developers/weaviate/installation/kubernetes.md#requirements)) but the Helm chart is already configured to store the data on an external volume.

## Disk Pressure Warnings and Limits

Starting with `v1.12.0` there are two levels of disk usage notifications and actions configured through environment variables. Both variables are optional. If not set they default to the values outlined below:

| Variable | Default Value | Description |
| --- | --- | --- |
| `DISK_USE_WARNING_PERCENTAGE` | `80` | If disk usage is higher than the given percentage a warning will be logged by all shards on the affected node's disk |
| `DISK_USE_READONLY_PERCENTAGE` | `90` | If disk usage is higher than the given percentage all shards on the affected node will be marked as `READONLY`, meaning all future write requests will fail. |

If a shard was marked `READONLY` due to disk pressure and you want to mark the
shard as ready again (either because you have made more space available or
changed the thresholds) you can use the [Shards API](../api/rest/schema.md#inspect-the-shards-of-a-class) to do so.

## Virtual memory access method

:::info Added in `v1.21`
:::

You can choose between `mmap` (DEFAULT) and `pread` functions to access virtual memory by setting the `PERSISTENCE_LSM_ACCESS_STRATEGY` environment variable.

The two functions reflect different under-the-hood memory management behaviors. `mmap` uses a memory-mapped file, which means that the file is mapped into the virtual memory of the process. `pread` is a function that reads data from a file descriptor at a given offset.

In general, `mmap` may be a preferred option with memory management benefits. However, if you experience stalling situations under heavy memory load, we suggest trying `pread` instead.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
