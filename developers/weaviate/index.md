---
title: Introduction
sidebar_position: 0
image: og/docs/introduction.jpg
# tags: []
---

Welcome to the documentation for **Weaviate**, an open source vector database.

### About the docs
The content is grouped into categories by goals:

| |How-to |References |Concepts |Tutorials |
| ----- | ----- | ----- | ----- | ----- |
| **Goal** | **Solve** a problem | Find **itemized** information | **Explanations** of topics | Guided **lessons** |

Commonly requested resources such as
- [Benchmarks](./benchmarks/index.md)
- [Roadmap](./roadmap/index.md)

Have their own sections, and others such as the

- [FAQ](./more-resources/faq.md)
- [Glossary](./more-resources/glossary.md)

And more can be found in the [More Resources](./more-resources/index.md) section.

:::tip Looking for Weaviate Cloud Services docs?
The Weaviate Cloud Services (WCS) documentation now has its own section! [Check it out here](../wcs/index.mdx).
:::

### For new users

If you are new to Weaviate, we recommend starting with these sections:
1. Introduction (this page),
2. [Quickstart tutorial](./quickstart/index.md)
3. [Installation](./installation/index.md)
4. [How-to: Configure](./configuration/index.md)

We suggest you browse through the [concepts](./concepts/index.md) section if you are interested in how Weaviate works.

:::info Help us to help you!
If the documentation does not quite suit **your** needs, we would love to hear from you.

Please reach out on our [forum](https://forum.weaviate.io) - we can help you with your specific problem, and help make the documentation better. Plus you'll meet our amazing, helpful community of users just like you!
:::

:::note
Like what you see? Consider giving us a [⭐ on GitHub](https://github.com/weaviate/weaviate/stargazers).
:::

### Code examples

Where possible, we show code examples in multiple programming languages using our [client libraries](./client-libraries/index.md). The following example shows you how to get the Weaviate schema using different clients.

import CodeSchemaDump from '/_includes/code/schema.dump.mdx';

<CodeSchemaDump />

## About this page

This page is an introduction to Weaviate. We present a very high-level overview of Weaviate here, so that you have some context before moving on to any other sections.

## What is Weaviate?

Weaviate is an open source vector database that stores both objects and vectors. This allows for combining vector search with structured filtering.

**Weaviate in a nutshell**:

* Weaviate is an open source [vector database](https://weaviate.io/blog/what-is-a-vector-database).
* Weaviate allows you to store and retrieve data objects based on their semantic properties by indexing them with [vectors](./concepts/vector-index.md).
* Weaviate can be used stand-alone (aka _bring your vectors_) or with a variety of [modules](./modules/index.md) that can do the vectorization for you and extend the core capabilities.
* Weaviate has a [GraphQL-API](./api/graphql/index.md) to access your data easily.
* Weaviate is fast (check our [open source benchmarks](./benchmarks/index.md)).

**Weaviate in detail**: Weaviate is a low-latency vector database with out-of-the-box support for different media types (text, images, etc.). It offers Semantic Search, Question-Answer Extraction, Classification, Customizable Models (PyTorch/TensorFlow/Keras), etc. Built from scratch in Go, Weaviate stores both objects and vectors, allowing for combining vector search with structured filtering and the fault tolerance of a cloud-native database. It is all accessible through GraphQL, REST, and various client-side programming languages.

### Weaviate helps

1. **Software Engineers** - Who use Weaviate as an ML-first database for their applications.
    * Out-of-the-box modules for NLP / semantic search, automatic classification, and image similarity search.
    * Easy to integrate with the current architecture, with full CRUD support like other OSS databases.
    * Cloud-native, distributed, runs well on Kubernetes, and scales with one's workloads.

2. **Data Engineers** - Who use Weaviate as a vector database that is built up from the ground with ANN at its core and with the same UX they love from Lucene-based search engines.
    * Weaviate has a modular setup that allows you to use your ML models inside Weaviate. Due to its flexibility, you can also use out-of-the-box ML models (e.g., SBERT, ResNet, fasttext, etc.).
    * Weaviate takes care of the scalability so that you don't have to.
    * Deploy and maintain ML models in production reliably and efficiently.

3. **Data Scientists** - Who use Weaviate for a seamless handover of their Machine Learning models to MLOps.
    * Deploy and maintain your ML models in production reliably and efficiently.
    * Weaviate's modular design allows you to package any custom-trained model you want easily.
    * Smooth and accelerated handover of your Machine Learning models to engineers.

## Features

Weaviate makes it easy to use state-of-the-art AI models while providing the scalability, ease of use, safety and cost-effectiveness of a purpose-built vector database. Most notably:

* **Fast queries**<br />
   Weaviate typically performs nearest neighbor (NN) searches of millions of objects in considerably less than 100ms. You can find more information on our [benchmark](./benchmarks/index.md) page.

* **Ingest any media type with Weaviate Modules**<br />
Use State-of-the-Art AI model inference (e.g., Transformers) for accessing data (text, images, etc.) at search-and-query time to let Weaviate manage the process of vectorizing data for you - or provide your own vectors.

* **Combine vector and scalar search**<br />
 Weaviate allows for efficient, combined vector and scalar searches. For example, "articles related to the COVID-19 pandemic published within the past 7 days." Weaviate stores both objects and vectors and ensures the retrieval of both is always efficient. There is no need for a third-party object storage.

* **Real-time and persistent**<br />
Weaviate lets you search through your data even if it's currently being imported or updated. In addition, every write is written to a Write-Ahead-Log (WAL) for immediately persisted writes - even when a crash occurs.

* **Horizontal Scalability**<br />
  Scale Weaviate for your exact needs, e.g., maximum ingestion, largest possible dataset size, maximum queries per second, etc.

* **High-Availability**<br />
  Is on our [roadmap](./roadmap/index.md) and will be released later this year.

* **Cost-Effectiveness**<br />
  Very large datasets do not need to be kept entirely in-memory in Weaviate. At the same time, available memory can be used to increase the speed of queries. This allows for a conscious speed/cost trade-off to suit every use case.

* **Graph-like connections between objects**<br />
  Make arbitrary connections between your objects in a graph-like fashion to resemble real-life connections between your data points. Traverse those connections using GraphQL.

## How does Weaviate work?

Within Weaviate, all individual data objects are based on a class property structure where a vector represents each data object. You can connect data objects (like in a traditional graph) and search for data objects in the vector space.

You can add data to Weaviate through the [RESTful API](./api/rest/index.md) end-points and retrieve data through the [GraphQL interface](./api/graphql/index.md).

Weaviate's [vector indexing mechanism is modular](./concepts/vector-index.md), and the current available plugin is the Hierarchical Navigable Small World (HNSW) multilayered graph.

## What are Weaviate modules?

Weaviate modules are used to extend Weaviate's capabilities and are optional. There are Weaviate modules that automatically vectorize your content (i.e., `*2vec`) or extend Weaviate's capabilities (often related to the type of vectors you have.) You can also create your own modules. Click [here](./concepts/modules.md) to learn more about them.

## What is a vector database?

If you work with data, you probably work with search engine technology. The best search engines are amazing pieces of software, but because of their core architecture, they come with limitations when it comes to finding the data you are looking for.

Take for example the data object: `{ "data": "The Eiffel Tower is a wrought iron lattice tower on the Champ de Mars in Paris." }`

Storing this in a traditional search engine might leverage inverted indices to index the data. This means that to retrieve the data, you need to search for "Eiffel Tower", "wrought iron lattice", or other exact phrases, to find it. But what if you have vast amounts of data, and you want the document about the Eiffel Tower, but you search for "landmarks in France"? Traditional search engines can't help you there, so this is where vector databases show their superiority.

Weaviate uses vector indexing mechanisms at its core to represent the data. The vectorization modules (e.g., the NLP module) vectorize the above-mentioned data object in a vector-space where the data object sits _near_ the text "landmarks in France". This means that Weaviate can't find a 100% match, but it will find a very close one, and return the result.

The above example is for text (i.e., NLP), but you can use vector search for any machine learning model that vectorizes, like images, audio, video, genes, etc.

To learn more about vector databases, check out our [Gentle Introduction to Vector Databases](https://weaviate.io/blog/what-is-a-vector-database).

## When should I use Weaviate?

There are four main situations when you should consider using Weaviate.

- **If you don't like the quality of results that your current search engine gives you.** (With Weaviate you can search through your data semantically.)
- **If you want to do textual and image similarity search with out-of-the-box state-of-the-art ML models.** (Combine storing and querying of multiple media types in one Weaviate instance.)
- **If you want to combine semantic (vector) and scalar search with a vector database taking milliseconds.** (Weaviate stores both your objects and vectors and makes sure the retrieval of both is always efficient).
- **If you need to scale your own machine learning models to production size.** (HNSW algorithm and horizontally scalable support near-realtime database operations)
- **If you need to classify large datasets fast and near-realtime.** (kNN, zero-shot or contextual classification with out-of-the-box or custom ML models).

People use Weaviate for cases such as semantic search, image search, similarity search, anomaly detection, power recommendation engines, e-commerce search, data classification in ERP systems, automated data harmonization, cybersecurity threat analysis, and many, many more cases.

## Next Steps

Want to get started or want to learn more? These resources might help you further:

- Try out Weaviate:
    - [Quickstart tutorial](./quickstart/index.md)
- Learn about Weaviate:
    - [Concepts](./concepts/index.md)


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
