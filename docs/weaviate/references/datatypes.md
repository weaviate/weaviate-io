---
title: Schema data types
sidebar_position: 22
# layout: layout-documentation
# solution: weaviate
# sub-menu: Schema
# title: Data types
# description: 
# tags: ['Data types']
# sidebar_position: 2
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.3.0/data-schema/datatypes.html
#     - /developers/weaviate/current/data-schema/datatypes.html
---

# Introduction

When creating a property, Weaviate needs to know what type of data you will give it. Weaviate accepts the following types:

| Weaviate Type | Exact Data Type | Formatting |
| ---------|--------|-----------|
| string   | string | `"string"` |
| string[]   | list of strings | `["string", "second string"]` |
| int      | int64 (*) | `0` |
| int[]      | list of int64 (*) | `[0, 1]` |
| boolean  | boolean | `true`/`false` |
| boolean[]  | list of booleans | `[true, false]` |
| number   | float64 | `0.0` |
| number[]   | list of float64 | `[0.0, 1.1]` |
| date     | string | [more info](#datatype-date) |
| date[]     | list of string | [more info](#datatype-date) |
| text     | text   | `string` |
| text[]     | list of texts   | `["string one", "string two"]` |
| geoCoordinates | string | [more info](#datatype-geocoordinates) |
| phoneNumber | string | [more info](#datatype-phonenumber) |
| blob | base64 encoded string | [more info](#datatype-blob) |
| *cross reference* | string | [more info](#datatype-cross-reference) |

(*) Although Weaviate supports `int64`, GraphQL currently only supports `int32`, and does not support `int64`. This means that currently _integer_ data fields in Weaviate with integer values larger than `int32`, will not be returned using GraphQL queries. We are working on solving this [issue](https://github.com/semi-technologies/weaviate/issues/1563). As current workaround is to use a `string` instead.

# DataType: string vs. text

There are two datatypes dedicated to saving textual information: string and text. `string` values are indexed as one token, whereas `text` values are indexed after applying tokenization. `“jane.doe@foobar.com”` as string would be indexed as `“jane.doe@foobar.com”` and also only match that in a GraphQL where filter, whereas as text it would be indexed as `['jane', 'doe', 'foobar', 'com']` and also match the individual words.

# DataType: date

Weaviate requires an [RFC 3339](https://tools.ietf.org/html/rfc3339) formatted date that includes the time and the offset.

For example:

- `"1985-04-12T23:20:50.52Z"`.
- `"1996-12-19T16:39:57-08:00"`.
- `"1937-01-01T12:00:27.87+00:20"`.

In case you want to add a list of dates as one Weaviate data value, you can use above formatting in an array, for example like: `["1985-04-12T23:20:50.52Z", "1937-01-01T12:00:27.87+00:20"]`

# DataType: geoCoordinates

Weaviate allows you to store geo coordinates related to a thing or action. When querying Weaviate, you can use this type to find items in a radius around this area. A geo coordinate value is a float, and is processed as [decimal degree](https://en.wikipedia.org/wiki/Decimal_degrees) according to the [ISO standard](https://www.iso.org/standard/39242.html#:~:text=For%20computer%20data%20interchange%20of,minutes%2C%20seconds%20and%20decimal%20seconds).

An example of how geo coordinates are used in a data object:

```json
{
  "City": {
    "location": {
      "latitude": 52.366667,
      "longitude": 4.9
    }
  }
}
```

# DataType: phoneNumber

There is a special, primitive data type `phoneNumber`. When a phone number is added to this field, the input will be normalized and validated, unlike the single fields as `number` and `string`. The data field is an object, as opposed to a flat type similar to `geoCoordinates`. The object has multiple fields:

```json
{
  "phoneNumber": {
    "input": "020 1234567",                       // Required. Raw input in string format
    "defaultCountry": "nl",                       // Required if only a national number is provided, ISO 3166-1 alpha-2 country code. Only set if explicitly set by the user.
    "internationalFormatted": "+31 20 1234567",   // Read-only string
    "countryCode": 31,                            // Read-only unsigned integer, numerical country code
    "national": 201234567,                        // Read-only unsigned integer, numerical representation of the national number
    "nationalFormatted": "020 1234567",           // Read-only string
    "valid": true                                 // Read-only boolean. Whether the parser recognized the phone number as valid
  }
}
```

There are two fields that accept input. `input` must always be set, while `defaultCountry` must only be set in specific situations. There are two scenarios possible:
- When you entered an international number (e.g. `"+31 20 1234567"`) to the `input` field, no `defaultCountry` needs to be entered. The underlying parser will automatically recognize the number's country.
- When you entered a national number (e.g. `"020 1234567"`), you need to specify the country in `defaultCountry` (in this case, `"nl"`), so that the parse can correctly convert the number into all formats. The string in `defaultCountry` should be an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. 

As you can see in the code snippet above, all other fields are read-only. These fields are filled automatically, and will appear when reading back a field of type `phoneNumber`.

# DataType: blob

The datatype blob accepts any binary data. The data should be `base64` encoded, and passed as a `string`. Characteristics:
* Weaviate doesn't make assumptions about the type of data that is encoded. A module (e.g. `img2vec`) can investigate file headers as it wishes, but Weaviate itself does not do this. 
* When storing, the data is `base64` decoded (so Weaviate stores it more efficiently). 
* When serving, the data is `base64` encoded (so it is safe to serve as `json`). 
* There is no max file size limit. 
* This `blob` field is always skipped in the inverted index, regardless of setting. This mean you can not search by this `blob` field in a Weaviate GraphQL `where` filter, and there is no `valueBlob` field accordingly. Depending on the module, this field can be used in module-specific filters (e.g. `nearImage`{} in the `img2vec-neural` filter).
  
Example:

The dataType `blob` can be used as property dataType in the data schema as follows:

```json
{
  "properties": [
    {
      "name": "image",
      "dataType": ["blob"]
    }
  ]
}
```

To obtain the base64-encoded value of an image, you can run the following command - or use the helper methods in the Weaviate clients - to do so:

```bash
$ cat my_image.png | base64
```

You can then import data with `blob` dataType to Weaviate as follows:

```bash
$ curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
      "class": "FashionPicture",
      "id": "36ddd591-2dee-4e7e-a3cc-eb86d30a4302",
      "properties": {
          "image": "iVBORw0KGgoAAAANS..."
      }
  }' \
    http://localhost:8080/v1/objects
```

# DataType: cross reference

The `cross-reference` type is the graph element of Weaviate, you can create a link from one object to another. In the schema you can define multiple classes to which a property can point, in a list of strings. The strings in the `dataType` list of are names of classes that exist elsewhere in the schema. For example:

```json
{
  "properties": [
    {
      "dataType": [
        "Article",
        "Blog"
      ]
    }
  ]
}
```

## Number of linked instances
The `cross-reference` type objects are `arrays` by default. This allows you to link to any number `(0..n)` of instances of a given class.

In the above example, our objects can be linked to:
* **0** Articles and **1** Blog
* **1** Article and **3** Blogs
* **2** Articles and **5** Blogs
* etc

# More Resources

{% include docs-support-links.html %}
