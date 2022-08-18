---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Import
description: Getting started with importing in Weaviate
tags: ['import']
menu-order: 5
open-graph-type: article
toc: true
---

Although importing itself is pretty straightforward, creating an optimized import strategy needs a bit of planning on your end. Hence, before we start with this guide, there are a few things to keep in mind.

0. When importing, you want to make sure that you max out all the CPUs available. It's more often than not the case that the import script is the bottleneck.
    0. Tip, use `htop` when importing to see if all CPUs are maxed out.
    0. Learn more about how to plan your setup [here](./installation.html#running-weaviate-yourself).
0. Use [parallelization](https://www.computerhope.com/jargon/p/parallelization.htm#:~:text=Parallelization%20is%20the%20act%20of,the%20next%2C%20then%20the%20next.); if the CPUs are not maxed out, just add another import process.
0. For Kubernetes, fewer large machines are faster than more small machines. Just because of network latency.

## Importing

First of all, some rules of thumb.

* In almost all cases, you want to batch import data.
* As mentioned above, max out your CPUs (on the Weaviate cluster). Often your import script is the bottleneck.
* Process error messages.
* Some clients (especially Python) have some build-in logic to efficiently regulate batch importing.

Assuming that you've read the [schema getting started guide](./schema.html), you import data based on the classes and properties defined in the schema (no 💩, 🕵️). The big difference between importing a single object in Weaviate and batch importing is that instead of sending a single JSON object, you import an array of JSON objects.

As you've seen in the [basics getting started guide](./basics.html#data-objects-in-weaviate), Weaviate data objects are class/property based JSON-objects.

An example of a single object:

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

An example of an array of data objects:

```json
[{
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
}, {
    "class": "Author",
    "properties": {
        "name": "Paul Krugman",
        "age": 69,
        "born": "1953-02-28T00:00:00.0Z",
        "wonNobelPrize": true,
        "description": "Paul Robin Krugman is an American economist [...] New Economic Geography."
    },
    "vector": [
        -0.16147631,
        -0.065765485,
        -0.06546908
    ]
}]
```

Let's import the data (make sure you have [an empty Weaviate running](./installation.html)) and use Weaviate's [auto schema feature](./schema.html#auto-schema-feature) to generate a schema.

{% include code/1.x/getting-started.import.create.html %}

You can now see the added object here:

{% include code/1.x/getting-started.import.get.html %}


## Other object operations

All other CRUD object operations are available in the [objects RESTful API documentation](../restful-api-references/objects.html) and the [batch RESTful API documentation](../restful-api-references/batch.html).

## Recapitulation

Importing into Weaviate needs some planning on your side. In almost all cases, you want to use the [batch endpoint](../restful-api-references/batch.html) to create data objects. More often than not, the bottleneck sits in the import script and not in Weaviate. Try to optimize for maxing out all CPUs to get the fastest import speeds.

## What would you like to learn next?

- [Learn how to query with the GraphQL-API](./query.html)
- [Bring me back to working with the schema](./schema.html)
- [Show me how modules work](./modules.html)

# More Resources

{% include docs-support-links.html %}
