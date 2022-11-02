---
layout: layout-documentation
solution: contributor-guide
sub-menu: Getting Started
title: Improving Documentation 
tags: ['contributor-guide']
menu-order: 4
open-graph-type: article
og-img: documentation.jpg
toc: true
---
## Introduction

Contributing to the documentation is a great way to improve the user experience for everybody. 

If you spot any typos, errors, unclear explanations, missing references or any other opportunities for improvement, please let us know. 

Weaviate's documentation is built with a static site builder (Jekyll) with data from our [GitHub repository](https://github.com/semi-technologies/weaviate-io). Before you get started, we suggest you set up a local development environment first. This will allow you to preview any changes locally. 

For instructions on setting up the development environment, please take a look at the [README file](https://github.com/semi-technologies/weaviate-io/blob/main/README.md) in our repository.

Once your local environment is set up, you can make your proposed changes, preview them locally, and submit them for review. 

## Documentation folders

The documentation repository is structured as below:

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

The content is stored on HTML and Markdown (.md) files, and YAML files are used for configurations.

## Liquid syntax

Jekyll uses the [Liquid](https://shopify.github.io/liquid/) templating language to process templates. To learn more about Liquid, check out the [official Liquid Documentation](https://shopify.github.io/liquid/).

Here are a few basic syntax which we use in our code:

* `if` conditional

This executes the block of code only if the given condition is true. It is executed in the following manner:

```
{% raw %}
Published on {{ page.date | date: '%B %d, %Y' }}
{% if page.canonical-name %}
    originally on
    <a href="{{ page.canonical-url }}" target="_blank">{{ page.canonical-name }}</a>
{% endif %}
{% endraw %}
```

* `for` loop

The for statement executes a block of code repeatedly. It is written in the following manner:

```
{% raw %}
{% for integration in site.data.integrations %}
    <a class="dropdown-item" href="/product.html#{{ integration.name | downcase }}">
        {{ integration.name }} ({{ integration.type }})
    </a>
{% endfor %}
{% endraw %}
```

* Include

The above tag is used to insert a already rendered file within the current template. It is written in the following manner:

```
{% raw %}
{% include docs-current_version_finder.html %}
{% endraw %}
```

* Assign

The assign tag is used to create a new variable. It is written in the following manner:

```
{% raw %}
{% assign sortedResources = site.data.podcasts | sort: 'date' %}
{% endraw %}
```  

Also read repository specific [CONTRIBUTION.md](https://github.com/semi-technologies/weaviate-io/blob/main/CONTRIBUTING.md) to get more familiar with the code base and contribution style.
