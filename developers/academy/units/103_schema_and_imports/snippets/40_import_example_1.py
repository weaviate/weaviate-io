# Define the class
class_obj = {
    # Class & property definitions
    "class": "JeopardyQuestion",
    "properties": [
        {
            "name": "round",
            "dataType": ["text"],
            # Property-level module configuration for `round`
            "moduleConfig": {
                "text2vec-openai": {
                    "skip": True,
                }
            },
            # End of property-level module configuration
        },
        {
            "name": "value",
            "dataType": ["int"],
        },
        {
            "name": "question",
            "dataType": ["text"],
        },
        {
            "name": "answer",
            "dataType": ["text"],
        },
    ],

    # Specify a vectorizer
    "vectorizer": "text2vec-openai",

    # Module settings
    "moduleConfig": {
        "text2vec-openai": {
            "vectorizeClassName": False,
            "model": "ada",
            "modelVersion": "002",
            "type": "text"
        }
    },
    # End schema
}

client.schema.create_class(class_obj)
# Retrieve "JeopardyQuestion" class schema
client.schema.get("JeopardyQuestion")
# Test class addition
class_schema = client.schema.get("JeopardyQuestion")
assert class_schema["class"] == "JeopardyQuestion"
assert class_schema["vectorizer"] == "text2vec-openai"
assert len(class_schema["properties"]) == 4
