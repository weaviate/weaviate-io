---
title: Which Weaviate setup to use?
sidebar_position: 10
image: og/docs/tutorials.jpg
# tags: ['getting started']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

Weaviate can be configured and deployed in many different ways. Generally, the two first decisions to make in using Weaviate involve:

- The choice of modules to enable, and
- The choice of deployment setup.

This page will help you to find the right combination for your use case.

:::tip
In all cases, we recommend using [Weaviate client libraries](../client-libraries/index.md) to interact with your Weaviate instance.
:::

## For quick evaluation

For getting started as quickly as possible, we recommend using:

- An easy-to-use Weaviate instance
    - With a Weaviate Cloud Services (WCS) sandbox, or Embedded Weaviate, and
- An inference-API based text vectorizer
    - (e.g. `text2vec-cohere`, `text2vec-huggingface`, `text2vec-openai`, or  `text2vec-palm`).

## Guidelines for choosing a setup

### Based on media type & vectorizer

Weaviate makes various vectorizer modules available for different media types, also called modalities.

We recommend starting from the following table of vectorizers and their availability in different Weaviate setups.

| Modality | Model | Embedded Weaviate  | Weaviate Cloud Services | Docker-Compose | Kubernetes | Hybrid SaaS |
| --- | --- | --- | --- | --- | --- | --- |
| **Text** | [`text2vec-cohere`](../modules/retriever-vectorizer-modules/text2vec-cohere.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Text** | [`text2vec-huggingface`](../modules/retriever-vectorizer-modules/text2vec-huggingface.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Text** | [`text2vec-openai`](../modules/retriever-vectorizer-modules/text2vec-openai.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Text** | [`text2vec-palm`](../modules/retriever-vectorizer-modules/text2vec-palm.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Text** | [`text2vec-transformers`](../modules/retriever-vectorizer-modules/text2vec-transformers.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Text** | [`text2vec-contextionary`](../modules/retriever-vectorizer-modules/text2vec-contextionary.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Text & Image** | [`multi2vec-clip`](../modules/retriever-vectorizer-modules/multi2vec-clip.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Image** | [`img2vec-neural`](../modules/retriever-vectorizer-modules/img2vec-neural.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| **Vectors** | [`ref2vec-centroid`](../modules/retriever-vectorizer-modules/ref2vec-centroid.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

### Based on deployment setup

Weaviate can be deployed in many different ways. We recommend the following setups for different use cases.

#### Embedded Weaviate

Embedded Weaviate is a Weaviate instance that is launched from the client library, running a local binary.

It is the easiest way to get started with Weaviate.

- **Use case**: Development

#### Docker-Compose

Docker-Compose is a way to deploy Weaviate in a Docker container.

As it uses Docker, it is cross-platform and is a convenient way to use Weaviate in a development environment.

- **Use case**: Development, Production

#### Weaviate Cloud Services (WCS)

Weaviate Cloud Services (WCS) is a way to deploy Weaviate in our cloud environment.

It is a convenient way to use Weaviate in a production or development environment, without having to manage the deployment yourself.

- **Use case**: Development, Production

#### Self-managed Kubernetes

With this option, you can deploy open-source Weaviate yourself in a Kubernetes cluster.

Using Kubernetes, you can deploy Weaviate in a production environment, and scale it as needed.

- **Use case**: Production


#### Hybrid SaaS

With Hybrid SaaS, we (Weaviate) will manage your Weaviate deployment on-premise based on your needs.

It allows you to maintain control of your deployment and resources, while allowing us to manage the deployment.

- **Use case**: Production

## Summary

The following table summarizes the different Weaviate setups and their general suitability for different environments.

| Setup | Embedded Weaviate  | Docker-Compose | Weaviate Cloud Services | Self-managed Kubernetes | Hybrid SaaS |
| --- | --- | --- | --- | --- | --- |
| **Development** | :white_check_mark: | :white_check_mark: | :white_check_mark: | :x: | :x: |
| **Production** | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |

