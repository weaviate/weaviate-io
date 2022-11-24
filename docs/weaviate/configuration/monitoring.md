---
title: Monitoring
sidebar_position: 12
# layout: layout-documentation
# bodyclass: ["page--guides", " "]
# solution: weaviate
# sub-menu: Configuration
# title: Monitoring
# intro: Use Weaviate's built-in monitoring for an observable setup in production.
# description: Weaviate supports Prometheus-compatible metrics for easy monitoring in production. See concurrent requests, request durations, database vitals, and much more.
# tags: ['Weaviate', 'operations', 'monitoring', 'observability']
# sidebar_position: 7
# open-graph-type: article
# toc: true
# redirect_from:
#   - /developers/weaviate/v1.14.1/configuration/monitoring.html
#   - /developers/weaviate/current/more-resources/monitoring.html
---

Weaviate can expose Prometheus-compatible metrics for monitoring. A standard
Prometheus/Grafana setup can be used to visualize metrics on various
dashboards.

Metrics can be used to measure request latencies, import
speed, time spent on vector vs object storage, memory usage, application usage,
and more.

## Configure Monitoring

### Enable within Weaviate

To tell Weaviate to collect metrics and expose them in a Prometheus-compatible
format, all that's required is to set the following environment variable:

```sh
PROMETHEUS_MONITORING_ENABLED=true
```

By default, Weaviate will expose the metrics at `<hostname>:2112/metrics`. You
can optionally change the port to a custom port using the following environment
variable:

```sh
PROMETHEUS_MONITORING_PORT=3456
```

### Scrape metrics from Weaviate

Metrics are typically scraped into a timeseries database, such as Prometheus.
How you consume metrics depends on your setup and environment. 


The [Weaviate examples repo contains a fully-preconfigured setup using
Prometheus, Grafana and some example
dashboards](https://github.com/semi-technologies/weaviate-examples/tree/main/monitoring-prometheus-grafana).
You can start up a full-setup including monitoring and dashboards with a single
command. In this setup the following components are used:

* Docker-compose is used to provide a fully-configured setup that can be
  started with a single command.
* Weaviate is configured to expose Prometheus metrics as outlined in the
  section above.
* A Prometheus instance is started with the setup and configured to scrape
  metrics from Weaviate every 15s.
* A Grafana instance is started with the setup and configured to use the
  Prometheus instance as a metrics provider. Additionally, it runs a dashboard
  provider that contains a few sample dashboards.

# Obtainable Metrics

The list of metrics that are obtainable through Weaviate's metric system is
constantly being expanded. Here are some noteworthy metrics and what they can
be used for. 

Typically metrics are quite granular, as they can always be aggregagated later
on. For example if the granularity is "shard", you could aggregate all "shard"
metrics of the same "class" to obtain a class metrics, or aggregate all metrics
to obtain the metric for the entire Weaviate instance.

| Metric | Description | Labels | Type | 
| --- | --- | --- | --- |
| `batch_durations_ms` | Duration of a single batch operation in ms. The `operation` label further defines what operation as part of the batch (e.g. object, inverted, vector) is being used. Granularity is a shard of a class.  | `operation`, `class_name`, `shard_name` | Histogram | 
| `batch_delete_durations_ms` | Duration of a batch delete in ms. The `operation` label further defines what operation as part of the batch delete is being measured. Granularity is a shard of a class | `class_name`, `shard_name` | Histogram | 
| `objects_durations_ms` | Duration of an individual object operation, such as `put`, `delete`, etc. as indicated by the `operation` label, also as part of a batch. The `step` label adds additional precisions to each `operation`. Granularity is a shard of a class. | `class_name`, `shard_name` | Histogram |
| `object_count` | Numbers of objects present. Granularity is a shard of a class | `class_name`, `shard_name` | Gauge |
| `async_operations_running` | Number of currently running async operations. The operation itself is defined through the `operation` label. | `operation`, `class_name`, `shard_name`, `path` | Gauge | 
| `lsm_active_segments` | Number of currently present segments per shard. Granularity is shard of a class. Grouped by `strategy`.| `strategy`, `class_name`, `shard_name`, `path` | Gauge |
| `lsm_bloom_filter_duration_ms` | Duration of a bloom filter operation per shard in ms. Granularity is shard of a class. Grouped by `strategy`. | `operation`, `strategy`, `class_name`, `shard_name` | Histogram |
| `lsm_segment_objects` | Number of entries per LSM segment by level. Granularity is shard of a class. Grouped by `strategy` and `level`. | `operation`, `strategy`, `class_name`, `shard_name`, `path`, `level` | Gauge |
| `lsm_segment_size` | Size of LSM segment by level and unit. | `strategy`, `class_name`, `shard_name`, `path`, `level`, `unit` | Gauge |
| `lsm_segment_count` | Number of segments by level | `strategy`, `class_name`, `shard_name`, `path`, `level` | Gauge |
| `vector_index_tombstones` | Number of currently active tombstones in the vector index. Will go up on each incoming delete and go down after a completed repair operation. | `class_name`, `shard_name`  | Gauge |
| `vector_index_tombstone_cleanup_threads` | Number of currently active threads for repairing/cleaning up the vector index after deletes have occurred. | `class_name`, `shard_name`  | Gauge |
| `vector_index_tombstone_cleaned` | Total number of deleted and removed vectors after repair operations. | `class_name`, `shard_name`  | Counter |
| `vector_index_operations` | Total number of mutating operations on the vector index. The operation itself is defined by the `operation` label. | `operation`, `class_name`, `shard_name` | Gauge |
| `vector_index_size` | The total capacity of the vector index. Typically larger than the number of vectors imported as it grows proactively. | `class_name`, `shard_name` | Gauge |
| `vector_index_maintenance_durations_ms` | Duration of a sync or async vector index maintenance operation. The operation itself is defined through the `operation` label. | `opeartion`, `class_name`, `shard_name` | Histogram |
| `vector_index_durations_ms` | Duration of regular vector index operation, such as insert or delete. The operation itself is defined through the `operation` label. The `step` label adds more granularity to each operation. | `operation`, `step`, `class_name`, `shard_name` | Histogram |
| `startup_durations_ms` | Duration of individual startup operations in ms. The operation itself is defined through the `operation` label. | `operation`, `class_name`, `shard_name` | Histogram |
| `startup_diskio_throughput` | Disk I/O throughput in bytes/s at startup operations, such as reading back the HNSW index or recovering LSM segments. The operation itself is defined by the `operation` label. | `operation`, `step`, `class_name`, `shard_name` | Histogram |


Extending Weaviate with new metrics is very easy and we'd be happy to receive
your contribution.

# Sample Dashboards

Weaviate does not ship with any dashboards by default, but here is a list of
dashboards being used by the various Weaviate teams, both during development,
and when helping users. These do not come with any support, but may still be
helpful. Treat them as insipiration to design your own dashboards which fit
your uses perfectly:

<!-- | Dashboard | Purpose | Preview |
| --- | --- | --- |
| [Importing Data Into Weaviate](https://github.com/semi-technologies/weaviate/blob/master/tools/dev/grafana/dashboards/importing.json) | Visualize speed of import operations (including its components, such as object store, inverted index, and vector index). | ![Importing Data into Weaviate](/img/weaviate-sample-dashboard-importing.png "Importing Data Into Weaviate") |
| [Object Operations](https://github.com/semi-technologies/weaviate/blob/master/tools/dev/grafana/dashboards/objects.json) | Visualize speed of whole object operations, such as GET, PUT, etc. | ![Objects](/img/weaviate-sample-dashboard-objects.png "Objects") |
| [Vector Index](https://github.com/semi-technologies/weaviate/blob/master/tools/dev/grafana/dashboards/vectorindex.json) | Visualize the current state, as well as operations on the HNSW vector index | ![Vector Index](/img/weaviate-sample-dashboard-vector.png "Vector Index") |
| [LSM Stores](https://github.com/semi-technologies/weaviate/blob/master/tools/dev/grafana/dashboards/lsm.json) | Get insights into the internals (including segments) of the various LSM stores within Weaviate. | ![LSM Store](/img/weaviate-sample-dashboard-lsm.png "LSM Store") |
| [Startup](https://github.com/semi-technologies/weaviate/blob/master/tools/dev/grafana/dashboards/startup.json) | Visualize the startup process, including recovery operations | ![Startup](/img/weaviate-sample-dashboard-startup.png "Vector Index") |
| [Usage](https://github.com/semi-technologies/weaviate/blob/master/tools/dev/grafana/dashboards/usage.json) | Obtain usage metrics, such as number of objects imported, etc.| ![Usage](/img/weaviate-sample-dashboard-usage.png "Usage") | -->

# More Resources

{% include docs-support-links.html %}
