---
title: How to install Weaviate
sidebar_position: 0
image: og/docs/installation.jpg
# tags: ['installation']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

:::info Related pages
- [WCS Quickstart](../../wcs/quickstart.mdx)
- [References: Configuration](../configuration/index.md)
:::

## Overview

This section shows you available options for running Weaviate, and how to install and configure Weaviate with each option.

## How to run Weaviate

You have multiple options for running Weaviate.

* [Weaviate Cloud Services](../../wcs/quickstart.mdx) – a managed Weaviate service; suitable for development and production.
* [Docker Compose](./docker-compose.md) – typically for development.
* [Kubernetes](./kubernetes.md) – typically for production setups.
* [Embedded Weaviate](./embedded.md) - in-line instantiation from a client (experimental).

:::tip Weaviate Cloud Services docs have a new home
[Check it out here](../../wcs/index.mdx). Or go straight to the [WCS quickstart guide](../../wcs/quickstart.mdx) which covers installation.
:::

The Weaviate library is identical regardless of whether it is used via Weaviate Cloud Services (WCS) or by downloading an open source version. The only difference that WCS manages your Weaviate instance for you and comes with a specific SLA, whereas Weaviate open source comes with a [BSD-3 license](https://github.com/weaviate/weaviate/blob/master/LICENSE).

:::info configuration yaml files
Both Docker Compose and Kubernetes setups use a yaml file for customizing Weaviate instances, typically called `docker-compose.yml` or `values.yaml` respectively. These files will be referred to throughout the documentation as `configuration yaml files`.
:::

:::tip Docker <i class="fa-regular fa-circle-arrow-right"></i> Kubernetes
If self-hosting, we recommend starting with Docker and gaining familiarity with Weaviate and its configurations. You can later apply this knowledge when you are creating your Helm charts.
:::

### Run an unreleased version

You can run Weaviate with `docker-compose`, building your own container off the [`master`](https://github.com/weaviate/weaviate) branch. Note that this may not be an officially release, and may contain bugs.

```sh
git clone https://github.com/weaviate/weaviate.git
cd weaviate
docker build --target weaviate -t name-of-your-weaviate-image .
```

Then, make a `docker-compose.yml` file with this new image. For example:

```yml
version: '3.4'
services:
  weaviate:
    image: name-of-your-weaviate-image
    ports:
      - 8080:8080
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: './data'
      ENABLE_MODULES: 'text2vec-contextionary'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-contextionary'
      AUTOSCHEMA_ENABLED: 'false'
  contextionary:
    environment:
      OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
      EXTENSIONS_STORAGE_MODE: weaviate
      EXTENSIONS_STORAGE_ORIGIN: http://weaviate:8080
      NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
      ENABLE_COMPOUND_SPLITTING: 'false'
    image: semitechnologies/contextionary:en0.16.0-v1.0.2
```

After the build is complete, you can run this Weaviate build with docker-compose: `docker-compose up`.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
