---
title: Configure the model
sidebar_position: 2
image: og/wcs/user_guides.jpg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/developers/weaviate/model-providers/_includes/provider.vectorizer.py';
import TSCode from '!!raw-loader!/developers/weaviate/model-providers/_includes/provider.vectorizer.ts';
import GoCode from '!!raw-loader!/_includes/code/howto/go/docs/model-providers/2-usage-text/main.go';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/model_providers/UsageWeaviateTextEmbeddings.java';
import JavaImportQueries from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/model_providers/ImportAndQueries.java';


On this page you can find a list of pre-trained models designed specifically for enterprise retrieval tasks in English. Additional models and features will be added in the future, so please check back regularly for updates.

## Models

The following models are available for use with Weaviate Embeddings:

### `arctic-embed-m-v1.5` (default)

- A 109M parameter, 768-dimensional model for enterprise retrieval tasks in English.
- Trained with Matryoshka Representation Learning to allow vector truncation with minimal loss.
- Quantization-friendly: Using scalar quantization and 256 dimensions provides 99% of unquantized, full-precision performance.
- Read more at the [Snowflake blog](https://www.snowflake.com/engineering-blog/arctic-embed-m-v1-5-enterprise-retrieval/), and the Hugging Face [model card](https://huggingface.co/Snowflake/snowflake-arctic-embed-m-v1.5)
- Allowable `dimensions`: 768 (default), 256

:::info Input truncation
Currently, input exceeding the model's context windows is truncated from the right (i.e. the end of the input).
:::

## Parameters

- `model` (optional): The name of the model to use for embedding generation.
- `dimensions` (optional): The number of dimensions to use for the generated embeddings. Only available for models that support Matryoshka Representation Learning.
- `base_url` (optional): The base URL for the Weaviate Embeddings service. (Not required in most cases.)

The following examples show how to configure Weaviate Embeddings-specific options.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START FullVectorizerWeaviate"
      endMarker="# END FullVectorizerWeaviate"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START FullVectorizerWeaviate"
      endMarker="// END FullVectorizerWeaviate"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START FullVectorizerWeaviate"
      endMarker="// END FullVectorizerWeaviate"
      language="goraw"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START FullVectorizerWeaviate"
      endMarker="// END FullVectorizerWeaviate"
      language="java"
    />
  </TabItem>

</Tabs>
