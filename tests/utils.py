import os
import re
from pathlib import Path


def preprocess_codeblock(raw_codeblock: str) -> str:
    """
    Replaces placeholder text such as the URL and API keys with testable equivalents.

    Args:
        raw_codeblock (str): The raw code block from the markdown file.

    Returns:
        str: The preprocessed code block with placeholders replaced.
    """
    # Replace URL
    proc_codeblock = raw_codeblock
    for replace_pair in [
        [
            "http://localhost:8080",
            "http://localhost:8099",
        ],  # Specify different port to usual to avoid confusion
        ["https://some-endpoint.weaviate.network", "http://localhost:8099"],
        ["<YOUR-WEAVIATE-API-KEY>", "secr3tk3y"],
        ["YOUR-WEAVIATE-API-KEY", "secr3tk3y"],
    ]:
        proc_codeblock = proc_codeblock.replace(*replace_pair)

    # Replace OpenAI key
    pattern = r'"X-OpenAI-Api-Key": "(.+?)"'
    my_api_key = os.environ["OPENAI_API_KEY"]
    proc_codeblock = re.sub(
        pattern, f'"X-OpenAI-Api-Key": "{my_api_key}"', proc_codeblock
    )
    return proc_codeblock


def load_and_prep_script(script_path: str):
    with open(script_path, "r") as f:
        code_block = f.read()
    return preprocess_codeblock(code_block)
