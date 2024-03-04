---
title: Docker Compose
sidebar_position: 2
image: og/docs/installation.jpg
# tags: ['installation', 'Docker']
---

Weaviate supports deployment with Docker. If you use the default values, you don't need a `docker-compose.yml` file to run the image. To customize your instance, edit the configuration settings in the `docker-compose.yml` file.

## Default Weaviate environment

:::info Added in v1.24.1

:::

The default docker image doesn't need any configuration. To run a basic Weaviate instance, run this command from a terminal:

```bash
 docker run -p 8080:8080 -p 50051:50051 cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
```

The command sets the following default values:

- `PERSISTENCE_DATA_PATH` defaults to `./data`
- `AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED` defaults to `true`.
- `QUERY_DEFAULTS_LIMIT` defaults to `10`.

## Sample Docker Compose file

We prepared a starter Docker Compose file, which will let you:
* Run vector searches with `Cohere`, `HuggingFace`, `OpenAI`, and `Google` modules.
* Search already vectorized data – no vectorizer required.
* Retrieval augmented generation (RAG) with `OpenAI` (i.e. `gpt-4`), `Cohere`, `Google` modules.

### Download and run

Save the text below as `docker-compose.yml`:

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 50051:50051
    volumes:
    - weaviate_data:/var/lib/weaviate
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      ENABLE_MODULES: 'text2vec-cohere,text2vec-huggingface,text2vec-palm,text2vec-openai,generative-openai,generative-cohere,generative-palm,ref2vec-centroid,reranker-cohere,qna-openai'
      CLUSTER_HOSTNAME: 'node1'
volumes:
  weaviate_data:
...
```

Edit the `docker-compose.yml` file to add your local configuration. To start your Weaviate instance, run this command in your shell:

```bash
docker compose up -d
```

## Configurator

The Configurator can generate a `docker-compose.yml` file for you. Use the Configurator to select specific Weaviate modules, including vectorizers that run locally (i.e. `text2vec-transformers`, or `multi2vec-clip`)

<!-- {% include docs-config-gen.html %} -->

import DocsConfigGen from '/_includes/docs-config-gen.mdx';

<DocsConfigGen />

## Environment variables

You can use environment variables to control your Weaviate setup, authentication and authorization, module settings, and data storage settings.

:::info List of environment variables
A comprehensive of list environment variables [can be found on this page](../config-refs/env-vars.md).
:::

## Example configurations

Here are some examples of how to configure `docker-compose.yml`.

### Persistent volume

It's recommended to set a persistent volume to avoid data loss and improve reading and writing speeds.

Make sure to run `docker compose down` when shutting down. This writes all the files from memory to disk.

**With named volume**
```yaml
services:
  weaviate:
    volumes:
        - weaviate_data:/var/lib/weaviate
    # etc

volumes:
    weaviate_data:
```

After running a `docker compose up -d`, Docker will create a named volume `weaviate_data` and mount it to the `PERSISTENCE_DATA_PATH` inside the container.

**With host binding**
```yaml
services:
  weaviate:
    volumes:
      - /var/weaviate:/var/lib/weaviate
    # etc
```

After running a `docker compose up -d`, Docker will mount `/var/weaviate` on the host to the `PERSISTENCE_DATA_PATH` inside the container.

### Weaviate without any modules

An example Docker Compose setup for Weaviate without any modules can be found below. In this case, no model inference is performed at either import or search time. You will need to provide your own vectors (e.g. from an outside ML model) at import and search time:

```yaml
version: '3.4'
services:
  weaviate:
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 50051:50051
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      CLUSTER_HOSTNAME: 'node1'
```

### Weaviate with the `text2vec-transformers` module

An example Docker Compose file with the transformers model [`sentence-transformers/multi-qa-MiniLM-L6-cos-v1`](https://huggingface.co/sentence-transformers/multi-qa-MiniLM-L6-cos-v1) is:

```yaml
version: '3.4'
services:
  weaviate:
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    restart: on-failure:0
    ports:
    - 8080:8080
    - 50051:50051
    environment:
      QUERY_DEFAULTS_LIMIT: 20
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: "./data"
      DEFAULT_VECTORIZER_MODULE: text2vec-transformers
      ENABLE_MODULES: text2vec-transformers
      TRANSFORMERS_INFERENCE_API: http://t2v-transformers:8080
      CLUSTER_HOSTNAME: 'node1'
  t2v-transformers:
    image: cr.weaviate.io/semitechnologies/transformers-inference:sentence-transformers-multi-qa-MiniLM-L6-cos-v1
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

You can create a multi-node setup with Weaviate using docker compose. To do so, you need to:
- Set up one node as a "founding" member, and configure the other nodes in the cluster to join it using the `CLUSTER_JOIN` variable.
- Configure `CLUSTER_GOSSIP_BIND_PORT` and `CLUSTER_DATA_BIND_PORT` for each node.
- Optionally, you can set the hostname for each node using `CLUSTER_HOSTNAME`.

(Read more about [horizontal replication in Weaviate](../concepts/cluster.md).)

So, the Docker Compose file includes environment variables for the "founding" member that look like this:

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

Below is an example configuration for a 3-node setup. You may be able to test [replication](../configuration/replication.md) examples locally using this configuration.


<details>
  <summary>Docker Compose file for a replication setup with 3 nodes</summary>

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
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 6060:6060
    - 50051:50051
    restart: on-failure:0
    volumes:
      - ./data-node-1:/var/lib/weaviate
    environment:
      LOG_LEVEL: 'debug'
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      ENABLE_MODULES: 'text2vec-openai,text2vec-cohere,text2vec-huggingface'
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
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8081:8080
    - 6061:6060
    - 50052:50051
    restart: on-failure:0
    volumes:
      - ./data-node-2:/var/lib/weaviate
    environment:
      LOG_LEVEL: 'debug'
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      ENABLE_MODULES: 'text2vec-openai,text2vec-cohere,text2vec-huggingface'
      DEFAULT_VECTORIZER_MODULE: 'none'
      CLUSTER_HOSTNAME: 'node2'
      CLUSTER_GOSSIP_BIND_PORT: '7102'
      CLUSTER_DATA_BIND_PORT: '7103'
      CLUSTER_JOIN: 'weaviate-node-1:7100'

  weaviate-node-3:
    init: true
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8082:8080
    - 6062:6060
    - 50053:50051
    restart: on-failure:0
    volumes:
      - ./data-node-3:/var/lib/weaviate
    environment:
      LOG_LEVEL: 'debug'
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      ENABLE_MODULES: 'text2vec-openai,text2vec-cohere,text2vec-huggingface'
      DEFAULT_VECTORIZER_MODULE: 'none'
      CLUSTER_HOSTNAME: 'node3'
      CLUSTER_GOSSIP_BIND_PORT: '7104'
      CLUSTER_DATA_BIND_PORT: '7105'
      CLUSTER_JOIN: 'weaviate-node-1:7100'
```

</details>

:::note Port number conventions
It is a Weaviate convention to set the `CLUSTER_DATA_BIND_PORT` to 1 higher than `CLUSTER_GOSSIP_BIND_PORT`.
:::


## Shell attachment options

The output of `docker compose up` is quite verbose as it attaches to the logs of all containers.

You can attach the logs only to Weaviate itself, for example, by running the following command instead of `docker compose up`:

```bash
# Run Docker Compose
docker compose up -d && docker compose logs -f weaviate
```

Alternatively you can run docker compose entirely detached with `docker compose up -d` _and_ then poll `{bindaddress}:{port}/v1/meta` until you receive a status `200 OK`.

<!-- TODO:
1. Check that all environment variables are also applicable for the kubernetes setup and associated values.yaml config file.
2. Take this section out and into References; potentially consolidate with others as they are strewn around the docs. (E.g. backup env variables are not included here.) -->

## Related pages

- If you are new to Docker, see [Docker Introduction for Weaviate Users](/blog/docker-and-containers-with-weaviate).

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
