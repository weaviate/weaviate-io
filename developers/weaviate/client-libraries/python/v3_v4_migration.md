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

The `v4` Weaviate Python client API is a complete rewrite, aimed at an improved overall user experience. It is therefore also very different to the `v3` API, and will require re-learning of changed patterns in the way you interact with Weaviate.

While this may introduce some overhead, we believe the `v4` API is a significant improvement to your developer experience. For instance, using the `v4` client will allow you to take full advantage faster speeds through the gRPC API, and additional static analysis for IDE assistance through strong typing.

Due to the extensive API surface changes, this guide does not cover every change. Instead, this guide is designed to help you understand the major changes and how to migrate your code at a high level.

For code examples, refer to the documentation throughout the site, [starting with these suggested sections](#how-to-migrate-your-code).

## Installation

To go from `v3` to `v4`, you must

1. Upgrade the client library:

    ```bash
    pip install -U weaviate-client
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

You can instantiate the `WeaviateClient` object directly. However, in most cases it is easier to use a connection helper function such as `connect_to_local` or `connect_to_weaviate_cloud`.

<Tabs groupId="languages">
<TabItem value="wcd" label="WCD">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# WCDInstantiation"
  endMarker="# END WCDInstantiation"
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

The `v3` API style `Client` object is [still available](./index.md#python-client-v3-api), and will be deprecated in the future.

## Major changes

The `v4` client API is very different from the `v3` API. Major user-facing changes in the `v4` client include:

- Extensive use of helper classes
- Interaction with collections
- Removal of builder patterns

### Helper classes

The `v4` client makes extensive use of helper classes. These classes provide strong typing and thus static type checking. It also makes coding easier through your IDE's auto-completion feature.

When you are coding, check the auto-complete frequently. It provides useful guidance for API changes and client options.

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

The `wvc` namespace exposes commonly used classes in the `v4` API. The namespace is divided further into [submodules based on their primary purpose](./index.md#helper-classes).

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START WVCImportExample"
  endMarker="# END WVCImportExample"
  language="py"
/>

### Interact with collections

When you connect to a Weaviate database, the v4 API returns a `WeaviateClient` object, while the v3 API returns a `Client` object.

The `v3` API's interactions were built around the `client` object (an instance of `Client`). This includes server interactions for CRUD and search operations.

In the `v4` API, the main starting points for your interaction with Weaviate follow a different paradigm.

Server-level interactions such as checking readiness (`client.is_ready()`) or getting node statuses (`client.cluster.nodes()`) still remain with `client` (now an instance of `WeaviateClient`).

CRUD and search operations are now performed against a `Collection` object to reflect that these operations target a particular collection.

This example below shows a function with a `Collection` typing hint).

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START CollectionInteractionExample"
  endMarker="# END CollectionInteractionExample"
  language="py"
/>

The collection object includes its name as an attribute. Accordingly, operations such as a `near_text` query can be performed without specifying the collection name. The `v4` collection object has a more focussed namespace in comparison to the breadth of operations available with the `v3` client object. This simplifies your code and reduces the potential for errors.

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

### Terminology changes (e.g. class -> collection)

Some of the terms within the Weaviate ecosystem are changing, and the client has changed accordingly:

- A Weaviate "Class" is now called a "Collection". A collection stores a set of data objects together with their vector embeddings.
- A "Schema" is now called a "Collection Configuration", a set of settings that define collection name, vectorizers, index configurations, property definitions, and so on.

Due to the architectural changes as well as changes to the terminology, most of the API has been changed. Expect to find differences in the way you interact with Weaviate.

For example, `client.collections.list_all()` is the replacement for `client.schema.get()`.

[Manage data](../../manage-data/index.md) has more details and additional sample code for working with data, such as [working with collections](../../manage-data/collections.mdx). See [searches](../../search/index.md) for further details on various queries and filters.

### Collection creation from JSON

You can still create a collection from a JSON definition. This may be a useful way to migrate your existing data, for example. You could [fetch an existing definition](../../manage-data/collections.mdx#read-a-single-collection-definition) and then use it to create a new collection.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START CreateCollectionFromJSON"
  endMarker="# END CreateCollectionFromJSON"
  language="py"
/>

### Removal of builder patterns

The builder patterns for constructing queries have been removed. Builder patterns could be confusing, and led to runtime errors that could not be picked up with static analysis.

Instead, construct queries in the `v4` API using specific methods and its parameters.

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

Additionally, many arguments are now constructed using helper classes (e.g. `MetadataQuery` or `Filter`) which makes it easier to use and reduces errors through IDE assistance and static analysis.

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
