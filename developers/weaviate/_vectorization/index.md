---
title: Concepts - Vectors
sidebar_position: 2
image: og/docs/vectors.jpg
# tags: []
---

## Introduction
You would have seen us describe Weaviate as a [vector database](https://weaviate.io/blog/what-is-a-vector-database). In this section, we will talk a little more about what that means. We will discuss what vectors are, how vectors are indexed in Weaviate, and even a little bit about how to choose the right vectorizer for your needs.

## What is a vector?
A [vector](https://en.wikipedia.org/wiki/Euclidean_vector) is a collection of numbers, such as [1, 0] or [0.513, 0.155, 0.983, 0.001, 0.932]. It can be of any length - as short as one, or contain thousands of numbers.

Amazingly, these numbers can be used to effectively represent data objects. A very simple example of this can be found in representation of colors. Any color can be represented as a composition of red, green, or blue (R, G, B) values. So a `red` color can be represented by (1, 0, 0), or (255, 0, 0) in an 8-bit number system.

## How does Weaviate use Vectors?
Modern machine learning algorithms extrapolate this idea to represent concepts, or meaning, of data objects such as pieces of text, images, or sound. Running a sentence through one of Weaviate's `text2vec` modules will produce a (long) vector, for example comprising 384 numbers (sometimes called "dimensions"). While this vector may seem meaningless to a human, it captures some meaning, or semantics, of the source sentence.

And because a vector is just a set of numbers, a vector can be compared to other vectors to derive some measure of similarity. This similarity then represents similarity of meaning according to the model used.

These are the core principles that allows vector searching to be effective. Weaviate stores each data object as a vector particular to this data object, and as such, it can recall related data objects that are related in meaning.

## More on vectors & Weaviate
To convert data objects into vectors, Weaviate uses vectorizers, which are available as modules. And then Weaviate builds a vector index which stores the vector data in a form that allows for fast retrieval at high recall. Currently, Weaviate supports the HNSW algorithm for vector indexing.

You can read more about these concepts below.
- [Vector index](./vector-index.md)
- [Comparison of vectorizers](./vectorizer-comparisons.md)

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
