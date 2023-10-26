---
title: GraphQL API
sidebar_position: 0
image: og/docs/api.jpg
# tags: ['GraphQL references']
---


## GraphQL

Weaviate's basic query language is [GraphQL](https://graphql.org/). GraphQL is a query language built on using graph data structures. It is an efficient method of data retrieval and mutation, since it mitigates the common over-fetching and under-fetching problems of other query languages.

:::tip GraphQL is case-sensitive
GraphQL is case-sensitive ([reference](https://spec.graphql.org/June2018/#sec-Names)), so make sure to use the correct casing when writing your queries.
:::

## All references

All references have their individual subpages. Click on one of the references below for more information.

- [Get{}](./get.md)
- [Aggregate{}](./aggregate.md)
- [Explore{}](./explore.md)
- [filters](./filters.md)
- [search operators](./search-operators.md)
- [additional properties](./additional-properties.md)

## Query structure

You can query Weaviate for semantic kinds based on standard GraphQL queries. The examples below only contain the GraphQL query. You can POST a GraphQL query to Weaviate as follows:

```bash
curl http://localhost/v1/graphql -X POST -H 'Content-type: application/json' -d '{GraphQL query}'
```

A GraphQL JSON object is defined as:

```json
{
    "query": "{ # GRAPHQL QUERY }"
}
```

GraphQL queries follows a defined structure, defined to interact with your data in Weaviate as good as possible. Queries are structured as follows:


```graphql
{
  <Function> {
      <Class> {
        <property>
        _<underscore-property>
      }
  }
}
```

- There are three **functions** currently defined in Weaviate's GraphQL: `Get{}`, `Aggregate{}` and `Explore{}`. [`Get{}`](./get.md) functions are used to easily retrieve data from your Weaviate instance, while [`Aggregate{}`](./aggregate.md) is used to obtain meta information about data objects and its properties. With [`Explore{}`](./explore.md) you can browse through the data to with semantic search, and a slightly different query structure than above is used (there is no `<className>` defined, since you are searching in a fuzzy way):

```graphql
{
  Explore (<search arguments>) {
      beacon
      certainty
      className
  }
}
```

- [**Class**](/developers/weaviate/more-resources/glossary.md) is the name of the class you want to fetch, defined in the [schema](../rest/schema.md).
- With including a [**property**](/developers/weaviate/more-resources/glossary.md) (lowercase) list in the query, you specify exactly which property values you want to return. If the property is a reference to another object (beacon), then use the following structure:

```graphql
{
  <Function> {
    <Class> {
      <property>
      <propertyWithReference>
        ... on <ClassOfBeacon> {
          <property>
          _additional {
            <additionalProperty>
          }
        }
      _additional {
        <additionalProperty>
      }
    }
  }
}
```

- To obtain meta information about a data object (for example for interpretation or visualization purposes), use an [**additional property**](./additional-properties.md).

## Limitations

GraphQL _integer_ data currently only supports `int32`, and does not support `int64`. This means that currently _integer_ data fields in Weaviate with integer values larger than `int32`, will not be returned using GraphQL queries. We are working on solving this [issue](https://github.com/weaviate/weaviate/issues/1563). As current workaround is to use a `string` instead.

## Consistency level

GraphQL (`Get`) queries are run with a tunable [consistency level](../../concepts/replication-architecture/consistency.md#tunable-read-consistency).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
