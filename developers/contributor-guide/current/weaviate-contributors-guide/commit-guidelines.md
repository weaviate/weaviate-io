---
layout: layout-documentation
solution: contributor-guide
sub-menu: Weaviate Contributor's Guide
title: Commit Guidelines 
tags: ['contributor-guide']
menu-order: 8
open-graph-type: article
og-img: documentation.jpg
toc: true
---
## What makes a good commit

The cardinal rule for creating good commits is to ensure there is only one "logical change" per commit. Why? Because more changes per commit may result in more bugs.

## Why do we need good commit messages

* Good commit messages are simpler to read. Reviewers and contributors will be able to review more quickly, find more bugs, and suggest changes as needed.

* Commit messages serve as documentation for your code changes. You can easily search the commit history for the commit that caused the bug in the first place.

* Writing good commit messages makes it easier for people to contribute to your projects because it allows them to navigate a more structured commit history.

* Writing good commit messages will help you become a better software developer in the long run.

Examples of **good commit messages**:

* `feat: add sitemap plugin to the website`

* `chore: update ruby version to 2.7.5`

* `fix: update version number dynamically`

* `docs: fix typo in introduction to user guide`

Example of **bad commit messages**:

* `Fixed typo in the doc`

* `Changed CSS style`

* `modified README.md`

* `Added search feature in the docs`

## How to write good commit messages

A commit message consists of three parts:

* [Summary line](#summary-line)
* [Issue reference](#issue-reference)
* [Description](#description)

Commit template

```
tag: short explanation of the commit
```
**Note:** This is how the commit message should appear when you use git to commit files and push them to GitHub.

```
Why:
This PR fixes: [issue link]

What's being changed:

Type of change:
[] Bug fix (non-breaking change which fixes an issue)
[] Feature or enhancements (non-breaking change which adds functionality)
[] Documentation updates (non-breaking change which updates documents)

How Has This Been Tested?
```
**Note:** This is a pull request template which you have to fill out while creating a pull request on GitHub.

It is preferable to follow these guidelines for each patch before pushing it to git.

### Summary Line:

Example:

```
feat: add blog pages
```

* Be sure to not exceed 50 characters. Maintaining summary lines at this length makes them readable and provides a clear explanation of the change.

* After adding `tag`, the summary line should begin with a lowercase letter, unless it begins with a symbol or identifier.

* Use imperative present tense ("add feature" not "added feature")

* Prefix your commit with one `tag`, to make it easier to know what type of change you have done. See the list of **`tags`** below

* Leave out the trailing period (full stop).

`tag` types:

* **`feat`**: A new feature

* **`fix`**: A bug fix

* **`docs`**: Documentation only changes

* **`style`**: Changes that do not affect the meaning of the code or documentation (white-space, spelling errors, missing semi-colons, line endings, etc)

* **`refactor`**: A code change that neither fixes a bug or adds a feature

* **`perf`**: A code change that improves performance

### Issue reference

Example:

```
Why:
This PR fixes: #123
```

* If the commit fixes an issue, reference that issue using `#` symbol: "This PR fixes: #ISSUE_NUMBER.".

* The issue reference will add the commit link to the issue automatically.

### Description

Every repository has a [pull request template](https://github.com/semi-technologies/weaviate-io/blob/main/.github/PULL_REQUEST_TEMPLATE.md) with a specific set of headers that you can use to write the body of commit messages. You can modify this template at the time of making a pull request and exclude the parts which is not necessary.

Example:

```
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
```

* Each description line must be no more than 75 characters long (there is no limit on number of lines).

* You should explain why the changes were made. This is especially important for complex, non-self-explanatory changes.

* You must select the type of change you made. Remove the irrelevant options from the list by putting a `x` in the square brackets in front of the type of change.

* The commit message is primarily for your and others' benefit, and they should be able to understand it both now and in the future.

* If the summary is self-explanatory, you can omit writing the description.

* Tests are essential, and you should describe how you tested your changes locally and whether you discovered any other breaking changes.

## More Examples

* Fixing a bug

```
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

* Implementing a feature

```
feat: add copy to clipboard functionality to docs

What's being changed:

The documentation site contains a large number of code snippets that we 
need to manually copy. The addition of a copy to clipboard functionality 
will make it easier to copy the codes and reuse them.

Type of change:

[x] Feature or enhancements (non-breaking change which adds functionality)

How Has This Been Tested?

This has been tested locally by building and running the site
```

* Documentation changes

```
docs: fix typo in getting started docker-compose example

What's being changed:

This PR corrects a typo in developers/weaviate/current/getting-started/
installation.md, where the docker-compose.yml example lacks a '. The 
docker-compose.yml file previously did not work, but it now does.

Type of change:

[x] Documentation updates (non-breaking change which updates documents)

How Has This Been Tested?

This has been tested locally by building and running the site
```