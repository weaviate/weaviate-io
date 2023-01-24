---
title: Import
sidebar_position: 4
image: og/docs/quickstart-tutorial.jpg
# tags: ['import']
---
import Badges from '/_includes/badges.mdx';
import { DownloadButton } from '/src/theme/Buttons';

<Badges/>

In this section, we will show you how to import data objects into your instance of Weaviate.

## Prerequisites 

At this point, you should have: 
- Weaviate running on the [Weaviate Cloud Service](https://console.semi.technology)
- Installed the appropriate client library in a language of your choice, and
- Added a schema for the **Publication** class.

If you have not done this, go back to [set up your Weaviate instance and client library](./installation.md) and [add a schema](./schema.md) first and come back 🙂.

## Import data

The data to be imported needs to match the classes and properties defined in the Weaviate schema. So in our case, we will import data according to the properties of the **Publication** class defined in the previous section.

Weaviate allows data objects to be created as a single object or in batches. For importing data, we **strongly suggest that you use batch imports**. Accordingly, this guide is written for batch import methods.

For the purpose of this guide, we've prepared a **data.json** file containing a few publications. Download it from below, and add it to your project.

<p>
  <DownloadButton link="/downloads/quickstart/data.json">Download data.json</DownloadButton>
</p>

Now, to import the data we need to follow these steps:

1. Connect to your Weaviate instance
1. Load objects from the `data.json` file
1. Prepare a batch process
1. Loop through all Publications
    1. Parse each publication – to a structure expected by the language client of your choice
    1. Push the object through a batch process
1. Flush the batch process – in case there are any remaining objects in the buffer

Here is the full code you need to import the **Publications**:

import CodeImportPubs from '/_includes/code/getting.started.import.publications.mdx';

<CodeImportPubs />

You can quickly check the imported object by opening – `weaviate-endpoint/v1/objects` in a browser, like this:

```
https://some-endpoint.semi.network/v1/objects
```

Or you can read the objects in your project, like this:

import CodeImportGet from '/_includes/code/getting.started.import.get.mdx';

<CodeImportGet />

The result should look something like this:

```json
{
  deprecations: null,
  objects: [
    {
      class: 'Publication',
      creationTimeUnix: 1665494303066,
      id: '16476dca-59ce-395e-b896-050080120cd4',
      lastUpdateTimeUnix: 1665494303066,
      properties: [Object],
      vectorWeights: null
    },
    {
      class: 'Publication',
      creationTimeUnix: 1665494303066,
      id: '212e56a6-e535-3569-ad1b-2215526c1d9d',
      lastUpdateTimeUnix: 1665494303066,
      properties: [Object],
      vectorWeights: null
    },
    {
      class: 'Publication',
      creationTimeUnix: 1665494303066,
      id: '32d5a368-ace8-3bb7-ade7-9f7ff03eddb6',
      lastUpdateTimeUnix: 1665494303066,
      properties: [Object],
      vectorWeights: null
    },
    ...
    {
      class: 'Publication',
      creationTimeUnix: 1665494303066,
      id: 'eaa33b83-3927-3aaf-af4b-4990c79485da',
      lastUpdateTimeUnix: 1665494303066,
      properties: [Object],
      vectorWeights: null
    },
    {
      class: 'Publication',
      creationTimeUnix: 1665494303066,
      id: 'f2968730-9ce5-3e6f-8e64-b6b9f68984b0',
      lastUpdateTimeUnix: 1665494303066,
      properties: [Object],
      vectorWeights: null
    },
    {
      class: 'Publication',
      creationTimeUnix: 1665494303066,
      id: 'fa207f19-e080-3902-982c-393d321776be',
      lastUpdateTimeUnix: 1665494303066,
      properties: [Object],
      vectorWeights: null
    },
  ],
  totalResults: 13
}
```

If you see something like the result above - congratulations! You have a fully functioning instance of Weaviate with data 🚀🎉. 

Now you are ready to start asking some big questions to Weaviate.

:::note
For importing large datasets, creating an optimized import strategy will make a big difference in import time. So please read our tips below on [data import best practices](#data-import---best-practices) if this is the case for you.
:::

## Recap

* Data to be imported should match the database schema
* Use batch import if possible
* For importing large datasets, make sure to consider and optimize your import strategy.

## Next

- [Perform queries with Weaviate](./query.html)

## Notes

### Data import - best practices

Although importing itself can be done in a few steps, creating an optimized import strategy needs a bit of planning. Here are a few things to keep in mind.

1. When importing, you want to make sure that you max out all the CPUs available. It's more often than not the case that the import script is the bottleneck.

    1. Use `htop` when importing to see if all CPUs are maxed out.
    1. Learn more about how to plan your setup [here](./installation.html#running-weaviate-yourself).

1. Use [parallelization](https://www.computerhope.com/jargon/p/parallelization.htm#:~:text=Parallelization%20is%20the%20act%20of,the%20next%2C%20then%20the%20next.); if the CPUs are not maxed out, just add another import process.
1. For Kubernetes, fewer large machines are faster than more small machines. Just because of network latency.

Our rules of thumb are:
* You should always use batch import.
* As mentioned above, max out your CPUs (on the Weaviate cluster). Often your import script is the bottleneck.
* Process error messages.
* Some clients (especially Python) have some build-in logic to efficiently regulate batch importing.

### Other object operations

All other CRUD object operations are available in the [objects RESTful API documentation](../restful-api-references/objects.html) and the [batch RESTful API documentation](../restful-api-references/batch.html).

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
