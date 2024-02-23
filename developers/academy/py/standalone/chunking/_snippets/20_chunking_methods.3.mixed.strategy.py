# START Asciidoc and size based chunking
from typing import List

# END Asciidoc and size based chunking


# ========================================
# ======= MIXED-STRATEGY CHUNKING =========
# ========================================

# START Asciidoc and size based chunking
# Get source data
import requests

url = "https://raw.githubusercontent.com/progit/progit2/main/book/01-introduction/sections/what-is-git.asc"
source_text = requests.get(url).text

# Split the text by Asciidoc marker
chunks = source_text.split("\n==")

# Chunking
new_chunks = list()
chunk_buffer = ""
min_length = 25

for chunk in chunks:
    new_buffer = chunk_buffer + chunk  # Create new buffer
    new_buffer_words = new_buffer.split(" ")  # Split into words
    if len(new_buffer_words) < min_length:  # Check whether buffer length too small
        chunk_buffer = new_buffer  # Carry over to the next chunk
    else:
        new_chunks.append(new_buffer)  # Add to chunks
        chunk_buffer = ""

if len(chunk_buffer) > 0:
    new_chunks.append(chunk_buffer)  # Add last chunk, if necessary

# Print outputs to screen
for i in range(3):
    print(f"Chunk {i+1}: {repr(new_chunks[i])}")
# END Asciidoc and size based chunking


"""
# START Mixed-strategy chunking output
Chunk 1: "[[what_is_git_section]]= What is Git?\n\nSo, what is Git in a nutshell?\nThis is an important section to absorb, because if you understand what Git is and the fundamentals of how it works, then using Git effectively will probably be much easier for you.\nAs you learn Git, try to clear your mind of the things you may know about other VCSs, such as CVS, Subversion or Perforce -- doing so will help you avoid subtle confusion when using the tool.\nEven though Git's user interface is fairly similar to these other VCSs, Git stores and thinks about information in a very different way, and understanding these differences will help you avoid becoming confused while using it.(((Subversion)))(((Perforce)))\n"
Chunk 2: "== Snapshots, Not Differences\n\nThe major difference between Git and any other VCS (Subversion and friends included) is the way Git thinks about its data.\nConceptually, most other systems store information as a list of file-based changes.\nThese other systems (CVS, Subversion, Perforce, Bazaar, and so on) think of the information they store as a set of files and the changes made to each file over time (this is commonly described as _delta-based_ version control).\n\n.Storing data as changes to a base version of each file\nimage::images/deltas.png[Storing data as changes to a base version of each file]\n\nGit doesn't think of or store its data this way.\nInstead, Git thinks of its data more like a series of snapshots of a miniature filesystem.\nWith Git, every time you commit, or save the state of your project, Git basically takes a picture of what all your files look like at that moment and stores a reference to that snapshot.\nTo be efficient, if files have not changed, Git doesn't store the file again, just a link to the previous identical file it has already stored.\nGit thinks about its data more like a *stream of snapshots*.\n\n.Storing data as snapshots of the project over time\nimage::images/snapshots.png[Git stores data as snapshots of the project over time]\n\nThis is an important distinction between Git and nearly all other VCSs.\nIt makes Git reconsider almost every aspect of version control that most other systems copied from the previous generation.\nThis makes Git more like a mini filesystem with some incredibly powerful tools built on top of it, rather than simply a VCS.\nWe'll explore some of the benefits you gain by thinking of your data this way when we cover Git branching in <<ch03-git-branching#ch03-git-branching>>.\n"
Chunk 3: "== Nearly Every Operation Is Local\n\nMost operations in Git need only local files and resources to operate -- generally no information is needed from another computer on your network.\nIf you're used to a CVCS where most operations have that network latency overhead, this aspect of Git will make you think that the gods of speed have blessed Git with unworldly powers.\nBecause you have the entire history of the project right there on your local disk, most operations seem almost instantaneous.\n\nFor example, to browse the history of the project, Git doesn't need to go out to the server to get the history and display it for you -- it simply reads it directly from your local database.\nThis means you see the project history almost instantly.\nIf you want to see the changes introduced between the current version of a file and the file a month ago, Git can look up the file a month ago and do a local difference calculation, instead of having to either ask a remote server to do it or pull an older version of the file from the remote server to do it locally.\n\nThis also means that there is very little you can't do if you're offline or off VPN.\nIf you get on an airplane or a train and want to do a little work, you can commit happily (to your _local_ copy, remember?) until you get to a network connection to upload.\nIf you go home and can't get your VPN client working properly, you can still work.\nIn many other systems, doing so is either impossible or painful.\nIn Perforce, for example, you can't do much when you aren't connected to the server; in Subversion and CVS, you can edit files, but you can't commit changes to your database (because your database is offline).\nThis may not seem like a huge deal, but you may be surprised what a big difference it can make.\n"
# END Mixed-strategy chunking output
"""