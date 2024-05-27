---
title: How to install Weaviate
sidebar_position: 0
image: og/docs/installation.jpg
# tags: ['installation']
---

Weaviate is available as a hosted service, [Weaviate Cloud (WCD)](https://console.weaviate.cloud/), or as a self managed instance. If you manage your own instance, you can host it locally or with a cloud provider. Self-managed instances use the same Weaviate core database as WCD.

## Installation methods

To install and configure Weaviate, see the following:

- **[Weaviate Cloud](../../wcs/quickstart.mdx)**: This managed service works well for both development and production environments.
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

import RunUnreleasedImages from '/_includes/configuration/run-unreleased.mdx'

<RunUnreleasedImages />

When try out upcoming features, please provide [feedback](https://github.com/weaviate/weaviate/issues/new/choose). Your comments are appreciated and help us to make Weaviate more useful for you.

## Related pages
- [Connect to Weaviate](../starter-guides/connect.mdx)
- [Weaviate Quickstart](../quickstart/index.md)
- [Weaviate Cloud Quickstart](../../wcs/quickstart.mdx)
- [References: Configuration](../configuration/index.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
