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
og: /img/og/og-documentation/restful-api-references-v1schema.jpg
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
| `moduleConfig` > `text2vec-contextionary`  > `vectorizeClassName` | body | object | include the class name in vector calculation (default true). Learn more about how to regulate indexing in Weaviate [here](../modules/text2vec-contextionary.html#regulate-semantic-indexing). |
| `properties` | body | array | An array of property objects |
| `properties` > `dataType` | body | array | Click [here](../data-schema/datatypes.html) for a list of available data types. |
| `properties` > `description` | body | string | Description of the property |
| `properties` > `moduleConfig`  > `text2vec-contextionary` > `skip` | body | boolean | if true, the whole property will NOT be included in vectorization. default is false, meaning that the object will be NOT be skipped |
| `properties` > `moduleConfig`  > `text2vec-contextionary` > `vectorizePropertyName` | body | boolean | whether name of the property is used in the calculation for the vector position of data objects. default is true. Learn more about how to regulate indexing in Weaviate [here](../modules/text2vec-contextionary.html#regulate-semantic-indexing). |
| `properties` > `name` | body | string | The name of the property, multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `properties` > `indexInverted` | body | boolean | Should the the data stored in this property be indexed? Learn more about how to regulate indexing in Weaviate [here](../modules/text2vec-contextionary.html#regulate-semantic-indexing). |


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
| `moduleConfig`  > `text2vec-contextionary` > `vectorizePropertyName` | body | boolean | whether name of the property is used in the calculation for the vector position of data objects. default is true. Learn more about how to regulate indexing in Weaviate [here](../modules/text2vec-contextionary.html#regulate-semantic-indexing). |
| `name` | body | string | The name of the property, multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `indexInverted` | body | boolean | Should the the data stored in this property be indexed? Learn more about how to regulate indexing in Weaviate [here](../modules/text2vec-contextionary.html#regulate-semantic-indexing). |


### Example request for adding a property

{% include code/1.x/schema.things.properties.add.html %}

# More Resources

{% include docs-support-links.html %}