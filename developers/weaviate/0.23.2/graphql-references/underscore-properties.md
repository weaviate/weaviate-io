---
layout: layout-documentation
solution: weaviate
sub-menu: GraphQL references
title: Underscore properties
intro: GraphQL underscore properties can be used in Get{} queries to get additional information about the returned data objects. You can recognize these properties because they are prefixed with an underscore. The value of underscore properties of data objects can be for example be used to enhance interpretability of semantic searches and classification, or for projection and visualization.
description: GraphQL underscore properties function
tags: ['graphql', 'underscore properties', 'underscore']
menu-order: 5
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Certainty

When the `explore` filter is used in a `Get {}` function, you can get the `_certainty` of the returned data objects. The `_certainty` value is a measure indicating how close the data object is to the search query. This is measured by the [cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity) between the search query (the `explore` filter in the `Get {}`  function) and the data object in the vector space. Results of GraphQL semantic search queries by the `explore` filter, will automatically be ordered with descending `_certainty` values, so that the top results match your search query the most.

An example query:

{% include code/0.23.2/graphql.underscoreproperties.certainty.html %}

# Interpretation

When Weaviate vectorizes your data-object, it normalizes the data so that the contextionary can interpret it. With the `_interpretation` underscore property you can request how Weaviate indexed your data-object.

{% include code/0.23.2/graphql.underscoreproperties.interpretation.html %}

# Semantic Path

The semantic path returns an array of concepts from the query to the data object. This allows you to see which steps Weaviate took and how the query and data object are interpreted. 

| Property | Description |
| `concept` | the concept that is found in this step. |
| `distanceToNext` | the distance to the next step (null for the last step). |
| `distanceToPrevious` | this distance to the previous step (null for the first step). |
| `distanceToQuery` | the distance of this step to the query. |
| `distanceToResult` | the distance of the step to this result. |

_Note: Building a semantic path is only possible if an [`explore: {}` filter](./filters.html#explore-filter-semantic-searching) is set. As the explore term represents the beginning of the path and each search result represents the end of the path. Since `explore:{}` queries are currently exclusively possible in GraphQL, the `_semanticPath` is therefore not available in the REST API._

Example: showing a semantic path without edges.

{% include code/0.23.2/graphql.underscoreproperties.semanticpath.html %}

# Classification

When a data-object has been subjected to classification, you can get additional information about how the object was classified by running the following command:

{% include code/0.23.2/graphql.underscoreproperties.classification.html %}

# Nearest Neighbors

The nearest neighbors underscore property displays the nearest concepts to the object in the search results. You can use it in combination will all other search filters but you don't have to. 

{% include code/0.23.2/graphql.underscoreproperties.nearestneighbors.html %}

# Feature Projection

Because Weaviate stores all data in a vector space, you can visualize the results according to the results of your query. The feature projection is intended to reduce the dimensionality of the object's vector into something easily suitable for visualizing, such as 2d or 3d. The underlying algorithm is exchangeable, the first algorithm to be provided is [t-SNE](https://en.wikipedia.org/wiki/T-distributed_stochastic_neighbor_embedding).

To tweak the feature projection optional paramaters (currently GraphQL-only) can be provided. The values and their defaults are:

| Parameter | Type | Default | Implication |
|--|--|--|--|
| `dimensions` | `int` | `2` | Target dimensionality, usually `2` or `3` | 
| `algorithm` | `string` | `tsne` | Algorithm to be used, currently supported: `tsne` |
| `perplexity` | `int` | `min(5, len(results)-1)` | The `t-SNE` perplexity value, must be smaller than the `n-1` where `n` is the number of results to be visualized |
| `learningRate` | `int` | `25` | The `t-SNE` learning rate |
| `iterations` | `int` | `100` | The number of iterations the `t-SNE` algorithm runs. Higher values lead to more stable results at the cost of a larger response time |

An example with default settings:

{% include code/0.23.2/graphql.underscoreproperties.featureprojection.html %}

The above result can be plotted as follows (where the result in red is the first result):

![Weaviate T-SNE example](/img/plot-noSettings.png?i=1 "Weaviate T-SNE example")

### Best practices and notes
* There is no request size limit (other than the global 10,000 items request limit) which can be used on a `_featureProjection` query. However, due to the O(n^2) complexity of the `t-SNE` algorithm, large requests size have an exponential effect on the response time. We recommend to keep the request size at or below 100 items, as we have noticed drastic increases in response time thereafter.
* Feature Projection happens in real-time, per query. The dimensions returned have no meaning across queries.
* Currently only root elements (not resolved cross-references) are taken into consideration for the featureProjection.
* Due to the relatively high cost of the underlying algorithm, we recommend to limit requests including a `_featureProjection` in high-load situations where response time matters. Avoid parallel requests including a `_featureProjection`, so that some threads stay available to serve other, time-critical requests.

# More Resources

{% include docs-support-links.html %}