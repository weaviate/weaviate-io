import subprocess
import pytest
import utils
import shlex
import os


@pytest.mark.pyv4
@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/howto/manage-data.collections.py",
        "./_includes/code/howto/manage-data.create.py",
        "./_includes/code/howto/manage-data.import.py",
        "./_includes/code/howto/manage-data.update.py",
        "./_includes/code/howto/manage-data.delete.py",
        "./_includes/code/howto/manage-data.cross-refs.py",
        "./_includes/code/howto/manage-data.multi-tenancy.py",
        "./_includes/code/howto/manage-data.migrate.data.v4.py",
    ],
)
def test_on_blank_instance_pyv4(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)



@pytest.mark.pyv4
@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/howto/manage-data.read.py",
        "./_includes/code/howto/manage-data.read-all-objects.py"
    ],
)
def test_on_edu_demo_py_pyv4(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(
        script_loc,
        lang="py",
        custom_replace_pairs=utils.edu_readonly_replacements
    )
    exec(temp_proc_script_loc.read_text())


@pytest.mark.ts
@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/howto/manage-data.create.ts",
        # "./_includes/code/howto/manage-data.cross-refs.ts",  # Test currently not working - needs work to fix
        # "./_includes/code/howto/manage-data.import.ts",  # Test currently not working - needs work to fix
        "./_includes/code/howto/manage-data.delete.ts",
        "./_includes/code/howto/manage-data.update.ts",
        "./_includes/code/howto/manage-data.collections.ts",
        "./_includes/code/howto/manage-data.multi-tenancy.ts",
    ],
)
def test_on_blank_instance_ts(empty_weaviates, script_loc):
    temp_proc_script_loc = utils.load_and_prep_temp_file(script_loc, lang="ts")
    command = ["node", "--loader=ts-node/esm", temp_proc_script_loc]

    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(command)
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Script {temp_proc_script_loc} failed with error: {error}')


@pytest.mark.java
@pytest.mark.crud
def test_on_blank_instance_java(empty_weaviates):
    command = shlex.split("mvn -Dgroups=crud clean test")
    cwd="_includes/code/howto/java"
    env=dict(os.environ, WEAVIATE_PORT="8099")

    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(command, cwd=cwd, env=env)
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Java CRUD tests failed with error: {error}')


@pytest.mark.go
@pytest.mark.crud
def test_on_blank_instance_go(empty_weaviates):
    command = shlex.split("go test -v -run ^Test_ManageData ./...")
    cwd="_includes/code/howto/go"
    env=dict(os.environ, WEAVIATE_PORT="8099")

    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(command, cwd=cwd, env=env)
    except subprocess.CalledProcessError as error:
        pytest.fail(f'Go CRUD tests failed with error: {error}')
