import pytest
import utils


@pytest.mark.parametrize(
    "script_loc",
    [
        "./developers/academy/units/_snippets/setup.py",
    ],
)
def test_python_script(apikey_empty_weaviate, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)
