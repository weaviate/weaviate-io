---
title: Imports in detail
sidebar_position: 4
image: og/docs/quickstart-tutorial.jpg
# tags: ['import']
---
import Badges from '/_includes/badges.mdx';
import { DownloadButton } from '/src/theme/Buttons';

<Badges/>

## Overview

You have already seen how to import data into Weaviate. So in this section, let's dig a little bit further into the details of imports including how vectors were imported, and some things to remember for optimization.

## Prerequisites 

At this point, you should have: 
- An instance of Weaviate running (e.g. on the [Weaviate Cloud Service](https://console.weaviate.io)),
- An API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face,
- Installed your preferred Weaviate client library, and
- Set up a `Question` class in your schema. 

Download the dataset below to your working directory if you haven't yet, as we will use it again here.

<p>
  <DownloadButton link="https://raw.githubusercontent.com/weaviate/weaviate-examples/main/jeopardy_small_dataset/jeopardy_tiny.json">Download jeopardy_tiny.json</DownloadButton>
</p>

## Import setup

We said in the [schema section](./schema.md) earlier that the `schema` specifies the structure of the information to be saved to Weaviate. 

So the data must be imported by matching properties of the relevant class, which in this case is the **Question** class defined in the previous section.

### Batch imports

Weaviate allows data objects to be created as a single object or in batches. 

For importing data, we **strongly suggest that you use batch imports**. Batch imports are carried out through the [`batch` REST endpoint](https://weaviate.io/developers/weaviate/api/rest/batch), and can greatly improve performance by sending multiple objects in single request.

### Batch import process

The general import process looks like this:

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

One is the size of the batch. This can be specified in some clients as a parameter (e.g. `batch_size` in the Python client), or manually determined by periodically flushing the batch. 

Typically a size of 100 is a reasonable starting point, although this may differ depending on the size of each data object. A smaller size may be preferable for larger data objects, such as if you are uploading your own vectors rather than using a vectorizer.

Another is that we do not provide a vector. This is due to the fact that we specified a `vectorizer` earlier in our schema definition. Accordingly, Weaviate will send a request to the appropriate module (`text2vec-openai` in this case) to vectorize the data, and the vector in the response will be indexed and saved into Weaviate tied to the data object.

#### Bring your own vector

If you wish to upload your own vector, for example because you have already vectorized your data, or if you have a custom vectorization pipeline, you can do so with Weaviate.

You can even manually upload existing vectors and use a vectorizer module for vectorizing queries.

## Confirm import

You can quickly check the imported object by opening – `weaviate-endpoint/v1/objects` in a browser, like this:

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

Although importing itself can be done in a few steps, creating an optimized import strategy needs a bit of planning. Here are a few things to keep in mind.

1. When importing, you want to make sure that you max out all the CPUs available. It's more often than not the case that the import script is the bottleneck.

    1. Use `htop` when importing to see if all CPUs are maxed out.

1. Use [parallelization](https://www.computerhope.com/jargon/p/parallelization.htm#:~:text=Parallelization%20is%20the%20act%20of,the%20next%2C%20then%20the%20next.); if the CPUs are not maxed out, just add another import process.
1. For Kubernetes, fewer large machines are faster than more small machines. Just because of network latency.

Our rules of thumb are:
* You should always use batch import.
* As mentioned above, max out your CPUs (on the Weaviate cluster). Often your import script is the bottleneck.
* Process error messages.
* Some clients (especially Python) have some build-in logic to efficiently regulate batch importing.

### Error handling

:::info `200` status code != 100% batch success
A `200` status code for the batch request does not mean that each batch item added/created!
:::

A batch request will always return a HTTP `200` status code when a the batch **request** was successful. This means that the request was successfully sent to Weaviate, and there were no issues with the connection or processing of the batch and no malformed request

However, it is important to note that even if the response code was `200`, individual data object imports could have failed. 

Accordingly, we recommend that you implement error handling at an object level following the [example laid out here](../api/rest/batch.md#error-handling)

## Recap

* Data to be imported should match the database schema
* Use batch import if possible
* For importing large datasets, make sure to consider and optimize your import strategy.

## Next

- [Queries in detail](./query.md)

### Other object operations

All other CRUD object operations are available in the [objects RESTful API documentation](../api/rest/index.md) and the [batch RESTful API documentation](../api/rest/batch.md).

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
