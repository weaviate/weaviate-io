---
layout: layout-documentation
solution: weaviate
sub-menu: GraphQL references
title: Get{}
intro: The Get{} function is Weaviate's bread and butter. It is the most direct way to access data. Especially if combined with filters, you can easily browse your Weaviate.
description: GraphQL Get{} function
tags: ['graphql', 'get{}']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Get{} syntax and query structure

A `Get{}` function is always based on the schema. For example, if you've created a schema with a class `Articles` which has the properties `name`, `url` and `wordCount`, you can query it as follows:

{% include code/0.23.2/graphql.get.simple.html %}

The above query will result in something like the following:

```json
{
  "data": {
    "Get": {
      "Things": {
        "Article": [{
          "title": "“Joker” Is a Viewing Experience of Rare, Numbing Emptiness",
          "url": "https://www.newyorker.com/culture/the-front-row/joker-is-a-viewing-experience-of-rare-numbing-emptiness",
          "wordCount": 1794
        }]
      }
    }
  }
}
```

# Query beacon references

If you've set a beacon reference in the schema, you can query it as follows:

{% include code/0.23.2/graphql.get.beacon.html %}

The above query will result in something like the following:

```json
{
  "data": {
    "Get": {
      "Things": {
        "Article": [{
          "title": "“Joker” Is a Viewing Experience of Rare, Numbing Emptiness",
          "url": "https://www.newyorker.com/culture/the-front-row/joker-is-a-viewing-experience-of-rare-numbing-emptiness",
          "wordCount": 1794,
          "InPublication": [
            {
              "name": "New Yorker"
            }
          ]
        }]
      }
    }
  }
}
```

# Underscore properties

For every Get{} request you can get additional information about the returned data object(s) by using underscore-properties. You can recognize these properties because they are prefixed with an underscore. Underscore properties prefixed with an underscore can be added to any GraphQL Get{} request. Underscore properties can helps you interpret query results and can for example be used for projection and visualization of the retrieved data. An overview of all underscore properties and how to use them is documented [here](underscore-properties.html).

# Filters

`Get{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Aggregate{}`) there is a [specific documentation page dedicated to filters](filters.html).

# More Resources

{% include docs-support-links.html %}