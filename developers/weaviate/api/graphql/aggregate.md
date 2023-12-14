---
title: Aggregate
sidebar_position: 15
image: og/docs/api.jpg
# tags: ['graphql', 'aggregate', 'aggregate{}', 'meta']
---


import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />

## Aggregate{} syntax and query structure

This example shows how to aggregate over the entire database. [Below](#aggregating-a-vector-search--faceted-vector-search) you will find examples of how to dynamically retrieve objects using a vector search and then aggregating only the matches. The `Aggregate{}` function is structured as follows:

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

Below is an example query to obtain meta information about the data in the class `Article`. Note that the data is not grouped yet, the meta information is about all the data objects found with the class `Article`.

import GraphQLAggregateSimple from '/_includes/code/graphql.aggregate.simple.mdx';

<GraphQLAggregateSimple/>

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
            "count": 4403
          },
          "wordCount": {
            "count": 4403,
            "maximum": 16852,
            "mean": 966.0113558937088,
            "median": 680,
            "minimum": 109,
            "mode": 575,
            "sum": 4253348,
            "type": "int"
          }
        }
      ]
    }
  }
}
```

import HowToGetObjectCount from '/_includes/how.to.get.object.count.mdx';

:::tip `meta { count }` will return the query object count
As such, this `Aggregate` query will retrieve the total object count in a class.

<HowToGetObjectCount/>
:::

### groupBy argument

You can use a groupBy argument to get meta information about groups of data objects.

import GroupbyLimitations from '/_includes/groupby-limitations.mdx';

<GroupbyLimitations />

The `groupBy{}` argument is structured as follows for the `Aggregate{}` function:

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

In the following example, the articles are grouped by the property `inPublication`, referring to the article's publisher.

import GraphQLAggGroupby from '/_includes/code/graphql.aggregate.groupby.mdx';

<GraphQLAggGroupby/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Aggregate": {
      "Article": [
        {
          "groupedBy": {
            "path": [
              "inPublication"
            ],
            "value": "weaviate://localhost/Publication/16476dca-59ce-395e-b896-050080120cd4"
          },
          "meta": {
            "count": 829
          },
          "wordCount": {
            "mean": 604.6537997587454
          }
        },
        {
          "groupedBy": {
            "path": [
              "inPublication"
            ],
            "value": "weaviate://localhost/Publication/c9a0e53b-93fe-38df-a6ea-4c8ff4501783"
          },
          "meta": {
            "count": 618
          },
          "wordCount": {
            "mean": 917.1860841423949
          }
        },
        ...
      ]
    }
  }
}
```

</details>

### Additional filters

`Aggregate{}` functions can be extended with search filters. Because the filters work on multiple core functions (like `Get{}`) there is a [specific documentation page dedicated to filters](filters.md).

### `topOccurrences` property

Aggregating data makes the `topOccurrences` sub-property available. Note that the counts are not dependent on tokenization. The `topOccurrences` count is based on occurrences of the entire property, or one of the values if the property is an array.

### Consistency levels

:::info Not available with `Aggregate`
`Aggregate` queries are currently not available with different consistency levels.
:::

### Multi-tenancy

:::info Added in `v1.20`
:::

Where multi-tenancy is configured, the `Aggregate{}` function can be configured to aggregate results from a specific tenant.

You can do so by specifying the `tenant` parameter in the GraphQL query as shown below, or using the equivalent client function.

```graphql
{
  Aggregate {
    Article (
      tenant: "tenantA"
    ) {
      meta {
        count
      }
    }
  }
}
```

:::tip See HOW-TO guide
For more information on using multi-tenancy, see the [Multi-tenancy operations guide](../../manage-data/multi-tenancy.md).
:::

## Aggregating a Vector Search / Faceted Vector Search

:::note
This feature was added in `v1.13.0`
:::

You can combine a vector search (e.g. `nearObject`, `nearVector`, `nearText`, `nearImage`, etc.) with an aggregation. Internally, this is a two-step process where the vector search first finds the desired objects, then the results are aggregated.

### Limiting the search space

Vector searches are different from keyword-based searches in the sense that they do not filter the result set, they just return the objects in a different order. Imagine having 1,000 objects and a vector search for `"apple iphone"`. If there was no explicit limit, every single object in the database would be a potential match. Some matches would have a very high score (certainty), and the last matches would most likely have a very low score. But nevertheless all 1,000 objects could potentially be scored. The value in this search is in the order. If we only look at the top 10 results, they will be very closely related to the query vector. Similarly, the last 10 objects on the list would be very unrelated. However, the order is not visible within an aggregation.

As a result, whenever the goal is to aggregate vector search results, there needs to be something that limits the search space. Otherwise the Aggregation results (over all matches) will look exactly like an Aggregation without any additional `near<Media>` operator.

You can achieve such a restriction of the search space in two different ways:

* Set an explicit `objectLimit`, e.g. `objectLimit: 100`. This tells Weaviate to retrieve the top 100 objects related to your vector search query, then aggregate them. *This is useful when you know up front how many results you want to serve, for example in a recommendation scenario, where you want to produce 100 recommendations.*

* Set an explicit `certainty`, e.g. `certainty: 0.7`. This tells Weaviate to retrieve all possible matches that have a certainty of 0.7 or higher. This list has no fixed length, it depends on how many objects were good matches. *This is useful in user-facing search scenarios, such as e-commerce. The user might be interested in all search results semantically similar to "apple iphone" and then generate facets.*

If neither an `objectLimit`, nor a `certainty` is set the query will error.

### API

Below are examples for `nearObject`, `nearVector`, and `nearText`.
Any `near<Media>` will work.

#### nearObject

import GraphQLAggNearObject from '/_includes/code/graphql.aggregate.nearObject.mdx';

<GraphQLAggNearObject/>

#### nearVector

:::tip Replace placeholder vector
To run this query, replace the placeholder vector with a real vector from the same vectorizer that used to generate object vectors.
:::

import GraphQLAggNearVector from '/_includes/code/graphql.aggregate.nearVector.mdx';

<GraphQLAggNearVector/>

#### nearText

:::note
For `nearText` to be available, a `text2vec-*` module must be installed with Weaviate.
:::

import GraphQLAggNearText from '/_includes/code/graphql.aggregate.nearText.mdx';

<GraphQLAggNearText/>


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
