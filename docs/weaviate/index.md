---
title: Introduction
sidebar_position: 0

# layout: layout-documentation
# bodyclass: ["page--guides", " "]
# solution: weaviate
# sub-menu: index
# title: Introduction
# intro: Welcome to the Weaviate documentation. Here you will find what Weaviate is all about, how to create your Weaviate instance, interact with it, and use it to perform vector searches and classification.<br /><br />Like what you see? Consider giving us a <a href="https://github.com/semi-technologies/weaviate/stargazers">⭐ on Github</a>.
# description: About Weaviate
# tags: ['Weaviate', 'about']
# sidebar_position: 1
# open-graph-type: article
# toc: true
---

Welcome to the Weaviate documentation. Here you will find what Weaviate is all about, how to create your Weaviate instance, interact with it, and use it to perform vector searches and classification.<br /><br />Like what you see? Consider giving us a <a href="https://github.com/semi-technologies/weaviate/stargazers">⭐ on Github</a>.

# How to use this site

We want help you get started quickly with Weaviate, and before helping you choose your own path. 

If you are new, start with the Introduction (this page), followed by the [Quickstart tutorials](./getting-started/index.md) and the [Installation & Configuration Guide](./guides-installation/index.md). Then, the remaining content is organised as follows:
### Guides
Guides help you to **do** something with Weaviate. 

Start with our [Essential guides](./guides-essential/index.md), and then move onto [Advanced configuration guides](./guides-config/index.md) to learn about configuring Weaviate for production, and [Further topics](./guides-further/index.md) to look at specific uses. The [Client libraries guides](./guides-client-libraries/index.md) will help you set up and use our Python, JavaScript, Java and Go client libraries.

### Concepts
If you want to **learn** more about Weaviate and vector space related topics, this is the place to go. Think of this section as something you can read through to learn more about these topics. 

The [Core concepts](./concepts-core/index.md) is an overview of all things Weaviate - its key components, and how they fit together. If you want to dig deeper into Weaviate, the [Architecture](./concepts-architecture/index.md) section is for you, and the [Vector space](./concepts-vectorization/index.md) section will teach you about all things vector-related for Weaviate, like getting into details of vector indexing and vectorizer algorithms. 

### References
The references sections are just that - technical references. They aim to capture how 

# What is Weaviate?

**Weaviate in a nutshell**: 

* Weaviate is an open-source ​database of the type ​vector search engine. 
* Weaviate allows you to store JSON documents in a class property-like fashion while attaching machine learning vectors to these documents to represent them in vector space.
* Weaviate can be used stand-alone (aka _bring your vectors_) or with a variety of modules that can do the vectorization for you and extend the core capabilities.
* Weaviate has a GraphQL-API to access your data easily.
* ​We aim to bring your vector search set up to production to query in mere milliseconds (check our [open source benchmarks](./benchmarks/) to see if Weaviate fits your use case).
* Get to know Weaviate in the [basics getting started guide](./core-knowledge/basics.html) in under five minutes. 

**Weaviate in detail**: Weaviate is a low-latency vector search engine with out-of-the-box support for different media types (text, images, etc.). It offers Semantic Search, Question-Answer Extraction, Classification, Customizable Models (PyTorch/TensorFlow/Keras), etc. Built from scratch in Go, Weaviate stores both objects and vectors, allowing for combining vector search with structured filtering and the fault tolerance of a cloud-native database. It is all accessible through GraphQL, REST, and various client-side programming languages.

## Weaviate helps

1. **Software Engineers** - Who use Weaviate as an ML-first database for their applications.
    * Out-of-the-box modules for NLP / semantic search, automatic classification, and image similarity search.
    * Easy to integrate with the current architecture, with full CRUD support like other OSS databases.
    * Cloud-native, distributed, runs well on Kubernetes, and scales with one’s workloads.

2. **Data Engineers** - Who use Weaviate as a vector database that is built up from the ground with ANN at its core and with the same UX they love from Lucene-based search engines.
    * Weaviate has a modular setup that allows you to use your ML models inside Weaviate. Due to its flexibility, you can also use out-of-the-box ML models (e.g., SBERT, ResNet, fasttext, etc.).
    * Weaviate takes care of the scalability so that you don’t have to.
    * Deploy and maintain ML models in production reliably and efficiently.

3. **Data Scientists** - Who use Weaviate for a seamless handover of their Machine Learning models to MLOps.
    * Deploy and maintain your ML models in production reliably and efficiently.
    * Weaviate’s modular design allows you to package any custom-trained model you want easily.
    * Smooth and accelerated handover of your Machine Learning models to engineers.

# Features

Weaviate makes it easy to use state-of-the-art AI models while providing the scalability, ease of use, safety and cost-effectiveness of a purpose-built vector database. Most notably:

* **Fast queries**<br />
   Weaviate typically performs nearest neighbor (NN) searches of millions of objects in considerably less than 100ms. You can find more information on our [benchmark](./benchmarks/) page.

* **Ingest any media type with Weaviate Modules**<br />
Use State-of-the-Art AI model inference (e.g., Transformers) for accessing data (text, images, etc.) at search-and-query time to let Weaviate manage the process of vectorizing data for you - or provide your own vectors.

* **Combine vector and scalar search**<br />
 Weaviate allows for efficient, combined vector and scalar searches. For example, “articles related to the COVID-19 pandemic published within the past 7 days.” Weaviate stores both objects and vectors and ensures the retrieval of both is always efficient. There is no need for a third-party object storage. 

* **Real-time and persistent**<br />
Weaviate lets you search through your data even if it’s currently being imported or updated. In addition, every write is written to a Write-Ahead-Log (WAL) for immediately persisted writes - even when a crash occurs.

* **Horizontal Scalability**<br />
  Scale Weaviate for your exact needs, e.g., maximum ingestion, largest possible dataset size, maximum queries per second, etc.

* **High-Availability**<br />
  Is on our [roadmap](./architecture/roadmap.html) and will be released later this year.

* **Cost-Effectiveness**<br />
  Very large datasets do not need to be kept entirely in-memory in Weaviate. At the same time, available memory can be used to increase the speed of queries. This allows for a conscious speed/cost trade-off to suit every use case.

* **Graph-like connections between objects**<br />
  Make arbitrary connections between your objects in a graph-like fashion to resemble real-life connections between your data points. Traverse those connections using GraphQL.

# How does Weaviate work?

Within Weaviate, all individual data objects are based on a class property structure where a vector represents each data object. You can connect data objects (like in a traditional graph) and search for data objects in the vector space.

You can add data to Weaviate through the [RESTful API](./restful-api-references/) end-points and retrieve data through the [GraphQL interface](./graphql-references/).

Weaviate's [vector indexing mechanism is modular](./vector-index-plugins/), and the current available plugin is the [Hierarchical Navigable Small World (HNSW) multilayered graph](./vector-index-plugins/hnsw.html).

# What are Weaviate modules?

Weaviate modules are used to extend Weaviate's capabilities and are optional. There are Weaviate modules that automatically vectorize your content (i.e., `*2vec`) or extend Weaviate's capabilities (often related to the type of vectors you have.) You can also create your own modules. Click [here](./modules) to get started with them.

# What is a vector search engine?

If you work with data, you probably work with search engine technology. The best search engines are amazing pieces of software, but because of their core architecture, they come with limitations when it comes to finding the data you are looking for.

Take for example the data object: `{ "data": "The Eiffel Tower is a wrought iron lattice tower on the Champ de Mars in Paris." }`

Storing this in a traditional search engine might leverage inverted indices to index the data. This means that to retrieve the data; you need to search for "Eiffel Tower" or "wrought iron lattice", etc. to find it. But what if you have vast amounts of data and you want the document about the Eiffel Tower but you search for: "landmarks in France?" Traditional search engines can't help you there, so this is where vector search engines show their superiority.

Weaviate uses vector indexing mechanisms at its core to represent the data. The vectorization modules (e.g., the NLP module) vectorizes the above-mentioned data object in a vector-space where the data object sits _near_ the text "landmarks in France." This means that Weaviate can't make a 100% match, but a very high one to show you the results.

The above example is for text (i.e., NLP), but you can use it for any machine learning model that vectorizes, like images, audio, video, genes, etc.

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
    - [Weaviate getting started guides overview](./getting-started/)
    - [Installation](./getting-started/installation.html)
- Learn more:
    - [Weaviate resources page](/resources.html)

# More resources

{% include docs-support-links.html %}
