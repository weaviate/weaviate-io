# Howto: Manage-data/Cross-references - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
from weaviate import WeaviateClient
import weaviate_datasets
import weaviate.classes as wvc
from typing import List

sf_id = "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
us_cities_id = "20ffc68d-986b-5e71-a680-228dba18d7ef"
museums_id = "fec50326-dfa1-53c9-90e8-63d0240bd933"

# https://stackoverflow.com/questions/76171703/in-weaviate-how-to-remove-a-property-in-existing-class/76177363#76177363
# class_name is required to avoid the warning to use "class namespaced APIs"
# def del_prop(uuid: str, prop_name: str, class_name: str) -> None:
#     global client
#     object_data = client.data_object.get(uuid, class_name=class_name)
#     if prop_name in object_data["properties"]:
#         del object_data["properties"][prop_name]
#     client.data_object.replace(object_data["properties"], class_name, uuid)

def del_props(uuid_to_update: str, collection_name: str, prop_names: List[str]) -> None:
    global client
    collection = client.collections.get(collection_name)

    # fetch the object to update
    object_data = collection.query.fetch_object_by_id(uuid_to_update)
    properties_to_update = object_data.properties

    # remove unwanted properties
    for prop_name in prop_names:
        if prop_name in properties_to_update:
            del properties_to_update[prop_name]

    # replace the properties
    collection.data.replace(
        uuid=uuid_to_update,
        properties=properties_to_update
    )


# Instantiate the client anonymously
client = weaviate.connect_to_local()
old_client = weaviate.Client("http://localhost:8080")

# ===========================================================
# ===== Define classes in the schema and upload dataset =====
# ===========================================================

client.collections.delete_all()

client.collections.create(
    name="JeopardyCategory",
    description="A Jeopardy! category",
    properties=[
        wvc.Property(name="title", data_type=wvc.DataType.TEXT)
    ]
)

# CrossRefDefinition
import weaviate.classes as wvc

client.collections.create(
    name="JeopardyQuestion",
    description="A Jeopardy! question",
    properties=[
        wvc.Property(name="question", data_type=wvc.DataType.TEXT),
        wvc.Property(name="answer", data_type=wvc.DataType.TEXT),
        # highlight-start
        wvc.ReferenceProperty(
            name="hasCategory",
            target_collection="JeopardyCategory"
        )
        # highlight-end
    ]
)
# END CrossRefDefinition

dataset = weaviate_datasets.JeopardyQuestions1k()  # instantiate dataset
dataset.upload_objects(old_client, 100)  # batch-upload objects

# =================================
# ===== Add one-way cross-ref =====
# =================================

# OneWay Python
import weaviate.classes as wvc

sf_id = "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
us_cities_id = "20ffc68d-986b-5e71-a680-228dba18d7ef"

questions = client.collections.get("JeopardyQuestion")
questions.data.reference_add(
    from_uuid=sf_id,
    from_property="hasCategory",
    # highlight-start
    ref=wvc.Reference.to(uuids=us_cities_id)
    # highlight-end
)
# END OneWay Python
# client.data_object.reference.add(
#     from_class_name="JeopardyQuestion",
#     from_uuid=sf_id,
#     from_property_name="hasCategory",
#     to_class_name="JeopardyCategory",
#     to_uuid=us_cities_id,
# )

# Test results
# TODOv4 - fix the test
# sf = questions.query.fetch_object_by_id(sf_id)
# assert sf["class"] == "JeopardyQuestion"
# xrefs = [category["href"] for category in sf["properties"]["hasCategory"]]
# assert f"/v1/objects/JeopardyCategory/{us_cities_id}" in xrefs
# END Test results


# # =======================================
# # ===== Add bidirectional cross-ref =====
# # =======================================

client.collections.delete_all()


# START Collections TwoWay Category1
import weaviate.classes as wvc

category = client.collections.create(
    name="JeopardyCategory",
    description="A Jeopardy! category",
    properties=[
        wvc.Property(name="title", data_type=wvc.DataType.TEXT)
    ]
)
# END Collections TwoWay Category1

# START Collections TwoWay Question
client.collections.create(
    name="JeopardyQuestion",
    description="A Jeopardy! question",
    properties=[
        wvc.Property(name="question", data_type=wvc.DataType.TEXT),
        wvc.Property(name="answer", data_type=wvc.DataType.TEXT),
        # highlight-start
        wvc.ReferenceProperty(
            name="hasCategory",
            target_collection="JeopardyCategory"
        )
        # highlight-end
    ]
)
# END Collections TwoWay Question

# START Collections TwoWay Category2
# Add the reference to JeopardyQuestion, after it was created
category.config.add_property(
    # highlight-start
    wvc.ReferenceProperty(
        name="hasQuestion",
        target_collection="JeopardyQuestion"
    )
    # highlight-end
)
# END Collections TwoWay Category2
dataset.upload_objects(old_client, 100)

# Delete any existing cross-references from the source and target objects
del_props(sf_id, "hasCategory", "JeopardyQuestion")
del_props(us_cities_id, "hasQuestion", "JeopardyCategory")

# TwoWay Python
import weaviate.classes as wvc

sf_id = "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
us_cities_id = "20ffc68d-986b-5e71-a680-228dba18d7ef"

# For the "San Francisco" JeopardyQuestion object, add a cross-reference to the "U.S. CITIES" JeopardyCategory object
questions = client.collections.get("JeopardyQuestion")
# highlight-start
questions.data.reference_add(
    from_uuid=sf_id,
    from_property="hasCategory",
    ref=wvc.Reference.to(us_cities_id)
)
# highlight-end

# For the "U.S. CITIES" JeopardyCategory object, add a cross-reference to "San Francisco"
categories = client.collections.get("JeopardyCategory")
# highlight-start
categories.data.reference_add(
    from_uuid=us_cities_id,
    from_property="hasQuestion",
    ref=wvc.Reference.to(sf_id)
)
# highlight-end
# END TwoWay Python

# Test results
# TODOv4 fix the tests
# sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
# us_cities = client.data_object.get(uuid=us_cities_id, class_name="JeopardyCategory")

# assert sf["class"] == "JeopardyQuestion"
# assert us_cities["class"] == "JeopardyCategory"
# xrefs = [category["href"] for category in sf["properties"]["hasCategory"]]
# assert f"/v1/objects/JeopardyCategory/{us_cities_id}" in xrefs
# xrefs = [category["href"] for category in us_cities["properties"]["hasQuestion"]]
# assert f"/v1/objects/JeopardyQuestion/{sf_id}" in xrefs
# END Test results


# ===================================
# ===== Add multiple cross-refs =====
# ===================================

# Delete any existing cross-references from the source object
del_props(sf_id, "hasCategory", "JeopardyQuestion")

# Multiple Python
import weaviate.classes as wvc

sf_id = "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
us_cities_id = "20ffc68d-986b-5e71-a680-228dba18d7ef"
museums_id = "fec50326-dfa1-53c9-90e8-63d0240bd933"

questions = client.collections.get("JeopardyQuestion")
questions.data.reference_add(
    from_uuid=sf_id,
    from_property="hasCategory",
    # highlight-start
    ref=wvc.Reference.to([us_cities_id, museums_id]) # add multiple references
    # highlight-end
)
# END Multiple Python

# Test results
# TODOv4 fix tests
# sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
# assert sf["class"] == "JeopardyQuestion"
# xrefs = [category["href"] for category in sf["properties"]["hasCategory"]]
# assert f"/v1/objects/JeopardyCategory/{us_cities_id}" in xrefs
# assert f"/v1/objects/JeopardyCategory/{museums_id}" in xrefs
# END Test results


# ============================
# ===== Delete cross-ref =====
# ============================

# Delete Python
import weaviate.classes as wvc

sf_id = "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
museums_id = "fec50326-dfa1-53c9-90e8-63d0240bd933"

# From the "San Francisco" JeopardyQuestion object, delete the "MUSEUMS" category cross-reference
questions = client.collections.get("JeopardyQuestion")
# highlight-start
questions.data.reference_delete(
# highlight-end
    from_uuid=sf_id,
    from_property="hasCategory",
    ref=wvc.Reference.to(museums_id)
)
# END Delete Python

# Test results
# TODOv4 fix tests
# sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
# assert sf["class"] == "JeopardyQuestion"
# assert sf["properties"]["hasCategory"] == [{
#     "beacon": f"weaviate://localhost/JeopardyCategory/{us_cities_id}",
#     "href": f"/v1/objects/JeopardyCategory/{us_cities_id}"
# }]
# END Test results


# # ============================
# # ===== Update cross-ref =====
# # ============================

# Update Python
import weaviate.classes as wvc

sf_id = "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
museums_id = "fec50326-dfa1-53c9-90e8-63d0240bd933"

# In the "San Francisco" JeopardyQuestion object, set the "hasCategory" cross-reference only to "MUSEUMS"
questions = client.collections.get("JeopardyQuestion")
# highlight-start
questions.data.reference_replace(
# highlight-end
    from_uuid=sf_id,
    from_property="hasCategory",
    ref=wvc.Reference.to(museums_id)
)
# END Update Python

# Test results
# TODOv4 fix tests
# sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
# assert sf["class"] == "JeopardyQuestion"
# assert sf["properties"]["hasCategory"] == [{
#     "beacon": f"weaviate://localhost/JeopardyCategory/{museums_id}",
#     "href": f"/v1/objects/JeopardyCategory/{museums_id}"
# }]
# END Test results
