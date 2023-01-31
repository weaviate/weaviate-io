---
title: Modules
sidebar_position: 9
image: og/docs/quickstart-tutorial.jpg
# tags: ['modules']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

Weaviate modules can be added to your instance and are mostly used to vectorize data or process results (e.g., question answering). The structure of the module name (`x2vec`) informs you of what the module does. E.g., `text2vec` generates text embeddings, `img2vec` image embeddings, etc.

## Retrievers & Vectorizers

Retrievers & Vectorizers are mostly used to vectorize data, which goes both for vectorizing the data objects and the queries. For example, if you use the `text2vec` modules, the GraphQL filter [`nearText`](/developers/weaviate/modules/retriever-vectorizer-modules/text2vec-transformers.md#neartext) becomes available. It will automatically vectorize your query and match it against the vectors stored in the index.

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

:::note
The reason you can index class names and property names is that they sometimes give semantic context. For example, a class _Product_ could have the property _name_. If you vectorize everything you get a vector for _Product_ with the _name_ _some product_. This only goes for `text2vec` modules.
:::

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

## Example

If you [look at the schema](https://demo.dataset.playground.semi.technology/v1/schema) of the article demo dataset, ​you can see a complete example.

Let's take a look at the schema item for the Article class. Look for the `"moduleConfig"` entries on the class and on the property level.

You will see that the class and property names are not indexed, but the article _itself_ is. So if you now retrieve a single article (like you can do [here](https://link.semi.technology/3AGybFr)), you know that the vector comes from the transformers module.

```json
{
    "classes": [
        {
            "class": "Article",
            "description": "Normalised types",
            "invertedIndexConfig": {
                "bm25": {
                    "b": 0.75,
                    "k1": 1.2
                },
                "cleanupIntervalSeconds": 60,
                "stopwords": {
                    "additions": null,
                    "preset": "en",
                    "removals": null
                }
            },
            "moduleConfig": {
                "text2vec-transformers": {
                    "poolingStrategy": "masked_mean",
                    "vectorizeClassName": false
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "title of the article",
                    "indexInverted": true,
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "title",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "url of the article",
                    "indexInverted": false,
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "url",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "summary of the article",
                    "indexInverted": true,
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "summary",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "date of publication of the article",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "publicationDate"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "Words in this article",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "wordCount"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "whether the article is currently accessible through the url",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "isAccessible"
                },
                {
                    "dataType": [
                        "Author",
                        "Publication"
                    ],
                    "description": "authors this article has",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "hasAuthors"
                },
                {
                    "dataType": [
                        "Publication"
                    ],
                    "description": "publication this article is in",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "inPublication"
                },
                {
                    "dataType": [
                        "Category"
                    ],
                    "description": "category this article is of",
                    "moduleConfig": {
                        "text2vec-transformers": {
                            "skip": false,
                            "vectorizePropertyName": false
                        }
                    },
                    "name": "ofCategory"
                }
            ],
            "shardingConfig": {
                "virtualPerPhysical": 128,
                "desiredCount": 1,
                "actualCount": 1,
                "desiredVirtualCount": 128,
                "actualVirtualCount": 128,
                "key": "_id",
                "strategy": "hash",
                "function": "murmur3"
            },
            "vectorIndexConfig": {
                "skip": false,
                "cleanupIntervalSeconds": 300,
                "maxConnections": 64,
                "efConstruction": 128,
                "ef": -1,
                "dynamicEfMin": 100,
                "dynamicEfMax": 500,
                "dynamicEfFactor": 8,
                "vectorCacheMaxObjects": 2000000,
                "flatSearchCutoff": 40000,
                "distance": "cosine"
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "text2vec-transformers"
        }
    ]
}
```

## Readers & Generators

Readers & Generators are used to process data after retrieving the data from the database. Question answering is a good example of this. If you set a limit of 10, the 10 results will be run through the Q&A module.

Like retrievers & vectorizers, the modules can extend the GraphQL-API. The question-answering module shows best.

```graphql
{
  Get {
    Article(
      # the ask filter is introduced through the QandA module
      ask: {
        question: "What was the monkey doing during Elon Musk's brain-chip startup release?"
      }
      limit: 1
    ) {
      _additional {
        # the answer properties extend the _additional filters
        answer {
          result
          certainty
        }
      }
    }
  }
}
```

You can try this query in real time [here](https://link.weaviate.io/3HGe3qv).

## Recap

Modules are add-ons to Weaviate, they can take care of vectorization ([retrievers & vectorizers](#retrievers--vectorizers)) or extend the core with new functionality ([readers & generators](#readers--generators)). You don't have to use them, but you can.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
