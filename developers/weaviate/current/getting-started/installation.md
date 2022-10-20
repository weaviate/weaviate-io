---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Installation
description: Getting started with Weaviate installation
tags: ['installation']
menu-order: 1
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.7.2/getting-started/installation.html
---

Here, you will be creating a new Weaviate instance for use throughout the getting started guide. 

## Weaviate Cloud Service

The fastest way 🚀 to create a new Weaviate instance – from scratch – is to use _Weaviate Cloud Service_ (WCS). WCS is a completely managed service, so you don't have to install or maintain anything to run Weaviate.   

WCS offers a free sandbox for you to play around with, so let's use that for this guide. 

### Sign in to WCS

In order to access WCS, navigate to the [Weaviate Cloud Console](https://console.semi.technology/){:target="_blank"} and "Sign in with the Weaviate Cloud Service". 

If you don't have an account with WCS yet, click the ["Don't have an account? Sign Up"](https://auth.wcs.api.semi.technology/auth/realms/SeMI/protocol/openid-connect/registrations?client_id=wcs&response_type=code&redirect_uri=https://console.semi.technology/console/wcs){:target="_blank"} link and create an account.

![Register link](/img/getting-started/install/register.jpg){:style="max-width: 400px"}

### Create a Weaviate Cluster

To create a new Weaviate Cluster:
0. Press the "Create a Weaviate Cluster" button
0. Configure the cluster:
    0. Set a unique `name` for your cluster – note: The name will become part of the URL uses to access this instance. 
    0. Leave the `Subscription Tier` as `Sandbox` - note: The sandbox is free, but it will expire after 30 days
    0. Leave the `Weaviate Version` as the latest
    0. **Change** the `OIDC Authentication` to `Disabled`
    
    ![Cluster Configuration](/img/getting-started/install/WCS-screenshot.jpg){:style="max-width: 600px"}
0. Finally, press **Create**.

This will start the process to create a new cluster. The status indicator on the page will show the progress (in %); after a short while, you should see a green tick ✔️ - indicating that the cluster is ready.

### Connect to Weaviate

Click on the `Cluster Id` link, which will open a new page in your browser and display all the available endpoints.
![Weaviate Cluster](/img/getting-started/install/weaviate-cluster.jpg)

> 💡 Note: For every endpoint, there is a `documentationHref` link, which points us to relevant documentation pages.

If you see this JSON response, *congratulations!* you have successfully started up an instance of Weaviate. 🎉

## Client Libraries

You can communicate with Weaviate from your code by using one of the available [client libraries](../client-libraries/){:target="_blank"} (currently available for `Python`, `JavaScript`, `Java` and `Go`) or the [restful API](/developers/weaviate/current/restful-api-references/){:target="_blank"}.

Add the client library to your project as follows:

<!-- TODO: update it accordion -->

* For `Python` add the `weaviate-client` to your system libraries with `pip`;
  ```bash
  $ pip install weaviate-client
  ```

* For `JavaScript` add `weaviate-client` to your project with `npm`;
  ```bash
  $ npm install weaviate-client
  ```

* For `Java` add this dependency to your project;
  ```xml
  <dependency>
    <groupId>technology.semi.weaviate</groupId>
    <artifactId>client</artifactId>
    <version>3.2.0</version>
  </dependency>
  ```

* For `Go` add `weaviate-go-client` to your project with `go get`;
  ```bash
  go get github.com/semi-technologies/weaviate-go-client/v4
  ```

Great. You now have an instance of Weaviate, as well as a client library to talk to it *with*. 

Next, let's start to build our database, starting with a *schema*.

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

* Weaviate Cloud Service (WCS) is a managed Weaviate SaaS.
* You have a working instance of Weaviate in WCS .
* You have installed a client library in your preferred language.

## Next

[Add a schema](./schema.html).

# More Resources

## Other ways to run Weaviate

We use WCS here to help you get started as quickly as possible. But you can also use one of self-deployment options with [Docker](https://weaviate.io/developers/weaviate/current/getting-started/installation.html#docker){:target="_blank"} or [Kubernetes](https://weaviate.io/developers/weaviate/current/getting-started/installation.html#kubernetes){:target="_blank"}. 

[Read more](../installation/index.html){:target="_blank"} about different ways to run Weaviate, and installation options.

{% include docs-support-links.html %}
