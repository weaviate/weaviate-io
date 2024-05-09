---
title: Example datasets
sidebar_position: 5
image: og/docs/more-resources.jpg
# tags: ['example datasets']
---

## Multi-Modal Text/Image search using CLIP

This example application spins up a Weaviate instance using the
[multi2vec-clip](/developers/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip.md)
module, imports a few sample images (you can add your own images, too!) and
provides a very simple search frontend in [React](https://reactjs.org/) using
the [TypeScript/JavaScript](/developers/weaviate/client-libraries/typescript/index.mdx) client.

[Get started here](https://github.com/weaviate/weaviate-examples/blob/main/clip-multi-modal-text-image-search/README.md)

## Semantic Search through Wikipedia

We imported the complete English language Wikipedia article dataset into a single Weaviate instance to conduct semantic search queries through the Wikipedia articles, besides this, we've made all the graph relations between the articles too. We have made the import scripts, pre-processed articles, and backup available so that you can run the complete setup yourself.

[Get started here](https://github.com/weaviate/semantic-search-through-Wikipedia-with-Weaviate)

## Meta AI Research - Biggraph on Wikidata

We have imported the complete Wikidata PBG model into a Weaviate to search through the entire dataset in < 50 milliseconds (excluding internet latency). The demo GraphQL queries contain both pure vector search and scalar and vector searched mixed queries.

[Get started here](https://github.com/weaviate/biggraph-wikidata-search-with-weaviate)

## News publications

This dataset contains +/- 1000 random news articles from; Financial Times, New York Times, Guardian, Wallstreet Journal, CNN, Fox News, The Economist, New Yorker, Wired, Vogue, Game Informer.

It includes a [schema](../starter-guides/schema.md) with classes for `Article`, `Publication`, `Category` and `Author`.

### Run with Docker Compose

If you want to run this dataset locally, you can run it in one go with Docker Compose.

You can run this demo dataset with any `text2vec` module. Examples:

#### Text2vec-contextionary

The Docker Compose file contains both Weaviate with the `text2vec-contextionary` module and the dataset.

Download the Docker Compose file

```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/weaviate/weaviate-examples/main/weaviate-contextionary-newspublications/docker-compose.yaml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
docker compose up
```

To work with the News Articles demo dataset, connect to  `http://localhost:8080/`.

#### Text2vec-transformers (without GPU)

The Docker Compose file contains both Weaviate with the `text2vec-contextionary` module, `NER` module, `Q&A` module and `spellcheck` module, and the dataset.

Download the Docker Compose file

```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/weaviate/weaviate-examples/main/weaviate-transformers-newspublications/docker-compose.yml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
docker compose up
```

To work with the News Articles demo dataset, connect to  `http://localhost:8080/`.

#### Text2vec-transformers (with GPU enabled)

The Docker Compose file contains both Weaviate with the `text2vec-contextionary` module, `NER` module, `Q&A` module and `spellcheck` module, and the dataset. GPU should be available on your machine when running this configuration.

Download the Docker Compose file

```bash
curl -o docker-compose.yml https://raw.githubusercontent.com/weaviate/weaviate-examples/main/weaviate-transformers-newspublications/docker-compose-gpu.yaml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
docker compose up
```

To work with the News Articles demo dataset, connect to  `http://localhost:8080/`.

### Run manually

If you have your own version of Weaviate running on an **external** host or localhost **without** Docker Compose;

```bash
# WEAVIATE ORIGIN (e.g., https://foobar.weaviate.network), note paragraph basics for setting the local IP
export WEAVIATE_ORIGIN=WEAVIATE_ORIGIN
# Optionally you can specify which newspaper language you want (only two options `cache-en` or `cache-nl`, if not specified by default it is `cache-en` )
export CACHE_DIR=<YOUR_CHOICE_OF_CACHE_DIR>
# Optionally you can set the batch size (if not specified by default 200)
export BATCH_SIZE=<YOUR_CHOICE_OF_BATCH_SIZE>
# Make sure to replace WEAVIATE_ORIGIN with the Weaviate origin as mentioned in the basics above
docker run -it -e weaviate_host=$WEAVIATE_ORIGIN -e cache_dir-$CACHE_DIR -e batch_size=$BATCH_SIZE semitechnologies/weaviate-demo-newspublications:latest

```

Usage with Docker on **local with** Docker Compose;

_Note: run this from the same directory where the Docker Compose files are located_

{% raw %}
```bash
# This gets the Weaviate container name and because the docker uses only lowercase we need to do it too (Can be found manually if 'tr' does not work for you)
export WEAVIATE_ID=$(echo ${PWD##*/}_weaviate_1 | tr "[:upper:]" "[:lower:]")
# WEAVIATE ORIGIN (e.g., http://localhost:8080), note the paragraph "basics" for setting the local IP
export WEAVIATE_ORIGIN="http://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $WEAVIATE_ID):8080"
# WEAVIATE NETWORK (see paragraph: Running on the localhost)
export WEAVIATE_NETWORK=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.NetworkID}}{{end}}' $WEAVIATE_ID)
# Optionally you can specify which newspaper language you want (only two options `cache-en` or `cache-nl`, if not specified by default it is `cache-en` )
export CACHE_DIR=<YOUR_CHOICE_OF_CACHE_DIR>
# Optionally you can set the batch size (if not specified by default 200)
export BATCH_SIZE=<YOUR_CHOICE_OF_BATCH_SIZE>
# Run docker
docker run -it --network=$WEAVIATE_NETWORK -e weaviate_host=$WEAVIATE_ORIGIN -e cache_dir-$CACHE_DIR -e batch_size=$BATCH_SIZE  semitechnologies/weaviate-demo-newspublications:latest
```
{% endraw %}


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
