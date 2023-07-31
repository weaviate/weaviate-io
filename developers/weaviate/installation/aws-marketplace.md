---
title: AWS Marketplace
sidebar_position: 8
image: og/docs/installation.jpg
# tags: ['installation', 'AWS Marketplace']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

import Marketplace_1_Subscribe from './img/marketplace_1_subscribe.png';
import Marketplace_2_Continue from './img/marketplace_2_continue.png';
import Marketplace_3_Configure from './img/marketplace_3_configure.png';
import Marketplace_4_Launch from './img/marketplace_4_launch.png';
import aws_config_1 from './img/aws_config_1.png';
import aws_config_2 from './img/aws_config_2.png';
import aws_config_3 from './img/aws_config_3.png';

## Overview

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

### AWS Marketplace

1. Go to Weaviate's AWS Marketplace listing
    - (e.g. by searching for "Weaviate")
1. Click <kbd>Continue to Subscribe</kbd>.
    - <img src={Marketplace_1_Subscribe} width="100%" alt="Subscribe to AWS listing"/>
1. Once ready, click <kbd>Continue to Configuration</kbd>.
    - <img src={Marketplace_2_Continue} width="100%" alt="Continue to configuration"/>
1. Select the fulfillment option & software version from the list. Then click <kbd>Continue to Launch</kbd>.
    - <img src={Marketplace_3_Configure} width="100%" alt="Configure the software"/>
1. Launch the software using a CloudFormation template (select the one for your preferred region below):
    - [eu-central-1](https://eu-central-1.console.aws.amazon.com/cloudformation/home?region=eu-central-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json)
    - [us-east-1](https://us-east-1.console.aws.amazon.com/cloudformation/home?region=us-east-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json)
    - [us-east-2](https://us-east-2.console.aws.amazon.com/cloudformation/home?region=us-east-2#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json)
    - [us-west-1](https://us-west-1.console.aws.amazon.com/cloudformation/home?region=us-west-1#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json)
    - [us-west-2](https://us-west-2.console.aws.amazon.com/cloudformation/home?region=us-west-2#/stacks/quickcreate?templateURL=https://weaviate-aws-marketplace.s3.amazonaws.com/cdk-assets/latest/WeaviateEKS.template.json)

### Configuration & Launch

Once you open the CloudFormation template, you should see a set of options similar to below.

:::info Some settings may not be changed after launch
Not all settings may be changed after launch. For example, these settings are currently not changeable after launch:
- weaviatePVCSize
- albDriver
- ebsDriver
- vpcUseDefault
:::

:::tip Suggested configurations
- The default values should be suitable for a majority of cases.
- `weaviatePVCSize`: For production environments, at least 500GB per StatefulSet pod is recommended. (Smaller disks may be sufficient for dev environments.)
- `weaviateAuthType`: We recommend not running Weaviate with anonymous access. We suggest setting it to `apikey` and setting a key, for example by excuting `pwgen -A -s 32` to generate a random string.
:::

Here, you can:

1. Set `stack name` for identifying the stack in AWS (required).
    - <img src={aws_config_1} width="100%" alt="Configuration 1"/>
1. Set Weaviate/AWS parameters, such as:
    - number of nodes
    - instance types
    - Weaviate authentication parameters.
    - <img src={aws_config_2} width="100%" alt="Configuration 1"/>
1. Confirm required resources & proceed to <kbd>Create stack</kbd>.
    - This template may require additional resources and capabilities.
    - <img src={aws_config_3} width="100%" alt="Configuration 1"/>


:::note
- Changes to the instance type will lead to recreation of the node pool.
:::

After clicking <kbd>Create stack</kbd>, the creation process may take a while, such as around 30 minutes.

:::tip How to check the status of Stack creation
- Once the stack has been created, the status for the stack will change to `✅ CREATE_COMPLETE`.
- You can check the status of individual resources in the `Events` tab.
:::

## Usage

Once the stack has been created, you can access the cluster using [`kubectl`](https://kubernetes.io/docs/tasks/tools/), and Weaviate itself using the load balancer.

### `kubectl` access

You can run the following command to access the cluster using `kubectl`:

```
aws eks update-kubeconfig --name [cluster-name] --region [aws-region]--role-arn arn:aws:iam::[AccountID]:role/[StackName]-MastersRole[XX]
```

:::tip How to find the kubectl command
The exact command can be found in the CloudFormation stack, in the `Outputs` tab, under the `EKSClusterConfigCommand` output.
:::

Once that's set up, you can run `kubectl` commands as usual. For example

- `kubectl get pods -n weaviate` to list all pods in the `weaviate` namespace.
- `kubectl get svc --all-namespaces` to list all services in all namespaces.

### Accessing Weaviate

Once the stack has been created, you can access Weaviate via the load balancer URL.

You can find the URL by any of:
- Going to the CloudFormation stack, in the `Outputs` tab.
- In the `Services` section of AWS, under `EC2` > `Load Balancers`.
- Running `kubectl get svc -n weaviate` and looking for the `EXTERNAL-IP` of the `weaviate` service.

## Billing

You will be charged for the Weaviate cluster directly by AWS, based on the resources used.

This will, for example, include the EC2 instances, EBS volumes, and any other resources used by the cluster.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

