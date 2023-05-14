import pytest
import utils


@pytest.mark.parametrize(
    "script_loc",
    [
        "./developers/academy/units/_snippets/setup.py",
        "./developers/academy/units/103_schema_and_imports/_snippets/05_create_instance.py",
        "./developers/academy/units/103_schema_and_imports/_snippets/20_schema.py",
        "./developers/academy/units/103_schema_and_imports/_snippets/30_import.py",
        "./developers/academy/units/103_schema_and_imports/_snippets/40_import_example_1.py",
    ],
)
def test_python_script(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)
