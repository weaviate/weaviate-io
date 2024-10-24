---
title: Quickstart
sidebar_position: 0
image: og/docs/quickstart-tutorial.jpg
# tags: ['getting started']
hide_table_of_contents: true
---


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span class="badge badge--secondary">Expected time: 20 minutes</span> <span class="badge badge--secondary">Prerequisites: None</span>
<br/><br/>

:::info What you will learn

Welcome! Here, you will get hands-on experience with Weaviate. You will:

1. Set up Weaviate.
1. Populate the database.
1. Perform a semantic search and retrieval augmented generation (RAG).

:::

<!-- Vectors are mathematical representations of data objects, which enable similarity-based searches in vector databases like Weaviate. -->

### Prerequisites

This tutorial uses a [Weaviate Cloud](https://console.weaviate.cloud) Sandbox instance, and an [OpenAI](https://platform.openai.com/) API key.

The Weaviate Sandbox is free, but the OpenAI API key usage may incur a (small) cost. If you have another, preferred [model provider](../model-providers/index.md), you can use that instead.

:::note For Python users
We have ([a Jupyter notebook](https://github.com/weaviate-tutorials/quickstart/blob/main/quickstart_end_to_end.ipynb)) available, or you can try it on [Google Colab](https://colab.research.google.com/github/weaviate-tutorials/quickstart/blob/main/quickstart_end_to_end.ipynb).
:::

## Step 1: Set up Weaviate

### 1.1 Create a Weaviate database

Go the [WCD homepage](https://console.weaviate.cloud) and create a free Sandbox instance.

<!-- ### Create a WCD account -->

<!-- import WCDRegister from '/developers/weaviate/quickstart/img/wcd_register.png';

<div class="row">
  <div class="col col--4">
    <div class="card">
      <div class="card__image">
        <img src={WCDRegister} alt="Sign up with WCD"/>
      </div>
      <div class="card__body">
        <ol>
          <li>Go the <a href="https://console.weaviate.cloud">WCD homepage</a>.</li>
          <li>Click "Register here".</li>
        </ol>
      </div>
    </div>
  </div>
</div>
<br/> -->

import CreateCluster from '/developers/weaviate/quickstart/img/create_cluster.png';
import CreateSandbox from '/developers/weaviate/quickstart/img/create_sandbox.png';

<div class="row">
  <div class="col col--4">
    <ol>
      <li><a href="https://console.weaviate.cloud">Log onto WCD</a>.</li>
      <li>Click on <code>Clusters</code> on the sidebar.</li>
      <li>In the following pane, click <code>Create cluster</code>.</li>
    </ol>
  </div>
  <div class="col col--8">
    <div class="card">
      <div class="card__image">
        <img src={CreateCluster} alt="Create a cluster"/>
      </div>
      <div class="card__body">
        Click on this button to start cluster creation
      </div>
    </div>
  </div>
</div>
<br/>

<div class="row">
  <div class="col col--4">
    <ol start="4">
      <li>Give your cluster a name.</li>
      <li>Set your preferred cloud region.</li>
      <li>Click "Create".</li>
    </ol>
  </div>
  <div class="col col--8">
    <div class="card">
      <div class="card__image">
        <img src={CreateSandbox} alt="Create a Sandbox Cluster"/>
      </div>
      <div class="card__body">
        Populate these fields and create a sandbox.
      </div>
    </div>
  </div>
</div>

<br/>

:::note
- It takes a minute or two to provision the new cluster.
- When the cluster is ready, WCD displays a check mark (`✔️`) next to the cluster name.
- Note that WCD adds a random suffix to sandbox cluster names to ensure uniqueness.
:::

<!-- import SandBoxExpiry from '/_includes/sandbox.expiry.mdx';

<SandBoxExpiry/> -->

### 1.2 Install a client library

We recommend using a [client library](../client-libraries/index.md) to work with Weaviate.

Follow the instructions below to install one of the official client libraries, available in [Python](../client-libraries/python/index.md), [JavaScript/TypeScript](../client-libraries/typescript/index.mdx), [Go](../client-libraries/go.md), and [Java](../client-libraries/java.md).

import CodeClientInstall from '/_includes/code/quickstart/clients.install.mdx';

<CodeClientInstall />

### 1.3: Connect to Weaviate

Now you can connect to your Weaviate instance. Get the instance **URL** and the **Administrator API Key** from the WCD console as shown below.

import WCDClusterURL from '/developers/weaviate/quickstart/img/cluster_url.png';

import WCDClusterAdminKey from '/developers/weaviate/quickstart/img/cluster_admin_key.png';

<div class="row">
  <div class="col col--6">
    <div class="card-demo">
      <div class="card">
        <div class="card__image">
          <img src={WCDClusterURL} alt="Get the (REST) endpoint URL"/>
        </div>
        <div class="card__body">
          Grab the <code>REST Endpoint</code> URL.
        </div>
      </div>
    </div>
  </div>
  <div class="col col--6">
    <div class="card-demo">
      <div class="card">
        <div class="card__image">
          <img src={WCDClusterAdminKey} alt="Get the admin API key"/>
        </div>
        <div class="card__body">
          Grab the <code>Admin</code> API key.
        </div>
      </div>
    </div>
  </div>
</div>

<br/>

Once you have the **URL** and **API key**, you can connect to the Sandbox instance, and work with Weaviate.

The example below shows how to connect to Weaviate and perform a basic operation, like checking the cluster status.

import ConnectIsReady from '/_includes/code/quickstart/quickstart.is_ready.mdx'

<ConnectIsReady />

If you did not see any errors, you are ready to proceed. We will replace the simple cluster status check with more meaningful operations in the next steps.

## Step 2: Populate the database

Now, we can populate our database by first defining a collection then adding data.

### 2.1 Define a collection

:::tip What is a collection?
A collection is a set of objects that share the same data structure, like a table in relational databases. A collection also includes additional configurations that define how the data objects are stored and indexed.
:::

The following example creates a *collection* called `Question` with:
  - OpenAI [embedding model integration](../model-providers/openai/embeddings.md) to create vectors during ingestion & queries.
  - OpenAI [generative AI integrations](../model-providers/openai/generative.md) for retrieval augmented generation (RAG).

import CreateCollection from '/_includes/code/quickstart/quickstart.create_collection.mdx'

<CreateCollection />

Run this code to create the collection to which you can add data.

:::info Do you prefer a different setup?

Weaviate is very flexible. If you prefer a different model provider integration, or prefer to import your own vectors, please see one of the following guides:
<br/>

<div class="row">
  <div class="col col--6">
    <div class="card-demo">
      <div class="card">
        <div class="card__header">
          <h4>Prefer a different model provider?</h4>
        </div>
        <div class="card__body">
          See <a href="#can-i-use-different-integrations">this section</a> for information on how to user another provider, such as AWS, Cohere, Google, and many more.
        </div>
      </div>
    </div>
  </div>
  <div class="col col--6">
    <div class="card-demo">
      <div class="card">
        <div class="card__header">
          <h4>Do you have objects and vectors?</h4>
        </div>
        <div class="card__body">
          If you prefer to add vectors yourself along with the object data, see <a href="/developers/weaviate/starter-guides/custom-vectors">Starter Guide: Bring Your Own Vectors</a>.
        </div>
      </div>
    </div>
  </div>
</div>

:::

### 2.2 Add objects

We can now ([batch import](../manage-data/import.mdx)) data to efficiently import data.

The following example:
- Loads objects, and
- Adds objects to the target collection (`Question`) using a batch process.

import ImportObjects from '/_includes/code/quickstart/quickstart.import_objects.mdx'

<ImportObjects />

Run this code to add the demo data.

:::tip OpenAI API key in the header
Note that this code includes an additional header for the OpenAI API key. Weaviate uses this key to generate vector embeddings for the data objects as they are being added.
:::

## Step 3: Queries

Weaviate provides a wide range of query tools to help you find the right data. We will try a few searches here.

### 3.1 Semantic search

Let's start with a text similarity, or `nearText` search. A `nearText` search looks for objects in Weaviate based on its semantic (meaning) similarity to the input text.

The following example searches for 2 objects whose meaning is most similar to that of `biology`.

import QueryNearText from '/_includes/code/quickstart/quickstart.query.neartext.mdx'

<QueryNearText />

Run this code to perform the query. Our query found entries for `DNA` and `species`.

<details>
  <summary>Example full response in JSON format</summary>

```json
{
  {
    "answer": "DNA",
    "question": "In 1953 Watson & Crick built a model of the molecular structure of this, the gene-carrying substance",
    "category": "SCIENCE"
  },
  {
    "answer": "species",
    "question": "2000 news: the Gunnison sage grouse isn't just another northern sage grouse, but a new one of this classification",
    "category": "SCIENCE"
  }
}
```

</details>

If you inspect the full response, you will see that the word `biology` does not appear anywhere.

Even so, Weaviate was able to return biology-related entries. This is made possible by *vector embeddings* that capture meaning. Under the hood, semantic search is powered by vectors, or vector embeddings.

:::info Where did the vectors come from?
Weaviate used the OpenAI API key to generate a vector embedding for each object during import. During the query, Weaviate similarly converted the query (`biology`) into a vector.

As we mentioned above, this is optional. See [Starter Guide: Bring Your Own Vectors](/developers/weaviate/starter-guides/custom-vectors.mdx) if you would prefer to provide your own vectors.
:::

:::tip Additional search types

Weaviate is capable of many other types of searches. See, for example, our how-to guides on [similarity searches](../search/similarity.md), [keyword searches](../search/bm25.md), [hybrid searches](../search/hybrid.md), and [filtered searches](../search/filters.md).

:::

### 3.2 Retrieval augmented generation

Next, let's try a retrieval augmented generation (RAG). RAG, also called generative search, combines the power of generative AI models such as large language models (LLMs) with the up-to-date truthfulness of a database.

RAG work by prompting a large language model (LLM) with a combination of a *user query* and *data retrieved from a database*.

The following example combines the same search (for `biology`) with a prompt to generate a tweet.

import QueryRAG from '/_includes/code/quickstart/quickstart.query.rag.mdx'

<QueryRAG />

Run this code to perform the query. Here is one possible response (your response will likely be different).

```text
🧬 In 1953 Watson & Crick built a model of the molecular structure of DNA, the gene-carrying substance! 🧬🔬

🦢 2000 news: the Gunnison sage grouse isn't just another northern sage grouse, but a new species! 🦢🌿 #ScienceFacts #DNA #SpeciesClassification
```

The response should be new, yet familiar. This because you have seen the entries above for `DNA` and `species` in the [semantic search](#semantic-search) section.

The power of RAG comes from the ability to transform your own data. Weaviate helps you in this journey by making it easy to perform a combined search & generation in just a few lines of code.

<hr/>

## Recap

Well done! You have:
- Created a Serverless Weaviate sandbox instance on Weaviate Cloud
- Defined a collection and added data
- Performed searches, including:
    - Semantic search
    - Retrieval augmented generation

Where to go next is up to you. We include some suggested steps and resources below.

<hr/>

## Next

You can do much more with Weaviate. We suggest trying one of these:

- Examples from our [search how-to](../search/index.md) guides for [keyword](../search/bm25.md), [similarity](../search/similarity.md), [hybrid](../search/hybrid.md), [generative](../search/generative.md), and [filtered](../search/filters.md) search.
- Learning [how to manage data](../manage-data/index.md), like [reading](../manage-data/read.mdx), [batch importing](../manage-data/import.mdx), [updating](../manage-data/update.mdx), [deleting](../manage-data/delete.mdx) objects or [bulk exporting](../manage-data/read-all-objects.mdx) data.

For more holistic learning, try <i class="fa-solid fa-graduation-cap"></i> [Weaviate Academy](../../academy/index.mdx). We have built free courses for you to learn about Weaviate and the world of vector search.

You can also try a larger, [1,000 row](https://raw.githubusercontent.com/databyjp/wv_demo_uploader/main/weaviate_datasets/data/jeopardy_1k.json) version of the Jeopardy! dataset, or [this tiny set of 50 wine reviews](https://raw.githubusercontent.com/databyjp/wv_demo_uploader/main/weaviate_datasets/data/winemag_tiny.csv).

<hr/>

## FAQs & Troubleshooting

We provide answers to some common questions, or potential issues below.

### Questions

#### Can I use a different deployment method?

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

#### Can I use different integrations?

<details>
  <summary>See answer</summary>

In this example, we use the `OpenAI` inference API. But you can use others.

If you do want to change the embeddings, or the generative AI integrations, you can. You will need to:
- Ensure that the Weaviate module is available in the Weaviate instance you are using,
- Modify your collection definition to use your preferred integration, and
- Make sure to use the right API key(s) (if necessary) for your integration.

Please see the [model providers integration](../model-providers/index.md) section for more information.

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

You may see this error if you try to create a collection that already exists in your instance of Weaviate. In this case, you can follow these instructions to delete the collection.

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

</details>

#### How to confirm collection creation

<details>
  <summary>See answer</summary>

If you are not sure whether the collection has been created, check the [`schema`](/developers/weaviate/api/rest#tag/schema) endpoint.

Replace WEAVIATE_INSTANCE_URL with your instance URL.:

```
https://WEAVIATE_INSTANCE_URL/v1/schema
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

Where the schema should indicate that the `Question` collection has been added.

:::note REST & GraphQL in Weaviate
Weaviate uses a combination of RESTful and GraphQL APIs. In Weaviate, RESTful API endpoints can be used to add data or obtain information about the Weaviate instance, and the GraphQL interface to retrieve data.
:::

</details>

#### How to confirm data import

<details>
  <summary>See answer</summary>

To confirm successful data import, check the [`objects`](/developers/weaviate/api/rest#tag/objects) endpoint to verify that all objects are imported.

Replace WEAVIATE_INSTANCE_URL with your instance URL:

```
https://WEAVIATE_INSTANCE_URL/v1/objects
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

To perform text-based (`nearText`) similarity searches, you need to have a vectorizer enabled, and configured in your collection.

Make sure the vectorizer is configured [like this](#define-a-data-collection).

If the search still doesn't work, [contact us](#questions-and-feedback)!

</details>


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
