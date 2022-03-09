---
layout: layout-documentation
solution: weaviate
sub-menu: GraphQL references
title: Additional properties
intro: 
description: GraphQL underscore properties function
tags: ['graphql', 'additional properties', 'additional', 'underscore']
menu-order: 5
open-graph-type: article
og: /img/og/og-documentation/graphql-references-additional-properties.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/graphql-references/underscore-properties.html
    - /developers/weaviate/current/graphql-references/underscore-properties.html
---

# Introduction

GraphQL additional properties can be used on data objects in Get{} Queries to get additional information about the returned data objects. Which additional properties are available depends on the modules that are attached to Weaviate. The fields `id`, `certainty`, `featureProjection` and `classification` are available from Weaviate Core. On nested GraphQL fields (references to other data classes), only the `id` can be returned. Explanation on specific additional properties can be found on the module pages, see for example [`text2vec-contextionary`](../modules/text2vec-contextionary.html#additional-graphql-api-properties).

# id

The `id` field contains the unique uuid of the data object.

# creationTimeUnix

The `creationTimeUnix` field is the timestamp of when the data object was created.

# lastUpdateTimeUnix

The `lastUpdateTimeUnix` field is the timestamp of when the data object was last updated.

# Certainty

When a semantic search is performed with the `Get {}` function (`nearVector` and `nearText` if the `text2vec-contextionary` or `text2vec-transformers` module is enabled), you can get the `certainty` of the returned data objects. The `certainty` value is a measure indicating how close the data object is to the search query. This is measured by the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) between the search query (the `near...` filter in the `Get {}`  function) and the data object in the vector space. Results of GraphQL semantic search queries by the `near...` filter, will automatically be ordered with descending `certainty` values, so that the top results match your search query the most.

An example query:

{% include code/1.x/graphql.underscoreproperties.certainty.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article+%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++%7D%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_additional+%7B%0D%0A++++++++id%0D%0A++++++++certainty%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

# Classification

When a data-object has been subjected to classification, you can get additional information about how the object was classified by running the following command:

{% include code/1.x/graphql.underscoreproperties.classification.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article+%28%0D%0A++++++nearText%3A+%7B%0D%0A++++++++concepts%3A+%5B%22fashion%22%5D%2C%0D%0A++++++%7D%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_additional+%7B%0D%0A++++++++classification+%7B%0D%0A++++++++++basedOn%0D%0A++++++++++classifiedFields%0D%0A++++++++++completed%0D%0A++++++++++id%0D%0A++++++++++scope%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

# Feature Projection

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

{% include code/1.x/graphql.underscoreproperties.featureprojection.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article+%28%0D%0A++++++nearText%3A%7B+%0D%0A++++++++concepts%3A%5B%22music%22%5D%2C%0D%0A++++++++moveTo%3A+%7B%0D%0A++++++++++concepts%3A+%5B%22beatles%22%5D%2C%0D%0A++++++++++force%3A+0.5%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_additional+%7B%0D%0A++++++++featureProjection%28dimensions%3A+2%29+%7B%0D%0A++++++++++vector%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

The above result can be plotted as follows (where the result in red is the first result):

![Weaviate T-SNE example](/img/plot-noSettings.png?i=1 "Weaviate T-SNE example")

### Best practices and notes
* There is no request size limit (other than the global 10,000 items request limit) which can be used on a `featureProjection` query. However, due to the O(n^2) complexity of the `t-SNE` algorithm, large requests size have an exponential effect on the response time. We recommend to keep the request size at or below 100 items, as we have noticed drastic increases in response time thereafter.
* Feature Projection happens in real-time, per query. The dimensions returned have no meaning across queries.
* Currently only root elements (not resolved cross-references) are taken into consideration for the featureProjection.
* Due to the relatively high cost of the underlying algorithm, we recommend to limit requests including a `featureProjection` in high-load situations where response time matters. Avoid parallel requests including a `featureProjection`, so that some threads stay available to serve other, time-critical requests.

# More Resources

{% include docs-support-links.html %}