import pytest
import subprocess


@pytest.fixture(scope="session")
def anon_empty_weaviate(request):
    # Code to run at startup
    print("Spinning up Weaviate")
    subprocess.run(["tests/start-weaviate.sh"])

    def teardown():
        # Code to run at exit
        print("Shutting down Weaviate")
        subprocess.run(["tests/stop-weaviate.sh"])

    request.addfinalizer(teardown)
