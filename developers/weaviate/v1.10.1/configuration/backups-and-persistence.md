---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Persistence &amp; Backups
description: Persistence & Backups
tags: ['configuration', 'backups']
menu-order: 5
open-graph-type: article
og: /img/og/og-documentation/configuration-persistence--backups.jpg
toc: true
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

The folder that you've chosen to contain your external Docker volume contains the Weaviate DB. You can simply copy it and store it.

For example:

```sh
$ mkdir /var/weaviate.BAK
$ cp /var/weavite /var/weaviate.BAK
```

#### Running vs. stopped instance

* Ideally, the setup should be stopped first (`docker-compose down`), because an orderly shutdown will flush everything to disk and make sure it can be read easily.
* If you create a backup from a running setup, no data is lost, but not all segments have been flushed yet. This means the next startup will recover the data from an active commit log. ​This will result in a ​message: `“did Weaviate crash? Trying to recover”​`​.​ This is slightly slower than an ​orderly​ shutdown.​

## Kubernetes

For Kubernetes setup, the only thing to bear in mind is that Weaviate needs a `PersistentVolumes` through `PersistentVolumeClaims` ([more info](../getting-started/installation.html#requirements)) but the Helm chart is already configured to store the data on an external volume.

# More Resources

{% include docs-support-links.html %}
