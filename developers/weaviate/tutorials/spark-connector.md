---
title: Load data into Weaviate with Spark
sidebar_position: 80
image: og/docs/tutorials.jpg
# tags: ['how to', 'spark connector', 'spark']
---


## Overview

This tutorial is designed to show you an example of how to use the [Spark Connector](https://github.com/weaviate/spark-connector) to import data into Weaviate from Spark.

By the end of this tutorial, you'll be able to see how to you can import your data into [Apache Spark](https://spark.apache.org/) and then use the Spark Connector to write your data to Weaviate.

## Installation

We recommend reading the [Quickstart tutorial](../quickstart/index.md) first before tackling this tutorial.

We will install the python `weaviate-client` and also run Spark locally for which we need to install the python `pyspark` package. Use the following command in your terminal to get both:
```bash
pip3 install pyspark weaviate-client
```

For demonstration purposes this tutorial runs Spark locally. Please see the Apache Spark docs or consult your cloud environment for installation and deploying a Spark cluster and choosing a language runtime other than Python.

We will also need the Weaviate Spark connector. You can download this by running the following command in your terminal:

```bash
curl https://github.com/weaviate/spark-connector/releases/download/v||site.spark_connector_version||/spark-connector-assembly-||site.spark_connector_version||.jar --output spark-connector-assembly-||site.spark_connector_version||.jar
```

For this tutorial, you will also need a Weaviate instance running at `http://localhost:8080`. This instance does not need to have any modules and can be setup by following the [Quickstart tutorial](../quickstart/index.md).

You will also need Java 8+ and Scala 2.12 installed. You can get these separately setup or a more convenient way to get both of these set up is to install [IntelliJ](https://www.jetbrains.com/idea/).

## What is the Spark connector?

The Spark Connector gives you the ability to easily write data from Spark data structures into Weaviate. This is quite useful when used in conjunction with Spark extract, transform, load (ETLs) processes to populate a Weaviate vector database.

The Spark Connector is able to automatically infer the correct Spark DataType based on your schema for the class in Weaviate. You can choose to vectorize your data when writing to Weaviate, or if you already have vectors available, you can supply them. By default, the Weaviate client will create document IDs for you for new documents but if you already have IDs you can also supply those in the dataframe. All of this and more can be specified as options in the Spark Connector.

## Initializing a Spark session

Often a Spark Session will be created as part of your Spark environment (such as a Databricks notebook) and the only task is to add the Weaviate Spark Connector jar as a library to your cluster.

If you want to create a local Spark Session manually, use the following code to create a session with the connector:

```python
from pyspark.sql import SparkSession
import os

spark = (
    SparkSession.builder.config(
        "spark.jars",
        "spark-connector-assembly-||site.spark_connector_version||.jar",  #specify the spark connector JAR
    )
    .master("local[*]")
    .appName("weaviate")
    .getOrCreate()
)

spark.sparkContext.setLogLevel("WARN")
```

You should now have a Spark Session created and will be able to view it using the **Spark UI** at `http://localhost:4040`.

You can also verify the local Spark Session is running by executing:

```python
spark
```

## Reading data into Spark

For this tutorial we will read in a subset of the Sphere dataset, containing 100k lines, into the Spark Session that was just started.

You can download this dataset from [here](https://storage.googleapis.com/sphere-demo/sphere.100k.jsonl.tar.gz). Once downloaded extract the dataset.

The following line of code can be used to read the dataset into your Spark Session:

```python
df = spark.read.load("sphere.100k.jsonl", format="json")
```

To verify this is done correctly we can have a look at the first few records:

```python
df.limit(3).toPandas().head()
```

## Writing to Weaviate

:::tip
Prior to this step, make sure your Weaviate instance is running at `http://localhost:8080`. You can refer to the [Quickstart tutorial](../quickstart/index.md) for instructions on how to set that up.
:::

To quickly get a Weaviate instance running you can save the following `docker-compose.yml` file to your local machine:

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
    volumes:
    - weaviate_data:/var/lib/weaviate
    restart: on-failure:0
    environment:
      QUERY_DEFAULTS_LIMIT: 25
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'true'
      PERSISTENCE_DATA_PATH: '/var/lib/weaviate'
      DEFAULT_VECTORIZER_MODULE: 'none'
      ENABLE_MODULES: ''
      CLUSTER_HOSTNAME: 'node1'
volumes:
  weaviate_data:
...
```

Then, navigate to the directory and start Weaviate according to the `docker-compose.yml` using:

```bash
docker compose up -d
```

The Spark Connector assumes that a schema has already been created in Weaviate. For this reason we will use the Python client to create this schema. For more information on how we create the schema see this [tutorial](../starter-guides/schema.md).

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

client.schema.delete_all()

client.schema.create_class(
    {
        "class": "Sphere",
        "properties": [
            {
                "name": "raw",
                "dataType": ["text"]
            },
            {
                "name": "sha",
                "dataType": ["text"]
            },
            {
                "name": "title",
                "dataType": ["text"]
            },
            {
                "name": "url",
                "dataType": ["text"]
            },
        ],
    }
)
```

Next we will write the Spark dataframe to Weaviate. The `.limit(1500)` could be removed to load the full dataset.

```python
df.limit(1500).withColumnRenamed("id", "uuid").write.format("io.weaviate.spark.Weaviate") \
    .option("batchSize", 200) \
    .option("scheme", "http") \
    .option("host", "localhost:8080") \
    .option("id", "uuid") \
    .option("className", "Sphere") \
    .option("vector", "vector") \
    .mode("append").save()
```

## Spark connector options

Let's examine the code above to understand exactly what's happening and all the settings for the Spark Connector.

- Using `.option("host", "localhost:8080")` we specify the Weaviate instance we want to write to

- Using `.option("className", "Sphere")` we ensure that the data is written to the class we just created.

- Since we already have document IDs in our dataframe, we can supply those for use in Weaviate by renaming the column that is storing them to `uuid` using `.withColumnRenamed("id", "uuid")` followed by the `.option("id", "uuid")`.

- Using `.option("vector", "vector")` we can specify for Weaviate to use the vectors stored in our dataframe under the column named `vector` instead of re-vectorizing the data from scratch.

- Using `.option("batchSize", 200)` we specify how to batch the data when writing to Weaviate. Aside from batching operations, streaming is also allowed.

- Using `.mode("append")` we specify the write mode as `append`. Currently only the append write mode is supported.

By now we've written our data to Weaviate, and we understand the capabilities of the Spark connector and its settings. As a last step, we can query the data via the Python client to confirm that the data has been loaded.

```python
client.query.get("Sphere", "title").do()
```

## Additional options

If using an authenticated cluster such as on [WCS](../../wcs/quickstart.mdx) you can provide `.option("apiKey", WEAVIATE_API_KEY)` for api key authentication like below:

```python
df.limit(1500).withColumnRenamed("id", "uuid").write.format("io.weaviate.spark.Weaviate") \
    .option("batchSize", 200) \
    .option("scheme", "https") \
    .option("host", "demo-env.weaviate.network") \
    .option("apiKey", WEAVIATE_API_KEY) \
    .option("id", "uuid") \
    .option("className", "Sphere") \
    .option("vector", "vector") \
    .mode("append").save()
```

- Using `.option("retries", 2)` will set the number of retries (default 2). Note that Spark will also retry failed stages.

- Using `.option("retriesBackoff", 2)` time to wait in seconds between retries (default 2 seconds).

- Using `.option("timeout", 60)` will set the timeout for a single batch (default 60 seconds).

- Arbitrary headers can be supplied with the option prefix `header:`. For example to provide an `OPENAI_APIKEY` header the following can be used `.option("header:OPENAI_APIKEY", ...)`.

- Additionally OIDC options are supported `.option("oidc:username", ...)`, `.option("oidc:password", ...)`, `.option("oidc:clientSecret", ...)`, `.option("oidc:accessToken", ...)`, `.option("oidc:accessTokenLifetime", ...)`, `.option("oidc:refreshToken", ...)`. For more information on these options please refer to the [Java client documentation](../client-libraries/java.md#oidc-authentication).


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
