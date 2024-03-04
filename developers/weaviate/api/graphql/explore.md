---
title: Explore
sidebar_position: 99
image: og/docs/api.jpg
# tags: ['graphql', 'explore{}']
---


:::note Vector spaces and Explore

The `Explore` function is disabled where multiple inference (e.g. `text2vec-xxx`) modules are enabled.

As a result, `Explore` is not available on Weaviate Cloud Services (WCS) as its clusters are pre-configured with multiple inference modules for AWS, Cohere, Google, OpenAI and so on.

:::

## Overview

Use `Explore` to perform vector searches across multiple collections. Note that `Explore` is currently not available in the gRPC API.

### Requirements

For `Explore`:

- The Weaviate instance to be configured with a maximum of one vectorizer (e.g. `text2vec-transformers`, `text2vec-openai`) module.
- Each `Explore` query can only be a vector search using `nearText` or `nearVector`.

## `Explore` queries

### `Explore` structure and syntax

The `Explore` function has the following syntax:

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

### Search operators

The `nearText` and `nearVector` operators work in `Explore` as they do in other queries. See [search operators](search-operators.md) for more information.


### Filters

`Explore` queries can be combined with filters. See [filters](filters.md) for more information.


### Pagination

Pagination (i.e. `limit` with `offset`) is not possible in `Explore` queries.

#### Moving

Because pagination is not possible in multidimensional storage, we recommend using `moveTo` and `moveAwayFrom` if further query refinement is sought. They work as they do in other queries. See [search operators#nearText](search-operators.md#neartext) for more information.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
