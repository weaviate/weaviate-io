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

:::info This page is a preview
This documentation page is a beta preview.

For now, the code examples are in <i class="fa-brands fa-python"></i> Python only. Please be patient while we add code examples for other languages.

<!-- We would love to get your feedback. Please provide us with any feedback through [TODO - this forum post](LINK). -->
:::


## Overview

:::info Related pages
- [Which Weaviate is right for me?](./which-weaviate.md)
- [How-to: Generative search](../search/generative.md)
:::

This pages introduces you to generative search with Weaviate. It covers:

- What generative search, or RAG, is,
- How to configure Weaviate for generative search,
- How to perform generative searches, and
- Importing data with generative search in mind.

### Prerequisites

This guide assumes some familiarity with Weaviate, but it is not required. If you are new to Weaviate, we suggest starting with the [Weaviate Quickstart guide](../quickstart/index.md).

## Background

### What is generative search?

Generative search is a powerful technique that uses retrieved data with large language models (LLMs). Another name for generative search is retrieval augmented generation, or RAG.

### Why generative search?

LLM are incredibly powerful, but can suffer from two important limitations. These limitation are that:
- They can confidently produce incorrect, or outdated, information (also called 'hallucination'); and
- They might simply not be trained on the information you need.

Generative search remedies this problem with a two-step process.

:::warning Two-step process
FIGURE GOES HERE
:::

The first step is to retrieve relevant data through a query. Then, in the second step, the LLM is prompted with a combination of the retrieve data with a user-provided query.

This provides in-context learning for the LLM, which causes it to use the relevant and up-to-date data rather than rely on recall from its training, or even worse, hallucinated outputs.

### Weaviate and generative search

Weaviate incorporates key functionalities to make generative search easier and faster.

For one, Weaviate's search capabilities make it easier to find relevant information. You can use any of similarity, keyword and hybrid searches, along with filtering capabilities to find the information you need.

Additionally, Weaviate has integrated generative search capabilities, so that the retrieval and generation steps are combined into a single query. This means that you can use Weaviate's search capabilities to retrieve the data you need, and then in the same query, prompt the LLM with the same data.

This makes it easier, faster and more efficient to implement generative search workflows in your application.

## Examples of generative search

Let's begin by viewing examples of generative search in action. We will then explore how to configure Weaviate for generative search.

We will use the publicly available `https://edu-demo.weaviate.network` instance, which you can access with the `learn-weaviate` read-only API key. These examples are configured with the `generative-openai` module and the `gpt-3.5-turbo` model, so you will need an OpenAI API key.

Connect to the instance like so, remembering to replace the API key for the LLM used (OpenAI in this case) with your own API key:

<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python
import weaviate

client = weaviate.Client(
    url="https://edu-demo.weaviate.network",
    auth_client_secret=weaviate.AuthApiKey(api_key="learn-weaviate"),
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"]  # <-- Replace with your API key
    }
)
```

</TabItem>
</Tabs>

### Transform result sets

Let's take an illustrative example with passages from a book. Here, the Weaviate instance contains a collection of passages from the [Pro Git book](https://git-scm.com/book/en/v2). We will use generative search in a `grouped task` prompt to summarize the key takeaways from the passages.

Run the below code snippet, and inspect the results:

<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python
collection_name = "GitBookChunk"

response = (
    client.query
    .get(class_name=collection_name, properties=["chunk", "chapter_title", "chunk_index"])
    .with_near_text({"concepts": ["history of git"]})
    .with_limit(5)
    .with_generate(grouped_task="Summarize the key information here in bullet points")
    .do()
)
```

</TabItem>
</Tabs>

Your response should include a result like the following:

:::note Example output
- Git began as a replacement for the proprietary DVCS called BitKeeper, which was used by the Linux kernel project.
- The relationship between the Linux development community and BitKeeper broke down in 2005, leading to the development of Git by Linus Torvalds.
- Git was designed with goals such as speed, simple design, strong support for non-linear development, and the ability to handle large projects efficiently.
- Most operations in Git only require local files and resources, making them fast and efficient.
- Git allows browsing project history instantly and can calculate differences between file versions locally.
- Git allows offline work and does not require a network connection for most operations.
- This book was written using Git version 2, but most commands should work in older versions as well.
:::

The result may vary according to your model, but should be largely similar.

Here, Weaviate has:
- Retrieved five most similar passages to the meaning of `history of git`.
- Prompted the LLM with a combination of:
    - Text from the search results, and
    - The user-provided prompt, `Summarize the key information here in bullet points`.

Note that the user-provided prompt (deliberately) did not contain any information about the subject matter. The result is that Weaviate returned a passage which is not contained in the database, but is a grounded transformation of the retrieved data.

### Transform individual objects

In this example, we will use generative search to translate wine reviews into French, using emojis. The reviews is a subset from a [publicly available dataset of wine reviews](https://www.kaggle.com/zynicide/wine-reviews).

Note that in this query, we apply a `single prompt` parameter. This means that the LLM is prompted with each object individually, rather than with the entire result set.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python
collection_name = "WineReview"

response = (
    client.query
    .get(class_name=collection_name, properties=["review_body", "title", "country", "points"])
    .with_near_text({"concepts": ["fruity white wine"]})
    .with_limit(5)
    .with_generate(single_prompt="""
        Translate this review into French, using emojis:
        ===== Country of origin: {country}, Title: {title}, Review body: {review_body}
    """)
    .do()
)
```

</TabItem>
</Tabs>

As the query was run with a limit of 5, you should see 5 objects returned, including generated texts.

Your results should look somewhat like the following (it will vary due to the randomness of the LLM, and depending on the model):

:::note Example output
===== Generated text =====<br/>
🇺🇸🍷🌿🍑🌼🍯🍊🍮🍽️🌟<br/>
<br/>

Origine : États-Unis<br/>
Titre : Schmitz 24 Brix 2012 Sauvignon Blanc (Sierra Foothills)<br/>
Corps de la critique : Pas du tout un Sauvignon Blanc typique, il sent l'abricot et le chèvrefeuille et a le goût de la marmelade. Il est sec, mais a le goût d'un vin de dessert tardif. Attendez-vous à une petite aventure gustative ici.

<br/>

===== Original review =====<br/>
Country: US<br/>
Title: Schmitz 24 Brix 2012 Sauvignon Blanc (Sierra Foothills)<br/>
Review body Not at all a typical Sauvignon Blanc, this smells like apricot and honeysuckle and tastes like marmalade. It is dry, yet tastes like a late-harvest dessert wine. Expect a little taste adventure here.
:::

Here, Weaviate has:
- Retrieved five most similar wine reviews to the meaning of `fruity white wine`.
- For each result, prompted the LLM with:
    - The user-provided prompt, replacing `{country}`, `{title}`, and `{review_body}` with the corresponding text.

In both examples, you saw Weaviate return new text that is original, but grounded in the retrieved data. This is what makes generative search powerful, by combining the best of data retrieval and language generation.

Now, let's explore how to configure Weaviate for generative search.

## Configuration

### Weaviate configuration

You can configure Weaviate for generative search by enabling the appropriate `generative-xxx` modules, and specifying them in the class definition.

Each module is tied to a specific group of LLMs, such as `generative-cohere` for Cohere models, `generative-openai` for OpenAI models and `generative-palm` for PaLM models.

If you are using WCS, you will not need to do anything to enable modules.

<details>
  <summary>How to list enabled modules</summary>

You can check which modules are enabled by viewing the `meta` information for your Weaviate instance, as shown below:

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

The response will include a list of modules. Check that your desired module is enabled.

</details>

<details>
  <summary>How to enable modules</summary>

For configurable deployments, you can specify enabled modules. For example, in a Docker deployment, you can do so by listing them on the `ENABLE_MODULES` environment variable, as shown below:

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-cohere,text2vec-huggingface,text2vec-openai,text2vec-palm,generative-cohere,generative-openai,generative-palm'
```

Check the specific documentation for your deployment method ([Docker](../installation/docker-compose.md), [Kubernetes](../installation/kubernetes.md), [Embedded Weaviate](../installation/embedded.md)) for more information on how to configure it.


</details>

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

:::caution Generative module cannot be changed
Currently, a generative module cannot be changed in the Weaviate class definition once it has been set. We are looking to change this going forward.
<br/>

If you would like us to priorize this issue, please [go to GitHub here](https://github.com/weaviate/weaviate/issues/3364), and give it a thumbs up.
:::

## Data import

Adding data to Weaviate for generative search is similar to adding data for other purposes. However, there are some important considerations to keep in mind, such as chunking and data structure.

In this example, we will use a chunk length of 150 words and a 25-word overlap. We will also include the title of the book, the chapter it is from, and the chunk number. You can read the further discussions about chunking and data structure in the [Best practices & tips](#best-practices--tips) section.



## Generative queries

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

The braces `{}` indicate where the object's data should be inserted, specifying which property to use. In this case, the `review_body` property of the object is used.

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

For generative search, chunking affects both the information retrieval and the amount of contextual information provided.

While there is no one-size-fits all chunking strategy that we can recommend, we can provide some general guidelines. Chunking by semantic markers, or text length may both be viable strategies.

#### Chunking by semantic markers

Using semantic markers, such as paragraphs, or sections can be a good strategy that will allows you to retain related information in each chunk. Some potential risks are that chunk lengths may vary significantly, and outlier conditions may occur common (e.g. chunks with headers that are not particularly meaningful).

#### Chunking by text length

Using text length, such as 100-150 words, can be a robust baseline strategy. This will allow you to retrieve relevant information without having to worry about the exact length of the text. One potential risk is that chunks may be cut off where they are not semantically meaningful, cutting off important contextual information.

You could use a sliding window approach to mitigate this risk, by overlapping chunks. The length of each chunk can be adjusted to your needs, and based on any unit, such as words, tokens, or even characters.

A baseline strategy could involve using chunks created with a 100-200 word sliding window and a 50-word overlap.

#### Mixed-strategy chunking

Another, slightly more complicated strategy may be using paragraph-based chunks with a maximum and a minimum length, say of 200 words and 50 words respectively.

### Data structure

Another important consideration is the data structure. For example, your chunk object could also contain any additional source-level data, such as the title of the book, the chapter it is from, and the chunk number.

This will allow you to search through the chunks, as well as filter it. Then, you could use this information to control the generation process, such as by prompting the LLM with contextual data (chunks) in the order that they appear in the source document.

Additionally, you could link the chunks to the source document, allowing you to retrieve the source document, or even the entire source document, if needed.

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

