---
title: Schema
sidebar_position: 3
image: og/docs/quickstart-tutorial.jpg
# tags: ['basics']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

Now we are ready start to work on our instance of Weaviate.

For this guide, let's build a database containing news publications. Before populating our database with data objects, we must first tell the database about the structure of the information to be saved. 

This is called a _schema_. In our case, our schema will specify the structure of the **Publication** and objects that Weaviate will store.

Here, we will show you how to set up such a schema.

## Prerequisites 

At this point, you should have: 
- Weaviate running on the [Weaviate Cloud Service](https://console.semi.technology), and
- Installed the appropriate client library in a language of your choice. 

If you have not done this, [go back](./installation.md) to set up your Weaviate instance and client library first and come back :).

## Connect to Weaviate

First, let's make sure that you can connect to your Weaviate instance.

To do this we need to point the `host` endpoint to *your* instance. Just replace `some-endpoint` in the code example below with the `cluster-id` you created in the previous step.

> Note: From now on, all examples will provide the code using the WCS endpoint:<br/> `"some-endpoint.semi.network/"`<br/>Replace the value to match your host endpoint, or `http://localhost:8080` if you are running it on Docker.

Run the below code in your project.

import CodeConnectToWeaviate from '/_includes/code/getting.started.schema.connect.mdx';

<CodeConnectToWeaviate />

The result should look like this:

```json
{"classes": []}
```

Great! You've successfully made your first client query to Weaviate 🎉. The output tells us that this instance of Weaviate does not contain any classes. So let's create some.

:::caution Resetting your Weaviate instance
If this is not the case and your Weaviate instance contains classes, you can reset your instance, or you can manually delete the schema.

**But beware that will also delete all associated objects!** 

Do not do this to a production database, or anywhere where you do not wish to delete your data. 

Run this Python code to reset your instance;

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/")

# delete all classes - THIS WILL DELETE ALL DATA IN YOUR INSTANCE
client.schema.delete_all()

schema = client.schema.get()
print(json.dumps(schema))
```
:::

## Create a class

First let's add a class called **Publication**. We will use it to store info about publication outlets like *The New York Times* or *The Guardian*.

Our **Publication** class will contain one property:
* `name`: type `string`

Run the below code in you application, which will define the schema for the **Publication** class and display the created schema information.

import CodeCreateSchema from '/_includes/code/getting.started.schema.create.2.mdx';

<CodeCreateSchema />

The result should look something like this:

```json
{
    "classes": [
        {
            "class": "Publication",
            "description": "A description of this class, in this case, it's about publications",
            "invertedIndexConfig": {
                "bm25": {
                    "b": 0.75,
                    "k1": 1.2
                },
                "cleanupIntervalSeconds": 60,
                "stopwords": {
                    "additions": null,
                    "preset": "en",
                    "removals": null
                }
            },
            "properties": [
                {
                    "dataType": [
                        "string"
                    ],
                    "description": "The name of the Publication",
                    "name": "name",
                    "tokenization": "word"
                }
            ],
            "shardingConfig": {
                "virtualPerPhysical": 128,
                "desiredCount": 1,
                "actualCount": 1,
                "desiredVirtualCount": 128,
                "actualVirtualCount": 128,
                "key": "_id",
                "strategy": "hash",
                "function": "murmur3"
            },
            "vectorIndexConfig": {
                "skip": false,
                "cleanupIntervalSeconds": 300,
                "maxConnections": 64,
                "efConstruction": 128,
                "ef": -1,
                "dynamicEfMin": 100,
                "dynamicEfMax": 500,
                "dynamicEfFactor": 8,
                "vectorCacheMaxObjects": 2000000,
                "flatSearchCutoff": 40000,
                "distance": "cosine"
            },
            "vectorIndexType": "hnsw",
            "vectorizer": "none"
        }
    ]
}
```

Wow! That's a lot more settings than what we specified!

What's happened is that Weaviate has added some default configurations for you. You can change these options if you wish, but there is no need to for this guide.

Great! Your database is set up with a schema and ready to go. Next, we will show you how you can add **Publication** data into Weaviate.

## Recap

* Weaviate has a schema where you will define how your data objects will be indexed.
* Weaviate's schema is class property based.
* The schema is highly configurable but comes with pre-defined settings.

## Next

* [Import data](./import.md)

## Notes

### Auto-schema feature

You can import data into Weaviate without creating a schema. Weaviate will use all default settings, and guess what data type you use. If you have a setup with modules, Weaviate will also guess the default settings for the modules.

Although auto schema works well for some instances, we generally advise manually setting your schema to optimize Weaviate's performance.

### Other schema operations

All schema operations are available in the [API documentation for the schema endpoint](../restful-api-references/schema.html). The documentation also includes examples in different client languages.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
