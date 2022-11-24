---
title: Glossary
sidebar_position: 4
# layout: layout-documentation
# solution: weaviate
# sub-menu: More resources
# title: Glossary
# intro: 
# description: Glossary
# tags: ['glossary', 'terminology']
# sidebar_position: 2
# open-graph-type: article
# toc: false
# redirect_from:
#     - /documentation/weaviate/current/more-resources/glossary.html
---

| Term | Description |
| --- | --- |
| **Beacon** | A beacon is a reference to a particular data object in Weaviate or inside the knowledge network, this data object in turn has a position in the vector space. Often defined as follows: `weaviate://{peerName}/{className}/{UUID}` (For Weaviate version < v1.14.0 it is defined as follows: `weaviate://{peerName}/{UUID}`) |
| **Class** | A class is a definition of a semantic kind. E.g., the Class Company or the Class Move. In Weaviate, classes can be recognized because they always have a capitalized first character. You can set as many classes with a naming you choose. |
| **Concept** | Concepts are related to entities. Often you will use concepts to search in your datasets. If your dataset has data about _An Actor with the name Arnold Schwarzenegger_ and _an Actor with the name Al Pacino_, the concepts _Movie_ and _Terminator_ will find a closer relation to the first actor rather than the latter. |
| **Contextionary** | Derived from *dictionary* with *context*. The Contextionary (text2vec-contextionary) gives context to the language used in the dataset, inspired by the [*Global Vectors for Word Representation*](https://github.com/stanfordnlp/GloVe) concept. Read more about the Contextionary [here](../modules/text2vec-contextionary.html). |
| **Entity** | An entity refers to something -often- in the world around us. E.g., _a Company with the name Apple_ refers to an entity with a relation to _a Product with the name iPhone_. Weaviate's Contextionary tries to find as many entities in your data as possible. |
| **Fuzzy** | Opposed to most other data solutions, Weaviate uses [fuzzy logic](https://en.wikipedia.org/wiki/Fuzzy_logic) to interpret a query. The upside of this is that it might find answers to queries where a traditional data solution might not. |
| **HSNW** | Hierarchical Navigable Small World - a multilayered graph that serves as the first vector index type supported by Weaviate. |
| **Inverted index** | An index storing a mapping from data property values, to its locations of data objects in a database (named in contrast to a forward index, which maps from data objects to property data values). |
| **Property** | All classes have properties. E.g., the class Company might have the property _name_. In Weaviate, properties can be recognized because they always have a lowercase first character. |
| **Schema** | In Weaviate, a schema is used to define the types of data you will be adding and querying. You can learn more about it [here](../tutorials/how-to-create-a-schema.html). |
| **Weaviate Cluster** | A managed Weaviate cluster |
| **Weaviate Cloud Service (WCS)** | A managed service that hosts Weaviate clusters on the SeMI Network |
| **Vector index** | A data storage mechanism where data is stored as vectors (long arrays of numbers, also seen as coordinates in a high dimensional space), allowing for context-based search |




# More Resources

{% include docs-support-links.html %}