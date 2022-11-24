---
title: Example use cases
sidebar_position: 6
# layout: layout-documentation
# bodyclass: ["page--guides", " "]
# solution: weaviate
# sub-menu: More resources
# title: Example use cases
# intro: Here you'll read about four example use cases with Weaviate.
# description: An overview of Weaviate use cases 
# tags: ['Weaviate', 'use cases']
# sidebar_position: 4
# open-graph-type: article
# toc: true
# redirect_from:
#     - /documentation/weaviate/current/getting-started/use-cases.html
#     - /developers/weaviate/current/getting-started/use-cases.html
---

Most use cases of Weaviate benefit from the following two core concepts: 
1. **Semantic search.**\
  [80% of data is unstructured](https://www.forbes.com/sites/forbestechcouncil/2019/01/29/the-80-blind-spot-are-you-ignoring-unstructured-organizational-data/) and the largest search engine in the world has only indexed [0.004%](https://www.seeker.com/how-much-of-the-internet-is-hidden-1792697912.html) of all data available. With Weaviate and its Contextionary, semantic search in unstructured data becomes possible. Various use cases benefit from unlocking this potential of unstructured data by semantic search, see [Document search and analysis](#document-search-and-analysis) and [Product search for E-commerce](#product-search-for-e-commerce).
2. **Automatic classification.**\
   With your data represented by their meaning in a high dimensional vector space, it becomes possible to automatically find relations between objects and concepts. This can be based on its context, or existing neighboring data objects in your data. See [Classification for ERP](#classification-for-erp) and [Cybersecurity analysis](#cybersecurity-analysis) for examples.

# Document search and analysis

**Challenge**: Text is often stored in unstructured documents. From PDFs to Word documents and from website input fields to emails. The current problem is that data only can be retrieved by searching for keywords rather than the context in which the data is represented. For example, when searching for "science fiction" in a traditional book search engine, you might find anything related to "science" or "fiction" so this would include "neuro**science**" but not "a book about the future".

**Solution with Weaviate**: Weaviate indexes data from any source based on its meaning. This is achieved by leveraging machine learning models that index text in a space, similar documents are placed close to similar concepts and words. This allows you to easily find documents based on fuzzy search terms that are not present in the documents but will be realtime processed by Weaviate.

# Product search for E-commerce

**Challenge**: A product search bar is an important feature of e-commerce websites, but often a potential customer cannot find what they are looking for. Traditional search methods retrieve products based on matching keywords, with the problem that products with different keywords but the same context cannot be found by the user. If potential customers cannot find what they are looking for, this might lead to lost sales.  

**Solution with Weaviate**: Weaviate adds machine learning to traditional search capabilities allowing people to not only search for fixed keywords, but also for context. For example, a category that was never created can be realtime processed by Weaviate (e.g., showing pumpkin products when searching for Halloween).

# Classification for ERP

**Challenge**: Business users create reports (e.g., financial) based on how data is structured in ERP systems. For example, a flight ticket from an airline needs to be classified as "international travel" but this is often not done correctly, not done at all or not done in a way that it works for a specific business question (e.g., an airline ticket classified as "international travel" can't answer the question "How much money has been spend on non-ground travel"). This is currently often solved by manually classifying the data, or hiring data scientists, which is expensive and time-consuming.

**Solution with Weaviate**: Weaviate understands the context of concepts, which allows automatic, real-time classification of unseen, new concepts. For example, because Weaviate knows what "international travel" and "air travel" means, airline tickets can automatically be classified as "travel expenses" or "flight tickets", and "national travel" or "international travel".

# Cybersecurity analysis

**Challenge**: Cybersecurity SIEM (Security information and event management) platforms have to deal with large amounts of streaming security-related data, but indexing and analyzing free-text data is still a challenge to do on a large scale resulting in threat mitigation happening too late or not at all.

**Solution with Weaviate**: Weaviate helps in the automation of free text analysis and automatically classify which mitigation should be taken. This can be done based on existing frameworks or custom build mitigations.


# More Resources

{% include docs-support-links.html %}