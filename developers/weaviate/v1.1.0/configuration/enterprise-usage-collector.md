---
layout: layout-documentation
solution: weaviate
sub-menu: Configuration
title: Enterprise Usage Collector
description: Enterprise Usage Collector
tags: ['configuration']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
toc: true
---

<!-- sets the current version tags -->
{% include docs-current_version_finder.html %}

# Introduction

When using Weaviate Enterprise, a proxy service is placed in between the user (or load balancer) and Weaviate. The service measures how Weaviate is used without sending through any sensitive information (e.g., function, durations, payload sizes). Below you can find an outline on how to add the proxy service to your setup.

## 1. Collect a Weaviate Enterprise Token

- Login into the [Weaviate Console](https://console.semi.technology).
- Click the profile symbol in the top menu and collect the key, which is shown to you. Note, this key is a secret, and you should not make this available in public repositories.

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
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '4000' # <== SET TO 4000
    - --scheme
    - http
    depends_on:
    - esvector
    image: semitechnologies/weaviate:{{ site.weaviate_version }}
    ports:
    - 4000:4000 # <== SET TO 4000:4000
    restart: on-failure:0
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: text2vec-contextionary

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
    - '4000' # <== SET TO 4000
    - --scheme
    - http
    depends_on:
    - esvector
    image: semitechnologies/weaviate:{{ site.weaviate_version }}
    ports:
    - 4000:4000 # <== SET TO 4000:4000
    restart: on-failure:0
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: text2vec-contextionary
  contextionary:
    environment:
      OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
      SCHEMA_PROVIDER_URL: etcd:2379
      NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
      ENABLE_COMPOUND_SPLITTING: 'false'
    image: semitechnologies/contextionary:en0.16.0-v0.4.21
    ports:
    - 9999:9999
  enterprise-proxy: 
    image: semitechnologies/weaviate-enterprise-usage-collector:latest
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
```
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