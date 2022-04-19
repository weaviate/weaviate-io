---
layout: layout-documentation
solution: weaviate
sub-menu: GraphQL references
title: Aggregate{}
intro: You can use Weaviate's Aggregation{} function to obtain meta information about collections of data. Meta information can be queried over all objects in a class or by groups in a class.
description: GraphQL Aggregate{} function
tags: ['graphql', 'aggregate', 'aggregate{}', 'meta']
menu-order: 2
open-graph-type: article
toc: true
redirect_from:
    - /documentation/weaviate/current/query-data/aggregate.html
    - /documentation/weaviate/current/graphql-references/aggregate.html
---

# Aggregate{} syntax and query structure

This example shows how to aggregate over the entire database. [Below](TODO) you
will find examples of how to dynamically retrieve objects using a vector search
and then aggregating only the matches. The `Aggregate{}` function is structured
as follows:

```graphql
{
  Aggregate {
    <Class> (groupBy:[<property>]) { 
      groupedBy { # requires `groupBy` filter
          path
          value
      }
      meta {
        count
      }
      <propertyOfDatatypeString> {
          count
          type
          topOccurrences {
              value
              occurs
          }
      }
      <propertyOfDatatypeText> {
          count
          type
          topOccurrences {
              value
              occurs
          }
      }
      <propertyOfDatatypeNumberOrInteger> {
          count
          type
          minimum
          maximum
          mean
          median
          mode
          sum
      }
      <propertyOfDatatypeBoolean> {
          count
          type
          totalTrue
          totalFalse
          percentageTrue
          percentageFalse
      }
      <propertyWithReference>
        pointingTo
        type
    }
  }
}
```

An example query to obtain meta information about the data in the class `Article` can be queried as follows. Note that the data is not grouped yet, the meta information is about all the data objects found with the class `Article`.

{% include code/1.x/graphql.aggregate.simple.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Aggregate+%7B%0D%0A++++Article+%7B%0D%0A++++++meta+%7B%0D%0A++++++++count%0D%0A++++++%7D%0D%0A++++++inPublication+%7B%0D%0A++++++++pointingTo%0D%0A++++++++type%0D%0A++++++%7D%0D%0A++++++wordCount+%7B%0D%0A++++++++count%0D%0A++++++++maximum%0D%0A++++++++mean%0D%0A++++++++median%0D%0A++++++++minimum%0D%0A++++++++mode%0D%0A++++++++sum%0D%0A++++++++type%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

The above query will result in something like the following:

```json
{
  "data": {
    "Aggregate": {
      "Article": [
        {
          "inPublication": {
            "pointingTo": [
              "Publication"
            ],
            "type": "cref"
          },
          "meta": {
            "count": 1873
          },
          "wordCount": {
            "count": 1873,
            "maximum": 16585,
            "mean": 1131.15056,
            "median": 826.29351,
            "minimum": 221,
            "mode": 636,
            "sum": 2118645,
            "type": "int"
          }
        }
      ]
    }
  },
  "errors": null
}
```


## GroupBy Argument
You can use a groupBy argument to get meta information about groups of data objects.

The `groupBy{}` argument is structured as follows for the `Get{}` function:

```graphql
{
  Aggregate {
    <Class> ( groupBy: ["<propertyName>"] ) {
      groupedBy {
          path
          value
      }
      meta {
        count
      }
      <propertyName> {
        count
      }
    }
  }
}
```

In the following example, the articles are grouped by the property `isAccessible`, where one group contains accessible articles, and the second group contains articles of which the `isAccessible` property is set to False.

{% include code/1.x/graphql.aggregate.groupby.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Aggregate+%7B%0D%0A++++Article+%28groupBy%3A%5B%22isAccessible%22%5D%29+%7B%0D%0A++++++meta+%7B%0D%0A++++++++count%0D%0A++++++%7D%0D%0A++++++wordCount+%7B%0D%0A++++++++mean%0D%0A++++++%7D%0D%0A++++++groupedBy+%7B%0D%0A++++++++value%0D%0A++++++++path%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

The above query will result in something like the following:

```json
{
  "data": {
    "Aggregate": {
      "Article": [
        {
          "groupedBy": {
            "path": [
              "isAccessible"
            ],
            "value": "True"
          },
          "meta": {
            "count": 1523
          },
          "wordCount": {
            "mean": 636
          }
        },
        {
          "groupedBy": {
            "path": [
              "isAccessible"
            ],
            "value":"False"
          },
          "meta": {
            "count": 350
          },
          "wordCount": {
            "mean": 462
          }
        }
      ]
    }
  },
  "errors": null
}
```


## Additional filters 

`Aggregate{}` functions can be extended with search filters. Because the filters work on multiple core functions (like `Get{}`) there is a [specific documentation page dedicated to filters](filters.html).

# Aggregating a Vector Search / Faceted Vector Search

*Note: This feature was added in `v1.13.0`*

You can combine a vector search (e.g. `nearObject`, `nearVector`, `nearText`,
`nearImage`, etc.) with an aggregation. Internally, this is a two-step process
where the vector search first finds the desired objects, then the results are
aggregated.

## Limiting the search space

Vector searches are different from keyword based searches in the sense that
they do not filter the result set, they just re-order them. Imagine having
1,000 objects and a vector search for `"apple iphone"`. If there was no
explicit limit every single object in the database would be a potential match.
Some matches would have a very high score (certainty), the last matches would
most likely have a very low score. But nevertheless all 1,000 objects could
potentially be scored. The value in this search is in the order. If we only
look at the top 10 results they will be very closely related to the query
vector. Similarly the last 10 objects on the list would be very unrelated.
However, the order is not visible within an aggregation. 

As a result, whenever the goal is to aggregate vector search results, there
needs to be something that limits that the search space. Otherwise the
Aggregation results (over all matches) will look exactly like an Aggregation
without any additional `near<Media>` parameter.

You can achieve such a restriction of the search space in two different ways:

* Set an explicit `objectLimit`, e.g. `objectLimit: 100`. This tells
  Weaviate to retrieve the top 100 objects related to your vector search query,
  then aggregate them. *This is useful when you know up front how many results
  you want to serve, for example in a recommendation scenario, where you want
  to produce 100 recommendations.*

* Set an explicit `certainty`, e.g. `certainty: 0.7`. This tells Weaviate to
  retrieve all possible matches that have a certainty of 0.7 or higher. This
  list has no fixed length, it depends on how many objects were good matches.
  *This is useful in user-facing search scenarios, such as e-commerce. The user
  might be interested in all search results semantically similar to "apple
  iphone" and then generate facets.*

If neither an `objectLimit`, nor a `certainty` is set the query will error.

## API

Below are examples for `nearObject`, `nearVector`, and `nearText`. 
Any `near<Media>` will work.

### nearObject

{% include code/1.x/graphql.aggregate.nearObject.html %}

### nearVector

{% include code/1.x/graphql.aggregate.nearVector.html %}

### nearText

_Note: For `nearText` to be available, a `text2vec-*` module must be installed
with Weaviate._

{% include code/1.x/graphql.aggregate.nearText.html %}

# More Resources

{% include docs-support-links.html %}
