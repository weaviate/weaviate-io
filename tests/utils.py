import os
import re
from pathlib import Path


def populate_openai_key(codeblock_in: str) -> str:
    # Replace OpenAI key
    pattern = r'(["\'])X-OpenAI-Api-Key\1: \1(.+?)\1'
    my_api_key = os.environ["OPENAI_APIKEY"]
    codeblock_out = re.sub(
        pattern, r'\1X-OpenAI-Api-Key\1: \1' + my_api_key + r'\1', codeblock_in
    )
    return codeblock_out


def preprocess_codeblock(raw_codeblock: str, lang: str="py", custom_replace_pairs: list=[]) -> str:
    """
    Replaces placeholder text such as the URL and API keys with testable equivalents.

    Args:
        raw_codeblock (str): The raw code block from the markdown file.

    Returns:
        str: The preprocessed code block with placeholders replaced.
    """
    # Replace URL
    proc_codeblock = raw_codeblock

    common_replace_pairs = [
        ["http://localhost:8080", "http://localhost:8099"],  # Specify different port to usual to avoid confusion
        ["https://some-endpoint.weaviate.network", "http://localhost:8099"],
        ["https://anon-endpoint.weaviate.network", "http://localhost:8090"],
        ["<YOUR-WEAVIATE-API-KEY>", "secr3tk3y"],
        ["YOUR-WEAVIATE-API-KEY", "secr3tk3y"],
    ]

    for replace_pair in custom_replace_pairs:
        proc_codeblock = proc_codeblock.replace(*replace_pair)

    for replace_pair in common_replace_pairs:
        proc_codeblock = proc_codeblock.replace(*replace_pair)

    if lang == "js" or lang == "ts":
        pattern = r"\s*  scheme: 'https',\n?\s*  host: 'some-endpoint.weaviate.network',"

        replacement = '''
        scheme: 'http',
        host: 'localhost:8099',  // Replace with your endpoint
        '''

        proc_codeblock = re.sub(pattern, replacement, proc_codeblock, flags=re.DOTALL)

    proc_codeblock = populate_openai_key(proc_codeblock)

    return proc_codeblock


def load_and_prep_script(script_path: str):
    with open(script_path, "r") as f:
        code_block = f.read()
    return preprocess_codeblock(code_block)


def load_and_prep_temp_file(script_path: str, lang: str = "js", custom_replace_pairs: list = []):
    if lang == "js":
        outpath: Path = Path("./tests/temp.js")
    elif lang == "ts":
        outpath: Path = Path("./tests/temp.ts")
    elif lang == "py":
        outpath: Path = Path("./tests/temp.py")
    else:
        raise ValueError(f"Language {lang} not understood.")

    with open(script_path, "r") as f:
        code_block = f.read()
    new_codeblock = preprocess_codeblock(code_block, lang=lang, custom_replace_pairs=custom_replace_pairs)
    outpath.write_text(new_codeblock)
    return outpath.absolute()


edu_readonly_replacements = [
    ("some-endpoint.weaviate.network", "edu-demo.weaviate.network"),
    ("YOUR-WEAVIATE-API-KEY", "learn-weaviate")
]