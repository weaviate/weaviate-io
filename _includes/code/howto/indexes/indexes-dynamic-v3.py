# TODO: Configure as part of the test harness

class_name = "ConfigCollection"

########################
### CLIENT CONNECTION ##
########################

import os
import weaviate

client = weaviate.Client(
    url="http://localhost:8080",
    additional_headers={"X-Cohere-Api-Key": os.getenv("COHERE_API_KEY")},
)

######################
### ENABLE DYNAMIC ###
######################

# Delete data from prior runs
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START EnableDynamic
class_obj = {
    "class": class_name,
    # Additional configuration not shown
    "vectorIndexType": "dynamic",
}

client.schema.create_class(class_obj)
# END EnableDynamic

class_response = client.schema.get()
schema_response = client.schema.get(class_name)

classes = []
for c in class_response["classes"]:
    classes.append(c["class"])
assert class_name in classes, "Class missing"

correct_index = False
if (schema_response["class"] == class_name) and (
    schema_response["vectorIndexType"] == "dynamic"
):
    correct_index = True
assert correct_index, "Wrong index type"


#########################
### CONFIGURE DYNAMIC ###
#########################

# Delete data from prior runs
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START EnableDynamic
class_obj = {
    "class": class_name,
    # Additional configuration not shown
    "vectorIndexType": "dynamic",
}

client.schema.create_class(class_obj)
# END EnableDynamic

class_response = client.schema.get()
schema_response = client.schema.get(class_name)

classes = []
for c in class_response["classes"]:
    classes.append(c["class"])
assert class_name in classes, "Class missing"

correct_index = False
if (schema_response["class"] == class_name) and (
    schema_response["vectorIndexType"] == "dynamic"
):
    correct_index = True
assert correct_index, "Wrong index type"
