---
title: Python (v4)
sidebar_position: 10
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library', 'experimental']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/client-libraries/python_v4.py';

:::caution Beta version

The Python client is currently in beta. Please note the following:
<br/>

- We strongly encourage you to use the latest version of the Python client *and* the Weaviate server.
- You can test the new client locally, or on paid instances of Weaviate Cloud Services (WCS).
- It is not yet available on the free (sandbox) tier of WCS.
- Please report any bugs or feedback on [this forum thread](https://forum.weaviate.io/t/python-v4-client-feedback-megathread/892)

:::

## Overview

This page discuses key ideas and aspects of the new Python client. There are code samples throughout the Weaviate documentation, and the "how-to" sections have a large number of task oriented examples. 

Please see the migration guide below for changes in the client between beta releases.

### Key changes from `v3`

This client is also called the `collections` client, because it adds new collection-level (previously called "class") interactions.

This client also includes numerous additional Python classes to provide IDE assistance and typing help. You can import them individually, like so:

```
from weaviate.classes import Property, ConfigFactory, DataObject
```

But it may be convenient to import the whole set of classes like this.

```
import weaviate.classes as wvc
```

For discoverability, the submodule is further divided into:

* `weaviate.classes.config`
* `weaviate.classes.data`
* `weaviate.classes.query`
* `weaviate.classes.generic`


## Installation

The Python library is available on [PyPI.org](https://pypi.org/project/weaviate-client/). The package can be installed using [pip](https://pypi.org/project/pip/). The client is developed and tested for Python 3.8 to 3.12.

Install the client with the following command:

```bash
pip install --pre -U "weaviate-client==4.*"
```

### Requirements

#### Weaviate version

:::caution Beta version
The API may change on the client-side and the server-side, especially during the beta period. Accordingly, we encourage you to use the latest version of the Python client *and* the Weaviate server.
:::

The latest `v4` client is designed for use with Weaviate `1.23` and higher.

If you are using an older version of Weaviate, or otherwise unable to use gRPC, please use the `v3` client, or the legacy instantiation method through the `weaviate.Client` class which is still available.

Please refer to the [`v3` client documentation](./python_v3.md) if you are using this instantiation method.

#### gRPC port

A port for gRPC must be open on your Weaviate server. If you are running Weaviate locally, you can open the default port (`50051`) by adding the following to your `docker-compose.yml` file:

```yaml
    ports:
     - 8080:8080
     - 50051:50051
```

#### WCS availability

You can test the new client locally, or on paid instances of Weaviate Cloud Services (WCS). It is not yet available on the free (sandbox) tier of WCS.

## Instantiation

You can instantiate the client using one of multiple methods. For example, you can use one of the following helper `connect` functions:

- `weaviate.connect_to_wcs()`
- `weaviate.connect_to_local()`
- `weaviate.connect_to_embedded()`
- `weaviate.connect_to_custom()`

See the examples below:

<Tabs groupId="languages">
<TabItem value="wcs" label="WCS">

<p><small>Note: As of December 2023, WCS sandboxes are not compatible with the <code>v4</code> client.</small></p>

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

Or, you can [instantiate a `weaviate.WeaviateClient` object directly](#advanced-direct-instantiation).

#### API keys for external API use

You can pass on API keys for services such as Cohere, OpenAI and so on through additional headers. For example:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# LocalInstantiationWithHeaders"
  endMarker="# END LocalInstantiationWithHeaders"
  language="py"
/>

#### Timeout values

You can set timeout values for the client as a tuple  (connection timeout & read timeout time) in seconds.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# LocalInstantiationWithTimeout"
  endMarker="# END LocalInstantiationWithTimeout"
  language="py"
/>

### Authentication

Some helper `connect` functions allow you to pass on authentication credentials.

For example, the `connect_to_wcs` method allows for a WCS api key or OIDC authentication credentials to be passed in.

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

The client also supports OIDC authentication with Client Credentials flow and Refresh Token flow. They are available through the `AuthClientCredentials` and `AuthBearerToken` classes respectively.

If a particular helper function does not support the desired workflow, directly instantiate the `WeaviateClient` object.

### Advanced: Direct instantiation

You can also instantiate a client (`WeaviateClient`) object directly and pass on custom parameters. This is the most flexible way to instantiate the client.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# DirectInstantiationFull"
  endMarker="# END DirectInstantiationFull"
  language="py"
/>

### V3 `Client` instantiation

You can instantiate a `v3` style `Client` object using the `weaviate.Client` class. This is the legacy instantiation method, and is still available for backwards compatibility.

Please refer to the [`v3` client documentation](./python_v3.md) if you are using this instantiation method.

## Working with collections

### Instantiate a collection

You can instantiate a collection object by creating a collection, or by retrieving an existing collection.

Note that when adding a cross-reference property, you should use the `references` parameter. Using the `properties` parameter to add references is deprecated and will be removed in the future.

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
- `query`: Search operations
- `generate`: Retrieval augmented generation operations
    - Build on top of `query` operations
- `aggregate`: Aggregation operations
- `query_group_by`: Object-level group by operations
- `aggregate_group_by`: Aggregation-level group by operations

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
As of `4.4b1`, `insert_many` will send one request for the entire function call.
We are evaluating modifing this to send multiple requests by matches in the future.
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
    "<REFERENCE_PROPERTY_NAME>": Reference.to(uuids=<TARGET_UUID>)
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

### `query_group_by`

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

### `aggregate_group_by`

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
  startMarker="# IteratorMetadataOnly"
  endMarker="# END IteratorMetadataOnly"
  language="py"
/>

Since the `cursor` API requires the object UUID for indexing, the `uuid` metadata is always retrieved.

### Data model / generics

You can choose to provide a generic type to a query or data operation. This can be beneficial as the generic class is used to extract the return properties and statically type the response.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GenericsExample"
  endMarker="# END GenericsExample"
  language="py"
/>

## Migration guides

<!-- For future release (probably `v4.4b7`) - note from Dirk on 2024-01-09

### `v4.4b6` to `v4.4b7`

#### References

The syntax for `reference_add_many` has changed, so that for example:

```python
collection.data.reference_add_many(
    [
        DataReferenceOneToMany(
            from_property="ref",
            from_uuid=uuid_from
            to=Reference.to(*one or a list of UUIDs*),
        )
    ],
)
```

is now:

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
``` -->

### `v4.4b1` to `v4.4b2`

#### References

* References are now added through a `references` parameter during collection creation, object insertion and queries. See examples for:
    * [Collection creation](#instantiate-a-collection)
    * [Cross-reference creation](#cross-reference-creation)
    * [Queries](#query)
* The `FromReference` class is now called `QueryReference`.

#### Reorganization of classes/parameters

* `weaviate.classes` submodule further split into:
    * `weaviate.classes.config`
    * `weaviate.classes.data`
    * `weaviate.classes.query`
    * `weaviate.classes.generic`
* `vector_index_config` parameter factory functions for `wvc.Configure` and `wvc.Reconfigure` have changed to, e.g.:
    ```python
    client.collections.create(
        name="YourCollection",
        # highlight-start
        vector_index_config=wvc.Configure.VectorIndex.hnsw(
            distance_metric=wvc.VectorDistance.COSINE,
            vector_cache_max_objects=1000000,
            quantizer=wvc.Configure.VectorIndex.Quantizer.pq()
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

#### Data types

* Time metadata (for creation and last updated time) now returns a `datetime` object, and the parameters are renamed to `creation_time` and `last_update_time` under `MetadataQuery`.
    * `metadata.creation_time.timestamp() * 1000` will return the same value as before.
* `query.fetch_object_by_id()` now uses gRPC under the hood (rather than REST), and returns objects in the same format as other queries.
* `UUID` and `DATE` properties are returned as typed objects.


## Best practices and notes

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
