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
og-img: documentation.jpg
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
    <SematicKind> {
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
        <PropertyWithReference>
          pointingTo
          type
      }
    }
  }
}
```

An example query to obtain meta information about the data in the class `Article` can be queried as follows. Note that the data is not grouped yet, the meta information is about all the data objects found with the class `Article`.

{% include code/0.23.2/graphql.aggregate.simple.html %}

The above query will result in something like the following:

```json
{
  "data": {
    "Aggregate": {
      "Things": {
        "Article": [
          {
            "InPublication": {
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
    <SematicKind> {
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
}
```

In the following example, the articles are grouped by the property `isAccessible`, where one group contains accessible artibles, and the second group contains articles of which the `isAccessible` property is set to False.

{% include code/0.23.2/graphql.aggregate.groupby.html %}

The above query will result in something like the following:

```json
{
  "data": {
    "Aggregate": {
      "Things": {
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
    }
  },
  "errors": null
}
```

## Additional filters

`Aggregate{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Get{}`) there is a [specific documentation page dedicated to filters](filters.html).

# More Resources

{% include docs-support-links.html %}