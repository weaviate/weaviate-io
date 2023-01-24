---
title: Quickstart Tutorial
sidebar_position: 0
image: og/docs/quickstart-tutorial.jpg
# tags: ['getting started']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

<!-- :::caution Migrated From:
- `Getting Started`
- Added `Weaviate console` from `Core knowledge/Console`
::: -->

## Overview

Welcome to the Weaviate **Quickstart tutorial**. 

This tutorial teaches you how to use Weaviate, from spinning up an instance to performing queries.

### Data

We will begin with this (tiny) dataset consisting of questions from the popular quiz show "Jeopardy!":

|    | Category   | Question                                                                                                     | Answer                              |
|---:|:-----------|:-------------------------------------------------------------------------------------------------------------|:------------------------------------|
|  0 | SCIENCE    | These in the skies of Albuquerque on October 3, 1999 were a fine example of Charles' Law in action           | hot air balloons                    |
|  1 | SCIENCE    | Fructose is a monosaccharide, a simple one of these                                                          | a sugar                             |
|  2 | SCIENCE    | After the sun & moon, this planet is the brightest object in the sky                                         | Venus                               |
|  3 | SCIENCE    | Base 10 equivalent to the binary number "11"                                                                 | 3                                   |
|  4 | HISTORY    | On December 2, 1804 this man crowned himself emperor                                                         | Napoleon Bonaparte                  |
|  5 | HISTORY    | In 1931 the invading Japanese made this Chinese area a puppet state called Manchukuo                         | Manchuria                           |
|  6 | SCIENCE    | His 1905 paper "On the Electrodynamics of Moving Bodies" contained his special Theory of Relativity          | Albert Einstein                     |
|  7 | SCIENCE    | In 1665 Robert Hooke described & named this structural unit; bacteria have only one                          | Cell                                |
|  8 | HISTORY    | Historic ones of these occurred on St. Bartholomew's Day in 1572 & St. Valentine's Day in 1929               | massacres                           |
|  9 | HISTORY    | While Richard the Lion-Hearted was on a Crusade in the 1190s, this youngest brother tried to usurp the crown | John ("John Lackland", "Poor John") |

### What you will build

In this tutorial, you will build a Weaviate database with this data and then perform queries to retrieve information. By the end, you will begin to see some of the benefits of vector search, and get some ideas on what you can do with Weaviate.

We also include brief optional chapters about [modules](./modules.md), and the [console](./console.md).

## Before you start 

### Assumed knowledge

The guide assumes that you are somewhat familiar with databases and vector embeddings. 

But don't worry too much even if you are uncomfortable with any of these. The guide is structured so you should be able to follow along even if some of the concepts are unfamiliar. And you can always revisit some of these ideas in the documentation. 

### Accounts and API keys

We recommend following along with the tutorial by creating free accounts with:
1. A [Weaviate Cloud Service (WCS)](https://console.weaviate.io/) account, and
1. An account with an inference API provider such as:
    1. [OpenAI](https://beta.openai.com/docs/guides/embeddings),
    1. [Cohere](https://docs.cohere.ai/reference/embed), or
    1. [Hugging Face](https://huggingface.co/docs/api-inference/index).

## Next

- Get started by [installing Weaviate](./installation.md).
