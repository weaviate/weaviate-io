---
layout: layout-documentation
bodyclass: ["page--guides", " "]
solution: weaviate
sub-menu: Benchmarks
SEOtitle: Weaviate ANN benchmarks
title: ANN
intro: ANN benchmarks for the Weaviate vector search engine
description: ANN benchmarks for the Weaviate vector search engine
tags: ['Weaviate', 'performance', 'benchmarks', 'ANN benchmarks']
menu-order: 5
open-graph-type: article
toc: true
---

{% include benchmarks/ann-chart-init.html %}

# About this benchmark

## Goals

This benchmark is designed to illustrate Weaviate's ANN perfomance for a range
of different use cases.  In the [results section below](#results), allows you to find a
sample dataset that is closest to your production load. You can draw conclusions
about what to expect from Weaviate in a production setting.

Note, this is not a comparative benchmark that runs Weaviate against competing
solutions.

This benchmark is produced using [open-source
scripts](https://github.com/semi-technologies/weaviate-benchmarking), so you
can reproduce it yourself.

### What is being measured?

For each benchmark test, we pick paremeters of:
- efConstruction - The HNSW build parameter that controls the quality of the
  search at build time.
- maxConnections	 - The HNSW build parameter that controls how many outgoing
  edges a node can have in the HNSW graph.
- ef - The HNSW query time parameter that controls the quality of the search.

For each set of parameteres we've run 10000 requests and we measured:

- The Recall@1, Recall@10, Recall@100 by comparing Weaviate's results to the
  ground truths specified in each dataset
- Multi-threaded Queries per Second (QPS) - The overall throughput you can
  achieve with each configuration
- Individual Request Latency (mean) - The mean latency over all 10,000 requests
- P99 Latency - 99% of all requests (9.900 out of 10.000) have a latency that
  is lower than or equal to this number
- Import time - Since varying the build parameters has an effect on import
  time, the import time is also included

By request, we mean:
An unfiltered vector search across the entire dataset for the given test. All
latency and throughput results represent the end-to-end time that you our your
users would also experience. In particular these means:

* Each request time includes the network overhead for sending the results over the
  wire. In the test setup, the client and server machines were located in the
  same VPC.
* Each request includes retrieving all the matched object from disk. This is
  the major difference towards `ann-benchmarks` where the embedded libraries
  only return the matched IDs.

## Benchmark Setup

### Hardware

<img class="image" src="/img/weaviate_benchmark_setup.png" alt="Setup with Weaviate and benchmark machine" />

For the purpose of this benchmark we've used two GCP instances within the same VPC:

* **Benchmark** – a `c2-standard-30` instance with 30 vCPU cores and 120 GB memory – to host Weaviate. 
* **Script** – a smaller instance with 8 vCPU – to run benchmarking scripts.

Note, the `c2-standard-30` was chosen for benchmarking for two reasons:

* It is large enough to show that Weaviate is a highly-concurrent vector search
  engine and scales well while running thousands of searches across multiple threads.
* It is small enough to represent a typical production case without inducing
  large costs.

Based on your throughtput requirements, it is very likely that you will run Weaviate 
on a considerably smaller or larger machine in production. 

In [this section below](#what-happens-if-i-run-with-fewer-or-more-cpu-cores-than-on-the-example-test-machine)
we have outlined what you should expect when altering the configuration or
setup parameters.

### Experiment Setup

The selection of datasets is modelled after
[ann-benchmarks](https://github.com/erikbern/ann-benchmarks). The same test
queries are used to test speed, throughput and recall. The provided ground
thruths are used to calculate the recall.

The imports were performed using Weaviate's python clients. The concurrent
(multi-threaded) queries were measured using Go. Each language may have a
slightly different performance, and you may experience different results if you
send your queries using another language. For the maximum throughput we
recommend using the [Go](../client-libraries/go.html) or
[Java](../client-libraries/java.html) clients.

The full import and test scripts are available [here](https://github.com/semi-technologies/weaviate-benchmarking).

# Results

<div class="alert alert-dark" role="alert">
   <h3 class="alert-heading">A guide for picking the right dataset</h3>
   The following results section contains multiple datasets. To get the most of
   this benchmark, pick the dataset that is closest to the use case that
   reflects your data in production based on the following criteria:

   <ul>
     <li><strong>SIFT1M</strong> - A dataset containing 1 million objects of
     128d and using l2 distance metrics. This dataset reflects a common
     use case with a small number of objects.</li>
     <li><strong>Glove-25</strong> - While similar in data size to SIFT1M, each
     vector only has 25 dimensions in this dataset. Because of the smaller
     vectors Weaviate can achieve the highest throghput on this dataset. The
     distance metric used is angular (cosine distance).</li>
     <li><strong>Deep Image 96</strong> - This dataset contains 10 million objects
     at 96d, and is therefore about 10 times as large as SIFT1M. The throughput
     is only slightly lower than that of the SIFT1M. This dataset gives you a
     good indication of expected speeds and throughputs when datasets
     grow.</li>
     <li><strong>GIST 960</strong> - This dataset contains 1 million objects at
     960d.  It has the lowest throughput of the datasets outlined. It
     highlights the cost of vector comparisons with a lot of dimensions. Pick
     this dataset if you run very high-dimensional loads.</li>

   </ul>
</div>

For each dataset, there is a highlighted configuration. The highlighted
configuration is an opinionated pick about a good recall/latency/throughput
trade-off. The highlight sections will give you a good overview of Weaviate's
performance with the respective dataset. Below the highlighted configuration,
you can find alternative configurations. 

## SIFT1M (1M 128d vectors, L2 distance)

### Highlighted Configuration

{% include benchmarks/ann-sift-128-highlighted.html %}

### All Results

#### QPS vs Recall

{% include benchmarks/ann-sift-chart.html %}

{% include benchmarks/ann-sift-128.html %}

{% include benchmarks/ann-read-results-table.html %}

## Glove-25 (1.2M 25d vectors, cosine distance)

### Highlighted Configuration

{% include benchmarks/ann-glove-25-highlighted.html %}

### All Results

#### QPS vs Recall

{% include benchmarks/ann-glove-chart.html %}

{% include benchmarks/ann-glove-25.html %}

{% include benchmarks/ann-read-results-table.html %}

## Deep Image 96 (9.99M 96d vectors, cosine distance)

### Highlighted Configuration

{% include benchmarks/ann-deep-96-highlighted.html %}

### All Results

#### QPS vs Recall

{% include benchmarks/ann-deep-chart.html %}

{% include benchmarks/ann-deep-96.html %}

{% include benchmarks/ann-read-results-table.html %}

## GIST 960 (1.0M 960d vectors, cosine distance)

### Highlighted Configuration

{% include benchmarks/ann-gist-960-highlighted.html %}

### All Results

#### QPS vs Recall

{% include benchmarks/ann-gist-chart.html %}

{% include benchmarks/ann-gist-960.html %}

{% include benchmarks/ann-read-results-table.html %}

# Learn more & FAQ

## What is the difference between latency and throughput?

The latency refers the to the time it takes to complete a single request. This
is typically measured by taking a mean or percentile distribution of all
requests. For, example, a mean latency of 5ms means that a single request takes
on average 5ms to complete. This does not say anything about how many queries
can be answered in a given timeframe.

If Weaviate was single-threaded the throughput per second would roughly equal
to 1s divided by mean latency. For example, with a mean latency of 5ms, this
would mean that 200 requests can be answered in a second.

However, in reality, you often don't have a single user sending one query after
another. Instead you have multiple users sending queries. This makes the
querying-side concurrent. Similarly, Weaviate can handle concurrent incoming
requests. By measuring the throughput we can identify how many concurrent
requests can be served. 

We can take our single-thread calculation from before and multiply it with the
number of server CPU cores. This will give us a rough estimate of what the
server can handle concurrently. However, you should never trust this
calculation alone and always measure the actual throughput. This is because
such scaling may not always be linear. For example, to make concurrent access
safe, there may be synchronization mechanisms used, such as locks. Not only do
these mechanisms have a cost themselves, but if implemented incorrectly, they
can also lead to congestion which would further decrease the concurrent
throughput. As a result, you cannot perform a single-threaded benchmark and
extrapolate what the numbers would be like in a multi-threaded setting.

All throghput numbers ("QPS") outlined in this benchmark are actual
multi-threaded measurements on a 30-core machine, not estimations.

## What is a p99 latency?

The mean latency gives you an average value of all requests measured. This is a
good indication to tell you how long a user will have to wait on average for
their request to be comleted. Based on this mean value you cannot make any
promises to your users about wait times. 90 out of 100 users might see a
considerably better time, but the remaining 10 might see a considerably worse
time.

To give a more precise indication percentile-based latencies are used. A
99th-percentile latency - or "p99 latency" for short - indicates the slowest
request that 99% of requests experience. In other words, 99% of your users will
experience a time equal to or better than the stated value. This is a much
better guarantee than a mean value.

In production settings requirements - as stated in SLAs - are often a
combination of throughput and a percentile latency. For example the statement
"3000 QPS at p95 latency of 20ms" conveys the following meaning.

- 3000 requests need to be succesfully completed per second
- 95% of users must see a latency of 20ms or lower.
- There is no assumption about the remaining 5% of users, implicitly tolerating
  that they will experience a higher latency than 20ms.

The higher the percentile chose (e.g. p99 over p95) the "safer" the quoted
latency becomes. We have thus chosen to use p99-latencies instead of
p95-latencies in our measurements.

## What happens if I run with fewer or more CPU cores than on the example test machine?

The benchmark outlines a QPS per core measurement. This can help you make a
rough estimation of how the throughput would vary on smaller or larger
machines. If you do not need the stated throughput you can run with fewer CPU
cores. If you need more throughput you can run with more CPU cores. 

Please note that - because of synchronization mechanism, disk and memory
bottlenecks - there is a point of diminishing returns with adding more CPUs.
Beyond that point, you can scale horizontally instead of vertically. Horizontal
scaling with replication will be available in Weaviate soon.

## What are ef, efConstruction and maxConnections?

These parameters refer to the [HNSW build and query
parameters](../vector-index-plugins/hnsw.html#how-to-use-hnsw-and-parameters).
They represent a trade-off between recall, latency & throughput, index size and
memory consumption. This trade-off is highlighted in the benchmark results.

## I can't match the same latencies/throughput in my own setup, how can I debug this?

If you are encountering other numbers in your own dataset, here are a couple of
hints to look at:

* What CPU architecture are you using? The benchmarks above were run on a GCP
  `c2` CPU type which is based on `amd64` architecture. Weaviate also supports
  `arm64` architecture, but not all optimizations are presnt. If your machine
  shows maximum CPU usage, but you cannot achieve the same throughput, consider
  switching the CPU type to the one used in this benchmark.

* Are you using an actual dataset or random vectors? HNSW is known to perform
  considerably worse with random vectors than with actual datasets. This is due
  to the distribution of points in actual datasets compared to randomly
  generated vectors. If you cannot achieve the performance (and/or recall)
  outlined above with random vectors, switch to an actual dataset.

* Are your disks fast enough? While the ANN search itself is CPU-bound, after
  the search has completed, the objects need to be read from disk. Weaviate
  uses memory-mapped files to speed this process up. However, if not enough
  memory is present or the operating system has allocated the cached pages
  elsewhere, then a physical disk read needs to occurr. If your disk is slow,
  it could then be that your benchmark is bottlnecked by those disks.

* Are you using more than 2 million vectors? If yes, make sure to set the
  [vector cache large
  enough](../architecture/resources.html#imports-slowed-down-after-crossing-2m-objects---what-can-i-do)
  for maximum performance.

## Where can I find the scripts to run this benchmark myself?

The [repository is located here](https://github.com/semi-technologies/weaviate-benchmarking).

<style type="text/css">

  .highlighted-config-label {
    font-size:1em;
    text-align: center;
  }

  .highlighted-config-value {
    font-size:2em;
    text-align: center;
  }


  .highlighted-result {
    background: #ffe6f1;
    text-align: center;
    color: #fa0171;
  }

  .highlighted-results-label{
    font-size:1.2em;
    text-align: center;
  }

  .highlighted-results-value {
    font-size:3em;
    text-align: center;
    line-height: 200%;
  }

</style>
