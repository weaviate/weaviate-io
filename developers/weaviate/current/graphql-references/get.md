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
og: /img/og/og-documentation/graphql-references-get.jpg
toc: true
redirect_from:
    - /documentation/weaviate/current/graphql-references/get.html
---

# Get{} syntax and query structure

A `Get{}` function is always based on the schema. For example, if you've created a schema with a class `Articles` which has the properties `name`, `url` and `wordCount`, you can query it as follows:

{% include code/1.x/graphql.get.simple.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article+%7B%0D%0A++++++title%0D%0A++++++url%0D%0A++++++wordCount%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

The above query will result in something like the following:

```json
{
  "data": {
    "Get": {
      "Article": [{
        "title": "“Joker” Is a Viewing Experience of Rare, Numbing Emptiness",
        "url": "https://www.newyorker.com/culture/the-front-row/joker-is-a-viewing-experience-of-rare-numbing-emptiness",
        "wordCount": 1794
      }]
    }
  }
}
```

# Query beacon references

If you've set a beacon reference in the schema, you can query it as follows:

{% include code/1.x/graphql.get.beacon.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article+%7B%0D%0A++++++title%0D%0A++++++url%0D%0A++++++wordCount%0D%0A++++++inPublication+%7B+++++++++++%23+the+reference%0D%0A++++++++...+on+Publication+%7B++++%23+you+always+set+the+destination+class%0D%0A++++++++++name++++++++++++++++++%23+the+property+related+to+target+class%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}

The above query will result in something like the following:

```json
{
  "data": {
    "Get": {
      "Article": [{
        "title": "“Joker” Is a Viewing Experience of Rare, Numbing Emptiness",
        "url": "https://www.newyorker.com/culture/the-front-row/joker-is-a-viewing-experience-of-rare-numbing-emptiness",
        "wordCount": 1794,
        "inPublication": [
          {
            "name": "New Yorker"
          }
        ]
      }]
    }
  }
}
```

# Additional properties

For every Get{} request you can get additional information about the returned data object(s) by using additional properties. You can recognize these properties because they are in the object `_additional{}`. Additional properties can help you interpret query results and can for example be used for projection and visualization of the retrieved data. An overview of all additional properties and how to use them is documented [here](additional-properties.html).

# Filters

`Get{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Aggregate{}`) there is a [specific documentation page dedicated to filters](filters.html).

# More Resources

{% include docs-support-links.html %}