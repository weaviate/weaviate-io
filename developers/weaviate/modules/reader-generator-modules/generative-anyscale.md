---
title: Generative Search - Anyscale
sidebar_position: 10
image: og/docs/modules/generative-anyscale.jpg
# tags: ['generative', 'rag', 'anyscale']
---


## In short

:::info Added in `v1.23.0`
:::

* The Generative Anyscale (`generative-anyscale`) module performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.
* The module can generate a response for each object returned from Weaviate, or a combined response for a group of objects.
* The module enables generative search operations on the Weaviate instance.
* The default model is `meta-llama/Llama-2-70b-chat-hf`.
* The module requires an [API key for Anyscale inference endpoints](https://docs.anyscale.com/endpoints/overview) to perform the generation task.

## Introduction

`generative-anyscale` performs retrieval augmented generation, or RAG, based on the data stored in your Weaviate instance.

The module works in two steps:
1. (Weaviate) Run a search query in Weaviate to find relevant objects.
2. (Anyscale Inference API) Use a Large Language Model to generate a response based on the results (from the previous step) and the provided prompt or task.

:::note
You can use the Generative Anyscale module with any other upstream modules. For example, you could use `text2vec-cohere`, `text2vec-huggingface` or `text2vec-openai` to vectorize and query your data, but then rely on the `generative-aws` module to generate a response.
:::

The generative module can perform RAG for:
* each returned object - `singlePrompt`
* the group of all results together – `groupedTask`

You need to input both a query and a prompt (for individual responses) or a task (for all responses).


## Weaviate instance configuration

:::tip Not applicable to WCS
This module is enabled and pre-configured on Weaviate Cloud Services.
:::

### Docker Compose file

To use `generative-anyscale`, you must enable it in your Docker Compose file (`docker-compose.yml`). You can do so manually, or create one using the [Weaviate configuration tool](/developers/weaviate/installation/docker-compose.md#configurator).

#### Parameters

- `ENABLE_MODULES` (Required): The modules to enable. Include `generative-anyscale` to enable the module.
- `ANYSCALE_APIKEY` Your Anyscale API key. You can also provide the key at query time.

#### Example

This configuration enables `generative-anyscale` and sets the AWS authentication credentials.

```yaml
---
version: '3.4'
services:
  weaviate:
    command:
    - --host
    - 0.0.0.0
    - --port
    - '8080'
    - --scheme
    - http
    image: cr.weaviate.io/semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
    - 50051:50051
    volumes:
    - weaviate_data:/var/lib/weaviate
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      # highlight-start
      ANYSCALE_APIKEY: escecret-foobar  # Optional. Can be set at query time.
      ENABLE_MODULES: 'text2vec-cohere,generative-anyscale'  # Can be any `text2vec` module.
      # highlight-end
      CLUSTER_HOSTNAME: 'node1'
volumes:
  weaviate_data:
...
```


## Class configuration

You can configure how the module will behave in each class through the [Weaviate schema](/developers/weaviate/manage-data/collections.mdx).

### API settings

#### Parameters

| Parameter | Required | Default | Purpose |
| :- | :- | :- | :- |
| `model` | No | `"meta-llama/Llama-2-70b-chat-hf"` | The model to use. Defaults to Llama-2 70B.
| `temperature` | No | 0 | Control of LLM stochasticity. |

### Supported models

You can use any of the following models with `generative-anyscale`:

* `meta-llama/Llama-2-70b-chat-hf`
* `meta-llama/Llama-2-13b-chat-hf`
* `meta-llama/Llama-2-7b-chat-hf`
* `codellama/CodeLlama-34b-Instruct-hf`
* `HuggingFaceH4/zephyr-7b-beta`
* `mistralai/Mistral-7B-Instruct-v0.1`

#### Example

The following example configures the `Document` class to use the `generative-anyscale` module with the `Document` class, with the `meta-llama/Llama-2-70b-chat-hf` model.

```json
{
  "classes": [
    {
      "class": "Document",
      "description": "A class called document",
      ...,
      "moduleConfig": {
        // highlight-start
        "generative-anyscale": {
          "model": "meta-llama/Llama-2-70b-chat-hf",
        },
        // highlight-end
      }
    }
  ]
}
```

<details>
  <summary>New to Weaviate Schemas?</summary>

If you are new to Weaviate, check out the [Weaviate schema tutorial](/developers/weaviate/starter-guides/schema.md).

</details>


## How to use

### Query-time parameters

You can supply parameters at query time by adding them to the HTTP header.

| HTTP Header | Value | Purpose | Note |
| :- | :- | :- | :- |
| `"X-Anyscale-Api-Key"` | Your Anyscale API key. | Authentication | [Learn more](https://docs.anyscale.com/endpoints/overview)|

### Queries

This module extends the  `_additional {...}` property with a `generate` operator.

`generate` takes the following arguments:

| Field | Data Type | Required | Example | Description |
|- |- |- |- |- |
| `singleResult {prompt}`  | string | no | `Summarize the following in a tweet: {summary}`  | Generates a response for each individual search result. You need to include at least one result field in the prompt, between braces. |
| `groupedResult {task}`  | string | no | `Explain why these results are similar to each other`  | Generates a single response for all search results |

#### Example of properties in the prompt

When piping the results to the prompt, at least one field returned by the query must be added to the prompt. If you don't add any fields, Weaviate will throw an error.

For example, assume your schema looks like this:

```graphql
{
  Article {
    title
    summary
  }
}
```

You can add both `title` and `summary` to the prompt by enclosing them in curly brackets:

```graphql
{
  Get {
    Article {
      title
      summary
      _additional {
        generate(
          singleResult: {
            prompt: """
            Summarize the following in a tweet:

            {title} - {summary}
            """
          }
        ) {
          singleResult
          error
        }
      }
    }
  }
}
```

#### Example - single result

Here is an example of a query where:
* we get a podcast clip (with limit 1)
* then we ask the generator module to summarize the content into one sentence.
  * the query asks for the `speaker` and `content` fields, which are then included in the `prompt` argument of the `generate` operator.

import AnyscaleSingleResult from '/_includes/code/generative.anyscale.singleresult.mdx';

<AnyscaleSingleResult/>

#### Example response - single result

```json
{
  "data": {
    "Get": {
      "PodClip": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "singleResult": "  Nils Reimers discussed the challenge of training machine learning models to retrieve counter-arguments or opposing evidence, citing the example of searching for \"nuclear energy is safe\" and wanting the model to return arguments that oppose this view, rather than similar arguments or evidence that supports it."
            }
          },
          "content": "Yeah, so in the BEIR benchmark we have one data set, which is really interesting. It's called ArguAna. When you want to find counter-arguments, so you have an argument, say, nuclear energy is super safe, and then you want to have retrieval to find counter-arguments to say, okay no, nuclear energy is not safe. Obviously, out of the box models, if I search for, nuclear energy is safe, it finds like different arguments that also mentioned nuclear energy is one of the safest energy sources, so there are the questions like, how can I tell the model of my intent that I don't want to have arguments that are similar, but arguments that are opposing? And the paper you mentioned, use this in terms of kind of like instruct style. Say, okay, find a counter argument, nuclear energy is safe, or find a similar argument, or find evidence. I think it's a nice idea, especially if people want to build this into their product. So if you have like a search engine and you wanna find some arguments with supporting and opposing evidences and different perspective, so I think it's an easy way for machine learning engineers and search engine engineers just to prepare the prefix and say, okay, now I wanna search for opposing documents or, supporting evidence or opposing evidence for this.",
          "speaker": "Nils Reimers"
        }
      ]
    }
  }
}
```

#### Example - grouped result

Here is an example of a query where:
* we run a vector search (with `nearText`) to find podcast clips semantically similar to `"What is ref2vec?"`
* then we ask the generator module to answer the question: `"What is ref2vec?"` based on the search results.

import AnyscaleGroupedResult from '/_includes/code/generative.anyscale.groupedresult.mdx';

<AnyscaleGroupedResult />

#### Example response - grouped result

```json
{
  "data": {
    "Get": {
      "PodClip": [
        {
          "_additional": {
            "generate": {
              "error": null,
              "groupedResult": "  Ref2Vec is a new module in the Weaviate module system that allows for vectorization of objects based on the aggregate of their referenced vectors. It is designed to be useful when representing something as an aggregation of other things, such as users based on their likes. The Ref2Vec module takes an object and grabs the vectors from all of its referenced objects, then computing a centroid with that set of vectors to find something that's similar to all of these things at once. This can be useful for representing diverse interests, and can be used for recommendation systems, such as quickly having recommendations while scrolling through a platform like TikTok, without the need for a long archive of user data. Additionally, clustering the embeddings could be powerful for diverse interests, and the cross-reference thing could be used to represent centroids. Overall, Ref2Vec is a powerful tool for representing and aggregating data in a flexible and efficient way."
            }
          },
          "content": "Yeah, exactly. And I think it's worth kind of knowing that these systems are a little different than maybe traditional software cases where these edge cases, like machine learning performance is very like long tailed, like hit or miss. And I think the BEIR benchmarks, a particular reason why I'm so excited about this particular work is the diversity captured in it. It has papers about COVID-19, it has financial questions like, are my personal taxes separate from my hobby income? And then you have like nutrition questions about like, are multivitamins a waste of money? So you have this incredible diversity, the diversity in query length. And I think we're also seeing the kind of intents, this kind of exploration is, this research is emerging as well, where you'd say, what is the intent of the search task and that kind of exploration? So yeah, overall, I just couldn't be more excited about the benchmarking. I think it's such an exciting step for us. So I want to pivot topics. I'm so excited to have Parker, especially because he was so pivotal to the development of Ref2Vec. Parker, could you start by kind of explaining what Ref2Vec is? And then I really want to dive into sort of some of the questions that we've been seeing in our community chat, like particularly clarifying, updating the references and how this kind of cascades backwards, thinking around like, can we have custom aggregation functions, but maybe we could set the stage. Could you tell us about what Ref2Vec is? ",
          "speaker": "Connor Shorten"
        },
        {
          "_additional": {
            "generate": null
          },
          "content": "Yeah, certainly. So Ref2Vec Centroid is a new module that we released recently. And the idea of it is that an object which is set to be vectorized, so to speak, by Ref2Vec Centroid, a vector isn't produced by this object itself, but it's produced by like the aggregate of its referenced vectors. So the Ref2Vec module will take an object and then grab the vectors from all of its references, all of its referenced objects. And then we'll compute a centroid with that set of vectors to find something that's similar to all of these things at once. And so the idea is that this is really useful when you want to represent something as an aggregation of other things, right? For example, users based on their likes, right? What can we show to a user that is something that aligns with what their express interests are in Ref2Vec Centroid is something that's perfect for doing something like that. ",
          "speaker": "Parker Duckworth"
        },
        {
          "_additional": {
            "generate": null
          },
          "content": "Yeah, currently our only module in the class of ref2vec is ref2vec-centroid. This was built purposely to be able to be easily expanded into more centroid type algorithms, or more algorithms to calculate this reference vector however you want to calculate it. So Weaving's module system is by design very modular. So if we were to want to introduce something like this, most of the boilerplate, I guess you could say the groundwork has already been set. So it's just a matter of coming up with the way you want to calculate these reference vectors, and then introducing a new module which piggybacks this existing ref2vec framework that we've built within the Weaving module system to use this new algorithm to calculate the reference vector. So I would say for any reference or ref2vec centroid modules in the future, it's not a whole lot of work to introduce a new one. It's just a matter of figuring out how you want to calculate these reference vectors. ",
          "speaker": "Parker Duckworth"
        },
        {
          "_additional": {
            "generate": null
          },
          "content": "Yeah, super interesting. I think one other thing that excites me, and yeah, I think that the building blocks of that are in place, and that will be super impactful just based on that a little longer. If you imagine you want to have recommendation without logging in and having that long archive of user data, you want to just be able to scroll through TikTok and quickly have recommendations. I think that kind of thing lets you control it by giving the signal of recency. One other thing that excites me is this idea of clustering the embeddings. I think that could be super powerful, especially for diverse interests. So if you've liked these products and it's Nike shoes, Adidas shoes, Jordan shoes, I think instead of averaging it, we could have this clustering, and then the centroids could be used, which brings this topic of how might we represent centroids. I think the cross-reference thing, again, is we would use it again to do multi-vector representation and that kind of idea. So super cool. I think, yeah, this overall, this 1.17, and thanks so much for the discussion on ref2vec. I'm so excited about ref2vec. I think this kind of graph structure, how we can send embeddings through the graphs and aggregate them, I think a lot of people are excited about it because I think it's exciting. But anyways, thanks so much. I think, yeah, replication, hybrid search, and sort of the Italy 1.17 release, all of it. ",
          "speaker": "Connor Shorten"
        },
        {
          "_additional": {
            "generate": null
          },
          "content": "Hey, everyone, I'm super excited to host Etienne Dilocker and Parker Duckworth for the Weaviate 1.17 release podcast. These releases are always so great. It feels like such a celebration of Weaviate and the hard work of the team to bring these new features into Weaviate. So today we're mainly talking about replication and hybrid search. And we're also welcoming Parker Duckworth for the first time on the Weaviate podcast. So we'll talk about Ref2Vec as well a little bit. So firstly, Parker, thank you so much for joining the Weaviate podcast. ",
          "speaker": "Connor Shorten"
        }
      ]
    }
  }
}
```


<!-- TODO - ADD THE BELOW TO THE RELEASE BLOG -->
<!-- Weaviate 1.23 introduces the `generative-anyscale` module, bringing open-source LLM heavyweights such as the Llama 70B, 13B, and 7B series, as well as CodeLlama 34B and Mistral 7B. Stay tuned for further integrations with Anyscale's Fine-tuning APIs and adding custom model paths to Weaviate's Generative Search modules. -->

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
