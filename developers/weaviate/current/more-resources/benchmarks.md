---
layout: layout-documentation
bodyclass: ["page--guides", " "]
solution: weaviate
sub-menu: More resources
title: Weaviate Vector Search Benchmarks
intro: 
description: 
tags: ['Weaviate', 'performance', 'benchmarks', 'ann benchmarks']
menu-order: 5
open-graph-type: article
toc: true
---

# About this benchmark

TODO ETIENNE

# Results

The following sections each present the results of the benchmarks with one
particular dataset. For each dataset, there is a highlighted configuration. The
highlighted configuration is an opinionated pick about a good
recall/latency/throughput trade-off. The highlight sections will give you a
good overview of Weaviate's performance with the respective dataset. Below the
highlighted configuration, you can find alternative configurations. 

## SIFT1M (1M 128d vectors, L2 distance)

### Highlighted Configuration

<div class="highlighted-config-settings">
  <div>
    <div class="value">
      1.0M 
    </div>
    <div class="label">
      Dataset Size
    </div>
  </div>
  <div>
    <div class="value">
      128d
    </div>
    <div class="label">
      Vector Dimensions
    </div>
  </div>
  <div>
    <div class="value">
      l2
    </div>
    <div class="label">
      Distance Type
    </div>
  </div>
  <div>
    <div class="value">
      256
    </div>
    <div class="label">
      efConstruction
    </div>
  </div>
  <div>
    <div class="value">
      32
    </div>
    <div class="label">
      maxConnections
    </div>
  </div>
  <div>
    <div class="value">
      64
    </div>
    <div class="label">
      ef
    </div>
  </div>
</div>

<div class="highlighted-config-results">
  <div>
    <div class="value">
      99.31%
    </div>
    <div class="label">
      Recall@10
    </div>
  </div>
  <div>
    <div class="value">
      8633
    </div>
    <div class="label">
      QPS (Limit 10)
    </div>
  </div>
</div>
<div class="highlighted-config-results">
  <div>
    <div class="value">
      3.41ms
    </div>
    <div class="label">
      Mean Latency (Limit 10)
    </div>
  </div>
  <div>
    <div class="value">
      4.57ms
    </div>
    <div class="label">
      p99 Latency (Limit 10)
    </div>
  </div>
</div>

### All Results

#### QPS vs Recall

TODO ETIENNE: ADD CHART HERE!

#### Limit 1

| `efConstruction` | `maxConnections` | `ef` | Import time | Recall | QPS | Mean latency | p99 latency |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 64 | 8 | 64 | 186s | 90.91 % | 11445 | 2.59ms | 3.44ms |
| 512 | 8 | 64 | 286s | 95.74 % | 11391 | 2.6ms | 3.4ms |
| 128 | 16 | 64 | 204s | 98.52 % | 10443 | 2.83ms | 3.77ms |
| 512 | 16 | 64 | 314s | 98.69 % | 10287 | 2.87ms | 3.94ms |
| 128 | 32 | 64 | 203s | 98.92 % | 9760 | 3.03ms | 4.15ms |
| 256 | 32 | 64 | 243s | 99.0 % | 9462 | 3.13ms | 4.36ms |
| 512 | 32 | 64 | 351s | 99.22 % | 9249 | 3.2ms | 4.68ms |
| 512 | 32 | 128 | 351s | 99.29 % | 7155 | 4.14ms | 5.84ms |
| 128 | 32 | 256 | 203s | 99.34 % | 5694 | 5.21ms | 6.94ms |
| 256 | 32 | 512 | 243s | 99.37 % | 3578 | 8.27ms | 11.2ms |


#### Limit 10

| `efConstruction` | `maxConnections` | `ef` | Import time | Recall | QPS | Mean latency | p99 latency |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 128 | 8 | 64 | 183s | 93.41 % | 10237 | 2.88ms | 4.24ms |
| 512 | 8 | 64 | 286s | 94.03 % | 10179 | 2.89ms | 3.91ms |
| 128 | 16 | 64 | 204s | 98.01 % | 9441 | 3.11ms | 3.98ms |
| 512 | 16 | 64 | 314s | 98.44 % | 9361 | 3.14ms | 3.87ms |
| 128 | 32 | 64 | 203s | 98.83 % | 8905 | 3.31ms | 4.49ms |
| 128 | 64 | 64 | 200s | 98.95 % | 8748 | 3.37ms | 4.3ms |
| 256 | 32 | 64 | 243s | 99.31 % | 8633 | 3.41ms | 4.57ms |
| 512 | 32 | 64 | 351s | 99.48 % | 8443 | 3.49ms | 4.77ms |
| 512 | 64 | 64 | 363s | 99.63 % | 8129 | 3.63ms | 4.66ms |
| 512 | 32 | 128 | 351s | 99.7 % | 6711 | 4.4ms | 5.83ms |
| 512 | 64 | 128 | 363s | 99.77 % | 6365 | 4.63ms | 6.05ms |
| 512 | 16 | 256 | 314s | 99.77 % | 5847 | 5.06ms | 6.58ms |
| 128 | 32 | 256 | 203s | 99.8 % | 5379 | 5.5ms | 7.23ms |
| 128 | 64 | 256 | 200s | 99.82 % | 5232 | 5.67ms | 7.57ms |
| 256 | 32 | 256 | 243s | 99.89 % | 5067 | 5.82ms | 7.52ms |
| 512 | 32 | 256 | 351s | 99.91 % | 4866 | 6.05ms | 7.97ms |
| 512 | 64 | 256 | 363s | 99.92 % | 4207 | 6.83ms | 14.57ms |
| 512 | 32 | 512 | 351s | 99.93 % | 3303 | 8.97ms | 12.08ms |


#### Limit 100

| `efConstruction` | `maxConnections` | `ef` | Import time | Recall | QPS | Mean latency | p99 latency |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 256 | 16 | 64 | 227s | 92.47 % | 4784 | 6.03ms | 7.93ms |
| 128 | 16 | 128 | 204s | 94.37 % | 4309 | 6.71ms | 16.56ms |
| 512 | 16 | 128 | 314s | 95.13 % | 4266 | 6.76ms | 16.02ms |
| 256 | 32 | 128 | 243s | 97.63 % | 4239 | 6.83ms | 9.07ms |
| 512 | 32 | 128 | 351s | 98.1 % | 4177 | 6.94ms | 8.88ms |
| 512 | 64 | 128 | 363s | 98.68 % | 4052 | 7.18ms | 9.27ms |
| 512 | 16 | 256 | 314s | 98.76 % | 3580 | 8.08ms | 18.79ms |
| 128 | 32 | 256 | 203s | 99.12 % | 3415 | 8.5ms | 19.64ms |
| 512 | 32 | 256 | 351s | 99.68 % | 3389 | 8.61ms | 11.05ms |
| 512 | 64 | 256 | 363s | 99.8 % | 3189 | 9.14ms | 12.3ms |
| 128 | 32 | 512 | 203s | 99.82 % | 2641 | 11.11ms | 21.75ms |
| 128 | 64 | 512 | 200s | 99.84 % | 2559 | 11.45ms | 23.31ms |
| 256 | 32 | 512 | 243s | 99.92 % | 2501 | 11.67ms | 23.59ms |
| 512 | 32 | 512 | 351s | 99.95 % | 2411 | 12.14ms | 25.73ms |
| 512 | 64 | 512 | 363s | 99.97 % | 2265 | 12.94ms | 25.88ms |

<style type="text/css">
  .highlighted-config-settings {
    display:flex;
    max-width: 1024px;
    gap:10px;
    margin-bottom:15px;
  }

  .highlighted-config-settings > div {
    background: #efefef;
    text-align: center;
    padding:20px 20px 20px 20px;
    flex-grow:1;
  }

  .highlighted-config-settings > div > .label {
    font-size:1em;
  }

  .highlighted-config-settings > div > .value {
    font-size:3em;
  }

  .highlighted-config-results {
    display:flex;
    max-width: 1024px;
    gap:10px;
    margin-bottom:10px;
  }

  .highlighted-config-results > div {
    background: #efefef;
    text-align: center;
    color: #fa0171;
    padding:20px 20px 20px 20px;
    flex-grow:1;
  }

  .highlighted-config-results > div > .label {
    font-size:1.5em;
  }

  .highlighted-config-results > div > .value {
    font-size:6em;
  }

</style>
