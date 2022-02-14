---
layout: layout-documentation
bodyclass: ["page--guides", " "]
solution: weaviate
sub-menu: index
title: Introduction
intro: Welcome to the documentation about Weaviate! Here you will find what's Weaviate all about, how to start your own Weaviate instance and interact with it, and how to use it to perform vector searches and classification.<br><br>Like what you see? Consider giving us a <a href="https://github.com/semi-technologies/weaviate/stargazers">⭐ on Github</a>.
description: About Weaviate
tags: ['Weaviate', 'about']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Introduction video

<iframe width="100%" height="375" src="https://www.youtube.com/embed/eXdQA0vSbiE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

# What is Weaviate?

Weaviate is a cloud-native, modular, real-time vector search engine built to scale your machine learning models.

- Highly efficient large scale vector searches
- State of the Art classification techniques
- Easily retrieve your data in graph format using GraphQL

You can extend Weaviate with:

0. An out-of-the box vectorization module which creates vectors from your data on import.
0. Your existing machine-learning models, import your vectors directly

You can use multiple vectorization modules in one Weaviate instance. For example, if you want to vectorize a text object with an NLP module and an image with an image vectorization module.

# Why a vector search engine?

If you work with data, you probably work with search engine technology. The best search engines are amazing pieces of software, but because of their core architecture, they come with limitations when it comes to finding the data you are looking for.

Take for example the data object: `{ "data": "The Eiffel Tower is a wrought iron lattice tower on the Champ de Mars in Paris" }`

Storing this in a traditional search engine might leverage inverted indices to index the data. This means that to retrieve the data; you need to search for "Eiffel Tower" or "wrought iron lattice", etc to find it. But what if you have vast amounts of data and you want the document about the Eiffel Tower but you search for: "landmarks in France"? Traditional search engines can't help you there and this is where vector search engines enter the stage.

Weaviate uses vector indexing mechanisms at its core to represent the data. The vectorization modules (e.g., the NLP module) vectorizes the above-mentioned data object in a vector-space where the data object sits _near_ the text "landmarks in France". This means that Weaviate can't make a 100% match, but a very high one to show you the results.

The above example is for text (i.e., NLP) but you can use it for any machine learning model that vectorizes, like images, audio, video, genes etcetera.

Last but not least, using a vector search engine for your machine learning is something you do for the same reason you've been using a traditional search engine. It allows you to scale fast, search, and classify in realtime and it can be used as a robust production environment.

# How does Weaviate work?

Within Weaviate, all individual data objects are based on a class property structure where a vector represents each data object. You can connect data objects (like in a traditional graph) and search for data objects in the vector space.

You can add data to Weaviate through the [RESTful API](./restful-api-references/) end-points and retrieve data through the [GraphQL interface](./graphql-references/).

Weaviates [vector indexing mechanism is modular](./vector-index-plugins/), and the current available plugin is the [Hierarchical Navigable Small World (HNSW) multilayered graph](./vector-index-plugins/hnsw.html).

# When should I use Weaviate?

There are four main situations when you should consider using Weaviate.

- If you don't like the quality of results that your current search engine gives you.
- If it is too much work to bring your machine learning models to scale.
- If you need to classify large datasets fast and near-realtime.
- If you need to scale your machine learning models to production size

People use Weaviate for cases such as semantic search, image search, similarity search, anomaly detection, power recommendation engines, e-commerce search, data classification in ERP systems, automated data harmonization, cybersecurity threat analysis, and many many more cases.

# Get started

Want to get started or want to learn more? These resources might help you further:

- Get started:
    - [Weaviate in 10 minutes tutorial](./getting-started/quick-start.html)
    - [Installation](./getting-started/installation.html)
- Learn more:
    - [Talk and demonstration @ FOSDEM 2020](/news/fosdem-2020.html)
    - [Weaviate introduction on Google Cloud's Stack Chat](https://www.semi.technology/news/gcp-stackchat.html)
    - [Podcast about Weaviate](/news/gcp-podcast.html)

# More resources

{% include docs-support-links.html %}