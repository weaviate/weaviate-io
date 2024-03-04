---
title: REST - /v1/schema
sidebar_position: 11
image: og/docs/api.jpg
# tags: ['RESTful API', 'references', 'schema']
---


:::info Related pages
- [How-to - Manage Collections](../../manage-data/collections.mdx)
- [References - Configuration: Schema](../../config-refs/schema/index.md).
:::

## Overview

The `schema` endpoint is for creating, reading, updating and deleting collections (also called collections) and properties. The overall configuration is referred to as the schema.

## Get the schema

The response will contain an array of objects.

### Method and URL

```js
GET /v1/schema
```

### Example request

import CodeSchemaDump from '/_includes/code/schema.dump.mdx';

<CodeSchemaDump />

<details>
  <summary>Example response</summary>

```json
{
  "classes": [
    {
      "class": "Category",
      "description": "Category an article is a type off",
      "moduleConfig": {
        "text2vec-contextionary": {
          "vectorizeClassName": false
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "category name",
          "indexFilterable": true,
          "indexSearchable": true,
          "moduleConfig": {
            "text2vec-contextionary": {
              "vectorizePropertyName": false
            }
          },
          "name": "name"
        }
      ],
      "vectorIndexType": "hnsw",
      "vectorizer": "none"
    },
    {
      "class": "Publication",
      "description": "A publication with an online source",
      "moduleConfig": {
        "text2vec-contextionary": {
          "vectorizeClassName": false
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Name of the publication",
          "name": "name"
        },
        {
          "dataType": [
            "geoCoordinates"
          ],
          "description": "Geo location of the HQ",
          "name": "headquartersGeoLocation"
        },
        {
          "dataType": [
            "Article"
          ],
          "description": "The articles this publication has",
          "name": "hasArticles"
        },
        {
          "dataType": [
            "Article"
          ],
          "description": "Articles this author wrote",
          "name": "wroteArticles"
        }
      ],
      "vectorIndexType": "hnsw",
      "vectorizer": "none"
    },
    {
      "class": "Author",
      "description": "Normalised types",
      "moduleConfig": {
        "text2vec-contextionary": {
          "vectorizeClassName": true
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Name of the author",
          "name": "name"
        },
        {
          "dataType": [
            "Publication"
          ],
          "description": "The publication this author writes for",
          "name": "writesFor"
        }
      ],
      "vectorIndexType": "hnsw",
      "vectorizer": "none"
    },
    {
      "class": "Article",
      "description": "Normalised types",
      "moduleConfig": {
        "text2vec-contextionary": {
          "vectorizeClassName": false
        }
      },
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "title of the article",
          "indexFilterable": true,
          "indexSearchable": true,
          "moduleConfig": {
            "text2vec-contextionary": {
              "vectorizePropertyName": false
            }
          },
          "name": "title"
        },
        {
          "dataType": [
            "text"
          ],
          "description": "url of the article",
          "indexFilterable": true,
          "indexSearchable": false,
          "moduleConfig": {
            "text2vec-contextionary": {
              "vectorizePropertyName": false
            }
          },
          "name": "url"
        },
        {
          "dataType": [
            "text"
          ],
          "description": "summary of the article",
          "indexFilterable": true,
          "indexSearchable": true,
          "moduleConfig": {
            "text2vec-contextionary": {
              "vectorizePropertyName": false
            }
          },
          "name": "summary"
        },
        {
          "dataType": [
            "date"
          ],
          "description": "date of publication of the article",
          "name": "publicationDate"
        },
        {
          "dataType": [
            "int"
          ],
          "description": "Words in this article",
          "name": "wordCount"
        },
        {
          "dataType": [
            "Author",
            "Publication"
          ],
          "description": "authors this article has",
          "name": "hasAuthors"
        },
        {
          "dataType": [
            "Publication"
          ],
          "description": "publication this article is in",
          "name": "inPublication"
        },
        {
          "dataType": [
            "Category"
          ],
          "description": "category this article is of",
          "name": "ofCategory"
        },
        {
          "dataType": [
            "boolean"
          ],
          "description": "whether the article is currently accessible through the url",
          "name": "isAccessible"
        }
      ],
      "vectorIndexType": "hnsw",
      "vectorizer": "none"
    }
  ]
}
```

</details>

## Create a collection

Create a new data object collection in the schema.

:::note
From `v1.5.0` onwards, manual creation of a schema is optional. Learn more about [Auto Schema](../../config-refs/schema/index.md#auto-schema).
:::

### Method and URL

```js
POST /v1/schema
```

### Parameters

For more details on these parameters, see the [schema configuration reference page](../../config-refs/schema/index.md).

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `class` | body | string | The name of the collection (a.k.a. class). Multiple words should be concatenated in CamelCase, e.g. `ArticleAuthor`. |
| `description` | body | string | Description of the collection. |
| `vectorizer` | body | string | Vectorizer to use for data objects added to this collection. Default can be set via Weaviate environment variables. |
| `vectorIndexType` | body | string | Vector index type. Defaults to hnsw. |
| `vectorIndexConfig` | body | object | Vector index type specific settings. See the [vector index configuration](../../config-refs/schema/vector-index.md) page for more details. |
| `moduleConfig` > `<module_name>`  > `vectorizeClassName` | body | boolean | Include the collection name in vector calculation (default true). Learn more about [semantic indexing in Weaviate](../../config-refs/schema/index.md#configure-semantic-indexing). |
| `properties` | body | array | An array of property objects. |
| `properties` > `name` | body | string | The name of the property. Multiple words should be concatenated in camelCase, e.g. `nameOfAuthor`. |
| `properties` > `dataType` | body | array | See the [available data types](../../config-refs/datatypes.md). |
| `properties` > `description` | body | string | Description of the property. |
| `properties` > `moduleConfig`  > `<module_name>` > `skip` | body | boolean | If true, the whole property will NOT be included in vectorization. Default is false, meaning that the object will be NOT be skipped. |
| `properties` > `moduleConfig`  > `<module_name>` > `vectorizePropertyName` | body | boolean | Whether the name of the property is used in the calculation for the vector position of data objects. Default is true. Learn more about [semantic indexing in Weaviate](../../config-refs/schema/index.md#configure-semantic-indexing). |
| `properties` > `indexFilterable` (available from `v1.19`) | body | boolean | Should the data stored in this property be indexed with the filterable, Roaring Bitmap index? Read more about [indexing in Weaviate](../../config-refs/schema/index.md#indexfilterable-and-indexsearchable). |
| `properties` > `indexSearchable` (available from `v1.19`) | body | boolean | Should the data stored in this property be indexed to allow BM25/hybrid-search index? Read more on how to [configure indexing in Weaviate](../../config-refs/schema/index.md#indexfilterable-and-indexsearchable). |
| `properties` > `tokenization` | body | string | Only for `string`/`text` props. Introduced in `v1.12.0`. Control how a field is tokenized in the inverted index. Defaults to `"word"`, can be set to `"field"`. Learn more about [property tokenization](../../config-refs/schema/index.md#tokenization).|
| `invertedIndexConfig` > `bm25` > `b` | body | float | `b` parameter for `BM25` searches. Default: 0.75 |
| `invertedIndexConfig` > `bm25` > `k1` | body | float | `k1` parameter for `BM25` searches. Default: 1.2 |
| `invertedIndexConfig` > `stopwords` | body | object | Configure stopword behavior. See [more details here](../../config-refs/schema/index.md#invertedindexconfig--stopwords-stopword-lists). |
| `invertedIndexConfig` > `indexTimestamps` | body | boolean | Maintain an inverted index for each object by its internal timestamps, currently including `creationTimeUnix` and `lastUpdateTimeUnix`.<br/>See [more details here](../../config-refs/schema/index.md#invertedindexconfig--indextimestamps). |
| `invertedIndexConfig` > `indexNullState` | body | boolean | Index null values to allow filtering. |
| `invertedIndexConfig` > `indexPropertyLength` | body | boolean | Index property lengths to allow filtering. |
| `shardingConfig` | body | object | Sharding specific settings. See the [schema configuration reference](../../config-refs/schema/index.md#shardingconfig) page for more details. |
| `replicationConfig` > `factor` | body | int | The replication factor, aka the number of copies in a replicated Weaviate setup. |
| `multiTenancyConfig` > `enabled` | body | Boolean | Whether to enable multi-tenancy for this collection. (Defaults to `false`.) |

### Example request for creating a collection

You can specify as few parameters as the collection name.

import CodeSchemaCreate from '/_includes/code/schema.things.create.mdx';

<CodeSchemaCreate />

Or you can manually specify any number of the possible parameters:

import CodeSchemaCreateElaborate from '/_includes/code/schema.things.create.elaborate.mdx';

<CodeSchemaCreateElaborate />


## Get a single collection from the schema

Retrieves the configuration of a single collection in the schema.

### Method and URL

```js
GET /v1/schema/{collection_name}
```

### Example request

import CodeSchemaGetClass from '/_includes/code/schema.get.class.mdx';

<CodeSchemaGetClass />

## Delete a collection

Remove a collection (and all its data objects).

### Method and URL

```js
DELETE v1/schema/{collection_name}
```

### URL parameters

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{collection_name}` | path | string | The name of the collection |

### Example request for deleting a collection

import CodeSchemaDelete from '/_includes/code/schema.things.delete.mdx';

<CodeSchemaDelete />

## Update a collection

Update settings of an existing collection. Use this endpoint to alter an existing collection in the schema.

:::info Not all settings are mutable

- Please note that not all settings are mutable.
- To update any other (i.e. immutable) setting, you need to delete the collection, re-create it with the correct setting and then re-import the data.

<details>
  <summary>The list of mutable settings</summary>

- `description`
- `invertedIndexConfig`
  - `bm25`
    - `b`
    - `k1`
  - `cleanupIntervalSeconds`
  - `stopwords`
    - `additions`
    - `preset`
    - `removals`
- `replicationConfig`
  - `factor`
- `vectorIndexConfig`
  - `dynamicEfFactor`
  - `dynamicEfMin`
  - `dynamicEfMax`
  - `flatSearchCutoff`
  - `skip`
  - `vectorCacheMaxObjects`
  - `pq`
    - `bitCompression`
    - `centroids`
    - `enabled`
    - `segments`
    - `trainingLimit`
    - `encoder`
      - `type`
      - `distribution`

</details>

:::

This endpoint cannot be used to introduce additional properties. For this, use [`POST /v1/schema/{collection_name}/properties`](#add-a-property). A typical use case for this endpoint is to update configuration, such as `vectorIndexConfig/dynamicEfFactor` or `vectorIndexConfig/pq/bitCompression`. Note that even in mutable sections, such as `vectorIndexConfig`, some fields may be immutable.

You should attach a body to this PUT request with the **entire** new configuration of the collection.

### Method and URL

```js
PUT v1/schema/{collection_name}
```

### Parameters

The URL must contain the following parameter:

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{collection_name}` | path | string | The name of the collection |

Parameters in the PUT body:

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `class` | body | string | The name of the collection (a.k.a. class). Multiple words should be concatenated in CamelCase, e.g. `ArticleAuthor`. |
| `description` | body | string | Description of the collection. |
| `vectorIndexConfig` | body | object | Vector index type specific settings. See the [vector index configuration](../../config-refs/schema/vector-index.md) page for more details. |
| `invertedIndexConfig` > `bm25` > `b` | body | float | `b` parameter for `BM25` searches. Default: 0.75 |
| `invertedIndexConfig` > `bm25` > `k1` | body | float | `k1` parameter for `BM25` searches. Default: 1.2 |
| `invertedIndexConfig` > `stopwords` | body | object | Configure stopword behavior. See [more details here](../../config-refs/schema/index.md#invertedindexconfig--stopwords-stopword-lists). |
| `replicationConfig` > `factor` | body | int | The replication factor, aka the number of copies in a replicated Weaviate setup. |

#### Example request for updating a collection

import CodeSchemaUpdate from '/_includes/code/schema.things.put.mdx';

<CodeSchemaUpdate />

## Add a property

:::caution Limitations

Adding a property after importing objects can lead to limitations in inverted-index related behavior.

<br/>

This is caused by the inverted index being built at import time. If you add a property after importing objects, the inverted index will not be updated. This means that the new property will not be indexed for existing objects. This can lead to unexpected behavior when querying.

<br/>

To avoid this, you can either:
- Add the property before importing objects.
- Delete the collection, re-create it with the new property and then re-import the data.

We are working on a re-indexing API to allow you to re-index the data after adding a property. This will be available in a future release.

:::

### Method and URL

```js
POST v1/schema/{collection_name}/properties
```

### Parameters

| Name | Location | Type | Description |
| ---- | -------- | -----| ----------- |
| `dataType` | body | array | An available [data type](../../config-refs/datatypes.md). |
| `description` | body | string | Description of the property. |
| `moduleConfig`  > `<module_name>` > `skip` | body | boolean | If true, the whole property will NOT be included in vectorization. Default is false, meaning that the object will be NOT be skipped. |
| `moduleConfig`  > `<module_name>` > `vectorizePropertyName` | body | boolean | Whether the name of the property is used in the calculation for the vector position of data objects. Default is true. Learn more about how to [configure indexing in Weaviate](../../config-refs/schema/index.md#configure-semantic-indexing). |
| `name` | body | string | The name of the property. Multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `indexFilterable` (available from `v1.19`) | body | boolean | Should the data stored in this property be indexed with the filterable, Roaring Bitmap index? Read more about [indexing in Weaviate](../../config-refs/schema/vector-index.md#configure-semantic-indexing). |
| `indexSearchable` (available from `v1.19`) | body | boolean | Should the data stored in this property be indexed to allow BM25/hybrid-search index? Read more about [indexing in Weaviate](../../config-refs/schema/vector-index.md#configure-semantic-indexing). |
| `indexInverted` (deprecated) | body | boolean | Should the data stored in this property be indexed? Learn more about [indexing in Weaviate](../../config-refs/schema/vector-index.md#configure-semantic-indexing). |

### Example request for adding a property

import CodeSchemaAddProperties from '/_includes/code/schema.things.properties.add.mdx';

<CodeSchemaAddProperties />

## Inspect the shards of a collection

As described in [Architecture > Storage](../../concepts/storage.md#logical-storage-units-indices-shards-stores), creation of a collection leads to creating an index which manages all the disk storage and vector indexing. An index itself can be comprised of multiple shards. If a collection index is used on multiple nodes of a multi-node Weaviate cluster there must be at least one shard per node.

You can view a list of all shards for a particular collection:

### Method and URL

:::note
This API was added in `v1.12.0`.
:::

```js
GET v1/schema/{collection_name}/shards
```

### Parameters

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{collection_name}` | URL path | string | The name of the collection |

### Example request viewing shards of a collection

import CodeSchemaShardsGet from '/_includes/code/schema.shards.get.mdx';

<CodeSchemaShardsGet />

## Update shard status

A shard may have been marked as read-only, for example because the disk was full. You can manually set a shard to `READY` again using the following API. There is also a convenience function in each client to set the status of all shards of a collection.

### Method and URL

:::note
This API was added in `v1.12.0`
:::

```js
PUT v1/schema/{collection_name}/shards/{shard_name}
```

### Parameters

| Name | Location | Type | Description |
| ---- | -------- | ---- | ----------- |
| `{collection_name}` | URL path | string | The name of the collection. |
| `{shard_name}` | URL path | string | The name/id of the shard. |
| `status` | body | string | The status to update the shard to. One of `READONLY`, `READY`. |

### Example requests to update the status of a shard

import CodeSchemaShardsUpdate from '/_includes/code/schema.shards.put.mdx';

<CodeSchemaShardsUpdate />

## Multi-tenancy

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/manage-data.multi-tenancy.ts';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/manage-data.multi-tenancy.java';
import GoCode from '!!raw-loader!/_includes/code/howto/go/docs/manage-data.multi-tenancy_test.go';


:::info Multi-tenancy availability
- Multi-tenancy available from version `v1.20`
- (Experimental) Tenant activity status setting available from version `v1.21`
:::

:::info Related pages
- [How-to manage data: Multi-tenancy operations](../../manage-data/multi-tenancy.md)
- [Concepts: Data structure: Multi-tenancy](../../concepts/data.md#multi-tenancy)
:::

Tenants are used to separate data between different users or groups of users. They can be specified as follows:

### Enable multi-tenancy

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START EnableMultiTenancy"
      endMarker="# END EnableMultiTenancy"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START EnableMultiTenancy"
      endMarker="# END EnableMultiTenancy"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START EnableMultiTenancy"
      endMarker="// END EnableMultiTenancy"
      language="ts"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START EnableMultiTenancy"
      endMarker="// END EnableMultiTenancy"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START EnableMultiTenancy"
      endMarker="// END EnableMultiTenancy"
      language="go"
    />
  </TabItem>
</Tabs>

### Add tenant(s)

Pass a payload with an array of tenant objects. The available fields are:

| Name | Type | Description |
| ---- | ---- | ----------- |
| `name` | string | (Required) The name of the tenant. |
| `activityStatus` | string | (Optional, experimental) The activity status of the tenant. Can be `HOT` (default) or `COLD`. |

#### Example payload

```
[
  {
    "name": "TENANT_A"
  },
  {
    "name": "TENANT_B",
    "activityStatus": "COLD"
  }
]
```

import TenantNameFormat from '/_includes/tenant-names.mdx';

<TenantNameFormat/>

```js
POST v1/schema/{collection_name}/tenants
```

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START AddTenantsToClass"
      endMarker="# END AddTenantsToClass"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START AddTenantsToClass"
      endMarker="# END AddTenantsToClass"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START AddTenantsToClass"
      endMarker="// END AddTenantsToClass"
      language="ts"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START AddTenantsToClass"
      endMarker="// END AddTenantsToClass"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START AddTenantsToClass"
      endMarker="// END AddTenantsToClass"
      language="go"
    />
  </TabItem>
</Tabs>

### List tenants

```js
GET v1/schema/{collection_name}/tenants
```

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ListTenants"
      endMarker="# END ListTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START ListTenants"
      endMarker="# END ListTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START ListTenants"
      endMarker="// END ListTenants"
      language="ts"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START ListTenants"
      endMarker="// END ListTenants"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START ListTenants"
      endMarker="// END ListTenants"
      language="go"
    />
  </TabItem>
</Tabs>

### Remove tenants

Pass a payload with an array of tenant names in the form of `["TENANT_NAME1", "TENANT_NAME2"]` to remove from the collection.

```js
DELETE v1/schema/{collection_name}/tenants
```

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START RemoveTenants"
      endMarker="# END RemoveTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START RemoveTenants"
      endMarker="# END RemoveTenants"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START RemoveTenants"
      endMarker="// END RemoveTenants"
      language="ts"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START RemoveTenants"
      endMarker="// END RemoveTenants"
      language="java"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START RemoveTenants"
      endMarker="// END RemoveTenants"
      language="go"
    />
  </TabItem>
</Tabs>


### Update tenants

```js
PUT v1/schema/{collection_name}/tenants
```

Pass a payload with an array of tenant objects. For updating tenants, both `name` and `activityStatus` are required.

#### Example payload

```
[
  {
    "name": "TENANT_A",
    "activityStatus": "COLD"
  },
  {
    "name": "TENANT_B",
    "activityStatus": "HOT"
  }
]
```

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START UpdateTenants"
      endMarker="# END UpdateTenants"
      language="py"
    />
  </TabItem>
</Tabs>


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
