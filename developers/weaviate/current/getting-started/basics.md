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

If you have this question, you've already learned something in the 10 seconds it took you to read this: Weaviate is here to help.

## What will you learn?

This guide is all about the basics. No getting your hands dirty yet, no fancy Kubernetes set-ups, no mixing vector search with BM25, or multi-model configurations. Just the core concepts so that you know what we talk about while continuing your Weaviate journey through the getting started guides.

## What is Weaviate?

Weaviate is a database of the type search engine, and it's specifically built to work with vector representations produced by machine learning models. Hence, Weaviate is a vector search engine (but we will still like you if you call it a vector database).

## Data objects in Weaviate

Inside Weaviate, you can create JSON documents where you set values to properties. These properties can be of almost any data type (e.g., string, text, date, int, float, etc.) As a Weaviate user, you can set (almost) any name for a property.

An example of an individual data object:

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

Within Weaviate, we can also attach vector representations to the data objects. This might look something like this:

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

<div class="alert alert-secondary">
💡 Hrefs and beacons are the locations within a Weaviate where you can retrieve the cross-reference. The difference between the two will become apparent while going through the getting started guide.
</div>

## Weaviate Schema

Classes and properties are defined in the schema. While creating your use case, you will also spend some time tweaking the configuration inside the schema. As you're probably guessing, we have a separate getting started guide for working with a schema.

## Where do these vectors come from?

The short answer is: from machine learning models.

As a user, you have two ways of doing this:

* You render your vector from any model you have (we don't care  where they come from, we'll store them for you)
* You use a Weaviate module with a prepackaged integration.

We will go deeper into the guide for adding data and the guide for modules. But for whatever vector use case you have, we've got you covered.

## Recapitulation

* Weaviate stores JSON objects with a wide variety of data types.
* Every data object can contain a vector.
* You can set cross-references as datatypes to link to other objects.
* You will define classes and properties in a schema.
* Different classes can represent different vector spaces.
* The schema has a Class-property data structure.
* You can configure Weaviate in the schema.
* We can query using the GraphQL-interface or -in some cases- the RESTful API.
* Vectors come from machine learning models that you inference yourself or through a Weaviate module.

## What would you like to learn next?

* [I want to know how to install Weaviate](./install.html)
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
