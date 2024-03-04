---
title: Conditional filters
sidebar_position: 35
image: og/docs/api.jpg
# tags: ['graphql', 'filters']
---


import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />

## Overview

Conditional filters may be added to queries such as [`Object-level`](./get.md) and [`Aggregate`](./aggregate.md) queries, as well as [batch deletion](../rest/batch.md#batch-delete). The operator used for filtering is also called a `where` filter.

A filter may consist of one or more conditions, which are combined using the `And` or `Or` operators. Each condition consists of a property path, an operator, and a value.


## Single operand (condition)

Each set of algebraic conditions is called an "operand". For each operand, the required properties are:
- The operator type,
- The property path, and
- The value as well as the value type.

For example, this filter will only allow objects from the class `Article` with a `wordCount` that is `GreaterThan` than `1000`.

import GraphQLFiltersWhereSimple from '/_includes/code/graphql.filters.where.simple.mdx';

<GraphQLFiltersWhereSimple/>

<details>
  <summary>Expected response</summary>

```
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Anywhere but Washington: an eye-opening journey in a deeply divided nation"
        },
        {
          "title": "The world is still struggling to implement meaningful climate policy"
        },
        ...
      ]
    }
  }
}
```

</details>

## Filter structure

The `where` filter is an [algebraic object](https://en.wikipedia.org/wiki/Algebraic_structure), which takes the following arguments:

- `Operator` (which takes one of the following values)
  - `And`
  - `Or`
  - `Equal`
  - `NotEqual`
  - `GreaterThan`
  - `GreaterThanEqual`
  - `LessThan`
  - `LessThanEqual`
  - `Like`
  - `WithinGeoRange`
  - `IsNull`
  - `ContainsAny`  (*Only for array and text properties)
  - `ContainsAll`  (*Only for array and text properties)
- `Path`: Is a list of strings in [XPath](https://en.wikipedia.org/wiki/XPath#Abbreviated_syntax) style, indicating the property name of the collection.
  - If the property is a cross-reference, the path should be followed as a list of strings. For a `inPublication` reference property that refers to `Publication` collection, the path selector for `name` will be `["inPublication", "Publication", "name"]`.
- `valueType`
  - `valueInt`: For `int` data type.
  - `valueBoolean`: For `boolean` data type.
  - `valueString`: For `string` data type (note: `string` has been deprecated).
  - `valueText`: For `text`, `uuid`, `geoCoordinates`, `phoneNumber` data types.
  - `valueNumber`: For `number` data type.
  - `valueDate`: For `date` (ISO 8601 timestamp, formatted as [RFC3339](https://datatracker.ietf.org/doc/rfc3339/)) data type.

If the operator is `And` or `Or`, the operands are a list of `where` filters.

<details>
  <summary>Example filter structure (GraphQL)</summary>

```graphql
{
  Get {
    <Class>(where: {
        operator: <operator>,
        operands: [{
          path: [path],
          operator: <operator>
          <valueType>: <value>
        }, {
          path: [<matchPath>],
          operator: <operator>,
          <valueType>: <value>
        }]
      }) {
      <propertyWithBeacon> {
        <property>
        ... on <ClassOfWhereBeaconGoesTo> {
          <propertyOfClass>
        }
      }
    }
  }
}
```

</details>

<details>
  <summary>Example response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Opinion | John Lennon Told Them ‘Girls Don't Play Guitar.' He Was So Wrong."
        }
      ]
    }
  },
  "errors": null
}
```

</details>

:::note `Not` operator
An operator to invert a filter (e.g. `Not Like ...` ) is not supported in Weaviate. If you would to see such an operator to be implemented, please let us know by [upvoting the issue here](https://github.com/weaviate/weaviate/issues/3683).
:::

### Filter behaviors

#### Multi-word queries in `Equal` filters

The behavior for the `Equal` operator on multi-word textual properties in `where` filters depends on the `tokenization` of the property.

See the [Schema property tokenization section](../../config-refs/schema/index.md#property-tokenization) for the difference between the available tokenization types.

#### Stopwords in `text` filters

Starting with `v1.12.0` you can configure your own [stopword lists for the inverted index](/developers/weaviate/config-refs/schema/index.md#invertedindexconfig--stopwords-stopword-lists).

## Multiple operands

You can set multiple operands or [nest conditions](../../search/filters.md#nest-filters).

:::tip
You can filter datetimes similarly to numbers, with the `valueDate` given as `string` in [RFC3339](https://datatracker.ietf.org/doc/rfc3339/) format.
:::

import GraphQLFiltersWhereOperands from '/_includes/code/graphql.filters.where.operands.mdx';

<GraphQLFiltersWhereOperands />

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "China\u2019s long-distance lorry drivers are unsung heroes of its economy"
        },
        {
          "title": "\u2018It\u2019s as if there\u2019s no Covid\u2019: Nepal defies pandemic amid a broken economy"
        },
        {
          "title": "A tax hike threatens the health of Japan\u2019s economy"
        }
      ]
    }
  }
}
```

</details>

## Filter operators

### `Like`

The `Like` operator filters `text` data based on partial matches. It can be used with the following wildcard characters:

- `?` -> exactly one unknown character
  - `car?` matches `cart`, `care`, but not `car`
- `*` -> zero, one or more unknown characters
  - `car*` matches `car`, `care`, `carpet`, etc
  - `*car*` matches `car`, `healthcare`, etc.

import GraphQLFiltersWhereLike from '/_includes/code/graphql.filters.where.like.mdx';

<GraphQLFiltersWhereLike/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "name": "The New York Times Company"
        },
        {
          "name": "International New York Times"
        },
        {
          "name": "New York Times"
        },
        {
          "name": "New Yorker"
        }
      ]
    }
  }
}
```

</details>

#### Performance of `Like`

Each `Like` filter iterates over the entire inverted index for that property. The search time will go up linearly with the dataset size, and may become slow for large datasets.

#### Wildcard literal matches with `Like`

Currently, the `Like` filter is not able to match wildcard characters (`?` and `*`) as literal characters. For example, it is currently not possible to only match the string `car*` and not `car`, `care` or `carpet`. This is a known limitation and may be addressed in future versions of Weaviate.


### `ContainsAny` / `ContainsAll`

The `ContainsAny` and `ContainsAll` operators filter objects using values of an array as criteria.

Both operators expect an array of values and return objects that match based on the input values.

:::note `ContainsAny` and `ContainsAll` notes:
- The `ContainsAny` and `ContainsAll` operators treat texts as an array. The text is split into an array of tokens based on the chosen tokenization scheme, and the search is performed on that array.
- When using `ContainsAny` or `ContainsAll` with the REST api for [batch deletion](../rest/batch.md#batch-delete), the text array must be specified with the `valueTextArray` argument. This is different from the usage in search, where the `valueText` argument that can be used.
:::


#### `ContainsAny`

`ContainsAny` returns objects where at least one of the values from the input array is present.

Consider a dataset of `Person`, where each object represents a person with a `languages_spoken` property with a `text` datatype.

A `ContainsAny` query on a path of `["languages_spoken"]` with a value of `["Chinese", "French", "English"]` will return objects where at least one of those languages is present in the `languages_spoken` array.

#### `ContainsAll`

`ContainsAll` returns objects where all the values from the input array are present.

Using the same dataset of `Person` objects as above, a `ContainsAll` query on a path of `["languages_spoken"]` with a value of `["Chinese", "French", "English"]` will return objects where all three of those languages are present in the `languages_spoken` array.

## Filter performance

import RangeFilterPerformanceNote from '/_includes/range-filter-performance-note.mdx';

<RangeFilterPerformanceNote />

## Special cases

### By id

You can filter object by their unique id or uuid, where you give the `id` as `valueText`.

import GraphQLFiltersWhereId from '/_includes/code/graphql.filters.where.id.mdx';

<GraphQLFiltersWhereId/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Backs on the rack - Vast sums are wasted on treatments for back pain that make it worse"
        }
      ]
    }
  }
}
```

</details>

### By timestamps

Filtering can be performed with internal timestamps as well, such as `creationTimeUnix` and `lastUpdateTimeUnix`. These values can be represented either as Unix epoch milliseconds, or as [RFC3339](https://datatracker.ietf.org/doc/rfc3339/) formatted datetimes. Note that epoch milliseconds should be passed in as a `valueText`, and an RFC3339 datetime should be a `valueDate`.

:::info
Filtering by timestamp requires the target class to be configured to index  timestamps. See [here](/developers/weaviate/config-refs/schema/index.md#invertedindexconfig--indextimestamps) for details.
:::

import GraphQLFiltersWhereTimestamps from '/_includes/code/graphql.filters.where.timestamps.mdx';

<GraphQLFiltersWhereTimestamps />

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Army builds new body armor 14-times stronger in the face of enemy fire"
        },
        ...
      ]
    }
  }
}
```

</details>

### By property length

Filtering can be performed with the length of properties.

The length of properties is calculated differently depending on the type:
- array types: the number of entries in the array is used, where null (property not present) and empty arrays both have the length 0.
- strings and texts: the number of characters (unicode characters such as 世 count as one character).
- numbers, booleans, geo-coordinates, phone-numbers and data-blobs are not supported.

```graphql
{
  Get {
    <Class>(
      where: {
        operator: <Operator>,
        valueInt: <value>,
        path: ["len(<property>)"]
      }
    )
  }
}
```
Supported operators are `(not) equal` and `greater/less than (equal)` and values need to be 0 or larger.

Note that the `path` value is a string, where the property name is wrapped in `len()`. For example, to filter for objects based on the length of the `title` property, you would use `path: ["len(title)"]`.

To filter for `Article` class objects with `title` length greater than 10, you would use:

```graphql
{
  Get {
    Article(
      where: {
        operator: GreaterThan,
        valueInt: 10,
        path: ["len(title)"]
      }
    )
  }
}
```

:::note
Filtering by property length requires the target class to be [configured to index the length](/developers/weaviate/config-refs/schema/index.md#invertedindexconfig--indexpropertylength).
:::

### By cross-references

You can also search for the value of the property of a cross-references, also called beacons.

For example, these filters select based on the class Article but who have `inPublication` set to New Yorker.

import GraphQLFiltersWhereBeacon from '/_includes/code/graphql.filters.where.beacon.mdx';

<GraphQLFiltersWhereBeacon/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "inPublication": [
            {
              "name": "New Yorker"
            }
          ],
          "title": "The Hidden Costs of Automated Thinking"
        },
        {
          "inPublication": [
            {
              "name": "New Yorker"
            }
          ],
          "title": "The Real Deal Behind the U.S.\u2013Iran Prisoner Swap"
        },
        ...
      ]
    }
  }
}
```

</details>

### By count of reference

Above example shows how filter by reference can solve straightforward questions like "Find all articles that are published by New Yorker". But questions like "Find all articles that are written by authors that wrote at least two articles", cannot be answered by the above query structure. It is however possible to filter by reference count. To do so, simply provide one of the existing compare operators (`Equal`, `LessThan`, `LessThanEqual`, `GreaterThan`, `GreaterThanEqual`) and use it directly on the reference element. For example:

import GraphQLFiltersWhereBeaconCount from '/_includes/code/graphql.filters.where.beacon.count.mdx';

<GraphQLFiltersWhereBeaconCount/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Author": [
        {
          "name": "Agam Shah",
          "writesFor": [
            {
              "name": "Wall Street Journal"
            },
            {
              "name": "Wall Street Journal"
            }
          ]
        },
        {
          "name": "Costas Paris",
          "writesFor": [
            {
              "name": "Wall Street Journal"
            },
            {
              "name": "Wall Street Journal"
            }
          ]
        },
        ...
      ]
    }
  }
}
```

</details>

### By geo coordinates

A special case of the `Where` filter is with geoCoordinates. This filter is only supported by the `Get{}` function. If you've set the `geoCoordinates` property type, you can search in an area based on kilometers.

For example, this curious returns all in a radius of 2KM around a specific geo-location:

import GraphQLFiltersWhereGeocoords from '/_includes/code/graphql.filters.where.geocoordinates.mdx';

<GraphQLFiltersWhereGeocoords/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "headquartersGeoLocation": {
            "latitude": 51.512737,
            "longitude": -0.0962234
          },
          "name": "Financial Times"
        },
        {
          "headquartersGeoLocation": {
            "latitude": 51.512737,
            "longitude": -0.0962234
          },
          "name": "International New York Times"
        }
      ]
    }
  }
}
```

</details>

Note that `geoCoordinates` uses a vector index under the hood.

### By null state

Using the `IsNull` operator allows you to do filter for objects where given properties are `null` or `not null`. Note that zero-length arrays and empty strings are equivalent to a null value.

```graphql
{
  Get {
    <Class>(where: {
        operator: IsNull,
        valueBoolean: <true/false>
        path: [<property>]
  }
}
```

:::note
Filtering by null-state requires the target class to be configured to index this. See [here](../../config-refs/schema/index.md#invertedindexconfig--indexnullstate) for details.
:::


## Related pages

- [How-to search: Filters](../../search/filters.md)



import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
