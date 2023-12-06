
#

- [Available vectorizers](../modules/retriever-vectorizer-modules/index.md)
- [Vectorizer configuration references](../config-refs/schema.md#vectorizer)

### Collection level module settings

Configure the `moduleConfig` parameter at the collection-level to set collection-wide settings for module behavior. For example, you can configure the vectorizer to use a particular model (`model`), or to vectorize the collection name (`vectorizeClassName`).

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ModuleSettings"
      endMarker="# END ModuleSettings"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START PropModuleSettings"
      endMarker="# END PropModuleSettings"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START IndexReplicationSettings"
      endMarker="# END IndexReplicationSettings"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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

:::info Added in `v1.20`
:::

To enable multi-tenancy, set `multiTenancyConfig` to `{"enabled": true}` in the collection definition.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START Multi-tenancy"
      endMarker="# END Multi-tenancy"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START Multi-tenancy"
      endMarker="# END Multi-tenancy"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START Multi-tenancy"
      endMarker="// END Multi-tenancy"
      language="ts"
    />
  </TabItem>
</Tabs>


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

Add new properties to an existing schema one at a time. To add multiple properties, create a list of the new properties. Then, loop through the list to add one new property on each iteration.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START AddProp"
      endMarker="# END AddProp"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ModifyParam"
      endMarker="# END ModifyParam"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START SchemaGet"
      endMarker="# END SchemaGet"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
