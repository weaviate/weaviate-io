# Welcome to Weaviate docs contributing guide

Hi there! We're thrilled that you'd like to contribute to the Weaviate's documentation site. Your help is essential for keeping it great. Any contribution you make will be reflected on [weaviate.io](https://weaviate.io/).

This guide will walk you through the entire contribution workflow, from opening an issue through creating a PR, reviewing it, and merging it.

## Types of contributions

We welcome contributions in several forms, e.g.

- Improving end user documentation on the [website](https://weaviate.io/).

- Verifying available [pull requests](https://github.com/semi-technologies/weaviate-io/pulls)

- Working on [issues](https://github.com/semi-technologies/weaviate-io/issues)
  - Fixing a bug
  - Adding a new feature
  - Answering questions on Slack/Mailing List
  - Correcting typos and grammatical sentences

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

### Forking and syncing the repository

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

### Pull Request process

- Create a new branch for the issue
  ```
  git checkout -b branch-name
  ```
- Make any changes deemed necessary related to your issue
- Add your files to the staging area
  ```
  git add file-name
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

### Commit guidelines

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

This is an open source project with a contributor community from all over the world. We want everyone in our community to feel safe, and we encourage people of all backgrounds to participate, regardless of experience level, age, gender, identity, race, religion, or nationality. We anticipate that all contributors will uphold the [Code of Conduct](CODE_OF_CONDUCT.md)

## License Information

This project is licensed under the [BSD-3-Clause License](LICENSE).
