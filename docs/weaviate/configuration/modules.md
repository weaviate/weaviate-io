---
title: Modules
sidebar_position: 4
# layout: layout-documentation
# solution: weaviate
# sub-menu: Configuration
# title: Modules
# description: Modules
# tags: ['configuration', 'modules']
# sidebar_position: 1
# open-graph-type: article
# toc: true
# redirect_from:
#     - /developers/weaviate/v1.11.0/configuration/modules.html
---

## Introduction

Weaviate adopts a modularized architecture, which affords it a great deal of flexibility. Modules to be used must be specified in the relevant configuration file, by setting appropriate [environment variables](../installation/docker-compose.md#environment-variables).

## How to enable modules

Provide the list of modules to be ued to the `ENABLE_MODULES` variable. For example, the below will enable the `text2vec-contextionary` module. 

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-contextionary'
```

If multiple modules are to be used, each of them should be separate by a comma as below.

```yaml
services:
  weaviate:
    environment:
      ENABLE_MODULES: 'text2vec-contextionary,ner-transformers'
```

### Default vectorizer module

You can specify a default vectorization module in Weaviate's configuration with the environment variable `DEFAULT_VECTORIZER_MODULE` as below. 

``` yaml
services:
  weaviate:
    environment:
      DEFAULT_VECTORIZER_MODULE: text2vec-contextionary
```

If a default vectorizer module is not set, you will need to specify for each class the vectorization module to be used (or use your own vectors).

### Multiple vectorizer modules

:::caution Multiple vectorization modules
At the moment, text vectorization modules can be combined in a single setup, but this will disable `Explore{}`. You can't use multiple models of the same module yet, this will be part of a future release (i.e. you can’t run `all-mpnet-base` and `t5` (both transformers models) in the same setup yet.
:::


## Custom modules

See [here](../modules/other-modules/custom-modules.md) how you can create and use your own modules.

# More Resources

{% include docs-support-links.html %}
