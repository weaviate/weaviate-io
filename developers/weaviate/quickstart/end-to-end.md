---
title: Weaviate, end-to-end
sidebar_position: 2
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

You should have spun up an instance of Weaviate. Now, let's get an overview of kinds of things you can do with Weaviate, before digging into each step in more detail later on.

By the end of this page, you will have vectorized the quiz data and added it to Weaviate, as well has performed vector searches to retrieve relevant objects! 😊 

## Prerequisites 

At this point, you should have: 

- An new instance of Weaviate running (e.g. on the [Weaviate Cloud Service](https://console.weaviate.io)),
- An API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face, and
- Installed your preferred Weaviate client library. 

import CautionSchemaDeleteAll from '/_includes/schema-delete-all.mdx'

<CautionSchemaDeleteAll />

Download the dataset below to your working directory and let's get going!

<p>
  <DownloadButton link="https://raw.githubusercontent.com/weaviate/weaviate-examples/main/jeopardy_small_dataset/jeopardy_tiny.json">Download jeopardy_tiny.json</DownloadButton>
</p>

## Import data 

Weaviate can take care of data vectorization at import time with its modules. To do so with an inference API, the next steps are to:

- Specify a vectorizer module (e.g. `text2vec-openai`)
- Provide the API key
- Load & import data into Weaviate

### Specify vectorizer 

First, We will define the class of `Question` objects, including telling Weaviate what vectorizer to use. The class definition looks like the following:

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart.autoschema.minimum.schema.mdx'

<CodeAutoschemaMinimumSchema />

Weaviate will infer any further schema information from the given data. 

### Provide the API key

The API key can be provided as an environment variable, but for now, we will include it in our code in the form of a header, for example:

```python
client = weaviate.Client(
    url="https://some-endpoint.weaviate.network/",
    additional_headers={
        "X-OpenAI-Api-Key": api_tkn  # Or "X-OpenAI-Api-Key" or "X-HuggingFace-Api-Key" 
    }
)
```

### Load & import data

Now, we can load our dataset and pass it to the Weaviate client for vectorization and import. 

Note that we use a batch import process here. This will greatly speed up imports, especially when you have a large number of objects, such as ranging in millions, tens of millions, or even larger!

### Putting it together

The following code puts it all together, taking care of everything from schema definition to data import:

:::info Inference API and key
If you are using a different module, replace the module name (e.g. `text2vec-openai`) and the key header name in the code examples to suit your preferred module. 

Also, replace the API key with your own API key. 
:::

import CodeAutoschemaImport from '/_includes/code/quickstart.autoschema.import.mdx'

<CodeAutoschemaImport />

And we are done. 

Note again that we did not provide vectors to Weaviate. That's all managed by Weaviate which calls the inference API for you and turns your object into a vector at import time. 

:::info Can I specify my own vectors?
Yes! You can bring your own vectors and pass them to Weaviate directly.
:::

## Review import

Let's pause here to check that our data import went as expected, and show you a couple of RESTful endpoints.

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
            ...  // lots of additional information here
            "vectorizer": "text2vec-openai"
        }
    ]
}
```

### Confirm import

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

If you wanted to find entries which related to famous scientists, you can apply the `nearText` parameter like so:

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
                    "answer": "Albert Einstein",
                    "question": "His 1905 paper \"On the Electrodynamics of Moving Bodies\" contained his special Theory of Relativity"
                },
                {
                    "answer": "hot air balloons",
                    "question": "These in the skies of Albuquerque on October 3, 1999 were a fine example of Charles' Law in action"
                }
            ]
        }
    }
}
```

Note that neither 'famous' nor 'scientist' occur anywhere, but Weaviate has returned the entry on Einstein as the closest result. The second closest result is also related to the query, as it relates to Charles' Law (named after scientist Jacques Charles).

That's a powerful outcome, which shows a big reason behind the popularity of vector searches. Vectorized data objects allow for searches based on degrees of similarity, such as semantic similarity of text as we did here.

Try it out yourself with different strings, by changing the string from "famous scientist". 

## Recap

If you made it here - that's it. You've successfully built a fully functioning vector database! 🥳

Of course, this was just a quick look, and there's a lot of options and configurations that we have yet to explore. But we've covered a lot in just a couple of pages. 

You have:
- Spun up an instance of Weaviate through WCS
- Populated it with data, vectorizing it with an inference API, and
- Performed text similarity searches.

Next, we will revisit these processes and start to review each section in more detail, starting with the schema.

## Next

- [Schemas in detail](./schema.md).

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
