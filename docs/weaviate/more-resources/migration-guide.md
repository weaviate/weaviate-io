---
title: Migration Guide
sidebar_position: 8
# layout: layout-documentation
# solution: weaviate
# sub-menu: More resources
# title: Migration Guide
# intro: 
# tags: ['Migration']
# sidebar_position: 7
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.7.2/more-resources/migration-guide.html
---

# Changlog for version v1.9.0

* no breaking changes

* *New Features*
  * ### First Multi-modal module: CLIP Module (#1756, #1766)
    This release [introduces the `multi2vec-clip` module](../modules/multi2vec-clip.html), a module that allows for multi-modal vectorization within a single vector space. A class can have `image` or `text` fields or both. Similarly, the module provides both a `nearText` and a `nearImage` search and allows for various search combinations, such as text-search on image-only content and various other combinations.

    #### How to use

    The following is a valid payload for a class that vectorizes both images and text fields:
    ```json
    {
        "class": "ClipExample",
        "moduleConfig": {
            "multi2vec-clip": {
                "imageFields": [
                    "image"
                ],
                "textFields": [
                    "name"
                ],
                "weights": {
                  "textFields": [0.7],
                  "imageFields": [0.3]
                }
            }
        },
        "vectorIndexType": "hnsw",
        "vectorizer": "multi2vec-clip",
        "properties": [
          {
            "dataType": [
              "string"
            ],
            "name": "name"
          },
          {
            "dataType": [
                "blob"
            ],
            "name": "image"
          }
        ]
      }
      ```

    Note that:
       - `imageFields` and `textFields` in `moduleConfig.multi2vec-clip` do not both need to be set. However at least one of both must be set.
       - `weights` in `moduleConfig.multi2vec-clip` is optional. If only a single property the property takes all the weight. If multiple properties exist and no weights are specified, the properties are equal-weighted.

    You can then import data objects for the class as usual. Fill the `text` or `string` fields with text and/or fill the `blob` fields with a base64-encoded image.

    #### Limitations
    * As of `v1.9.0` the module requires explicit creation of a class. If you rely on auto-schema to create the class for you, it will be missing the required configuration about which fields should be vectorized. This will be addressed in a future release.

* *Fixes*
  * fix an error where deleting a class with `geoCoordinates` could lead to a panic due to missing cleanup (#1730)
  * fix an issue where an error in a module would not be forwarded to the user (#1754)
  * fix an issue where a class could not be deleted on some file system (e.g. AWS EFS) (#1757)


# Migration to version v1.8.0

## Migration Notice

Version `v1.8.0` introduces multi-shard indices and horizontal scaling. As a
result the dataset needs to be migrated. This migration is performed automatically - 
without user interaction - when first starting up with Weaviate version
`v1.8.0`. However, it cannot be reversed. We, therefore, recommend carefully
reading the following migration notes and making a case-by-case decision about the
best upgrade path for your needs.

### Why is a data migration necessary?

Prior to `v1.8.0` Weaviate did not support multi-shard indices. The feature was
already planned, therefore data was already contained in a single shard with a
fixed name. A migration is necessary to move the data from a single fixed shard
into a multi-shard setup. The amount of shards is not changed. When you run
`v1.8.0` on a dataset the following steps happen automatically:

* Weaviate discovers the missing sharding configuration for your classes and fills it with the default values
* When shards start-up and they do not exist on disk, but a shard with a fixed
  name from `v1.7.x` exists, Weaviate automatically recognizes that a migration
  is necessary and moves the data on disk
* When Weaviate is up and running the data has been migrated.

**Important Notice:** As part of the migration Weaviate will assign the shard
to the (only) node available in the cluster. You need to make sure that this
node has a stable hostname. If you run on Kubernetes, hostnames are stable
(e.g. `weaviate-0` for the first node). However with `docker-compose` hostnames
default to the id of the container. If you remove your containers (e.g.
`docker-compose down`) and start them up again, the hostname will have changed.
This will lead to errors where Weaviate mentions that it cannot find the node
that the shard belongs to. The node sending the error message is the node that
owns the shard itself, but it cannot recognize it, since its own name has
changed.

To remedy this, you can set a stable hostname **before starting up with
v1.8.0** by setting the env var `CLUSTER_HOSTNAME=node1`. The actual name does
not matter, as long as it's stable.

If you forgot to set a stable hostname and are now running into the error
mentioned above, you can still explicitly set the hostname that was used before
which you can derive from the error message.

Example:

If you see the error message `"shard Knuw6a360eCY: resolve node name
\"5b6030dbf9ea\" to host"`, you can make Weaviate usable again, by setting
`5b6030dbf9ea` as the host name: `CLUSTER_HOSTNAME=5b6030dbf9ea`.

### Should you upgrade or reimport?

Please note that besides new features, `v1.8.0` also contains a large
collection of bugfixes. Some of those bugs also affected how the HNSW index was
written to disk. Therefore it cannot be ruled out that the index on disk has a
subpar quality compared to a freshly built index in version `v1.8.0`.
Therefore, if you can import using a script, etc, we generally recommend starting
with a fresh `v1.8.0` setup and reimporting instead of migrating.

### Is downgrading possible after upgrading?

Note that the data migration which happens at the first startup of v1.8.0 is
not automatically reversible. If you plan on downgrading to `v1.7.x` again
after upgrading, you must explicitly create a backup of the state prior to
upgrading.

## Changelog


# Changelog for version v1.7.2
* No breaking changes
* New features
  * ### Array Datatypes (#1691)
    Added `boolean[]` and `date[]`.
  * ### Make property names less strict (#1562)
   Property names in a data schema allows: `/[_A-Za-z][_0-9A-Za-z]*/`. i.e. it will allow for using underscores, will allow numbers and will fix the issue about trailing upper-case characters. But it won't allow for many other special characters, such as dash (-) or language-specific characters like Umlauts, etc, due to GraphQL restrictions.
* Bug fixes
  * ### Aggregation on array data type (#1686)


# Changelog for version v1.7.0
* No breaking changes
* New features
  * ### Array Datatypes (#1611)
  Starting with this releases, primitive object properties are no longer limited to individual properties, but can also include lists of primitives. Array types can be stored, filtered and aggregated in the same way as other primitives.

    Auto-schema will automatically recognize lists of `string`/`text` and `number`/`int`. You can also explicitly specify lists in the schema by using the following data types `string[]`, `text[]`, `int[]`, `number[]`. A type that is assigned to be an array, must always stay an array, even if it only contains a single element. 

  * ### New Module: `text-spellcheck` - Check and auto-correct misspelled search terms (#1606)
    Use the new spellchecker module to verify user-provided search queries (in existing `nearText` or `ask` functions) are spelled correctly and even suggest alternative, correct spellings. Spell-checking happens at query time. 

    There are two ways to use this module:
    1. It provides a new additional prop which can be used to check (but not alter) the provided queries:
    The following query:
    ```graphql
    {
      Get {
        Post(nearText:{
          concepts: "missspelled text"
        }) {
          content
          _additional{
            spellCheck{
              changes{
                corrected
                original
              }
              didYouMean
              location
              originalText
            }
          }
        }
      }
    }
    ```
    
    will produce results, similar to the following:
    
    ```
      "_additional": {
        "spellCheck": [
          {
            "changes": [
              {
                "corrected": "misspelled",
                "original": "missspelled"
              }
            ],
            "didYouMean": "misspelled text",
            "location": "nearText.concepts[0]",
            "originalText": "missspelled text"
          }
        ]
      },
      "content": "..."
    },
    ```
    2. It extends existing `text2vec-modules` with a `autoCorrect` flag, which can be used to correct the query if incorrect in the background.

  * ### New Module `ner-transformers` - Extract entities from Weaviate using transformers (#1632)
    Use transformer-based models to extract entities from your existing Weaviate objects on the fly. Entity Extraction happens at query time. Note that for maximum performance, transformer-based models should run with GPUs. CPUs can be used, but the throughput will be lower.

    To make use of the modules capabilities, simply extend your query with the following new `_additional` property:

    ```graphql
    {
      Get {
        Post {
          content
          _additional {
            tokens(
              properties: ["content"],    # is required
              limit: 10,                  # optional, int
              certainty: 0.8              # optional, float
            ) {
              certainty
              endPosition
              entity
              property
              startPosition
              word
            }
          }
        }
      }
    }

    ```
    It will return results similar to the following:

    ```
    "_additional": {
      "tokens": [
        {
          "property": "content",
          "entity": "PER",
          "certainty": 0.9894614815711975,
          "word": "Sarah",
          "startPosition": 11,
          "endPosition": 16
        },
        {
          "property": "content",
          "entity": "LOC",
          "certainty": 0.7529033422470093,
          "word": "London",
          "startPosition": 31,
          "endPosition": 37
        }
      ]
    }
    ```
* Bug fixes
  * Aggregation can get stuck when aggregating `number` datatypes (#1660)

# Changelog for version 1.6.0
* No breaking changes
* No new features
 * **Zero Shot Classification (#1603)** This release adds a new classification type `zeroshot` that works with any `vectorizer` or custom vectors. It picks the label objects that have the lowest distance to the source objects. The link is made using cross-references, similar to existing classifications in Weaviate. To start a `zeroshot` classification use `"type": "zeroshot"` in your `POST /v1/classficiations` request and specify the properties you want classified normally using `"classifyProperties": [...]`. As zero shot involves no training data, you cannot set `trainingSetWhere` filters, but can filter both source (`"sourceWhere"`) and label objects (`"targetWhere"`) directly.
* Bug fixes


# Changelog for version 1.5.2

* No breaking changes
* No new features
* Bug fixes:
* ### Fix possible data races (`short write`) (#1643)
  This release fixes various possible data races that could in the worst case lead to an unrecoverable error `"short write"`. The possibility for those races was introduced in `v.1.5.0` and we highly recommend anyone running on the `v1.5.x` timeline to upgrade to `v1.5.2` immediately.

# Changelog for version 1.5.1

* No breaking changes
* No new features
* Bug fixes:
* ### Crashloop after unexpected crash in HNSW commit log (#1635)
  If Weaviate was killed (e.g. OOMKill) while writing the commit log, it could not be parsed after the next restart anymore, thus ending up in a crashloop. This fix removes this. Note that no data will be lost on such a crash: The partially written commit log has not yet been acknowledged to the user, so no write guarantees have been given yet. It is therefore safe to discard.

* ### Chained Like operator not working (#1638)
  Prior to this fix, when chaining `Like` operators in `where` filters where each `valueString` or `valueText` contained a wildcard (`*`), typically only the first operator's results where reflected. This fix makes sure that the chaining (`And` or `Or`) is reflected correctly. This bug did not affect other operators (e.g. `Equal`, `GreaterThan`, etc) and only affected those `Like` queries where a wildcard was used.

* ### Fix potential data race in Auto Schema features (#1636)
  This fix improves incorrect synchronization on the auto schema feature which in extreme cases could lead to a data race.

# Migration to version 1.5.0

## Migration Notice
*This release does not contain any API-level breaking changes, however, it changes the entire storage mechanism inside Weaviate. As a result, an in-place update is not possible. When upgrading from previous versions, a new setup needs to be created and all data reimported. Prior backups are not compatible with this version.*

## Changelog
* No breaking changes
* New Features:
  * *LSM-Tree based Storage*. Previous releases of Weaviate used a B+Tree based storage mechanism. This was not fast enough to keep up with the high write speed requirements of a large-scale import. This release completely rewrites the storage layer of Weaviate to use a custom LSM-tree approach. This leads to considerably faster import times, often more than 100% faster than the previous version.
  * *Auto-Schema Feature*. Import data objects without creating a schema prior to import. The classes will be created automatically, they can still be adjusted manually. Weaviate will guess the property type based on the first time it sees a property. The defaults can be configured using the environment variables outlined in #1539. The feature is on by default, but entirely non-breaking. You can still create an explicit schema at will.
* Fixes:
  * *Improve Aggregation Queries*. Reduces the amount of allocations required for some aggregation queries, speeding them up and reduces the amount of timeouts encountered during aggregations.


Check [this github page](https://github.com/semi-technologies/weaviate/releases/tag/v1.5.0) for all the changes. 


# Changelog for version 1.4.0

* No breaking changes
* New Features:
  * Image Module [`img2vec-neural`](../modules/img2vec-neural.html)
  * Add Hardware acceleration for `amd64` CPUs (Intel, AMD)
  * Support `arm64` technology for entire Weaviate stack
  * Set `ef` at search time
  * Introduce new dataType `blob`
  * Skip vector-indexing a class
* Fixes:
  * Various Performance Fixes around the HNSW Vector Index
  * Make property order consistent when vectorizing
  * Fix issues around `PATCH` API when using custom vectors
  * Detect schema settings that will most likely lead to duplicate vectors and print warning
  * Fix missing schema validation on transformers module

Check [this github page](https://github.com/semi-technologies/weaviate/releases/tag/v1.4.0) for all the changes. 


# Changelog for version 1.3.0

* No breaking changes
* New feature: [Question Answering (Q&A) Module](../modules/qna-transformers.html)
* New feature: New Meta Information for all transformer-based modules
  
Check [this github page](https://github.com/semi-technologies/weaviate/releases/tag/v1.3.0) for all the changes. 

# Changelog for version 1.2.0

* No breaking changes
* New feature: Introduction of the [Transformer Module](../modules/qna-transformers.html)

Check [this github page](https://github.com/semi-technologies/weaviate/releases/tag/v1.2.0) for all the changes. 

# Changelog for version 1.1.0

* No breaking changes
* New feature: GraphQL `nearObject` search to get most similar object.
* Architectural  update: Cross-reference batch import speed improvements.
 
Check [this github page](https://github.com/semi-technologies/weaviate/releases/tag/v1.1.0) for all the changes. 

# Migration to version 1.0.0

Weaviate version 1.0.0 was released on 12 January 2021, and consists of the major update of modularization. From version 1.0.0, Weaviate is modular, meaning that the underlying structure relies on a *pluggable* vector index, *pluggable* vectorization modules with possibility to extend with *custom* modules. 

Weaviate release 1.0.0 from 0.23.2 comes with a significant amount of breaking changes in the data schema, API and clients. Here is an overview of all (breaking) changes. 

For client library specific changes, take a look at the change logs of the specific client ([Go](../client-libraries/go.html#v20x), [Python](../client-libraries/python.html#20x), [JavaScript](../client-libraries/javascript.html#v200) and the [CLI](../client-libraries/cli.html#200)).

Moreover, a new version of the Console is released. Visit the Console documentation for more information. 

## Summary
This contains most overall changes, but not all details. Those are documented in ["Changes"](#changes).

### All RESTful API changes
* from `/v1/schema/things/{ClassName}` to `/v1/schema/{ClassName}`
* from `/v1/schema/actions/{ClassName} `to `/v1/schema/{ClassName}`from `/v1/schema/actions/{ClassName} `to `/v1/schema/{ClassName}`
* from `/v1/things` to `/v1/objects`
* from `/v1/actions` to `/v1/objects`
* from `/v1/batching/things` to `/v1/batch/objects`
* from `/v1/batching/actions` to `/v1/batch/objects`
* from `/v1/batching/references` to `/v1/batch/references`
* Additional data object properties are grouped in `?include=...` and the leading underscore of these properties is removed
* The `/v1/modules/` endpoint is introduced.
* the `/v1/meta/` endpoint now contains module specific information in `"modules"`

### All GraphQL API changes
* Removal of Things and Actions layer in query hierarchy
* Reference properties of data objects are lowercase (previously uppercased)
* Underscore properties, uuid and certainty are now grouped in the object `_additional`
* `explore()` filter is renamed to `near<MediaType>` filter
* `nearVector(vector:[])` filter is introduced in `Get{}` query
* `Explore (concepts: ["foo"]){}` query is changed to `Explore (near<MediaType>: ... ) {}`.

### All data schema changes
* Removal of Things and Actions
* Per class and per property configuration is changed to support modules and vector index type settings.

### All data object changes
* From `schema` to `properties` in the data object.

### Contextionary
* Contextionary is renamed to the module `text2vec-contextionary`
* `/v1/c11y/concepts` to `/v1/modules/text2vec-contextionary/concepts`
* `/v1/c11y/extensions` to `/v1/modules/text2vec-contextionary/extensions`
* `/v1/c11y/corpus` is removed 

### Other
* Removal of `/things` and `/actions` in short and long beacons
* Classification body is changed to support modularization
* `DEFAULT_VECTORIZER_MODULE` is a new environment variable

## Changes

### Removal of Things and Actions
`Things` and `Actions` are removed from the Data Schema. This comes with the following changes in the schema definition and API endpoints:
1. **Data schema:** The `semantic kind` (`Things` and `Actions`) is removed from the Schema Endpoint. This means the URLs will change:
  * from `/v1/schema/things/{ClassName}` to `/v1/schema/{ClassName}`
  * from `/v1/schema/actions/{ClassName} `to `/v1/schema/{ClassName}`
1. **Data RESTful API endpoint:** The `semantic kind` (`Things` and `Actions`) is removed from the data Endpoint. Instead it will be namespaced as `/objects`. This means the URLs will change:
  * from `/v1/things` to `/v1/objects`
  * from `/v1/actions` to `/v1/objects`
  * from `/v1/batching/things`to `/v1/batch/objects` (see also the [change in batching](#renaming-batching-to-batch))
  * from `/v1/batching/actions`to `/v1/batch/objects` (see also the [change in batching](#renaming-batching-to-batch))
1. **GraphQL:** The `Semantic Kind` "level" in the query hierarchy will be removed without replacement (In `Get` and `Aggregate` queries), i.e. 
   ```graphql
   { 
     Get { 
       Things { 
         ClassName { 
           propName 
         }
       }
     } 
   }
   ``` 

   will become

   ```graphql
   { 
     Get { 
       ClassName { 
         propName 
       }
     } 
   }
   ``` 
1. **Data Beacons:** The `Semantic Kind` will be removed from beacons:
   * **Short-form Beacon:**
  
     * `weaviate://localhost/things/4fbacd6e-1153-47b1-8cb5-f787a7f01718`
    
     to
    
     * `weaviate://localhost/4fbacd6e-1153-47b1-8cb5-f787a7f01718`

   * **Long-form Beacon:**
  
     * `weaviate://localhost/things/ClassName/4fbacd6e-1153-47b1-8cb5-f787a7f01718/propName`
    
     to
    
     * `weaviate://localhost/ClassName/4fbacd6e-1153-47b1-8cb5-f787a7f01718/propName`

### Renaming /batching/ to /batch/

* `/v1/batching/things` to `/v1/batch/objects`
* `/v1/batching/actions` to `/v1/batch/objects`
* `/v1/batching/references` to `/v1/batch/references`


### From "schema" to "properties" in data object

The name "schema" on the data object is not intuitive and is replaced by "properties". The change looks like:

```json
{
  "class": "Article",
  "schema": {
    "author": "Jane Doe"
  }
}
```

to

```json
{
  "class": "Article",
  "properties": {
    "author": "Jane Doe"
  }
}
```

### Consistent casing in GraphQL properties

Previously, reference properties in the schema definitions are always lowercase, yet in graphQL they needed to be uppercased. E.g.: `Article { OfAuthor { … on Author { name } } } }`, even though the property is defined as ofAuthor. New is that the casing in GraphQL reflects exactly the casing in the schema definition, thus the above example would become: `Article { ofAuthor { … on Author { name } } } }`

### Additional data properties in GraphQL and RESTful API
Since modularization, a module can contribute to the additional properties of a data object (thus are not fixed), which should be retrievable by the GraphQL and/or RESTful API.
1. **REST**: `additional` properties (formerly named `"underscore"` properties) can be included in RESTful query calls like `?include=...`, e.g. `?include=classification`. The underscores will thus be removed from the names (e.g. `?include=_classification` is deprecated). In the Open API specifications, all additional properties will be grouped in the object `additional`. For example: 
    ```json
    {
      "class": "Article",
      "schema": { ... },
      "_classification": { … }
    }
    ```

    to

    ```json
    {
      "class": "Article",
      "properties": { ... },
      "additional": {
        "classification": { ... }
      }
    }
    ```
2. **GraphQL**: `"underscore"` properties are renamed to `additional` properties in GraphQL queries.
   1. All former `"underscore"` properties of a data object (e.g. `_certainty`) are now grouped in the `_additional {}` object (e.g. `_additional { certainty } `).
   2. The `uuid` property is now also placed in the `_additional {}` object and renamed to `id` (e.g. `_additional { id } `).
   This example covers both changes: 

   From

   ```graphql 
    {
      Get {
        Things {
          Article {
            title
            uuid
            certainty
            _classification
          }
        }
      }
    }
   ```

   to
  
   ```graphql
   {
     Get {
       Article {
         title
         _additional {      # leading _ prevents clashes
           certainty
           id               # replaces uuid
           classification
         }
       }
     }
   }
   ```

### Modules RESTful endpoint
With the modularization of Weaviate, the `v1/modules/` endpoint is introduced.

### GraphQL semantic search

With the modularization, it becomes possible to vectorize non-text objects. Search is no longer restricted to use the Contextionary's vectorization of text and data objects, but could also be applied to non-text objects or raw vectors. The formerly 'explore' filter in Get queries and 'Explore' queries in GraphQL were tied to text, but the following changes are made to this filter with the new version of Weaviate:

1. The filter `Get ( explore: {} ) {}` is renamed to `Get ( near<MediaType>: {} ) {}`. 
   1. New: `Get ( nearVector: { vector: [.., .., ..] } ) {}` is module independent and will thus always be available.
   2. `Get ( explore { concepts: ["foo"] } ) {}` will become `Get ( nearText: { concepts: ["foo"] } ) {}` and is only available if the `text2vec-contextionary` module is attached.

    From

    ```graphql 
      {
        Get {
          Things {
            Article (explore: { concepts: ["foo"] } ) {
              title
            }
          }
        }
      }
    ```

    to
    
    ```graphql
    {
      Get {
        Article (near<MediaType>: ... ) {
          title
        }
      }
    }
    ```

2. Similarly to the explore sorter that is used in the `Get {}` API, the `Explore {}` API also assumes text. The following change is applied:
   
   From

   ```graphql 
    {
      Explore (concepts: ["foo"]) {
        beacon
      }
    }
   ```

   to
  
   ```graphql 
    {
      Explore (near<MediaType>: ... ) {
        beacon
      }
    }
   ```

### Data schema configuration
1. **Per-class configuration**
    
    With modularization, it is possible to configure per class the vectorizer module, module-specific configuration for the overall class, vector index type, and vector index type specific configuration:
    * The `vectorizer` indicates which module (if any) are responsible for vectorization.
    * The `moduleConfig` allows configuration per module (by name).
      * See [here](#text2vec-contextionary) for Contextionary specific property configuration. 
    * The `vectorIndexType` allows the choosing the vector index (defaults to [HNSW](../vector-index-plugins/hnsw.html))
    * The `vectorIndexConfig` is an arbitrary object passed to the index for config (defaults can be found [here](../vector-index-plugins/hnsw.html#how-to-use-hnsw-and-parameters) )

    All changes are in this example:

    ```json 
    {
      "class": "Article",
      "vectorizeClassName": true,
      "description": "string",
      "properties": [ … ]
    }
    ```

    will become
    
    ```json
    {
      "class": "Article",
      "vectorIndexType": "hnsw",        # defaults to hnsw
      "vectorIndexConfig": {
        "efConstruction": 100,
      },
      "moduleConfig": {
        "text2vec-contextionary": {  
          "vectorizeClassName": true
        },
        "encryptor5000000": { "enabled": true }, # example
      },
      "description": "string",
      "vectorizer": "text2vec-contextionary", # default is configurable
      "properties": [ … ]
    }
    ```

2. **Per-property configuration**

  With modularization, it is possible to configure per property module-specific configuration per property if available and it can be specified if a property should be included in the inverted index.
  * The `moduleConfig` allows configuration per module (by name).
    * See [here](#text2vec-contextionary) for Contextionary specific property configuration. 
  * `index` will become `indexInverted`: a boolean that indicates whether a property should be indexed in the inverted index.

  All changes are in this example:

  ```json 
  {
    "dataType": [ "string" ],
    "description": "string",
    "cardinality": "string",
    "vectorizePropertyName": true,
    "name": "string",
    "keywords": [ … ],
    "index": true
  }
  ```

  will become
  
  ```json
  {
    "dataType": [ "string" ],
    "description": "string",
    "moduleConfig": {
      "text2vec-contextionary": {
        "skip": true,
        "vectorizePropertyName": true,
      }
    },
    "name": "string",
    "indexInverted": true
  }
  ```

### RESTful /meta endpoint

The `/v1/meta` object now contains module specific information at in the newly introduced namespaced `modules.<moduleName>` property: 

From

```json
{
  "hostname": "string",
  "version": "string",
  "contextionaryWordCount": 0,
  "contextionaryVersion": "string"
}
```

to 

```json
{
  "hostname": "string",
  "version": "string",
  "modules": {
    "text2vec-contextionary": {
      "wordCount": 0,
      "version": "string"
     }
  }
}
```

### Modular classification

Some classification types are tied to modules (e.g. the former "contextual" classification is tied to the `text2vec-contextionary` module. We make a distinction between fields which are always present and those which are type dependent. Additionally the API is improved by grouping `settings` and `filters` in separate properties. kNN classification is the only type of classification that is present with Weaviate Core without dependency on modules. The former "contextual" classification is tied to the `text2vec-contextionary` module, see [here](#text2vec-contextionary). An example of how the change looks like in the classification API POST body: 

From

```json
{
  "class": "City",
  "classifyProperties": ["inCountry"],
  "basedOnProperties": ["description"],
  "type": "knn",
  "k": 3,
  "sourceWhere": { … },
  "trainingSetWhere": { … },
  "targetWhere": { … },
}

```

To

```json
{
  "class": "City",
  "classifyProperties": ["inCountry"],
  "basedOnProperties": ["description"],
  "type": "knn",
  "settings": {
    "k": 3
  },
  "filters": {  
    "sourceWhere": { … },
    "trainingSetWhere": { … },
    "targetWhere": { … },
  }
}
```

And the API GET body: 

From

```json
{
  "id": "ee722219-b8ec-4db1-8f8d-5150bb1a9e0c",
  "class": "City",
  "classifyProperties": ["inCountry"],
  "basedOnProperties": ["description"],
  "status": "running",
  "meta": { … },
  "type": "knn",
  "k": 3,
  "sourceWhere": { … },
  "trainingSetWhere": { … },
  "targetWhere": { … },
}
```

To

```json
{
  "id": "ee722219-b8ec-4db1-8f8d-5150bb1a9e0c",
  "class": "City",
  "classifyProperties": ["inCountry"],
  "basedOnProperties": ["description"],
  "status": "running",
  "meta": { … },
  "type": "knn",
  "settings": {
    "k": 3
  },
  "filters": {  
    "sourceWhere": { … },
    "trainingSetWhere": { … },
    "targetWhere": { … },
  }
}
```






### text2vec-contextionary
The Contextionary becomes the first vectorization module of Weaviate, renamed to `text2vec-contextionary` in formal use. This brings the following changes:
1. **RESTful** endpoint `/v1/c11y` changes to `v1/modules/text2vec-contextionary`:
   * `/v1/c11y/concepts` to `/v1/modules/text2vec-contextionary/concepts`
   * `/v1/c11y/extensions` to `/v1/modules/text2vec-contextionary/extensions`
   * `/v1/c11y/corpus` is removed 
2. **Data schema:** `text2vec-contextionary`-specific module configuration options in the schema definition
   1. **Per-class**. `"vectorizeClassName"` indicates whether the class name should be taken into the vector calculation of data objects.
    
    ```json
    {
      "class": "Article",
      "moduleConfig": {
        "text2vec-contextionary": {  
          "vectorizeClassName": true
        }
      },
      "description": "string",
      "vectorizer": "text2vec-contextionary",
      "properties": [ … ]
    }
    ```

   2. **Per-property.** `skip` tells whether to skip the entire property (including value) from the vector position of the data object. `vectorizePropertyName` indicates whether the property name should be taken into the vector calculation of data objects.
    
    ```json
    {
      "dataType": [ "string" ],
      "description": "string",
      "moduleConfig": {
        "text2vec-contextionary": {
          "skip": true,
          "vectorizePropertyName": true,
        }
      },
      "name": "string",
      "indexInverted": true
    }
    ```
3. **Contextual classification**. Contextual classification is dependent on the module `text2vec-contextionary`. It can be activated in `/v1/classifications/` the following with the classification name `text2vec-contextionary-contextual`:
   
From

```json
{
  "class": "City",
  "classifyProperties": ["inCountry"],
  "basedOnProperties": ["description"],
  "type": "contextual",
  "informationGainCutoffPercentile": 30,
  "informationGainMaximumBoost": 3,
  "tfidfCutoffPercentile": 80,
  "minimumUsableWords": 3,
  "sourceWhere": { … },
  "trainingSetWhere": { … },
  "targetWhere": { … },
}
```

To

```json
{
  "class": "City",
  "classifyProperties": ["inCountry"],
  "basedOnProperties": ["description"],
  "type": "text2vec-contextionary-contextual",
  "settings": {
    "informationGainCutoffPercentile": 30,
    "informationGainMaximumBoost": 3,
    "tfidfCutoffPercentile": 80,
    "minimumUsableWords": 3,
  },
  "filters": {
    "sourceWhere": { … },
    "trainingSetWhere": { … },
    "targetWhere": { … },
  }
}
```

### Default vectorizer module
The default vectorizer module can be specified in a new environment variable so that this doesn't have to be specified on every data class in the schema. The environment variable is `DEFAULT_VECTORIZER_MODULE`, which can be set to for example `DEFAULT_VECTORIZER_MODULE="text2vec-contextionary"`.


# Official release notes
Official release notes can be found on [Github](https://github.com/semi-technologies/weaviate/releases/tag/0.23.0). 


# More resources

{% include docs-support-links.html %}
