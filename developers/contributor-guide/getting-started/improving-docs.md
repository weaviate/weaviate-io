---
title: Improving Documentation
sidebar_position: 4
image: og/contributor-guide/getting-started.jpg
# tags: ['contributor-guide']
---
## Introduction

Maintaining consistent, accurate and readable documentation is way to improve the user experience for everybody, including experienced users.

The truth is that while we try our best, mistakes happen (we are not perfect! 😅). And if you found something difficult to understand, others may have too, which presents an opportunity for improvement.

So if you spot any typos, errors, unclear explanations, missing references or anything that stands out, please let us know, and we can work on it together.

## How Weaviate documentation is built

Weaviate's documentation is built with a static site builder (Docusaurus) with data from our [GitHub repository](https://github.com/weaviate/weaviate-io). Before you get started, we suggest you set up a local development environment first. This will allow you to preview any changes on your computer as you work on it.

For instructions on setting up the development environment, please take a look at this [README file](https://github.com/weaviate/weaviate-io/blob/main/README.md).

Once your local environment is set up, you can make your proposed changes, preview them locally, and submit them for review.

<!-- ## Documentation folders

The documentation repository is structured as below:

```text
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
├── robots.txt                          #tells search engine crawlers which URLs are accessible
├── run.sh                              #script for previewing the site
└── setup.sh                            #script for setting up the website
```

The content is stored on HTML and Markdown (.md) files, and YAML files are used for configurations. -->

## MDX syntax

You will notice MDX / React syntax throughout this site. Docusaurus has built-in support for MDX v1, which allows you to write JSX within your Markdown files and render them as React components.

Read [this Docusaurus page](https://docusaurus.io/docs/markdown-features/react) for more information.

## Infima styling

This site uses Infima for styling. Read [this Docusaurus page](https://docusaurus.io/docs/styling-layout#styling-your-site-with-infima) for more information.

<!-- ## Liquid syntax

Jekyll uses the [Liquid](https://shopify.github.io/liquid/) templating language to process templates. To learn more about Liquid, check out the [official Liquid Documentation](https://shopify.github.io/liquid/).

Here are some syntax which we commonly use in our code:

* `if` conditional

This executes the block of code only if the given condition is true. For example: -->

<!-- Using html rather than liquid code block as display style for liquid/jinja does not use a black background -->
<!-- ```html
{% raw %}
Published on {{ page.date | date: '%B %d, %Y' }}
{% if page.canonical-name %}
    originally on
    <a href="{{ page.canonical-url }}" target="_blank">{{ page.canonical-name }}</a>
{% endif %}
{% endraw %}
```

* `for` loop

The for statement executes a block of code repeatedly. For example:

```html
{% raw %}
{% for integration in site.data.integrations %}
    <a class="dropdown-item" href="/product.html#{{ integration.name | downcase }}">
        {{ integration.name }} ({{ integration.type }})
    </a>
{% endfor %}
{% endraw %}
```

* Include

The above tag is used to insert a already rendered file within the current template. For example:

```html
{% raw %}
{% include docs-current_version_finder.html %}
{% endraw %}
```

* Assign

The assign tag is used to create a new variable. For example:

```html
{% raw %}
{% assign sortedResources = site.data.podcasts | sort: 'date' %}
{% endraw %}
```   -->

## Tests

We've adopted a code sample structure that lets us both test and expose the samples without duplicating code. This is done using the `FilteredTextBlock` component, which loads arbitrary files and extract lines between a start marker and an end marker. You'll see statements like `import JSCode from '!!raw-loader!/_includes/code/howto/search.basics.ts';` in `.md` files, followed by

```mdxjs
<FilteredTextBlock
  text={JSCode}
  startMarker="// BasicGetJS"
  endMarker="// END BasicGetJS"
  language="js"
/>
```

To learn how to run tests, see the `README.md` file in `/tests/`.
