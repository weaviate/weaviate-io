---
title: Multi-value vectors (ColBERT, ColPali, etc.)
description: Learn how to use multi-value vectors in Weaviate.
sidebar_position: 20
image: og/docs/tutorials.jpg
# tags: ['import']
---

In this section, we will explore data import, including details of the batch import process. We will discuss points such as how vectors are imported, what a batch import is, how to manage errors, and some advice on optimization.

## Prerequisites

Before you start this tutorial, you should follow the steps in the tutorials to have:

- An instance of Weaviate running (e.g. on [Weaviate Cloud](https://console.weaviate.cloud)),
- An API key for Jina AI
- Installed your preferred Weaviate client library, and

## Recap

* Data to be imported should match the database schema
* Use batch import unless you have a good reason not to
* For importing large datasets, make sure to consider and optimize your import strategy.

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
