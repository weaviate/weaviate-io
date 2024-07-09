---
title: Async Client
sidebar_position: 40
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/client-libraries/python_v4.py';

:::info Added in `weaviate-client` `v4.7.0`
The async Python client is available in `weaviate-client` versions `4.7.0` and higher.
:::

To interact with Weaviate asynchronously in Python, use the async Weaviate Python client object, available in `weaviate-client` `v4.7.0` and up.

The async client largely provides the same functionality as the [synchronous Python client](./python.md), but with the added ability to make concurrent requests to Weaviate. The async client is built with [the `asyncio` library](https://docs.python.org/3/library/asyncio.html), and is designed to be used in an `async` function or in an [`asyncio` event loop](https://docs.python.org/3/library/asyncio-eventloop.html#asyncio-event-loop).

Note that the async client is designed for single-threaded, concurrent use. It is not suitable for use in a multi-threaded application.

## Installation

The async client is included in the `weaviate-client` package. Follow the installation instructions in the [Python client library documentation](./index.md#installation).

## Instantiation

An async client `WeaviateAsyncClient` object can be instantiated [using a helper function](#helper-functions), or by [explicitly creating an instance of the class](#direct-instantiation).

### Helper functions

These helper functions return an async client object with the specified configuration.

Otherwise, the async connection helper functions work in the same way as the [synchronous client helper functions](./index.md#helper-functions), including the same parameters for [external API keys](./index.md#external-api-keys), [connection timeout values](./index.md#timeout-values) and [authentication details](./index.md#authentication).

- `use_async_with_local`
- `use_async_with_weaviate_cloud`
- `use_async_with_custom`

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

When you instantiate a connection directly, you have to call the `.connect()` method to connect to the server.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# AsyncDirectInstantiationFull"
  endMarker="# END AsyncDirectInstantiationFull"
  language="py"
/>

## Usage

The async client is used in the same way as the synchronous client, but with the `WeaviateAsyncClient` class instead of the `WeaviateClient` class. The methods of the async client return awaitable objects.

```python
