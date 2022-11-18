---
layout: layout-documentation
solution: weaviate
sub-menu: Readers & Generators
nav-parent: Modules
title: Question Answering
description: Weaviate Q&A Transformers module
tags: ['qna-transformers', 'transformers']
sidebar_position: 1
open-graph-type: article
toc: true
redirect_from:
    - /developers/weaviate/v1.11.0/reader-generator-modules/qna-transformers.html
    - /developers/weaviate/current/modules/qna-transformers.html
---

# In short
* The Question and Answer (Q&A) module is a Weaviate module for answer extraction from data.
* The module depends on a text vectorization module that should be running with Weaviate.
* The module adds an `ask {}` parameter to the GraphQL `Get {}` queries
* The module returns a max. of 1 answer in the GraphQL `_additional {}` field. 
* The answer with the highest `certainty` (confidence level) will be returned.

# Introduction

The Question and Answer (Q&A) module is a Weaviate module for answer extraction from data. It uses BERT-related models for finding and extracting answers. This module can be used in GraphQL `Get{...}` queries, as a search operator. The `qna-transformers` module tries to find an answer in the data objects of the specified class. If an answer is found within the given `certainty` range, it will be returned in the GraphQL `_additional { answer { ... } }` field. There will be a maximum of 1 answer returned, if this is above the optionally set `certainty`. The answer with the highest `certainty` (confidence level) will be returned.

There are currently five different Question Answering modules available (taken from [Huggingface](https://huggingface.co/)): [`distilbert-base-uncased-distilled-squad (uncased)`](https://huggingface.co/distilbert-base-uncased-distilled-squad), [`bert-large-uncased-whole-word-masking-finetuned-squad (uncased)`](https://huggingface.co/bert-large-uncased-whole-word-masking-finetuned-squad), [`distilbert-base-cased-distilled-squad (cased)`](https://huggingface.co/distilbert-base-cased-distilled-squad), [`deepset/roberta-base-squad2`](https://huggingface.co/deepset/roberta-base-squad2), and [`deepset/bert-large-uncased-whole-word-masking-squad2 (uncased)`](https://huggingface.co/deepset/bert-large-uncased-whole-word-masking-squad2). Note that not all models perform well on every dataset and use case. We recommend to use `bert-large-uncased-whole-word-masking-finetuned-squad (uncased)`, which performs best on most datasets (although it's quite heavyweighted).

Starting with `v1.10.0`, the answer score can be used as a reranking factor for the search results. 

# How to enable (module configuration)

### Docker-compose

The Q&A module can be added as a service to the Docker-compose file. You must have a text vectorizer like `text2vec-contextionary` or `text2vec-transformers` running. An example Docker-compose file for using the `qna-transformers` module (`bert-large-uncased-whole-word-masking-finetuned-squad (uncased)`) in combination with the `text2vec-transformers`is as follows:

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
    image: semitechnologies/weaviate:{{ site.weaviate_version | remove_first: "v" }}
    ports:
    - 8080:8080
    restart: on-failure:0
    environment:
      TRANSFORMERS_INFERENCE_API: 'http://t2v-transformers:8080'
      QNA_INFERENCE_API: "http://qna-transformers:8080"
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-transformers'
      ENABLE_MODULES: 'text2vec-transformers,qna-transformers'
      CLUSTER_HOSTNAME: 'node1'
  t2v-transformers:
    image: semitechnologies/transformers-inference:sentence-transformers-msmarco-distilbert-base-v2
    environment:
      ENABLE_CUDA: '1'
      NVIDIA_VISIBLE_DEVICES: all
    deploy:
      resources:
        reservations:
          devices:
          - capabilities: [gpu]
  qna-transformers:
    image: semitechnologies/qna-transformers:bert-large-uncased-whole-word-masking-finetuned-squad
    environment:
      ENABLE_CUDA: '1'
      NVIDIA_VISIBLE_DEVICES: all
    deploy:
      resources:
        reservations:
          devices:
          - capabilities: [gpu]
...
```

Variable explanations:
* `QNA_INFERENCE_API`: where the qna module is running
* `ENABLE_CUDA`: if set to 1 it uses GPU (if available on the host machine)

_Note: at the moment, text vectorization modules cannot be combined in a single setup. This means that you can either enable the `text2vec-contextionary`, the `text2vec-transformers` or no text vectorization module._

# How to use (GraphQL)

### GraphQL Ask search

This module adds a search parameter to GraphQL `Get{...}` queries: `ask{}`. This new search parameter takes the following arguments: 

| Field 	| Data Type 	| Required 	| Example value 	| Description 	|
|-	|-	|-	|-	|-	|
| `question` 	| string 	| yes 	| `"What is the name of the Dutch king?"` 	| The question to be answered. 	|
| `certainty` 	| float 	| no 	| `0.75` | Desired minimal certainty or confidence of answer to the question. The higher the value, the stricter the search becomes. The lower the value, the fuzzier the search becomes. If no certainty is set, any answer that could be extracted will be returned|
| `properties` 	| list of strings 	| no 	| `["summary"]` 	| The properties of the queries Class which contains text. If no properties are set, all are considered.	|
| `rerank` 	| bool 	| no 	| `true` 	| If enabled, the qna module will rerank the result based on the answer score. For example, if the 3rd result - as determined by the previous (semantic) search contained the most likely answer, result 3 will be pushed to position 1, etc. *Not supported prior to v1.10.0* |

Notes: 
* The GraphQL `Explore { }` function does support the `ask` searcher, but the result is only a beacon to the object containing the answer. It is thus not any different from performing a nearText semantic search with the question. No extraction is happening.
* You cannot use the `'ask'` parameter along with a `'near'` parameter!

### Example query

{% include code/1.x/qna-transformers.ask.html %}

{% include molecule-gql-demo.html encoded_query='%7B%0D%0A++Get+%7B%0D%0A++++Article%28%0D%0A++++++ask%3A+%7B%0D%0A++++++++question%3A+%22Who+is+the+king+of+the+Netherlands%3F%22%2C%0D%0A++++++++properties%3A+%5B%22summary%22%5D%0D%0A++++++%7D%2C+%0D%0A++++++limit%3A1%0D%0A++++%29+%7B%0D%0A++++++title%0D%0A++++++_additional+%7B%0D%0A++++++++answer+%7B%0D%0A++++++++++hasAnswer%0D%0A++++++++++certainty%0D%0A++++++++++property%0D%0A++++++++++result%0D%0A++++++++++startPosition%0D%0A++++++++++endPosition%0D%0A++++++++%7D%0D%0A++++++%7D%0D%0A++++%7D%0D%0A++%7D%0D%0A%7D' %}




### GraphQL response

The answer is contained in a new GraphQL `_additional` property called `answer`. It contains the following fields:
* `hasAnswer` (`boolean`): could an answer be found?
* `result` (nullable `string`): An answer if one could be found. `null` if `hasAnswer==false`
* `certainty` (nullable `float`): The certainty of the answer returned. `null` if `hasAnswer==false`
* `property` (nullable `string`): The property which contains the answer. `null` if `hasAnswer==false`
* `startPosition` (`int`): The character offset where the answer starts. `0` if `hasAnswer==false`
* `endPosition` (`int`): The character offset where the answer ends `0` if `hasAnswer==false`

Note: `startPosition`, `endPosition` and `property` in the response are not guaranteed to be present. They are calculated by a case-insensitive string matching function against the input text. If the transformer model formats the output differently (e.g. by introducing spaces between tokens which were not present in the original input), the calculation of the position and determining the property fails.

### Example response

```json
{
  "data": {
    "Get": {
      "Article": [
        {
          "_additional": {
            "answer": {
              "certainty": 0.73,
              "endPosition": 26,
              "hasAnswer": true,
              "property": "summary",
              "result": "king willem - alexander",
              "startPosition": 48
            }
          },
          "title": "Bruised Oranges - The Dutch royals are botching covid-19 etiquette"
        }
      ]
    }
  },
  "errors": null
}
```

# Custom Q&A Transformer module

You can use the same approach as for `text2vec-transformers`, see [here](/developers/weaviate/current/retriever-vectorizer-modules/text2vec-transformers.html#option-3-custom-build-with-a-private-or-local-model), i.e. either pick one of the pre-built containers or build your own container from your own model using the `semitechnologies/qna-transformers:custom` base image. Make sure that your model is compatible with Huggingfaces' `transformers.AutoModelForQuestionAnswering`.

# How it works (under the hood)

Under the hood, the model uses a two-step approach. First it performs a semantic search with `k=1` to find the document (e.g. a Sentence, Paragraph, Article, etc.) which is most likely to contain the answer. This step has no certainty threshold and as long as at least one document is present, it will be fetched and selected as the one most likely containing the answer. In a second step, a BERT-style answer extraction is performed on all `text` and `string` properties of the document. There are now three possible outcomes: 
1.  No answer was found because the question can not be answered, 
2.  An answer was found, but did not meet the user-specified minimum certainty, so it was discarded (typically the case when the document is on topic, but does not contain an actual answer to the question), and 
3.  An answer was found that matches the desired certainty. It is returned to the user.

The module performs a semantic search under the hood, so a `text2vec-...` module is required. It does not need to be transformers-based and you can also combine it with `text2vec-contextionary`. However, we expect that you will receive the best results by combining it with a well-fitting transformers model by using the appropriate configured `text2vec-transformers` module.

## Automatic sliding window for long documents

If a text value in a data object is longer than 512 tokens, the Q&A Transformer module automatically splits the text into smaller texts. The module uses a sliding window, i.e. overlapping pieces of text, to avoid a scenario that an answer cannot be found if it lies on a boundary. If an answer lies on the boundary, the Q&A module returns the result (answer) with the highest score (as the sliding mechanism could lead to duplicates).

# More resources

{% include docs-support-links.html %}
