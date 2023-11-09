---
title: Python (v4)
sidebar_position: 10
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library', 'experimental']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import UserTestCode from '!!raw-loader!./_includes/user_test.py';
import PythonCode from '!!raw-loader!/_includes/code/client-libraries/python_v4.py';

:::caution Beta version
The Python client is currently in beta, and we want to hear from you.

You can test the new client locally, but it is not available on Weaviate Cloud Services (WCS) yet. 

If you notice any bugs, or have any feedback, please let us know on [this forum thread](https://forum.weaviate.io/t/python-v4-client-feedback-megathread/892)
:::

## Overview

This page describes the `v4` Python client for Weaviate. This client is also called the `collections` client, because the main interactions is with a collection (also called `Class` in Weaviate).

The full set of features will be covered in the client documentation page. This page will cover the key ideas and aspects, especially those specifc to the Python client.

## Installation

The Python library is available on [PyPI.org](https://pypi.org/project/weaviate-client/). The package can be installed using [pip](https://pypi.org/project/pip/). The client is developed and tested for Python 3.8 to 3.12.

```bash
pip install --pre "weaviate-client==4.*"
```

### Requirements

#### Weaviate version

The `v4` client is only compatible with Weaviate `1.22.0` and higher. This is because it requires gRPC and gRPC is not available in earlier versions. If you are using an older version of Weaviate, please use the `v3` client.

#### gRPC port

You have to open a port for gRPC on your Weaviate instance. The default port is `50051`. If you are running Weaviate locally, you can open this port by adding the following to your `docker-compose.yml` file:

```yaml
    ports:
     - "8080:8080"
     - "50051:50051"
```
#### WCS availability

You can test the new client locally, but it is not available on Weaviate Cloud Services (WCS) yet.

## Instantiation

You can instantiate the client using one of multiple methods. For example, you can use one of the following helper `connect` functions:

<!-- - `weaviate.connect_to_wcs()` -->
- `weaviate.connect_to_local()`
- `weaviate.connect_to_embedded()`
- `weaviate.connect_to_custom()`

:::note WCS not yet compatible
Currently, WCS instances cannot be used with the `v4` client as they lack gRPC support. We are working on adding WCS support, and ask for your patience in the meantime.
:::

Or, you can instantiate a `weaviate.WeaviateClient` object directly.

For example, you can connect to a local instance like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# LocalInstantiationBasic"
  endMarker="# END LocalInstantiationBasic"
  language="py"
/>

<!-- Or connect to a Weaviate Cloud Services (WCS) instance like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# WCSInstantiation"
  endMarker="# END WCSInstantiation"
  language="py"
/> -->

Or instantiate a client directly like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# DirectInstantiationBasic"
  endMarker="# END DirectInstantiationBasic"
  language="py"
/>

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

You can also set timeout values for the client as a tuple  (connection timeout & read timeout time) in seconds.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# LocalInstantiationWithTimeout"
  endMarker="# END LocalInstantiationWithTimeout"
  language="py"
/>

### Authentication

Some helper `connect` functions allow you to pass on authentication credentials.

<!-- For example, the `connect_to_wcs` method allows for a WCS api key to be passed in.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# WCSInstantiation"
  endMarker="# END WCSInstantiation"
  language="py"
/> -->

For authentication workflows not supported by the helper functions, you can pass on authentication credentials directly when instantiating the `WeaviateClient` object.

For example, you can pass on OIDC username and password like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# DirectInstantiationWithOIDC"
  endMarker="# END DirectInstantiationWithOIDC"
  language="py"
/>

<!-- Or, you can pass the WCS API key like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# DirectInstantiationWithAPIKey"
  endMarker="# END DirectInstantiationWithAPIKey"
  language="py"
/> -->

The client also supports OIDC authentication with Client Credentials flow and Refresh Token flow. They are available through the `AuthClientCredentials` and `AuthBearerToken` classes respectively.

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

You can also specify what metadata to retrieve. This will only fetch the `uuid` metadata. Doing so will switch off default property retrieval.

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
