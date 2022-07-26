---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Basics
description: Getting started with the Weaviate vector search engine basics
tags: ['basics']
menu-order: 1
open-graph-type: article
toc: true
---

Based on the fact that you're here, you probably like machine learning and databases as much as we do. You might even have a use case requiring semantic search, image similarity search, recommendations, classification, etc. But you have one big question: how do I scale this to production, and what database, what search engine can I use that helps me with this?

If you have this question, fret not, because you've already learned something in the 10 seconds it took you to read this paragraph: _Weaviate is here to help!_ 

## What will you learn?

This guide is all about the basics. No getting your hands dirty yet, no fancy Kubernetes set-ups, no mixing vector search with BM25, or multi-model configurations. Just the core concepts so that you know what we talk about while continuing your Weaviate journey through the getting started guides.

## What is Weaviate?

Weaviate is a database of the type search engine, and it's specifically built to work with vector representations produced by machine learning models. Hence, Weaviate is a vector search engine (but we will still like you if you call it a vector database).

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 When working with a database, you want [full CRUD support](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Not all approximate nearest neighbor algorithms support this, and not all incumbent databases (/search engines) are optimized for this type of indexing. These reasons are -among others- the most important to why Weaviate exists You can also learn more about this by reading [this blog post](https://db-engines.com/en/blog_post/87).
</div>

## Data objects in Weaviate

Inside Weaviate, you can store _data objects_ (represented as JSON documents stored in a key-value store that's always present) which can be represented by a machine learning vector representation (i.e., an embedding).

The properties (i.e., JSON key values) of the data objects can be of almost any data type (e.g., string, text, date, int, float, [etc.](../data-schema/datatypes.html)) As a Weaviate user, you can set (almost) any name for a property (i.e., JSON key).

An example of an individual data object as stored in Weaviate:

```json
{
    "name": "Paul Krugman",
    "age": 69,
    "born": "1953-02-28T00:00:00.0Z",
    "wonNobelPrize": true,
    "description": "Paul Robin Krugman is an American economist and public intellectual, who is Distinguished Professor of Economics at the Graduate Center of the City University of New York, and a columnist for The New York Times. In 2008, Krugman was the winner of the Nobel Memorial Prize in Economic Sciences for his contributions to New Trade Theory and New Economic Geography."
}
```

Within Weaviate, we group these data objects into classes. 

For example:

```json
{
    "class": "Author",
    "properties": {
        "name": "Paul Krugman",
        "age": 69,
        "born": "1953-02-28T00:00:00.0Z",
        "wonNobelPrize": true,
        "description": "Paul Robin Krugman is an American economist and public intellectual, who is Distinguished Professor of Economics at the Graduate Center of the City University of New York, and a columnist for The New York Times. In 2008, Krugman was the winner of the Nobel Memorial Prize in Economic Sciences for his contributions to New Trade Theory and New Economic Geography."
    }
}
```

As mentioned above, we can also attach vector representations to the data objects. This might look something like this:

```json
{
    "class": "Author",
    "properties": {
        "name": "Paul Krugman",
        "age": 69,
        "born": "1953-02-28T00:00:00.0Z",
        "wonNobelPrize": true,
        "description": "Paul Robin Krugman is an American economist and public intellectual, who is Distinguished Professor of Economics at the Graduate Center of the City University of New York, and a columnist for The New York Times. In 2008, Krugman was the winner of the Nobel Memorial Prize in Economic Sciences for his contributions to New Trade Theory and New Economic Geography."
    },
    "vector": [
        -0.16147631,
        -0.065765485,
        -0.06546908
    ]
}
```

Every data object has a UUID that we can use to retrieve individual data objects or make cross references. 

Let's say we have a second data object that looks something like this:

```json
{
    "id": "32d5a368-ace8-3bb7-ade7-9f7ff03eddb6",
    "class": "Publication",
    "properties": {
        "name": "The New York Times"
    },
    "vector": [
        -0.0030892247,
        0.17440806,
        0.024489688
    ]
}
```

Based on the UUID of the publication. We can now attach the UUID to the `Author` like this:

```json
{
    "class": "Author",
    "properties": {
        "name": "Paul Krugman",
        "age": 69,
        "born": "1953-02-28T00:00:00.0Z",
        "wonNobelPrize": true,
        "description": "Paul Robin Krugman is an American economist [...] New Economic Geography.",
        "writesFor": [
            {
                "beacon": "weaviate://localhost/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6",
                "href": "/v1/objects/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6"
            }
        ]
    },
    "vector": [
        -0.16147631,
        -0.065765485,
        -0.06546908
    ]
}
```

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 Hrefs and beacons are the locations within a Weaviate where you can retrieve the cross-reference. The difference between the two will become apparent while going through the getting started guide.
</div>

## Weaviate Schema

Classes and properties are defined in the schema. While creating your use case, you will also spend some time tweaking the configuration inside the schema. As you're probably guessing, we have a separate getting started guide for [working with a schema](./schema.html).

For now, what's important to know is this:

0. Classes and properties (as explained above) are defined in the schema.
0. Every class has its own vector space, which means that you can attach vectors from different models to different classes.
0. You can link classes (even if they use different embeddings) by setting cross-references.
0. You can configure module behavior, ANN index settings, reverse index types, etc. In the schema as well (more about this in the schema getting [started guide](./schema.html)).



## Where do the vectors come from?

The short answer is: from machine learning models.

As a user, you have two ways of generating them:

* You render your vector from any model you have (we don't care  where they come from, we'll just store them for you)
* You use a Weaviate module with a prepackaged `text2vec` integration (we call them "vectorizers", you can learn more about them [here](../modules/)).
    * [text2vec-transformers](../retriever-vectorizer-modules/text2vec-transformers.html)
    * [text2vec-openai](../retriever-vectorizer-modules/text2vec-openai.html)
    * [text2vec-contextionary](../retriever-vectorizer-modules/text2vec-contextionary.html) (custom FastText based vectorizer)
    * [img2vec-neural](../retriever-vectorizer-modules/img2vec-neural.html)
    * [multi2vec-clip](../retriever-vectorizer-modules/multi2vec-clip.html)

We will go deeper into the guide for adding data and the guide for modules. But for whatever vector use case you have, we've got you covered.

## Modules

If you bring your own vectors to Weaviate, running Weaviate stand-alone is all you need. But in certain cases, you might want to use one of the prepackaged modules. For example, if you use OpenAI embeddings, you might want to use the OpenAI module, which automatically integrates with their embeddings-API. Or, if you have a use case where you want to use Sentence Transformers, you can use the Huggingface transformers module.

What's important to remember is that you _can_ use Weaviate modules, but you don't _have_ to use them.

Weaviate distinguishes three types of modules: retrievers & vectorizers, readers & generators, and other modules.

1. *retrievers & vectorizers* are used to vectorize data objects and queries.
2. *readers & generators* are used for reranking or processing the results.
3. *other modules* are -often- non-ML, for example, the spell-check module.

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 It's even possible to [create your own modules](../modules/custom-modules.html)! It takes a bit of knowledge about Go, but the module container can be written in any language.
</div>

## Weaviate Console

The Weaviate console is part of the Weaviate Cluster Service and allows you to connect to any Weaviate instance and query it. You can follow [this](./console.html) getting started guide to learn more.

## Recapitulation

* Inside Weaviate, you can store _data objects_ which can be represented by a machine learning vector.
* Weaviate represents data objects as JSON documents.
* Every data object can contain a vector.
* You can set cross-references as datatypes to link to other objects.
* You will define classes and properties in a schema.
* Different classes can represent different vector spaces.
* The schema has a Class-property data structure.
* You can configure Weaviate in the schema.
* You define classes and properties in the schema.
* We can query using the GraphQL-interface or -in some cases- the RESTful API.
* Vectors come from machine learning models that you inference yourself or through a Weaviate module.
* You can use Weaviate modules, but you don’t _have_ to use them.

## What would you like to learn next?

* [I want to know how to install Weaviate](./installation.html)
* [I want to learn how I can query the data](./query.html)
* [I want to learn how to work with the Weaviate schema](./schema.html)

## Legend

* vectors
* data object
* class
* property
* cross reference
* beacon
* href
* vector space

# More Resources

{% include docs-support-links.html %}
