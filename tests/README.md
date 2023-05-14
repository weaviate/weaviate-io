## Code example tests

We are working on making as much of the site's code examples testable, so that they are robust to edits and remain up-to-date.

### Set-up

#### Python virtual environment

The tests are built around Python and the `pytest` library. Go to the root directory of the repo, and create a virtual environment by running:

```bash
python3 -m venv .venv  # Create a virtual environment ()
source .venv/bin/activate  # Activate the virtual environment
pip install -r requirements.txt  # Install dependencies
```

#### Install node & ts-node

Additionally, install node and ts-node for running JavaScript / TypeScript scripts.

- Go [here for node](https://nodejs.org/en/download) installation instructions.
- Go [here for ts-node](https://typestrong.org/ts-node/docs/installation/) installation instructions.

### 💻 Run tests

Then, from the repo root directory, run `pytest` from the shell. This will initialize all tests.

### Test configuration

The tests and related files are located on ./tests.
Before tests are run, `pytest` is configured to run `start-weaviate.sh` to spin up two instances of Weaviate.

- One with anonymous access at: `http://localhost:8090` and
- One with API key access at: `http://localhost:8099` and

Thus, tests can be run against a permanent WCS instance, or one of these two ephemeral instances.

See more in individual `test_xxx.py` scripts.
