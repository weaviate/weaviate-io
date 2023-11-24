---
title: Aggregate data
sidebar_position: 85
image: og/docs/howto.jpg
# tags: ['how to', 'aggregate data']
---



import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.aggregate.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.aggregate-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.aggregate.ts';

## IGNORE PAGE CONTENTS

This section shows how to retrieve aggregate data from a results set using the `Aggregate` function.

Generally, the usage of `Aggregate` is similar to that of searches using the `Get` function. The main difference is that `Aggregate` returns aggregated data, rather than objects. As `Aggregate` deals with aggregated data, it enables additional (meta) properties such as object counts, as well as aggregated properties such as sums and averages.

:::info Related pages
- [API References: GraphQL: Aggregate](../api/graphql/aggregate.md)
:::

## `Aggregate` function requirements

To use `Aggregate`, you must specify at least:
- The target `class` to search, and
- One or more aggregated properties. The aggregated properties can include:
    - The `meta` property,
    - An object property, OR
    - The `groupedBy` property (if using `groupBy`).

You must then select at least one sub-property for each selected property.

See the [`Aggregate` function syntax page](../api/graphql/aggregate.md#aggregate-syntax-and-query-structure) for details.

## Retrieve a `meta` property

The `meta` property has only one sub-property (`count`) available. This returns the count of objects matched by the query.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# MetaCount Python"
      endMarker="# END MetaCount Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# MetaCount Python"
      endMarker="# END MetaCount Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// MetaCount TS"
      endMarker="// END MetaCount TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# MetaCount GraphQL"
      endMarker="# END MetaCount GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PyCode}
    startMarker="# MetaCount Expected Results"
    endMarker="# END MetaCount Expected Results"
    language="json"
  />
</details>

## Retrieve aggregated object `properties`

You can retrieve aggregations of `text`, `number`, `int`, or `boolean` data types.

The [available sub-types](../api/graphql/aggregate.md#aggregate-syntax-and-query-structure) vary for each data type, except for `type` which is available to all, and `count` which is available to all but cross-references.

### Example with `text`

The following example retrieves information about the most commonly occurring examples in the `question` property:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# TextProp Python"
      endMarker="# END TextProp Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# TextProp Python"
      endMarker="# END TextProp Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// TextProp TS"
      endMarker="// END TextProp TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# TextProp GraphQL"
      endMarker="# END TextProp GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PyCode}
    startMarker="# TextProp Expected Results"
    endMarker="# END TextProp Expected Results"
    language="json"
  />
</details>

### Example with `int`

The following example retrieves the sum of the `points` property values:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# IntProp Python"
      endMarker="# END IntProp Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# IntProp Python"
      endMarker="# END IntProp Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// IntProp TS"
      endMarker="// END IntProp TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# IntProp GraphQL"
      endMarker="# END IntProp GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PyCode}
    startMarker="# IntProp Expected Results"
    endMarker="# END IntProp Expected Results"
    language="json"
  />
</details>

## Retrieve `groupedBy` properties

You can use the `groupBy` variable to group the results set into subsets. Then, you can retrieve the grouped aggregate data for each group through the `groupedBy` properties.

For example, to list all distinct values of a property, and the counts for each:

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# groupBy Python"
      endMarker="# END groupBy Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# groupBy Python"
      endMarker="# END groupBy Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// groupBy TS"
      endMarker="// END groupBy TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# groupBy GraphQL"
      endMarker="# END groupBy GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>


<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PyCode}
    startMarker="# groupBy Expected Results"
    endMarker="# END groupBy Expected Results"
    language="json"
  />
</details>

import GroupbyLimitations from '/_includes/groupby-limitations.mdx';

<GroupbyLimitations />

## With `nearXXX`

When using a [similarity search](./similarity.md) operator (i.e. `nearXXX`) with `Aggregate`, you should include a way to [limit the search results](../api/graphql/aggregate.md#limiting-the-search-space). This is because a vector search in itself does not exclude any objects from the results set - _all_ objects have some degree of similarity to the query.

Thus, for the vector search to affect the `Aggregate` output, you **must** set a limit on:
- The number of results returned (with `limit`), or
- How similar the results are to the query (with `distance`).

### Set an object limit

You can set the `objectLimit` argument to specify the maximum number of results to be aggregated.

The query below retrieves the 10 `question` objects that have the vectors that are closest to the vector for `"animals in space"`. The query also returns the sum total of the `point` property.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# nearTextWithLimit Python"
      endMarker="# END nearTextWithLimit Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# nearTextWithLimit Python"
      endMarker="# END nearTextWithLimit Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// nearTextWithLimit TS"
      endMarker="// END nearTextWithLimit TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# nearTextWithLimit GraphQL"
      endMarker="# END nearTextWithLimit GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PyCode}
    startMarker="# nearTextWithLimit Expected Results"
    endMarker="# END nearTextWithLimit Expected Results"
    language="json"
  />
</details>


### Set a maximum `distance`

You can set the `distance` operator to specify the maximum dissimilarity (i.e. minimum similarity) of results to be aggregated.

The query below retrieves the 10 `question` objects that have vectors that are within a distance of `0.19` to the vector for `"animals in space"`. It also returns the sum total of the `point` property.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# nearTextWithDistance Python"
      endMarker="# END nearTextWithDistance Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# nearTextWithDistance Python"
      endMarker="# END nearTextWithDistance Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// nearTextWithDistance TS"
      endMarker="// END nearTextWithDistance TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# nearTextWithDistance GraphQL"
      endMarker="# END nearTextWithDistance GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PyCode}
    startMarker="# nearTextWithDistance Expected Results"
    endMarker="# END nearTextWithDistance Expected Results"
    language="json"
  />
</details>


## Add a conditional (`where`) filter

You can add a conditional filter to any aggregate search query to filter the results set.

This example searches for objects where the `round` property equals `Double Jeopardy!` and returns the object count.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# whereFilter Python"
      endMarker="# END whereFilter Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# whereFilter Python"
      endMarker="# END whereFilter Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// whereFilter TS"
      endMarker="// END whereFilter TS"
      language="js"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# whereFilter GraphQL"
      endMarker="# END whereFilter GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PyCode}
    startMarker="# whereFilter Expected Results"
    endMarker="# END whereFilter Expected Results"
    language="json"
  />

</details>



import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

