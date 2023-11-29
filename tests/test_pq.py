import subprocess
import pytest
import utils
import shlex
import os


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
