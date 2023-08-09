import pytest
import utils


@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/howto/manage-data.create.py",
        "./_includes/code/howto/manage-data.cross-refs.py",
        "./_includes/code/howto/manage-data.import.py",
        "./_includes/code/howto/manage-data.delete.py",
        "./_includes/code/howto/manage-data.update.py"
        "./_includes/code/howto/manage-data.classes.py",
        "./_includes/code/howto/manage-data.multi-tenancy.py",
    ],
)
def test_on_blank_instance(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(
        script_loc,
        lang="py",
    )
    exec(temp_proc_script_loc.read_text())



@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/howto/manage-data.read.py",
        "./_includes/code/howto/read-all-objects.py"
    ],
)
def test_on_edu_demo(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(
        script_loc,
        lang="py",
        custom_replace_pairs=utils.edu_readonly_replacements
    )
    exec(temp_proc_script_loc.read_text())


@pytest.mark.parametrize(
    "script_loc",
    [

    ],
)
def test_js(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(
        script_loc,
        lang="js",
        custom_replace_pairs=utils.edu_readonly_replacements
    )
    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(['node', temp_proc_script_loc])
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Script {temp_proc_script_loc} failed with error: {error}')


@pytest.mark.parametrize(
    "script_loc",
    [
        # "./_includes/code/howto/manage-data.cross-refs.ts"  # Test currently not working - needs work to fix
    ],
)
def test_ts(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(
        script_loc,
        lang="ts",
    )
    command = ["node", "--loader=ts-node/esm", temp_proc_script_loc]

    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(command)
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Script {temp_proc_script_loc} failed with error: {error}')
