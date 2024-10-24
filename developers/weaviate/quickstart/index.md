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

1. Create a Weaviate database.
1. Add data.
1. Perform a semantic search.
1. Use retrieval augmented generation (RAG).

:::

<!-- Vectors are mathematical representations of data objects, which enable similarity-based searches in vector databases like Weaviate. -->

### Prerequisites

This tutorial uses a [Weaviate Cloud](https://console.weaviate.cloud) Sandbox instance, and an [OpenAI](https://platform.openai.com/) API key.

The Weaviate Sandbox is free, but the OpenAI API key usage may incur a (small) cost. If you have another, preferred [model provider](../model-providers/index.md), you can use that instead.

:::note For Python users
We have ([a Jupyter notebook](https://github.com/weaviate-tutorials/quickstart/blob/main/quickstart_end_to_end.ipynb)) available, or you can try it on [Google Colab](https://colab.research.google.com/github/weaviate-tutorials/quickstart/blob/main/quickstart_end_to_end.ipynb).
:::

## Step 1: Create a Weaviate database

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

### Create a Sandbox Cluster

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
        Click here to create a cluster
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


## Step 2: Install a client library

We recommend using a [client library](../client-libraries/index.md) to work with Weaviate.

Follow the instructions below to install one of the official client libraries, available in [Python](../client-libraries/python/index.md), [JavaScript/TypeScript](../client-libraries/typescript/index.mdx), [Go](../client-libraries/go.md), and [Java](../client-libraries/java.md).

import CodeClientInstall from '/_includes/code/quickstart/clients.install.mdx';

<CodeClientInstall />

## Step 3: Connect to Weaviate

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
          The <code>REST Endpoint</code> is the URL to use.
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
          We will use the <code>Admin</code> API key.
        </div>
      </div>
    </div>
  </div>
</div>

<br/>

### Client connection code

Once you have the **URL** and **API key**, you can connect to the Sandbox instance, and work with Weaviate.

The example below shows how to connect to Weaviate and perform a basic operation, like checking the cluster status.

import ConnectIsReady from '/_includes/code/quickstart/quickstart.is_ready.mdx'

<ConnectIsReady />

If you did not see any errors, you are ready to proceed. We will replace the simple cluster status check with more meaningful operations in the next steps.

## Step 4: Add data

### Define a data collection

Next, we define a data collection (a "collection" in Weaviate) to store objects in. This is analogous to creating a table in relational (SQL) databases.

The following code:
- Configures a collection object with:
  - Name `Question`
  - Integrations with OpenAI [embedding](../model-providers/openai/embeddings.md) and [generative AI](../model-providers/openai/generative.md) models
- Then creates the collection.

Run it to create the collection in your Weaviate instance.

import CodeAutoschemaMinimumSchema from '/_includes/code/quickstart/collection.definition.mdx'

<CodeAutoschemaMinimumSchema />

:::info Change the vectorizer or generator integrations
If you prefer to use a different setup, see [this section](#can-i-use-different-integrations).
:::

Now you are ready to add objects to Weaviate.

### Add objects

You can now add objects to Weaviate. You will be using a batch import ([read more](../manage-data/import.mdx)) process for maximum efficiency.

The guide covers using the `vectorizer` defined for the collection to create a vector embedding for each object. You may have to add the API key for your vectorizer.

import CodeAutoschemaImport from '/_includes/code/quickstart/import.mdx'

<CodeAutoschemaImport />

The above code:
- Loads objects, and
- Adds objects to the target collection (`Question`) one by one.

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

## Step 5: Queries

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
- Created your own cloud-based vector database with Weaviate
- Populated it with data objects using an inference API
- Performed searches, including:
    - Semantic search
    - Semantic search with a filter
    - Generative search

Where next is up to you. We include a few links below - or you can check out the sidebar.

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
