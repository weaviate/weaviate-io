---
title: Schema configuration
sidebar_position: 21
# layout: layout-documentation
# solution: weaviate
# sub-menu: Schema
# title: Schema configuration
# description: 
# tags: ['Schema configuration']
# sidebar_position: 1
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.4.1/data-schema/schema-configuration.html
#     - /developers/weaviate/v1.11.0/data-schema/schema-configuration.html
---

# Introduction

A data schema is the first thing you'll need to define before you can start adding data. A data schema specifies what data classes your Weaviate will have, and what properties data objects consist of. Per the data class property, you will define what data type its value can adopt. If you want to make graph links between data objects, you'll also define that in the data type of class properties.

Additionally, per the data class, you can define the vector index type, the vectorizer module and, optionally, other modules. Specific settings to modules and the vector index type can also be set per class and per property. 

A Weaviate data schema is slightly different from a taxonomy, which has a hierarchy. Read more about how taxonomies, ontologies and schemas are related to Weaviate in [this blog post](https://medium.com/semi-technologies/taxonomies-ontologies-and-schemas-how-do-they-relate-to-weaviate-9f76739fc695).

You can upload schema classes to Weaviate via the RESTful endpoint `/v1/schema`. Learn more [here](../restful-api-references/schema.html).

> 💡 Check out the [schema getting started guide](/developers/weaviate/current/getting-started/schema.html) to learn how to work with the Weaviate schema in under 10 minutes.

# Data objects and structure

Data objects in Weaviate always belongs to a Class, and has one or more Properties.

## Auto-schema

If you don't create a schema manually before adding data, a schema will be generated automatically (available from Weaviate version v1.5.0). This feature is present and on by default, which you can change in the Weaviate's environment variables (e.g. in `docker-compose.yml`): default: `AUTOSCHEMA_ENABLED:  'true'`, disable by setting `AUTOSCHEMA_ENABLED: 'false'`.

It has the following characteristics:

* When the module is present, the schema can still be created manually.
* When a previously seen class is imported, which contains a property that Weaviate has not seen yet, the module alters the schema before importing the object. See section "DataTypes" below for details on how a property should be created.
* When a previously seen class is imported, which contains a property which conflicts with the current schema type, an error is thrown. (e.g. trying to import a `string` into a field that exists in the schema as `int`).
* When a previously unseen class is imported, the class is created alongside all the properties.
* Also Weaviate automatically recognizes array datatypes, such as `string[]`, `int[]`, `text[]`, `number[]`, `boolean[]` and `date[]`. 

## Class

A class describes a data object in the form of a noun (e.g., *Person*,
*Product*, *Timezone*, etcetera) or a verb (e.g., *Move*, *Buy*, *Eat*,
etcetera). If you are using the `text2vec-contextionary` vectorizer module,
then Weaviate will always validate if it contextually understands the words in
the name you include in the schema. If you add a Class name that it can't
recognize, it will not accept the schema.

Classes are always written with a **capital letter** first. This helps in
distinguishing classes from primitive data types when used in properties. For
example, `dataType: ["string"]` means that a property is a string, whereas
`dataType: ["String"]` means that a property is a cross-reference type to a
class named `String`.

After the first letter, classes may use any GraphQL-compatible characters. The
current (as of `v1.10.0+`) class name validation regex is
`/^[A-Z][_0-9A-Za-z]*$/`.

## Properties

Every class has properties. Properties define what kind of data values you will add to an object in Weaviate. In the schema, you define at least the name of the property and its [dataType](./datatypes.html). Property names allow `/[_A-Za-z][_0-9A-Za-z]*/` in the name. 

# Class object

An example of a complete class object including properties:

```json
{
  "class": "string",                        // The name of the class in string format
  "description": "string",                  // A description for your reference
  "vectorIndexType": "hnsw",                // defaults to hnsw, can be omitted in schema definition since this is the only available type for now
  "vectorIndexConfig": {
    ...                                     // vector index type specific settings, including distance metric
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
    "cleanupIntervalSeconds": 60,            // Interval for async cleanup operations.
    "stopwords": { 
      ...                                   // Optional, controls which words should be ignored in the inverted index, see section below
    },
    "indexTimestamps": false,                 // Optional, maintains inverted indices for each object by its internal timestamps
    "IndexNullState": false,                 // Optional, maintains inverted indices for each property regarding its null state
    "IndexPropertyLength": false            // Optional, maintains inverted indices for each property by its length
  },
  "shardingConfig": {
    ...                                     // Optional, controls behavior of class in a multi-node setting, see section below
  }
}
```

### vectorizer

The vectorizer (`"vectorizer": "..."`) can be specified per class in the schema object. Check the [modules page](../modules/index.html) for available vectorizer modules.

In case you don't want to use a vectorization module to calculate vectors from data objects, and want to enter the vectors per data object yourself when adding data objects, make sure to set `"vectorizer": "none"`.

__Regulate semantic indexing__

With the [`text2vec-contextionary`](../modules/text2vec-contextionary.html) vectorizer module you can specify whether class names, property names or entire properties are included in the calculation of the data object's vector. Read [here](/developers/weaviate/current/schema/schema-configuration.html#regulate-semantic-indexing) how this works.

### vectorIndexType

The vectorIndexType defaults to [`hnsw`](../vector-index-plugins/hnsw.html) since this is the only available vector indexing algorithm implemented at the moment.

### vectorIndexConfig

Check the [`hsnw` page](../vector-index-plugins/hnsw.html#how-to-use-hnsw-and-parameters) for `hsnw` parameters that you can configure. This includes setting the distance metric to be used with Weaviate.

### shardingConfig (introduced in v1.8.0)

The `"shardingConfig"` controls how a class should be [sharded and distributed
across multiple nodes](../architecture/cluster.html). All values are optional and
default to the following settings:

```json
  "shardingConfig": {
    "virtualPerPhysical": 128,
    "desiredCount": 1,             # defaults to the amount of Weaviate nodes in the cluster
    "actualCount": 1,
    "desiredVirtualCount": 128,
    "actualVirtualCount": 128,
    "key": "_id",
    "strategy": "hash",
    "function": "murmur3"
  }
```

The meaning of the individual fields in detail:

* `"desiredCount"`: *integer, immutable, optional*, defaults to the number of nodes in the
  cluster. This value controls how many shards should be created for this class
  index. The typical setting is that a class should be distributed across all
  the nodes in the cluster, but you can explicitly set this value to a lower
  value. As of `v1.8.0` resharding is not supported yet and therefore this
  value cannot be changed after initializing a class. If the `"desiredCount"`
  is larger than the amount of physical nodes in the cluster, then some nodes
  will one more than a single shard.

* `"actualCount"`: *integer, read-only*. Typically matches desired count, unless there was
  a problem initiating the shards at creation time.

* `"virtualPerPhysical"`: *integer, immutable, optional*, defaults to `128`.
  Weaviate uses virtual shards. This will help in reducing the amount of data
  moved when resharding is introduced in later versions.

* `"desiredVirtualCount"`: *integer, readonly*. Matches `desiredCount *
  virtualPerPhysical`

* `"actualVirtualCount"`: *integer, readonly*. Like `actualCount`, but for
  virtual shards, instead of physical.

* `"strategy"`: *string, optional, immutable*. As of `v1.8.0` only supports `"hash"`. This
  value controls how Weaviate should decide which (virtual - and therefore
  physical) shard a new object belongs to. The hash is performed on the field
  specified in `"key"`.

* `"key"`: *string, optional, immutable*. As of `v1.8.0` only supports `"_id"`.
  This value controls the partitioning key that is used for the hashing function
  to determine the target shard. As of now, only the internal id-field
  (containing the object's UUID) can be used to determine the target shard.
  Custom keys may be supported at a later point.

* `"function"`: *string, optional, immutable*. As of `v1.8.0` only `"murmur3"` is
  supported as a hashing function. It describes the hashing function used on
  the `"key"` property to determine the hash which in turn determines the
  target (virtual - and therefore physical) shard. `"murmur3"` creates a 64bit
  hash making hash collisions very unlikely.

### invertedIndexConfig > stopwords (Stopword lists)

*Note: This feature was introduced in `v1.12.0`.*

Properties of type `text` and `string` may contain words that are very common
and have no meaning. In this case you may want to remove them entirely from
indexing. This will save storage space on disk and speed up queries that
contain stopwords, as they can be automatically removed from queries as well.
This speed up is very notable on scored searches, such as `BM25`.

The stopword configuration uses a preset system. You can select a preset to use
the most common stopwords for a particular language. If you need more
fine-grained control, you can add additional stopwords or remove stopwords that
you believe should not be part of the list. Alternatively, you can also create
your completely custom stopword list by starting with an empty (`"none"`)
preset and adding all your desired stopwords as additions.

```json
  "invertedIndexConfig": {
    "stopwords": {
      "preset": "en",
      "additions": ["star", "nebula"],
      "removals": ["a", "the"]
    }
  }
```

This configuration allows stopwords to be configured by class. If not set, these values are set to the following defaults:

| Parameter | Default value | Acceptable values |
| --- | --- | --- | 
| `"preset"` | `"en"` | `"en"`, `"none"` |
| `"additions"` | `[]` | *any list of custom words* |
| `"removals"` | `[]` | *any list of custom words* |


**Notes**
- If none is the selected preset, then the class' stopwords will consist entirely of the additions list.
- If the same item is included in both additions and removals, then an error is returned

### invertedIndexConfig > indexTimestamps

*Note: This feature was introduced in `v1.13.0`.*

To perform queries which are filtered by timestamps, the target class must first be configured to maintain an inverted index for each object by their internal timestamps -- currently these include `creationTimeUnix` and `lastUpdateTimeUnix`. This configuration is done by setting the `indexTimestamps` field of the `invertedIndexConfig` object to `true`.

```json
  "invertedIndexConfig": {
    "indexTimestamps": true
  }
```

### invertedIndexConfig > IndexNullState

*Note: This feature was introduced in `v1.16.0`.*

To perform queries which are filtered by being null or not null, the target class must first be configured to maintain an inverted index for each property of a class that tracks if objects are null or not. This configuration is done by setting the `IndexNullState` field of the `invertedIndexConfig` object to `true`.

```json
  "invertedIndexConfig": {
    "IndexNullState": true
  }
```

### invertedIndexConfig > IndexPropertyLength

*Note: This feature was introduced in `v1.16.0`.*

To perform queries which are filtered by the length of a property, the target class must first be configured to maintain an inverted index for this. This configuration is done by setting the `IndexPropertyLength` field of the `invertedIndexConfig` object to `true`.

```json
  "invertedIndexConfig": {
    "IndexPropertyLength": true
  }
```


**Notes**
- Using these features requires more resources, as the additional inverted indices must be created/maintained for the lifetime of the Class

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
    "tokenization": "word",               // Split field contents into word-tokens when indexing into the inverted index. See Property Tokenization below for more detail.
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

## Property Tokenization

*Note: This feature was introduced in `v1.12.0`.*

Properties of type `text` and `string` use tokenization when indexing and
searching through the inverted index. Text is always tokenized at the `word`
level, meaning that words will be split when a non-alphanumeric character
appears. For example, the string `"hello (beautiful) world"`, would be split
into the tokens `"hello", "beautiful", "world"`. Each token will be indexed
separately in the inverted index. This means that a search for any of the three
tokens would return this object. 

Sometimes there are situations when exact string matching across the whole field
is desired. In this case, you can use a property of type `string` and set the
`"tokenization"` setting to `"field"`. This means the whole field will be
indexed as one. For example the value `"hello (beautiful) world"` would be
indexed as a single token. This means searching for `"hello"` or `"world"`
would not return the object mentioned above, but only the exact string `"hello
(beautiful) world"` will match.

If no values are provided, properties of type `text` and `string` default to
`"word"` level tokenization for backward-compatibility.

# Regulate semantic indexing

* Only for `text2vec` module

In the schema you can define advanced settings for how data is stored and used by Weaviate. 

In some cases, you want to be able to regulate specific parts of the schema to optimise indexing.

For example, a data object with the following schema:

```yaml
Article:
  title: Cows lose their jobs as milk prices drop
  summary: As his 100 diary cows lumberred over for their Monday...
```

which will be vectorized as:

```md
article cows lose their
jobs as milk prices drop summary
as his diary cows lumberred
over for their monday
```

By default, the `class name` and all property `values` *will* be taken in the calculation, but the property `names` *will not* be indexed. There are four ways in which you can regulate the indexing.

### Datatypes

Weaviate needs to guess the datatypes based on the objects it sees, for this you can set some preferences. e.g.

* `AUTOSCHEMA_DEFAULT_STRING=text` would tell Weaviate that when it sees a prop of type `string`, it should treat it as `text` (as opposed to `string`)
* `AUTOSCHEMA_DEFAULT_NUMBER=number` would tell Weaviate that when its sees a numerical value, it should treat it as number as opposed to `int`, etc.
* `AUTOSCHEMA_DEFAULT_DATE=date` respectively

The above configurable defaults will themselves default to something reasonable, if they are not set.

In addition, we need to catch types we do not support at all:
* Any map type is forbidden, unless it clearly matches one of the two supported types `phoneNumber` or `geoCoordinates`.
* Any array type is forbidden, unless it is clearly a reference-type. In this case, Weaviate needs to resolve the beacon and see what the class of the resolved beacon is, since it needs the ClassName to be able to alter the schema.

### Default distance metric

Weaviate allows you to configure the `DEFAULT_VECTOR_DISTANCE_METRIC` which will be applied to every class unless overridden individually. You can choose from: `cosine` (default), `dot`, `l2-squared`, `manhattan`, `hamming`.

# More Resources

{% include docs-support-links.html %}
