---
layout: post
title: Finding answers with Semantic Search module in Weaviate
description: "Finding answers in complex standardizations documents using Weaviate’s semantic search modules"
published: false
author: Micha Verhagen
author-img: /img/people/icon/micha.jpg
card-img: /img/blog/hero/semantic-search-module-in-weaviate-card.png
canonical-url: https://medium.com/semi-technologies/finding-answers-in-complex-standardizations-documents-using-weaviates-semantic-search-modules-4dcdb83527fb
canonical-name: Medium
date: 2021-06-14
toc: true
---

<!-- TODO: make sure the content is up to date -->

## Intro
Before you can offer a product or service in any country, you have to make sure that your product complies with the rules and regulations that apply in that country. These standards ensure that products comply with national and international quality, safety, and reliability standards.

> Semantic search and Q&A through 34k of complex standardization documents with [Weaviate](/). In less then 50 milliseconds

One of the main challenges is finding your way through this large and complex collection of unstructured documents. There are many standards and standardization publications. Some of these standards are voluntary guidelines providing technical specifications, others are a mandatory requirement to comply with specific laws.

Generally, each country has its own standards organization that can help you navigate these regulations. In the Netherlands, that organization is [NEN](https://www.nen.nl/en/){:target="_blank"}, the Royal Netherlands Standardization Institute. NEN manages over 34.000 standards, which includes international, European, and Dutch standards. “NEN is the knowledge network within the Netherlands for standards development and application at both national and international level.” The reasons people contact NEN for support vary from questions on certification, to enlist in training to very detailed questions on specific topics.

## Weaviate enables out-of-the-box semantic search
In this article, I will describe how Weaviate can be used to navigate this large collection of complex standardization documents. What makes Weaviate so suitable for the exploration of documents is that it uses vector indexing mechanisms to represent the data. Vector indexing places documents, or parts of documents in space, which enables semantic exploration.

Take for example the data object that describes a dough mixer:

*{ “data”: “dough mixers are used separately or in a line in the food industry and shops (pastry-making, bakeries, confectionery, etc.) for manufacturing of dough by mixing flour, water, and other ingredients.” }*

Storing this data object in a traditional search engine means that in order to retrieve it; you need to search for exact keywords such as: “dough mixers” or “manufacturing of dough” to find it. But what if you have vast amounts of data and you want to find this data object about dough mixers, but you’ll search for: “pasta machine”? Traditional search engines will not return any results but a vector search engine like Weaviate will. By placing data objects in the vector space we can explore the data objects that sit near ”pasta” and “dough” in the vector space. Weaviate returns results that are very close and intuitively correct.

## Storing the data in Weaviate
A standardization document typically includes a scope section, which indicates for which products the standard is relevant, and a set of technical requirements that we can represent in a [Weaviate schema](/developers/weaviate/current/data-schema/){:target="_blank"}. Below is an example of the scope and one of the requirements from the standard: NEN-EN 453 (en) Food processing machinery — Dough mixers — Safety and hygiene requirements

**Scope:**

<p style="margin-left: 20px; font-style: italic">
This European Standard specifies safety and hygiene requirements for the design and manufacture of dough mixers with rotating bowls of capacity greater than or equal to 5L and less than or equal to 500L.<br/><br/>

These dough mixers are used separately or in a line in the food industry and shops (pastry-making, bakeries, confectionery, etc.) for manufacturing of dough by mixing flour, water and other ingredients. These machines can be fed by hand or mechanically. <br/><br/>

These machines are sometimes used in other industries (e.g. pharmaceutical industry, chemical industry, printing), but hazards related to these uses are not dealt with in this standard.<br/><br/>

This European Standard deals with all significant hazards, hazardous situations and events relevant to the transport, installation, adjustment, operation, cleaning, maintenance, dismantling, disassembling and scrapping of dough mixers, when they are used as intended and under the conditions of misuse which are reasonably foreseeable by the manufacturer.
</p>

**Requirements:**

<p style="margin-left: 20px; font-style: italic">
The distance between the frame and the outside wall of the bowl shall be at least 50 mm. The distance between the outside of the rim and the frame shall be at least 30mm, and the height of the rim is less than or equal to 30mm. The outside of the bowl shall be smooth.
</p>

We store the standard documents in a simple schema, where documents are stored in the “Document” class. Each document has Sections, which are used to represent the chapter structure of the document. And each Section in turn has Paragraphs, which are used to store the text in the documents. Below is a (simplified) representation of the way the documents are organized in Weaviate.

```json
[
  {
    "class": "Document",
    "properties": [
      {
        "name": "title",
        "dataType": [
          "string"
        ]
      },
      {
        "name": "hasParagraph",
        "dataType": [
          "Paragraph"
        ]
      }
    ]
  },
  {
    "class": "Section",
    "properties": [
      {
        "name": "title",
        "dataType": [
          "string"
        ]
      },
      {
        "name": "hasParagraphs",
        "dataType": [
          "Paragraph"
        ]
      }
    ]
  },
  {
    "class": "Paragraph",
    "properties": [
      {
        "name": "text",
        "dataType": [
          "text"
        ]
      },
      {
        "name": "hasSection",
        "dataType": [
          "Section"
        ]
      }
    ]
  }
]
```

Our test data set consisted of a wide variety of standards documents, ranging from medical equipment for human body measurements to explosion prevention in explosive atmospheres to refrigerating systems and heat pumps. So quite a diverse set of standards.

## Finding the right standards using Semantic Search
One of the challenges of NEN customers is to identify the standards that are relevant to the products they offer. We can solve this problem by identifying which paragraphs are semantically close to the concept we are exploring.

In the GraphQL query below we search for the concepts “machines to make pasta” in the vector space containing all standard documents and retrieve all paragraphs that are close to the position of the concept of “machines to make pasta”. How “close” a paragraph should be is determined by the “certainty” (i.e., the distance between the query vector and the result) factor in the query (set to 0.6). We ask Weaviate to return just the first result with a certainty of at least 60%.

```graphql
{
  Get {
    Paragraph (
      limit: 3 # show the first three results
      nearText: {
        concepts: ["machines to make pasta"] # the semantic query
        certainty: 0.6 # between 0.0 and 1.0, the higher the certainty the more the document should match the query
      }){
      inDocument {
         ... on Document {
             title
             number
         }
      }
    }
  }
}
```

Suppose you are a manufacturer of equipment that is used in kitchens and you want to understand which standards apply to your equipment. These are the first results returned by Weaviate of the exploration of the concept “machines to make pasta”.

```json
{
  "Paragraph": [
    {
      "inDocument": [
        {
          "number": "NEN-EN 15774 en",
          "title": "Food processing machinery - Machines for processing fresh and filled pasta (tagliatelle, cannelloni, ravioli, tortellini, orecchiette and gnocchi) - Safety and hygiene requirements"
        },
        {
          "number": "NEN-EN 13621 en",
          "title": "Food processing machinery - Dough mixers - Safety and hygiene requirements"
        },
        {
          "number": "NEN-EN 13208 en",
          "title": "Food processing machinery - Vegetable peelers - Safety and hygiene requirements"
        }
      ]
    }
  ]
}
```

Traditional search engines would have failed to identify these standards as the search terms used do not appear in the search results.

## Question Answering (Q&A) on specific requirements
We can take the exploration of these standard documents one step further: suppose your question is not just to find the appropriate standard, but to also find a specific requirement within that standard. Weaviate has an optional module that can answer specific questions — assuming the answer is actually in the documents in Weaviate.

The optional question answering (Q&A) module for Weaviate uses BERT-related models for finding and extracting answers. This module can be used as a search filter in GraphQL Get{…} queries. The QnA-transformers module tries to find an answer in the data objects of the specified class — in our case, it tries to find an answer in the text property of the class Paragraph.

Assume for example that we are looking for a specific safety requirement for dough mixers; the kind of mixer you see in the (many) baking TV shows nowadays. We can first explore the landscape of all machinery that has to do with kitchen equipment. In the search below we continuously explored the concept of “dinner” — not a word that would appear in the standards, but of course, does have a semantic relation to the content of the documents:

* NEN-EN 15774 Food processing machinery — Machines for processing fresh and filled pasta (tagliatelle, cannelloni, ravioli, tortellini, orecchiette and gnocchi) — Safety and hygiene requirements
* NEN-EN 453 Food processing machinery — Dough mixers — Safety and hygiene requirements
* NEN-EN 13621 Food processing machinery — Salad dryers — Safety and hygiene requirements

The specific safety requirement that we are looking for is the minimum distance between the wall of the bowl and the frame of the mixer. A GraphQL query to find the distance would like like this:

```graphql
{
  Get {
    Paragraph (
      ask: {
        question: "what is the distance between the frame and the outside wall of the bowl?",
        properties: ["text"]
      }, 
      limit:1
    ){
      text
      inDocument {
        ... on Document {
          title
        }
      }
      _additional {
        answer {
          result
          certainty
        }
      }
    }
  }
}
```

The abbreviated answer by Weaviate is given below. Note that Weaviate returns more information on the specific result than what is shown below, but for clarity, we just show a snippet. In the response by Weaviate, you can see that it is 76% certain that it found the correct answer: 50 mm. The answer is found in paragraph 5.2.3 of the standard document NEN-EN 453:2014 en, with the title: “Food processing machinery — Dough mixers — Safety and hygiene requirements”.

```json
{
  "Paragraph": [
    {
      "_additional": {
        "answer": {
          "certainty": 0.76,
          "result": "50 mm"
        }
      },
      "inDocument": [
        {
          "number": "NEN-EN 453:2014 en",
          "title": "Food processing machinery - Dough mixers - Safety and hygiene requirements"
        }
      ],
      "text": "5.2.3 Zone 2 – ... the distance between the frame and the outside wall of the bowl shall be at least 50mm. ...
    }
    ]
}
```

## Conclusion
Semantic search makes exploring complex unstructured documents a lot easier because it does not rely on the exact matching of terms. You can discover documents, or parts or documents, that are literally and figuratively in the neighborhood of the concept that you are exploring.

So if you are looking for a way to offer your customers or your employees a better way to navigate large collections of unstructured documents, Weaviate might be what you need. Weaviate is Open Source, so if you want to discover the power of semantic search firsthand, the [documentation](/developers/weaviate/current/){:target="_blank"} is a great place to start.

## The Weaviate setup
For this setup, we have used:

* Weaviate 1.4.0
* Weaviate vectorizer module with Sentence Embedding Model for MS MARCO
* Weaviate Q&A module with Distilbert enabled.
* Google Cloud n1-standard-4 (4 vCPU, 15 GB memory) and NVIDIA Tesla T4 GPU (estimated costs – at the time of writing – $286.85 per month)

Create your own [Weaviate setup here](/developers/weaviate/current/getting-started/installation.html#customize-your-weaviate-setup){:target="_blank"}.

## Disclaimer
Because the standards contain proprietary data, we can’t open the source of the dataset. But there are similar datasets available through our documentation.

## What next
Check out the [Getting Started with Weaviate](/developers/weaviate/current/getting-started/index.html){:target="_blank"} and begin building amazing apps with Weaviate.

You can reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/weaviate_io){:target="_blank"}.

Weaviate is open source, you can follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.