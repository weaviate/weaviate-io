---
title: GCP Marketplace
sidebar_position: 15
image: og/docs/installation.jpg
sidebar_class_name: hidden
# tags: ['installation', 'GCP Marketplace']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

:::warning TODO
Notes: This is WIP - where we need more information, I have added TODOs and indented them as quotes. Please remove the TODOs once the information has been added.
:::

## Overview

You can use [Google Cloud Marketplace](https://console.cloud.google.com/marketplace) to directly launch a Weaviate cluster.

:::info Prerequisites
- A Google Cloud account with sufficient credit / payment method.
- (Recommended) Familiarity with Google Cloud and the Google Cloud console.
:::

:::warning TODO
Add a list of resources similar to [the AWS page](./aws-marketplace.md#overview) in the collapsible section below.
:::

<details>
  <summary>
    What resources are used & installed?
  </summary>

This will set up the following resources:

</details>

## Installation instructions

Broadly, the steps are as follows:

1. Go to Weaviate's [Google Cloud Marketplace listing] (ADD LINK HERE; REMOVE SPACE IN MD)
1. Configure the deployment options as required, by following the on-screen instructions.
1. Review the GCP Marketplace Terms of Service, and if you agree with the terms, confirm accordingly.
1. Select Deploy to start deploying Weaviate on your GKE cluster. This may take a while, such as around 30 minutes.

We will go through some of these steps in detail below.

### Configuration & Cluster creation

:::warning TODO
Review the below admonition section about immutable settings re: GCP application, and list variables & suggested config as appropriate.
:::

:::info Before you get started
#### Some settings may not be changed after launch

Not all settings may be changed after launch. For example, these settings are currently not changeable after launch:
- weaviatePVCSize
- albDriver
- ebsDriver
- vpcUseDefault

#### Some settings may lead to recreation of the cluster

- Changes to the instance type will lead to recreation of the node pool.

#### Suggested configurations

- The default values should be suitable for a majority of cases.
- `weaviatePVCSize`: For production environments, at least 500GB per StatefulSet pod is recommended. (Smaller disks may be sufficient for dev environments.)
- `weaviateAuthType`: We recommend not running Weaviate with anonymous access. We suggest setting it to `apikey` and setting a key, for example by excuting `pwgen -A -s 32` to generate a random string.
:::

Once you are at the deployment options, you should see a set of options.

:::warning TODO
Review & confirm what the users will be actually doing.
:::

> Here, you can:
>
> 1. Set the `stack name` for identifying the stack in AWS (required).
> 1. Set Weaviate/AWS parameters, such as:
>     - number of nodes
>     - instance types
>     - Weaviate authentication parameters.
> 1. Confirm required resources & proceed to <kbd>Create stack</kbd>.
>     - This template may require additional resources and capabilities.
>
> After clicking <kbd>Create stack</kbd>, the creation process may take a while, such as around 30 minutes.
>
> You can check the status of individual resources in the `Events` tab. Once the stack has been created, the status for the stack will change to `✅ CREATE_COMPLETE`.

## Accessing the cluster

Once the stack has been created, you can access the cluster using [`kubectl`](https://kubernetes.io/docs/tasks/tools/), and Weaviate itself using the load balancer.

### Interaction using `kubectl`

You can run the following command which will update or create a kubeconfig file for the Weaviate cluster:

:::warning TODO
Where do the users get the cluster name / DNS address from?
:::

> ```
> aws eks update-kubeconfig --name [cluster-name] --region [aws-region]--role-arn arn:aws:iam::[AccountID]:role/[StackName]-MastersRole[XX]
> ```
>
> :::tip How to find the kubectl command
> The exact command can be found in the CloudFormation stack, in the `Outputs` tab, under the `EKSClusterConfigCommand` output.
> :::

Once that's set up, you can run `kubectl` commands as usual. For example

- `kubectl get pods -n weaviate` to list all pods in the `weaviate` namespace.
- `kubectl get svc --all-namespaces` to list all services in all namespaces.

### Finding the Weaviate URL

Once the stack has been created, you can access Weaviate via the load balancer URL.

> You can find the Weaviate endpoint URL by any of:
> - In the `Services` section of AWS, under `EC2` > `Load Balancers`. Find the load balancer, and look for the `DNS name` column.
> - Running `kubectl get svc -n weaviate` and looking for the `EXTERNAL-IP` of the `weaviate` service.
>
> The load balancer URL (e.g. `a520f010285b8475eb4b86095cabf265-854109584.eu-north-1.elb.amazonaws.com`) will be the Weaviate URL (e.g. `http://a520f010285b8475eb4b86095cabf265-854109584.eu-north-1.elb.amazonaws.com`).

## Deleting the cluster

:::warning TODO
How do the users delete the cluster?
:::

> You can delete the cluster by deleting the CloudFormation stack.
>
> Please note that this will delete your data in Weaviate. If you want to keep your data, you should back it up or export the data before deleting the cluster.

### Some resources many require manual deletion

:::warning TODO
Is this still true for GCP?
:::

> :::caution
> Please make sure that all resources are deleted. If you do not delete all resources, you will continue to incur costs in AWS.
> :::
>
> There may be some AWS resources that are not deleted automatically when the CloudFormation stack is deleted. For example, EBS volumes, and Key Management Service (KMS) keys may not be deleted from time to time.
>
> You must delete these manually.

#### Tips

:::warning TODO
What tips do we have for GCP users?
:::

> - If your CloudFormation stack indicates "DELETE_FAILED", you may be able to re-initiate deletion of these resources.
> - Review the `Resources` tab of the CloudFormation stack to find resources that may not have been deleted.
> - Key Management Service (KMS) keys may be deleted by going to the KMS console, and deleting the keys manually. You may need to schedule deletion of the keys.


## Billing

You will be charged for the Weaviate cluster directly by Google Cloud, based on the resources used.

This will, for example, include the compute instances, volumes, and any other resources used by the cluster.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

