---
title: Compression (Vector Quantization)
sidebar_position: 5
image: og/docs/concepts.jpg
# tags: ['vector index plugins']
---

**Vector quantization** reduces the memory footprint of the [vector index](./vector-index.md) by compressing the vector embeddings, and thus reduces deployment costs and improves the speed of the vector similarity search process.

Weaviate currently offers two vector quantization techniques:

- [Binary quantization (BQ)](#binary-quantization)
- [Product quantization (PQ)](#product-quantization)
- [Scalar quantization (SQ)](#scalar-quantization)

## What is quantization?
In general, quantization techniques reduce the memory footprint by representing numbers with lower precision numbers, like rounding a number to the nearest integer. In neural networks, quantization reduces the values of the weights or activations of the model stored as a 32-bit floating-point number (4 bytes) to a lower precision number, such as an 8-bit integer (1 byte).

## Product quantization

[Product quantization](https://ieeexplore.ieee.org/document/5432202) is a multi-step quantization technique that is available for use with `hnsw` indexes in Weaivate.

PQ reduces the size of each vector embedding in two steps. First, it reduces the number of vector dimensions to a smaller number of "segments", and then each segment is quantized to a smaller number of bits from the original number of bits (typically a 32-bit float).

import PQTradeoffs from '/_includes/pq-compression/tradeoffs.mdx' ;

<PQTradeoffs />

In PQ, the original vector embedding is represented as a product of smaller vectors that are called 'segments' or 'subspaces.' Then, each segment is quantized independently to create a compressed vector representation.

![PQ illustrated](./img/pq-illustrated.png "PQ illustrated")

After the segments are created, there is a training step to calculate `centroids` for each segment. By default, Weaviate clusters each segment into 256 centroids. The centroids make up a codebook that Weaviate uses in later steps to compress the vector embeddings.

Once the codebook is ready, Weaviate uses the id of the closest centroid to compress each vector segment. The new vector representation reduces memory consumption significantly. Imagine a collection where each vector embedding has 768 four byte elements. Before PQ compression, each vector embeddingrequires `768 x 4 = 3072` bytes of storage. After PQ compression, each vector requires `128 x 1 = 128` bytes of storage. The original representation is almost 24 times as large as the PQ compressed version. (It is not exactly 24x because there is a small amount of overhead for the codebook.)

To enable PQ compression, see [Enable PQ compression](/developers/weaviate/configuration/compression/pq-compression#enable-pq-compression)

### Segments

The PQ `segments` controls the tradeoff between memory and recall. A larger `segments` parameter means higher memory usage and recall. An important thing to note is that the segments must divide evenly the original vector dimension.

Below is a list segment values for common vectorizer modules:

| Module      | Model                                   | Dimensions | Segments               |
|-------------|-----------------------------------------|------------|------------------------|
| openai      | text-embedding-ada-002                  | 1536       | 512, 384, 256, 192, 96 |
| cohere      | multilingual-22-12                      | 768        | 384, 256, 192, 96      |
| huggingface | sentence-transformers/all-MiniLM-L12-v2 | 384        | 192, 128, 96           |

### PQ compression process

PQ has a training stage where it creates a codebook. We recommend using 10,000 to 100,000 records per shard to create the codebook. The training step can be triggered manually or automatically. See [Configuration: Product quantization](../configuration/compression/pq-compression.md) for more details.

When the training step is triggered, a background job converts the index to the compressed index. While the conversion is running, the index is read-only. Shard status returns to `READY` when the conversion finishes.

After the PQ conversion completes, query and write to the index as normal. Distances may be slightly different due to the effects of quantization.

### Encoders

In the configuration above you can see that you can set the `encoder` object to specify how the codebook centroids are generated. Weaviate’s PQ supports using two different encoders. The default is `kmeans` which maps to the traditional approach used for creating centroid.

Alternatively, there is also the `tile` encoder. This encoder is currently experimental but does have faster import times and better recall on datasets like SIFT and GIST. The `tile` encoder has an additional `distribution` parameter that controls what distribution to use when generating centroids. You can configure the encoder by setting `type` to `tile` or `kmeans` the encoder creates the codebook for product quantization. For configuration details, see [Configuration: Vector index](../config-refs/schema/vector-index.md).

### Distance calculation

With product quantization, distances are then calculated asymmetrically with a query vector with the goal being to keep all the original information in the query vector when calculating distances.

:::tip
Learn more about [how to configure product quantization in Weaviate](../configuration/compression/pq-compression.md).<br/><br/>
You might be also interested in our blog post [How to Reduce Memory Requirements by up to 90%+ using Product Quantization](https://weaviate.io/blog/pq-rescoring).
:::

## Binary quantization

**Binary quantization (BQ)** is a quantization technique that converts each vector embedding to a binary representation. The binary representation is much smaller than the original vector embedding. Usually each vector dimension requires 32 bits, but the binary representation only requires 1 bit, representing a 32x reduction in storage requirements. This works to speed up vector search by reducing the amount of data that needs to be read from disk, and simplifying the distance calculation.

The tradeoff is that BQ is lossy. The binary representation by nature omits a significant amount of information, and as a result the distance calculation is not as accurate as the original vector embedding.

Some vectorizers work better with BQ than others. Anecdotally, we have seen encouraging recall with Cohere's V3 models (e.g. `embed-multilingual-v3.0` or `embed-english-v3.0`), and OpenAI's `ada-002` model with BQ enabled. We advise you to test BQ with your own data and preferred vectorizer to determine if it is suitable for your use case.

Note that when BQ is enabled, a vector cache can be used to improve query performance. The vector cache is used to speed up queries by reducing the number of disk reads for the quantized vector embeddings. Note that it must be balanced with memory usage considerations, with each vector taking up `n_dimensions` bits.

## Scalar quantization

**Scalar quantization (SQ)** The dimensions in a vector embedding are usually represented as 32 bit floats. SQ transforms the float representation to an 8 bit integer. This is a 4x reduction in size.

SQ compression, like BQ, is a lossy compression technique. However, SQ has a much greater range. The SQ algorithm analyzes your data and distributes the dimension values into 256 buckets (8 bits). BQ only uses two values (1 bit). Consequently, SQ compressed vectors are more accurate than BQ encoded vectors. They are also significantly smaller than uncompressed vectors.

When SQ is enabled, Weaviate boosts recall by over-fetching compressed results. After Weaviate retrieves the compressed results, the database searches the original, uncompressed vectors that correspond to the compressed result. The second search is very fast because it only searches a small number of vectors rather than the whole database.

## Over-fetching / re-scoring

When you use BQ or SQ, Weaviate over-fetches and then re-scores the results. This is because the distance calculation on the compressed vectors is not as accurate as the same calculation on the original vector embedding.

In a query, Weaviate fetches the `rescore limit` of compressed objects or the specified query limit, whichever is greater. Then, Weaviate uses the original, uncompressed vector embedding to recalculate the scores. For example, if a query is made with a limit of 10, and a rescore limit of 200, Weaviate fetches `max(10, 500) = 200` objects, and then re-scores the top 10 objects using the full vector. This process offsets some of the loss in search quality (recall)  that is caused by compression.

:::tip
Learn more about how to [configure binary quantization](../configuration/compression/bq-compression.md) in Weaviate.<br/><br/>
You might be also interested in our blog post [32x Reduced Memory Usage With Binary Quantization](https://weaviate.io/blog/binary-quantization).
:::

## Vector compression with vector indexing

### With an HNSW index

An [HNSW index](#hnsw-index) can be configured using [PQ](#product-quantization) or [BQ](#binary-quantization). Since HNSW is in memory, compression can reduce your memory footprint or allow you to store more data in the same amount of memory.

:::tip
You might be also interested in our blog post [HNSW+PQ - Exploring ANN algorithms Part 2.1](https://weaviate.io/blog/ann-algorithms-hnsw-pq).
:::

### With a flat index

[BQ](#binary-quantization) can use a [flat index](#flat-index). A flat index search reads from disk, compression reduces the amount of data Weaviate has to read so searches are faster.

## Rescoring

Quantization inherently involves some loss information due to the reduction in information precision. To mitigate this, Weaviate uses a technique called rescoring, using the uncompressed vectors that are also stored alongside compressed vectors. Rescoring recalculates the distance between the original vectors of the returned candidates from the initial search. This ensures that the most accurate results are returned to the user.

In some cases, rescoring also includes over-fetching, whereby additional candidates are fetched to ensure that the top candidates are not omitted in the initial search.

## Further resources

:::info Related pages
- [Concepts: Indexing](./indexing.md)
- [Concepts: Vector Indexing](./vector-index.md)
- [Configuration: Vector index](../config-refs/schema/vector-index.md)
- [Configuration: Schema (Configure semantic indexing)](../config-refs/schema/index.md#configure-semantic-indexing)
- [How to configure: Binary quantization (compression)](../configuration/compression/bq-compression.md)
- [How to configure: Product quantization (compression)](../configuration/compression/pq-compression.md)
- [Weaviate Academy: 250 Vector Compression](../../academy/py/compression/index.md)
:::

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
