---
title: Installation Overview
sidebar_position: 0
# layout: layout-documentation
# solution: weaviate
# sub-menu: Installation
# intro: You can run Weaviate using the Weaviate Cloud Service or ​host it yourself. ​For self-hosted versions, ​Weaviate is completely containerized; you can use Docker Compose and/or Kubernetes to run it.
# description: Install Weaviate, Weaviate is completely containerized, you can use Docker Compose and/or Kubernetes to run it.
# tags: ['installation']
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/current/get-started/install.html
#     - /documentation/weaviate/current/getting-started/installation.html
---

# Running Weaviate

​Weaviate versions on the Weaviate Cloud Service (WCS) and Weaviate open source are identical, with the only difference that the WCS manages your Weaviate instance for you and comes with a specific SLA, whereas Weaviate open source comes with a [BSD-3 license](https://github.com/semi-technologies/weaviate/blob/master/LICENSE).

You have three options to run Weaviate, all come with their own installation guides.

* [Weaviate Cluster Service](./weaviate-cloud-service.html) – advised for users who want to use a managed Weaviate service.
* [Docker Compose](./docker-compose.html) – advised for those who want to develop on Weaviate.
* [Kubernetes](./kubernetes.html) – advised for production setups.

> 💡 When self-hosting, we recommend starting with the Docker Compose configurator and set up to get a feel for how Weaviate operates. You can later adopt this knowledge when you are creating your Helm charts.

## Run an unreleased version

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