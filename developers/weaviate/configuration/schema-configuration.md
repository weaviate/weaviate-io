---
title: Schema
sidebar_position: 1
image: og/docs/configuration.jpg
# tags: ['configuration', 'schema']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

:::info Related pages
- [Tutorial: Schema](../tutorials/schema.md)
- [References: REST API: Schema](../api/rest/schema.md)
- [Concepts: Data Structure](../concepts/data.md)
:::

## Schema

The schema is where you define for Weaviate:
- Classes
- Properties within each Class
- Data types for Properties
- Graph links between Classes
- Vectorizer module (for each Class or Property)

The RESTful endpoint `/v1/schema` can be used for schema-related operations. Learn more [here](../api/rest/schema.md).

## Data objects and structure

Each data object in Weaviate always belongs to a Class, and has one or more Properties. If you don't create a schema manually before adding data, a schema will be generated automatically, read more about this in the User Guide.

## Class

A class describes a data object in the form of a noun (e.g., *Person*,
*Product*, *Timezone*) or a verb (e.g., *Move*, *Buy*, *Eat*). If you are using the `text2vec-contextionary` vectorizer module,
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

### Class object

Details of properties:

| Property            | Usage                                                                     | Description                                                                                                                                                    |
|---------------------|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| class               | "string"                                                                  | The name of the class in string format                                                                                                                         |
| description         | "string"                                                                  | A description for your reference                                                                                                                               |
| vectorIndexType     | "hnsw"                                                                    | Defaults to `hnsw`, can be omitted in schema definition since this is the only available type for now                                                          |
| vectorizer          | "text2vec-contextionary"                                                  | Vectorizer to use for data objects added to this class. Check the [modules page](/developers/weaviate/modules/index.md). To use Weaviate without a vectorizer set to "none" and [see how here.](../api/rest/objects.md#with-a-custom-vector)                                        |
| properties          | {"name", "description", "dataType", "moduleConfig", "invertedIndex"}      | An array of the properties you are adding, same as a Property Object. Read below for more details.                                                             |
| vectorIndexConfig   | {"distance", "ef", "skip",...}                                            | Vector index type specific settings, including `distance metric`. Check the [`hnsw` page.](/developers/weaviate/configuration/indexes.md#how-to-configure-hnsw) |
| moduleConfig        |                                                                           | Used to modify specific vectorizer settings                                                                                                                    |
| invertedIndexConfig | {"stopwords", "indexTimestamps", "indexNullState", "indexPropertyLength"} | Optional, inverted index settings. Read the [`inverted index` page](/developers/weaviate/configuration/indexes#inverted-index) for details.                    |
| shardingConfig      | {"virtualPerPhysical", "desiredCount", "actualCount",...}                 | Optional, controls behavior of class in a multi-node setting, see section[THIS SHOULD BE SEPERATE SECTION].                                                    |

### Property Object

Every class has properties. Properties define what kind of data values you will add to an object in Weaviate. In the schema, you define at least the name of the property and its [dataType](../config-refs/datatypes.md). Property names allow `/[_A-Za-z][_0-9A-Za-z]*/` in the name.

Details of the property object:

| Property      | Usage                                                        | Description                                                                                                                                                                                    |
|---------------|--------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| name          | "string"                                                     | The name of the property                                                                                                                                                                       |
| description   | "string"                                                     | A description for your reference                                                                                                                                                               |
| dataType      | ["string"]                                                   | The data type of the object as described above. When creating cross-references, a property can have multiple dataTypes.                                                                        |
| tokenization  | "word"                                                       | Split field contents into word-tokens when indexing into the inverted index. See Property Tokenization below for more detail.                                                                  |
| moduleConfig  | {"vectorizer": {"skip": true, "vectorizePropertyName": true} | Module-specific settings                                                                                                                                                                       |
| indexInverted | true                                                         | Optional, default is true. By default each property is fully indexed both for full-text, as well as vector search. You can ignore properties in searches by explicitly setting index to false. |


<details>
<summary>Expand for more details on the Property Object usage.</summary>

**Concatenate classes and properties**

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

**Property tokenization**

:::note
This feature was introduced in `v1.12.0`.
:::

Properties with `text` and `string` exhibit different tokenization behavior when indexing and
searching through the inverted index.

**Tokenization with `text`**

`text` properties are always tokenized, and by all non-alphanumerical characters. Tokens are then lowercased before being indexed. For example, a `text` property value `Hello, (beautiful) world`, would be indexed by tokens `hello`, `beautiful`, and `world`.

Each of these tokens will be indexed separately in the inverted index. This means that a search for any of the three tokens with the `Equal` operator under `valueText` would return this object regardless of the case.

**Tokenization with `string`**

`string` properties allow the user to set whether it should be tokenized, by setting the `tokenization` class property.

If `tokenization` for a `string` property is set to `word`, the field will be tokenized. The tokenization behavior for `string` is different from `text`, however, as `string` values are only tokenized by white spaces, and casing is not altered.

So, a `string` property value `Hello, (beautiful) world` with `tokenization` set as `word` would be split into the tokens `Hello,`, `(beautiful)`, and `world`. In this case, the `Equal` operator would need the exact match including non-alphanumerics and case (e.g. `Hello,`, not `hello`) to retrieve this object.

`string` properties can also be indexed as the entire value, by setting `tokenization` as `field`. In such a case the `Equal` operator would require the value `Hello, (beautiful) world` before returning the object as a match.

**Default behavior**

`text` and `string` properties default to `word` level tokenization for backward-compatibility.

</details>

## Examples

### Adding a class with 2 properties

import SimpleExample from '/developers/weaviate/configuration/code/schema-ex-simple.example.mdx';

<SimpleExample/>

### Skipping vectorization of properties

import SkipExample from '/developers/weaviate/configuration/code/schema-ex-skip.example.mdx';

<SkipExample/>

### Setting Distance Metric

import IndexExample from '/developers/weaviate/configuration/code/schema-ex-vectorIndexexample.example.mdx';

<IndexExample/>

The vectorIndexType defaults to [`hnsw`](/developers/weaviate/concepts/vector-index.md#hnsw) since this is the only available vector indexing algorithm implemented at the moment. Check the [`hnsw` page](/developers/weaviate/configuration/indexes.md#how-to-configure-hnsw) for `hnsw` parameters that you can configure. This includes setting the distance metric to be used with Weaviate.

Weaviate allows you to configure the `DEFAULT_VECTOR_DISTANCE_METRIC` which will be applied to every class unless overridden individually. You can choose from: `cosine` (default), `dot`, `l2-squared`, `manhattan`, `hamming`.

### Modifying Sharding Configuration

:::note
Introduced in v1.8.0.
:::

The `"shardingConfig"` controls how a class should be [sharded and distributed across multiple nodes](/developers/weaviate/concepts/cluster.md). All values are optional and default to the following settings:

import ShardExample from '/developers/weaviate/configuration/code/schema-ex-shardingConfig.example.mdx';

<ShardExample/>

<details>
  <summary>Expand to read the meaning of the individual fields in detail</summary>

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

</details>


### Modifying Inverted Index Configuration

import InvertedExample from '/developers/weaviate/configuration/code/schema-ex-invertedIndex.example.mdx';

<InvertedExample/>

<details>
<summary>Read details about settings.</summary>

**invertedIndexConfig > stopwords (stopword lists)**

:::note
This feature was introduced in `v1.12.0`.
:::

Properties of type `text` and `string` may contain words that are very common and don't contribute to search results. Ignoring them speeds up queries that contain stopwords, as they can be automatically removed from queries as well. This speed up is very notable on scored searches, such as `BM25`.

The stopword configuration uses a preset system. You can select a preset to use
the most common stopwords for a particular language. If you need more
fine-grained control, you can add additional stopwords or remove stopwords that
you believe should not be part of the list. Alternatively, you can create
your custom stopword list by starting with an empty (`"none"`)
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


:::note
- If none is the selected preset, then the class' stopwords will consist entirely of the additions list.
- If the same item is included in both additions and removals, then an error is returned
:::

As of `v1.18`, stopwords are indexed, but are skipped in BM25. Meaning, stopwords are included in the inverted index, but when the BM25 algorithm is applied, they are not considered for relevance ranking.

Stopwords can now be configured at runtime. You can use the RESTful API to [update](/developers/weaviate/api/rest/schema#parameters-2) the list of stopwords after your data has been indexed.

Below is an example request on how to update the list of stopwords:

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

class_obj = {
    "invertedIndexConfig": {
        "stopwords": {
            "preset": "en",
            "additions": ["where", "is", "the"]
        }
    }
}

client.schema.update_config("Article", class_obj)
```

**invertedIndexConfig > indexTimestamps**

:::note
This feature was introduced in `v1.13.0`.
:::

To perform queries which are filtered by timestamps, the target class must first be configured to maintain an inverted index for each object by their internal timestamps -- currently these include `creationTimeUnix` and `lastUpdateTimeUnix`. This configuration is done by setting the `indexTimestamps` field of the `invertedIndexConfig` object to `true`.

```json
  "invertedIndexConfig": {
    "indexTimestamps": true
  }
```

**invertedIndexConfig > indexNullState**

:::note
This feature was introduced in `v1.16.0`.
:::

To perform queries which are filtered by being null or not null, the target class must first be configured to maintain an inverted index for each property of a class that tracks if objects are null or not. This configuration is done by setting the `indexNullState` field of the `invertedIndexConfig` object to `true`.

```json
  "invertedIndexConfig": {
    "indexNullState": true
  }
```

**invertedIndexConfig > indexPropertyLength**

:::note
This feature was introduced in `v1.16.0`.
:::

To perform queries which are filtered by the length of a property, the target class must first be configured to maintain an inverted index for this. This configuration is done by setting the `indexPropertyLength` field of the `invertedIndexConfig` object to `true`.

```json
  "invertedIndexConfig": {
    "indexPropertyLength": true
  }
```


:::note
Using these features requires more resources, as the additional inverted indices must be created/maintained for the lifetime of the class.
:::

</details>


### Full Detailed Example

import Example1 from '/developers/weaviate/configuration/code/schema-ex1.example.mdx';

<Example1/>


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
