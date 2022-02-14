---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: /v1/schema
intro: 'Before adding data to Weaviate, you need to create a schema. The schema contains the structure of your Weaviate in graph format. You will use the graph format to search through your Weaviate instance using <a href="../graphql-references/">GraphQL</a>. To learn how to create a schema, you can follow <a href="../how-tos/how-to-create-a-schema.html">this How-To tutorial</a>.'
description: 'Before adding data to Weaviate, you need to create a schema. The schema contains the structure of your Weaviate in graph format. You will use the graph format to search through your Weaviate instance.'
tags: ['RESTful API', 'references', 'schema']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/restful-api-references/schema.html
---

# Get the schema

Dumps the current Weaviate schema. The result contains an array of [schema objects](./#schema-object) for both [semantic types](../more-resources/glossary.html) (i.e., `things` and `actions`).

### Method and URL

```js
GET /v1/schema
```

### Example request

{% include code/0.23.2/schema.dump.html %}

#### Example response

```json
 {
   "actions": {
     "classes": [],
     "type": "action"
   },
   "things": {
     "classes": [{
       "class": "Publication",
       "description": "A publication with an online source",
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
             "Article"
           ],
           "description": "The articles this publication has",
           "name": "hasArticles"
         },
         {
           "dataType": [
               "geoCoordinates"
           ],
           "description": "Geo location of the HQ",
           "name": "headquartersGeoLocation"
         }
       ]
     }, {
       "class": "Article",
       "description": "A written text, for example a news article or blog post",
       "properties": [
         {
           "dataType": [
             "string"
           ],
           "description": "Title of the article",
           "name": "title"
         },
         {
           "dataType": [
             "text"
           ],
           "description": "The content of the article",
           "name": "content"
         }
       ]
     }, {
       "class": "Author",
       "description": "The writer of an article",
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
               "Article"
           ],
           "description": "Articles this author wrote",
           "name": "wroteArticles"
         },
         {
           "dataType": [
               "Publication"
           ],
           "description": "The publication this author writes for",
           "name": "writesFor"
         }
       ]
     }],
   "type": "thing"
   }
 }
```

# Create a class

Create a new [semantic kind](../more-resources/glossary.html) (i.e., `things` or `actions`) class in the schema.

### Method and URL

```js
POST /v1/schema/{semantic_kind}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|
| `class` | body | string | The name of the class, multiple words should be concatenated in [CamelCase](./#concatenate-classes-and-properties) like `ArticleAuthor`. |
| `vectorizeClassName` | body | boolean | Should the classname be part of the vector index? Learn more about how to regulate indexing in Weaviate [here](./#regulate-semantic-indexing). |
| `description` | body | string | Description of the classname |
| `properties` | body | array | An array of property objects |
| `properties` > `dataType` | body | array | Click [here](./index.html#property-datatypes) for a list of available data types. |
| `properties` > `description` | body | string | Description of the property |
| `properties` > `vectorizePropertyName` | body | boolean | Should the property be part of the vector index? Learn more about how to regulate indexing in Weaviate [here](./#regulate-semantic-indexing). |
| `properties` > `name` | body | string | The name of the property, multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `properties` > `index` | body | boolean | Should the the data stored in this property be indexed? Learn more about how to regulate indexing in Weaviate [here](./#regulate-semantic-indexing). |


### Example request for creating a Thing

{% include code/0.23.2/schema.things.create.html %}

### Example request for creating an Action

{% include code/0.23.2/schema.actions.create.html %}

# Delete a class

Remove a class (and all data in the instances) from the schema.

### Method and URL

```js
DELETE v1/schema/{semantic_kind}/{class_name}
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions`|
| `{class_name}` | URL | string | The name of the class |

### Example request for deleting a class

{% include code/0.23.2/schema.things.delete.html %}

# Add a property

### Method and URL

```js
POST v1/schema/{semantic_kind}/{class_name}/properties
```

### Parameters

| name | location | type | description |
| ---- | ---- | ----------- |
| `{semantic_kind}` | URL | string | A [semantic kind](../more-resources/glossary.html) is used to -respectively- describe nouns or verbs. Options are `things` or `actions` |
| `{class_name}` | URL | string | The name of the class |
| `dataType` | body | array | Click [here](./index.html#property-datatypes) for a list of available data types. |
| `description` | body | string | Description of the property |
| `vectorizePropertyName` | body | boolean | Should the proename be part of the vector index? Learn more about how to regulate indexing in Weaviate [here](./#regulate-semantic-indexing) |
| `name` | body | string | The name of the property, multiple words should be concatenated in camelCase like `nameOfAuthor`. |
| `index` | body | boolean | Should the the data stored in this property be indexed? Learn more about how to regulate indexing in Weaviate [here](./#regulate-semantic-indexing) |

### Example request for adding a property

{% include code/0.23.2/schema.things.properties.add.html %}

# More Resources

{% include docs-support-links.html %}