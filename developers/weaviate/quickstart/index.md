---
title: Quickstart Tutorial
sidebar_position: 0
image: og/docs/quickstart-tutorial.jpg
# tags: ['getting started']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

Welcome to the **Quickstart tutorial** for Weaviate! Here, you will learn how to quickly get up and running with Weaviate, including an introduction to our managed cloud solution.

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

### Agenda

By the end of this tutorial, you will be familiar with the key features and functionalities of Weaviate. You will have:
- Built a Weaviate database,
- Vectorized and imported data, and
- Performed queries to retrieve objects.

You will also see how Weaviate can:
- Vectorize data at import time,
- Use an external inference API,
- Automate data schema construction if necessary, and
- Perform vector searches.

And once you're done with these - you can move on to our more [in-depth tutorials](../tutorials/index.md).

## Before you start 

### Assumed knowledge

The tutorial assumes that you are somewhat familiar with databases and vector embeddings. 

But don't worry too much even if you are uncomfortable with any of these. This tutorial is about getting you started **doing things with Weaviate**. It is structured so that you should be able to follow along even if some of the concepts are unfamiliar. And you can always revisit some of these ideas in the documentation. 

### Accounts and API keys

You will be creating your own instance of Weaviate in this tutorial, and using an API for Weaviate to vectorize the data with (these types of APIs are called *inference* APIs). 

To follow along with the tutorial, we recommend you create accounts with:
1. [Weaviate Cloud Services (WCS)](https://console.weaviate.io/), and
1. An inference API provider such as:
    1. [OpenAI](https://platform.openai.com/docs/guides/embeddings),
    1. [Cohere](https://docs.cohere.ai/reference/embed), or
    1. [Hugging Face](https://huggingface.co/docs/api-inference/index).

:::tip Use free tiers of these accounts
The free tiers for any of them should be sufficient for you to follow along. 
:::

:::info Is something broken?
We want you to have the best experience possible here. So if you find that something here doesn't work, or doesn't make sense, please let us know! You can:
- File an [issue on GitHub](https://github.com/weaviate/weaviate-io/issues), or
- Talk to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw)
:::

## Next

- Get started by [installing Weaviate](./installation.md).
