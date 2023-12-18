---
title: Aggregate
sidebar_position: 15
image: og/docs/api.jpg
# tags: ['graphql', 'aggregate', 'aggregate{}', 'meta']
---

import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />

# Overview

This page covers aggregation queries. They are collectively referred to as `Aggregate` queries within.

An `Aggregate` query can aggregate over an entire collection, or the [results of a search](#aggregating-a-vector-search--faceted-vector-search).


### Parameters

An `Aggregate` query requires the target collection to be specified. Each query can include any of the following types of arguments:

| Argument | Description | Required |
| -------- | ----------- | -------- |
| Collection | Also called "class". The object collection to be retrieved from. | Yes |
| Properties | Properties to be retrieved | Yes |
| [Conditional filters](./filters.md) | Filter the objects to be retrieved | No |
| [Search operators](./search-operators.md) | Specify the search strategy (e.g. near text, hybrid, bm25) | No |
| [Additional operators](./additional-operators.md) | Specify additional operators (e.g. limit, offset, sort) | No |
| [Tenant name](#multi-tenancy) | Specify the tenant name | Yes, if multi-tenancy enabled. ([Read more: what is multi-tenancy?](../../concepts/data.md#multi-tenancy)) |
| [Consistency level](#consistency-levels) | Specify the consistency level | No |


### Available properties

Each data type has its own set of available aggregated properties. The following table shows the available properties for each data type.

| Data type | Available properties |
| --------- | -------------------- |
| Text | `count`, `type`, `topOccurrences (value, occurs)` |
| Number | `count`, `type`, `minimum`, `maximum`, `mean`, `median`, `mode`, `sum` |
| Integer | `count`, `type`, `minimum`, `maximum`, `mean`, `median`, `mode`, `sum` |
| Boolean | `count`, `type`, `totalTrue`, `totalFalse`, `percentageTrue`, `percentageFalse` |
| Date | `count`, `type`, `minimum`, `maximum`, `mean`, `median`, `mode` |
| UUID | `count`, `type`, `topOccurrences` |


<details>
  <summary>See a GraphQL Aggregate format</summary>

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

</details>

Below is an example query to obtain meta information about the `Article` collection. Note that the data is not grouped here, and results relate to all data objects in the `Article` collection.

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

The `groupBy` argument is structured as follows for the `Aggregate` function:

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

`Aggregate` functions can be extended with conditional filters [read more](filters.md).

### `topOccurrences` property

Aggregating data makes the `topOccurrences` property available. Note that the counts are not dependent on tokenization. The `topOccurrences` count is based on occurrences of the entire property, or one of the values if the property is an array.

### Consistency levels

:::info Not available with `Aggregate`
`Aggregate` queries are currently not available with different consistency levels.
:::

### Multi-tenancy

:::info Added in `v1.20`
:::

Where multi-tenancy is configured, the `Aggregate` function can be configured to aggregate results from a specific tenant.

You can do so by specifying the `tenant` parameter in the query as shown below, or in the client.

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

Vector searches compare objects by similarity. Thus they do not exclude any objects.

As a result, for a search operator to have an impact on an aggregation, you must limit the search space with an `objectLimit` or `certainty`.

You can achieve such a restriction of the search space in two different ways:

* `objectLimit`, e.g. `objectLimit: 100` specifies Weaviate to retrieve the top 100 objects related to a vector search query, then aggregate them. *This is useful when you know up front how many results you want to serve, for example in a recommendation scenario, where you want to produce 100 recommendations.*

* `certainty`, e.g. `certainty: 0.7` specifies Weaviate to retrieve all possible matches that have a certainty of 0.7 or higher. This list has no fixed length, it depends on how many objects were good matches. *This is useful in user-facing search scenarios, such as e-commerce. The user might be interested in all search results semantically similar to "apple iphone" and then generate facets.*

If neither an `objectLimit`, nor a `certainty` is set the query will error.

### Examples

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
