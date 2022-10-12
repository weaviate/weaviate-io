---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Import
description: Getting started with importing in Weaviate
tags: ['import']
menu-order: 3
open-graph-type: article
toc: true
redirect_from:
  - /developers/weaviate/v1.8.0/tutorials/how-to-import-data.html
  - /developers/weaviate/v1.14.1/getting-started/import.html
---

Although importing itself is pretty straightforward, creating an optimized import strategy needs a bit of planning on your end. Hence, before we start with this guide, there are a few things to keep in mind.

0. When importing, you want to make sure that you max out all the CPUs available. It's more often than not the case that the import script is the bottleneck.
    0. Tip, use `htop` when importing to see if all CPUs are maxed out.
    0. Learn more about how to plan your setup [here](./installation.html#running-weaviate-yourself).
0. Use [parallelization](https://www.computerhope.com/jargon/p/parallelization.htm#:~:text=Parallelization%20is%20the%20act%20of,the%20next%2C%20then%20the%20next.); if the CPUs are not maxed out, just add another import process.
0. For Kubernetes, fewer large machines are faster than more small machines, simply because of network latency.

## Importing

First of all, some rules of thumb.

* You should always use batch import.
* As mentioned above, max out your CPUs (on the Weaviate cluster). Often your import script is the bottleneck.
* Process error messages.
* Some clients (especially Python) have some built-in logic to efficiently regulate batch importing.

Assuming that you've read the [schema getting started guide](./schema.html), you import data based on the classes and properties defined in the schema.

<!-- > 💡 The big difference between creating a single object in Weaviate and batch imports is that instead of sending a single JSON object, batch sends an array of JSON objects. -->

<!-- As you've seen in the [basics getting started guide](./basics.html#data-objects-in-weaviate), Weaviate data objects are class-property-based JSON objects. -->

For the purpose of this tutorial, we've prepared a **data.json** file, which contains a few Authors and Publications. Download it from [here](https://raw.githubusercontent.com/semi-technologies/weaviate-io/main/downloads/data.json){:target="_blank"}, and add it to your project.

Now, to import the data we need to follow these steps:
0. Connect to your Weaviate instance
0. Load objects from the `data.json` file
0. Prepare a batch process
0. Loop through all Publications
  * Parse each publication – to a structure expected by the language client of your choice
  * Push the object through a batch process
0. Loop through all Authors
  * Parse each author – to a structure expected by the language client of your choice
  * Push the object through a batch process
0. Flush the batch process – in case there are any remaining objects in the buffer

Here is the full code you need to import the **Publications** (note, the **importAuthors** example is shorter).

{% include code/1.x/getting-started.import.publications.html %}

And here is the code to import **Authors**.

{% include code/1.x/getting-started.import.authors.html %}

You can quickly check the imported object by opening – `weaviate-endpoint/v1/objects` in a browser, like this:

```
https://some-endpoint.semi.network/v1/objects
```

Or you can read the objects in your project, like this:

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
