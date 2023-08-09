## Tests for code examples

At Weaviate, we love automated tests. And we are making an effort to use automated tests to help us maintain the functionality of our code examples.

**NOTE: This README and testing framework is a work in progress - if you see errors please let us know on GitHub, and please be patient with us.**

### Implementation Overview

Many of our in-doc [code examples](./README.md#code-examples) are pulled from external scripts. **These scripts are designed to be self-contained files that you can run.**

In fact, tests are contained in-line in these scripts, in the form of simple assertions.

The idea is that these scripts could then be executed from a central point, to make execution of the test as simple as possible.

These tests are currently managed through [`pytest`](https://docs.pytest.org/), a testing framework for python.

### Running tests

To run the tests:

- Install Python and Node.
- Install Docker (needed to spin up Weaviate)
- Set up API keys for Cohere, Hugging Face and OpenAI (needed for vectorization) as environment variables under `COHERE_APIKEY`, `HUGGINGFACE_APIKEY` and `OPENAI_APIKEY` respectively.
- Set up and activate the Python environment, and install the required libraries (`pytest`, `weaviate-client` and so on)
- We recommend doing this by running from the shell:
```bash
python -m venv .venv
source .venv/bin/python
pip install -r requirements.txt
```
- Then run `pytest` from your environment. This will execute tests defined within the `tests` directory.


## Thanks

A big thanks to Jeremy for suggesting this to us ;)
