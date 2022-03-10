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
og: /img/og/og-documentation/getting-started-installation.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/get-started/install.html
    - /documentation/weaviate/current/getting-started/installation.html
---

<!-- sets the current version tags -->
{% include docs-current_version_finder.html %}

# Introduction

There are multiple ways to set up a Weaviate instance. For a testing setup, we recommend you start with [docker-compose](#docker-compose). [Cloud deployment](#cloud-deployment) can be used for small and larger projects. For production setup and/or large scale projects, we encourage you to use [Kubernetes](#kubernetes-k8s).

# Customize your Weaviate Setup

You can use the configuration tool below to customize your Weaviate setup for
your desired runtime (e.g. Docker-Compose, Kubernetes, etc.):

***

{% include docs-config-gen.html %}

# Docker Compose

If you want to try out Weaviate locally and on a small scale, you can use [Docker Compose](https://docs.docker.com/compose/). 

If you are new to Docker (Compose) and containerization, check out our [Docker Introduction for Weaviate Users](https://medium.com/semi-technologies/what-weaviate-users-should-know-about-docker-containers-1601c6afa079).

To start Weaviate with docker-compose, you need a docker-compose configuration file. You can obtain it from the configuration tool above or alternatively pick one of the examples below. Additional [environment variables](#environment-variables) can be set in this file, which regulate your Weaviate setup, authentication and authorization, module settings, and data storage settings.

## Example Docker Compose Setups

If you do not with to use the configuration tool above to customize your setup,
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
    image: semitechnologies/weaviate:1.9.0
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

Note that transformer models are Neural Networks built to run on
GPUs. Running Weaviate with the `text2vec-transformers` module and without GPU is
possible, but it will be slower. Enable CUDA if you have a GPU available
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
    image: semitechnologies/weaviate:1.9.0
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
    image: semitechnologies/weaviate:1.9.0
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
```


### Attaching to the log output of Weaviate only

The output of `docker-compose up` is quite verbose as it attaches to the logs of all containers. 

You can attach the logs only to Weaviate itself, for example, by running the following command instead of `docker-compose up`:

```bash
# Run Docker Compose
$ docker-compose up -d && docker-compose logs -f weaviate
```

Alternatively you can run docker-compose entirely detached with `docker-compose up -d` _and_ then poll `{bindaddress}:{port}/v1/meta` until you receive a status `200 OK`.


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

# Kubernetes (K8s)

_Generally, we recommend using Kubernetes to deploy Weaviate for any
long-running deployments or those with specific availability expectations, such
as production use cases. For local development or personal evaluation, using
Docker Compose will most likely be sufficient._


## Requirements

* A Kuberentes Cluster with a recent version (e.g. between 1.14 and 1.19)
* The cluster needs to be able to provision `PersistentVolumes` through
  `PersistentVolumeClaims`. No special file systems are required. Any default
  file system capable of `ReadWriteOnce` access mode is sufficient.
* Helm (only v3 is compatible from Helm version `"v{{ site.weaviate_versions[current_page_version].helm_version }}"`)

## Installing the official Weaviate Helm chart
To obtain and install the Weaviate chart on your Kubernetes cluster, take the following steps:

### Verify tool setup and cluster access
```bash
# Check if helm is installed
$ helm version
# Make sure `kubectl` is configured correctly and you can access the cluster. 
# For example, try listing the pods in the currently configured namespace.
$ kubectl get pods
```

### Obtain the Helm Chart

Get the Helm chart and `values.yml` configuration file.

```bash
# Set the Weaviate chart version
export CHART_VERSION="v{{ site.weaviate_versions[current_page_version].helm_version }}"
# Download the Weaviate Helm chart
wget https://github.com/semi-technologies/weaviate-helm/releases/download/$CHART_VERSION/weaviate.tgz
# Download an example values.yml (with the default configuration)
wget https://raw.githubusercontent.com/semi-technologies/weaviate-helm/$CHART_VERSION/weaviate/values.yaml
```

### Adjust the configuration in the values.yml (Optional)

_Note: You can skip this step and run with all default values._

In the
[`values.yaml`](https://github.com/semi-technologies/weaviate-helm/blob/master/weaviate/values.yaml)
file you can tweak the configuration to align it with your
setup. The yaml file is extensively documented to help you align the
configuration with your setup.

Out of the box, the configuration file is setup for:

- 1 Weaviate replica. (This cannot be changed at the moment, [see below](#limitations))
- The `text2vec-contextionary` module is enabled and running with 1 replica.
  (This can be adjusted based on the expected load).
- Other modules, such as `text2vec-transformers`, `qna-transformers` or
  `img2vec-neural` are disabled by default. They can be enabled by setting the
  respective `enabled` flag to `true`.

See the resource requests and limits in the example `values.yml`. You can
adjust them based on your expected load and the resources available on the
cluster.

### Deploy (install the Helm chart)

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


The above assumes that you have permissions to create a new namespace. If you
have only namespace-level permissions, you can skip creating a new
namespace and adjust the namespace argument on `helm upgrade` according to the
name of your pre-configured namespage.

### Updating the installation after the initial deployment

The above command (`helm upgrade...`) is idempotent, you can run it again, for
example after adjusting your desired configuration.

## Limitations

*** Weaviate now supports Horizontal Scalability.  The below is simply for reference:

Until Weaviate fully supports Horizontal Scalability (ETA end of Q3 2021), you
cannot increase the Weaviate replicas beyond 1. Trying to do so would lead to
unexpected behavior, as the loadbalancer would switch between replicas without
their state being in sync. Some data would land on some replicas, other data on
others, each query would only return a fragment of the entire dataset.

## Additional Configuration Help

- [Cannot list resource “configmaps” in API group when deploying Weaviate k8s setup on GCP](https://stackoverflow.com/questions/58501558/cannot-list-resource-configmaps-in-api-group-when-deploying-weaviate-k8s-setup)
- [Error: UPGRADE FAILED: configmaps is forbidden](https://stackoverflow.com/questions/58501558/cannot-list-resource-configmaps-in-api-group-when-deploying-weaviate-k8s-setup)

# Run an unreleased version

You can run Weaviate with `docker-compose`, building your own container off the [`master`](https://github.com/semi-technologies/weaviate) branch. Note that this is not an officially released Weaviate version, so this might contain bugs.

```sh
git clone https://github.com/semi-technologies/weaviate.git
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

# More Resources

{% include docs-support-links.html %}
