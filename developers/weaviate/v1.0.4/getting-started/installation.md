---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Installation
intro: Weaviate is completely containerized, you can use Docker Compose and/or Kubernetes to run it.
description: Install Weaviate, Weaviate is completely containerized, you can use Docker Compose and/or Kubernetes to run it.
tags: ['installation']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: true
---

<!-- sets the current version tags -->
{% include docs-current_version_finder.html %}

# Introduction

There are multiple ways to set up a Weaviate instance. For a try-out setup, we recommend you start with [docker-compose](#docker-compose). [Cloud deployment](#cloud-deployment) can be used for small and larger projects. For production setup and/or large scale projects, we encourage you to use [Kubernetes](#kubernetes).

# Customize your Weaviate Setup

You can use the configuration tool below to customize your Weaviate setup for
your desired runtime (e.g. Docker-Compose, Kubernetes, etc.):

{% include docs-config-gen.html %}

# Docker Compose

If you want to try out Weaviate locally and on a small scale, you can use [Docker Compose](https://docs.docker.com/compose/). 

To start Weaviate with docker-compose, you need a docker-compose configuration file. You can obtain it from the configuration tool above. Additional Environment variables can be set in this file, which regulate your Weaviate setup, authentication and authorization, module settings, and data storage settings.


### Attaching to the log output of only Weaviate

The output is quite verbose. You can attach the logs only to Weaviate itself, for example by running the following command instead of `docker-compose up`:

```bash
# Run Docker Compose
$ docker-compose up -d && docker-compose logs -f weaviate
```

Alternatively you can run docker-compose entirely detached with_ `docker-compose up -d` _and poll `{bindaddress}:{port}/v1/meta` until you receive status `200 OK`.


## Environment variables

An overview of environment variables in the docker-compose file:

| Variable | Description | Type | Example Value |
  | --- | --- | --- | --- |
  | `ORIGIN` | Set the http(s) origin for Weaviate | `string - HTTP origin` | `https://my-weaviate-deployment.com` |
  | `CONTEXTIONARY_URL` | Service-Discovery for the contextionary container | `string - URL` | `http://contextionary` |
  | `PERSISTENCE_DATA_PATH` | Where should Weaviate Standalone store its data? | `string - file path` | `/var/lib/weaviate` |
  | `DEFAULT_VECTORIZER_MODULE` | Default vectorizer module, so this doens't need to be defined per class in the schema | `string` | `text2vec-contextionary` |
  | `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` | Allow users to interact with weaviate without auth | `string - true/false` | `true` |
  | `AUTHENTICATION_OIDC_ENABLED` | Enable OIDC Auth | `string - true/false` | `false` |
  | `AUTHENTICATION_OIDC_ISSUER` | OIDC Token Issuer | `string - URL` | `https://myissuer.com` |
  | `AUTHENTICATION_OIDC_CLIENT_ID` | OIDC Client ID | `string` | `my-client-id` |
  | `AUTHENTICATION_OIDC_USERNAME_CLAIM` | OIDC Username Claim | `string` | `email` |
  | `AUTHENTICATION_OIDC_GROUPS_CLAIM` | OIDC Groups Claim | `string` | `groups` |
  | `AUTHORIZATION_ADMINLIST_ENABLED` | Enable AdminList Authorization mode | `string - true/false` | `true` |
  | `AUTHORIZATION_ADMINLIST_USERS` | Users with admin permission| `string - comma-separated list` | `jane@example.com,john@example.com` |
  | `AUTHORIZATION_ADMINLIST_READONLY_USERS` | Users with read-only permission| `string - comma-separated list` | `alice@example.com,dave@example.com` |

# Cloud deployment

Weaviate is available on [Google Cloud Marketplace](https://console.cloud.google.com/marketplace/details/semi-marketplace-public/weaviate), where you can find more details on deployment on the cloud.

# Weaviate Cloud Service

You can create a free Weaviate sandbox cluster that lasts for 5 days completely for free. You can [try it out here](https://console.semi.technology) and if you do, we would love to hear your feedback.

# Kubernetes

_Note I: the Kubernetes setup is intended for production and/or large scale deployments of Weaviate. In case you want to try out Weaviate, you can always user [Docker Compose](#docker-compose) or deployment on the [cloud](#cloud-deployment)._

_Note II: tested until Kubernetes 1.14.x_

_Note III: In case your are running a very small setup. We would advice to use Docker Compose, but you can also this [minimal configuration](https://github.com/semi-technologies/weaviate-helm/blob/v{{ site.weaviate_versions[current_page_version].helm_version }}/weaviate/values.yaml)._

To run Weaviate with Kubernetes take the following steps.

```bash
# Check if helm is installed
$ helm version
# Check if pods are running properly
$ kubectl -n kube-system get pods
```

### Get the Helm Chart

Get the Helm chart and configuration files.

```bash
# Set the Weaviate chart version
export CHART_VERSION="v{{ site.weaviate_versions[current_page_version].helm_version }}"
# Download Helm charts
wget https://github.com/semi-technologies/weaviate-helm/releases/download/$CHART_VERSION/weaviate.tgz
# Download configuration values
wget https://raw.githubusercontent.com/semi-technologies/weaviate-helm/$CHART_VERSION/weaviate/values.yaml
```

### K8s configuration

In the `values.yaml` file you can tweak the configuration to align it with your setup. The yaml file is extensively documented to help you align the configuration with your setup.

Out of the box, the configuration file is setup for:

- 1 Weaviate replica.
- `anonymous_access` = enabled.
- 3 esvector replicas.
- 3 etcd replicas.

As a rule of thumb, you can:

- increase Weaviate replicas if you have a high load.
- increase esvector replicas if you have a high load and/or a lot of data.

### Deploy

You can deploy the helm charts as follows:

```bash
# Create a Weaviate namespace
$ kubectl create namespace weaviate
# Deploy
$ helm upgrade \
  "weaviate" \
  weaviate.tgz \
  --install \
  --namespace "weaviate" \
  --values ./values.yaml
  ```

### Additional Configuration Help

- [Cannot list resource “configmaps” in API group when deploying Weaviate k8s setup on GCP](https://stackoverflow.com/questions/58501558/cannot-list-resource-configmaps-in-api-group-when-deploying-weaviate-k8s-setup)
- [Error: UPGRADE FAILED: configmaps is forbidden](https://stackoverflow.com/questions/58501558/cannot-list-resource-configmaps-in-api-group-when-deploying-weaviate-k8s-setup)


# More Resources

{% include docs-support-links.html %}
