import subprocess
import pytest
import utils


@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/quickstart.byov.all.py",
        "./_includes/code/quickstart.byov.all_v3.py",
        "./_includes/code/starter-guides/generative.py",
        "./_includes/code/starter-guides/generative_v3.py",
    ],
)
def test_py(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)
