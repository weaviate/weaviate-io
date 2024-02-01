import pytest
import utils


@pytest.mark.pyv4
@pytest.mark.parametrize(
    "script_loc",
    [
        "_includes/code/rest.schema.py",
        "_includes/code/rest.objects.py",
        "_includes/code/rest.batch.py",
        "_includes/code/rest.meta.py",
        "_includes/code/rest.nodes.py",
        "_includes/code/rest.well-known.py",
    ],
)
def test_pyv4(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)
