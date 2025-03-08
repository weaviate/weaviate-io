# START SimpleTransformationAgentExample
import os
import weaviate
from weaviate.classes.init import Auth
from weaviate.agents.transformation import TransformationAgent
from weaviate.agents.classes import Operations

# END SimpleTransformationAgentExample

# START DefineOperationsAppend  # START DefineOperationsUpdate
from weaviate.classes.config import Configure, Property, DataType

# END DefineOperationsAppend  # END DefineOperationsUpdate

# START TransformAtInsert  # START TransformExisting
# END TransformAtInsert  # END TransformExisting

from datasets import load_dataset

# START SimpleTransformationAgentExample

headers = {
    # END SimpleTransformationAgentExample
    "X-Cohere-API-Key": os.environ.get("COHERE_API_KEY"),
    # START SimpleTransformationAgentExample
    # Provide your required API key(s), e.g. Cohere, OpenAI, etc. for the configured vectorizer(s)
    "X-INFERENCE-PROVIDER-API-KEY": os.environ.get("YOUR_INFERENCE_PROVIDER_KEY", ""),
}

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ.get("WCD_URL"),
    auth_credentials=Auth.api_key(os.environ.get("WCD_API_KEY")),
    headers=headers,
)

# END SimpleTransformationAgentExample

client.collections.delete("ArxivPapers")

client.collections.create(
    "ArxivPapers",
    description="A dataset that lists research paper titles and abstracts",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),
)

dataset = load_dataset(
    "weaviate/agents", "transformation-agent-papers", split="train", streaming=True
)

papers_collection = client.collections.get("ArxivPapers")

with papers_collection.batch.fixed_size(batch_size=100) as batch:
    for i, item in enumerate(dataset):
        if i < 10:
            batch.add_object(properties=item["properties"])


# START SimpleTransformationAgentExample
add_topics = Operations.append_property(
    property_name="topics",
    data_type=DataType.TEXT_ARRAY,
    view_properties=["abstract", "title"],
    instruction="""Create a list of topic tags based on the title and abstract.
    Topics should be distinct from eachother. Provide a maximum of 5 topics.
    Group similar topics under one topic tag.""",
)

agent = TransformationAgent(
    client=client,
    collection="ArxivPapers",
    operations=[add_topics],
)

response = agent.update_all()

for operation in response:  # The response is a list of TransformationResponse objects
    agent.get_status(workflow_id=operation.workflow_id)  # Use the workflow_id to check the status of each operation
# END SimpleTransformationAgentExample

add_french_abstract = Operations.append_property(
    property_name="french_abstract",
    data_type=DataType.TEXT,
    view_properties=["abstract"],
    instruction="Translate the abstract to French",
)

add_nlp_relevance = Operations.append_property(
    property_name="nlp_relevance",
    data_type=DataType.INT,
    view_properties=["abstract"],
    instruction="""Give a score from 0-10 based on how relevant the abstract is to Natural Language Processing.
    The scale is from 0 (not relevant at all) to 10 (very relevant)""",
)

is_survey_paper = Operations.append_property(
    property_name="is_survey_paper",
    data_type=DataType.BOOL,
    view_properties=["abstract"],
    instruction="""Determine if the paper is a "survey".
    A paper is considered survey it's a surveys existing techniques, and not if it presents novel techniques""",
)

agent = TransformationAgent(
    client=client,
    collection="ArxivPapers",
    operations=[
        add_topics,
        add_french_abstract,
        add_nlp_relevance,
        is_survey_paper,
    ],
)

workflow_ids = agent.update_all()

print(workflow_ids)

agent.get_status(workflow_id=workflow_ids[0].workflow_id)

# # START DefineOperationsAppend

# is_premium_product_op = Operations.append_property(
#     property_name="is_premium_product",
#     data_type=DataType.BOOL,
#     view_properties=["reviews", "price", "rating", "description"],
#     instruction="""Determine if the product is a premium product,
#     a product is considered premium if it has a high rating (4 or above),
#     a high price (above 60), and positive reviews""",
# )

# product_descriptors_op = Operations.append_property(
#     property_name="product_descriptors",
#     data_type=DataType.TEXT_ARRAY,
#     view_properties=["description"],
#     instruction="""Extract the product descriptors from the description.
#     Descriptors are a list of words that describe the product succinctly for SEO optimization""",
# )
# # END DefineOperationsAppend

# # START DefineOperationsUpdate

# name_update_op = Operations.update_property(
#     property_name="name",
#     view_properties=["name", "description", "category", "brand", "colour"],
#     instruction="""Update the name to ensure it contains more details about the products colour and brand, and category.
#     The name should be a single sentence that describes the product""",
# )
# # END DefineOperationsUpdate

# # START TransformAtInsert

# ta = TransformationAgent(
#     client=client,
#     collection="ecommerce",
#     operations=[
#         is_premium_product_op,
#         product_descriptors_op,
#         name_update_op,
#     ],
# )

# ta.update_and_insert([
#     { "name": "Foo", "description": "...", "reviews": ["...", "..."] "price": 25, "rating": 3 },
#     { "name": "Bar", "description": "...", "reviews": ["...", "..."] "price": 50, "rating": 4 },
# ])

# # Note this is an async function
# operation_workflow_ids = await ta.update_all()

# print(operation_workflow_ids)  # Use this to track the status of the operations
# # END TransformAtInsert

# # START TransformExisting

# ta = TransformationAgent(
#     client=client,
#     collection="ecommerce",
#     operations=[
#         is_premium_product_op,
#         product_descriptors_op,
#         name_update_op,
#     ],
# )

# # Note this is an async function
# operation_workflow_ids = await ta.update_all()

# print(operation_workflow_ids)  # Use this to track the status of the operations
# # END TransformExisting

# # START MonitorJobStatus
# print(ta.fetch_operation_status(operation_workflow_ids))
# # END MonitorJobStatus

client.close()
