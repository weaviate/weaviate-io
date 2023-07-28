# START Fixed size chunker with overlap  # START Vanilla fixed size chunker  # START Get fixed-size chunks examples
from typing import List

# END Fixed size chunker with overlap  # END Vanilla fixed size chunker  # END Get fixed-size chunks examples

# ========================================
# ========== FIXED-SIZE CHUNKING =========
# ========================================

# START Vanilla fixed size chunker
# Split the text into units (words, in this case)
def word_splitter(source_text: str) -> List[str]:
    import re
    source_text = re.sub("\s+", " ", source_text)  # Replace multiple whitespces
    return re.split("\s", source_text)  # Split by single whitespace

def get_chunks_fixed_size(text: str, chunk_size: int) -> List[str]:
    text_words = word_splitter(text)
    chunks = []
    for i in range(0, len(text_words), chunk_size):
        chunk_words = text_words[i: i + chunk_size]
        chunk = " ".join(chunk_words)
        chunks.append(chunk)
    return chunks
# END Vanilla fixed size chunker

# START Fixed size chunker with overlap
# Split the text into units (words, in this case)
def word_splitter(source_text: str) -> List[str]:
    import re
    source_text = re.sub("\s+", " ", source_text)  # Replace multiple whitespces
    return re.split("\s", source_text)  # Split by single whitespace

def get_chunks_fixed_size_with_overlap(text: str, chunk_size: int, overlap_fraction: float) -> List[str]:
    text_words = word_splitter(text)
    overlap_int = int(chunk_size * overlap_fraction)
    chunks = []
    for i in range(0, len(text_words), chunk_size):
        chunk_words = text_words[max(i - overlap_int, 0): i + chunk_size]
        chunk = " ".join(chunk_words)
        chunks.append(chunk)
    return chunks
# END Fixed size chunker with overlap

# START Get fixed-size chunks examples
# Get source data
import requests

url = "https://raw.githubusercontent.com/progit/progit2/main/book/01-introduction/sections/what-is-git.asc"
source_text = requests.get(url).text

# Chunk text by number of words
for chosen_size in [5, 25, 100]:
    chunks = get_chunks_fixed_size_with_overlap(source_text, chosen_size, overlap_fraction=0.2)
    # Print outputs to screen
    print(f"\nSize {chosen_size} - {len(chunks)} chunks returned.")
    for i in range(3):
        print(f"Chunk {i+1}: {chunks[i]}")
# END Get fixed-size chunks examples


"""
# START Chunking by 5 words - outputs
Size 5 - 281 chunks returned.
Chunk 1: [[what_is_git_section]] === What is Git?
Chunk 2: Git? So, what is Git in
Chunk 3: in a nutshell? This is an
# END Chunking by 5 words - outputs

# START Chunking by 25 words - outputs
Size 25 - 57 chunks returned.
Chunk 1: [[what_is_git_section]] === What is Git? So, what is Git in a nutshell? This is an important section to absorb, because if you understand what Git
Chunk 2: if you understand what Git is and the fundamentals of how it works, then using Git effectively will probably be much easier for you. As you learn Git, try to
Chunk 3: you learn Git, try to clear your mind of the things you may know about other VCSs, such as CVS, Subversion or Perforce -- doing so will help you avoid
# END Chunking by 25 words - outputs

# START Chunking by 100 words - outputs
Size 100 - 15 chunks returned.
Chunk 1: [[what_is_git_section]] === What is Git? So, what is Git in a nutshell? This is an important section to absorb, because if you understand what Git is and the fundamentals of how it works, then using Git effectively will probably be much easier for you. As you learn Git, try to clear your mind of the things you may know about other VCSs, such as CVS, Subversion or Perforce -- doing so will help you avoid subtle confusion when using the tool. Even though Git's user interface is fairly similar to these other VCSs, Git stores and thinks about information in
Chunk 2: tool. Even though Git's user interface is fairly similar to these other VCSs, Git stores and thinks about information in a very different way, and understanding these differences will help you avoid becoming confused while using it.(((Subversion)))(((Perforce))) ==== Snapshots, Not Differences The major difference between Git and any other VCS (Subversion and friends included) is the way Git thinks about its data. Conceptually, most other systems store information as a list of file-based changes. These other systems (CVS, Subversion, Perforce, Bazaar, and so on) think of the information they store as a set of files and the changes made to each file over time (this is commonly described as _delta-based_ version control). .Storing data as changes to a base version
Chunk 3: each file over time (this is commonly described as _delta-based_ version control). .Storing data as changes to a base version of each file image::images/deltas.png[Storing data as changes to a base version of each file] Git doesn't think of or store its data this way. Instead, Git thinks of its data more like a series of snapshots of a miniature filesystem. With Git, every time you commit, or save the state of your project, Git basically takes a picture of what all your files look like at that moment and stores a reference to that snapshot. To be efficient, if files have not changed, Git doesn't store the file again, just a link to the previous identical file it has already
# END Chunking by 100 words - outputs
"""

