---
title: Migrate from v3 to v4
sidebar_position: 12
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/client-libraries/python_v4.py';

:::note Python client version
The current Python client version is `v||site.python_client_version||`
:::

The `v4` Weaviate Python client API is very different from the `v3` API. This guide will help you understand the major changes and how to migrate your code at a high level.

## Installation

To go from `v3` to `v4`, you must

1. Upgrade the client library:

    ```bash
    pip install -U weaviate-client  # For beta versions: `pip install --pre -U "weaviate-client==4.*"`
    ```

2. Upgrade Weaviate to a compatible version
    - Weaviate `1.23.7` is required for `v4.4.1`. Generally, we recommend you use the latest versions of Weaviate and the client.

3. Make sure a port for gRPC is open to Weaviate.
    - The default port is 50051.

    <details>
      <summary>docker-compose.yml example</summary>

    If you are running Weaviate with Docker, you can map the default port (`50051`) by adding the following to your `docker-compose.yml` file:

    ```yaml
        ports:
        - 8080:8080
        - 50051:50051
    ```

    </details>

## Instantiate a client

The `v4` client is instantiated by the `WeaviateClient` object. The `WeaviateClient` object is the main entry point for all API operations.

You can instantiate the `WeaviateClient` object directly. In most cases it is better to use the connection helper functions, such as `connect_to_local` and `connect_to_wcs`.

<Tabs groupId="languages">
<TabItem value="wcs" label="WCS">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# WCSInstantiation"
  endMarker="# END WCSInstantiation"
  language="py"
/>

To configure connection timeout values, see [Timeout values](/developers/weaviate/client-libraries/python#timeout-values).

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

## Major changes

The `v4` client API is very different from the `v3` API. Major user-facing changes in the `v4` client include:

- Extensive use of helper classes
- Interaction with collections
- Removal of builder patterns

### Helper classes

The `v4` client introduces helper classes to interact with Weaviate. These classes provide strong typing. This helps with code correctness, it also makes it coding easier if your IDE has auto-completion.

When you are coding, check the auto-complete frequently. It provides useful guidance for API changes and client options.

In these examples, the imports expose additional types to the client. After the import, your IDE can use the imported objects for auto-completion.

import QuickStartCode from '!!raw-loader!/_includes/code/graphql.filters.nearText.generic.py';

<Tabs groupId="languages">
<TabItem value="create" label="Create a collection">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# START CreateCollectionExample"
    endMarker="# END CreateCollectionExample"
    language="py"
  />

</TabItem>
<TabItem value="query" label="NearText query">

  <FilteredTextBlock
    text={QuickStartCode}
    startMarker="# NearTextExample"
    endMarker="# END NearTextExample"
    language="py"
  />

</TabItem>
</Tabs>

The `wvc` import exposes basic types that you will need for most applications.

```python
import weaviate.classes as wvc
```

The `Move` import exposes configuration elements for `near_text` search. If your application doesn't need `near_text` search. Your can streamline your code namespace by omitting this import.

```python
from weaviate.collections.classes.grpc import Move
```
### Interact with collections

When you connect to a Weaviate database, the v4 client and the v3 client return different objects. The v3 client returns a `client` object that you interact with for CRUD and search operations. The v4 client uses a `collection` object instead.

In v4, there is no need to specify a collection each time. This simplifies your code and reduces the potential for errors.

import ManageDataCode from '!!raw-loader!/_includes/code/howto/manage-data.read.py';
import ManageDataCodeV3 from '!!raw-loader!/_includes/code/howto/manage-data.read-v3.py';

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={ManageDataCode}
      startMarker="# ReadObject START"
      endMarker="# ReadObject END"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={ManageDataCodeV3}
      startMarker="# ReadObject START"
      endMarker="# ReadObject END"
      language="py"
    />
  </TabItem>
</Tabs>

### Collections and classes

The focus on [collections](/developers/weaviate/config-refs/schema) is related to some corresponding changes in Weaviate Core:

- Old-style "class" objects are "collections".
- An old "schema" is a "collection configuration".
- A "property schema" is a sub-set of the collection configuration.

There are other changes as well. The new python client is designed to support the changes in Weaviate Core. Expect to find differences in the way you interact with schemas, collection configurations, and property configurations.

For example, `client.collections.list_all()` is the replacement for `client.schema.get()`.

[Manage collections](/developers/weaviate/manage-data/collections#read-all-collection-definitions) has more details and additional sample code.

### Collection creation from JSON

You can still create a collection from a JSON definition. This may be a useful way to migrate your existing data, for example. You could [fetch an existing definition](../../manage-data/collections.mdx#read-a-single-collection-definition) and then use it to create a new collection.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START CreateCollectionFromJSON"
  endMarker="# END CreateCollectionFromJSON"
  language="py"
/>

### Removal of builder patterns

The builder patterns for constructing queries have been removed, as they could be confusing and potentially lead to invalid queries.

In `v4`, queries are constructed using specific methods and its parameters.

import SearchSimilarityCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import SearchSimilarityCodeV3 from '!!raw-loader!/_includes/code/howto/search.similarity-v3.py';

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={SearchSimilarityCode}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={SearchSimilarityCodeV3}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>
</Tabs>

This makes it easier to understand and use. Additionally, some parameters typed (e.g. `MetadataQuery`) which makes it easier to use and reduces errors.

## How to migrate your code

The migration will likely involve significant changes to your codebase. Review the [Python client library documentation](./index.md) to get started, including instantiation details and various submodules.

Then, take a look at the how-to guides for [Managing data](../../manage-data/index.md) and [Queries](../../search/index.md).

In particular, check out the pages for:

- [Client instantiation](./index.md#instantiate-a-client),
- [Manage collections](../../manage-data/collections.mdx),
- [Batch import](../../manage-data/import.mdx)
- [Cross-reference](../../manage-data/cross-references.mdx)
- [Basic search](../../search/basics.md)
- [Similarity search](../../search/similarity.md)
- [Filters](../../search/filters.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
