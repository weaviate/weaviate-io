import subprocess
import pytest
import utils


@pytest.mark.pyv4
@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/quickstart.byov.all.py",
        "./_includes/code/starter-guides/generative.py",
    ],
)
def test_py(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)


@pytest.mark.pyv3
@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/quickstart.byov.all_v3.py",

        # Note - 2024-Jan-23: This is falling over as generative search times out for some reason
        # TODO - investigate further and re-enable
        # "./_includes/code/starter-guides/generative_v3.py",
    ],
)
def test_py(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)