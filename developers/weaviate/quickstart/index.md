---
title: Quickstart Tutorial
sidebar_position: 0
image: og/docs/quickstart-tutorial.jpg
# tags: ['getting started']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

Welcome to the **Quickstart tutorial** for Weaviate! Here, you will learn how to quickly get up and running with Weaviate.

### Agenda

By the end of this tutorial, you will be familiar with the key features and functionalities of Weaviate. You will have:
- Vectorized and imported data, and
- Performed queries to retrieve objects.

You will also see how Weaviate can:
- Vectorize data at import time,
- Use an external inference API,
- Automate data schema construction if necessary, and
- Perform vector searches.

And once you're done with these - you can move on to our more [in-depth tutorials](../tutorials/index.md).

### Data

We will start with a (tiny) dataset consisting of questions from the popular quiz show "Jeopardy!".

<details>
  <summary>Take a look at the dataset</summary>

|    | Category   | Question                                                                                                          | Answer                  |
|---:|:-----------|:------------------------------------------------------------------------------------------------------------------|:------------------------|
|  0 | SCIENCE    | This organ removes excess glucose from the blood & stores it as glycogen                                          | Liver                   |
|  1 | ANIMALS    | It's the only living mammal in the order Proboseidea                                                              | Elephant                |
|  2 | ANIMALS    | The gavial looks very much like a crocodile except for this bodily feature                                        | the nose or snout       |
|  3 | ANIMALS    | Weighing around a ton, the eland is the largest species of this animal in Africa                                  | Antelope                |
|  4 | ANIMALS    | Heaviest of all poisonous snakes is this North American rattlesnake                                               | the diamondback rattler |
|  5 | SCIENCE    | 2000 news: the Gunnison sage grouse isn't just another northern sage grouse, but a new one of this classification | species                 |
|  6 | SCIENCE    | A metal that is "ductile" can be pulled into this while cold & under pressure                                     | wire                    |
|  7 | SCIENCE    | In 1953 Watson & Crick built a model of the molecular structure of this, the gene-carrying substance              | DNA                     |
|  8 | SCIENCE    | Changes in the tropospheric layer of this are what gives us weather                                               | the atmosphere          |
|  9 | SCIENCE    | In 70-degree air, a plane traveling at about 1,130 feet per second breaks it                                      | Sound barrier           |

</details>

## Assumed knowledge

The tutorial assumes some familiarity with databases and [vector embeddings](/blog/vector-embeddings-explained). But don't worry too much even if you are just starting to learn about these.

It is about getting you started with Weaviate **by doing**. And you can always revisit some of these ideas in the documentation.

## Prerequisites

### Installation

#### Weaviate instance

To follow along with this tutorial, you will need your own instance of Weaviate. You can use any of:
1. A [Weaviate Cloud Services instance](../../wcs/quickstart.mdx), which involves signing up and creating a free *sandbox* instance.
1. A [Docker-compose instance](../installation/docker-compose.md), which you can run locally, or
1. A [Kubernetes instance](../installation/kubernetes.md)

#### Weaviate client library

We also recommend that you use a Weaviate client library for the best experience with Weaviate. Currently they are available in [Python](../client-libraries/python.md), [TypeScript](../client-libraries/typescript.mdx), [Go](../client-libraries/go.md) and [Java](../client-libraries/go.md).

import JavaScriptMaintenanceWarning from '/_includes/javascript-maintenance-warning.mdx';

<JavaScriptMaintenanceWarning />

Install your preferred client by following the relevant instructions below:

import CodeClientInstall from '/_includes/code/quickstart.clients.install.mdx';

<CodeClientInstall />

### Inference service

You will be using an API for Weaviate to vectorize the data with (these types of APIs are called *inference* APIs).

To follow along with the tutorial, we recommend you create accounts with an inference API provider such as:
* [OpenAI](https://platform.openai.com/docs/guides/embeddings),
* [Cohere](https://docs.cohere.ai/reference/embed), or
* [Hugging Face](https://huggingface.co/docs/api-inference/index).

:::tip Use free tiers of these accounts
The free tiers for any of them should be sufficient for you to follow along.
:::

:::info Is something broken?
We want you to have the best experience possible here. So if you find that something here doesn't work, or doesn't make sense, please let us know! You can:
- File an [issue on GitHub](https://github.com/weaviate/weaviate-io/issues), or
- Talk to us on [Slack](https://weaviate.io/slack)
:::

## Next

- [Weaviate, end-to-end](./end-to-end.md).
