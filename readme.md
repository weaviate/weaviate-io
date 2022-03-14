# Weaviate website

This repo contains the [Weaviate](https://weaviate.io) website, it's built using Jekyll.

### Run locally

```
$ bundle install
$ bundle exec jekyll serve
```

### OG image generator

In order for the og image generator to work properly with newly added pages,
please make sure to pass `img/og/og-documentation/sectionname-pagename.jpg`
as the `og` parameter in frontmatter. Here, `sectionname` refers to the
folder in which the page source is located and `pagename` refers to the 
name of the markdown file itself. Note that spaces (` `) and underscores(`_`) in the 
pagename are replaced by dashes (`-`).

Example: The `architecture/binary_passage_retrieval.md` image would be located at
`img/og/og-documentation/architecture-binary-passage-retrieval.jpg`.