# ============================
# ======= CHUNK DATA =========
# ============================

# START Get text objects from Pro Git book
def get_book_text_objects():
    import requests

    # Source location
    text_objs = list()
    api_base_url = 'https://api.github.com/repos/progit/progit2/contents/book'  # Book base URL
    chapter_urls = ['/01-introduction/sections', '/02-git-basics/sections']  # List of section URLs

    # Loop through book chapters
    for chapter_url in chapter_urls:
        response = requests.get(api_base_url + chapter_url)  # Get the JSON data for the section files in the chapter

        # Loop through inner files (sections)
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

def word_splitter(source_text: str) -> List[str]:
    import re
    source_text = re.sub("\s+", " ", source_text)  # Replace multiple whitespces
    return re.split("\s", source_text)  # Split by single whitespace

def get_chunks_fixed_size_with_overlap(text: str, chunk_size: int, overlap_fraction: float) -> List[str]:
    text_words = word_splitter(text)
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

    # Loop through chunking strategies:
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

chunk_collection_definition = {
    "class": "Chunk",
    "vectorizer": "text2vec-openai",
    "moduleConfig": {
        "generative-openai": {}
    },
    "properties": [
        {
            "name": "chunk",
            "dataType": ["text"],
        },
        {
            "name": "chapter_title",
            "dataType": ["text"],
        },
        {
            "name": "filename",
            "dataType": ["text"],
        },
        {
            "name": "chunking_strategy",
            "dataType": ["text"],
            "tokenization": "field",
        }
    ]
}
client.schema.create_class(chunk_collection_definition)

with client.batch as batch:
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
print("Total count:")
print(client.query.aggregate("Chunk").with_meta_count().do())  # Get a total count
for chunking_strategy in chunk_obj_sets.keys():
    where_filter = {
        "path": ["chunking_strategy"],
        "operator": "Equal",
        "valueText": chunking_strategy
    }
    print(f"Object count for {chunking_strategy}")
    strategy_count = (
        client.query.aggregate("Chunk")
        .with_where(where_filter)
        .with_meta_count().do()
    )
    print(strategy_count)  # Get a count for each strategy
# END inspection

"""
# START Inspection output
Total count:
{'data': {'Aggregate': {'Chunk': [{'meta': {'count': 1487}}]}}}
Object count for fixed_size_25
{'data': {'Aggregate': {'Chunk': [{'meta': {'count': 672}}]}}}
Object count for fixed_size_100
{'data': {'Aggregate': {'Chunk': [{'meta': {'count': 173}}]}}}
Object count for para_chunks
{'data': {'Aggregate': {'Chunk': [{'meta': {'count': 549}}]}}}
Object count for para_chunks_min_25
{'data': {'Aggregate': {'Chunk': [{'meta': {'count': 93}}]}}}
# END Inspection output
"""


# ===============================
# ======= VECTOR SEARCH =========
# ===============================

def parse_result(response_object):
    return response_object["data"]["Get"]["Chunk"]

# START vector_search
search_string = "history of git"  # Or "available git remote commands"

for chunking_strategy in chunk_obj_sets.keys():
    where_filter = {
        "path": ["chunking_strategy"],
        "operator": "Equal",
        "valueText": chunking_strategy
    }
    # END vector_search
    print(f'\n{"="*20}')
    print(f"Retrieved objects for {chunking_strategy}")
    # START vector_search
    response = (
        client.query.get("Chunk", ["chunk"])
        .with_near_text({"concepts": [search_string]})
        .with_where(where_filter)
        .with_limit(2)
        .do()
    )
    # END vector_search
    for i, chunk_obj in enumerate(parse_result(response)):
        print(f'{"="*5} Object {i} {"="*5}')
        print(chunk_obj["chunk"])
# END vector_search



"""
# START fixed_size_25 vector_search_history
====================
Retrieved objects for fixed_size_25
===== Object 0 =====
=== A Short History of Git As with many great things in life, Git began with a bit of creative destruction and fiery controversy. The
===== Object 1 =====
kernel efficiently (speed and data size) Since its birth in 2005, Git has evolved and matured to be easy to use and yet retain these initial qualities. It's amazingly fast,
# END fixed_size_25 vector_search_history

# START fixed_size_100 vector_search_history
====================
Retrieved objects for fixed_size_100
===== Object 0 =====
=== A Short History of Git As with many great things in life, Git began with a bit of creative destruction and fiery controversy. The Linux kernel is an open source software project of fairly large scope.(((Linux))) During the early years of the Linux kernel maintenance (1991–2002), changes to the software were passed around as patches and archived files. In 2002, the Linux kernel project began using a proprietary DVCS called BitKeeper.(((BitKeeper))) In 2005, the relationship between the community that developed the Linux kernel and the commercial company that developed BitKeeper broke down, and the tool's free-of-charge status was revoked.
===== Object 1 =====
2005, Git has evolved and matured to be easy to use and yet retain these initial qualities. It's amazingly fast, it's very efficient with large projects, and it has an incredible branching system for non-linear development (see <<ch03-git-branching#ch03-git-branching>>).
# END fixed_size_100 vector_search_history

# START para_chunks vector_search_history
====================
Retrieved objects for para_chunks
===== Object 0 =====
Since its birth in 2005, Git has evolved and matured to be easy to use and yet retain these initial qualities.
It's amazingly fast, it's very efficient with large projects, and it has an incredible branching system for non-linear development (see <<ch03-git-branching#ch03-git-branching>>).

===== Object 1 =====
As with many great things in life, Git began with a bit of creative destruction and fiery controversy.
# END para_chunks vector_search_history

# START para_chunks_min_25 vector_search_history
====================
Retrieved objects for para_chunks_min_25
===== Object 0 =====
=== A Short History of Git

As with many great things in life, Git began with a bit of creative destruction and fiery controversy.

The Linux kernel is an open source software project of fairly large scope.(((Linux)))
During the early years of the Linux kernel maintenance (1991–2002), changes to the software were passed around as patches and archived files.
In 2002, the Linux kernel project began using a proprietary DVCS called BitKeeper.(((BitKeeper)))

In 2005, the relationship between the community that developed the Linux kernel and the commercial company that developed BitKeeper broke down, and the tool's free-of-charge status was revoked.
This prompted the Linux development community (and in particular Linus Torvalds, the creator of Linux) to develop their own tool based on some of the lessons they learned while using BitKeeper.(((Linus Torvalds)))
Some of the goals of the new system were as follows:

* Speed
* Simple design
* Strong support for non-linear development (thousands of parallel branches)
* Fully distributed
* Able to handle large projects like the Linux kernel efficiently (speed and data size)

Since its birth in 2005, Git has evolved and matured to be easy to use and yet retain these initial qualities.
It's amazingly fast, it's very efficient with large projects, and it has an incredible branching system for non-linear development (see <<ch03-git-branching#ch03-git-branching>>).

===== Object 1 =====
== Nearly Every Operation Is Local

Most operations in Git need only local files and resources to operate -- generally no information is needed from another computer on your network.
If you're used to a CVCS where most operations have that network latency overhead, this aspect of Git will make you think that the gods of speed have blessed Git with unworldly powers.
Because you have the entire history of the project right there on your local disk, most operations seem almost instantaneous.

For example, to browse the history of the project, Git doesn't need to go out to the server to get the history and display it for you -- it simply reads it directly from your local database.
This means you see the project history almost instantly.
If you want to see the changes introduced between the current version of a file and the file a month ago, Git can look up the file a month ago and do a local difference calculation, instead of having to either ask a remote server to do it or pull an older version of the file from the remote server to do it locally.

This also means that there is very little you can't do if you're offline or off VPN.
If you get on an airplane or a train and want to do a little work, you can commit happily (to your _local_ copy, remember?) until you get to a network connection to upload.
If you go home and can't get your VPN client working properly, you can still work.
In many other systems, doing so is either impossible or painful.
In Perforce, for example, you can't do much when you aren't connected to the server; in Subversion and CVS, you can edit files, but you can't commit changes to your database (because your database is offline).
This may not seem like a huge deal, but you may be surprised what a big difference it can make.
# END para_chunks_min_25 vector_search_history
"""

"""
# START fixed_size_25 vector_search_remote_repo
====================
Retrieved objects for fixed_size_25
===== Object 0 =====
remote))) To add a new remote Git repository as a shortname you can reference easily, run `git remote add <shortname> <url>`: [source,console] ---- $ git remote origin $ git remote
===== Object 1 =====
to and from them when you need to share work. Managing remote repositories includes knowing how to add remote repositories, remove remotes that are no longer valid, manage various remote
# END fixed_size_25 vector_search_remote_repo

# START fixed_size_100 vector_search_remote_repo
====================
Retrieved objects for fixed_size_100
===== Object 0 =====
adds the `origin` remote for you. Here's how to add a new remote explicitly.(((git commands, remote))) To add a new remote Git repository as a shortname you can reference easily, run `git remote add <shortname> <url>`: [source,console] ---- $ git remote origin $ git remote add pb https://github.com/paulboone/ticgit $ git remote -v origin https://github.com/schacon/ticgit (fetch) origin https://github.com/schacon/ticgit (push) pb https://github.com/paulboone/ticgit (fetch) pb https://github.com/paulboone/ticgit (push) ---- Now you can use the string `pb` on the command line in lieu of the whole URL. For example, if you want to fetch all the information that Paul has but that you don't yet have in your repository, you can run `git fetch pb`: [source,console] ---- $ git fetch pb remote: Counting objects: 43,
===== Object 1 =====
Managing remote repositories includes knowing how to add remote repositories, remove remotes that are no longer valid, manage various remote branches and define them as being tracked or not, and more. In this section, we'll cover some of these remote-management skills. [NOTE] .Remote repositories can be on your local machine. ==== It is entirely possible that you can be working with a "`remote`" repository that is, in fact, on the same host you are. The word "`remote`" does not necessarily imply that the repository is somewhere else on the network or Internet, only that it is elsewhere. Working with such a remote repository would still involve all the standard pushing, pulling and fetching operations as with any other remote. ====
# END fixed_size_100 vector_search_remote_repo

# START para_chunks vector_search_remote_repo
====================
Retrieved objects for para_chunks
===== Object 0 =====
We've mentioned and given some demonstrations of how the `git clone` command implicitly adds the `origin` remote for you.
Here's how to add a new remote explicitly.(((git commands, remote)))
To add a new remote Git repository as a shortname you can reference easily, run `git remote add <shortname> <url>`:
===== Object 1 =====
To be able to collaborate on any Git project, you need to know how to manage your remote repositories.
Remote repositories are versions of your project that are hosted on the Internet or network somewhere.
You can have several of them, each of which generally is either read-only or read/write for you.
Collaborating with others involves managing these remote repositories and pushing and pulling data to and from them when you need to share work.
Managing remote repositories includes knowing how to add remote repositories, remove remotes that are no longer valid, manage various remote branches and define them as being tracked or not, and more.
In this section, we'll cover some of these remote-management skills.
# END para_chunks vector_search_remote_repo

# START para_chunks_min_25 vector_search_remote_repo
====================
Retrieved objects for para_chunks_min_25
===== Object 0 =====
== Adding Remote Repositories

We've mentioned and given some demonstrations of how the `git clone` command implicitly adds the `origin` remote for you.
Here's how to add a new remote explicitly.(((git commands, remote)))
To add a new remote Git repository as a shortname you can reference easily, run `git remote add <shortname> <url>`:

[source,console]
----
$ git remote
origin
$ git remote add pb https://github.com/paulboone/ticgit
$ git remote -v
origin	https://github.com/schacon/ticgit (fetch)
origin	https://github.com/schacon/ticgit (push)
pb	https://github.com/paulboone/ticgit (fetch)
pb	https://github.com/paulboone/ticgit (push)
----

Now you can use the string `pb` on the command line in lieu of the whole URL.
For example, if you want to fetch all the information that Paul has but that you don't yet have in your repository, you can run `git fetch pb`:

[source,console]
----
$ git fetch pb
remote: Counting objects: 43, done.
remote: Compressing objects: 100% (36/36), done.
remote: Total 43 (delta 10), reused 31 (delta 5)
Unpacking objects: 100% (43/43), done.
From https://github.com/paulboone/ticgit
 * [new branch]      master     -> pb/master
 * [new branch]      ticgit     -> pb/ticgit
----

Paul's `master` branch is now accessible locally as `pb/master` -- you can merge it into one of your branches, or you can check out a local branch at that point if you want to inspect it.
We'll go over what branches are and how to use them in much more detail in <<ch03-git-branching#ch03-git-branching>>.

[[_fetching_and_pulling]]
===== Object 1 =====
[[_remote_repos]]= Working with Remotes

To be able to collaborate on any Git project, you need to know how to manage your remote repositories.
Remote repositories are versions of your project that are hosted on the Internet or network somewhere.
You can have several of them, each of which generally is either read-only or read/write for you.
Collaborating with others involves managing these remote repositories and pushing and pulling data to and from them when you need to share work.
Managing remote repositories includes knowing how to add remote repositories, remove remotes that are no longer valid, manage various remote branches and define them as being tracked or not, and more.
In this section, we'll cover some of these remote-management skills.

[NOTE]
.Remote repositories can be on your local machine.
# END para_chunks_min_25 vector_search_remote_repo
"""


# ===================================
# ======= GENERATIVE SEARCH =========
# ===================================

# START generative_search
# Set number of chunks to retrieve to compensate for different chunk sizes
n_chunks_by_strat = dict()
# Grab more of shorter chunks
n_chunks_by_strat['fixed_size_25'] = 8
n_chunks_by_strat['para_chunks'] = 8
# Grab fewer of longer chunks
n_chunks_by_strat['fixed_size_100'] = 2
n_chunks_by_strat['para_chunks_min_25'] = 2

# Perform generative search
# highlight-start
search_string = "history of git"  # Or "available git remote commands"
# highlight-end

for chunking_strategy in chunk_obj_sets.keys():
    where_filter = {
        "path": ["chunking_strategy"],
        "operator": "Equal",
        "valueText": chunking_strategy
    }
    # END generative_search
    print(f'\n{"="*20}')
    print(f"Generated text for {chunking_strategy}")
    # START generative_search
    response = (
        client.query.get("Chunk", ["chunk"])
        .with_near_text({"concepts": [search_string]})
        # highlight-start
        .with_generate(
            grouped_task=f"Using this information, please explain {search_string} in a few short points"
        )
        # highlight-end
        .with_where(where_filter)
        # highlight-start
        .with_limit(n_chunks_by_strat[chunking_strategy])  # Variable number of chunks retrieved
        # highlight-end
        .do()
    )
    # END generative_search
    print(response["data"]["Get"]["Chunk"][0]["_additional"]["generate"]["groupedResult"])
# END generative_search


"""
====================
# START fixed_size_25 generative_search_git_history
Generated text for fixed_size_25
- Git was created in 2005 as a result of creative destruction and controversy.
- It was designed to handle the Linux kernel efficiently in terms of speed and data size.
- Over time, Git has evolved to be easy to use while retaining its initial qualities.
- Git reconsiders many aspects of version control, making it more like a mini filesystem with powerful tools.
- Git stores the entire history of a project locally, allowing for fast and instantaneous operations.
# END fixed_size_25 generative_search_git_history

====================
# START fixed_size_100 generative_search_git_history
Generated text for fixed_size_100
- In the early years of the Linux kernel maintenance (1991-2002), changes to the software were passed around as patches and archived files.
- In 2002, the Linux kernel project started using a proprietary DVCS called BitKeeper.
- In 2005, the relationship between the Linux kernel community and the company behind BitKeeper broke down, leading to the revocation of the tool's free-of-charge status.
- Since then, Git has evolved and matured, becoming easy to use while retaining its initial qualities. It is known for its speed, efficiency with large projects, and its powerful branching system for non-linear development.
# END fixed_size_100 generative_search_git_history

====================
# START para_chunks generative_search_git_history
Generated text for para_chunks
- Git was created in 2005 and has since evolved and matured to be easy to use and efficient with large projects.
- Git has an incredibly fast performance and a powerful branching system for non-linear development.
- Git began with controversy and creative destruction.
- Git is fundamentally different from other version control systems (VCS) in the way it thinks about and stores data.
- Git operates mostly on local files and resources, making operations fast and efficient.
- Git has integrity and ensures the integrity of its data.
- Git is more like a mini filesystem with powerful tools built on top of it, rather than just a VCS.
# END para_chunks generative_search_git_history
====================

# START para_chunks_min_25 generative_search_git_history
Generated text for para_chunks_min_25
- Git was created in 2005 by the Linux development community, led by Linus Torvalds, after the breakdown of their relationship with the proprietary DVCS called BitKeeper.
- The goals of Git were to be fast, have a simple design, support non-linear development with thousands of parallel branches, be fully distributed, and handle large projects efficiently.
- Git has evolved and matured since its creation, becoming easy to use while retaining its initial qualities.
- One of the key advantages of Git is that nearly every operation is local, meaning that most operations can be performed without needing information from another computer on the network.
- This local nature of Git allows for fast and instantaneous operations, such as browsing the project history or comparing file versions.
- Being able to work offline or off VPN is also a significant advantage of Git, as it allows users to continue working and committing changes to their local copy until they have a network connection to upload.
# END para_chunks_min_25 generative_search_git_history
"""



"""
====================
# START fixed_size_25 generative_search_git_remote
Generated text for fixed_size_25
- `git fetch <remote>`: This command retrieves data from the remote repository specified by `<remote>`.
- `git remote show <remote>`: Running this command with a specific shortname, such as `origin`, displays information about the remote repository, including its branches and configuration.
- `git remote`: This command lists all the remote servers that have been configured for the repository.
- `git remote -v`: Similar to `git remote`, this command lists all the remote servers along with their URLs for fetching and pushing.
- `git clone`: This command is used to create a local copy of a remote repository. By default, it sets up the local `master` branch to track the remote repository's `master` branch.
- `git remote add <name> <url>`: This command adds a new remote repository with the specified `<name>` and `<url>`. This allows you to easily fetch and push changes to and from the remote repository.
- `git remote remove <name>`: This command removes the remote repository with the specified `<name>` from the local repository.
# END fixed_size_25 generative_search_git_remote

====================
# START fixed_size_100 generative_search_git_remote
Generated text for fixed_size_100
- The `git remote` command is used to see which remote servers are configured for the repository. It lists the shortnames of each remote handle that has been specified.
- The `git remote -v` command can be used to display more detailed information about the remote repositories, including the URLs for fetching and pushing.
- The `git clone` command automatically adds the `origin` remote when cloning a repository.
- To add a new remote explicitly, the `git remote add <name> <url>` command can be used. This allows for pulling and pushing to the specified remote repository.
# END fixed_size_100 generative_search_git_remote

====================
# START para_chunks generative_search_git_remote
Generated text for para_chunks
- The `git remote` command lists the shortnames of each remote handle that you have configured.
- The `git remote show <remote>` command provides more information about a particular remote.
- The `git remote -v` command shows the URLs associated with each remote.
- The `git remote add <shortname> <url>` command adds a new remote Git repository with a specified shortname and URL.
- The `git remote` command can be used to show all the remotes associated with a repository.
# END para_chunks generative_search_git_remote
====================

# START para_chunks_min_25 generative_search_git_remote
Generated text for para_chunks_min_25
- The `git remote` command is used to see which remote servers you have configured. It lists the shortnames of each remote handle you've specified.
- The `git remote -v` command shows the URLs that Git has stored for the shortname to be used when reading and writing to that remote.
- The `git remote show <remote>` command provides more information about a particular remote, including the URL for the remote repository, tracking branch information, and details about branches that can be automatically merged or pushed to.
# END para_chunks_min_25 generative_search_git_remote
"""

# TODO - needs tests