## Tests for Code Examples

At Weaviate, we maintain automated tests to ensure the accuracy and functionality of our code examples. This testing framework helps us catch issues early and maintain high-quality documentation.

### Overview

Our code examples are designed as self-contained, runnable scripts. Each script includes inline assertions to verify its functionality. These tests are managed through `pytest` and can be executed centrally to validate all examples.

### Prerequisites

Before running tests, ensure you have:

- Python 3.8+ and Node.js installed
- Docker (required for running Weaviate instances)
- Rust and Cargo (for some examples)
- API keys for vectorization services:
  - `COHERE_APIKEY`
  - `HUGGINGFACE_APIKEY`
  - `OPENAI_APIKEY`

### Setup

1. Create and activate a Python virtual environment:
```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

2. Install dependencies:
```bash
pip install -r requirements.txt
```

### Running Tests

#### Python Tests

Run all Python tests:
```bash
pytest
```

Run specific test files:
```bash
pytest tests/path/to/test_file.py
```

#### Golang Tests

1. Start Weaviate instances:
```bash
tests/start-weaviate.sh
```

2. Navigate to the Go examples directory:
```bash
cd _includes/code/howto/go/docs
```

3. Update dependencies:
```bash
go mod tidy
```

4. Run tests:
```bash
# Run all tests
go test

# Run specific test file
go test <file_path> -v
# Example:
go test docs/manage-data.classes_test.go -v
```

5. Stop Weaviate instances:
```bash
tests/stop-weaviate.sh
```

### Test Fixtures

The test suite includes several fixtures to help with testing:

- `empty_weaviates`: Provides a clean Weaviate instance for testing
- More fixtures are planned for different test scenarios

### Troubleshooting

- If tests fail to connect to Weaviate, ensure Docker is running and the Weaviate instances are up
- For API key issues, verify your environment variables are set correctly
- If you encounter dependency issues, try updating your virtual environment and reinstalling requirements

### Contributing

If you find issues with the tests or documentation:
1. Check if the issue is already reported on GitHub
2. If not, create a new issue with:
   - The test that's failing
   - Your environment details
   - Any error messages
   - Steps to reproduce

## Thanks

A big thanks to Jeremy for suggesting this testing framework! 😊
