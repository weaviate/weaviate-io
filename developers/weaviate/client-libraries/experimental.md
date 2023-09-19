---
title: Experimental clients
sidebar_position: 99
sidebar_class_name: hidden
image: og/docs/client-libraries.jpg
# tags: ['python', 'client library']
---

import Badges from '/_includes/badges.mdx';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PythonCode from '!!raw-loader!./_includes/user_test.py';
import Feedback from './_includes/feedback.mdx';

<Badges/>

## Experimental clients

## Python `Collections` client

This page introduces our new Python client. We are excited for you to try it out and provide feedback for us.

:::note NOT FOR PRODUCTION USE
Please note that this is an early **pre-release** version, and is not yet ready for production use.
:::

#### Feedback

You will see sections marked for feedback. But if you have feedback about any part of this, please tell us. No answers or impressions are wrong.

Upon completion, please send the results to JP.
- Internally if you are a Weaviate team member.
- Via community Slack DM `JP (Weaviate)` if you are a community member.

## Setup

We recommend you create a **new environment** for this, in a new project directory. If you're not sure how, [read this](#how-to-create-a-virtual-environment-with-venv).

#### Client installation

Get into your desired environment, and run:

```shell
pip install -U "git+https://github.com/weaviate/weaviate-python-client.git@pydantic_experiment#egg=weaviate-client[GRPC]"
```

#### Start Weaviate

You will also need a pre-release version of Weaviate. Save [this `docker-compose.yml` file](https://raw.githubusercontent.com/databyjp/wv_python_usertest/main/docker-compose.yml)  in your project directory. Then, go to the directory and run `docker compose up -d`.

Note that you will need the `gRPC` ports open also. This will likely be simplified to one port in the future.

-----
-----

## Try out the client

We're good to go! Fire up your preferred way to edit / run Python code (Jupyter, VSCode, PyCharm, vim, whatever) and follow along.

### Key ideas

We call this the `collections` client, because the main interactions will be with a collection (currently called `Class` in Weaviate). (From here, we will use `collections` instead of `Class`.)

This client also includes custom Python classes to provide IDE assistance and typing help. You can import them individually, like so:

```
from weaviate.weaviate_classes import Property, ConfigFactory, VectorizerFactory, DataObject
```

But we will import the whole set of classes like this.

```
import weaviate.weaviate_classes as wvc
```

### Instantiation

Run the below to connect to Weaviate. Note that you need a `grpc` port specified.

If you don't have an OpenAI key, contact JP for a throwaway key. 😉

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Instantiation"
  endMarker="# END Instantiation"
  language="py"
/>

It should return `True`. If you get an error, it may be gRPC port related. See the Troubleshooting section below.

-----
-----

### Create a collection

#### Deletion

You can delete any existing collections like this.

<FilteredTextBlock
  text={PythonCode}
  startMarker="# Deletion"
  endMarker="# END Deletion"
  language="py"
/>

Note this will not throw if you try to delete a collection that does not exist.

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

The below is a partially complete collection definition. Please see if you can edit the below based on the comments:

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

#### Feedback - collection creation

<Feedback/>

-----
-----

### Collection methods

You should now see code autocomplete suggestions for the `articles` / `authors` objects. Two key submodules are:

-  `data`: CRUD operations
-  `query`: Search operations (old GraphQL, now gRPC)

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

#### Errors

The client will now automatically capture errors. Try this example, where the `url` property is erroneously provided a numerical value for one of the inputs:

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

#### Feedback - CRUD operations

<Feedback/>

-----
-----

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

You can add filters like so, with a `Filter` object:

<FilteredTextBlock
  text={PythonCode}
  startMarker="# FetchWithFilter"
  endMarker="# END FetchWithFilter"
  language="py"
/>

**Suggestion**: Try constructing different filters!

#### Feedback - Queries

<Feedback/>

-----
-----

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

RAG functionality is now available from within each search, through an additional argument. Grouped task, for example is like this:

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

#### Feedback - Generative search

<Feedback/>

-----
-----

## Overall feedback

- How was the new API compared to the existing one? (Better: 5, Worse: 1)
    - Could you explain why?

- How intuitive was the syntax? (Very intuitive: 5, Not intuitive: 1)
    - Could you give specific examples or reasons?

- What development environment did you use? (PyCharm? Jupyter? VSCode + ipynb notebooks? vim?)

- How was the typing / IDE assistance? (Very good: 5, Not good: 1)
    - Could you give specific examples or reasons?

#### Some specific questions:

- Was the use of classes helpful? (Yes: 5, No: 1)
- Do you wish there were fewer classes? (Yes / No)
- Was the use of factories intuitive? (Yes: 5, No: 1)
- Did you like having typed objects return vs `dicts`? (Yes: 5, No: 1)
- Did you find the `Filter` class intuitive? (Yes: 5, No: 1)

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
4be7efdff229   semitechnologies/contextionary:en0.16.0-v1.2.1                                               "/contextionary-serv…"   10 seconds ago   Up 9 seconds   0.0.0.0:9999->9999/tcp                             try_new_wv_api_202306-contextionary-1
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
