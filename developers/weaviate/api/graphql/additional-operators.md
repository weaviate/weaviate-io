---
title: GraphQL - Additional operators
sidebar_position: 5
image: og/docs/api.jpg
# tags: ['graphql', 'additional operators']
---

import Badges from '/_includes/badges.mdx';

<Badges/>

## Syntax

Additional operators such as `limit`, `after` and `sort` are available to modify queries at the class level.
<!--
For example:

import GraphQLFiltersExample from '/_includes/code/graphql.filters.example.mdx';

<GraphQLFiltersExample/> -->


## Limit argument

Supported by the `Get{}`, `Explore{}` and `Aggregate{}` function.

A `limit` argument limits the number of results.

An example of a stand-alone `limit` filter:

import GraphQLFiltersLimit from '/_includes/code/graphql.filters.limit.mdx';

<GraphQLFiltersLimit/>

<MoleculeGQLDemo query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28limit%3A5%29+%7B%0D%0A++++++title%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D'/>

#### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "The War Vet, the Dating Site, and the Phone Call From Hell"
        },
        {
          "title": "Opinion | John Lennon Told Them ‘Girls Don't Play Guitar.' He Was So Wrong."
        },
        {
          "title": "The press pressed - Brazilian prosecutors go after Glenn Greenwald, an American journalist"
        },
        {
          "title": "Not to Ruin the Super Bowl, but the Sea Is Consuming Miami"
        },
        {
          "title": "Coca-Cola Resurrects Post of Chief Marketing Officer"
        }
      ]
    }
  },
  "errors": null
}
```

## Pagination with `offset`

Supported by the `Get{}`, `Explore{}` and `Aggregate{}` function.

The offset parameter works in conjunction with the existing limit parameter. For example, to list the first ten results, set `limit: 10`. Then, to "display the second page of 10", set `offset: 10`, `limit:10` and so on. E.g. to show the 9th page of 10 results, set `offset:80, limit:10` to effectively display results 81-90.

An example of a stand-alone `limit` filter:

import GraphQLFiltersOffset from '/_includes/code/graphql.filters.offset.mdx';

<GraphQLFiltersOffset/>

<MoleculeGQLDemo query='%7B%0A%20%20Get%20%7B%0A%20%20%20%20Article(%0A%20%20%20%20%20%20limit%3A%205%2C%0A%20%20%20%20%20%20offset%3A%202%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D'/>

#### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Hong Kong tries its best to spoil China's big anniversary"
        },
        {
          "title": "‘People don't want any of them': Peru election sees unpredictable contest"
        },
        {
          "title": "Brazil: homes of Bolsonaro associates raided in sweeping anti-corruption operation"
        },
        {
          "title": "If Convicting Trump Is Out of Reach, Managers Seek a Verdict From the Public and History"
        },
        {
          "title": "Watch The Juliana Plaintiffs Vic Barrett, Kelsey Juliana, and Levi Draheim in Conversation with Sandra Upson | Wired Video | CNE | Wired.com"
        }
      ]
    }
  }
}
```

### Performance and resource considerations & limitations

The pagination implementation is an offset-based implementation, not a cursor-based implementation. This has the following implications:

- The cost of retrieving one further page is higher than that of the last. Effectively when searching for search results 91-100, Weaviate will internally retrieve 100 search results and discard results 0-90 before serving them to the user. This effect is amplified if running in a multi-shard setup, where each shard would retrieve 100 results, then the results aggregated and ultimately cut off. So in a 10-shard setup asking for results 91-100 Weaviate will effectively have to retrieve 1000 results (100 per shard) and discard 990 of them before serving. This means, high page numbers lead to longer response times and more load on the machine/cluster.
- Due to the increasing cost of each page outlined above, there is a limit to how many objects can be retrieved using pagination. By default setting the sum of `offset` and `limit` to higher than 10,000 objects, will lead to an error. If you must retrieve more than 10,000 objects, you can increase this limit by setting the environment variable `QUERY_MAXIMUM_RESULTS=<desired-value>`. Warning: Setting this to arbitrarily high values can make the memory consumption of a single query explode and single queries can slow down the entire cluster. We recommend setting this value to the lowest possible value that does not interfere with your users' expectations.
- The pagination setup is not stateful. If the database state has changed between retrieving two pages there is no guarantee that your pages cover all results. If no writes happened, then pagination can be used to retrieve all possible within the maximum limit. This means asking for a single page of 10,000 objects will lead to the same results overall as asking for 100 pages of 100 results.

## Cursor with `after`

Starting with version `1.18`, the `after` parameter can be used to sequentially retrieve class objects from Weaviate. This may be useful for retrieving an entire set of objects from Weaviate, for example.

The `after` parameter relies on the order of ids. It can therefore only be applied to list queries without any search operators. In other words, `after` is not compatible with `where`, `near<Media>`, `bm25`, `hybrid`, etc.

For those cases, use pagination with `offset`.

An example of the `after` parameter usage:

import GraphQLFiltersAfter from '/_includes/code/graphql.filters.after.mdx';

<GraphQLFiltersAfter/>

:::note
The `after` cursor is available on both single-shard and multi-shard set-ups.
:::

## Sorting

:::info
Support for sorting was added in `v1.13.0`.
:::

You can sort results by any primitive property, typically a `text`, `string`, `number`, or `int` property. When a query has a natural order (e.g. because of a `near<Media>` vector search), adding a sort operator will override the order.

### Cost of sorting / architecture

Weaviate's sorting implementation is built in a way that it does not lead to massive memory spikes; it does not need to load all objects to be sorted into memory completely. Only the property value being sorted is kept in memory.

As of now, Weaviate does not have any data structures on disk specific to sorting, such as a column-oriented storage mechanism. As a result when an object should be sorted, the whole object is identified on disk and the relevant property extracted. This works reasonably well for small scales (100s of thousand or millions), but comes with a high cost at large lists of objects to be sorted (100s of millions, billions).  A column-oriented storage mechanism may be introduced in the future to  overcome this performance limitation.

### Sorting decisions

#### booleans order
`false` is considered smaller than `true`. `false` comes before `true` in ascending order and after `true` in descending order.

#### nulls order
`null` values are considered smaller than any non-`null` values. `null` values come first in ascending order and last in descending order.

#### arrays order
Arrays are compared by each element separately. Elements at the same position are compared to each other, starting from the beginning of an array. First element smaller than its counterpart makes whole array smaller.

Arrays are equal if they have the same size and all elements are equal. If array is subset of other array it is considered smaller.

Examples:
- `[1, 2, 3] = [1, 2, 3]`
- `[1, 2, 4] < [1, 3, 4]`
- `[2, 2] > [1, 2, 3, 4]`
- `[1, 2, 3] < [1, 2, 3, 4]`

### Sorting API

import GraphQLGetSorting from '/_includes/code/graphql.get.sorting.mdx';

### Additional properties

Sometimes sorting by an additional property is required, such as `id`, `creationTimeUnix`, or `lastUpdateTimeUnix`.  This can be achieved by prefixing the property name with an underscore.

For example:
```graphql
{
  Get {
    Article(sort: [{path: ["_creationTimeUnix"], order: asc}]) {
      title
    }
  }
}
```

<GraphQLGetSorting/>

<MoleculeGQLDemo query='%7B%0A++Get+%7B%0A++++Article%28sort%3A+%5B%7B%0A++++++path%3A+%5B%22title%22%5D%0A++++++order%3A+asc%0A++++%7D%5D%29+%7B%0A++++++title%0A++++++url%0A++++++wordCount%0A++++%7D%0A++%7D%0A%7D'/>

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
