---
title: Basic search examples
sidebar_position: 10
image: og/docs/howto.jpg
# tags: ['how to', 'semantic search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.basics.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.basics-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.basics.ts';


## Basic search

Use the [`Get` function](../api/graphql/get.md) to search.

<Tabs groupId="languages">

 <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# BasicGetPython"
      endMarker="# END BasicGetPython"
      language="py"
    />
  </TabItem>
  
<TabItem value="py3" label="Python (v3)">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# BasicGetPython"
  endMarker="# END BasicGetPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// BasicGetJS"
  endMarker="// END BasicGetJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# BasicGetGraphQL"
  endMarker="# END BasicGetGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// BasicGet Expected Results"
  endMarker="// END BasicGet Expected Results"
  language="json"
/>

</details>

<details>
  <summary>Additional information</summary>

  Specify the information that you want your query to return. You can return object properties, object IDs, and object metadata. Weaviate search is based on the [GraphQL API](../api/graphql/index.md).

</details>

## `limit` returned objects

To return a limited number of objects, set a `limit`.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# GetWithLimitPython"
  endMarker="# END GetWithLimitPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python (v3)">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithLimitPython"
  endMarker="# END GetWithLimitPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetWithLimitJS"
  endMarker="// END GetWithLimitJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithLimitGraphQL"
  endMarker="# END GetWithLimitGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetWithLimit Expected Results"
  endMarker="// END GetWithLimit Expected Results"
  language="json"
/>

</details>

## Paginate with `limit` and `offset`

To start in the middle of your result set, define an `offset`. Set a `limit` to return objects starting at the offset.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# GetWithLimitOffsetPython"
  endMarker="# END GetWithLimitOffsetPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python (v3)">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithLimitOffsetPython"
  endMarker="# END GetWithLimitOffsetPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetWithLimitOffsetJS"
  endMarker="// END GetWithLimitOffsetJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithLimitOffsetGraphQL"
  endMarker="# END GetWithLimitOffsetGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetWithLimitOffset Expected Results"
  endMarker="// END GetWithLimitOffset Expected Results"
  language="json"
/>

</details>


## Specify object `properties`

You can specify object properties as below.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# GetPropertiesPython"
  endMarker="# END GetPropertiesPython"
  language="py"
/>
</TabItem>


<TabItem value="py3" label="Python (v3)">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetPropertiesPython"
  endMarker="# END GetPropertiesPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetPropertiesJS"
  endMarker="// END GetPropertiesJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetPropertiesGraphQL"
  endMarker="# END GetPropertiesGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetProperties Expected Results"
  endMarker="// END GetProperties Expected Results"
  language="json"
/>

</details>

## Retrieve the object `vector`

To retrieve the object vector, specify the vector in your query.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# GetObjectVectorPython"
  endMarker="# END GetObjectVectorPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetObjectVectorPython"
  endMarker="# END GetObjectVectorPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetObjectVectorJS"
  endMarker="// END GetObjectVectorJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetObjectVectorGraphQL"
  endMarker="# END GetObjectVectorGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetObjectVector Expected Results"
  endMarker="// END GetObjectVector Expected Results"
  language="json"
/>

</details>

## Retrieve the object `id`

To retrieve the object ID, request the `_additional` property and `id` sub-property.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">

 The new Python client always returns the object ID.
 
<FilteredTextBlock
  text={PyCode}
  startMarker="# GetObjectIdPython"
  endMarker="# END GetObjectIdPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python (v3)">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetObjectIdPython"
  endMarker="# END GetObjectIdPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetObjectIdJS"
  endMarker="// END GetObjectIdJS"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetObjectIdGraphQL"
  endMarker="# END GetObjectIdGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="// GetObjectId Expected Results"
  endMarker="// END GetObjectId Expected Results"
  language="json"
/>

</details>

## Retrieve cross-referenced properties

To retrieve properties from cross-referenced objects, specify the following items:

- The cross-reference property
- The target cross-referenced collection
- The properties to retrieve

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# GetWithCrossRefsPython"
  endMarker="# END GetWithCrossRefsPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python (v3)">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithCrossRefsPython"
  endMarker="# END GetWithCrossRefsPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetWithCrossRefs"
  endMarker="// END GetWithCrossRefs"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithCrossRefsGraphQL"
  endMarker="# END GetWithCrossRefsGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GetWithCrossRefs Expected Results"
  endMarker="# END GetWithCrossRefs Expected Results"
  language="json"
/>

</details>

## Retrieve other metadata values

For a comprehensive list of metadata fields, see [GraphQL: Additional properties](../api/graphql/additional-properties.md).

## Group results 

To group results, see the [`groupBy`](/developers/weaviate/api/graphql/aggregate#groupby-argument) GraphQL operator.

## Multi-tenancy

If [multi-tenancy](../concepts/data.md#multi-tenancy) is enabled, specify the tenant parameter in each query.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# MultiTenancy"
  endMarker="# END MultiTenancy"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python (v3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# MultiTenancy"
  endMarker="# END MultiTenancy"
  language="py"
 />
</TabItem>

<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCode}
  startMarker="// MultiTenancy"
  endMarker="// END MultiTenancy"
  language="js"
/>
</TabItem>
</Tabs>

## Related pages

- [API References: GraphQL: Get](../api/graphql/get.md)
- For tutorials, see [Queries](/developers/academy/zero_to_mvp/queries_1)
- For search using the GraphQL API, see [GraphQL API](../api/graphql/get.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
