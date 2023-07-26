# ============================
# ======= CHUNK DATA =========
# ============================

# START Get text objects from Pro Git book
def get_book_text_objects():
    import requests

    text_objs = list()
    api_base_url = 'https://api.github.com/repos/progit/progit2/contents/book'  # Book base URL
    section_urls = ['/01-introduction/sections', '/02-git-basics/sections']  # List of section URLs

    for section_url in section_urls:
        response = requests.get(api_base_url + section_url)  # Get the JSON data for the files in the section

        for file_info in response.json():
            if file_info['type'] == 'file':  # Only process files (not directories)
                file_response = requests.get(file_info['download_url'])

                # Build objects including metadata
                chapter_title = file_info['download_url'].split('/')[-3]
                filename = file_info['download_url'].split('/')[-1]
                text_obj = {
                    "body": file_response.text,
                    "chapter_title": chapter_title,
                    "filename": filename
                }
                text_objs.append(text_obj)
    return text_objs
# END Get text objects from Pro Git book


# START Get chunks - helper functions
from typing import List

def get_chunks_fixed_size_with_overlap(text: str, chunk_size: int, overlap_fraction: float) -> List[str]:
    text_words = text.split(" ")
    overlap_int = int(chunk_size * overlap_fraction)
    chunks = []
    for i in range(0, len(text_words), chunk_size):
        chunk = " ".join(text_words[max(i - overlap_int, 0): i + chunk_size])
        chunks.append(chunk)
    return chunks

def get_chunks_by_paragraph(source_text: str) -> List[str]:
    return source_text.split("\n\n")

def get_chunks_by_paragraph_and_min_length(source_text: str) -> List[str]:
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
    return new_chunks

def build_chunk_objs(book_text_obj, chunks):
    chunk_objs = list()
    for i, c in enumerate(chunks):
        chunk_obj = {
            "chapter_title": book_text_obj["chapter_title"],
            "filename": book_text_obj["filename"],
            "chunk": c,
            "chunk_index": i
        }
        chunk_objs.append(chunk_obj)
    return chunk_objs
# END Get chunks - helper functions

# START Get chunks - main body
book_text_objs = get_book_text_objects()

# Get multiple sets of chunks - according to chunking strategy
chunk_obj_sets = dict()
for book_text_obj in book_text_objs:
    text = book_text_obj["body"]  # Get the object's text body
    for strategy_name, chunks in [
        ["fixed_size_25", get_chunks_fixed_size_with_overlap(text, 25, 0.2)],
        ["fixed_size_100", get_chunks_fixed_size_with_overlap(text, 100, 0.2)],
        ["para_chunks", get_chunks_by_paragraph(text)],
        ["para_chunks_min_25", get_chunks_by_paragraph_and_min_length(text)]
    ]:
        chunk_objs = build_chunk_objs(book_text_obj, chunks)

        if strategy_name not in chunk_obj_sets.keys():
            chunk_obj_sets[strategy_name] = list()

        chunk_obj_sets[strategy_name] += chunk_objs
# END Get chunks - main body

"""
# START fixed_size_25 chunks
fixed_size_25
655 chunks in total
Chunk 0: '=== About Version Control\n\n(((version control)))\nWhat is "`version control`", and why should you care?\nVersion control is a system that records changes to a file or set'
Chunk 1: 'to a file or set of files over time so that you can recall specific versions later.\nFor the examples in this book, you will use software source code as the'
Chunk 2: 'software source code as the files being version controlled, though in reality you can do this with nearly any type of file on a computer.\n\nIf you are a graphic or'
# END fixed_size_25 chunks
# START fixed_size_100 chunks
fixed_size_100
170 chunks in total
Chunk 0: '=== About Version Control\n\n(((version control)))\nWhat is "`version control`", and why should you care?\nVersion control is a system that records changes to a file or set of files over time so that you can recall specific versions later.\nFor the examples in this book, you will use software source code as the files being version controlled, though in reality you can do this with nearly any type of file on a computer.\n\nIf you are a graphic or web designer and want to keep every version of an image or layout (which you would most certainly want to), a Version Control System (VCS)'
Chunk 1: "keep every version of an image or layout (which you would most certainly want to), a Version Control System (VCS) is a very wise thing to use.\nIt allows you to revert selected files back to a previous state, revert the entire project back to a previous state, compare changes over time, see who last modified something that might be causing a problem, who introduced an issue and when, and more.\nUsing a VCS also generally means that if you screw things up or lose files, you can easily recover.\nIn addition, you get all this for very little overhead.\n\n==== Local Version Control Systems\n\n(((version control,local)))\nMany people's version-control method of choice is to copy files into another directory (perhaps a time-stamped directory, if they're"
Chunk 2: "Systems\n\n(((version control,local)))\nMany people's version-control method of choice is to copy files into another directory (perhaps a time-stamped directory, if they're clever).\nThis approach is very common because it is so simple, but it is also incredibly error prone.\nIt is easy to forget which directory you're in and accidentally write to the wrong file or copy over files you don't mean to.\n\nTo deal with this issue, programmers long ago developed local VCSs that had a simple database that kept all the changes to files under revision control.\n\n.Local version control diagram\nimage::images/local.png[Local version control diagram]\n\nOne of the most popular VCS tools was a system called RCS, which is still distributed with many computers today.\nhttps://www.gnu.org/software/rcs/[RCS^] works by keeping patch sets (that is, the differences between"
# END fixed_size_100 chunks
# START para_chunks chunks
para_chunks
549 chunks in total
Chunk 0: '=== About Version Control'
Chunk 1: '(((version control)))\nWhat is "`version control`", and why should you care?\nVersion control is a system that records changes to a file or set of files over time so that you can recall specific versions later.\nFor the examples in this book, you will use software source code as the files being version controlled, though in reality you can do this with nearly any type of file on a computer.'
Chunk 2: 'If you are a graphic or web designer and want to keep every version of an image or layout (which you would most certainly want to), a Version Control System (VCS) is a very wise thing to use.\nIt allows you to revert selected files back to a previous state, revert the entire project back to a previous state, compare changes over time, see who last modified something that might be causing a problem, who introduced an issue and when, and more.\nUsing a VCS also generally means that if you screw things up or lose files, you can easily recover.\nIn addition, you get all this for very little overhead.'
# END para_chunks chunks
# START para_chunks_min_25 chunks
para_chunks_min_25
93 chunks in total
Chunk 0: '=== About Version Control\n\n(((version control)))\nWhat is "`version control`", and why should you care?\nVersion control is a system that records changes to a file or set of files over time so that you can recall specific versions later.\nFor the examples in this book, you will use software source code as the files being version controlled, though in reality you can do this with nearly any type of file on a computer.\n\nIf you are a graphic or web designer and want to keep every version of an image or layout (which you would most certainly want to), a Version Control System (VCS) is a very wise thing to use.\nIt allows you to revert selected files back to a previous state, revert the entire project back to a previous state, compare changes over time, see who last modified something that might be causing a problem, who introduced an issue and when, and more.\nUsing a VCS also generally means that if you screw things up or lose files, you can easily recover.\nIn addition, you get all this for very little overhead.\n'
Chunk 1: "== Local Version Control Systems\n\n(((version control,local)))\nMany people's version-control method of choice is to copy files into another directory (perhaps a time-stamped directory, if they're clever).\nThis approach is very common because it is so simple, but it is also incredibly error prone.\nIt is easy to forget which directory you're in and accidentally write to the wrong file or copy over files you don't mean to.\n\nTo deal with this issue, programmers long ago developed local VCSs that had a simple database that kept all the changes to files under revision control.\n\n.Local version control diagram\nimage::images/local.png[Local version control diagram]\n\nOne of the most popular VCS tools was a system called RCS, which is still distributed with many computers today.\nhttps://www.gnu.org/software/rcs/[RCS^] works by keeping patch sets (that is, the differences between files) in a special format on disk; it can then re-create what any file looked like at any point in time by adding up all the patches.\n"
Chunk 2: "== Centralized Version Control Systems\n\n(((version control,centralized)))\nThe next major issue that people encounter is that they need to collaborate with developers on other systems.\nTo deal with this problem, Centralized Version Control Systems (CVCSs) were developed.\nThese systems (such as CVS, Subversion, and Perforce) have a single server that contains all the versioned files, and a number of clients that check out files from that central place.(((CVS)))(((Subversion)))(((Perforce)))\nFor many years, this has been the standard for version control.\n\n.Centralized version control diagram\nimage::images/centralized.png[Centralized version control diagram]\n\nThis setup offers many advantages, especially over local VCSs.\nFor example, everyone knows to a certain degree what everyone else on the project is doing.\nAdministrators have fine-grained control over who can do what, and it's far easier to administer a CVCS than it is to deal with local databases on every client.\n\nHowever, this setup also has some serious downsides.\nThe most obvious is the single point of failure that the centralized server represents.\nIf that server goes down for an hour, then during that hour nobody can collaborate at all or save versioned changes to anything they're working on.\nIf the hard disk the central database is on becomes corrupted, and proper backups haven't been kept, you lose absolutely everything -- the entire history of the project except whatever single snapshots people happen to have on their local machines.\nLocal VCSs suffer from this same problem -- whenever you have the entire history of the project in a single place, you risk losing everything.\n"
# END para_chunks_min_25 chunks
"""

# =====================================
# ======= IMPORT CHUNKED DATA =========
# =====================================


# START import chunks
import weaviate
import os
from weaviate.util import generate_uuid5

client = weaviate.Client(
    "http://localhost:8080",
    additional_headers={
        "X-OpenAI-Api-Key": os.environ["OPENAI_APIKEY"],
    }
)

chunk_class_definition = {
    "class": "Chunk",
    "vectorizer": "text2vec-openai",
    "moduleConfig": {
        "generative-openai": {}
    },
    "properties": [
        {
            "name": "chunking_strategy",
            "tokenization": "field"
        }
    ]
}
client.schema.create_class(chunk_class_definition)

with client.batch() as batch:
    for chunking_strategy, chunk_objects in chunk_obj_sets.items():
        for chunk_obj in chunk_objects:
            chunk_obj["chunking_strategy"] = chunking_strategy
            batch.add_data_object(
                data_object=chunk_obj,
                class_name="Chunk",
                uuid=generate_uuid5(chunk_obj)
            )
# END import chunks

# START inspection
print(client.query.aggregate("Chunk").with_meta_count().do())  # Get a total count
for chunking_strategy in chunk_obj_sets.keys():
    where_filter = {
        "path": ["chunking_strategy"],
        "operator": "Equal",
        "valueText": chunking_strategy
    }
    strategy_count = (
        client.query.aggregate("Chunk")
        .with_where(where_filter)
        .with_meta_count().do()
    )
    print(strategy_count)  # Get a total count
# END inspection