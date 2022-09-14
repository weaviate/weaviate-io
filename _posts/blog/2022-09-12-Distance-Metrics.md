---
layout: post
title: Distance Metrics 
description: ""
published: true
author: Erika Cardenas 
author-img: /img/people/icon/sebastian.jpg
card-img: /img/blog/hero/weaviate-1-15-card.png
og: /img/blog/hero/weaviate-1-15-card.png
date: 2022-09-12
toc: true
---
## Introduction 
Deep learning has advanced the ability to represent different types of data as a vector embedding. Vector embeddings map “objects” to an array of numbers. This allows deep learning models to understand and process high-dimensional data. As a result, this has unlocked new possibilities for search in various applications. A few of these applications are product recommendation, personalization, and question-answering. 

The type of data that can be converted into an embedding include images, audio, and text. Data objects are transformed into a vector by using embedding models. The type of embedding model depends on the type of data. For text, common embedding schemes include BERT-based deep learning models, BM25 or TF-IDF, and GloVe word embeddings, to name a few. For images, popular schemes are ResNets and Convolutional Neural Networks (CNN). 

A forward pass through these neural networks produce the vector representations. The question is then: How do we compare these vectors to determine similarity?

### Why do you need distance metrics? 

Vector search engines keep the semantic meaning of your data by representing each object as an embedding. Each embedding is then represented as a point in a high-dimensional space.

### What metrics are out there?

## Distance Metrics 
### Cosine 

#### Background 

#### When to use it 


### Dot

#### Background 

#### When to use it 


### L2-Squared

#### Background 

#### When to use it 


### Hamming 
#### Background 
The Hamming distance is a metric for comparing two numeric vectors. It computes how many changes are needed to convert one of the strings to the other. There are two ways to implement the Hamming distance: 1. Compare two numeric vectors 2. Compare two binary vectors. Weaviate has implemented the first option to compare numeric vectors. In the next section, I will describe an idea to use Hamming distance in tandem with Binary Passage Retrieval. 

We will work through an example of how to calculate the Hamming distance. Let's pretend you have a dataset on Weaviate containing a variety of fruit and vegetables. Your first query is to see which item pairs best with your banana pancakes.


As seen above, we can see that the blueberries are a better pairing than the broccoli. This was done by comparing the position of the numbers in the vector representations of foods.

#### Hamming Distance and Binary Passage Retrieval 
 Binary Passage Retrieval (BPR) translates vectors into a binary sequence. For example, if you have text data that has been converted into a vector ("Hi there" -> [0.2618, 0.1175, 0.38, …]), it can then be translated to a string of binary numbers (0 or 1). Although it is condensing the information in the vector, this technique can keep the semantic structure despite representing it as 0 or 1.

To compute the Hamming distance of two strings, you compare the position of each bit in the sequence. This is done with an XOR bit operation. XOR stands for “exclusive or,” meaning if the bits in the sequence do not match, then the output is 1. Keep in mind that the strings need to be of equal length to perform the comparison. Below is an example of comparing two binary sequences.

There are three positions where the numbers are different (highlighted above). Therefore, the Hamming distance is equal to 3. 

If your application has binary vectors, then this is a great distance metric to use. The Hamming distance metric is very fast because of the XOR logic gate operation. Norouzi et al. (link) stated that binary sequences are storage efficient and allow people to store massive datasets in memory. There is a great page in the Weaviate documentation (link) that explains this in more detail.

### Manhattan 
#### Background 
Manhattan distance, also known as L1 norm and Taxicab Distance, calculates the distance between a pair of vectors. The metric is calculated by summing the absolute distance between the two vectors. 

i = 1nxi- yi

The name comes from the grid layout resembling the streets of Manhattan. The city is designed with buildings on every corner and one-way streets. If you're trying to go from point A to point B, the shortest path isn't straight through because you cannot do it. You will run into buildings, cars, and people. The fastest route is one with fewer twists and turns.

#### When to use it 
Generally, there is an accuracy speed tradeoff when choosing between the Manhattan and Euclidean distance. It is hard to say precisely when the Manhattan distance will be more accurate than Euclidean; however, Manhattan is faster in speed since you don’t have to square the differences. You want to use the Manhattan distance as the dimension of your data increases. For more information on which distance metric to use in high-dimensional spaces, check out this paper by Aggarwal et al.

#### Manhattan versus Euclidean Distance 
The Manhattan distance (L1 norm) and Euclidean distance (L2 norm) are two metrics used in machine learning models. The L1 norm is calculated by taking the sum of the absolute values of the vector. The L2 norm takes the square root of the sum of the squared vector values. The Manhattan distance is faster to calculate since the values are typically smaller than the Euclidean distance.

## Implementation on Weaviate 
In total, Weaviate users can now choose between five various distance metrics to support their dataset. Here you can find each metric in detail.

Weaviate is open-source and values feedback and input from the community. A community member contributed to the Weaviate project by adding the two new metrics. How cool is that! If this is something you're interested in, here is the repository to see the implementation of the current metrics.



