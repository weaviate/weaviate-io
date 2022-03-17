---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Example datasets
intro: There are currently two demo datasets available. If you have a dataset you want to add, please contact us, we're happy to help you setting it up.
description: Example datasets
tags: ['example datasets']
menu-order: 3
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# News publications

This dataset contains +/- 1000 random news articles from; Financial Times, New York Times, Guardian, Wallstreet Journal, CNN, Fox News, The Economist, New Yorker, Wired, Vogue, Game Informer.

It includes a [schema](../how-tos/how-to-create-a-schema.html) with classes for `Article`, `Publication`, `Category` and `Author`. 

### Run with Docker Compose

If you want to run this dataset locally, you can run it in one go with Docker Compose.

The Docker Compose files below contain both Weaviate and the dataset.

Download the Docker Compose file

```bash
$ curl -o docker-compose.yml https://raw.githubusercontent.com/semi-technologies/DEMO-datasets/6cddc4e11e37bc5334fcfb29e78c7038306db60a/newspublications/docker-compose.yml
```

Run Docker (optional: run with `-d` to run Docker in the background)

```bash
$ docker-compose up
```

Weaviate will be available and preloaded with the News Articles demo dataset on:

- `http://localhost:8080/`
- [Via the Console](https://console.semi.technology/)

### Run manually

If you have your own version of Weaviate running on an **external** host or localhost **without** Docker Compose;

```bash
# WEAVIATE ORIGIN (e.g., https://foobar.semi.network), note paragraph basics for setting the local IP
$ export WEAVIATE_ORIGIN=WEAVIATE_ORIGIN
# Make sure to replace WEAVIATE_ORIGIN with the Weaviate origin as mentioned in the basics above
$ docker run -i -e weaviate_host=$WEAVIATE_ORIGIN semitechnologies/weaviate-demo-newspublications:0.23.2
```

Usage with Docker on **local with** Docker Compose;

_Note: run this from the same directory where the Weaviate Docker Compose files are located_

{% raw %}
```bash
# WEAVIATE ORIGIN (e.g., http://localhost:8080), note the paragraph "basics" for setting the local IP
$ export WEAVIATE_ORIGIN="http://$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' ${PWD##*/}_weaviate_1):8080"
# WEAVIATE NETWORK (see paragraph: Running on the localhost)
$ export WEAVIATE_NETWORK=$(docker inspect -f '{{range .NetworkSettings.Networks}}{{.NetworkID}}{{end}}' ${PWD##*/}_weaviate_1)
# Run docker
$ docker run -i --network=$WEAVIATE_NETWORK -e weaviate_host=$WEAVIATE_ORIGIN semitechnologies/weaviate-demo-newspublications:0.23.2
```
{% endraw %}

# ArXiv scholarly articles

[ArXiv](https://arxiv.org/) has a collection of over 1.7 million scholarly articles in the fields of physics, mathematics, computer science, quantitative biology, quantitative finance, statistics, electrical engineering and systems science, and economics. A dataset of metadata of all of these scientific articles was made available on [Kaggle](https://www.kaggle.com/Cornell-University/arxiv). Although the full article texts are not included in the dataset, all metadata including for example title, abstracts, authors and journals provide sufficient information to use Weaviate for semantically searching and performing automatic classification.

An example of schema creation and data import was made with the Python client. In order to use this dataset, you have two options: 
0. Use the read-only demo endpoint.
0. Run manually, local.

### Use read-only demo endpoint
You can use the read-only Weaviate demo at `https://arxiv.demo.data.semi.technology/v1/`. You can use send GraphQL and RESTful GET queries to this endpoint to interact with the data.
  
### Run manually
The second option is to spin up a Weaviate yourself and load the data (on your local machine or in the cloud).
0. Spin up a Weaviate instance (for example with [docker-compose](/developers/weaviate/current/getting-started/installation.html#docker-compose)). Since this dataset is rather large, make sure you allocate around 200GB (less might work, but wasn't tested) for the Docker image size and allocate at least 4GB for the ES environment in case you're running a not standalone Weaviate mode:
```yml
esvector:
 environment:
  ES_JAVA_OPTS: -Xms4g -Xmx4g
```
0. Download and unzip the Arxiv metadata dump. Weekly updates of the official dataset are available [here](https://www.kaggle.com/Cornell-University/arxiv), but the import script is tested on at least the following version.
```bash
wget -q https://storage.googleapis.com/semi-technologies-public-data/arxiv-metadata-oai-snapshot.json.zip
unzip arxiv-metadata-oai-snapshot.json.zip
```
0. (Fork and) clone the dataset importer written in Python, and move into this directory:
```bash
git clone https://github.com/semi-technologies/arXiv-demo-dataset.git
cd arXiv-demo-dataset
```
0. Start the import. Note that importing a dataset of this size could take more than 24 hours, depending on your CPU. Make sure you point to dataset on your specified location with `--metadata_file`. Adjust the `--n_papers` parameter if you want to add less papers.
```bash
python3 start_project.py --weaviate=http://localhost:8080 --timeout=600 --metadata_file=data/arxiv-metadata-oai-snapshot.json --batch-size=512 --n_papers=1800000
```
0. Once the import is done, you'll be able to interact with the data on your defined Weaviate location, e.g. `http://localhost:8080/v1/`

# More Resources

{% include docs-support-links.html %}