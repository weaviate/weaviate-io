---
layout: layout-documentation
solution: weaviate
sub-menu: Tutorials
title: How to create a schema?
intro: A schema is used to define the concepts of the data you will be adding to Weaviate. On this page you will learn how to define the concepts in the Weaviate schema.
description: How to create a schema in Weaviate?
tags: ['how to', 'create a schema']
sidebar_position: 2
open-graph-type: article
toc: true
redirect_from:
    - /documentation/weaviate/current/add-data/define_schema.html
    - /documentation/weaviate/current/tutorials/how-to-create-a-schema.html
---

# Introduction

When you start with an empty Weaviate, you need to define a schema to explain what kind of data you will add (or you can use the [auto-schema feature](../schema/schema-configuration.html#auto-schema), available from Weaviate version v1.5.0). Because Weaviate is a search graph, the linguistic element plays an important role. When creating concepts, Weaviate will validate if it can understand the schema concepts you want to add based on the vectorizer module. You might notice that a lot of definitions are related to the everyday language we use. And this is the first best practice to bear in mind. When defining the schema, you should do this in the form like you would explain it to another person, not like tables and columns you would add to a traditional data solution.
For a more elaborate example check this blog post: - [Link to schema article](https://hackernoon.com/what-is-weaviate-and-how-to-create-data-schemas-in-it-7hy3460)

#  Basics

- A schema consists of classes and properties, which define concepts.
- Words in the schema (names of classes and properties) must be part of the `text2vec-contextionary`.
- The schema can be modified through the [RESTful API](../restful-api-references/schema.html). Python, JavaScript and Go clients are available.
- A class or property in Weaviate becomes immutable, but can always be extended.
- Learn about Concepts, Classes, Properties and dataTypes in the [API reference guide](../schema/index.html).

# Prerequisites

**1. Connect to a Weaviate instance running with the text2vec-contextionary module.**\\
If you haven't set up a Weaviate instance yet, check the [Installation guide](../getting-started/installation.html). Make sure you use the the `text2vec-contextionary` as vectorization module. In this guide we assume your instance is running at `http://localhost:8080`.

# Creating your first schema (with the Python client)

Let's say you want to create a schema for a [news publications](../more-resources/example-datasets.html) dataset. This dataset consists of random news **articles** from **publications** like Financial Times, New York Times, CNN, Wired, etcetera. You also want to capture the **authors**, and some metadata about these objects like publication dates.

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

Classes always start with a capital letter. Properties always begin with a small letter. When you want to concatenate words into one class name or one property name, you can do that with camelCasing the words. Read more about schema classes, properties and data types [here](../schema/schema-configuration.html#data-objects-and-structure).

Let's define the class `Publication` with the properties `name`, `hasArticles` and `headquartersGeoLocation` in JSON format. `name` will be the name of the `Publication`, in string format. `hasArticles` will be a reference to Article objects. We need to define the class `Articles` in the same schema to make sure the reference is possible. `headquartersGeoLocation` will be of the special dataType `geoCoordinates`.

Note that the property `"title"` of the class `"Article"` has dataType `"string"`, while the property `"content"` is of dataType `"text"`. `string` values are indexed as one token, whereas `text` values are indexed after applying tokenization. `“jane.doe@foobar.com”` as string would be indexed as `“jane.doe@foobar.com”` and also only match that in a GraphQL where filter, whereas as text it would be indexed as `['jane', 'doe', 'foobar', 'com']` and also match the individual words.

```json
{
  "class": "Publication",
  "description": "A publication with an online source",
  "properties": [
    {
      "dataType": [
        "string"
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
        "string"
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
        "string"
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
            "string"
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
          "string"
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
          "string"
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
            "string"
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

{% include code/1.x/howto.schema.createpython.html %}  

# Creating your first schema (RESTful API, Python or JavaScript)

Currently, only with the Python client it is possible to upload a whole schema at once. If you are not using Python, you need to upload classes to Weaviate one by one. The schema from the previous example can be uploaded in the following steps:

**1. Create the classes without references.**

   References to other classes can only be added if those classes exist in the Weaviate schema. Therefore, we first create the classes with all properties without references, and we will add the references in the step 2.

   Add a class `Publication` without the property `hasArticles`, and add this to a running Weaviate instance as follows:

   {% include code/1.x/howto.schema.create.html %}

   Perform a similar request with the `Article` and `Author` class.

**2. Add reference properties to the existing classes.**

   There are three classes in your Weaviate schema now, but we did not link them to each other with cross references yet. Let's add the reference between `Publication` and `Articles` in the property `hasArticles` like this:

   {% include code/1.x/howto.schema.property.add.html %}

   Repeat this action with a property `wroteArticles` and `writesFor` of `Author` referring to `Articles` and `Publication` respectively.

# Next steps

- Go to the [next "How-to" guide](./how-to-import-data.html) to learn how to import data.
- Check out the [RESTful API reference](../restful-api-references/schema.html) for an overview of all schema API operations.

# More Resources

{% include docs-support-links.html %}
