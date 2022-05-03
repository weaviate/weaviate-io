# Welcome to Weaviate docs contributing guide

Hi there! We're thrilled that you'd like to contribute to the Weaviate's documentation site. Your help is essential for keeping it great. Any contribution you make will be reflected on [weaviate.io](https://weaviate.io/).

This guide will walk you through the entire contribution workflow, from opening an issue through creating a PR, reviewing it, and merging it.

## Table of contents

- [Types of Contributions](#types-of-contributions)
- [Getting Started](#getting-started)
  - [Issues](#issues)
  - [Forking and Syncing the repository](#forking-and-syncing-the-repository)
  - [Pull request process](#pull-request-process)
  - [Commit Guidelines](#commit-guidelines)
  - [Self Review](#self-review)
- [Ask for Help](#ask-for-help)
- [Contributor License Agreement](#contributor-license-agreement)
- [Code of Conduct](#code-of-conduct)
- [License Information](#license-information)

## Types of Contributions

We welcome contributions in several forms, e.g.

- Improving end user documentation on the [website](https://weaviate.io/).

- Verifying available [pull requests](https://github.com/semi-technologies/weaviate-io/pulls)

- Working on [issues](https://github.com/semi-technologies/weaviate-io/issues)
  - Fixing a bug
  - Adding a new feature
  - Answering questions on Slack/Mailing List
  - Correcting typos and sentences

## Getting Started

The site is created and maintained with [Jekyll](https://jekyllrb.com/), a Ruby-based Static Site Generator. The site generates content using the following file types:

- HTML files with extension .html
- Markdown files with extension .md

The data used by the site is stored in the form of following files:

- YAML files with extension .yml

To setup and install our documentation site on your local machine, follow the steps given in the [README.md](readme.md).

### Issues

If you spot a problem with the docs, website or any other thing in this repository, please check the [list of open issues](https://github.com/semi-technologies/weaviate-io/issues) to see if your issue/bug has already been reported. If the issue hasn't been reported, please submit a new issue using one of our templates.

A few tips for writing good issues/bug reports

- Describe the specific problem
- Screenshots are a great help
- Include the steps you took to reproduce the bug, as well as what you expected to happen and what actually happened
- Check that you are using the latest version of the project and its dependencies
- Only include one bug per issue. If you have discovered two bugs, please file two issues

### Forking and Syncing the repository

- Fork the repository, by heading over to weaviate-io's repository and clicking `Fork` button.

- Clone your forked repository in your machine using this command
  ```
  git clone git@github.com:[YOUR-USERNAME]/weaviate-io.git
  ```
- Change into the weaviate-io directory
  ```
  cd weaviate-io
  ```
- Add upstream URL, this acts as a reference from original weaviate.io's repository
  ```
  git remote add upstream git@github.com:semi-technologies/weaviate-io.git
  ```
- Configure and install the dependencies by following steps in the [README.md](readme.md).
- To refresh the fork, go to your forked repository and click `Fetch upstream` button. Then go to your terminal and execute this command
  ```
  git pull origin main
  ```
  You can also do this manually by following the steps below:
  - Fetch the remote and then pull its changes into your local default branch
    ```
    git checkout main
    git fetch upstream
    git pull upstream main
    ```
  - Push to your own remote origin to keep the forked repo in sync
    ```
    git push origin main
    ```

### Pull request process

Here's a few general guidelines for when to create a pull request:

- If you're making visual changes, include a screenshot of the affected element before and after

- Please update the documentation if you change any user-facing functionality in Weaviate

- Each pull request should implement one new feature or fix one bug. Submit multiple pull requests if you want to add or fix multiple items.

- Do not commit changes to files that are irrelevant to your feature or bug fix

- Write a [good commit message](#commit-guidelines)

How to create a pull request:

- Create a new branch for the issue
  ```
  git checkout -b branch-name
  ```
- Make any changes deemed necessary related to your issue
- Add your files to the staging area
  ```
  git add file-name
  ```
- Check if the file is added in the staging area
  ```
  git status
  ```
- Commit your changes with a good commit message. Refer to the tips for creating [good commit messages](#commit-guidelines) below.
  ```
  git commit -m "your commit message"
  ```
- Push your changes to GitHub
  ```
  git push origin branch-name
  ```
- Create a Pull Request by filling out our pull request template.

- Once your changes are ready, make sure you [self review](#self-review) your pull request to speed up the review process.

### Commit Guidelines

The cardinal rule for creating good commits is to ensure there is only one "logical change" per commit.

Example commit

```
gh-xx: short explanation of the commit

Longer explanation explaining exactly what's changed and why, whether
any documentation or web feature has been changed, what bugs were fixed
and so forth. Be concise but not too brief.

Fixes #12345.
```

Few tips for writing good commit messages:

- The commit message is primarily for the benefit of the others, and they should be able to understand it both now and six months from now.

- Begin with `gh-xx` to refer to the issue that the commit is working on. Here `xx` is issue number.

- Use the present tense ("Add feature" not "Added feature")

- If the commit fixes an issue, add a line on the last paragraph: "Fixes: #ISSUE_NUMBER.".

- Leave out the trailing period (full stop).

- Each line in description must not exceed 75 characters (there is no limit on number of lines).

Things to avoid when creating commits:

- Combining whitespace and functional code changes

- Combining two unrelated functional changes

- Sending out a large number of new features in a single massive commit.

If you accidentally created a wrong commit message and want to redo the latest commit, you can use this command:

```
git commit --amend -m "new commit message"
```

### Self Review

You should always review your own PR first.

For any changes you commit, make sure that you:

- Confirm that the changes meet the objectives of the issue you created or are working on.

- Compare your pull request's source changes to staging to ensure that the output matches the source and that everything is rendering as expected. This assists in detecting issues such as typos or content that isn't rendering due to versioning issues.

- Check for technical accuracy in the content. You can always [ask for help](#ask-for-help) if you get stuck.

- Verify that the syntax of new or updated Liquid statements is proper. Jekyll uses the [Liquid](https://shopify.github.io/liquid/) templating language to process templates.

- If there are any failing checks in your PR, try troubleshooting them until they are passing or [ask for help](#ask-for-help).

## Ask for Help

The best way to reach us with a question when contributing is to ask on:

- The original GitHub issue
- Our [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw) channel

## Contributor License Agreement

An automated bot will comment on your first pull request, asking you to agree on [Contributor License Agreement](https://www.semi.technology/playbooks/misc/contributor-license-agreement.html). You just have to reply to that comment with:

```
I agree to Contributor License Agreement.
```

## Code of Conduct

This is an open source project with a contributor community from all over the world. We want everyone in our community to feel safe, and we encourage people of all backgrounds to participate, regardless of experience level, age, gender, identity, race, religion, or nationality. We anticipate that all contributors will uphold the [Code of Conduct](CODE_OF_CONDUCT.md).

## License Information

This project is licensed under the [BSD-3-Clause License](LICENSE).
