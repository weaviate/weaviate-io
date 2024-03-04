---
title: Quickstart Tutorial
sidebar_position: 0
image: og/docs/quickstart-tutorial.jpg
# tags: ['getting started']
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

import WCScreateButton from '../../wcs/img/wcs-create-button.png';

## Overview

Welcome to the Quickstart guide for Weaviate, an open-source vector database. This tutorial is intended to be a hands-on introduction to Weaviate.

In the next ~20 minutes, you will:
- Build a Weaviate vector database, and
- Query it with:
    - *semantic search*,
    - an added *filter* and
    - *generative searches* to transform your search results with a large language model (LLM).

#### Object vectors

Vectors are mathematical representations of data objects, which enable similarity-based searches in vector databases like Weaviate.

With Weaviate, you have options to:
- Have **Weaviate create vectors** for you, or
- Specify **custom vectors**.

This tutorial demonstrates having Weaviate create vectors with a vectorizer. For a tutorial on using custom vectors, see [this tutorial](../starter-guides/custom-vectors.mdx).

#### Source data

We will use a (tiny) dataset of quizzes.

<details>
  <summary>See the dataset</summary>

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

:::tip For Python users
Try it directly on [Google Colab](https://colab.research.google.com/github/weaviate-tutorials/quickstart/blob/main/quickstart_end_to_end.ipynb) ([or go to the file](https://github.com/weaviate-tutorials/quickstart/blob/main/quickstart_end_to_end.ipynb)).
:::

## Step 1: Create a Weaviate database

You need a Weaviate instance to work with. We recommend creating a free cloud sandbox instance on Weaviate Cloud Services (WCS).

Go to the [WCS quickstart](developers/wcs/quickstart.mdx) and follow the instructions to create a sandbox instance, and come back here.  Collect the **API key** and **URL** from the `Details` tab in WCS.

:::info To use another deployment method (e.g. Docker Compose)
If you prefer another method, see [this section](#can-i-use-another-deployment-method).
:::

## Step 2: Install a client library

We suggest using a Weaviate client ([read more](../client-libraries/index.md)) to work with your preferred programming language.

To install your preferred client, run the installation code for your language:

import CodeClientInstall from '/_includes/code/quickstart/clients.install.mdx';

:::info Install client libraries

<CodeClientInstall />

:::

## Step 3: Connect to Weaviate

To connect to your Weaviate instance, you need the following information:

- The Weaviate **URL** (get it from WCS `Details` tab),
- The Weaviate **API key** (if enabled - get it from WCS `Details` tab), and
- An OpenAI **inference API key** ([sign up here](https://platform.openai.com/signup)).

Run the following example code to connect to Weaviate. You can re-use the resulting `client` object in the following steps.

import ConnectToWeaviateWithKey from '/_includes/code/quickstart/connect.withkey.mdx'

<ConnectToWeaviateWithKey />

## Step 4: Define a data collection

Next, we define a data collection (a "class" in Weaviate) to store objects in. This is analogous to creating a table in relational (SQL) databases.

The following code:
- Configures a class object with:
  - Name `Question`
  - Vectorizer module `text2vec-openai`
  - Generative module `generative-openai`
- Then creates the class.

Run it to create the class in your Weaviate instance.

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart/collection.definition.mdx'

<CodeAutoschemaMinimumSchema />

:::info To use another vectorizer or generative module
If you prefer another setup, see [this section](#can-i-use-different-modules).
:::

Now you are ready to add objects to Weaviate.

## Step 5: Add objects

You can now add objects to Weaviate. You will be using a batch import ([read more](../manage-data/import.mdx)) process for maximum efficiency.

The guide covers using the `vectorizer` defined for the class to create a vector embedding for each object.

import CodeAutoschemaImport from '/_includes/code/quickstart/import.mdx'

<CodeAutoschemaImport />

The above code:
- Loads objects, and
- Adds objects to the target class (`Question`) one by one.

## Partial recap

The following code puts the above steps together.

If you have not been following along with the snippets, run the code block below. This will let you run queries in the next section.

<details>
  <summary>End-to-end code</summary>

:::tip Remember to replace the **URL**, **Weaviate API key** and **inference API key**
:::

import CodeAutoschemaEndToEnd from '/_includes/code/quickstart/endtoend.mdx'

<CodeAutoschemaEndToEnd />

</details>

## Step 6: Queries

Now, let's run some queries on your Weaviate instance. Weaviate powers many different types of searches. We will try a few here.

### Semantic search

Let's start with a similarity search. A `nearText` search looks for objects in Weaviate whose vectors are most similar to the vector for the given input text.

Run the following code to search for objects whose vectors are most similar to that of `biology`.

import CodeAutoschemaNeartext from '/_includes/code/quickstart/neartext.mdx'

<CodeAutoschemaNeartext />

You should see results like this:

import BiologyQuestionsJson from '/_includes/code/quickstart/response.biology.questions.mdx'

<BiologyQuestionsJson />

The response includes a list of objects whose vectors are most similar to the word `biology`. The top 2 results are returned here as we have set a `limit` to `2`.

:::tip Why is this useful?
Notice that even though the word `biology` does not appear anywhere, Weaviate returns biology-related entries.

This example shows why vector searches are powerful. Vectorized data objects allow for searches based on degrees of similarity, as shown here.
:::

### Semantic search with a filter

You can add Boolean filters to searches. For example, the above search can be modified to only in objects that have a "category" value of "ANIMALS". Run the following code to see the results:

import CodeAutoschemaNeartextWithWhere from '/_includes/code/quickstart/neartext.where.mdx'

<CodeAutoschemaNeartextWithWhere />

You should see results like this:

import BiologyQuestionsWhereJson from '/_includes/code/quickstart/response.biology.where.questions.mdx'

<BiologyQuestionsWhereJson />

The results are limited to objects from the `ANIMALS` category.

:::tip Why is this useful?
Using a Boolean filter allows you to combine the flexibility of vector search with the precision of `where` filters.
:::

### Generative search (single prompt)

Next, let's try a generative search. A generative search, also called retrieval augmented generation, prompts a large language model (LLM) with a combination of a user query as well as data retrieved from a database.

To see what happens when an LLM uses query results to perform a task that is based on our prompt, run the code below.

Note that the code uses a `single prompt` query, which asks the model generate an answer for *each* retrieved database object.

import CodeAutoschemaGenerative from '/_includes/code/quickstart/generativesearch.single.mdx'

<CodeAutoschemaGenerative />

You should see results similar to this:

import BiologyGenerativeSearchJson from '/_includes/code/quickstart/response.biology.generativesearch.single.mdx'

<BiologyGenerativeSearchJson />

We see that Weaviate has retrieved the same results as before. But now it includes an additional, generated text with a plain-language explanation of each answer.

### Generative search (grouped task)

The next example uses a `grouped task` prompt instead to combine all search results and send them to the LLM with a prompt.

To ask the LLM to write a tweet about these search results, run the following code.

import CodeAutoschemaGenerativeGrouped from '/_includes/code/quickstart/generativesearch.grouped.mdx'

<CodeAutoschemaGenerativeGrouped />

The first returned object will include the generated text. Here's one that we got:

import BiologyGenerativeSearchGroupedJson from '/_includes/code/quickstart/response.biology.generativesearch.grouped.mdx'

<BiologyGenerativeSearchGroupedJson />

:::tip Why is this useful?
Generative search sends retrieved data from Weaviate to a large language model, or LLM. This allows you to go beyond simple data retrieval, but transform the data into a more useful form, without ever leaving Weaviate.
:::

<hr/>

## Recap

Well done! You have:
- Created your own cloud-based vector database with Weaviate,
- Populated it with data objects using an inference API,
- Performed searches, including:
    - Semantic search,
    - Semantic search with a filter and
    - Generative search.

Where next is up to you. We include a few links below - or you can check out the sidebar.

<hr/>

## Next

You can do much more with Weaviate. We suggest trying:

- Examples from our [search how-to](../search/index.md) guides for [keyword](../search/bm25.md), [similarity](../search/similarity.md), [hybrid](../search/hybrid.md), [generative](../search/generative.md) searches and [filters](../search/filters.md) or
- Learning [how to manage data](../manage-data/index.md), like [reading](../manage-data/read.mdx), [batch importing](../manage-data/import.mdx), [updating](../manage-data/update.mdx), [deleting](../manage-data/delete.mdx) objects or [bulk exporting](../manage-data/read-all-objects.mdx) data.

For more holistic learning, try <i class="fa-solid fa-graduation-cap"></i> [Weaviate Academy](../../academy/index.mdx). We have built free courses for you to learn about Weaviate and the world of vector search.

You can also try a larger, [1,000 row](https://raw.githubusercontent.com/databyjp/wv_demo_uploader/main/weaviate_datasets/data/jeopardy_1k.json) version of the Jeopardy! dataset, or [this tiny set of 50 wine reviews](https://raw.githubusercontent.com/databyjp/wv_demo_uploader/main/weaviate_datasets/data/winemag_tiny.csv).

<hr/>

## FAQs & Troubleshooting

We provide answers to some common questions, or potential issues below.

### Questions

#### Can I use another deployment method?

import ConnectToWeaviateDocker from '/_includes/code/quickstart.autoschema.connect.docker.mdx'

<details>
  <summary>See answer</summary>

<p>

Yes, you can use any method listed on our [installation options](../installation/index.md) sections.

</p><br/>

Using Docker Compose may be a convenient option for many. To do so:
1. Save this `Docker Compose` file as `docker-compose.yml`,
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
    restart: on-failure:0
    environment:
      OPENAI_APIKEY: $OPENAI_APIKEY
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
      ENABLE_MODULES: 'text2vec-openai,generative-openai'
      CLUSTER_HOSTNAME: 'node1'
...
```
2. Run `docker compose up -d` from the location of your `docker-compose.yml` file, and then
3. Connect to Weaviate at `http://localhost:8080`.

If you are using this `Docker Compose` file, Weaviate will not require API-key authentication. So your [connection code](#connect-to-weaviate) will change to:

<ConnectToWeaviateDocker />

</details>

#### Can I use different modules?

<details>
  <summary>See answer</summary>

In this example, we use the `OpenAI` inference API. But you can use others.

If you do want to change the vectorizer, or the generative module, you can. You will need to:
- Ensure that the module is available in the Weaviate instance you are using,
- Modify your class definition to suit your chosen modules, and
- Make sure to use the right API key(s) (if necessary) for your modules.

Each of the following modules is available in the free sandbox.

- Vectorizer modules:
    - `text2vec-cohere`
    - `text2vec-huggingface`
    - `text2vec-openai`
    - `text2vec-palm`
- Generative modules:
    - `generative-cohere`
    - `generative-openai`
    - `generative-palm`

Depending on your choice, make sure to pass on the API key(s). You can do so by setting the header with the appropriate line(s) from below, remembering to replace the placeholder with your actual key:

```js
"X-Cohere-Api-Key": "YOUR-COHERE-API-KEY",  // For Cohere
"X-HuggingFace-Api-Key": "YOUR-HUGGINGFACE-API-KEY",  // For Hugging Face
"X-OpenAI-Api-Key": "YOUR-OPENAI-API-KEY",  // For OpenAI
"X-PaLM-Api-Key": "YOUR-PALM-API-KEY",  // For PaLM
```

Additionally, we also provide suggested `vectorizer` module configurations.

<Tabs groupId="inferenceAPIs">
<TabItem value="cohere" label="Cohere">

```js
class_obj = {
  "class": "Question",
  "vectorizer": "text2vec-cohere",
  "moduleConfig": {
    "text2vec-cohere": {
      "model": "embed-multilingual-v2.0", // Default model. This is the same model as `multilingual-22-12`
      "truncate": "RIGHT" // Defaults to RIGHT if not set
    }
  }
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

#### Is a `vectorizer` setting mandatory?

<details>
  <summary>See answer</summary>

- No. You always have the option of providing vector embeddings yourself.
- Setting a `vectorizer` gives Weaviate the option of creating vector embeddings for you.
    - If you do not wish to, you can set this to `none`.

</details>

#### What is a sandbox, exactly?

<details>
  <summary>Note: Sandbox expiry & options</summary>

import SandBoxExpiry from '/_includes/sandbox.expiry.mdx';

<SandBoxExpiry/>

</details>

### Troubleshooting

#### If you see <code>Error: Name 'Question' already used as a name for an Object class</code>

<details>
  <summary>See answer</summary>

You may see this error if you try to create a class that already exists in your instance of Weaviate. In this case, you can follow these instructions to delete the class.

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

</details>

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


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
