---
layout: post
title: Wikipedia and Weaviate
description: Semantic search through the complete Wikipedia with the Weaviate vector search engine
published: true
author: Bob van Luijt
author-img: /img/people/bob.jpg
card-img: /img/blog/hero/semantic-search-with-wikipedia-and-weaviate.jpg
hero-img: /img/blog/hero/semantic-search-with-wikipedia-and-weaviate-card.jpg
canonical-url: https://towardsdatascience.com/semantic-search-through-wikipedia-with-weaviate-graphql-sentence-bert-and-bert-q-a-3c8a5edeacf6   
canonical-name: Towards Data Science
toc: false
redirect_from: /blog/2021/11/Semantic-Search-with-Wikipedia-and-Weaviate.html
---

## Intro
To conduct semantic search queries on a large scale, one needs a vector search engine to search through the large number of vector representations that represent the data. To show you how this can be done, [we have open-sourced the complete English language Wikipedia corpus](https://github.com/semi-technologies/semantic-search-through-wikipedia-with-weaviate){:target="_blank"} backup in Weaviate. In this article, I will outline how we’ve created the dataset, show you how you can run the dataset yourself, and present search strategies on how to implement similar vector and semantic search solutions in your own projects and how to bring them to production.

The Wikipedia dataset used is the “truthy” version of October 9th, 2021. After processing it contains 11.348.257 articles, 27.377.159 paragraphs, and 125.447.595 graph cross-references. Although a bigger machine (see below) is needed for importing the data, the serving is done on a 12 CPU, 100 GB RAM, 250Gb SSD Google Cloud VM with 1 x NVIDIA Tesla P4. The ML-models used are [multi-qa-MiniLM-L6-cos-v1](https://huggingface.co/sentence-transformers/multi-qa-MiniLM-L6-cos-v1){:target="_blank"} and [bert-large-uncased-whole-word-masking-finetuned-squad](https://huggingface.co/bert-large-uncased-whole-word-masking-finetuned-squad){:target="_blank"} both are available as [pre-built modules](/developers/weaviate/current/modules/text2vec-transformers.html#pre-built-images){:target="_blank"} in Weaviate.

📄 The complete dataset and code is open-source and available [on Github](https://github.com/semi-technologies/semantic-search-through-wikipedia-with-weaviate){:target="_blank"}.

![Demo GIF of Weaviate using the Wikipedia dataset](https://miro.medium.com/max/1400/1*UrAMc2buVKmo9dRpiH4SqA.gif)
*Example semantic search queries in Weaviate’s GraphQL interface — GIF by Author*

## Importing the Data In Two Steps
> You can also directly import a backup into Weaviate without doing the import your self as outlined [here](https://github.com/semi-technologies/semantic-search-through-wikipedia-with-weaviate/tree/main#step-3-load-from-backup){:target="_blank"}.

To import the data we use two different methods. The first is to clean the data set and the second one is to import the data.

### Step 1 – Cleaning the Data
The first step is pretty straightforward, we will clean the data and create a [JSON Lines](https://jsonlines.org/){:target="_blank"} file to iterate over during import. You can run this process yourself or download the proceed file following [this](https://github.com/semi-technologies/semantic-search-through-wikipedia-with-weaviate#step-1-process-the-wikipedia-dump){:target="_blank"} link.

### Step 2 — Importing the Data
This is where the heavy lifting happens because all paragraphs need to be vectorized we are going to use Weaviate’s modular setup to use multiple GPUs that we will stuff with models, but before we do this we need to create a Weaviate schema that represents our use case.

### Step 2.1 — Create a Weaviate Schema
Within Weaviate we will be using a schema that determines how we want to query the data in GraphQL and which parts we want to vectorize. Within a schema, you can set different vectorizers and vectorize instructions on a class level.

First, because our use case is semantic search over Wikipedia, we will be dividing the dataset into paragraphs and use Weaviate’s graph schema to link them back to the articles. Therefore we need two classes; *Article* and *Paragraph*.

![Weaviate class structure](https://miro.medium.com/max/1400/1*EiNwH-6mzFV9XEzUbzOs4g.png)
*Weaviate class structure*

Next, we want to make sure that the content of the paragraphs gets vectorized properly, the vector representations that the SentenceBERT transformers will generate are used for all our semantic search queries.

![A single data type that gets vectorized](https://miro.medium.com/max/1400/1*hr-hXkHxRunaFE_DyCYniA.png)
*A single data type that gets vectorized*

Last, we want to make graph relations, in the dataset from step one we will distill all the graph relations between articles that we can reference like this:

![Paragraph cross-references](https://miro.medium.com/max/1400/1*KQ6bMvifjVFW0Vge9OMJ8g.png)
*Paragraph cross-references*

The complete schema we import using the [Python client](/developers/weaviate/current/client-libraries/python.html){:target="_blank"} can be found [here](https://github.com/semi-technologies/semantic-search-through-wikipedia-with-weaviate/blob/main/step-2/import.py#L19-L120){:target="_blank"}.

## Step 2.2 — Import the Data
Because we are going to vectorize a lot of data. We will be using the same machine as mentioned in the opening but with 4 instead of 1 GPU.

![Google Cloud GPU setup with a Weaviate load balancer](https://miro.medium.com/max/1400/1*vlqMiJ6yJXtj_C9vwi3fzw.png)
*Google Cloud GPU setup with a Weaviate load balancer*

The load balancer will redirect the traffic to available Weaviate transformer modules so that the import speed significantly increases. In the section: *Implementation Strategies — Bringing Semantic Search to Production* below you’ll find more info about how you can run this in production.

Most critically, we are going to set an external volume in the Docker Compose file to make sure that we store the data outside the container. This will allow us to package the backup and run Weaviate in the last step directly from the backup.

In the environment variables, we set a CLUSTER_HOSTNAME, an arbitrary name you can set to identify a cluster.

![Docker environment setup](https://miro.medium.com/max/1400/1*jWIfbgrUzQ_J4ahetu6Q1g.png)
*Docker environment setup*

We will also set the location of the volume outside Weaviate, in this case the data will be stored in the /var/weaviate folder

![Volumes for backup](https://miro.medium.com/max/1400/1*sdVTsJn6hqH4YefQvYK3YA.png)
*Volumes for backup*

You can find the complete docker-compose file we’ve used here.

## Query the Data
The current Weaviate setup has two modules enabled: semantic search and Q&A. The modules can be used for different types of queries. The query language used is GraphQL and can be used with a wide variety of [client libraries](/developers/weaviate/current/client-libraries/){:target="_blank"} in different programming languages.

### Example 1 — natural language questions
In this example, we pose a natural language question, and we will assume that the first result contains the answer (hence the limit is set to 1). The result based on the latest dataset contains a certainty (i.e., the distance from the query to the answer in the vector space) of ≈ 0.68. In your end application, you can set limits to the certainty to determine if you want to present the results to the end-user, in the latest paragraph of this article (Implementation Strategies — Bringing Semantic Search to Production) you’ll find more info about this.

```graphql
{
  Get {
    Paragraph(
      ask: { 
        question: "Where is the States General of The Netherlands located?"
        properties: ["content"]
      }
      limit: 1
    ) {
      _additional {
        answer {
          result
          certainty
        }
      }
      content
      title
    }
  }
}
```

💡 LIVE — [try out this query](https://console.semi.technology/console/query#weaviate_uri=http://semantic-search-wikipedia-with-weaviate.api.vectors.network:8080&graphql_query=%23%23%0A%23%20Using%20the%20Q%26A%20module%20I%0A%23%23%0A%7B%0A%20%20Get%20%7B%0A%20%20%20%20Paragraph(%0A%20%20%20%20%20%20ask%3A%20%7B%0A%20%20%20%20%20%20%20%20question%3A%20%22Where%20is%20the%20States%20General%20of%20The%20Netherlands%20located%3F%22%0A%20%20%20%20%20%20%20%20properties%3A%20%5B%22content%22%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%201%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20answer%20%7B%0A%20%20%20%20%20%20%20%20%20%20result%0A%20%20%20%20%20%20%20%20%20%20certainty%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20content%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D){:target="_blank"}

### Example 2 — generic concept search
One can not only search for natural language questions, but also generic concepts like “Italian food” in the overview below. The `nearText` filter also allows for [more specific filters](https://towardsdatascience.com/semantic-search-through-wikipedia-with-weaviate-graphql-sentence-bert-and-bert-q-a-3c8a5edeacf6#:~:text=more%20specific%20filters){:target="_blank"} like `moveAwayFrom` and `MoveTo` concepts to manipulate the search through vector space.

```graphql
{
  Get {
    Paragraph(
      nearText: {
        concepts: ["Italian food"]
      }
      limit: 50
    ) {
      content
      order
      title
      inArticle {
        ... on Article {
          title
        }
      }
    }
  }
}
```

💡 LIVE — [try out this query](https://console.semi.technology/console/query#weaviate_uri=http://semantic-search-wikipedia-with-weaviate.api.vectors.network:8080&graphql_query=%23%23%0A%23%20Generic%20question%20about%20Italian%20food%0A%23%23%0A%7B%0A%20%20Get%20%7B%0A%20%20%20%20Paragraph(%0A%20%20%20%20%20%20nearText%3A%20%7B%0A%20%20%20%20%20%20%20%20concepts%3A%20%5B%22Italian%20food%22%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%2050%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20content%0A%20%20%20%20%20%20order%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20inArticle%20%7B%0A%20%20%20%20%20%20%20%20...%20on%20Article%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D){:target="_blank"}

### Example 3 — mix natural language questions with scalar search
Within Weaviate you can also mix scalar search filters with vector search filters. In the specific case, we want to conduct a semantic search query through all the paragraphs of articles about the saxophone player Michael Brecker.

```graphql
{
  Get {
    Paragraph(
      ask: {
        question: "What was Michael Brecker's first saxophone?"
        properties: ["content"]
      }
      where: {
        operator: Equal
        path: ["inArticle", "Article", "title"]
        valueString: "Michael Brecker"
      }
      limit: 1
    ) {
      _additional {
        answer {
          result
        }
      }
      content
      order
      title
      inArticle {
        ... on Article {
          title
        }
      }
    }
  }
}
```

💡 LIVE — [try out this query](https://console.semi.technology/console/query#weaviate_uri=http://semantic-search-wikipedia-with-weaviate.api.vectors.network:8080&graphql_query=%23%23%0A%23%20Mixing%20scalar%20queries%20and%20semantic%20search%20queries%0A%23%23%0A%7B%0A%20%20Get%20%7B%0A%20%20%20%20Paragraph(%0A%20%20%20%20%20%20ask%3A%20%7B%0A%20%20%20%20%20%20%20%20question%3A%20%22What%20was%20Michael%20Brecker's%20first%20saxophone%3F%22%0A%20%20%20%20%20%20%20%20properties%3A%20%5B%22content%22%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20operator%3A%20Equal%0A%20%20%20%20%20%20%20%20path%3A%20%5B%22inArticle%22%2C%20%22Article%22%2C%20%22title%22%5D%0A%20%20%20%20%20%20%20%20valueString%3A%20%22Michael%20Brecker%22%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%201%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20answer%20%7B%0A%20%20%20%20%20%20%20%20%20%20result%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20content%0A%20%20%20%20%20%20order%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20inArticle%20%7B%0A%20%20%20%20%20%20%20%20...%20on%20Article%20%7B%0A%20%20%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D){:target="_blank"}

### Example 4 — mix generic concept search with graph relations
With Weaviate you can also use the GraphQL interface to make graph relations like -in the case of Wikipedia- links between different articles. In this overview we connect the paragraphs to the articles and show the linking articles.

```graphql
{
  Get {
    Paragraph(
      nearText: {
        concepts: ["jazz saxophone players"]
      }
      limit: 25
    ) {
      content
      order
      title
      inArticle {
        ... on Article { # <== Graph connection I
          title
          hasParagraphs { # <== Graph connection II
            ... on Paragraph {
              title
            }
          }
        }
      }
    }
  }
}
```

💡 LIVE — [try out this query](https://console.semi.technology/console/query#weaviate_uri=http://semantic-search-wikipedia-with-weaviate.api.vectors.network:8080&graphql_query=%23%23%0A%23%20Using%20the%20Q%26A%20module%20I%0A%23%23%0A%7B%0A%20%20Get%20%7B%0A%20%20%20%20Paragraph(%0A%20%20%20%20%20%20ask%3A%20%7B%0A%20%20%20%20%20%20%20%20question%3A%20%22Where%20is%20the%20States%20General%20of%20The%20Netherlands%20located%3F%22%0A%20%20%20%20%20%20%20%20properties%3A%20%5B%22content%22%5D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20limit%3A%201%0A%20%20%20%20)%20%7B%0A%20%20%20%20%20%20_additional%20%7B%0A%20%20%20%20%20%20%20%20answer%20%7B%0A%20%20%20%20%20%20%20%20%20%20result%0A%20%20%20%20%20%20%20%20%20%20certainty%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20content%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D){:target="_blank"}

## Implementation Strategies — Bringing Semantic Search to Production
The goal of Weaviate is to allow you to bring large ML-first applications to production. But like with any technology, it is not a silver bullet and success depends on your implementation.

### Scalability
The demo dataset runs on a Docker setup on a single machine, you can easily spin up a Kubernetes cluster if you want to use the Weaviate dataset in production. How to do this, is outlined [here](/developers/weaviate/current/architecture/cluster.html){:target="_blank"}.

## Conclusion
To bring semantic search solutions to production, you need three things:

1. Data
1. ML-Models
1. Vector search engine

In this article, we have shown how you can bring the complete Wikipedia corpus (data) using open-source ML-models (Sentence-BERT) and a vector search engine (Weaviate) to production.

## What next
Check out the [Getting Started with Weaviate](/developers/weaviate/current/getting-started/index.html){:target="_blank"} and begin building amazing apps with Weaviate.

You can reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/weaviate_io){:target="_blank"}.

Weaviate is open source, you can follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.