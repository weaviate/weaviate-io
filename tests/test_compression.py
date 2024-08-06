import subprocess
import pytest
import utils
import shlex
import os


@pytest.mark.pyv4
@pytest.mark.parametrize(
    "script_loc",
    [
        "./_includes/code/howto/configure.pq-compression.py",
        "./_includes/code/howto/configure.bq-compression.py",
        "./_includes/code/howto/configure-sq/sq-compression-v4.py",
    ],
)
def test_on_blank_instance_pyv4(empty_weaviates, script_loc):
    proc_script = utils.load_and_prep_script(script_loc)
    exec(proc_script)


@pytest.mark.java
@pytest.mark.pq
def test_on_blank_instance_java(empty_weaviates):
    command = shlex.split("mvn -Dgroups=pq clean test")
    cwd = "_includes/code/howto/java"
    env = dict(os.environ, WEAVIATE_PORT="8099")

    try:
        # If the script throws an error, this will raise a CalledProcessError
        subprocess.check_call(command, cwd=cwd, env=env)
    except subprocess.CalledProcessError as error:
        pytest.fail(f"Java PQ tests failed with error: {error}")
