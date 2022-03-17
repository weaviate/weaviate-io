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

To start Weaviate with docker-compose, you need a docker-compose configuration file. Environment variables can be set in this file, which regulate your Weaviate setup, authentication and authorization, Contextionary settings, and data storage settings.

### Configuration tool

Configure the docker-compose setup file. You can retrieve a `docker-compose.yml` file from `https://configuration.semi.technology`. Use the drop-down menus to generate the url with parameters, and perform the curl command to retrieve the file.

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
- _The Dutch, German, Italian and Czech Contextionaries are experimental. Any feedback? Let share it with us on [Github](https://github.com/semi-technologies/weaviate/issues) or [StackOverflow](https://stackoverflow.com/tags/weaviate/)._
- For more information about Compound Splitting and other Contextionary parameters, [click here](../more-resources/contextionary.html#compound-splitting).
- _You can modify the configuration file to add for example [authentication](../configuration/authentication.html) or [authorization](../configuration/authorization.html)._


### Environment variables

An overview of environment variables in the docker-compose file:

| Variable | Description | Type | Example Value |
  | --- | --- | --- | --- |
  | `ORIGIN` | Set the http(s) origin for Weaviate | `string - HTTP origin` | `https://my-weaviate-deployment.com` |
  | `CONTEXTIONARY_URL` | Service-Discovery for the contextionary container | `string - URL` | `http://contextionary` |
  | `ESVECTOR_URL` | Service-Discovery for the Elasticsearch instance | `string - URL` | `http://esvector:9200` | 
  | `ESVECTOR_NUMBER_OF_SHARDS` | Configure default number of ES shards | `int` | `1` |
  | `ESVECTOR_AUTO_EXPAND_REPLICAS` | Wheter ES should auto expand replicas | `string` | `1-3` |
  | `PERSISTENCE_DATA_PATH` | Where should Weaviate Standalone store its data? | `string - file path` | `/var/lib/weaviate` |
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

# Weaviate Cluster Service

The Weaviate Cloud Service (WCS) is currently in beta, you can create a free Weaviate cluster that lasts for 5 days completely for free. You can [try it out here](https://console.semi.technology) and if you do, we would love to hear your feedback.

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

### etcd Disaster Recovery

The weaviate chart depends on the bitnami `etcd` chart to provision `etcd` in
the namespace. `etcd` is a vital component to Weaviate as it provides
abilities for distributed RW locking as well as consistent configuration for
critical areas.

Unfortunately, without *disaster recovery* enabled, the `etcd` cluster can end
up in a deadlock situation without a possibility to recover. If a majority of
`etcd` pods become unavailable, it's impossible for new members to join. So
especially with small cluster sizes, such as three pods, it only takes the
simultaneous death of two pods for the cluster to be unrecoverable.

As a mitigation for this disaster scenario, the `etcd` chart (>= `v3.0.0`)
provides a *disaster recovery* option, where the etcd cluster can be resurrected
without a minimum number of pods. For this a snapshot is created at a regular
interval, which can then be read back to bootstrap a "new" cluster.

#### When should this feature be enabled?

We recommend this feature to be enabled in any scenario where Weaviate should
be able to survive cluster node upgrades,  cluster auto-scaling or random node
deaths (as they are quite common on Kubernetes).

#### Why is not enabled by default if it's so important?

This snapshotting process requires an nfs volume. This in turn requires an nfs
provisioner, such as `@stable/nfs-server-provisioner`. Since we cannot assume
that the provisioner is present on a random cluster, the chart has to default
to `etcd.disasterRecovery.enabled: false` (see `values.yaml`). Nevertheless, we
recommend turning this on in most cases.

Unfortunately bundling an nfs provisioner with Weaviate is impossible because
of the different life cycles. The provisioner should be deployed before weaviate
is deployed and only removed after Weaviate is removed. Otherwise - if the
provisioner were to be torn down with weaviate - it would be impossible to
destroy the volumes it created when deploying Weaviate.

#### How can I turn it on?

**Step 1: Make sure the cluster supports nfs volumes**

The easiest way to do so is to deploy `@stable/nfs-server-provisioner` into
the `default` namespace. For example, run:

```bash
helm upgrade \
  nfs-server-provisioner \
  stable/nfs-server-provisioner \
  --install \
  --namespace default \
  --version "1.1.1" \
  --set persistence.enabled=true \
  --set persistence.size=10Gi
```

**Step 2: Turn on disaster recovery**

In your `values.yaml` set `etcd.disasterRecovery.enabled` to `true`, then
deploy Weaviate normally with your `values.yaml`.

Alternatively, if you don't want to use a `values.yaml`, include `--set
etcd.disasterRecover.enabled=true` in your `helm install` or `helm upgrade`
command.

# Weaviate Enterprise Usage Collector

When using Weaviate Enterprise, a proxy service is placed in between the user (or load balancer) and Weaviate. The service measures how Weaviate is used without sending through any sensitive information (e.g., function, durations, payload sizes). Below you can find an outline on how to add the proxy service to your setup.

## 1. Collect a Weaviate Enterprise Token

- Login into the [Weaviate Console](https://console.semi.technology).
- Click the key symbol in the top menu and collect the key, which is shown to you. Note, this key is a secret, and you should not make this available in public repositories.

![Weaviate Enterprise token selector](/img/select-key.gif)

## 2. Add the Weaviate Enterprise Usage Collector to your Docker-compose file

If you are using the Docker-compose file from the installation configurator, you need to add the following block to your YAML file.

```yaml
services:
    enterprise-proxy: 
    image: semitechnologies/weaviate-enterprise-usage-collector:latest
    environment:
      - weaviate_enterprise_token=[[ WEAVIATE TOKEN ]]
      - weaviate_enterprise_project=[[ PROJECT NAME ]]
    links: 
      - "weaviate:weaviate.com"
    ports: 
      - "8080:8080"
    depends_on: 
      - weaviate
```

* `weaviate_enterprise_token` = is the token you collected in the previous step.
* `weaviate_enterprise_project` = can be any identifier picked by you to identify the Weaviate cluster. For example, if you have a development and production setup, you might choose `weaviate_enterprise_project=my-project-dev` and  `weaviate_enterprise_project=my-project-prod`.

## 3. Set the Weaviate ports to redirect to the proxy

Because you will route all traffic through the Enterprise proxy, you have to make sure Weaviate accepts the incoming traffic on port 4000.

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '4000' # <== SET TO 4000
    - --scheme
    - http
    image: semitechnologies/weaviate:0.23.2
    ports:
    - 4000:4000 # <== SET TO 4000:4000
    restart: on-failure:0
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
```

## Complete Docker-compose example

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '4000'
    - --scheme
    - http
    image: semitechnologies/weaviate:0.23.2
    restart: on-failure:0
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
  contextionary:
    environment:
      OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
      EXTENSIONS_STORAGE_MODE: weaviate
      EXTENSIONS_STORAGE_ORIGIN: http://weaviate:8080
      NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
      ENABLE_COMPOUND_SPLITTING: 'false'
    image: semitechnologies/contextionary:en0.16.0-v0.4.21
    ports:
    - 9999:9999
  enterprise-proxy:
    image: semitechnologies/weaviate-enterprise-usage-collector:0.2.1
    environment:
      - weaviate_enterprise_token=00000000-0000-0000-0000-000000000000
      - weaviate_enterprise_project=demo_project
    links:
      - "weaviate:weaviate.com"
    ports:
      - "8080:8080"
    depends_on:
      - weaviate
...
```

## Collector proxy on Kubernetes using Helm

Obtain your token as described in step 1.

Get a weaviate [helm chart](https://github.com/semi-technologies/weaviate-helm/releases) of version `{{ site.weaviate_versions[current_page_version].helm_version }}` or higher. 

Enable the proxy and configure the proxy using the `collector_proxy` key from the `values.yaml` like so:
```yaml
collector_proxy:
  enabled: true
  tag: latest
  weaviate_enterprise_token: "00000000-0000-0000-0000-000000000000"
  weaviate_enterprise_project: "demo_project"
  service:
    name: "usage-proxy"
    port: 80
    type: LoadBalancer
```

Deploy the helm chart and make sure to use the proxy service for your requests. 


# More Resources

{% include docs-support-links.html %}
