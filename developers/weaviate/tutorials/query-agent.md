---
title: Build A Weaviate Query Agent
sidebar_label: Query Agents
description: Learn how to set up RBAC (Role Based Access Control) in Weaviate
sidebar_position: 2
image: og/docs/tutorials.jpg
# tags: ['basics']
---

In this recipe, we will be building a simple [Weaviate Query Agent](https://weaviate.io/developers/agents). This agent will have access to a number of Weaviate collections. To get started, we've prepared a few datasets which you can access within a read-only Weaviate cluster.

- **E-commerce:** A dataset that lists clothing items, prices, brands, reviews etc.
- [**Brands:**](https://huggingface.co/datasets/weaviate/agents/viewer/query-agent-brands) A dataset that lists clothing brands and information about them such as their parent brand, child brands, average customer rating etc.

Additionally, we also have access to some other unrelated datasets:

- **Financial Contracts**: A dataset of financial contracts between indivicuals and/or companies, as well as information on the type of contract and who has authored them.
- **Weather**: Daily weather information including temperature, wind speed, percipitation, pressure etc.

> To populate your own collections, you can follow the instructions at the end of the recipe.


>[Build Your Own Weaviate Query Agent](#scrollTo=iGfss7TuSM_n)

>>[Setting Up the Weaviate Client](#scrollTo=V7eGoTMgV597)

>>[Set Up the Query Agent](#scrollTo=4H7h-onziDEA)

>>[Run the Query Agent](#scrollTo=XnJiTt5LiMp-)

>>>[Ask a Question](#scrollTo=XnJiTt5LiMp-)

>>>[Ask a follow up question](#scrollTo=RqsUGStI-RC_)

>>>[Search over multiple collections](#scrollTo=sl78PHYmBe2s)

>>>[Changing the System Prompt](#scrollTo=Hm32UutOC63l)

>>>[Try More Questions](#scrollTo=70lwuxf1F38d)

>>[Extra: Set Up Your Own Collections for the Query Agent](#scrollTo=J2uI10PBc3-O)



## 1. Setting Up the Weaviate Client

To use the Weaviate Query Agent, we first have to connect to our cluster. For this recipe, you can connect to ours 👇

Here's the **Read-Only Weaviate API Key**: `fyq8aW1j4dGrhpRFMphnEYiWGsuwkIBz8gAs`

> Info: The collections in this cluster are using [Weaviate Embeddings](https://weaviate.io/developers/weaviate/model-providers/weaviate)! So you do not have to provide any extra keys for external embedding providers.

!pip install git+https://github.com/weaviate/weaviate-python-client.git@weaviate-agents-integration#egg=weaviate-client[agents]

import os
from getpass import getpass

if "WEAVIATE_API_KEY" not in os.environ:
  os.environ["WEAVIATE_API_KEY"] = getpass("Weaviate API Key")

import weaviate
from weaviate.auth import Auth

client = weaviate.connect_to_weaviate_cloud(
        cluster_url="https://jhwph3ohtgwkiiehs3msca.c0.us-east1.gcp.weaviate.cloud",
        auth_credentials=Auth.api_key(os.environ.get("WEAVIATE_API_KEY")),
)

## 2. Set Up the Query Agent

When setting up the query agent, we have to provide it a few things:
- The `client`
- The `collection` which we want the agent to have access to.
- (Optionally) A `system_prompt` that describes how our agent should behave
- (Optionally) Timeout - which for now defaults to 60s.

Let's start with a simple agent. Here, we're creating an `agent` that has access to our `brands`, `ecommerce` & `financial_contracts` datasets.

from weaviate.agents.query import QueryAgent

agent = QueryAgent(
    client=client, collections=["ecommerce", "Brands", "financial_contracts"],

)

## 3. Run the Query Agent

When we run the agent, it will first make a few decisions, depending on the query:

1. The agent will decide which collection or collections to look up an answer in.
2. The agent will also decide whether to perform a regular ***search query***, what ***filters*** to use, whether to do an ***aggregation query***, or all of them together!
3. It will then provide a reponse within **`QueryAgentResponse`**.

### Ask a Question
**Let's start with a simple question: "I like the vintage clothes, can you list me some options that are less than $200?"**

We can then also inspect how the agent responded, what kind of searches it performed on which collections, whether it has identified if the final answer is missing information or not, as well as the final answer 👇

response = agent.run("I like the vintage clothes, can you list me some options that are less than $200?")
print(f"- Original Query: {response.original_query}")
print(f"- Searched Collectoins: {response.collection_names}")
print(f"- Searches: {response.searches}")
print(f"- Search Answer: {response.search_answer}")
print(f"- Aggregations: {response.aggregations}")
print(f"- Aggregation Answer: {response.aggregation_answer}")
print(f"- Is the answer partial?: {response.is_partial_answer}")
print(f"- Final Answer: {response.final_answer}")

### Ask a follow up question

The agent can also be provided with additional context. For example, we can provide the previous response as context and get a `new_response`

new_response = agent.run("What about some nice shoes, same budget as before?", context=response)
print(f"- Original Query: {new_response.original_query}")
print(f"- Searched Collectoins: {new_response.collection_names}")
print(f"- Searches: {new_response.searches}")
print(f"- Search Answer: {new_response.search_answer}")
print(f"- Aggregations: {new_response.aggregations}")
print(f"- Aggregation Answer: {new_response.aggregation_answer}")
print(f"- Is the answer partial?: {new_response.is_partial_answer}")
print(f"- Final Answer: {new_response.final_answer}")

Now let's try a question that sholud require an aggregation. Let's see which brand lists the most shoes.

response = agent.run("What is the the name of the brand that lists the most shoes?")

print(f"- Original Query: {response.original_query}")
print(f"- Searched Collectoins: {response.collection_names}")
print(f"- Searches: {response.searches}")
print(f"- Search Answer: {response.search_answer}")
print(f"- Aggregations: {response.aggregations}")
print(f"- Aggregation Answer: {response.aggregation_answer}")
print(f"- Is the answer partial?: {response.is_partial_answer}")
print(f"- Final Answer: {response.final_answer}")

### Search over multiple collections

In some cases, we need to combine the results of searches across multiple collections. From the result above, we can see that "Loom & Aura" lists the most shoes.

Let's imagine a scenario where the user would now want to find out more about this company, _as well_ as the items that they sell.

response = agent.run("Does 'Loom & Aura' have a parent brand or child brands and what countries do they operate from? "
                     "Also, what's the average price of shoes at 'Loom & Aura'?")

print(f"- Original Query: {response.original_query}")
print(f"- Searched Collectoins: {response.collection_names}")
print(f"- Searches: {response.searches}")
print(f"- Search Answer: {response.search_answer}")
print(f"- Aggregations: {response.aggregations}")
print(f"- Aggregation Answer: {response.aggregation_answer}")
print(f"- Is the answer partial?: {response.is_partial_answer}")
print(f"- Final Answer: {response.final_answer}")

### Changing the System Prompt

In some cases, you may want to define a custom `system_prompt` for your agent. This can help you provide the agent with some default instructions as to how to behave. For example, let's create an agent that will always answer the query in the users language.

multi_lingual_agent = QueryAgent(
    client=client, collections=["ecommerce", "Brands", "financial_contracts", "weather"],
    system_prompt="You are a helpful assistant that always generated the final response in the users language."
    " You may have to translate the user query to perform searches. But you must always respond to the user in their own language."
)

For example, this time lets ask something that is about weather!

response = multi_lingual_agent.run("Quelles sont les vitesses minimales, maximales et moyennes du vent?")
print(response.final_answer)

### Try More Questions

- For example Let's try to find out more about the brans "Eko & Stitch"

response = agent.run("Does Eko & Stitch have a branch in the UK? Or if not, does it have parent or child company in the UK?")

print(response.final_answer)

- Our `agent` also has access to a collection called "financial_contracts". Let's try to find out some more information about this dataser.

response = agent.run("What kinds of contracts are listed? What's the most common type of contract?")

print(response.final_answer)

## 4. Extra: Set Up Your Own Collections for the Query Agent

The example datasets we've used above are also available as Hugging Face Datasets.

1. Create a Weaviate Cloud account and set up a Serverless cluster
2. Enable 'Embeddings' to make use of Weaviate Embeddings.
3. Connect to your client:
 - Take note of your Weaviate URL and API Key to connect to the client below

 ![image.png](data:image/png;base64,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)  


import weaviate
from weaviate.classes.init import Auth
import os

client = weaviate.connect_to_weaviate_cloud(
    cluster_url="YOUR_CLUSTER_URL",
    auth_credentials=Auth.api_key('YOUR_API_KEY'),
)

4. Let's create 4 collections. Each is configured to use Weaviate Embeddings and has a description.

> ❗️ The Weaviate Query Agent makes use of the collection description when deciding which collection to perform searches on.

from weaviate.classes.config import Configure

client.collections.delete_all()
client.collections.create(
    "Brands",
    description="A dataset that lists information about clothing brands, their parent companies, average rating and more.",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate()
    )

client.collections.create(
    "ecommerce",
    description="A dataset that lists clothing items, their brands, prices, and more.",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate()
    )

client.collections.create(
    "weather",
    description="Daily weather information including temperature, wind speed, percipitation, pressure etc.",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),
    )

client.collections.create(
    "financial_contracts",
    description="A dataset of financial contracts between indivicuals and/or companies, as well as information on the type of contract and who has authored them.",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),
    )


collection = client.collections.get("Brands")

with collection.batch.dynamic() as batch:
    for src_obj in src:
        batch.add_object(
            properties=src_obj,
        )

client.collections.create(
    "ecommerce",
    description="A dataset that lists clothing items, their brands, prices, and more.",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate())

from datasets import load_dataset
dataset = load_dataset("weaviate/agents", "query-agent-ecommerce", split="train", streaming=True)

collection = client.collections.get("ecommerce")

with collection.batch.dynamic() as batch:
  for item in dataset:
      batch.add_object(properties=item["properties"])

from weaviate.classes.config import Property, DataType
from datetime import datetime, timezone

dataset = load_dataset("weaviate/agents", "query-agent-weather", split="train", streaming=True)

collection = client.collections.get("weather")

with collection.batch.dynamic() as batch:
  for item in dataset:
      item["properties"]["date"] = datetime.combine(item["properties"]["date"], datetime.min.time(), timezone.utc)
      weaviate_obj = {
            "date": item["properties"]["date"],
            "humidity": item["properties"]["humidity"],
            "precipitation": item["properties"]["precipitation"],
            "wind_speed": item["properties"]["wind_speed"],
            "visibility": item["properties"]["visibility"],
            "pressure": item["properties"]["pressure"],
            "temperature": item["properties"]["temperature"],
        }
      batch.add_object(properties=weaviate_obj)


from weaviate.classes.config import Property, DataType
from datetime import datetime, timezone

dataset = load_dataset("weaviate/agents", "query-agent-financial-contracts", split="train", streaming=True)

collection = client.collections.get("financial_contracts")

with collection.batch.dynamic() as batch:
  for item in dataset:
      batch.add_object(properties=item["properties"])