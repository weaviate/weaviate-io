---
title: Example Datasets
sidebar_position: 9
# layout: layout-documentation
# solution: weaviate
# sub-menu: Tutorials
# title: Example datasets
# intro: 
# description: Example datasets
# tags: ['example datasets']
# sidebar_position: 10
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.14.1/more-resources/example-datasets.html
#     - /documentation/weaviate/current/datasets/newspublications.html
#     - /documentation/weaviate/current/getting-started/example-datasets.html
#     - /developers/weaviate/current/getting-started/example-datasets.html
#     - /developers/weaviate/current/more-resources/example-datasets.html
---

There are a few example datasets available.

# News publications

This dataset contains +/- 1000 random news articles from; Financial Times, New York Times, Guardian, Wallstreet Journal, CNN, Fox News, The Economist, New Yorker, Wired, Vogue, Game Informer.

It includes a [schema](../tutorials/how-to-create-a-schema.html) with classes for `Article`, `Publication`, `Category` and `Author`. 

### Run with Docker Compose

If you want to run this dataset locally, you can run it in one go with Docker Compose.

You can run this demo dataset with any `text2vec` module. Examples:

#### Text2vec-contextionary

The Docker Compose file contains both Weaviate with the `text2vec-contextionary` module and the dataset.

Download the Docker Compose file

```bash
$ curl -o docker-compose.yml https://raw.githubusercontent.com/semi-technologies/weaviate-examples/main/weaviate-contextionary-newspublications/docker-compose.yaml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
$ docker-compose up
```

Weaviate will be available and preloaded with the News Articles demo dataset on:

- `http://localhost:8080/`
- [Via the Console](https://console.semi.technology/): connect to `https://demo.dataset.playground.semi.technology`.

#### Text2vec-transformers (without GPU)

The Docker Compose file contains both Weaviate with the `text2vec-contextionary` module, `NER` module, `Q&A` module and `spellcheck` module, and the dataset.

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

#### Text2vec-transformers (with GPU enabled)

The Docker Compose file contains both Weaviate with the `text2vec-contextionary` module, `NER` module, `Q&A` module and `spellcheck` module, and the dataset. GPU should be available on your machine when running this configuration.

Download the Docker Compose file

```bash
$ curl -o docker-compose.yml https://raw.githubusercontent.com/semi-technologies/weaviate-examples/main/weaviate-transformers-newspublications/docker-compose-gpu.yaml
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
