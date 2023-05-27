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

Welcome to the **Quickstart tutorial**. Here, you will:
- Create a vector database with Weaviate Cloud Services (WCS),
- Import data, and
- Perform searches

There are no prerequisites.

### Vector options

Here, we will show you two different ways to create vector representations in Weaviate:
- **Have Weaviate create vectors**, and
- Use **user-specified vectors**.

You can use either or both of the options with Weaviate.

### Source data

We will use a (tiny) dataset from a TV quiz show ("Jeopardy!").

<details>
  <summary>Take a look at the dataset</summary>

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

## Create a Weaviate instance

You need a Weaviate instance to add data to. We recommend using a free WCS instance. To create one:

1. Go to the [Weaviate Cloud Console](https://console.weaviate.cloud), and
    1. Click on "Sign in with the Weaviate Cloud Services".
    1. If you don't have a WCS account with WCS, click on "Register" and create a new account.
1. Sign in with your WCS username and password.
1. Click on "Create cluster".

<img src={WCScreateButton} width="100%" alt="Button to create WCS instance"/>

Then:

1. Select the **Free sandbox** *plan tier*.
1. Provide a *cluster name*, which will become a part of its URL (with a suffix).
1. Set the `Enable Authentication?` option to `YES`.

Your selections should look like this:

<img src={WCSoptionsWithAuth} width="100%" alt="Instance configuration"/>

Finally, click on **Create**. You will see a tick ✔️ (in 2 minutes or so), when the instance has been created.

Under "Details", you will find the Weaviate instance related information like the **API key** (see the highlighted button), **URL** and so on.

<img src={WCSApiKeyLocation} width="60%" alt="Instance API key location"/>

<details>
  <summary>Sandbox expiry & options</summary>

import SandBoxExpiry from '/_includes/sandbox.expiry.mdx';

<SandBoxExpiry/>

</details>

## Install a client library

We recommend you use a Weaviate client library. Currently they are available for [Python](../client-libraries/python.md), [TypeScript/JavaScript](../client-libraries/typescript.mdx), [Go](../client-libraries/go.md) and [Java](../client-libraries/go.md).

Install your preferred client by following the below:

import CodeClientInstall from '/_includes/code/quickstart.clients.install.mdx';

<CodeClientInstall />

## Connect to Weaviate

Let's connect to your Weaviate instance. From the "Details" screen above in WCS, you will need:
- The Weaviate instance **API key**, and
- The Weaviate instance **URL**.

We will also use an inference service API to generate our vectors (see the `vectorizer` setting below). For this, we must provide:
- An additional **inference API key**.

The inference API key will be provided to Weaviate as an additional header.

You can instantiate the client as below:

import ConnectToWeaviateWithKey from '/_includes/code/quickstart.autoschema.connect.withkey.mdx'

<ConnectToWeaviateWithKey />

<details>
  <summary>Which vectorizer module to use?</summary>

You can choose any vectorizer module for this tutorial, as long as:
- The module is available in the Weaviate instance you are using, and
- You have an API key (if necessary) for that module.

We use the `text2vec-huggingface` module by default. But you can use any of the following modules, all of which are available in the free sandbox. We have provided suggested `vectorizer` module configurations for you to use.

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

And then, make sure to pass on the API key for the inference service by setting the header at instantiation like so, remembering to replace the placeholder with your actual key:

```js
"X-Cohere-Api-Key": "YOUR-COHERE-API-KEY",  // For Cohere
"X-HuggingFace-Api-Key": "YOUR-HUGGINGFACE-API-KEY",  // For Hugging Face
"X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",  // For OpenAI
"X-Palm-Api-Key": "YOUR-PALM-API-KEY",  // For PaLM
```

</details>

## Define a class

We'll define a data collection, called a "class", to store data objects.

In the class definition, let's specify a `vectorizer`. This will allow Weaviate to create vector representations of the data objects in that class.

:::tip Custom vectors
- You always have the option of providing vector embeddings yourself.
- Setting a `vectorizer` gives Weaviate the option of creating vector embeddings for you.
    - If you do not wish to, you can set this to `none`.
:::

Create a `Question` class with a vectorizer as shown below. We will use an inference service API, which will create vector embeddings for us. The class definition includes suggested basic configurations to get started with.

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart.autoschema.minimum.schema.mdx'

<CodeAutoschemaMinimumSchema />

<details>
  <summary>Confirm schema creation</summary>

You can confirm that it has been created by visiting the [`schema` endpoint](../api/rest/schema.md) here (replace the URL with your actual endpoint):

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

<details>
  <summary>If you see <code>Error: Name 'Question' already used as a name for an Object class</code></summary>

You may see this error if you try to create a class that already exists in your instance of Weaviate. In this case, you can delete the class following the below instructions.

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

</details>

## Add objects

We use a **batch import** here. You should use batch imports unless you have a good reason not to, as it will significantly improve the import speeds.

Now, we will load our dataset and batch import it into Weaviate. The steps are to:
- Load objects
- Initialize a batch process
- Add objects one by one, specifying the class (in this case, `Question`) to add to

### *Option 1*: Use the `vectorizer`

import CodeAutoschemaImport from '/_includes/code/quickstart.autoschema.import.mdx'

<CodeAutoschemaImport />

Because we have not provided vector embeddings, Weaviate uses the `vectorizer` specified in the class definition to create vector embeddings for us.

### *Option 2*: Specify `vector`s

Alternatively, you can also specify your own vectors to Weaviate. Regardless of whether a `vectorizer` is set, if a vector is specified, Weaviate will use it to represent the object.

In the below example, we load pre-computed vectors, and add them to Weaviate with each object.

import CodeAutoschemaImportCustomVectors from '/_includes/code/quickstart.autoschema.import.custom.vectors.mdx'

<CodeAutoschemaImportCustomVectors />

If you are using a `vectorizer`, make sure that the vector comes from the same model as one specified in the `vectorizer`. In this case, they come from `sentence-transformers/all-MiniLM-L6-v2`.

## Putting it together

The following code puts it all together (remember to replace your **URL**, **Weaviate API key** and **inference API key**). You can copy and paste this into your own code editor, and run it. Doing so will import the data into your Weaviate instance.

import CodeAutoschemaEndToEnd from '/_includes/code/quickstart.autoschema.endtoend.mdx'

<CodeAutoschemaEndToEnd />

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

Congratulations, you've successfully built a vector database and populated it with data!

## Query Weaviate

Now that you've built a database, let's try some queries.

### Text similarity search

We'll try a text similarity search. As we have a `text2vec` module enabled, we can use text-based similarity search. Let's look for quiz items related to `biology`.

You can carry out text-based similarity searches with the `nearText` parameter like below, specifying the query text in the `concept` field.

import CodeAutoschemaNeartext from '/_includes/code/quickstart.autoschema.neartext.mdx'

<CodeAutoschemaNeartext />

You should see something like this (the results may vary depending on the model used):

import BiologyQuestionsJson from '/_includes/code/quickstart.biology.questions.mdx'

<BiologyQuestionsJson />

Even though the word `biology` does not appear anywhere, Weaviate has returned biology-related entries as the closest results.

This example shows why vector searches are powerful. Vectorized data objects allow for searches based on degrees of similarity, as shown here.

## Recap

Well done. You have successfully built a fully functioning vector database, including running your first queries.

You have:
- Created your own Weaviate instance
- Populated your Weaviate instance with data,
    - Used an inference API in the process, and
- Performed text similarity searches.

Where next is up to you. We include a few links below - or you can check out the sidebar.

## Next

import WhatNext from '/_includes/quickstart.what-next.mdx';

<WhatNext />

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
