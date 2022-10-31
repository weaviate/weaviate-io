---
layout: post
title: Weaviate 1.2 release – transformer models
description: "Weaviate v1.2 introduced support for transformers (DistilBERT, BERT, RoBERTa, Sentence-BERT, etc) to vectorize and semantically search through your data"
published: true
author: Bob van Luijt
author-img: /img/people/icon/bob.jpg
card-img: /img/blog/hero/weaviate-1-2-transformer-models-card.png
canonical-url: https://medium.com/semi-technologies/weaviate-version-1-2-x-now-supports-transformer-models-4a12d858cce3
canonical-name: Medium
date: 2021-03-30
toc: true
redirect_from: /blog/2021/03/Weaviate-1-2-transformer-models.html
---

## Intro
In the v1.0 release of Weaviate ([docs](/developers/weaviate/current/){:target="_blank"} — [Github](https://github.com/semi-technologies/weaviate){:target="_blank"}) we introduced the concept of [modules](/developers/weaviate/current/modules/index.html){:target="_blank"}. Weaviate modules are used to extend the vector search engine with vectorizers or functionality that can be used to query your dataset. With the release of Weaviate v1.2, we have introduced the use of transformers ([DistilBERT](https://arxiv.org/abs/1910.01108){:target="_blank"}, [BERT](https://github.com/google-research/bert){:target="_blank"}, [RoBERTa](https://arxiv.org/abs/1907.11692){:target="_blank"}, Sentence-[BERT](https://arxiv.org/abs/1908.10084){:target="_blank"}, etc) to vectorize and semantically search through your data.

### Weaviate v1.2 introduction video

<div class="youtube">
    <iframe src="//www.youtube.com/embed/S4lXPPZvGPQ" frameborder="0" allowfullscreen></iframe>
</div>

## What are transformers?
A [transformer](https://en.wikipedia.org/wiki/Transformer_(machine_learning_model)){:target="_blank"} (e.g., [BERT](https://en.wikipedia.org/wiki/BERT_(language_model)){:target="_blank"}) is a deep learning model that is used for NLP-tasks. Within Weaviate the transformer module can be used to vectorize and query your data.

## Getting started with out-of-the-box transformers in Weaviate
By selecting the text-module in the [Weaviate configuration tool](/developers/weaviate/current/installation/docker-compose.html#configurator){:target="_blank"}, you can run Weaviate with transformers in one command. You can learn more about the Weaviate transformer module [here](/developers/weaviate/current/retriever-vectorizer-modules/text2vec-transformers.html){:target="_blank"}.

![Weaviate configurator — selecting the Transformers module](/img/blog/weaviate-1.2/configurator-demo.gif)
*Weaviate configurator — selecting the Transformers module*

## Custom transformer models
You can also use custom transformer models that are compatible with Huggingface’s `AutoModel` and `AutoTokenzier`. Learn more about using custom models in Weaviate [here](/developers/weaviate/current/retriever-vectorizer-modules/text2vec-transformers.html){:target="_blank"}.

## Q&A style questions on your own dataset answered in milliseconds
Weaviate now allows you to get to sub-50ms results by using transformers on your own data, you can learn more about Weaviate’s speed in combination with transformers in [this article](https://towardsdatascience.com/a-sub-50ms-neural-search-with-distilbert-and-weaviate-4857ae390154){:target="_blank"}.

## What next
Check out the [Getting Started with Weaviate](/developers/weaviate/current/getting-started/index.html){:target="_blank"} and begin building amazing apps with Weaviate.

You can reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/weaviate_io){:target="_blank"}.

Weaviate is open source, you can follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.
