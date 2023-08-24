---
title: Commit Guidelines
sidebar_position: 7
image: og/contributor-guide/getting-started.jpg
# tags: ['contributor-guide']
---
## Introduction

When collaborating with git, each commit provides a frozen snapshot of work for you or others to review. It is good practice is to create a commit per "logical change", so that each commit represents a "unit" of work done.

You might have heard that changing one variable at a time during scientific experimentation makes the output and therefore its effect easier to interpret. In the same way, creating one commit per logical change or theme helps the maintainer understand and review your work. It will also create logical, isolated checkpoints from which changes can be integrated into other branches.

Another big part of creating good commits is writing good commit messages. Writing good commit messages helps the whole team. It will help others understand what you have done, and help you become a better software developer.

## Tips on writing good commit messages

* Be concise. This will speed up review, and thus the feedback loop.
* Be precise and specific, as to help people searching or navigating through the commit history.

Examples of **good commit messages** include:

* `add sitemap plugin to the website`
* `update ruby version to 2.7.5`
* `update version number dynamically`
* `fix typo in introduction to user guide`

Example of **bad commit messages**, with reasons, include:

* `Fixed typo in the doc` (which doc?)
* `Changed CSS style` (why? how?)
* `modified README.md` (why? how?)
* `Added search feature in the docs` (which files? how?)

Note: Some people prefer to use an imperative present tense in commit messages. There is [no consensus on this](https://stackoverflow.com/questions/3580013/should-i-use-past-or-present-tense-in-git-commit-messages), and is likely to be situational. The most important thing is to ensure that the substance of the changes are clear in the message. In other words, [don't do this](https://xkcd.com/1296/) 😉.

Taking time to write a consistent, specific, and accurate git commit messages will help the reader, who will thank you for it. This will often include your future self! So think of it as an investment where the return is based primarily on clarity of communication.

## Example commit message structure

One way to write good commit messages is to use a template structure. One structure would be to think of it like a GitHub issue, with three parts:

* Summary line
* Issue reference
* Description

### Summary Line:

Summary line are used throughout git. So try not to exceed 50 characters (while being informative), and put a blank line afterwards before the message body. This will help git parse the summary line correctly.

Example:

```text
add new blog "Why vector search is so fast"
```

### Issue reference

* If the commit fixes an issue, reference that issue using `#` symbol: "This PR fixes: #ISSUE_NUMBER.".

* The issue reference will add the commit link to the issue automatically.

Example:

```text
Why:
This PR fixes: #123
```

### Description

Every repository has a [pull request template](https://github.com/weaviate/weaviate-io/blob/main/.github/PULL_REQUEST_TEMPLATE.md) with a specific set of headers that you can use to write the body of commit messages. You can modify this template at the time of making a pull request and exclude the parts which is not necessary.

Example:

```text
What's being changed:

This pull request adds blog page feature to the documentation website,
where people can read about Weaviate's latest releases.
Blogs can be updated by adding markdown files to `_posts/blog/` folder.

Type of change:

[] Bug fix (non-breaking change which fixes an issue)
[x] Feature or enhancements (non-breaking change which adds functionality)
[] Documentation updates (non-breaking change which updates documents)

How Has This Been Tested?

This has been tested locally by building and running the site
```text

* Each description line must be no more than 75 characters long (there is no limit on number of lines).

* You should explain why the changes were made. This is especially important for complex, non-self-explanatory changes.

* You must select the type of change you made. Remove the irrelevant options from the list by putting a `x` in the square brackets in front of the type of change.

* The commit message is primarily for your and others' benefit, and they should be able to understand it both now and in the future.

* If the summary is self-explanatory, you can omit writing the description.

* Tests are essential, and you should describe how you tested your changes locally and whether you discovered any other breaking changes.
```

## More Examples
We include additional git commit message examples below:

* For a bugfix

```text
fix: static version number on quickstart page

Why:
This PR fixes: #103

What's being changed:

In quick-start.md file of every version, the version present in the example
didn't match the configuration. This problem was caused due to variable
weaviate_version which had hard-coded value of v1.12.1. This caused all
the pages to show fix version.

Workaround for this was to include a this tag, which identified current
version of the page and call the variable current_page_version in front
of version key.

Type of change:

[x] Bug fix (non-breaking change which fixes an issue)

How Has This Been Tested?

This has been tested locally by building and running the site
```

* For a new feature

```text
add copy to clipboard functionality to docs

What's being changed:

The documentation site contains a large number of code snippets that we
need to manually copy. The addition of a copy to clipboard functionality
will make it easier to copy the codes and reuse them.

Type of change:

[x] Feature or enhancements (non-breaking change which adds functionality)

How Has This Been Tested?

This has been tested locally by building and running the site
```

* For documentation changes

```text
fix typo in getting started docker compose example

What's being changed:

This PR corrects a typo in developers/weaviate/current/getting-started/
installation.md, where the docker-compose.yml example lacks a '. The
docker-compose.yml file previously did not work, but it now does.

Type of change:

[x] Documentation updates (non-breaking change which updates documents)

How Has This Been Tested?

This has been tested locally by building and running the site
```
