---
title: Rotational Quantization (RQ)
sidebar_position: 25
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'rq']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/\_includes/code/howto/configure-rq/rq-compression-v4.py';

:::info Added in v1.32
:::

[Rotational quantization (RQ)](/developers/weaviate/concepts/vector-quantization#rotational-quantization) is a fast **untrained** vector compression technique that offers 4x compression while retaining almost perfect recall (98-99% on most datasets).

Unlike scalar quantization (SQ), RQ does not require training and can be enabled immediately at index creation without any training phase or switchover point. RQ works by performing a fast pseudorandom rotation of the input vector followed by scalar quantization of each entry to an 8-bit integer.

:::note HNSW only
RQ is currently only supported by the HNSW index.
:::

## Basic configuration

RQ can be enabled at collection creation time. To enable RQ, set `vector_index_config`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
      <FilteredTextBlock
        text={PyCode}
        startMarker="# START EnableRQ"
        endMarker="# END EnableRQ"
        language="py"
      />
  </TabItem>
</Tabs>

## Custom configuration

To tune RQ, set these `vectorIndexConfig` parameters.

| Parameter               | Type    | Default | Details                                                                                                                                                                                                                                                                                   |
| :---------------------- | :------ | :------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rq`: `enabled`         | boolean | `false` | Uses RQ when `true`. <br/><br/> The Python client v4 does not use the `enabled` parameter. To enable RQ with the v4 client, set a `quantizer` in the collection definition.                                                                                                               |
| `rq`: `rescoreLimit`    | integer | 20      | The number of candidates to fetch before rescoring. Set to 0 to disable rescoring.                                                                                                                                                                                                        |
| `rq`: `bits`            | integer | 8       | The number of bits used to quantize each data point. Currently only 8 bits is supported.                                                                                                                                                                                                  |
| `rq`: `cache`           | boolean | `false` | Use the vector cache when true.                                                                                                                                                                                                                                                           |
| `vectorCacheMaxObjects` | integer | `1e12`  | Maximum number of objects in the memory cache. By default, this limit is set to one trillion (`1e12`) objects when a new collection is created. For sizing recommendations, see [Vector cache considerations](/developers/weaviate/concepts/vector-index.md#vector-cache-considerations). |

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
      <FilteredTextBlock
        text={PyCode}
        startMarker="# START RQWithOptions"
        endMarker="# END RQWithOptions"
        language="py"
      />
  </TabItem>
</Tabs>

## RQ characteristics

Rotational quantization offers several advantages:

- **No training required**: Unlike SQ, RQ can be enabled immediately without a training phase or switchover point where the index becomes unresponsive
- **High recall**: Achieves 98-99% recall on most benchmark datasets (compared to 95-97% for SQ)
- **Fast compression**: SIMD-optimized distance computations are typically 2-3x faster than uncompressed vectors
- **Moderate compression**: Provides 4x compression ratio
- **No configuration needed**: Works out of the box without special tuning

### When to use RQ vs SQ

**Use RQ when:**

- You need immediate compression without a training phase
- You require the highest possible recall (98-99%)
- Working with standard vector embeddings (e.g., from OpenAI) with dimensionality ≥ 128
- You want a simple, no-configuration solution

**Consider SQ when:**

- Working with low-dimensional data (< 64 or 128 dimensions) - RQ rounds up dimensions to multiples of 64
- Your vectors have special structure suitable for direct quantization (e.g., already uniformly distributed 8-bit integers)
- You can tolerate a training phase and slightly lower recall

## Algorithm details

RQ consists of two steps:

1. **Fast pseudorandom rotation**: A rotation based on the Fast Walsh Hadamard Transform is applied to the input vector. The output dimension is rounded up to the nearest multiple of 64. This rotation takes ~7-10 microseconds for a 1536-dimensional vector.
2. **Scalar quantization**: Each entry of the rotated vector is quantized to an 8-bit integer using the min and max values of each individual rotated vector to define the quantization interval.

The random rotation provides two key benefits:

- Smoothens the vector, reducing quantization error by narrowing the quantization interval
- Spreads distance information evenly across dimensions, improving distance estimates

### Technical implementation

- **Storage format**: Quantized vectors are stored in byte arrays of length `16 + d` where `d` is the output dimension after rotation
- **Metadata**: The first 16 bytes store four float32 values containing quantization interval and norm information
- **Distance computation**: Uses the same SIMD-optimized `dotByteImpl()` function as scalar quantization
- **No centering**: Unlike some other quantization methods, RQ does not center or normalize vectors

### Differences from RaBitQ

While inspired by extended RaBitQ, this implementation differs significantly for performance reasons:

- Uses fast pseudorandom rotations (O(d) complexity) instead of truly random rotations (O(d²) complexity)
- Employs scalar quantization instead of RaBitQ's encoding algorithm, which becomes prohibitively slow with more bits per entry
- Achieves almost the same precision as extended RaBitQ while being much faster

## Performance considerations

### Encoding and query performance

- **Encoding speed**: RQ is slightly slower than SQ when encoding vectors due to the rotation step, but this is a one-time cost
- **Query performance**: Distance computations with RQ are as fast or faster than SQ, providing 2-3x speedup compared to uncompressed vectors
- **Memory usage**: Roughly equivalent to SQ with 8-bit quantization

### Rescoring

RQ achieves 98-99% recall in isolation (recall100@100). When combined with HNSW indexing, there may be additional recall loss depending on the EF value configuration.

:::tip
For maximum query performance with minimal recall impact, consider setting `rescoreLimit` to 0. This disables rescoring and can significantly boost QPS while only causing a very minor drop in recall.
:::

### Dimensionality considerations

RQ rounds up vector dimensions to the nearest multiple of 64 for the rotation operation. This means:

- A 96-dimensional vector will use 128 dimensions worth of storage
- This can result in less than 4x compression for certain dimensionalities
- For vectors with dimensions that are already multiples of 64, compression is exactly 4x

## Multiple vector embeddings (named vectors)

import NamedVectorCompress from '/\_includes/named-vector-compress.mdx';

<NamedVectorCompress />

## Multi-vector embeddings (ColBERT, ColPali, etc.)

import MultiVectorCompress from '/\_includes/multi-vector-compress.mdx';

<MultiVectorCompress />

:::note Multi-vector performance
RQ supports multi-vector embeddings. Each token vector is rounded up to a multiple of 64 dimensions, which may result in less than 4x compression for very short vectors. This is a technical limitation that may be addressed in future versions.
:::

## Related pages

- [Configuration: Vector index](/developers/weaviate/config-refs/schema/vector-index.md)
- [Concepts: Vector index](/developers/weaviate/concepts/vector-index.md)
- [Concepts: Vector quantization](/developers/weaviate/concepts/vector-quantization.md)
- [Tutorial: Schema](/developers/weaviate/starter-guides/managing-collections)
- [Configuration: Scalar Quantization](/developers/weaviate/configuration/compression/sq-compression.md)
- [GitHub PR: RQ Implementation](https://github.com/weaviate/weaviate/pull/8260#issue-3087297283)

## Questions and feedback

import DocsFeedback from '/\_includes/docs-feedback.mdx';

<DocsFeedback/>
