---
title: Generative search (RAG)
sidebar_position: 30
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

import Badges from '/_includes/badges.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Badges/>

## Overview

:::info Related pages
- [Which Weaviate is right for me?](./which-weaviate.md)
- [How-to: Generative search](../search/generative.md)
:::

### About this guide

This guide provides a brief overview of how to implement generative search in Weaviate, including best practices and tips. It primarily covers:

- Weaviate setup,
- Class configuration, and
- Generative queries.

### About generative search / RAG

Generative search (also called retrieval augmented generation (RAG)) is a powerful technique that can expand the capabilities of large language models (LLMs).

At its core, generative search enhances LLMs by supplying them with relevant and up-to-date data sourced directly from search results.

Weaviate provides this integration with generative models natively. This makes it easier, faster and more efficient to implement generative search workflows in your application.

### Prerequisites

This guide is for developers who are familiar with Weaviate and have a basic understanding of generative search. If you're unfamiliar with Weaviate, start with the [Weaviate Quickstart guide](../quickstart/index.md).

## Configuration

### Weaviate configuration

To use generative search, a `generative` module must be available,
1. *enabled* in your Weaviate instance, and
2. *specified* to use in your class.

#### Are the right modules enabled?

In many cases, you will not need to do anything to enable the required modules. You can check which modules are enabled by viewing the `meta` information for your Weaviate instance, as shown below:

<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python
client.get_meta()
```

</TabItem>
<TabItem value="ts" label="JavaScript/TypeScript">

```ts
await client.misc
  .metaGetter().do();
```

</TabItem>
</Tabs>

The response will include a list of modules. On Weaviate Cloud Services (WCS) instances, for example, multiple `generative` and `text2vec` are enabled by default.

### How to enable modules

For configurable deployments, you can specify enabled modules. For example, in a Docker deployment, you can do so by listing them on the `ENABLE_MODULES` environment variable, as shown below:

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-cohere,text2vec-huggingface,text2vec-openai,text2vec-palm,generative-cohere,generative-openai,generative-palm'
```

Check the specific documentation for your deployment method ([Docker](../installation/docker-compose.md), [Kubernetes](../installation/kubernetes.md), [Embedded Weaviate](../installation/embedded.md)) for more information on how to configure it.

### Class configuration

The vectorizer and generative module must be specified at the class level.

You can specify the vectorizer module by setting the `vectorizer` parameter in the class definition to your preferred module (e.g. `text2vec-openai`), and specify the generative module by including your preferred module in the `moduleConfig` parameter (e.g. `generative-openai`).

```yaml
{
    "class": "WineReview",
    # highlight-start
    "vectorizer": "text2vec-openai",  # Use `text2vec-openai` as the vectorizer
    # highlight-end
    # highlight-start
    "moduleConfig": {
        "generative-openai": {}  # Use `generative-openai` with default parameters
    },
    # highlight-end
}
```

## Generative search

:::info Data used
For this guide, we will use a Weaviate instance that is pre-populated with a small subset of data from a [publicly available dataset of wine reviews](https://www.kaggle.com/zynicide/wine-reviews).
:::

### Single (per-object) prompts

You can use generative search to generate text based on a single object. This allows you to prompt the language model with a template, that is then filled in with the object's data.

In the below example, for instance, we prompt the language model to write a haiku based on the body text of a wine review.

```python
response = (
    client.query
    .get("WineReview", ["review_body", "title"])
    .with_generate(
        single_prompt="Write {review_body} as a haiku"
    )
    .with_limit(2)
    .do()
)
```

The braces (`{}`) indicate where the object's data should be inserted, specifying which property to use. In this case, the `review_body` property of the object is used.

This produces results like the following:

:::note Generated results
Response 1:

Full-bodied wine shines,
Fruit dances with sweet oak's touch,
Lusciousness in sips.

Response 2:

Firm tannins hold tight,
Banana and cherry blend,
Wait, 2017.
:::

Each response here differs based on the data of the object, reflecting the body of the review.

### Grouped tasks

A grouped task is a prompt that is applied to a group of objects. This allows you to prompt the language model with the entire set of search results, such as source documents, relevant passages, or individual reviews in this case.

In the below example, we prompt the language model to write a recommendation for a wine to pair with a salmon steak, based on 10 retrieved reviews.

```python
response = (
    client.query
    .get("WineReview", ["review_body", "title"])
    .with_generate(
        grouped_task="Based on these reviews, make a short recommendation on which wine to drink with a nice salmon steak. Keep in mind that it is now 2023"
    )
    .with_limit(10)
    .do()
)
```

:::note Generated results
Based on the reviews, I would recommend pairing the salmon steak with the Maison de la Villette 2016 Viognier (Vin de France). This wine is described as ripe and full, with prominent apricot flavors and a warm, rounded aftertaste. Its richness and fruitiness make it a good match for the salmon, while its poise adds balance to the dish. Enjoy!
:::

### Pairing with search

Generative search in Weaviate is a two-step process under the hood, involving retrieval of objects and then generation of text. This means that you can use the full power of Weaviate's search capabilities to retrieve the objects you want to use for generation.

In the below example, we search the [Pro Git book](https://git-scm.com/book/en/v2) (pre-loaded in our Weaviate instance) for passages that mention the history of Git, and then generate a summary of the key facts.

```python
response = (
    client.query
    # highlight-start
    .get("GitBookChunk", ["chunk", "chapter_title"])
    .with_near_text({"concepts": "history of git"})
    .with_generate(
        grouped_task="""
        Summarize 5 key facts or takeaways from these passages,
        preferably in concise, short form
        """
    )
    # highlight-end
    .with_limit(5)
    .do()
)
```

:::note Generated results
1. Git was developed as a response to the breakdown of the relationship between the Linux development community and the company that developed BitKeeper.
2. Git was created with goals of speed, simple design, strong support for non-linear development, full distribution, and efficient handling of large projects.
3. Git operates mostly with local files and resources, making operations fast and allowing for offline work.
4. Git allows for multiple instances of search criteria, limiting commit output to matches of any of the specified patterns.
5. Git is backwards compatible and most commands should work even in older versions.
:::

Now, simply by changing the search query, we can generate a summary of the key takeaways from the book about undoing actions in Git.

```python
response = (
    client.query
    .get("GitBookChunk", ["chunk", "chapter_title"])
    # highlight-start
    .with_near_text({"concepts": "undoing actions in git"})
    # highlight-end
    .with_generate(
        grouped_task="""
        Summarize 5 key facts or takeaways from these passages,
        preferably in concise, short form
        """
    )
    .with_limit(5)
    .do()
)
```

:::note Generated results
1. One of the common undos in Git is when you commit too early or mess up your commit message. You can redo the commit by using the `git commit --amend` command.
2. When amending your last commit, you are replacing it entirely with a new commit. The previous commit will not show up in your repository history.
3. The `git reset` command can be dangerous, but in certain scenarios, such as the one described above, it is relatively safe as it does not touch the file in your working directory.
4. If you want to keep the changes made to a file but need to get it out of the way temporarily, it is better to use stashing or branching.
5. Anything that is committed in Git can almost always be recovered, even if it was on deleted branches or overwritten with an `--amend` commit. However, anything that was never committed is likely to be lost permanently.
:::

As you can see, Weaviate allows you to use the full power of search to retrieve the objects you want to use for generation. This allows you to ground the language model in the context of up-to-date information, which you can retrieve with the full power of Weaviate's search capabilities.

## Best practices & tips

### Chunking

In the context of language processing, "chunking" refers to the process of splitting texts into smaller pieces of texts, i.e. "chunks".

For generative search, chunking affects both the information retrieval stage and the provision of context.

While there is no one-size-fits all chunking strategy that we can recommend, we can provide some general guidelines. For many, we think one of two strategies can be effective starting points:

1. Chunking by semantic markers, such as paragraphs, or sections. This is a good strategy that will allows you to retain related information in each chunk. Some potential risks are that chunk lengths may vary significantly, and outlier conditions may occur common (e.g. chunks with headers that are not particularly meaningful).

2. Chunking by word length, such as 100-150. This is a robust baseline strategy that will allow you to retrieve relevant information without having to worry about the exact length of the text. One potential risk is that chunks may be cut off where they are not semantically meaningful, cutting off important contextual information.

A baseline strategy could involve using chunks created with a 100-200 word sliding window and a 50-word overlap.

Another, slightly more complicated strategy may be using paragraph-based chunks with a maximum and a minimum length, say of 200 words and 50 words respectively.

### Complex prompts

While the field of prompting is relatively new, it has seen significant advancements already.

As one example, a technique called "[chain-of-thought prompting](https://paperswithcode.com/paper/chain-of-thought-prompting-elicits-reasoning)" can be an effective technique. It suggests that the prompt can be used to nudge the model towards producing intermediate reasoning steps, which improves the quality of the answer.

We recommend keeping up to date with the latest developments in the field, and experimenting with different techniques.

Our own [Connor Shorten's podcast](https://weaviate.io/podcast) is a great resource for keeping up with the research, as are resources such as [Arxiv](https://arxiv.org/), and [PapersWithCode](https://paperswithcode.com/).

## Wrap-up

We've explored the dynamic capabilities of generative search in Weaviate, showcasing how it enhances large language models through retrieval-augmented generation.

To learn more about specific search capabilities, check out the [How-to: search guide](../search/index.md). And to learn more about individual modules, check out the [Modules section](../modules/index.md).

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

