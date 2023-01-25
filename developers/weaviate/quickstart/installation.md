---
title: Installation
sidebar_position: 1
image: og/docs/quickstart-tutorial.jpg
# tags: ['installation']
---
import Badges from '/_includes/badges.mdx';
import registerImg from './img/register.jpg';
import WCSScreenshotImg from './img/WCS-screenshot.jpg';
import weaviateClusterImg from './img/weaviate-cluster.jpg';

<Badges/>

Here, you create a new Weaviate instance for use throughout the quickstart tutorial.

## Weaviate Cloud Service

The fastest way 🚀 to create a new Weaviate instance from scratch is to use _Weaviate Cloud Service_ (WCS). WCS is a completely managed service, so you don't have to install or maintain anything to run Weaviate.   

We will use a the free sandbox tier offered by WCS. 

:::info Using a local instance of Weaviate instead
If you would prefer a local instance of Weaviate, we recommend getting started with Docker. We include [a separate section below](#running-weaviate-with-docker) to help you follow along.
:::

### Sign in to WCS

To access WCS, first navigate to the [Weaviate Cloud Console](https://console.weaviate.io/). 

If you don't have an account with WCS yet, click on the "Sign Up" button:

<img src={registerImg} width="400px" alt="Register button"/>

Or [click here to sign up](https://auth.wcs.api.weaviate.io/auth/realms/SeMI/protocol/openid-connect/registrations?client_id=wcs&response_type=code&redirect_uri=https://console.weaviate.io/registration-login) to create an account.

Then sign in to WCS with your credentials.

### Create a Weaviate Cluster

To create a new Weaviate Cluster:
1. Press the "Create a Weaviate Cluster" button
1. Configure the cluster:
    1. Set a unique `name` for your cluster – note: The name will become part of the URL uses to access this instance. 
    1. Leave the `Subscription Tier` as `Sandbox` - note: The sandbox is free, but it will expire after 30 days
    1. Leave the `Weaviate Version` as the latest
    1. **Change** the `OIDC Authentication` to `Disabled`

    <img src={WCSScreenshotImg} width="400px" alt="Cluster configuration"/>

1. Finally, press **Create**.

This will start the process to create a new cluster. The status indicator on the page will show the progress (in %); after a short while, you should see a green tick ✔️ - indicating that the cluster is ready.

### Connect to Weaviate

Click on the `Cluster Id` link, which will open a new page in your browser and display all the available endpoints.

<img src={weaviateClusterImg} width="100%" alt="Weaviate Cluster"/>

:::note
For every endpoint, there is a `documentationHref` link, which points to relevant documentation pages.
:::

If you see this JSON response, *congratulations!* you have successfully started up an instance of Weaviate. 🎉

## Client libraries

You can communicate with Weaviate with the available [client libraries](../client-libraries/) (currently available for `Python`, `JavaScript`, `Java` and `Go`) or the [restful API](/developers/weaviate/current/restful-api-references/).

Install your preferred client by following the relevant instructions below:

import CodeClientInstall from '/_includes/code/getting.started.clients.install.mdx';

<CodeClientInstall />

Next, let's build our database.

## Recap

* You have a working instance of Weaviate in Weaviate Cloud Service (WCS).
* Weaviate Cloud Service (WCS) is a managed Weaviate SaaS.
* You have installed a client library in your preferred language.

## Next

- [Autoschema & query](./autoschema.md).

-----

## Notes

### Running Weaviate with Docker

Working with Docker is great if you are building an application around Weaviate and want to run Weaviate on your local machine or in the cloud. If you have Docker already installed, you could have it all up and running in seconds (minutes if you use a  prepackaged transformers module).

To set up Weaviate with Docker, follow these two steps:

1. Get `docker-compose.yml` configuration file by going to the [Weaviate configurator](http://localhost:3000/developers/weaviate/installation/docker-compose)
    1. Select "With Modules" when asked "Standalone or Modules", and
    1. Select the module for your preferred inference API (e.g. `text2vec-openai` for OpenAI, or `text2vec-cohere` for Cohere)
1. Spin up docker
    ```js
    docker-compose up -d
    ```

Then you can continue with the tutorial.

If you are running Weaviate with Docker, keep in mind that the address for Weaviate will change from the WCS address to `http://localhost:8080`.

### More on deployment options

To learn more about the other self-deployment options, check out the documentation for installation with [Docker](https://weaviate.io/developers/weaviate/current/installation/docker-compose.html) or [Kubernetes](https://weaviate.io/developers/weaviate/current/installation/kubernetes.html). 

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
