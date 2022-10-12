---
layout: layout-documentation
solution: weaviate
sub-menu: Installation
title: Docker Compose
intro: Weaviate can be run using Docker-compose. This setup is ideal to develop locally or in the cloud. The handy configurator can be used to configure a setup to your liking.
description: DESC
tags: ['installation', 'Docker']
menu-order: 2
open-graph-type: article
toc: true
---

# Configurator

You can use the configuration tool below to customize your Weaviate setup for
your desired runtime.

{% include docs-config-gen.html %}

# Configuration

> 💡 If you are new to Docker (Compose) and containerization, check out our [Docker Introduction for Weaviate Users](https://medium.com/semi-technologies/what-weaviate-users-should-know-about-docker-containers-1601c6afa079).

To start Weaviate with docker-compose, you need a docker-compose configuration file. You can obtain it from the configuration tool above or alternatively pick one of the examples below. Additional [environment variables](#environment-variables) can be set in this file, which regulate your Weaviate setup, authentication and authorization, module settings, and data storage settings.

## Persistent Volume

It's recommended to set a persistent volume to avoid data loss and improve reading and writing speeds.

Add the following snippet to your Docker Compose YAML file:

```yaml
services:
  weaviate:
    volumes:
      - /var/weaviate:/var/lib/weaviate
    # etc
```

Make sure to run `$ docker-compose down` when shutting down, this writes all the files from memory to disk.

## Weaviate without any modules

An example docker-compose setup for Weaviate without any modules can be found
below. In this case, no model inference is performed at either import or search
time. You will need to provide your own vectors (e.g. from an outside ML model)
at import and search time:

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:1.14.0
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      CLUSTER_HOSTNAME: 'node1'
```

## Weaviate with the `text2vec-transformers` module

An example docker-compose setup file with the transformers model [`sentence-transformers/msmarco-distilroberta-base-v2`](https://huggingface.co/sentence-transformers/msmarco-distilroberta-base-v2) is: 

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:1.14.0
    restart: on-failure:0
    ports:
     - "8080:8080"
    environment:
      QUERY_DEFAULTS_LIMIT: 20
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: "./data"
      DEFAULT_VECTORIZER_MODULE: text2vec-transformers
      ENABLE_MODULES: text2vec-transformers
      TRANSFORMERS_INFERENCE_API: http://t2v-transformers:8080
      CLUSTER_HOSTNAME: 'node1'
  t2v-transformers:
    image: semitechnologies/transformers-inference:sentence-transformers-msmarco-distilroberta-base-v2
    environment:
      ENABLE_CUDA: 0 # set to 1 to enable
      # NVIDIA_VISIBLE_DEVICES: all # enable if running with CUDA
```

Note that transformer models are Neural Networks built to run on
GPUs. Running Weaviate with the `text2vec-transformers` module and without GPU is
possible, but it will be slower. Enable CUDA if you have a GPU available
(`ENABLE_CUDA=1`).

For more information on how to set up the environment with the
`text2vec-transformers` module, see [this
page](../modules/text2vec-transformers.html).

The `text2vec-transformers` module requires at least Weaviate version `v1.2.0`.

## Attaching to the log output of Weaviate only

The output of `docker-compose up` is quite verbose as it attaches to the logs of all containers. 

You can attach the logs only to Weaviate itself, for example, by running the following command instead of `docker-compose up`:

```bash
# Run Docker Compose
$ docker-compose up -d && docker-compose logs -f weaviate
```

Alternatively you can run docker-compose entirely detached with `docker-compose up -d` _and_ then poll `{bindaddress}:{port}/v1/meta` until you receive a status `200 OK`.

# Environment variables

An overview of environment variables in the docker-compose file:

| Variable | Description | Type | Example Value |
  | --- | --- | --- | --- |
  | `GOMEMLIMIT` | Set the memory limit for the Go runtime. This should match your available memory. The Go runtime tries to make sure that long-lived and temporary memory allocations do not exceed this value by making the Gargabe Collector more aggressive as the memory usage approaches the limit. [Learn more about GOMEMLIMIT](https://weaviate.io/blog/2022/08/GOMEMLIMIT-a-Game-Changer-for-High-Memory-Applications.html). | `string - memory limit in SI uints` | `4096MiB` |
  | `ORIGIN` | Set the http(s) origin for Weaviate | `string - HTTP origin` | `https://my-weaviate-deployment.com` |
  | `CONTEXTIONARY_URL` | Service-Discovery for the contextionary container | `string - URL` | `http://contextionary` |
  | `PERSISTENCE_DATA_PATH` | Where should Weaviate Standalone store its data? | `string - file path` | `/var/lib/weaviate` |
  | `ENABLE_MODULES` | Which modules to enable in the setup? | `string` | `text2vec-contextionary` |
  | `TRANSFORMERS_INFERENCE_API` | The endpoint where to reach the transformers module if enabled | `string` | `http://t2v-transformers:8080` |
  | `DEFAULT_VECTORIZER_MODULE` | Default vectorizer module, so this doesn't need to be defined per class in the schema | `string` | `text2vec-contextionary` |
  | `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Allow users to interact with weaviate without auth | `string - true/false` | `true` |
  | `AUTHENTICATION_OIDC_ENABLED` | Enable OIDC Auth | `string - true/false` | `false` |
  | `AUTHENTICATION_OIDC_ISSUER` | OIDC Token Issuer | `string - URL` | `https://myissuer.com` |
  | `AUTHENTICATION_OIDC_CLIENT_ID` | OIDC Client ID | `string` | `my-client-id` |
  | `AUTHENTICATION_OIDC_USERNAME_CLAIM` | OIDC Username Claim | `string` | `email` |
  | `AUTHENTICATION_OIDC_GROUPS_CLAIM` | OIDC Groups Claim | `string` | `groups` |
  | `AUTHORIZATION_ADMINLIST_ENABLED` | Enable AdminList Authorization mode | `string - true/false` | `true` |
  | `AUTHORIZATION_ADMINLIST_USERS` | Users with admin permission| `string - comma-separated list` | `jane@example.com,john@example.com` |
  | `AUTHORIZATION_ADMINLIST_READONLY_USERS` | Users with read-only permission| `string - comma-separated list` | `alice@example.com,dave@example.com` |
| `DISK_USE_WARNING_PERCENTAGE` |  If disk usage is higher than the given percentage a warning will be logged by all shards on the affected node's disk. See [Disk Pressure Warnings and Limits for details](../configuration/backups-and-persistence.html#disk-pressure-warnings-and-limits). | `string - number` | `80` |
| `DISK_USE_READONLY_PERCENTAGE`  | If disk usage is higher than the given percentage all shards on the affected node will be marked as `READONLY`, meaning all future write requests will fail. See [Disk Pressure Warnings and Limits for details](../configuration/backups-and-persistence.html#disk-pressure-warnings-and-limits). | `string - number` | `90` |
| `PROMETHEUS_MONITORING_ENABLED`  | If set, Weaviate will collect [metrics in a Prometheus-compatible format](../more-resources/monitoring.html) | `string - true/false` | `false` |
| `BACKUP_*` | Various configuration variables for backup provider modules. They are outlined in detail on the [Backups page](../configuration/backups.html). | |

# More Resources

{% include docs-support-links.html %}
