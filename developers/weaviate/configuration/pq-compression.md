---
title: Compression
sidebar_position: 5
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'pq']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/pq-compression.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/pq-compression-v3.py';


# Configure PQ Compression

## Overview

import PQOverview from '/_includes/pq-compression/overview-text.mdx' ;

<PQOverview />

import PQTradeoffs from '/_includes/pq-compression/tradeoffs.mdx' ;

<PQTradeoffs />

To learn how to configure PQ, follow the discussion on this page. 

:::note
Before you enable PQ, be sure to provide a set of vectors to train the algorithm. For details, see [Enable and train PQ](#step-3-load-some-training-data)
:::

## Prerequisites

This Howto page uses the Jeopardy 1000 question data set. Download the data.

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
</Tabs>  

## Enable PQ compression

To enable PQ compression, complete the following steps. 

1. [Connect to a Weaviate instance](#step-1-connect-to-a-weaviate-instance)
1. [Configure an initial schema without PQ](#step-2-configure-an-initial-schema-without-pq)
1. [Load some training data](#step-3-load-some-training-data)
1. [Enable and train PQ](#step-4-enable-and-train-pq)
1. [Load the rest of your data](#step-5-load-the-rest-of-your-data)

The next few sections work through these steps.

### Step 1. Connect to a Weaviate instance

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
</Tabs>  

Weaviate returns `True` if the connection is successful. 

### Step 2. Configure an initial schema without PQ

Every collection in your Weaviate instance is defined by a [schema](/developers/weaviate/tutorials/schema). This example defines a collection called `Questions`. Weaviate uses this schema during your initial data load. After the initial data set is loaded, you modify this schema to enable PQ. 

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
</Tabs> 

### Step 3. Load some training data

This example uses a relatively small data set to demonstrate loading data.

If you are starting with a new Weaviate instance, you should load between 10,000 and 100,000 objects from your data set. You can use any of the objects in your data set. If possible, chose the objects at random so that they are [independent and identically distributed](https://en.wikipedia.org/wiki/Independent_and_identically_distributed_random_variables).

If you already have data in your Weaviate instance, you can move ahead to the next step. By default Weaviate uses the first 100,000 objects in your database for the training step.  

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
</Tabs> 

### Step 4. Enable and train PQ

import PQMakesCodebook from '/_includes/pq-compression/makes-a-codebook.mdx' ;

<PQMakesCodebook />

After you update the schema, Weaviate trains PQ on the first 100,000 objects in your database. To use a different value, set a new `trainingLimit`. If you increase `trainingLimit`, the training period will take longer. You could also have memory problems if you set a high `trainingLimit`.
    
To change the compression rate, specify the number of `segments`. The number of vector dimensions must be evenly divisible by the number of segments. Fewer segments means smaller quantized vectors.

For additional configuration options, see the [parameter table](#pq-parameters).

To enable PQ, update your schema. 
 

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
</Tabs> 

### Step 5. Load the rest of your data

If you are starting with a new Weaviate instance, you can load the rest of your data now. Weaviate compresses the new data when it adds it to the database.

If you already have data in your Weaviate instance, Weaviate automatically compresses the remaining objects (the ones after the initial training set).

## PQ Parameters

These parameters let you fine tune `pq`.
 
import PQParameters from '/_includes/pq-compression/parameters.mdx' ;

<PQParameters />


## Additional tools and considerations

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

### Get the schema

To review the schema, you can retrieve it as shown below.

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

</Tabs>

## Related pages

- [Configuration: Indexes](../configuration/indexes.md)
- [Tutorial: Schema](../tutorials/schema.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
