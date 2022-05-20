---
layout: layout-documentation
bodyclass: ["page--guides", " "]
solution: weaviate
sub-menu: Benchmarks
title: ANN
intro: 
description: 
tags: ['Weaviate', 'performance', 'benchmarks', 'ann benchmarks']
menu-order: 5
open-graph-type: article
toc: true
---

# TODO @BOB FIX TITLE

# About this benchmark

## Goals

This benchmark is designed to illustrate Weaviate's ANN perfomance for a range
of different scenarios.  In the [results section below](TODO), allows you to find a
sample dataset that is closest to your production load. You can draw conclusions
about what to expect from Weaviate in a production setting.

Note, this is not a comparative benchmark that runs Weaviate against competing
solutions.

This benchmark is produced using [open-source scripts](TODO), so you can
reproduce it yourself.

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

<!-- TODO Svitlana/Sebastian add graphic -->

For this benchmark, a GCP `c2-standard-30` (30 vCPU cores, 120 GB memory) machine
was used. The benchmarking script itself was run form a secondary 8-core
machine. The `c2-standard-30` was chosen for two reasons:

* It is large enough to show that Weaviate is a highly-concurrent vector search
  engine and scales well while running thousands of searches across multiple threads.
* It is small enough to represent a typical production case without inducing
  large costs.

Based on your throughtput requirements, it is very likely that you will run Weaviate 
on a considerably smaller or larger machine in production. 

In [this section below](TODO) we have outlined what you should expect when altering
the configuration or setup parameters.

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

The full import and test scripts are available [here](TODO).

# Results

<!-- TODO:
* have a little section on how to navigate/read the benchmarks
* have a little section on how to navigate/read the graph
 -->

The following sections each present the results of the benchmarks with one
particular dataset. For each dataset, there is a highlighted configuration. The
highlighted configuration is an opinionated pick about a good
recall/latency/throughput trade-off. The highlight sections will give you a
good overview of Weaviate's performance with the respective dataset. Below the
highlighted configuration, you can find alternative configurations. 

## SIFT1M (1M 128d vectors, L2 distance)

### Highlighted Configuration

{% include benchmarks/ann-sift-128-highlighted.html %}

### All Results

#### QPS vs Recall

<div class="container" style="margin-bottom: 40px">
  <div class="row">
    <div class="col-12">
      <div style="width:100%; line-height:1000%; background: grey; text-align: center">
        This is a placeholder for the chart!
      </div>
    </div>
  </div>
</div>

{% include benchmarks/ann-sift-128.html %}

## Glove-25 (1.2M 25d vectors, cosine distance)

### Highlighted Configuration

{% include benchmarks/ann-glove-25-highlighted.html %}

### All Results

#### QPS vs Recall

<div class="container" style="margin-bottom: 40px">
  <div class="row">
    <div class="col-12">
      <div style="width:100%; line-height:1000%; background: grey; text-align: center">
        This is a placeholder for the chart!
      </div>
    </div>
  </div>
</div>

{% include benchmarks/ann-glove-25.html %}

## Deep Image 96 (9.99M 96d vectors, cosine distance)

### Highlighted Configuration

{% include benchmarks/ann-deep-96-highlighted.html %}

### All Results

#### QPS vs Recall

<div class="container" style="margin-bottom: 40px">
  <div class="row">
    <div class="col-12">
      <div style="width:100%; line-height:1000%; background: grey; text-align: center">
        This is a placeholder for the chart!
      </div>
    </div>
  </div>
</div>

{% include benchmarks/ann-deep-96.html %}

## GIST 960 (1.0M 960d vectors, cosine distance)

### Highlighted Configuration

{% include benchmarks/ann-gist-960-highlighted.html %}

### All Results

#### QPS vs Recall

<div class="container" style="margin-bottom: 40px">
  <div class="row">
    <div class="col-12">
      <div style="width:100%; line-height:1000%; background: grey; text-align: center">
        This is a placeholder for the chart!
      </div>
    </div>
  </div>
</div>

{% include benchmarks/ann-gist-960.html %}

# Lean more & FAQ

## What is the difference between latency and throughput?

TODO

## What is a p99 latency?

TODO

## What happens if I run with fewer or more CPU cores than on the example test machine?

TODO

## What are ef, efConstruction and maxConnections?

TODO

## I can't match the same latencies/throughput in my own setup, how can I debug this?

TODO

## Where can I find the scripts to run this benchmark myself?

TODO

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
