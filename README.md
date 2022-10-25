# Weaviate website

This repo contains the [Weaviate](https://weaviate.io) website, it's built using [Jekyll](https://jekyllrb.com/).

## Installing & Running natively (no Docker)

### Dependencies

- Software Dependencies
  - [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
  - Ruby Development Package (aka ruby-dev)

- Installing Dependencies in **Ubuntu/Debian**
  ```bash
  # update repositories & install basic build dependencies
  sudo apt update && sudo apt install -y build-essential bash git rsync

  # update repositories & install rbenv
  sudo apt update && sudo apt install rbenv ruby-build ruby_dev

  # initialize rbenv
  rbenv init

  # updates ruby-build local packages
  git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build

  # install ruby 2.7.5
  rbenv install 2.7.5
  ```

- Installing Dependencies Windows
  - Please use [WSL](https://docs.microsoft.com/en-us/windows/wsl/)
  - Read the [documentation](https://docs.microsoft.com/en-us/windows/wsl/install) on installing WSL on Windows.

- Installing Dependencies in macOS
  ```bash
  # install dependencies
  brew install rsync
  brew install openssl
  brew install rbenv
  brew install ruby-build
  brew install ruby-dev

  # install ruby 2.7.5
  rbenv install 2.7.5
  ```

- Check if dependencies are installed correctly
  ```bash
  ruby -v
  gem -v
  ```

### Setting up the repository
  
- To get the site up and running locally, follow the below steps:

  **PS.:** You need to have a full Bash environment. If you're on Windows, please use WSL.

- Fork the repository
  You can get your own fork/copy of [weaviate.io](https://github.com/semi-technologies/weaviate-io) by using the `Fork` button

- Create a local clone of the website:
  ```
  git clone git@github.com:[YOUR-USERNAME]/weaviate-io.git
  ```
- Change into the weaviate-io directory
  ```
  cd weaviate-io
  ```
- Add upstream URL, this acts as a reference from original weaviate.io's repository
  ```bash
  git remote add upstream git@github.com:semi-technologies/weaviate-io.git
  ```
- Perform the following commands to install dependencies and structure the website properly:
  ```
  ./setup.sh
  ```
- Build the site and make it available on your local server
  ```
  ./run.sh
  ```
- Browse [http://localhost:4000](http://localhost:4000) to view the website.

### OG image generator

OG images for documentation are created and linked automatically. The `og` tag in 
front matter should only be used for manual override. E.g. The `architecture/binary_passage_retrieval.md` image
would be located at `img/og/og-documentation/architecture-binary-passage-retrieval.jpg`.

## Installing & Running with Docker

### Build the docker image

For cache-friendliness the `Dockerfile` is designed to copy the dependency
files first, so that changing any content only requires minimal rebuilding of
the image.

```
docker build -t weaviate-io .
```

### Run the docker image with live reload

The following is an example to run the image with live-reload enabled for the
`developers` folder. You can also mount different folders in the same way:

```
docker run -v $PWD/developers:/weaviate-io/developers -p 4000:4000 -p 35729:35279 -it weaviate-io
```

## Blog posts

You can add a blog post by adding a markdown file to: `/_posts/blog` the format of the markdown file should be `YEAR-MONTH-DAY-TITLE.md` for example `2022-01-01-demo-post-with-dashes.md`

Inside the markdown file, add the following header:

```markdown
---
layout: post
title: TITLE (ALSO USED FOR SEO)
description: DESCRIPTION (ALSO USED FOR SEO)
published: true
author: AUTHOR NAME
author-img: /img/people/AUTHOR.jpg
card-img: /img/blog/some-image.jpg # should be 480x240 px
hero-img: /img/blog/some-image.jpg # should be 1200x500 px
toc: true # Create table of contents if set to `true`
---
```

In case of a repost add:

```markdown
canonical-url: ORIGINAL POST URL
canonical-name: NAME OF OUTLET
```

Example:

```markdown
canonical-url: https://www.forbes.com/sites/forbestechcouncil/2022/06/23/the-ai-first-database-ecosystem/
canonical-name: Forbes
```
