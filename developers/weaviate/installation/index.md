---
title: How to install Weaviate
sidebar_position: 0
image: og/docs/installation.jpg
# tags: ['installation']
---

Weaviate is available as a hosted service, Weaviate Cloud Services (WCS), or as a self managed instance. If you manage your own instance, you can host it locally or with a cloud provider. For details on how to configure Weaviate, see the following.

- **[Weaviate Cloud Services](../../wcs/quickstart.mdx)**: Use this managed Weaviate service for both development and production environments.
- **[Docker Compose](./docker-compose.md)**: Opt for this containerized deployment method primarily for development projects.
- **[Kubernetes](./kubernetes.md)**: Ideal for scalable, containerized deployments, this method is typically employed for production setups.
- **[Embedded Weaviate](./embedded.md)**: For in-line instantiation from a client; currently in experimental stage and great for evaluation.
- **[AWS Marketplace](./aws-marketplace.md)**: Conveniently deploy directly from the AWS Marketplace.


The Weaviate library is identical regardless of whether it is used via Weaviate Cloud Services (WCS) or by downloading an open source version. The only difference that WCS manages your Weaviate instance for you and comes with a specific SLA, whereas Weaviate open source comes with a [BSD-3 license](https://github.com/weaviate/weaviate/blob/master/LICENSE).

:::info configuration yaml files
Both Docker Compose and Kubernetes setups use a yaml file for customizing Weaviate instances, typically called `docker-compose.yml` or `values.yaml` respectively. These files will be referred to throughout the documentation as `configuration yaml files`.
:::

:::tip Docker <i class="fa-regular fa-circle-arrow-right"></i> Kubernetes
If self-hosting, we recommend starting with Docker and gaining familiarity with Weaviate and its configurations. You can later apply this knowledge when you are creating your Helm charts.
:::

### Run an unreleased version

You can run Weaviate with `docker compose`, building your own container off the [`master`](https://github.com/weaviate/weaviate) branch. Note that this may not be an officially release, and may contain bugs.

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
    image: semitechnologies/contextionary:en0.16.0-v1.2.1
```

After the build is complete, you can run this Weaviate build with docker compose:

```bash
docker compose up
```

## Related pages
- [WCS Quickstart](../../wcs/quickstart.mdx)
- [References: Configuration](../configuration/index.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
