---
title: GraphQL - Get{}
sidebar_position: 1
# layout: layout-documentation
# solution: weaviate
# sub-menu: GraphQL references
# title: Get{}
# intro: The Get{} function is Weaviate's bread and butter. It is the most direct way to access data. Especially if combined with filters, you can easily browse your Weaviate.
# description: GraphQL Get{} function
# tags: ['graphql', 'get{}']
# sidebar_position: 1
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/current/graphql-references/get.html
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Get{} syntax and query structure

A `Get{}` function is always based on the schema. For example, if you've created a schema with a class `Articles` which has the properties `title`, `url` and `wordCount`, you can query it as follows:

import GraphQLGetSimple from '/_includes/code/graphql.get.simple.mdx';

<GraphQLGetSimple/>

import MoleculeGQLDemo from '/_includes/molecule-gql-demo.mdx';

<MoleculeGQLDemo query='%7B%0D%0A++Get+%7B%0D%0A++++Article+%7B%0D%0A++++++title%0D%0A++++++url%0D%0A++++++wordCount%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article+%7B%0D%0A++++++title%0D%0A++++++url%0D%0A++++++wordCount%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %} -->

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

## Query beacon references

If you've set a beacon reference in the schema, you can query it as follows:

import GraphQLGetBeacon from '/_includes/code/graphql.get.beacon.mdx';

<GraphQLGetBeacon/>

<MoleculeGQLDemo query='%7B%0D%0A++Get+%7B%0D%0A++++Article+%7B%0D%0A++++++title%0D%0A++++++url%0D%0A++++++wordCount%0D%0A++++++inPublication+%7B+++++++++++%23+the+reference%0D%0A++++++++...+on+Publication+%7B++++%23+you+always+set+the+destination+class%0D%0A++++++++++name++++++++++++++++++%23+the+property+related+to+target+class%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

<!-- {% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article+%7B%0D%0A++++++title%0D%0A++++++url%0D%0A++++++wordCount%0D%0A++++++inPublication+%7B+++++++++++%23+the+reference%0D%0A++++++++...+on+Publication+%7B++++%23+you+always+set+the+destination+class%0D%0A++++++++++name++++++++++++++++++%23+the+property+related+to+target+class%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %} -->

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

## Additional properties

For every Get{} request you can get additional information about the returned data object(s) by using additional properties. You can recognize these properties because they are in the object `_additional{}`. Additional properties can help you interpret query results and can for example be used for projection and visualization of the retrieved data. An overview of all additional properties and how to use them is documented [here](./additional-properties.md).

## Vector Search Operators

To combine `Get { }` with a vector search argument, here is an overview of the supported arguments and links to their detailed documentation:

| Argument | Description | Required Modules (at least one of) | Learn More |
| --- | --- | --- | --- |
| `nearObject` | Find the nearest neighbors of an object referenced by its id | *none - works out of the box* | [Learn more](./vector-search-parameters.md#nearobject) |
| `nearVector` | Find the nearest neighbors to any vector | *none - works out of the box* | [Learn more](./vector-search-parameters.md#nearvector) |
| `nearText` | Vectorize a text query and perform a vector search based on it | `text2vec-transformers`, `text2vec-contextionary`, `text2vec-openai`, `multi2vec-clip`, `text2vec-huggingface`, `text2vec-cohere` | [Transformers](/docs/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers.md#how-to-use), [Contextionary](/docs/weaviate/modules/retriever-vectorizer-modules/text2vec-contextionary.md#how-to-use), [OpenAI](/docs/weaviate/modules/retriever-vectorizer-modules/text2vec-openai.md#how-to-use), [CLIP](/docs/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip.md#how-to-use), [Huggingface](/docs/weaviate/modules/retriever-vectorizer-modules/text2vec-huggingface.md#how-to-use), [Cohere](/docs/weaviate/modules/retriever-vectorizer-modules/text2vec-cohere.md#how-to-use) |
| `nearImage` | Vectorize an image and perform a vector search based on it | `multi2vec-clip`, `img2vec-neural` | [CLIP](/docs/weaviate/modules/retriever-vectorizer-modules/multi2vec-clip.md#neartext), [Img2Vec](/docs/weaviate/modules/retriever-vectorizer-modules/img2vec-neural.md#nearimage-search) |
| `hybrid` | Combine dense and sparse vectors to deliver best of both search methods |   *none - works out of the box* | [Learn more](../graphql/vector-search-parameters.html#hybrid) |
| `bm25`   | Keyword search with BM25F ranking  | *none - works out of the box* | [Learn more](../graphql/vector-search-parameters.html#bm25) |

## Filters

`Get{}` functions can be extended with search filters (both semantic filters as traditional filters). Because the filters work on multiple core functions (like `Aggregate{}`) there is a [specific documentation page dedicated to filters](filters.md).

### Sorting

*Note: Support for sorting was added in `v1.13.0`.*

You can sort results by any primitive property, typically a `text`, `string`,
`number`, or `int` property. When a query has a natural order (e.g. because of a
`near<Media>` vector search), adding a sort operator will override the order.

See [filters – sorting](./filters.md#sorting) for more information.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
