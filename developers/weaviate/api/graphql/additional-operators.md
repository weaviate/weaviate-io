---
title: Additional operators
sidebar_position: 40
image: og/docs/api.jpg
# tags: ['graphql', 'additional operators']
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import TryEduDemo from '/_includes/try-on-edu-demo.mdx';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import AutocutPyCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import AutocutPyCodeV3 from '!!raw-loader!/_includes/code/howto/search.similarity-v3.py';
import AutocutTSCode from '!!raw-loader!/_includes/code/howto/search.similarity.ts';
import PyCode from '!!raw-loader!/_includes/code/graphql.additional.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/graphql.additional-v3.py';
import TSCode from '!!raw-loader!/_includes/code/graphql.additional.ts';
import GoCode from '!!raw-loader!/_includes/code/graphql.additional.go';
import JavaCode from '!!raw-loader!/_includes/code/graphql.additional.java';
import CurlCode from '!!raw-loader!/_includes/code/graphql.additional.sh';

<TryEduDemo />


## Syntax

Functions such as `limit`, `autocut`, and `sort` modify queries at the class level.
<!--
For example:

import GraphQLFiltersExample from '/_includes/code/graphql.filters.example.mdx';

<GraphQLFiltersExample/> -->


## Limit argument

The `limit` argument restricts the number of results. These functions support `limit`:

- `Get`
- `Explore`
- `Aggregate`

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

To return sets of results, "pages", use `offset` and `limit` together to specify a sub-set of the query response.

For example, to list the first ten results, set `limit: 10` and `offset: 0`. To display the next ten results, set `offset: 10`. To continue iterating over the results, increase the offset again. For more details, see [performance considerations](./additional-operators.md#performance-considerations)

The `Get` and `Explore` functions support `offset`.

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

### Performance considerations

Pagination is not a cursor-based implementation. This has the following implications:

- **Response time and system load increase as the number of pages grows**. As the offset grows, each additional page request requires a new, larger call against your collection. For example, if your `offset` and `limit` specify results from 21-30, Weaviate retrieves 30 objects and drops the first 20. On the next call, Weaviate retrieves 40 objects and drops the first 30.
- **Resource requirements are amplified in multi-shard configurations.** Each shard retrieves a full list of objects. Each shard also drops the objects before the offset. If you have 10 shards configured and ask for results 91-100, Weaviate retrieves 1000 objects (100 per shard) and drops 990 of them.
- **The number of objects you can retrieve is limited**. A single query returns up to `QUERY_MAXIMUM_RESULTS`. If the sum of `offset` and `limit` exceeds `QUERY_MAXIMUM_RESULTS`, Weaviate returns an error. To change the limit, edit the `QUERY_MAXIMUM_RESULTS` environment variable. If you increase `QUERY_MAXIMUM_RESULTS`, use the lowest value possible to avoid performance problems.
 - **Pagination is not stateful**. If the database state changes between calls, your pages might miss results. An insertion or a deletion will change the object count. An update could change object order. However, if there are no writes the overall results set is the same if you retrieve a large single page or many smaller ones.


## Autocut

:::info Added in `v1.20`
:::

The autocut function limits results based on discontinuities in the result set. Specifically, autocut looks for discontinuities, or jumps, in result metrics such as vector distance or search score.

To use autocut, specify how many jumps there should be in your query. The query stops returning results after the specified number of jumps.

For example, consider a `nearText` search that returns objects with these distance values:

 `[0.1899, 0.1901, 0.191, 0.21, 0.215, 0.23]`.

Autocut returns the following:

- `autocut: 1`: `[0.1899, 0.1901, 0.191]`
- `autocut: 2`:  `[0.1899, 0.1901, 0.191, 0.21, 0.215]`
- `autocut: 3`:  `[0.1899, 0.1901, 0.191, 0.21, 0.215, 0.23]`

Autocut works with these functions:

- `nearXXX`
- `bm25`
- `hybrid`

To use autocut with the `hybrid` search, specify the `relativeScoreFusion` ranking method.

Autocut is disabled by default. To explicitly disable autocut, set the number of jumps to `0` or a negative value.

If autocut is combined with the limit filter, autocut only considers the first objects returned up to the value of `limit`.

<!-- TODO: Update with link to blog:
For more `autocut` examples and to learn about the motivation behind this filter, see the [v1.20 release blog post](/blog). -->

Sample client code:

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={AutocutPyCode}
      startMarker="# START Autocut Python"
      endMarker="# END Autocut Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={AutocutPyCodeV3}
      startMarker="# START Autocut Python"
      endMarker="# END Autocut Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={AutocutTSCode}
      startMarker="// START Autocut"
      endMarker="// END Autocut"
      language="ts"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={AutocutPyCodeV3}
      startMarker="# START Autocut GraphQL"
      endMarker="# END Autocut GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={AutocutPyCodeV3}
  startMarker="# START AutoCutResults"
  endMarker="# END AutoCutResults"
  language="json"
/>

</details>

For more client code examples for each functional category, see these pages:

- [Autocut with similarity search](../../search/similarity.md#autocut).
- [Autocut with `bm25` search](../../search/bm25.md#autocut).
- [Autocut with `hybrid` search](../../search/hybrid.md#autocut).


## Cursor with `after`

Starting with version `v1.18`, you can use `after` to retrieve objects sequentially. For example, you can use `after` to retrieve a complete set of objects from a collection.

`after` creates a cursor that is compatible with single shard and multi-shard configurations.

The `after` function relies on object ids, and thus it only works with list queries. `after` is not compatible with `where`, `near<Media>`, `bm25`, `hybrid`, or similar searches, or in combination with filters. For those use cases, use pagination with `offset` and `limit`.

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

## Sorting

:::info
Added in `v1.13.0`.
:::

You can sort results by any primitive property, such as `text`, `number`, or `int`. When query results, for example, `near<Media>` vector search results, have a natural order, sort functions override that order.

### Sorting considerations

Weaviate's sorting implementation does not lead to massive memory spikes. Weaviate does not load all object properties into memory; only the property values being sorted are kept in memory.

Weaviate does not use any sorting-specific data structures on disk. When objects are sorted, Weaviate identifies the object and extracts the relevant properties. This works reasonably well for small scales (100s of thousand or millions of objects). It is expensive if you sort large lists of objects (100s of millions, billions). In the future, Weaviate may add a column-oriented storage mechanism to overcome this performance limitation.

### Sort order

#### boolean values
`false` is considered smaller than `true`. `false` comes before `true` in ascending order and after `true` in descending order.

#### null values
`null` values are considered smaller than any non-`null` values. `null` values come first in ascending order and last in descending order.

#### arrays
Arrays are compared by each element separately. Elements at the same position are compared to each other, starting from the beginning of an array. When Weaviate finds an array element in one array that is smaller than its counterpart in the second array, Weaviate considers the whole first array to be smaller than the second one.

Arrays are equal if they have the same length and all elements are equal. If one array is subset of another array it is considered smaller.

Examples:
- `[1, 2, 3] = [1, 2, 3]`
- `[1, 2, 4] < [1, 3, 4]`
- `[2, 2] > [1, 2, 3, 4]`
- `[1, 2, 3] < [1, 2, 3, 4]`

### Sorting API

Sorting can be performed by one or more properties. If the values for the first property are identical, Weaviate uses the second property to determine the order, and so on.

The sort function takes either an object, or an array of objects, that describe a property and a sort order.

| Parameter | Required | Type            | Description                                               |
|-----------|----------|-----------------|-----------------------------------------------------------|
| `path`    | yes      | `text`        | The path to the sort field is an single element array that contains the field name. GraphQL supports specifying the field name directly. |
| `order`   | varies by client       | `asc` or `desc` | The sort order, ascending (default) or descending.|


<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START Sorting Python"
      endMarker="# END Sorting Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START Sorting Python"
      endMarker="# END Sorting Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START Sorting"
      endMarker="// END Sorting"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START Sorting"
      endMarker="// END Sorting"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START Sorting"
      endMarker="// END Sorting"
      language="java"
    />
  </TabItem>

  <TabItem value="curl" label="Curl">
    <FilteredTextBlock
      text={CurlCode}
      startMarker="# START Sorting"
      endMarker="# END Sorting"
      language="shell"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START Sorting GraphQL"
      endMarker="# END Sorting GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>


<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "JeopardyQuestion": [
        {
          "answer": "$5 (Lincoln Memorial in the background)",
          "points": 600,
          "question": "A sculpture by Daniel Chester French can be seen if you look carefully on the back of this current U.S. bill"
        },
        {
          "answer": "(1 of 2) Juneau, Alaska or Augusta, Maine",
          "points": 0,
          "question": "1 of the 2 U.S. state capitals that begin with the names of months"
        },
        {
          "answer": "(1 of 2) Juneau, Alaska or Honolulu, Hawaii",
          "points": 0,
          "question": "One of the 2 state capitals whose names end with the letter \"U\""
        }
      ]
    }
  }
}
```

</details>

#### Sorting by multiple properties

To sort by more than one property, pass an array of { `path`, `order` } objects to the sort function:

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START MultiplePropSorting Python"
      endMarker="# END MultiplePropSorting Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START MultiplePropSorting Python"
      endMarker="# END MultiplePropSorting Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START MultiplePropSorting"
      endMarker="// END MultiplePropSorting"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START MultiplePropSorting"
      endMarker="// END MultiplePropSorting"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START MultiplePropSorting"
      endMarker="// END MultiplePropSorting"
      language="java"
    />
  </TabItem>

  <TabItem value="curl" label="Curl">
    <FilteredTextBlock
      text={CurlCode}
      startMarker="# START MultiplePropSorting"
      endMarker="# END MultiplePropSorting"
      language="shell"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START MultiplePropSorting GraphQL"
      endMarker="# END MultiplePropSorting GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>


#### Metadata properties

To sort with metadata, add an underscore to the property name.

| Property Name | Sort Property  Name |
| :- | :- |
| `id` | `_id` |
| `creationTimeUnix` | `_creationTimeUnix` |
| `lastUpdateTimeUnix` | `_lastUpdateTimeUnix` |

<Tabs groupId="languages">
  <TabItem value="py4" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START AdditionalPropSorting Python"
      endMarker="# END AdditionalPropSorting Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START AdditionalPropSorting Python"
      endMarker="# END AdditionalPropSorting Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START AdditionalPropSorting"
      endMarker="// END AdditionalPropSorting"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START AdditionalPropSorting"
      endMarker="// END AdditionalPropSorting"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START AdditionalPropSorting"
      endMarker="// END AdditionalPropSorting"
      language="java"
    />
  </TabItem>

  <TabItem value="curl" label="Curl">
    <FilteredTextBlock
      text={CurlCode}
      startMarker="# START AdditionalPropSorting"
      endMarker="# END AdditionalPropSorting"
      language="shell"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START AdditionalPropSorting GraphQL"
      endMarker="# END AdditionalPropSorting GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Python client v4 property names</summary>

| Property Name | Sort Property  Name |
| :- | :- |
| `uuid` |`_id` |
| `creation_time` | `_creationTimeUnix` |
| `last_update_time` | `_lastUpdateTimeUnix` |

</details>

## Grouping

You can use a group to combine similar concepts (also known as _entity merging_). There are two ways of grouping semantically similar objects together, `closest` and `merge`. To return the closest concept, set `type: closest`. To combine similar entities into a single string, set `type: merge`

### Variables

| Variable | Required | Type | Description |
| --------- | -------- | ---- | ----------- |
| `type` | yes | `string` | Either `closest` or `merge` |
| `force` | yes | `float` | The force to apply for a particular movements.<br/>Must be between `0` and `1`. `0` is no movement. `1` is maximum movement. |

### Example

import GraphQLFiltersGroup from '/_includes/code/graphql.filters.group.mdx';

<GraphQLFiltersGroup/>

The query merges the results for `International New York Times`, `The New York Times Company` and `New York Times`.

The central concept in the group, `The New York Times Company`, leads the group. Related values follow in parentheses.

<details>
  <summary>Expected response</summary>

```json
{
  "data": {
    "Get": {
      "Publication": [
        {
          "name": "Fox News"
        },
        {
          "name": "Wired"
        },
        {
          "name": "The New York Times Company (New York Times, International New York Times)"
        },
        {
          "name": "Game Informer"
        },
        {
          "name": "New Yorker"
        },
        {
          "name": "Wall Street Journal"
        },
        {
          "name": "Vogue"
        },
        {
          "name": "The Economist"
        },
        {
          "name": "Financial Times"
        },
        {
          "name": "The Guardian"
        },
        {
          "name": "CNN"
        }
      ]
    }
  }
}
```

</details>

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
