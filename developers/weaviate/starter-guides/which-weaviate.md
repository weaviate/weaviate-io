---
title: Weaviate configurations
sidebar_position: 10
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

Weaviate can be configured and deployed in many different ways. Important configuration decisions include:

- The [deployment setup](../installation/index.md)
- The [vectorizer modules](../modules/retriever-vectorizer-modules/index.md) to enable

This page helps you to find the right combination for your project.

## Deploy Weaviate

Weaviate can be deployed in the following ways:
- [Embedded Weaviate](../installation/embedded.md)
- [Docker-Compose](../installation/docker-compose.md)
- [Weaviate Cloud (WCD)](../installation/weaviate-cloud-services.md)
- [Self-managed Kubernetes](../installation/kubernetes.md)
- [Hybrid SaaS](https://weaviate.io/pricing)

## Vectorization options

When adding data objects to Weaviate, you have two choices:
- Specify the object vector directly, or
- Use a Weaviate vectorizer module to generate the object vector.

If you are using a vectorizer module, your choices will depend on your input medium/modality, as well as whether you would prefer a local or API-based vectorizer.

Generally speaking, an API-based vectorizer will be more convenient to use, but will incur additional costs. On the other hand, a local vectorizer will be lower cost, but may require specialized hardware (such as a GPU) to run at comparable speeds.

For text, [this open-source benchmark](https://huggingface.co/blog/mteb) provides a good overview of the performance of different vectorizers. Remember, domain-specific and real-world performance may vary.

## Use cases

Here are some configuration options for different use cases.

### Quick evaluation

If you are evaluating Weaviate, we recommend using one of these instance types to get started quickly:

- [Weaviate Cloud (WCD)](/developers/wcs) sandbox
- [Embedded Weaviate](/developers/weaviate/installation/embedded)

Use an inference-API based text vectorizer with your instance, for example, `text2vec-cohere`, `text2vec-huggingface`, `text2vec-openai`, or  `text2vec-palm`.

The [Quickstart guide](/developers/weaviate/quickstart) uses a WCD sandbox and an API based vectorizer to run the examples.

### Development

For development, we recommend using

- [Weaviate Cloud (WCD)](https://console.weaviate.cloud/) or [Docker Compose](/developers/weaviate/installation/docker-compose).
- A vectorization strategy that approximates your production strategy.

#### Docker-Compose vs. Weaviate Cloud (WCD)

Of the two, Docker-Compose is more flexible as it exposes all configuration options, and can be used in a local development environment. Additionally, it can use local vectorizer modules such as `text2vec-transformers` or `multi2vec-clip` for example.

On the other hand, WCD instances are easier to spin up, and takes away the need to manage the deployment yourself.

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

For production deployments, consider one of these hosting models:

- [Weaviate Cloud (WCD)](https://console.weaviate.cloud/)
- Self-managed Kubernetes
- Hybrid SaaS

All of these options are scalable. Kubernetes and Hybrid SaaS offer the most configuration flexibility.

A WCD-based solution is the easiest in terms of setup and maintenance. A self-managed Kubernetes deployment combines flexibility and scalability.

If you need additional configuration control, but you don't want to manage your Weaviate deployment, Hybrid SaaS offers a best-of-both-worlds solution.

## By Vectorizer & Reranker

Weaviate makes various vectorizer & reranker modules available for different media types, also called modalities.

We recommend starting from the following table of vectorizers and their availability in different Weaviate setups.

| Module type | Modality | Module | Embedded Weaviate  | Weaviate Cloud | Docker-Compose | Kubernetes | Hybrid SaaS |
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


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
