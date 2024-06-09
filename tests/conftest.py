import pytest
import subprocess
import time


@pytest.fixture(scope="session")
def empty_weaviates(request):
    # Code to run at startup
    print("Spinning up Weaviate")
    subprocess.run(["tests/start-weaviate.sh"])
    time.sleep(5)  # Give Weaviate some time to start up

    def teardown():
        # Code to run at exit
        print("Shutting down Weaviate")
        subprocess.run(["tests/stop-weaviate.sh"])

    request.addfinalizer(teardown)


# TODO - add non empty Weaviate fixture
# TODO - add fixture for a Weaviate with sample data
