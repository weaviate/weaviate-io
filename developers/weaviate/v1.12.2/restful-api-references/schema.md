---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: /v1/schema
intro: 'Before adding data to Weaviate, you need to create a schema. The schema contains the structure of your Weaviate in graph format. You will use the graph format to search through your Weaviate instance using <a href="../graphql-references/">GraphQL</a>. To learn how to create a schema, you can follow <a href="../tutorials/how-to-create-a-schema.html">this How-To tutorial</a>.'
description: 'Before adding data to Weaviate, you need to create a schema. The schema contains the structure of your Weaviate in graph format. You will use the graph format to search through your Weaviate instance.'
tags: ['RESTful API', 'references', 'schema']
menu-order: 1
open-graph-type: article
toc: true
redirect_from:
    - /documentation/weaviate/current/restful-api-references/schema.html
---

NOTE: From v1.5.0 onwards creating a schema is now optional, learn more about [Auto Schema here](../data-schema/schema-configuration.html#auto-schema).

# Get the schema

Dumps the current Weaviate schema. The result contains an array of objects.

### Method and URL

```js
GET /v1/schema
```

### Example request

{% include code/1.x/schema.dump.html %}

#### Example response

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

# Create a class

Create a new data object class in the schema.

NOTE: From v1.5.0 onwards creating a schema is now optional, learn more about [Auto Schema here](../data-schema/schema-configuration.html#auto-schema).

### Method and URL

```js
POST /v1/schema
```

### Parameters

Learn more about the schema configuration [here](../data-schema/schema-configuration.html).

| name | location | type | description |
| ---- | ---- | ----------- |
| `class` | body | string | The name of the class, multiple words should be concatenated in CamelCase like `ArticleAuthor`. |
| `description` | body | string | Description of the classname |
| `vectorIndexType` | body | string | defaults to hnsw, can be omitted in schema definition since this is the only available type for now |
| `vectorIndexConfig` | body | object | vector index type specific settings |
| `vectorizer` | body | string | vectorizer to use for data objects added to this class, default can be set in Weaviate's environment variables |
| `moduleConfig` > `text2vec-contextionary`  > `vectorizeClassName` | body | object | include the class name in vector calculation (default true). Learn more about how to regulate indexing in Weaviate [here](/developers/weaviate/current/schema/schema-configuration.html#regulate-semantic-indexing). |
| `properties` | body | array | An array of property objects |
| `properties` > `dataType` | body | array | Click [here](../data-schema/datatypes.html) for a list of available data types. |
| `properties` > `description` | body | string | Description of the property |
| `properties` > `moduleConfig`  > `text2vec-contextionary` > `skip` | body | boolean | if true, the whole property will NOT be included in vectorization. default is false, meaning that the object will be NOT be skipped |
| `properties` > `moduleConfig`  > `text2vec-contextionary` > `vectorizePropertyName` | body | boolean | whether name of the property is used in the calculation for the vector position of data objects. default is true. Learn more about how to regulate indexing in Weaviate [here](/developers/weaviate/current/schema/schema-configuration.html#regulate-semantic-indexing). |
| `properties` > `name` | body | string | The name of the property, multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `properties` > `indexInverted` | body | boolean | Should the the data stored in this property be indexed? Learn more about how to regulate indexing in Weaviate [here](/developers/weaviate/current/schema/schema-configuration.html#regulate-semantic-indexing). |
| `properties` > `tokenization` | body | string | Only for `string`/`text` props. Introduced in `v1.12.0`. Control how a field is tokenized in the inverted index. Defaults to `"word"`, can be set to `"field"`. See [more details here](../data-schema/schema-configuration.html#property-tokenization).|
| `invertedIndexConfig` > `stopwords` | body | object | Configure which words should be treated as stopwrds and therefore be ignored on inverted indexing and querying. See [more details here](../data-schema/schema-configuration.html#invertedindexconfig--stopwords-stopword-lists). |


### Example request for creating a class

{% include code/1.x/schema.things.create.html %}

Or with all the possible parameters:

{% include code/1.x/schema.things.create.elaborate.html %}

# Delete a class

Remove a class (and all data in the instances) from the schema.

### Method and URL

```js
DELETE v1/schema/{class_name}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{class_name}` | URL | string | The name of the class |

### Example request for deleting a class

{% include code/1.x/schema.things.delete.html %}

# Add a property

### Method and URL

```js
POST v1/schema/{class_name}/properties
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `dataType` | body | array | Click [here](../data-schema/datatypes.html) for a list of available data types. |
| `description` | body | string | Description of the property |
| `moduleConfig`  > `text2vec-contextionary` > `skip` | body | boolean | if true, the whole property will NOT be included in vectorization. default is false, meaning that the object will be NOT be skipped |
| `moduleConfig`  > `text2vec-contextionary` > `vectorizePropertyName` | body | boolean | whether name of the property is used in the calculation for the vector position of data objects. default is true. Learn more about how to regulate indexing in Weaviate [here](/developers/weaviate/current/schema/schema-configuration.html#regulate-semantic-indexing). |
| `name` | body | string | The name of the property, multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `indexInverted` | body | boolean | Should the the data stored in this property be indexed? Learn more about how to regulate indexing in Weaviate [here](/developers/weaviate/current/schema/schema-configuration.html#regulate-semantic-indexing). |


### Example request for adding a property

{% include code/1.x/schema.things.properties.add.html %}

# Inspect the shards of a class

As described in [Architecture >
Storage](../architecture/storage.html#logical-storage-units-indices-shards-stores),
creation of a class leads to creating an index which manages all the disk
storage and vector indexing. An index itself can be comprised of multiple
shards. If a class index is used on multiple nodes of a multi-node Weaviate
cluster there must be at least one shard per node.

You can view a list of all shards for a particular class:

### Method and URL

*Note: This API was added in `v1.12.0`*

```js
GET v1/schema/{class_name}/shards
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{class_name}` | URL | string | The name of the class |

### Example request viewing shards of a class

{% include code/1.x/schema.shards.get.html %}

# Update shard status

A shard may have been marked as read-only, for example because the disk was
full. You can manually set a shard to `READY` again using the following API.
There is also a convenience function in each client to set the status of all
shards of a class. 

### Method and URL

*Note: This API was added in `v1.12.0`*

```js
PUT v1/schema/{class_name}/shards/{shard_name}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{class_name}` | URL | string | The name of the class |
| `{shard_name}` | URL | string | The name/id of the shard |
| `status` | body | string | The status to update the shard to. One of `READONLY`, `READY` |

### Example requests to update the status of a shard

{% include code/1.x/schema.shards.put.html %}

# More Resources

{% include docs-support-links.html %}
