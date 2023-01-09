---
layout: post
title: Pulling back the curtains on text2vec
description: ""
published: true
author: JP Hwang 
author-img: /img/people/icon/JP.png
card-img: /img/blog/hybrid-search-explained/hybrid-search.png
hero-img: /img/blog/hybrid-search-explained/hybrid-search.png
og: /img/blog/hybrid-search-explained/hybrid-search.png
date: 2023-01-09
toc: true
---
You probably know that Weaviate converts a text corpus into a set of vectors - each object is given a vector that captures its ‘meaning’. But you might not know exactly how it does that, or how to adjust that behavior. Here, we will we pull back the curtains to examine those questions, by revealing some of the mechanics behind `text2vec`’s magic. 

First, we will reproduce Weaviate’s output vector using only an external API. Then we will see how to the text vectorization process can tweaked, before wrapping up by discussing a few considerations also. 

## Background

I often find myself saying that Weaviate makes it fast and easy to produce a vector database from text. But it can be easy to forget just how fast and how easy it can make things.

It is true that even in the “old days” of say, five to ten years ago, producing a database with vector capabilities was technically possible. You *simply* had to (*inhales deeply*) develop a vectorization algorithm, vectorize the data, build a vector index, build a database with the underlying data, integrate the vector index with the database, then forward results from a vector index query to the database and combine the outputs from both (*exhales*).

The past for vector searching definitely was not a “simpler time”, and the appeal of modern vector databases like Weaviate is pretty clear given this context.

But while the future is here, it isn’t yet perfect. Tools like Weaviate can seem like a magician’s mystery box. Our users in turn ask us *exactly* how Weaviate does its magic; how it turns all of that data into vectors, and how to control the process. 

So let’s take a look inside the magic box together in this post. 

If you would like to follow along, the Jupyter notebook and data are available [here](https://github.com/semi-technologies/weaviate-examples/tree/main/text2vec-behind-curtain). You can use our free [Weaviate Cloud Service](https://console.semi.technology/) (WCS) sandbox, or set up your own Weaviate instance also.


## Stay Connected
Thank you so much for reading! If you would like to talk to us more about this topic, please connect with us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/weaviate_io){:target="_blank"}. 

Weaviate is open-source, you can follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.