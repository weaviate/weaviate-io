---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Installation
description: Getting started with Weaviate installation
tags: ['installation']
menu-order: 2
open-graph-type: article
toc: true
# redirect_from:
#   - /developers/weaviate/current/getting-started/installation.html
---

{% include docs-current_version_finder.html %}

There are three ways you can run Weaviate, and they are -we believe- pretty straightforward.

0. Weaviate Cloud Service
0. Docker
0. Kubernetes

## Weaviate Cloud Service

The fastest way 🚀 to create a new Weaviate instance – from scratch – is to use the `Weaviate Cloud Service` (WCS).

> 💡 Weaviate Cloud Service is our managed Weaviate SaaS. It is a completely managed service, so you don't have to install or maintain anything to run Weaviate.
>
> Currently, the service is in private beta, but (🤫) if you log in to the [Weaviate Cloud Console](https://console.semi.technology/), you can create a free sandbox to play around with.

If you are itching to get started with WCS, just skip to the [WCS hands-on section](#wcs-hands-on).

## Running Weaviate yourself

Alternatively, if you prefer to install and deploy Weaviate yourself, then you can work with either `Docker` or `Kubernetes`.

> 💡 For development purposes, it's perfectly fine to run Weaviate on your local machine.

<!-- TODO: create deploying to production guide and link it here.
>  
> Consult the [following guide](--link-here--) on how to run Weaviate in Production.
-->

### Docker

Working with Docker is great if you are building an application around Weaviate and want to run Weaviate on your local machine or in the cloud. If you have Docker already installed, you could have it all up and running in seconds (minutes if you use a  prepackaged transformers module).

We even have a handy [step-by-step configurator](../installation/#customize-your-weaviate-setup){:target="_blank"}, which let's you pick you configuration, and as a result you will receive a command to spin up your docker setup.

<!--
Some examples of Docker Compose configurations you can make with the configurator.

* [Weaviate stand-alone (no modules)](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&modules=standalone&runtime=docker-compose&weaviate_version={{ current_page_version }})
* [Weaviate with the `text2vec-transformers` module with GPU support](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&gpu_support=true&media_type=text&modules=modules&ner_module=false&qna_module=false&runtime=docker-compose&spellcheck_module=false&text_module=text2vec-transformers&transformers_model=sentence-transformers-multi-qa-MiniLM-L6-cos-v1&weaviate_version={{ current_page_version }})
* [Weaviate with the `text2vec-openai` module](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&media_type=text&modules=modules&ner_module=false&openai_key_approval=yes&qna_module=false&runtime=docker-compose&spellcheck_module=false&text_module=text2vec-openai&weaviate_version={{ current_page_version }})
* [Weaviate with `multi2vec-clip` module](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?clip_model=sentence-transformers-clip-ViT-B-32&enterprise_usage_collector=false&media_type=clip&modules=modules&ner_module=false&qna_module=false&runtime=docker-compose&spellcheck_module=false&weaviate_version={{ current_page_version }})
* [Weaviate with the `text2vec-openai` module and `Question Answering` transformers module with GPU support](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&gpu_support=true&media_type=text&modules=modules&ner_module=false&openai_key_approval=yes&qna_module=true&qna_module_model=distilbert-base-uncased-distilled-squad&runtime=docker-compose&spellcheck_module=false&text_module=text2vec-openai&weaviate_version={{ current_page_version }})
* etcetera. -->

### Kubernetes

Generally, we recommend using Kubernetes to deploy Weaviate for any long-running deployments or those with specific availability expectations, such as production use cases.

For local development or personal evaluation, using Docker Compose will most likely be sufficient.

### Self-deployment instructions 

The installation and configuration with Docker and Kubernetes is out of scope for this tutorial. If you prefer to deploy Weaviate yourself, see the [installation documentation](/developers/weaviate/current/installation/){:target="_blank"} page. Then you can continue with the tutorial with at [Schema](/developers/weaviate/current/getting-started/schema.html) page.

## WCS hands-on

To create a new Weaviate instance with WCS, we need to follow these steps:

0. Sign in to WCS
0. Create a `Weaviate Cluster`
0. Test the connection

### Sign in to WCS

In order to access WCS, navigate to the [Weaviate Cloud Console](https://console.semi.technology/){:target="_blank"} and "Sign in with the Weaviate Cloud Service", where you will be able to create and manage your Weaviate Clusters.

#### No account, no problem
If you don't have an account with WCS yet, click the ["Don't have an account? Sign Up"](https://auth.wcs.api.semi.technology/auth/realms/SeMI/protocol/openid-connect/registrations?client_id=wcs&response_type=code&redirect_uri=https://console.semi.technology/console/wcs){:target="_blank"} link and create an account.

![Register link](/img/getting-started/install/register.jpg){:style="max-width: 400px"}

### Create a Weaviate Cluster

To create a new Weaviate Cluster:
0. Press the "Create a Weaviate Cluster" button
0. Configure the cluster:
    0. Set the `name` for your cluster – note: The name will become part of the URL we will use to access this instance. Please use a different name than "getting-started".
    0. Leave the `Subscription Tier` as `Sandbox` - note: The sandbox is free, but it will expire after 5 days
    0. Leave the `Weaviate Version` as the latest
    0. Leave the `Standalone Or Modules` as `Standalone, no Modules`
    0. **change** the `OIDC Authentication` to `Diabled`
    
    ![Cluster Configuration](/img/getting-started/install/cluster-configuration.jpg){:style="max-width: 600px"}
0. Finally, press **Create**.

This will start the process to create a new cluster. The status indicator on the left will show the progress (in %); after a few minutes, you should see a green tick ✔️ - indicating that the cluster is ready.

### Test the connection

To test the connection, click on the `Cluster Id` link, which will open a new page in your browser and display all the available endpoints.
![Weaviate Cluster](/img/getting-started/install/weaviate-cluster.jpg)

> 💡 Note: For every endpoint, there is a `documentationHref` link, which points us to relevant documentation pages.

Now, we are ready to start working with Weaviate. 🎉


<!-- 
## Running Weaviate yourself

When running Weaviate yourself in production, you want to make sure you select the right hardware to run it on.  The benchmark pages in the documentation are helpful for this (more about this in this guide) too, take the following things into account when choosing the right hardware:

0. **Disks** – use SSD disks if possible. Weaviate works more efficiently on solid state disks than on spinning disks.
    0. SSD disks come in a wide variety of types and price ranges. You might want to experiment with this, but based on our experience, there is a marginal return when spending large amounts of money on extreme SSD types.
    0.Avoid network storage and go for block storage. Internally we use;
        0. [`gp3` on Amazon Web Services](https://aws.amazon.com/about-aws/whats-new/2020/12/introducing-new-amazon-ebs-general-purpose-volumes-gp3/)
        0. [`premium-rwo` for Google Cloud Platform](https://cloud.google.com/kubernetes-engine/docs/how-to/persistent-volumes/gce-pd-csi-driver#create_a_storageclass)
        0. [`Premium SSD` for Microsoft Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/disks-types#premium-ssds)
0. **Memory** – make sure there is enough available to store the indices. To calculate to amount of memory needed for your vectors. Follow [this](../architecture/resources.html#an-example-calculation) calculation. You can learn more about memory usage in Weaviate [here](../architecture/resources.html#the-role-of-memory).
0. **CPUs** – adding more CPUs increases import speed or query time. Setting up [monitoring](../configuration/monitoring.html) for your Weaviate instance will help you determine if you need more or fewer CPUs in your setup.

## Kubernetes

> 💡 If you're new to Weaviate but familiar with Kubernetes. It might be an idea to use the [Docker-compose configurator](../installation/#customize-your-weaviate-setup) _first_ to see how Weaviate is structured.

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
* Running Weaviate Modules with an encepsulated ML-model on CPUs is slow. -->

## Recap

* You can run Weaviate with Weaviate Cloud Service, Docker or Kubernetes.
* Weaviate Cloud Service is a managed Weaviate SaaS - great for development and production.
* Docker alows you to set up Weaviate on your machine or in the cloud – great for development and production.
* Kubernetes is great for long-running Weaviate deployments
* You have a working instance of Weaviate in WCS.

## Next Steps

Next, [learn about the Weaviate Schema](./schema.html).

Alternatively, you can:
* [Skip to Querying in Weaviate](./query.html)
* [Go back to the basics](./basics.html)

# More Resources

{% include docs-support-links.html %}
