---
title: Search basics
sidebar_position: 10
image: og/docs/howto.jpg
# tags: ['how to', 'perform a semantic search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!/_includes/code/howto/search.basics.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.basics.ts';

## Overview

This section includes the essentials of performing searches and retrieving objects with the `Get` function.

:::info Related pages
- [API References: GraphQL: Get](../api/graphql/get.md)
:::

## `Get` function requirements

To retrieve objects from Weaviate, you must use the [`Get` function](../api/graphql/get.md) and specify at least:
- The target `class` to search, and
- One or more `properties` to retrieve.

## Simple `Get` example

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
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
  text={PythonCode}
  startMarker="# BasicGetGraphQL"
  endMarker="# END BasicGetGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="// BasicGet Expected Results"
  endMarker="// END BasicGet Expected Results"
  language="json"
/>

</details>

:::tip `objects` endpoint != search
The [`objects` endpoint](../api/rest/objects.md) in Weaviate is designed for CRUD operations and not capable of performing searches.
:::

## `limit` returned objects

Often, you will only want the top `n` results from the query. This can be achieved by setting a `limit` as shown below.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
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
  text={PythonCode}
  startMarker="# GetWithLimitGraphQL"
  endMarker="# END GetWithLimitGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="// GetWithLimit Expected Results"
  endMarker="// END GetWithLimit Expected Results"
  language="json"
/>

</details>

## Paginate with `limit` and `offset`

If you only want the `n` results after the first `m` results from the query, you can do this with `limit` and `offset` as shown below.

Be aware that although you will only see `n` results, this could become an expensive operation as `m` grows larger, as Weaviate must fetch `n+m` results.

:::tip For exhaustive retrieval, use `after` instead.
If you want to list and retrieve all objects from a `class`, use the cursor API instead with the `after` parameter. Read [this guide](../manage-data/read-all-objects.mdx) for more information on how.
:::

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
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
  text={PythonCode}
  startMarker="# GetWithLimitOffsetGraphQL"
  endMarker="# END GetWithLimitOffsetGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="// GetWithLimitOffset Expected Results"
  endMarker="// END GetWithLimitOffset Expected Results"
  language="json"
/>

</details>

## Specify the fetched properties

You can specify the properties to be fetched, as long as one or more are specified.

### Object `properties`

You can specify object properties as below.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
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
  text={PythonCode}
  startMarker="# GetPropertiesGraphQL"
  endMarker="# END GetPropertiesGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="// GetProperties Expected Results"
  endMarker="// END GetProperties Expected Results"
  language="json"
/>

</details>

### Retrieve the object `vector`

To retrieve the object vector, request the `_additional` property and `vector` sub-property. You can do so as shown below.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
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
  text={PythonCode}
  startMarker="# GetObjectVectorGraphQL"
  endMarker="# END GetObjectVectorGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="// GetObjectVector Expected Results"
  endMarker="// END GetObjectVector Expected Results"
  language="json"
/>

</details>

### Retrieve the object `id`

To retrieve the object ID, request the `_additional` property and `id` sub-property. You can do so as shown below.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
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
  text={PythonCode}
  startMarker="# GetObjectIdGraphQL"
  endMarker="# END GetObjectIdGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="// GetObjectId Expected Results"
  endMarker="// END GetObjectId Expected Results"
  language="json"
/>

</details>


### Retrieve cross-referenced properties

You can retrieve any properties of cross-referenced objects by specifying:
- The cross-reference property,
- The target cross-referenced object class, and
- The desired properties to retrieve (of the cross-referenced objects).

The following example, retrieves for each `JeopardyQuestion` object the cross-referenced `JeopardyCategory` object, and the `JeopardyCategory` object's `title` property is returned. The property is accessed using the [inline fragment](http://spec.graphql.org/June2018/#sec-Inline-Fragments) GraphQL syntax.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetWithCrossRefsPython"
  endMarker="# END GetWithCrossRefsPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="TypeScript">

<FilteredTextBlock
  text={TSCode}
  startMarker="// GetWithCrossRefs"
  endMarker="// END GetWithCrossRefs"
  language="js"
/>

</TabItem>
<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetWithCrossRefsGraphQL"
  endMarker="# END GetWithCrossRefsGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

It should produce a response like the one below:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetWithCrossRefs Expected Results"
  endMarker="# END GetWithCrossRefs Expected Results"
  language="json"
/>

</details>

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
