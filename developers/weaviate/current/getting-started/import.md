---
layout: layout-documentation
solution: weaviate
sub-menu: Getting started
title: Import
description: Getting started with importing in Weaviate
tags: ['import']
menu-order: 5
open-graph-type: article
toc: true
---

Although importing itself is pretty straightforward, creating an optimized importing pipeline needs a bit of planning on your end. Hence, before we start with this guide, there are a few things to keep in mind.

0. When importing, you want to make sure that you max out all the CPUs available. It's more often than not the case that the import script is the bottleneck.
    0. Tip, use `htop` when importing to see if all CPUs are maxed out.
    0. Learn more about how to plan your setup [here](./installation.html#running-weaviate-yourself).
0. Use [parallelization](https://www.computerhope.com/jargon/p/parallelization.htm#:~:text=Parallelization%20is%20the%20act%20of,the%20next%2C%20then%20the%20next.); if the CPUs are not maxed out, just add another import process.
0. For Kubernetes, fewer large machines are faster than more small machines. Just because of network latency.

## Importing single data objects





## Other object opperations

...

see API docs

...

## Recapitulation

...

## What would you like to learn next?

...

## Legend

...

# More Resources

{% include docs-support-links.html %}
