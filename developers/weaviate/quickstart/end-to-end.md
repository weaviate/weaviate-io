---
title: Weaviate, end-to-end
sidebar_position: 50
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

Here, you will gain a hands-on overview of what you can do with Weaviate.

By the end of this page, you will have:
- Vectorized a dataset
- Added the vectorized data to Weaviate, and
- Performed vector searches to retrieve relevant objects

:::tip Prefer to use your own vectors?
You can! See [this video](../manage-data/vector-provision-options.mdx) for an overview of vector provision options, and [this page](../api/rest/objects.md#with-a-custom-vector) to see how to specify vectors at import time.
:::

### Code examples

We have prepared code examples to help you follow along here. Go to [weaviate-tutorials/quickstart](https://github.com/weaviate-tutorials/quickstart) on GitHub to take a look.

## Prerequisites

At this point, you should:

- Have an instance of Weaviate running (e.g. on the [Weaviate Cloud Services](../../wcs/quickstart.mdx)),
- Have an API key for your preferred inference API, such as OpenAI, Cohere, or Hugging Face,
- Installed your preferred Weaviate client library, and
- Know how to connect to your Weaviate instance.

We will be working with [this dataset](https://raw.githubusercontent.com/weaviate-tutorials/quickstart/main/data/jeopardy_tiny.json), which will be loaded directly from the remote URL.

import WCSWithoutAuthentication from '/_includes/code/wcs.without.authentication.mdx';
import WCSAuthenticationApiKey from '/_includes/code/wcs.authentication.api.key.mdx';
import WCSAuthenticationUserPass from '/_includes/code/wcs.authentication.user.pass.mdx';

:::tip Connecting to Weaviate
Before going further, please make sure that you can connect to your Weaviate instance, e.g. with the Weaviate client.

<br/>
<details>
  <summary><b>Without authentication enabled</b></summary>

<WCSWithoutAuthentication/>

</details>

If you do have authentication enabled, you can log in with an API key (recommended), or with OIDC.

<br/>
<details>
  <summary>With <b>API key authentication</b> (Recommended)</summary>

<WCSAuthenticationApiKey/>

</details>

<details>
  <summary>With <b>OIDC authentication</b> (WCS username & password)</summary>

<WCSAuthenticationUserPass/>

</details>

Going forward, the examples will assume that

- Authentication is enabled, and
- The API key authentication method is used.
:::

## Import data

As a vector database, Weaviate operates using vector representations, also known as "embeddings", of data objects.

To generate these vector embeddings, you can employ a Weaviate ["vectorizer" module](../modules/retriever-vectorizer-modules/index.md), which can generate vectors at the time of import. Alternatively, you're welcome to supply your own "custom" vector embeddings.

If you choose to use a vectorizer module, you don't need to worry about vectorization other than choosing an appropriate vectorizer and passing the data to Weaviate.

:::tip Prefer to use custom vectors?
See the ["Bring Your Own Vectors" Quickstart guide](./custom-vectors.mdx) or [this reference](../api/rest/objects.md#with-a-custom-vector) for more information if you would like to use your own vectors instead of using a vectorizer module.
:::

Using an inference API is one good way to do this. To do so:

- Specify a vectorizer module (e.g. `text2vec-openai`)
- Provide the API key
- Load & import data into Weaviate

### Specify a vectorizer

First, we must define the class objects to store the data and specify what vectorizer to use. The following will create a `Question` class with the given vectorizer, and add it to the schema:

:::note Which inference API?
This tutorial uses the OpenAI API to obtain vectors. But you can use any of Cohere, Hugging Face or OpenAI inference APIs with WCS, as the relevant [Weaviate modules](../modules/retriever-vectorizer-modules/index.md) for those are already built in by default.

Change the vectorizer setting below to point to your preferred module.
:::

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart.autoschema.minimum.schema.mdx'

<CodeAutoschemaMinimumSchema />

Weaviate will infer any further schema information from the given data. If you would like to know more, check out [this tutorial](../tutorials/schema.md) which covers schemas in more detail.

<details>
  <summary>Confirm schema creation</summary>

After you have added the class to the schema, you can confirm that it has been created by visiting the [`schema` endpoint](../api/rest/schema.md). You can inspect the Weaviate schema here (replace the URL with your actual endpoint):

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

Where the schema should indicate that the `Question` class has been added.

:::note REST & GraphQL in Weaviate
Weaviate uses a combination of RESTful and GraphQL APIs. In Weaviate, RESTful API endpoints can be used to add data or obtain information about the Weaviate instance, and the GraphQL interface to retrieve data.
:::

</details>

:::note If you see this error: `Name 'Question' already used as a name for an Object class`
You may see this error if you try to create a class that already exists in your instance of Weaviate. In this case, you can delete the class following the below instructions.
:::

### Deleting classes

<details>
  <summary>
    See how you can delete classes.
  </summary>

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

</details>

<hr />

### Provide the inference API key

import ProvideOpenAIAPIKey from '/_includes/provide-openai-api-key-headers.mdx'

<ProvideOpenAIAPIKey />

:::note Not using OpenAI?
If you are not using OpenAI, change the API key parameter in the code examples from `X-OpenAI-Api-Key` to one relevant to your chosen inference API, such as `X-Cohere-Api-Key` for Cohere or `X-HuggingFace-Api-Key` for Hugging Face.
:::

### Load & import data

Now, we can load our dataset and import it into Weaviate. The code looks roughly like this:

import CodeAutoschemaImport from '/_includes/code/quickstart.autoschema.import.mdx'

<CodeAutoschemaImport />

Note that we use a batch import process, so that each request to the inference API contains multiple objects. You should use batch imports unless you have a good reason not to, as it will significantly improve the speed of data ingestion.

### Putting it together

The following code puts it all together, taking care of everything from schema definition to data import. Remember to replace the endpoint and inference API key (and API key name if necessary).

import CodeAutoschemaEndToEnd from '/_includes/code/quickstart.autoschema.endtoend.mdx'

<CodeAutoschemaEndToEnd />

And that should have populated Weaviate with the data, including corresponding vectors!

Note again that we did not provide any vectors to Weaviate. That's all managed by Weaviate, which calls the inference API for you and obtains a vector corresponding to your object at import time.

<details>
  <summary>Confirm data import</summary>

To confirm successful data import, navigate to the [`objects` endpoint](../api/rest/objects.md) to check that all objects have been imported (replace with your actual endpoint):

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

Where you should be able to confirm that you have imported all `10` objects.

</details>

## Query Weaviate

Now that you've built a database, let's try some queries.

### Text similarity search

One of the most common use cases is text similarity search. As we have a `text2vec` module enabled, we can use the `nearText` parameter for this purpose.

If you wanted to find entries related to biology, you can apply the `nearText` parameter like so:

import CodeAutoschemaNeartext from '/_includes/code/quickstart.autoschema.neartext.mdx'

<CodeAutoschemaNeartext />

Note that we use the `Get` function (or the relevant client implementation) to fetch objects, and the query text is specified in the `concept` field.

You should see something like this:

import BiologyQuestionsJson from '/_includes/code/quickstart.biology.questions.mdx'

<BiologyQuestionsJson />

Note that even though the word 'biology' does not appear anywhere, Weaviate has returned biology-related entries (on DNA and species) as the closest results. Also, it has returned these entries over and above many entries otherwise related to animals in general.

That's a simple but powerful outcome, which shows a big reason behind the popularity of vector searches. Vectorized data objects allow for searches based on degrees of similarity, such as semantic similarity of text as we did here.

Try it out yourself with different strings, by changing the string from "biology".

## Recap

If you made it here - well done. We have covered a lot in just a couple of pages, and you've successfully built a fully functioning vector database! 🥳

You have:
- Vectorized your dataset through an inference API,
- Populated your Weaviate instance with the vectorized data, and
- Performed text similarity searches.

Of course, there is a lot more to Weaviate that we have not yet covered, and probably a lot that you wish to know about. So we include a few links below that might help you to get started in your journey with us.

Also, please feel free to reach out to us on our community [Slack](https://weaviate.io/slack) or [forum](https://forum.weaviate.io/). We love to hear from our users.

## Next

import WhatNext from '/_includes/quickstart.what-next.mdx';

<WhatNext />

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
