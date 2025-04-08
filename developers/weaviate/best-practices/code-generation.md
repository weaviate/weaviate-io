---
title: AI-based Weaviate code generation
description: Tips for writing Weaviate code with generative AI models
sidebar_position: 50
image: og/docs/howto.jpg
# tags: ['best practices', 'how-to']
---

# AI-based Weaviate code generation

Generative AI models are becoming more capable at writing code. While this can speed up development, it is also subject to some pitfalls, such as hallucinations due to out-of-date, or missing information in the training data.

Here are some tips for writing Weaviate client library code with generative AI models and tooling, based on our anecdotal experience.

## Our experience

### Best-performing models

As of April 2025, we've seen these models perform well for code generation. (Assessed by the quality of the Python client library code generation.)

- Anthropic `claude-3-7-sonnet-20250219`
- Google `gemini-2.5-pro-exp-03-25`
- OpenAI `gpt-4.5-preview-2025-02-27`

If you are using the Python client library, we recommend that you try out one of the above models to see if it performs well for your use case.

### Provide examples as context

We have found that combining the above models with in-context examples is the most effective approach.

For Python client library code generation, performances of the above LLMs improved significantly when provided with in-context examples.

None of these models performed perfectly at zero-shot code generation tasks (i.e. with only a description of the task). However, when provided with in-context examples, they were able to generate correct code most of the time.

### Where to get code examples

We can suggest these ways of getting core code examples:

1. Copy and paste code examples from relevant sections of the Weaviate Documentation.
1.
1. Use the `Ask AI` feature in the Weaviate Documentation to find examples of how to perform specific tasks. Then, use the provided code in your prompt.

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



## Provide valid examples as context

## Index the official documentation



## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
