---
title: (TBC) Data import
sidebar_position: 3
# layout: layout-documentation
# solution: weaviate
# sub-menu: Tutorials
# title: How to import data?
# intro: How to import data in Weaviate?
# description: How to import data in Weaviate?
# tags: ['how to', 'import data']
# sidebar_position: 3
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/current/add-data/add_and_modify.html
#     - /documentation/weaviate/current/tutorials/how-to-import-data.html
---

## Overview

Learn how to import data into Weaviate

<!-- TODO: Finish this page! -->
:::caution
This page is under construction.
Migrated from "How to import data" tutorial from Weaviate Docs Classic
:::


# Introduction 

Data is added through the RESTful API. Python and JavaScript clients are available. The syntax of a data object is as follows:

```json
{
  "class": "<class name>",  // as defined during schema creation
  "id": "<UUID>",     // optional, should be in UUID format.
  "properties": {
    "<property name>": "<property value>", // specified in dataType defined during schema creation
  }
}
```

# Prerequisites

 1. **Connect to a Weaviate instance.**\\
 If you haven't set up a Weaviate instance yet, check the [quickstart tutorial](/docs/weaviate/getting-started/installation.md). In this guide we assume your instance is running at `http://localhost:8080` with the `text2vec-contextionary` as vectorization module.
 2. **Upload a schema**. \\
 Learn how to create and upload a schema [here](./how-to-create-a-schema.md). In this guide we assume to have a similar schema uploaded with the classes `Publication`, `Article` and `Author`.

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

- See the RESTful [API reference pages](/docs/weaviate/references/rest/index.md) for all API operations to add, modify and delete data.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />