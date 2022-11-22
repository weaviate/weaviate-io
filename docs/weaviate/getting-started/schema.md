---
title: Schema
sidebar_position: 2

# layout: layout-documentation
# solution: weaviate
# sub-menu: Getting started
# description: Getting started with the Weaviate schema
# tags: ['basics']
# open-graph-type: article
# toc: true
---
<!-- TODO: find a way to import Tabs and TabItem by default in all documantation pages -->
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You've made it to the schema getting started guide! The schema is the place where you will not only set data types, cross-references, and more, but you'll be tweaking index settings (ANN, reverse index, BM25).

This will also be a guide to getting your hands dirty! Oh, and this guide is a bit longer 😉

## Prerequisites 

At this point, you should have Weaviate running either:
<!-- TODO: Find a way to reference customFields.weaviateVersion from docusaurus.config.js -->
<!-- And use it in place of {{ site.weaviate_version }} -->
* in a sandbox on the [Weaviate Cloud Service](https://console.semi.technology)
    * if not, refer to the [Installation](./installation.html) lesson for instructions
* or locally with Docker
    1. Download [this docker-compose.yml file](https://configuration.semi.technology/v2/docker-compose/docker-compose.yml?enterprise_usage_collector=false&modules=standalone&runtime=docker-compose&weaviate_version={{ site.weaviate_version }}).
    1. Run `$ docker-compose up`
    1. Make sure that you always run `$ docker-compose down` after a shutdown(!)

## Client Libraries

You can communicate with Weaviate from your code by using one of the available [client libraries](../client-libraries/) (currently available for `Python`, `JavaScript`, `Java` and `Go`) or the [restful API](/developers/weaviate/current/restful-api-references/).

The first order of business, is to add the client library to your project.

<Tabs groupId="languages">
<TabItem value="py" label="Python">

For `Python` add the `weaviate-client` to your system libraries with `pip`:
```bash
$ pip install weaviate-client
```

</TabItem>
<TabItem value="js" label="JavaScript">

For `JavaScript` add `weaviate-client` to your project with `npm`:
```bash
$ npm install weaviate-client
```

</TabItem>
<TabItem value="java" label="Java">

For `Java` add this dependency to your project:
```xml
<dependency>
  <groupId>technology.semi.weaviate</groupId>
  <artifactId>client</artifactId>
  <version>3.2.0</version>
</dependency>
```

</TabItem>
<TabItem value="go" label="Go">

For `Go` add `weaviate-go-client` to your project with `go get`:
```bash
go get github.com/semi-technologies/weaviate-go-client/v4
```

</TabItem>
</Tabs>

## Connect to Weaviate

First, let's make sure that you can connect to your Weaviate instance. <br/>
To do this we need the `host` endpoint to your instance. 

* If you use WCS – it should be based on the `cluster-id` you've created in the previous lesson - just replace `some-endpoint` in the code example below with the `cluster-id`
* or `localhost:8080` if you are running Weaviate locally.

Run the below code in your project.

<!-- {% include code/1.x/getting-started.schema.connect.html %} -->
<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python
import weaviate
import json

# highlight-start
client = weaviate.Client("https://some-endpoint.semi.network/") # <== if you use the WCS
# highlight-end
# or
# highlight-start
client = weaviate.Client("http://localhost:8080") # <== if you use Docker-compose
# highlight-end

schema = client.schema.get()
print(json.dumps(schema))
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const weaviate = require("weaviate-client");

// if you use the WCS
const client = weaviate.client({
    scheme: 'https',
    host: 'some-endpoint.semi.network/',
  }); 

// or 

// if you use Docker-compose
const client = weaviate.client({
  scheme: 'http',
  host: 'localhost:8080',
}); 

client
  .schema
  .getter()
  .do()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err)
  });
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
	"context"
	"fmt"
	"github.com/semi-technologies/weaviate-go-client/v4/weaviate"
)

func GetSchema() {
    // if you use the WCS
    cfg := weaviate.Config{
        Host:   "some-endpoint.semi.network/",
        Scheme: "https",
    }

    // or

    // if you use Docker-compose
    cfg := weaviate.Config{
        Host:   "localhost:8080",
        Scheme: "http",
    }

    client := weaviate.New(cfg)

    schema, err := client.Schema().Getter().Do(context.Background())
    if err != nil {
        panic(err)
    }
    fmt.Printf("%v", schema)
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
package technology.semi.weaviate;

import technology.semi.weaviate.client.Config;
import technology.semi.weaviate.client.WeaviateClient;
import technology.semi.weaviate.client.base.Result;
import technology.semi.weaviate.client.v1.misc.model.Meta;

public class App {
  public static void main(String[] args) {
    // if you use the WCS
    Config config = new Config("https", "some-endpoint.semi.network/");
    
    // or 

    // if you use Docker-compose
    Config config = new Config("http", "localhost:8080");

    WeaviateClient client = new WeaviateClient(config);

    // get the schema
    Result<Schema> result = client.schema().getter().run();
    if (result.hasErrors()) {
        System.out.println(result.getError());
        return;
    }

    // print the schema
    System.out.println(result.getResult());
  }
}
```

</TabItem>
<TabItem value="curl" label="Curl">

```bash
$ curl https://some-endpoint.semi.network/v1/schema

# or

$ curl http://localhost:8080/v1/schema
```

</TabItem>
</Tabs>

The result should look like this:

```json
{"classes": []}
```

This means you're connected to an empty Weaviate.

:::info Default endpoint for this tutorial
From now on, all examples will provide the code using the WCS endpoint: `"some-endpoint.semi.network/"`<br/>Replace the value to match your host endpoint.
:::

### Resetting your Weaviate instance
If this is not the case and you see (old) classes, you can restart your instance, or you can run the following if you're using the Python client:

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/")

# delete all classes
client.schema.delete_all()

schema = client.schema.get()
print(json.dumps(schema))
```

## Create your first class!

Let's create your first class!

We'll take the example of the **Author** from the [basics](../core-knowledge/basics.html#data-objects-in-weaviate)  guide.

Our **Authors** have the following properties:
* `name`: type `string`
* `age`: type `int`
* `born`: type `date`
* `wonNobelPrize`: type `boolean`
* `description`: type `text`

Run the below code in you application, which will define the schema for the **Author** class.

<!-- {% include code/1.x/getting-started.schema.create.1.html %} -->
<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/") # <== update the endpoint here!

# we will create the class "Author" and the properties
# from the basics section of this guide
class_obj = {
    "class": "Author", # <= note the capital "A".
    "description": "A description of this class, in this case, it is about authors",
    "properties": [
        {
            "dataType": [
                "string"
            ],
            "description": "The name of the Author",
            "name": "name",
        },
        {
            "dataType": [
                "int"
            ],
            "description": "The age of the Author",
            "name": "age"
        },
        {
            "dataType": [
                "date"
            ],
            "description": "The date of birth of the Author",
            "name": "born"
        },
        {
            "dataType": [
                "boolean"
            ],
            "description": "A boolean value if the Author won a nobel prize",
            "name": "wonNobelPrize"
        },
        {
            "dataType": [
                "text"
            ],
            "description": "A description of the author",
            "name": "description"
        }
    ]
}

# add the schema
client.schema.create_class(class_obj)

# get the schema
schema = client.schema.get()

# print the schema
print(json.dumps(schema, indent=4))
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js

const weaviate = require("weaviate-client");

// update the endpoint here!
const client = weaviate.client({
    scheme: 'https',
    host: 'some-endpoint.semi.network/',
  }); 

// we will create the class "Author" and the properties
// from the basics section of this guide
var classObj = {
  "class": "Author", // <= note the capital "A".
  "description": "A description of this class, in this case, it is about authors",
  "properties": [
      {
          "dataType": [
              "string"
          ],
          "description": "The name of the Author",
          "name": "name",
      },
      {
          "dataType": [
              "int"
          ],
          "description": "The age of the Author",
          "name": "age"
      },
      {
          "dataType": [
              "date"
          ],
          "description": "The date of birth of the Author",
          "name": "born"
      },
      {
          "dataType": [
              "boolean"
          ],
          "description": "A boolean value if the Author won a nobel prize",
          "name": "wonNobelPrize"
      },
      {
          "dataType": [
              "text"
          ],
          "description": "A description of the author",
          "name": "description"
      }
  ]
}

// add the schema
client
  .schema
  .classCreator()
  .withClass(classObj)
  .do()
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  });

// get and print the schema
client
  .schema
  .getter()
  .do()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err)
  });
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
	"context"
    "fmt"
    "github.com/semi-technologies/weaviate-go-client/v4/weaviate"
    "github.com/semi-technologies/weaviate/entities/models"
)

func main() {
    // update the endpoint here!
    cfg := weaviate.Config{
        Host:   "some-endpoint.semi.network/",
		Scheme: "https",
    }

    client := weaviate.New(cfg)

    // we will create the class "Author" and the properties
    // from the basics section of this guide
    classObj := &models.Class{
        Class:       "Author", // <= note the capital "A".
        Description: "A description of this class, in this case, it is about authors",
        Properties: []*models.Property{
            {
                DataType:    []string{"string"},
                Description: "The name of the Author",
                Name:        "name",
            },
            {
                DataType:    []string{"int"},
                Description: "The age of the Author",
                Name:        "age",
            },
            {
                DataType:    []string{"date"},
                Description: "The date of birth of the Author",
                Name:        "born",
            },
            {
                DataType:    []string{"boolean"},
                Description: "A boolean value if the Author won a nobel prize",
                Name:        "wonNobelPrize",
            },
            {
                DataType:    []string{"text"},
                Description: "A description of the author",
                Name:        "description",
            },
        },
    }

    // add the schema
    err := client.Schema().ClassCreator().WithClass(classObj).Do(context.Background())
    if err != nil {
        panic(err)
    }

    // get the schema
    schema, err := client.Schema().Getter().Do(context.Background())
    if err != nil {
        panic(err)
    }

    // print the schema
    fmt.Printf("%v", schema)
}
```

</TabItem>
<TabItem value="java" label="Java">

```java

package technology.semi.weaviate;

import java.util.ArrayList;
import technology.semi.weaviate.client.Config;
import technology.semi.weaviate.client.WeaviateClient;
import technology.semi.weaviate.client.base.Result;
import technology.semi.weaviate.client.v1.schema.model.DataType;
import technology.semi.weaviate.client.v1.schema.model.Property;
import technology.semi.weaviate.client.v1.schema.model.WeaviateClass;

public class App {
  public static void main(String[] args) {
    // if you use the WCS
    Config config = new Config("https", "some-endpoint.semi.network/");
    
    // or 

    // if you use Docker-compose
    Config config = new Config("http", "localhost:8080");

    WeaviateClient client = new WeaviateClient(config);

    // we will create the class "Author" and the properties
    // from the basics section of this guide
    WeaviateClass clazz = WeaviateClass.builder()
      .className("Author")
      .description("A description of this class, in this case, it is about authors")
      .properties(new ArrayList() { {
        add(Property.builder()
          .dataType(new ArrayList(){ { add(DataType.STRING); } })
          .description("The name of the Author")
          .name("name")
          .build());
        add(Property.builder()
          .dataType(new ArrayList(){ { add(DataType.INT); } })
          .description("The age of the Author")
          .name("age")
          .build());
        add(Property.builder()
          .dataType(new ArrayList(){ { add(DataType.DATE); } })
          .description("The date of birth of the Author")
          .name("born")
          .build());
        add(Property.builder()
          .dataType(new ArrayList(){ { add(DataType.BOOLEAN); } })
          .description("A boolean value if the Author won a nobel prize")
          .name("wonNobelPrize")
            .build());
        add(Property.builder()
          .dataType(new ArrayList(){ { add(DataType.TEXT); } })
          .description("A description of the author")
          .name("description")
          .build());
      } })
      .build();
    
    // add the schema
    Result<Boolean> result = client.schema().classCreator().withClass(clazz).run();
    if (result.hasErrors()) {
      System.out.println(result.getError());
      return;
    }
    System.out.println(result.getResult());

    // get the schema
    Result<Schema> result = client.schema().getter().run();
    if (result.hasErrors()) {
        System.out.println(result.getError());
        return;
    }

    // print the schema
    System.out.println(result.getResult());
    
  }
}
```

</TabItem>
<TabItem value="curl" label="Curl">

```bash
$ curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
        "class": "Author",
        "description": "A description of this class, in this case, it is about authors",
        "properties": [
            {
                "dataType": [
                    "string"
                ],
                "description": "The name of the Author",
                "name": "name"
            },
            {
                "dataType": [
                    "int"
                ],
                "description": "The age of the Author",
                "name": "age"
            },
            {
                "dataType": [
                    "date"
                ],
                "description": "The date of birth of the Author",
                "name": "born"
            },
            {
                "dataType": [
                    "boolean"
                ],
                "description": "A boolean value if the Author won a nobel prize",
                "name": "wonNobelPrize"
            },
            {
                "dataType": [
                    "text"
                ],
                "description": "A description of the author",
                "name": "description"
            }
        ]
    }' \
    # update the endpoint here!
    https://some-endpoint.semi.network/v1/schema
```

</TabItem>
</Tabs>

The result should look something like this:

```json
{
    "classes": [
        {
            "class": "Author",
            "description": "A description of this class, in this case, it's about authors",
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
                    "description": "The name of the Author",
                    "name": "name",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "The age of the Author",
                    "name": "age"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "The date of birth of the Author",
                    "name": "born"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "A boolean value if the Author won a nobel prize",
                    "name": "wonNobelPrize"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "A description of the author",
                    "name": "description",
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

 Wow! What, that’s a lot more than we’ve added?

Correct, that's Weaviate adding some default config for you. You can change, improve, tweak, and update this, but that's for a later expert guide. 

Now, let's add a second class called **Publication**. We will use to it store info about publication outlets like *The New York Time* or *The Guardian*.

Our **Publication** will contain one property:
* `name`: type `string`

Run the below code in your application.

<!-- {% include code/1.x/getting-started.schema.create.2.html %} -->
<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python

import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/")

# we will create the class "Publication" and the properties
# from the basics section of this guide
class_obj = {
    "class": "Publication",
    "description": "A description of this class, in this case, it is about publications",
    "properties": [
        {
            "dataType": [
                "string"
            ],
            "description": "The name of the Publication",
            "name": "name",
        }
    ]
}

# add the schema
client.schema.create_class(class_obj)

# get the schema
schema = client.schema.get()

# print the schema
print(json.dumps(schema, indent=4))
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js

const weaviate = require("weaviate-client");

// update the endpoint!
const client = weaviate.client({
    scheme: 'https',
    host: 'some-endpoint.semi.network/',
  }); 

// we will create the class "Publication" and the properties
// from the basics section of this guide

var classObj = {
    "class": "Publication",
    "description": "A description of this class, in this case, it is about publications",
    "properties": [
        {
            "dataType": [
                "string"
            ],
            "description": "The name of the Publication",
            "name": "name",
        }
    ]
}

// add the schema
client
  .schema
  .classCreator()
  .withClass(classObj)
  .do()
  .then(res => {
    console.log(res)
  })
  .catch(err => {
    console.error(err)
  });

// get and print the schema
client
  .schema
  .getter()
  .do()
  .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err)
  });
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
	"context"
	"fmt"
	"github.com/semi-technologies/weaviate-go-client/v4/weaviate"
  "github.com/semi-technologies/weaviate/entities/models"

)

func main() {
    cfg := weaviate.Config{
        Host:   "some-endpoint.semi.network/",
        Scheme: "https",
    }

    client := weaviate.New(cfg)

    // we will create the class "Publication" and the properties
    // from the basics section of this guide
    classObj := &models.Class{
        Class:       "Publication", // <= note the capital "A".
        Description: "A description of this class, in this case, it is about publications",
        Properties: []*models.Property{
            {
                DataType:    []string{"string"},
                Description: "The name of the Publication",
                Name:        "name",
            },
        },
    }

    // add the schema
    err := client.Schema().ClassCreator().WithClass(classObj).Do(context.Background())
    if err != nil {
        panic(err)
    }

    // get the schema
    schema, err := client.Schema().Getter().Do(context.Background())
    if err != nil {
        panic(err)
    }

    // print the schema
    fmt.Printf("%v", schema)
}
```

</TabItem>
<TabItem value="java" label="Java">

```java

package technology.semi.weaviate;

import java.util.ArrayList;
import technology.semi.weaviate.client.Config;
import technology.semi.weaviate.client.WeaviateClient;
import technology.semi.weaviate.client.base.Result;
import technology.semi.weaviate.client.v1.schema.model.DataType;
import technology.semi.weaviate.client.v1.schema.model.Property;
import technology.semi.weaviate.client.v1.schema.model.WeaviateClass;

public class App {
  public static void main(String[] args) {
    Config config = new Config("https", "some-endpoint.semi.network/");

    WeaviateClient client = new WeaviateClient(config);

    // we will create the class "Publication" and the properties
    // from the basics section of this guide
    WeaviateClass clazz = WeaviateClass.builder()
      .className("Publication")
      .description("A description of this class, in this case, it is about publications")
      .properties(new ArrayList() { {
        add(Property.builder()
          .dataType(new ArrayList(){ { add(DataType.STRING); } })
          .description("The name of the Publication")
          .name("name")
          .build());
      } })
      .build();
    
    // add the schema
    Result<Boolean> result = client.schema().classCreator().withClass(clazz).run();
    if (result.hasErrors()) {
      System.out.println(result.getError());
      return;
    }
    // get the schema
    Result<Schema> result = client.schema().getter().run();
    if (result.hasErrors()) {
        System.out.println(result.getError());
        return;
    }

    // print the schema
    System.out.println(result.getResult());
    
  }
}
```

</TabItem>
<TabItem value="curl" label="Curl">

```bash
$ curl \
-X POST \
-H "Content-Type: application/json" \
-d '{
    "class": "Publication",
    "description": "A description of this class, in this case, it is about Publications",
    "properties": [
        {
            "dataType": [
                "string"
            ],
            "description": "The name of the Publication",
            "name": "name"
        }
    ]
}' \
https://some-endpoint.semi.network/v1/schema
    
curl https://some-endpoint.semi.network/v1/schema
```

</TabItem>
</Tabs>

The result should look something like this:

```json
{
    "classes": [
        {
            "class": "Author",
            "description": "A description of this class, in this case, it's about authors",
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
                    "description": "The name of the Author",
                    "name": "name",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "The age of the Author",
                    "name": "age"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "The date of birth of the Author",
                    "name": "born"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "A boolean value if the Author won a nobel prize",
                    "name": "wonNobelPrize"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "A description of the author",
                    "name": "description",
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
        },
        {
            "class": "Publication",
            "description": "A description of this class, in this case, it's about authors",
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

Note, we now have the **Author** _and_ the **Publication** in there!

:::tip Auto schema feature
You can import data into Weaviate without creating a schema. Weaviate will use all default settings, and guess what data type you use. If you have a setup with modules, Weaviate will also guess the default settings for the modules.

Although auto schema works well for some instances, we always advise manually setting your schema to optimize Weaviate's performance.
:::

## Setting cross-references

Now, that we have these two classes, we can use a **cross-reference** to indicate that an `Author`, `writesFor` a `Publication`. To achieve this, we want to update the `Author` class to contain the cross-reference to `Publication`.

Run the below code in your application to update the `Author` class with the `writesFor` cross-reference to `Publication`.

<!-- {% include code/1.x/getting-started.schema.crossreference.1.html %} -->
<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/")

add_prop = {
  "dataType": [
      "Publication" # <== note how the name of the class is the cross reference
  ],
  "name": "writesFor"
}

# Add the property
client.schema.property.create("Author", add_prop)

# get the schema
schema = client.schema.get()

# print the schema
print(json.dumps(schema, indent=4))
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const weaviate = require("weaviate-client");

const client = weaviate.client({
    scheme: 'https',
    host: 'some-endpoint.semi.network/',
  }); 

const className = 'Author';
const prop = {
  dataType: ['Publication'], // <== note how the name of the class is the cross reference
  name: 'writesFor',
};

client.schema
      .propertyCreator()
      .withClassName(className)
      .withProperty(prop)
      .do()
      .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err)
  });

// get and print the schema
  client
    .schema
    .getter()
    .do()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err)
    });
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
  "context"
	"fmt"

  "github.com/semi-technologies/weaviate-go-client/v4/weaviate"
  "github.com/semi-technologies/weaviate/entities/models"
)

func main() {
    cfg := weaviate.Config{
        Host:   "some-endpoint.semi.network/",
        Scheme: "https",
    }

    client := weaviate.New(cfg)

    prop := &models.Property{
        DataType: []string{"Publication"}, // <== note how the name of the class is the cross reference
        Name:     "writesFor",
    }

    err := client.Schema().PropertyCreator().
        WithClassName("Author").
        WithProperty(prop).
        Do(context.Background())

    if err != nil {
        panic(err)
    }

    // get the schema
    schema, err := client.Schema().Getter().Do(context.Background())
    if err != nil {
        panic(err)
    }

    // print the schema
    fmt.Printf("%v", schema)
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
package technology.semi.weaviate;

import java.util.Arrays;
import technology.semi.weaviate.client.Config;
import technology.semi.weaviate.client.WeaviateClient;
import technology.semi.weaviate.client.base.Result;
import technology.semi.weaviate.client.v1.schema.model.DataType;
import technology.semi.weaviate.client.v1.schema.model.Property;

public class App {
  public static void main(String[] args) {
    Config config = new Config("https", "some-endpoint.semi.network/");

    WeaviateClient client = new WeaviateClient(config);

    Property property = Property.builder()
      .dataType(Arrays.asList("Publication")) // <== note how the name of the class is the cross reference
      .name("writesFor")
      .build();

    Result<Boolean> result = client.schema().propertyCreator()
      .withClassName("Author")
      .withProperty(property)
      .run();

    if (result.hasErrors()) {
      System.out.println(result.getError());
      return;
    }
    System.out.println(result.getResult());

    // get the schema
    Result<Schema> result = client.schema().getter().run();
    if (result.hasErrors()) {
        System.out.println(result.getError());
        return;
    }

    // print the schema
    System.out.println(result.getResult());
  }
}
```

</TabItem>
<TabItem value="curl" label="Curl">

```bash
$ curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{ 
      "dataType": [
        "Publication"
      ],
      "name": "writesFor"
    }' \
    https://some-endpoint.semi.network/v1/schema/Author/properties

curl https://some-endpoint.semi.network/v1/schema
```

</TabItem>
</Tabs>

The result should look something like this:

```json
{
    "classes": [
        {
            "class": "Author",
            "description": "A description of this class, in this case, it's about authors",
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
                    "description": "The name of the Author",
                    "name": "name",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "The age of the Author",
                    "name": "age"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "The date of birth of the Author",
                    "name": "born"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "A boolean value if the Author won a nobel prize",
                    "name": "wonNobelPrize"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "A description of the author",
                    "name": "description",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "Publication"
                    ],
                    "name": "writesFor"
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
        },
        {
            "class": "Publication",
            "description": "A description of this class, in this case, it's about authors",
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

Note this part (this is just a chunk of the response):

```json
{
    "classes": [
        {
            "class": "Author",
            "properties": [
                {
                    "dataType": [
                        "Publication"
                    ],
                    "name": "writesFor"
                }
            ]
        }
    ]
}
```

We can also set it the other way around, a `Publication`, `has`, `Authors`. To achieve this, we want to update the `Publication` class to contain the `has` cross-reference to `Author`.

<!-- {% include code/1.x/getting-started.schema.crossreference.2.html %} -->
<Tabs groupId="languages">
<TabItem value="py" label="Python">

```python
import weaviate
import json

client = weaviate.Client("https://some-endpoint.semi.network/")

add_prop = {
  "dataType": [
      "Author" # <== note how the name of the class is the cross reference
  ],
  "name": "has"
}

# Add the property
client.schema.property.create("Publication", add_prop)

# get the schema
schema = client.schema.get()

# print the schema
print(json.dumps(schema, indent=4))
```

</TabItem>
<TabItem value="js" label="JavaScript">

```js
const weaviate = require("weaviate-client");

const client = weaviate.client({
    scheme: 'https',
    host: 'some-endpoint.semi.network/',
  }); 

const className = 'Publication';
const prop = {
  dataType: ['Author'], // <== note how the name of the class is the cross reference
  name: 'has',
};

client.schema
      .propertyCreator()
      .withClassName(className)
      .withProperty(prop)
      .do()
      .then(res => {
    console.log(res);
  })
  .catch(err => {
    console.error(err)
  });

// get and print the schema
  client
    .schema
    .getter()
    .do()
    .then(res => {
      console.log(res);
    })
    .catch(err => {
      console.error(err)
    });
```

</TabItem>
<TabItem value="go" label="Go">

```go
package main

import (
  "context"
  "fmt"

  "github.com/semi-technologies/weaviate-go-client/v4/weaviate"
  "github.com/semi-technologies/weaviate/entities/models"
)

func main() {
    cfg := weaviate.Config{
        Host:   "some-endpoint.semi.network/",
        Scheme: "https",
    }

    client := weaviate.New(cfg)

    prop := &models.Property{
        DataType: []string{"Author"}, // <== note how the name of the class is the cross reference
        Name:     "has",
    }

    err := client.Schema().PropertyCreator().
        WithClassName("Publication").
        WithProperty(prop).
        Do(context.Background())

    if err != nil {
        panic(err)
    }

    // get the schema
    schema, err := client.Schema().Getter().Do(context.Background())
    if err != nil {
        panic(err)
    }

    // print the schema
    fmt.Printf("%v", schema)
}
```

</TabItem>
<TabItem value="java" label="Java">

```java
package technology.semi.weaviate;

import java.util.Arrays;
import technology.semi.weaviate.client.Config;
import technology.semi.weaviate.client.WeaviateClient;
import technology.semi.weaviate.client.base.Result;
import technology.semi.weaviate.client.v1.schema.model.DataType;
import technology.semi.weaviate.client.v1.schema.model.Property;

public class App {
  public static void main(String[] args) {
    Config config = new Config("https", "some-endpoint.semi.network/");
    
    WeaviateClient client = new WeaviateClient(config);

    Property property = Property.builder()
      .dataType(Arrays.asList("Author")) // <== note how the name of the class is the cross reference
      .name("has")
      .build();

    Result<Boolean> result = client.schema().propertyCreator()
      .withClassName("Publication")
      .withProperty(property)
      .run();

    if (result.hasErrors()) {
      System.out.println(result.getError());
      return;
    }
    System.out.println(result.getResult());

    // get the schema
    Result<Schema> result = client.schema().getter().run();
    if (result.hasErrors()) {
        System.out.println(result.getError());
        return;
    }

    // print the schema
    System.out.println(result.getResult());
  }
}
```

</TabItem>
<TabItem value="curl" label="Curl">

```bash
$ curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{ 
      "dataType": [
        "Author"
      ],
      "name": "has"
    }' \
    https://some-endpoint.semi.network/v1/schema/Publication/properties

curl https://some-endpoint.semi.network/v1/schema
```

</TabItem>
</Tabs>

This results in:

```json
{
    "classes": [
        {
            "class": "Author",
            "description": "A description of this class, in this case, it's about authors",
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
                    "description": "The name of the Author",
                    "name": "name",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "int"
                    ],
                    "description": "The age of the Author",
                    "name": "age"
                },
                {
                    "dataType": [
                        "date"
                    ],
                    "description": "The date of birth of the Author",
                    "name": "born"
                },
                {
                    "dataType": [
                        "boolean"
                    ],
                    "description": "A boolean value if the Author won a nobel prize",
                    "name": "wonNobelPrize"
                },
                {
                    "dataType": [
                        "text"
                    ],
                    "description": "A description of the author",
                    "name": "description",
                    "tokenization": "word"
                },
                {
                    "dataType": [
                        "Publication"
                    ],
                    "name": "writesFor"
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
        },
        {
            "class": "Publication",
            "description": "A description of this class, in this case, it's about authors",
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
                },
                {
                    "dataType": [
                        "Author"
                    ],
                    "name": "has"
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

Note this part (this is just a chunk of the response):

```json
{
    "classes": [
        {
            "class": "Author",
            "properties": [
                {
                    "dataType": [
                        "Publication"
                    ],
                    "name": "writesFor"
                }
            ]
        },
        {
            "class": "Publication",
            "properties": [
                {
                    "dataType": [
                        "Author"
                    ],
                    "name": "has"
                }
            ]
        }
    ]
}
```

> 💡 You can set cross-references in all directions and later (as we will see [while querying](./query.html)) filter on them. Please, be aware that Weaviate is **not** a graph database ([remember](../core-knowledge/basics.html#what-is-weaviate)?). This means that dealing with -for example- many-to-many relationships or things like shortest path algorithms is not in our wheelhouse.

## Other schema operations

All schema operations are available in the [API documentation for the schema endpoint](../restful-api-references/schema.html). The documentation also includes examples in different client languages.

## Recapitulation

* Weaviate has a schema where you will define how your data objects will be indexed.
* Weaviate's schema is class property based.
* The schema is highly configurable but comes with pre-defined settings.
* There is an auto schema function, but for optimal usage, it's better to manually create a schema

## What would you like to learn next?

* [Learn how to import data](./import.html)
* [Learn how to query data based on a schema](query.html)
* [Take me one step back to the basics](../core-knowledge/basics.html)

# More Resources

{% include docs-support-links.html %}
