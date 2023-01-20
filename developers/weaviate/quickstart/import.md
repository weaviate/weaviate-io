---
title: Import
sidebar_position: 3
image: og/docs/quickstart-tutorial.jpg
# tags: ['import']
---
import Badges from '/_includes/badges.mdx';
import { DownloadButton } from '/src/theme/Buttons';

<Badges/>

Although importing itself is pretty straightforward, creating an optimized import strategy needs a bit of planning on your end. Hence, before we start with this guide, there are a few things to keep in mind.

1. When importing, you want to make sure that you max out all the CPUs available. It's more often than not the case that the import script is the bottleneck.
    0. Tip, use `htop` when importing to see if all CPUs are maxed out.
    0. Learn more about how to plan your setup [here](./installation.md#running-weaviate-yourself).
1. Use [parallelization](https://www.computerhope.com/jargon/p/parallelization.htm#:~:text=Parallelization%20is%20the%20act%20of,the%20next%2C%20then%20the%20next.); if the CPUs are not maxed out, just add another import process.
1. For Kubernetes, fewer large machines are faster than more small machines, simply because of network latency.

## Importing

First of all, some rules of thumb.

* You should always use batch import.
* As mentioned above, max out your CPUs (on the Weaviate cluster). Often your import script is the bottleneck.
* Process error messages.
* Some clients (especially Python) have some built-in logic to efficiently regulate batch importing.

Assuming that you've read the [schema quickstart tutorial](./schema.md), you import data based on the classes and properties defined in the schema.

For the purpose of this tutorial, we've prepared a **data.json** file, which contains a few Authors and Publications. Download it, and add it to your project.

<p>
  <DownloadButton link="/downloads/quickstart/data.json">Download data.json</DownloadButton>
</p>

### Steps to follow

Now, to import the data we need to follow these steps:
1. Connect to your Weaviate instance
1. Load objects from the `data.json` file
1. Prepare a batch process
1. Loop through all Publications
    * Parse each publication – to a structure expected by the language client of your choice
    * Push the object through a batch process
1. Loop through all Authors
    * Parse each author – to a structure expected by the language client of your choice
    * Push the object through a batch process
1. Flush the batch process – in case there are any remaining objects in the buffer

Here is the full code you need to import the **Publications** (note, the **importAuthors** example is shorter).

import CodeImportPubs from '/_includes/code/getting-started.import.publications.mdx';

<CodeImportPubs/>

And here is the code to import **Authors**.

import CodeImportAuthors from '/_includes/code/getting-started.import.authors.mdx';

<CodeImportAuthors/>

You can quickly check the imported object by opening – `weaviate-endpoint/v1/objects` in a browser, like this:

```
https://some-endpoint.weaviate.network/v1/objects
```

Or you can read the objects in your project, like this:

import CodeImportGet from '/_includes/code/getting-started.import.get.mdx';

<CodeImportGet/>

## Other object operations

All other CRUD object operations are available in the [objects RESTful API documentation](../api/rest/objects.md) and the [batch RESTful API documentation](../api/rest/batch.md).

## Recap

Importing into Weaviate needs some planning on your side. In almost all cases, you want to use the [batch endpoint](../api/rest/batch.md) to create data objects. More often than not, the bottleneck sits in the import script and not in Weaviate. Try to optimize for maxing out all CPUs to get the fastest import speeds.

<!-- ## What would you like to learn next?

- [Learn how to query with the GraphQL-API](./query.md)
- [Bring me back to working with the schema](./schema.md)
- [Show me how modules work](./modules.md) -->

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
