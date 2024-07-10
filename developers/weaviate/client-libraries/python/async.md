---
title: Async API
sidebar_position: 40
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/client-libraries/python_v4.py';
import FastAPIExample from '!!raw-loader!/_includes/code/client-libraries/minimal_fastapi.py';

:::info Added in `weaviate-client` `v4.7.0`
The async Python client is available in `weaviate-client` versions `4.7.0` and higher.
:::

The Python client library provides a [synchronous API](./index.md) by default, but an asynchronous API is also available for concurrent applications.

For asynchronous operations, use the `WeaviateAsyncClient` async client, available in `weaviate-client` `v4.7.0` and up.

The `WeaviateAsyncClient` async client largely supports the same functions and methods as the `WeaviateClient` [synchronous client](./index.md), with the key difference that the async client is designed to be used in an `async` function or in an [`asyncio` event loop](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio-event-loop).

## Installation

The async client is already included in the `weaviate-client` package. Follow the installation instructions in the [Python client library documentation](./index.md#installation).

## Instantiation

An async client `WeaviateAsyncClient` object can be instantiated [using a helper function](#instantiation-helper-functions), or by [explicitly creating an instance of the class](#direct-instantiation).

### Instantiation helper functions

These instantiation helper functions mirror the [synchronous client helper functions](./index.md#connection-helper-functions), and return an equivalent async client object.

- `use_async_with_local`
- `use_async_with_weaviate_cloud`
- `use_async_with_custom`

However, the async helper functions do not connect to the server as their synchronous counterparts do.

When using the async helper functions, you must call the async `.connect()` method to connect to the server, and call `.close()` before exiting to clean up. (Except when using a [context manager](#context-manager).)

The async helper functions take the same parameters for [external API keys](./index.md#external-api-keys), [connection timeout values](./index.md#timeout-values) and [authentication details](./index.md#authentication).

<Tabs groupId="languages">
<TabItem value="wcd" label="WCD">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# AsyncWCDInstantiation"
  endMarker="# END AsyncWCDInstantiation"
  language="py"
/>

</TabItem>
<TabItem value="local" label="Local">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# AsyncLocalInstantiationBasic"
    endMarker="# END AsyncLocalInstantiationBasic"
    language="py"
  />

</TabItem>

<!-- TODO - add embedded equivalent when available in client -->

<TabItem value="custom" label="Custom">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# AsyncCustomInstantiationBasic"
  endMarker="# END AsyncCustomInstantiationBasic"
  language="py"
/>

</TabItem>
</Tabs>

### Explicit instantiation

If you need to pass custom parameters, use the `weaviate.WeaviateAsyncClient` class to instantiate a client. This is the most flexible way to instantiate the client object.

When you instantiate a connection directly, you have to call the (now async) `.connect()` method to connect to the server.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# AsyncDirectInstantiationFull"
  endMarker="# END AsyncDirectInstantiationFull"
  language="py"
/>

## Sync and async methods

The async client object is designed to be used in an `async` function or in an [`asyncio` event loop](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio-event-loop).

Accordingly, a majority of the client methods are `async` functions that return [`Coroutines` objects](https://docs.python.org/3/library/asyncio-task.html#coroutine). However, some methods are synchronous and can be used in a synchronous context.

As a rule of thumb, a method that involves a request to Weaviate is likely to be an async function, while a method that executes in a local context is likely to be synchronous.

### How to identify async methods

Async methods are identified by its method signature. Async methods are defined with the `async` keyword, and they return a `Coroutines` object.

To see a method signature, you can use the `help()` function in Python, or use an IDE that supports code completion such as [Visual Studio Code](https://code.visualstudio.com/docs) or [PyCharm](https://www.jetbrains.com/help/pycharm/viewing-reference-information.html).

### Example async methods

Methods that involve a request to Weaviate is likely to be an async function. For example, each of the following operations is an async function:

- `async_client.connect()`: Connect to a Weaviate server
- `async_client.collections.create()`: Create a new collection
- `<collection_object>.data.insert_many()`: Insert a list of objects into a collection

### Example sync methods

Methods that execute in a local context are likely to be synchronous. For example, each of the following operations is a sync function:

- `async_client.collections.get("<COLLECTION_NAME>")`: Create a Python object to interact with an existing collection (this does not create a collection)
- `async_client.is_connected()`: Check the last known connection status to the Weaviate server

## Context manager

The async client can be used in an asynchronous context manager, in a pattern similar to:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START AsyncContextManager"
  endMarker="# END AsyncContextManager"
  language="py"
/>

When using the async client in a context manager, you do not need to call `.connect()` or `.close()` explicitly. The client handles the connection and disconnection automatically.

## Async usage examples

The async client object largely provides the same functionality as the [synchronous Python client](./index.md), with some key differences. First, the async client is designed to be used in an `async` function or in an [`asyncio` event loop](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio-event-loop). Accordingly, many of the client methods are `async` functions that return [`Coroutines` objects](https://docs.python.org/3/library/asyncio-task.html#coroutine).

To execute an async client method, you must `await` the method call or use `asyncio.run()` to run the method in an event loop.

### Data insertion

In this example, we create a new collection and insert a list of objects into the collection using the async client.

Note the use of a context manager in the async function. The context manager is used to ensure that the client is connected to the server during the data insertion operation.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START AsyncInsertionExample"
  endMarker="# END AsyncInsertionExample"
  language="py"
/>

### Search & RAG

In this example, we perform retrieval augmented generation (RAG) with hybrid search results using the async client.

Note the use of a context manager in the async function. The context manager is used to ensure that the client is connected to the server during the data insertion operation.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START AsyncSearchExample"
  endMarker="# END AsyncSearchExample"
  language="py"
/>

### Bulk data insertion

For server-side batch operations, we recommend using the synchronous client and its [`batch` operations](./index.md#batch-imports). The batch operations are designed to handle large amounts of data efficiently through concurrent requests already.

The async client still offers `insert` and `insert_many` methods for data insertion, which can be used in an async context.

### Application-level example

A common use case for the async client is in web applications, where multiple requests are handled concurrently. Here is an indicative, minimal example integrating the async client with [FastAPI](https://fastapi.tiangolo.com/), a popular web framework:

<FilteredTextBlock
  text={FastAPIExample}
  startMarker="# START FastAPI Example"
  endMarker="# END FastAPI Example"
  language="py"
/>

If you run this example, you will see the FastAPI server running on `http://localhost:8000`. You can interact with the server using the `/` and `/search` endpoints.

:::note Data insertion not shown
Note that this example is minimal and does not include collection creation or object insertion. It assumes that the collection `Movie` already exists.
:::

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
