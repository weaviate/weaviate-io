---
layout: layout-documentation
solution: weaviate
sub-menu: Modules
title: text2vec-transformers
description: 
tags: ['text2vec-transformers']
menu-order: 2
open-graph-type: article
og-img: documentation.jpg
toc: false
---

<div class="callout">
    <p>
        A text2vec-transformers module will be released soon, but take a look at <a href="https://towardsdatascience.com/a-sub-50ms-neural-search-with-distilbert-and-weaviate-4857ae390154">this example</a>! :)
    </p>
</div>

# Introduction

Due to Weaviate’s ability to import vectors directly, you can always chose whichever module fits your needs best. At the same time we’re aiming to provide convenience options for the most commonly requested modules. With the upcoming text2vec-transformers module, you’ll be able to use the same convenient edge to edge approach which you are accustomed to from the `text2vec-contextionary` module with any BERT-like transformer model.

The `text2vec-transformers` module allow you to use a pre-trained language transformer model as Weaviate vectorization module. Transformer differ from the Contextionary as they allow you to plug in a pretrained NLP module specific to your use case. Transformer models handle text as sequential data, which is a different learning method than the [text2vec-contextionary](../modules/text2vec-contextionary.html). 

# Try it out

Can't wait for the full module to be ready? No worries, because with [this tutorial](https://towardsdatascience.com/a-sub-50ms-neural-search-with-distilbert-and-weaviate-4857ae390154) you can already play around with Weaviate and a well-know transformer model! 

# More resources

{% include docs-support-links.html %}