---
title: Distance metrics
sidebar_position: 23
# layout: layout-documentation
# solution: weaviate
# sub-menu: Vector Index (ANN) Plugins
# title: Distance Metrics
# description: The distance metrics and their implementation that can be used with Weaviate
# tags: ['HNSW']
# sidebar_position: 2
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/current/vector-index-plugins/hsnw.html
---

# Available Distance Metrics

If not specified explicitly, the default distance metric in Weaviate is
`cosine`. It can be [set in the vectorIndexConfig](../vector-index-plugins/hnsw.html#how-to-use-hnsw-and-parameters) field as part of the
schema ([Example to add new schema class](../restful-api-references/schema.html#create-a-class)) to any of the following types:

| Name | Description | Definition | Range |
| --- | --- | --- | --- |
| `cosine`{:.text-nowrap} | Cosine (angular) distance between two vectors. For a more efficient calculation, when chosing `cosine` all vectors are normalized to length 1 at import/read time and dot product is used for the actual calculation. A distance of 0 represents identical vectors, a distance of 2 represents opposing vectors. | `1 - cosine_sim(a,b)`{:.text-nowrap} | `0 <= d <= 2`{:.text-nowrap} |
| `dot`{:.text-nowrap} | The negative dot product.&#185; The larger the value, the more similar two vectors are. Example: Two vectors with dot distance -3 are more similar than two vectors with dot distance -2 or +5  | `-dot(a,b)`{:.text-nowrap} | `-∞ < d < ∞`{:.text-nowrap} |
| `l2-squared`{:.text-nowrap} | The sqaured euclidean distance between two vectors. A distance of 0 represents identical vectors. The larger the value, the farther the vectors are apart in the euclidean space.  | `sum((a_i - b_i)^2)`{:.text-norwap} | `0 <= d < ∞`{:.text-nowrap} |
| `hamming`{:.text-nowrap} | Number of differences between vectors at each dimensions. A distance of 0 represents identical vectors. The larger the value, the farther the vectors are apart in the space.  | `sum(|a_i != b_i|)`{:.text-norwap} | `0 <= d < ∞`{:.text-nowrap} |
| `manhattan`{:.text-nowrap} | The distance between two vector dimensions measured along axes at right angles. A distance of 0 represents identical vectors. The larger the value, the farther the vectors are apart in the space.  | `sum(|a_i - b_i|)`{:.text-norwap} | `0 <= d < dims`{:.text-nowrap} |
{:.table}

If you are missing your favorite distance type and would like to contribute it
to Weaviate, please let us know. We are happy to receive your contribution.

<small>&#185; - Dot Product on its own is a similarity metric, not a distance metric. As a result, Weaviate returns the negative dot product to stick with the intuition that a smaller value of a distance indicates a more similar result and a higher distance value indicates a less similar result.</small>

## Distance Implementations and Optimizations

On a typical Weaviate use case the largest portion of CPU time is spent calculating vector distances. Even with an approximate nearest neighbor index - which leads to far fewer calculations - the efficiency of distance calculations has a major impact on [overall performance](../benchmarks/ann.html).

You can use the following overview to find the best possible combination of distance metric and CPU architecture / instruction set.

| Distance | `linux/amd64 AVX2` | `darwin/amd64 AVX2` | `linux/amd64 AVX512` | `linux/arm64` | `darwin/arm64` |
| --- | --- | --- | --- | --- | --- |
| `cosine` | [optimized](https://github.com/semi-technologies/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s) | [optimized](https://github.com/semi-technologies/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s) | no SIMD | no SIMD | no SIMD |
| `dot` | [optimized](https://github.com/semi-technologies/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s) | [optimized](https://github.com/semi-technologies/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s) | no SIMD | no SIMD | no SIMD |
| `l2-squared` | [optimized](https://github.com/semi-technologies/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/l2_amd64.s) | [optimized](https://github.com/semi-technologies/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/l2_amd64.s) | no SIMD | no SIMD | no SIMD |
| `hamming` | no SIMD | no SIMD | no SIMD | no SIMD | no SIMD |
| `manhattan` | no SIMD | no SIMD | no SIMD | no SIMD | no SIMD |
{:.table}

If you like dealing with Assembly programming, SIMD, and vector instruction sets we would love to receive your contribution for one of the combinations that have not yet received an SIMD-specific optimization.

## Distance Fields in the APIs

The `distance` is exposed in the APIs in two ways:

* Whenever a vector search is involved, the distance can be displayed as part of the results, for example using `_additional { distance }`{:.text-nowrap}
* Whenever a vector search is involved, the distance can be specified as a limiting criteria, for example using `nearVector({distance: 1.5, vector: ... })`{:.text-nowrap}

Note: The `distance` field was intorduced in `v1.14.0`. In previous versions, only `certainty` (see below) was available.

### Distance vs Certainty

Prior to version `v1.14` only `certainty` was available in the APIs. The
original ideas behind certainty was to normalize the distance score into a
value between `0 <= certainty <= 1`, where 1 would represent identical vectors
and 0 would represent opposite vectors.

This concept is however unique to `cosine` distance. With other distance
metrics, scores may be unbounded. As a result the preferred way is to use
`distance` in favor of `certainty`.

For backward compatibility, `certainty` can still be used when the distance is
`cosine`. If any other distance is selected `certainty` cannot be used.

See also [distance and certainty _additional{} properties](../graphql-references/additional-properties.html).
