---
layout: layout-documentation
bodyclass: ["page--guides", " "]
solution: weaviate
sub-menu: index
title: Introduction
intro: Welcome to the documentation about Weaviate! Here you will find what Weaviate is all about, how to start your own Weaviate instance and interact with it, and how to use it to perform vector searches and classification.<br><br>Like what you see? Consider giving us a <a href="https://github.com/semi-technologies/weaviate/stargazers">⭐ on Github</a>.
description: About Weaviate
tags: ['Weaviate', 'about']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Introduction video

<iframe width="100%" height="375" src="https://www.youtube.com/embed/IExopg1r4fw" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# What is Weaviate?

**Weaviate in a nutshell**: Weaviate is a vector search engine and vector database. Weaviate uses machine learning to vectorize and store data, and to find answers to natural language queries. With Weaviate you can also bring your custom ML models to production scale.

**Weaviate in detail**: Weaviate is a low-latency vector search engine with out-of-the-box support for different media types (text, images, etc.). It offers Semantic Search, Question-Answer Extraction, Classification, Customizable Models (PyTorch/TensorFlow/Keras), and more. Built from scratch in Go, Weaviate stores both objects and vectors, allowing for combining vector search with structured filtering and the fault-tolerance of a cloud-native database, all accessible through GraphQL, REST, and various programming language clients.

## Weaviate helps ...

1. **Software Engineers** - Who use Weaviate as an ML-first database for their applications. 
    * Out-of-the-box modules for: NLP / semantic search, automatic classification and image similarity search.
    * Easy to integrate in current architecture, with full CRUD support like from other OSS databases.
    * Cloud-native, distributed, runs well on Kubernetes and scales with one's workloads.

2. **Data Engineers** - Who use Weaviate as a vector database that is built up from the ground with ANN at its core, and with the same UX they love from Lucene-based search engines.
    * Weaviate has a modular setup that allows you to use your own ML models inside Weaviate. Due to it's flexibility, you can also use out-of-the-box ML models (e.g., SBERT, ResNet, fasttext, etc).
    * Weaviate takes care of the scalability, so that you don't have to.
    * Deploy and maintain ML models in production, reliably and efficiently.

3. **Data Scientists** - Who use Weaviate for a seamless handover of their Machine Learning models to MLOps.
    * Deploy and maintain your ML models in production reliably and efficiently.
    * Weaviate's modular design allows you to easily package any custom trained model you want.
    * Smooth and accelerated handover of your Machine Learning models to engineers.

# Features

Weaviate makes it easy to use state-of-the-art AI models while giving providing the scalability, ease of use, safety and cost-effectiveness of a purpose-built vector database. Most notably:

* **Extremely fast queries**<br>
   Weaviate typically performs nearest neighbor (NN) searches of millions of objects in considerably less than 100ms.
   <br><sub></sub>

* **Ingest any media type with Weaviate Modules**<br>
  Use State-of-the-Art AI model inference (e.g. Transformers) for accessing Text, Images, etc. data at search-and-query time to let Weaviate manage the process of vectorizing data for you - or providing for importing your own vectors.

* **Combine vector and scalar search**<br>
  Weaviate allows for efficient, combined vector and scalar searches, e.g “articles related to the COVID 19 pandemic published within the past 7 days”. Weaviate stores both objects and the vectors and ensures the retrieval of both is always efficient. There is no need for a third party object storage. 

* **Real-time and persistent**<br>
Weaviate let’s you search through your data even if it’s currently being imported or updated. In addition, every write is written to a Write-Ahead-Log (WAL) for immediately persisted writes - even when a crash occurs.

* **Horizontal Scalability**<br>
  Scale Weaviate for your exact needs, e.g. High-Availability, maximum ingestion, largest possible dataset size, maximum queries per second, etc.

* **Cost-Effectiveness**<br>
  Very large datasets do not need to be kept entirely in-memory in Weaviate. At the same time, available memory can be used to increase the speed of queries. This allows for a conscious speed/cost trade-off to suit every use case.

* **Graph-like connections between objects**<br>
  Make arbitrary connections between your objects in a graph-like fashion to resemble real-life connections between your data points. Traverse those connections using GraphQL.

# How does Weaviate work?

Within Weaviate, all individual data objects are based on a class property structure where a vector represents each data object. You can connect data objects (like in a traditional graph) and search for data objects in the vector space.

You can add data to Weaviate through the [RESTful API](./restful-api-references/) end-points and retrieve data through the [GraphQL interface](./graphql-references/).

Weaviates [vector indexing mechanism is modular](./vector-index-plugins/), and the current available plugin is the [Hierarchical Navigable Small World (HNSW) multilayered graph](./vector-index-plugins/hnsw.html).

# What are Weaviate modules?

Weaviate modules are used to extend Weaviate's capabilities and optional. There are Weaviate modules that automatically vectorize your content (i.e., `*2vec`) or extend Weaviate's capabilities (often related to the type of vectors you have.) You can also create your own modules. Click [here](./modules) to get started with them.

# Why a vector search engine?

If you work with data, you probably work with search engine technology. The best search engines are amazing pieces of software, but because of their core architecture, they come with limitations when it comes to finding the data you are looking for.

Take for example the data object: `{ "data": "The Eiffel Tower is a wrought iron lattice tower on the Champ de Mars in Paris." }`

Storing this in a traditional search engine might leverage inverted indices to index the data. This means that to retrieve the data; you need to search for "Eiffel Tower" or "wrought iron lattice", etc. to find it. But what if you have vast amounts of data and you want the document about the Eiffel Tower but you search for: "landmarks in France"? Traditional search engines can't help you there and this is where vector search engines show their superiority.

Weaviate uses vector indexing mechanisms at its core to represent the data. The vectorization modules (e.g., the NLP module) vectorizes the above-mentioned data object in a vector-space where the data object sits _near_ the text "landmarks in France". This means that Weaviate can't make a 100% match, but a very high one to show you the results.

The above example is for text (i.e., NLP) but you can use it for any machine learning model that vectorizes, like images, audio, video, genes, etc.

Last but not least, using a vector search engine for your machine learning is something you do for the same reason you've been using a traditional search engine. It allows you to scale fast, search, and classify in real-time and it can be used in a robust production environment.

# When should I use Weaviate?

There are four main situations when you should consider using Weaviate.

- **If you don't like the quality of results that your current search engine gives you.** (With Weaviate you can search through your data semantically.)
- **If you want to do textual and image similarity search with out-of-the-box state-of-the-art ML models.** (Combine storing and querying of multiple media types in one Weaviate instance.)
- **If you want to combine semantic (vector) and scalar search with a vector database taking milliseconds.** (Weaviate stores both your objects and vectors and makes sure the retrieval of both is always efficient). 
- **If you need to scale your own machine learning models to production size.** (HNSW algorithm and horizontally scalable support near-realtime database operations)
- **If you need to classify large datasets fast and near-realtime.** (kNN, zero-shot or contextual classification with out-of-the-box or custom ML models). 

People use Weaviate for cases such as semantic search, image search, similarity search, anomaly detection, power recommendation engines, e-commerce search, data classification in ERP systems, automated data harmonization, cybersecurity threat analysis, and many, many more cases.

# Get started

Want to get started or want to learn more? These resources might help you further:

- Get started:
    - [Weaviate in a 10 minutes tutorial](./getting-started/quick-start.html)
    - [Installation](./getting-started/installation.html)
- Learn more:
    - [Talk and demonstration @ FOSDEM 2020](/news/fosdem-2020.html)
    - [Weaviate introduction on Google Cloud's Stack Chat](https://www.semi.technology/news/gcp-stackchat.html)
    - [Podcast about Weaviate](/news/gcp-podcast.html)

# More resources

{% include docs-support-links.html %}
