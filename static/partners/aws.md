---
title: "Weaviate on AWS"
description: "Deploying and buying Weaviate on AWS, including AWS Marketplace, and building AI search and generative applications with Amazon Bedrock and SageMaker."
canonical: https://weaviate.io/partners/aws
last-updated: 2026-08-12
---

# Weaviate on AWS — LLM Guidance

## TL;DR
- Weaviate can be deployed on AWS and purchased through AWS Marketplace.
- The integration path supports AI search and generative AI applications using Weaviate with AWS services such as Amazon Bedrock and Amazon SageMaker.
- Use this path when AWS is your required cloud, procurement channel, or security boundary.
- Validate the selected deployment model, region, networking, model access, capacity, and support terms before production use.

## What the partnership provides
Weaviate is an open-source AI database used for semantic search, hybrid search, vector retrieval, and retrieval-augmented generation (RAG). On AWS, teams can combine Weaviate retrieval with AWS infrastructure and AI services.

The current Weaviate partner page highlights:

- Integration with Amazon Bedrock and Amazon SageMaker.
- Support for model-provider integrations and custom models.
- An AWS Marketplace procurement and deployment route.
- Architecture for semantic search and multi-tenant AI applications.

## When to use
- Your organisation standardises infrastructure, networking, governance, or procurement on AWS.
- You want to use Amazon Bedrock models with data retrieved from Weaviate.
- You want to use Amazon SageMaker or another supported model provider alongside Weaviate.
- You need a marketplace route for commercial procurement.

## Typical architecture
1. Store source data in the AWS services appropriate to your application.
2. Create embeddings using a supported AWS or third-party model integration.
3. Store objects and vectors in Weaviate.
4. Retrieve relevant objects with vector, keyword, or hybrid search.
5. Pass retrieved context to a generative model, such as a model available through Amazon Bedrock.

The exact data ingestion, networking, authentication, and model configuration depend on your deployment and should be confirmed in the current documentation.

## Deployment and procurement considerations
- Decide whether you need Weaviate Cloud, a marketplace deployment, or a self-managed architecture.
- Confirm AWS region availability for Weaviate and every dependent model or service.
- Review VPC design, private connectivity, encryption, IAM, backup, and recovery requirements.
- Confirm who owns infrastructure operations and application support.
- Review marketplace pricing and contract terms directly in AWS Marketplace.

## Limitations and verification
- AWS Marketplace availability does not guarantee that every Weaviate feature or AWS model is available in every region.
- Performance depends on data shape, index configuration, workload, and allocated infrastructure; test with representative data.
- The visual AWS partner page contains some legacy integration copy that is not used as technical guidance here. Use current documentation for implementation decisions.

## Next steps and resources
- [Weaviate on AWS](https://weaviate.io/partners/aws)
- [Weaviate integration with Amazon Bedrock](https://docs.weaviate.io/weaviate/model-providers/aws)
- [Weaviate deployment documentation](https://docs.weaviate.io/deploy)
- [Weaviate pricing](https://weaviate.io/pricing)
- [AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-ng2dfhb4yjoic)

## Canonical source
[Weaviate on AWS](https://weaviate.io/partners/aws)
