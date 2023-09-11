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

#### Install Node

Additionally, [install Node](https://nodejs.org/en/download) for running the JavaScript / TypeScript tests, as well as Docusaurus itself locally.

After installing Node, run `yarn` to install the project dependencies.


### 💻 Run tests

Then, from the repo root directory, run `pytest` from the shell. This will initialize all tests.

#### Test configuration

The tests and related files are located in `./tests`.
Before tests are run, `pytest` is configured to run `start-weaviate.sh` to spin up two instances of Weaviate.

- One with anonymous access at: `http://localhost:8080` and
- One with API key access at: `http://localhost:8099` and

Thus, tests can be run against a permanent WCS instance, or one of these two ephemeral instances.

See more in individual `test_xxx.py` scripts.

#### (Optional) ☕️ Run TypeScript tests separately

As we're migrating from JavaScript to TypeScript, examples are gradually being migrated into `_includes/code/*` directories. You can already see there tests for the [Search howtos](/developers/weaviate/search). The `_includes/code/` directory contains a local `package.json` file for the code samples, which sets the "type" to "module" to enable `import` statements.

To run tests for the TypeScript examples, execute `npm test` in the `_includes/code/` directory. (You may have to replace sample API keys and host URLs like `YOUR-OPENAI-API-KEY` or `some-endpoint.weaviate.network` in files that don't use environment variables.)
