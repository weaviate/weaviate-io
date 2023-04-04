---
title: Distance metrics
sidebar_position: 3
image: og/docs/configuration.jpg
# tags: ['HNSW']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

:::info Related pages
- [Configuration: Schema](../configuration/schema-configuration.md)
- [References: REST API: Schema](../api/rest/schema.md)
- [Concepts: Data Structure](../concepts/data.md)
:::

## Available Distance Metrics

If not specified explicitly, the default distance metric in Weaviate is
`cosine`. It can be [set in the vectorIndexConfig](/developers/weaviate/configuration/indexes.md#how-to-configure-hnsw) field as part of the
schema ([Example to add new schema class](../api/rest/schema.md#create-a-class)) to any of the following types:

<!-- TODO: Consider removing {:.text-nowrap} -->
| Name | Description | Definition | Range |
| --- | --- | --- | --- |
| <span style={{ whiteSpace: 'nowrap' }}>`cosine`</span> | Cosine (angular) distance between two vectors. For a more efficient calculation, when chosing `cosine` all vectors are normalized to length 1 at import/read time and dot product is used for the actual calculation. A distance of 0 represents identical vectors, a distance of 2 represents opposing vectors. | <span style={{ whiteSpace: 'nowrap' }}>`1 - cosine_sim(a,b)`</span> | <span style={{ whiteSpace: 'nowrap' }}>`0 <= d <= 2`</span> |
| <span style={{ whiteSpace: 'nowrap' }}>`dot`</span> | The negative dot product.[^1] The larger the value, the more similar two vectors are. Example: two vectors with dot distance -3 are more similar than two vectors with dot distance -2 or +5. | <span style={{ whiteSpace: 'nowrap' }}>`-dot(a,b)`</span> | <span style={{ whiteSpace: 'nowrap' }}>`-∞ < d < ∞`</span> |
| <span style={{ whiteSpace: 'nowrap' }}>`l2-squared`</span> | The squared euclidean distance between two vectors. A distance of 0 represents identical vectors. The larger the value, the farther the vectors are apart in the euclidean space.  | <span style={{ whiteSpace: 'nowrap' }}>`sum((a_i - b_i)^2)`</span> | <span style={{ whiteSpace: 'nowrap' }}>`0 <= d < ∞`</span> |
| <span style={{ whiteSpace: 'nowrap' }}>`hamming`</span> | Number of differences between vectors at each dimensions. A distance of 0 represents identical vectors. The larger the value, the farther the vectors are apart in the space.  | <span style={{ whiteSpace: 'nowrap' }}><code>sum(&#124;a_i != b_i&#124;)</code></span> | <span style={{ whiteSpace: 'nowrap' }}>`0 <= d < ∞`</span> |
| <span style={{ whiteSpace: 'nowrap' }}>`manhattan`</span> | The distance between two vector dimensions measured along axes at right angles. A distance of 0 represents identical vectors. The larger the value, the farther the vectors are apart in the space.  | <span style={{ whiteSpace: 'nowrap' }}><code>sum(&#124;a_i - b_i&#124;)</code></span> | <span style={{ whiteSpace: 'nowrap' }}>`0 <= d < dims`</span> |

If you're missing your favorite distance type and would like to contribute it to Weaviate, we'd be happy to review your [PR](https://github.com/weaviate/weaviate).

[^1]: Dot Product on its own is a similarity metric, not a distance metric. As a result, Weaviate returns the negative dot product to stick with the intuition that a smaller value of a distance indicates a more similar result and a higher distance value indicates a less similar result.

### Distance Implementations and Optimizations

On a typical Weaviate use case the largest portion of CPU time is spent calculating vector distances. Even with an approximate nearest neighbor index - which leads to far fewer calculations - the efficiency of distance calculations has a major impact on [overall performance](/developers/weaviate/benchmarks/ann.md).

You can use the following overview to find the best possible combination of distance metric and CPU architecture / instruction set.

| Distance | `linux/amd64 AVX2` | `darwin/amd64 AVX2` | `linux/amd64 AVX512` | `linux/arm64` | `darwin/arm64` |
| --- | --- | --- | --- | --- | --- |
| `cosine` | [optimized](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s) | [optimized](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s) | no SIMD | no SIMD | no SIMD |
| `dot` | [optimized](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s) | [optimized](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s) | no SIMD | no SIMD | no SIMD |
| `l2-squared` | [optimized](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/l2_amd64.s) | [optimized](https://github.com/weaviate/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/l2_amd64.s) | no SIMD | no SIMD | no SIMD |
| `hamming` | no SIMD | no SIMD | no SIMD | no SIMD | no SIMD |
| `manhattan` | no SIMD | no SIMD | no SIMD | no SIMD | no SIMD |

If you like dealing with Assembly programming, SIMD, and vector instruction sets we would love to receive your contribution for one of the combinations that have not yet received an SIMD-specific optimization.

### Distance Fields in the APIs

The `distance` is exposed in the APIs in two ways:

* Whenever a vector search is involved, the distance can be displayed as part of the results, for example using <span style={{ whiteSpace: 'nowrap' }}>`_additional { distance }`</span>
* Whenever a vector search is involved, the distance can be specified as a limiting criteria, for example using <span style={{ whiteSpace: 'nowrap' }}>`nearVector({distance: 1.5, vector: ... })`</span>

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

See also [distance and certainty _additional{} properties](../api/graphql/additional-properties.md).
