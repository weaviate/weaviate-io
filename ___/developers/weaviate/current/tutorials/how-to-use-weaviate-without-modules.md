---
layout: layout-documentation
solution: weaviate
sub-menu: Tutorials
title: How to use Weaviate with your own vectors without modules?
intro: Learn how to use Weaviate with your own vectors (no modules).
description: How to use Weaviate with your own vectors (no modules)?
tags: ['how to', 'no modules']
sidebar_position: 7
open-graph-type: article
toc: true
---

# Introduction
Weaviate can be used without any modules, as pure vector native database and search engine. If you choose not to include any modules, you will need to enter a vector for each data entry. You can then search through the objects by a vector as well. On this page you will learn how to set up Weaviate without modules, enter data objects with vectors and search through them. This tutorial uses a simple example to run Weaviate locally using docker-compose.

# Prerequisites

**1. Have docker-compose installed**\\
Make sure to have [`"docker-compose"`](https://docs.docker.com/compose/) installed on your machine. Check out [this guide](https://medium.com/semi-technologies/what-weaviate-users-should-know-about-docker-containers-1601c6afa079) for more info about docker-compose and Weaviate.


# Step 1 - Set up a Weaviate instance without any module attached.

### Download the Docker Compose configuration file. 
```bash
$ curl -o docker-compose.yml "https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&modules=standalone&runtime=docker-compose&weaviate_version={{ site.weaviate_version }}"
```

### Start up Weaviate
You can now start up with the whole setup by running:
```bash
$ docker-compose up -d
```

### Check if your Weaviate is running
Weaviate should now be running and exposed on your host port `8080`. You can verify with `docker ps` or simply send a test query to Weaviate which should return something like the following:

```bash
$ curl localhost:8080/v1/schema
```

which should return `{"classes":[]}`.

# Step 2 - Adding a data schema.

*Note: Since the introduction of Auto-Schema this entire step has become
optional. You only need to create a class explicitly, if you want to configure
non-default values. If you have the `DEFAULT_VECTORIZER_MODULE='none'`
configuration set globally, you can omit step 2 and proceed with step 3.*.

Even when you want to add data objects with a custom defined vector, you will need to define the objects' structure in a data schema. Let's create a simple schema for this example:

```json
{
  "classes": [{
      "class": "Post",
      "vectorizer": "none", # explicitly tell Weaviate not to vectorize anything, we are providing the vectors ourselves
      "properties": [{
          "name": "content",
          "dataType": ["text"],
      }]
  }]
}
```

Add this to Weaviate using one of the clients or with a curl command:

{% include code/1.x/howto.customvectors.schemacreate.html %}


# Step 3 - Import data to Weaviate

For this example, we're uploading one data object to our Weaviate instance. If you want to add more objects at once, check how ["batching"](../restful-api-references/batch.html) works.

We need to define the vector with the data object, because we don't have a vectorization module in Weaviate that does this for us now. Add the complete vector as follows when uploading a data object:

{% include code/1.x/howto.customvectors.adddata.html %}

Check the [API reference](../restful-api-references/objects.html#create-a-data-object-with-custom-vectors) for more information around creating objects.

# Step 4 - Query and search through data

You can search through vector data with Weaviate. If you don't have any modules attached, you can enter a vector and Weaviate will return vectors that are closest to this vector (computed by the cosine distance). Make sure the length of the search vector is the same as the vector length of the objects in your Weaviate instance.

Searching for and by vectors can be done with GraphQL. You can use an `explore` filter to find data objects close to a specified vector in your dataset. The `nearVector{}` filter is structured as follows for the `Get{}` function:

{% include code/1.x/howto.customvectors.nearvector.html %}


# More Resources

{% include docs-support-links.html %}
