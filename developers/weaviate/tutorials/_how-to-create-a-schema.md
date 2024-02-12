---
title: How to define a schema
sidebar_position: 2
image: og/docs/tutorials.jpg
# tags: ['how to', 'schema']
---


## Overview

This tutorial is designed to show you an example of how to create a schema in Weaviate.

By the end of this tutorial, you should have a good idea of how to create a schema. You will begin to see why it is important, and where to find the relevant information required for schema definition.

### Key points

- A schema consists of classes and properties, which define concepts.
- Words in the schema (names of classes and properties) must be part of the `text2vec-contextionary`.
- The schema can be modified through the [RESTful API](../api/rest/schema.md). Python, JavaScript and Go clients are available.
- A class or property in Weaviate becomes immutable, but can always be extended.
- Learn about Concepts, Classes, Properties and dataTypes in the [API reference guide](/developers/weaviate/api/index.md).

## Prerequisites

We recommend reading the [Quickstart tutorial](../quickstart/index.md) first before tackling this tutorial.

For the tutorial, you will need a Weaviate instance running with the `text2vec-contextionary` module. We assume your instance is running at `http://localhost:8080`.

## What is a schema?

import SchemaDef from '/_includes/definition-schema.md';

<SchemaDef/>

If you begin to import data without having defined a schema, it will trigger the [auto-schema feature](/developers/weaviate/config-refs/schema/index.md#auto-schema) and Weaviate will create a schema for you.

While this may be suitable in some circumstances, in many cases you may wish to explicitly define a schema. Manually defining the schema will help you ensure that the schema is suited for your specific data and needs.

## Creating your first schema (with the Python client)

Let's say you want to create a schema for a [news publications](../more-resources/example-datasets.md) dataset. This dataset consists of random news **articles** from **publications** like Financial Times, New York Times, CNN, Wired, etcetera. You also want to capture the **authors**, and some metadata about these objects like publication dates.

Follow these steps to create and upload the schema.

**1. Start with an empty schema in JSON format.**

Schemas are defined in JSON format. An empty schema to start with:

```json
{
  "classes": []
}
```

**2. Define classes and properties.**

Let's say there are three classes you want to capture from this dataset in Weaviate: `Publication`, `Article` and `Author`. Notice that these words are *singular* (which is best practice, each data object is *one* of these classes).

Classes always start with a capital letter. Properties always begin with a small letter. When you want to concatenate words into one class name or one property name, you can do that with camelCasing the words. Read more about schema classes, properties and data types [here](/developers/weaviate/config-refs/schema/index.md).

Let's define the class `Publication` with the properties `name`, `hasArticles` and `headquartersGeoLocation` in JSON format. `name` will be the name of the `Publication`, in string format. `hasArticles` will be a reference to Article objects. We need to define the class `Articles` in the same schema to make sure the reference is possible. `headquartersGeoLocation` will be of the special dataType `geoCoordinates`.

Note that the property `"title"` of the class `"Article"` has dataType `"string"`, while the property `"content"` is of dataType `"text"`. `string` values and `text` values are tokenized differently to each other.

```json
{
  "class": "Publication",
  "description": "A publication with an online source",
  "properties": [
    {
      "dataType": [
        "text"
      ],
      "description": "Name of the publication",
      "name": "name"
    },
    {
      "dataType": [
        "Article"
      ],
      "description": "The articles this publication has",
      "name": "hasArticles"
    },
    {
      "dataType": [
          "geoCoordinates"
      ],
      "description": "Geo location of the HQ",
      "name": "headquartersGeoLocation"
    }
  ]
}
```

Add the classes `Article` and `Author` to the same schema, so you will end up with the following classes:

```json
[{
  "class": "Publication",
  "description": "A publication with an online source",
  "properties": [
    {
      "dataType": [
        "text"
      ],
      "description": "Name of the publication",
      "name": "name"
    },
    {
      "dataType": [
        "Article"
      ],
      "description": "The articles this publication has",
      "name": "hasArticles"
    },
    {
      "dataType": [
          "geoCoordinates"
      ],
      "description": "Geo location of the HQ",
      "name": "headquartersGeoLocation"
    }
  ]
}, {
  "class": "Article",
  "description": "A written text, for example a news article or blog post",
  "properties": [
    {
      "dataType": [
        "text"
      ],
      "description": "Title of the article",
      "name": "title"
    },
    {
      "dataType": [
        "text"
      ],
      "description": "The content of the article",
      "name": "content"
    }
  ]
}, {
  "class": "Author",
  "description": "The writer of an article",
  "properties": [
      {
        "dataType": [
            "text"
        ],
        "description": "Name of the author",
        "name": "name"
      },
      {
        "dataType": [
            "Article"
        ],
        "description": "Articles this author wrote",
        "name": "wroteArticles"
      },
      {
        "dataType": [
            "Publication"
        ],
        "description": "The publication this author writes for",
        "name": "writesFor"
      }
  ]
}]
```

Now, add this list of classes to the schema, which will look like this:

```json
{
  "classes": [{
    "class": "Publication",
    "description": "A publication with an online source",
    "properties": [
      {
        "dataType": [
          "text"
        ],
        "description": "Name of the publication",
        "name": "name"
      },
      {
        "dataType": [
          "Article"
        ],
        "description": "The articles this publication has",
        "name": "hasArticles"
      },
      {
        "dataType": [
            "geoCoordinates"
        ],
        "description": "Geo location of the HQ",
        "name": "headquartersGeoLocation"
      }
    ]
  }, {
    "class": "Article",
    "description": "A written text, for example a news article or blog post",
    "properties": [
      {
        "dataType": [
          "text"
        ],
        "description": "Title of the article",
        "name": "title"
      },
      {
        "dataType": [
          "text"
        ],
        "description": "The content of the article",
        "name": "content"
      }
    ]
  }, {
    "class": "Author",
    "description": "The writer of an article",
    "properties": [
      {
        "dataType": [
            "text"
        ],
        "description": "Name of the author",
        "name": "name"
      },
      {
        "dataType": [
            "Article"
        ],
        "description": "Articles this author wrote",
        "name": "wroteArticles"
      },
      {
        "dataType": [
            "Publication"
        ],
        "description": "The publication this author writes for",
        "name": "writesFor"
      }
    ]
  }]
}
```

**3. Upload the schema to Weaviate with the Python client.**

import HowtoSchemaCreatePython from '/_includes/code/howto.schema.create.python/index.mdx';

<HowtoSchemaCreatePython/>

## Creating your first schema (RESTful API, Python or JavaScript)

Currently, only with the Python client it is possible to upload a whole schema at once. If you are not using Python, you need to upload classes to Weaviate one by one. The schema from the previous example can be uploaded in the following steps:

**1. Create the classes without references.**

   References to other classes can only be added if those classes exist in the Weaviate schema. Therefore, we first create the classes with all properties without references, and we will add the references in the step 2.

   Add a class `Publication` without the property `hasArticles`, and add this to a running Weaviate instance as follows:

import HowtoSchemaCreate from '/_includes/code/howto.schema.create.mdx';

<HowtoSchemaCreate/>

   Perform a similar request with the `Article` and `Author` class.

**2. Add reference properties to the existing classes.**

   There are three classes in your Weaviate schema now, but we did not link them to each other with cross-references yet. Let's add the reference between `Publication` and `Articles` in the property `hasArticles` like this:

import HowtoSchemaPropertyAdd from '/_includes/code/howto.schema.property.add.mdx';

<HowtoSchemaPropertyAdd/>

   Repeat this action with a property `wroteArticles` and `writesFor` of `Author` referring to `Articles` and `Publication` respectively.

## Next steps

<!-- - Go to the [next "How-to" guide]  (./how-to-import-data.md) to learn how to import data. -->
- Check out the [RESTful API reference](../api/rest/schema.md) for an overview of all schema API operations.
- Read this article on [Weaviate and schema creation](https://hackernoon.com/what-is-weaviate-and-how-to-create-data-schemas-in-it-7hy3460)


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
