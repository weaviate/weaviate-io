---
title: Experimental clients
sidebar_position: 99
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library', 'experimental']
---

import Badges from '/_includes/badges.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!./_includes/user_test.py';

<Badges/>

## Python `Collections` client

Currently, we have a new Python client in an experimental phase. We are excited for you to try it out and provide feedback for us. This client is designed provide further developer support and improve usability with strong typing and a collection-focussed interaction.

If you haven't read it, [check out our announcement blog here](/blog/collections-python-client-preview) where we discuss more of the background, motivations and changes.

:::note LIMITATIONS
Please note that this is an early **pre-release** version. It is not yet ready for production use, and not yet feature-complete.

- It is only compatible with local Weaviate instances. It will not work with WCS, for example.
- It implements:
    - `CUD` operations (previously REST)
    - `query` operations (previously GraphQL `Get`), including `Generative` and `GroupBy` operations.
- It does not yet implement `aggregate` operations.

:::

#### Feedback

:::caution important
:::

**Please provide your feedback [through this form](https://tally.so/r/wa4NDB).** We suggest having it open while you try out the client.

You can also provide any other feedback directly to JP on Slack, internal or via the Community slack (he's `JP (Weaviate)` there).

## Setup

We recommend you create a **new environment** for this, in a new project directory. If you're not sure how, [read this](#how-to-create-a-virtual-environment-with-venv).

#### External API use

For convenience, the code examples here uses the OpenAI API with `text2vec-openai` and `generative-openai` modules. At the time of writing, you can sign up with OpenAI at [this address](https://platform.openai.com/signup). You can then provide the key to the Weaviate client as shown below as an environment variable, or a string (not recommended).

If you are unable to obtain a key, you can try contacting JP on the Community slack (he's `JP (Weaviate)` there) for a key for this evaluation only. (He may not be able to respond to all requests.)

#### Client installation

Get into your desired environment, and run:

```shell
pip install -U "git+https://github.com/weaviate/weaviate-python-client.git@v3.99.0a3#egg=weaviate-client[GRPC]"
```

#### Start Weaviate

You will also need a pre-release version of Weaviate. Either [download this `docker-compose.yml` file](https://raw.githubusercontent.com/databyjp/wv_python_usertest/main/docker-compose.yml) or save the following code in your project directory as `docker-compose.yml`.

```
docker compose up -d
```

<details>
  <summary><code>docker-compose.yml</code></summary>

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
    image: semitechnologies/weaviate:preview-automatically-request-properties-that-are-needed-for-groupby-e98008c
    restart: on-failure:0
    ports:
     - "8080:8080"
     - "50051:50051"
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      QUERY_MAXIMUM_RESULTS: 10000
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'text2vec-openai'
      ENABLE_MODULES: 'text2vec-openai,text2vec-cohere,text2vec-huggingface,text2vec-palm,generative-openai,generative-cohere'
      CLUSTER_HOSTNAME: 'node1'
      AUTOSCHEMA_ENABLED: 'false'
...
```

Go to the directory with your `docker-compose.yml` file and run

</details>

Note that you will need the `gRPC` ports open also. This will likely be simplified to one port in the future.

## Try out the client

We're good to go! Fire up your preferred way to edit / run Python code (Jupyter, VSCode, PyCharm, vim, whatever) and follow along.

:::tip For Jupyter users
If use Jupyter, you might find [this extension](https://jupyter-contrib-nbextensions.readthedocs.io/en/latest/nbextensions/hinterland/README.html) useful as it enables auto-completion without pressing tab.
:::

### Key ideas

We call this the `collections` client, because the main interactions will be with a collection (currently called `Class` in Weaviate). (From here, we will use `collections` instead of `Class`.)

This client also includes custom Python classes to provide IDE assistance and typing help. You can import them individually, like so:

```
from weaviate.classes import Property, ConfigFactory, DataObject
```

But we will import the whole set of classes like this.

```
import weaviate.classes as wvc
```

### Instantiation

To connect to Weaviate, copy and update the following code with your `grpc` port. Then, run the code to connect.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Instantiation"
  endMarker="# END Instantiation"
  language="py"
/>

If you connect successfully, the code returns `True`. If you get an error, it may be gRPC port related. See the Troubleshooting section below.

### Create a collection

We'll be creating collections named `TestArticle`, `TestAuthor`, `JeopardyQuestion` and `JeopardyCategory` in this example code. Feel free to change these names to whatever you like.

#### Existing API

The existing API uses a raw dictionary / JSON object to create classes, like so:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# OldSchemaDef"
  endMarker="# END OldSchemaDef"
  language="py"
/>

Now, collection creation looks like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# SimpleCreation"
  endMarker="# END SimpleCreation"
  language="py"
/>

Note the use of types, and the use of a factory to create the vectorizer and replication config.

Factory classes are instantiated with class methods, like `text2vec_openai()`.

The following collection definition is incomplete. Please see if you can complete the collection definition based on the comments:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# PartialCreation"
  endMarker="# END PartialCreation"
  language="py"
/>

This is what we ended up with:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Creation"
  endMarker="# END Creation"
  language="py"
/>

You can also create an object from existing collections in Weaviate like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GetCollections"
  endMarker="# END GetCollections"
  language="py"
/>

### Collection methods

You should now see code autocomplete suggestions for the `articles` / `authors` objects. Operations are grouped into submodules. The key submodules are:

- `data`: CUD operations (read operations are in `query`)
- `query`: Search operations
- `generate`: Retrieval augmented generation operations
- `query_group_by`: Object-level group by operations

:::note `Aggregate` not yet available
At the time of writing, `aggregate` operations are not yet available.
:::

### CRUD operations

You can add objects with the `insert` method.

Run this to add an object to the `articles` collection:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# AddOneObject"
  endMarker="# END AddOneObject"
  language="py"
/>

And run this to add an object to the `authors` collection:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# AddAnotherObject"
  endMarker="# END AddAnotherObject"
  language="py"
/>


#### Add objects (batch)

You can also add multiple objects at once. The new syntax allows you to pass a list of (wvc.DataObject) objects.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# AddArticles"
  endMarker="# END AddArticles"
  language="py"
/>

The `response` object contains the UUIDs of the created objects, and more. Take a look!

This is how we add some articles to 'authors', with a cross-reference to `articles`. Note the `ReferenceFactory` class.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# AddAuthors"
  endMarker="# END AddAuthors"
  language="py"
/>

#### Batch import error handling

The client will now automatically capture errors that occur during batch imports (now called `insert_many`). Try this example, where the `url` property is erroneously provided a numerical value for one of the inputs:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# InsertsWithErrors"
  endMarker="# END InsertsWithErrors"
  language="py"
/>

Inspecting the `errors` attribute allows you to see the index of the object, and the error message!

Take a look at:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# PrintErrors"
  endMarker="# END PrintErrors"
  language="py"
/>

#### Deletion

If you are running the code multiple times, or want to delete existing collections, you can do so like this.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Deletion"
  endMarker="# END Deletion"
  language="py"
/>

Note this will not throw if you try to delete a collection that does not exist.

#### Collection iterator (`cursor` API)

The `collections` client adds a Pythonic iterator method for each collection. This wraps the `cursor` API and allows you to iterate over all objects in a collection.

This will fetch all objects in the `articles` collection, including most of its properties and metadata.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# IteratorBasic"
  endMarker="# END IteratorBasic"
  language="py"
/>

You can specify what properties to retrieve. This will only fetch the `title` property. Doing so will switch off default metadata retrieval.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# IteratorTitleOnly"
  endMarker="# END IteratorTitleOnly"
  language="py"
/>

You can also specify what metadata to retrieve. This will only fetch the `uuid` metadata. Doing so will switch off default property retrieval.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# IteratorMetadataOnly"
  endMarker="# END IteratorMetadataOnly"
  language="py"
/>

Note that as the `cursor` API inherently requires the object UUID for indexing, the `uuid` metadata is always retrieved.

### Queries

Now you have data on which you can try out queries!

You can now fetch objects like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# BasicFetch"
  endMarker="# END BasicFetch"
  language="py"
/>

Notice how you don't have to specify the collection name (provided in the object), and properties to retrieve.

You can also specify these if you wish.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# FetchWithProps"
  endMarker="# END FetchWithProps"
  language="py"
/>

All your other favorite queries are available - like near text.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# NearText"
  endMarker="# END NearText"
  language="py"
/>

**Suggestion**: Try different queries, like bm25 or hybrid.

#### Filters

We've improved filters, which are currently untyped dictionary objects like:

```python
{
    "path": "birth_year",
    "operator": "GreaterThanEqual",
    "valueInt": [1971],
}
```

Now you can add filters with a `Filter` object, like so:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# FetchWithFilter"
  endMarker="# END FetchWithFilter"
  language="py"
/>



**Suggestion**: Try constructing different filters!

### Retrieval augmented generation (RAG)

Let's load some data and have fun with RAG functionalities.

Install the `weaviate-demo-datasets` package to make it easy to pre-load some data.

```shell
pip install weaviate-demo-datasets
```

Import some demo data. This is pre-vectorized data, so it will load quickly.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# ImportData"
  endMarker="# END ImportData"
  language="py"
/>

RAG functionality is now available through a different `generate` submodule. Converting a search query to a RAG query is as simple as changing the submodule, and supplying the required generative parameters.

So a grouped task, for example looks like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GroupedTask"
  endMarker="# END GroupedTask"
  language="py"
/>

The generated text is now available like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# OutputGroupedTask"
  endMarker="# END OutputGroupedTask"
  language="py"
/>

Single prompt tasks are like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# SinglePrompt"
  endMarker="# END SinglePrompt"
  language="py"
/>

With generated output attached to each object, like this:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# OutputSinglePrompt"
  endMarker="# END OutputSinglePrompt"
  language="py"
/>

### Data model / generics

You can choose to provide a generic type to a query or data operation. This can be beneficial as the generic class is used to extract the return properties and statically type the response.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GenericsExample"
  endMarker="# END GenericsExample"
  language="py"
/>

### Choose your own adventure

With these basics in place, you should be ready to try out all of the other operations available in the `collections` client.

One suggestion is for you to translate any existing scripts you have to use the new API.

Or alternatively, you can try all the different operations - many of which we just haven not had time to cover here. They are available through submodules, so for an `articles` collection, you can try:

```python
articles.data  # For data operations
articles.query  # For searches
articles.generate  # For retrieval augmented generations
articles.query_group_by  # To group results by a property
```

We think you'll be pleasantly surprised by many of these. For example, the `group by` operations have become refreshingly simple:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# GroupByExample"
  endMarker="# END GroupByExample"
  language="py"
/>

The options are (nearly) endless!

## Reminder: feedback

:::caution important
:::

If you haven't, **please provide your feedback [through this form](https://tally.so/r/wa4NDB).**

You can also provide any other feedback directly to JP on Slack, internal or via the Community slack (he's `JP (Weaviate)` there).

## Notes & Troubleshooting

### Notes

#### How to create a virtual environment with `venv`

Go to your project directory and run:

```shell
python -m venv .venv
```

(Depending on your setup, `python` might need to be `python3`)

Then activate it with:

```shell
source .venv/bin/activate
```

### Troubleshooting

#### Is Weaviate up?

You can check that the containers are up and available by running `docker ps` from the shell. This should show two Docker containers running - like:

```shell
CONTAINER ID   IMAGE                                                                                        COMMAND                  CREATED          STATUS         PORTS                                              NAMES
e90a63fe1e15   semitechnologies/weaviate:preview-automatically-return-all-props-metadata-for-refs-07fce6f   "/bin/weaviate --hos…"   10 seconds ago   Up 9 seconds   0.0.0.0:8080->8080/tcp, 0.0.0.0:50055->50051/tcp   try_new_wv_api_202306-weaviate-1
```

The `STATUS` should include `Up` and closely match the `CREATED` time.

#### Is the gRPC port open / available?

If you get a gRPC related error, your gRPC port may not be available. Please try remapping it to another port (it can be anything). For example, you can change it from 50051 to 50055 by editing:

```yaml
    ports:
     - "8080:8080"
     - "50051:50051"
```

To

```yaml
    ports:
     - "8080:8080"
     - "50055:50051"
```

Note that this will require you to edit the gRPC port in the client parameter `grpc_port_experimental`.
