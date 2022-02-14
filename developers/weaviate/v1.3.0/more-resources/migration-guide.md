---
layout: layout-documentation
solution: weaviate
sub-menu: More resources
title: Migration Guide
intro: 
tags: ['Migration']
menu-order: 7
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Migration to version 1.0.0

Weaviate version 1.0.0 is released on 12 January 2021, and consists of the major update of modularization. From version 1.0.0, Weaviate is modular, meaning that the underlying structure relies on a *pluggable* vector index, *pluggable* vectorization modules with possibility to extend with *custom* modules. Note that with Weaviate version 1.0.0 only the software structure is prepared to be modular, but with the current version there is only one vector index (HNSW) and vectorization module (text2vec-contextionary) possible. Actually attaching custom modules will be made possible in a future release. 

Weaviate release 1.0.0 from 0.23.2 comes with a significant amount of breaking changes in the data schema, API and clients. Here is an overview of all (breaking) changes. 

For client library specific changes, take a look at the change logs of the specific client ([Go](../client-libraries/go.html#20x), [Python](../client-libraries/python.html#20x), [JavaScript](../client-libraries/javascript.html#200) and the [CLI](../client-libraries/cli.html#200)).

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
0. **Data schema:** The `semantic kind` (`Things` and `Actions`) is removed from the Schema Endpoint. This means the URLs will change:
  * from `/v1/schema/things/{ClassName}` to `/v1/schema/{ClassName}`
  * from `/v1/schema/actions/{ClassName} `to `/v1/schema/{ClassName}`
0. **Data RESTful API endpoint:** The `semantic kind` (`Things` and `Actions`) is removed from the data Endpoint. Instead it will be namespaced as `/objects`. This means the URLs will change:
  * from `/v1/things` to `/v1/objects`
  * from `/v1/actions` to `/v1/objects`
  * from `/v1/batching/things`to `/v1/batch/objects` (see also the [change in batching](#renaming-batching-to-batch))
  * from `/v1/batching/actions`to `/v1/batch/objects` (see also the [change in batching](#renaming-batching-to-batch))
0. **GraphQL:** The `Semantic Kind` "level" in the query hierarchy will be removed without replacement (In `Get` and `Aggregate` queries), i.e. 
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
0. **Data Beacons:** The `Semantic Kind` will be removed from beacons:
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


# Migration to version 0.23.x (Standalone)

With Weaviate version 0.23.x (also known as Weaviate Standalone), Weaviate is no longer dependent on third-party database services. The major change in this release is switching to Weaviate's own storing mechanism, replacing all third-party databases services which were required in previous versions. In practice this means, Weaviate no longer has a runtime dependency to Elasticsearch and etcd. Instead all storage operations are taken care of by Weaviate's custom vector-first storage system. It relies on a pluggable vector index. 

**As a result, Weaviate is now a vector-native search engine. All similarity-based search mechanism (explore concepts query, classifications, etc.) are considerably faster than before**. Sub-50ms 20NN-vector queries on datasets of over 1-100M objects are possible. Weaviate relies on a number of caches, but does not require keeping all vectors in memory. Thus it is also possible to run Weaviate on machines where the available memory is smaller than the size of all vectors. For an in-depth look at Weaviate's caching and mem/disk strategies, check out [this video](https://www.youtube.com/watch?v=tY_cAPQLwVU).

Important breaking changes and how to deal with them to upgrade your Weaviate instance:
1. **Reimport of data is required when upgrading from `0.22.x`.**
   As outlined above, Weaviate now uses a completely different storage mechanism. Thus a live upgrade from 0.22.x is not possible. Instead, all data needs to be reimported into an instance running 0.23.x.
2. **Deprecations removed.**
    The following items where already deprecated, and from `0.23.0` officially not removed:
    * `/v1/c11y/words` removed, use `/v1/c11y/concepts` instead
    * `?meta=true` on GET requests, use `?include=...` instead
    * `meta` property in object body removed, instead use the underscore fields directly, e.g. `_classification`
    * `meta` field in cross-references removed, instead use the `_classification` field directly
    * `cardinality` on properties already no longer had an effect in previous releases, but now the field is also removed
    * `keywords` on classes and properties no longer had an effect in in previous releases, but now the fields are also removed

# Vector-storage plugin: HNSW
The first (and currently only) vector-storage plugin supported is [HNSW](https://arxiv.org/abs/1603.09320). Weaviate does not rely on a third-party HNSW implementation, but instead provides a custom HNSW implementation optimized for real-life database usage. This means it supports all CRUD operations, makes sure any change is always persisted using a Write-Ahead-Commit-Log and performs various ongoing maintenance tasks under the hood to guarantee the health of a long-running database system. All inverted index and object storage operations use a custom Weaviate storage implementation that in turn relies on [bolt](https://github.com/boltdb/bolt)/[bbolt](https://github.com/etcd-io/bbolt) for disk operations.


# Limitations and roadmap
* As of `0.23.0` Weaviate is not horizontally scalable yet. It can therefore not be used as a distributed database or in HA-settings yet. However, all internals are designed to support horizontal scalability later on. This is a feature that will be made available in a future release.
* Performance improvements are suggested [here](https://github.com/semi-technologies/weaviate/milestone/15). This includes a suggestion regarding data object update (speed) performance. These issues are currently being researched or will be researched soon. Feel free to add an issue if you have any further ideas or suggestions on performance improvements.
* Version 1.0.0 of Weaviate is planned to be released in January. This involves some major breaking changes is the API. Keep updated by following us on [Github](https://github.com/semi-technologies/weaviate), our [newsletter](http://weaviate-newsletter.semi.technology/) or through [social media](https://www.linkedin.com/company/semi-technologies/).

# Official release notes
Official release notes can be found on [Github](https://github.com/semi-technologies/weaviate/releases/tag/0.23.0). 


# More resources

{% include docs-support-links.html %}