---
title: GraphQL - Additional properties
sidebar_position: 45
image: og/docs/api.jpg
# tags: ['graphql', 'additional properties', 'additional', 'underscore']
---


import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />

## Introduction

GraphQL additional properties can be used on data objects in Get{} Queries to get additional information about the returned data objects. Which additional properties are available depends on the modules that are attached to Weaviate. The fields `id`, `vector`, `certainty`, `featureProjection` and `classification` are available from Weaviate Core. On nested GraphQL fields (references to other data classes), only the `id` can be returned. Explanation on specific additional properties can be found on the module pages, see for example [`text2vec-contextionary`](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-contextionary.md#additional-graphql-api-properties).

## Example

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

## _additional property

All additional properties can be set in the reserved `_additional{}` property.

For example:

```graphql
{
  Get {
    Class {
      property
      _additional {
        # property 1
        # property 2
        # etc...
      }
    }
  }
}
```

### id

The `id` field contains the unique [UUID](https://en.wikipedia.org/wiki/Universally_unique_identifier) of the data object.

```graphql
{
  Get {
    Class {
      property
      _additional {
        id
      }
    }
  }
}
```

### vector

The `vector` fields contains the vector representation of the data object

```graphql
{
  Get {
    Class {
      property
      _additional {
        vector
      }
    }
  }
}
```


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


### rerank

:::info Requires a [`reranker-xxx` module](../../modules/retriever-vectorizer-modules/index.md)
:::

The `rerank` field can be used to [reorder the search results](../../search/rerank.md). It accepts two parameters:

| Parameter    | Required | Type       | Description  |
|--------------|----------|------------|--------------|
| `property`   | yes      | `string`   | Which property to pass to the reranker. For example, you may want to run a similarity search on a Products collection, then rerank specifically on the Name field. |
| `query`      | no       | `string`    | Optionally specify a different query. |

Syntax:

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

### creationTimeUnix

The `creationTimeUnix` field is the timestamp of when the data object was created.

```graphql
{
  Get {
    Class {
      property
      _additional {
        creationTimeUnix
      }
    }
  }
}
```

### lastUpdateTimeUnix

The `lastUpdateTimeUnix` field is the timestamp of when the data object was last updated.

```graphql
{
  Get {
    Class {
      property
      _additional {
        lastUpdateTimeUnix
      }
    }
  }
}
```

### distance

Any time a vector search is involved, the `distance` can be displayed to show
the distance between the query vector and each result. The distance is the raw
distance metric that was used as part of the vector search. For example, if the
distance metric is `cosine`, distance will return a number between 0 and 2. See
the full overview of [distance metrics and the expected distance
ranges](/developers/weaviate/config-refs/distances.md).

A distance would be typical in any place that you retrieve objects using a
vector, for example `Get {}` with `nearObject`, `nearVector`, or `near<Media>`.
The results are ordered by the ascending distance - unless you explicitly sort
by another property.

A lower value for a distance always means that two vectors are closer to
another, than a higher value. Depending on the distance metric used, this can
also mean that distances would return negative values. For example, if dot
product distance is used, a distance of `-50` would indicate more similarity
between a vector pair than `20`. See [the distances
page](/developers/weaviate/config-refs/distances.md) for details and exact
definitions.

*Note that the distance field was introduced in `v1.14.0`.*

#### Certainty (only for cosine distance)

Prior to `v1.14`, certainty was the only way to display vector similarity in
the results. `certainty` is an opinionated measure that always returns a number
between 0 and 1. It is therefore only usable with fixed-range distance metrics,
such as `cosine`.

For a class with `cosine` distance metrics, the `certainty` is a
normalization of the distance using the formula:

```
certainty = 1 - distance/2
```

Given that a cosine distance is always a number between 0 and 2, this will
result in certainties between 0 and 1, with 1 indicating identical vectors, and
0 indicating opposing angles. This definition only exists in an angular space.

### Classification

When a data-object has been [subjected to classification](../rest/classification.md), you can get additional information about how the object was classified by running the following command:

import GraphQLUnderscoreClassification from '/_includes/code/graphql.underscoreproperties.classification.mdx';

<GraphQLUnderscoreClassification/>

### Feature Projection

Because Weaviate stores all data in a vector space, you can visualize the results according to the results of your query. The feature projection is intended to reduce the dimensionality of the object's vector into something easily suitable for visualizing, such as 2d or 3d. The underlying algorithm is exchangeable, the first algorithm to be provided is [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding).

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

#### Best practices and notes
* There is no request size limit (other than the global 10,000 items request limit) which can be used on a `featureProjection` query. However, due to the O(n^2) complexity of the `t-SNE` algorithm, large requests size have an exponential effect on the response time. We recommend to keep the request size at or below 100 items, as we have noticed drastic increases in response time thereafter.
* Feature Projection happens in real-time, per query. The dimensions returned have no meaning across queries.
* Currently only root elements (not resolved cross-references) are taken into consideration for the featureProjection.
* Due to the relatively high cost of the underlying algorithm, we recommend to limit requests including a `featureProjection` in high-load situations where response time matters. Avoid parallel requests including a `featureProjection`, so that some threads stay available to serve other, time-critical requests.


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
