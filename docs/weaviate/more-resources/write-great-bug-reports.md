---
title: How to write great bug reports
sidebar_position: 99
# layout: layout-documentation
# solution: weaviate
# sub-menu: Tutorials
# title: Write great Bug Reports
# intro: Bugs can be annoying, right? They don't have to be. Every discovered bug is a chance to help make Weaviate better. We are happy about bug reports because they highlight that we missed something and help us make sure an issue will never occur again. For our engineers to quickly identify and fix a bug there is some information that we may need. This tutorial is about how to write a great bug report.
# description: How to write great bug reports
# tags: ['how to', 'reporting a bug', 'bugfix', 'reproducing example']
# sidebar_position: 8
# open-graph-type: article
# toc: true
---

## Write great bug reports!

This page outlines what an ideal bug report would look like. We know that it is
not always possible to write a perfect bug report and we don't want to
discourage you from reporting a bug just because you might not be able to
provide all the info needed to make the report great. At the same time we want
to provide you with the information to make the lives of our engineers a bit
easier. Sometimes we also need to prioritize and decide about which bug ticket
to pick up first. If a bug report is well prepared it has a greater chance of
being picked up first.

### What makes a great bug report stand out?

Here are some points that make a bug report great:

- **Providing Context**
  When you have been working on a specific use-case or fighting against a
  specific bug for ages there is probably a lot of context in your or your
  teams' head(s). Sometimes this context gets lost when handing over a bug
  report to one of our engineers. Since they have probably been working on
  something completely different before, it may be difficult for them to
  understand all your goals and assumptions that are like second-nature to you.
  A great bug reports sets that context and makes sure that any engineer -
  whether an inside our outside contributor - can get started on this ticket
  easily.

- **Right level of information**
  Depending on the kind of bug, there is a different need for information.
  Let's consider two different possible bugs: For the first one an image when
  using the `img2vec` module was not vectorized correctly and your results are
  off because of it. For the second one, consider a scenario where you a
  performing a lookup by id and it is much slower than you think it should be.
  Those are both valid bugs, but we need different kind of information for
  each. For example, for the image-vectorization bug we need to know a lot of
  the details about the `img2vec` module: What versions were used? Which
  inference container was running? Was there a GPU involved? What file format
  did the image have? But looking at the performance bug, we probably need more
  info regarding your hardware. How was the machine sized? What kind of disks
  were used? What were the vitals (CPU usage, Memory usage, Disk pressure)
  during the slow query, etc.? We do not expect you to know all the internals
  of Weaviate, but we ask you to think about what details may be helpful in
  reproducing the bug and which are most likely superfluous.
  
- **Quick to reproduce**
  Every bug is important and we are happy about every single report. However,
  we must still prioritize. A bug report that is easier for us to reproduce is
  a bug report we might prefer. A great bug report contains a reproducing
  example that makes no assumptions about prior state and reproduces be bug in
  its entirety. Below are some examples for a great reproducing example in a
  bug report.

  
- **Narrowed down to a particular area**
  Weaviate is more than just the Weaviate server, it's an entire ecosystem that
  often contains the Weaviate Server, a language-specific Weaviate client and
  any number of optional modules. Those modules may bring their own inference
  containers if they make use of a Machine-Learning model. A great bug report
  tries to narrow down where the problem goes wrong. There are some helpful
  tips below to see how you can find out where the bug occurs.

Now that we have established *what* makes a great bug report, let's look at
some of the individual areas and see *how* we can write better reports.

## What is the minimal information and context that should always be provided?

- Make sure that all the versions used are explicitly listed. This includes at
  the minimum the version of the Weaviate server and the client.
- Is there a chance that the bug was introduced in a recent version? In this
  case please specify the last version that did not have the specified issue.
- Is there module involved that is vital to reproducing the bug? If so, please
  specify the module. If the module makes use of different models, please also
  specify the model name if you believe it to be relevant to the bug.

## How do I provide a good reproducing example?

- A great reproducing example makes zero assumptions about state. This means
  that the example always starts with an empty Weaviate instance and imports
  any object that is required to reproduce the bug. Please do not assume that
  our engineers can predict what kind of objects should be imported based on
  only providing a read/search query.
- Anything that is required to reproduce the error is part of the reproducing
  example. Our engineers should be able to copy/paste the example and
  immediately see that something is wrong.
- The reproducing example is expressed as code. This could be one of Weaviate's
  language clients or a series of `curl` commands.
- The reproducing example tells us what you expected to happen. In some cases
  it might not be obvious why the actual behavior is not the desired behavior.
  Please let us know what you expected to happen instead. This can be either in
  the form of code, a code comment, or text accompanying your example?

## How do I know if a problem occurs within Weaviate or one of the clients or somewhere different?

- If you have a suspicion that a problem doesn't actually occur in the Weaviate
  server, but possibly in one of the clients, you can verify sending a similar
  request using a different language client or no language client. The latter
  case is the best as it rules out client problems altogether. If you can
  still reproduce the error by sending a request using pure HTTP (e.g. via
  `curl`, Postman, etc.), you can be sure that the error occurs on the Weaviate
  server-side.
- If you see a stack trace from your language-client you can make an educated
  guess about where the error occurred. If the stack trace contains a network
  request, a non-2xx HTTP status code or an error message containing
  information about shards and indices, there is a good chance the bug occurred
  inside the Weaviate server. If you see something that is very specific to the
  client's language however, it may be an indication that the error occurred in
  the client.
- If you are using any other tools from the Weaviate eco-system, for example
  the `weaviate-helm` repository to run on Kubernetes, there is also a chance
  that something goes wrong there. If you think that the bug might be specific
  to the runtime and its manifests, it might make sense to also try the setup
  on a different runtime. Please indicate what you have already tried.

## What if it's not feasible to provide the information mentioned above?

Don't worry about it. We know that sometimes bugs are tricky and not so easy to
reproduce. If it is simply not feasible to write a perfect bug report, please
still write the bug report. We are very happy when we see that you made an
effort to write a good report. 

## Thank you

A bug report is a contribution to Weaviate. We are really thankful for you
taking the time to report the issue and helping us improve Weaviate. Thank you!
