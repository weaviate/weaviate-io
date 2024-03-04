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

`Aggregate` queries process the result set to return calculated results. Use `aggregate` queries for groups of objects or the entire result set.

<details>
  <summary>
    Additional information
  </summary>

To run an `Aggregate` query, specify the following:

- A target collection to search
- One or more aggregated properties, such as:

   - A meta property
   - An object property
   - The `groupedBy` property

- Select at least one sub-property for each selected property

For details, see <a href="https://weaviate.io/developers/weaviate/api/graphql/aggregate">Aggregate</a>.

</details>

## Retrieve the `count` meta property

Return the number  of objects matched by the query.

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
      text={PyCodeV3}
      startMarker="# MetaCount GraphQL"
      endMarker="# END MetaCount GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The output is like this:

  <FilteredTextBlock
    text={PyCodeV3}
    startMarker="# MetaCount Expected Results"
    endMarker="# END MetaCount Expected Results"
    language="json"
  />
</details>

## Aggregate `text` properties

This example counts occurrence frequencies in the `question` property:

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
      text={PyCodeV3}
      startMarker="# TextProp GraphQL"
      endMarker="# END TextProp GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The output is like this:

  <FilteredTextBlock
    text={PyCodeV3}
    startMarker="# TextProp Expected Results"
    endMarker="# END TextProp Expected Results"
    language="json"
  />
</details>

## Aggregate `int` properties

This  example sums the `points` property.

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
      text={PyCodeV3}
      startMarker="# IntProp GraphQL"
      endMarker="# END IntProp GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The output is like this:

  <FilteredTextBlock
    text={PyCodeV3}
    startMarker="# IntProp Expected Results"
    endMarker="# END IntProp Expected Results"
    language="json"
  />
</details>

## Aggregate `groupedBy` properties

To group your results, use `groupBy` in the query.

To retrieve aggregate data for each group, use the `groupedBy` properties.

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
      text={PyCodeV3}
      startMarker="# groupBy GraphQL"
      endMarker="# END groupBy GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>


<details>
  <summary>Example response</summary>

  The output is like this:

  <FilteredTextBlock
    text={PyCodeV3}
    startMarker="# groupBy Expected Results"
    endMarker="# END groupBy Expected Results"
    language="json"
  />
</details>

import GroupbyLimitations from '/_includes/groupby-limitations.mdx';

<GroupbyLimitations />

## Aggregate with a `similarity search`

You can use `Aggregate` with a [similarity search](./similarity.md) operator (one of the `Near` operators).

<!-- Make sure to [limit your search results](../api/graphql/aggregate.md#limiting-the-search-space).<br/> -->
Use `objectLimit` to specify the maximum number of objects to aggregate.

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
      text={PyCodeV3}
      startMarker="# nearTextWithLimit GraphQL"
      endMarker="# END nearTextWithLimit GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The output is like this:

  <FilteredTextBlock
    text={PyCodeV3}
    startMarker="# nearTextWithLimit Expected Results"
    endMarker="# END nearTextWithLimit Expected Results"
    language="json"
  />
</details>

## Set a similarity `distance`

You can use `Aggregate` with a [similarity search](./similarity.md) operator (one of the `Near` operators).

<!-- Make sure to [limit your search results](../api/graphql/aggregate.md#limiting-the-search-space).<br/> -->
Use `distance` to specify how similar the objects should be.

<!-- If you use `Aggregate` with a [similarity search](./similarity.md) operator (one of the `nearXXX` operators), [limit your search results](../api/graphql/aggregate.md#limiting-the-search-space). To specify how similar the objects should be, use the `distance` operator. -->

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
      text={PyCodeV3}
      startMarker="# nearTextWithDistance GraphQL"
      endMarker="# END nearTextWithDistance GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The output is like this:

  <FilteredTextBlock
    text={PyCodeV3}
    startMarker="# nearTextWithDistance Expected Results"
    endMarker="# END nearTextWithDistance Expected Results"
    language="json"
  />
</details>

## Filter results

For more specific results, use a `filter` to narrow your search.

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
      text={PyCodeV3}
      startMarker="# whereFilter GraphQL"
      endMarker="# END whereFilter GraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

  The output is like this:

  <FilteredTextBlock
    text={PyCodeV3}
    startMarker="# whereFilter Expected Results"
    endMarker="# END whereFilter Expected Results"
    language="json"
  />

</details>

## Related pages

- [Connect to Weaviate](/developers/weaviate/tutorials/connect.mdx)
- [API References: GraphQL: Aggregate](../api/graphql/aggregate.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

