---
title: Imports in detail
sidebar_position: 30
image: og/docs/tutorials.jpg
# tags: ['import']
---
import { DownloadButton } from '/src/theme/Buttons';

## Overview

In this section, we will explore data import, including details of the batch import process. We will discuss points such as how vectors are imported, what a batch import is, how to manage errors, and some advice on optimization.

## Prerequisites

Before you start this tutorial, you should follow the steps in the tutorials to have:

- An instance of Weaviate running (e.g. on the [Weaviate Cloud Services](https://console.weaviate.cloud)),
- An API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face,
- Installed your preferred Weaviate client library, and
- Set up a `Question` class in your schema.
    - You can follow the Quickstart guide, or the [schema tutorial](../starter-guides/schema.md) to construct the Question class if you have not already.

We will use the dataset below. We suggest that you download it to your working directory.

<p>
  <DownloadButton link="https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json">Download jeopardy_tiny.json</DownloadButton>
</p>

## Import setup

As mentioned in the [schema tutorial](../starter-guides/schema.md), the `schema` specifies the data structure for Weaviate.

So the data import must map properties of each record to those of the relevant class in the schema. In this case, the relevant class is **Question** as defined in the previous section.

### Data object structure

Each Weaviate data object is structured as follows:

```json
{
  "class": "<class name>",  // as defined during schema creation
  "id": "<UUID>",     // optional, must be in UUID format.
  "properties": {
    "<property name>": "<property value>", // specified in dataType defined during schema creation
  }
}
```

Most commonly, Weaviate users import data through a Weaviate client library.

It is worth noting, however, that data is ultimately added through the RESTful API, either through the [`objects` endpoint](../api/rest/objects.md) or the [`batch` endpoint](../api/rest/batch.md).

As the names suggest, the use of these endpoints depend on whether objects are being imported as batches or individually.

### To batch or not to batch

For importing data, we **strongly suggest that you use batch imports** unless you have a specific reason not to. Batch imports can greatly improve performance by sending multiple objects in a single request.

We note that batch imports are carried out through the [`batch` REST endpoint](../api/rest/batch.md).

### Batch import process

A batch import process generally looks like this:

1. Connect to your Weaviate instance
1. Load objects from the data file
1. Prepare a batch process
1. Loop through the records
    1. Parse each record and build an object
    1. Push the object through a batch process
1. Flush the batch process – in case there are any remaining objects in the buffer

Here is the full code you need to import the **Question** objects:

import CodeImportQuestions from '/_includes/code/quickstart.import.questions.mdx';

<CodeImportQuestions />

There are a couple of things to note here.

#### Batch size

Some clients include this as a parameter (e.g. `batch_size` in the Python client), or it can be manually set by periodically flushing the batch.

Typically, a size between 20 and 100 is a reasonable starting point, although this depends on the size of each data object. A smaller size may be preferable for larger data objects, such as if vectors are included in each object upload.

#### Where are the vectors?

You may have noticed that we do not provide a vector. As a `vectorizer` is specified in our schema, Weaviate will send a request to the appropriate module (`text2vec-openai` in this case) to vectorize the data, and the vector in the response will be indexed and saved as a part of the data object.

### Bring your own vectors

If you wish to upload your own vectors, you can do so with Weaviate. Refer to the [`batch` data object API documentation](../api/rest/batch.md#batch-create-objects). The object fields correspond to those of the [individual objects](../api/rest/objects.md#parameters-1).

You can also manually upload existing vectors and use a vectorizer module for vectorizing queries.

## Confirm data import

You can quickly check the imported object by opening `<weaviate-endpoint>/v1/objects` in a browser, like this (replace with your endpoint):

```
https://some-endpoint.semi.network/v1/objects
```

Or you can read the objects in your project, like this:

import CodeImportGet from '/_includes/code/quickstart.import.get.mdx';

<CodeImportGet />

The result should look something like this:

```json
{
    "deprecations": null,
    "objects": [
        ...  // Details of each object
    ],
    "totalResults": 10  // You should see 10 results here
}
```

## Data import - best practices

When importing large datasets, it may be worth planning out an optimized import strategy. Here are a few things to keep in mind.

1. The most likely bottleneck is the import script. Accordingly, aim to max out all the CPUs available.
1. To use multiple CPUs efficiently, enable sharding when you import data. For the fastest imports, enable sharding even on a single node.
1. Use [parallelization](https://www.computerhope.com/jargon/p/parallelization.htm#:~:text=Parallelization%20is%20the%20act%20of,the%20next%2C%20then%20the%20next.); if the CPUs are not maxed out, just add another import process.
1. Use `htop` when importing to see if all CPUs are maxed out.
1. To avoid out-of-memory issues during imports, set `LIMIT_RESOURCES` to `True` or configure the `GOMEMLIMIT` environment variable. For details, see [Environment variables](../config-refs/env-vars.md).
1. For Kubernetes, a few large machines are faster than many small machines (due to network latency).

Our rules of thumb are:
* You should always use batch import.
* Use multiple shards.
* As mentioned above, max out your CPUs (on the Weaviate cluster). Often your import script is the bottleneck.
* Process error messages.
* Some clients (e.g. Python) have some built-in logic to efficiently control batch importing.

### Error handling

We recommend that you implement error handling at an object level, such as in [this example](../api/rest/batch.md#error-handling).

:::tip `200` status code != 100% batch success
It is important to note that an HTTP `200` status code only indicates that the **request** has been successfully sent to Weaviate. In other words, there were no issues with the connection or processing of the batch and no malformed request.

A request with a `200` response may still include object-level errors, which is why error handling is critical.
:::

## Recap

* Data to be imported should match the database schema
* Use batch import unless you have a good reason not to
* For importing large datasets, make sure to consider and optimize your import strategy.

## Suggested reading

- [Tutorial: Schemas in detail](../starter-guides/schema.md)
- [Tutorial: Queries in detail](./query.md)
- [Tutorial: Introduction to modules](./modules.md)
- [Tutorial: Introduction to Weaviate Console](../../wcs/guides/console.mdx)

### Other object operations

All other CRUD object operations are available in the [objects RESTful API documentation](../api/rest/index.md) and the [batch RESTful API documentation](../api/rest/batch.md).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
