---
layout: layout-documentation
solution: weaviate
sub-menu: ---
title: Modules
description: Getting started with querying Weaviate
tags: ['modules']
menu-order: 9
open-graph-type: article
toc: true
---

Weaviate modules can be added to your instance and are mostly used to vectorize data or process results (e.g., question answering). The structure of the module name (`x2vec`) informs you of what the module does. E.g., `text2vec` generates text embeddings, `img2vec` image embeddings, etc.

## Readers & Generators

Readers and generators are mostly used to vectorize data, which goes both for vectorizing the data objects and the queries. For example, if you use the `text2vec` modules, the GraphQL filter [`nearText`](../retriever-vectorizer-modules/text2vec-transformers.html#neartext) becomes available. It will automatically vectorize your query and match it against the vectors stored in the index.

You can set up the vectorization per class as follows:

```json
{
    "class": "SomeClass",
    "vectorizer": "text2vec-openai",
}
```

Next, you need to tell Weaviate what you want to have vectorized. Only the payload, or do you also want to include the class name and the property name?

```json
{
    "class": "SomeClass",
    "vectorizer": "text2vec-openai",
    "moduleConfig": {
        "text2vec-openai": {
            "vectorizeClassName": true
        }
    },
    "properties": [
        {
            "moduleConfig": {
                "text2vec-openai": {
                    "vectorizePropertyName": false
                }
            }
        }
    ]
}
```

> 💡 The reason you can index class names and property names is that they sometimes give semantic context. For example, a class _Product_ could have the property _name_. If you vectorize everything you get a vector for _Product_ with the _name_ _some product_. This only goes for `text2vec` modules.

If you don't want to vectorize a property at all, you can simply skip it.

```json
{
    "class": "SomeClass",
    "vectorizer": "text2vec-openai",
    "moduleConfig": {
        "text2vec-openai": {
            "vectorizeClassName": true
        }
    },
    "properties": [
        {
            "moduleConfig": {
                "text2vec-openai": {
                    "vectorizePropertyName": false,
                    "skip": true
                }
            }
        }
    ]
}
```

## Recapitulation

...

## What would you like to learn next?

...

## Legend

...

# More Resources

{% include docs-support-links.html %}
