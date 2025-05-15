---
title: Multi-vector compression
sidebar_position: 30
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/manage-data.collections.py';

Multi-vector embeddings represent a single data object, like a document or image, using a set of multiple vectors rather than a single vector. This approach allows for a more granular capture of semantic information, as each vector can represent different parts of the object. However, this leads to a significant increase in memory consumption, as multiple vectors are stored for each item. 

Compression techniques become especially crucial for multi-vector systems to manage storage costs and improve query latency. Compression can generally be achieved through two main techniques: 
- **Quantization**: reduces the memory footprint of individual vectors by approximating their values with less precision.
- **Encoding**: transform the entire set of multi-vectors into a new, more compact single vector representation while aiming to preserve semantic relationships.   

## Quantization

Just like with single vectors, multi-vectors support [PQ](./pq-compression.md), [BQ](./bq-compression.md) and [SQ](./sq-compression.md) **quantization**.

During the initial search phase, compressed vectors are used for efficiency. However, when computing the `MaxSim` operation, uncompressed vectors are utilized to ensure more precise similarity calculations. This approach balances the benefits of compression for search efficiency with the accuracy of uncompressed vectors during final scoring.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START MultiValueVectorPQ"
      endMarker="# END MultiValueVectorPQ"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">

```typescript
// TS/JS support coming soon
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

 </TabItem>
  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

</TabItem>
</Tabs>

## Encoding (MUVERA)

**MUVERA**, which stands for *Multi-Vector Retrieval via Fixed Dimensional Encodings*, tackles the higher memory usage and slower processing times of multi-vector embeddings by encoding them into single, fixed-dimensional vectors. This leads to reduced memory usage and faster operations compared to traditional multi-vector approaches. 
<!-- TODO[g-despot]: Add link to blog post: Read more about it in this blog post. -->

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START MultiValueVectorMuvera"
      endMarker="# END MultiValueVectorMuvera"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">

```typescript
// TS/JS support coming soon
```

  </TabItem>
  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

 </TabItem>
  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

</TabItem>
</Tabs>

<details>
  <summary>These parameters can be used to fine-tune MUVERA</summary>

The final dimensionality of the MUVERA encoded vector will be
`repetition * 2^ksim * dprojections`. Carefully tuning these parameters
is crucial to balance memory usage and retrieval accuracy.

- **`ksim`** (`int`):
  The number of Gaussian vectors sampled for the SimHash partitioning function.
  This parameter determines the number of bits in the hash, and consequently,
  the number of buckets created in the space partitioning step. The total
  number of buckets will be $2^{ksim}$. A higher value of `ksim` leads to a
  finer-grained partitioning of the embedding space, potentially improving
  the accuracy of the approximation but also increasing the dimensionality
  of the intermediate encoded vectors.

- **`dprojections`** (`int`):
  The dimensionality of the sub-vectors after the random linear projection
  in the dimensionality reduction step. After partitioning the multi-vector
  embedding into buckets, each bucket's aggregated vector is projected down
  to `dprojections` dimensions using a random matrix. A smaller value of
  `dprojections` helps in reducing the overall dimensionality of the final
  fixed-dimensional encoding, leading to lower memory consumption but potentially
  at the cost of some information loss and retrieval accuracy.

- **`repetition`** (`int`):
  The number of times the space partitioning and dimensionality reduction
  steps are repeated. This repetition allows for capturing different perspectives
  of the multi-vector embedding and can improve the robustness and accuracy
  of the final fixed-dimensional encoding. The resulting single vectors from
  each repetition are concatenated. A higher number of repetitions increases
  the dimensionality of the final encoding but can lead to better approximation
  of the original multi-vector similarity.

</details>

## Further resources

- [How-to: Manage collections](../../manage-data/collections.mdx#define-multi-vector-embeddings-eg-colbert-colpali)
- [Concepts: Vector quantization](/developers/weaviate/concepts/vector-quantization.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
