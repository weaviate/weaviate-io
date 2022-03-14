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
og: /img/og/og-documentation/graphql-references-aggregate.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/query-data/aggregate.html
    - /documentation/weaviate/current/graphql-references/aggregate.html
---

# Aggregate{} syntax and query structure

The `Aggregate{}` function is structured as follows:

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


## GroupBy Filter
You can use a groupBy filter to get meta information about groups of data objects.

The `groupBy{}` filter is structured as follows for the `Get{}` function:

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

`Aggregate{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Get{}`) there is a [specific documentation page dedicated to filters](filters.html).

# More Resources

{% include docs-support-links.html %}