---
title: How to import data
sidebar_position: 3
image: og/docs/tutorials.jpg
# tags: ['how to', 'import']
---


## Overview

In this tutorial, you will learn how to import data into Weaviate using the batch import method.

By the end of this tutorial, you should have a good idea of the steps involved in importing data, and when to use the batch import method.

<!-- :::caution Under construction.
Migrated from "How to import data" tutorial from Weaviate Docs Classic
::: -->


# Introduction

Data is added through the RESTful API. The syntax of a data object is as follows:

```json
{
  "class": "<class name>",  // as defined during schema creation
  "id": "<UUID>",     // optional, must be in UUID format.
  "properties": {
    "<property name>": "<property value>", // specified in dataType defined during schema creation
  }
}
```

# Prerequisites

We recommend reading the [Quickstart tutorial](../quickstart/index.md) first before tackling this tutorial.

1. **Connect to a Weaviate instance.**
For the tutorial, you will need a Weaviate instance running with the `text2vec-contextionary` module. We assume your instance is running at `http://localhost:8080`.
2. **Upload a schema**.
Learn how to create and upload a schema [here](./how-to-create-a-schema.md). In this guide we assume you have a similar schema uploaded with the classes `Publication`, `Article` and `Author`.

# Add a data object

Let's add a `Publication` with the name `New York Times` to your Weaviate instance. Not all properties have to be filled when adding a data object, so we will skip the `hasArticles` property for now, since we don't have any `Article` objects yet. Note that the `UUID` is given in the `id` parameter now, this is optional.

import CodeAddData from '/_includes/code/howto.add.data.things.mdx';

<CodeAddData />

# Add a data object with reference

If you want to add data object with a reference in a property, you need to use the `UUID` of the reference data object. Let's add the `Author` named `Jodi Kantor`, who writes for the `New York Times`:

import CodeAddRef from '/_includes/code/howto.add.data.things.reference.mdx';

<CodeAddRef />

You can also add references later, when the data object is already created. The following example first creates the `Author` with `name`, and later adds the reference to a `Publication`. This comes in handy when you need to create data objects first before you can add references.

import CodeAddRefLater from '/_includes/code/howto.add.data.things.add.reference.mdx';

<CodeAddRefLater />

# Next steps

<!-- TODO: point it towards search or the relevant content -->
<!-- - Take a look at [How to query data](./how-to-query-data) to learn how to interact with the data you just added. -->

- See the RESTful [API reference pages](/developers/weaviate/api/rest) for all API operations to add, modify and delete data.


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
