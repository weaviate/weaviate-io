---
title: Example datasets
sidebar_position: 5
# layout: layout-documentation
# solution: weaviate
# sub-menu: More resources
# title: Example datasets
# intro: There are currently two demo datasets available. If you have a dataset you want to add, please contact us, we're happy to help you setting it up.
# description: Example datasets
# tags: ['example datasets']
# sidebar_position: 3
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.11.0/tutorials/example-datasets.html
#     - /developers/weaviate/v1.14.1/more-resources/example-datasets.html
#     - /documentation/weaviate/current/datasets/newspublications.html
#     - /documentation/weaviate/current/getting-started/example-datasets.html
#     - /developers/weaviate/current/getting-started/example-datasets.html
---

# Multi-Modal Text/Image search using CLIP

This example application spins up a Weaviate instance using the
[multi2vec-clip](/developers/weaviate/current/modules/multi2vec-clip.html)
module, imports a few sample images (you can add your own images, too!) and
provides a very simple search frontend in [React](https://reactjs.org/) using
the [Weaviate JS Client](/developers/weaviate/current/client-libraries/javascript.html)

[Get started here](https://github.com/semi-technologies/weaviate-examples/blob/main/clip-multi-modal-text-image-search/README.md)

# Semantic Search through Wikipedia

We imported the complete English language Wikipedia article dataset into a single Weaviate instance to conduct semantic search queries through the Wikipedia articles, besides this, we've made all the graph relations between the articles too. We have made the import scripts, pre-processed articles, and backup available so that you can run the complete setup yourself.

[Get started here](https://github.com/semi-technologies/semantic-search-through-Wikipedia-with-Weaviate)

# Meta AI Research - Biggraph on Wikidata

We have imported the complete Wikidata PBG model into a Weaviate to search through the entire dataset in < 50 milliseconds (excluding internet latency). The demo GraphQL queries contain both pure vector search and scalar and vector searched mixed queries.

[Get started here](https://github.com/semi-technologies/biggraph-wikidata-search-with-weaviate)

# News publications

This dataset contains +/- 1000 random news articles from; Financial Times, New York Times, Guardian, Wallstreet Journal, CNN, Fox News, The Economist, New Yorker, Wired, Vogue, Game Informer.

It includes a [schema](../tutorials/how-to-create-a-schema.html) with classes for `Article`, `Publication`, `Category` and `Author`. 

### Run with Docker Compose

If you want to run this dataset locally, you can run it in one go with Docker Compose.

The Docker Compose files below contain both Weaviate and the dataset.

Download the Docker Compose file

```bash
$ curl -o docker-compose.yml https://raw.githubusercontent.com/semi-technologies/weaviate-examples/main/weaviate-transformers-newspublications/docker-compose.yaml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
$ docker-compose up
```

Weaviate will be available and preloaded with the News Articles demo dataset on:

- `http://localhost:8080/`
- [Via the Console](https://console.semi.technology/): connect to `https://demo.dataset.playground.semi.technology`.

### Run manually

If you have your own version of Weaviate running on an **external** host or localhost **without** Docker Compose;

```bash
# WEAVIATE ORIGIN (e.g., https://foobar.semi.network), note paragraph basics for setting the local IP
$ export WEAVIATE_ORIGIN=WEAVIATE_ORIGIN
# Optionally you can specify which newspaper language you want (only two options `cache-en` or `cache-nl`, if not specified by default it is `cache-en` )
$ export CACHE_DIR=<YOUR_CHOICE_OF_CACHE_DIR>
# Optionally you can set the batch size (if not specified by default 200)
$ export BATCH_SIZE=<YOUR_CHOICE_OF_BATCH_SIZE>
# Make sure to replace WEAVIATE_ORIGIN with the Weaviate origin as mentioned in the basics above
$ docker run -it -e weaviate_host=$WEAVIATE_ORIGIN -e cache_dir-$CACHE_DIR -e batch_size=$BATCH_SIZE semitechnologies/weaviate-demo-newspublications:latest

```

Usage with Docker on **local with** Docker Compose;

_Note: run this from the same directory where the Weaviate Docker Compose files are located_

{% raw %}
```bash
# This gets the weaviate container name and because the docker uses only lowercase we need to do it too (Can be found manually if 'tr' does not work for you)
$ export WEAVIATE_ID=$(echo ${PWD##*/}_weaviate_1 | tr "[:upper:]" "[:lower:]")
# WEAVIATE ORIGIN (e.g., http://localhost:8080), note the paragraph "basics" for setting the local IP
$ export WEAVIATE_ORIGIN="http://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $WEAVIATE_ID):8080"
# WEAVIATE NETWORK (see paragraph: Running on the localhost)
$ export WEAVIATE_NETWORK=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.NetworkID}}{{end}}' $WEAVIATE_ID)
# Optionally you can specify which newspaper language you want (only two options `cache-en` or `cache-nl`, if not specified by default it is `cache-en` )
$ export CACHE_DIR=<YOUR_CHOICE_OF_CACHE_DIR>
# Optionally you can set the batch size (if not specified by default 200)
$ export BATCH_SIZE=<YOUR_CHOICE_OF_BATCH_SIZE>
# Run docker
$ docker run -it --network=$WEAVIATE_NETWORK -e weaviate_host=$WEAVIATE_ORIGIN -e cache_dir-$CACHE_DIR -e batch_size=$BATCH_SIZE  semitechnologies/weaviate-demo-newspublications:latest
```
{% endraw %}

# More Resources

{% include docs-support-links.html %}