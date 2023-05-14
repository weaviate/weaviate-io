import pytest
import utils


@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/quickstart.autoschema.endtoend.py",
        "./_includes/code/quickstart.byov.all.py",
    ],
)
def test_python_script(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)
