---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Perform queries
description: Getting started with querying Weaviate
tags: ['basics']
menu-order: 4
open-graph-type: article
toc: true
---

We have come a long way in a short time. So far, we have spun up a Weaviate database and then added a schema before populating the database with objects. 

Now, let's take a look at how to put the Weaviate database to work by performing queries. 

By the end of this section, you will have performed vector and scalar searches separately as well as in combination to retrieve individual objects or aggregations. 

## Prerequisites 

At this point, you should have: 
- Weaviate running on the [Weaviate Cloud Service](https://console.semi.technology)
- Installed the appropriate client library in a language of your choice
- Added a schema for the **Publication** and **Author** classes, and
- Imported **Publication** and **Author** data.

If you have not done these, go back to [set up your Weaviate instance and client library](./installation.html), [add a schema](./schema.html) and [import data](./import.html) first. It will make it easier to follow along with this section, and you will have more fun with it :).

## Vector search

A Weaviate database can be queried using one or a combination of a semantic (i.e. vector) search and a lexical (i.e. scalar) search.

First, we will start by making queries to Weaviate to retrieve **Publication** objects that we imported earlier.

> Weaviate's queries are built using GraphQL. If you're new, don't worry, we will take it step-by-step and build up from the basics. By the time you've seen a few examples, you will be familiar with the basic structure, and hopefully see why we use it :).

The function to use in retrieving objects from your Weaviate database is `Get`. If this looks familiar, that's because you have already used it! 

You should have performed a `Get` query at the end of the last section to confirm that the data import was successful. Here is the same code as a reminder.

{% include code/1.x/getting-started.import.get.html %}

Let's build on this query by adding a vector search. 

Each of the **Publication** objects that we imported earlier included vectors comprised of three dimensions. For example, *Wired* included the vector `[-0.13612957, -0.06287188, -0.066284634]`. 

So try the following code example, where our client queries Weaviate with (`[-0.14, -0.06, -0.07]`), which is a rounded version of *Wired*'s vector. It should return *Wired* as well as any other similar **Publication** objects. 

{% include code/1.x/getting-started.query.publication.nearvector.html %}

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

Congratulations, you've performed your first vector search with Weaviate! 

As we expected, the top result is *Wired* with near 1 `certainty` value. (Remember that our query vector was a truncation of *Wired*'s vector value.) Weaviate also returns two additional **Publication** objects whose `certainty` values are within our specified threshold. 

Hopefully, you can begin to see how vector searches work. The core concept is to retrieve objects based on their similarity to the query vector. 

## Filters

Vector search alone may not be sufficient, however, as it may return too many objects, or too many irrelevant results. 

For example, you may actually only be interested in **Publication** objects that are published outside of the United States, or was established after the year 2010. 

In these cases, you can use Weaviate's scalar (also known as *lexical*) search capabilities to filter results of the vector search. Try the following:

{% include code/1.x/getting-started.query.publication.where.1.html %}

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

That's quite straightforward, isn't it? And now, let's see how scalar filters can be combined with vector search functions. 

### Vector search with scalar filters

Combining a filter with a vector search is a straightforward, additive process. 

Take a look at the below example, where we start from the `nearVector` search used above and add a `where` filter to only retrieve **Publication** objects containing the string `Times`.

{% include code/1.x/getting-started.query.publication.where.2.html %}

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

Instead of the three results that you saw earlier, Weaviate now only returns one (*Financial Times*) that is within the specified vector `certainty`, and includes the search string ("Times"). Arguments set in the filter simply applies to the search in addition to the criteria set by the search vector and the certainty value. 

Now that we've seen various ways to get individual data objects, let's take a look at the `Aggregate` function before we go.

## Aggregations

As the name suggests, the `Aggregate` function can be used to show aggregated data such as on entire classes or groups of objects.  

For example, the below query will return a number of data objects in the `Publication` class:

{% include code/1.x/getting-started.query.aggregate.1.html %}

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

{% include code/1.x/getting-started.query.aggregate.2.html %}

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

<!-- ## Explore the vector space

The `Explore{}` function lets you explore the vector space within the Weaviate database. To use it, you will need to do two queries, including setting a `nearObject` or `nearVector` search parameter.

The steps are to:
1. Target candidates based on your vector search or similarity search.
2. Collect these candidates.

```graphql
{
  Explore(
    nearObject: {
      id: "fd7383f7-f2e3-3d50-a272-db9b614417cb"
      certainty: 0.95
    }
  ) {
    beacon
    className
    certainty
    distance
  }
}
```

The `Explore{}` function works very straightforwardly and only returns four properties.

1. `beacon` contains the URL _and_ the id. It's a "beacon in the vector space" - how you can target a data object.
2. `className` contains the name of the class that this data object has.
3. `certainty` is the order from the query to the data object.
4. `distance` is the distance between the query and the data object.

As you can see, the `Explore{}` can be a very useful tool for search through the complete vector space. This is especially so if you don't know the properties of the class that you're targeting.

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 Data objects without vectors and data objects with different vector lengths than the input vector length or ID are skipped.
</div> -->

## Recap

Congratulations - you've made it through our getting started guide!

We hope that this guide gave you a glimpse into Weaviate, all the way from installation to its search capabilities.

Of course, there is a lot more to Weaviate. So below, we include a few links that might help you to tailor Weaviate to meet your needs.

# More Resources

## What next?

- [Modules](./modules.html)
- [Show me how to set up the clients](../core-knowledge/clients.html)
- [More on `Get{}`](../graphql-references/get.html)
- [More on `Aggregate{}`](../graphql-references/aggregate.html)
- [More on `Explore{}`](../graphql-references/explore.html)

## How is certainty calculated?

`certainty` in Weaviate is a measure of distance from the vector to the data objects. You can also calculate the cosine similarity based on the certainty as described [here](../more-resources/faq.html#q-how-do-i-get-the-cosine-similarity-from-weaviates-certainty).

{% include docs-support-links.html %}
