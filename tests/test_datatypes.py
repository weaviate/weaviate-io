import subprocess
import pytest
import utils


@pytest.mark.pyv4
@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/python/config-refs.datatypes.blob.py",
        "./_includes/code/python/config-refs.datatypes.date.py",
        "./_includes/code/python/config-refs.datatypes.geocoordinates.py",
        "./_includes/code/python/config-refs.datatypes.numerical.py",
        "./_includes/code/python/config-refs.datatypes.object.py",
        "./_includes/code/python/config-refs.datatypes.phonenumber.py",
        "./_includes/code/python/config-refs.datatypes.text.py",
        "./_includes/code/python/config-refs.datatypes.uuid.py",
    ],
)
def test_pyv4(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)


@pytest.mark.ts
@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/typescript/config-refs.datatypes.blob.ts",
        "./_includes/code/typescript/config-refs.datatypes.date.ts",
        "./_includes/code/typescript/config-refs.datatypes.geocoordinates.ts",
        "./_includes/code/typescript/config-refs.datatypes.numerical.ts",
        "./_includes/code/typescript/config-refs.datatypes.object.ts",
        "./_includes/code/typescript/config-refs.datatypes.phonenumber.ts",
        "./_includes/code/typescript/config-refs.datatypes.text.ts",
        "./_includes/code/typescript/config-refs.datatypes.uuid.ts",
    ],
)
def test_ts(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(
        script_loc,
        lang="ts",
        custom_replace_pairs=utils.edu_readonly_replacements
    )
    command = ["node", "--loader=ts-node/esm", temp_proc_script_loc]

    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(command)
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Script {temp_proc_script_loc} failed with error: {error}')
