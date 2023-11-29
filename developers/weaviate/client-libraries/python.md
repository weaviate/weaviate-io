---
title: Python (v4)
sidebar_position: 10
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library', 'experimental']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import UserTestCode from '!!raw-loader!./_includes/examples.py';
import PythonCode from '!!raw-loader!/_includes/code/client-libraries/python_v4.py';

:::caution Beta version

 The Python client is currently in beta, and we want to hear from you. You can test the new client locally, or on paid instances of Weaviate Cloud Services (WCS). It is not yet available on the free (sandbox) tier of WCS. If you notice any bugs, or have any feedback, please let us know on [this forum thread](https://forum.weaviate.io/t/python-v4-client-feedback-megathread/892)
:::

## Overview

This page describes the `v4` Python client for Weaviate. This client is also called the `collections` client, because the main interactions is with a collection (also called "class").

The full set of features is covered in the client documentation pages. This page covers key ideas and aspects of the new Python client.

## Installation

The Python library is available on [PyPI.org](https://pypi.org/project/weaviate-client/). The package can be installed using [pip](https://pypi.org/project/pip/). The client is developed and tested for Python 3.8 to 3.12.

Install the client with the following command:

```bash
pip install --pre "weaviate-client==4.*"
```

### Requirements

#### Weaviate version

:::caution Beta version
While the new client is in beta release, be sure to use the latest version of the Python client *and* the Weaviate server.

:::

The `v4` client is designed for use with Weaviate `1.22.5` and higher to take advantage of its gRPC API. If you are using an older version of Weaviate, or otherwise unable to use gRPC, please use the `v3` client, or the legacy instantiation method through the `weaviate.Client` class which is still available.

Please refer to the [`v3` client documentation](./python_v3.md) if you are using this instantiation method.

#### gRPC port

You must make sure a port for gRPC is open on your Weaviate server. If you are running Weaviate locally, you can open the default port (`50051`) by adding the following to your `docker-compose.yml` file:

```yaml
    ports:
     - "8080:8080"
     - "50051:50051"
```
#### WCS availability

You can test the new client locally, or on paid instances of Weaviate Cloud Services (WCS). It is not yet available on the free (sandbox) tier of WCS.

## Instantiation

You can instantiate the client using one of multiple methods. For example, you can use one of the following helper `connect` functions:

- `weaviate.connect_to_wcs()`
- `weaviate.connect_to_local()`
- `weaviate.connect_to_embedded()`
- `weaviate.connect_to_custom()`

For example, you can:

Connect to a local instance like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# LocalInstantiationBasic"
  endMarker="# END LocalInstantiationBasic"
  language="py"
/>

Connect to a Weaviate Cloud Services (WCS) instance like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# WCSInstantiation"
  endMarker="# END WCSInstantiation"
  language="py"
/>

Or connect with a custom set of parameters like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# CustomInstantiationBasic"
  endMarker="# END CustomInstantiationBasic"
  language="py"
/>

Or, you can [instantiate a `weaviate.WeaviateClient` object directly](#advanced-direct-instantiation-with-custom-parameters).

#### API keys for external API use

You can pass on API keys for services such as Cohere, OpenAI and so on through additional headers.

For example, to use the OpenAI API, you can pass on the API key like this:

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

For example, the `connect_to_wcs` method allows for a WCS api key to be passed in.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# WCSInstantiation"
  endMarker="# END WCSInstantiation"
  language="py"
/>

Or OIDC authentication credentials as shown below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# WCSwOIDCInstantiation"
  endMarker="# END WCSwOIDCInstantiation"
  language="py"
/>

The client also supports OIDC authentication with Client Credentials flow and Refresh Token flow. They are available through the `AuthClientCredentials` and `AuthBearerToken` classes respectively.

For authentication workflows not supported by the helper functions, you can pass on authentication credentials directly when instantiating the `WeaviateClient` object.

### Advanced: Direct instantiation with custom parameters

You can also instantiate a client (`WeaviateClient`) object directly, through which you can pass on custom parameters.

For example, you can instantiate a client like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# DirectInstantiationFull"
  endMarker="# END DirectInstantiationFull"
  language="py"
/>

## Key ideas

The `v4` client is also called the `collections` client, because the main interactions is with a collection (also called `Class` in Weaviate). (From here, we will use `collections` instead of `Class`.)

This client also includes custom Python classes to provide IDE assistance and typing help. You can import them individually, like so:

```
from weaviate.classes import Property, ConfigFactory, DataObject
```

But it may be convenient to import the whole set of classes like this.

```
import weaviate.classes as wvc
```

## Collection methods

Operations in the `v4` client are grouped into submodules. The key submodules for interacting with objects are:

- `data`: CUD operations (read operations are in `query`)
- `query`: Search operations
- `aggregate`: Aggregation operations
- `generate`: Retrieval augmented generation operations
- `query_group_by`: Object-level group by operations
- `aggregate_group_by`: Aggregation-level group by operations

### Collection iterator (`cursor` API)

The `v4` client adds a Pythonic iterator method for each collection. This wraps the `cursor` API and allows you to iterate over all objects in a collection.

This will fetch all objects in the `articles` collection, including most of its properties and metadata.

<FilteredTextBlock
  text={UserTestCode}
  startMarker="# IteratorBasic"
  endMarker="# END IteratorBasic"
  language="py"
/>

You can specify what properties to retrieve. This will only fetch the `title` property. Doing so will switch off default metadata retrieval.

<FilteredTextBlock
  text={UserTestCode}
  startMarker="# IteratorTitleOnly"
  endMarker="# END IteratorTitleOnly"
  language="py"
/>

You can also specify what metadata to retrieve. This will only fetch the `creation_time_unix` metadata. Doing so will switch off default property retrieval.

<FilteredTextBlock
  text={UserTestCode}
  startMarker="# IteratorMetadataOnly"
  endMarker="# END IteratorMetadataOnly"
  language="py"
/>

Note that as the `cursor` API inherently requires the object UUID for indexing, the `uuid` metadata is always retrieved.

### Data model / generics

You can choose to provide a generic type to a query or data operation. This can be beneficial as the generic class is used to extract the return properties and statically type the response.

<FilteredTextBlock
  text={UserTestCode}
  startMarker="# GenericsExample"
  endMarker="# END GenericsExample"
  language="py"
/>

## Best practices and notes

### Thread-safety

While the Python client is fundamentally designed to be thread-safe, it's important to note that due to its dependency on the `requests` library, complete thread safety isn't guaranteed.

This is an area that we are looking to improve in the future.

Please be particularly aware that the batching algorithm within our client is not thread-safe. Keeping this in mind will help ensure smoother, more predictable operations when using our Python client in multi-threaded environments.

If you are performing batching in a multi-threaded scenario, ensure that only one of the threads is performing the batching workflow at any given time. No two threads can use the same `client.batch` object at one time.

### Print formatting

The collections object returns a lot of additional information when you query the collections object. Consider this simple query.

```python
jeopardy = client.collections.get("JeopardyQuestion")

response = jeopardy.query.fetch_objects(limit=1)
print(response)
```

The response includes a lot of extra information you may not always want.

```
_QueryReturn(objects=[_Object(uuid=UUID('009f2949-db98-5df1-9954-cece3cc61535'), metadata=None, properties={'points': 500.0, 'air_date': '1997-07-08T00:00:00Z', 'answer': 'George Rogers Clark', 'question': 'This soldier & frontiersman won important victories over the British in the Northwest Territory', 'round': 'Jeopardy!'}, vector=None)])
```

To limit the response and format it as JSON, use `json.dumps()` to print the response object's `properties` attribute.

```python
response = jeopardy.query.fetch_objects(limit=1)

# print result objects
for o in response.objects:
    print(json.dumps(o.properties, indent=2))
```

This is the formatted output.

```
{
  "points": 100.0,
  "answer": "Jonah",
  "air_date": "2001-01-10T00:00:00Z",
  "round": "Jeopardy!",
  "question": "This prophet passed the time he spent inside a fish offering up prayers"
}
```

### Tab completion in Jupyter notebooks

If you use a browser to run the Python client with a Jupyter notebook, press `Tab` for code completion while you edit. If you use VSCode to run your Jupyter notebook, press  `control` + `space` for code completion.

### Object properties and metadata

The `v4` client uses the following parameters to select data and metadata to be retrieved from each query.

- `return_properties` takes a list of strings, and sets the properties to be retrieved.
- `return_metadata` takes an instance of `weaviate.classes.MetadataQuery`. You can pass boolean values to select the metadata to be retrieved.
- `include_vector` takes a boolean value, and sets whether the object vector should be retrieved.

The object ID is always returned.

Consider this example.

```python
import weaviate.classes as wvc

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    return_properties=["question", "answer", "points"],
    return_metadata=wvc.MetadataQuery(creation_time_unix=True),
    limit=3
)

for o in response.objects:
    print(o.uuid)
    print(o.metadata.creation_time_unix)
    print(o.properties['points'], '\n')
```

This is the output.

```none
009f2949-db98-5df1-9954-cece3cc61535
1700090615565
500.0

00bd96c1-e86c-5233-b034-892974af7104
1700090612469
400.0

00ff6900-e64f-5d94-90db-c8cfa3fc851b
1700090614665
400.0
```
### Vectors and metadata

By default `return_metadata` does not return the object vector. To return the vector, set
`include_vector=True` in the query.

If you import the `weaviate.classes` submodule, the call looks like this.

```python
import weaviate.classes as wvc

jeopardy = client.collections.get("JeopardyQuestion")
response = jeopardy.query.fetch_objects(
    include_vector=True,
    limit=1
)
```



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
