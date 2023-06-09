# Howto: Manage-data/Cross-references - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

import weaviate
import weaviate_datasets

# OneWay Python  # TwoWay Python  # Multiple Python  # Delete Python  # Update Python
sf_id = "00ff6900-e64f-5d94-90db-c8cfa3fc851b"
# END OneWay Python  # END TwoWay Python # END Multiple Python  # END Delete Python  # END Update Python
# OneWay Python  # TwoWay Python  # Multiple Python
us_cities_id = "20ffc68d-986b-5e71-a680-228dba18d7ef"
# END OneWay Python  # END TwoWay Python # END Multiple Python  # END Delete Python
# Multiple Python  # Delete Python  # Update Python
museums_id = "fec50326-dfa1-53c9-90e8-63d0240bd933"
# END Multiple Python  # END Delete Python  # END Update Python


# https://stackoverflow.com/questions/76171703/in-weaviate-how-to-remove-a-property-in-existing-class/76177363#76177363
# class_name is required to avoid the warning to use "class namespaced APIs"
def del_prop(uuid: str, prop_name: str, class_name: str) -> None:
    global client
    object_data = client.data_object.get(uuid, class_name=class_name)
    if prop_name in object_data["properties"]:
        del object_data["properties"][prop_name]
    client.data_object.replace(object_data["properties"], class_name, uuid)


# Instantiate the client anonymously
client = weaviate.Client(
    "https://anon-endpoint.weaviate.network",  # Replace with your Weaviate URL
)

# ===========================================================
# ===== Define classes in the schema and upload dataset =====
# ===========================================================

class_definitions = [
    {
        "class": "JeopardyCategory",
        "description": "A Jeopardy! category",
        "properties": [
            {"name": "title", "dataType": ["text"]},
        ],
    },
    # CrossRefDefinition
    {
        "class": "JeopardyQuestion",
        "description": "A Jeopardy! question",
        "properties": [
            {"name": "question", "dataType": ["text"]},
            {"name": "answer", "dataType": ["text"]},
            # highlight-start
            {
                "name": "hasCategory",
                "dataType": ["JeopardyCategory"],
                "description": "The category of the question",
            },
            # highlight-end
        ],
    },
    # END CrossRefDefinition
]

client.schema.delete_all()
if not client.schema.contains({"classes": class_definitions}):
    client.schema.create({"classes": class_definitions})
    dataset = weaviate_datasets.JeopardyQuestions1k()  # instantiate dataset
    dataset.upload_objects(client, 100)  # batch-upload objects

# =================================
# ===== Add one-way cross-ref =====
# =================================

# OneWay Python

client.data_object.reference.add(
    from_class_name="JeopardyQuestion",
    from_uuid=sf_id,
    from_property_name="hasCategory",
    to_class_name="JeopardyCategory",
    to_uuid=us_cities_id,
)
# END OneWay Python

# Test results
sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
assert sf["class"] == "JeopardyQuestion"
xrefs = [category["href"] for category in sf["properties"]["hasCategory"]]
assert f"/v1/objects/JeopardyCategory/{us_cities_id}" in xrefs
# END Test results


# # =======================================
# # ===== Add bidirectional cross-ref =====
# # =======================================

# Delete any existing cross-references from the source and target objects
del_prop(sf_id, "hasCategory", "JeopardyQuestion")
del_prop(us_cities_id, "hasQuestion", "JeopardyCategory")

# TwoWay Python

# First, add the "hasQuestion" cross-reference property to the JeopardyCategory class
client.schema.property.create("JeopardyCategory", {
    "name": "hasQuestion",
    "dataType": ["JeopardyQuestion"]
})

# For the "San Francisco" JeopardyQuestion object, add a cross-reference to the "U.S. CITIES" JeopardyCategory object
client.data_object.reference.add(
    from_class_name="JeopardyQuestion",
    from_uuid=sf_id,
    from_property_name="hasCategory",
    to_class_name="JeopardyCategory",
    to_uuid=us_cities_id,
)

# For the "U.S. CITIES" JeopardyCategory object, add a cross-reference to "San Francisco"
client.data_object.reference.add(
    from_class_name="JeopardyCategory",
    from_uuid=us_cities_id,
    from_property_name="hasQuestion",
    to_class_name="JeopardyQuestion",
    to_uuid=sf_id,
)
# END TwoWay Python

# Test results
sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
us_cities = client.data_object.get(uuid=us_cities_id, class_name="JeopardyCategory")

assert sf["class"] == "JeopardyQuestion"
assert us_cities["class"] == "JeopardyCategory"
xrefs = [category["href"] for category in sf["properties"]["hasCategory"]]
assert f"/v1/objects/JeopardyCategory/{us_cities_id}" in xrefs
xrefs = [category["href"] for category in us_cities["properties"]["hasQuestion"]]
assert f"/v1/objects/JeopardyQuestion/{sf_id}" in xrefs
# END Test results


# ===================================
# ===== Add multiple cross-refs =====
# ===================================

# Delete any existing cross-references from the source object
del_prop(sf_id, "hasCategory", "JeopardyQuestion")

# Multiple Python

# Add to "San Francisco" the "U.S. CITIES" category
client.data_object.reference.add(
    from_class_name="JeopardyQuestion",
    from_uuid=sf_id,
    from_property_name="hasCategory",
    to_class_name="JeopardyCategory",
    to_uuid=us_cities_id,
)

# Add the "MUSEUMS" category as well
client.data_object.reference.add(
    from_class_name="JeopardyQuestion",
    from_uuid=sf_id,
    from_property_name="hasCategory",
    to_class_name="JeopardyCategory",
    to_uuid=museums_id,
)
# END Multiple Python

# Test results
sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
assert sf["class"] == "JeopardyQuestion"
xrefs = [category["href"] for category in sf["properties"]["hasCategory"]]
assert f"/v1/objects/JeopardyCategory/{us_cities_id}" in xrefs
assert f"/v1/objects/JeopardyCategory/{museums_id}" in xrefs
# END Test results


# ============================
# ===== Delete cross-ref =====
# ============================

# Delete Python

# From the "San Francisco" JeopardyQuestion object, delete the "MUSEUMS" category cross-reference
# https://weaviate-python-client.readthedocs.io/en/stable/weaviate.data.references.html#weaviate.data.references.Reference.delete
sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
cat = client.data_object.get(uuid=museums_id, class_name="JeopardyCategory")

client.data_object.reference.delete(
    from_class_name="JeopardyQuestion",
    from_uuid=sf_id,
    from_property_name="hasCategory",
    to_class_name="JeopardyCategory",
    to_uuid=museums_id,
)
# END Delete Python

# Test results
sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
assert sf["class"] == "JeopardyQuestion"
assert sf["properties"]["hasCategory"] == [{
    "beacon": f"weaviate://localhost/JeopardyCategory/{us_cities_id}",
    "href": f"/v1/objects/JeopardyCategory/{us_cities_id}"
}]
# END Test results


# # ============================
# # ===== Update cross-ref =====
# # ============================

# Update Python

# In the "San Francisco" JeopardyQuestion object, set the "hasCategory" cross-reference only to "MUSEUMS"
# https://weaviate-python-client.readthedocs.io/en/stable/weaviate.data.references.html#weaviate.data.references.Reference.update
client.data_object.reference.update(
    from_class_name="JeopardyQuestion",
    from_uuid=sf_id,
    from_property_name="hasCategory",
    to_class_names=["JeopardyCategory"],
    to_uuids=[museums_id],
)
# END Update Python

# Test results
sf = client.data_object.get(uuid=sf_id, class_name="JeopardyQuestion")
assert sf["class"] == "JeopardyQuestion"
assert sf["properties"]["hasCategory"] == [{
    "beacon": f"weaviate://localhost/JeopardyCategory/{museums_id}",
    "href": f"/v1/objects/JeopardyCategory/{museums_id}"
}]
# END Test results
