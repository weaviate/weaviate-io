---
layout: layout-documentation
solution: weaviate
sub-menu: Vector Index (ANN) Plugins
title: HNSW
description: HNSW
tags: ['HNSW']
menu-order: 1
open-graph-type: article
og-img: documentation.jpg
toc: true
---

# Introduction
[HNSW](https://arxiv.org/abs/1603.09320) is the first vector index type supported by Weaviate.

# What is HNSW?
HNSW stands for Hierarchical Navigable Small World, a multilayered graph. Every object that is in the database, are captured in the lowest layer (layer 0 in the picture). These data objects are very well connected. On each layer on top of the lowest layer, there are fewer data points represented. These datapoints match with lower layers, but there are exponentially less points in each higher layer. If a search query comes in, the closest datapoints will be found in the highest layer. In the example below that is only one more datapoint. Then it goes one layer deeper, and finds the closest datapoints from the first found datapoint in the highest layer, and searches nearest neighbors from there. In the deepest layer, the actual closest data object to the search query will be found. 

If there were no hierarchical layers in this approach, only the deepest layer (0) would be present and significantly more datapoints would have needed to be explored from the search query, since all data objects are present there. In higher layers, with less datapoints, fewer hops between datapoints need to be made, over larger distances. HNSW is a very fast and memory efficient approach of similarity search, because only the highest layer (top layer) is kept in cache instead of all the datapoints in the lowest layer. Only the datapoints that are closest to the search query are loaded once they are requested by a higher layer, which means that only a small amount of memory needs to be reserved.

The picture shows how a HNSW algorithm is used to go from a search query vector (blue) on the top layer to the closes search result (green) in the lowest layer. Only three data hops are made (indicated by blue solid arrows), whereas more data objects would have need to be search through when this layering was not present (the closest datapoint of *all* datapoints in each layer needs to be found). 

![HNSW layers](/img/guides/hnsw-layers.svg "HNSW layers"){:height="50%" width="50%"}

# How to use HNSW and parameters
Currently the only index type is HNSW, so all data objects will be indexed using the HNSW algorithm unless you specify otherwise in your [data schema](../data-schema/schema-configuration.html). 
- `"vectorIndexType": "hnsw"`: indicates which vector index type to use, in this case hnsw, which is provided by Weaviate itself. 
- `"vectorIndexConfig"`: an object where you can set specific parameters to the chosen vector index type, in this case to hnsw, which has the following parameters:
  - `"efConstruction"`: controls index search speed/build speed tradeoff. Default is set to 128, the integer should be greater than 0. 
  - `"maxConnections"`: the maximum number of connections per element in all layers. Default is set to 64, the integer should be greater than 0. 

Example of a class could be [configured in your data schema](../data-schema/schema-configuration.html): 
```json
{
  "class": "Article",
  "description": "string",
  "properties": [ 
    {
      "name": "title",
      "description": "string",
      "dataType": ["string"]
    }
  ],
  "vectorIndexType": "hnsw",
  "vectorIndexConfig": {
    "efConstruction": 128,
    "maxConnections": 64,
  }
}
```

Note that the vector index type only specifies how the vectors of data objects are *indexed* and this is used for data retrieval and similarity search. How the data vectors are determined (which numbers the vectors contain) is specified by the `"vectorizer"` parameter which points to a [module](../modules/index.html) such as `"text2vec-contextionary"` (or to `"none"` if you want to import your own vectors). Learn more about all parameters in the data schema [here](../data-schema/schema-configuration.html).


# More Resources

{% include docs-support-links.html %}