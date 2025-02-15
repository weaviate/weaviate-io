---
title: Choose a model
sidebar_label: Choose a model
sidebar_position: 2
image: og/wcs/user_guides.jpg
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/developers/weaviate/model-providers/\_includes/provider.vectorizer.py';
import TSCode from '!!raw-loader!/developers/weaviate/model-providers/\_includes/provider.vectorizer.ts';
import GoCode from '!!raw-loader!/\_includes/code/howto/go/docs/model-providers/2-usage-text/main.go';
import JavaCode from '!!raw-loader!/\_includes/code/howto/java/src/test/java/io/weaviate/docs/model_providers/UsageWeaviateTextEmbeddings.java';
import JavaCode2 from '!!raw-loader!/\_includes/code/howto/java/src/test/java/io/weaviate/docs/model_providers/UsageWeaviateTextEmbeddingsArcticEmbedLV20.java';
import JavaImportQueries from '!!raw-loader!/\_includes/code/howto/java/src/test/java/io/weaviate/docs/model_providers/ImportAndQueries.java';

On this page, you can find a list of pre-trained models designed specifically for enterprise retrieval tasks in English. Additional models and features will be added in the future, so please check back regularly for updates.

## Available models

The following models are available for use with Weaviate Embeddings:

- **[`Snowflake/snowflake-arctic-embed-m-v1.5`](#snowflake-arctic-embed-m-v1.5)**
- **[`Snowflake/snowflake-arctic-embed-l-v2.0`](#snowflake-arctic-embed-l-v2.0)**

### `Snowflake/snowflake-arctic-embed-m-v1.5` (default) {#snowflake-arctic-embed-m-v1.5}

- A 109M parameter, 768-dimensional model for enterprise retrieval tasks in English.
- Trained with Matryoshka Representation Learning to allow vector truncation with minimal loss.
- Quantization-friendly: Using scalar quantization and 256 dimensions provides 99% of unquantized, full-precision performance.
- Read more at the [Snowflake blog](https://www.snowflake.com/engineering-blog/arctic-embed-m-v1-5-enterprise-retrieval/), and the Hugging Face [model card](https://huggingface.co/Snowflake/snowflake-arctic-embed-m-v1.5)
- Allowable `dimensions`: 768 (default), 256

:::info Input truncation
Currently, input exceeding the model's context windows is truncated from the right (i.e. the end of the input).
:::

#### Parameters

- `model` (optional): The name of the model to use for embedding generation.
- `dimensions` (optional): The number of dimensions to use for the generated embeddings. Only available for models that support Matryoshka Representation Learning.
- `base_url` (optional): The base URL for the Weaviate Embeddings service. (Not required in most cases.)

The following examples show how to configure Weaviate Embeddings-specific options.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START SnowflakeArcticEmbedMV15"
      endMarker="# END SnowflakeArcticEmbedMV15"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START SnowflakeArcticEmbedMV15"
      endMarker="// END SnowflakeArcticEmbedMV15"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START SnowflakeArcticEmbedMV15"
      endMarker="// END SnowflakeArcticEmbedMV15"
      language="goraw"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START SnowflakeArcticEmbedMV15"
      endMarker="// END SnowflakeArcticEmbedMV15"
      language="java"
    />
  </TabItem>

</Tabs>

### `Snowflake/snowflake-arctic-embed-l-v2.0` {#snowflake-arctic-embed-l-v2.0}

- A 568M parameter, 1024-dimensional model for multilingual enterprise retrieval tasks.
- Trained with Matryoshka Representation Learning to allow vector truncation with minimal loss.
- Quantization-friendly: Using scalar quantization and 256 dimensions provides 99% of unquantized, full-precision performance.
- Read more at the [Snowflake blog](https://huggingface.co/Snowflake/snowflake-arctic-embed-l-v2.0), and the Hugging Face [model card](https://huggingface.co/Snowflake/snowflake-arctic-embed-l-v2.0)
- Allowable `dimensions`: 768 (default), 256

:::info Input truncation
Currently, input exceeding the model's context windows is truncated from the right (i.e. the end of the input).
:::

#### Parameters

- `dimensions` (optional): The number of dimensions to use for the generated embeddings. Only available for models that support Matryoshka Representation Learning.
- `base_url` (optional): The base URL for the Weaviate Embeddings service. (Not required in most cases.)

The following examples show how to configure Weaviate Embeddings-specific options.

<Tabs groupId="languages">
  <TabItem value="py" label="Python API v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START SnowflakeArcticEmbedLV20"
      endMarker="# END SnowflakeArcticEmbedLV20"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS API v3">
    <FilteredTextBlock
      text={TSCode}
      startMarker="// START SnowflakeArcticEmbedLV20"
      endMarker="// END SnowflakeArcticEmbedLV20"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START SnowflakeArcticEmbedLV20"
      endMarker="// END SnowflakeArcticEmbedLV20"
      language="goraw"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode2}
      startMarker="// START SnowflakeArcticEmbedLV20"
      endMarker="// END SnowflakeArcticEmbedLV20"
      language="java"
    />
  </TabItem>

</Tabs>

## Additional resources

- [Weaviate Embeddings: Overview](/developers/wcs/embeddings)
- [Weaviate Embeddings: Quickstart](/developers/wcs/embeddings/quickstart)
- [Weaviate Embeddings: Administration](/developers/wcs/embeddings/administration)
- [Model provider integrations: Weaviate Embeddings](/developers/weaviate/model-providers/weaviate/embeddings)

## Support

import SupportAndTrouble from '/\_includes/wcs/support-and-troubleshoot.mdx';

<SupportAndTrouble />
