---
layout: post
title: Image Search Application with Weaviate and Python Flask
description: Learn how to use the Img2vec-neural module in Weaviate and build a web application with Python Flask
published: true
author: Erika Cardenas 
author-img: /img/people/icon/erika.jpg
card-img: /img/blog/hero/image-search-application-with-weaviate-and-python-flask.png
hero-img: /img/blog/hero/image-search-application-with-weaviate-and-python-flask.png
og: /img/blog/hero/image-search-application-with-weaviate-and-python-flask.png
date: 2022-10-17
toc: true
---
Recently, I was working with my colleague Marcin (an engineer from Weaviate core) on a really cool demo project. The idea was to build an image-search application for dogs, which allows a user to provide a picture of a dog, and the app would respond with the most similar breed. And if a user provides a picture of their partner (I might've tested this on my boyfriend 😄), it returns the breed most similar to them.

Once we had the demo up and running, I thought this was a perfect opportunity to share it. This blog post is the foundation for you to build another application around image recognition or product search.

This blog post will guide you to build a full-stack web application in **Python** with **Weaviate** and **Flask**. By the time you are done with the post, you will have built an image-search app! The application will take an image of a dog and return an image from the database that best matches the type of dog in an **instant**. 

You are probably already aware that Weaviate can power 🚀 fast vector searches with documents. What you might not be aware of is that it can also power vectorization and searching through other data types, whether it be audio, images, or others. 

This blog post assumes you are familiar with vector search, as well as with spinning up an instance of Weaviate using Docker. If not, that’s okay - these guides will help you! 
* [Learn about Weaviate](https://weaviate.io/developers/weaviate/current/core-knowledge/basics.html){:target="_blank"}
* [Weaviate Installation](https://weaviate.io/developers/weaviate/current/getting-started/installation.html){:target="_blank"}
* [Docker Installation](https://docs.docker.com/engine/install/){:target="_blank"}


[Check out this article](https://weaviate.io/blog/2022/09/Why-is-Vector-Search-so-fast.html){:target="_blank"} to learn more about why vector search engines are so fast and how they work.

We will provide code snippets in this post, but you can check out the full code base in the [Github repository](https://github.com/semi-technologies/weaviate-examples){:target="_blank"} under the `nearest-neighbor-dog-search` directory. We encourage you to follow along with us by cloning the repository!

The blog post covers:
1. [Image Vectorization](#image vectorization)
2. [Weaviate Database](#weaviate database)
3. [Flask Application](#flask application)

## Image Vectorization

In this demo, we will search through a dataset of dog images. The current dataset has ten images of different dog breeds; however, you have the flexibility to change the dataset. Although I use dog pictures for the app, you can easily substitute the dog pictures for any images to make this your own use case 🤔.

Note, make sure you add the new images to the `flask-app/static/img` folder and run the `images-to-base64.py` and `upload-data-objects.py` file.

For a use case like ours, where we would like to identify similar types of dogs, the vectorization must work in a way that captures the information about the dog (breed, size, color, etc.). 

The img2vec-neural module in Weaviate is designed to solve this exact problem! The module vectorizes each image to something that represents its contents, so that we can search images based on their semantic similarity. In other words, we can use img2vec-neural to query our database to see how similar the dogs are based on the image. Before we show you how to implement this, let’s quickly review the Weaviate img2vec-neural module.

### Img2vec-neural Module 
[Weaviate’s img2vec-neural module](https://weaviate.io/developers/weaviate/current/retriever-vectorizer-modules/img2vec-neural.html){:target="_blank"} is a flexible vectorizer that enables conversion of images to meaningful vectors. In this guide, we will use `ResNet-50` for vectorization, where the activations of the last hidden layer are extracted and used as the vector representing the image in our database.

## Weaviate Database
### Setup
We have prepared a `docker-compose.yml` file for an instance of Weaviate with the `img2vec-neural` module pre-configured. To spin up your Weaviate instance, navigate to the `nearest-neighbor-dog-search` directory from the cloned git repository, and run 

```
docker-compose up -d
``` 
Once Weaviate is up, check that it is running and that you can connect to it like so:

``` 
import weaviate

client = weaviate.Client("http://localhost:8080")
schema = client.schema.get()
print(schema)
```

You should see something like this, and we are ready to go:
```
{"classes": []}
```





![Weaviate Dogs](/img/blog/image-search-application-with-weaviate-and-python-flask/weaviate-dogs1.jpg)