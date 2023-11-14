---
title: Compression
sidebar_position: 5
image: og/docs/configuration.jpg
# tags: ['configuration', 'compression', 'pq']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/howto/configure.schema.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/howto/configure.schema-v3.py';

# Configure PQ Compression

## Overview

import PQOverview from '/_includes/pq-compression/overview-text.mdx' ;

<PQOverview />

import PQTradeoffs from '/_includes/pq-compression/tradeoffs.mdx' ;

<PQTradeoffs />

To learn how to configure PQ, follow the discussion on this page. 

## Enable PQ compression

import PQMakesCookbook from '/_includes/pq-compression/makes-a-cookbook.mdx' ;

<PQMakesCookbook />


## PQ Parameters

These parameters let you fine tune `pq`.
 
import PQParameters from '/_includes/pq-compression/parameters.mdx' ;

<PQParameters />







# OLD PAGE

### Minimal example

At a minimum, you must specify the `class` parameter for the collection name.

<Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START CreateCollection"
      endMarker="# END CreateCollection"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START CreateCollection"
      endMarker="# END CreateCollection"
      language="py"
    />
  </TabItem>

</Tabs>


### Property definition

You can use 

### Collection level module settings

Configure the `moduleConfig` parameter at the collection-level to set collection-wide settings for module behavior. For example, you can configure the vectorizer to use a particular model (`model`), or to vectorize the collection name (`vectorizeClassName`).

 <Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ModuleSettings"
      endMarker="# END ModuleSettings"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START ModuleSettings"
      endMarker="# END ModuleSettings"
      language="py"
    />
  </TabItem>

</Tabs>


The available parameters vary according to the module. ([Learn more](../modules/index.md)).


### Property-level module settings

Configure the `moduleConfig` parameter at the property-level to set property-level settings for module behavior. For example, you can vectorize the property name (`vectorizePropertyName`), or ignore the property altogether (`skip`).

<!-- <Tabs groupId="languages">
  <TabItem value="py" label="Python (v4)">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START PropModuleSettings"
      endMarker="# END PropModuleSettings"
      language="py"
    />
  </TabItem>

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
      startMarker="# START PropModuleSettings"
      endMarker="# END PropModuleSettings"
      language="py"
    />
  </TabItem>

</Tabs>
-->

The available parameters vary according to the module. ([Learn more](../modules/index.md)).



## Delete a collection

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

## Update a collection definition

Some parts of a collection definition are immutable, but you can modify other parts.

The following sections describe how to add a property to a collection and how to modify collection parameters.


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

  <TabItem value="py3" label="Python (v3)">
    <FilteredTextBlock
      text={PyCodeV3}
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
- [Tutorial: Schema](../tutorials/schema.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
