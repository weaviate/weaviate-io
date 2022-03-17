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

# Docker Compose

If you want to try out Weaviate locally and on a small scale, you can use [Docker Compose](https://docs.docker.com/compose/). 

To start Weaviate with docker-compose, you need a docker-compose configuration file. Environment variables can be set in this file, which regulate your Weaviate setup, authentication and authorization, module settings, and data storage settings.

### Configuration tool

Configure the docker-compose setup file. You can retrieve a `docker-compose.yml` file from `https://configuration.semi.technology`. Use the drop-down menus to generate the url with parameters, and perform the curl command to retrieve the file. *At the moment, it is not possible yet to turn off the `text2vec-contextionary` module. This will be supported in the near future, so you could add custom vectorizers and other modules.*

<div id="igui-install">
  <div id="igui-filters"></div>
  <pre>
    <code class="language-CURL" id="igui-code"></code>
  </pre>
</div>

Next, you can run the setup as follows:

```bash
$ docker-compose up
```

_Notes:_
- _Default parameters can be omitted._
- _`text2vec-contextionary` other than English are experimental. Any feedback? Let share it with us on [Github](https://github.com/semi-technologies/weaviate/issues) or [StackOverflow](https://stackoverflow.com/tags/weaviate/)._
- _For more information about Compound Splitting and other Contextionary parameters, [click here](../modules/text2vec-contextionary.html#compound-splitting)._
- _You can modify the configuration file to add for example [authentication](../configuration/authentication.html) or [authorization](../configuration/authorization.html)._

### Environment variables

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


### Attaching to the log output of only Weaviate

The output is quite verbose. You can attach the logs only to Weaviate itself, for example by running the following command instead of `docker-compose up`:

```bash
# Run Docker Compose
$ docker-compose up -d && docker-compose logs -f weaviate
```

Alternatively you can run docker-compose entirely detached with_ `docker-compose up -d` _and poll `{bindaddress}:{port}/v1/meta` until you receive status `200 OK`.

### Manual installation

You can also download the files manually if you have trouble with the above script.

1. `$ mkdir weaviate && cd weaviate` 
2. Save the [docker-compose configuration](https://configuration.semi.technology/docker-compose?) file as `docker-compose.yml`.
3. Run `docker-compose up` in the same location you've downloaded the files (or for less verbose, [attach to the log output of only Weaviate](#attaching-to-the-log-output-of-only-weaviate)).

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
