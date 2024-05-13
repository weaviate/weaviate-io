---
title: Classification Benchmarks
sidebar_position: 1
image: og/contributor-guide/contextionary.jpg
# tags: ['contributor-guide']
---

## Model Version Details

Benchmarks on this page refer to a specific model version, details about
each version are contained here:

| model version | training algo | input sources |  input size | dimensions | window size | release status |
|--|--|--|--|--|--|--|
| en0.14.0 | GloVe | Wiki | `~14G` | 600 | 15 | **released** |
| en0.16.0 | GloVe | Wiki, CommonCrawl | `~1000G` | 300 | 15 | **released** |
| en0.17.0 | fasttext | Wiki | `~14G` | 300 | 15 | *not released (yet)* |
| en0.17.1 | fasttext | Wiki | `~14G` | 300 | 5 | *not released (yet)* |
| en0.17.2 | fasttext | Wiki, CommonCrawl | `~1000G` | 300 | 15 | training aborted! |
| en0.17.3 | fasttext | Wiki, CommonCrawl | `~100G` | 300 | 15 | *not released (yet)* |

## Benchmarks (KNN)

### Enron Emails (Subset `kaminski-v`)

* Source Repo: `weaviate/enron-email-classification`
* Current best: `en0.14.0` at `k=1`

| contextionary | dimensions | k=1 | k=3 | k=5 | k=8 | k=13 | k=21 |
|---------------|------------|-----|-----|-----|-----|------|------|
| en0.14.0-v0.4.9 | 600 | **74%** | 72% | 71% | 70% | 67% | 63% |
| en0.16.0-v0.4.9 | 300 | 72% | 70% | 69% | 69% | 65% | 64% |
| en0.17.0-v0.4.15 | 300 | 68% | 68% | 67% | 64% | 63% | 60%  |
| en0.17.1-v0.4.15 | 300 | 70% | 68% | 68% | 66% | 64% | 62%  |
| en0.17.3-v0.4.15 | 300 | 72% | 70% | 70% | 69% | 66% | 64%  |

### 20 Newsgroups

* Size: 60 per category
* Source Repo `weaviate/20news-classification`

#### Main Category (6 Categories)

* Current best: `en0.17.3` at `k=5`

| contextionary | dimensions | k=1 | k=3 | k=5 | k=8 | k=13 | k=21 |
|---------------|------------|-----|-----|-----|-----|------|------|
| en0.14.0-v0.4.15 | 600 | 76% | 73% | 72% | 74% | 74% | 70% |
| en0.16.0-v0.4.15 | 300 | 83%| 82% | 80% | 82% | 82% | 82% |
| en0.17.0-v0.4.15 | 300 | 78% | 80% | 77% | 77% | 73% | 72% |
| en0.17.1-v0.4.15 | 300 | 77% | 77% | 78% | 77% | 73% | 73% |
| en0.17.3-v0.4.15 | 300 | 83% | 84%| **85%** | 82% | 81% | 80% |

#### Fine Category (20 Categories)

* Current best: `en0.17.3` at `k=1`

| contextionary | dimensions | k=1 | k=3 | k=5 | k=8 | k=13 | k=21 |
|---------------|------------|-----|-----|-----|-----|------|------|
| en0.14.0-v0.4.15 | 600 | 57% | 53% | 53% | 50% | 48% | 46% |
| en0.16.0-v0.4.15 | 300 | 62%| 60% | 57% | 60% | 61% | 59% |
| en0.17.0-v0.4.15 | 300 | 57% | 57% | 56% | 56% | 56% | 51% |
| en0.17.1-v0.4.15 | 300 | 56% | 54% | 55% | 58% | 54% | 53% |
| en0.17.3-v0.4.15 | 300 | **66%** | 64% | 64% | 61% | 62% | 61% |

## Benchmarks (contextual)

### 20 Newsgroups

* Size: 60 per category
* Source Repo: `weaviate/20news-classification`
* *Warning: Take these results (20-news **contextual**) with a grain of salt,
  they are not currently testing the best possible hyper-parameters, but just a
  specific configuration that worked well in the past. TODO: Improve benchmark
  to test various hyper-parameters*

#### Main Category (6 Categories)

* Current best: `en0.14.0`

| contextionary | dimensions | result |
|---------------|------------|-----|
| en0.14.0-v0.4.15 | 600 | **54%** |
| en0.16.0-v0.4.15 | 300 | 50% |
| en0.17.0-v0.4.15 | 300 | 50% |
| en0.17.1-v0.4.15 | 300 | 50% |
| en0.17.3-v0.4.15 | 300 | 50% |

#### Fine Category (20 Categories)

* Current best: `en0.16.0`

| contextionary | dimensions | result |
|---------------|------------|-----|
| en0.14.0-v0.4.15 | 600 | 44% |
| en0.16.0-v0.4.15 | 300 | **56%** |
| en0.17.0-v0.4.15 | 300 | 44% |
| en0.17.0-v0.4.15 | 300 | 43% |
| en0.17.3-v0.4.15 | 300 | 50% |


## More Resources

import ContributorGuideMoreResources from '/_includes/more-resources-contributor-guide.md';

<ContributorGuideMoreResources />

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>