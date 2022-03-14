# Weaviate website

This repo contains the [Weaviate](https://weaviate.io) website, it's built using Jekyll.

### Run locally

```
$ bundle install
$ bundle exec jekyll serve
```

### OG image generator

OG images for documentation are created and linked automatically. The `og` tag in 
front matter should only be used for manual override. E.g. The `architecture/binary_passage_retrieval.md` image
would be located at `img/og/og-documentation/architecture-binary-passage-retrieval.jpg`.