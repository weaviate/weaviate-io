---
title: Vector similarity search
sidebar_position: 20
image: og/docs/howto.jpg
# tags: ['how to', 'similarity search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/search.similarity.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/search.similarity-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/search.similarity.ts';
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/search.similarity-v2.ts';
import GoCode from '!!raw-loader!/_includes/code/howto/go/docs/mainpkg/search-similarity_test.go';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/search/VectorSearchTest.java';

Vector search returns the objects with most similar vectors to that of the query.

## Search with text

Use the [`Near Text`](../api/graphql/search-operators.md#neartext) operator to find objects with the nearest vector to an input text.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearTextPython"
      endMarker="# END GetNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetNearText"
      endMarker="// END GetNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GetNearText"
      endMarker="// END GetNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GetNearText"
      endMarker="// END GetNearText"
      language="gonew"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START GetNearText"
      endMarker="// END GetNearText"
      language="java"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearTextGraphql"
      endMarker="# END GetNearTextGraphql"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# START Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>

## Search with image

import ImgSrchPyCode from '!!raw-loader!/_includes/code/howto/search.image.py';
import ImgSrchPyCodeV3 from '!!raw-loader!/_includes/code/howto/search.image-v3.py';
import ImgSrchTSCode from '!!raw-loader!/_includes/code/howto/search.image.ts';
import ImgSrchTSCodeLegacy from '!!raw-loader!/_includes/code/howto/search.image-v2.ts';


Use the [`Near Image`](../api/graphql/search-operators.md#nearimage) operator to find objects with the nearest vector to an image.<br/>
This example uses a base64 representation of an image.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={ImgSrchPyCode}
      startMarker="# START search with base64"
      endMarker="# END search with base64"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={ImgSrchPyCodeV3}
      startMarker="# START search with base64"
      endMarker="# END search with base64"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={ImgSrchTSCode}
      startMarker="// START search with base64"
      endMarker="// END search with base64"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={ImgSrchTSCodeLegacy}
      startMarker="// START search with base64"
      endMarker="// END search with base64"
      language="ts"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START search with base64"
      endMarker="// END search with base64"
      language="java"
    />
  </TabItem>
</Tabs>

See [Image search](./image.md) for more information.


## Search with an existing object

If you have an object ID, use the [`Near Object`](../api/graphql/search-operators.md#nearobject) operator to find similar objects to that object.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetNearObjectPython"
      endMarker="# END GetNearObjectPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearObjectPython"
      endMarker="# END GetNearObjectPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetNearObject"
      endMarker="// END GetNearObject"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetNearObject"
      endMarker="// END GetNearObject"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GetNearObject"
      endMarker="// END GetNearObject"
      language="gonew"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START GetNearObject"
      endMarker="// END GetNearObject"
      language="java"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START GetNearObjectGraphQL"
      endMarker="# END GetNearObjectGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>
    Additional information
  </summary>
  <div>
    To get the object ID, see [Retrieve the object ID](./basics.md#retrieve-the-object-id).
  </div>
</details>


## Search with a vector

If you have an input vector, use the [`Near Vector`](../api/graphql/search-operators.md#nearvector) operator to find objects with similar vectors

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetNearVectorPython"
      endMarker="# END GetNearVectorPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearVectorPython"
      endMarker="# END GetNearVectorPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetNearVector"
      endMarker="// END GetNearVector"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GetNearVector"
      endMarker="// END GetNearVector"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GetNearVector"
      endMarker="// END GetNearVector"
      language="gonew"
    />

    To run the example, paste the sample test vector into the code sample.

<details>
  <summary>Sample test vector</summary>

    vector := []float32{0.326901312, 0.172652353, 0.574298978, -0.877372618, 0.208563102, 0.534870921, -0.905765693, -0.240794293, 0.2483627, 0.071935073, -0.470612466, 0.899590301, 0.821722525, 0.771190126, -0.729547086, -0.891606557, 0.304722712, -0.299226525, 0.400798778, -0.438221959, 0.84784485, 0.229913025, 0.072704543, 0.754321192, -0.019145501, -0.894141594, -0.994515521, -0.593096071, -0.42883483, 0.24194537, 0.620309746, 0.632115028, 0.588728611, 0.097637792, 0.778057433, 0.218009849, -0.967106101, 0.53489523, -0.41595204, 0.242416186, -0.947618483, -0.521548494, 0.22066765, 0.656955091, -0.937464798, 0.513341425, 0.578846678, 0.249978376, -0.085722009, -0.03557413, 0.943261393, 0.085512458, -0.125636201, 0.554060472, 0.485368427, -0.645984772, 0.756222985, -0.099291789, -0.590909311, 0.233526122, 0.085346719, -0.879696717, -0.5351979, -0.959582549, 0.160636781, -0.505745761, 0.597447967, 0.637738272, -0.7560195, -0.203242247, -0.14202656, 0.0531654, -0.256164061, -0.788468035, 0.687289393, -0.361320829, -0.454431255, -0.056878361, -0.24120844, -0.559818319, -0.260802008, -0.391211829, 0.941519464, 0.427640945, -0.747279873, 0.156631127, 0.283531662, -0.567472453, -0.056855298, 0.376830341, 0.24340912, 0.203539024, -0.472871161, 0.148073935, -0.205732037, -0.113967997, 0.744806131, -0.716108348, -0.121028453, -0.260367162, 0.799248419, 0.693572742, -0.791924921, -0.23802225, 0.61424365, -0.227275991, 0.288018577, 0.43869821, -0.054773369, 0.235872433, 0.150168526, -0.148419033, -0.42652761, 0.708727207, 0.084139137, -0.72887396, -0.218030612, 0.107339953, -0.518407575, 0.835435492, 0.035034357, -0.941809022, 0.787348994, 0.563871276, 0.766441516, -0.027821565, 0.245867777, 0.667148957, 0.738303557, -0.891110299, -0.275965165, -0.768567633, -0.475590831, 0.814911332, -0.297372689, 0.278844884, 0.95130689, 0.637530377, 0.618917313, 0.175740276, -0.249863627, -0.293828547, 0.320150997, -0.197713784, -0.633765065, -0.810942827, 0.591293734, 0.388968601, 0.523304585, -0.171063703, 0.602972529, -0.450091234, 0.345062519, -0.716491932, 0.435084962, -0.991825804, 0.689999161, -0.137097366, -0.537270475, -0.14424947, -0.62181862, 0.44289108, 0.072616733, 0.114381466, -0.972054206, 0.597329412, 0.562940173, 0.549476569, -0.706469709, 0.978081921, 0.180978079, 0.162027999, 0.788607827, -0.267257907, 0.985984986, -0.563312619, -0.640888755, 0.462486684, 0.369103705, 0.650806096, -0.167334677, 0.607351556, 0.822088516, 0.796317805, -0.503272355, -0.251183198, -0.171193987, 0.022293507, 0.428948271, 0.130966005, -0.736595944, 0.304682365, 0.663292867, -0.198997943, 0.035542683, 0.118594925, -0.509118134, 0.169740121, 0.375104805, -0.379886464, -0.498633816, -0.704396843, 0.030748626, 0.944446866, 0.888355185, -0.652586251, -0.906279254, 0.926259459, -0.214344492, 0.322871291, -0.027617198, 0.20895568, 0.035279297, -0.969237773, 0.403299676, 0.428694059, 0.829344779, 0.691959507, 0.383265745, -0.782718812, 0.775060865, -0.779937498, 0.584385461, -0.459012881, 0.662861143, 0.678415842, -0.127245162, -0.634464935, 0.646265039, -0.192781253, 0.950300755, 0.211855294, -0.503585688, 0.836612346, 0.787168113, 0.865806113, 0.38960291, 0.8664508, -0.572625523, 0.56761092, -0.735380506, -0.095070433, -0.783564692, -0.208375599, 0.739675191, 0.073271624, 0.359469611, 0.227572188, 0.03146414, 0.22938932, -0.447168816, 0.997660781, 0.215311392, -0.431177845, 0.016089255, 0.502448595, -0.705274029, -0.289382977, -0.577193696, 0.966175471, -0.510154942, -0.95823724, 0.24204605, 0.365546465, -0.297344885, 0.236294365, 0.446028631, 0.117976098, 0.094099994, 0.260277337, -0.461409164, -0.375480325, -0.614179681, -0.392757615, 0.100161621, -0.814176208, -0.347271514, 0.592469245, -0.988247355, -0.158397473, 0.921216369, -0.962889718, -0.932866744, 0.414358528, 0.12841629, -0.676515076, 0.940077931, -0.434330301, -0.2041959, 0.139998128, -0.937367769, -0.65941309, -0.716202446, -0.707964147, -0.389402878, 0.758786102, 0.543653384, -0.151055143, 0.406115293, -0.667719031, -0.811399948, 0.221955265, -0.493543772, 0.342954834, 0.327300923, -0.19955993, 0.752914123, -0.170643372, -0.14423466, 0.034084297, -0.855779749, 0.741368546, 0.240861775, -0.341099861, -0.6478463, 0.548267419, 0.409670736, 0.995208265, 0.807107939, -0.585172449, 0.163887551, 0.97695251, 0.575339181, -0.569841278, 0.675494554, -0.471893576, -0.030140821, -0.05243822, 0.050174597, -0.412903213, -0.683965383, 0.334143696, 0.421115564, 0.175047935, 0.530304957, 0.304087579, -0.792279648, 0.685567038, -0.803590175, -0.742988649, 0.559471864, -0.720445164, -0.299579897, 0.856260016, -0.181088629, -0.397816074, 0.767682872, 0.738067303, 0.359374803, -0.385285243, -0.038967135, -0.147880482, 0.83122139, -0.446691037, -0.789851962, -0.110046918, -0.468262552, -0.756854501, -0.445852765, 0.978448405, -0.726514778, 0.667864341, 0.74283952, 0.484586568, 0.51334425, 0.819917424, -0.838528257, 0.436940199, -0.448078512, -0.337453429, -0.172542255, 0.17131926, 0.511645199, 0.684561713, 0.486342731, 0.873551862, -0.731099225, -0.753154103, -0.236784718, -0.65032768, -0.239905204, -0.803154248, -0.640516296, 0.855964698, -0.416501359, 0.630052995}
</details>

  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START GetNearVector"
      endMarker="// END GetNearVector"
      language="java"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetNearVectorGraphQL"
      endMarker="# END GetNearVectorGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Named vectors

:::info Added in `v1.24`
:::

To search a collection that has [named vectors](../config-refs/schema/multi-vector.md), use the `target vector` field to specify which named vector to search.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# NamedVectorNearTextPython"
      endMarker="# END NamedVectorNearTextPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="gonew"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START NamedVectorNearText"
      endMarker="// END NamedVectorNearText"
      language="java"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# NamedVectorNearTextGraphql"
      endMarker="# END NamedVectorNearTextGraphql"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# START Expected NamedVectorNearText results"
  endMarker="# END Expected NamedVectorNearText results"
  language="json"
/>

</details>

## Set a similarity threshold

To set a similarity threshold between the search and target vectors, define a maximum `distance` (or `certainty`).

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetWithDistancePython"
      endMarker="# END GetWithDistancePython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithDistancePython"
      endMarker="# END GetWithDistancePython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetWithDistance"
      endMarker="// END GetWithDistance"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GetWithDistance"
      endMarker="// END GetWithDistance"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GetWithDistance"
      endMarker="// END GetWithDistance"
      language="gonew"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START GetWithDistance"
      endMarker="// END GetWithDistance"
      language="java"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithDistanceGraphQL"
      endMarker="# END GetWithDistanceGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Additional information</summary>

- The distance value depends on many factors, including the vectorization model you use. Experiment with your data to find a value that works for you.
- [`certainty`](../config-refs/distances.md#distance-vs-certainty) is only available with `cosine` distance.
- To find the least similar objects, use the negative cosine distance with `nearVector` search.

</details>

## `limit` & `offset`

Use `limit` to set a fixed maximum number of objects to return.

Optionally, use `offset` to paginate the results.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetLimitOffsetPython"
      endMarker="# END GetLimitOffsetPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetLimitOffsetPython"
      endMarker="# END GetLimitOffsetPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetLimitOffset"
      endMarker="// END GetLimitOffset"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GetLimitOffset"
      endMarker="// END GetLimitOffset"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GetLimitOffset"
      endMarker="// END GetLimitOffset"
      language="gonew"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START GetLimitOffset"
      endMarker="// END GetLimitOffset"
      language="java"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetLimitOffsetGraphQL"
      endMarker="# END GetLimitOffsetGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

## Limit result groups

To limit results to groups of similar distances to the query, use the [`autocut`](../api/graphql/additional-operators.md#autocut) filter to set the number of groups to return.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START Autocut Python"
      endMarker="# END Autocut Python"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START Autocut Python"
      endMarker="# END Autocut Python"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START Autocut"
      endMarker="// END Autocut"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// START Autocut"
      endMarker="// END Autocut"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START Autocut"
      endMarker="// END Autocut"
      language="gonew"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START Autocut"
      endMarker="// END Autocut"
      language="java"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
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
  text={PyCodeV3}
  startMarker="# START Expected nearText results"
  endMarker="# END Expected nearText results"
  language="json"
/>

</details>

## Group results

Use a property or a cross-reference to group results. To group returned objects, the query must include a `Near` search operator, such as `Near Text` or `Near Object`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetWithGroupbyPython"
      endMarker="# END GetWithGroupbyPython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithGroupbyPython"
      endMarker="# END GetWithGroupbyPython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetWithGroupBy"
      endMarker="// END GetWithGroupBy"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GetWithGroupBy"
      endMarker="// END GetWithGroupBy"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GetWithGroupBy"
      endMarker="// END GetWithGroupBy"
      language="gonew"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START GetWithGroupBy"
      endMarker="// END GetWithGroupBy"
      language="java"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithGroupbyGraphQL"
      endMarker="# END GetWithGroupbyGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected groupBy results"
  endMarker="# END Expected groupBy results"
  language="json"
/>

</details>

## Filter results

For more specific results, use a [`filter`](../api/graphql/filters.md) to narrow your search.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# GetWithWherePython"
      endMarker="# END GetWithWherePython"
      language="python"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithWherePython"
      endMarker="# END GetWithWherePython"
      language="python"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// GetWithFilter"
      endMarker="// END GetWithFilter"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// GetWithFilter"
      endMarker="// END GetWithFilter"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GetWithFilter"
      endMarker="// END GetWithFilter"
      language="gonew"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START GetWithFilter"
      endMarker="// END GetWithFilter"
      language="java"
    />
  </TabItem>

  <TabItem value="graphql" label="GraphQL">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# GetWithWhereGraphQL"
      endMarker="# END GetWithWhereGraphQL"
      language="graphql"
    />
  </TabItem>
</Tabs>

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Expected where results"
  endMarker="# END Expected where results"
  language="json"
/>

</details>

## Related pages

- [Connect to Weaviate](/developers/weaviate/connections/index.mdx)
- For image search, see [Image search](/developers/weaviate/search/image).
- For tutorials, see [Queries](/developers/weaviate/tutorials/query.md).
- For search using the GraphQL API, see [GraphQL API](/developers/weaviate/api/graphql).

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
