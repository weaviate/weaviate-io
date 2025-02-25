# START-ANY
# [🚧 UNDER CONSTRUCTION 🚧] This Weaviate Agent is not available just yet.
# These snippets are indicative. The syntax may change when this Agent is released.

# END-ANY

# START ConnectToWeaviate
import os
import weaviate
from weaviate.classes.init import Auth
# END ConnectToWeaviate
# START DefineOperationsAppend  # START DefineOperationsUpdate
from weaviate.agents.transformation import Operations
from weaviate.classes.config import DataType
# END DefineOperationsAppend  # END DefineOperationsUpdate
# START TransformAtInsert  # START TransformExisting
from weaviate.agents.transformation import TransformationAgent
# END TransformAtInsert  # END TransformExisting

# START ConnectToWeaviate

headers = {
# END ConnectToWeaviate
    "X-Cohere-API-Key": os.environ.get("COHERE_API_KEY"),
# START ConnectToWeaviate
    # Provide your required API key(s), e.g. Cohere, OpenAI, etc. for the configured vectorizer(s)
    "X-INFERENCE-PROVIDER-API-KEY": os.environ.get("YOUR_INFERENCE_PROVIDER_KEY", ""),
}

client = weaviate.connect_to_weaviate_cloud(
    cluster_url=os.environ.get("WCD_URL"),
    auth_credentials=Auth.api_key(os.environ.get("WCD_API_KEY")),
    headers=headers,
)
# END ConnectToWeaviate

# START DefineOperationsAppend

is_premium_product_op = Operations.append_property(
    property_name="is_premium_product",
    data_type=DataType.BOOL,
    view_properties=["reviews", "price", "rating", "description"],
    instruction="""Determine if the product is a premium product,
    a product is considered premium if it has a high rating (4 or above),
    a high price (above 60), and positive reviews""",
)

product_descriptors_op = Operations.append_property(
    property_name="product_descriptors",
    data_type=DataType.TEXT_ARRAY,
    view_properties=["description"],
    instruction="""Extract the product descriptors from the description.
    Descriptors are a list of words that describe the product succinctly for SEO optimization""",
)
# END DefineOperationsAppend

# START DefineOperationsUpdate

name_update_op = Operations.update_property(
    property_name="name",
    view_properties=["name", "description", "category", "brand", "colour"],
    instruction="""Update the name to ensure it contains more details about the products colour and brand, and category.
    The name should be a single sentence that describes the product""",
)
# END DefineOperationsUpdate

# START TransformAtInsert

ta = TransformationAgent(
    client=client,
    collection="ecommerce",
    operations=[
        is_premium_product_op,
        product_descriptors_op,
        name_update_op,
    ],
)

ta.update_and_insert([
    { "name": "Foo", "description": "...", "reviews": ["...", "..."] "price": 25, "rating": 3 },
    { "name": "Bar", "description": "...", "reviews": ["...", "..."] "price": 50, "rating": 4 },
])

# Note this is an async function
operation_workflow_ids = await ta.update_all()

print(operation_workflow_ids)  # Use this to track the status of the operations
# END TransformAtInsert

# START TransformExisting

ta = TransformationAgent(
    client=client,
    collection="ecommerce",
    operations=[
        is_premium_product_op,
        product_descriptors_op,
        name_update_op,
    ],
)

# Note this is an async function
operation_workflow_ids = await ta.update_all()

print(operation_workflow_ids)  # Use this to track the status of the operations
# END TransformExisting

# START MonitorJobStatus
print(ta.fetch_operation_status(operation_workflow_ids))
# END MonitorJobStatus

client.close()
