---
layout: post
title: What are Distance Metrics in Vector Search?
description: "Learn about why you need distance metrics in vector search and the metrics implemented in Weaviate (Cosine, Dot Product, L2-Squared, Manhattan, and Hamming)."
published: true
author: Erika Cardenas 
author-img: /img/people/erika.jpg
card-img: /img/blog/hero/what-are-distance-metrics-card.png
hero-img: /img/blog/hero/what-are-distance-metrics-card.png
og: /img/blog/hero/what-are-distance-metrics-card.png
date: 2022-09-21
toc: true
---
Vector Search engines – like [Weaviate](/developers/weaviate/current/){:target="_blank"} – use **Machine Learning models** to analyze data and **calculate vector embeddings**. The vector embeddings are **stored together with the data** in a database, and later are used to query the data.

In a nutshell, a vector embedding is an array of numbers, that is used to describe an object. For example, strawberries could have a vector `[3, 0, 1]` – more likely the array would be a lot longer than that.<br/>
*Note*, the meaning of each value in the array, depends on what Machine Learning model we use to generate them.

In order to judge how similar two objects are, we can compare their vector values, by using various **Distance Metrics**.

In the *context of a Vector Search*, **Distance Metric** is a function that takes two vectors as input and calculates a distance value between the vectors. The distance can take many shapes, it can be the geometric distance between two points, it could be an angle between the vectors, it could be a count of vector component differences, etc. Ultimately, we use the calculated distance to judge how close or far apart two vector embeddings are. These metrics are used in machine learning for classification and clustering tasks, especially in semantic search.

> Distance Metrics convey how similar or dissimilar two vector embeddings are.  

In this article, we explore the variety of distance metrics ([Cosine](#cosine-distance), [Dot product](#dot-product-distance), [Euclidean](#l2-squared-distance), [Manhattan](#manhattan-distance), and [Hamming](#hamming-distance)), the idea behind each, how they are calculated, and how they compare to each other.

## Background
If you already have a working knowledge of Vector Search, then you can skip straight to the [Cosine Distance](#cosine-distance) section.

### Vectors in Multi-Dimensional Space 
Vector search engines keep the semantic meaning of your data by representing each object as a vector embedding. Each embedding is a point in a high-dimensional space. For example, the vector for bananas (both the text and the image) are located near apples and not cats.

![Visual of Vector Search](/img/blog/distance-metrics/weaviate-vector-search-engine.png)

*The above image is a perfect visual of what a vector engine is. To perform a search, your search query is converted to a vector - similar to your data vectors. The search engine then computes the similarity between the search query and the collection of data points in the vector space.*

### Vector Search Engines are Fast 
The best thing is, vector search engines can **query large datasets**, containing **tens or hundreds of millions of objects** and still **respond** to queries in a tiny **fraction of a second**. 

Without getting too much into details, one of the big reasons why Vector Search engines are so fast is because they use the **Approximate Nearest Neighbor** (ANN) algorithm to index data based on vectors. ANN algorithms organize indexes so that the vectors that are closely related are stored next to each other. 

Check out this article to learn [Why Vector Search engines are so fast](https://weaviate.io/blog/2022/09/Why-is-Vector-Search-so-fast.html){:target="_blank"} and how they work.

### Why are there different distance metrics?
Depending on the Machine Learning model used, vectors can have ~100 dimensions or go into thousands of dimensions.

The time it takes to calculate the distance between two vectors grows based on the number of vector dimensions. Furthermore, some distance metrics are more compute heavy than others. Which might be a challenge for calculating distance for vectors with thousands of dimensions.

For that reason, we have different distance metrics that balance the speed and accuracy of calculating distances between vectors.

## Cosine distance 
The cosine similarity measures the angle between two vectors in a multi-dimensional space – with the idea that similar vectors point in a similar direction. Cosine similarity is commonly used in Natural Language Processing (NLP). It measures the similarity between documents regardless of the magnitude. This is advantageous because if two documents are far apart by the euclidean distance, the angle between them could still be small. For example, if the word ‘fruit’ appears 30 times in one document and 10 in the other, they can still be similar by taking the angle. The smaller the angle is, the more similar the documents are.  

The cosine similarity and cosine distance have an inverse relationship. As the distance between two vectors increases, the similarity will decrease. Likewise, if the distance decreases, then the similarity between the two vectors increases. 

![Similarity-Distance](/img/blog/distance-metrics/new-similarity-distance.png){:width="50%"}

The cosine similarity is calculated as: 

![Cosine Similarity Formula](/img/blog/distance-metrics/cosine-similarity-formula.png){:width="50%"}

__A·B__ is the product (dot) of the vectors A and B

__\|\|A\|\|  and \|\|B\|\|__ is the length of the two vectors 

__\|\|A\|\| * \|\|B\|\|__ is the cross product of the two vectors 

The **cosine distance** is then calculated as: 1 - Cosine Similarity

Let’s use an example to calculate the similarity between two fruits – strawberries (vector A) and blueberries (vector B). Since our data is already represented as a vector, we can calculate the distance.

Strawberry → `[4, 0, 1]`<br/>
Blueberry →  `[3, 0, 1]`

![Cosine Similarity Example](/img/blog/distance-metrics/cosine-example.png){:width="50%"}

A distance of 0 indicates that the vectors are identical, whereas a distance of 2 represents opposite vectors. The similarity between the two vectors is 0.998 and the distance is 0.002. This means that strawberries and blueberries are closely related. 

### Cosine versus Dot Product 
To calculate the cosine distance, you need to use the dot product. Likewise, the dot product uses the cosine distance to get the angle of the two vectors. You might wonder what the difference is between these two metrics. The cosine distance tells you the angle, whereas the dot product reports the angle and magnitude. If you normalize your data, the magnitude is no longer observable. Thus, if your data is normalized, the cosine and dot product metrics are exactly the same.

## Dot Product distance
The dot product takes two or more vectors and multiplies them together. It is also known as the scalar product since the output is a single (scalar) value. The dot product is a similarity metric and shows the direction of two vectors. The output value can be any real number. If the vectors are in different directions, then the dot product will be negative (see image below). Similarly, if the vectors are in the same direction, then the dot product is positive. 

![Direction of Vectors](/img/blog/distance-metrics/direction.png){:width="50%"}

The dot product is calculated as:

![Dot Product Calculation](/img/blog/distance-metrics/dot-product-formula.png){:width="50%"}

We will use the same example from above to calculate the dot product of the two vectors.

Strawberry →  `[4, 0, 1]`<br/>
Blueberry →  `[3, 0, 1]`

**A · B** = (4\*3) + (0\*0) + (1\*1) = 13

The dot product of the two vectors is 13. This indicates that the vectors are similar to one another. To calculate the distance, you need to take the negative dot product. The negative dot product reports the distance between the vectors. It keeps the intuition that a smaller distance value means they are similar.

## L2-Squared distance 
The Squared Euclidean (L2-Squared) calculates the distance of two vectors by taking the sum of the squared vector values. The distance can be any value between zero and infinity. If the distance is zero, the vectors are identical. The larger the distance, means the vectors are further apart.

The squared euclidean distance is calculated as: 

![L2-Squared Formula](/img/blog/distance-metrics/l2-squared-formula.png){:width="50%"}

The squared euclidean distance of strawberries `[4, 0, 1]` and blueberries `[3, 0, 1]` is equal to 1. 

**L2** = ((4 - 3) + (0 - 0) + (1 - 1))<sup>2</sup> = 1

## Manhattan distance 
Manhattan distance, also known as L1 norm and Taxicab Distance, calculates the distance between a pair of vectors. The metric is calculated by summing the absolute distance between the two vectors. 

![Manhattan Distance Formula](/img/blog/distance-metrics/manhattan-formula.png){:width="50%"}

The name comes from the grid layout resembling the streets of Manhattan. The city is designed with buildings on every corner and one-way streets. If you're trying to go from point A to point B, the shortest path isn't straight through because you cannot drive through buildings. You will run into buildings, cars, and people. The fastest route is one with fewer twists and turns.

![Manhattan Distance](/img/blog/distance-metrics/weaviate-manhatten-distance.png)

### Manhattan versus Euclidean Distance
The Manhattan distance (L1 norm) and Euclidean distance (L2 norm) are two metrics used in machine learning models. The L1 norm is calculated by taking the sum of the absolute values of the vector. The L2 norm takes the square root of the sum of the squared vector values. The Manhattan distance is faster to calculate since the values are typically smaller than the Euclidean distance.

### When to use it 
Generally, there is an accuracy speed tradeoff when choosing between the Manhattan and Euclidean distance. It is hard to say precisely when the Manhattan distance will be more accurate than Euclidean; however, Manhattan is faster in speed since you don’t have to square the differences. You want to use the Manhattan distance as the dimension of your data increases. For more information on which distance metric to use in high-dimensional spaces, check out this paper by [Aggarwal et al.](https://bib.dbvis.de/uploadedFiles/155.pdf){:target="_blank"}

![Hamming and Manhattan Distance](/img/blog/distance-metrics/hamming-manhattan.png)

## Hamming distance 
The Hamming distance is a metric for comparing two numeric vectors. It computes how many changes are needed to convert one vector to the other. The fewer the required changes the more similar the vectors.

There are two ways to implement the Hamming distance:

0. Compare two numeric vectors
0. Compare two binary vectors 

Weaviate has implemented the first option to compare numeric vectors. In the next section, I will describe an idea to use Hamming distance in tandem with Binary Passage Retrieval. 

Let's use an example to calculate the Hamming distance. Imagine we have a dataset containing a variety of fruit and vegetables. Your first query is to see which item pairs best with your banana pancakes. To achieve that we need to compare the banana pancakes' vector with the other vectors. Like this:

| Banana Pancakes | [5,6,8] | **Hamming Distance** |
| Blueberries     | [5,6,9] |         1        	   |
| Broccoli     	  | [8,2,9] |         3        	   |

As seen above, blueberries are a better pairing than a broccoli. This was done by comparing the position of the numbers in the vector representations of foods. 

### Hamming distance and Binary Passage Retrieval 
Binary Passage Retrieval (BPR) translates vectors into a binary sequence. For example, if you have text data that has been converted into a vector ("Hi there" -> [0.2618, 0.1175, 0.38, …]), it can then be translated to a string of binary numbers (0 or 1). Although it is condensing the information in the vector, this technique can keep the semantic structure despite representing it as 0 or 1.

To compute the Hamming distance of two strings, you compare the position of each bit in the sequence. This is done with an XOR bit operation. XOR stands for “exclusive or,” meaning if the bits in the sequence do not match, then the output is 1. Keep in mind that the strings need to be of equal length to perform the comparison. Below is an example of comparing two binary sequences.

![XOR Operation](/img/blog/distance-metrics/hamming-xor.png){:width="40%"}

There are three positions where the numbers are different (highlighted above). Therefore, the Hamming distance is equal to 3. [Norouzi et al.](https://papers.nips.cc/paper/2012/hash/59b90e1005a220e2ebc542eb9d950b1e-Abstract.html){:target="_blank"} stated that binary sequences are storage efficient and allow people to store massive datasets in memory. There is a great page in the [Weaviate documentation](https://weaviate.io/developers/weaviate/current/architecture/binary-passage-retrieval.html){:target="_blank"} that explains this in more detail.

## How to Choose a Distance Metric 
As a rule of thumb, it is best to use the distance metric that matches the model that you’re using. For example, if you’re using a Siamese Neural Network (SNN) the contrastive loss function incorporates the euclidean distance. Similarly, when fine-tuning your sentence transformer you define the loss function. The [CosineSimilarityLoss](https://www.sbert.net/docs/package_reference/losses.html#cosinesimilarityloss){:target="_blank"} takes two embeddings and computes the similarity based on the cosine similarity.
 
To summarize, there is no ‘one size fits all’ distance metric. It depends on your data, model, and application. As mentioned above, there are cases where the cosine distance and dot product are the same; however, it depends on if the magnitude is important. This also goes for the accuracy speed tradeoff between the manhattan and euclidean distance.  

> Use the distance metric that matches the model that you’re using.


## Implementation in Weaviate 

In total, Weaviate users can choose between five various distance metrics to support their dataset. [Here](https://weaviate.io/developers/weaviate/current/vector-index-plugins/distances.html#distance-implementations-and-optimizations){:target="_blank"} you can find each metric in detail. Weaviate makes it easy to choose a metric depending on your application. With one edit to your schema, you can use any of the metrics implemented on Weaviate (cosine, dot, l2-squared, hamming, and manhattan), or you have the flexibility to create your own!

### Optimizations
Even with ANN-indexes, which reduce the number of distance calculations necessary, a vector search engine still spends a large portion of its compute time calculating vector distances. As a result, it is very important that the engine can do this not just correctly, but also efficiently.

The distance metrics in Weaviate have been optimized to be highly efficient using “Single Instruction, Multiple Data” (“SIMD”) instructions sets. Using these instructions, a CPU can do multiple calculations in a single CPU cycle. To achieve this, we had to write some of our distance metrics in [pure Assembly code](https://github.com/semi-technologies/weaviate/blob/master/adapters/repos/db/vector/hnsw/distancer/asm/dot_amd64.s){:target="_blank"}. [Here is an overview](/developers/weaviate/current/vector-index-plugins/distances.html#distance-implementations-and-optimizations){:target="_blank"} of the current state of optimizations; including which distance metrics have SIMD optimizations for which architecture.

### Open source contributions
Weaviate is open-source and values feedback and input from the community. A community member contributed to the Weaviate project by adding two new metrics to the 1.15 release. How cool is that! If this is something you're interested in, [here](https://github.com/semi-technologies/weaviate/tree/master/adapters/repos/db/vector/hnsw/distancer){:target="_blank"} is the repository to see the implementation of the current metrics. 

## What's next
Check out the [Getting Started with Weaviate](/developers/weaviate/current/getting-started/quick-start.html){:target="_blank"} and begin building amazing apps with Weaviate.

You can reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/SeMI_tech){:target="_blank"}.

Weaviate is open source, you can see the follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.