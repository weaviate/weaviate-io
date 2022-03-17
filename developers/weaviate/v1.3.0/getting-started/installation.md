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

To start Weaviate with docker-compose, you need a docker-compose configuration file. You can obtain it from the configuration tool above or alternatively pick one of the examples below. Additional [Environment variables](#environment-variables) can be set in this file, which regulate your Weaviate setup, authentication and authorization, module settings, and data storage settings.

## Example Docker Compose Setups

If you wish not to use the configuration tool above to customize your setup,
you can also use one of the following three example `docker-compose.yml` files
below. 

To run any of the below examples, save one of the snippets as
`docker-compose.yml` and start them by running `docker-compose up` from within
the same folder.

### Weaviate with the `text2vec-transformers` model
An example docker-compose setup file with the transformers model [`sentence-transformers/msmarco-distilroberta-base-v2`](https://huggingface.co/sentence-transformers/msmarco-distilroberta-base-v2) is: 

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:1.2.1
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
  t2v-transformers:
    image: semitechnologies/transformers-inference:sentence-transformers-msmarco-distilroberta-base-v2
    environment:
      ENABLE_CUDA: 0 # set to 1 to enable
      # NVIDIA_VISIBLE_DEVICES: all # enable if running with CUDA
```

Note that transformer models are Neural Networks which were built to run on
GPUs. Running Weaviate with the `text2vec-transformers` module without GPU is
still possible, but it will be slower. Enable CUDA if you have a GPU available
(`ENABLE_CUDA=1`).

For more information on how to set up the environment with the
`text2vec-transformers` module, see [this
page](../modules/text2vec-transformers.html).

The `text2vec-transformers` module requires at least Weaviate version `v1.2.0`.

### Weaviate with the `text2vec-contextionary` model
An example docker-compose setup file with the english language contextionary model is:

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:1.2.1
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-contextionary'
      ENABLE_MODULES: text2vec-contextionary
  contextionary:
    environment:
      OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
      EXTENSIONS_STORAGE_MODE: weaviate
      EXTENSIONS_STORAGE_ORIGIN: http://weaviate:8080
      NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
      ENABLE_COMPOUND_SPLITTING: 'false'
    image: semitechnologies/contextionary:en0.16.0-v1.0.2
```


The `text2vec-contextionary` module is designed to run with CPU hardware and
does not require or benefit from GPU-accelerated hardware.

For more information on how to set up the environment with the
`text2vec-contextionary` module, see [this
page](../modules/text2vec-contextionary.html).

_Note: at the moment, text vectorization modules cannot be combined in a single setup. This means that you can either enable the `text2vec-contextionary`, the `text2vec-transformers` or no text vectorization module._

### Weaviate without any modules
An example docker-compose setup for Weaviate without any modules can be found
below. In this case, no model inference is performed at either import or search
time. You will need to provide your own vectors (e.g. from an outside ML model)
at import and search time:

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:1.2.1
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
```


### Attaching to the log output of only Weaviate

The output of `docker-compose up` is quite verbose as it attaches to the logs of all containers. 

You can attach the logs only to Weaviate itself, for example by running the following command instead of `docker-compose up`:

```bash
# Run Docker Compose
$ docker-compose up -d && docker-compose logs -f weaviate
```

Alternatively you can run docker-compose entirely detached with `docker-compose up -d` _and_ poll `{bindaddress}:{port}/v1/meta` until you receive status `200 OK`.


## Environment variables

An overview of environment variables in the docker-compose file:

| Variable | Description | Type | Example Value |
  | --- | --- | --- | --- |
  | `ORIGIN` | Set the http(s) origin for Weaviate | `string - HTTP origin` | `https://my-weaviate-deployment.com` |
  | `CONTEXTIONARY_URL` | Service-Discovery for the contextionary container | `string - URL` | `http://contextionary` |
  | `PERSISTENCE_DATA_PATH` | Where should Weaviate Standalone store its data? | `string - file path` | `/var/lib/weaviate` |
  | `ENABLE_MODULES` | Which modules to enable in the setup? | `string` | `text2vec-contextionary` |
  | `TRANSFORMERS_INFERENCE_API` | The endpoint where to reach the transformers module if enabled | `string` | `http://t2v-transformers:8080` |
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

_Note I: the Kubernetes setup is only for large scale deployments of Weaviate. In case you want to work with smaller deployments, you can always user [Docker Compose](#docker-compose) or deployment on the [cloud](#cloud-deployment)._

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
