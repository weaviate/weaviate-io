---
title: Spark
sidebar_position: 4
image: og/integrations/home.jpg
---

[Apache Spark](https://spark.apache.org/docs/latest/api/python/index.html) (or the Python API, [PySpark](https://spark.apache.org/docs/latest/api/python/index.html#:~:text=PySpark%20is%20the%20Python%20API,for%20interactively%20analyzing%20your%20data.)) is an open-source data processing framework used for real-time, large-scale data processing. 

## Spark and Weaviate
The Spark connector enables you to easily ingest data from Spark data structures into Weaviate. 

Learn more about the connector in the [Weaviate Spark connector repository](https://github.com/weaviate/spark-connector).

### Databricks and Weaviate
[Databricks](https://www.databricks.com/) is a data intelligence platform that unifies data, AI and governance on the lakehouse. You can ingest Spark data structures from Databricks into Weaviate using the Weaviate Spark connector.

Databricks' Foundation Model APIs can be called directly from Weaviate, allowing you to use models hosted on the Databricks platform through the [`text2vec-databricks`](/developers/weaviate/model-providers/databricks/embeddings) and [`generative-databricks`](/developers/weaviate/model-providers/databricks/generative) modules.


## Our Resources 
The resources are broken into two categories: 
1. [**Hands on Learning**](#hands-on-learning): Build your technical understanding with end-to-end tutorials.

2. [**Read and Listen**](#read-and-listen): Develop your conceptual understanding of these technologies.

### Hands on Learning

| Topic | Description | Resource | 
| --- | --- | --- |
| Weaviate Tutorial | Learn how to ingest data into Weaviate with Spark. | [Tutorial](/developers/weaviate/tutorials/spark-connector)
| Using the Spark Connector for Weaviate | Learn how to take data from a Spark dataframe and feed it into Weaviate. | [Notebook](https://github.com/weaviate/recipes/blob/main/integrations/data-platforms/spark/spark-connector.ipynb) |

### Read and Listen 
| Topic | Description | Resource | 
| --- | --- | --- |
| The Sphere Dataset in Weaviate | Learn how to import and query the Sphere dataset in Weaviate. | [Blog](/blog/sphere-dataset-in-weaviate) |
| The Details Behind the Sphere Dataset in Weaviate | The details on how we ingested ~1 billion article snippets into Weaviate. | [Blog](/blog/details-behind-the-sphere-dataset-in-weaviate) |