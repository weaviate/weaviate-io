---
title: Product Quantization
sidebar_position: 15
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'pq']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/configure.pq-compression.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/configure.pq-compression-v3.py';
import TSCodeAutoPQ from '!!raw-loader!/_includes/code/howto/configure.pq-compression.autopq.ts';
import TSCodeManualPQ from '!!raw-loader!/_includes/code/howto/configure.pq-compression.manual.ts';
import TSCodeLegacy from '!!raw-loader!/_includes/code/howto/configure.pq-compression-v2.ts';
import GoCode from '!!raw-loader!/_includes/code/howto/configure.pq-compression.go';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/pq-compression.java';

:::note
Starting in v1.23, AutoPQ simplifies configuring PQ on new collections.
:::

import PQOverview from '/_includes/pq-compression/overview-text.mdx' ;

<PQOverview />

import PQTradeoffs from '/_includes/pq-compression/tradeoffs.mdx' ;

<PQTradeoffs />

To configure HNSW, see [Configuration: Vector index](../config-refs/schema/vector-index.md) .

## Enable PQ compression

PQ is configured at a collection level. There are two ways to enable PQ compression:

- [Use AutoPQ to enable PQ compression](./pq-compression.md#configure-autopq).
- [Manually enable PQ compression](./pq-compression.md#manually-configure-pq).

## Configure AutoPQ

:::info Added in v1.23.0
:::

For new collections, use AutoPQ. AutoPQ automates triggering of the PQ training step based on the size of the collection.

### 1. Set the environment variable

AutoPQ requires asynchronous indexing.

- **Open-source Weaviate users**: To enable AutoPQ, set the environment variable `ASYNC_INDEXING=true` and restart your Weaviate instance.
- [**Weaviate Cloud (WCD)**](https://console.weaviate.cloud/) users: Enable async indexing through the WCD Console and restart your Weaviate instance.


### 2. Configure PQ

Specify PQ settings for each collection for which it is to be enabled.

For additional configuration options, see the [PQ parameters](./pq-compression.md#pq-parameters).

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
     <FilteredTextBlock
       text={PyCode}
       startMarker="# START CollectionWithAutoPQ"
       endMarker="# END CollectionWithAutoPQ"
       language="py"
     />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
     <FilteredTextBlock
       text={PyCodeV3}
       startMarker="# START CollectionWithAutoPQ"
       endMarker="# END CollectionWithAutoPQ"
       language="py"
     />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
     <FilteredTextBlock
       text={TSCodeAutoPQ}
       startMarker="// START CollectionWithAutoPQ"
       endMarker="// END CollectionWithAutoPQ"
       language="ts"
     />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
     <FilteredTextBlock
       text={TSCodeLegacy}
       startMarker="// START CollectionWithAutoPQ"
       endMarker="// END CollectionWithAutoPQ"
       language="ts"
     />
  </TabItem>

</Tabs>

### 3. Load your data

Load your data. You do not have to load an initial set of training data.

AutoPQ creates the PQ codebook when the object count reaches the training limit. By default, the training limit is 100,000 objects per shard.

## Manually configure PQ

As an alternative to AutoPQ, you can also manually enable PQ on an existing collection. Upon enabling PQ, Weaviate will train the PQ codebook, using the pre-loaded set of objects.

To manually enable PQ, follow these steps:

- Phase One: Create a codebook

    - [Configure an initial schema without PQ](./pq-compression.md#1-configure-an-initial-schema-without-pq)
    - [Load some training data](./pq-compression.md#2-load-training-data)
    - [Enable and train PQ](./pq-compression.md#3-enable-pq-and-create-the-codebook)

- Phase Two: Load the rest of your data

    - [Load the rest of your data](./pq-compression.md#4-load-the-rest-of-your-data)

:::tip How large should the training set be?
When PQ is enabled, Weaviate uses the smaller of training limit or the collection object count to train PQ.

We recommend importing a set of 10,000 to 100,000 training objects per shard before you enable PQ.
:::

:::note
Weaviate [logs messages](#check-the-system-logs) when PQ is enabled and when vector compression is complete. Do not import the rest of your data until the training step is complete.
:::

The next few sections work through these steps.

### 1. Configure an initial schema without PQ

[Create a collection](../manage-data/collections.mdx#create-a-collection) without specifying a quantizer.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
     <FilteredTextBlock
       text={PyCode}
       startMarker="# START InitialSchema"
       endMarker="# END InitialSchema"
       language="py"
     />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
     <FilteredTextBlock
       text={PyCodeV3}
       startMarker="# START InitialSchema"
       endMarker="# END InitialSchema"
       language="py"
     />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
     <FilteredTextBlock
       text={TSCodeManualPQ}
       startMarker="// START InitClassDef"
       endMarker="// END InitClassDef"
       language="ts"
     />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
     <FilteredTextBlock
       text={TSCodeLegacy}
       startMarker="// START InitClassDef"
       endMarker="// END InitClassDef"
       language="ts"
     />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START InitialSchema"
      endMarker="// END InitialSchema"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START InitialSchema"
      endMarker="// END InitialSchema"
      language="java"
    />
  </TabItem>
</Tabs>

### 2. Load training data

[Add objects](../manage-data/import.mdx) that will be used to train PQ. Weaviate will use the greater of the training limit, or the collection size, to train PQ.

We recommend loading a representative sample such that the trained centroids are representative of the entire dataset.

<!-- TODO (Note added Apr 2024) - Remove the commented out code below on/after June 2024 if no complaints -->
<!-- <details>

  <summary>
    Download sample data
  </summary>

  <div>
    Use these scripts to get the data for these examples. If you are configuring your own system, you do not need to import this sample data.
  </div>

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
      <FilteredTextBlock
        text={PyCode}
        startMarker="# START DownloadData"
        endMarker="# END DownloadData"
        language="py"
      />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
      <FilteredTextBlock
        text={PyCodeV3}
        startMarker="# START DownloadData"
        endMarker="# END DownloadData"
        language="py"
      />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v2">
      <FilteredTextBlock
        text={TSCodeLegacy}
        startMarker="// START FetchData"
        endMarker="// END FetchData"
        language="ts"
      />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START DownloadData"
      endMarker="// END DownloadData"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START DownloadData"
      endMarker="// END DownloadData"
      language="java"
    />
  </TabItem>
</Tabs>

</details>

<details>

  <summary>
    Add data
  </summary>

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
     <FilteredTextBlock
       text={PyCode}
       startMarker="# START LoadData"
       endMarker="# END LoadData"
       language="py"
     />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
     <FilteredTextBlock
       text={PyCodeV3}
       startMarker="# START LoadData"
       endMarker="# END LoadData"
       language="py"
     />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v2">
     <FilteredTextBlock
       text={TSCodeLegacy}
       startMarker="// START LoadData"
       endMarker="// END LoadData"
       language="ts"
     />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START LoadData"
      endMarker="// END LoadData"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START LoadData"
      endMarker="// END LoadData"
      language="java"
    />
  </TabItem>
</Tabs>

</details> -->

### 3. Enable PQ and create the codebook

Update your collection definition to enable PQ. Once PQ is enabled, Weaviate trains the codebook using the training data.

:::info Which objects are used for training?
- If the collection has more objects than the training limit, Weaviate randomly selects objects from the collection to train the codebook.
- If the collection has fewer objects than the training limit, Weaviate uses all objects in the collection to train the codebook.
:::

import PQMakesCodebook from '/_includes/pq-compression/makes-a-codebook.mdx' ;

<PQMakesCodebook />

To enable PQ, update your schema as shown below. For additional configuration options, see the [PQ parameter table](./pq-compression.md#pq-parameters).

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
     <FilteredTextBlock
       text={PyCode}
       startMarker="# START UpdateSchema"
       endMarker="# END UpdateSchema"
       language="py"
     />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
     <FilteredTextBlock
       text={PyCodeV3}
       startMarker="# START UpdateSchema"
       endMarker="# END UpdateSchema"
       language="py"
     />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
     <FilteredTextBlock
       text={TSCodeManualPQ}
       startMarker="// START UpdateSchema"
       endMarker="// END UpdateSchema"
       language="ts"
     />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
     <FilteredTextBlock
       text={TSCodeLegacy}
       startMarker="// START UpdateSchema"
       endMarker="// END UpdateSchema"
       language="ts"
     />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START UpdateSchema"
      endMarker="// END UpdateSchema"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START UpdateSchema"
      endMarker="// END UpdateSchema"
      language="java"
    />
  </TabItem>
</Tabs>

### 4. Load the rest of your data

Once the [codebook has been trained](#enable-pq-and-create-the-codebook), you may continue to add data as per normal. Weaviate compresses the new data when it adds it to the database.

If you already have data in your Weaviate instance when you create the codebook, Weaviate automatically compresses the remaining objects (the ones after the initial training set).

## PQ Parameters

You can configure PQ compression by setting the following parameters at the collection level.

import PQParameters from '/_includes/pq-compression/parameters.mdx' ;

<PQParameters />


## Additional tools and considerations

### Change the codebook training limit

For most use cases, 100,000 objects is an optimal training size. There is little benefit to increasing `trainingLimit`. If you do increase `trainingLimit`, the training period will take longer. You could also have memory problems if you set a high `trainingLimit`.

If you have a small dataset and wish to enable compression, consider using [binary quantization (BQ)](./bq-compression.md). BQ is a simpler compression method that does not require training.

### Check the system logs

When compression is enabled, Weaviate logs diagnostic messages like these.

```bash
pq-conf-demo-1  | {"action":"compress","level":"info","msg":"switching to compressed vectors","time":"2023-11-13T21:10:52Z"}

pq-conf-demo-1  | {"action":"compress","level":"info","msg":"vector compression complete","time":"2023-11-13T21:10:53Z"}
```

If you use `docker-compose` to run Weaviate, you can get the logs on the system console.

```bash
docker compose logs -f --tail 10 weaviate
```

You can also view the log file directly. Check `docker` to get the file location.

```bash
docker inspect --format='{{.LogPath}}' <your-weaviate-container-id>
```

### Review the current `pq` configuration

To review the current `pq` configuration, you can retrieve it as shown below.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GetSchema"
      endMarker="# END GetSchema"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python Client v3">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START GetSchema"
      endMarker="# END GetSchema"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    <FilteredTextBlock
      text={TSCodeManualPQ}
      startMarker="// START ViewConfig"
      endMarker="// END ViewConfig"
      language="ts"
    />
  </TabItem>

  <TabItem value="js2" label="JS/TS Client v2">
    <FilteredTextBlock
      text={TSCodeLegacy}
      startMarker="// START GetSchema"
      endMarker="// END GetSchema"
      language="ts"
    />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START GetSchema"
      endMarker="// END GetSchema"
      language="go"
    />
  </TabItem>

  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START GetSchema"
      endMarker="// END GetSchema"
      language="java"
    />
  </TabItem>
</Tabs>

## Multiple vectors

import MultiVectorSupport from '/_includes/multi-vector-support.mdx';

<MultiVectorSupport />

Similarly, compression must be enabled independently for each vector. The procedure varies slightly by client language, but in each case the idea is the same. Each vector is independent and can use [PQ](/weaviate/configuration/compression/pq-compression.md), [BQ](/weaviate/configuration/compression/bq-compression.md), or no compression.

## Related pages
- [Configuration: Vector index](../config-refs/schema/vector-index.md)
- [Concepts: Vector index](../concepts/vector-index.md)
- [Concepts: Vector quantization](../concepts/vector-quantization.md)
- [Tutorial: Schema](/developers/weaviate/starter-guides/schema)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
