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

# Vector Search Operators

To combine `Get { }` with a vector search argument, here is an overview of the supported arguments and links to their detailed documentation:

| Argument | Description | Required Modules (at least one of) | Learn More |
| --- | --- | --- | --- |
| `nearObject` | Find the nearest neighbors of an object referenced by its id | *none - works out of the box* | [Learn more](../graphql-references/filters.html#nearobject-vector-search-argument) |
| `nearVector` | Find the nearest neighbors to any vector | *none - works out of the box* | [Learn more](../graphql-references/filters.html#nearvector-vector-search-argument) |
| `nearText` | Vectorize a text query and perform a vector search based on it | `text2vec-transformers`, `text2vec-contextionary`, `text2vec-openai`, `multi2vec-clip` | [Transformers](../retriever-vectorizer-modules/text2vec-transformers.html#neartext), [Contextionary](../retriever-vectorizer-modules/text2vec-contextionary.html#neartext), [OpenAI](../retriever-vectorizer-modules/text2vec-openai.html#neartext), [CLIP](../retriever-vectorizer-modules/multi2vec-clip.html#neartext) |
| `nearImage` | Vectorize an image and perform a vector search based on it | `multi2vec-clip`, `img2vec-neural` | [CLIP](../retriever-vectorizer-modules/multi2vec-clip.html#neartext), [Img2Vec](../retriever-vectorizer-modules/img2vec-neural.html#nearimage-search) |

# Filters

`Get{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Aggregate{}`) there is a [specific documentation page dedicated to filters](filters.html).

# Sorting

*Note: Support for sorting was added in `v1.13.0`.*

You can sort results by any primitive property, typically a `text`, `string`,
`number`, or `int` property. When aquery has a natural order (e.g. because of a
`near<Media>` vector search), adding a sort operator will override the order.

## Cost of Sorting / Architecture

Weaviate's sorting implementation is built in a way that id does not lead to
massive memory spikes, e.g. it does not need to load all objects to be sorted
into memory completely. Only the property value being sorted is kept in memory.

When this feature was introduced (`v1.13.0`), Weaviate does have any
datastructures on disk specific to sorting, such as a column-oriented storage
mechanism. As a result when an object should be sorted, the whole object is
identified on disk and the relevant property extracted. This works reasonably
well for small scales (10s or 100s of thousand objects), but comes with a high
cost at large lists of objects to be sorted (millions+). A column-oriented
storage mechanism may be introduced in the future to overcome this performance
limitation.

## Sorting API

{% include code/1.x/graphql.get.sorting.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0A++Get+%7B%0A++++Article%28sort%3A+%5B%7B%0A++++++path%3A+%5B%22title%22%5D%0A++++++order%3A+asc%0A++++%7D%5D%29+%7B%0A++++++title%0A++++++url%0A++++++wordCount%0A++++%7D%0A++%7D%0A%7D' %}

# More Resources

{% include docs-support-links.html %}
