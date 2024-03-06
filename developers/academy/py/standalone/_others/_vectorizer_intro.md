---
title: Introduction to vectorizers
sidebar_position: 40
---

## <i class="fa-solid fa-square-chevron-right"></i> Background (Why this module?)

This unit aims to provide you with tools to help you make good vectorizer selections.

In the earlier unit on vector search essentials [INSERT LINK HERE], you learned that vector databases can store each object with an associated vector.
But choosing a vectorizer model can be a daunting task for anyone, including for data scientists. Here are some reasons why:

### Too many models

One problem is that there are just so many models available.

To give you an idea, the Hugging Face Hub contains over 60,000 models (as of January 2023)!

![placeholder image for confusion](https://images.unsplash.com/photo-1499334758287-dc8133b315e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80)

### Variable performance

Another problem is that there is no "best" model for everything.

Each model can only vectorize certain types of asset(s) such as text, image or audio, and even within the same asset type, it is common for a model to perform better at certain tasks than others.

### Rate of progress

Lastly, new models are being developed and released every day. Such is the rate of development in language models that what was state-of-the-art a year ago, or even a month ago, may be considered "old news" in some circles.

All of this can be a recipe for decision paralysis.

## <i class="fa-solid fa-square-chevron-right"></i> Don't panic!

The good news, however, is that you do not need to select the "perfect model" for your application to work well.

Vectorizer models have progressed to a point where many models perform admirably well in a variety of tasks.

In the next section, we'll learn about commonly used types of vectorizer models available