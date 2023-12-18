---
title: REST - /v1/batch
sidebar_position: 13
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'batching']
---

import BeaconsRequireLocalhost from '/_includes/beacon-localhost.md';

## Batch create objects

For sending data objects to Weaviate in bulk.

:::tip Multi-tenancy
The `batch` endpoint supports classes where [multi-tenancy](../../concepts/data.md#multi-tenancy) is enabled. For example, batch creation of objects works similarly to [single object creation](./objects.md#create-a-data-object), by passing the `tenant` parameter in the object body.
:::

### Performance

:::tip
Import speeds, especially for large datasets, will drastically improve when using the batching endpoint.
:::

A few points to bear in mind:

1. If you use a vectorizer that improves with GPU support, make sure to enable it if possible, as it will drastically improve import.
1. Avoid duplicate vectors for multiple data objects.
1. Handle your errors. If you ignore them, it might lead to significant delays on import.
1. If your import slows down after a particular number of objects (e.g. 2M), check to see if the [`vectorCacheMaxObjects`](../../config-refs/schema/vector-index.md#how-to-configure-hnsw) in your schema is larger than the number of objects. Also, see [this example](https://github.com/weaviate/semantic-search-through-wikipedia-with-weaviate/blob/d4711f2bdc75afd503ff70092c3c5303f9dd1b3b/step-2/import.py#L58-L59).
1. There are ways to improve your setup when using vectorizers, as we've shown in the Wikipedia demo dataset. Subscribe to our [Announcements category on the forum](https://forum.weaviate.io/c/announcements/7) to keep up-to-date as we publish more on this topic.

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

<BeaconsRequireLocalhost />

import BatchObjects from '/_includes/code/batch.objects.mdx';

<BatchObjects/>

## Batch create objects with the Python Client

Specific documentation for the Python client can be found at [weaviate-python-client.readthedocs.io](https://weaviate-python-client.readthedocs.io/en/stable/weaviate.batch.html). Learn more about different types of batching and tip&tricks on the [Weaviate Python client page](/developers/weaviate/client-libraries/python.md).


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
| `from` | Weaviate Beacon (long-form) | yes | The beacon, with the cross-reference property name at the end: `weaviate://localhost/{ClassName}/{id}/{crefPropertyName}` |
| `to` | Weaviate Beacon (regular) | yes | The beacon, formatted as `weaviate://localhost/{ClassName}/{id}` |

<BeaconsRequireLocalhost />

:::note
For backward compatibility, you can omit the class name in the
short-form beacon format that is used for `to`. You can specify it as
`weaviate://localhost/{id}`. This is, however, considered deprecated and will be
removed with a future release, as duplicate IDs across classes could mean that
this beacon is not uniquely identifiable. For the long-form beacon - used as part
of `from` - you always need to specify the full beacon, including the reference
property name.
:::

### Example request

import BatchReferences from '/_includes/code/batch.references.mdx';

<BatchReferences/>


For detailed information and instructions of batching in Python, see the [weaviate.batch.Batch](https://weaviate-python-client.readthedocs.io/en/latest/weaviate.batch.html#weaviate.batch.Batch) documentation.

## Batch delete

You can use the HTTP verb `DELETE` on the `/v1/batch/objects` endpoint to delete all objects that match a particular expression. To determine if an object is a match, [a where-Filter is used](../graphql/filters.md#where-filter). The request body takes a single filter, but will delete all objects matched. It returns the number of matched objects as well as any potential errors. Note that there is a limit to how many objects can be deleted at once using this filter, which is explained below.

### Maximum number of deletes per query

There is an upper limit to how many objects can be deleted using a single query. This protects against unexpected memory surges and very-long-running requests which would be prone to client-side timeouts or network interruptions. If a filter matches many objects, only the first `n` elements are deleted. You can configure `n` by setting `QUERY_MAXIMUM_RESULTS` in [Weaviate's config](../../config-refs/env-vars.md). The default value is 10,000. Objects are deleted in the same order that they would be returned in using the same filter in a [Get query](../graphql/get.md). To delete more objects than the limit, run the same query multiple times, until no objects are matched anymore.


### Dry-run before deletion

You can use the dry-run option to see which objects would be deleted using your specified filter, without deleting any objects yet. Depending on the configured verbosity, you will either receive the total count of affected objects, or a list of the affected IDs.

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
    "class": "<ClassName>",  # required
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
    "class": "<ClassName>",        # matches the request
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

## Error handling

When sending a batch request to your Weaviate instance, it could be the case that an error occurs. This can be caused by several reasons, for example that the connection to Weaviate is lost or that there is a mistake in a single data object that you are trying to add.

You can check if an error occurred, and of what kind.

A batch request will always return an HTTP `200` status code when the batch request was successful. That means that the batch was successfully sent to Weaviate, and there were no issues with the connection or processing of the batch, and the request was not malformed (`4xx` status code). However, with a `200` status code, there might still be individual failures of the data objects which are not contained in the response. Thus, a `200` status code does not guarantee that each batch item has been added/created. An example of an error on an individual data object that might be unnoticed by sending a batch request without checking the individual results is this: adding an object to the batch that is in conflict with the schema (for example a non-existing class name).

The following Python code can be used to handle errors on individual data objects in the batch.

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

def check_batch_result(results: dict):
  """
  Check batch results for errors.

  Parameters
  ----------
  results : dict
      The Weaviate batch creation return value, i.e. returned value of the client.batch.create_objects().
  """
  if results is not None:
    for result in results:
      if 'result' in result and 'errors' in result['result']:
        if 'error' in result['result']['errors']:
          print("We got an error!", result)

object_to_add = {
    "name": "Jane Doe",
    "writesFor": [{
        "beacon": "weaviate://localhost/f81bfe5e-16ba-4615-a516-46c2ae2e5a80"
    }]
}

client.batch.configure(
  # `batch_size` takes an `int` value to enable auto-batching
  # (`None` is used for manual batching)
  batch_size=100,
  # dynamically update the `batch_size` based on import speed
  dynamic=False,
  # `timeout_retries` takes an `int` value to retry on time outs
  timeout_retries=3,
  # checks for batch-item creation errors
  # this is the default in weaviate-client >= 3.6.0
  callback=check_batch_result,
  consistency_level=weaviate.data.replication.ConsistencyLevel.ALL,  # default QUORUM
)

with client.batch as batch:
  batch.add_data_object(object_to_add, "Author", "36ddd591-2dee-4e7e-a3cc-eb86d30a4303", vector=[1,2])
  # lets force an error, adding a second object with unmatching vector dimensions
  batch.add_data_object(object_to_add, "Author", "cb7d0da4-ceaa-42d0-a483-282f545deed7", vector=[1,2,3])
```

This can also be applied to adding references in batch. Note that sending batches, especially references, skips some validations at the object and reference level. Adding this validation on single data objects like above makes it less likely for errors to go undiscovered.



import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
