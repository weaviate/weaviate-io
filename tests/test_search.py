import pytest
import utils
import subprocess


@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/howto/search.basics.py",
        "./_includes/code/howto/search.similarity.py",
        "./_includes/code/howto/search.bm25.py",
        "./_includes/code/howto/search.hybrid.py"
    ],
)
def test_py(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(
        script_loc,
        lang="py",
        custom_replace_pairs=utils.edu_readonly_replacements
    )
    exec(temp_proc_script_loc.read_text())


@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/howto/search.basics.js",
        "./_includes/code/howto/search.similarity.js",
        "./_includes/code/howto/search.bm25.js",
        "./_includes/code/howto/search.hybrid.js"
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

    ],
)
def test_ts(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(
        script_loc,
        lang="ts",
        custom_replace_pairs=utils.edu_readonly_replacements
    )
    command = ["npx", "ts-node", "-O", '{ "module": "commonjs" }', temp_proc_script_loc]

    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(command)
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Script {temp_proc_script_loc} failed with error: {error}')
