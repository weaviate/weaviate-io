---
title: ANN Benchmark
sidebar_position: 1
image: og/docs/benchmarks.jpg
# tags: ['Weaviate', 'performance', 'benchmarks', 'ANN benchmarks', 'vector database benchmarks']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# ANN Benchmark

This vector database benchmark is designed to measure and illustrate Weaviate's Approximate Nearest Neighbor (ANN) performance for a range of real-life use cases.

:::note
This is not a comparative benchmark that runs Weaviate against competing vector database solutions. <br/><br/>
If you'd like to discuss trade-offs with other solutions, please [contact sales](https://weaviate.io/pricing#contact-sales).
:::

To make the most of this vector database benchmark, you can look at it from different perspectives:

- **The overall performance** – Review the [benchmark results](#benchmark-results) to draw conclusions about what to expect from Weaviate in a production setting.
- **Expectation for your use case** – Find the dataset closest to your production use case, and estimate Weaviate's expected performance for your use case.
- **Fine Tuning** – If you don't get the results you expect. Find the optimal combinations of the configuration parameters (`efConstruction`, `maxConnections` and `ef`) to achieve the best results for your production configuration. (See [HNSW Configuration Tips](https://weaviate.io/developers/weaviate/config-refs/schema/vector-index#hnsw-configuration-tips))

<!---
:::warning TODO
Add some more info related to our philosophy / [DuckDB blog post](https://motherduck.com/blog/perf-is-not-enough/)
:::
--->

## Measured Metrics

For each benchmark test, we set these HNSW parameters:
- **`efConstruction`** - Controls the search quality at build time.
- **`maxConnections`**	 - The number of outgoing edges a node can have in the HNSW graph.
- **`ef`** - Controls the search quality at query time.

:::info HNSW Parameter Configuration Guide
For good starting point values and performance tuning advice, see [HNSW Configuration Tips](https://weaviate.io/developers/weaviate/config-refs/schema/vector-index#hnsw-configuration-tips).
:::

<!---
:::warning TODO
Add a note about how many runs there were. Or, if there's only one run because of cost, let's add a note about that instead.
:::
--->

For each set of parameters, we've run 10,000 requests, and we measured the following metrics:

- The **Recall@1**, **Recall@10**, **Recall@100** - by comparing Weaviate's results to the ground truths specified in each dataset.
- **Multi-threaded Queries per Second (QPS)** - The overall throughput you can
  achieve with each configuration.
- **Individual Request Latency (mean)** - The mean latency over all 10,000 requests.
- **P99 Latency** - 99% of all requests (9,900 out of 10,000) have a latency that is lower than or equal to this number – this shows how fast
- **Import time** - Since varying build parameters has an effect on import time, the import time is also included.

By request, we mean:
An unfiltered vector search across the entire dataset for the given test. All
latency and throughput results represent the end-to-end time that your
users would also experience. In particular, these means:

* Each request time includes the network overhead for sending the results over the
  wire. In the test setup, the client and server machines were located in the
  same VPC.
* Each request includes retrieving all the matched objects from disk. This is
  a significant difference from `ann-benchmarks`, where the embedded libraries
  only return the matched IDs.

:::info
This benchmark is [open source](https://github.com/weaviate/weaviate-benchmarking), so you can reproduce the results yourself.
:::

## Benchmark Results
<!---
**Last updated: MM 20YY with Version**
:::warning TODO
Update information
:::
--->

This section contains datasets modeled after the [ANN Benchmarks](https://github.com/erikbern/ann-benchmarks). Pick a dataset that is closest to your production workload:


| **Dataset** | **Number of Objects** | **Vector Dimensions** | **[Distance metric](https://weaviate.io/blog/distance-metrics-in-vector-search)** | **Use case** |
| --- | --- | --- | --- | --- |
| [SIFT1M](http://corpus-texmex.irisa.fr/) | 1 M | 128 | Euclidean | This dataset reflects a common use case with a small number of objects. |
| [Glove-25](https://nlp.stanford.edu/projects/glove/) | 1.28 M | 25 | Cosine | Because of the smaller vectors, Weaviate can achieve the highest throughput on this dataset. |
| [Deep Image 96](https://sites.skoltech.ru/compvision/noimi/) | 10 M | 96 | Cosine | This dataset gives a good indication of expected speed and throughput when datasets grow. It is about 10 times larger than SIFT1M, but the throughput is only slightly lower. |
| [GIST 960](http://corpus-texmex.irisa.fr/) | 1 M | 960 | Euclidean | This dataset highlights the cost of high-dimensional vector comparisons. It has the lowest throughput of the sample datasets. Use this one if you run high-dimensional loads. |

#### Benchmark Datasets 
These are the results for each dataset:

<Tabs groupId="datasets">
<TabItem value="1" label="SIFT1M">

#### QPS vs Recall for SIFT1M

![SIFT1M Benchmark results](./img/benchmark_sift_128.png)

import AnnSift128 from '/_includes/ann-sift-128.mdx';

<AnnSift128/>

import AnnReadResultsTable from '/_includes/ann-read-results-table.mdx';

<AnnReadResultsTable/>

#### Recommended configuration for SIFT1M
import RecommendedConfig from '/_includes/ann-recommended-config.mdx';

<RecommendedConfig/>

| `efConstruction` | `maxConnections` | `ef` | **Recall@10** | **QPS (Limit 10)** | **Mean Latency (Limit 10**) | **p99 Latency (Limit 10)** |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| 128 | 32 | 64 | 98.83% | 8905 | 3.31ms | 4.49ms |


</TabItem>
<TabItem value="10" label="Glove-25">

#### QPS vs Recall for Glove-25 

![Glove25 Benchmark results](./img/benchmark_glove_25.png)

import AnnGlove25 from '/_includes/ann-glove-25.mdx';

<AnnGlove25/>

<AnnReadResultsTable/>

#### Recommended configuration for Glove-25
<RecommendedConfig/>

| `efConstruction` | `maxConnections` | `ef` | **Recall@10** | **QPS (Limit 10)** | **Mean Latency (Limit 10**) | **p99 Latency (Limit 10)** |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| 64 | 16 | 64 | 95.56% | 15003 | 1.93ms | 2.94ms |

</TabItem>
<TabItem value="100" label="Deep Image 96">

#### QPS vs Recall for Deep Image 96

![Deep Image 96 Benchmark results](./img/benchmark_deepimage_96.png)

import AnnDeep96 from '/_includes/ann-deep-96.mdx';

<AnnDeep96/>

<AnnReadResultsTable/>

#### Recommended configuration for Deep Image 96
<RecommendedConfig/>

| `efConstruction` | `maxConnections` | `ef` | **Recall@10** | **QPS (Limit 10)** | **Mean Latency (Limit 10**) | **p99 Latency (Limit 10)** |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| 128 | 32 | 64 | 96.43% | 6112 | 4.7ms | 15.87ms |

</TabItem>
<TabItem value="1000" label="GIST 960">

#### QPS vs Recall for GIST 960 

![GIST 960 Benchmark results](./img/benchmark_gist_960.png)

import AnnGist960 from '/_includes/ann-gist-960.mdx';

<AnnGist960/>

<AnnReadResultsTable/>


#### Recommended configuration for GIST 960 
<RecommendedConfig/>

| `efConstruction` | `maxConnections` | `ef` | **Recall@10** | **QPS (Limit 10)** | **Mean Latency (Limit 10**) | **p99 Latency (Limit 10)** |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| 512 | 32 | 128 | 94.14% | 1935 | 15.05ms | 19.86ms |

</TabItem>
</Tabs>





## Benchmark Setup

### Scripts

This benchmark is [open source](https://github.com/weaviate/weaviate-benchmarking), so you can reproduce the results yourself.

### Hardware

![Setup with Weaviate and benchmark machine](/img/docs/weaviate_benchmark_setup.png)

This benchmark test uses two GCP instances within the same VPC:

* **Benchmark** – a `c2-standard-30` instance with 30 vCPU cores and 120 GB memory – to host Weaviate.
* **Script** – a smaller instance with 8 vCPU – to run benchmarking scripts.

:::info Here's why we chose the `c2-standard-30`:

* It is large enough to show that Weaviate is a highly concurrent [vector search engine](https://weaviate.io/blog/what-is-a-vector-database).
* It scales well while running thousands of searches across multiple threads.
* It is small enough to represent a typical production case without inducing
  high costs.
:::

Based on your throughput requirements, it is very likely that you will run Weaviate
on a considerably smaller or larger machine in production.

We have outlined in the [Benchmark FAQs](#what-happens-if-i-run-with-fewer-or-more-cpu-cores-than-on-the-example-test-machine)
 what you should expect when altering the configuration or
setup parameters.

### Experiment Setup

We modeled our dataset selection after 
[ann-benchmarks](https://github.com/erikbern/ann-benchmarks). The same test
queries are used to test speed, throughput, and recall. The provided ground
truths are used to calculate the recall.

We use Weaviate's Python client to import data. 
We use Go to measure the concurrent (multi-threaded) queries.
 Each language has its own performance characteristics. 
 You may get different results if you use a different language to send your queries. 

For maximum throughput, we recommend using the [Go](/developers/weaviate/client-libraries/go.md) or
[Java](/developers/weaviate/client-libraries/java.md) client libraries.

The complete import and test scripts are available [here](https://github.com/weaviate/weaviate-benchmarking).

## Benchmark FAQ

### How can I get the most performance for my use case?
If your use case is similar to one of the benchmark tests, use the recommended HNSW parameter configurations to start tuning.

For more instructions on how to tune your configuration for best performance, see [HNSW Configuration Tips](https://weaviate.io/developers/weaviate/config-refs/schema/vector-index#hnsw-configuration-tips).

### What is the difference between latency and throughput?

The latency refers to the time it takes to complete a single request. This
is typically measured by taking a mean or percentile distribution of all
requests. For example, a mean latency of 5ms means that a single request takes, on average, 5ms to complete. This does not say anything about how many queries
can be answered in a given timeframe.

If Weaviate were single-threaded, the throughput per second would roughly equal
to 1s divided by mean latency. For example, with a mean latency of 5ms, this
would mean that 200 requests can be answered in a second.

However, in reality, you often don't have a single user sending one query after
another. Instead, you have multiple users sending queries. This makes the
querying side concurrent. Similarly, Weaviate can handle concurrent incoming
requests. We can identify how many concurrent requests can be served by measuring
the throughput.

We can take our single-thread calculation from before and multiply it with the
number of server CPU cores. This will give us a rough estimate of what the
server can handle concurrently. However, it would be best never to trust this
calculation alone and continuously measure the actual throughput. This is because
such scaling may not always be linear. For example, there may be synchronization
mechanisms used to make concurrent access safe, such as locks. Not only do
these mechanisms have a cost themselves, but if implemented incorrectly, they
can also lead to congestion, which would further decrease the concurrent
throughput. As a result, you cannot perform a single-threaded benchmark and
extrapolate what the numbers would be like in a multi-threaded setting.

All throughput numbers ("QPS") outlined in this benchmark are actual
multi-threaded measurements on a 30-core machine, not estimations.

### What is a p99 latency?

The mean latency gives you an average value of all requests measured. This is a
good indication of how long a user will have to wait on average for
their request to be completed. Based on this mean value, you cannot make any
promises to your users about wait times. 90 out of 100 users might see a
considerably better time, but the remaining 10 might see a significantly worse
time.

Percentile-based latencies are used to give a more precise indication. A
99th-percentile latency - or "p99 latency" for short - indicates the slowest
request that 99% of requests experience. In other words, 99% of your users will
experience a time equal to or better than the stated value. This is a much
better guarantee than a mean value.

In production settings, requirements - as stated in SLAs - are often a
combination of throughput and a percentile latency. For example, the statement
"3000 QPS at p95 latency of 20ms" conveys the following meaning.

- 3000 requests need to be successfully completed per second
- 95% of users must see a latency of 20ms or lower.
- There is no assumption about the remaining 5% of users, implicitly tolerating
  that they will experience higher latencies than 20ms.

The higher the percentile (e.g. p99 over p95) the "safer" the quoted
latency becomes. We have thus decided to use p99-latencies instead of
p95-latencies in our measurements.

### What happens if I run with fewer or more CPU cores than on the example test machine?

The benchmark outlines a QPS per core measurement. This can help you make a
rough estimation of how the throughput would vary on smaller or larger
machines. If you do not need the stated throughput, you can run with fewer CPU
cores. If you need more throughput, you can run with more CPU cores.

Please note that there is a point of diminishing returns with adding more CPUs because of synchronization mechanisms, disk, and memory bottlenecks. Beyond that point, you can scale horizontally instead of vertically. Horizontal scaling with replication will be [available in Weaviate soon](/developers/weaviate/roadmap/index.md).

### What are `ef`, `efConstruction`, and `maxConnections`?

These parameters refer to the [HNSW build and query
parameters](/developers/weaviate/config-refs/schema/vector-index.md#how-to-configure-hnsw).
They represent a trade-off between recall, latency & throughput, index size, and
memory consumption. This trade-off is highlighted in the benchmark results.

### I can't match the same latencies/throughput in my own setup. How can I debug this?

If you are encountering other numbers in your own dataset, here are a couple of
hints to look at:

* What CPU architecture are you using? The benchmarks above were run on a GCP
  `c2` CPU type, which is based on `amd64` architecture. Weaviate also supports
  `arm64` architecture, but not all optimizations are present. If your machine
  shows maximum CPU usage but you cannot achieve the same throughput, consider
  switching the CPU type to the one used in this benchmark.

* Are you using an actual dataset or random vectors? HNSW is known to perform
  considerably worse with random vectors than with real-world datasets. This is due
  to the distribution of points in real-world datasets compared to randomly
  generated vectors. If you cannot achieve the performance (or recall)
  outlined above with random vectors, switch to an actual dataset.

* Are your disks fast enough? While the ANN search itself is CPU-bound, the objects
  must be read from disk after the search has been completed. Weaviate
  uses memory-mapped files to speed this process up. However, if not enough
  memory is present or the operating system has allocated the cached pages
  elsewhere, a physical disk read needs to occur. If your disk is slow,
  it could then be that your benchmark is bottlenecked by those disks.

* Are you using more than 2 million vectors? If yes, make sure to set the
  [vector cache large enough](/developers/weaviate/concepts/resources.md#vector-cache)
  for maximum performance.

### Where can I find the scripts to run this benchmark myself?

The [repository is located here](https://github.com/weaviate/weaviate-benchmarking).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />