---
title: Reranking
sidebar_position: 28
image: og/docs/concepts.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

Reranking seeks to improve search relevance by reordering the result set returned by a [retriever](../modules/retriever-vectorizer-modules/index.md) with a different model.

Reranking computes a relevance score between the query and each data object, and returns the list of objects sorted from the most to the least relevant. Computing this score for all `(query, data_object)` pairs would be prohibitively slow, which is why reranking is used as a second stage after retrieving the relevant objects first.