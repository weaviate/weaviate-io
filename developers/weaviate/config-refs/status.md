---
title: Status
sidebar_position: 70
image: og/docs/configuration.jpg
# tags: ['status', 'reference', 'configuration']
---

Various cluster statuses are available in Weaviate.

## Liveness

The `live` endpoint checks if the application is alive. You can use it for a Kubernetes liveness probe.

#### Usage

The endpoint accepts a `GET` request:

```js
GET /v1/.well-known/live
```

The endpoint returns HTTP status code `200` if the application is able to respond to HTTP requests.

#### Example

import WellKnownLive from '/_includes/code/wellknown.live.mdx';

<WellKnownLive/>

The endpoint returns HTTP status code `200` if the application is able to respond to HTTP requests.

## Readiness

The `ready` endpoint checks if the application is ready to receive traffic. You can use it for Kubernetes readiness probe.

#### Usage

The discovery endpoint accepts a `GET` request:

```js
GET /v1/.well-known/ready
```

The endpoint returns HTTP status code `200` if the application is able to respond to HTTP requests. If the application is currently unable to serve traffic, the endpoint returns HTTP status code `503`.

If the application is unavailable and you have horizontal replicas of Weaviate that can receive traffic, redirect traffic to one of the replicas.

#### Example

import WellknownReady from '/_includes/code/wellknown.ready.mdx';

<WellknownReady/>

## Schema synchronization

The `v1//schema/cluster-status` endpoint displays the status of the schema synchronization. The endpoint returns the following fields:

- `healthy`: The status of the schema synchronization.
- `hostname`: The hostname of the Weaviate instance.
- `ignoreSchemaSync`: Whether to ignore the cluster check at startup (for recovery from an out-of-sync situation).
- `nodeCount`: The number of nodes in the cluster.

Example response:

```js
{
    "healthy": true,
    "hostname": "node1",
    "ignoreSchemaSync": false,
    "nodeCount": 3
}
```

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />


