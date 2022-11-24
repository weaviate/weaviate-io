---
layout: layout-documentation
solution: weaviate
sub-menu: Architecture
title: Binary Passage Retrieval
description: Binary Passage Retrieval or Learning-to-hash is a way to vastly reduce the resource requirements for vector search.
tags: ['architecture', 'binary-passage-retrieval', 'memory consumption', 'learning-to-hash', 'resource optimization']
sidebar_position: 5
open-graph-type: article
intro: Vastly reduce your memory requirements by using Binary Passage Retrieval (Learning-to-hash) with Weaviate.
toc: true
---

# Binary Passage Retrieval (Learning-to-Hash)

Binary Passage Retrieval is the idea of producing a lightweight encoding (or
hash) of each vector and using the hash instead of the vector. The term
Binary Passage Retrieval (or short BPR) is derived from a [2021 research
paper by Yamada et al](https://arxiv.org/abs/2106.00882). It is also called
Learning-to-hash as the models used for BPR are trained with a combined loss
function that looks at both cosine/dot distance between the regular vectors,
as well as the Hamming distance between the binary hash representations of the
vectors.

Since vectors are typically held in memory for optimal performance, reducing
the size of a large vector can greatly reduce the overall memory requirements
for running Weaviate with larger datasets.

## Up to 32x memory reduction

[<img src="/img/binary-passage-retrieval-vector-vs-binary-hash@2x.png" width="800" alt="Weaviate binary passage retrieval" />](/img/binary-passage-retrieval-vector-vs-binary-hash@3x.png "Reduce Memory requirements by a factor of 32 when using binary hashing")

The above example shows a reduction factor of 32x which is based on the
original resource paper. Instead of searching on the full vectors, we search on
a hash representing the vector. In this example, a hash is built by representing
the sign of the original dimension of the vector. Each dimension would
previously occupy a `float32` variable which is 4 Bytes or 32 bits large. Since
the sign can only ever be positive or negative, we only need two possible
options, i.e. a single bit for each dimension. Thus, the memory footprint is
reduced 32-fold.

## No accuracy-loss thanks to two-step retrieval

Since only the sign is kept in the hash, two vectors with different magnitudes
but the same sign on each dimension produce identical hashes. The original
vectors could however have vastly different positions in the vectors space.
For example, take the two vectors `[0.13, 0.97]` and `[0.87, 0.02]`. Since all
dimensions are positive the hashes would be identical. However, the cosine
distance between both vectors is non-zero.

[<img src="/img/bpr-two-step-query-binary-rerank-vector@2x.png" width="800" alt="BPR two step binary reranker in Weaviate" />](/img/bpr-two-step-query-binary-rerank-vector@3x.png "Efficiently retrieve candidates using hashing, then re-rank using original vectors")

To overcome this potential accuracy loss with BPR, the original paper suggests
a two-step ranking process. The hashes are used to produce suitable candidates.
For each candidate, the original vectors can then be used to determine the
correct order. For example, to retrieve the top 50 objects, we would query 1,000
candidates and then re-rank them according to their cosine distance to the
query vector. Although this may seem like additional work, the process is
still very efficient, because:

- Calculating the Hamming distances on the hashes is considerably cheaper than
  calculating the cosine distances, so the initial lookup is cheaper than a
  pure cosine-based search. (This holds true regardless of whether a
  vector-index is used or not, see more later on.)
- The number of candidates is small enough (e.g. 1,000), so that a brute-force
  re-ranking based on the original vectors requires a negligible amount of compute
  time.

# Seamless integration into Weaviate

*Note: BPR support in Weaviate is currently under development. The initial POCs
have provided very promising results and production-grade support is expected
for early 2022.*

Weaviate's BPR integration aims to provide the best possible user experience.
Since BPR can be mostly seen as an optimization, it should not require any
effort to set up. Weaviate will support native BPR integration which can be
toggled on or off with a simple flag. BPR-supported Weaviate modules can
advertise their BPR capabilities and default to BPR if desired. For users of
Weaviate `text2vec-*` modules, using BPR within Weaviate will feel exactly the
same way. For users importing their own vectors, a simple flag will activate
BPR mode if your custom module is compatible with BPR. 

## BPR-enabled Weaviate text2vec-modules

BPR makes use of specially trained neural models. Instead of optimizing for a
cosine or dot-product-based loss, BPR-enabled models optimize for a combined
cosine/dot and binary loss. As a result, only neural-network based models,
(e.g. `text2vec-transformers`) support BPR. The `text2vec-contextionary` model
does not support BPR.

## BPR-enabled out-of-the-box models

Long-term, we aim to provide BPR support for the most commonly used `text2vec-transformers`
models (typically [Sentence-BERT](https://sbert.net) models). When launching
the BPR feature, at least one popular general-purpose model will be supported.

# FAQ

Since Binary Passage Retrieval is brand-new, we are sure you have plenty of
questions. We are trying to answer the most common ones upfront:

### When will BPR officially be supported in Weaviate?

BPR support will be available around the end of Q1 2022 in production quality.
If you want to try it out earlier and aren't afraid to play with
POC-style code, join our
[Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw)
and you can get started considerably sooner.

### What vector distances are used with BPR?

To generate candidates (step 1), a Hamming distance is used on the binary
hashes. To re-rank the candidates and produce the final result set (step 2), the
distance metric is the same as without BRP. Typically this is cosine distance
or dot product on the raw vector representation.

### Do we still need a (HNSW or similar) vector index with BPR?

The benefits of an efficient Approximate Nearest Neighbor (ANN) vector index
still apply to BPR. Since hashes are much more compact and calculating the
Hamming distance is considerably cheaper than calculating cosine distance, the
point where brute-force is still possible is raised considerably. So for some
cases, you may consider skipping vector-indexing entirely and relying on a flat
search. However, when optimizing either for low latency or high throughput, a
vector index will produce considerably better results. We therefor expect BPR
to be used with our existing indices (currently HNSW) in most cases.

### Will my memory requirements go down by a factor of 32?

No. The 32x is the theoretical reduction of the vectors themselves. However,
the vector index also requires memory which grows with the dataset size. The great
news is that since calculating the Hamming distance on the binary hashes is
much faster, we can offload a lot of the computation to the query time without
sacrificing latencies. As a result, we can build a "weaker" (binary) vector
index which will consume less memory. As of now, we are still running
experiments to figure out the final memory requirements with BPR. The
requirements will be drastically lower albeit not by a factor of 32.

### Which media types can be used with BPR?

There is no limitation to media types. As long as the models used can be
(re-)trained to include a binary loss, any model can be used with BPR. We will
roll out support for text-based models first, but other media types (image,
CLIP, etc.) can also benefit from BPR support.

The name "binary passage retrieval" implies text passages, but the technique
used is not in any way specific to text-based media.

### Can BPR be used with custom vectors or only with Weaviate modules?

BPR support will be provided for all uses-cases including your own vectors from
your custom modules outside of Weaviate. However, in this case, it is your
responsibility to make sure that the model provides vectors which can be hashed
without too much accuracy loss. Typically this is done by including the binary
loss as part of the loss function during the training process.

### Can I use a non-BPR-specific model in BPR mode?

From a purely technical perspective, there is no impediment to using any
model with BPR. Since the hashing function is very simple, any existing vector
can be hashed. However, it is unlikely that your hashes will hold a lot of
semantic meaning if the model has not been specifically trained to produce good
hashes alongside good vectors. Typically this is done by including the binary
loss as part of the loss function during the training process.

### How can I stay up-to-date with this exciting development?

Make sure to [join our
Slack-channel](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw)
for regular updates.

# More Resources

{% include docs-support-links.html %}
