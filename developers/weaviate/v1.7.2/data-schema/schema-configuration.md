---
layout: layout-documentation
solution: weaviate
sub-menu: Data schema
title: Schema configuration
description: 
tags: ['Schema configuration']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Introduction

A data schema is the first thing you'll need to define before you can start adding data. A data schema specifies what data classes your Weaviate will have, and what properties data objects consist of. Per data class property you will define what data type its value can adopt. If you want to make graph links between data objects, you'll also define that in the data type of class properties.

Additionally, per data class you can define the vector index type, the vectorizer module and optionally other modules. Specific settings to modules and the vector index type can also be set per class and per property. 

A Weaviate data schema is slightly different from a taxonomy, which has a hierarchy. Read more about how taxonomies, ontologies and schemas are related to Weaviate in [this blog post](https://medium.com/semi-technologies/taxonomies-ontologies-and-schemas-how-do-they-relate-to-weaviate-9f76739fc695).

You can upload schema classes to Weaviate via the RESTful endpoint `/v1/schema`. Learn more [here](../restful-api-references/schema.html).

# Data objects and structure

Data objects in Weaviate always belongs to a Class, and has one or more Properties.

## Class

A class describes a data object in the form of a noun (e.g., *Person*, *Product*, *Timezone*, etcetera) or a verb (e.g., *Move*, *Buy*, *Eat*, etcetera). If you are using the `text2vec-contextionary` vectorizer module, then Weaviate will always validate if it contextually understands the words in the name you include in the schema. If you add a Class name that it can't recognize, it will not accept the schema.

Classes are always written with a **capital letter** first.

## Properties

Every class has properties. Properties define what kind of data values you will add to an object in Weaviate. In the schema, you define at least the name of the property and its [dataType](./datatypes.html). Property names allow `/[_A-Za-z][_0-9A-Za-z]*/` in the name. 

# Schema object

An example of a complete schema object:

```json
{
  "class": "string",                        // The name of the class in string format
  "description": "string",                  // A description for your reference
  "vectorIndexType": "hnsw",                // defaults to hnsw, can be omitted in schema definition since this is the only available type for now
  "vectorIndexConfig": {
    ...                                     // vector index type specific settings
  },
  "vectorizer": "text2vec-contextionary",   // vectorizer to use for data objects added to this class
  "moduleConfig": {
    "text2vec-contextionary": {  
      "vectorizeClassName": true            // include the class name in vector calculation (default true)
    }
  },
  "properties": [                           // An array of the properties you are adding, same as a Property Object
    {
      "name": "string",                     // The name of the property
      "description": "string",              // A description for your reference
      "dataType": [                         // The data type of the object as described above, When creating cross references, a property can have multiple dataTypes
        "string"
      ],
      "moduleConfig": {                     // module specific settings
        "text2vec-contextionary": {
          "skip": true,                     // if true, the whole property will NOT be included in vectorization. default is false, meaning that the object will be NOT be skipped
          "vectorizePropertyName": true,    // whether name of the property is used in the calculation for the vector position of data objects. default is false
        }
      },
      "indexInverted": true                 // Optional, default is true. By default each property is fully indexed both for full-text, as well as vector-search. You can ignore properties in searches by explicitly setting index to false.
    }
  ],
  "invertedIndexConfig": {                  // Optional, defaults to the values shown here.
    "cleanupIntervalSeconds": 60            // Interval for async cleanup operations.
  }
}
```

### vectorizer
The vectorizer (`"vectorizer": "..."`) can be specified per class in the [schema object](#schema-object). Check the [modules page](../modules/index.html) for available vectorizer modules.

In case you don't want to use a vectorization module to calculate vectors from data objects, and want to enter the vectors per data object yourself when adding data objects, make sure to set `"vectorizer": "none"`.

__Regulate semantic indexing__

With the [`text2vec-contextionary`](../modules/text2vec-contextionary.html) vectorizer module you can specify whether class names, property names or entire properties are included in the calculation of the data object's vector. Read [here](../modules/text2vec-contextionary.html#regulate-semantic-indexing) how this works.

### vectorIndexType

The vectorIndexType defaults to [`hnsw`](../vector-index-plugins/hnsw.html) since this is the only available vector indexing algorithm implemented at the moment.

### vectorIndexConfig

Check the [`hsnw` page](../vector-index-plugins/hnsw.html#how-to-use-hnsw-and-parameters) for `hsnw` parameters that you can configure.


# Property object

Property names allow `/[_A-Za-z][_0-9A-Za-z]*/` in the name. 

An example of a complete property object:

```json
{
    "name": "string",                     // The name of the property
    "description": "string",              // A description for your reference
    "dataType": [                         // The data type of the object as described above, When creating cross references, a property can have multiple dataTypes
    "string"
    ],
    "moduleConfig": {                     // module specific settings
      "text2vec-contextionary": {
          "skip": true,                     // if true, the whole property will NOT be included in vectorization. default is false, meaning that the object will be NOT be skipped
          "vectorizePropertyName": true,    // whether name of the property is used in the calculation for the vector position of data objects. default is false
      }
    },
    "indexInverted": true                 // Optional, default is true. By default each property is fully indexed both for full-text, as well as vector-search. You can ignore properties in searches by explicitly setting index to false.
}
```


## Concatenate classes and properties

Sometimes you might want to use multiple words to set as a class or property
definition. For example, the year a person is born in, you might want to define
with the two words: `born` and `in`. You can do this by capitalizing per word
(CamelCase), for example, `bornIn`. When using the `text2vec-contextionary`
module, the camel case words will be split up to try and derive its semantic
meaning. Without this particular module there is no semantic meaning to
camel-casing. Starting with `v1.7.2` you can also use underscores in properties
names (`snake_case`), e.g. `has_articles`, `publication_date`, etc.

For example:

```yaml
Publication
  name
  hasArticles
Article
  title
  summary
  wordCount
  url
  hasAuthors
  inPublication        # CamelCase (all versions)
  publication_date     # snake_case (from v1.7.2 on)
Author
  name
  wroteArticles
  writesFor
```

# Auto-schema

If you don't create a schema manually before adding data, a schema will be generated automatically (available from Weaviate version v1.5.0). This feature is present and on by default, which you can change in the Weaviate's environment variables (e.g. in `docker-compose.yml`): default: `AUTOSCHEMA_ENABLED:  'true'`, disable by setting `AUTOSCHEMA_ENABLED: 'false'`.

It has the following characteristics:

* When the module is present, the schema can still be created manually.
* When a previously seen class is imported, which contains a property that Weaviate has not seen yet, the module alters the schema before importing the object. See section "DataTypes" below for details on how a property should be created.
* When a previously seen class is imported, which contains a property which conflicts with the current schema type, an error is thrown. (e.g. trying to import a `string` into a field that exists in the schema as `int`).
* When a previously unseen class is imported, the class is created alongside all the properties.
* Also automatically recognizes array datatypes, such as `string[]`, `int[]`, `text[]`, `number[]`, `boolean[]` and `date[]`. 

### Datatypes

Weaviate needs to guess the datatypes based on the objects it sees, for this you can set some preferences. e.g.

* `AUTOSCHEMA_DEFAULT_STRING=text` would tell Weaviate that when it sees a prop of type `string`, it should treat it as `text` (as opposed to `string`)
* `AUTOSCHEMA_DEFAULT_NUMBER=number` would tell Weaviate that when its sees a numerical value, it should treat it as number as opposed to `int`, etc.
* `AUTOSCHEMA_DEFAULT_DATE=date` respectively

The above configurable defaults will themselves default to something reasonable, if they are not set.

In addition, we need to catch types we do not support at all:
* Any map type is forbidden, unless it clearly matches one of the two supported types `phoneNumber` or `geoCoordinates`.
* Any array type is forbidden, unless it is clearly a reference-type. In this case Weaviate needs to resolve the beacon and see what the class of the resolved beacon is, since it needs the ClassName to be able to alter the schema.


# More Resources

{% include docs-support-links.html %}
