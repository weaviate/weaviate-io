import subprocess
import pytest
import utils


@pytest.mark.pyv4
@pytest.mark.parametrize(
    "script_loc",
    [
        # "./_includes/code/quickstart/endtoend.py",
        "_includes/code/python/quickstart.is_ready.py",
        "_includes/code/python/quickstart.create_collection.py",
        "_includes/code/python/quickstart.import_objects.py",
        "_includes/code/python/quickstart.query.neartext.py",
        "_includes/code/python/quickstart.query.rag.py"
    ],
)
def test_pyv4(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)


@pytest.mark.pyv3
@pytest.mark.parametrize(
    "script_loc",
    [
        # "./_includes/code/quickstart/endtoend.py3.py",
    ],
)
def test_pyv3(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)


@pytest.mark.ts
@pytest.mark.parametrize(
    "script_loc",
    [
        # "./_includes/code/quickstart/endtoend.ts",
        "_includes/code/typescript/quickstart.is_ready.ts",
        "_includes/code/typescript/quickstart.create_collection.ts",
        "_includes/code/typescript/quickstart.import_objects.ts",
        "_includes/code/typescript/quickstart.query.neartext.ts",
        "_includes/code/typescript/quickstart.query.rag.ts"
    ],
)
def test_ts(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(script_loc, lang="ts")
    command = ["node", "--loader=ts-node/esm", temp_proc_script_loc]

    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(command)
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Script {temp_proc_script_loc} failed with error: {error}')
