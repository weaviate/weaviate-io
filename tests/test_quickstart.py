import os
import utils


def test_client_instantiation(anon_empty_weaviate):
    # ===== INIT TEST ENV =====
    proc_script = utils.parse_and_prep_script(
        "_includes/code/wcs.client.instantiation.mdx"
    )
    test_namespace = {}

    # ===== PRE-TEST SCRIPT =====

    # ===== RUN SCRIPT =====
    exec(proc_script, globals(), test_namespace)

    # ===== RUN TEST =====
    assert "classes" in test_namespace["schema"].keys()


def test_minimum_schema(anon_empty_weaviate):
    # ===== INIT TEST ENV =====
    proc_script = utils.parse_and_prep_script(
        "_includes/code/quickstart.autoschema.minimum.schema.mdx"
    )
    test_namespace = {}

    # ===== PRE-TEST SCRIPT =====
    import weaviate

    client = weaviate.Client(url="http://localhost:8099")
    try:
        client.schema.delete_class("Question")
    except:
        pass

    test_namespace["client"] = client

    # ===== RUN SCRIPT =====
    exec(proc_script, globals(), test_namespace)

    # ===== RUN TEST =====
    schema = test_namespace["client"].schema.get()
    assert "classes" in schema.keys()

    class_names = [c["class"] for c in schema["classes"]]
    assert "Question" in class_names


def test_delete_class(anon_empty_weaviate):
    # ===== INIT TEST ENV =====
    proc_script = utils.parse_and_prep_script("_includes/schema-delete-class.mdx")
    test_namespace = {}

    # ===== PRE-TEST SCRIPT =====
    import weaviate

    client = weaviate.Client(url="http://localhost:8099")
    try:
        client.schema.delete_class("YourClassName")
    except:
        pass
    class_obj = {"class": "YourClassName"}
    client.schema.create_class(class_obj)
    schema = client.schema.get()
    class_names = [c["class"] for c in schema["classes"]]
    assert "YourClassName" in class_names

    test_namespace["client"] = client

    # ===== RUN SCRIPT =====
    exec(proc_script, globals(), test_namespace)

    # ===== RUN TEST =====
    schema = test_namespace["client"].schema.get()
    class_names = [c["class"] for c in schema["classes"]]
    assert "YourClassName" not in class_names


def test_connect_w_apikey(anon_empty_weaviate):
    # ===== INIT TEST ENV =====
    proc_script = utils.parse_and_prep_script(
        "_includes/code/quickstart.autoschema.connect.withkey.mdx"
    )
    test_namespace = {}

    # ===== PRE-TEST SCRIPT =====

    # ===== RUN SCRIPT =====
    exec(proc_script, globals(), test_namespace)

    # ===== RUN TEST =====
    client = test_namespace["client"]
    class_name = "TestClass"
    try:
        client.schema.delete_class(class_name)
    except:
        pass
    class_obj = {"class": class_name, "vectorizer": "text2vec-openai"}
    client.schema.create_class(class_obj)
    response = client.query.aggregate(class_name).with_meta_count().do()
    assert response["data"]["Aggregate"][class_name][0]["meta"]["count"] == 0
    test_obj = {
        "name": "test property name",
        "body": "test property body",
    }
    client.data_object.create(test_obj, "TestClass")
    response = client.query.aggregate(class_name).with_meta_count().do()
    assert response["data"]["Aggregate"][class_name][0]["meta"]["count"] == 1


def test_import(anon_empty_weaviate):
    # ===== INIT TEST ENV =====
    proc_script = utils.parse_and_prep_script(
        "_includes/code/quickstart.autoschema.import.mdx"
    )
    test_namespace = {}

    # ===== PRE-TEST SCRIPT =====
    import weaviate

    client = weaviate.Client(
        url="http://localhost:8099",
        additional_headers={"X-OpenAI-Api-Key": os.environ["OPENAI_API_KEY"]},
    )
    try:
        client.schema.delete_class("Question")
    except:
        pass
    class_obj = {"class": "Question"}
    client.schema.create_class(class_obj)
    schema = client.schema.get()
    class_names = [c["class"] for c in schema["classes"]]
    assert "Question" in class_names
    data = [
        {
            "Answer": "42",
            "Question": "What is the meaning of life?",
            "Category": "The Guide",
        },
        {
            "Answer": "Friction.",
            "Question": "What is the name for the force that opposes motion between two surfaces in contact?",
            "Category": "Science",
        },
    ]
    test_namespace["data"] = data
    test_namespace["client"] = client
    # ===== RUN SCRIPT =====
    exec(proc_script, globals(), test_namespace)

    # ===== RUN TEST =====
    client = test_namespace["client"]
    response = client.query.aggregate("Question").with_meta_count().do()
    assert response["data"]["Aggregate"]["Question"][0]["meta"]["count"] == 2


def test_endtoend_and_query(anon_empty_weaviate):
    # ===== INIT TEST ENV =====
    proc_script = utils.parse_and_prep_script(
        "_includes/code/quickstart.autoschema.endtoend.mdx"
    )
    test_namespace = {}

    # ===== PRE-TEST SCRIPT =====
    import weaviate

    client = weaviate.Client(
        url="http://localhost:8099",
    )
    try:
        client.schema.delete_class("Question")
    except:
        pass

    # ===== RUN SCRIPT =====
    exec(proc_script, globals(), test_namespace)

    # ===== RUN TEST =====
    assert (
        client.query.aggregate("Question")
        .with_meta_count()
        .do()["data"]["Aggregate"]["Question"][0]["meta"]["count"]
        == 10
    )

    proc_script = utils.parse_and_prep_script(
        "_includes/code/quickstart.autoschema.neartext.mdx"
    )
    exec(proc_script, globals(), test_namespace)
    results = test_namespace["results"]
    assert len(results["data"]["Get"]["Question"]) == 2
    assert results["data"]["Get"]["Question"][0]["answer"] == "DNA"
    assert results["data"]["Get"]["Question"][1]["answer"] == "species"
