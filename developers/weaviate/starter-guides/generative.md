---
title: Generative search (RAG)
sidebar_position: 50
image: og/docs/tutorials.jpg
# tags: ['getting started']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/starter-guides/generative.py';
import PyCodeV3 from '!!raw-loader!/_includes/code/starter-guides/generative_v3.py';
import TSCodeEduDemo from '!!raw-loader!/_includes/code/starter-guides/generative_edudemo.ts';
import TSCodeLocal from '!!raw-loader!/_includes/code/starter-guides/generative_local.ts';

## Overview

:::info Related pages
- [Which Weaviate is right for me?](./which-weaviate.md)
- [How-to: Generative search](../search/generative.md)
:::

This pages introduces you to generative search with Weaviate. It covers:

- What generative search, or RAG, is.
- How to configure Weaviate for generative search.
- How to perform generative searches.
- Importing data with generative search in mind.

### Prerequisites

This guide assumes some familiarity with Weaviate, but it is not required. If you are new to Weaviate, we suggest starting with the [Weaviate Quickstart guide](../quickstart/index.md).

## Background

### What is generative search?

Generative search is a powerful technique that retrieves relevant data to provide to large language models (LLMs) as context, along with the task prompt. It is also called retrieval augmented generation (RAG), or in-context learning in some cases.

### Why generative search?

LLM are incredibly powerful, but can suffer from two important limitations. These limitation are that:
- They can confidently produce incorrect, or outdated, information (also called 'hallucination'); and
- They might simply not be trained on the information you need.

Generative search remedies this problem with a two-step process.

The first step is to retrieve relevant data through a query. Then, in the second step, the LLM is prompted with a combination of the retrieve data with a user-provided query.

This provides in-context learning for the LLM, which causes it to use the relevant and up-to-date data rather than rely on recall from its training, or even worse, hallucinated outputs.

### Weaviate and generative search

Weaviate incorporates key functionalities to make generative search easier and faster.

For one, Weaviate's search capabilities make it easier to find relevant information. You can use any of similarity, keyword and hybrid searches, along with filtering capabilities to find the information you need.

Additionally, Weaviate has integrated generative search capabilities, so that the retrieval and generation steps are combined into a single query. This means that you can use Weaviate's search capabilities to retrieve the data you need, and then in the same query, prompt the LLM with the same data.

This makes it easier, faster and more efficient to implement generative search workflows in your application.

## Examples of generative search

Let's begin by viewing examples of generative search in action. We will then explore how to configure Weaviate for generative search.

We will use the publicly available `https://hha2nvjsruetknc5vxwrwa.c0.europe-west2.gcp.weaviate.cloud` instance, which you can access with the `nMZuw1z1zVtnjkXXOMGx9Ows7YWGsakItdus` read-only API key. These examples are configured with the `generative-openai` module and the `gpt-3.5-turbo` model, so you will need an OpenAI API key.

Connect to the instance like so, remembering to replace the API key for the LLM used (OpenAI in this case) with your own API key:

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# Instantiation"
  endMarker="# END Instantiation"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# Instantiation"
  endMarker="# END Instantiation"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeEduDemo}
  startMarker="// Instantiation"
  endMarker="// END Instantiation"
  language="ts"
/>
</TabItem>
</Tabs>

### Data retrieval

Let's take an illustrative example with passages from a book. Here, the Weaviate instance contains a collection of passages from the [Pro Git book](https://git-scm.com/book/en/v2).

Before we can generate text, we need to retrieve relevant data. Let's retrieve the three most similar passages to the meaning of `history of git` with a semantic search.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# DataRetrieval"
  endMarker="# END DataRetrieval"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# DataRetrieval"
  endMarker="# END DataRetrieval"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeEduDemo}
  startMarker="// DataRetrieval"
  endMarker="// END DataRetrieval"
  language="ts"
/>
</TabItem>
</Tabs>

This should return a set of results like the following (truncated for brevity):

```
{
  "data": {
    "Get": {
      "GitBookChunk": [
        {
          "chapter_title": "01-introduction",
          "chunk": "=== A Short History of Git\n\nAs with many great things in life, Git began with a bit of creative ...",
          "chunk_index": 0
        },
        {
          "chapter_title": "01-introduction",
          "chunk": "== Nearly Every Operation Is Local\n\nMost operations in Git need only local files and resources ...",
          "chunk_index": 2
        },
        {
          "chapter_title": "02-git-basics",
          "chunk": "==\nYou can specify more than one instance of both the `--author` and `--grep` search criteria...",
          "chunk_index": 2
        },
      ]
    }
  }
}

```

### Transform result sets

We can transform this result set into new text using generative search with just a minor modification of the code. First, let's use a `grouped task` prompt to summarize this information.

Run the following code snippet, and inspect the results:

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# TransformResultSets"
  endMarker="# END TransformResultSets"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# TransformResultSets"
  endMarker="# END TransformResultSets"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeEduDemo}
  startMarker="// TransformResultSets"
  endMarker="// END TransformResultSets"
  language="ts"
/>
</TabItem>
</Tabs>

Here is our generated text:

```
- Git began as a replacement for the proprietary DVCS called BitKeeper, which was used by the Linux kernel project.
- The relationship between the Linux development community and BitKeeper broke down in 2005, leading to the development of Git by Linus Torvalds.
- Git was designed with goals such as speed, simple design, strong support for non-linear development, and the ability to handle large projects efficiently.
- Most operations in Git only require local files and resources, making them fast and efficient.
- Git allows browsing project history instantly and can calculate differences between file versions locally.
- Git allows offline work and does not require a network connection for most operations.
- This book was written using Git version 2, but most commands should work in older versions as well.
```

In a `grouped task` generative search, Weaviate:
- Retrieves the three most similar passages to the meaning of `history of git`.
- Then prompts the LLM with a combination of:
    - Text from all of the search results, and
    - The user-provided prompt, `Summarize the key information here in bullet points`.

Note that the user-provided prompt did not contain any information about the subject matter. But because Weaviate retrieve the relevant data about the history of git, it was able to summarize the information relating to this subject matter using verifiable data.

That's how easy it is to use generative search in Weaviate.

:::note Your results may vary
There will be variability in the actual text that has been generated. This due to the randomness in LLMs' behaviors, and variability across models. This is perfectly normal.
:::

### Transform individual objects

In this example, we will take a look at how to transform individual objects. This is useful when you want to generate text for each object individually, rather than for the entire result set.

Here we prompt the model to translate individual wine reviews into French, using emojis. The reviews is a subset from a [publicly available dataset of wine reviews](https://www.kaggle.com/zynicide/wine-reviews).

Note that in this query, we apply a `single prompt` parameter. This means that the LLM is prompted with each object individually, rather than with the entire result set.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# TransformIndividualObjects"
  endMarker="# END TransformIndividualObjects"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# TransformIndividualObjects"
  endMarker="# END TransformIndividualObjects"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeEduDemo}
  startMarker="// TransformIndividualObjects"
  endMarker="// END TransformIndividualObjects"
  language="ts"
/>
</TabItem>
</Tabs>

As the query was run with a limit of 5, you should see 5 objects returned, including generated texts.

Here is our generated text for the first object, and the source text:

```
===== Generated text =====
🇺🇸🍷🌿🍑🌼🍯🍊🍮🍽️🌟

Origine : États-Unis
Titre : Schmitz 24 Brix 2012 Sauvignon Blanc (Sierra Foothills)
Corps de la critique : Pas du tout un Sauvignon Blanc typique, il sent l'abricot et le chèvrefeuille et a le goût de la marmelade. Il est sec, mais a le goût d'un vin de dessert tardif. Attendez-vous à une petite aventure gustative ici.

===== Original review =====
Country: US,
Title: Schmitz 24 Brix 2012 Sauvignon Blanc (Sierra Foothills)
Review body Not at all a typical Sauvignon Blanc, this smells like apricot and honeysuckle and tastes like marmalade. It is dry, yet tastes like a late-harvest dessert wine. Expect a little taste adventure here.
```

Here, Weaviate has:
- Retrieved five most similar wine reviews to the meaning of `fruity white wine`.
- For each result, prompted the LLM with:
    - The user-provided prompt, replacing `{country}`, `{title}`, and `{review_body}` with the corresponding text.

In both examples, you saw Weaviate return new text that is original, but grounded in the retrieved data. This is what makes generative search powerful, by combining the best of data retrieval and language generation.

## Generative search, end-to-end

Now, let's go through an end-to-end example for using Weaviate for generative search.

### Your own Weaviate instance

For this example, you will need access to a Weaviate instance that you can write to. You can use any Weaviate instance, such as a local Docker instance, or a WCS instance.

### Configure generative search

:::caution Generative module cannot be changed
Currently, a generative module cannot be changed in the Weaviate collection definition once it has been set. We are looking to change this going forward.
<br/>

If you would like for us to prioritize this issue, please [go to GitHub here](https://github.com/weaviate/weaviate/issues/3364), and give it a thumbs up.
:::

To use generative search, the appropriate `generative-xxx` module must be:
- Enabled in Weaviate, and
- Specified in the collection definition.

Each module is tied to a specific group of LLMs, such as `generative-cohere` for Cohere models, `generative-openai` for OpenAI models and `generative-palm` for PaLM and Gemini models.

If you are using WCS, you will not need to do anything to enable modules.

<details>
  <summary>How to list enabled modules</summary>

You can check which modules are enabled by viewing the `meta` information for your Weaviate instance, as shown below:

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# ListModules"
  endMarker="# END ListModules"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# ListModules"
  endMarker="# END ListModules"
  language="py"
/>
</TabItem>
<TabItem value="ts" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeEduDemo}
  startMarker="// ListModules"
  endMarker="// END ListModules"
  language="ts"
/>
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

<details>
  <summary>How to configure the language model</summary>

Model properties are exposed through the Weaviate module configuration. Accordingly, you can customize them through the `moduleConfig` parameter in the collection definition.

For example, the `generative-cohere` module has the following properties:

```json
    "moduleConfig": {
        "generative-cohere": {
            "model": "command-xlarge-nightly",  // Optional - Defaults to `command-xlarge-nightly`. Can also use`command-xlarge-beta` and `command-xlarge`
            "temperatureProperty": <temperature>,  // Optional
            "maxTokensProperty": <maxTokens>,  // Optional
            "kProperty": <k>, // Optional
            "stopSequencesProperty": <stopSequences>, // Optional
            "returnLikelihoodsProperty": <returnLikelihoods>, // Optional
        }
    }
```

And the `generative-openai` module may be configured as follows:

```json
    "moduleConfig": {
        "generative-openai": {
            "model": "gpt-3.5-turbo",  // Optional - Defaults to `gpt-3.5-turbo`
            "temperatureProperty": <temperature>,  // Optional, applicable to both OpenAI and Azure OpenAI
            "maxTokensProperty": <max_tokens>,  // Optional, applicable to both OpenAI and Azure OpenAI
            "frequencyPenaltyProperty": <frequency_penalty>,  // Optional, applicable to both OpenAI and Azure OpenAI
            "presencePenaltyProperty": <presence_penalty>,  // Optional, applicable to both OpenAI and Azure OpenAI
            "topPProperty": <top_p>,  // Optional, applicable to both OpenAI and Azure OpenAI
        },
    }
```

Please see the [documentation](../modules/reader-generator-modules/index.md) for the appropriate module for more information on configurable properties.

</details>

### Populate database

Adding data to Weaviate for generative search is similar to adding data for other purposes. However, there are some important considerations to keep in mind, such as chunking and data structure.

You can read further discussions in the [Best practices & tips](#best-practices--tips) section. Here, we will use a chunk length of 150 words and a 25-word overlap. We will also include the title of the book, the chapter it is from, and the chunk number. This will allow us to search through the chunks, as well as filter it.

#### Download & chunk

In the following snippet, we download a chapter of the `Pro Git` book, clean it and chunk it.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# ChunkText"
  endMarker="# END ChunkText"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# ChunkText"
  endMarker="# END ChunkText"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeLocal}
  startMarker="// ChunkText"
  endMarker="// END ChunkText"
  language="ts"
/>
</TabItem>
</Tabs>

This will download the text from the chapter, and return a list/array of strings of 150 word chunks, with a 25-word overlap added in front.

#### Create collection definitions

We can now create a collection definition for the chunks. To use generative search, your desired generative module must be specified at the collection level as shown below.

The below collection definition for the `GitBookChunk` collection specifies `text2vec-openai` as the vectorizer and `generative-openai` as the generative module. Note that the `generative-openai` parameter can have an empty dictionary/object as its value, which will use the default parameters.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# CreateClass"
  endMarker="# END CreateClass"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# CreateClass"
  endMarker="# END CreateClass"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeLocal}
  startMarker="// CreateClass"
  endMarker="// END CreateClass"
  language="ts"
/>
</TabItem>
</Tabs>

#### Import data

Now, we can import the data into Weaviate.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# ImportData"
  endMarker="# END ImportData"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# ImportData"
  endMarker="# END ImportData"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeLocal}
  startMarker="// ImportData"
  endMarker="// END ImportData"
  language="ts"
/>
</TabItem>
</Tabs>

Once this is done, you should have imported a collection of chunks from the chapter into Weaviate. You can check this by running a simple aggregation query:

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# CountObjects"
  endMarker="# END CountObjects"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# CountObjects"
  endMarker="# END CountObjects"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeLocal}
  startMarker="// CountObjects"
  endMarker="// END CountObjects"
  language="ts"
/>
</TabItem>
</Tabs>

Which should indicate that there are `10` chunks in the database.

### Generative queries

Now that we have configured Weaviate and populated it with data, we can perform generative queries as you saw in the examples above.

#### Single (per-object) prompts

Single prompts tell Weaviate to generate text based on each retrieved object and the user-provided prompt. In this example, we retrieve two objects and prompt the language model to write a haiku based on the text of each chunk.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# SinglePrompt"
  endMarker="# END SinglePrompt"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# SinglePrompt"
  endMarker="# END SinglePrompt"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeLocal}
  startMarker="// SinglePrompt"
  endMarker="// END SinglePrompt"
  language="ts"
/>
</TabItem>
</Tabs>

It should return haiku-like text, such as:

```
===== Object index: [1] =====
Git's data stored
As snapshots of files, not changes
Efficient and unique

===== Object index: [6] =====
Git has three states:
Untracked, modified, staged.
Commit to save changes.
```

#### Grouped tasks

A grouped task is a prompt that is applied to a group of objects. This allows you to prompt the language model with the entire set of search results, such as source documents or relevant passages.

In this example, we prompt the language model to write a trivia tweet based on the result.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# GroupedTask"
  endMarker="# END GroupedTask"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# GroupedTask"
  endMarker="# END GroupedTask"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeLocal}
  startMarker="// GroupedTask"
  endMarker="// END GroupedTask"
  language="ts"
/>
</TabItem>
</Tabs>

It should return a factoid written for social media, such as:

```
Did you know? 🤔 Git thinks of its data as snapshots, not just changes to files.
📸 Every time you commit, Git takes a picture of all your files and stores a reference to that snapshot.
📂🔗 #GitTrivia
```

#### Pairing with search

Generative search in Weaviate is a two-step process under the hood, involving retrieval of objects and then generation of text. This means that you can use the full power of Weaviate's search capabilities to retrieve the objects you want to use for generation.

In this example, we search the chapter for passages that relate to the states of git before generating a tweet as before.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# NearTextGroupedTask"
  endMarker="# END NearTextGroupedTask"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# NearTextGroupedTask"
  endMarker="# END NearTextGroupedTask"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeLocal}
  startMarker="// NearTextGroupedTask"
  endMarker="// END NearTextGroupedTask"
  language="ts"
/>
</TabItem>
</Tabs>

This should return text like:

```
📝 Did you know? Git has three main states for files: modified, staged, and committed.
🌳📦📂 Learn more about these states and how they affect your Git project!
#GitBasics #Trivia
```

Now, simply by changing the search query, we can generate similar content about different topics.

<Tabs groupId="languages">
<TabItem value="py" label="Python (v4)">
<FilteredTextBlock
  text={PyCode}
  startMarker="# SecondNearTextGroupedTask"
  endMarker="# END SecondNearTextGroupedTask"
  language="py"
/>
</TabItem>
<TabItem value="py3" label="Python (V3)">
<FilteredTextBlock
  text={PyCodeV3}
  startMarker="# SecondNearTextGroupedTask"
  endMarker="# END SecondNearTextGroupedTask"
  language="py"
/>
</TabItem>
<TabItem value="js" label="JavaScript/TypeScript">
<FilteredTextBlock
  text={TSCodeLocal}
  startMarker="// SecondNearTextGroupedTask"
  endMarker="// END SecondNearTextGroupedTask"
  language="ts"
/>
</TabItem>
</Tabs>

In this case, the result should be something like:

```
Did you know? 🤔 Git stores everything by the hash value of its contents, not by file name!
📁🔍 It's hard to lose data in Git, making it a joy to use!
😄🔒 Git thinks of its data as a stream of snapshots, making it more than just a VCS!
📸🌟 Most Git operations are local, so no need for network latency!
🌐💨 #GitTrivia
```

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


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

