---
# layout: layout-documentation
# solution: weaviate
# sub-menu: Schema
# title: Data schema
# description: 
# tags: ['Data schema']
# sidebar_position: 0
# open-graph-type: article
# toc: false
---

# Introduction

A data schema is the first thing you can define, before you can start adding data. Designing and adding a data schema is not a requirement; if you don't add a data schema, an automatic schema will be generated from the data that you import (available from Weaviate version v1.5.0). A data schema specifies what data classes your Weaviate will have, and what properties data objects consist of. Per the data class property, you will define what data type its value can adopt. If you want to make graph links between data objects, you'll also define that in the data type of class properties.

Additionally, per the data class, you can define the vector index type, the vectorizer module and, optionally, other modules. Specific settings to modules and the vector index type can also be set per class and per property. 

Learn more about 
1. [Configuration](./schema-configuration.html) of the classes and properties in the schema.
2. [Data types](./datatypes.html) of property values.
3. [Schema endpoint](../restful-api-references/schema.html).
4. [Auto-schema](./schema-configuration.html#auto-schema), for more information about settings for the auto generated schema.
   
A Weaviate data schema is slightly different from a taxonomy, which has a hierarchy. Read more about how taxonomies, ontologies and schemas are related to Weaviate in [this blog post](https://medium.com/semi-technologies/taxonomies-ontologies-and-schemas-how-do-they-relate-to-weaviate-9f76739fc695).

> 💡 Check out the [schema getting started guide](/developers/weaviate/current/getting-started/schema.html) to learn how to work with the Weaviate schema in under 10 minutes.

# More Resources

{% include docs-support-links.html %}
