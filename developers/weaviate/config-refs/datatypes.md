---
title: Data types
sidebar_position: 20
image: og/docs/configuration.jpg
# tags: ['Data types']
---


:::info Related pages
- [Configuration: Schema](../manage-data/collections.mdx)
- [References: REST API: Schema](../api/rest/schema.md)
- [Concepts: Data Structure](../concepts/data.md)
:::

## Introduction

When creating a property, Weaviate needs to know what type of data you will give it. Weaviate accepts the following types:

import DataTypes from '/_includes/datatypes.mdx';

<DataTypes />

:::note Notes
-  Although Weaviate supports `int64`, GraphQL currently only supports `int32`, and does not support `int64`. This means that currently _integer_ data fields in Weaviate with integer values larger than `int32`, will not be returned using GraphQL queries. We are working on solving this [issue](https://github.com/weaviate/weaviate/issues/1563). As current workaround is to use a `string` instead.
- Data types are specified as an array (e.g. ["text"]), as it is required for some cross-reference specifications.
:::

## DataType: `text`

### Tokenization configuration

Refer to [this section](../config-refs/schema/index.md#property-tokenization) on how to configure the tokenization behavior of a `text` property.

:::tip `string` is deprecated

Prior to `v1.19`, Weaviate supported an additional datatype `string`, which was differentiated by tokenization behavior to `text`. As of `v1.19`, this type is deprecated and will be removed in a future release.

Please use `text` instead, which now supports all tokenizations options previously available through `string`.
:::
## DataType: `cross-reference`

The [`cross-reference`](../more-resources/glossary.md) type is the graph element of Weaviate: you can create a link from one object to another. In the schema you can define multiple classes to which a property can point, in a list of strings. The strings in the `dataType` list are names of classes defined elsewhere in the schema. For example:

```json
{
  "properties": [
    {
      "name": "hasWritten",
      "dataType": [
        "Article",
        "Blog"
      ]
    }
  ]
}
```

### Number of linked instances

The `cross-reference` type objects are `arrays` by default. This allows you to link to any number of instances of a given class (including zero).

In the above example, our objects can be linked to:
* **0** Articles and **1** Blog
* **1** Article and **3** Blogs
* **2** Articles and **5** Blogs
* etc.

## DataType: `object`

:::info Added in `v1.22`
:::

The `object` type allows you to store nested data structures in Weaviate. The data structure is a JSON object, and can be nested to any depth.

For example, a `Person` class could have an `address` property, as an object. It could in turn include nested properties such as `street` and `city`:

```json
{
    "class": "Person",
    "properties": [
        {
            "dataType": ["text"],
            "name": "last_name",
        },
        {
            "dataType": ["object"],
            "name": "address",
            "nestedProperties": [
                {"dataType": ["text"], "name": "street"},
                {"dataType": ["text"], "name": "city"}
            ],
        }
    ],
}
```

An object for this class may have a structure such as follows:

```json
{
    "last_name": "Franklin",
    "address": {
        "city": "London",
        "street": "King Street"
    }
}
```

As of `1.22`, `object` and `object[]` datatype properties are not indexed and not vectorized.

Future plans include the ability to index nested properties, for example to allow for filtering on nested properties and vectorization options.

## DataType: `date`

Weaviate requires an [RFC 3339](https://datatracker.ietf.org/doc/rfc3339/) formatted date that includes the time and the offset.

For example:

- `"1985-04-12T23:20:50.52Z"`.
- `"1996-12-19T16:39:57-08:00"`.
- `"1937-01-01T12:00:27.87+00:20"`.

In case you want to add a list of dates as one Weaviate data value, you can use above formatting in an array, for example like: `["1985-04-12T23:20:50.52Z", "1937-01-01T12:00:27.87+00:20"]`

## DataType: `blob`

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
cat my_image.png | base64
```

You can then import data with `blob` dataType to Weaviate as follows:

```bash
curl \
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
## DataType: `uuid`

:::info Added in `v1.19`
:::

The dedicated `uuid` and `uuid[]` data types are more space-efficient than storing the same data as text.

-   Each `uuid` is a 128-bit (16-byte) number.
-   The filterable index uses roaring bitmaps.

:::note Aggregate/sort currently not possible
It is currently not possible to aggregate or sort by `uuid` or `uuid[]` types.
:::

## DataType: `geoCoordinates`

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

## DataType: `phoneNumber`

There is a special, primitive data type `phoneNumber`. When a phone number is added to this field, the input will be normalized and validated, unlike the single fields as `number` and `string`. The data field is an object, as opposed to a flat type similar to `geoCoordinates`. The object has multiple fields:

```yaml
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


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
