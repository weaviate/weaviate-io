---
title: GraphQL API
sidebar_position: 0
# layout: layout-documentation
# solution: weaviate
# sub-menu: GraphQL references
# title: GraphQL references
# intro: GraphQL references overview
# description: GraphQL references overview
# tags: ['GraphQL references']
# sidebar_position: 0
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/current/graphql-references/index.html
#     - /documentation/weaviate/current/graphql-references/
---

# GraphQL 

Weaviate's basic query language is [GraphQL](https://graphql.org/). GraphQL is a query language built on using graph data structures. It is an efficient method of data retrieval and mutation, since it mitigates the common over-fetching and under-fetching problems of other query languages. You can query a Weaviate after you've created a [schema](../tutorials/how-to-create-a-schema.html) and [populated it](../tutorials/how-to-import-data.html) with data. The GraphQL interface inside the [Weaviate Console](https://console.semi.technology/) GUI enables easy querying.

# All references

All references have their individual subpages, click on one of the references below for more information.

- [Get{}](get.html)
- [Aggregate{}](aggregate.html)
- [Explore{}](explore.html)
- [filters](filters.html)
- [vector search parameters](vector-search-parameters.html)
- [additional properties](additional-properties.html)

## Query structure

You can query Weaviate for semantic kinds based on standard GraphQL queries. The examples below only contain the GraphQL query. You can POST a GraphQL query to Weaviate as follows:

```bash
$ curl http://localhost/v1/graphql -X POST -H 'Content-type: application/json' -d '{GraphQL query}'
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

- There are three **functions** currently defined in Weaviate's GraphQL: `Get{}`, `Aggregate{}` and `Explore{}`. [`Get{}`](get.html) functions are used to easily retrieve data from your Weaviate instance, while [`Aggregate{}`](aggregate.html) is used to obtain meta information about data objects and its properties. With [`Explore{}`](explore.html) you can browse through the data to with semantic search, and a slightly different query structure than above is used (there is no `<className>` defined, since you are searching in a fuzzy way):

```graphql
{
  Explore (<search arguments>) {
      beacon
      certainty
      className
  }
}
```

- [**Class**](../more-resources/glossary.html) is the name of the class you want to fetch, defined in the [schema](../restful-api-references/schema.html).
- With including a [**property**](../more-resources/glossary.html) (lowercase) list in the query, you specify exactly which property values you want to return. If the property is a reference to another object (beacon), then use the following structure:

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

- To obtain meta information about a data object (for example for interpretation or visualization purposes), use an [**additional property**](additional-properties.html). 

# Limitations

GraphQL _integer_ data currently only supports `int32`, and does not support `int64`. This means that currently _integer_ data fields in Weaviate with integer values larger than `int32`, will not be returned using GraphQL queries. We are working on solving this [issue](https://github.com/semi-technologies/weaviate/issues/1563). As current workaround is to use a `string` instead.

## More Resources

{% include docs-support-links.html %}