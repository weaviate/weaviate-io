---
title: Query
sidebar_position: 4
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

Finally! It's time to start and query Weaviate!

For this guide, you don't have to load any data into a Weaviate, we are going to use the Wikipedia demo dataset.

But before we start, some basics:

* Weaviate's main API is its GraphQL-API
  * New to GraphQL? Check [this](https://www.youtube.com/watch?v=eIQh02xuVw4) 100-second explainer video.
* Weaviate also has a RESTful API but it is used for other operations.
* You can also use the clients to query Weaviate natively in your language of choice. The clients will automatically determine which API to use for the request.
  * Weaviate provides [client libraries](../client-libraries/index.md) for convenience.
* The [Weaviate Console](../quickstart/console.md) contains an auto-complete feature to help you write queries.

Let's get started!

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

:::note
A more detailed explanation of Weaviate's GraphQL design is available [here](../api/graphql/index.md#query-structure).
:::

## Get{}

In the basics getting started guide, you've learned [how Weaviate uses a class-property structure](../concepts/data.md#data-objects-in-weaviate) and in the schema getting started guide you've learned [how you can define the class-property structure](./schema.md#create-your-first-class).

Our demo dataset has two classes: `Article` and `Paragraph`. The `Article` class has the properties: `title` of the data type `string`, `hasParagraphs` of the data type `Paragraph`, and `linksToArticles` of the data type `Article`. The `Paragraph` class has the properties: `title` of the data type `string`, `content` of the data type `text`, `order` of the data type `int`, and `inArticle` of the data type `Article`. You can also inspect the schema of the demo dataset in JSON format [here](http://semantic-search-wikipedia-with-weaviate.api.vectors.network:8080/v1/schema).

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
              ...  # This may include hundreds (e.g. 384) of dimensions
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

Did you see `certainty`? This is the distance from the vector to the data objects. You can also calculate the cosine similarity if you like based on the certainty, more about this [here](../more-resources/faq.md#q-how-do-i-get-the-cosine-similarity-from-weaviates-certainty).

You can also do the equivalent but based on the UUID of any object in the same vector space (the same, because we match based on vector length. But if you use the same model to vectorize in different classes you can also mix them).

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

Traditional inverted index filtering is also possible. In Weaviate we call this the `where` filter.

The `where` filter takes three operands of its own:

1. `path` is the graph path in your schema.
2. `operator` is set to define what you want to do with the value inside the path (e.g., `Equal` or `GreaterThan`, etc. See the list [here](/developers/weaviate/api/graphql/filters.md#filter-structure)).
3. `value*` is set based on the type of the property defined in `path`. So, if the property in `path` is an `int`, this becomes `valueInt`, if it's a `string` it becomes `valueString`. The value itself is whatever you want to filter on.

The examples below are a bit more explanatory.

Let's filter for "Italian cuisine" in the `title` of the `Paragraph`.

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

Or by combining them setting multiple operands:

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

:::info
We call Weaviate "vector first". This means that when combining vector search with a where filter, the where-filter will create an allowed-list that skips entries that are not allowed in the ANN index.
:::

If you use Weaviate with modules (the current Wikipedia demo dataset uses the [`text2vec-transformers`](../modules/retriever-vectorizer-modules/text2vec-transformers.md) vectorizer module and the [Q&A generator](../modules/reader-generator-modules/qna-transformers.md) module), they might add custom filters and custom `_additional` properties. These arguments are described in the documentation of the respective modules themselves.

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

Last but not least, all the standard filters are documented in the [filters section](/developers/weaviate/api/graphql/filters.md) of the GraphQL references documentation or in the documentation of the individual modules.

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

You can find detailed documentation on the `Aggregate{}` function [here](/developers/weaviate/api/graphql/aggregate.md).

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

:::warning Warning
Data objects without vectors are skipped.

Data objects with different vector lengths than the input vector length or ID are skipped.
:::

## Recap

Weaviate's GraphQL-API is used to query your datasets. The structure of the dataset is based on the schema you've defined. You can add vector filters, where-filters, filters from modules, and you can mix them all together.

<!-- ## What would you like to learn next?

- [Show me how to set up the clients](../client-libraries/index.md)
- [Get me back to the schema guide](./schema.md)
- [Get me back to the import guide](./import.md) -->

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
