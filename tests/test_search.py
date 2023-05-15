import pytest
import utils
import subprocess


@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/search.basics.py",
        "./_includes/code/howto/similarity.py"
    ],
)
def test_py(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)

@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/search.basics.js",
    ],
)
def test_js(empty_weaviates, script_loc):
    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(['node', script_loc])
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Script {script_loc} failed with error: {error}')
