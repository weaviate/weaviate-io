---
layout: layout-documentation
solution: contributor-guide
sub-menu: Weaviate Contributor's Guide
title: Improving Documentation 
tags: ['contributor-guide']
menu-order: 4
open-graph-type: article
og-img: documentation.jpg
toc: true
---
## Contributing to Weaviate Docs

Writing useful documentation takes time and must be updated with each software release. Has the installation procedure changed? Is it possible to configure performance more effectively? Has the user interface been altered? Were new features added? These types of updates must be communicated to both new and existing customers.

## Documentation Framework

Weaviate documentation is made of these components:

* Framework - Jekyll
* Repository - https://github.com/semi-technologies/weaviate-io

The site generates content using the following file types:

* HTML files with extension .html
* Markdown files with extension .md

The data used by the site is stored in the form of following files:

* YAML files with extension .yml

## Setting up your development environment

To setup and install our documentation site on your local machine, follow the steps given below

## Dependencies

* Software dependencies which are required to run Jekyll in your development environment
  
  * [Ruby](https://www.ruby-lang.org/en/documentation/installation/)

* Installing additional dependencies in **Ubuntu/Debian**:
  
  * Update repositories & install basic build dependencies
  
  ```
  sudo apt update && sudo apt install -y build-essential bash git rsync
  ```
  
  * Update repositories & install rbenv

  ```
  sudo apt update && sudo apt install rbenv ruby-build
  ```

  * Initialize rbenv

  ```
  rbenv init
  ```
  
  * Update ruby-build local packages
  
  ```
  git clone https://github.com/rbenv/ruby-build.git "$(rbenv root)"/plugins/ruby-build
  ```

  * Finally, install ruby 2.7.5
  
  ```
  rbenv install 2.7.5
  ```

* If you are using **Windows OS**, please follow these steps:
  
  * Please use [WSL](https://docs.microsoft.com/en-us/windows/wsl/)
  * Read the [documentation](https://docs.microsoft.com/en-us/windows/wsl/install) on installing WSL on Windows.

* If you are using **MacOS**, please follow these steps:
 
  * Install dependencies

  ```
  brew install rsync openssl rbenv ruby-build 
  ```

  * Finally, install ruby 2.7.5

  ```
  rbenv install 2.7.5
  ```

* To check if dependencies are installed correctly, run this command:
  
  ```
  ruby -v  #outputs ruby version
  gem -v   #outputs gem version
  ```

## Setting up the repository

If you're new to git and GitHub, check out the beginners guide to [git and GitHub](./git-and-github.html).
  
To get the site up and running locally, follow the below steps:

  **PS.:** You need to have a full Bash environment. If you're on Windows, please use [WSL](https://docs.microsoft.com/en-us/windows/wsl/).

* Fork the repository
  
  You can get your own fork/copy of [weaviate.io](https://github.com/semi-technologies/weaviate-io) by using the `Fork` button

* Create a local clone of the website:
  ```
  git clone git@github.com:<USERNAME>/weaviate-io.git
  ```
* Change into the weaviate-io directory
  ```
  cd weaviate-io
  ```
* Add upstream URL, this acts as a reference from original weaviate.io's repository
  ```bash
  git remote add upstream git@github.com:semi-technologies/weaviate-io.git
  ```
* Perform the following commands to install dependencies and structure the website properly:
  ```
  ./setup.sh
  ```
* Build the site and make it available on your local server
  ```
  ./run.sh
  ```
* Browse [http://localhost:4000](http://localhost:4000) to view the website.

## Basic Folder Structure of Documentation Site

```
├── .github/                            #contains GitHub template files for issues and pull requests
├── _data/                              #contains site's data files
├── _includes/                          #contains numerous templates like header, footer, navbar, etc
│   ├── benchmarks/                     
│   ├── code/                     
├── _layouts/                           #contains layouts for documentation and posts
├── _posts/                             #contains blog posts
├── _python/                        
├── developers/                         #contains documentation
│   ├── assets/                         #contains clipboard functionality
│   ├── contributor-guide/              #contains contributor guide for Weaviate
│   ├── weaviate/                       #contains files and folder for product documentation 
├── img/                                #contains all site images
├── js/                                 #contains JS files for various functionalities
├── resources/                          #contains additional site pages like gsoc, gsod
├── .editorconfig
├── .gitignore
├── .travis.yml                         #for continuous integration and deployment
├── 404.html                            #custom not found page.
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── Gemfile                             #contains gem dependencies for the site.
├── Gemfile.lock
├── LICENSE
├── README.md
├── _config.yml                         #contains Jekyll settings for the site
├── _config_dev.yml                     #for site build time improvement
├── blog.md                             #main blog page of the site
├── index.md                            #homepage of weaviate.io
├── podcast.md                          #podcast page of the site
├── product.md                          #product page of the site
├── resources.md                        #resource page of the site
├── robots.txt                          #tells search engine crawlers which URLs are accesible
├── run.sh                              #script for previewing the site
└── setup.sh                            #script for setting up the website
```

## Liquid syntax

Jekyll uses the [Liquid](https://shopify.github.io/liquid/) templating language to process templates. To learn more about Liquid, check out the [official Liquid Documentation](https://shopify.github.io/liquid/).

Here are a few basic syntax which we use in our code:

* `if` condititional

This executes the block of code only if the given condition is true. It is executed in the following manner:

```
Published on {{ page.date | date: '%B %d, %Y' }}
{% if page.canonical-name %}
    originally on
    <a href="{{ page.canonical-url }}" target="_blank">{{ page.canonical-name }}</a>
{% endif %}
```

* `for` loop

The for statement executes a block of code repeatedly. It is wriiten in the following manner:

```
{% for integration in site.data.integrations %}
    <a class="dropdown-item" href="/product.html#{{ integration.name | downcase }}">
        {{ integration.name }} ({{ integration.type }})
    </a>
{% endfor %}
```

* Include

The above tag is used to insert a already rendered file within the current template. It is written in the following manner:

```
{% include docs-current_version_finder.html %}
```

* Assign

The assign tag is used to create a new variable. It is written in the following manner:

```
  {% assign sortedResources = site.data.podcasts | sort: 'date' %}
```  

Also read repository specific [CONTRIBUTION.md](https://github.com/semi-technologies/weaviate-io/blob/main/CONTRIBUTING.md) to get more familiar with the code base and contribution style.