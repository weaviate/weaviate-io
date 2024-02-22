---
title: REST - /v1/batch
sidebar_position: 13
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'batching']
---

import BeaconsRequireLocalhost from '/_includes/beacon-localhost.md';
import PythonV4BatchAPI from '/_includes/client-python-v4-batching-api.md';

## Batch create objects

For sending data objects to Weaviate in bulk.

### Performance

For best performance, we recommend using batching for insertion and deletion. Also consider that:

1. The vectorization module/tool may be acting as a bottleneck.
1. Avoid duplicate vectors for multiple data objects.
1. Object-level errors may occur [even if the batch request is successful](#error-handling).
1. If your import slows down after a particular number of objects (e.g. 2M), check to see if the [`vectorCacheMaxObjects`](../../config-refs/schema/vector-index.md#how-to-configure-hnsw) in your schema is larger than the number of objects. Also, see [this example](https://github.com/weaviate/semantic-search-through-wikipedia-with-weaviate/blob/d4711f2bdc75afd503ff70092c3c5303f9dd1b3b/step-2/import.py#L58-L59).

### Method and URL

```js
POST /v1/batch/objects[?consistency_level=ONE|QUORUM|ALL]
```

### Parameters

The URL supports an optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency) query parameter:

| Name | Location | Type | Description |
| ---- | -------- | ---- |------------ |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency): `ONE`, `QUORUM` (default) or `ALL`. |

The POST body requires the following field:

| Name | Type | Required | Description |
| ---- | ---- | ---- | ---- |
| `objects` | array of data objects | yes | Array of [objects](./objects.md#parameters-1) |

### Example request

import BatchObjects from '/_includes/code/batch.objects.mdx';

<BatchObjects/>


## Batch create references

For batch adding cross-references between data objects in bulk.

### Method and URL

```js
POST /v1/batch/references
```

### Parameters

The URL supports an optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency) query parameter:

| Name | Location | Type | Description |
| ---- | -------- | ---- |------------ |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency): `ONE`, `QUORUM` (default) or `ALL`. |

The POST body is an array of elements with the following fields:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `from` | Weaviate Beacon (long-form) | yes | The beacon, with the cross-reference property name at the end: `weaviate://localhost/{CollectionName}/{id}/{crefPropertyName}` |
| `to` | Weaviate Beacon (regular) | yes | The beacon, formatted as `weaviate://localhost/{CollectionName}/{id}` |

:::note
For backward compatibility, you can omit the collection name in the
short-form beacon format that is used for `to`. You can specify it as
`weaviate://localhost/{id}`. This is, however, considered deprecated and will be
removed with a future release, as duplicate IDs across collections could mean that
this beacon is not uniquely identifiable. For the long-form beacon - used as part
of `from` - you always need to specify the full beacon, including the reference
property name.
:::

### Example request

import BatchReferences from '/_includes/code/batch.references.mdx';

<BatchReferences/>

## Batch delete

You can use the HTTP verb `DELETE` on the `/v1/batch/objects` endpoint to delete all objects that match a particular expression.

The request body takes a single [where Filter](../graphql/filters.md#where-filter) and will delete all objects matched. It also returns the number of matched objects and potential errors. Note that there is a limit to the number of objects to be deleted at once using this filter.

### Maximum number of deletes per query

There is an upper limit (`QUERY_MAXIMUM_RESULTS`) to how many objects can be deleted using a single query. This protects against unexpected memory surges and very-long-running requests which would be prone to client-side timeouts or network interruptions.

Objects are deleted in the same order that they would be returned in an equivalent [Get query](../graphql/get.md). To delete more objects than the limit, run the same query multiple times until no objects are matched anymore.

The default `QUERY_MAXIMUM_RESULTS` value is 10,000. This may be configurable, e.g. in [the environment variables](../../config-refs/env-vars.md).


### Dry-run before deletion

Set the dry-run option to show which objects would be matched using the specified filter without deleting any objects. Depending on the configured verbosity, you will either receive a count of affected objects, or a list of IDs.

### Method and URL

```js
DELETE /v1/batch/objects[?consistency_level=ONE|QUORUM|ALL]
```

### Parameters

The URL supports an optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency) query parameter:

| Name | Location | Type | Description |
| ---- | -------- | ---- |------------ |
| `consistency_level` | query param | string | Optional [consistency level](../../concepts/replication-architecture/consistency.md#tunable-write-consistency): `ONE`, `QUORUM` (default) or `ALL`. |

The body requires the following fields:

| Name | Type | Required | Description |
| ---- | ---- | -------- | ----------- |
| `match` | object | yes | Object outlining how to find the objects to be deleted (see example below) |
| `output` | string | no | Optional verbosity level, `minimal` (default) or `verbose` |
| `dryRun` | bool | no | If true, objects will not be deleted yet, but merely listed. Defaults to `false`. |

#### A request body in detail

```yaml
{
  "match": {
    "class": "<CollectionName>",  # required
    "where": { /* where filter object */ },  # required
  },
  "output": "<output verbosity>",  # Optional, one of "minimal" or "verbose". Defaults to "minimal".
  "dryRun": <bool>  # Optional. If true, objects will not be deleted yet, but merely listed. Defaults to "false".
}
```

Possible values for `output`:

| Value | Effect |
| ----- | ------ |
| `minimal` | The result only includes counts. Information about objects is omitted if the deletes were successful. Only if an error occurred, will the object be described. |
| `verbose` | The result lists all affected objects with their ID and deletion status, including both successful and unsuccessful deletes. |


#### A response body in detail

```yaml
{
  "match": {
    "class": "<CollectionName>",        # matches the request
    "where": { /* where filter object */ },  # matches the request
  },
  "output": "<output verbosity>",  # matches the request
  "dryRun": <bool>,
  "results": {
    "matches": "<int>",            # how many objects were matched by the filter
    "limit": "<int>",              # the most amount of objects that can be deleted in a single query, matches QUERY_MAXIMUM_RESULTS
    "successful": "<int>",         # how many objects were successfully deleted in this round
    "failed": "<int>",             # how many objects should have been deleted but could not be deleted
    "objects": [{                  # one JSON object per weaviate object
      "id": "<id>",                # this successfully deleted object would be omitted with output=minimal
      "status": "SUCCESS",         # possible status values are: "SUCCESS", "FAILED", "DRYRUN"
      "error": null
    }, {
      "id": "<id>",                # this error object will always be listed, even with output=minimal
      "status": "FAILED",
      "errors": {
         "error": [{
             "message": "<error-string>"
         }]
      }
    }]
  }
}
```


### Example request

import BatchDeleteObjects from '/_includes/code/batch.delete.objects.mdx';

<BatchDeleteObjects/>

### Multi-tenancy

You can use batching in collections with [multi-tenancy](../../concepts/data.md#multi-tenancy) is enabled. For example, batch creation of objects works similarly to [single object creation](./objects.md#create-a-data-object), by passing the `tenant` parameter in the object body.

## Error handling

You can check if an error occurred, and of what kind.

Errors may occur on a batch request, for example when the connection to Weaviate is lost or when there is a mistake in any data objects.

A batch request will always return an HTTP `200` status code when the batch request was successful. This indicates that:
- The batch was successfully sent to Weaviate.
- There were no issues with the connection or processing of the batch.
- The request was not malformed (`4xx` status code).

However, a `200` status code does not guarantee that each batch item has been added/created. For example, adding an object to the batch that is in conflict with the schema (for example a non-existing collection name) will cause an error.

Accordingly, we recommend you check the response body for errors.


## Python client library

The Weaviate Python client library provides additional functionalities for batch imports. For example, the latest Python client library supports various batching modes, as well as improved error handling.

Please refer to the [client documentation](/developers/weaviate/client-libraries/python) for more detail.

<PythonV4BatchAPI/>

## Notes

<BeaconsRequireLocalhost />

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
