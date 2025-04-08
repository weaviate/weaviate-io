---
title: AI-based Weaviate code generation
description: Tips for writing Weaviate code with generative AI models
sidebar_position: 50
image: og/docs/howto.jpg
# tags: ['best practices', 'how-to']
---

# AI-based Weaviate code generation

It is becoming more and more common to use generative AI models to write code. While this can speed up development, it is also subject to some pitfalls, such as hallucinations due to out-of-date, or missing information in the training data.

Here are some tips for writing Weaviate client librarycode with generative AI models and tooling, based on our anecdotal experience.

## Our experience

### Best-performing models

As of April 2025, we've seen these models perform well for code generation. (Assessed by the quality of the Python client library code generation.)

- Anthropic `claude-3-7-sonnet-20250219`
- Google `gemini-2.5-pro-exp-03-25`
- OpenAI `gpt-4.5-preview-2025-02-27`

None of these models were perfect at zero-shot code generation tasks (i.e. with only a description of the task). However, when provided with in-context examples, they were likely to generate correct code most of the time.

### Provide examples as context

We have found that combining the above models with in-context examples is the most effective approach. For Python client library code generation,

## Select the best possible models



We have found model selection to be the most important factor in the quality and correctness of the code generated. This comes down to two factors:

- Recency of the training data
- The model's ability to adhere to the prompt

Therefore, we recommend that you use the latest models available to you, that is preferably also good at adhering to the prompt. Here's why:

### Use the latest models

You may already h

1. They are trained on more recent data. Therefore, they are more likely to include the latest features and changes.
    - This is particularly important in cases like the Weaviate Python client. The rewrite in 2024 means that the older code examples will not work. It takes time for the training data to be updated.
1. Newer models are generally more capable than the older ones.

### Use models that adhere to the prompt

### Examples of well-performing models

- Anthropic `claude-3-7-sonnet-20250219`
- Google `gemini-2.5-pro-exp-03-25`
- OpenAI `gpt-4.5-preview-2025-02-27`


## Provide valid examples as context

## Index the official documentation



## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
