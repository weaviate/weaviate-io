---
title: PQ vector compression
sidebar_position: 5
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'pq']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/pq-compression.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/pq-compression-v3.py';
import TSCode from '!!raw-loader!/_includes/code/howto/pq-compression.ts';
import JavaCode from '!!raw-loader!/_includes/code/howto/java/src/test/java/io/weaviate/docs/pq-compression.java';
import GoCode from '!!raw-loader!/_includes/code/howto/pq-compression.go';

# PQ vector compression

:::note
Starting in v1.23, AutoPQ simplifies configuring PQ on new collections.
:::

import PQOverview from '/_includes/pq-compression/overview-text.mdx' ;

<PQOverview />

import PQTradeoffs from '/_includes/pq-compression/tradeoffs.mdx' ;

<PQTradeoffs />

To configure HNSW, see [Configuration: Indexes](/developers/weaviate/configuration/indexes) .

## Enable PQ compression

AutoPQ streamlines PQ configuration for new collections. You do not have to load data in two stages. Weaviate creates the codebook for you and then uses it to compress the rest of you vectors. To enable AutoPQ, you must have access the the `ASYNC_INDEXING` system variable. AutoPQ is not currently available in Weaviate Cloud Services (WCS).

If you cannot enable AutoPQ, use the two phase method to enable PQ.

## Configure AutoPQ

:::info Added in v1.23.0
:::

By default Weaviate uses the first 100,000 objects in your database for the training step.

## Two phase configuration method

If you cannot enable AutoPQ, use the two phase configuration method to enable PQ. If you are configuring PQ on a new collection, be sure to import 100,000 objects per shard before enabling PQ. Do not import the rest of your data until the training step is complete.

To enable PQ compression using the two step method, complete the following steps.

- Phase One: Create a codebook

    - [Connect to a Weaviate instance](#step-1-connect-to-a-weaviate-instance)
    - [Configure an initial schema without PQ](#step-2-configure-an-initial-schema-without-pq)
    - [Load some training data](#step-3-load-some-training-data)
    - [Enable and train PQ](#step-4-enable-and-train-pq)

- Phase Two: Load the rest of your data

    - [Load the rest of your data](#step-5-load-the-rest-of-your-data)

The next few sections work through these steps.

### Phase One: Create a codebook

####  Connect to a Weaviate instance

Use one of the Weaviate [client libraries](/developers/weaviate/client-libraries) to connect to your instance.

After you install the client, connect to your instance.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
     <FilteredTextBlock
       text={PyCode}
       startMarker="# START ConnectCode"
       endMarker="# END ConnectCode"
       language="py"
     />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
     <FilteredTextBlock
       text={PyCodeV3}
       startMarker="# START ConnectCode"
       endMarker="# END ConnectCode"
       language="py"
     />
  </TabItem>

  <TabItem value="ts" label="JavaScript/TypeScript">
     <FilteredTextBlock
       text={TSCode}
       startMarker="// START DockerInstantiationExample"
       endMarker="// END DockerInstantiationExample"
       language="ts"
     />
  </TabItem>

  <TabItem value="go" label="Go">
    <FilteredTextBlock
      text={GoCode}
      startMarker="// START ConnectCode"
      endMarker="// END ConnectCode"
      language="go"
    />
  </TabItem>
    
  <TabItem value="java" label="Java">
    <FilteredTextBlock
      text={JavaCode}
      startMarker="// START ConnectCode"
      endMarker="// END ConnectCode"
      language="java"
    />
  </TabItem>
</Tabs>

Weaviate returns `True` if the connection is successful.

#### Configure an initial schema without PQ

Every collection in your Weaviate instance is defined by a [schema](/developers/weaviate/tutorials/schema). Weaviate uses the schema during your initial data load.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
     <FilteredTextBlock
       text={PyCode}
       startMarker="# START InitialSchema"
       endMarker="# END InitialSchema"
       language="py"
     />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
     <FilteredTextBlock
       text={PyCodeV3}
       startMarker="# START InitialSchema"
       endMarker="# END InitialSchema"
       language="py"
     />
  </TabItem>

  <TabItem value="ts" label="JavaScript/TypeScript">
     <FilteredTextBlock
       text={TSCode}
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

#### Load some training data

If you are starting with a new Weaviate instance, you should load between 10,000 and 100,000 objects from your data set. If you have multiple shards, you need to load between 10,000 and 100,000 objects on each shard. If you already have data in your Weaviate instance, you can [move to the next step](/developers/weaviate/configuration/pq-compression#enable-pq-and-create-the-codebook).

When you load data for this training phase, you can use any of the objects in your data set to create the codebook. However, try to chose the objects at random so that they are [independent and identically distributed](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables).

<details>
  <summary>
    Download sample data
  </summary>
  <div>
    Use these scripts to get the data for these examples. If you are configuring your own system, you do not need to import this sample data.

    <Tabs groupId="languages">
      <TabItem value="py" label="Python (v4)">
         <FilteredTextBlock
           text={PyCode}
           startMarker="# START DownloadData"
           endMarker="# END DownloadData"
           language="py"
         />
      </TabItem>

      <TabItem value="py3" label="Python (v3)">
         <FilteredTextBlock
           text={PyCodeV3}
           startMarker="# START DownloadData"
           endMarker="# END DownloadData"
           language="py"
         />
      </TabItem>

      <TabItem value="ts" label="JavaScript/TypeScript">
         <FilteredTextBlock
           text={TSCode}
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
  </div>
</details>

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
     <FilteredTextBlock
       text={PyCode}
       startMarker="# START LoadData"
       endMarker="# END LoadData"
       language="py"
     />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
     <FilteredTextBlock
       text={PyCodeV3}
       startMarker="# START LoadData"
       endMarker="# END LoadData"
       language="py"
     />
  </TabItem>

  <TabItem value="ts" label="JavaScript/TypeScript">
     <FilteredTextBlock
       text={TSCode}
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

#### Enable PQ and create the codebook

To enable PQ compression, update your collection (class) schema. After you update the schema, Weaviate trains PQ on the first 100,000 objects in your database.

import PQMakesCodebook from '/_includes/pq-compression/makes-a-codebook.mdx' ;

<PQMakesCodebook />

To enable PQ, update your schema as shown below. For additional configuration options, see the [parameter table](#pq-parameters).


<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
     <FilteredTextBlock
       text={PyCode}
       startMarker="# START UpdateSchema"
       endMarker="# END UpdateSchema"
       language="py"
     />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
     <FilteredTextBlock
       text={PyCodeV3}
       startMarker="# START UpdateSchema"
       endMarker="# END UpdateSchema"
       language="py"
     />
  </TabItem>

  <TabItem value="ts" label="JavaScript/TypeScript">
     <FilteredTextBlock
       text={TSCode}
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

### Phase Two: Load the rest of your data

If you are starting with a new Weaviate instance, you can load the rest of your data after PQ [creates the codebook](#enable-pq-and-create-the-codebook). Weaviate compresses the new data when it adds it to the database.

If you already have data in your Weaviate instance when you create teh codebook, Weaviate automatically compresses the remaining objects (the ones after the initial training set).

## PQ Parameters

You can configure PQ compression by setting the following parameters at the collection level.

import PQParameters from '/_includes/pq-compression/parameters.mdx' ;

<PQParameters />


## Additional tools and considerations

### Change the codebook training limit

For most use cases, 100,000 objects is an optimal training size. There is little benefit to increasing `trainingLimit`. If you do increase `trainingLimit`, the training period will take longer. You could also have memory problems if you set a high `trainingLimit`.

If you have fewer than 100,000 objects per shard and want to enable compression, consider using binary quantization (BQ) instead. BQ is a better choice for smaller data sets. 

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
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START GetSchema"
      endMarker="# END GetSchema"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START GetSchema"
      endMarker="# END GetSchema"
      language="py"
    />
  </TabItem>

  <TabItem value="ts" label="JavaScript/TypeScript">
    <FilteredTextBlock
      text={TSCode}
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

## Related pages

- [Configuration: Indexes](../configuration/indexes.md)
- [Tutorial: Schema](../tutorials/schema.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
