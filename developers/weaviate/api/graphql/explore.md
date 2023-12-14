---
title: Explore
sidebar_position: 99
image: og/docs/api.jpg
# tags: ['graphql', 'explore{}']
---


:::note Vector spaces and Explore{}

The `Explore` function is currently not available on Weaviate Cloud Services (WCS) instances, or others where it is likely that multiple vector spaces will exist.

As WCS by default enables multiple inference-API modules and therefore multiple vector spaces, `Explore` is disabled by default by Weaviate.

:::

## Explore{} query structure and syntax

The `Explore{}` function has the following syntax:

```graphql
{
  Explore (
    limit: <Int>,              # The maximum amount of objects to return
    nearText: {                # Either this or 'nearVector' is required
      concepts: [<String>]!,   # Required - An array of search items. If the text2vec-contextionary is the vectorization module, the concepts should be present in the Contextionary.
      certainty: <Float>,      # Minimal level of certainty, computed by normalized distance
      moveTo: {                # Optional - Giving directions to the search
        concepts: [<String>]!, # List of search items
        force: <Float>!        # The force to apply for a particular movement. Must be between 0 (no movement) and 1 (largest possible movement).
      },
      moveAwayFrom: {          # Optional - Giving directions to the search
        concepts: [<String>]!, # List of search items
        force: <Float>!        # The force to apply for a particular movement. Must be between 0 (no movement) and 1 (largest possible movement).
      }
    },
    nearVector: {              # Either this or 'nearText' is required
      vector: [<Float>]!,      # Required - An array of search items, which length should match the vector space
      certainty: <Float>       # Minimal level of certainty, computed by normalized distance
    }
  ) {
    beacon
    certainty                  # certainty value based on a normalized distance calculation
    className
  }
}
```

An example query:

import GraphQLExploreVec from '/_includes/code/graphql.explore.vector.mdx';

<GraphQLExploreVec/>

The result might look like this:

```json
{
  "data": {
    "Explore": [
      {
        "beacon": "weaviate://localhost/7e9b9ffe-e645-302d-9d94-517670623b35",
        "certainty": 0.975523,
        "className": "Publication"
      }
    ]
  },
  "errors": null
}
```

### CamelCase interpretation

Weaviate's vectorization module `text2vec-contextionary` splits words based on CamelCase. For example, if a user wants to explore for the iPhone (the Apple device) they should use `iphone` rather than `iPhone` because the latter will be interpreted as `[i, phone]`.

## Explore filter arguments

### Concepts

Strings written in the `Concepts` array are your fuzzy search terms. An array of concepts is required to set in the Explore query, and all words in this array should be present in the Contextionary.

There are three ways to define the `concepts` array argument in the Explore filter.

- `["New York Times"]` = one vector position is determined based on the occurrences of the words
- `["New", "York", "Times"]` = all concepts have a similar weight.
- `["New York", "Times"]` = a combination of the two above.

A practical example would be: `concepts: ["beatles", "John Lennon"]`

#### Distance

You can set a maximum allowed `distance`, which will be used to determine which
data results to return. The interpretation of the value of the distance field
depends on the [distance metric used](/developers/weaviate/config-refs/distances.md).

If the distance metric is `cosine` you can also use `certainty` instead of
`distance`. Certainty normalizes the distance in a range of 0..1, where 0
represents a perfect opposite (cosine distance of 2) and 1 represents vectors
with an identical angle (cosine distance of 0). Certainty is not available on
non-cosine distance metrics.

#### Moving

Because pagination is not possible in multidimensional storage, you can improve your results with additional explore functions which can move away from semantic concepts or towards semantic concepts. E.g., if you look for the concept 'New York Times' but don't want to find the city New York, you can use the `moveAwayFrom{}` function by using the words 'New York'. This is also a way to exclude concepts and to deal with negations (`not` operators in similar query languages). Concepts in the `moveAwayFrom{}` filter are not per definition excluded from the result, but the resulting concepts are further away from the concepts in this filter.

## Additional filters

`Explore{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Aggregate{}`) there is a [specific documentation page dedicated to filters](filters.md).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
