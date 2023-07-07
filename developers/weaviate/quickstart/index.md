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
- Perform a vector search

:::tip How long will this take?
This should take around 20 minutes or so.
:::

:::info Object vectors
When you import data into Weaviate, you can optionally:
- Have **Weaviate create vectors**, or
- Specify **custom vectors**.

This tutorial demonstrates both methods. For the first method, we will use an **inference API**, and show you how you can change it.
:::

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

First, create a Weaviate database instance. We'll use a free instance from Weaviate Cloud Services (WCS).

1. Go to the [WCS Console](https://console.weaviate.cloud), and
    1. Click on <kbd>Sign in with the Weaviate Cloud Services</kbd>.
    1. If you don't have a WCS account, click on <kbd>Register</kbd>.
1. Sign in with your WCS username and password.
1. Click on <kbd>Create cluster</kbd>.

<details>
  <summary>See screenshot</summary>

To create a WCS instance:

<img src={WCScreateButton} width="100%" alt="Button to create WCS instance"/>

</details>

Then:

1. Select the <kbd>Free sandbox</kbd> plan tier.
1. Provide a *Cluster name*. This plus a suffix will be your URL.
1. Set the *Enable Authentication?* option to <kbd>YES</kbd>.

<details>
  <summary>See screenshot</summary>

Your selections should look like this:

<img src={WCSoptionsWithAuth} width="100%" alt="Instance configuration"/>

</details>

Finally, click on <kbd>Create</kbd>. A tick ✔️ will appear (in ~2 minutes) when the instance has been created.

### Make note of cluster details

You will need the cluster URL, and authentication details. Click on the <kbd>Details</kbd> button to see them. The authentication details (**Weaviate API key**) can be found by clicking on the key button.

<details>
  <summary>See screenshot</summary>

Your cluster details should look like this:

<img src={WCSApiKeyLocation} width="60%" alt="Instance API key location"/>

</details>

## Install a client library

We recommend you use a Weaviate client library. Currently they are available for [Python](../client-libraries/python.md), [TypeScript/JavaScript](../client-libraries/typescript.mdx), [Go](../client-libraries/go.md) and [Java](../client-libraries/go.md). Install your preferred client as follows:

import CodeClientInstall from '/_includes/code/quickstart.clients.install.mdx';

<CodeClientInstall />

## Connect to Weaviate

Now connect to your Weaviate instance. From the <kbd>Details</kbd> tab in WCS, get:
- The Weaviate instance **API key**, and
- The Weaviate instance **URL**.

And if you want to use the inference service API to generate vectors, you must provide:
- An additional **inference API key** in the header.

:::tip Choose your own vectorizer module
In this example, we use the `Hugging Face` inference API. But you can use others:
<br/>
<details>
  <summary>What if I want to use a different vectorizer module?</summary>

You can choose any vectorizer (`text2vec-xxx`) module for this tutorial, as long as:
- The module is available in the Weaviate instance you are using, and
- You have an API key (if necessary) for that module.

We use the `text2vec-huggingface` module in the Quickstart, but all of the following modules are available in the free sandbox.

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

</details>
:::

So, instantiate the client as follows:

import ConnectToWeaviateWithKey from '/_includes/code/quickstart.autoschema.connect.withkey.mdx'

<ConnectToWeaviateWithKey />

Now you are connected to your Weaviate instance.

## Define a class

Next, we need to define a data collection (a "class" in Weaviate) to store objects in.

Create a `Question` class with a `vectorizer` configured as shown below. This will allow Weaviate to convert data objects to vectors. It also includes the inference service setting to create vector embeddings. The class definition includes a suggested basic configuration for the module.

:::tip Is a `vectorizer` setting mandatory?
- No. You always have the option of providing vector embeddings yourself.
- Setting a `vectorizer` gives Weaviate the option of creating vector embeddings for you.
    - If you do not wish to, you can set this to `none`.
:::

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart.autoschema.minimum.schema.mdx'

<CodeAutoschemaMinimumSchema />

<details>
  <summary>If you are using a different vectorizer</summary>

In case you are using a different vectorizer, we also provide suggested `vectorizer` module configurations.

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

## Add objects

Now, we'll add objects using a **batch import** process. We will:
- Load objects,
- Initialize a batch process, and
- Add objects one by one, specifying the class (in this case, `Question`) to add to.

We'll show both options, first using the `vectorizer` to create object vectors, and then providing custom vectors.

### *Option 1*: Use the `vectorizer`

The below code builds objects without any specific vector data. This will cause Weaviate to use the `vectorizer` in the class definition to create a vector embedding for each object.

import CodeAutoschemaImport from '/_includes/code/quickstart.autoschema.import.mdx'

<CodeAutoschemaImport />

### *Option 2*: Specify custom `vector`s

Alternatively, you can also provide your own vectors to Weaviate. Regardless of whether a `vectorizer` is set, if a vector is specified, Weaviate will use it to represent the object.

The below example specifies pre-computed vectors with each object.

import CodeAutoschemaImportCustomVectors from '/_includes/code/quickstart.autoschema.import.custom.vectors.mdx'

<CodeAutoschemaImportCustomVectors />

<details>
  <summary>Custom vectors with a <code>vectorizer</code></summary>

Note that you can specify a `vectorizer` and still provide a custom vector. In this scenario, make sure that the vector comes from the same model as one specified in the `vectorizer`. <p><br/></p>

In this tutorial, they come from `sentence-transformers/all-MiniLM-L6-v2` - the same as specified in the vectorizer configuration.

</details>

:::tip (Almost) Always use batch imports
Batch imports provide significantly improved import performance, so you should almost always use batch imports unless you have a good reason not to, such as single object creation.
:::

## Putting it together

The following code puts it all together. Try running it yourself to will import the data into your Weaviate instance.

:::tip Remember to replace the **URL**, **Weaviate API key** and **inference API key**
:::

import CodeAutoschemaEndToEnd from '/_includes/code/quickstart.autoschema.endtoend.mdx'

<CodeAutoschemaEndToEnd />

Congratulations, you've successfully built a vector database!

## Query Weaviate

Now, we can run queries.

### Text similarity search

As we have a `text2vec` module enabled, Weaviate can perform text-based (`nearText`) similarity searches.

Try the `nearText` search shown below, looking for quiz objects related to `biology`.

import CodeAutoschemaNeartext from '/_includes/code/quickstart.autoschema.neartext.mdx'

<CodeAutoschemaNeartext />

You should see a result like this (may vary depending on the model used):

import BiologyQuestionsJson from '/_includes/code/quickstart.biology.questions.mdx'

<BiologyQuestionsJson />

See that even though the word `biology` does not appear anywhere, Weaviate returns biology-related entries.

This example shows why vector searches are powerful. Vectorized data objects allow for searches based on degrees of similarity, as shown here.

## Recap

Well done. You have:
- Created your own cloud-based vector database with Weaviate,
- Populated it with data objects,
    - Using an inference API, or
    - Using custom vectors, and
- Performed a text similarity search.

Where next is up to you. We include a few links below - or you can check out the sidebar.

<details>
  <summary>Note: Sandbox expiry & options</summary>

import SandBoxExpiry from '/_includes/sandbox.expiry.mdx';

<SandBoxExpiry/>

</details>

## Troubleshooting

We provide answers to some common questions, or potential issues below.

### Confirm class creation

If you are not sure whether the class has been created, you can confirm it by visiting the [`schema` endpoint](../api/rest/schema.md) here (replace the URL with your actual endpoint):

```
https://some-endpoint.weaviate.network/v1/schema
```

<details>
  <summary>Expected response</summary>

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

### If you see <code>Error: Name 'Question' already used as a name for an Object class</code>

You may see this error if you try to create a class that already exists in your instance of Weaviate. In this case, you can delete the class following the below instructions.

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

### Confirm data import

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

## Next

import WhatNext from '/_includes/quickstart.what-next.mdx';

<WhatNext />

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
