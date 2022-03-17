---
layout: layout-documentation
solution: weaviate
sub-menu: GraphQL references
title: Explore{}
intro: You can explore the search graph based on the semantic meaning of the data concepts in a Weaviate using the GraphQL Explore{} function. Search results are based on given data, meta data and the Contextionary used in Weaviate.
description: GraphQL Explore{} function
tags: ['graphql', 'explore{}']
menu-order: 3
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Explore{} query structure and syntax

The `Explore{}` function is always defined based on the following principle:

```graphql
{
  Explore (
    network: <Boolean>,      # If set to True, peers on the P2P network will be included in the search
    concepts: [<String>]!,   # Required - An array of search items, which should be present in the Contextionary
    limit: <Int>,            # The maximum amount of objects to return
    certainty: <Float>,      # Minimal level of certainty, computed by normalized distance
    moveTo: {                # Optional - Giving directions to the search
      concepts: [<String>]!, # List of search items
      force: <Float>!        # The force to apply for a particular movement. Must be between 0 (no movement) and 1 (largest possible movement).
    },
    moveAwayFrom: {          # Optional - Giving directions to the search
      concepts: [<String>]!, # List of search items
      force: <Float>!        # The force to apply for a particular movement. Must be between 0 (no movement) and 1 (largest possible movement).
    }
  ) {
    beacon
    certainty                # certainty value based on a normalized distance calculation
    className
  }
}
```

An example query:

{% include code/0.23.2/graphql.explore.simple.html %}

The result might look like this:

```json
{
  "data": {
    "Explore": [
      {
        "beacon": "weaviate://localhost/things/7e9b9ffe-e645-302d-9d94-517670623b35",
        "certainty": 0.975523,
        "className": "Publication"
      }
    ]
  },
  "errors": null
}
```

### CamelCase interpretation

Weaviate splits words based on CamelCase. For example, if a user wants to explore for the iPhone (the Apple device) they should use `iphone` rather than `iPhone` because the latter will be interpreted as `[i, phone]`.

# Explore filter arguments  

## Concepts

Strings written in the `Concepts` array are your fuzzy search terms. An array of concepts is required to set in the Explore query, and all words in this array should be present in the Contextionary.

There are three ways to define the `concepts` array argument in the Explore filter.

- `["New York Times"]` = one vector position is determined based on the occurrences of the words
- `["New", "York", "Times"]` = all concepts have a similar weight.
- `["New York", "Times"]` = a combination of the two above.

A practical example would be: `concepts: ["beatles", "John Lennon"]`

## Certainty

You can set a minimum required `certainty`, which will be used to determine which data results to return. The value is a float between 0.0 (return all data objects, regardless similarity) and 1.0 (only return data objects that are matching completely, without any uncertainty). The certainty of a query result is computed by normalized distance of the fuzzy query and the data object in the vector space.

### Moving

Because pagination is not possible in multidimensional storage, you can improve your results with additional explore functions which can move away from semantic concepts or towards semantic concepts. E.g., if you look for the concept 'New York Times' but don't want to find the city New York, you can use the `moveAwayFrom{}` function by using the words 'New York'. This is also a way to exclude concepts and to deal with negations (`not` operators in similar query languages). Concepts in the `moveAwayFrom{}` filter are not per definition excluded from the result, but the resulting concepts are further away from the concepts in this filter.

## Additional filters

`Explore{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Aggregate{}`) there is a [specific documentation page dedicated to filters](filters.html).

# More Resources

{% include docs-support-links.html %}