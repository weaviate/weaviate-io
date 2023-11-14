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

## Prerequisites

This Howto uses the Jeopardy 1000 question data set. Download it here:

```python
import requests
import json

# Download the data
resp = requests.get('https://raw.githubusercontent.com/weaviate-tutorials/intro-workshop/main/data/jeopardy_1k.json')
data = json.loads(resp.text)  # Load data

# Parse the JSON and preview it
print(type(data), len(data))
print(json.dumps(data[1], indent=2))
```

## Enable PQ compression

To enable PQ compression, you need to complete the following steps. 

- [Connect to a Weaviate instance](#connect-to-a-weaviate-instance)
- [Configure an initial schema without PQ](#configure-an-initial-schema-without-pq)
- Load some training data
- Enable and train PQ
- Load the rest of your data

The next few sections work through these steps.

### Connect to a Weaviate instance

Use one of the Weaviate [client libraries](/developers/weaviate/client-libraries) to connect to your instance. 

After you install the client, connect to your instance.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
     <FilteredTextBlock
       text={PyCode}
       startMarker="# ConnectCode"
       endMarker="# END ConnectCode"
       language="py"
     />
  </TabItem>
  
  <TabItem value="py3" label="Python (v3)">
     <FilteredTextBlock
       text={PyCodeV3}
       startMarker="# ConnectCode"
       endMarker="# END ConnectCode"
       language="py"
     />
  </TabItem>
</Tabs>  

Weaviate returns `True` if the connection is successful. 

### Configure an initial schema without PQ

afd



 
import PQMakesCookbook from '/_includes/pq-compression/makes-a-cookbook.mdx' ;

<PQMakesCookbook />


## PQ Parameters

These parameters let you fine tune `pq`.
 
import PQParameters from '/_includes/pq-compression/parameters.mdx' ;

<PQParameters />








## Get the schema

If you want to review the schema, you can retrieve it as shown below.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START SchemaGet"
      endMarker="# END SchemaGet"
      language="py"
    />
  </TabItem>

</Tabs>

The response is a JSON object like the one in this example.

<details>
  <summary>Sample schema</summary>

```json
NEEDS EXAMPLE
```

</details>

## Related pages

- [Configuration: Indexes](../configuration/indexes.md)
- [Tutorial: Schema](../tutorials/schema.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
