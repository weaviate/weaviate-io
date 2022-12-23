---
title: REST - /v1/schema
sidebar_position: 11
# layout: layout-documentation
# solution: weaviate
# sub-menu: RESTful API references
# title: /v1/schema
# intro: 'Before adding data to Weaviate, you need to create a schema. The schema contains the structure of your Weaviate in graph format. You will use the graph format to search through your Weaviate instance using <a href="../references/graphql/">GraphQL</a>. To learn how to create a schema, you can follow <a href="/docs/weaviate/guides/how-to-create-a-schema.md">this How-To tutorial</a>.'
# description: 'Before adding data to Weaviate, you need to create a schema. The schema contains the structure of your Weaviate in graph format. You will use the graph format to search through your Weaviate instance.'
# tags: ['RESTful API', 'references', 'schema']
# sidebar_position: 1
# open-graph-type: article
# toc: true
# redirect_from:
#     - /docs/weaviate/v1.11.0/data-weaviate/schema-configuration.md
#     - /documentation/weaviate/references/rest/schema.md
---
import Badges from '/_includes/badges.mdx';

<Badges/>

NOTE: From v1.5.0 onwards creating a schema is now optional, learn more about [Auto Schema here](/docs/weaviate/configuration/schema-configuration.md#auto-schema).

## Get the schema
Dumps the current Weaviate schema. The result contains an array of objects.

#### Method and URL

```js
GET /v1/schema
```

#### Example request

import CodeSchemaDump from '/_includes/code/schema.dump.mdx';

<CodeSchemaDump />

#### Example response
<!-- TODO: Does this really needs to be this long? -->

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
            "string"
          ],
          "description": "category name",
          "indexInverted": true,
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
            "string"
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
            "string"
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
            "string"
          ],
          "description": "title of the article",
          "indexInverted": true,
          "moduleConfig": {
            "text2vec-contextionary": {
              "vectorizePropertyName": false
            }
          },
          "name": "title"
        },
        {
          "dataType": [
            "string"
          ],
          "description": "url of the article",
          "indexInverted": false,
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
          "indexInverted": true,
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

## Create a class

Create a new data object class in the schema.

NOTE: From v1.5.0 onwards creating a schema is now optional, learn more about [Auto Schema here](/docs/weaviate/configuration/schema-configuration.md#auto-schema).

#### Method and URL

```js
POST /v1/schema
```

#### Parameters

Learn more about the schema configuration [here](/docs/weaviate/configuration/schema-configuration.md).

| name | location | type | description |
| ---- | ---- | ----------- |
| `class` | body | string | The name of the class, multiple words should be concatenated in CamelCase like `ArticleAuthor`. |
| `description` | body | string | Description of the classname |
| `vectorIndexType` | body | string | defaults to hnsw, can be omitted in schema definition since this is the only available type for now |
| `vectorIndexConfig` | body | object | vector index type specific settings |
| `vectorizer` | body | string | vectorizer to use for data objects added to this class, default can be set in Weaviate's environment variables |
| `moduleConfig` > `text2vec-contextionary`  > `vectorizeClassName` | body | object | include the class name in vector calculation (default true). Learn more about how to regulate indexing in Weaviate [here](/docs/weaviate/configuration/schema-configuration.md#regulate-semantic-indexing). |
| `properties` | body | array | An array of property objects |
| `properties` > `dataType` | body | array | Click [here](/docs/weaviate/configuration/datatypes.md) for a list of available data types. |
| `properties` > `description` | body | string | Description of the property |
| `properties` > `moduleConfig`  > `text2vec-contextionary` > `skip` | body | boolean | if true, the whole property will NOT be included in vectorization. default is false, meaning that the object will be NOT be skipped |
| `properties` > `moduleConfig`  > `text2vec-contextionary` > `vectorizePropertyName` | body | boolean | whether name of the property is used in the calculation for the vector position of data objects. default is true. Learn more about how to regulate indexing in Weaviate [here](/docs/weaviate/configuration/schema-configuration.md#regulate-semantic-indexing). |
| `properties` > `name` | body | string | The name of the property, multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `properties` > `indexInverted` | body | boolean | Should the the data stored in this property be indexed? Learn more about how to regulate indexing in Weaviate [here](/docs/weaviate/configuration/schema-configuration.md#regulate-semantic-indexing). |
| `properties` > `tokenization` | body | string | Only for `string`/`text` props. Introduced in `v1.12.0`. Control how a field is tokenized in the inverted index. Defaults to `"word"`, can be set to `"field"`. See [more details here](/docs/weaviate/configuration/schema-configuration.md#property-tokenization).|
| `invertedIndexConfig` > `stopwords` | body | object | Configure which words should be treated as stopwords and therefore be ignored on inverted indexing and querying. See [more details here](/docs/weaviate/configuration/schema-configuration.md#invertedindexconfig--stopwords-stopword-lists). |
| `invertedIndexConfig` > `indexTimestamps` | body | boolean | Maintain an inverted index for each object by its internal timestamps, currently including `creationTimeUnix` and `lastUpdateTimeUnix` See [more details here](/docs/weaviate/configuration/schema-configuration.md#invertedindexconfig--indextimestamps). |
| `replicationConfig` > `factor` | body | int | The replication factor, aka the number of copies in a replicated Weaviate setup |

#### Example request for creating a class

import CodeSchemaCreate from '/_includes/code/schema.things.create.mdx';

<CodeSchemaCreate />

Or with all the possible parameters:

import CodeSchemaCreateElaborate from '/_includes/code/schema.things.create.elaborate.mdx';

<CodeSchemaCreateElaborate />


## Get a single class from the schema

Retrieves the configuration of a single class in the schema. 

#### Method and URL

```js
GET /v1/schema/{className}
```

#### Example request

import CodeSchemaGetClass from '/_includes/code/schema.get.class.mdx';

<CodeSchemaGetClass />

## Delete a class

Remove a class (and all data in the instances) from the schema.

#### Method and URL

```js
DELETE v1/schema/{class_name}
```

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{class_name}` | URL | string | The name of the class |

#### Example request for deleting a class

import CodeSchemaDelete from '/_includes/code/schema.things.delete.mdx';

<CodeSchemaDelete />

## Update a class

Update settings of an existing schema class. 

Use this endpoint to alter an existing class in the schema. Note that not all settings are mutable. If an error about immutable fields is returned and you still need to update this particular setting, you will have to delete the class (and the underlying data) and recreate. This endpoint cannot be used to modify properties. Instead use [`POST /v1/schema/{className}/properties`](#add-a-property). A typical use case for this endpoint is to update configuration, such as the `vectorIndexConfig`. Note that even in mutable sections, such as `vectorIndexConfig`, some fields may be immutable.

You should attach a body to this PUT request with the **entire** new configuration of the class. 

#### Method and URL

```js
PUT v1/schema/{class_name}
```

#### Parameters

Parameter in the PUT request:

| name | location | type | description |
| ---- | ---- | ----------- |
| `{class_name}` | URL | string | The name of the class |

Parameter in the PUT body:

| name | location | type | description |
| ---- | ---- | ----------- |
| `class` | body | string | The name of the class, multiple words should be concatenated in CamelCase like `ArticleAuthor`. |
| `description` | body | string | Description of the classname |
| `vectorIndexType` | body | string | defaults to hnsw, can be omitted in schema definition since this is the only available type for now |
| `vectorIndexConfig` | body | object | vector index type specific settings |
| `vectorizer` | body | string | vectorizer to use for data objects added to this class, default can be set in Weaviate's environment variables |
| `moduleConfig` > `text2vec-contextionary`  > `vectorizeClassName` | body | object | include the class name in vector calculation (default true). Learn more about how to regulate indexing in Weaviate [here](/docs/weaviate/configuration/schema-configuration.md#regulate-semantic-indexing). |
| `properties` | body | array | An array of property objects |
| `properties` > `dataType` | body | array | Click [here](/docs/weaviate/configuration/datatypes.md) for a list of available data types. |
| `properties` > `description` | body | string | Description of the property |
| `properties` > `moduleConfig`  > `text2vec-contextionary` > `skip` | body | boolean | if true, the whole property will NOT be included in vectorization. default is false, meaning that the object will be NOT be skipped |
| `properties` > `moduleConfig`  > `text2vec-contextionary` > `vectorizePropertyName` | body | boolean | whether name of the property is used in the calculation for the vector position of data objects. default is true. Learn more about how to regulate indexing in Weaviate [here](/docs/weaviate/configuration/schema-configuration.md#regulate-semantic-indexing). |
| `properties` > `name` | body | string | The name of the property, multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `properties` > `indexInverted` | body | boolean | Should the the data stored in this property be indexed? Learn more about how to regulate indexing in Weaviate [here](/docs/weaviate/configuration/schema-configuration.md#regulate-semantic-indexing). |
| `properties` > `tokenization` | body | string | Only for `string`/`text` props. Introduced in `v1.12.0`. Control how a field is tokenized in the inverted index. Defaults to `"word"`, can be set to `"field"`. See [more details here](/docs/weaviate/configuration/schema-configuration.md#property-tokenization).|
| `invertedIndexConfig` > `stopwords` | body | object | Configure which words should be treated as stopwords and therefore be ignored on inverted indexing and querying. See [more details here](/docs/weaviate/configuration/schema-configuration.md#invertedindexconfig--stopwords-stopword-lists). |
| `invertedIndexConfig` > `indexTimestamps` | body | boolean | Maintain an inverted index for each object by its internal timestamps, currently including `creationTimeUnix` and `lastUpdateTimeUnix` See [more details here](/docs/weaviate/configuration/schema-configuration.md#invertedindexconfig--indextimestamps). |


#### Example request for updating a class

import CodeSchemaUpdate from '/_includes/code/schema.things.put.mdx';

<CodeSchemaUpdate />

## Add a property

#### Method and URL

```js
POST v1/schema/{class_name}/properties
```

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `dataType` | body | array | Click [here](/docs/weaviate/configuration/datatypes.md) for a list of available data types. |
| `description` | body | string | Description of the property |
| `moduleConfig`  > `text2vec-contextionary` > `skip` | body | boolean | if true, the whole property will NOT be included in vectorization. default is false, meaning that the object will be NOT be skipped |
| `moduleConfig`  > `text2vec-contextionary` > `vectorizePropertyName` | body | boolean | whether name of the property is used in the calculation for the vector position of data objects. default is true. Learn more about how to regulate indexing in Weaviate [here](/docs/weaviate/configuration/schema-configuration.md#regulate-semantic-indexing). |
| `name` | body | string | The name of the property, multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `indexInverted` | body | boolean | Should the the data stored in this property be indexed? Learn more about how to regulate indexing in Weaviate [here](/docs/weaviate/configuration/schema-configuration.md#regulate-semantic-indexing). |

#### Example request for adding a property

import CodeSchemaAddProperties from '/_includes/code/schema.things.properties.add.mdx';

<CodeSchemaAddProperties />

## Inspect the shards of a class

As described in [Architecture > Storage](/docs/weaviate/architecture/storage.md#logical-storage-units-indices-shards-stores), creation of a class leads to creating an index which manages all the disk storage and vector indexing. An index itself can be comprised of multiple shards. If a class index is used on multiple nodes of a multi-node Weaviate cluster there must be at least one shard per node.

You can view a list of all shards for a particular class:

#### Method and URL

*Note: This API was added in `v1.12.0`*

```js
GET v1/schema/{class_name}/shards
```

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{class_name}` | URL | string | The name of the class |

#### Example request viewing shards of a class

import CodeSchemaShardsGet from '/_includes/code/schema.shards.get.mdx';

<CodeSchemaShardsGet />

## Update shard status

A shard may have been marked as read-only, for example because the disk was full. You can manually set a shard to `READY` again using the following API. There is also a convenience function in each client to set the status of all shards of a class. 

#### Method and URL

:::note
This API was added in `v1.12.0`
:::

```js
PUT v1/schema/{class_name}/shards/{shard_name}
```

#### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{class_name}` | URL | string | The name of the class |
| `{shard_name}` | URL | string | The name/id of the shard |
| `status` | body | string | The status to update the shard to. One of `READONLY`, `READY` |

#### Example requests to update the status of a shard

import CodeSchemaShardsUpdate from '/_includes/code/schema.shards.put.mdx';

<CodeSchemaShardsUpdate />

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
