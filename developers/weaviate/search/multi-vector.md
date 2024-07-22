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

`Multi target vector search` uses a single query to search multiple target vectors. The results are combined automatically. Weaviate searches the target vectors concurrently.

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

</details>

## Combine results

Vector similarity is a measure of the distance between two vectors. Single vector searches return the vectors with the least distance between the query vector and the target vector.

It is more complicated to determine the set of result vectors with the least difference when you search multiple target vectors.

Each target vector returns a set of limited number of potential results. The sets that are returned might not overlap completely. A "missing" vector has a smaller distance and can skew the search results. To prevent misleading results, Weaviate fetches any missing vectors to align the lists of result vectors.

If an object doesn't have all of the target vectors, Weaviate ignores that object and does not include it in the search results.

## How to handle different vectorizers

Different vectorizers do not necessarily have distances that are compatible with each other, which makes combining them difficult.

There is no way to automatically handle this so it is left to the user to make a decision about how to combine them. There are two sensible ways to handle this situation:

- manual weights for each target vector to adjust how much each target vector affects the final score

## Multi target vector search

Search multiple target vectors at the same time.

<Tabs groupId="languages">
<TabItem value="py" label="Python Client v4">
<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# START MultiBasicPython"
  endMarker="# END MultiBasicPython"
  language="python"
/>
</TabItem>
</Tabs>

## Related pages

- [Connect to Weaviate](/developers/weaviate/connections/index.mdx)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
