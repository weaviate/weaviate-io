---
layout: layout-documentation
solution: weaviate
sub-menu: RESTful API references
title: RESTful API references
intro: This page contains information about Weaviate's RESTful API.
description: This page contains information about Weaviate's RESTful API.
tags: ['RESTful API references']
menu-order: 0
open-graph-type: article
og-img: documentation.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/restful-api-references/index.html
    - /documentation/weaviate/current/restful-api-references/
---

# All references

All references have their individual subpages, click on one of the references below for more information.

- [/v1/schema](schema.html)
- [/v1/{semantic kind}](semantic-kind.html)
- [/v1/batching](batching.html)
- [/v1/classification](classification.html)
- [/v1/contextionary](contextionary.html)
- [/v1/meta](meta.html)
- [/v1/.well-known](well-known.html)

# Concepts and their structures

Concepts refer to Things or Actions. It can a data object that belongs to a class, which is defined in the schema.

## Class

A class describes a Thing or Action in the form of a noun (e.g., *Person*, *Product*, *Timezone*, etcetera) for Things and a verb (e.g., *Move*, *Buy*, *Eat*, etcetera) for Actions. Bear in mind that Weaviate always validates if it contextually understands the words (the word should be present in the Contextionary). If you add a thing or action that it can't recognize, it will not accept the schema.

Classes are always written with a **capital letter** first.

## Properties

Every class has properties. Properties define what kind of data values you will add to an object in Weaviate. In the schema, you define at least the name of the property and its dataType.

### Property DataTypes

When creating a property, Weaviate needs to know what type of data you will give it. Weaviate accepts the following types:

| Weaviate Type | Exact Data Type | Formatting |
| ---------|--------|-----------|
| string   | string | `string` |
| int      | int64  | `0` |
| boolean  | boolean | `true`/`false` |
| number   | float64 | `0.0` |
| date     | string | [more info](#datatype-date) |
| text     | text   | `string` |
| geoCoordinates | string | [more info](#datatype-geocoordinates) |
| phoneNumber | string | [more info](#datatype-phonenumber) |
| *cross reference* | string | [more info](#datatype-cross-reference) |

#### DataType: date

Weaviate requires an [RFC 3339](https://tools.ietf.org/html/rfc3339) formatted date that includes the time and the offset.

For example:

- `1985-04-12T23:20:50.52Z`.
- `1996-12-19T16:39:57-08:00`.
- `1937-01-01T12:00:27.87+00:20`.

#### DataType: geoCoordinates

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

##### DataType: phoneNumber

There is a special, primitive data type `phoneNumber`. When a phone number is added to this field, the input will be normalized and validated, unlike the single fields as `number` and `string`. The data field is an object, as opposed to a flat type similar to `geoCoordinates`. The object has multiple fields:

```json
{
  "phoneNumber": {
    "input": "020 1234567",                       // Required. Raw input in string format
    "defaultCountry": "nl",                       // Required if only a national number is provided, ISO 3166-1 alpha-2 country code. Only set if explicitly set by the user.
    "internationalFormatted": "+31 20 1234567",   // Read-only string
    "countryCode": 31,                            // Read-only unsigned integer, numerical country code
    "national": 201234567,                        // Read-only unsigned integer, numerical represenation of the national number
    "nationalFormatted": "020 1234567",           // Read-only string
    "valid": true                                 // Read-only boolean. Whether the parser recognized the phone number as valid
  }
}
```

There are two fields that accept input. `input` must always be set, while `defaultCountry` must only be set in specific situations. There are two scenarios possible:
- When you entered an international number (e.g. `"+31 20 1234567"`) to the `input` field, no `defaultCountry` needs to be entered. The underlying parser will automatically recognize the number's country.
- When you entered a national number (e.g. `"020 1234567"`), you need to specify the country in `defaultCountry` (in this case, `"nl"`), so that the parse can correctly convert the number into all formats. The string in `defaultCountry` should be an [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2) country code. 

As you can see in the code snippet above, all other fields are read-only. These fields are filled automatically, and will appear when reading back a field of type `phoneNumber`. 

#### DataType: cross reference

The cross-reference type is the graph element of Weaviate, you can create a link from one object to another. In the schema you can define multiple classes to which a property can point, in a list of strings. The strings in the `dataType` list of are names of classes that exist elsewhere in the schema. For example

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

# Schema object

An example of a complete schema object:

```js
{
  "class": "string",              // The name of the class in string format
  "description": "string",        // A description for your reference
  "vectorizeClassName": "boolean",// vectorize the class true or false?
  "properties": [                 // An array of the properties you are adding, same as a Property Object
    {
      "dataType": [               // The data type of the object as described above, When creating cross references, a property can have multiple dataTypes.
        "string"
      ],
      "name": "string",           // The name of the property
      "vectorizePropertyName": "boolean", // vectorize the property true or false?
      "description": "string",            // A description for your reference
      "index": true                       // Optional, default is true. By default each property is fully indexed both for full-text, as well as vector-search. You can ignore properties in searches by explicitly setting index to false.
    }
  ]
}
```

# Property object

An example of a complete property object:

```js
{
  "dataType": [ // The data type of the object as described above, When creating cross refferences, a property can have multiple dataTypes.
    "string"
  ],
  "name": "string", // The name of the property
  "vectorizePropertyName": "boolean", // vectorize the property true or false?
  "description": "string",            // A description for your reference
  "index": true                       // Optional, default is true. By default each property is fully indexed both for full-text, as well as vector-search. You can ignore properties in searches by explicitly setting index to false.
}
```

# Regulate semantic indexing

In the schema you can also define more advanced settings how data is stored and used by Weaviate. 

By default, all properties of a schema item will be both for full-text, as well as vector-search. But in some cases you want to be able to regulate specific parts of the schema to optimise indexing.

For example, a data object with the following schema:

```yaml
Article:
  title: Cows lose their jobs as milk prices drop
  content: As his 100 diary cows lumberred over for their Monday...
```

which will be vectorized as:

```md
article, title, cows, lose, their,
jobs, as, milk, prices, drop, content,
as, his, diary, cows, lumberred,
over, for, their, monday
```

There are three ways how you can regulate the indexing.

**1. Index the Class**

You can disable indexing of the class name by adding `vectorizeClassName` to the class definition.

For example: to disable the indexing of the word "Article" (which is the class name) of the data object, you can set is like this:

```js
{
  "class": "Article",
  "vectorizeClassName": false,
  // etcetera
```

which will be vectorized as:

```md
title, cows, lose, their,
jobs, as, milk, prices, drop, content,
as, his, diary, cows, lumberred,
over, for, their, monday
```

**2. Indexing the property**

You can disable indexing of the property name by adding `vectorizePropertyName` to a property definition.

For example: to disable the indexing of the word "title" (which is the property name of the data object):

```js
{
  "class": "Article",
  "properties": [{
    "name": "title",
    "vectorizePropertyName": false
    // etcetera
```

which will be vectorized as:

```md
article, cows, lose, their,
jobs, as, milk, prices, drop, content,
as, his, diary, cows, lumberred,
over, for, their, monday
```

**3. Indexing the value**

You can disable indexing of a property value by adding `index` to a property definition. Disable the indexing of a property value means:
1. There will be no 'inverted index' built for this property. It is not possible to do (GraphQL `where`) searches on this property. 
2. This property value will not influence the vector calculation of the data object.

For example: to disable the indexing of the values of "content":

```js
{
  "class": "Article",
  "properties": [{
    "name": "content"
    "index": false
    // etcetera
```

which will be vectorized as:

```md
article, title, cows, lose, their,
jobs, as, milk, prices, drop, content
```

# Concatenate classes and properties

Sometimes you might want to use multiple words to set as a class or property definition. For example, the year a person is born in, you might want to define with the two words: `born` and `in`. You can do this by capitalizing per word (CamelCase), for example, `bornIn`. Weaviate will validate both words in the Contextionary.

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
  inPublication
  publicationDate
Author
  name
  wroteArticles
  writesFor
```

# Stopwords

Note that stopwords automatically removed from camelCased and CamelCased names.

## What stopwords are and why they matter

Stopwords are words that don't add semantic meaning to your concepts and are
extremely common in texts across different contexts. For example, the sentence
"a car is parked on the street" contains the following stopwords: "a", "is",
"on", "the". If we look at the sentence "a banana is lying on
the table", you would find the exact same stop words. So in those two sentences
over 50% of the words overlap. Therefore they would be considered somewhat
similar (based on the overall vector position).

However, if we remove stopwords from both sentences, they become "car parked
street" and "banana lying table". Suddently there are 0% identical words in the
sentences, so it becomes easier to perform vector comparisons. Note at this
point we cannot say whether both sentences are related or not. For this we'd
need to know how close the vector position of the sentence "car parked street"
is to the vector position of "banana lying table". But we do know that the
result can now be calculated with a lot less noise.

## Behavior around stop words

Stopwords are useful for humans, so we don't want to encourage you to leave
them out completely. Instead weaviate will remove them whenever your schema
information is translated to vector positions.

In most cases you won't even notice that this happens in the background,
however, there are a few edge cases that might cause a validation error:

* If your camelCased class or property name consists **only** of stopwords,
  validation will fail. Example: `TheInA` is not a valid class name, however,
  `TheCarInAField` is (and would internally be represented as `CarField`).

* If your keyword list contains stop words, they will be removed. However, if
  every single keyword is a stop word, validation will fail.

## How does Weaviate decide whether a word is a stop word or not?

The list of stopwords is derived from the contextionary version used and is
published alongside the contextionary files.

Check the contextionary or a list of stopwords using
the desired language and version. For example, to see the stopwords used in the
english language contextionary version 0.5.0, check
[https://c11y.semi.technology/0.5.0/en/stopwords.json](https://c11y.semi.technology/0.5.0/en/stopwords.json).