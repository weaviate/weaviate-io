---
layout: layout-documentation
solution: weaviate
sub-menu: Data schema
title: Data schema
description: 
tags: ['Data schema']
menu-order: 0
open-graph-type: article
og-img: documentation.jpg
toc: false
---

# Introduction

A data schema is the first thing you'll need to define before you can start adding data. A data schema specifies what data classes your Weaviate will have, and what properties data objects consist of. Per data class property you will define what data type its value can adopt. If you want to make graph links between data objects, you'll also define that in the data type of class properties.

Additionally, per data class you can define the vector index type, the vectorizer module and optionally other modules. Specific settings to modules and the vector index type can also be set per class and per property. 

Learn more about 
1. [Configuration](./schema-configuration.html) of the classes and properties in the schema.
2. [Data types](./datatypes.html) of property values.
3. [Schema endpoint](../restful-api-references/schema.html).
   
A Weaviate data schema is slightly different from a taxonomy, which has a hierarchy. Read more about how taxonomies, ontologies and schemas are related to Weaviate in [this blog post](https://medium.com/semi-technologies/taxonomies-ontologies-and-schemas-how-do-they-relate-to-weaviate-9f76739fc695).

# More Resources

{% include docs-support-links.html %}