---
title: Enterprise Usage Collector
sidebar_position: 11
# layout: layout-documentation
# solution: weaviate
# sub-menu: Configuration
# title: Enterprise Usage Collector
# description: Enterprise Usage Collector
# tags: ['configuration']
# sidebar_position: 6
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.1.0/configuration/enterprise-usage-collector.html
---

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
    - --port
    - '4000' # <== SET TO 4000
    # rest of the docker-compose.yml
```

## Using the Docker configurator

You can also use the Docker compose [configurator](../getting-started/installation.html#docker-compose). Make sure to select `Enabled` for the Enterprise Usage Collector option.

## Collector proxy on Kubernetes using Helm

Obtain your token as described in step 1.

Get a Weaviate [helm chart](https://github.com/semi-technologies/weaviate-helm/releases) of version `{{ site.helm_version }}` or higher. 

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
