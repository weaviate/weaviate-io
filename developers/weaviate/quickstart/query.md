---
title: More queries
sidebar_position: 5
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

We have come a long way in a short time. So far, we have spun up an instance of Weaviate and then added a schema before populating it with objects. 

Now, let's take a look at how to put Weaviate to work by performing queries. 

By the end of this section, you will have performed vector and scalar searches separately as well as in combination to retrieve individual objects and aggregations. 

## Prerequisites 

At this point, you should have: 
- Weaviate running on the [Weaviate Cloud Service](https://console.semi.technology)
- Installed the appropriate client library in a language of your choice
- Added a schema for the **Publication** class, and
- Imported **Publication** data.

If you have not done this, go back to [set up your Weaviate instance and client library](./installation.html), [add a schema](./schema.html) and [import data](./import.html) first. It will make it easier to follow along with this section, and you will have more fun with it 🙂.


## Vector search

Weaviate can be queried using one or a combination of a semantic (i.e. vector) search and a lexical (i.e. scalar) search.

First, we will start by making queries to Weaviate to retrieve **Publication** objects that we imported earlier.

> 💡 Note: Weaviate's queries are built using GraphQL. If this is new to you, don't worry. We will take it step-by-step and build up from the basics. Also, in many cases the GraphQL syntax is abstracted by the client.

The function to use in retrieving objects from Weaviate is `Get`. If this looks familiar, that's because you have already used it! 

You should have performed a `Get` query at the end of the last section to confirm that the data import was successful. Here is the same code as a reminder:

import CodeImportGet from '/_includes/code/getting.started.import.get.mdx';

<CodeImportGet />

Let's build on this query by adding a vector search. 

Each of the **Publication** objects that we imported earlier included vectors comprised of three dimensions. For example, *Wired* included the vector `[-0.13612957, -0.06287188, -0.066284634]`. 

So try the following code example, where our client queries Weaviate with a rounded version of *Wired*'s vector (i.e. `[-0.14, -0.06, -0.07]`). It should return *Wired* as well as any other similar **Publication** objects. 

import CodeQueryPubsNearVec from '/_includes/code/getting.started.query.publication.nearvector.mdx';

<CodeQueryPubsNearVec />

You will see that we have added a `nearVector` argument in the query, specifying the `vector` to search for as well as a similarity threshold in the form of `certainty`.

We also ask Weaviate to return `_additional` properties for the returned **Publication** objects. Specifically, we request the `vector` of each returned object as well as the actual `certainty` value, so we can verify how close each object is to our query vector. 

Try it out, and you should see a response like this:

```json
{
    "data": {
        "Get": {
            "Publication": [
                {
                    "_additional": {
                        "certainty": 0.999786764383316,
                        "vector": [
                            -0.13612957,
                            -0.06287188,
                            -0.066284634
                        ]
                    },
                    "name": "Wired"
                },
                {
                    "_additional": {
                        "certainty": 0.8802319169044495,
                        "vector": [
                            -0.16187595,
                            0.06548311,
                            -0.09078615
                        ]
                    },
                    "name": "Financial Times"
                },
                {
                    "_additional": {
                        "certainty": 0.8756085336208344,
                        "vector": [
                            -0.080069505,
                            -0.1065043,
                            0.010922157
                        ]
                    },
                    "name": "CNN"
                }
            ]
        }
    }
}
```

And now you've performed your first vector search with Weaviate. :) 

As we expected, the top result is *Wired* with near-maximum (i.e. 1) `certainty` value. (Remember that our query vector was a truncation of *Wired*'s vector value.) Weaviate also returns two additional **Publication** objects whose `certainty` values are within our specified threshold. 

Hopefully, you can begin to see how vector search works. The core concept is to retrieve objects based on their similarity to the query vector. 

## Filters

As useful as it is, sometimes vector search alone may not be sufficient. For example, you may actually only be interested in **Publication** objects similar to *Wired* that are published outside of the United States, or was established after the year 2010. 

In these cases, you can use Weaviate's scalar filtering capabilities - either alone, or in combination with the vector search. 

Try the following:

import CodeQueryWhere1 from '/_includes/code/getting.started.query.where.1.mdx';

<CodeQueryWhere1 />

This query asks Weaviate for **Publication** objects whose names contain the string `New York*`. You should see a result like this:

```json
{
    "data": {
        "Get": {
            "Publication": [
                {
                    "name": "The New York Times Company"
                },
                {
                    "name": "International New York Times"
                },
                {
                    "name": "New York Times"
                },
                {
                    "name": "New Yorker"
                }
            ]
        }
    }
}
```

> Notice here that even though the wildcard (*) was only appended to the end of "New York", it still found names that does not begin with "New York". So why use the wildcard, you ask? Without it, the publication _New Yorker_ would not have been returned. Try it out!

Now that you've seen a scalar filter, let's see how it can be combined with vector search functions. 

### Vector search with scalar filters

Combining a filter with a vector search is an additive process. Let us show you what we mean by that.

Take a look at the below example, where we start from the `nearVector` search used above and add a `where` filter to only retrieve **Publication** objects containing the string `Times`.

import CodeQueryWhere2 from '/_includes/code/getting.started.query.where.2.mdx';

<CodeQueryWhere2 />

Running this code should result in the below:

```json
{
    "data": {
        "Get": {
            "Publication": [
                {
                    "_additional": {
                        "certainty": 0.8802319169044495,
                        "vector": [
                            -0.16187595,
                            0.06548311,
                            -0.09078615
                        ]
                    },
                    "name": "Financial Times"
                }
            ]
        }
    }
}
```

Instead of the three objects that you saw earlier, Weaviate now only returns one (*Financial Times*) object that is within the specified vector `certainty`, *and* includes the search string ("Times"). 

In other words, the restrictions imposed by the filter simply applies in addition to the criteria set by the search vector and the certainty value. 

Now that we've seen various ways to get individual data objects, let's take a look at the `Aggregate` function before we go.

## Aggregations

As the name suggests, the `Aggregate` function can be used to show aggregated data such as on entire classes or groups of objects.  

For example, the below query will return the number of data objects in the `Publication` class:

import CodeQueryAggregate1 from '/_includes/code/getting.started.query.aggregate.1.mdx';

<CodeQueryAggregate1 />

Like so:
```json
{
    "data": {
        "Aggregate": {
            "Publication": [
                {
                    "meta": {
                        "count": 13
                    }
                }
            ]
        }
    }
}
```

And you can also use the `Aggregate` function with filters, just as you saw with the `Get` function earlier. The below query for example will return the number of **Publication** objects containing the word "New York*".

import CodeQueryAggregate2 from '/_includes/code/getting.started.query.aggregate.2.mdx';

<CodeQueryAggregate2 />

And as you saw above, there are four objects that match the query filter.

```json
{
    "data": {
        "Aggregate": {
            "Publication": [
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
