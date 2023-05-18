---
title: Aggregate data
sidebar_position: 6
image: og/docs/howto.jpg
# tags: ['how to', 'perform a semantic search']
---

:::caution This page is under construction.
:::

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.aggregate.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.aggregate.ts';

## Overview

This section shows how to retrieve aggregate data from a class or results set, for example to list object or property counts, using the `Aggregate` function. `Aggregate` is largely similar to `Get`, but returns metadata instead of objects.

:::info Related pages
- [API References: GraphQL: Aggregate](../api/graphql/aggregate.md)
:::

## Syntax

See the [`Aggregate` function syntax](../api/graphql/aggregate.md#aggregate-syntax-and-query-structure) for details.

### `Aggregate` function requirements

To use `Aggregate`, specify at least:
- the target `class` to search, and
  - one or more `properties` to retrieve metadata for, OR
  - the `meta` property, which refers to the entire class, OR
  - the `groupedBy` property if the `groupBy` argument was passed to the class


TODO: "Add ref to available grouped props"

## Available properties

### meta { count }

This is the simplest property, and returns the count of objects matched by the aggregate filters if any, or simply the total count of object in the class otherwise.

<Tabs groupId="languages">
  <TabItem value="graphql" label="GraphQL">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# MetaCount GraphQL"
    endMarker="# END MetaCount GraphQL"
    language="graphql"
  />

  </TabItem>
  <TabItem value="py" label="Python">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# MetaCount Python"
    endMarker="# END MetaCount Python"
    language="py"
  />

  </TabItem>
  <TabItem value="js" label="TypeScript">

  <FilteredTextBlock
    text={TSCode}
    startMarker="// MetaCount TS"
    endMarker="// END MetaCount TS"
    language="js"
  />

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="// MetaCount Expected Results"
    endMarker="// END MetaCount Expected Results"
    language="json"
  />
</details>

### Any text property from the class

For any text property of the class, you can list how many times it appears, as well as information about the top occurrences:

<Tabs groupId="languages">
  <TabItem value="graphql" label="GraphQL">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# TextProp GraphQL"
    endMarker="# END TextProp GraphQL"
    language="graphql"
  />

  </TabItem>
  <TabItem value="py" label="Python">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# TextProp Python"
    endMarker="# END TextProp Python"
    language="py"
  />

  </TabItem>
  <TabItem value="js" label="TypeScript">

  <FilteredTextBlock
    text={TSCode}
    startMarker="// TextProp TS"
    endMarker="// END TextProp TS"
    language="js"
  />

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="// TextProp Expected Results"
    endMarker="// END TextProp Expected Results"
    language="json"
  />
</details>

### Any number or integer property from the class

For numeric properties, you can display the count as usual, plus some arithmetic properties like the total sum, minimum, maximum, median, median and mode. For example, if a player were to win every single round, their total points can be calculated as follows:

<Tabs groupId="languages">
  <TabItem value="graphql" label="GraphQL">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# NumberProp GraphQL"
    endMarker="# END NumberProp GraphQL"
    language="graphql"
  />

  </TabItem>
  <TabItem value="py" label="Python">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# NumberProp Python"
    endMarker="# END NumberProp Python"
    language="py"
  />

  </TabItem>
  <TabItem value="js" label="TypeScript">

  <FilteredTextBlock
    text={TSCode}
    startMarker="// NumberProp TS"
    endMarker="// END NumberProp TS"
    language="js"
  />

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="// NumberProp Expected Results"
    endMarker="// END NumberProp Expected Results"
    language="json"
  />
</details>


## With nearXXX

To count how many objects would match a `near<Media>` query "well enough", you can that argument to the class. Note that "well enough" is necessary as a way to limit the search space, because when performing vector searches, _all_ results match to some extent, even though the last ones in the result set have a very high distance from the query. Thus, you [**must** use a `distance` value](../api/graphql/aggregate.md#limiting-the-search-space) in the `near<Media>` object:

<Tabs groupId="languages">
  <TabItem value="graphql" label="GraphQL">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# nearXXX GraphQL"
    endMarker="# END nearXXX GraphQL"
    language="graphql"
  />

  </TabItem>
  <TabItem value="py" label="Python">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# nearXXX Python"
    endMarker="# END nearXXX Python"
    language="py"
  />

  </TabItem>
  <TabItem value="js" label="TypeScript">

  <FilteredTextBlock
    text={TSCode}
    startMarker="// nearXXX TS"
    endMarker="// END nearXXX TS"
    language="js"
  />

  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="// nearXXX Expected Results"
    endMarker="// END nearXXX Expected Results"
    language="json"
  />
</details>


### Adding an object limit

If you want to limit the *number* (rather than the quality, as in `distance`) of `near<Media>` results, you can use `near<Media>.objectLimit`:

<Tabs groupId="languages">
  <TabItem value="graphql" label="GraphQL">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# objectLimit GraphQL"
    endMarker="# END objectLimit GraphQL"
    language="graphql"
  />

  </TabItem>
  <TabItem value="py" label="Python">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# objectLimit Python"
    endMarker="# END objectLimit Python"
    language="py"
  />

  </TabItem>
  <TabItem value="js" label="TypeScript">

  <FilteredTextBlock
    text={TSCode}
    startMarker="// objectLimit TS"
    endMarker="// END objectLimit TS"
    language="js"
  />

  </TabItem>
</Tabs>



<details>
  <summary>Above, we calculated the total points earned for answering the top 10 questions about "animals in space".</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="// objectLimit Expected Results"
    endMarker="// END objectLimit Expected Results"
    language="json"
  />
</details>


## With groupBy

To group results and list aggregate data about the result set, use the `groupBy` variable, and the `groupedBy` response property. For example, to list all distinct values of a property, and the counts for each:

<Tabs groupId="languages">
  <TabItem value="graphql" label="GraphQL">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# groupBy GraphQL"
    endMarker="# END groupBy GraphQL"
    language="graphql"
  />

  </TabItem>
  <TabItem value="py" label="Python">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# groupBy Python"
    endMarker="# END groupBy Python"
    language="py"
  />

  </TabItem>
  <TabItem value="js" label="TypeScript">

  <FilteredTextBlock
    text={TSCode}
    startMarker="// groupBy TS"
    endMarker="// END groupBy TS"
    language="js"
  />

  </TabItem>
</Tabs>


<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="// groupBy Expected Results"
    endMarker="// END groupBy Expected Results"
    language="json"
  />
</details>


## With a filter

To list aggregate data about a filtered result set, pass the `where` variable to the class function:

<Tabs groupId="languages">
  <TabItem value="graphql" label="GraphQL">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# whereFilter GraphQL"
    endMarker="# END whereFilter GraphQL"
    language="graphql"
  />

  </TabItem>
  <TabItem value="py" label="Python">

  <FilteredTextBlock
    text={PythonCode}
    startMarker="# whereFilter Python"
    endMarker="# END whereFilter Python"
    language="py"
  />

  </TabItem>
  <TabItem value="js" label="TypeScript">

  <FilteredTextBlock
    text={TSCode}
    startMarker="// whereFilter TS"
    endMarker="// END whereFilter TS"
    language="js"
  />

  </TabItem>
</Tabs>

The example above should show the same number of "Final Jeopardy!" questions as shown by the "Final Jeopardy!" `groupedBy` property of the [`groupBy` example](#with-groupby) preceding it:

<details>
  <summary>Example response</summary>

  The query should produce a response like the one below:

  <FilteredTextBlock
    text={PythonCode}
    startMarker="// whereFilter Expected Results"
    endMarker="// END whereFilter Expected Results"
    language="json"
  />

</details>


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

