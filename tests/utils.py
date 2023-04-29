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
    ]:
        proc_codeblock = proc_codeblock.replace(*replace_pair)

    # Replace OpenAI key
    pattern = r'"X-OpenAI-Api-Key": "(.+?)"'
    my_api_key = os.environ["OPENAI_API_KEY"]
    proc_codeblock = re.sub(
        pattern, f'"X-OpenAI-Api-Key": "{my_api_key}"', proc_codeblock
    )
    return proc_codeblock


def extract_code_blocks(file_path: Path, regex_pattern: re.Pattern) -> list:
    """
    Extracts Code blocks from a markdown file.

    Args:
        file_path (Path): The path to the markdown file.

    Returns:
        list: A list containing extracted code blocks.
    """

    with file_path.open() as file:
        content = file.read()
        code_blocks = regex_pattern.findall(content)

        extracted_blocks = []

        for block in code_blocks:
            extracted_blocks.append(block.strip())

        return extracted_blocks


def extract_language_code_blocks(file_path: Path, lang_code: str = "python") -> list:
    code_block_regex = re.compile(
        rf"```{lang_code}\n(.*?)\n```", re.DOTALL | re.MULTILINE
    )

    return extract_code_blocks(file_path, code_block_regex)


def extract_test_code_blocks(file_path: Path) -> list:
    """
    Extracts Python code blocks and associated HTML comments from a markdown file.

    Args:
        file_path (Path): The path to the markdown file.

    Returns:
        list: A list of dictionaries containing extracted code blocks and associated comments.
    """
    code_block_regex = re.compile(
        r"<!--\s*(.+?)\s*-->\n?```python\n(.*?)\n```\n?<!--\s*(.+?)\s*-->",
        re.DOTALL | re.MULTILINE,
    )

    code_blocks = extract_code_blocks(file_path, code_block_regex)

    extracted_blocks = list()
    for code_block in code_blocks:
        extracted_blocks.append(
            {
                "preparation": preprocess_codeblock(code_block[0].strip()),
                "code": preprocess_codeblock(code_block[1]),
                "test_assertion": code_block[2].strip(),
            }
        )
    return extracted_blocks


def process_markdown_files(dir_path: str) -> list:
    """
    Processes all markdown files in the specified directory, extracting code blocks and associated comments.

    Args:
        dir_path (str): The path to the directory containing markdown files.

    Returns:
        list: A list of dictionaries containing extracted code blocks and associated comments.
    """
    all_blocks = []

    for file_path in Path(dir_path).rglob("*.md"):
        all_blocks.extend(extract_test_code_blocks(file_path))

    return all_blocks


def load_and_prep_script(script_path: str):
    with open(script_path, "r") as f:
        code_block = script_path.read()
    return preprocess_codeblock(code_block)


def parse_and_prep_script(mdx_path: str):
    mdx_obj = Path(mdx_path)
    code_blocks = extract_language_code_blocks(mdx_obj)
    if len(code_blocks) > 1:
        raise ValueError(
            "More than one code block found. You might want to process this differently."
        )
    return preprocess_codeblock(code_blocks[0])


def get_md_files():
    all_files = []
    basedirs = ["_includes"]
    for basedir in basedirs:
        basepath = Path(basedir)
        for mdx_file in basepath.glob("./**/*.md*"):
            all_files.append(mdx_file)
    return all_files
