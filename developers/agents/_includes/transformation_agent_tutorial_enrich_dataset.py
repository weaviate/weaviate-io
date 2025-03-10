# START ConnectToWeaviate
import os
import time
import weaviate
from weaviate.auth import Auth

# Best practice: store your credentials in environment variables
weaviate_url = os.environ["WEAVIATE_URL"]
weaviate_api_key = os.environ["WEAVIATE_API_KEY"]

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
)

print(client.is_ready())  # Should print: `True`

# Your work goes here!

client.close()  # Free up resources
# END ConnectToWeaviate

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=weaviate_url,
    auth_credentials=Auth.api_key(weaviate_api_key),
)

client.collections.delete("ArxivPapers")

# START DefineCollections
from weaviate.classes.config import Configure

client.collections.create(
    "ArxivPapers",
    description="A dataset that lists research paper titles and abstracts",
    vectorizer_config=Configure.Vectorizer.text2vec_weaviate(),
)
# END DefineCollections

# START PopulateDatabase
from datasets import load_dataset

dataset = load_dataset(
    "weaviate/agents", "transformation-agent-papers", split="train", streaming=True
)

papers_collection = client.collections.get("ArxivPapers")

with papers_collection.batch.dynamic() as batch:
    for i, item in enumerate(dataset):
        if i < 200:
            batch.add_object(properties=item["properties"])

failed_objects = papers_collection.batch.failed_objects
if failed_objects:
    print(f"Number of failed imports: {len(failed_objects)}")
    print(f"First failed object: {failed_objects[0]}")

print(f"Size of the ArxivPapers dataset: {len(papers_collection)}")
# END PopulateDatabase

# START AddListOfTopics
from weaviate.agents.classes import Operations
from weaviate.collections.classes.config import DataType

add_topics = Operations.append_property(
    property_name="topics",
    data_type=DataType.TEXT_ARRAY,
    view_properties=["abstract", "title"],
    instruction="""Create a list of topic tags based on the title and abstract.
    Topics should be distinct from each other. Provide a maximum of 5 topics.
    Group similar topics under one topic tag.""",
)
# END AddListOfTopics

# START AddFrenchAbstract
add_french_abstract = Operations.append_property(
    property_name="french_abstract",
    data_type=DataType.TEXT,
    view_properties=["abstract"],
    instruction="Translate the abstract to French.",
)
# END AddFrenchAbstract

# START AddNlpRelevance
add_nlp_relevance = Operations.append_property(
    property_name="nlp_relevance",
    data_type=DataType.INT,
    view_properties=["abstract"],
    instruction="""Give a score from 0-10 based on how relevant the abstract is to Natural Language Processing.
    The scale is from 0 (not relevant at all) to 10 (very relevant).""",
)
# END AddNlpRelevance

# START IsSurveyPaper
add_is_survey_paper = Operations.append_property(
    property_name="is_survey_paper",
    data_type=DataType.BOOL,
    view_properties=["abstract"],
    instruction="""Determine if the paper is a "survey".
    A paper is considered a survey if it surveys existing techniques and not if it presents novel techniques.""",
)
# END IsSurveyPaper

# START UpdateProperty
update_title = Operations.update_property(
    property_name="title",
    view_properties=["abstract"],
    instruction="""Make the title start with the label MACHINE_LEARNING if the abstract mentions machine learning techniques.""",
)
# END UpdateProperty

# START CreateTransformationAgent
from weaviate.agents.transformation import TransformationAgent

agent = TransformationAgent(
    client=client,
    collection="ArxivPapers",
    operations=[
        add_topics,
        add_french_abstract,
        add_nlp_relevance,
        add_is_survey_paper,
        update_title,
    ],
)
# END CreateTransformationAgent

# START ExecutingTransformations
response = agent.update_all()
print(response)
# END ExecutingTransformations

time.sleep(5)

# START GetStatus
for operation in response:
    print(agent.get_status(workflow_id=operation.workflow_id))
# END GetStatus

client.close()  # Free up resources
