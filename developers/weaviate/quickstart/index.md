---
title: Weaviate Quickstart
sidebar_position: 0
image: og/docs/quickstart-tutorial.jpg
# tags: ['getting started']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

import registerImg from '../../wcs/img/register.png';
import WCSoptionsWithAuth from '../../wcs/img/wcs-options-with-auth.png';
import WCScreateButton from '../../wcs/img/wcs-create-button.png';
import WCScreate from '../../wcs/img/wcs-create.png';
import WCScreationProgress from '../../wcs/img/wcs-creation-progress.png';
import WCSApiKeyLocation from '../../wcs/img/wcs-apikey-location.png';

Welcome to the **Quickstart tutorial**. Here, you will:
- Create a vector database with Weaviate Cloud Services (WCS),
- Import data, and
- Perform searches

There are no prerequisites.

## Create a Weaviate instance

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

Under "Details", you will find the Weaviate instance related information like the API key (see the highlighted see button), cluster URL and so on.

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

## Import data

We will use a (tiny) dataset from a TV quiz show.

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

### Define a class

We'll define a data collection, called a "class", to store data objects.

In the class definition, let's specify a `vectorizer`. This will allow Weaviate to create vector representations of the data objects in that class.

:::tip Custom vectors
- You always have the option of providing vector embeddings yourself.
- Setting a `vectorizer` gives Weaviate the option of creating vector embeddings for you.
    - If you do not wish to, you can set this to `none`.
:::

Create a `Question` class with a vectorizer as shown below. We will use an inference service API, which will create vector embeddings for us.

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

<details>
  <summary>If you see <code>Error: Name 'Question' already used as a name for an Object class</code></summary>

You may see this error if you try to create a class that already exists in your instance of Weaviate. In this case, you can delete the class following the below instructions.

import CautionSchemaDeleteClass from '/_includes/schema-delete-class.mdx'

<CautionSchemaDeleteClass />

</details>

### Connect to Weaviate

Let's connect to your Weaviate instance. From the "Details" screen above in WCS, you will need:
- The Weaviate instance **API key**, and
- The Weaviate instance **URL**.

And for using an inference service API, we must provide:
- An additional **inference API key**

So that Weaviate can talk to the inference API.

Pass the inference API key to Weaviate as an additional header as shown below, .

import ConnectToWeaviateWithKey from '/_includes/code/quickstart.autoschema.connect.withkey.mdx'

<ConnectToWeaviateWithKey />

### Add data objects

Now, we can load our dataset and batch import it into Weaviate, like this:

import CodeAutoschemaImport from '/_includes/code/quickstart.autoschema.import.mdx'

<CodeAutoschemaImport />

We use a **batch import** here. You should use batch imports unless you have a good reason not to, as it will significantly improve the import speeds.

### Putting it together

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

We'll try a text similarity search. As we have a `text2vec` module enabled, we can use text-based similarity searche. Let's look for quiz items related to `biology`.

You can carry out text-based similarity searches with the `nearText` parameter like below, specifying the query text in the `concept` field.

import CodeAutoschemaNeartext from '/_includes/code/quickstart.autoschema.neartext.mdx'

<CodeAutoschemaNeartext />

You should see:

import BiologyQuestionsJson from '/_includes/code/quickstart.biology.questions.mdx'

<BiologyQuestionsJson />

Even though the word `biology` does not appear anywhere, Weaviate has returned biology-related entries (on DNA and species) as the closest results.

That is a simple example that shows why vector searches are powerful. Vectorized data objects allow for searches based on degrees of similarity, as shown here.

Try it out yourself with different strings, by changing the string from `biology`.

## Recap

Well done. You have successfully built a fully functioning vector database, including running your first queries.

You have:
- Vectorized your dataset through an inference API,
- Populated your Weaviate instance with the vectorized data, and
- Performed text similarity searches.

Of course, there is a lot more to Weaviate that we have not yet covered, and probably a lot that you wish to know about. So we include a few links below that might help you to get started in your journey with us.

Also, please feel free to reach out to us on our community [Slack](https://weaviate.io/slack). We love to hear from our users.

:::info Is something broken?
We want you to have the best experience possible here. So if you find that something here doesn't work, or doesn't make sense, please let us know! You can:
- File an [issue on GitHub](https://github.com/weaviate/weaviate-io/issues), or
- Talk to us on [Slack](https://weaviate.io/slack)
:::

## Next

import WhatNext from '/_includes/quickstart.what-next.mdx';

<WhatNext />


## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
