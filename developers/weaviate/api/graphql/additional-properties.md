---
title: Additional properties (Metadata)
sidebar_position: 45
image: og/docs/api.jpg
# tags: ['graphql', 'additional properties', 'additional', 'metadata']
---


import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />

## Overview

Various 'additional properties', also called 'metadata', can be retrieved for objects.

### Available additional properties

The fields `id`, `vector`, `certainty`, `distance`, `featureProjection` and `classification` are available by default.

Further additional properties may be available for each query, depending on the query type as well as enabled Weaviate modules.

Note that only the `id` is available from cross-referenced objects.

### Requesting additional properties

In GraphQL queries, all additional properties to be retrieved can be set through the reserved `_additional{}` property.

Each of the client libraries may handle this differently. See the examples below.

### Usage example

An example query getting the [UUID](#id) and the [distance](#distance).

import GraphQLUnderscoreDistance from '/_includes/code/graphql.underscoreproperties.distance.mdx';

<GraphQLUnderscoreDistance/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "distance": 0.15422738,
            "id": "e76ec9ae-1b84-3995-939a-1365b2215312"
          },
          "title": "How to Dress Up For an Untraditional Holiday Season"
        },
        {
          "_additional": {
            "distance": 0.15683109,
            "id": "a2d51619-dd22-337a-8950-e1a407dab3d2"
          },
          "title": "2020's biggest fashion trends reflect a world in crisis"
        },
        ...
      ]
    }
  }
}
```

</details>

## Additional properties

### id

Use the `id` field to fetch the object [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier).

### vector

Use the `vector` field to fetch the vector representation of the data object

### generate

:::info Requires a [`generative-xxx` module](../../modules/reader-generator-modules/index.md)
:::

The `generate` field can be used to perform a [generative search](../../search/generative.md).

```graphql
{
  Get {
    Class {
      property
      _additional {
        generate(
          singleResult: {
            prompt: """
            LLM Prompt:

            {property_a} - {property_b}
            """
          }
        ) {
          singleResult
          error
        }
      }
    }
  }
}
```

A `generate` query will cause corresponding additional result fields to be available, such as `singleResult`, `groupedResult` and `error`.


### rerank

:::info Requires a [`reranker-xxx` module](../../modules/retriever-vectorizer-modules/index.md)
:::

The `rerank` field can be used to [reorder the search results](../../search/rerank.md). It accepts two parameters:

| Parameter    | Required | Type       | Description  |
|--------------|----------|------------|--------------|
| `property`   | yes      | `string`   | Which property to pass to the reranker. For example, you may want to run a similarity search on a Products collection, then rerank specifically on the Name field. |
| `query`      | no       | `string`    | Optionally specify a different query. |

```graphql
{
  Get {
    Class {
      property
      _additional {
        rerank(
          property: "..."
          query: "..."
        ) {
          score
        }
      }
    }
  }
}
```

A `rerank` query will cause corresponding additional `score` field to be available.


### creationTimeUnix

Use the `creationTimeUnix` field to fetch the data object creation timestamp.

### lastUpdateTimeUnix

Use the `lastUpdateTimeUnix` field to fetch the data object last updated timestamp.

### Vector search metadata

Use the `distance` or `certainty` field to fetch a vector similarity metric between the query vector and each result of a vector search.

#### Distance

:::info Added in `v1.14.0`
:::

`Distance` is the raw distance determined as part of the vector search, displayed in the same unit as the distance metric used.

See the full overview of [distance metrics and the expected distance ranges](../../config-refs/distances.md#available-distance-metrics).

A lower value for a distance always means that two vectors are closer to one another than a higher value.

#### Certainty (only for cosine distance)

`Certainty` is an opinionated measure that always returns a number between 0 and 1. It is therefore only usable with fixed-range distance metrics, such as `cosine`.

### Keyword search metadata

Use the `score` and `explainScore` field to fetch the scores and explanations of each result of a keyword (BM25) search.

#### Score

The `score` will be the BM25F score of the result. Note that this score is relative to the dataset and query.

#### ExplainScore

The `explainScore` will explain the BM25F score of the result, broken down into its components. This can be used to understand why a result was scored the way it was.


### Hybrid search metadata

Use the `score` and `explainScore` field to fetch the scores and explanations of each result of a hybrid search.

#### Score

The `score` will be the hybrid score of the result, based on the nominated [fusion algorithm](./search-operators.md#fusion-algorithms). Note that this score is relative to the dataset and query.

#### ExplainScore

The `explainScore` will be the hybrid score of the result, broken down into its vector and keyword search components. This can be used to understand why a result was scored the way it was.


### Classification

When a data-object has been [subjected to classification](../rest/classification.md), you can get additional information about how the object was classified by running the following command:

import GraphQLUnderscoreClassification from '/_includes/code/graphql.underscoreproperties.classification.mdx';

<GraphQLUnderscoreClassification/>

### Feature Projection

Use feature projection to reduce the results' vectors to 2d or 3d for easy visualization. Currently [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding) is used.

To tweak the feature projection optional parameters (currently GraphQL-only) can be provided. The values and their defaults are:

| Parameter | Type | Default | Implication |
|--|--|--|--|
| `dimensions` | `int` | `2` | Target dimensionality, usually `2` or `3` |
| `algorithm` | `string` | `tsne` | Algorithm to be used, currently supported: `tsne` |
| `perplexity` | `int` | `min(5, len(results)-1)` | The `t-SNE` perplexity value, must be smaller than the `n-1` where `n` is the number of results to be visualized |
| `learningRate` | `int` | `25` | The `t-SNE` learning rate |
| `iterations` | `int` | `100` | The number of iterations the `t-SNE` algorithm runs. Higher values lead to more stable results at the cost of a larger response time |

An example with default settings:

import GraphQLUnderscoreFeature from '/_includes/code/graphql.underscoreproperties.featureprojection.mdx';

<GraphQLUnderscoreFeature/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "featureProjection": {
              "vector": [
                -115.17981,
                -16.873344
              ]
            }
          },
          "title": "Opinion | John Lennon Told Them \u2018Girls Don\u2019t Play Guitar.\u2019 He Was So Wrong."
        },
        {
          "_additional": {
            "featureProjection": {
              "vector": [
                -117.78348,
                -21.845968
              ]
            }
          },
          "title": "Opinion | John Lennon Told Them \u2018Girls Don\u2019t Play Guitar.\u2019 He Was So Wrong."
        },
        ...
      ]
    }
  }
}
```

</details>

The above result can be plotted as follows (where the result in red is the first result):

![Weaviate T-SNE example](./img/plot-noSettings.png?i=1 "Weaviate T-SNE example")

####  best practices and notes
* Due to the O(n^2) complexity of the `t-SNE` algorithm, we recommend to keep the request size at or below 100 items.
* `t-SNE` is non-deterministic and lossy, and happens in real-time per query. The dimensions returned have no meaning across queries.
* Due to the relatively high cost of the underlying algorithm, we recommend to limit requests including a `featureProjection` in high-load situations where response time matters. Avoid parallel requests including a `featureProjection`, so that some threads stay available to serve other, time-critical requests.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
