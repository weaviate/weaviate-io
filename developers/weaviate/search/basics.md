---
title: Search patterns and basics
sidebar_position: 10
image: og/docs/howto.jpg
# tags: ['how to', 'semantic search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';

import PyCode from '!!raw-loader!/_includes/code/howto/search.basics.py';
export const PyCodeInfo = {
  content: PyCode,
  path: '/_includes/code/howto/search.basics.py',
};
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.basics-v3.py';
export const PyCodeV3Info = {
  content: PyCodeV3,
  path: '/_includes/code/howto/search.basics-v3.py',
};
import TSCode from '!!raw-loader!/_includes/code/howto/search.basics.ts';
export const TSCodeInfo = {
  content: TSCode,
  path: '/_includes/code/howto/search.basics.ts',
};
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/search.basics-v2.ts';
export const TSCodeLegacyInfo = {
  content: TSCodeLegacy,
  path: '/_includes/code/howto/search.basics-v2.ts',
};
import GoCode from '!!raw-loader!/_includes/code/howto/go/docs/mainpkg/search-basic_test.go';
export const GoCodeInfo = {
  content: GoCode,
  path: '/_includes/code/howto/go/docs/mainpkg/search-basic_test.go',
};
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/search/BasicSearchTest.java';
export const JavaCodeInfo = {
  content: JavaCode,
  path: '/_includes/code/howto/java/src/test/java/io/weaviate/docs/search/BasicSearchTest.java',
};

With Weaviate you can query your data using [vector similarity search](./similarity.md), [keyword search](./bm25.md), or a mix of both with [hybrid search](./hybrid.md). You can control what object [properties](#specify-object-properties) and [metadata](#retrieve-metadata-values) to return.

This page provides fundamental search syntax to get you started.

## List objects

You can get objects without specifying any parameters. This returns objects in ascending UUID order.

<Tabs groupId="languages">

<TabItem value="py" label="Python Client v4">
  <FilteredTextBlock
    text={PyCodeInfo.content}
    path={PyCodeInfo.path}
    startMarker="# BasicGetPython"
    endMarker="# END BasicGetPython"
    language="py"
  />
</TabItem>

<TabItem value="py3" label="Python Client v3">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# BasicGetPython"
  endMarker="# END BasicGetPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JS/TS Client v3">

<FilteredTextBlock
  text={TSCodeInfo.content}
  path={TSCodeInfo.path}
  startMarker="// BasicGetJS"
  endMarker="// END BasicGetJS"
  language="js"
/>

</TabItem>

<TabItem value="js2" label="JS/TS Client v2">

<FilteredTextBlock
  text={TSCodeLegacyInfo.content}
  path={TSCodeLegacyInfo.path}
  startMarker="// BasicGetJS"
  endMarker="// END BasicGetJS"
  language="js"
/>

</TabItem>

<TabItem value="go" label="Go">
<FilteredTextBlock
  text={GoCodeInfo.content}
  path={GoCodeInfo.path}
  startMarker="// START BasicGet"
  endMarker="// END BasicGet"
  language="go"
/>
</TabItem>

<TabItem value="java" label="Java">
<FilteredTextBlock
  text={JavaCodeInfo.content}
  path={JavaCodeInfo.path}
  startMarker="// START BasicGet"
  endMarker="// END BasicGet"
  language="java"
/>
</TabItem>

<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
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

  Specify the information that you want your query to return. You can return object properties, object IDs, and object metadata.

</details>

## `limit` returned objects

Use `limit` to set a fixed maximum number of objects to return.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeInfo.content}
  path={PyCodeInfo.path}
  startMarker="# GetWithLimitPython"
  endMarker="# END GetWithLimitPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python Client v3">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# GetWithLimitPython"
  endMarker="# END GetWithLimitPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JS/TS Client v3">

<FilteredTextBlock
  text={TSCodeInfo.content}
  path={TSCodeInfo.path}
  startMarker="// GetWithLimitJS"
  endMarker="// END GetWithLimitJS"
  language="js"
/>

</TabItem>

<TabItem value="js2" label="JS/TS Client v2">

<FilteredTextBlock
  text={TSCodeLegacyInfo.content}
  path={TSCodeLegacyInfo.path}
  startMarker="// GetWithLimitJS"
  endMarker="// END GetWithLimitJS"
  language="js"
/>
</TabItem>

<TabItem value="go" label="Go">
<FilteredTextBlock
  text={GoCodeInfo.content}
  path={GoCodeInfo.path}
  startMarker="// START GetWithLimit"
  endMarker="// END GetWithLimit"
  language="go"
/>
</TabItem>

<TabItem value="java" label="Java">
<FilteredTextBlock
  text={JavaCodeInfo.content}
  path={JavaCodeInfo.path}
  startMarker="// START GetWithLimit"
  endMarker="// END GetWithLimit"
  language="java"
/>
</TabItem>

<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
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
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeInfo.content}
  path={PyCodeInfo.path}
  startMarker="# GetWithLimitOffsetPython"
  endMarker="# END GetWithLimitOffsetPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python Client v3">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# GetWithLimitOffsetPython"
  endMarker="# END GetWithLimitOffsetPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JS/TS Client v3">

<FilteredTextBlock
  text={TSCodeInfo.content}
  path={TSCodeInfo.path}
  startMarker="// GetWithLimitOffsetJS"
  endMarker="// END GetWithLimitOffsetJS"
  language="js"
/>

</TabItem>

<TabItem value="js2" label="JS/TS Client v2">

<FilteredTextBlock
  text={TSCodeLegacyInfo.content}
  path={TSCodeLegacyInfo.path}
  startMarker="// GetWithLimitOffsetJS"
  endMarker="// END GetWithLimitOffsetJS"
  language="js"
/>
</TabItem>

<TabItem value="go" label="Go">
<FilteredTextBlock
  text={GoCodeInfo.content}
  path={GoCodeInfo.path}
  startMarker="// START GetWithOffset"
  endMarker="// END GetWithOffset"
  language="go"
/>
</TabItem>

<TabItem value="java" label="Java">
<FilteredTextBlock
  text={JavaCodeInfo.content}
  path={JavaCodeInfo.path}
  startMarker="// START GetWithOffset"
  endMarker="// END GetWithOffset"
  language="java"
/>
</TabItem>

<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
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

To paginate through the entire database, use a [cursor](../manage-data/read-all-objects.mdx#read-all-objects) instead of offset and limit.


## Specify object `properties`

You can specify which object properties to return.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeInfo.content}
  path={PyCodeInfo.path}
  startMarker="# GetPropertiesPython"
  endMarker="# END GetPropertiesPython"
  language="py"
/>
</TabItem>


<TabItem value="py3" label="Python Client v3">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# GetPropertiesPython"
  endMarker="# END GetPropertiesPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JS/TS Client v3">

<FilteredTextBlock
  text={TSCodeInfo.content}
  path={TSCodeInfo.path}
  startMarker="// GetPropertiesJS"
  endMarker="// END GetPropertiesJS"
  language="js"
/>

</TabItem>

<TabItem value="js2" label="JS/TS Client v2">

<FilteredTextBlock
  text={TSCodeLegacyInfo.content}
  path={TSCodeLegacyInfo.path}
  startMarker="// GetPropertiesJS"
  endMarker="// END GetPropertiesJS"
  language="js"
/>

</TabItem>

<TabItem value="go" label="Go">
<FilteredTextBlock
  text={GoCodeInfo.content}
  path={GoCodeInfo.path}
  startMarker="// START GetProperties"
  endMarker="// END GetProperties"
  language="go"
/>
</TabItem>

<TabItem value="java" label="Java">
<FilteredTextBlock
  text={JavaCodeInfo.content}
  path={JavaCodeInfo.path}
  startMarker="// START GetProperties"
  endMarker="// END GetProperties"
  language="java"
/>
</TabItem>

<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
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

You can retrieve the object vector. (Also applicable where [named vectors](../config-refs/schema/multi-vector.md) are used.)

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeInfo.content}
  path={PyCodeInfo.path}
  startMarker="# GetObjectVectorPython"
  endMarker="# END GetObjectVectorPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python Client v3">
<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# GetObjectVectorPython"
  endMarker="# END GetObjectVectorPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JS/TS Client v3">

<FilteredTextBlock
  text={TSCodeInfo.content}
  path={TSCodeInfo.path}
  startMarker="// GetObjectVectorJS"
  endMarker="// END GetObjectVectorJS"
  language="js"
/>

</TabItem>

<TabItem value="js2" label="JS/TS Client v2">

<FilteredTextBlock
  text={TSCodeLegacyInfo.content}
  path={TSCodeLegacyInfo.path}
  startMarker="// GetObjectVectorJS"
  endMarker="// END GetObjectVectorJS"
  language="js"
/>

</TabItem>

<TabItem value="go" label="Go">
  <FilteredTextBlock
    text={GoCodeInfo.content}
    path={GoCodeInfo.path}
    startMarker="// START GetObjectVector"
    endMarker="// END GetObjectVector"
    language="go"
  />
</TabItem>

<TabItem value="java" label="Java">
<FilteredTextBlock
  text={JavaCodeInfo.content}
  path={JavaCodeInfo.path}
  startMarker="// START GetObjectVector"
  endMarker="// END GetObjectVector"
  language="java"
/>
</TabItem>

<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
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

You can retrieve the object `id` (uuid).

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">

<FilteredTextBlock
  text={PyCodeInfo.content}
  path={PyCodeInfo.path}
  startMarker="# GetObjectIdPython"
  endMarker="# END GetObjectIdPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python Client v3">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# GetObjectIdPython"
  endMarker="# END GetObjectIdPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JS/TS Client v3">

<FilteredTextBlock
  text={TSCodeInfo.content}
  path={TSCodeInfo.path}
  startMarker="// GetObjectIdJS"
  endMarker="// END GetObjectIdJS"
  language="js"
/>

</TabItem>

<TabItem value="js2" label="JS/TS Client v2">

<FilteredTextBlock
  text={TSCodeLegacyInfo.content}
  path={TSCodeLegacyInfo.path}
  startMarker="// GetObjectIdJS"
  endMarker="// END GetObjectIdJS"
  language="js"
/>

</TabItem>

<TabItem value="go" label="Go">
<FilteredTextBlock
  text={GoCodeInfo.content}
  path={GoCodeInfo.path}
  startMarker="// START GetObjectId"
  endMarker="// END GetObjectId"
  language="go"
/>
</TabItem>

<TabItem value="java" label="Java">
<FilteredTextBlock
  text={JavaCodeInfo.content}
  path={JavaCodeInfo.path}
  startMarker="// START GetObjectId"
  endMarker="// END GetObjectId"
  language="java"
/>
</TabItem>

<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
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

To retrieve properties from cross-referenced objects, specify:

- The cross-reference property
- The target cross-referenced collection
- The properties to retrieve

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeInfo.content}
  path={PyCodeInfo.path}
  startMarker="# GetWithCrossRefsPython"
  endMarker="# END GetWithCrossRefsPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python Client v3">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# GetWithCrossRefsPython"
  endMarker="# END GetWithCrossRefsPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JS/TS Client v3">

<FilteredTextBlock
  text={TSCodeInfo.content}
  path={TSCodeInfo.path}
  startMarker="// GetWithCrossRefs"
  endMarker="// END GetWithCrossRefs"
  language="js"
/>

</TabItem>

<TabItem value="js2" label="JS/TS Client v2">

<FilteredTextBlock
  text={TSCodeLegacyInfo.content}
  path={TSCodeLegacyInfo.path}
  startMarker="// GetWithCrossRefs"
  endMarker="// END GetWithCrossRefs"
  language="js"
/>

</TabItem>

<TabItem value="go" label="Go">
<FilteredTextBlock
  text={GoCodeInfo.content}
  path={GoCodeInfo.path}
  startMarker="// START GetWithCrossRefs"
  endMarker="// END GetWithCrossRefs"
  language="go"
/>
</TabItem>

<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
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

## Retrieve metadata values

You can specify metadata fields to be returned.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeInfo.content}
  path={PyCodeInfo.path}
  startMarker="# GetWithMetadataPython"
  endMarker="# END GetWithMetadataPython"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python Client v3">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# GetWithMetadataPython"
  endMarker="# END GetWithMetadataPython"
  language="py"
/>

</TabItem>
<TabItem value="js" label="JS/TS Client v3">

<FilteredTextBlock
  text={TSCodeInfo.content}
  path={TSCodeInfo.path}
  startMarker="// GetWithMetadataJS"
  endMarker="// END GetWithMetadataJS"
  language="js"
/>

</TabItem>

<TabItem value="js2" label="JS/TS Client v2">

<FilteredTextBlock
  text={TSCodeLegacyInfo.content}
  path={TSCodeLegacyInfo.path}
  startMarker="// GetWithMetadataJS"
  endMarker="// END GetWithMetadataJS"
  language="js"
/>

</TabItem>

<TabItem value="go" label="Go">
<FilteredTextBlock
  text={GoCodeInfo.content}
  path={GoCodeInfo.path}
  startMarker="// START GetWithMetadata"
  endMarker="// END GetWithMetadata"
  language="go"
/>
</TabItem>

<TabItem value="java" label="Java">
<FilteredTextBlock
  text={JavaCodeInfo.content}
  path={JavaCodeInfo.path}
  startMarker="// START GetWithMetadata"
  endMarker="// END GetWithMetadata"
  language="java"
/>
</TabItem>

<TabItem value="graphql" label="GraphQL">

<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# GetWithMetadataGraphQL"
  endMarker="# END GetWithMetadataGraphQL"
  language="graphql"
/>

</TabItem>
</Tabs>

For a comprehensive list of metadata fields, see [GraphQL: Additional properties](../api/graphql/additional-properties.md).


## Multi-tenancy

If [multi-tenancy](../concepts/data.md#multi-tenancy) is enabled, specify the tenant parameter in each query.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeInfo.content}
  path={PyCodeInfo.path}
  startMarker="# MultiTenancy"
  endMarker="# END MultiTenancy"
  language="py"
/>
</TabItem>

<TabItem value="py3" label="Python Client v3">
<FilteredTextBlock
  text={PyCodeV3Info.content}
  path={PyCodeV3Info.path}
  startMarker="# MultiTenancy"
  endMarker="# END MultiTenancy"
  language="py"
 />
</TabItem>

<TabItem value="js" label="JS/TS Client v3">
<FilteredTextBlock
  text={TSCodeInfo.content}
  path={TSCodeInfo.path}
  startMarker="// MultiTenancy"
  endMarker="// END MultiTenancy"
  language="js"
/>
</TabItem>

<TabItem value="js2" label="JS/TS Client v2">
<FilteredTextBlock
  text={TSCodeLegacyInfo.content}
  path={TSCodeLegacyInfo.path}
  startMarker="// MultiTenancy"
  endMarker="// END MultiTenancy"
  language="js"
/>
</TabItem>

<TabItem value="go" label="Go">
<FilteredTextBlock
  text={GoCodeInfo.content}
  path={GoCodeInfo.path}
  startMarker="// START MultiTenancy"
  endMarker="// END MultiTenancy"
  language="go"
/>
</TabItem>

<TabItem value="java" label="Java">
<FilteredTextBlock
  text={JavaCodeInfo.content}
  path={JavaCodeInfo.path}
  startMarker="// START MultiTenancy"
  endMarker="// END MultiTenancy"
  language="java"
/>
</TabItem>


</Tabs>

## Replication

For collections with replication enabled, you can specify the consistency level in your queries. This applies to CRUD queries as well as searches.

import QueryReplication from '/_includes/code/replication.get.object.by.id.mdx';

<QueryReplication/>

## Related pages

- [Connect to Weaviate](/developers/weaviate/connections)
- [API References: GraphQL: Get](../api/graphql/get.md)
- For tutorials, see [Queries](/developers/weaviate/tutorials/query.md)
- For search using the GraphQL API, see [GraphQL API](../api/graphql/get.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
