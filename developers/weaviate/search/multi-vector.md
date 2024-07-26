---
title: Multiple target vectors
sidebar_position: 50
image: og/docs/howto.jpg
# tags: ['how to', 'hybrid search']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCodeV4 from '!!raw-loader!/_includes/code/howto/search.multi-target-v4.py';
import TSCodeV3 from '!!raw-loader!/_includes/code/howto/search.multi-target-v3.ts';
import GoCode from '!!raw-loader!/_includes/code/howto/search.multi-target.go';

Multiple target vector search uses a single query to search multiple-target vectors. Weaviate searches the target vectors concurrently and automatically combines the results.

## Specify target vector names only

Specify target vectors as a list/array of named vectors. The default join strategy is `minimum`, which means that the search results are sorted by the minimum distance in each query/target vector pair.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# START MultiBasic"
  endMarker="# END MultiBasic"
  language="python"
/>
</TabItem>
<TabItem value="ts" label="JS/TS Client v3">
<FilteredTextBlock
  text={TSCodeV3}
  startMarker="// START MultiBasic"
  endMarker="// END MultiBasic"
  language="js"
/>
</TabItem>
<TabItem value="go" label="Go">
<FilteredTextBlock
  text={GoCode}
  startMarker="// START MultiBasic"
  endMarker="// END MultiBasic"
  language="python"
/>
<details>
  <summary>Complete code</summary>
<FilteredTextBlock
  text={GoCode}
  startMarker="// START BasicFull"
  endMarker="// END BasicFull"
  language="python"
/>
</details>
</TabItem>
</Tabs>

## Specify query vectors

Specify query vectors as a dictionary/map of names and vectors.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# START MultiTargetNearVector"
  endMarker="# END MultiTargetNearVector"
  language="python"
/>
</TabItem>
<TabItem value="ts" label="JS/TS Client v3">
<FilteredTextBlock
  text={TSCodeV3}
  startMarker="// START MultiWeights"
  endMarker="// END MultiWeights"
  language="python"
/>
</TabItem>
</Tabs>

You can also specify the query vectors as a list/array of vectors. In this case, they will be parsed according to the order of the specified target vectors.

## Specify target vector names & join strategy

Specify target vectors as a list/array of named vectors and how to join the result sets.

The `sum`, `average`, `minimum` join strategies simply require the name of the strategy and the target vectors.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# START MultiTargetWithSimpleJoin"
  endMarker="# END MultiTargetWithSimpleJoin"
  language="python"
/>
</TabItem>
</Tabs>

## Weight raw vector distances

Search by sums of weighted, **raw** distances to each target vector.

<details>
  <summary>The weighting in detail</summary>

Each distance between the query vector and the target vector is multiplied by the specified weight, then the resulting weighted distances are summed for each object to produce a weighted distance. The search results are sorted by the weighted distance.

</details>

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# START MultiTargetManualWeights"
  endMarker="# END MultiTargetManualWeights"
  language="python"
/>
</TabItem>
</Tabs>

## Weight normalized vector distances

Search by sums of weighted, **normalized** distances to each target vector.

<details>
  <summary>The weighting in detail</summary>

Each distance is normalized against other results for that target vector. Each normalized distance between the query vector and the target vector is multiplied by the specified weight, then the resulting weighted distances are summed for each object to produce a weighted distance. The search results are sorted by the weighted distance.

</details>

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# START MultiTargetRelativeScore"
  endMarker="# END MultiTargetRelativeScore"
  language="python"
/>
</TabItem>
</Tabs>

## Combining search results

Each multi-target vector search is composed of multiple single-target vector searches. The search results are combined based on the join strategy. The join strategy determines how the distances between the query vector and the target vectors are combined to produce a single distance score.

- If an object is missing any of the target vectors, it will not be included in the search results.
- If an object is within search limit or distance threshold of any of the target vectors, it will be included in the search results.

If an object doesn't have all of the target vectors, Weaviate ignores that object and does not include it in the search results.

### Available join strategies.

These are the available join strategies:

- **minimum** Use the minimum of the vector distances.
- **sum** Use the sum of the vector distances.
- **average** Use the average of the vector distances.
- **manual weights** Adjust the weight of each distance by a set value.
- **relative score** Adjust the relative contribution of each target vector to the distance score.

## Related pages

- [Connect to Weaviate](/developers/weaviate/connections/index.mdx)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
