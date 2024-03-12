---
title: Python
sidebar_position: 10
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library', 'experimental']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/client-libraries/python_v4.py';

## Overview

This page broadly covers the Weaviate Python client (`v4` release). For usage information not specific to the Python client, such as code examples, see the relevant pages in the [Weaviate documentation](../../index.md). Some frequently used sections are [listed here](#code-examples--resources) for convenience.

## Installation

:::tip Migrating from `v3` to `v4`
If you are migrating from the `v3` client to the `v4`, please see this [dedicated guide](./v3_v4_migration.md).
:::

The Python client library is developed and tested using Python 3.8+. It is available on [PyPI.org](https://pypi.org/project/weaviate-client/), and can be installed with:

```bash
pip install -U weaviate-client  # For beta versions: `pip install --pre -U "weaviate-client==4.*"`
```

### Requirements

#### gRPC

The `v4` client uses remote procedure calls (RPCs) under-the-hood. Accordingly, a port for gRPC must be open to your Weaviate server.

<details>
  <summary>docker-compose.yml example</summary>

If you are running Weaviate with Docker, you can map the default port (`50051`) by adding the following to your `docker-compose.yml` file:

```yaml
    ports:
     - 8080:8080
     - 50051:50051
```

</details>

#### WCS compatibility

The free (sandbox) tier of WCS is compatible with the `v4` client as of 31 January, 2024. Sandboxes created before this date will not be compatible with the `v4` client.

#### Weaviate server version

The `v4` client requires Weaviate `1.23.7` or higher. Generally, we encourage you to use the latest version of the Python client *and* the Weaviate server.

## High-level ideas

### Helper classes

The client library provides numerous additional Python classes to provide IDE assistance and typing help. You can import them individually, like so:

```
from weaviate.classes.config import Property, ConfigFactory
from weaviate.classes.data import DataObject
from weaviate.classes.query import Filter
```

But it may be convenient to import the whole set of classes like this. You will see both usage styles in our documentation.

```
import weaviate.classes as wvc
```

For discoverability, the classes are arranged into submodules.

<details>
  <summary>See the list of submodules</summary>

| Module                      | Description                         |
|-----------------------------|-------------------------------------|
| `weaviate.classes.config`   | Collection creation / modification  |
| `weaviate.classes.data`     | CUD operations                      |
| `weaviate.classes.query`    | query/search operations             |
| `weaviate.classes.aggregate`| aggregate operations                |
| `weaviate.classes.generic`  | generics                            |
| `weaviate.classes.init`     | initialization                      |
| `weaviate.classes.tenants`  | tenants                             |
| `weaviate.classes.batch`    | batch operations                    |

</details>

### Connection termination

You must ensure your client connections are closed. You can use `client.close()`, or use a context manager to close client connections for you.

#### `client.close()` with `try` / `finally`

This will close the client connection when the `try` block is complete (or if an exception is raised).

<FilteredTextBlock
  text={PythonCode}
  startMarker="# TryFinallyExample"
  endMarker="# END TryFinallyExample"
  language="py"
/>

#### Context manager

This will close the client connection when you leave the `with` block.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# ClientContextManagerExample"
  endMarker="# END ClientContextManagerExample"
  language="py"
/>

## Instantiate a client

There are multiple ways to connect to your Weaviate instance. To instantiate a client, use one of these styles:

- [Python client v4 helper methods](#python-client-v4-helper-methods)
- [Python client v4 explicit connection](#python-client-v4-explicit-connection)
- [Python client v3 style connection](#python-client-v3-style-connection)

### Python client v4 helper functions

- `weaviate.connect_to_wcs()`
- `weaviate.connect_to_local()`
- `weaviate.connect_to_embedded()`
- `weaviate.connect_to_custom()`

<Tabs groupId="languages">
<TabItem value="wcs" label="WCS">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# WCSInstantiation"
  endMarker="# END WCSInstantiation"
  language="py"
/>

</TabItem>
<TabItem value="local" label="Local">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# LocalInstantiationBasic"
    endMarker="# END LocalInstantiationBasic"
    language="py"
  />

</TabItem>
<TabItem value="embedded" label="Embedded">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# EmbeddedInstantiationBasic"
  endMarker="# END EmbeddedInstantiationBasic"
  language="py"
/>

</TabItem>
<TabItem value="custom" label="Custom">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# CustomInstantiationBasic"
  endMarker="# END CustomInstantiationBasic"
  language="py"
/>

</TabItem>
</Tabs>

The `v4` client helper functions provide some optional parameters to customize your client.

- [Specify external API keys](#external-api-keys)
- [Specify connection timeout values](#timeout-values)
- [Specify authentication details](#authentication)

#### External API keys

To add API keys for services such as Cohere or OpenAI, use the `headers` parameter.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# LocalInstantiationWithHeaders"
  endMarker="# END LocalInstantiationWithHeaders"
  language="py"
/>

#### Timeout values

Set timeout values, in seconds, for the client.

The syntax is: `timeout=(<connection timeout>, <read timeout>)`

<FilteredTextBlock
  text={PythonCode}
  startMarker="# LocalInstantiationWithTimeout"
  endMarker="# END LocalInstantiationWithTimeout"
  language="py"
/>

:::tip Timeouts on `generate` (RAG) queries

If you are seeing errors while using the `generate` submodule, try increasing the timeout values (e.g. to `(60, 120)`). The `generate` submodule uses a large language model to generate text.
<br/>

Accordingly, the speed of the `generate` submodule is dependent on the speed of the language model (and any API that is serving the language model). Increasing the timeout values will allow the client to wait longer for the language model to respond.
:::

#### Authentication

Some of the `connect` helper functions take authentication credentials. For example, `connect_to_wcs` accepts a WCS API key or OIDC authentication credentials.

<Tabs groupId="languages">
<TabItem value="api_key" label="API Key">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# WCSInstantiation"
    endMarker="# END WCSInstantiation"
    language="py"
  />

</TabItem>
<TabItem value="oidc" label="OIDC Credentials">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# WCSwOIDCInstantiation"
  endMarker="# END WCSwOIDCInstantiation"
  language="py"
/>

</TabItem>
</Tabs>

For OIDC authentication with the Client Credentials flow, use the `AuthClientCredentials` class.

For OIDC authentication with the Refresh Token flow, use the `AuthBearerToken` class.

If the helper functions do not provide the customization you need, use the [`WeaviateClient`](#python-client-v4-explicit-connection) class to instantiate the client.


### Python client v4 explicit connection

If you need to pass custom parameters, use the `weaviate.WeaviateClient` class to instantiate a client. This is the most flexible way to instantiate the client object.

Please note that when directly instantiating a connection, you must connect to the server manually by calling the `.connect()` method.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# DirectInstantiationFull"
  endMarker="# END DirectInstantiationFull"
  language="py"
/>

### Python client v3 API

To create an older, `v3` style `Client` object, use the `weaviate.Client` class. This method available for backwards compatibility. Where possible, use a client v4 connection.

To create a `v3` style client, refer to the [`v3` client documentation](./python_v3.md).

### Initial connection checks

When establishing a connection to the Weaviate server, the client performs a series of checks. These includes checks for the server version, and to make sure that the REST and gRPC ports are available.

You can set `skip_init_checks` to `True` to skip these checks.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# LocalInstantiationSkipChecks"
  endMarker="# END LocalInstantiationSkipChecks"
  language="py"
/>

You may wish to do this to maximize performance, or as a temporary measure if you are experiencing issues with the checks. However, we recommend leaving `skip_init_checks` as `False` in most cases.

:::note Open GitHub issue for configurable timeout
There is an [open issue](https://github.com/weaviate/weaviate-python-client/issues/899) to make the initial checks timeout configurable. Please upvote this issue if you would like to see this feature.
:::

## Batching

The `v4` client offers two ways to perform batch imports. From the client object directly, or from the collection object.

We recommend using the collection object to perform batch imports of single collections or tenants. If you are importing objects across many collections, such as in a multi-tenancy configuration, using `client.batch` may be more convenient.

### Batch sizing

There are three methods to configure the batching behavior. They are `dynamic`, `fixed_size` and `rate_limit`.

| Method | Description | When to use |
| :-- | :-- | :-- |
| `dynamic` | The batch size and the number of concurrent requests are dynamically adjusted on-the-fly during import, depending on the server load. | Recommended starting point. |
| `fixed_size` | The batch size and number of concurrent requests are fixed to sizes specified by the user. | When you want to specify fixed parameters. |
| `rate_limit` | The number of objects sent to Weaviate is rate limited (specified as n_objects per minute). | When you want to avoid hitting third-party vectorization API rate limits. |

#### Usage

We recommend using a context manager as shown below.

These methods return completely localized context managers. Accordingly, attributes of one batch such as `failed_objects` and `failed_references` will not be included in any subsequent calls.

<Tabs groupId="languages">
<TabItem value="dynamic" label="Dynamic">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START BatchDynamic"
    endMarker="# END BatchDynamic"
    language="py"
  />

</TabItem>
<TabItem value="fizedsize" label="Fixed Size">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START BatchFixedSize"
    endMarker="# END BatchFixedSize"
    language="py"
  />

</TabItem>
<TabItem value="ratelimit" label="Rate limited">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START BatchRateLimit"
  endMarker="# END BatchRateLimit"
  language="py"
/>

</TabItem>
</Tabs>

In the batching process, if the background thread responsible for sending the batches raises an exception this is now re-raised in the main thread.

### Error handling

During a batch import, any failed objects or references will be stored for retrieval. Additionally, a running count of failed objects and references is maintained.

The counter can be accessed through `batch.number_errors` within the context manager.

A list of failed objects can be obtained through `batch.failed_objects` and a list of failed references can be obtained through `batch.failed_references`.

Note that these lists are reset when a batching process is initialized. So make sure to retrieve them before starting a new batch import block.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START BatchErrorHandling"
  endMarker="# END BatchErrorHandling"
  language="py"
/>

## Working with collections

### Instantiate a collection

You can instantiate a collection object by creating a collection, or by retrieving an existing collection.

<Tabs groupId="languages">
<TabItem value="create" label="Create a collection">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START CreateCollectionExample"
    endMarker="# END CreateCollectionExample"
    language="py"
  />

</TabItem>
<TabItem value="crossref" label="With cross-references">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START CreateCollectionWithRefsExample"
    endMarker="# END CreateCollectionWithRefsExample"
    language="py"
  />

</TabItem>
<TabItem value="get" label="Get a collection">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START GetCollectionExample"
  endMarker="# END GetCollectionExample"
  language="py"
/>

</TabItem>
</Tabs>

### Collection submodules

Operations in the `v4` client are grouped into submodules. The key submodules for interacting with objects are:

- `data`: CUD operations (read operations are in `query`)
- `batch`: Batch import operations
- `query`: Search operations
- `generate`: Retrieval augmented generation operations
    - Build on top of `query` operations
- `aggregate`: Aggregation operations

### `data`

The `data` submodule contains all object-level CUD operations, including:

- `insert` for creating objects.
    - This function takes the object properties as a dictionary.
- `insert_many` for batch creating multiple objects.
    - This function takes the object properties as a dictionary or as a `DataObject` instance.
- `update` for updating objects (for `PATCH` operations).
- `replace` for replacing objects (for `PUT` operations).
- `delete_by_id` for deleting objects by ID.
- `delete_many` for batch deletion.
- `reference_xxx` for reference operations, including `reference_add`, `reference_add_many`, `reference_update` and `reference_delete`.

See some examples below. Note that each function will return varying types of objects.

:::caution `insert_many` sends one request
As of `4.4b1`, `insert_many` sends one request for the entire function call. A future release may
send multiple requests as batches.
:::

<Tabs groupId="languages">
<TabItem value="insert" label="Insert">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START CreateObjectExample"
    endMarker="# END CreateObjectExample"
    language="py"
  />

</TabItem>
<TabItem value="insert_many" label="Insert many">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START InsertManyExample"
    endMarker="# END InsertManyExample"
    language="py"
  />

</TabItem>
<TabItem value="delete_by_id" label="Delete by id">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START DeleteObjectExample"
  endMarker="# END DeleteObjectExample"
  language="py"
/>

</TabItem>
<TabItem value="delete_many" label="Delete many">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START DeleteManyExample"
  endMarker="# END DeleteManyExample"
  language="py"
/>

</TabItem>
</Tabs>

#### `insert_many` with DataObjects

The `insert_many` function takes a list of `DataObject` instances or a list of dictionaries. This is useful if you want to specify additional information to the properties, such as cross-references, object uuid, or a custom vector.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START InsertManyDataObjectExample"
  endMarker="# END InsertManyDataObjectExample"
  language="py"
/>

#### Cross-reference creation

Cross-references should be added under a `references` parameter in the relevant function/method, with a structure like:

```python
{
    "<REFERENCE_PROPERTY_NAME>": "<TARGET_UUID>"
}
```

For example:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START InsertManyDataObjectReferenceExample"
  endMarker="# END InsertManyDataObjectReferenceExample"
  language="py"
/>

Using the `properties` parameter to add references is deprecated and will be removed in the future.

### `query`

The `query` submodule contains all object-level query operations, including `fetch_objects` for retrieving objects without additional search parameters, `bm25` for keyword search,  `near_<xxx>` for vector search operators, `hybrid` for hybrid search and so on.

These queries return a `_QueryReturn` object, which contains a list of `_Object` objects.

<Tabs groupId="languages">
<TabItem value="bm25" label="BM25">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START BM25QueryExample"
    endMarker="# END BM25QueryExample"
    language="py"
  />

</TabItem>
<TabItem value="near_text" label="Near text">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START NearTextQueryExample"
    endMarker="# END NearTextQueryExample"
    language="py"
  />

</TabItem>
</Tabs>

#### Queries with custom returns

You can further specify:
- Whether to include the object vector (via `include_vector`)
    - Default is `False`
- Which properties to include (via `return_properties`)
    - All properties are returned by default
- Which references to include (via `return_references`)
- Which metadata to include
    - No metadata is returned by default

Each object includes its UUID as well as all properties by default.

For example:

<Tabs groupId="languages">
<TabItem value="default" label="Default">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START BM25QueryDefaultReturnsExample"
    endMarker="# END BM25QueryDefaultReturnsExample"
    language="py"
  />

</TabItem>
<TabItem value="custom_return" label="Customized returns">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START BM25QueryCustomReturnsExample"
    endMarker="# END BM25QueryCustomReturnsExample"
    language="py"
  />

</TabItem>
</Tabs>

#### `query` + group by

Results of a query can be grouped by a property as shown here.

The results are organized by both their individual objects as well as the group.
- The `objects` attribute is a list of objects, each containing a `belongs_to_group` property to indicate which group it belongs to.
- The `group` attribute is a dictionary with each key indicating the value of the group, and the value being a list of objects belonging to that group.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START QueryGroupbyExample"
  endMarker="# END QueryGroupbyExample"
  language="py"
/>

### `generate`

The RAG / generative search functionality is a two-step process involving a search followed by prompting a large language model. Therefore, function names are shared across the `query` and `generate` submodules, with additional parameters available in the `generate` submodule.

<Tabs groupId="languages">
<TabItem value="generate" label="Generate">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START BM25GenerateExample"
  endMarker="# END BM25GenerateExample"
  language="py"
/>

</TabItem>
<TabItem value="query" label="Query">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START BM25QueryExample"
    endMarker="# END BM25QueryExample"
    language="py"
  />

</TabItem>
</Tabs>

Outputs of the `generate` submodule queries include `generate` attributes at the top level for the `grouped_task` tasks, while `generate` attributes attached with each object contain results from `single_prompt` tasks.

### `aggregate`

To use the `aggregate` submodule, supply one or more ways to aggregate the data. For example, they could be by a count of objects matching the criteria, or by a metric aggregating the objects' properties.

<Tabs groupId="languages">
<TabItem value="count" label="Count">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START AggregateCountExample"
    endMarker="# END AggregateCountExample"
    language="py"
  />

</TabItem>
<TabItem value="metric" label="Metric">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START AggregateMetricExample"
    endMarker="# END AggregateMetricExample"
    language="py"
  />

</TabItem>
</Tabs>

#### `aggregate` + group by

Results of a query can be grouped and aggregated as shown here.

The results are organized the group, returning a list of groups.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START AggregateGroupbyExample"
  endMarker="# END AggregateGroupbyExample"
  language="py"
/>

### Collection iterator (`cursor` API)

The `v4` client adds a Pythonic iterator method for each collection. This wraps the `cursor` API and allows you to iterate over all objects in a collection.

This example fetches all the objects, and their properties, from the `questions` collection.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# IteratorBasic"
  endMarker="# END IteratorBasic"
  language="py"
/>

You can specify which properties to retrieve. This example fetches the `answer` property.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# IteratorAnswerOnly"
  endMarker="# END IteratorAnswerOnly"
  language="py"
/>

You can also specify which metadata to retrieve. This example fetches the `creation_time` metadata.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# IteratorWithMetadata"
  endMarker="# END IteratorWithMetadata"
  language="py"
/>

Since the `cursor` API requires the object UUID for indexing, the `uuid` metadata is always retrieved.

You can also get the size of the collection by using the built-in `len` function.

<FilteredTextBlock
    text={PythonCode}
    startMarker="# START LenCollectionExample"
    endMarker="# END LenCollectionExample"
    language="py"
/>

### Data model and generics

You can choose to provide a generic type to a query or data operation. This can be beneficial as the generic class is used to extract the return properties and statically type the response.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GenericsExample"
  endMarker="# END GenericsExample"
  language="py"
/>

## Migration guides

:::tip Migrating from `v3` to `v4`
If you are migrating from the `v3` client to the `v4`, please see this [dedicated guide](./v3_v4_migration.md).
:::

### Beta releases

<details>
  <summary>Migration guides - beta releases</summary>

#### Changes in `v4.4b9`

##### `weaviate.connect_to_x` methods

The `timeout` argument has been moved into the `additional_config` argument that takes the class `weaviate.config.AdditionalConfig` as input.

##### Queries

All optional arguments to methods in the `query` namespace now are enforced as keyword arguments.

There is now runtime logic for parsing query arguments enforcing the correct type.

##### Batch processing

Introduction of three distinct algorithms using different batching styles under-the-hood:
- `client.batch.dynamic()`
- `client.batch.fixed_size()`
- `client.batch.rate_limit()`

`client.batch.dynamic() as batch` is a drop-in replacement for the previous `client.batch as batch`, which is now deprecated and will be removed on release.
```python
with client.batch.dynamic() as batch:
  ...
```
is equivalent to:
```python
with client.batch as batch:
  ...
```

`client.batch.fixed_size() as batch` is a way to configure your batching algorithm to only use a fixed size.
```python
with client.batch.dynamic() as batch:
  ...
```
is equivalent to:
```python
client.batch.configure_fixed_size()
with client.batch as batch:
  ...
```

`client.batch.rate_limit() as batch` is a new way to help avoid hitting third-party vectorization API rate limits. By specifying `request_per_minute` in the
`rate_limit()` method, you can force the batching algorithm to send objects to Weaviate at the speed your third-party API is capable of processing objects.

These methods now return completely localized context managers. This means that `failed_objects` and `failed_references` of one batch won't be included
in any subsequent calls.

Finally, if the background thread responsible for sending the batches raises an exception this is now re-raised in the main thread rather than silently erroring.

##### Filters

The argument `prop` in `Filter.by_property` has been renamed to `name`

Ref counting is now achievable using `Filter.by_ref_count(ref)` rather than `Filter([ref])`

#### Changes in `v4.4b8`

##### Reference filters

Reference filters have a simplified syntax. The new syntax looks like this:

```python
Filter.by_ref("ref").by_property("target_property")
```

#### Changes in `v4.4b7`

##### Library imports

Importing directly from `weaviate` is deprecated. Use `import weaviate.classes as wvc` instead.

##### Close client connections

Starting in v4.4b7, you have to explicitly close your client connections. There are two ways to close client connections.

Use `client.close()` to explicitly close your client connections.

```python
import weaviate
client = weaviate.connect_to_local()

print(client.is_ready())

client.close()
```

Use a context manager to close client connections for you.

```python
import weaviate

with weaviate.connect_to_local() as client:
     print(client.is_ready())

# Python closes the client when you leave the 'with' block
```

##### Batch processing

The v4.4b7 client introduces changes to `client.batch`.

- `client.batch` requires a context manager.
- Manual mode is removed, you cannot send batches with `.create_objects`.
- Batch size and the number of concurrent requests are dynamically assigned. Use `batch.configure_fixed_size` to specify values.
- The `add_reference` method is updated.
- The `to_object_collection` method is removed.

Updated `client.batch` parameters

| Old value | Value in v4.4b7 |
| :-- | :-- |
| from_object_uuid: UUID | from_uuid: UUID |
| from_object_collection: str | from_collection: str |
| from_property_name: str | from_property: str |
| to_object_uuid: UUID | to: Union[WeaviateReference, List[UUID]] |
| to_object_collection: Optional[str] = None | |
| tenant: Optional[str] = None | tenant: Optional[str] = None |


##### Filter syntax

Filter syntax is updated in v4.4b7.

**NOTE**: The [filter reference syntax](#reference-filters) is simplified in 4.4b8.

| Old syntax | New syntax in v4.4b7 |
| :-- | :-- |
| Filter(path=property) | Filter.by_property(property) |
| Filter(path=["ref", "target_class", "target_property"]) | Filter.by_ref().link_on("ref").by_property("target_property") |
| FilterMetadata.ByXX | Filter.by_id()<br/> Filter.by_creation_time() <br/> Filter.by_update_time() |

The pre-4.4b7 filter syntax is deprecated. The new, v4.4b7 syntax looks like this.

```python
import weaviate
import datetime
import weaviate.classes as wvc

client = weaviate.connect_to_local()

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    filters=wvc.query.Filter.by_property("round").equal("Double Jeopardy!") &
            wvc.query.Filter.by_creation_time().greater_or_equal(datetime.datetime(2005, 1, 1)) |
            wvc.query.Filter.by_creation_time().greater_or_equal(datetime.datetime(2000, 12, 31)),
            limit=3
    )


client.close()
```

##### `reference_add_many` updated

The `reference_add_many` syntax is updated; `DataReferenceOneToMany` is now `DataReference`.

```python
collection.data.reference_add_many(
    [
        DataReference(
            from_property="ref",
            from_uuid=uuid_from,
            to_uuid=*one or a list of UUIDs*,
        )
    ]
)
```

##### References

Multi-target references updated. These are the new functions:

- `ReferenceProperty.MultiTarget`
- `DataReference.MultiTarget`
- `QueryReference.MultiTarget`

Use `ReferenceToMulti` for multi-target references.

#### Older client changes

##### References

* References are now added through a `references` parameter during collection creation, object insertion and queries. See examples for:
    * [Collection creation](#instantiate-a-collection)
    * [Cross-reference creation](#cross-reference-creation)
    * [Queries](#query)
* The `FromReference` class is now called `QueryReference`.

##### Reorganization of classes/parameters

* `weaviate.classes` submodule further split into:
    * `weaviate.classes.config`
    * `weaviate.classes.data`
    * `weaviate.classes.query`
    * `weaviate.classes.generic`
* `vector_index_config` parameter factory functions for `wvc.config.Configure` and `wvc.config.Reconfigure` have changed to, e.g.:
    ```python
    client.collections.create(
        name="YourCollection",
        # highlight-start
        vector_index_config=wvc.config.Configure.VectorIndex.hnsw(
            distance_metric=wvc.config.VectorDistances.COSINE,
            vector_cache_max_objects=1000000,
            quantizer=wvc.config.Configure.VectorIndex.Quantizer.pq()
        ),
        # highlight-end
    )
    ```
    * `vector_index_type` parameter has been removed.
* `vectorize_class_name` parameter in the `Property` constructor method is `vectorize_collection_name`.
* `[collection].data.update()` / `.replace()` *args order changed, aiming to accommodate not providing properties when updating.
* `[collection].data.reference_add` / `.reference_delete` / `.reference_replace` the `ref` keyword was renamed to `to`.
* `collections.create()` / `get()`: `data_model` kwarg to keyword to provide generics was renamed to `data_model_properties` .
* `[object].metadata.uuid` is now `[object].uuid`.
* `[object].metadata.creation_time_unix` is now `[object].metadata.creation_time`.
* `[object].metadata.last_update_time_unix` is now `[object].metadata.last_update`.
* `quantitizer` is renamed to `quantizer`
* To request the vector in the returned data, use the `include_vector` parameter ([example](#queries-with-custom-returns)).

##### Data types

* Time metadata (for creation and last updated time) now returns a `datetime` object, and the parameters are renamed to `creation_time` and `last_update_time` under `MetadataQuery`.
    * `metadata.creation_time.timestamp() * 1000` will return the same value as before.
* `query.fetch_object_by_id()` now uses gRPC under the hood (rather than REST), and returns objects in the same format as other queries.
* `UUID` and `DATE` properties are returned as typed objects.

</details>

## Best practices and notes

### Exception handling

The client library raises exceptions for various error conditions. These include, for example:

- `weaviate.exceptions.WeaviateConnectionError` for failed connections.
- `weaviate.exceptions.WeaviateQueryError` for failed queries.
- `weaviate.exceptions.WeaviateBatchError` for failed batch operations.
- `weaviate.exceptions.WeaviateClosedClientError` for operations on a closed client.

Each of these exceptions inherit from `weaviate.exceptions.WeaviateBaseError`, and can be caught using this base class, as shown below.

<FilteredTextBlock
    text={PythonCode}
    startMarker="# START BrokenQueryExample"
    endMarker="# END BrokenQueryExample"
    language="py"
/>

You can review [this module](https://github.com/weaviate/weaviate-python-client/blob/main/weaviate/exceptions.py) which defines the exceptions that can be raised by the client library.

The client library doc strings also provide information on the exceptions that can be raised by each method. You can view these by using the `help` function in Python, by using the `?` operator in Jupyter notebooks, or by using an IDE, such as hover-over tooltips in VSCode.

### Thread-safety

While the Python client is fundamentally designed to be thread-safe, it's important to note that due to its dependency on the `requests` library, complete thread safety isn't guaranteed.

This is an area that we are looking to improve in the future.

Please be particularly aware that the batching algorithm within our client is not thread-safe. Keeping this in mind will help ensure smoother, more predictable operations when using our Python client in multi-threaded environments.

If you are performing batching in a multi-threaded scenario, ensure that only one of the threads is performing the batching workflow at any given time. No two threads can use the same `client.batch` object at one time.

### Response object structure

Each query response object typically include multiple attributes. Consider this query.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START ResultDisplayExample"
  endMarker="# END ResultDisplayExample"
  language="py"
/>

Each response includes attributes such as `objects` and `generated`. Then, each object in `objects` include multiple attributes such as `uuid`, `vector`, `properties`, `references`, `metadata` and `generated`.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START ResultDisplayOutput"
  endMarker="# END ResultDisplayOutput"
  language="bash"
/>

To limit the response payload, you can specify which properties and metadata to return.

<!-- Additionally, to view the response object in a more readable format, you can use the `json.dumps()` function as shown below

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START ResultJSONDisplayExample"
  endMarker="# END ResultJSONDisplayExample"
  language="bash"
/>

This is the formatted output.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START ResultJSONDisplayResults"
  endMarker="# END ResultJSONDisplayResults"
  language="bash"
/> -->

### Tab completion in Jupyter notebooks

If you use a browser to run the Python client with a Jupyter notebook, press `Tab` for code completion while you edit. If you use VSCode to run your Jupyter notebook, press  `control` + `space` for code completion.

### Raw GraphQL queries

To provide raw GraphQL queries, you can use the `client.graphql_raw_query` method (previously `client.query.raw` in the `v3` client). This method takes a string as input.


## Code examples & resources

Usage information for various operations and features can be found throughout the Weaviate documentation.

Some frequently used sections are the how-to guides for [Managing data](../../manage-data/index.md) and [Queries](../../search/index.md). The how-to guides include concise examples for common operations.

In particular, check out the pages for:

- [Client instantiation](./index.md#instantiate-a-client),
- [Manage collections](../../manage-data/collections.mdx),
- [Batch import](../../manage-data/import.mdx)
- [Cross-reference](../../manage-data/cross-references.mdx)
- [Basic search](../../search/basics.md)
- [Similarity search](../../search/similarity.md)
- [Filters](../../search/filters.md)

The Weaviate API reference pages for [search](../../api/graphql/index.md) and [REST](../../api/rest/index.md) may also be useful starting points.

## Client releases

import MatrixIntro from '/_includes/clients/matrix-intro.md';

<MatrixIntro />

## Change logs

For more detailed information on client updates, check the change logs. The logs
are hosted here:

- [GitHub](https://github.com/weaviate/weaviate-python-client/releases)
- [Read the Docs](https://weaviate-python-client.readthedocs.io/en/stable/changelog.html)


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
