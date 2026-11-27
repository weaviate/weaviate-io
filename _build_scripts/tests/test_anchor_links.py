"""
Checks that in-page anchor links (e.g. `[text](#some-heading)`) in docs/blog
markdown resolve to a heading (or explicit `{#id}`) that actually exists in
the same file.

This complements `_build_scripts/verify-links.sh` / `verify-links-build-dev.sh`
(linkinator), which check that cross-page links resolve to a live URL but do
not validate same-page URL fragments against the target page's headings.

Run with: pytest _build_scripts/tests/test_anchor_links.py
"""

from __future__ import annotations

import re
import unicodedata
from pathlib import Path

import pytest

REPO_ROOT = Path(__file__).resolve().parents[2]

CONTENT_DIRS = ["blog", "developers", "docs", "apple-and-weaviate", "playbook"]

EXCLUDE_DIR_NAMES = {"node_modules", ".docusaurus", "build", "build.dev", ".git"}

# Matches inline links to same-page anchors: [text](#anchor) or (#anchor "title")
ANCHOR_LINK_RE = re.compile(r"\]\(#([A-Za-z0-9_\-]+)(?:\s+\"[^\"]*\")?\)")

# Matches ATX-style markdown headings, optionally with an explicit
# Docusaurus heading id: `## Some Heading {#custom-id}`
HEADING_RE = re.compile(r"^(#{1,6})\s+(.*)$")
EXPLICIT_ID_RE = re.compile(r"\{#([A-Za-z0-9_\-]+)\}\s*$")

FENCED_CODE_BLOCK_RE = re.compile(r"```.*?```|~~~.*?~~~", re.DOTALL)

MARKDOWN_EMPHASIS_RE = re.compile(r"[*_]{1,3}")


def slugify(heading_text: str) -> str:
    """Approximates github-slugger (what Docusaurus uses for heading ids):
    lowercase, drop punctuation/symbols (including emoji) character-by-character,
    map each remaining whitespace character to its own '-' (no collapsing of
    runs), keep everything else (incl. non-Latin letters/digits) as-is.
    """
    text = MARKDOWN_EMPHASIS_RE.sub("", heading_text)
    text = re.sub(r"`([^`]*)`", r"\1", text)  # inline code
    text = re.sub(r"\[([^\]]*)\]\([^)]*\)", r"\1", text)  # markdown links -> link text
    text = text.strip().lower()

    out = []
    for ch in text:
        if ch.isspace():
            out.append("-")
        elif ch == "-" or ch.isalnum():
            out.append(ch)
        elif unicodedata.category(ch)[0] in ("P", "S", "C"):
            continue  # punctuation/symbol/format (incl. emoji, zero-width joiners) - dropped, like github-slugger
        else:
            out.append(ch)
    return "".join(out)


def find_content_files() -> list[Path]:
    files = []
    for content_dir in CONTENT_DIRS:
        base = REPO_ROOT / content_dir
        if not base.is_dir():
            continue
        for path in base.rglob("*"):
            if path.suffix not in (".md", ".mdx"):
                continue
            if any(part in EXCLUDE_DIR_NAMES for part in path.parts):
                continue
            files.append(path)
    return sorted(files)


def strip_code_blocks(text: str) -> str:
    return FENCED_CODE_BLOCK_RE.sub("", text)


def extract_heading_ids(text: str) -> set[str]:
    ids: set[str] = set()
    slug_counts: dict[str, int] = {}
    for line in text.splitlines():
        match = HEADING_RE.match(line)
        if not match:
            continue
        heading_text = match.group(2).strip()

        explicit = EXPLICIT_ID_RE.search(heading_text)
        if explicit:
            ids.add(explicit.group(1))
            continue

        slug = slugify(heading_text)
        if not slug:
            continue
        if slug in slug_counts:
            slug_counts[slug] += 1
            ids.add(f"{slug}-{slug_counts[slug]}")
        else:
            slug_counts[slug] = 0
            ids.add(slug)
    return ids


def extract_anchor_links(text: str) -> list[str]:
    return ANCHOR_LINK_RE.findall(text)


def collect_anchor_cases() -> list[tuple[Path, str]]:
    cases = []
    for path in find_content_files():
        raw = path.read_text(encoding="utf-8")
        body = strip_code_blocks(raw)
        for anchor in extract_anchor_links(body):
            cases.append((path, anchor))
    return cases


ANCHOR_CASES = collect_anchor_cases()


@pytest.mark.parametrize(
    "path,anchor",
    ANCHOR_CASES,
    ids=[f"{p.relative_to(REPO_ROOT)}#{a}" for p, a in ANCHOR_CASES],
)
def test_in_page_anchor_resolves(path: Path, anchor: str):
    text = strip_code_blocks(path.read_text(encoding="utf-8"))
    valid_ids = extract_heading_ids(text)
    assert anchor in valid_ids, (
        f"{path.relative_to(REPO_ROOT)}: link to '#{anchor}' does not match any "
        f"heading/id in this file. Known ids: {sorted(valid_ids)}"
    )


def test_found_anchor_links_to_check():
    """Sanity check that the scan itself is actually finding link cases."""
    assert len(ANCHOR_CASES) > 0
