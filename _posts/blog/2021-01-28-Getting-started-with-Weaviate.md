---
layout: post
title: Getting Started with Weaviate
description: "Everybody who works with data in any way shape or form knows that one of the most important challenges is searching for the correct answers to your questions. There is a whole set of excellent (open source) search engines available but there is one thing that they can’t do, search and related data based on context."
published: true
author: Bob van Luijt
author-img: /img/people/icon/bob.jpg
card-img: /img/blog/hero/getting-started-card.png
hero-img: /img/blog/hero/getting-started.png
canonical-url: https://medium.com/semi-technologies/getting-started-with-the-weaviate-vector-search-engine-10e3997ac3b
canonical-name: Medium
date: 2021-01-28
toc: true
---

<!-- TODO: make sure the content is up to date -->

## Intro
Let look at the following data object that one might store in a search engine:

```json
{
    "title": "African bush elephant",
    "photoUrl": "https://en.wikipedia.org/wiki/African_bush_elephant"
}
```

You can retrieve the data object from any search engine by searching for “elephant” or “african”. But what if you want to search for “animal”, “savanna” or “trunk”?

> This is the problem the Weaviate search graph solves, because of its build-in natural language model, it indexes your data based on the context rather than keywords alone.

In this article, you will learn within 10 minutes how to use Weaviate to build your own semantic search engine and how this GraphQL query:

```graphql
{
  Get{
    Things{
      Photo(
        explore: {
          concepts: ["animal with a trunk"]
        }
        limit:1
      ){
        title
        photoUrl
      }
    }
  }
}
```

Will result in the following response:

```json
{
  "data": {
    "Get": {
      "Things": {
        "Photo": [
          {
            "photoUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bf/African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg",
            "title": "African bush elephant"
          }
        ]
      }
    }
  },
  "errors": null
}
```

<!-- TODO: review the references -->
If you want to learn more (outside this article), you can watch this [FOSDEM video](https://www.youtube.com/watch?v=3NfcAF4qm2k){:target="_blank"} or this interview at [Google Cloud’s Slack Chat](https://www.youtube.com/watch?v=SOUtWj2szOM){:target="_blank"}. All documentation for Weaviate can be found [here](developers/weaviate/current){:target="_blank"}.

## Running Weaviate
The easiest way to get started with Weaviate is by running the Docker compose setup.

In this demo we will be using the English version of Weaviate which you can run with the following commands:

<!-- TODO: refresh the installation commands -->
```bash
# Download the Weaviate configuration file
$ curl -O https://raw.githubusercontent.com/semi-technologies/weaviate/0.22.7/docker-compose/runtime/en/config.yaml
# Download the Weaviate docker-compose file
$ curl -O https://raw.githubusercontent.com/semi-technologies/weaviate/0.22.7/docker-compose/runtime/en/docker-compose.yml
# Run Docker Compose
$ docker-compose up
```

When Weaviate is running, you can simply check if it is up by using the following command:

```bash
$ curl http://localhost:8080/v1/meta
```

We will be creating a mini-search engine for photos by taking the three following steps:

1. Create a Weaviate schema.
1. Add data to Weaviate.
1. Query the data with Weaviate’s GraphQL interface.

## Create a Weaviate Schema
The first thing you need to do when working with Weaviate is create a schema, Weaviate makes a distinction between “things” and “actions”, in this getting started guide, we will only work with things, but the distinction is often made between nouns (things) and verbs (actions). The schema will later be used when querying and exploring your dataset. As a good rule of thumb, Weaviate uses the RESTful API to add data and the GraphQL API to fetch data.

The schema is in graph format, meaning that you can create (huge) networks (i.e., knowledge graphs) of your data if you so desire, but if you are building a simple search engine, one class with a few properties can already be enough.

You can learn more about creating a schema [here](developers/weaviate/current/data-schema/index.html){:target="_blank"}. But for now, we will dive in and create a super simple schema for a photo dataset.

In the example below, we are going to use the command line to add a schema, but you can also use the [Python library](developers/weaviate/current/client-libraries/python.html){:target="_blank"}, Postman, or any other way you like to send out HTTP requests.

```bash
$ curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "class": "Photo",
    "description": "A photo",
    "vectorizeClassName": false,
    "keywords": [],
    "properties": [
        {
            "dataType": [
                "string"
            ],
            "name": "title",
            "description": "Title of the Photo",
            "vectorizePropertyName": false,
            "index": true
        }, {
            "dataType": [
                "string"
            ],
            "name": "photoUrl",
            "description": "URL of the Photo",
            "vectorizePropertyName": false,
            "index": false
        }
    ]
  }' \
  http://localhost:8080/v1/schema/things
```

You can now examine the class like this:

```bash
$ curl http://localhost:8080/v1/schema
```

or with jq

```
$ curl http://localhost:8080/v1/schema | jq .
```

Let’s examine the JSON object to understand what we just added to Weaviate - learn more in [the documentation](developers/weaviate/current/data-schema/schema-configuration.html){:target="_blank"}.

![Schema Structure](/img/blog/getting-started/schema-structure.jpeg)

Let’s add another class that represents a user and the photos this user owns.

```bash
$ curl \
  --header "Content-Type: application/json" \
  --request POST \
  --data '{
    "class": "User",
    "description": "A user",
    "keywords": [],
    "properties": [
        {
            "dataType": [
                "string"
            ],
            "name": "name",
            "description": "Name of the user"
        }, {
            "dataType": [
                "Photo"
            ],
            "name": "ownsPhotos",
            "description": "Photos this user owns",
            "cardinality": "many"
        }
    ]
  }' \
  http://localhost:8080/v1/schema/things
```

![Graph user <-> photo](/img/blog/getting-started/graph-user-photo.jpeg)

We now have a super simple graph that looks like this:

Now let’s populate Weaviate with some data!

## Adding Data
Like creating classes, adding data can be through the RESTful API as well. For advanced users, you can use the [batching import functionality](/developers/weaviate/current/restful-api-references/batch.html){:target="_blank"} or available [Python library](https://weaviate-python-client.readthedocs.io/en/latest/weaviate.batch.html){:target="_blank"}. But for this example, we are going to add one user and two photos manually.

```bash
# Add the elephant
$ curl \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{
        "class": "Photo",
        "schema": {
            "title": "African bush elephant",
            "photoUrl": "https://upload.wikimedia.org/wikipedia/commons/b/bf/African_Elephant_%28Loxodonta_africana%29_male_%2817289351322%29.jpg"
        }
    }' \
    http://localhost:8080/v1/things
```

Make sure to save the UUID that is returned as a result (!).

```bash
# Add Brad Pitt
$ curl \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{
        "class": "Photo",
        "schema": {
            "title": "Brad Pitt at the 2019 premiere of Once Upon a Time in Hollywood",
            "photoUrl": "https://upload.wikimedia.org/wikipedia/commons/4/4c/Brad_Pitt_2019_by_Glenn_Francis.jpg"
        }
    }' \
    http://localhost:8080/v1/things
```

Make sure to also save the UUID that is returned in this result as well. We will be using them to add the two photos to the user.

```bash
# First, add the user
$ curl \
    --header "Content-Type: application/json" \
    --request POST \
    --data '{
        "class": "User",
        "schema": {
            "name": "John Doe"
        }
    }' \
    http://localhost:8080/v1/things
```

We can now add the photos to the user by setting references (Weaviate uses the term “beacon”, learn more about setting graph references in [the documentation](/developers/weaviate/current/graphql-references/index.html){:target="_blank"}). Make sure to use the UUID’s that relate to the photo’s and the user.

```bash
$ curl \
    --header "Content-Type: application/json" \
    --request PUT \
    --data '[{
        "beacon": "weaviate://localhost/things/b81e530f-f8db-41b6-910f-0469c8b7884e"
    }, {
        "beacon": "weaviate://localhost/things/127c8bcb-99bf-4c8d-94d4-f67cd2323548"
    }]' \
    http://localhost:8080/v1/things/0b70b628-377b-4b4d-85c8-89b0dacd4209/references/ownsPhotos
```

You can now validate the added data via:

```bash
$ curl http://localhost:8080/v1/things 
```
or with jq
```bash
$ curl http://localhost:8080/v1/things | jq .
```

## Query Data
Now that we have all data in, we are getting to the juicy part of Weaviate, search. Searching is done with GraphQL. 

You can learn more about the nitty-gritty details of the Weaviate GraphQL API by reading [this article](/blog/2021/01/GraphQL-API-design.html){:target="_blank"}.

But for now, we are going to keep it simple.

<!-- TODO: verify this instruction is correct -->
You can use any GraphQL client you like, but to play around with the available queries, you can use the [Weaviate Console](https://console.semi.technology/){:target="_blank"}. If you go to the Weaviate Console, fill in http://localhost:8080 as the location and click **Query Module**.

To find the photo of the elephant you can do the following:

```graphql
{
  Get{
    Things{
      Photo(
        explore: {
          concepts: ["animal"]
        }
        limit:1
      ){
        title
        photoUrl
      }
    }
  }
}
```

And to find the photo of Brad Pitt, you can search for:

```graphql
{
  Get{
    Things{
      Photo(
        explore: {
          concepts: ["actor"]
        }
        limit:1
      ){
        title
        photoUrl
      }
    }
  }
}
```

The model can even make relation for concepts, this query also finds the photo of Brad Pitt:

```graphql
{
  Get{
    Things{
      Photo(
        explore: {
          concepts: ["angelina", "jolie"]
        }
        limit:1
      ){
        title
        photoUrl
      }
    }
  }
}
```

There are many more semantic filters that you can play around with! Check out the [documentation for filters](/developers/weaviate/current/graphql-references/filters.html){:target="_blank"} and keep exploring!

## What next
Check out the [Tutorials section](/developers/weaviate/current/tutorials){:target="_blank"} to learn what else you can do with Weaviate.

You can also reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/SeMI_tech){:target="_blank"}.

Weaviate is open source, you can see the follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.