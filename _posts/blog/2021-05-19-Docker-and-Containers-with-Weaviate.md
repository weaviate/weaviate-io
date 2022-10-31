---
layout: post
title: Docker and Containers with Weaviate
description: "What Weaviate users should know about Docker & Containers"
published: true
author: Etienne Dilocker
author-img: /img/people/icon/etienne.jpg
card-img: /img/blog/hero/docker-and-containers-with-weviate-card.png
canonical-url: https://medium.com/semi-technologies/what-weaviate-users-should-know-about-docker-containers-1601c6afa079
canonical-name: Medium
date: 2021-05-19
toc: true
redirect_from: /blog/2021/05/Docker-and-Containers-with-Weaviate.html
---

## Intro
Weaviate attracts different users with various backgrounds. Some have been working with containers for years, but we understand that not everyone has. Inspired by a few recent questions and comments about Docker on the Weaviate Slack, I’ve set out to write an article to provide a better background on Docker and containers in general. After reading this article, your most common questions about these technologies should be answered and there should be nothing in the way of building amazing use cases with Weaviate.

In this short overview, we will:

* look at what “Docker” and “Docker Compose” is,
* why Weaviate relies on Docker,
* what you need to do to get started,
* … and answer a few more container-related questions that we encounter regularly.

## What is Docker?
> Docker is a […] [set of products] that use OS-level virtualization to deliver software in packages called containers.<br/>
> [Wikipedia](https://en.wikipedia.org/wiki/Docker_(software))

You can think of docker containers as lightweight virtual machines. Each container has its own file system, own OS libraries and software. This provides a lot of isolation. At the same time, containers share the host system’s kernel, so the overhead is much smaller than with regular virtual machines.

The best practice around docker containers dictates that one container only contains a single application. Typically the lifecycle of the container depends on this one process. If the process exits, the container is stopped.

## What is Docker-Compose?
Because one container contains only a single app, we need a way to “tie many containers together”. [Docker Compose](https://docs.docker.com/compose/){:target="_blank"} is a tool that can run custom manifests, so called “Docker Compose files”, together. Instead of starting or stopping a single container, you can start all the containers in one go. This is very helpful to conveniently tie individual services together, for example when an application’s architecture consists of individual micro services. This is the case with Weaviate — especially when multiple modules are involved.

## Why does Weaviate use Docker & Docker-Compose?
There are many arguments for or against containerization, we have decided to go with Docker & Docker-Compose in the Weaviate stack for the following reasons:

* **Portability**: Whether you’re running on Windows, Linux, macOS or yet another OS, Weaviate is only compiled for a single Linux distribution. The Docker container makes sure that from Weaviate’s perspective it’s always running on a well-known Linux — even if your Host machine is running a completely different OS.
* **Isolation & Predictability**: Weaviate is a compiled binary that has zero runtime dependencies, but if you use Weaviate modules which rely on third-party tools, such as Huggingface Transformers, PyTorch or Tensorflow, they have a set of runtime dependencies. Thanks to containers, all runtime dependencies (Python version, python packages, OS libraries, etc.) are guaranteed to be present and at the right version in each container.
* **Distribution via Docker Hub**: Docker Hub makes it very easy to distribute public images. With a single `docker pull semitechnologies/weaviate:latest` command you can always obtain the latest version — without any prior configuration. Additionally, each container can have an exact version number, making it easy to switch between versions or upgrade your setup. Instead of a lengthy and risky update process, you can simply exchange the entire container for that of a newer version.

## What do I need to install before running Weaviate?
You need to make sure that you have both the `docker` and the `docker-compose` CLI tools installed. Depending on your operating system, these might be two separate installation process. Here are the guides for the most common operating systems:

* [Docker Desktop for Mac](https://docs.docker.com/desktop/install/mac-install/){:target="_blank"} (both `docker` and `docker-compose` )
* [Docker Desktop for Windows](https://docs.docker.com/desktop/install/windows-install/){:target="_blank"} (both `docker` and `docker-compose` )
* [Docker for Ubuntu Linux](https://docs.docker.com/engine/install/ubuntu/){:target="_blank"} (only `docker` and its dependencies)
* [Docker Compose for (Ubuntu) Linux](https://docs.docker.com/compose/install/){:target="_blank"}

## How do I obtain Weaviate Docker images?
Usually, there is no need to obtain individual images, as we distribute entire `docker-compose.yml` files. See next step.

## How do I obtain a Weaviate Docker-Compose file?
![Weaviate Configuration Tool](/img/blog/docker-and-containers/weaviate-configuration-tool.png)
*An example of the Weaviate Customizer which produces a complete docker-compose file — tailored to your needs.*

The easiest way to obtain a `docker-compose.yml` is to use the [Weaviate configuration tool](/developers/weaviate/current/installation/docker-compose.html#configurator){:target="_blank"} on our website. It will ask you a few questions about what you plan to do with Weaviate and customize a Compose file (including all module containers, if you select any) in the last step.

If you don’t want to use the customizer you can also copy/paste one of [the example files from the documentation](/developers/weaviate/current/installation/docker-compose.html){:target="_blank"}.

## How do I start up the docker-compose file I just obtained?
Make sure that:

* You are in the same folder you downloaded the file to
* The file you downloaded is named exactly docker-compose.yml

You can now start up with the whole setup by running:

```bash
docker-compose up -d
```

The `-d` means “detach” and means that your terminal will not attach to the log outputs of all the containers. To attach to the logs of a specific containers you can run:

```bash
docker-compose logs -f <container-name>
```

for example:

```bash
docker-compose logs -f weaviate
```

You can also omit the -d option and keep your terminal attached to all logs.

To see the names and status of each container you can run docker-compose ps.

## How do I know when Weaviate is up and ready?
Weaviate implements a readiness check at `GET /v1/.well-known/ready`. It will return a `2xx` HTTP status code once everything is ready.

To check for the readiness programmatically you can use `curl` in this simple `bash` loop:

```bash
until curl --fail -s localhost:8080/v1/.well-known/ready; do  
  sleep 1
done
```

Make sure to adjust localhost:8080 if you are running on a different bind address.

## Can I run Weaviate without Docker / Containerization?
We do not officially support running Weaviate in a non-containerized fashion, but it is certainly possible. To do so, you have to compile Weaviate for your desired target OS and architecture. Weaviate is written in Golang, so you need to have a working Go runtime. See the [official documentation for more details](https://golang.org/doc/install/source#environment){:target="_blank"}.

## Can Weaviate run on Kubernetes? Is Helm supported?
Yes, see next step.

## When should or shouldn’t I use Docker-Compose?
Docker Compose is quick, easy and convenient, but there are situations which it isn’t suited for. We recommend to use a docker-compose based setup for trying out or evaluating Weaviate and when developing with Weaviate locally.

However, for a stable production environment, we [recommend to run Weaviate on Kubernetes](/developers/weaviate/current/installation/kubernetes.html){:target="_blank"}. You can use Helm, there is an [officially supported Weaviate Helm Chart](https://github.com/semi-technologies/weaviate-helm){:target="_blank"}.

## Where to go from here?
Congratulations, you now have a lot of background on Docker and containerization in general! Now there’s nothing in the way of [Getting Started with Weaviate](/developers/weaviate/current/getting-started/index.html){:target="_blank"} and begin building amazing apps with Weaviate..

You can reach out to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw){:target="_blank"} or [Twitter](https://twitter.com/weaviate_io){:target="_blank"}.

Weaviate is open source, you can follow the project on [GitHub](https://github.com/semi-technologies/weaviate){:target="_blank"}. Don't forget to give us a ⭐️ while you are there.