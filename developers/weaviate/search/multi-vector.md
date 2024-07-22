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

<details>
  <summary>Example response</summary>

The output is like this:

<FilteredTextBlock
  text={PyCodeV4}
  startMarker="# Expected HybridBasic results"
  endMarker="# END Expected HybridBasic results"
  language="json"
/>

</details>

## Create the example collection

The examples on this page use the `Named_Vector_Jeopardy_Collection`. To create a local copy of the example collection, run this code.

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

## Related pages

- [Connect to Weaviate](/developers/weaviate/connections/index.mdx)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
