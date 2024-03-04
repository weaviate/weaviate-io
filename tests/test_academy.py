import pytest
import utils


@pytest.mark.pyv4
@pytest.mark.parametrize(
    "script_loc",
    [
        "./developers/academy/py/starter_text_data/_snippets/101_connect.py",
        "./developers/academy/py/starter_text_data/_snippets/102_collection.py",
        "./developers/academy/py/starter_text_data/_snippets/103_searches.py",
        "./developers/academy/py/starter_text_data/_snippets/104_rag.py",
        "./developers/academy/py/starter_custom_vectors/_snippets/101_connect.py",
        "./developers/academy/py/starter_custom_vectors/_snippets/102_collection.py",
        "./developers/academy/py/starter_custom_vectors/_snippets/103_10_vector.py",
        "./developers/academy/py/starter_custom_vectors/_snippets/103_20_searches.py",
        "./developers/academy/py/starter_custom_vectors/_snippets/104_rag.py",
        "./developers/academy/py/starter_multimodal_data/_snippets/101_connect.py",
        "./developers/academy/py/starter_multimodal_data/_snippets/102_collection.py",
        "./developers/academy/py/starter_multimodal_data/_snippets/103_searches.py",
        "./developers/academy/py/starter_multimodal_data/_snippets/104_rag.py",
        "./developers/academy/py/named_vectors/_snippets/101_connect.py",
        "./developers/academy/py/named_vectors/_snippets/102_collection.py",
        "./developers/academy/py/named_vectors/_snippets/103_searches.py",
        "./developers/academy/py/named_vectors/_snippets/104_usecase.py",
    ],
)
def test_on_blank_instance_pyv4(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)


@pytest.mark.pyv3
@pytest.mark.parametrize(
    "script_loc",
    [
        "./developers/academy/zero_to_mvp/_snippets/setup.py",
        "./developers/academy/zero_to_mvp/103_schema_and_imports/_snippets/05_create_instance.py",
        "./developers/academy/zero_to_mvp/103_schema_and_imports/_snippets/20_schema.py",
        "./developers/academy/zero_to_mvp/103_schema_and_imports/_snippets/30_import.py",
        "./developers/academy/zero_to_mvp/103_schema_and_imports/_snippets/40_import_example_1.py",
    ],
)
def test_on_blank_instance(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)


@pytest.mark.pyv3
@pytest.mark.parametrize(
    "script_loc",
    [
        "./developers/academy/zero_to_mvp/104_queries_2/_snippets/10_bm25.py",
        "./developers/academy/zero_to_mvp/104_queries_2/_snippets/20_hybrid.py",
        "./developers/academy/zero_to_mvp/104_queries_2/_snippets/30_generative.py",
        "./developers/academy/zero_to_mvp/104_queries_2/_snippets/40_qna.py",
    ],
)
def test_against_edu_demo_pyv3(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(
        script_loc,
        lang="py",
        custom_replace_pairs=utils.edu_readonly_replacements
    )
    exec(temp_proc_script_loc.read_text())
