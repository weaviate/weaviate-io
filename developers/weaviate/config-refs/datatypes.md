---
title: Data types
sidebar_position: 20
image: og/docs/configuration.jpg
# tags: ['Data types']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

## Introduction

When [creating a property](../manage-data/collections.mdx#add-a-property), you must specify a data type. Weaviate accepts the following types.

:::note Array types
Arrays of a data type are specified by adding `[]` to the type (e.g. `text` ➡ `text[]`). Note that not all data types support arrays.
:::

import DataTypes from '/_includes/datatypes.mdx';

<DataTypes />

## `text`

Use this type for any textual data.

- Properties with the `text` type is used for vectorization and keyword search unless specified otherwise [in the property settings](../manage-data/collections.mdx#property-level-settings).
- If using [named vectors](../concepts/data.md#multiple-vectors-named-vectors), the property vectorization is defined in the [named vector definition](../manage-data/collections.mdx#define-multiple-named-vectors).
- Text properties are tokenized prior to being indexed for keyword/BM25 searches. See [collection definition: tokenization](../config-refs/schema/index.md#property-tokenization) for more information.

<details>
  <summary><code>string</code> is deprecated</summary>

Prior to `v1.19`, Weaviate supported an additional datatype `string`, which was differentiated by tokenization behavior to `text`. As of `v1.19`, this type is deprecated and will be removed in a future release.

Use `text` instead of `string`. `text` supports the tokenization options that are available through `string`.

</details>

### Examples

import TextTypePy from '!!raw-loader!/_includes/code/python/config-refs.datatypes.text.py';
import TextTypeTs from '!!raw-loader!/_includes/code/typescript/config-refs.datatypes.text.ts';

#### Property definition

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={TextTypePy}
      startMarker="# START ConfigureDataType"
      endMarker="# END ConfigureDataType"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TextTypeTs}
      startMarker="// START ConfigureDataType"
      endMarker="// END ConfigureDataType"
      language="ts"
    />
  </TabItem>
</Tabs>

#### Object insertion

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={TextTypePy}
      startMarker="# START AddObject"
      endMarker="# END AddObject"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TextTypeTs}
      startMarker="// START AddObject"
      endMarker="// END AddObject"
      language="ts"
    />
  </TabItem>
</Tabs>

## `boolean` / `int` / `number`

The `boolean`, `int`, and `number` types are used for storing boolean, integer, and floating-point numbers, respectively.

### Examples

import NumericalTypePy from '!!raw-loader!/_includes/code/python/config-refs.datatypes.numerical.py';
import NumericalTypeTs from '!!raw-loader!/_includes/code/typescript/config-refs.datatypes.numerical.ts';

#### Property definition

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={NumericalTypePy}
      startMarker="# START ConfigureDataType"
      endMarker="# END ConfigureDataType"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={NumericalTypeTs}
      startMarker="// START ConfigureDataType"
      endMarker="// END ConfigureDataType"
      language="ts"
    />
  </TabItem>
</Tabs>

#### Object insertion

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={NumericalTypePy}
      startMarker="# START AddObject"
      endMarker="# END AddObject"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={NumericalTypeTs}
      startMarker="// START AddObject"
      endMarker="// END AddObject"
      language="ts"
    />
  </TabItem>
</Tabs>

### Note: GraphQL and `int64`

Although Weaviate supports `int64`, GraphQL currently only supports `int32`, and does not support `int64`. This means that currently _integer_ data fields in Weaviate with integer values larger than `int32`, will not be returned using GraphQL queries. We are working on solving this [issue](https://github.com/weaviate/weaviate/issues/1563). As current workaround is to use a `string` instead.

## `date`

A `date` in Weaviate is represented by an [RFC 3339](https://datatracker.ietf.org/doc/rfc3339/) timestamp in the `date-time` format. The timestamp includes the time and an offset.

For example:

- `"1985-04-12T23:20:50.52Z"`
- `"1996-12-19T16:39:57-08:00"`
- `"1937-01-01T12:00:27.87+00:20"`

To add a list of dates as a single entity, use an array of `date-time` formatted strings. For example: `["1985-04-12T23:20:50.52Z", "1937-01-01T12:00:27.87+00:20"]`

In specific client libraries, you may be able to use the native date object as shown in the following examples.

### Examples

import DateTypePy from '!!raw-loader!/_includes/code/python/config-refs.datatypes.date.py';
import DateTypeTs from '!!raw-loader!/_includes/code/typescript/config-refs.datatypes.date.ts';

#### Property definition

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={DateTypePy}
      startMarker="# START ConfigureDataType"
      endMarker="# END ConfigureDataType"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={DateTypeTs}
      startMarker="// START ConfigureDataType"
      endMarker="// END ConfigureDataType"
      language="ts"
    />
  </TabItem>
</Tabs>

#### Object insertion

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={DateTypePy}
      startMarker="# START AddObject"
      endMarker="# END AddObject"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={DateTypeTs}
      startMarker="// START AddObject"
      endMarker="// END AddObject"
      language="ts"
    />
  </TabItem>
</Tabs>

## `uuid`

:::info Added in `v1.19`
:::

The dedicated `uuid` and `uuid[]` data types efficiently store [UUIDs](https://en.wikipedia.org/wiki/Universally_unique_identifier).

-   Each `uuid` is a 128-bit (16-byte) number.
-   The filterable index uses roaring bitmaps.

:::note Aggregate/sort currently not possible
It is currently not possible to aggregate or sort by `uuid` or `uuid[]` types.
:::

### Examples

import UUIDTypePy from '!!raw-loader!/_includes/code/python/config-refs.datatypes.uuid.py';
import UUIDTypeTs from '!!raw-loader!/_includes/code/typescript/config-refs.datatypes.uuid.ts';

#### Property definition

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={UUIDTypePy}
      startMarker="# START ConfigureDataType"
      endMarker="# END ConfigureDataType"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={UUIDTypeTs}
      startMarker="// START ConfigureDataType"
      endMarker="// END ConfigureDataType"
      language="ts"
    />
  </TabItem>
</Tabs>

#### Object insertion

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={UUIDTypePy}
      startMarker="# START AddObject"
      endMarker="# END AddObject"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={UUIDTypeTs}
      startMarker="// START AddObject"
      endMarker="// END AddObject"
      language="ts"
    />
  </TabItem>
</Tabs>

## `geoCoordinates`

Geo coordinates can be used to find objects in a radius around a query location. A geo coordinate value stored as a float, and is processed as [decimal degree](https://en.wikipedia.org/wiki/Decimal_degrees) according to the [ISO standard](https://www.iso.org/standard/39242.html#:~:text=For%20computer%20data%20interchange%20of,minutes%2C%20seconds%20and%20decimal%20seconds).

To supply a `geoCoordinates` property, specify the `latitude` and `longitude` as floating point decimal degrees.

<!-- An example of how geo coordinates are used in a data object:

```json
{
  "City": {
    "location": {
      "latitude": 52.366667,
      "longitude": 4.9
    }
  }
}
``` -->

### Examples

import GeoTypePy from '!!raw-loader!/_includes/code/python/config-refs.datatypes.geocoordinates.py';
import GeoTypeTs from '!!raw-loader!/_includes/code/typescript/config-refs.datatypes.geocoordinates.ts';

#### Property definition

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={GeoTypePy}
      startMarker="# START ConfigureDataType"
      endMarker="# END ConfigureDataType"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={UUIDTypeTs}
      startMarker="// START ConfigureDataType"
      endMarker="// END ConfigureDataType"
      language="ts"
    />
  </TabItem>
</Tabs>

#### Object insertion

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={GeoTypePy}
      startMarker="# START AddObject"
      endMarker="# END AddObject"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={GeoTypeTs}
      startMarker="// START AddObject"
      endMarker="// END AddObject"
      language="ts"
    />
  </TabItem>
</Tabs>

import GeoLimitations from '/_includes/geo-limitations.mdx';

<GeoLimitations/>

## `phoneNumber`

A `phoneNumber` input will be normalized and validated, unlike the single fields as `number` and `string`. The data field is an object with multiple fields.

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
- When you enter an international number (e.g. `"+31 20 1234567"`) to the `input` field, no `defaultCountry` needs to be entered. The underlying parser will automatically recognize the number's country.
- When you enter a national number (e.g. `"020 1234567"`), you need to specify the country in `defaultCountry` (in this case, `"nl"`), so that the parse can correctly convert the number into all formats. The string in `defaultCountry` should be an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code.

Weaviate will also add further read-only fields such as `internationalFormatted`, `countryCode`, `national`, `nationalFormatted` and `valid` when reading back a field of type `phoneNumber`.

### Examples

import PhoneTypePy from '!!raw-loader!/_includes/code/python/config-refs.datatypes.phonenumber.py';
import PhoneTypeTs from '!!raw-loader!/_includes/code/typescript/config-refs.datatypes.phonenumber.ts';

#### Property definition

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PhoneTypePy}
      startMarker="# START ConfigureDataType"
      endMarker="# END ConfigureDataType"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={PhoneTypeTs}
      startMarker="// START ConfigureDataType"
      endMarker="// END ConfigureDataType"
      language="ts"
    />
  </TabItem>
</Tabs>

#### Object insertion

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PhoneTypePy}
      startMarker="# START AddObject"
      endMarker="# END AddObject"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={PhoneTypeTs}
      startMarker="// START AddObject"
      endMarker="// END AddObject"
      language="ts"
    />
  </TabItem>
</Tabs>

## `blob`

The datatype blob accepts any binary data. The data should be `base64` encoded, and passed as a `string`. Characteristics:
* Weaviate doesn't make assumptions about the type of data that is encoded. A module (e.g. `img2vec`) can investigate file headers as it wishes, but Weaviate itself does not do this.
* When storing, the data is `base64` decoded (so Weaviate stores it more efficiently).
* When serving, the data is `base64` encoded (so it is safe to serve as `json`).
* There is no max file size limit.
* This `blob` field is always skipped in the inverted index, regardless of setting. This mean you can not search by this `blob` field in a Weaviate GraphQL `where` filter, and there is no `valueBlob` field accordingly. Depending on the module, this field can be used in module-specific filters (e.g. `nearImage`{} in the `img2vec-neural` filter).

<!-- Example:

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
``` -->

To obtain the base64-encoded value of an image, you can run the following command - or use the helper methods in the Weaviate clients - to do so:

```bash
cat my_image.png | base64
```

<!-- You can then import data with `blob` dataType to Weaviate as follows:

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
``` -->

### Examples

import BlobTypePy from '!!raw-loader!/_includes/code/python/config-refs.datatypes.blob.py';
import BlobTypeTs from '!!raw-loader!/_includes/code/typescript/config-refs.datatypes.blob.ts';

#### Property definition

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={BlobTypePy}
      startMarker="# START ConfigureDataType"
      endMarker="# END ConfigureDataType"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={BlobTypeTs}
      startMarker="// START ConfigureDataType"
      endMarker="// END ConfigureDataType"
      language="ts"
    />
  </TabItem>
</Tabs>

#### Object insertion

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={BlobTypePy}
      startMarker="# START AddObject"
      endMarker="# END AddObject"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={BlobTypeTs}
      startMarker="// START AddObject"
      endMarker="// END AddObject"
      language="ts"
    />
  </TabItem>
</Tabs>

## `object`

:::info Added in `v1.22`
:::

The `object` type allows you to store nested data as a JSON object that can be nested to any depth.

For example, a `Person` collection could have an `address` property as an object. It could in turn include nested properties such as `street` and `city`:

:::note Limitations
Currently, `object` and `object[]` datatype properties are not indexed and not vectorized.

Future plans include the ability to index nested properties, for example to allow for filtering on nested properties and vectorization options.
:::

### Examples

import ObjectTypePy from '!!raw-loader!/_includes/code/python/config-refs.datatypes.object.py';
import ObjectTypeTs from '!!raw-loader!/_includes/code/typescript/config-refs.datatypes.object.ts';

#### Property definition

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={ObjectTypePy}
      startMarker="# START ConfigureDataType"
      endMarker="# END ConfigureDataType"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={ObjectTypeTs}
      startMarker="// START ConfigureDataType"
      endMarker="// END ConfigureDataType"
      language="ts"
    />
  </TabItem>
</Tabs>

#### Object insertion

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={ObjectTypePy}
      startMarker="# START AddObject"
      endMarker="# END AddObject"
      language="py"
    />
  </TabItem>
  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={ObjectTypeTs}
      startMarker="// START AddObject"
      endMarker="// END AddObject"
      language="ts"
    />
  </TabItem>
</Tabs>

<!-- Old example - could re-use for other language examples -->
<!--
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
``` -->

## `cross-reference`

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

## More information

:::info Related pages
- [How-to: Manage collections](../manage-data/collections.mdx)
- [Concepts: Data Structure](../concepts/data.md)
- [References: REST API: Schema](/developers/weaviate/api/rest#tag/schema)
:::

### Notes

#### Formatting in payloads

In raw payloads (e.g. JSON payloads for REST), data types are specified as an array (e.g. `["text"]`, or `["text[]"]`), as it is required for some cross-reference specifications.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
