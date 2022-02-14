---
layout: layout-documentation
bodyclass: ["page--guides", " "]
solution: weaviate
sub-menu: index
title: About
intro: Welcome to the documentation about Weaviate! Here you will find what's Weaviate all about, how to start your own Weaviate instance and interact with it, and how to use it to perform semantic search and automatic classification.<br><br>Like what you see? Consider giving us a <a href="https://github.com/semi-technologies/weaviate/stargazers">⭐ on Github</a>.
description: About Weaviate
tags: ['Weaviate', 'about']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# About Weaviate

Weaviate is a cloud-native, realtime vector search engine integrating scalable machine learning models. It uses a word vector storage mechanism called the "Contextionary", which uses Natural Language Processing principles to give context to the data and its language in your dataset. This makes Weaviate capable of **semantic search** and **automatic classification** of unstructured data.

## Demo and overview

Concept and demo presented at FOSDEM 2020;

<p><iframe width="560" height="315" src="https://www.youtube.com/embed/3NfcAF4qm2k" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></p>

## Why Weaviate?

In almost any situation where you work with data, you store information related to something in the real world. This can be data about transactions, cars, airplanes, products; you name it. The challenge with current databases is that it is difficult for the software to grasp the context of the entity you refer to in your datasets. Do the characters "Apple" refer to the company or the fruit?

![real world entities](/img/guides/entities.jpg "real world entities")

The Weaviate Vector Search Engine aims to solve this problem. Every time you store data, Weaviate indexes the data based on the linguistical context through a feature called The Contextionary. For example, when you store data about a _Company called "Apple"_, Weaviate automatically contextualizes the data related to an iPhone.

If you want to learn how the Contextionary does this, you can read more about our [Contextionary](#about-the-contextionary) here. We don't just want to store the data, but also the information and its context so that **knowledge** can be derived from it.

Because most data is related to something (e.g., "Amsterdam" _is the capital of_ "The Netherlands"), we store not only the concept itself but also the relation to other concepts (e.g., "the city Amsterdam" to "the country The Netherlands"). This means that the data you add to a Weaviate instance creates a network of knowledge, better known as a **graph**.

## Core use cases

0. **Semantic Search** to find on both concepts and keywords.
0. **Automatic Classification** to automatically extend your graph.
0. **Knowledge Representation** to represent information that systems and humans understand.

## Core features

Weaviate consists of four core features:

![Weaviate Vector Search Engine USPs](/img/guides/USPs.png "Weaviate Vector Search Engine USPs")

1. The Contextionary (c11y) is a vector index which stores _all_ data objects based on their semantics (their meaning). This allows users to now only directly search and retrieve data, but also to search for its concepts.
2. We believe that [GraphQL](https://graphql.org/) combined with a RESTful API, provides the best user experience to query Weaviate.
3. Weaviate can automatically build its own graph relations through conceptual classification.
4. With Weaviate you can create a semantic Knowledge Network based on a P2P network of Weaviates.

### Core developer features

0. **Contextionary** - the core graph embedding mechanism (i.e., ML-model) that indexes all data objects.
0. **GraphQL API** - an easy to use interface to query a Weaviate.
0. **RESTful API** - an easy to use interface to populate a Weaviate.
0. **Containerized** - with Docker and Kubernetes, to run it efficiently.
1. **Scalable** - to support huge graph sizes with fast vector space querying.

# About the Contextionary

The Contextionary (derived from **dictionary**, aka `C11Y`) gives context to the language used in your dataset (there is an individual Contextionary per language). When running a Weaviate instance, it comes with an out of the box Contextionary which is trained on the [Common Crawl](https://commoncrawl.org/), Wikipedia and, the Wiktionary. We aim to make the C11Y available for use cases in any domain, regardless if they are business-related, academic or other. But you can also create your own Contextionary if desired.

The Contextionary doesn't use a traditional storage and indexing mechanism, but it uses vector positions to place data into a 300-dimensional space. When you run a Weaviate, it comes with a pre-trained Contextionary (you never have to do any training yourself) that contains the contextual representation that allows Weaviate to store data based on its contextual meaning.

An empty Weaviate (with preloaded Contextionary) could be envisioned like this:

![empty Weaviate](/img/guides/c11y-empty.jpg "empty Weaviate")

When using Weaviate's [RESTful API](./restful-api-references/index.html) to add data, the Contextionary calculates the position in the vector space that represents the real-world entity.

The process from a data object to a vector position is calculated based on the centroid of the words weighted by the occurrences of the individual words in the original training text-corpus (e.g., the word `the` is seen as less important than the word `apple`).

![how the Contextionary calculates a vector](/img/guides/object-to-vector.jpg "how the Contextionary calculates a vector")

When a new class object is created, it will be added to a Weaviate.

![Weaviate with data](/img/guides/c11y-with-data.jpg "Weaviate with data")

When using the [GraphQL interface](./graphql-references/index.html), you can target a thing or action directly, or by searching for a nearby concept. E.g., the `company Apple` from the previous illustration, can be found by searching for the concept `iphone`.

# About classification

Because Weaviate converts all data objects in a vector position based on their semantic meaning, data object get a logical distance from each other. This allows for a variety of automated classification tasks Weaviate can perform in near-realtime.

### Example of a classification task

Inside the Weaviate below, there are three data objects stored, a country, and two cities.

![Weaviate with "Weaviate classification task, without relation](/img/guides/c11y-class1.jpg "Weaviate classification task, without relation")

The country has a property called `hasCapital` of which the reference is unset. We can now request Weaviate to connect the most likely candidate as the capital. Because Weaviate -through the schema- knows that the value of `hasCapital` must be a `City` it can choose from both Amsterdam and New York. Because of the semantic relation of Amsterdam to The Netherlands, a decision can be made.

![Weaviate with "Weaviate classification task, with relation](/img/guides/c11y-class2.jpg "Weaviate classification task, with relation")

When creating automatic classification tasks, the user is able to define how certain Weaviate needs to be of the connection. During querying, the user can see if the relation was made automatically or manually.

# Get started!

Want to get started or want to learn more? These resources might help you further:

- Get started:
    - [Weaviate in 10 minutes](./getting-started/quick-start.html).
    - [Installation](./getting-started/installation.html).
- Learn more:
    - [Talk and demonstration @ FOSDEM 2020](/news/fosdem-2020.html).
    - [Weaviate introduction on Google Cloud's Stack Chat](https://www.semi.technology/news/gcp-stackchat.html).
    - [Podcast about Weaviate](/news/gcp-podcast.html).

# More resources

{% include docs-support-links.html %}