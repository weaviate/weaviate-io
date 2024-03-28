---
title: Objects
sidebar_position: 10
image: og/docs/configuration.jpg
# tags: ['Data types']
---

### `objects` vs `batch`

:::tip
The `objects` endpoint is meant for individual object creations.
:::

If you plan on importing a large number of objects, it's much more efficient to use the `/v1/batch` endpoint. Otherwise, sending multiple single requests sequentially would incur a large performance penalty:

1. Each sequential request would be handled by a single thread server-side while most of the server resources are idle. In addition, if you only send the second request once the first has been completed, you will wait for a lot of network overhead.
1. It's much more efficient to parallelize imports. This will minimize the connection overhead and use multiple threads server-side for indexing.
1. You do not have to do the parallelization yourself, you can use the `/v1/batch` endpoint for this. Even if you are sending batches from a single client thread, the objects within a batch will be handled by multiple server threads.
1. Import speeds, especially for large datasets, will drastically improve when using the batching endpoint.

:::note Idempotence of POST requests in `objects` and `batch`
The idempotence behavior differs between these two endpoints. POST /batch/objects is idempotent, and will overwrite any existing object given an id. POST /objects will fail if an id is provided which already exists in the class.

To update an existing object with the `objects` endpoint, use the `PUT` or `PATCH` method.
:::

## `classification` - additional object fields

| Field name | Data type | Required `include` or `additional` field | Description |
| ---------- | --------- | ---------------------------------------- | ----------- |
| `properties` > `{crefPropertyName}` > `classification` > `closestLosingDistance` | float | `classification` | The lowest distance of a neighbor in the losing group. Optional. If `k` equals the size of the winning group, there is no losing group. |
| `properties` > `{crefPropertyName}` > `classification` > `closestOverallDistance` | float | `classification` | The lowest distance of any neighbor, regardless of whether they were in the winning or losing. |
| `properties` > `{crefPropertyName}` > `classification` > `closestWinningDistance` | float | `classification` | Closest distance of a neighbor from the winning group. |
| `properties` > `{crefPropertyName}` > `classification` > `losingCount` | integer | `classification` | Size of the losing group, can be 0 if the winning group size equals `k`. |
| `properties` > `{crefPropertyName}` > `classification` > `meanLosingDistance` | float | `classification` | The mean distance of the losing group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. |
| `properties` > `{crefPropertyName}` > `classification` > `meanWinningDistance` | float | `classification` | The mean distance of the winning group. It is a normalized distance (between 0 and 1), where 0 means equal and 1 would mean a perfect opposite. |
| `properties` > `{crefPropertyName}` > `classification` > `overallCount` | integer | `classification` | Overall neighbors checked as part of the classification. In most cases this will equal `k`, but could be lower than `k` - for example if not enough data was present. |
| `properties` > `{crefPropertyName}` > `classification` > `winningCount` | integer | `classification` | Size of the winning group, a number between 1 and `k`. |
| `classification` > `basedOn` | string |  `classification` | The property name where the classification was based on. |
| `classification` > `classifiedFields` | string |  `classification` | The classified property. |
| `classification` > `completed` | timestamp |  `classification` | The time of classification completion. |
| `classification` > `id` | uuid |  `classification` | The classification id. |
| `classification` > `scope` | list of strings |  `classification` | The initial fields to classify. |

## `featureProjection` - additional object fields

| Field name | Data type | Required `include` or `additional` field | Description |
| ---------- | --------- | ---------------------------------------- | ----------- |
| `featureProjection` > `vector` | list of floats |  `featureProjection` | The 2D or 3D vector coordinates of the feature projection. |

