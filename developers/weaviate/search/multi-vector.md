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

Multiple target vector search uses a single query to search multiple-target vectors. Weaviate searches the target vectors concurrently and automatically combines the results.

## Create the example collection

The examples on this page use the `Jeopardy_Tiny_Dataset` collection. To create a local copy of the example collection, run this code.

The example code uses OpenAI to vectorize the sample data. To use a different vectorizer, or to use multiple vectorizers, edit the `wvc.config.Configure.NamedVectors` configuration.

<details>
  <summary>Create sample collection.</summary>

<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# START LoadDataNamedVectors"
  endMarker="# END LoadDataNamedVectors"
  language="py"
/>
<FilteredTextBlock
  text={TSCodeV3}
  startMarker="// START LoadDataNamedVectors"
  endMarker="// END LoadDataNamedVectors"
  language="ts"
/>
</details>

## Multiple-target vector search

Search multiple-target vectors at the same time.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# START MultiBasic"
  endMarker="# END MultiBasic"
  language="python"
/>
</TabItem>
</Tabs>

## Adjust target vector weight

Set the weight of each target vector. The weights modify the calculation that [merges the results.](#compare-different-vectorizers).

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# START MultiWeights"
  endMarker="# END MultiWeights"
  language="python"
/>
</TabItem>
</Tabs>

## Considerations

This section discusses considerations that distinguish multiple-target vector searches from single-target vector searches.

### Combine result sets

Vector similarity is a measure of the distance between two vectors. Single vector searches return the vectors with the least distance between the query vector and the target vector.

It is more complicated to determine the set of result vectors with the least difference when you search multiple-target vectors.

Each target vector returns a set of limited number of potential results. The sets that are returned might not overlap completely. A "missing" vector has a smaller distance and can skew the search results. To prevent misleading results, Weaviate fetches any missing vectors to align the lists of result vectors.

If an object doesn't have all of the target vectors, Weaviate ignores that object and does not include it in the search results.

### Compare different vectorizers

Each vectorizer creates it's own object representation. These differences make it difficult to calculate vector distances between representations.

Set weights to adjust the relative value of each target vector in the overall result. These are the available fusion methods:

- **sum** Use the sum of the vector distances.
- **average** Use the average of the vector distances.
- **manual weights** Adjust the weight of each distance by a set value.
- **relative score** Adjust the relative contribution of each target vector to the distance score.

```python
collection.query.near_text(
  "a_query_string",
  target_vector=wvc.query.TargetVectors.manual_weights{"vector_one": 0.1, "vector_two": 0.5}
  )
```

## Related pages

- [Connect to Weaviate](/developers/weaviate/connections/index.mdx)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
