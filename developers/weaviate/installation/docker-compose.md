---
title: Docker Compose
sidebar_position: 2
image: og/docs/installation.jpg
# tags: ['installation', 'Docker']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Configurator

You can use the configuration tool below to customize your Weaviate setup for
your desired runtime.

<!-- {% include docs-config-gen.html %} -->

import DocsConfigGen from '/_includes/docs-config-gen.mdx';

<DocsConfigGen />

## Example configurations

:::note
If you are new to Docker (Compose) and containerization, check out our [Docker Introduction for Weaviate Users](https://medium.com/semi-technologies/what-weaviate-users-should-know-about-docker-containers-1601c6afa079).
:::

To start Weaviate with docker-compose, you need a docker-compose configuration file, typically called `docker-compose.yml`. You can obtain it from the configuration tool above or alternatively pick one of the examples below. Additional environment variables can be set in this file, which control your Weaviate setup, authentication and authorization, module settings, and data storage settings.

:::info List of environment variables
A comprehensive of list environment variables [can be found on this page](../config-refs/env-vars.md).
:::

### Persistent volume

It's recommended to set a persistent volume to avoid data loss and improve reading and writing speeds.

Add the following snippet to your Docker Compose YAML file:

```yaml
services:
  weaviate:
    volumes:
      - /var/weaviate:/var/lib/weaviate
    # etc
```

Make sure to run `$ docker-compose down` when shutting down, this writes all the files from memory to disk.

### Weaviate without any modules

An example docker-compose setup for Weaviate without any modules can be found
below. In this case, no model inference is performed at either import or search
time. You will need to provide your own vectors (e.g. from an outside ML model)
at import and search time:

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      CLUSTER_HOSTNAME: 'node1'
```

### Weaviate with the `text2vec-transformers` module

An example docker-compose setup file with the transformers model [`sentence-transformers/multi-qa-MiniLM-L6-cos-v1`](https://huggingface.co/sentence-transformers/multi-qa-MiniLM-L6-cos-v1) is:

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:||site.weaviate_version||
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
      CLUSTER_HOSTNAME: 'node1'
  t2v-transformers:
    image: semitechnologies/transformers-inference:sentence-transformers-multi-qa-MiniLM-L6-cos-v1
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
page](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers.md).

The `text2vec-transformers` module requires at least Weaviate version `v1.2.0`.

## Multi-node setup

You can create a multi-node setup with Weaviate using Docker-Compose. To do so, you need to:
- Set up one node as a "founding" member, and configure the other nodes in the cluster to join it using the `CLUSTER_JOIN` variable.
- Configure `CLUSTER_GOSSIP_BIND_PORT` and `CLUSTER_DATA_BIND_PORT` for each node.
- Optionally, you can set the hostname for each node using `CLUSTER_HOSTNAME`.

So, the configuration file will include environment variables for the "founding" member that looks like the below:

```yaml
  weaviate-node-1:  # Founding member service name
    ...  # truncated for brevity
    environment:
      CLUSTER_HOSTNAME: 'node1'
      CLUSTER_GOSSIP_BIND_PORT: '7100'
      CLUSTER_DATA_BIND_PORT: '7101'
```

And the other members' configurations may look like this:

```yaml
  weaviate-node-2:
    ...  # truncated for brevity
    environment:
      CLUSTER_HOSTNAME: 'node2'
      CLUSTER_GOSSIP_BIND_PORT: '7102'
      CLUSTER_DATA_BIND_PORT: '7103'
      CLUSTER_JOIN: 'weaviate-node-1:7100'  # This must be the service name of the "founding" member node.
```

We provide an example `docker-compose.yml` below:

<details>
  <summary>An example multi-node Docker-Compose file</summary>

```yaml
services:
  weaviate-node-1:
    init: true
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 6060:6060
    restart: on-failure:0
    volumes:
      - ./data-node-1:/var/lib/weaviate
    environment:
      LOG_LEVEL: 'debug'
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      CLUSTER_HOSTNAME: 'node1'
      CLUSTER_GOSSIP_BIND_PORT: '7100'
      CLUSTER_DATA_BIND_PORT: '7101'

  weaviate-node-2:
    init: true
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8081:8080
    - 6061:6060
    restart: on-failure:0
    volumes:
      - ./data-node-2:/var/lib/weaviate
    environment:
      LOG_LEVEL: 'debug'
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      CLUSTER_HOSTNAME: 'node2'
      CLUSTER_GOSSIP_BIND_PORT: '7102'
      CLUSTER_DATA_BIND_PORT: '7103'
      CLUSTER_JOIN: 'weaviate-node-1:7100'
```

</details>

:::note Port number conventions
It is a Weaviate convention to set the `CLUSTER_DATA_BIND_PORT` to 1 higher than `CLUSTER_GOSSIP_BIND_PORT`.
:::

[Read more about horizontal replication in Weaviate.](../concepts/cluster.md)

## Shell attachment options

The output of `docker-compose up` is quite verbose as it attaches to the logs of all containers.

You can attach the logs only to Weaviate itself, for example, by running the following command instead of `docker-compose up`:

```bash
# Run Docker Compose
$ docker-compose up -d && docker-compose logs -f weaviate
```

Alternatively you can run docker-compose entirely detached with `docker-compose up -d` _and_ then poll `{bindaddress}:{port}/v1/meta` until you receive a status `200 OK`.

<!-- TODO:
1. Check that all environment variables are also applicable for the kubernetes setup and associated values.yaml config file.
2. Take this section out and into References; potentially consolidate with others as they are strewn around the docs. (E.g. backup env variables are not included here.) -->

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
