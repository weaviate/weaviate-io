---
title: Loading data into Weaviate using Spark
sidebar_position: 2
image: og/docs/tutorials.jpg
# tags: ['how to', 'spark connector', 'spark']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

## Overview

This tutorial is designed to show you an example of how to use the [Spark Connector](https://github.com/weaviate/spark-connector) to import data into Weaviate from Spark. 

By the end of this tutorial, you'll be able to see how to you can import your data into [Apache Spark](https://spark.apache.org/) and then use the Spark Connector to write your data to Weaviate.

## Installation

We recommend reading the [Quickstart tutorial](../quickstart/index.md) first before tackling this tutorial.

We will install the python `weaviate-client` and also run Spark locally for which we need to install the python `pyspark` package. Use the following command in your terminal to get both:
```bash
pip3 install pyspark weaviate-client
```

For demonstration purposes this tutorial runs Spark locally. Please see the Apache Spark docs or consult your cloud environment for installation and deploying a Spark cluster and choosing a language runtime other than python.

We will also need the Weaviate Spark connector. You can download this by running the following command in your terminal:

```bash
wget https://github.com/weaviate/spark-connector/releases/download/v1.0.0/spark-connector-assembly-1.0.0.jar
```

For this tutorial, you will also need a Weaviate instance running at `http://localhost:8080`.
  

## What is the Spark Connector?

The Spark Connector gives you the ability to easily write data from Spark data structures into Weaviate. This is quite useful when used in conjunction with Spark extract, transform, load (ETLs) processes to populate a Weaviate vector database.

The Spark Connector is able to automatically infer the correct Spark DataType based on your schema for the class in Weaviate. You can choose to vectorize your data when writing to Weaviate or if you already have vector available you can supply them. By default the Weaviate client will create document IDs for you for new documents but if you already have IDs you can also supply those in the dataframe. All of this and more can be specified as options in the Spark Connector. 

## Initializing a Spark Session

The below code will create a Spark Session using the libraries mentioned above.

```python
from pyspark.sql import SparkSession
import os

spark = (
    SparkSession.builder.config(
        "spark.jars",
        "spark-connector-assembly-1.0.0.jar",  #specify the spark connector JAR
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

## Reading Data into Spark

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
Prior to this step make sure your weaviate instance is running at `http://localhost:8080`. You can refer to the [Quickstart tutorial](../quickstart/index.md) for instructions on how to set that up.
:::

The Spark Connector assumes that a schema has already been created in Weaviate. For this reason we will use the Python client to create this schema. For more information on how we create the schema see this [tutorial](./how-to-create-a-schema.md).

```python
import weaviate

client = weaviate.Client("http://localhost:8080")

client.schema.create_class(
    {
        "class": "Sphere",
        "properties": [
            {
                "name": "raw", 
                "dataType": ["string"]
            },
            {
                "name": "sha", 
                "dataType": ["string"]
            },
            {
                "name": "title", 
                "dataType": ["string"]
            },
            {
                "name": "url", 
                "dataType": ["string"]
            },
        ],
    }
)
```

Next we will write the Spark dataframe to Weaviate. Note the limit(1500) can be removed to load the full dataset.

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

## Spark Connector Options

Let's examine the code above to understand exactly what's happening and all the settings for the Spark Connector.

- Using `.option("host", "localhost:8080")` we specify the Weaviate instance we want to write to 

- Using `.option("className", "Sphere")` we ensure that the data is written to the class we just created.

- Since we already have document IDs in our dataframe we can supply those for use in Weaviate by renaming the column that is storing them to `uuid` using `.withColumnRenamed("id", "uuid")` followed up with the `.option("id", "uuid")`.

- Using `.option("vector", "vector")` we can specify for Weaviate to use the vectors stored in our dataframe under the column named `vector` instead of re-vectorizing the data from scratch.

- Using `.option("batchSize", 200)` we specify how to batch the data when writing to Weaviate. Outside of batching operations, streaming is also allowed.

- Using `.mode("append")` we specify the write mode as `append`. Currently only the append write mode is supported.

Now that we've written our data to Weaviate and we understand the capabilities of the Spark Connector and its settings. As a last step, we can query the data via the python client to confirm that the data has been loaded.

```python
client.query.get("Sphere", "title").do()
```

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
