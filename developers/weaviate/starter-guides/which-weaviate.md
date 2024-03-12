---
title: Which Weaviate setup to use?
sidebar_position: 10
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

Weaviate can be configured and deployed in many different ways. Generally, the two first decisions to make in using Weaviate involve:

- The choice of [deployment setup](../installation/index.md), and
- The choice of [vectorizer modules](../modules/retriever-vectorizer-modules/index.md) to enable.

This page helps you to find the right combination for your needs.

## Available options

### Deployment

Weaviate can be deployed in the following ways:
- [Embedded Weaviate](../installation/embedded.md)
- [Docker-Compose](../installation/docker-compose.md)
- [Weaviate Cloud Services (WCS)](../installation/weaviate-cloud-services.md)
- [Self-managed Kubernetes](../installation/kubernetes.md)
- [Hybrid SaaS](https://weaviate.io/pricing)

### Vectorization

When adding data objects to Weaviate, you have two choices:
- Specify the object vector directly, or
- Use a Weaviate vectorizer module to generate the object vector.

If you are using a vectorizer module, your choices will depend on your input medium/modality, as well as whether you would prefer a local or API-based vectorizer.

Generally speaking, an API-based vectorizer will be more convenient to use, but will incur additional costs. On the other hand, a local vectorizer will be lower cost, but may require specialized hardware (such as a GPU) to run at comparable speeds.

For text, [this open-source benchmark](https://huggingface.co/blog/mteb) provides a good overview of the performance of different vectorizers. Please do keep in mind that domain-specific, or real-world performance may vary.

## By use case

As a starting point, we recommend the following setups for different use cases.

### Quick evaluation

If you are evaluating Weaviate, we recommend the following easy and convenient setup:

- An easy-to-use Weaviate instance, with
    - A Weaviate Cloud Services (WCS) sandbox, or
    - Embedded Weaviate
- An inference-API based text vectorizer
    - (e.g. `text2vec-cohere`, `text2vec-huggingface`, `text2vec-openai`, or  `text2vec-palm`).

This will allow you to quickly get started with Weaviate, and evaluate its capabilities. Note that the Quickstart guide uses this setup, with a WCS sandbox, and an API vectorizer.

### Development

For development, we recommend using

- Docker-Compose or Weaviate Cloud Services (WCS), with
- A vectorization strategy that at least approximates your production needs.

#### Docker-Compose vs. Weaviate Cloud Services (WCS)

Of the two, Docker-Compose is more flexible as it exposes all configuration options, and can be used in a local development environment. Additionally, it can use local vectorizer modules such as `text2vec-transformers` or `multi2vec-clip` for example.

On the other hand, WCS instances are easier to spin up, and takes away the need to manage the deployment yourself.

Note that Embedded Weaviate is currently not recommended for serious development use as it is at an experimental phase.

#### Vectorization strategy

For development, we recommend using a vectorizer module that at least approximates your needs.

As a first point, you must choose:
- Whether to vectorize data yourself and import it into Weaviate, or
- To use a Weaviate vectorizer module.

Then, we recommend choosing a vectorizer module that is as close as possible to your production needs. For example, if search quality is of paramount importance, we suggest using your preferred vectorizer module in development as well.

Keep in mind two other factors, which are cost, and their footprint.
- Vectorization, such as with an API-based vectorizer, can be expensive. This is especially true if you are dealing with very large datasets.
- Vector lengths can vary by a factor of ~5, which will impact both your storage and memory requirements. This can ultimately impact cost down the line.

### Production

For use in production, generally we recommend

- Weaviate Cloud Services (WCS),
- Self-managed Kubernetes, or
- Hybrid SaaS.

All of these options are scalable, with Kubernetes and Hybrid SaaS options offering the most flexibility in configuration.

As with the development use case, a WCS-based solution would be the easiest in terms of setup and maintenance, while a self-managed Kubernetes deployment combines the flexibility and scalability.

If you wish to fully control your Weaviate deployment without having to manage it yourself, Hybrid SaaS offers the best-of-both-worlds solution.

## By Vectorizer & Reranker

Weaviate makes various vectorizer & reranker modules available for different media types, also called modalities.

We recommend starting from the following table of vectorizers and their availability in different Weaviate setups.

| Module type | Modality | Module | Embedded Weaviate  | Weaviate Cloud Services | Docker-Compose | Kubernetes | Hybrid SaaS |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Vectorizer | **Text** | [`text2vec-cohere`](../modules/retriever-vectorizer-modules/text2vec-cohere.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **Text** | [`text2vec-huggingface`](../modules/retriever-vectorizer-modules/text2vec-huggingface.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **Text** | [`text2vec-openai`](../modules/retriever-vectorizer-modules/text2vec-openai.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **Text** | [`text2vec-palm`](../modules/retriever-vectorizer-modules/text2vec-palm.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **Text** | [`text2vec-transformers`](../modules/retriever-vectorizer-modules/text2vec-transformers.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **Text** | [`text2vec-gpt4all`](../modules/retriever-vectorizer-modules/text2vec-gpt4all.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **Text** | [`text2vec-contextionary`](../modules/retriever-vectorizer-modules/text2vec-contextionary.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **Text & Image** | [`multi2vec-clip`](../modules/retriever-vectorizer-modules/multi2vec-clip.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **7 ([List](../modules/retriever-vectorizer-modules/multi2vec-bind.md#class-level))** | [`multi2vec-bind`](../modules/retriever-vectorizer-modules/multi2vec-bind.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **Image** | [`img2vec-neural`](../modules/retriever-vectorizer-modules/img2vec-neural.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Vectorizer | **Vectors** | [`ref2vec-centroid`](../modules/retriever-vectorizer-modules/ref2vec-centroid.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Reranker | **Text** | [`reranker-cohere`](../modules/retriever-vectorizer-modules/reranker-cohere.md) | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: | :white_check_mark: |
| Reranker | **Text** | [`reranker-transformers`](../modules/retriever-vectorizer-modules/reranker-transformers.md) | :x: | :x: | :white_check_mark: | :white_check_mark: | :white_check_mark: |


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
