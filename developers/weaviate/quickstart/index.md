---
title: Quickstart Tutorial
sidebar_position: 0
image: og/docs/quickstart-tutorial.jpg
# tags: ['getting started']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import WCSoptionsWithAuth from '../../wcs/img/wcs-options-with-auth.png';
import WCScreateButton from '../../wcs/img/wcs-create-button.png';
import WCSApiKeyLocation from '../../wcs/img/wcs-apikey-location.png';

## Overview

Welcome. Here, you'll get a quick taste of Weaviate in <i class="fa-solid fa-timer"></i> ~20 minutes.

You will:
- Build a vector database, and
- Query it with *semantic search*.

:::info Object vectors
With Weaviate, you have options to:
- Have **Weaviate create vectors**, or
- Specify **custom vectors**.

This tutorial demonstrates both methods.
:::

#### Source data

We will use a (tiny) dataset of quizzes.

<details>
  <summary>What data are we using?</summary>

The data comes from a TV quiz show ("Jeopardy!")

|    | Category   | Question                                                                                                          | Answer                  |
|---:|:-----------|:------------------------------------------------------------------------------------------------------------------|:------------------------|
|  0 | SCIENCE    | This organ removes excess glucose from the blood & stores it as glycogen                                          | Liver                   |
|  1 | ANIMALS    | It's the only living mammal in the order Proboseidea                                                              | Elephant                |
|  2 | ANIMALS    | The gavial looks very much like a crocodile except for this bodily feature                                        | the nose or snout       |
|  3 | ANIMALS    | Weighing around a ton, the eland is the largest species of this animal in Africa                                  | Antelope                |
|  4 | ANIMALS    | Heaviest of all poisonous snakes is this North American rattlesnake                                               | the diamondback rattler |
|  5 | SCIENCE    | 2000 news: the Gunnison sage grouse isn't just another northern sage grouse, but a new one of this classification | species                 |
|  6 | SCIENCE    | A metal that is "ductile" can be pulled into this while cold & under pressure                                     | wire                    |
|  7 | SCIENCE    | In 1953 Watson & Crick built a model of the molecular structure of this, the gene-carrying substance              | DNA                     |
|  8 | SCIENCE    | Changes in the tropospheric layer of this are what gives us weather                                               | the atmosphere          |
|  9 | SCIENCE    | In 70-degree air, a plane traveling at about 1,130 feet per second breaks it                                      | Sound barrier           |

</details>

<hr/><br/>

## Create an instance

First, create a Weaviate database.

1. Go to the [WCS Console](https://console.weaviate.cloud), and
    1. Click <kbd>Sign in with the Weaviate Cloud Services</kbd>.
    1. If you don't have a WCS account, click on <kbd>Register</kbd>.
1. Sign in with your WCS username and password.
1. Click <kbd>Create cluster</kbd>.

:::note <i class="fa-solid fa-camera-viewfinder"></i> <small>To create a WCS instance:</small>
<img src={WCScreateButton} width="100%" alt="Button to create WCS instance"/>
:::

<details>
  <summary>Can I use another method?</summary>

Yes. If you prefer another method, please see our [installation options](../installation/index.md) page.

</details>


Then:

1. Select the <kbd>Free sandbox</kbd> tier.
1. Provide a *Cluster name*.
1. Set *Enable Authentication?* to <kbd>YES</kbd>.

:::note <i class="fa-solid fa-camera-viewfinder"></i> <small>Your selections should look like this:</small>
<img src={WCSoptionsWithAuth} width="100%" alt="Instance configuration"/>
:::

Click <kbd>Create</kbd>. This will take ~2 minutes and you'll see a tick ✔️ when finished.

#### Note your cluster details

You will need:
- The Weaviate URL, and
- Authentication details (Weaviate API key).

Click <kbd>Details</kbd> to see them.

For the Weaviate API key, click on the <kbd><i class="fa-solid fa-key"></i></kbd> button.

:::note <i class="fa-solid fa-camera-viewfinder"></i> <small>Your WCS cluster details should look like this:</small>
<img src={WCSApiKeyLocation} width="60%" alt="Instance API key location"/>
:::

<hr/><br/>

## Install a client library

We suggest useing a [Weaviate client](../client-libraries/index.md). To install your preferred client <i class="fa-solid fa-down"></i>:

import CodeClientInstall from '/_includes/code/quickstart.clients.install.mdx';

:::info Install client libraries

<CodeClientInstall />

:::

<hr/><br/>

## Connect to Weaviate

From the <kbd>Details</kbd> tab in WCS, get:
- The Weaviate **API key**, and
- The Weaviate **URL**.

And because we will use the Hugging Face inference API to generate vectors, you need:
- A Hugging Face **inference API key**.

So, instantiate the client as follows:

import ConnectToWeaviateWithKey from '/_includes/code/quickstart.autoschema.connect.withkey.mdx'

<ConnectToWeaviateWithKey />

Now you are connected to your Weaviate instance!

<hr/><br/>

## Define a class

Next, we define a data collection (a "class" in Weaviate) to store objects in:

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart.autoschema.minimum.schema.mdx'

<CodeAutoschemaMinimumSchema />

<details>
  <summary>What if I want to use a different vectorizer module?</summary>

In this example, we use the `Hugging Face` inference API. But you can use others.

:::tip Our recommendation
Vectorizer selection is a big topic - so for now, we suggest sticking to the defaults and focus on learning the basics of Weaviate.
:::

If you do want to change the vectorizer, you can - as long as:
- The module is available in the Weaviate instance you are using, and
- You have an API key (if necessary) for that module.

Each of the following modules is available in the free sandbox.

- `text2vec-cohere`
- `text2vec-huggingface`
- `text2vec-openai`
- `text2vec-palm`

Depending on your choice, make sure to pass on the API key for the inference service by setting the header with an appropriate line from below, remembering to replace the placeholder with your actual key:

```js
"X-Cohere-Api-Key": "YOUR-COHERE-API-KEY",  // For Cohere
"X-HuggingFace-Api-Key": "YOUR-HUGGINGFACE-API-KEY",  // For Hugging Face
"X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",  // For OpenAI
"X-Palm-Api-Key": "YOUR-PALM-API-KEY",  // For PaLM
```

Additionally, we also provide suggested `vectorizer` module configurations.

<Tabs groupId="inferenceAPIs">
<TabItem value="cohere" label="Cohere">

```json
class_obj = {
  "class": "Question",
  "vectorizer": "text2vec-cohere",
}
```

</TabItem>
<TabItem value="huggingface" label="Hugging Face">

```js
class_obj = {
  "class": "Question",
  "vectorizer": "text2vec-huggingface",
  "moduleConfig": {
    "text2vec-huggingface": {
      "model": "sentence-transformers/all-MiniLM-L6-v2",  // Can be any public or private Hugging Face model.
      "options": {
        "waitForModel": true,  // Try this if you get a "model not ready" error
      }
    }
  }
}
```

</TabItem>
<TabItem value="openai" label="OpenAI">

```js
class_obj = {
  "class": "Question",
  "vectorizer": "text2vec-openai",
  "moduleConfig": {
    "text2vec-openai": {
      "model": "ada",
      "modelVersion": "002",
      "type": "text"
    }
  }
}
```

</TabItem>
<TabItem value="palm" label="PaLM">

```js
class_obj = {
  "class": "Question",
  "vectorizer": "text2vec-palm",
  "moduleConfig": {
    "text2vec-palm": {
      "projectId": "YOUR-GOOGLE-CLOUD-PROJECT-ID",    // Required. Replace with your value: (e.g. "cloud-large-language-models")
      "apiEndpoint": "YOUR-API-ENDPOINT",             // Optional. Defaults to "us-central1-aiplatform.googleapis.com".
      "modelId": "YOUR-GOOGLE-CLOUD-MODEL-ID",        // Optional. Defaults to "textembedding-gecko".
    },
  }
}
```

</TabItem>
</Tabs>

</details>

This creates a class `Question`, tells Weaviate which `vectorizer` to use, and sets the `moduleConfig` for the vectorizer.

:::tip Is a `vectorizer` setting mandatory?
- No. You always have the option of providing vector embeddings yourself.
- Setting a `vectorizer` gives Weaviate the option of creating vector embeddings for you.
    - If you do not wish to, you can set this to `none`.
:::

Now you are ready to add objects to Weaviate.

<hr/><br/>

## Add objects

We'll add objects to our Weaviate instance using a **batch import** process.

<details>
  <summary>Why use batch imports?</summary>

Batch imports provide significantly improved import performance, so you should almost always use batch imports unless you have a good reason not to, such as single object creation.

</details>

First, you will use the `vectorizer` to create object vectors.

### *Option 1*: `vectorizer`

The below passes object data without a vector. This causes Weaviate to use the specified `vectorizer` to create a vector embedding for each object.

import CodeAutoschemaImport from '/_includes/code/quickstart.autoschema.import.mdx'

<CodeAutoschemaImport />

The above code:
- Loads objects,
- Initializes a batch process, and
- Adds objects to the target class (`Question`) one by one.

### *Option 2*: Custom `vector`s

Alternatively, you can also provide your own vectors to Weaviate.

Regardless of whether a `vectorizer` is set, if a vector is specified, Weaviate will use it to represent the object.

import CodeAutoschemaImportCustomVectors from '/_includes/code/quickstart.autoschema.import.custom.vectors.mdx'

<CodeAutoschemaImportCustomVectors />

<details>
  <summary>Custom vectors with a <code>vectorizer</code></summary>

Note that you can specify a `vectorizer` and still provide a custom vector. In this scenario, make sure that the vector comes from the same model as one specified in the `vectorizer`. <p><br/></p>

In this tutorial, they come from `sentence-transformers/all-MiniLM-L6-v2` - the same as specified in the vectorizer configuration.

</details>

:::tip vector != object property
Do *not* specify object vectors as an object property. This will cause Weaviate to treat it as a regular property, rather than as a vector embedding.
:::

<hr/><br/>

# Putting it together

The following code puts the above steps together. You can run it yourself to import the data into your Weaviate instance.

<details>
  <summary>End-to-end code</summary>

:::tip Remember to replace the **URL**, **Weaviate API key** and **inference API key**
:::

import CodeAutoschemaEndToEnd from '/_includes/code/quickstart.autoschema.endtoend.mdx'

<CodeAutoschemaEndToEnd />

Congratulations, you've successfully built a vector database!

</details>

<hr/><br/>

## Queries

Now, we can run queries.

### Semantic search

Let's try a similarity search. We'll use `nearText` search to look for quiz objects most similar to `biology`.

import CodeAutoschemaNeartext from '/_includes/code/quickstart.autoschema.neartext.mdx'

<CodeAutoschemaNeartext />

You should see a result like this (these may vary per module/model used):

import BiologyQuestionsJson from '/_includes/code/quickstart.biology.questions.mdx'

<BiologyQuestionsJson />

The response includes a list of top 2 (due to the `limit` set) objects whose vectors are most similar to the word `biology`.

:::tip Why is this useful?
Notice that even though the word `biology` does not appear anywhere, Weaviate returns biology-related entries.

This example shows why vector searches are powerful. Vectorized data objects allow for searches based on degrees of similarity, as shown here.
:::

### Semantic search with a filter

You can add a Boolean filter to your example. For example, let's run the same search, but only look in objects that have a "category" value of "ANIMALS".

import CodeAutoschemaNeartextWithWhere from '/_includes/code/quickstart.autoschema.neartext.where.mdx'

<CodeAutoschemaNeartextWithWhere />

You should see a result like this (these may vary per module/model used):

import BiologyQuestionsWhereJson from '/_includes/code/quickstart.biology.where.questions.mdx'

<BiologyQuestionsWhereJson />

The response includes a list of top 2 (due to the `limit` set) objects whose vectors are most similar to the word `biology` - but only from the "ANIMALS" category.

:::tip Why is this useful?
Using a Boolean filter allows you to combine the flexibility of vector search with the precision of `where` filters.
:::


<!-- Note: Added the generative search example; but hiding it for now as it makes the workflow quite difficult for new users. 1) They will now need an OpenAI/Cohere key. 2) The schema needs to include a generative module definition. 3) Rate limit on generative API is low; so might be painful. -->

<!-- ### Generative search

Now let's try a generative search. We'll retrieve a set of results just as we did above, before using an LLM to explain each answer in plain terms.

import CodeAutoschemaGenerative from '/_includes/code/quickstart.autoschema.generativesearch.mdx'

<CodeAutoschemaGenerative />

You should see a result like this (may vary depending on the model used):

import BiologyGenerativeSearchJson from '/_includes/code/quickstart.biology.generativesearch.mdx'

<BiologyGenerativeSearchJson />

Here, we see that Weaviate has retrieved the same results as before. But now it includes an additional, generated text with a plain-language explanation of each answer.

:::tip Why is this useful?
Generative search sends retrieved data from Weaviate to a large language model (LLM). This allows you to go beyond simple data retrieval, but transform the data into a more useful form, without ever leaving Weaviate.
::: -->

<hr/><br/>

## Recap

Well done! You have:
- Created your own cloud-based vector database with Weaviate,
- Populated it with data objects,
    - Using an inference API, or
    - Using custom vectors,
- Performed text similarity searches.

Where next is up to you. We include a few links below - or you can check out the sidebar.

<!-- TODO - Provide a few concrete "intermediate" learning paths -->

## Troubleshooting & FAQs

We provide answers to some common questions, or potential issues below.

#### How to confirm class creation

<details>
  <summary>See answer</summary>

If you are not sure whether the class has been created, you can confirm it by visiting the [`schema` endpoint](../api/rest/schema.md) here (replace the URL with your actual endpoint):

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
            "vectorizer": "text2vec-huggingface"
        }
    ]
}
```

Where the schema should indicate that the `Question` class has been added.

:::note REST & GraphQL in Weaviate
Weaviate uses a combination of RESTful and GraphQL APIs. In Weaviate, RESTful API endpoints can be used to add data or obtain information about the Weaviate instance, and the GraphQL interface to retrieve data.
:::

</details>

#### If you see <code>Error: Name 'Question' already used as a name for an Object class</code>

<details>
  <summary>See answer</summary>

You may see this error if you try to create a class that already exists in your instance of Weaviate. In this case, you can delete the class following the below instructions.

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

</details>

#### How to confirm data import

<details>
  <summary>See answer</summary>

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

#### If the `nearText` search is not working

<details>
  <summary>See answer</summary>

To perform text-based (`nearText`) similarity searches, you need to have a vectorizer enabled, and configured in your class.

Make sure you configured it as shown in [this section](#define-a-class).

If it still doesn't work - please [reach out to us](#more-resources)!

</details>

#### Will my sandbox be deleted?

<details>
  <summary>Note: Sandbox expiry & options</summary>

import SandBoxExpiry from '/_includes/sandbox.expiry.mdx';

<SandBoxExpiry/>

</details>

## Next

import WhatNext from '/_includes/quickstart.what-next.mdx';

<WhatNext />

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
