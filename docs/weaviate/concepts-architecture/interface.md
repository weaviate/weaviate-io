---
layout: layout-documentation
solution: weaviate
sub-menu: Architecture
title: Interface
description: Interface
tags: ['architecture', 'interface', 'API design']
sidebar_position: 6
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.14.1/architecture/
---

# Introduction

Weaviate is a vector database that you can manage and use through it's APIs. Weaviate has a RESTful API and a GraphQL API. The client libraries in all languages support all API functions. Some clients, e.g. the Python client, have additional functionality, such as full schema management and batching operations. This way, Weaviate is easy to use in custom projects. Additionally, the APIs are intuitive, so it is easy to integrate into your existing data landscape. 

This page contains information on how Weaviate's APIs are designed, and how you can use Weaviate Console to search through your Weaviate instance with GraphQL.

# API Design

## Design: UX & Weaviate Features

User Experience (UX) is one of our most valuable principles. Weaviate should be easy to understand, intuitive to use and valuable, desirable and usable to the community. The interaction with Weaviate is naturally very important for its UX. Weaviate's APIs are designed from the perspective of user needs, keeping the software features in mind. We do user research, user testing and prototyping to make sure all features resonate with our users. User requirements are continuously gathered during collaborative discussions. We match user needs with the functions of Weaviate. When there is a strong need from the user or application perspective, we may extend Weaviate's functions and APIs. When there is a new Weaviate function, this will naturally be accessible via (new) API functions.

<!-- The UX of Weaviate's APIs is designed following the [UX Honeycomb](https://semanticstudios.com/user_experience_design/) usability rules, defined by [Peter Morville](https://semanticstudios.com/about/).  -->
The UX of Weaviate's APIs is designed following the UX Honeycomb usability rules, defined by Peter Morville.

<!-- ![<img src="/img/api-ux.png" width="250"/>](/img/api-ux.png "Weaviate's API is designed following the UX Honeycomb") -->

## RESTful API and GraphQL API

Weaviate has both a RESTful API and a GraphQL API. Currently, there is no feature parity between both APIs (this will be implemented later, there is an [issue](https://github.com/semi-technologies/weaviate/issues/1540) on Github). The RESTful APIs are mostly used for DB management and CRUD operations. The GraphQL API is mostly used to access data objects in Weaviate, whether it's a simple lookup or a combination of scalar and vector search. The APIs support the following user needs, roughly speaking:

* **Adding, retrieving, updating and deleting data CRUD** -> RESTful API
* **Weaviate management operations** -> RESTful API 
* **Data search** -> GraphQL API
* **Explorative data search** -> GraphQL API
* **Data analysis (meta data)** -> GraphQL API
* **Near real time on very large datasets in production** -> Client libraries (Python, Go, Java, JavaScript) using both APIs under the hood
* **Easy to integrate in applications** -> Client libraries (Python, Go, Java, JavaScript) using both APIs under the hood

## GraphQL 

### Why GraphQL?
We have chosen to use a GraphQL API, for multiple reasons:
* **Data structure**. 
  * Data in Weaviate follows a class-property structure. Data objects can be queried by their class and properties with GraphQL. 
  * It is possible to link data in Weaviate with cross-references. A Graph query language like GraphQL is very useful here.
* **Performance**.
  * With GraphQL, there is no over/under-fetching. You get back exactly the information about data objects that you query, nothing more and nothing less. This is beneficial for performance.
  * Reducing the number of requests. With GraphQl, you can make highly efficient and precise queries that usually require many more queries with a traditional RESTful API for the same results.
* **User Experience**
  * Reducing complexity. 
  * Less error-prone (because of its typed schema)
  * Custom design
  * Data exploration and fuzzy search is possible

### GraphQL Design Principles
GraphQL queries are designed to be intuitive and fit Weaviate's features. [This article on Hackernoon](https://hackernoon.com/how-weaviates-graphql-api-was-designed-t93932tl) tells you more about how GraphQL API was designed (note that examples show an older Weaviate and GraphQL API version). The following three points are key in the design: 

* **Natural language**. The GraphQL queries follow a natural language pattern as much as possible. The function of a query is easy to understand and queries are easy to write and remember. An example query where you can recognize human language is: "*Get* the *title* of the *Articles* where the *wordcount* is *greater than* *1000*. The most important words in this query are also used in the GraphQL query:

```graphql
{
  Get {
    Article(where: {
        path: ["wordCount"],    # Path to the property that should be used
        operator: GreaterThan,  # operator
        valueInt: 1000          # value (which is always = to the type of the path property)
      }) {
      title
    }
  }
}
```

There are currently three main functions in a GraphQL request: "Get{}", "Explore{}" and "Aggregate{}". 

* **Classes & properties**. Data in Weaviate has a class-property structure, where cross-references may appear between data object. The class name of the data to return is written one layer deeper than the 'main function'. The next layer consists of the properties and cross-reference properties to return per class:

```graphql
{
  <Function> {
      <Class> {
        <property>

        <cross_reference-property> {
            ... on <ClassOfBeacon> {
                <property>
            }
        }

        _<additional-property> {
            <additional-field>
        }
      }
  }
}
```

* **Query filters (search arguments) dependent on database setup**. You can add filters on class level to filter objects. Scalar (`where` filters) can be combined with vector (`near<...>`) filters. Depending on your Weaviate setup (which modules you have connected), additional filters may be used. A filter can look like (using the [`qna-transformers` module](../reader-generator-modules/qna-transformers.html)):

```graphql
{
  Get {
    Article(
      ask: {
        question: "Who is the king of the Netherlands?",
        properties: ["summary"]
      }, 
      limit: 1
    ) {
      title
      _additional {
        answer {
          result
        }
      }
    }
  }
}
```

### GraphQL Design of Main Functions

1. **Data search: `Get {}`**: to search for data objects when you know the class name of the data objects you're looking for.
2. **Explorative & fuzzy search: `Explore {}`**: to search in a fuzzy way, when you don't know the data schema and class names.
3. **Data analysis (meta data): `Aggregate {}`**: to search for meta data, and do data analysis of data aggregations. 

# Weaviate Console

The [Weaviate Console](https://console.semi.technology/) is a dashboard to manage Weaviate clusters from WCS, and access Weaviate instances running elsewhere. You can use the Query Module to make GraphQL queries.

<!-- ![<img src="/img/console-capture.png" width="250"/>](/img/console-capture.png "GraphQL Query Module in Weaviate Console") -->

# Weaviate Clients and CLI

Weaviate has several client libraries: in [Go](../client-libraries/go.html), [Java](../client-libraries/java.html), [Python](../client-libraries/python.html) and [JavaScript](../client-libraries/javascript.html). The client libraries in all languages support all API functions. Some clients, e.g. the Python client, have additional functionality, such as full schema management and batching operations. This way, Weaviate is easy to use in custom projects. The APIs are intuitive to use, so it is easy to integrate Weaviate into your existing data landscape. 

Weaviate also has a [Command Line Interface](../client-libraries/cli.html), enabling basic management from the command line to your Weaviate instances.

# More Resources

{% include docs-support-links.html %}





