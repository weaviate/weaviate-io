---
title: Weaviate, end-to-end
sidebar_position: 2
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

Here, you will gain a hands-on overview of things that you can do with Weaviate. If you are curious about some of the steps - don't worry, you can dig further into each step in more detail later on.

By the end of this page, you will have:
- Vectorized the quiz data
- Added the vectorized data to Weaviate, and
- Performed vector searches to retrieve relevant objects

### Jupyter notebook for Python users

We have prepared a [Jupyter notebook](https://github.com/weaviate/weaviate-examples/blob/main/quickstart_code/quickstart_code.ipynb) which you can run on Google Colab, a cloud Python environment with a browser front end.

<a target="_blank" href="https://colab.research.google.com/github/weaviate/weaviate-examples/blob/main/quickstart_code/quickstart_code.ipynb">
  <img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/>
</a>

## Prerequisites 

At this point, you should have: 

- A new instance of Weaviate running (e.g. on the [Weaviate Cloud Service](https://console.weaviate.io)),
- An API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face, and
- Installed your preferred Weaviate client library. 

import CautionSchemaDeleteAll from '/_includes/schema-delete-all.mdx'

<CautionSchemaDeleteAll />

Download the dataset below to your working directory, and you will be ready to get started 😊.

<p>
  <DownloadButton link="https://raw.githubusercontent.com/weaviate/weaviate-examples/main/jeopardy_small_dataset/jeopardy_tiny.json">Download jeopardy_tiny.json</DownloadButton>
</p>

## Import data 

Weaviate can take care of data vectorization at import time with its [`vectorizer modules`](../modules/retriever-vectorizer-modules/index.md). So you don't need to worry about vectorization other than choosing an appropriate vectorizer and passing the data to Weaviate. 

Using an inference API is one good way to do this. To do so:

- Specify a vectorizer module (e.g. `text2vec-openai`)
- Provide the API key
- Load & import data into Weaviate

### Specify a vectorizer 

First, we must define the class objects to store the data and specify what vectorizer to use. The following `Question` class definition will do just that:

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart.autoschema.minimum.schema.mdx'

<CodeAutoschemaMinimumSchema />

Weaviate will infer any further schema information from the given data. We'll cover more on this later.

### Provide the API key

Include the API key in our code in the form of a header, as in the example below. Select the right format for your preferred inference API:

import JSONApiKey from '/_includes/code/api.key.mdx'

<JSONApiKey />

:::note API key options
The API key can also be provided as an environment variable. Refer to the docs for your favorite inference API [module](../modules/retriever-vectorizer-modules/index.md).
:::

### Load & import data

Now, we can load our dataset and import it into Weaviate. The code looks roughly like this:

import CodeAutoschemaImport from '/_includes/code/quickstart.autoschema.import.mdx'

<CodeAutoschemaImport />

Note that we use a batch import process here for speed. You should use batch imports unless you have a good reason not to. We'll cover more on this later.

### Putting it together

The following code puts it all together, taking care of everything from schema definition to data import:

:::info Inference API and key
If you are using a different module, replace the module name (e.g. `text2vec-openai`) and the key header name in the code examples to suit your preferred module. 

Also, replace the API key `api_tkn` with your own API key.
:::

import CodeAutoschemaEndToEnd from '/_includes/code/quickstart.autoschema.endtoend.mdx'

<CodeAutoschemaEndToEnd />

And that should have populated Weaviate with the data including corresponding vectors!

Note again that we did not provide any vectors to Weaviate. That's all managed by Weaviate which calls the inference API for you and turns your object into a vector at import time. 

:::info Can I specify my own vectors?
Yes! You can bring your own vectors and pass them to Weaviate directly.
:::

## Review import

Let's pause here to check that our data import went as expected, and show you a couple of RESTful endpoints.

:::info REST & GraphQL in Weaviate
Weaviate uses a combination of RESTful and GraphQL APIs. In Weaviate, RESTful API end-points can be used to add data or obtain information about the Weaviate instance, and the GraphQL interface to retrieve data.
:::

### Confirm schema creation

Navigate to the [`schema` endpoint](../api/rest/schema.md) to check the Weaviate schema:

```
https://some-endpoint.weaviate.network/v1/schema
```

You should see:

```json
{
    "classes": [
        {
            "class": "Question",
            ...  // truncated additional information here
            "vectorizer": "text2vec-openai"
        }
    ]
}
```

### Confirm data import

Navigate to the [`objects` endpoint](../api/rest/objects.md) to check that all objects have been imported:

```
https://some-endpoint.weaviate.network/v1/objects
```

You should see:

```json
{
    "deprecations": null,
    "objects": [
        ...  // Details of each object
    ],
    "totalResults": 10  // You should see 10 results here
}
```

If you see that the schema includes the `Question` class, and `10` total objects, you've successfully imported the data. 

## Query Weaviate

Now that you've built a database, let's try some queries. 

### Text similarity search

One of the most common use cases is text similarity search. As we have a `text2vec` module enabled, we can use the `nearText` parameter for this purpose. 

If you wanted to find entries which related to biology, you can apply the `nearText` parameter like so:

import CodeAutoschemaNeartext from '/_includes/code/quickstart.autoschema.neartext.mdx'

<CodeAutoschemaNeartext />

Note that we use the `Get` function to fetch objects, and the query text is specified in the `concept` field.

You should see something like this:

```json
{
    "data": {
        "Get": {
            "Question": [
                {
                    "answer": "DNA",
                    "category": "SCIENCE",
                    "question": "In 1953 Watson & Crick built a model of the molecular structure of this, the gene-carrying substance"
                },
                {
                    "answer": "species",
                    "category": "SCIENCE",
                    "question": "2000 news: the Gunnison sage grouse isn't just another northern sage grouse, but a new one of this classification"
                }
            ]
        }
    }
}
```

Note that even though the word 'biology' does not appear anywhere, Weaviate has returned biology-related entries (on DNA and species) as the closest results. Also, it has returned these entries over and above many entries otherwise related to animals in general.

That's a simple but powerful outcome, which shows a big reason behind the popularity of vector searches. Vectorized data objects allow for searches based on degrees of similarity, such as semantic similarity of text as we did here.

Try it out yourself with different strings, by changing the string from "biology". 

## Recap

If you made it here - well done. We have covered a lot in just a couple of pages, and you've successfully built a fully functioning vector database! 🥳 

You have:
- Spun up an instance of Weaviate through WCS,
- Vectorized your dataset through an inference API,
- Populated your WCS instance with the vectorized data, and
- Performed text similarity searches.

Of course, there is a lot more to Weaviate that we have not yet covered, and probably a lot that you wish to know about. So we include a few links below that might help you to get started in your journey with us. 

Also, please feel free to reach out to us on our community [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw). We love to hear from our users. 

## Next

You can choose your own direction from here. For example, you can:

- Learn more about how to do things in [Tutorials](../tutorials/index.md), like [build schemas](../tutorials/schema.md), [import data](../tutorials/import.md), [query data](../tutorials/query.md) and more.
- Read about important [concepts/theory about Weaviate](../concepts/index.md)
- Read our references for:
    - [Configuration](../configuration/index.md)
    - [API](../api/index.md)
    - [Modules](../modules/index.md)
    - [Client libraries](../client-libraries/index.md)

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
