---
layout: post
title: What if you could understand your unstructured data?
description: "Learn how the AI-first search engine Weaviate unlocks the potential of unstructured data and why this is important."
published: true
author: Laura Ham
author-img: /img/people/icon/laura.jpg
card-img: /img/blog/hero/understanding-unstructured-data-card.png
canonical-url: https://medium.com/semi-technologies/what-if-you-could-understand-your-unstructured-data-92f0861e016
canonical-name: Medium
date: 2021-01-20
toc: true
redirect_from: /blog/2021/01/understand-your-unstructured-data.html
---

## Intro
These days, more and more organizations are adopting a data-driven culture. Business processes and customer experience benefit from good data collection, management and analysis. But in order to really benefit from available data, it is essential to also understand the unstructured data, like free text in PDF documents, emails, invoices or voice transcriptions. Unstructured data is especially hard to index, manage and understand. Since around [80% of all data is unstructured](https://www.forbes.com/sites/forbestechcouncil/2019/01/29/the-80-blind-spot-are-you-ignoring-unstructured-organizational-data/){:target="_blank"}, it is hard to actually search and retrieve insights from most of the data.

The Weaviate search engine unlocks the potential of unstructured data. Searching by fuzzy terms and classification of rich data like free text becomes possible with Weaviate. It uses AI-driven indexing and search technologies to enable real-time text processing. With machine learning methods, Weaviate automatically classifies texts. Finding information you are looking for and providing recommendations is possible because knowledge and information is placed in context.

## How does Weaviate work?
Data usually refers to something in the real world. Traditional databases and search engines often struggle with understanding the context of data, a situation or a search query. The context of data is important, because it enables storage and search by fuzzy concepts instead of exact matching keywords. Weaviate automatically places concepts and words in relation to its context by using machine learning. It understands that the Eiffel Tower is a landmark in Paris, and will place these concepts closely together in the database model. Showing [orange tompouces](https://en.wikipedia.org/wiki/Tompouce) when looking for treats around King’s day in the Netherlands is an example of finding concepts related to the context.

## Example use cases
Now let’s get more serious than landmarks and holiday treats (although we should agree that tompouces are essential during King’s day), and find out how also your business could benefit from search and classification of unstructured data.

## Automatic classification
Data classification is often done manually or by expensive external data science teams. ERP (enterprise resource planning) and supply chain management systems rely on correct classification of for example employees’ travel expenses or ingredient labeling of product packages. Automatic classification by Weaviate reduces manual classification errors and eliminates expensive, single-to-use classification applications. Automatic classification can also be applied to cybersecurity and event management, where intervention on threats and riskful events should be taken real-time. Current platforms deal with very large amounts of streaming data, consisting of mostly free text. Weaviate can automatically recognize threats in free text, and classify if and which mitigation should be taken. With Weaviate this can be achieved near real-time, even on a very large scale.

## Semantic search
Traditional search systems return items that have an exact match with the search terms. This means that searching through your emails for ‘reimbursement’ will skip all results about ‘compensation’. Searching for ‘science fiction’ in a traditional book search engine, might lead to anything related to ‘science’ or ‘fiction’ so this would include ‘neuroscience’ but not ‘a book about the future’. Weaviate uses semantic search, and matches search results to the user’s intent through contextual meaning. For e-commerce websites this means that people searching for ‘jumpers’ will also see ‘sweatshirts’ simply because their contextual meaning is the same although the keywords do not match.

See how automatically placing orange tompouces in the context of King’s day might thus actually lead to upselling your products and happier customers? Now there’s certainly also potential hidden in the majority of your data. Think about how an AI-driven search engine can unlock this from your organization’s data!

## What next
Check out the [Getting Started with Weaviate](/developers/weaviate/current/getting-started/index.html){:target="_blank"} and begin building amazing apps with Weaviate.

You can reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/weaviate_io){:target="_blank"}.

Weaviate is open source, you can follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.