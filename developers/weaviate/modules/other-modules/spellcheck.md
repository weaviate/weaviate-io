---
title: Spell Check
sidebar_position: 1
image: og/docs/modules/text-spellcheck.jpg
# tags: ['modules', 'other modules', 'spellcheck']
---


## In short

* The Spell Check module is a Weaviate module for spell checking of raw text in GraphQL queries.
* The module depends on a Python spellchecking library.
* The module adds a `spellCheck {}` filter to the GraphQL `nearText {}` search arguments.
* The module returns the spelling check result in the GraphQL `_additional { spellCheck {} }` field.

## Introduction

The Spell Check module is a Weaviate module for checking spelling in raw texts in GraphQL query inputs. Using the [Python spellchecker](https://pypi.org/project/pyspellchecker/) library, the module analyzes text, gives a suggestion and can force an autocorrection.

## How to enable (module configuration)

### Docker Compose

The Spell Check module can be added as a service to the Docker Compose file. You must have a text vectorizer like `text2vec-contextionary` or `text2vec-transformers` running. An example Docker Compose file for using the `text-spellcheck` module with the `text2vec-contextionary` is here:

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 50051:50051
    restart: on-failure:0
    environment:
      CONTEXTIONARY_URL: contextionary:9999
      SPELLCHECK_INFERENCE_API: "http://text-spellcheck:8080"
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-contextionary'
      ENABLE_MODULES: 'text2vec-contextionary,text-spellcheck'
      CLUSTER_HOSTNAME: 'node1'
  contextionary:
    environment:
      OCCURRENCE_WEIGHT_LINEAR_FACTOR: 0.75
      EXTENSIONS_STORAGE_MODE: weaviate
      EXTENSIONS_STORAGE_ORIGIN: http://weaviate:8080
      NEIGHBOR_OCCURRENCE_IGNORE_PERCENTILE: 5
      ENABLE_COMPOUND_SPLITTING: 'false'
    image: cr.weaviate.io/semitechnologies/contextionary:en0.16.0-v1.0.2
    ports:
    - 9999:9999
  text-spellcheck:
    image: cr.weaviate.io/semitechnologies/text-spellcheck-model:pyspellchecker-d933122
...
```

Variable explanations:
* `SPELLCHECK_INFERENCE_API`: where the spellcheck module is running

## How to use (GraphQL)

Use the spellchecker module to verify at query time that user-provided search queries are spelled correctly and even suggest alternative, correct spellings. Filters that accept query text include:

* [`nearText`](/developers/weaviate/api/graphql/search-operators.md#neartext), if a `text2vec-*` module is used
* `ask`, if the [`qna-transformers`](../reader-generator-modules/qna-transformers.md) module is enabled

There are two ways to use this module: spell checking, and autocorrection.

### Spell checking

The module provides a new GraphQL `_additional` property which can be used to check (but not alter) the provided queries.

#### Example query

import SpellCheckModule from '/_includes/code/spellcheck-module.mdx';

<SpellCheckModule/>

#### GraphQL response

The result is contained in a new GraphQL `_additional` property called `spellCheck`. It contains the following fields:
* `changes`: a list with the following fields:
  * `corrected` (`string`): the corrected spelling if a correction is found
  * `original` (`string`): the original word in the query
* `didYouMean`: the corrected full text in the query
* `originalText`: the original full text in the query
* `location`: the location of the misspelled string in the query

#### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "spellCheck": [
              {
                "changes": [
                  {
                    "corrected": "housing",
                    "original": "houssing"
                  }
                ],
                "didYouMean": "housing prices",
                "location": "nearText.concepts[0]",
                "originalText": "houssing prices"
              }
            ]
          },
          "title": "..."
        }
      ]
    }
  },
  "errors": null
}
```

### Autocorrect

The module extends existing `text2vec-*` modules with an `autoCorrect` flag, which can be used to automatically correct the query if it was misspelled:

#### Example query

```graphql
{
  Get {
    Article(nearText: {
      concepts: ["houssing prices"],
      autocorrect: true
    }) {
      title
      _additional {
        spellCheck {
          changes {
            corrected
            original
          }
          didYouMean
          location
          originalText
        }
      }
    }
  }
}
```


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
