---
title: GraphQL - Filters
sidebar_position: 4
# layout: layout-documentation
# solution: weaviate
# sub-menu: GraphQL references
# title: Filters
# intro:  Filters allow you to find specific data objects based on operators such as GreaterThan, LessThanEqual, Like, etc. You can mix filters with <a href="./vector-search-parameters.html">vector search parameters</a> too. Also, you can use filters to sort or limit the number of returned objects.
# description: GraphQL filters
# tags: ['graphql', 'filters']
# sidebar_position: 4
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.4.1/graphql-references/filters.html
#     - /documentation/weaviate/current/query-data/filters.html
#     - /documentation/weaviate/current/graphql-references/filters.html
---

# Setting filters

Filters are added to GraphQL queries on the class level.

For example:

{% include code/1.x/graphql.filters.example.html %}

# Where filter

## Filter structure

Supported by the `Get{}` and `Aggregate{}` function.

The `where` filter is an [algebraic object](https://en.wikipedia.org/wiki/Algebraic_structure), which takes the following arguments:

- `Operator` (which takes one of the following values)
  - `And`
  - `Or`
  - `Not`
  - `Equal`
  - `NotEqual`
  - `GreaterThan`
  - `GreaterThanEqual`
  - `LessThan`
  - `LessThanEqual`
  - `Like`
  - `WithinGeoRange`
  - `IsNull`
- `Operands`: Is a list of `Operator` objects of this same structure, only used if the parent `Operator` is set to `And` or `Or`.
- `Path`: Is a list of strings in Xpath style, indicating the property name of the class.
   If the property is a beacon (i.e., cross-reference), the path should be followed to the property of the beacon which should be specified as a list of strings.
    for a schema structure like:
```
{
  "inPublication": {
    "Publication": {
      "name": "Wired"
    }
  }
}
```
the path selector for `name` will be `["inPublication", "Publication", "name"]` 
- `valueInt`: The integer value where the `Path`'s last property name should be compared to.
- `valueBoolean`: The boolean value that the `Path`'s last property name should be compared to.
- `valueString`: The string value that the `Path`'s last property name should be compared to.
- `valueText`: The text value that the `Path`'s last property name should be compared to.
- `valueNumber`: The number (float) value that the `Path`'s last property name should be compared to.
- `valueDate`: The date (ISO 8601 timestamp, formatted as [RFC3339](https://tools.ietf.org/html/rfc3339)) value that the `Path`'s last property name should be compared to.

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

### Filter behavior of multi-word queries in `Equal` operator
The behavior for the `Equal` operator on multi-word string and text properties in `where` filters is as follows. Multi-word queries are broken up into single word segments. An object must contain all segments. How words are broken up depends on the datatype. For `string` properties only spaces defined word boundaries. For `text` properties all non-alphanumeric properties are considered word boundaries. E.g. for `text`: `my email is alice@example.com` is split into `["my", "email", "is", "alice" "example", "com"]`, whereas the same query string on a `string` property would be broken into `["my", "email", "is", "alice@example.com"]`.

Starting with `v1.12.0` you can [configure tokenization of `string` types](../schema/schema-configuration.html#property-tokenization) to take the whole field into account instead of individual words.

### Stopwords in `text`/`string` filter values

Starting with `v1.12.0` you can configure your own [stopword lists for the inverted index](../schema/schema-configuration.html#invertedindexconfig--stopwords-stopword-lists). 

## Single operand

You can create operator filters by setting the `where` key. You always need to include the GraphQL property path, the operator type, and the valueType plus a value.

For example, this filter selects articles from the class Article with a wordcount higher than 1000.

{% include code/1.x/graphql.filters.where.simple.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28where%3A+%7B%0D%0A++++++++path%3A+%5B%22wordCount%22%5D%2C++++%23+Path+to+the+property+that+should+be+used%0D%0A++++++++operator%3A+GreaterThan%2C++%23+operator%0D%0A++++++++valueInt%3A+1000++++++++++%23+value+%28which+is+always+%3D+to+the+type+of+the+path+property%29%0D%0A++++++%7D%29+%7B%0D%0A++++++title%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Opinion | John Lennon Told Them ‘Girls Don’t Play Guitar.’ He Was So Wrong."
        },
      ]
  },
  "errors": null
} 
```

## Filter by id

You can filter object by their unique id or uuid, where you give the `id` as `valueString`.

{% include code/1.x/graphql.filters.where.id.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28where%3A+%7B%0D%0A++++++++path%3A+%5B%22id%22%5D%2C%0D%0A++++++++operator%3A+Equal%2C%0D%0A++++++++valueString%3A+%22e5dc4a4c-ef0f-3aed-89a3-a73435c6bbcf%22%0D%0A++++++%7D%29+%7B%0D%0A++++++title%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "9 home improvement projects that are easier – and often cheaper – in the winter"
        },
      ]
  },
  "errors": null
} 
```

## Filter by timestamps

Filtering can be performed with internal timestamps as well, such as `creationTimeUnix` and `lastUpdateTimeUnix`. These values can be represented either as Unix epoch milliseconds, or as [RFC3339](https://tools.ietf.org/html/rfc3339) formatted datetimes. Note that epoch milliseconds should be passed in as a `valueString`, and an RFC3339 datetime should be a `valueDate`.

*Note: filtering by timestamp requires the target class to be configured to index  timestamps. See [here](../schema/schema-configuration.html#invertedindexconfig--indextimestamps) for details* 

{% include code/1.x/graphql.filters.where.timestamps.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0A++Get+%7B%0A++++Article(where%3A+%7B%0A++++++++path%3A+%5B%22_creationTimeUnix%22%5D%2C%0A++++++++operator%3A+Equal%2C%0A++++++++valueString%3A+%221647653194586%22%0A++++++%7D)+%7B%0A++++++title%0A++++%7D%0A++%7D%0A%7D' %}

### Example Response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "9 home improvement projects that are easier – and often cheaper – in the winter"
        },
      ]
  },
  "errors": null
} 
```

## Filter by property length

Filtering can be performed with the length of properties.

The length of properties is calculated differently depending on the type:
- array types: the number of entries in the array is used, where null (property not present) and empty arrays both have the length 0. 
- strings and texts: the number of characters, unicode characters such as 世 count as one character.
- numbers, booleans, geo-coordinates, phone-numbers and data-blobs are not supported.

```graphql
{
  Get {
    <Class>(where: {
        operator: <Operator>,
        valueInt: <value>
        path: [len(<property>)]
  }
}
```
Supported operators are `(not) equal` and `greater/less than (equal)` and values need to be 0 or larger.

*Note: filtering by property length requires the target class to be configured to index the length. See [here](../schema/schema-configuration.html#invertedindexconfig--indexpropertylength) for details* 


## Multiple operands

You can set multiple operands by providing an array.

For example, these filters select based on the class Article with a wordCount higher than 1000 and who are published before January 1st 2020. Note that you can filter a date and time just similar to numbers, with the `valueDate` given as `string`. Note that the `valueDate` should be formatted according to standard [RFC3339](https://tools.ietf.org/html/rfc3339).

{% include code/1.x/graphql.filters.where.operands.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28where%3A+%7B%0D%0A++++++operator%3A+And%2C%0D%0A++++++operands%3A+%5B%7B%0D%0A++++++++++path%3A+%5B%22wordCount%22%5D%2C%0D%0A++++++++++operator%3A+GreaterThan%2C%0D%0A++++++++++valueInt%3A+1000%0D%0A++++++++%7D%2C+%7B%0D%0A++++++++++path%3A+%5B%22wordCount%22%5D%2C%0D%0A++++++++++operator%3A+LessThan%2C%0D%0A++++++++++valueInt%3A+1500%0D%0A++++++++%7D%5D%0D%0A++++++%7D%29+%7B%0D%0A++++++title%0D%0A++++++wordCount%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Like operator

Using the `Like` operator allows you to do string searches based on partial match. The capabilities of this operator are:

- `?` -> exactly one unknown character
  - `car?` matches `cart`, `care`, but not `car`
- `*` -> zero, one or more unknown characters
  - `car*` matches `car`, `care`, `carpet`, etc
  - `*car*` matches `car`, `healthcare`, etc.

{% include code/1.x/graphql.filters.where.like.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication%28where%3A+%7B%0D%0A++++++++++path%3A+%5B%22name%22%5D%2C%0D%0A++++++++++operator%3A+Like%2C%0D%0A++++++++++valueString%3A+%22New+%2A%22%0D%0A++++++%7D%29+%7B%0D%0A++++++name%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Notes
Each query using the `Like` operator iterates over the entire inverted index for that property. The search time will go up linearly with the dataset size. Be aware that there might be a point where this query is too expensive and will not work anymore. We will improve this implementation in a future release. You can leave feedback or feature requests in a [Github issue](https://github.com/semi-technologies/weaviate/issues). 

### Example response

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "name": "New Yorker"
        },
        {
          "name": "New York Times"
        }
      ]
    }
  },
  "errors": null
}
```

## Beacon (reference) filters

You can also search for the value of the property of a beacon.

For example, these filters select based on the class Article but who have `inPublication` set to New Yorker.

{% include code/1.x/graphql.filters.where.beacon.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28where%3A+%7B%0D%0A++++++++path%3A+%5B%22inPublication%22%2C+%22Publication%22%2C+%22name%22%5D%2C%0D%0A++++++++operator%3A+Equal%2C%0D%0A++++++++valueString%3A+%22New+Yorker%22%0D%0A++++++%7D%29+%7B%0D%0A++++++title%0D%0A++++++inPublication%7B%0D%0A++++++++...+on+Publication%7B%0D%0A++++++++++name%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

## Filter objects by count of reference

Above example shows how filter by reference can solve straightforward questions like "Find all articles that are published by New Yorker". But questions like "Find all articles that are written by authors that wrote at least two articles", cannot be answered by the above query structure. It is however possible to filter by reference count. To do so, simply provide one of the existing compare operators (`Equal`, `LessThan`, `LessThanEqual`, `GreaterThan`, `GreaterThanEqual`) and use it directly on the reference element. For example:

{% include code/1.x/graphql.filters.where.beacon.count.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Author%28%0D%0A++++++where%3A%7B%0D%0A++++++++valueInt%3A+2%2C%0D%0A++++++++operator%3A+GreaterThanEqual%2C%0D%0A++++++++path%3A+%5B%22WroteArticles%22%5D%0D%0A++++++%7D%0D%0A++++%29+%7B%0D%0A++++++name%0D%0A++++++wroteArticles+%7B%0D%0A++++++++...+on+Article+%7B%0D%0A++++++++++title%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A+%7D' %}

## GeoCoordinates filter

A special case of the `Where` filter is with geoCoordinates. This filter is only supported by the `Get{}` function. If you've set the `geoCoordinates` property type, you can search in an area based on kilometers.

For example, this curious returns all in a radius of 2KM around a specific geo-location:

{% include code/1.x/graphql.filters.where.geocoordinates.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Publication%28where%3A+%7B%0D%0A++++++operator%3A+WithinGeoRange%2C%0D%0A++++++valueGeoRange%3A+%7B%0D%0A++++++++geoCoordinates%3A+%7B%0D%0A++++++++++latitude%3A+51.51%2C++++%23+latitude%0D%0A++++++++++longitude%3A+-0.09++++%23+longitude%0D%0A++++++++%7D%2C%0D%0A++++++++distance%3A+%7B%0D%0A++++++++++max%3A+2000+++++++++++%23+distance+in+meters%0D%0A++++++++%7D%0D%0A++++++%7D%2C%0D%0A++++++path%3A+%5B%22headquartersGeoLocation%22%5D+%23+property+needs+to+be+of+geoLocation+type.%0D%0A++++%7D%29+%7B%0D%0A++++++name%0D%0A++++++headquartersGeoLocation+%7B%0D%0A++++++++latitude%0D%0A++++++++longitude+%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Example response

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
  },
  "errors": null
}
```

## Filter by null state

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

*Note: filtering by null-state requires the target class to be configured to index this. See [here](../schema/schema-configuration.html#invertedindexconfig--indexnullstate) for details* 

# Sorting

*Note: Support for sorting was added in `v1.13.0`.*

You can sort results by any primitive property, typically a `text`, `string`, `number`, or `int` property. When a query has a natural order (e.g. because of a `near<Media>` vector search), adding a sort operator will override the order.

## Cost of Sorting / Architecture

Weaviate's sorting implementation is built in a way that it does not lead to massive memory spikes; it does not need to load all objects to be sorted into memory completely. Only the property value being sorted is kept in memory.

As of now, Weaviate does not have any data structures on disk specific to sorting, such as a column-oriented storage mechanism. As a result when an object should be sorted, the whole object is identified on disk and the relevant property extracted. This works reasonably well for small scales (100s of thousand or millions), but comes with a high cost at large lists of objects to be sorted (100s of millions, billions).  A column-oriented storage mechanism may be introduced in the future to  overcome this performance limitation.

## Sorting decisions

### booleans order
`false` is considered smaller than `true`. `false` comes before `true` in ascending order and after `true` in descending order.

### nulls order
`null` values are considered smaller than any non-`null` values. `null` values come first in ascending order and last in descending order.

### arrays order
Arrays are compared by each element separately. Elements at the same position are compared to each other, starting from the beginning of an array. First element smaller than its counterpart makes whole array smaller.

Arrays are equal if they have the same size and all elements are equal. If array is subset of other array it is considered smaller.

Examples:
- `[1, 2, 3] = [1, 2, 3]`
- `[1, 2, 4] < [1, 3, 4]`
- `[2, 2] > [1, 2, 3, 4]`
- `[1, 2, 3] < [1, 2, 3, 4]`

## Sorting API

{% include code/1.x/graphql.get.sorting.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0A++Get+%7B%0A++++Article%28sort%3A+%5B%7B%0A++++++path%3A+%5B%22title%22%5D%0A++++++order%3A+asc%0A++++%7D%5D%29+%7B%0A++++++title%0A++++++url%0A++++++wordCount%0A++++%7D%0A++%7D%0A%7D' %}

# Limit Argument

Supported by the `Get{}`, `Explore{}` and `Aggregate{}` function.

A `limit` argument limits the number of results.

An example of a stand-alone `limit` filter:

{% include code/1.x/graphql.filters.limit.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28limit%3A5%29+%7B%0D%0A++++++title%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "The War Vet, the Dating Site, and the Phone Call From Hell"
        },
        {
          "title": "Opinion | John Lennon Told Them ‘Girls Don’t Play Guitar.’ He Was So Wrong."
        },
        {
          "title": "The press pressed - Brazilian prosecutors go after Glenn Greenwald, an American journalist"
        },
        {
          "title": "Not to Ruin the Super Bowl, but the Sea Is Consuming Miami"
        },
        {
          "title": "Coca-Cola Resurrects Post of Chief Marketing Officer"
        }
      ]
    }
  },
  "errors": null
}
```

# Offset argument (pagination)

Supported by the `Get{}`, `Explore{}` and `Aggregate{}` function.

The offset parameter works in conjunction with the existing limit parameter. For example, to list the first ten results, set `limit: 10`. Then, to "display the second page of 10", set `offset: 10`, `limit:10` and so on. E.g. to show the 9th page of 10 results, set `offset:80, limit:10` to effectively display results 81-90.

An example of a stand-alone `limit` filter:

{% include code/1.x/graphql.filters.offset.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0A%20%20Get%20%7B%0A%20%20%20%20Article(%0A%20%20%20%20%20%20limit%3A%205%2C%0A%20%20%20%20%20%20offset%3A%202%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D' %}

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Hong Kong tries its best to spoil China’s big anniversary"
        },
        {
          "title": "‘People don’t want any of them’: Peru election sees unpredictable contest"
        },
        {
          "title": "Brazil: homes of Bolsonaro associates raided in sweeping anti-corruption operation"
        },
        {
          "title": "If Convicting Trump Is Out of Reach, Managers Seek a Verdict From the Public and History"
        },
        {
          "title": "Watch The Juliana Plaintiffs Vic Barrett, Kelsey Juliana, and Levi Draheim in Conversation with Sandra Upson | Wired Video | CNE | Wired.com"
        }
      ]
    }
  }
}
```

### Performance and Resource Considerations & Limitations

The pagination implementation is an offset-based implementation, not a cursor-based implementation. This has the following implications:

- The cost of retrieving one further page is higher than that of the last. Effectively when searching for search results 91-100, Weaviate will internally retrieve 100 search results and discard results 0-90 before serving them to the user. This effect is amplified if running in a multi-shard setup, where each shard would retrieve 100 results, then the results aggregated and ultimately cut off. So in a 10-shard setup asking for results 91-100 Weavaite will effectively have to retrieve 1000 results (100 per shard) and discard 990 of them before serving. This means, high page numbers lead to longer response times and more load on the machine/cluster.
- Due to the increasing cost of each page outlined above, there is a limit to how many objects can be retrieved using pagination. By default setting the sum of `offset` and `limit` to higher than 10,000 objects, will lead to an error. If you must retrieve more than 10,000 objects, you can increase this limit by setting the environment variable `QUERY_MAXIMUM_RESULTS=<desired-value>`. Warning: Setting this to arbitrarily high values can make the memory consumption of a single query explode and single queries can slow down the entire cluster. We recommend setting this value to the lowest possible value that does not interfere with your users' expectations.
- The pagination setup is not stateful. If the database state has changed between retrieving two pages there is no guarantee that your pages cover all results. If no writes happened, then pagination can be used to retrieve all possible within the maximum limit. This means asking for a single page of 10,000 objects will lead to the same results overall as asking for 100 pages of 100 results. 

# More Resources

{% include docs-support-links.html %}
