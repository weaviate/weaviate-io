import os
import re
from pathlib import Path


def populate_inference_api_keys(codeblock_in: str) -> str:

    codeblock_out = codeblock_in
    for pattern, my_env_var, repl_pattern in [
        (r'(["\'])X-Cohere-Api-Key\1: \1(.+?)\1', "COHERE_APIKEY", r'\1X-Cohere-Api-Key\1: \1'),
        (r'(["\'])X-OpenAI-Api-Key\1: \1(.+?)\1', "OPENAI_APIKEY", r'\1X-OpenAI-Api-Key\1: \1'),
        (r'(["\'])X-HuggingFace-Api-Key\1: \1(.+?)\1', "HUGGINGFACE_APIKEY", r'\1X-HuggingFace-Api-Key\1: \1')
    ]:
        my_api_key = os.environ[my_env_var]
        if re.search(pattern, codeblock_out) is not None:
            # Replace key
            codeblock_out = re.sub(
                pattern, repl_pattern + my_api_key + r'\1', codeblock_out
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
        ["http://localhost:8080", "http://localhost:8099"],  # Specify different port from usual to avoid confusion

        # For examples with auth
        ["https://some-endpoint.weaviate.network", "http://localhost:8099"],
        ["some-endpoint.weaviate.network", "localhost:8099"],
        ["YOUR-WEAVIATE-API-KEY", "secr3tk3y"],

        # For anonoymous examples
        ["https://anon-endpoint.weaviate.network", "http://localhost:8080"],
        ["anon-endpoint.weaviate.network", "localhost:8080"],
    ]

    if lang == "js" or lang == "ts":
        pattern = r"\s*  scheme: 'https',\n?\s*  host: 'some-endpoint.weaviate.network',"

        replacement = '''
        scheme: 'http',
        host: 'localhost:8099',  // Replace with your endpoint
        '''

        proc_codeblock = re.sub(pattern, replacement, proc_codeblock, flags=re.DOTALL)

    for replace_pair in custom_replace_pairs:
        proc_codeblock = proc_codeblock.replace(*replace_pair)

    for replace_pair in common_replace_pairs:
        proc_codeblock = proc_codeblock.replace(*replace_pair)

    proc_codeblock = populate_inference_api_keys(proc_codeblock)

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
