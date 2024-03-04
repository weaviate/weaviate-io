---
title: How to install Weaviate
sidebar_position: 0
image: og/docs/installation.jpg
# tags: ['installation']
---

Weaviate is available as a hosted service, Weaviate Cloud Services (WCS), or as a self managed instance. If you manage your own instance, you can host it locally or with a cloud provider. Self-managed instances use the same Weaviate core database as WCS.

## Installation methods

For details on how to run Weaviate, see the following:

- **[Weaviate Cloud Services](../../wcs/quickstart.mdx)**: This managed service works well for both development and production environments.
- **[Docker Compose](./docker-compose.md#starter-docker-compose-file)**: Docker containers are well suited for development and testing.
- **[Kubernetes](./kubernetes.md)**: Kubernetes is ideal for scalable, production deployments.
- **[AWS Marketplace](./aws-marketplace.md)**: Deploy Weaviate directly from the AWS Marketplace.
- **[Google Cloud Marketplace](./gc-marketplace.md)** Deploy Weaviate directly from the Google Cloud Marketplace.
- **[Snowpark Container Services](./spcs-integration.mdx)** Deploy Weaviate in Snowflake's Snowpark environment.
- **[Embedded Weaviate](./embedded.md)**: Experimental. Embedded Weaviate is a client based tool.


## Configuration files

Docker Compose and Kubernetes use yaml files to configure Weaviate instances. Docker uses the [`docker-compose.yml`](./docker-compose.md#starter-docker-compose-file) file. Kubernetes relies on [Helm charts](./kubernetes.md#weaviate-helm-chart) and the `values.yaml` file. The Weaviate documentation also calls these files `configuration yaml files`.

If you are self-hosting, consider experimenting on a small scale with Docker and then transferring your configuration to Kubernetes Helm charts when you are more familiar with Weaviate.

## Unreleased versions

:::warning Unreleased software
DISCLAIMER: Release candidate images and other unreleased software are not supported.

Unreleased software and images may contain bugs. APIs may change. Features under development may be withdrawn or modified. Do not use unreleased software in production.

:::

If you want to run an unreleased version of Weaviate, configure your configuration yaml file to build using an unreleased image.

For example, to run the image for a release candidate (`rc` version), edit your `docker-config.yaml` to call the release candidate image.

```yml
version: '3.4'
name: "weaviate-v1-23-0-release-candidate"
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: cr.weaviate.io/semitechnologies/weaviate:1.23.0-rc.1
    ports:
    - 8080:8080
    - 50051:50051
    volumes:
    - weaviate_data:/var/lib/weaviate
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      ENABLE_MODULES: 'text2vec-cohere,text2vec-huggingface,text2vec-palm,text2vec-openai,generative-openai,generative-cohere,generative-palm,ref2vec-centroid,reranker-cohere,qna-openai'
      CLUSTER_HOSTNAME: 'node1'
      AUTHENTICATION_APIKEY_ENABLED: 'true'
      AUTHENTICATION_APIKEY_ALLOWED_KEYS: '<YOUR-API-AUTHENTICATION-KEY>'
      AUTHENTICATION_APIKEY_USERS: '<YOUR-API-AUTHENTICATION-PASSWORD>'
volumes:
  weaviate_data:

```

If you try out new features, please provide [feedback](https://github.com/weaviate/weaviate/issues/new/choose). Your comments are appreciated and help us to make Weaviate more useful for you.


## Related pages
- [Connect to Weaviate](../tutorials/connect.mdx)
- [Weaviate Quickstart](../quickstart/index.md)
- [Weaviate Cloud Services Quickstart](../../wcs/quickstart.mdx)
- [References: Configuration](../configuration/index.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
