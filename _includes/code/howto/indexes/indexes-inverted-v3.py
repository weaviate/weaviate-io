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

##############
### SEARCH ###
##############

# Delete data from prior runs
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START SearchIndex
class_obj = {
    "class": class_name,
    "vectorizer": "text2vec-huggingface",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
            "indexSearchable": False,
        },
}

client.schema.create_class(class_obj)
# END SearchIndex

class_response = client.schema.get()
schema_response = client.schema.get(class_name)

classes = []
for c in class_response["classes"]:
    classes.append(c["class"])
assert class_name in classes, "Class missing"


##############
### FILTER ###
##############

# Delete data from prior runs
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START FilterIndex
class_obj = {
    "class": class_name,
    "vectorizer": "text2vec-huggingface",
    "properties": [
        {
            "name": "title",
            "dataType": ["text"],
            "indexFilterable": False,
        },
}

client.schema.create_class(class_obj)
# END FilterIndex

class_response = client.schema.get()
schema_response = client.schema.get(class_name)

classes = []
for c in class_response["classes"]:
    classes.append(c["class"])
assert class_name in classes, "Class missing"


#############
### RANGE ###
#############

# Delete data from prior runs
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START RangeIndex
class_obj = {
    "class": class_name,
    "vectorizer": "text2vec-huggingface",
    "properties": [
        {
            "name": "scores",
            "dataType": ["int"],
            "indexRangeFilters": True,
        },
    ],
}

client.schema.create_class(class_obj)
# END RangeIndex

class_response = client.schema.get()
schema_response = client.schema.get(class_name)

classes = []
for c in class_response["classes"]:
    classes.append(c["class"])
assert class_name in classes, "Class missing"

############
### BM25 ###
############

# Delete data from prior runs
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START BM25Index
class_obj = {
    "class": class_name,
    "invertedIndexConfig": {
        "bm25": {
            "b": 0.7,
            "k1": 1.25
        },
    }
}

client.schema.create_class(class_obj)
# END BM25Index

class_response = client.schema.get()
schema_response = client.schema.get(class_name)

classes = []
for c in class_response["classes"]:
    classes.append(c["class"])
assert class_name in classes, "Class missing"

########################
### COLLECTION LEVEL ###
########################

# Delete data from prior runs
if client.schema.exists(class_name):
    client.schema.delete_class(class_name)

# START CollLevIndex
class_obj = {
    "class": class_name,
    "invertedIndexConfig": {
        "indexTimestamps": True,
        "indexNullState": True,
        "indexPropertyLength": True
    }
}

client.schema.create_class(class_obj)
# END CollLevIndex

class_response = client.schema.get()
schema_response = client.schema.get(class_name)

classes = []
for c in class_response["classes"]:
    classes.append(c["class"])
assert class_name in classes, "Class missing"