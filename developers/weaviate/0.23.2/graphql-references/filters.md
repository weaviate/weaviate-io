---
layout: layout-documentation
solution: weaviate
sub-menu: GraphQL references
title: Filters
intro: Filters can be set to order or sort your dataset or to find specific data objects. Some filters are available in multiple functions where others are only available in specific ones.
description: GraphQL filters
tags: ['graphql', 'filters']
menu-order: 4
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Where filter

## Filter structure

Supported by the `Get{}` and `Aggregate{}` function.

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
- `Operands`: Is a list of `Operator` objects of this same structure, only used if the parent `Operator` is set to `And` or `Or`.
- `Path`: Is a list of strings indicating the property name of the class. If the property is a beacon (i.e., cross-reference), the path should be followed to the property of the beacon which should be specified as a list of strings.
- `valueInt`: The integer value where the `Path`'s last property name should be compared to.
- `valueBoolean`: The boolean value that the `Path`'s last property name should be compared to.
- `valueString`: The string value that the `Path`'s last property name should be compared to.
- `valueNumber`: The number (float) value that the `Path`'s last property name should be compared to.
- `valueDate`: The date (ISO 8601 timestamp, formatted as [RFC3339](https://tools.ietf.org/html/rfc3339)) value that the `Path`'s last property name should be compared to.

```graphql
{
  Get {
    <SematicKind> {
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
}
```

### Filter behavior of multi-word queries in `Equal` operator
The behavior for the `Equal` operator on multi-word string and text properties in `where` filters is as follows. Multi-word queries are broken up into single word segments. An object must contain all segments. How words are broken up depends on the datatype. For `string` properties only spaces defined word boundaries. For `text` properties all non-alphanumeric properties are considered word boundaries. E.g. for `text`: `my email is alice@example.com` is split into `["my", "email", "is", "alice" "example", "com"]`, whereas the same query string on a `string` property would be broken into `["my", "email", "is", "alice@example.com"]`.

## Single operand

You can create operator filters by setting the `where` key. You always need to include the GraphQL property path, the operator type, and the valueType plus a value.

For example, this filter selects articles from the class Article with a wordcount higher than 1000.

{% include code/0.23.2/graphql.filters.where.simple.html %}

### Example response

```json
{
  "data": {
    "Get": {
      "Things": {
        "Article": [
          {
            "title": "Opinion | John Lennon Told Them ‘Girls Don’t Play Guitar.’ He Was So Wrong."
          },
        ]
      }
  },
  "errors": null
} 
```

### Multiple operands

You can set multiple operands by providing an array.

For example, these filters select based on the class Article with a wordCount higher than 1000 and who are published before January 1st 2020. Note that you can filter a date and time just similar to numbers, with the `valueDate` given as `string`. Note that the `valueDate` should be formatted according to standard [RFC3339](https://tools.ietf.org/html/rfc3339).

{% include code/0.23.2/graphql.filters.where.operands.html %}

## Like operator

Using the `Like` operator allows you to do string searches based on partial match. The capabilities of this operator are:

- `?` -> exactly one unknown character
  - `car?` matches `cart`, `care`, but not `car`
- `*` -> zero, one or more unknown characters
  - `car*` matches `car`, `care`, `carpet`, etc
  - `*car*` matches `car`, `healthcare`, etc.

{% include code/0.23.2/graphql.filters.where.like.html %}

### Notes
Each query using the `Like` operator iterates over the entire inverted index for that property. The search time will go up linearly with the dataset size. Be aware that there might be a point where this query is too expensive and will not work anymore. We will improve this implementation in a future release. You can leave feedback or feature requests in a [Github issue](https://github.com/semi-technologies/weaviate/issues). 

### Example response

```json
{
  "data": {
    "Get": {
      "Things": {
        "Publication": [
          {
            "name": "New Yorker"
          },
          {
            "name": "New York Times"
          }
        ]
      }
    }
  },
  "errors": null
}
```

## Beacon (reference) filters

You can also search for the value of the property of a beacon.

For example, these filters select based on the class Article but who have `inPublication` set to New Yorker.

{% include code/0.23.2/graphql.filters.where.beacon.html %}

## Filter objects by count of reference

Above example shows how filter by reference can solve straightforward questions like "Find all articles that are published by New Yorker". But questions like "Find all articles that are written by authors that wrote at least two articles", cannot be answered by the above query structure. It is however possible to filter by reference count. To do so, simply provide one of the existing compare operators (`Equal`, `LessThan`, `LessThanEqual`, `GreaterThan`, `GreaterThanEqual`) and use it directly on the reference element. For example:

{% include code/0.23.2/graphql.filters.where.beacon.count.html %}

## GeoCoordinates filter

A special case of the `Where` filter is with geoCoordinates. This filter is only supported by the `Get{}` function. If you've set the `geoCoordinates` property type, you can search in an area based on kilometers.

For example, this curious returns all in a radius of 2KM around a specific geo-location:

{% include code/0.23.2/graphql.filters.where.geocoordinates.html %}

### Example response

```json
{
  "data": {
    "Get": {
      "Things": {
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
  },
  "errors": null
}
```

# Limit filter
Supported by the `Get{}`, `Explore{}` and `Aggregate{}` function.

A limit filter limits the number of results.

An example of a stand-alone limit filter:

{% include code/0.23.2/graphql.filters.limit.html %}

### Example response

```json
{
  "data": {
    "Get": {
      "Things": {
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
    }
  },
  "errors": null
}
```


# Explore filter (semantic searching)

Supported by the `Get{}` function. (Note that this filter is different from the [GraphQL `Explore{}` function](explore.html) )

You can use an explore filter to find concepts in your dataset. The `explore{}` filter is structured as follows for the `Get{}` function:

{% include code/0.23.2/graphql.filters.explore.html %}

### Example response

```json
{
  "data": {
    "Get": {
      "Things": {
        "Publication": [
          {
            "name": "Vogue"
          }
        ]
      }
    }
  },
  "errors": null
}
```

### CamelCase interpretation

Weaviate splits words based on CamelCase. For example, if a user wants to explore for the iPhone (the Apple device) they should use `iphone` rather than `iPhone` because the latter will be interpreted as `[i, phone]`.

### Concepts

Strings written in the `Concepts` array are your fuzzy search terms. An array of concepts is required to set in the Explore query, and all words in this array should be present in the Contextionary.

There are three ways to define the `concepts` array argument in the Explore filter.

- `["New York Times"]` = one vector position is determined based on the occurrences of the words
- `["New", "York", "Times"]` = all concepts have a similar weight.
- `["New York", "Times"]` = a combination of the two above.

A practical example would be: `concepts: ["beatles", "John Lennon"]`

### Certainty

You can set a minimum required `certainty`, which will be used to determine which data results to return. The value is a float between 0.0 (return all data objects, regardless similarity) and 1.0 (only return data objects that are matching completely, without any uncertainty). The certainty of a query result is computed by normalized distance of the fuzzy query and the data object in the vector space.

### Moving

Because pagination is not possible in multidimensional storage, you can improve your results with additional explore functions which can move away from semantic concepts or towards semantic concepts. E.g., if you look for the concept 'New York Times' but don't want to find the city New York, you can use the `moveAwayFrom{}` function by using the words 'New York'. This is also a way to exclude concepts and to deal with negations (`not` operators in similar query languages). Concepts in the `moveAwayFrom{}` filter are not per definition excluded from the result, but the resulting concepts are further away from the concepts in this filter.

# Group filter (entity merging)

Supported by the `Get{}` function.

You can use a group filter to combine similar concepts (aka _entity merging_). There are two ways of grouping objects with a semantic similarity together.

- `closest`, which shows the one result closest to the others.
- `merge`, which merges all results into one.

The `group{}` filter is structured as follows for the `Get{}` function:

```graphql
{
  Get{
    <SematicKind>{
      <Class>(
        group: {
          type: <String>  # "closest" or "merge"
          force: <Number> # percentage as float (0.75 = 75%) how closely merge items should be related       
        }
      ){
        <property>
      }
    }
  }
}
```

Note that all words in the `concepts` argument array should be present in the Contextionary.

An example query:

{% include code/0.23.2/graphql.filters.group.html %}

This results in the following. Note that publications `International New York Times`, `The New York Times Company` and `New York Times` are merged. The property values that do not have an exact overlap will all be shown, with the value of the most central concept before the brackets.

```json
{
  "data": {
    "Get": {
      "Things": {
        "Publication": [
          {
            "name": "Vogue"
          },
          {
            "name": "Wired"
          },
          {
            "name": "Financial Times"
          },
          {
            "name": "New Yorker"
          },
          {
            "name": "The Economist"
          },
          {
            "name": "International New York Times (The New York Times Company, New York Times)"
          },
          {
            "name": "Wall Street Journal"
          },
          {
            "name": "CNN"
          },
          {
            "name": "Game Informer"
          },
          {
            "name": "The Guardian"
          },
          {
            "name": "Fox News"
          }
        ]
      }
    }
  },
  "errors": null
}
```

# More Resources

{% include docs-support-links.html %}