---
title: reranker-transformers
sidebar_position: 11
image: og/docs/modules/text2vec-transformers.jpg
# tags: ['rerank', 'transformers']
---

## Introduction

The `reranker-transformers` module allows you to run your own inference container with a pre-trained language transformer model as a Weaviate reranker module. Note that this is in contrast to an API-based module such as [`reranker-cohere`](./reranker-cohere.md), which uses an external API to rerank your data.

<!-- TODO -->

## How to enable

### Weaviate Cloud Services

The `reranker-transformers` module is not available on the WCS. <!-- TODO: check -->

### Weaviate open source

The following commands will pull the `semitechnologies/reranker-transformers:cross-encoder-ms-marco-MiniLM-L-6-v2` Docker image and launch the development server locally. See/edit the `local-reranker-transformers` section in `tools/dev/run_dev_server.sh` to choose which vectorization module(s) to enable.

```bash
tools/dev/restart_dev_environment.sh --reranker
tools/dev/run_dev_server.sh local-reranker-transformers
```


## How to use

* Using this module will enable the [`rerank` GraphQL _additional property](../../api/graphql/additional-properties.md#rerank).
* For usage examples, see the [Howto: Search - Reranking](../../search/rerank.md) page.


## More resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
