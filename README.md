# weaviate.io website ![Travis Build](https://travis-ci.org/SeMI-network/semi-website.svg?branch=master "Logo Travis Build")

Dependencies:
- [Bundler](https://bundler.io/)
- [npm](https://www.npmjs.com/)

Make sure both (Bundler and npm) are installed on your system before you proceed. For more information on how to install check above links.


### Running everything locally

Alternatively, if you need full control over all resources, you can also setup
your local environment as described here.

To start a project first install Bundler as described [in the Bundler documentation](https://bundler.io/).

To install the dependencies (used for jekyll page generation) run:

```bash
$ bundle install
$ npm install
```

To build the **local development** website:

```bash
$ npm run build
```

Build and watch the website

```bash
$ bundle exec jekyll serve
```

A quicker way is 
```
$ bundle exec jekyll serve --incremental 
```
If this doesn't work, it could be that your `ruby` is not the latest.

Check on `localhost:4000`
