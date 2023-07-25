---
title: GraphQL - Additional operators
sidebar_position: 40
image: og/docs/api.jpg
# tags: ['graphql', 'additional operators']
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.similarity.ts';
import TryEduDemo from '/_includes/try-on-edu-demo.mdx';

<TryEduDemo />


## Syntax

Additional operators such as `limit`, `autocut` and `sort` are available to modify queries at the class level.
<!--
For example:

import GraphQLFiltersExample from '/_includes/code/graphql.filters.example.mdx';

<GraphQLFiltersExample/> -->


## Limit argument

Supported by the `Get{}`, `Explore{}` and `Aggregate{}` function.

A `limit` argument limits the number of results to a specified positive integer:

import GraphQLFiltersLimit from '/_includes/code/graphql.filters.limit.mdx';

<GraphQLFiltersLimit/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Backs on the rack - Vast sums are wasted on treatments for back pain that make it worse"
        },
        {
          "title": "Graham calls for swift end to impeachment trial, warns Dems against calling witnesses"
        },
        {
          "title": "Through a cloud, brightly - Obituary: Paul Volcker died on December 8th"
        },
        {
          "title": "Google Stadia Reviewed \u2013 Against The Stream"
        },
        {
          "title": "Managing Supply Chain Risk"
        }
      ]
    }
  }
}
```

</details>

## Pagination with `offset`

Supported by the `Get{}` and `Explore{}` functions.

The `offset` operator works in conjunction with the existing `limit` operator. For example, to list the first ten results, set `limit: 10`. Then, to "display the second page of 10", set `offset: 10`, `limit:10` and so on. E.g. to show the 9th page of 10 results, set `offset: 80, limit: 10` to effectively display results 81-90.

Here's an example of `limit` + `offset`:

import GraphQLFiltersOffset from '/_includes/code/graphql.filters.offset.mdx';

<GraphQLFiltersOffset/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "Through a cloud, brightly - Obituary: Paul Volcker died on December 8th"
        },
        {
          "title": "Google Stadia Reviewed \u2013 Against The Stream"
        },
        {
          "title": "Managing Supply Chain Risk"
        },
        {
          "title": "Playing College Football In Madden"
        },
        {
          "title": "The 50 best albums of 2019, No 3: Billie Eilish \u2013 When We All Fall Asleep, Where Do We Go?"
        }
      ]
    }
  }
}
```

</details>

### Performance and resource considerations & limitations

The pagination implementation is an offset-based implementation, not a cursor-based implementation. This has the following implications:

- The cost of retrieving one further page is higher than that of the last. Effectively when searching for search results 91-100, Weaviate will internally retrieve 100 search results and discard results 0-90 before serving them to the user. This effect is amplified if running in a multi-shard setup, where each shard would retrieve 100 results, then the results aggregated and ultimately cut off. So in a 10-shard setup asking for results 91-100 Weaviate will effectively have to retrieve 1000 results (100 per shard) and discard 990 of them before serving. This means, high page numbers lead to longer response times and more load on the machine/cluster.
- Due to the increasing cost of each page outlined above, there is a limit to how many objects can be retrieved using pagination. By default setting the sum of `offset` and `limit` to higher than 10,000 objects, will lead to an error. If you must retrieve more than 10,000 objects, you can increase this limit by setting the environment variable `QUERY_MAXIMUM_RESULTS=<desired-value>`. Warning: Setting this to arbitrarily high values can make the memory consumption of a single query explode and single queries can slow down the entire cluster. We recommend setting this value to the lowest possible value that does not interfere with your users' expectations.
- The pagination setup is not stateful. If the database state has changed between retrieving two pages there is no guarantee that your pages cover all results. If no writes happened, then pagination can be used to retrieve all possible within the maximum limit. This means asking for a single page of 10,000 objects will lead to the same results overall as asking for 100 pages of 100 results.


## Autocut

Starting with Weaviate `v1.20`, the `autocut` filter can be added as an argument to class objects retrieved via the `nearXXX`, `bm25` and `hybrid` operators. `autocut: <N>`, where N is an integer > 0, limits the number of results to those up to the Nth "jump"/"drop" in the distance/score from the query. For example, if the distances for six objects returned by `nearText` were `[0.1899, 0.1901, 0.191, 0.21, 0.215, 0.23]` then `autocut: 1` would return the first three objects, `autocut: 2` would return all but the last object, and `autocut: 3` would return all objects. Autocut is disabled by default, and can be disabled explicitly by setting its value to `0` or a negative number.

If `autocut` is combined with `limit: N`, then `autocut`'s input will be limited to the first `N` objects.

<!-- TODO: Update with link to blog:
For more `autocut` examples and to learn about the motivation behind this filter, see the [v1.20 release blog post](/blog). -->

Autocut can be used as follows:

<Tabs groupId="languages">
  <TabItem value="py" label="Python">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START Autocut Python"
      endMarker="# END Autocut Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START Autocut"
      endMarker="// END Autocut"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PythonCode}
      startMarker="# START Autocut GraphQL"
      endMarker="# END Autocut GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# START Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>

For more client code examples for each operator category, see [autocut with similarity search](../../search/similarity.md#autocut), [autocut with `bm25`](../../search/bm25.md#autocut) and [autocut with `hybrid`](../../search/hybrid.md#autocut).


## Cursor with `after`

Starting with version `v1.18`, the `after` operator can be used to sequentially retrieve class objects from Weaviate. This may be useful for retrieving an entire set of objects from Weaviate, for example.

The `after` operator relies on the order of ids. It can therefore only be applied to list queries without any search operators. In other words, `after` is not compatible with `where`, `near<Media>`, `bm25`, `hybrid`, etc.

For those cases, use pagination with `offset`.

An example of the `after` operator usage:

import GraphQLFiltersAfter from '/_includes/code/graphql.filters.after.mdx';

<GraphQLFiltersAfter/>

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "id": "00313a4c-4308-30b0-af4a-01773ad1752b"
          },
          "title": "Managing Supply Chain Risk"
        },
        {
          "_additional": {
            "id": "0042b9d0-20e4-334e-8f42-f297c150e8df"
          },
          "title": "Playing College Football In Madden"
        },
        {
          "_additional": {
            "id": "0047c049-cdd6-3f6e-bb89-84ae20b74f49"
          },
          "title": "The 50 best albums of 2019, No 3: Billie Eilish \u2013 When We All Fall Asleep, Where Do We Go?"
        },
        {
          "_additional": {
            "id": "00582185-cbf4-3cd6-8c59-c2d6ec979282"
          },
          "title": "How artificial intelligence is transforming the global battle against human trafficking"
        },
        {
          "_additional": {
            "id": "0061592e-b776-33f9-8109-88a5bd41df78"
          },
          "title": "Masculine, feminist or neutral? The language battle that has split Spain"
        }
      ]
    }
  }
}
```

</details>

:::note
The `after` cursor is available on both single-shard and multi-shard set-ups.
:::


## Sorting

:::info
Support for sorting was added in `v1.13.0`.
:::

You can sort results by any primitive property, such as a `text`, `string`,
`number`, or `int`. When a query has a natural order (e.g. because of a
`near<Media>` vector search), adding a sort operator will override the order.


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

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "title": "#DesignforATL: This Instagram Fundraiser Is Raffling Off Home Goods to Help the Atlanta Spa Shooting\u2019s Victims and Families",
          "url": "https://www.vogue.com/article/designforatl-instagram-fundraiser",
          "wordCount": 366
        },
        {
          "title": "$400 for a Five Guys meal? Welcome to New Year's Eve in Dubai",
          "url": "https://edition.cnn.com/travel/article/new-year-eve-dubai-most-expensive-restaurants/index.html",
          "wordCount": 1203
        },
        ...
      ]
    }
  }
}
```

</details>

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
