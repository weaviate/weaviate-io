---
title: AWS + Weaviate
sidebar_position: 10
image: og/docs/integrations/provider_integrations_aws.jpg
# tags: ['model providers', 'aws']
---

import BetaPageNote from '../_includes/beta_pages.md';

<BetaPageNote />

AWS offers a wide range of models for natural language processing and generation. Weaviate seamlessly integrates with AWS's APIs, allowing users to leverage AWS's models directly within the Weaviate database.

Weaviate integrates with both AWS [Sagemaker](https://aws.amazon.com/sagemaker/) and [Bedrock](https://aws.amazon.com/bedrock/).

These integrations empower developers to build sophisticated AI-driven applications with ease.

:::tip Sagemaker vs Bedrock
Amazon SageMaker is a fully managed service where you can build, train and deploy ML models. Amazon Bedrock is a fully managed service that offers a choice of high-performing foundation models (FMs) from leading AI companies.
:::

## Integrations with AWS

### Embedding models for semantic search

![Embedding integration illustration](../_includes/integration_aws_embedding.png)

AWS's embedding models transform text data into high-dimensional vector representations, capturing semantic meaning and context.

[Weaviate integrates with AWS's embedding models](./embeddings.md) to enable seamless vectorization of data. This integration allows users to perform semantic and hybrid search operations without the need for additional preprocessing or data transformation steps.

[AWS embedding integration page](./embeddings.md)

### Generative AI models for RAG

![Single prompt RAG integration generates individual outputs per search result](../_includes/integration_aws_rag_single.png)

AWS's generative AI models can generate human-like text based on given prompts and contexts.

[Weaviate's generative AI integration](./generative.md) enables users to perform retrieval augmented generation (RAG) directly within the Weaviate database. This combines Weaviate's efficient storage and fast retrieval capabilities with AWS's generative AI models to generate personalized and context-aware responses.

[AWS generative AI integration page](./generative.md)

## Summary

These integrations enable developers to leverage AWS's powerful models directly within Weaviate.

In turn, they simplify the process of building AI-driven applications to speed up your development process, so that you can focus on creating innovative solutions.

## Get started

You must provide [access key based AWS credentials](https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_access-keys.html) to Weaviate for these integrations. Go to [AWS](https://aws.amazon.com/) to sign up and obtain an AWS access key and a corresponding AWS secret access key.

Then, go to the relevant integration page to learn how to configure Weaviate with the AWS models and start using them in your applications.

- [Embeddings](./embeddings.md)
- [Generative AI](./generative.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
