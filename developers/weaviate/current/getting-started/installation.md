---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Installation
description: Getting started with Weaviate installation
tags: ['basics']
menu-order: 2
open-graph-type: article
toc: true
redirect_from:
  - /developers/weaviate/current/getting-started/installation.html
---

{% include docs-current_version_finder.html %}

If there will ever be a Guinness Book of Records entry for the shortest getting started guide in the history of installing databases, we believe this is a candidate.

There are only three ways you can run Weaviate, and they are -we believe- pretty straightforward.

0. Weaviate Cloud Service
0. Docker
0. Kubernetes

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 As you've learned in the [modules section of the basics guide](./basics.html#modules), you use Weaviate stand-alone or in combination with modules. Tweaking your configuration will be all about the setup you want to use.
</div>

## Weaviate Cloud Service

The Weaviate Cloud Service is our managed Weaviate SaaS. Currently, the service is private beta, but (🤫) if you log in to the [Weaviate Cloud Console](https://console.semi.technology/) and create a free sandbox to play around with.

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 The big upside of the Weaviate Cloud Service is that it's a completely managed service.
</div>

## Running Weaviate yourself

When running Weaviate yourself in production, you want to make sure you select the right hardware to run it on.  The benchmark pages in the documentation are helpful for this (more about this in this guide) too, take the following things into account when choosing the right hardware:

0. **Disks** – use SSD disks if possible. Weaviate works more efficiently on solid state disks than on spinning disks.
    0. SSD disks come in a wide variety of types and price ranges. You might want to experiment with this, but based on our experience, there is a marginal return when spending large amounts of money on extreme SSD types.
    0.Avoid network storage and go for block storage. Internally we use;
        0. [`gp3` on Amazon Web Services](https://aws.amazon.com/about-aws/whats-new/2020/12/introducing-new-amazon-ebs-general-purpose-volumes-gp3/)
        0. [`premium-rwo` for Google Cloud Platform](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/gce-pd-csi-driver#create_a_storageclass)
        0. [`Premium SSD` for Microsoft Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssds)
0. **Memory** – make sure there is enough available to store the indices. To calculate to amount of memory needed for your vectors. Follow [this](/architecture/resources.html#an-example-calculation) calculation. You can learn more about memory usage in Weaviate [here](../architecture/resources.html#the-role-of-memory).
0. **CPUs** – adding more CPUs increases import speed or query time. Setting up [monitoring](../configuration/monitoring.html) for your Weaviate instance will help you determine if you need more or fewer CPUs in your setup.

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 For development purposes it's perfectly fine to run Weaviate on your local machine; the above goes more for production deployments.
</div>

## Docker

You can use Weaviate with Docker. We would highly recommend this if you are developing. It allows you to run Weaviate on your local machine or in the cloud. You have it up and running in seconds (minutes if you use a  prepackaged transformers module).

We've created [a handy configurator](../installation/#customize-your-weaviate-setup). You just follow the steps, and the configurator poops out an end-point that you can use to run the containers needed for your setup.

Some examples of Docker Compose configurations you can make with the configurator.

* [Weaviate stand-alone (no modules)](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&modules=standalone&runtime=docker-compose&weaviate_version={{ current_page_version }})
* [Weaviate with the `text2vec-transformers` module with GPU support](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&gpu_support=true&media_type=text&modules=modules&ner_module=false&qna_module=false&runtime=docker-compose&spellcheck_module=false&text_module=text2vec-transformers&transformers_model=sentence-transformers-multi-qa-MiniLM-L6-cos-v1&weaviate_version={{ current_page_version }})
* [Weaviate with the `text2vec-openai` module](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&media_type=text&modules=modules&ner_module=false&openai_key_approval=yes&qna_module=false&runtime=docker-compose&spellcheck_module=false&text_module=text2vec-openai&weaviate_version={{ current_page_version }})
* [Weaviate with `multi2vec-clip` module](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?clip_model=sentence-transformers-clip-ViT-B-32&enterprise_usage_collector=false&media_type=clip&modules=modules&ner_module=false&qna_module=false&runtime=docker-compose&spellcheck_module=false&weaviate_version={{ current_page_version }})
* [Weaviate with the `text2vec-openai` module and `Question Answering` transformers module with GPU support](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&gpu_support=true&media_type=text&modules=modules&ner_module=false&openai_key_approval=yes&qna_module=true&qna_module_model=distilbert-base-uncased-distilled-squad&runtime=docker-compose&spellcheck_module=false&text_module=text2vec-openai&weaviate_version={{ current_page_version }})
* etcetera.

## Kubernetes

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 If you're new to Weaviate but familiar with Kubernetes. It might be an idea to use the [Docker-compose configurator](../installation/#customize-your-weaviate-setup) _first_ to see how Weaviate is structured.
</div>

For this one, you need to understand how Kubernetes works; these are just two handy things to know.

1. If you want to use Weaviate in combination with modules, it might be handy to check out the [Docker guide](#docker) first. It will align with the Helm charts.
2. You find all detailed Kubernetes instructions [here](../installation/#kubernetes-k8s).

```yaml
version: '3.4'
services:
  weaviate:
    image: semitechnologies/weaviate:1.14.0
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-contextionary'
      ENABLE_MODULES: text2vec-contextionary
      CLUSTER_HOSTNAME: 'node1'
  contextionary:
    environment:
      OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
      EXTENSIONS_STORAGE_MODE: weaviate
      EXTENSIONS_STORAGE_ORIGIN: http://weaviate:8080
      NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
      ENABLE_COMPOUND_SPLITTING: 'false'
    image: semitechnologies/contextionary:en0.16.0-v1.0.2
```

## Working with GPU-enabled containers

Let's just cut straight to the chase; running modules with ML models yourself (i.e., a Weaviate module where the model is encapsulated inside the module) on a CPU is just not going to work well. It's sloooow 🐌.

You can use the Kubernetes set up with modules _or_ run Weaviate with Docker on a machine with a GPU ([this Github Gist](https://gist.github.com/bobvanluijt/af6fe0fa392ca8f93e1fdc96fc1c86d8) contains an installation script to install Docker Compose with GPU support on a Debian machine)

## Recapitulation

* There is a configurator you can use to configure your Weaviate instance.
* You can run Weaviate with Docker, Kubernetes, or with the Weaviate Cloud Service.
* Running Weaviate Modules with an encepsulated ML-model on CPUs is slow.

## What would you like to learn next?

* [I want to learn about the Weaviate Schema](./schema.html)
* [I want to learn about Querying Weaviate](./query.html)
* [Just bring me back to the basics](./basics.html)

# More Resources

{% include docs-support-links.html %}
