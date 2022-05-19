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

This benchmark is designed to illustrate Weaviate's perfomance for a range of differet scenarios.
The below [results table](TODO), allows you to find a sample dataset that is closest to your
production load and draw conclusions about what to expect from Weaviate in a
production setting.

Note, this is not a comparative benchmark that runs Weaviate against competing solutions.

This benchmark is produced using [open-source scripts](TODO), so you can reproduce it
yourself.

### What is being measured?

<!-- I am not sure if I understand the explanation of what this benchmark is measuring.
Especially, that we haven't mentioned the requests first.

Maybe we could start with:
For each benchmark test, we pick paremeters of:
- efConstruction - info
- maxConnections	 - info
- ef - info

For each we've run 10000 of requests and we measured:

- name1 - a short description
- name2 - a short description
- ...

By request, we mean:
An unfiltered vector search across the entire dataset for the given test.
 -->

Each request represents an unfiltered vector search across the entire dataset mentioned.  It measures the end-to-end time that you our your users would also experience. In particular these means:

* Each request time includes the network overhead for sending the results over the
  wire. In the test setup, the client and server machines were located in the
  same VPC.
* Each request includes retrieving all the matched object from disk. This is
  the major difference towards `ann-benchmarks` where the embedded libraries
  only return the matched IDs.

## Benchmark Setup

### Hardware

<!-- Could we add a little graphic that visually illustratest the hardware setup? -->

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
the configuration parameters.

### Experiment Setup

The selection of datasets is modelled after [ann-benchmarks](https://github.com/erikbern/ann-benchmarks). The same test
queries are used to test speed, throughput and recall. The provided ground
thruths are used to calculate the recall.

# Results

<!-- TODO:
* Move imports somewhere else
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
