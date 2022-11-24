---
title: Basics
sidebar_position: 1
# layout: layout-documentation
# solution: weaviate
# sub-menu: Core Knowledge
# description:  Weaviate vector search engine basics
# tags: ['basics']
# sidebar_position: 1
# open-graph-type: article
# toc: true
---

Based on the fact that you're here, you probably like machine learning and databases as much as we do. You might even have a use case requiring semantic search, image similarity search, recommendations, classification, etc. But you have one big question: how do I scale this to production, and what database, what search engine can I use that helps me with this?

If you have this question, fret not, because you've already learned something in the 10 seconds it took you to read this paragraph: _Weaviate is here to help!_ 

## What will you learn?

This guide is all about the basics. No getting your hands dirty yet, no fancy Kubernetes set-ups, no mixing vector search with BM25, or multi-model configurations. Just the core concepts so that you know what we talk about while continuing your Weaviate journey through the getting started guides.

## What is Weaviate?

Weaviate is a database of the type search engine, and it's specifically built to work with vector representations produced by machine learning models. Hence, Weaviate is a vector search engine (but we will still like you if you call it a vector database).

:::tip
When working with a database, you want [full CRUD support](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete). Not all approximate nearest neighbor algorithms support this, and not all incumbent databases (/search engines) are optimized for this type of indexing. These reasons are -among others- the most important to why Weaviate exists. You can also learn more about this by reading [this blog post](https://db-engines.com/en/blog_post/87).
:::

## Data objects in Weaviate

Weaviate stores _data objects_ (represented as JSON-documents) in _class-based collections_, where each object can be represented by a machine learning _vector_ (i.e., an embedding).

Each _class-based collection_ contains objects of the same _class_, which are defined by a common _schema_.

Let's unpack this with an example.

### JSON documents as objects

Imagine we need to store information about the following author: Alice Munro.

The data about this author can be represented in JSON like this:

```json
{
    "name": "Alice Munro",
    "age": 91,
    "born": "1931-07-10T00:00:00.0Z",
    "wonNobelPrize": true,
    "description": "Alice Ann Munro is a Canadian short story writer who won the Nobel Prize in Literature in 2013. Munro's work has been described as revolutionizing the architecture of short stories, especially in its tendency to move forward and backward in time."
}
```

### Vectors

As mentioned earlier, we can also attach `vector` representations to our data objects. This is represented as an array of numbers under a `"vector"` property, like this: 

```json
{
    "id": "779c8970-0594-301c-bff5-d12907414002",
    "class": "Author",
    "properties": {
        "name": "Alice Munro",
        (...)
    },
    "vector": [
        -0.16147631,
        -0.065765485,
        -0.06546908
    ]
}
```

### Class Collections

Weaviate groups all Authors under the `Author` class and places them in the same _class collection_.

<!-- [Alice Munro
Born: July 10, 1931 (age 91)
Nobel Prize Winner

"Alice Ann Munro is a Canadian short story writer who won the Nobel Prize in Literature in 2013. Munro's work has been described as revolutionizing the architecture of short stories, especially in its tendency to move forward and backward in time...."
]

[Paul Krugman
Born: February 28, 1953 (age 69)
Nobel Prize Winner

"Paul Robin Krugman is an American economist and public intellectual, who is..."
] -->

Following on our author example, Weaviate can store multipe authors like this:

```json
[{
    "id": "dedd462a-23c8-32d0-9412-6fcf9c1e8149",
    "class": "Author",
    "properties": {
        "name": "Alice Munro",
        "age": 91,
        "born": "1931-07-10T00:00:00.0Z",
        "wonNobelPrize": true,
        "description": "Alice Ann Munro is a Canadian short story writer who won the Nobel Prize in Literature in 2013. Munro's work has been described as revolutionizing the architecture of short stories, especially in its tendency to move forward and backward in time."
    },
    "vector": [
        -0.16147631,
        -0.065765485,
        -0.06546908
    ]
}, {
    "id": "779c8970-0594-301c-bff5-d12907414002",
    "class": "Author",
    "properties": {
        "name": "Paul Krugman",
        "age": 69,
        "born": "1953-02-28T00:00:00.0Z",
        "wonNobelPrize": true,
        "description": "Paul Robin Krugman is an American economist and public intellectual, who is Distinguished Professor of Economics at the Graduate Center of the City University of New York, and a columnist for The New York Times. In 2008, Krugman was the winner of the Nobel Memorial Prize in Economic Sciences for his contributions to New Trade Theory and New Economic Geography."
    },
    "vector": [
        -0.93070928,
        -0.03782172,
        -0.56288009
    ]
}]
```

:::tip
Every object stored in Weaviate has a [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier), which guarantees uniqueness across all collections.
:::

### Cross-references

In some cases we need to link data objects with each other.

For example: *"Paul Krugman writes for the New York Times"*.<br/>
To represent this relationship between the `Author` and the `Publication`, we need to cross reference the objects.

Let's say we have a *New York Times* object, like this:

```json
{
    "id": "32d5a368-ace8-3bb7-ade7-9f7ff03eddb6",
    "class": "Publication",
    "properties": {
        "name": "The New York Times"
    },
    "vector": [...]
}
```

Then we can use the `UUID` from the above object, to attach it to the `Author` like this (see `"writesFor"`):

<!-- TODO: check if the href format is correct. Shouldn't this include /Publication ?
 "href": "/v1/objects/Publication/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6"
 -->

```json
{
    "id": "779c8970-0594-301c-bff5-d12907414002",
    "class": "Author",
    "properties": {
        "name": "Paul Krugman",
        ...
        "writesFor": [
            {
                "beacon": "weaviate://localhost/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6",
                "href": "/v1/objects/32d5a368-ace8-3bb7-ade7-9f7ff03eddb6"
            }
        ]
    },
    "vector": [...]
}
```

:::tip
`Hrefs` and `beacons` are the locations within Weaviate, which allow us to retrieve cross-referenced objects. The difference between the two will become apparent while going through the getting started guide.
:::

## Weaviate Schema

Classes and properties are defined in the schema. While creating your use case, you will also spend some time tweaking the configuration inside the schema. As you're probably guessing, we have a separate getting started guide for [working with a schema](../getting-started/schema.html).

For now, what's important to know is this:

1. Classes and properties (as explained above) are defined in the schema.
1. Every class has its own vector space, which means that you can attach vectors from different models to different classes.
1. You can link classes (even if they use different embeddings) by setting cross-references.
1. You can configure module behavior, ANN index settings, reverse index types, etc. In the schema as well (more about this in the schema [getting started guide](../getting-started/schema.html)).

## Where do the vectors come from?

The short answer is: from machine learning models.

As a user, you have two ways of generating them:

* You render your vector from any model you have (we don't care  where they come from, we'll just index them for you 👍)
* You use a Weaviate module with a prepackaged `text2vec` integration (we call them "vectorizers", you can learn more about them [here](../modules/)).
    * [text2vec-transformers](../retriever-vectorizer-modules/text2vec-transformers.html)
    * [text2vec-openai](../retriever-vectorizer-modules/text2vec-openai.html)
    * [text2vec-huggingface](../retriever-vectorizer-modules/text2vec-huggingface.html)
    * [text2vec-contextionary](../retriever-vectorizer-modules/text2vec-contextionary.html) (custom FastText based vectorizer)
    * [img2vec-neural](../retriever-vectorizer-modules/img2vec-neural.html)
    * [multi2vec-clip](../retriever-vectorizer-modules/multi2vec-clip.html)

We will go deeper into the guide for adding data and the guide for modules. But for whatever vector use case you have, we've got you covered.

## Modules

If you bring your own vectors to Weaviate, running Weaviate stand-alone is all you need. But in certain cases, you might want to use one of the prepackaged modules. For example, if you use OpenAI embeddings, you might want to use the OpenAI module, which automatically integrates with their embeddings-API. Or, if you have a use case where you want to use Sentence Transformers, you can use the Hugging Face Transformers module.

What's important to remember is that you _can_ use Weaviate modules, but you don't _have_ to use them.

Weaviate distinguishes three types of modules: retrievers & vectorizers, readers & generators, and other modules.

1. *retrievers & vectorizers* are used to vectorize data objects and queries.
2. *readers & generators* are used for reranking or processing the results.
3. *other modules* are -often- non-ML, for example, the spell-check module.

:::tip
It's even possible to [create your own modules](../other-modules/custom-modules.html)! It takes a bit of knowledge about Go to integrate the module, but the module container (i.e., the container containing your module) can be written in any language.
:::

## Weaviate Console

The Weaviate console is part of the Weaviate Cloud Service and allows you to connect to any Weaviate instance and query it. You can follow [this](./console.html) getting started guide to learn more.

## Benchmarks

The [benchmark page](../benchmarks/) might be helpful when setting up your Weaviate instance. As a rule of thumb, when you choose a similar dataset to your use case, you should get similar results with similar settings. If the results diverge too much _negatively_ you probably made a mistake in hardware choices or in your Weaviate configuration. If the results are way more _positive_, [reach out to us immediately 😉]({{ site.slack_signup_url }})

## Monitoring

Weaviate can expose Prometheus-compatible metrics for [monitoring](../configuration/monitoring.html). We highly recommend setting this up, simply because it allows you to optimize your setup.

## Recapitulation

* Inside Weaviate, you can store _data objects_ which can be represented by a machine learning vector.
* Weaviate represents data objects as JSON documents.
* Every data object can contain a vector.
* You can set cross-references as datatypes to link to other objects.
* You will define classes and properties in a schema.
* Different classes can represent different vector spaces.
* The schema has a class-property data structure.
* You can configure Weaviate in the schema.
* You define classes and properties in the schema.
* We can query using the GraphQL-interface or -in some cases- the RESTful API.
* Vectors come from machine learning models that you inference yourself or through a Weaviate module.
* You can use Weaviate modules, but you don’t _have_ to use them.
* The benchmark page helps you to learn how far you can optimize for your use case.
* Monitoring helps you to monitor your setup and discover potential bottlenecks.

## What would you like to learn next?

* [I want to know how to install Weaviate](../getting-started/installation.html)
* [I want to learn how I can query the data](../getting-started/query.html)
* [I want to learn how to work with the Weaviate schema](../getting-started/schema.html)

# More Resources

{% include docs-support-links.html %}
