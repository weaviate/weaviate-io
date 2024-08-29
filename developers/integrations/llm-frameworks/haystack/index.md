---
title: Haystack
sidebar_position: 3
---

[Haystack](https://haystack.deepset.ai/) is a language model framework for build large language model applications 

## Haystack and Weaviate
Weaviate is a [supported document store](https://haystack.deepset.ai/integrations/weaviate-document-store) in Haystack. You need a running Weaviate cluster to build the document store. 

```python
auth_client_secret = AuthApiKey(Secret.from_token("MY_WEAVIATE_API_KEY"))
document_store = WeaviateDocumentStore(auth_client_secret=auth_client_secret)
```

## Our Resources 
[**Hands on Learning**](#hands-on-learning): Build your technical understanding with end-to-end tutorials.

### Hands on Learning

| Topic | Description | Resource | 
| --- | --- | --- |
| Advanced RAG: Query Expansion | Learn how to implement query expansion for RAG. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/llm-frameworks/haystack/query_expansion_haystack_weaviate.ipynb)  |