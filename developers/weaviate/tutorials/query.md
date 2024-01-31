---
title: Queries in detail
sidebar_position: 50
image: og/docs/tutorials.jpg
# tags: ['basics']
---


## Overview

In this section, we will explore different queries that you can perform with Weaviate. Here, we will expand on the `nearText` queries that you may have seen in the [Quickstart tutorial](../quickstart/index.md) to show you different query types, filters and metrics that can be used.

By the end of this section, you will have performed vector and scalar searches separately as well as in combination to retrieve individual objects and aggregations.

## Prerequisites

We recommend you complete the [Quickstart tutorial](../quickstart/index.md) first.

Before you start this tutorial, you should follow the steps in the Quickstart to have:

- An instance of Weaviate running (e.g. on the [Weaviate Cloud Services](https://console.weaviate.cloud)),
- An API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face,
- Installed your preferred Weaviate client library,
- Set up a `Question` class in your schema, and
- Imported the `jeopardy_tiny.json` data.

## Object retrieval with `Get`

:::tip GraphQL
Weaviate's queries are built using GraphQL. If this is new to you, don't worry. We will take it step-by-step and build up from the basics. Also, in many cases, the GraphQL syntax is abstracted by the client.

You can query Weaviate using one or a combination of a semantic (i.e. vector) search and a lexical (i.e. scalar) search. As you've seen, a vector search allows for similarity-based searches, while scalar searches allow filtering by exact matches.
:::

First, we will start by making queries to Weaviate to retrieve **Question** objects that we imported earlier.

The Weaviate function for retrieving objects is `Get`.

This might be familiar for some of you. If you have completed our [Imports in detail tutorial](./import.md), you may have performed a `Get` query to confirm that the data import was successful. Here is the same code as a reminder:

import CodeImportGet from '/_includes/code/quickstart.import.get.mdx';

<CodeImportGet />

This query simply asks Weaviate for *some* objects of this (`Question`) class.

Of course, in most cases we would want to retrieve information on some criteria. Let's build on this query by adding a vector search.

### `Get` with `nearText`

This is a vector search using a `Get` query.

import CodeAutoschemaNeartext from '/_includes/code/quickstart/neartext.mdx'

<CodeAutoschemaNeartext />

This might also look familiar, as it was used in the [Quickstart tutorial](../quickstart/index.md). But let's break it down a little.

Here, we are using a `nearText` operator. What we are doing is to provide Weaviate with a query `concept` of `biology`. Weaviate then converts this into a vector through the inference API (OpenAI in this particular example) and uses that vector as the basis for a vector search.

Also note here that we pass the API key in the header. This is required as the inference API is used to vectorize the input query.

Additionally, we use the `limit` argument to only fetch a maximum of two (2) objects.

If you run this query, you should see the entries on *"DNA"* and *"species"* returned by Weaviate.

### `Get` with `nearVector`

In some cases, you might wish to input a vector directly as a search query. For example, you might be running Weaviate with a custom, external vectorizer. In such a case, you can use the `nearVector` operator to provide the query vector to Weaviate.

For example, here is an example Python code obtaining an OpenAI embedding manually and providing it through the `nearVector` operator:

```python
import openai

openai.api_key = "YOUR-OPENAI-API-KEY"
model="text-embedding-ada-002"
oai_resp = openai.Embedding.create(input = ["biology"], model=model)

oai_embedding = oai_resp['data'][0]['embedding']

result = (
    client.query
    .get("Question", ["question", "answer"])
    .with_near_vector({
        "vector": oai_embedding,
        "certainty": 0.7
    })
    .with_limit(2)
    .do()
)

print(json.dumps(result, indent=4))
```

And it should return the same results as above.

Note that we used the same OpenAI embedding model (`text-embedding-ada-002`) here so that the vectors are in the same vector "space".

You might also have noticed that we have added a `certainty` argument in the `with_near_vector` method. This lets you specify a similarity threshold for objects, and can be very useful for ensuring that no distant objects are returned.

## Additional properties

We can ask Weaviate to return `_additional` properties for any returned objects. This allows us to obtain properties such as the `vector` of each returned object as well as the actual `certainty` value, so we can verify how close each object is to our query vector. Here is a query that will return the `certainty` value:

import CodeQueryNeartextAdditional from '/_includes/code/quickstart.query.neartext.additional.mdx'

<CodeQueryNeartextAdditional />

Try it out, and you should see a response like this:

```json
{
    "data": {
        "Get": {
            "Question": [
                {
                    "_additional": {
                        "certainty": 0.9030631184577942
                    },
                    "answer": "DNA",
                    "category": "SCIENCE",
                    "question": "In 1953 Watson & Crick built a model of the molecular structure of this, the gene-carrying substance"
                },
                {
                    "_additional": {
                        "certainty": 0.900638073682785
                    },
                    "answer": "species",
                    "category": "SCIENCE",
                    "question": "2000 news: the Gunnison sage grouse isn't just another northern sage grouse, but a new one of this classification"
                }
            ]
        }
    }
}
```

You can try modifying this query to see if you retrieve the vector (note - it will be a looooong response 😉).

We encourage you to also try out different queries and see how that changes the results and distances not only with this dataset but also with different datasets, and/or vectorizers.

## Filters

As useful as it is, sometimes vector search alone may not be sufficient. For example, you may actually only be interested in **Question** objects in a particular category, for instance.

In these cases, you can use Weaviate's scalar filtering capabilities - either alone, or in combination with the vector search.

Try the following:

import CodeQueryWhere1 from '/_includes/code/quickstart.query.where.1.mdx'

<CodeQueryWhere1 />

This query asks Weaviate for **Question** objects whose category contains the string `ANIMALS`. You should see a result like this:

```json
{
    "data": {
        "Get": {
            "Question": [
                {
                    "answer": "the diamondback rattler",
                    "category": "ANIMALS",
                    "question": "Heaviest of all poisonous snakes is this North American rattlesnake"
                },
                {
                    "answer": "Elephant",
                    "category": "ANIMALS",
                    "question": "It's the only living mammal in the order Proboseidea"
                },
                {
                    "answer": "the nose or snout",
                    "category": "ANIMALS",
                    "question": "The gavial looks very much like a crocodile except for this bodily feature"
                },
                {
                    "answer": "Antelope",
                    "category": "ANIMALS",
                    "question": "Weighing around a ton, the eland is the largest species of this animal in Africa"
                }
            ]
        }
    }
}
```

Now that you've seen a scalar filter, let's see how it can be combined with vector search functions.

### Vector search with scalar filters

Combining a filter with a vector search is an additive process. Let us show you what we mean by that.

import CodeQueryWhere2 from '/_includes/code/quickstart.query.where.2.mdx'

<CodeQueryWhere2 />

This query asks Weaviate for **Question** objects that are closest to "biology", but within the category of `ANIMALS`. You should see a result like this:

```json
{
    "data": {
        "Get": {
            "Question": [
                {
                    "_additional": {
                        "certainty": 0.8918434679508209
                    },
                    "answer": "the nose or snout",
                    "category": "ANIMALS",
                    "question": "The gavial looks very much like a crocodile except for this bodily feature"
                },
                {
                    "_additional": {
                        "certainty": 0.8867587149143219
                    },
                    "answer": "Elephant",
                    "category": "ANIMALS",
                    "question": "It's the only living mammal in the order Proboseidea"
                }
            ]
        }
    }
}
```

Note that the results are confined to the choices from the 'animals' category. Note that these results, while not being cutting-edge science, are biological factoids.

## Metadata with `Aggregate`

As the name suggests, the `Aggregate` function can be used to show aggregated data such as on entire classes or groups of objects.

For example, the following query will return the number of data objects in the `Question` class:

import CodeQueryAggregate1 from '/_includes/code/quickstart.query.aggregate.1.mdx'

<CodeQueryAggregate1 />

And you can also use the `Aggregate` function with filters, just as you saw with the `Get` function above. For example, this query will return the number of **Question** objects with the category "ANIMALS".

import CodeQueryAggregate2 from '/_includes/code/quickstart.query.aggregate.2.mdx'

<CodeQueryAggregate2 />

And as you saw above, there are four objects that match the query filter.

```json
{
    "data": {
        "Aggregate": {
            "Question": [
                {
                    "meta": {
                        "count": 4
                    }
                }
            ]
        }
    }
}
```

Here, Weaviate has identified the same objects that you saw earlier in the similar `Get` queries. The difference is that instead of returning the individual objects you are seeing the requested aggregated statistic (count) here.

As you can see, the `Aggregate` function can return handy aggregated, or metadata, information from the Weaviate database.

## Recap

* `Get` queries are used for retrieving data objects.
* `Aggregate` queries can be used to retrieve metadata, or aggregated data.
* Operators such as `nearText` or `nearVector` can be used for vector queries.
* Scalar filters can be used for exact filtering, taking advantage of inverted indexes.
* Vector and scalar filters can be combined, and are available on both `Get` and `Aggregate` queries

## Suggested reading

- [Tutorial: Schemas in detail](../starter-guides/schema.md)
- [Tutorial: Import in detail](./import.md)
- [Tutorial: Introduction to modules](./modules.md)
- [Tutorial: Introduction to Weaviate Console](../../wcs/guides/console.mdx)

## Notes

### How is certainty calculated?

`certainty` in Weaviate is a measure of distance from the vector to the data objects. You can also calculate the cosine similarity based on the certainty as described [here](../more-resources/faq.md#q-how-do-i-get-the-cosine-similarity-from-weaviates-certainty?).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
