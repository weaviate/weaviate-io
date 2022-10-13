---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Query
description: Getting started with querying Weaviate
tags: ['basics']
menu-order: 4
open-graph-type: article
toc: true
---

We have come a long way in a short time, having spun up a database and populated it with objects. Now let's put the Weaviate database to work by querying all of that data.

## Prerequisites 

At this point, you should have: 
- Weaviate running either in a sandbox on the [Weaviate Cloud Service](https://console.semi.technology) or locally with Docker
- Installed the appropriate client library in a language of your choice
- Added a schema for the **Publication** and **Author** classes, and
- Imported **Publication** and **Author** data.

If you have not done these, go back to [set up your Weaviate instance and client library](./installation.html), [add a schema](./schema.html) and [import data](./import.html) first. It will make it easier to follow along with this section :).

## Querying Weaviate

You can query a Weaviate database with a semantic (i.e. vector) search, with a scalar search, or with a combination of both. 

All of this happens at lightning fast 🚀 speeds. let's start with a few examples.

### Vector search

First off, we will start easy by querying Weaviate about the **Publication** objects that we imported earlier.

> Weaviate's queries use GraphQL syntax. If you're new, don't worry, we will take it step-by-step and build up from the basics. By the time you've seen a few examples, you will be familiar with the basic structure, and hopefully see why we use it :).

To retrieve objects, you will often be using the `Get{}` function. Try out the below code to connect to your Weaviate instance and retrieve a few **Publication** objects.

{% include code/1.x/getting-started.query.publication.basic.html %}

You should then see a result that resembles this:

```json
{
    "data": {
        "Get": {
            "Publication": [
                {
                    "name": "Fox News"
                },
                {
                    "name": "Wired"
                },
                {
                    "name": "The New York Times Company"
                },
                {
                    "name": "Game Informer"
                },
                {
                    "name": "New Yorker"
                },
                {
                    "name": "Wall Street Journal"
                },
                {
                    "name": "New York Times"
                },
                {
                    "name": "Vogue"
                },
                {
                    "name": "The Economist"
                },
                {
                    "name": "International New York Times"
                },
                {
                    "name": "Financial Times"
                },
                {
                    "name": "The Guardian"
                },
                {
                    "name": "CNN"
                }
            ]
        }
    }
}
```



Each of the **Publication** objects that we imported included simple vectors. To begin with, let's query Weaviate to get those objects back, as well as see what vector informati

## Root GraphQL functions

Weaviate's GraphQL-API has three root functions:

* `Get{}` to retrieve data based on the schema.
* `Aggregate{}` to retrieve meta information (e.g., the number of data objects in a class).
* `Explore{}` to explore the complete vector space without using the schema.

```graphql
{
  Get {
    # etc...
  }
}
```

```graphql
{
  Aggregate {
    # etc...
  }
}
```

```graphql
{
  Explore {
    # etc...
  }
}
```

> 💡 A more detailed explanation of Weaviate's GraphQL design is available [here](../graphql-references/#query-structure).

## Get{}

In the basics getting started guide, you've learned [how Weaviate uses a class-property structure](../core-knowledge/basics.html#data-objects-in-weaviate) and in the schema getting started guide you've learned [how you can define the class-property structure](./schema.html#create-your-first-class).

Our demo dataset has two classes: `Article` and `Paragraph`. The `Article` class has the properties: `title` of the data type `string`, `hasParagraphs` of the data type `Paragraph`, and `linksToArticles` of the data type `Article`. The `Paragraph` class has the properties: `title` of the data type `string`, `content` of the data type `text`, `order` of the data type `int`, and `inArticle` of the data type `Article`. You can also inspect the schem of the demo dataset in JSON format [here](http://semantic-search-wikipedia-with-weaviate.api.vectors.network:8080/v1/schema).

If we now want to `Get{}` all (well, "all", in this case, "all" means limited to the default limit, more about this later) `Paragraph`s without cross-references we can run the following query:

```graphql
{
  Get {
    Paragraph {
      content
      order
      title
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3bwNLcX)

Or we can set a cross reference like this:

```graphql
{
  Get {
    Paragraph {
      content
      order
      title
      inArticle { # <= cross reference 
        ... on Article {
          title
        }
      }
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3BFeJtD)

Let's break down what's happening in this section:

```graphql
inArticle {
  ... on Article {
    title
  }
}
```

* `inArticle` is the name of the property with the cross-reference to `Paragraph`.
* `... on Article` is set because we can have a single property cross reference to _multiple_ classes (did you notice that the cross-reference is set inside an array?). In this specific dataset, we only reference to `Article` but this could be more than one class.
* `title` is a property of `Article`. Because we told GraphQL that we are going to query over the cross-reference `Article`, it knows that the properties of `Article` should be the available options.

You might remember that the `Article` class also has a cross-reference back to `Paragraph`. So, the following query is valid:

```graphql
{
  Get {
    Paragraph {
      content
      order
      title
      inArticle {
        ... on Article {
          title
          hasParagraphs {
            ... on Paragraph {
              title
              order
            }
          }
        }
      }
    } 
  }
}
```

The GraphQL-API has additional properties that can be retrieved with `_additional{}`. Some modules extend the  `_additional{}` property too, more about this later.

An example with basic `_additional{}` properties:

```graphql
{
  Get {
    Paragraph {
      content
      title
      _additional {
        id # <= the UUID of the data object
        vector # <= the vector (if any) of the object
        creationTimeUnix # <= the creating time as unix timestamp
        lastUpdateTimeUnix # <= the latest update as unix timestamp
      }
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3vEV5dD)

## Get{} with filters

This is where the fun _really_ begins! In Weaviate we set arguments on the level of the class names between brackets.

Let's start with the simplest filter we have, the `limit` filter to, as you might have guessed, limit the number of results to a given number.

```graphql
{
  Get {
    Paragraph(
      limit: 3
    ) {
      content
      title
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3QaGgra)

Weaviate also allows you to paginate over the results:

```graphql
{
  Get {
    Paragraph(
      limit: 3
      offset: 3
    ) {
      content
      title
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3Jr4f2W)

You can also use the filters to query for specific vectors! Simply like this:

```graphql
{
  Get {
    Paragraph(
      nearVector: {
        certainty: 0.95
        vector: [
              -0.14980282,
              -0.18726847,
              -0.20329526,
              -0.043953326,
              -0.19468129,
              0.11055227,
              0.007254174,
              -0.029894903,
              0.048155054,
              -0.46107215,
              -0.16498488,
              -0.10736917,
              -0.1347416,
              -0.24506035,
              0.2512679,
              -0.3228129,
              0.5509893,
              0.30507785,
              -0.0086679775,
              -0.19478683,
              -0.082260504,
              -0.1622943,
              -0.05211606,
              0.20393205,
              0.41007614,
              0.18013495,
              0.21514347,
              0.037354454,
              0.008426087,
              0.027741792,
              -0.028284546,
              0.32931307,
              0.26058617,
              -0.17261237,
              -0.099292636,
              -0.048430376,
              0.06521822,
              -0.2548142,
              0.09468739,
              0.1593366,
              -0.18645632,
              0.13544174,
              -0.003946889,
              0.03503171,
              0.20215666,
              -0.10794079,
              -0.16927052,
              0.11131118,
              -0.003403063,
              0.15661347,
              -0.3377759,
              0.0134976255,
              -0.032635614,
              -0.0140412785,
              0.15691975,
              -0.060188044,
              0.037047677,
              0.016596567,
              -0.10985446,
              0.31222874,
              -0.008500058,
              -0.08440145,
              0.16315535,
              0.048069287,
              0.022796525,
              -0.108635366,
              -0.20999205,
              0.2393603,
              -0.20284003,
              0.19891346,
              0.056406114,
              -0.19059569,
              0.22338767,
              0.0674438,
              -0.037211984,
              -0.24545333,
              0.116147116,
              -0.29178613,
              -0.35563782,
              0.106854804,
              0.022694457,
              0.036734067,
              -0.17487253,
              0.06563094,
              0.08073178,
              0.09041889,
              -0.12643489,
              0.049184855,
              0.08763955,
              0.30914673,
              0.20083538,
              0.23562174,
              0.24660777,
              -0.0003716573,
              0.07358463,
              0.087099835,
              -0.25095388,
              -0.11846265,
              0.042521056,
              -0.035834707,
              0.046809107,
              -0.19105731,
              0.2753433,
              -0.1673547,
              0.06764348,
              0.024218164,
              -0.050132595,
              0.15602985,
              0.107635945,
              -0.16615474,
              -0.19079025,
              0.037633877,
              -0.1743948,
              -0.27693248,
              -0.27208972,
              -0.16113952,
              0.31422436,
              -0.22496605,
              0.0381498,
              0.04703603,
              -0.012323951,
              -0.059115984,
              0.08683914,
              0.1795862,
              -0.0736451,
              0.085327506,
              -0.5147787,
              0.05158487,
              -0.24007456,
              -0.19218495,
              0.3580782,
              0.05143577,
              0.21511322,
              -0.015059551,
              -0.11278941,
              -0.07344471,
              -0.018852502,
              -0.011692386,
              -0.1298213,
              0.011246204,
              -0.29981065,
              0.1423013,
              0.42434323,
              -0.14071508,
              0.12039238,
              -0.0025573336,
              0.18730274,
              0.08391527,
              -0.11098596,
              -0.0407951,
              0.07252352,
              0.008840026,
              -0.0224724,
              0.16327831,
              0.0921402,
              -0.093174234,
              -0.3930861,
              -0.0034301435,
              0.19483474,
              -0.0755815,
              -0.18193111,
              -0.0076694456,
              -0.20961416,
              0.05760108,
              -0.3216694,
              -0.073487714,
              -0.30427748,
              0.3564976,
              0.13649514,
              0.09342879,
              -0.026440881,
              0.19943202,
              0.031343885,
              -0.014930193,
              -0.40651017,
              0.35351706,
              -0.087741725,
              -0.1471495,
              0.13602264,
              -0.00012230128,
              0.14843026,
              0.27994528,
              0.011030756,
              0.18731186,
              0.14572978,
              0.05426839,
              -0.0040927893,
              -0.09109015,
              -0.1343175,
              0.19398153,
              -0.025134483,
              0.03637004,
              -0.1444569,
              0.35350305,
              -0.07174942,
              0.21385877,
              0.10750589,
              -0.08715553,
              -0.03371772,
              -0.05662036,
              -0.010593241,
              0.08073352,
              0.15757051,
              -0.079284415,
              0.11012203,
              -0.18191606,
              0.180747,
              0.017115407,
              0.04124124,
              -0.053916473,
              -0.15589465,
              0.080987826,
              -0.36166018,
              0.69281644,
              0.12636755,
              0.23144709,
              0.5266289,
              0.28756046,
              -0.17288941,
              -0.27496046,
              0.29060382,
              -0.18899275,
              -0.22948712,
              -0.16815257,
              0.00058293715,
              -0.22678284,
              -0.026520688,
              0.07723698,
              -0.13086131,
              -0.30830926,
              -0.25926143,
              -0.18110594,
              0.08312367,
              -0.06141586,
              -0.1308071,
              -0.21425028,
              0.19009885,
              -0.18052778,
              -0.21071686,
              0.44333926,
              -0.12132406,
              0.2797659,
              0.10363567,
              -0.1749493,
              -0.43677217,
              -0.1799913,
              0.15560381,
              0.28121427,
              -0.15512623,
              0.050924256,
              -0.3226295,
              0.07605113,
              -0.15436444,
              -0.10861575,
              -0.24028188,
              -0.36120164,
              0.029309638,
              -0.26847067,
              -0.15969312,
              0.25558364,
              0.018011166,
              -0.2518256,
              -0.029783178,
              0.28797564,
              -0.4448833,
              0.12542401,
              0.014201082,
              0.4476718,
              0.06971811,
              0.25595802,
              -0.17370005,
              -0.09343746,
              -0.1850988,
              -0.23950486,
              0.15103586,
              -0.21289064,
              -0.051336296,
              -0.102323845,
              -0.19939336,
              0.06995547,
              -0.04257245,
              -0.0844856,
              -0.2753083,
              0.22262327,
              0.16206002,
              0.08803928,
              0.14682183,
              -0.07546604,
              0.3635702,
              -0.07885746,
              -0.02404508,
              -0.05581413,
              0.08871913,
              0.11013715,
              0.123172775,
              0.1997756,
              0.03815852,
              0.40536904,
              -0.21865457,
              0.08180304,
              -0.18886,
              0.13293564,
              0.06780745,
              0.07133015,
              -0.053034637,
              -0.2558228,
              -0.19981453,
              0.26720798,
              0.011477703,
              -0.15269034,
              -0.13711438,
              0.13333775,
              0.21275032,
              0.28737843,
              0.08919694,
              0.2813906,
              0.020722296,
              0.3116303,
              0.3423664,
              -0.01156131,
              0.15438467,
              -0.3864141,
              -0.19235355,
              0.13155502,
              -0.21601298,
              -0.1597267,
              -0.07556505,
              -0.14806516,
              0.14088392,
              -0.13127524,
              -0.1619862,
              0.60637075,
              -0.109684885,
              0.040000454,
              -0.42372608,
              0.07823862,
              0.41524285,
              0.07363251,
              -0.021954425,
              0.14099085,
              0.07696917,
              0.1870454,
              0.08288802,
              -0.24031629,
              -0.14831938,
              -0.39198646,
              -0.015319684,
              0.3175274,
              0.04542637,
              -0.18344292,
              -0.18399335,
              -0.029334296,
              -0.014752361,
              -0.2703165,
              0.12580976,
              0.057291254,
              -0.42021954,
              -0.28569424,
              -0.027988194,
              -0.24762106,
              -0.23053372,
              -0.386122,
              -0.17031838,
              -0.102018714,
              -0.039024044,
              -0.08150898,
              -0.18984579,
              0.32495493,
              0.18910348,
              0.18668482,
              0.042812567,
              0.22286823,
              0.16841081,
              0.1149984,
              -0.07206769,
              0.14510418,
              0.32998514,
              0.39065963,
              0.5123626,
              0.10172932,
              0.02106845,
              -0.028092828,
              0.41721362,
              -0.09374439
            ]
      }
    ) {
      content
      title
      _additional {
        certainty
      }
    } 
  }
}
```

Did you see `certainty`? This is the distance from the vector to the data objects. You can also calculate the cosine similarity if you like based on the certainty, more about this [here](../more-resources/faq.html#q-how-do-i-get-the-cosine-similarity-from-weaviates-certainty).

You can also do the​ equivalent but based on the UUID of any object in the same vector space (the same, because we match based on vector length. But if you use the same model to vectorize in different classes you can also mix them).​

```graphql
{
  Get {
    Paragraph(
      nearObject: {
        id: "fd7383f7-f2e3-3d50-a272-db9b614417cb"
      }
      limit: 5
    ) {
      content
      title
      _additional {
        certainty
      }
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3BIQkU2)

​Traditional inverted index filtering is also possible. In Weaviate we call this the `where` filter.

The `where` filter takes three operands of its own:

1. `path` is the graph path in your schema.
2. `operator` is set to define what you want to do with the value inside the path (e.g., `Equal` or `GreaterThan`, etc. See the list [here](../graphql-references/filters.html#filter-structure)).
3. `value*` is set based on the type of the property defined in `path`. So, if the property in `path` is an `int`, this becomes `valueInt`, if it's a `string` it becomes `valueString`. The value itself is whatever you want to filter on.

​The examples below are a bit more explanatory.

​Let's filter for "Italian cuisine" in the `title` of the `Paragraph`.

```graphql
{
  Get {
    Paragraph(
      where: {
        path: ["title"]
        operator: Equal
        valueString: "Italian cuisine"
      }
      limit: 10
    ) {
      title
      order
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3braebp)

Or for `Paragraph`s where the order is higher than `5`.

```graphql
{
  Get {
    Paragraph(
      where: {
        path: ["order"]
        operator: GreaterThan
        valueInt: 5
      }
      limit: 10
    ) {
      title
      order
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3OWJ9KU)

Or by combining them setting muliple opperands:

```graphql
{
  Get {
    Paragraph(
      where: {
        operator: And # <= We can have And, Or, etc.
        operands: [{
            path: ["title"]
            operator: Equal
            valueString: "Italian cuisine"
          },{
            path: ["order"]
            operator: GreaterThan
            valueInt: 5
        }]
      }
      limit: 5
    ) {
      title
      order
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3bqm0D9)

The path is an array, so this means you can also set the filter specifically for a cross reference:

```graphql
{
  Get {
    Paragraph(
      where: {
        path: ["inArticle", "Article", "title"]
        operator: Equal
        valueString: "Francesco Bellissimo"
      }
      limit: 25
    ) {
      content
      inArticle {
        ... on Article {
          title
        }
      }
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3Qi0PBT)

And yes, you can combine vector search with where filters.

```graphql
{
  Get {
    Paragraph(
      nearObject: { # <= vector search
        id: "fd7383f7-f2e3-3d50-a272-db9b614417cb"
      }
      where: { # <= where filter
        path: ["inArticle", "Article", "title"]
        operator: Equal
        valueString: "Francesco Bellissimo"
      }
      limit: 25
    ) {
      content
      inArticle {
        ... on Article {
          title
        }
      }
      _additional {
        certainty
      }
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3QgJPfo)

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 We call Weaviate "vector first". This means that when combining vector search with a where filter, the where-filter will create an allowed-list that skips entries that are not allowed in the ANN index.
</div>

If you use Weaviate with modules (the current Wikipedia demo dataset uses the [`text2vec-transformers`]() vectorizer module and the [Q&A generator]() module), they might add custom filters and custom `_additional` properties. These arguments are described in the documentation of the respective modules themselves.

Let's explore the additional filters for the modules which are part of this dataset.

First, there is the additional `nearText` filter exposed by the `text2vec-transformers` module.

```graphql
{
  Get {
    Paragraph(
      nearText: {
        concepts: ["Italian cuisine"]
      }
      limit: 10
    ) {
      content
      inArticle {
        ... on Article {
          title
        }
      }
      _additional {
        certainty
      }
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3bwXO1F)

Second, we can use the `ask` arguments exposed by the Q&A module, note how there are also additional `_additional` properties.

```graphql
{
  Get {
    Paragraph(
      ask: {
        question: "Who is Francesco Bellissimo?"
      }
      limit: 1
    ) {
      title
      inArticle {
        ... on Article {
          title
        }
      }
      _additional {
        answer {
          result
        }
      }
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3buN2t0)

And last but not least, we can combine all of them together!

```graphql
{
  Get {
    Paragraph(
      ask: {
        question: "When was the program with Daniele Macuglia launched?"
      }
      where: { # <= where filter
        path: ["inArticle", "Article", "title"]
        operator: Equal
        valueString: "Francesco Bellissimo"
      }
      limit: 1
    ) {
      content
      inArticle {
        ... on Article {
          title
        }
      }
      _additional {
        answer {
          result
        }
      }
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3PWDqX1)

Talking about filters, wanna see something cool? Weaviate has many more functions out-of-the-box like feature projection to visualize your results, like this example on a 3D surface.

```graphql
{
  Get {
    Paragraph(
      nearText: {
        concepts: ["Italian cuisine"]
      }
      limit: 10
    ) {
      content
      inArticle {
        ... on Article {
          title
        }
      }
      _additional {
        featureProjection( # <= feature projection
          dimensions: 3
        ){
          vector
        }
      }
    } 
  }
}
```

[Try out ⬆️](https://link.semi.technology/3vDh8Bk)

Last but not least, all the standard filters are documented in the [filters section](../graphql-references/filters.html) of the GraphQL references documentation or in the documentation of the individual modules.

## Aggregate{}

​The `Aggregate{}` can be used to show aggregated data. For example, how many objects do I have of the `Paragraph` class?

​There are three core concepts to keep in mind for the `Aggregate` function.

1. Doing something on a class level is done in the `meta` property.
2. Doing something on a property level is done inside the property.
3. Different property types (e.g., `string`, `int`, etc) support different aggregate functions.

​The examples below are a bit more explanatory.

Let's start with counting the number of data objects in the `Paragraph` class:

```graphql
{
  Aggregate {
    Paragraph {
      meta { # <= the meta property
        count
      }
    }
  }
}
```

[Try out ⬆️](https://link.semi.technology/3oT8cUH)

You can also mix in filters like this:

```graphql
{
  Aggregate {
    Paragraph(
      nearObject: { # <= vector search
        id: "fd7383f7-f2e3-3d50-a272-db9b614417cb"
        certainty: 0.5
      }
      where: { # <= where filter
        path: ["inArticle", "Article", "title"]
        operator: Equal
        valueString: "Francesco Bellissimo"
      }
    ) {
      meta {
        count
      }
    }
  }
}
```

[Try out ⬆️](https://link.semi.technology/3JtmnJo)

The `order` property in the `Paragraph` class is a nice example of how you can use the `Aggregate{}` function for integers.

```graphql
{
  Aggregate {
    Paragraph {
      order {
        count
        maximum
        mean
        median
        minimum
        mode
        sum
        type
      } 
    }
  }
}
```

[Try out ⬆️](https://link.semi.technology/3QnXRfj)

You can find detailed documentation on the `Aggregate{}` function [here](../graphql-references/aggregate.html).

## Explore{}

The `Explore{}` function can be used if you want to search through the complete vector space but if you don't know the class that you're targeting. Bear in mind, if you know the class, you know the properties, the types, etc.

In short, the `Explore{}` function lets you explore the vector space.

Important to know: in almost any situation, need to do two queries when using the `Explore{}` function and you must set a `nearObject` or `nearVector` search parameter.

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

[Try out ⬆️](https://link.semi.technology/3vFyYUj)

The `Explore{}` function works very straightforwardly and only returns four properties.

1. `beacon` contains the URL _and_ the id. It's a "beacon in the vector space" how you can target a data object.
2. `className` contains the name of the class that this data object has.
3. `certainty` is the order from the query to the dataobject.
4. `distance` is the distance between the query and the data object.

<div class="alert alert-secondary alert-getting-started" markdown="1">
💡 Data objects without vectors and data objects with different vector lengths than the input vector length or ID are skipped.
</div>

## Recapitulation

Weaviate's GraphQL-API is used to query your datasets. The structure of the dataset is based on the schema you've defined. You can add vector filters, where-filters, filters from modules, and you can mix them all together. The Weaviate console is ideal to try out the queries.

## What would you like to learn next?

- [Show me how to set up the clients](../core-knowledge/clients.html)
- [Get me back to the schema guide](./schema.html)
- [Get me back to the import guide](./import.html)

# More Resources

{% include docs-support-links.html %}
