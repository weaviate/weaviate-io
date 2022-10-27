---
layout: layout-documentation
solution: weaviate
sub-menu: Retrievers & Vectorizers
nav-parent: Modules
title: ref2vec-centroid
description: Calculate vectors based on the centroid of references
tags: ['ref2vec-centroid', 'centroid']
menu-order: 7
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/current/modules/ref2vec-centroid.html
---

# Introduction

The `ref2Vec-centroid` module is used to calculate vectors based on the centroid of existing vectors. The idea is that this centroid vector would be calculated from the vectors of an object's references, enabling associations between clusters of objects. This is useful in applications such as making suggestions based on the aggregation of a user's actions, or preferences.

# How to enable

## Weaviate Cloud Service

The `ref2vec-centroid` module is not currently available on the WCS.

## Weaviate open source

Which modules to use in a Weaviate instance can be specified in the docker-compose configuration file. The service can be added like this:

```yaml
---
version: '3.4'
services:html
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: semitechnologies/weaviate:{{ current_page_version | remove_first: "v" }}
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      ENABLE_MODULES: 'ref2vec-centroid'
      CLUSTER_HOSTNAME: 'node1'
...
```

# How to configure

​In your Weaviate schema, you must define how you want this module to vectorize your data. If you are new to Weaviate schemas, you might want to check out the [getting started guide on the Weaviate schema](../getting-started/schema.html) first.

For example, here is an `Article` class which is configured to use ref2vec-centroid. This module requires only a class-level `moduleConfig`, containing two fields:

1. `referenceProperties`: a list of the class' reference properties which should be used during the calculation of the centroid.
2. `method`: the method by which the centroid is calculated. Currently only `mean` is supported.

The `Article` class specifies its `hasParagraphs` property as the only reference property to be used in the calculation of an `Article` object's vector. In this case, the `Paragraph` class is configured to generate vectors using the text2vec-contextionary module.

It is important to note that unlike the other text2vec/multi2vec/image2vec modules, ref2vec-centroid does not generate embeddings based on the contents of an object. Rather, the point of this module is to calculate an object's vector based on its *references*.

Although this example shows how to use a Weaviate module to generate vectors for the `Paragraph` class, it is perfectly possible to simply provide your own vectors and skip the vectorization process entirely. Either way, ref2vec-centroid only uses existing vectors of referenced objects for its calculations.

```json
{
  "classes": [
    {
      "class": "Article",
      "description": "A class representing a published article",
      "moduleConfig": {
        "ref2vec-centroid": {
          "referenceProperties": "hasParagraphs",
          "method": "mean"
        }
      },
      "properties": [
        {
          "dataType": [
            "string"
          ],
          "description": "Title of the article",
          "name": "title"
        }
        ,
        {
          "dataType": [
            "Paragraph"
          ],
          "description": "Paragraphs belonging to this article",
          "name": "hasParagraphs"
        }
      ],
      "vectorizer": "ref2vec-centroid"
    },
    {
      "class": "Paragraph",
      "description": "Paragraphs belonging to an Article",
      "properties": [
        {
          "dataType": [
            "text"
          ],
          "description": "Content that will be vectorized",
          "moduleConfig": {
            "text2vec-contextionary": {
              "skip": false,
              "vectorizePropertyName": false
            }
          },
          "name": "content"
        }
      ],
      "vectorizer": "text2vec-contextionary"
    }
  ]
}
```

# How to use

Now that the `Article` class is properly configured to use the ref2vec-centroid module, we can begin to create some objects. If there are not yet any `Paragraph` objects to reference, or if we simply don't want to reference a `Paragraph` object yet, any newly created `Article` object will have its vector set to `nil`. 

Once we are ready to reference one or more existing `Paragraph` objects (with non-nil vectors), our `Article` object will automatically be assigned a centroid vector, calculated using the vectors from all the `Paragraph` objects which are referenced by our `Article` object.

## Updating the centroid

An object whose class is configured to use ref2vec-centroid will have its vector calculated (or recalculated) as a result of these events:
- Creating the object with references already assigned as properties 
- Updating an existing object's list of references. Note that this can happen several ways:
  - Object `PUT`: update all of the object's properties, containing a different set of references. This totally replaces the object's existing reference list with the newly provided one
  - Object `PATCH`: update an existing object by adding any newly provided reference(s) to the object's existing reference list
  - Reference `POST`: create a new reference to an existing object
  - Reference `PUT`: update all of the object's references
- Deleting references from the object. Note that this can happen several ways:
  - Object `PUT`:update all of the object's properties, removing all references
  - Reference `DELETE`: delete an existing reference from the object's list of references

## Making queries

This module does not add any additional GraphQL extensions like `nearText`, but can be used with the existing [nearVector](/developers/weaviate/current/graphql-references/vector-search-parameters.html#nearvector) and [`nearObject`](/developers/weaviate/current/graphql-references/vector-search-parameters.html#nearobject) filters.

# Additional information

⚠️ It is important to note that if a _referenced_ object is updated, the _referencing_ object's vector is not affected. ⚠️

In other words, using our `Article`/`Paragraph` example:

Let's say an `Article` object, `"On the Philosophy of Modern Ant Colonies"`, references three `Paragraph` objects: `"intro"`, `"body"`, and `"conclusion"`. Eventually, `"body"` is updated as more research has been conducted on the dynamic between worker ants and soldier ants. The existing vector for the article will not be updated with a new vector, based on the refactored `"body"`.

If we would want `"On the Philosophy of Modern Ant Colonies"`'s reference vector to be recalculated, we could either remove the reference to `"body"` and add it back, or simply `PUT` the `Article` object with an identical object.
