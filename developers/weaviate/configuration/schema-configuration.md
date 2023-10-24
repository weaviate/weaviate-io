---
title: Collection schemas
sidebar_position: 1
image: og/docs/configuration.jpg
# tags: ['configuration', 'schema']
---



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/configure.schema.py';
import TSCode from '!!raw-loader!/_includes/code/howto/configure.schema.ts';

# How to configure a collection schema

## Overview

This page describes collection schemas in Weaviate.

import Terminology from '/_includes/collection-class-terminology.md';

<Terminology />

### Auto-schema

We recommend that you define your schema manually to ensure that it aligns with your specific requirements. However, Weaviate also provides an auto-schema feature.

When a collection definition is missing, or when the schema is inadequate for data import, the auto-schema feature generates a schema. The automatically generated schema is based on the Weaviate system defaults and the properties of the imported objects. For more information, see ([Auto-schema](../config-refs/schema.md#auto-schema)).


## Create a collection

A schema describes the data objects that make up a collection. To create a collection, follow the example below in your preferred language.

### Minimal example

At a minimum, you must specify the `class` parameter for the collection name.

import initialCaps from '/_includes/schemas/initial-capitalization.md'

<initialCaps />

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CreateClass"
      endMarker="# END CreateClass"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START CreateClass"
      endMarker="// END CreateClass"
      language="ts"
    />
  </TabItem>
</Tabs>


### Property definition

You can use the `properties` field to specify properties for the collection. A collection definition can include any number of properties.

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START PropertyDefinition"
      endMarker="# END PropertyDefinition"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START PropertyDefinition"
      endMarker="// END PropertyDefinition"
      language="ts"
    />
  </TabItem>
</Tabs>


In addition to the property name, you can use properties to configure parameters such as the data type, inverted index tokenization and more.

- [Property object configuration references](../config-refs/schema.md#property-object)
- [Available data types](../config-refs/datatypes.md)


### Specify a vectorizer

You can set an optional `vectorizer` for each collection. If you specify a vectorizer for a collection, the specification overrides any default values that are present in the general configuration such as [environment variables](../config-refs/env-vars.md).

The following code sets the `text2vec-openai` module as the vectorizer for the `Article` collection.

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START Vectorizer"
      endMarker="# END Vectorizer"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START Vectorizer"
      endMarker="// END Vectorizer"
      language="ts"
    />
  </TabItem>
</Tabs>

- [Available vectorizers](../modules/retriever-vectorizer-modules/index.md)
- [Vectorizer configuration references](../config-refs/schema.md#vectorizer)

### Collection level module settings

Configure the `moduleConfig` parameter at the collection-level to set collection-wide settings for module behavior. For example, you can configure the vectorizer to use a particular model (`model`), or to vectorize the collection name (`vectorizeClassName`).

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ModuleSettings"
      endMarker="# END ModuleSettings"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START ModuleSettings"
      endMarker="// END ModuleSettings"
      language="ts"
    />
  </TabItem>
</Tabs>

The available parameters vary according to the module. ([Learn more](../modules/index.md)).


### Property-level module settings

Configure the `moduleConfig` parameter at the property-level to set property-level settings for module behavior. For example, you can vectorize the property name (`vectorizePropertyName`), or ignore the property altogether (`skip`).

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START PropModuleSettings"
      endMarker="# END PropModuleSettings"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START PropModuleSettings"
      endMarker="// END PropModuleSettings"
      language="ts"
    />
  </TabItem>
</Tabs>

The available parameters vary according to the module. ([Learn more](../modules/index.md)).


### Indexing, sharding and replication settings

You can also set indexing, sharding and replication settings through the schema. For example, you can set a vector index distance metric or a replication factor for a collection.

This code sets the replication factor.

:::note
You need a [multi-node setup](../installation/docker-compose.md#multi-node-setup) to test replication factors greater than 1.

:::

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START IndexReplicationSettings"
      endMarker="# END IndexReplicationSettings"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START IndexReplicationSettings"
      endMarker="// END IndexReplicationSettings"
      language="ts"
    />
  </TabItem>
</Tabs>


For details on the configuration parameters, see the following configuration references:

- [Vector indexes](../config-refs/schema.md#vectorindexconfig)
- [Inverted indexes](../config-refs/schema.md#invertedindexconfig--stopwords-stopword-lists)
- [Sharding](../config-refs/schema.md#shardingconfig)
- [Replication](../config-refs/schema.md#replicationconfig)

### Multi-tenancy

:::info Available from `v1.20` onwards
:::

To enable multi-tenancy, set `multiTenancyConfig` to `{"enabled": true}` in the collection definition.

```json
{
  "class": "MultiTenancyClass",
  // highlight-start
  "multiTenancyConfig": {"enabled": true}
  // highlight-end
}
```

For more details on multi-tenancy operations, see [Multi-tenancy operations](../manage-data/multi-tenancy.md).

## Delete a collection

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

## Update a collection definition

Some parts of a collection definition are immutable, but you can modify other parts.

The following sections describe how to add a property to a collection and how to modify collection parameters.

### Add a property

You can add a new property to an existing collection.

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START AddProp"
      endMarker="# END AddProp"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START AddProp"
      endMarker="// END AddProp"
      language="ts"
    />
  </TabItem>
</Tabs>

:::info Remove or change an existing property
You cannot remove or rename a property that is part of a collection definition. This is due to the high compute cost associated with reindexing the data.
:::

### Modify a parameter

You can modify some parameters of a schema as shown below. However, many parameters are immutable and cannot be changed once set.

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ModifyParam"
      endMarker="# END ModifyParam"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">

  >  Coming soon. ([Vote for the feature request.](https://github.com/weaviate/typescript-client/issues/72))

  </TabItem>
</Tabs>


## Get the schema

If you want to review the schema, you can retrieve it as shown below.

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START SchemaGet"
      endMarker="# END SchemaGet"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START SchemaGet"
      endMarker="// END SchemaGet"
      language="ts"
    />
  </TabItem>
</Tabs>

The response is a JSON object like the one in this example.

<details>
  <summary>Sample schema</summary>

```json
{
  "classes": [
    {
      "class": "Article",
      "invertedIndexConfig": {
        "bm25": {
          "b": 0.75,
          "k1": 1.2
        },
        "cleanupIntervalSeconds": 60,
        "stopwords": {
          "additions": null,
          "preset": "en",
          "removals": null
        }
      },
      "moduleConfig": {
        "text2vec-openai": {
          "model": "ada",
          "modelVersion": "002",
          "type": "text",
          "vectorizeClassName": true
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "moduleConfig": {
            "text2vec-openai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "title",
          "tokenization": "word"
        },
        {
          "dataType": [
            "text"
          ],
          "moduleConfig": {
            "text2vec-openai": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "body",
          "tokenization": "word"
        }
      ],
      "replicationConfig": {
        "factor": 1
      },
      "shardingConfig": {
        "virtualPerPhysical": 128,
        "desiredCount": 1,
        "actualCount": 1,
        "desiredVirtualCount": 128,
        "actualVirtualCount": 128,
        "key": "_id",
        "strategy": "hash",
        "function": "murmur3"
      },
      "vectorIndexConfig": {
        "skip": false,
        "cleanupIntervalSeconds": 300,
        "maxConnections": 64,
        "efConstruction": 128,
        "ef": -1,
        "dynamicEfMin": 100,
        "dynamicEfMax": 500,
        "dynamicEfFactor": 8,
        "vectorCacheMaxObjects": 1000000000000,
        "flatSearchCutoff": 40000,
        "distance": "cosine",
        "pq": {
          "enabled": false,
          "bitCompression": false,
          "segments": 0,
          "centroids": 256,
          "encoder": {
            "type": "kmeans",
            "distribution": "log-normal"
          }
        }
      },
      "vectorIndexType": "hnsw",
      "vectorizer": "text2vec-openai"
    }
  ]
}
```

</details>

## Related pages
- [Tutorial: Schema](../tutorials/schema.md)
- [References: Schema](../config-refs/schema.md)
- [References: REST API: Schema](../api/rest/schema.md)
- [Concepts: Data Structure](../concepts/data.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
