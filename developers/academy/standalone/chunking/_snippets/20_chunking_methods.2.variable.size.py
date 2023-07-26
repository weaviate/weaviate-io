# START Paragraph variable size chunker  # START Asciidoc section variable size chunker
from typing import List

# END Paragraph variable size chunker  # END Asciidoc section variable size chunker


# ========================================
# ======= VARIABLE-SIZE CHUNKING =========
# ========================================

# START Paragraph variable size chunker
# Split the text into paragraphs
def get_chunks_by_paragraph(source_text: str) -> List[str]:
    return source_text.split("\n\n")
# END Paragraph variable size chunker

# START Asciidoc section variable size chunker
# Split the text by Asciidoc section markers
def get_chunks_by_asciidoc_sections(source_text: str) -> List[str]:
    return source_text.split("\n==")
# END Asciidoc section variable size chunker

# START Header variable size chunker
# Get source data
import requests

url = "https://raw.githubusercontent.com/progit/progit2/main/book/01-introduction/sections/what-is-git.asc"
source_text = requests.get(url).text

# Split the text into paragraphs
chunks = source_text.split("\n====")
# END Header variable size chunker

# START Get variable-size chunks examples
# Get source data
import requests

url = "https://raw.githubusercontent.com/progit/progit2/main/book/01-introduction/sections/what-is-git.asc"
source_text = requests.get(url).text

# Chunk text by particular marker
for marker in ["\n\n", "\n=="]:
    chunks = source_text.split(marker)
    # Print outputs to screen
    print(f"\nUsing the marker: {repr(marker)} - {len(chunks)} chunks returned.")
    for i in range(3):
        print(f"Chunk {i+1}: {repr(chunks[i])}")
# END Get variable-size chunks examples


"""
# START Chunking by paragraph - outputs
Using the marker: '\n\n' - 31 chunks returned.
Chunk 1: '[[what_is_git_section]]\n=== What is Git?'
Chunk 2: "So, what is Git in a nutshell?\nThis is an important section to absorb, because if you understand what Git is and the fundamentals of how it works, then using Git effectively will probably be much easier for you.\nAs you learn Git, try to clear your mind of the things you may know about other VCSs, such as CVS, Subversion or Perforce -- doing so will help you avoid subtle confusion when using the tool.\nEven though Git's user interface is fairly similar to these other VCSs, Git stores and thinks about information in a very different way, and understanding these differences will help you avoid becoming confused while using it.(((Subversion)))(((Perforce)))"
Chunk 3: '==== Snapshots, Not Differences'
# END Chunking by paragraph - outputs

# START Chunking by header - outputs
Using the marker: '\n==' - 7 chunks returned.
Chunk 1: '[[what_is_git_section]]'
Chunk 2: "= What is Git?\n\nSo, what is Git in a nutshell?\nThis is an important section to absorb, because if you understand what Git is and the fundamentals of how it works, then using Git effectively will probably be much easier for you.\nAs you learn Git, try to clear your mind of the things you may know about other VCSs, such as CVS, Subversion or Perforce -- doing so will help you avoid subtle confusion when using the tool.\nEven though Git's user interface is fairly similar to these other VCSs, Git stores and thinks about information in a very different way, and understanding these differences will help you avoid becoming confused while using it.(((Subversion)))(((Perforce)))\n"
Chunk 3: "== Snapshots, Not Differences\n\nThe major difference between Git and any other VCS (Subversion and friends included) is the way Git thinks about its data.\nConceptually, most other systems store information as a list of file-based changes.\nThese other systems (CVS, Subversion, Perforce, Bazaar, and so on) think of the information they store as a set of files and the changes made to each file over time (this is commonly described as _delta-based_ version control).\n\n.Storing data as changes to a base version of each file\nimage::images/deltas.png[Storing data as changes to a base version of each file]\n\nGit doesn't think of or store its data this way.\nInstead, Git thinks of its data more like a series of snapshots of a miniature filesystem.\nWith Git, every time you commit, or save the state of your project, Git basically takes a picture of what all your files look like at that moment and stores a reference to that snapshot.\nTo be efficient, if files have not changed, Git doesn't store the file again, just a link to the previous identical file it has already stored.\nGit thinks about its data more like a *stream of snapshots*.\n\n.Storing data as snapshots of the project over time\nimage::images/snapshots.png[Git stores data as snapshots of the project over time]\n\nThis is an important distinction between Git and nearly all other VCSs.\nIt makes Git reconsider almost every aspect of version control that most other systems copied from the previous generation.\nThis makes Git more like a mini filesystem with some incredibly powerful tools built on top of it, rather than simply a VCS.\nWe'll explore some of the benefits you gain by thinking of your data this way when we cover Git branching in <<ch03-git-branching#ch03-git-branching>>.\n"
# END Chunking by header - outputs
"""

