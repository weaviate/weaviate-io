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

Welcome. In the next <i class="fa-solid fa-timer"></i> ~20 minutes, you will:
- Build a Weaviate vector database, and
- Query it with:
    - *semantic search*,
    - an added *filter* and
    - *generative searches* to transform your search results with an LLM.

#### Object vectors

With Weaviate, you have options to:
- Have **Weaviate create vectors**, or
- Specify **custom vectors**.

This tutorial demonstrates both methods.

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

:::tip For Python users
Try it directly on [Google Colab](https://colab.research.google.com/github/weaviate-tutorials/quickstart/blob/main/quickstart_end_to_end.ipynb) ([or go to the file](https://github.com/weaviate-tutorials/quickstart/blob/main/quickstart_end_to_end.ipynb)).
:::

<hr/>

## Create an instance

[Create a sandbox instance](developers/wcs/quickstart.mdx) on Weaviate Cloud Services and come back here. <br/>
Make sure to collect the **API key** and **URL** from the `Details` tab.

:::info To use another deployment method (e.g. Docker Compose)
If you prefer another method, see [this section](#can-i-use-another-deployment-method).
:::

<hr/>

## Install a client library

We suggest using a [Weaviate client](../client-libraries/index.md). To install your preferred client, run the below:

import CodeClientInstall from '/_includes/code/quickstart.clients.install.mdx';

:::info Install client libraries

<CodeClientInstall />

:::

<hr/>

## Connect to Weaviate

Connect to Weaviate using this information:

- The Weaviate **URL** (get it from WCS `Details` tab),
- The Weaviate **API key** (if enabled - get it from WCS `Details` tab), and
- An OpenAI **inference API key** ([sign up here](https://platform.openai.com/signup)).

import ConnectToWeaviateWithKey from '/_includes/code/quickstart.autoschema.connect.withkey.mdx'

<ConnectToWeaviateWithKey />

Now you are connected to your Weaviate instance.

<hr/>

## Define a class

Next, we define a data collection (a "class" in Weaviate) to store objects in:

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart.autoschema.minimum.schema.mdx'

<CodeAutoschemaMinimumSchema />

This creates a class `Question`, specifying which `vectorizer` to use, sets the `moduleConfig` for the vectorizer and specifies the generative module to be used.

:::info To use another vectorizer or generative module
If you prefer another setup, see [this section](#can-i-use-different-modules).
:::

Now you are ready to add objects to Weaviate.

<hr/>

## Add objects

We can now add objects to Weaviate using a [batch import](../manage-data/import.mdx) process. We will cover both ways of obtaining a vector, starting with using a `vectorizer`.

### *Option 1*: `vectorizer`

The code below imports object data without specifying a vector. This causes Weaviate to use the `vectorizer` defined for the class to create a vector embedding for each object.

import CodeAutoschemaImport from '/_includes/code/quickstart.autoschema.import.mdx'

<CodeAutoschemaImport />

The above code:
- Loads objects,
- Initializes a batch process, and
- Adds objects to the target class (`Question`) one by one.

### *Option 2*: Custom vectors

Alternatively, you can also provide your own vectors to Weaviate.

Regardless of whether a `vectorizer` is set, if a vector is specified, Weaviate will use it to represent the object.

import CodeAutoschemaImportCustomVectors from '/_includes/code/quickstart.autoschema.import.custom.vectors.mdx'

<CodeAutoschemaImportCustomVectors />

:::tip vector != object property
Do *not* specify object vectors as an object property. This will cause Weaviate to treat it as a regular property, rather than as a vector embedding.
:::

<hr/>

# Putting it together

The following code puts the above steps together. You can run it yourself to import the data into your Weaviate instance.

<details>
  <summary>End-to-end code</summary>

:::tip Remember to replace the **URL**, **Weaviate API key** and **inference API key**
:::

import CodeAutoschemaEndToEnd from '/_includes/code/quickstart.autoschema.endtoend.mdx'

<CodeAutoschemaEndToEnd />

</details>

<hr/>

You've already built a vector database and populated it with data! Now, we are ready to run queries.

<hr/>

## Queries

### Semantic search

Let's start with a similarity search. This `nearText` search will look for quiz objects most similar to `biology`.

import CodeAutoschemaNeartext from '/_includes/code/quickstart.autoschema.neartext.mdx'

<CodeAutoschemaNeartext />

You should see a result like this:

import BiologyQuestionsJson from '/_includes/code/quickstart.biology.questions.mdx'

<BiologyQuestionsJson />

The response includes a list of top 2 (due to the `limit` set) objects whose vectors are most similar to the word `biology`.

:::tip Why is this useful?
Notice that even though the word `biology` does not appear anywhere, Weaviate returns biology-related entries.

This example shows why vector searches are powerful. Vectorized data objects allow for searches based on degrees of similarity, as shown here.
:::

### Semantic search with a filter

You can add Boolean filters to searches. For example, let's run the same search, but only look in objects that have a "category" value of "ANIMALS".

import CodeAutoschemaNeartextWithWhere from '/_includes/code/quickstart.autoschema.neartext.where.mdx'

<CodeAutoschemaNeartextWithWhere />

You should see a result like this:

import BiologyQuestionsWhereJson from '/_includes/code/quickstart.biology.where.questions.mdx'

<BiologyQuestionsWhereJson />

The response includes a list of top 2 (due to the `limit` set) objects whose vectors are most similar to the word `biology`. But, only from the `ANIMALS` category.

:::tip Why is this useful?
Using a Boolean filter allows you to combine the flexibility of vector search with the precision of `where` filters.
:::


<!-- Note: Added the generative search example; but hiding it for now as it makes the workflow quite difficult for new users. 1) They will now need an OpenAI/Cohere key. 2) The schema needs to include a generative module definition. 3) Rate limit on generative API is low; so might be painful. -->

### Generative search (single prompt)

Next, let's try a generative search, where search results are processed with a large language model (LLM).

Here, we use a `single prompt` query, and the model to explain *each* answer in plain terms.

import CodeAutoschemaGenerative from '/_includes/code/quickstart.autoschema.generativesearch.mdx'

<CodeAutoschemaGenerative />

You should see a result similar to this:

import BiologyGenerativeSearchJson from '/_includes/code/quickstart.biology.generativesearch.mdx'

<BiologyGenerativeSearchJson />

We see that Weaviate has retrieved the same results as before. But now it includes an additional, generated text with a plain-language explanation of each answer.

### Generative search (grouped task)

In the next example, we will use a `grouped task` prompt instead to combine all search results and send them to the LLM with a prompt. We ask the LLM to write a tweet about all of these search results.

import CodeAutoschemaGenerativeGrouped from '/_includes/code/quickstart.autoschema.generativesearch.grouped.mdx'

<CodeAutoschemaGenerativeGrouped />

The first response object will include the generated response. Here's our query result:

import BiologyGenerativeSearchGroupedJson from '/_includes/code/quickstart.biology.generativesearch.grouped.mdx'

<BiologyGenerativeSearchGroupedJson />

:::tip Why is this useful?
Generative search sends retrieved data from Weaviate to a large language model, or LLM. This allows you to go beyond simple data retrieval, but transform the data into a more useful form, without ever leaving Weaviate.
:::

<hr/>

## Recap

Well done! You have:
- Created your own cloud-based vector database with Weaviate,
- Populated it with data objects,
    - Using an inference API, or
    - Using custom vectors,
- Performed searches, including:
    - Semantic search,
    - Sementic search with a filter and
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
    image: semitechnologies/weaviate:||site.weaviate_version||
    ports:
    - 8080:8080
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
"X-Palm-Api-Key": "YOUR-PALM-API-KEY",  // For PaLM
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

You may see this error if you try to create a class that already exists in your instance of Weaviate. In this case, you can delete the class following the below instructions.

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

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
