# START-ANY
# [🚧 CAUTION 🚧] DO NOT USE ON PRODUCTION DATA.
# The Transformation Agent will modify your data in place.
# While the Transformation Agent is in technical preview,
# it is recommended to only use it on test data.

# END-ANY

# START SimpleTransformationAgentExample  # START ConnectToWeaviate
import os
import weaviate
from weaviate.classes.init import Auth
# START SimpleTransformationAgentExample  # START StartTransformationOperations  # END ConnectToWeaviate
from weaviate.agents.transformation import TransformationAgent
# START SimpleTransformationAgentExample  # END StartTransformationOperations
from weaviate.agents.classes import Operations

# END SimpleTransformationAgentExample

# START DefineOperationsAppend  # START DefineOperationsUpdate
from weaviate.agents.classes import Operations

# END DefineOperationsAppend  # END DefineOperationsUpdate

from weaviate.classes.config import Configure, Property, DataType
from datasets import load_dataset

# START SimpleTransformationAgentExample  # START ConnectToWeaviate

headers = {
    # END SimpleTransformationAgentExample
    "X-Cohere-API-Key": os.environ.get("COHERE_API_KEY"),
    # START SimpleTransformationAgentExample
    # Provide your required API key(s), e.g. Cohere, OpenAI, etc. for the configured vectorizer(s)
    "X-INFERENCE-PROVIDER-API-KEY": os.environ.get("YOUR_INFERENCE_PROVIDER_KEY", ""),
}

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ.get("WEAVIATE_URL"),
    auth_credentials=Auth.api_key(os.environ.get("WEAVIATE_API_KEY")),
    headers=headers,
)

# END SimpleTransformationAgentExample  # END ConnectToWeaviate

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

response = agent.update_all()  # The response is a TransformationResponse object

agent.get_status(workflow_id=response.workflow_id)  # Use the workflow_id to check the status of each workflow
# END SimpleTransformationAgentExample

assert len(response) == 1

# START DefineOperationsAppend
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
# END DefineOperationsAppend

# START DefineOperationsUpdate
update_topics = Operations.update_property(
    property_name="topics",
    view_properties=["abstract", "title"],
    instruction="""Create a list of topic tags based on the title and abstract.
    Topics should be distinct from eachother. Provide a maximum of 3 topics.
    Group similar topics under one topic tag.""",
)
# END DefineOperationsUpdate

# START StartTransformationOperations

agent = TransformationAgent(
    client=client,
    collection="ArxivPapers",
    operations=[
        add_french_abstract,
        add_nlp_relevance,
        is_survey_paper,
        update_topics,
    ],
)

response = agent.update_all()

print(response)  # The response is a TransformationResponse object, including the workflow_id
# END StartTransformationOperations

# # START MonitorJobStatus
print(agent.get_status(workflow_id=response.workflow_id))  # Use the workflow_id to check the status of each operation
# # END MonitorJobStatus

assert len(response) == 4

client.close()
