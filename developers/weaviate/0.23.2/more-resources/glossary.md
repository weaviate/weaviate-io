---
layout: layout-documentation
solution: weaviate
sub-menu: More resources
title: Glossary
intro: 
description: Glossary
tags: ['glossary', 'terminology']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: false
---

| Term | Description |
| --- | --- |
| **Action** | An action is a **semantic kind**, referring to an action (e.g., walking, dancing, buying). The easiest way to think about Things is in the form of verbs. |
| **Beacon** | A beacon is a reference to a particular data object in Weaviate or inside the knowledge network, this data object in turn has a position in the contextionary. Often defined as follows: `weaviate://{peerName}/{semanticKind}/{UUID}` |
| **C11y** | Abbreviation of Contextionary. |
| **Class** | A class is a definition of a semantic kind. E.g., the Class Company or the Class Move. In Weaviate, classes can be recognized because they always have a capitalized first character. You can set as many classes with a naming you choose. |
| **Concept** | Concepts are related to entities. Often you will use concepts to search in your datasets. If your dataset has data about _An Actor with the name Arnold Schwarzenegger_ and _an Actor with the name Al Pacino_, the concepts _Movie_ and _Terminator_ will find a closer relation to the first actor rather than the latter. |
| **Contextionary** | Derived from *dictionary* with *context*. The Contextionary gives context to the language used in the dataset, inspired by the [*Global Vectors for Word Representation*](https://github.com/stanfordnlp/GloVe) concept. Read more about the Contextionary [here](../index.html#about-the-contextionary). |
| **Entity** | An entity refers to something -often- in the world around us. E.g., _a Company with the name Apple_ refers to an entity with a relation to _a Product with the name iPhone_. Weaviate's Contextionary tries to find as many entities in your data as possible. |
| **Fuzzy** | Opposed to most other data solutions, Weaviate uses [fuzzy logic](https://en.wikipedia.org/wiki/Fuzzy_logic) to interpret a query. The upside of this is that it might find answers to queries where a traditional data solution migth not. |
| **Knowledge Network** | A peer to peer (P2P) network of Weaviates |
| **Property** | All classes have properties. E.g., the class Company might have the property _name_. In Weaviate, properties can be recognized because they always have a lowercase first character. |
| **Schema** | In Weaviate, a schema is used to define the types of data you will be adding and querying. You can learn more about it [here](../how-tos/how-to-create-a-schema.html). |
| **Semantic Kinds** | Because of Weaviates semantic nature, we make a distinction in _semantic kinds_. Weaviate distinct two different kinds: *Things* and *Actions*. When creating a Weaviate Schema, you need to explain what Semantic Kind a data object entails. |
| **Thing** | A thing is a **semantic kind**, referring to an object (e.g., car, rocketship, product). The easiest way to think about Things is in the form of nouns. |
| **Weaviate Cluster** | A managed Weaviate cluster |
| **Weaviate Cluster Service (WCS)** | A managed services that hosts Weaviate clusters on the SeMI Network |
| **Weaviate Knowledge Network (WKN)** | A network of Weaviates |



