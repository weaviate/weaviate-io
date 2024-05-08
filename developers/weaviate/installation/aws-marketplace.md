---
title: AWS Marketplace
sidebar_position: 10
image: og/docs/installation.jpg
# tags: ['installation', 'AWS Marketplace']
---

import ReactPlayer from 'react-player/lazy'

## Overview

<!-- NOTE: To show this page on the sidebar, remove the `sidebar_class_name: hidden` line above. -->

You can use [AWS Marketplace](https://aws.amazon.com/marketplace) to directly launch a Weaviate cluster.

We use an [AWS CloudFormation template](https://aws.amazon.com/cloudformation/) for delivery.

:::info Prerequisites
- An AWS account with sufficient credit / payment method.
- (Recommended) Familiarity with AWS and the AWS console.
:::

<details>
  <summary>
    What resources are used & installed?
  </summary>

This will set up the following resources:
- EKS Cluster with a Single Node Group
    - In the default VPC or a fresh VPC with CIDR 10.0.0.0/16
- Load Balancer Controller for EKS
- aws-ebs-csi-driver for EKS
- The latest selected version of Weaviate (e.g. `1.20.3` if you select `1.20`)
    - This will be installed using our official Helm chart

</details>

## Installation instructions

### Video

If you prefer to follow along with a video, you can watch the following video. Please note that it was recorded in September 2023, and some details may have changed since then.

<ReactPlayer className="react-player" url='https://youtu.be/_2rBrKp83iM' controls='true' />
<br/>

### AWS Marketplace

1. Go to Weaviate's [AWS Marketplace listing](https://aws.amazon.com/marketplace/pp/prodview-cicacyv63r43i)
1. Subscribe to the product in AWS Marketplace by following the instructions on the page. At the time of writing (August 2023), the steps are to:
    1. Click <kbd>Continue to Subscribe</kbd>, then go to the next page
    1. Click <kbd>Continue to Configuration</kbd>, then go to the next page
    1. Select the fulfillment option & software version from the list. Then click <kbd>Continue to Launch</kbd>.
1. Launch the software using a CloudFormation template (select the one for your preferred availability zone in the table below):

| Region | CloudFormation template link (per Availability Zone) |
| --- | --- |
| AP | [ap-northeast-1](https://ap-northeast-1.console.aws.amazon.com/cloudformation/home?region=ap-northeast-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [ap-northeast-2](https://ap-northeast-2.console.aws.amazon.com/cloudformation/home?region=ap-northeast-2#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [ap-northeast-3](https://ap-northeast-3.console.aws.amazon.com/cloudformation/home?region=ap-northeast-3#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [ap-south-1](https://ap-south-1.console.aws.amazon.com/cloudformation/home?region=ap-south-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [ap-southeast-1](https://ap-southeast-1.console.aws.amazon.com/cloudformation/home?region=ap-southeast-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [ap-southeast-2](https://ap-southeast-2.console.aws.amazon.com/cloudformation/home?region=ap-southeast-2#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json) |
| CA | [ca-central-1](https://ca-central-1.console.aws.amazon.com/cloudformation/home?region=ca-central-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json) |
| EU | [eu-central-1](https://eu-central-1.console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [eu-north-1](https://eu-north-1.console.aws.amazon.com/cloudformation/home?region=eu-north-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [eu-west-1](https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [eu-west-2](https://eu-west-2.console.aws.amazon.com/cloudformation/home?region=eu-west-2#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [eu-west-3](https://eu-west-3.console.aws.amazon.com/cloudformation/home?region=eu-west-3#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json) |
| SA | [sa-east-1](https://sa-east-1.console.aws.amazon.com/cloudformation/home?region=sa-east-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json) |
| US | [us-east-1](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [us-east-2](https://us-east-2.console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [us-west-1](https://us-west-1.console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json); [us-west-2](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json) |

### Configuration & Cluster creation

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
- `weaviateAuthType`: We recommend not running Weaviate with anonymous access. We suggest setting it to `apikey` and setting a key, for example by executing `pwgen -A -s 32` to generate a random string.
:::

Once you open the CloudFormation template, you should see a set of options similar to below.

Here, you can:

1. Set the `stack name` for identifying the stack in AWS (required).
1. Set Weaviate/AWS parameters, such as:
    - number of nodes
    - instance types
    - Weaviate authentication parameters.
1. Confirm required resources & proceed to <kbd>Create stack</kbd>.
    - This template may require additional resources and capabilities.

After clicking <kbd>Create stack</kbd>, the creation process may take a while, such as around 30 minutes.

You can check the status of individual resources in the `Events` tab. Once the stack has been created, the status for the stack will change to `✅ CREATE_COMPLETE`.

## Accessing the cluster

Once the stack has been created, you can access the cluster using [`kubectl`](https://kubernetes.io/docs/tasks/tools/), and Weaviate itself using the load balancer.

### Interaction using `kubectl`

You can run the following command which will update or create a kubeconfig file for the Weaviate cluster:

```
aws eks update-kubeconfig --name [cluster-name] --region [aws-region]--role-arn arn:aws:iam::[AccountID]:role/[StackName]-MastersRole[XX]
```

:::tip How to find the kubectl command
The exact command can be found in the CloudFormation stack, in the `Outputs` tab, under the `EKSClusterConfigCommand` output.
:::

Once that's set up, you can run `kubectl` commands as usual. For example

- `kubectl get pods -n weaviate` to list all pods in the `weaviate` namespace.
- `kubectl get svc --all-namespaces` to list all services in all namespaces.

### Finding the Weaviate URL

Once the stack has been created, you can access Weaviate via the load balancer URL.

You can find the Weaviate endpoint URL by any of:
- Going to the `Services` section of AWS, under `EC2` > `Load Balancers`. Find the load balancer, and look for the `DNS name` column.
- Running `kubectl get svc -n weaviate` and looking for the `EXTERNAL-IP` of the `weaviate` service.

The load balancer URL (e.g. `a520f010285b8475eb4b86095cabf265-854109584.eu-north-1.elb.amazonaws.com`) will be the Weaviate URL (e.g. `http://a520f010285b8475eb4b86095cabf265-854109584.eu-north-1.elb.amazonaws.com`).

## Deleting the cluster

You can delete the cluster by deleting the CloudFormation stack.

Please note that this will delete your data in Weaviate. If you want to keep your data, you should back it up or export the data before deleting the cluster.

### Some resources many require manual deletion

:::caution
Please make sure that all unused resources are deleted. You will continue to incur costs for any remaining resources.
:::

There may be some AWS resources that are not deleted automatically when the CloudFormation stack is deleted. For example, EBS volumes, and Key Management Service (KMS) keys may not be deleted from time to time.

You must delete these manually.

#### Tips

- If your CloudFormation stack indicates "DELETE_FAILED", you may be able to re-initiate deletion of these resources.
- Review the `Resources` tab of the CloudFormation stack to find resources that may not have been deleted.
- Key Management Service (KMS) keys may be deleted by going to the KMS console, and deleting the keys manually. You may need to schedule deletion of the keys.


## Billing

You will be charged for Weaviate and associated resources directly by AWS.

This will, for example, include the EC2 instances, EBS volumes, and any other resources used by the cluster.


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>

