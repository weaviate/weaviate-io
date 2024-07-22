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

`Multi target vector search` uses a single query to search multiple target vectors. The results are combined automatically.

Weaviate searches the target vectors concurrently for fast response times.

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

## Different objects in results for different targetvectors

Let's say we have 1000 objects with 2 target vectors. A user does a search with a limit of 20.

Both target vectors will have different objects in their results. If we combine distances from different searches, objects that are only present in one of the result list, will have a lower overall distance.

As a solution, the vector distances for objects that are not in the result list for a given target vector a fetched after the vector search, which ensures that all objects and their distances are present.

If an object has no vector for a given targetvector it will be ignored for the search. We might want to make this configurable in the future.

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
