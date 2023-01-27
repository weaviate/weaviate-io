---
title: More queries
sidebar_position: 5
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

Now let's take a little more time to talk about different queries that you can perform with Weaviate. Here, we will expand on the `nearText` queries that you performed earlier to show you different query types, filters and metrics that can be used.

By the end of this section, you will have performed vector and scalar searches separately as well as in combination to retrieve individual objects and aggregations. 

## Prerequisites 

At this point, you should have: 
- An instance of Weaviate running (e.g. on the [Weaviate Cloud Service](https://console.weaviate.io)),
- An API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face,
- Installed your preferred Weaviate client library,
- Set up a `Question` class in your schema, and
- Imported the `jeopardy_tiny.json` data.

:::note GraphQL
Weaviate's queries are built using GraphQL. If this is new to you, don't worry. We will take it step-by-step and build up from the basics. Also, in many cases the GraphQL syntax is abstracted by the client.
:::

## Vector search

You can query Weaviate using one or a combination of a semantic (i.e. vector) search and a lexical (i.e. scalar) search. As you've seen, a vector search allows for similarity-based searches, while scalar searches allow filtering by exact matches. 

### Object retrieval with `Get`

First, we will start by making queries to Weaviate to retrieve **Question** objects that we imported earlier.

The Weaviate function for retrieving objects is `Get`. If this looks familiar, that's because you have already used it! You should have performed a `Get` query at the end of the last section to confirm that the data import was successful. Here is the same code as a reminder:

import CodeImportGet from '/_includes/code/getting.started.import.get.mdx';

<CodeImportGet />

Let's build on this query by adding a vector search. 

### `Get` with `nearText`

This is a vector search using a `Get` query. 

import CodeAutoschemaNeartext from '/_includes/code/getting.started.autoschema.neartext.mdx'

<CodeAutoschemaNeartext />

This might also look familiar, as it was used in an [earlier section](./autoschema.md). But let's break it down a little.

Here, we are using a `nearText` parameter. What we are doing is to provide Weaviate with a query `concept` of `famous scientist`. Weaviate then converts this into a vector through the inference API (OpenAI in this particular example), and uses that vector as the basis for a vector search.

Additionally, we use the `limit` argument to only fetch a maximum of two (2) objects. 

If you run this query, you should see the entries on *"Albert Einstein"* and *"hot air balloons"* returned by Weaviate.

### `Get` with `nearVector`

In some cases you might wish to input a vector directly as a search query. For example, you might be running Weaviate with a custom, external vectorizer. In such a case, you can use the `nearVector` parameter to provide the query vector to Weaviate.

For example, here is an example Python code obtaining an OpenAI embedding manually and providing it through the `nearVector` parameter:

```python
import openai

openai.api_key = api_tkn
model="text-embedding-ada-002"
oai_resp = openai.Embedding.create(input = ["famous scientist"], model=model)
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

You might also have noticed that we have added a `certainty` argument in the `with_near_vector` method. This lets you specify a similarity threshold for objects, and can be very useful for ensuring that no distant objects are returned.

## Additional properties

We can ask Weaviate to return `_additional` properties for any returned objects. This allows us to obtain properties such as the `vector` of each returned object as well as the actual `certainty` value, so we can verify how close each object is to our query vector. 

import CodeQueryNeartextAdditional from '/_includes/code/getting.started.query.neartext.additional.mdx'

<CodeQueryNeartextAdditional />

Try it out, and you should see a response like this:

```json
{
    "data": {
        "Get": {
            "Question": [
                {
                    "_additional": {
                        "certainty": 0.8984273970127106,
                        "vector": [...],
                    },
                    "answer": "Albert Einstein",
                    "question": "His 1905 paper \"On the Electrodynamics of Moving Bodies\" contained his special Theory of Relativity"
                },
                {
                    "_additional": {
                        "certainty": 0.8881804645061493,
                        "vector": [...],
                    },
                    "answer": "hot air balloons",
                    "question": "These in the skies of Albuquerque on October 3, 1999 were a fine example of Charles' Law in action"
                }
            ]
        }
    }
}
```

We encourage you to try out different queries and see how that changes the results and distances, not only with this dataset but also with different datasets, and/or vectorizers.

## Filters

As useful as it is, sometimes vector search alone may not be sufficient. For example, you may actually only be interested in **Question** objects in a particular category, for instance. 

In these cases, you can use Weaviate's scalar filtering capabilities - either alone, or in combination with the vector search. 

Try the following:

:::warning todo
TODO - Code
:::

This query asks Weaviate for **Question** objects whose category contains the string `HISTORY`. You should see a result like this:

:::warning todo
TODO - add results
:::

Now that you've seen a scalar filter, let's see how it can be combined with vector search functions. 

### Vector search with scalar filters

Combining a filter with a vector search is an additive process. Let us show you what we mean by that.

:::warning todo
TODO - Code
:::

This query asks Weaviate for **Question** objects whose category contains the string `HISTORY`. You should see a result like this:

:::warning todo
TODO - add results
:::

## Aggregations

As the name suggests, the `Aggregate` function can be used to show aggregated data such as on entire classes or groups of objects.  

For example, the below query will return the number of data objects in the `Question` class:

:::warning todo
TODO - Code
:::

And you can also use the `Aggregate` function with filters, just as you saw with the `Get` function earlier. The below query for example will return the number of **Question** objects containing the word "xx".

:::warning todo
TODO - Code
:::

And as you saw above, there are four objects that match the query filter.

:::warning todo
TODO - update results
:::

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

Hopefully the logic of that makes sense. Weaviate has identified the same objects as before; and instead of returning the individual objects you are seeing the requested aggregated statistic (count) here.

## Recap

Congratulations - you've made it through our getting started guide! We hope that this guide was a useful introduction to Weaviate, all the way from installation to performing queries.

Of course, there is a lot more to Weaviate that we have not yet covered, and probably a lot that you wish to know about. So we include a few links below that might help you to get started in your journey with us. 

Also, please feel free to reach out to us on our community [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw). We love to hear from our users. 

See you soon!

## What next?

- [Introduction to modules](./modules.md)
- [Installation options](../installation/index.md)
- [Roadmap](../roadmap/index.md)
- [Learn more about Weaviate](../concepts/index.md)

## Notes

### How is certainty calculated?

`certainty` in Weaviate is a measure of distance from the vector to the data objects. You can also calculate the cosine similarity based on the certainty as described [here](../more-resources/faq.html#q-how-do-i-get-the-cosine-similarity-from-weaviates-certainty).


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
