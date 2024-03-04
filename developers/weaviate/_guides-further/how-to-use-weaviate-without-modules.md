---
title: (TBC) Bring your own vectors
sidebar_position: 1
image: og/docs/further-guides.jpg
# tags: ['how to', 'no modules']
---


<!-- TODO: Finish this page! -->
<!-- :::caution Under construction.
Migrated from "How to use Weaviate without modules" tutorial from Weaviate Docs Classic
::: -->

## Overview
While we provide many different [modules](../modules/index.md) for vectorization, Weaviate can still be used without any such module. Instead, you can manually add a vector for each data entry and still take advantage of Weaviate's vector database and search capabilities.

For example, your dataset may already include a set of vectors, or you might wish to use a vectorizer that is not available through any of Weaviate's modules. It might be that you wish to take advantage of a vectorization pipeline that you have already set up for yourself.

Whatever the reason, you will see on this page just how you can do that - to bring "your own" vectors to Weaviate. By the end of this guide, you will have seen how to:
- Spin up an instance of Weaviate with auto-vectorization switched off
- Add objects with manually assigned vectors
- Perform vector and scalar searches of the objects in Weaviate

### Prerequisites

<!-- To SW: What do you think about something like this to define prerequisites @ different levels? -->
import BasicPrereqs from '/_includes/prerequisites-quickstart.md';

<BasicPrereqs />

## Set up Weaviate

### Download the Docker Compose file.
<!-- TODO: {{site.weaviate_version needs to be replaced}} -->
```bash
curl -o docker-compose.yml "https://configuration.weaviate.io/v2/docker-compose/docker-compose.yml?modules=standalone&runtime=docker-compose&weaviate_version={{ site.weaviate_version }}"
```

This will download the `docker-compose.yml` file. If you inspect its contents with your favorite text editor, you should see these lines:

```yaml
services:
  weaviate:
    environment:
      DEFAULT_VECTORIZER_MODULE: 'none'
      ENABLE_MODULES: ''
```

The key environment variable when bringing your own vectors to Weaviate is `DEFAULT_VECTORIZER_MODULE`. Here, we define is as `none` so that Weaviate's default behavior will be to **not** vectorize data at import.

:::note `DEFAULT_VECTORIZER_MODULE`
While this configuration does not include any vectorizers in any case, we note that the `DEFAULT_VECTORIZER_MODULE` variable is also applicable for when you do use Weaviate with vectorizer modules.
:::

Since we do not need any vectorizer modules, we can leave the `ENABLE_MODULES` environment variable blank. This will tell Weaviate to start without any additional modules at all.

### Start up Weaviate
Start up an instance of Weaviate by running:
```bash
docker compose up -d
```

Weaviate should now be running and exposed on your host port `8080`. You can verify that the container is running with `docker ps` or use the following code to send a test query to Weaviate:

```bash
curl localhost:8080/v1/schema
```

If the instance is ready, Weaviate responds with: `{"classes":[]}`.

## Add a data schema

Weaviate allows the user to specify a Weaviate vectorizer to be used at class level. This is done with the `vectorizer` parameter at the `class` level as below.

```json
{
  "classes": [{
      "class": "Post",
      "vectorizer": "none",  # explicitly tell Weaviate not to vectorize anything, we are providing the vectors ourselves
      "properties": [{
          "name": "content",
          "dataType": ["text"]
      }]
  }]
}
```

The above definition will tell Weaviate to not vectorize objects belonging to the `Post` class.

Since we have set the `DEFAULT_VECTORIZER_MODULE` environment variable to `none` as in the above step,  you do not need to set any additional options here for this tutorial.

Weaviate's [auto-schema](../manage-data/collections.mdx#auto-schema) feature will generate a schema for classes where one is not provided.

So, you can define a schema as above, or skip this step altogether. If you are defining a schema, you can follow the code example below:

Add this to Weaviate using one of the clients or with a curl command:

import CustomVectorsSchemaCreate from '/_includes/code/howto.customvectors.schemacreate.mdx';

<CustomVectorsSchemaCreate/>

<!-- TODO - Should we write a standard snippet about querying data schema? -->

## Import data to Weaviate

Now we are ready to import data into Weaviate.

The process to import data is almost the same as in other examples. The main difference is that each object has a `vector` property that provides the object's vector. To import, run one of the following code snippets in your client:

<!-- TODO - Rewrite this code example to use batch imports -->
import HowToAddData from '/_includes/code/howto.customvectors.adddata.mdx';

<HowToAddData/>

<!-- TODO - Should write a standard snippet about querying data objects (w/ vectors in results) -->
Your instance of Weaviate should now include those data objects, including our own vectors which we assigned above.

Check the [API reference](../api/rest/objects.md#with-a-custom-vector) for more information around creating objects.

## Query and search through data

Importantly, Weaviate still remains capable of performing vector searches even without vectorizer modules.

Searching for and by vectors can be done with GraphQL as it does in other cases. For instance, you can perform a vector search with Weaviate by entering a vector to search for using the [`nearVector` filter](../api/graphql/search-operators.md#nearVector).

Let's try out one such example here:

import HowToNearVector from '/_includes/code/howto.customvectors.nearvector.mdx';

<HowToNearVector/>

When you run this query, Weaviate will return vectors that are closest to the query vector, just as it does when Weaviate is configured with additional modules.

:::note Not all vector search filters available
We note that certain vector search filters are only available when a vectorizer module is active. For example, the `nearText` filter will not be available in this configuration, as Weaviate would not be able to vectorize the query object.
:::

## Wrap-up

As you see, manual vectorization involves some additional steps in comparison to using Weaviate's own vectorization modules. So this may not be the best workflow for many Weaviate users.

But if you require a particular vectorizer or have external sources of vectorization, you can incorporate Weaviate to use your own vectors like in this example.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
