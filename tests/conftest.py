import pytest
import subprocess


@pytest.fixture(scope="session")
def apikey_empty_weaviate(request):
    # Code to run at startup
    print("Spinning up Weaviate")
    subprocess.run(["tests/start-weaviate.sh"])

    def teardown():
        # Code to run at exit
        print("Shutting down Weaviate")
        subprocess.run(["tests/stop-weaviate.sh"])

    request.addfinalizer(teardown)


# TODO - add non empty Weaviate fixture
# TODO - add fixture for a Weaviate with sample data
