---
title: Quickstart Tutorial
sidebar_position: 0
image: og/docs/quickstart-tutorial.jpg
# tags: ['getting started']
---

import registerImg from './img/register.png';
import WCSoptions from './img/wcs-options.png';
import WCScreate from './img/wcs-create.png';
import WCScreationProgress from './img/wcs-creation-progress.png';

## Overview

Welcome to the **Quickstart tutorial** for Weaviate Cloud Services (WCS). Here, you will learn how to get set up on WCS with an instance of Weaviate and to instantiate a Weaviate client to communicate with it.

By the time we are finished here, you'll be set up and ready to move onto our Weaviate library Quickstart tutorial if you wish.

### Agenda

By the end of this tutorial, you will be familiar with basics of WCS. You will have:
- Created a WCS account,
- Created a new free WCS sandbox instance with authentication enabled,
- Installed a Weaviate client of your choice, and
- Queried your new WCS sandbox instance with the Weaviate client.

## Sign in to WCS

1. First, access WCS by navigating to the [Weaviate Cloud Console](https://console.weaviate.cloud/), and click on "Sign in with the Weaviate Cloud Services".
1. (Optional) If you don't have an account with WCS yet, click on the "Register" button and create a new account.
1. Then, sign in with your WCS username and password.

## Create a Weaviate Cluster

To create a new Weaviate Cluster:
1. Click the "Create cluster" button
1. Select the **Free sandbox** *plan tier*.
1. Provide a *cluster name*, which will become a part of its URL. A suffix will be added to this to ensure uniqueness.
1. Leave the `Enable Authentication` option as `No`.

Your selections should look like this:
<img src={WCSoptions} width="100%" alt="Instance configuration"/>

Finally, press **Create** to create your sandbox instance. Note that the sandbox will expire in 30 days.

<details>
  <summary>Sandbox expiry & options</summary>

import SandBoxExpiry from '/_includes/sandbox.expiry.mdx';

<SandBoxExpiry/>

</details>

<img src={WCScreate} width="100%" alt="Create instance"/>

This will start the process to create a new instance, and you should see a progress indicator.

<img src={WCScreationProgress} width="60%" alt="Creation in progress"/>

Instance creation should take a minute or two, and you should see a tick ✔️ when it's done - indicating that the instance is ready.

In the meantime, let's start installing a client library.

## Install a client library

You can communicate with Weaviate with the available [client libraries](../client-libraries/index.md) (currently available for `Python`, `JavaScript`, `Java` and `Go`) or the [RESTful API](../api/rest/index.md).

import ClientCapabilitiesOverview from '/_includes/client.capabilities.mdx'

<ClientCapabilitiesOverview />

Install your preferred client by following the relevant instructions below:

import CodeClientInstall from '/_includes/code/quickstart.clients.install.mdx';

<CodeClientInstall />

## Connect to your WCS instance

:::warning todo
finish
:::

Click on the `Cluster Id` link, which will open a new page in your browser and display all the available endpoints.

<img src={WCScreate} width="100%" alt="Weaviate Cluster"/>

If you can see this response in your browser, *congratulations!* you have successfully started up an instance of Weaviate. 🎉

:::warning todo
finish
:::

:::tip Authenticating with WCS + Weaviate client
If you do enable OIDC in WCS for added security, the easiest way to authenticate as a user is to use the Weaviate client library.

Consult the authentication for your preferred client library and use the "Resource Owner Password Flow" method, by passing on the `username` and `password` you used to sign in to WCS. See the docs below:
- [Python](../client-libraries/python.md#wcs-authentication)
- [JavaScript](../client-libraries/javascript.md#wcs-authentication)
- [Go](../client-libraries/go.md#wcs-authentication)
- [Java](../client-libraries/java.md#wcs-authentication)
:::

## Recap

* You have a working instance of Weaviate in Weaviate Cloud Services (WCS).
* You have installed a client library in your preferred language.

## Next

* To refactored quickstart

## More resources

:::info Is something broken?
We want you to have the best experience possible here. So if you find that something here doesn't work, or doesn't make sense, please let us know! You can:
- File an [issue on GitHub](https://github.com/weaviate/weaviate-io/issues), or
- Talk to us on [Slack](https://join.slack.com/t/weaviate/shared_invite/zt-goaoifjr-o8FuVz9b1HLzhlUfyfddhw)
:::

import WCSDocsMoreResources from '/_includes/wcs-more-resources-docs.md';

<WCSDocsMoreResources />