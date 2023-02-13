---
title: Installation
sidebar_position: 1
image: og/docs/quickstart-tutorial.jpg
# tags: ['installation']
---
import Badges from '/_includes/badges.mdx';
import registerImg from './img/register.jpg';
import WCSScreenshotImg from './img/WCS-screenshot.png';
import weaviateClusterImg from './img/weaviate-cluster.jpg';

<Badges/>

## Overview

Here, you will create a new Weaviate instance for use throughout this tutorial.

## Weaviate Cloud Services

We will use the free sandbox tier from _Weaviate Cloud Services_ (WCS) for this tutorial.

WCS is a managed SaaS service that requires no maintenance at your end. As it is the fastest 🚀 way to create a new Weaviate instance, let's spin up an instance with it for use throughout this tutorial. 

:::info Prefer a local instance?
If you prefer a local instance of Weaviate, we recommend getting started with Docker. Please refer to [the separate section below](#running-weaviate-with-docker) to follow along.
:::

### Sign in to WCS

First, access WCS by navigating to the [Weaviate Cloud Console](https://console.weaviate.io/). 

:::note No account? No problem!
If you don't have an account with WCS yet, click on the "Sign Up" button:

<img src={registerImg} width="400px" alt="Register button"/>

Or [click here to sign up](https://auth.wcs.api.weaviate.io/auth/realms/SeMI/protocol/openid-connect/registrations?client_id=wcs&response_type=code&redirect_uri=https://console.weaviate.io/registration-login).
:::

Then sign in to WCS with your credentials.

### Create a Weaviate Cluster

To create a new Weaviate Cluster:
1. Press the "Create a Weaviate Cluster" button
1. Configure the cluster:
    1. Set a unique `name` for your cluster – note: The name will become part of the URL used to access this instance. 
    1. Leave the `Subscription Tier` as `Sandbox` - note: The sandbox is free, but it will expire after 30 days
    1. Leave the `Weaviate Version` as the latest
    1. **Change** the `OIDC Authentication` to `Disabled`
1. Finally, press **Create**.

Your selections should look like this:
<img src={WCSScreenshotImg} width="90%" alt="Cluster configuration"/>

This will start the process to create a new cluster, and you should see a progress indicator. Cluster creation should take a minute or two, and you should see a green tick ✔️ when it's done - indicating that the cluster is ready.

(In the meantime, you can start installing a client library - or grab a hot drink 😉.)

### Connect to Weaviate

Click on the `Cluster Id` link, which will open a new page in your browser and display all the available endpoints.

<img src={weaviateClusterImg} width="100%" alt="Weaviate Cluster"/>

If you can see this response in your browser, *congratulations!* you have successfully started up an instance of Weaviate. 🎉

## Install a client library

You can communicate with Weaviate with the available [client libraries](../client-libraries/index.md) (currently available for `Python`, `JavaScript`, `Java` and `Go`) or the [RESTful API](../api/rest/index.md).

import ClientCapabilitiesOverview from '/_includes/client.capabilities.mdx'

<ClientCapabilitiesOverview />

Install your preferred client by following the relevant instructions below:

import CodeClientInstall from '/_includes/code/quickstart.clients.install.mdx';

<CodeClientInstall />

Next, we will take you end-to-end with Weaviate, all the way to making vector queries already!

:::note Java / Go code examples
Please be patient as we update our Java and Go code examples. They will be ready soon!
:::

## Recap

* You have a working instance of Weaviate in Weaviate Cloud Services (WCS).
* Weaviate Cloud Services (WCS) is a managed Weaviate SaaS.
* You have installed a client library in your preferred language.

## Next

- [Weaviate, end-to-end](./end-to-end.md).

-----

## Notes

### Running Weaviate with Docker

To set up Weaviate with Docker, follow these two steps:

1. Get a `docker-compose.yml` configuration file by going to the [Weaviate configurator](../installation/docker-compose.md)
    1. Select "With Modules" when asked "Standalone or Modules", and
    1. Select the module for your preferred inference API (e.g. `text2vec-openai` for OpenAI, or `text2vec-cohere` for Cohere)
1. Spin up Weaviate with Docker
    ```js
    docker-compose up -d
    ```

Then you can continue with the tutorial.

If you are running Weaviate with Docker, keep in mind that the address for Weaviate will change from the WCS address to your local address (and port) such as `http://localhost:8080`.

### More on deployment options

To learn more about the other self-deployment options, check out the documentation for installation with [Docker](../installation/docker-compose.md) or [Kubernetes](../installation/kubernetes.md). 

-----

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
