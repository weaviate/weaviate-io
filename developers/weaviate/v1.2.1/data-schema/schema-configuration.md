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

You can upload schema classes to Weaviate via the RESTful endpoint `/v1/schema`. Learn more [here](../restful-api-references/schema.html).

# Data objects and structure

Data objects in Weaviate always belongs to a Class, and has one or more Properties.

## Class

A class describes a data object in the form of a noun (e.g., *Person*, *Product*, *Timezone*, etcetera) or a verb (e.g., *Move*, *Buy*, *Eat*, etcetera). If you are using the `text2vec-contextionary` vectorizer module, then Weaviate will always validate if it contextually understands the words in the name you include in the schema. If you add a Class name that it can't recognize, it will not accept the schema.

Classes are always written with a **capital letter** first.

## Properties

Every class has properties. Properties define what kind of data values you will add to an object in Weaviate. In the schema, you define at least the name of the property and its [dataType](./datatypes.html).

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
          "skip": true,                     // if true, the whole property will be included in vectorization. default is false
          "vectorizePropertyName": true,    // whether name of the property is used in the calculation for the vector position of data objects. default is false
        }
      },
      "indexInverted": true,                 // Optional, default is true. By default each property is fully indexed both for full-text, as well as vector-search. You can ignore properties in searches by explicitly setting index to false.
      "invertedIndexConfig": {
        "cleanupIntervalSeconds": 60
      },
    }
  ]
}
```

# Property object

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
          "skip": true,                     // if true, the whole property will be included in vectorization. default is false
          "vectorizePropertyName": true,    // whether name of the property is used in the calculation for the vector position of data objects. default is false
      }
    },
    "indexInverted": true,                 // Optional, default is true. By default each property is fully indexed both for full-text, as well as vector-search. You can ignore properties in searches by explicitly setting index to false.
    "invertedIndexConfig": {
        "cleanupIntervalSeconds": 60
      },
}
```


## Concatenate classes and properties

Sometimes you might want to use multiple words to set as a class or property definition. For example, the year a person is born in, you might want to define with the two words: `born` and `in`. You can do this by capitalizing per word (CamelCase), for example, `bornIn`. Weaviate will validate both words in the `text2vec-contextionary` module.

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
  inPublication
  publicationDate
Author
  name
  wroteArticles
  writesFor
```

# Vectorizer

The vectorizer can be specified per class in the [schema object](#schema-object). Check the [modules page](../modules/index.html) for available vectorizer modules.

## Regulate semantic indexing
With the [`text2vec-contextionary`](../modules/text2vec-contextionary.html) vectorizer module you can specify whether class names, property names or entire properties are included in the calculation of the data object's vector. Read [here](/developers/weaviate/current/schema/schema-configuration.html#regulate-semantic-indexing) how this works.


# More Resources

{% include docs-support-links.html %}