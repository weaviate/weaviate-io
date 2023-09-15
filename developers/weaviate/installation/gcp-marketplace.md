---
title: GCP Marketplace
sidebar_position: 15
image: og/docs/installation.jpg
sidebar_class_name: hidden
# tags: ['installation', 'GCP Marketplace']
---
import Badges from '/_includes/badges.mdx';

<Badges/>

<!-- NOTE: To show this page on the sidebar, remove the `sidebar_class_name: hidden` line above. -->

## Overview

You can use [Google Cloud Marketplace](https://console.cloud.google.com/marketplace) to directly launch a Weaviate cluster.

:::info Prerequisites
- A Google Cloud account with sufficient credit / payment method.
- (Recommended) Familiarity with Google Cloud and the Google Cloud console.
:::

## Installation instructions

Broadly, the steps are as follows:

1. Go to Weaviate's Google Cloud Marketplace listing page and click <kbd>Configure</kbd>.
1. Configure the deployment options as required, by following the on-screen instructions.
<!-- 1. Review the GCP Marketplace Terms of Service, and if you agree with the terms, confirm accordingly. -->
<!-- 1. Select Deploy to start deploying Weaviate on your GKE cluster.  -->

We will go through some of these steps in detail below.

### Configuration options

:::info Before you get started

<!-- #### Some settings may not be changed after launch

Not all settings may be changed after launch. For example, these settings are currently not changeable after launch:
- weaviatePVCSize
- albDriver
- ebsDriver
- vpcUseDefault

#### Some settings may lead to recreation of the cluster

- Changes to the instance type will lead to recreation of the node pool. -->

#### Suggested configurations

- The default values for settings such as `global query limit`, `modules` and `storage size` should be suitable for a majority of cases.
- `Storage size`: For production environments, at least 500GB per pod is recommended. (Smaller disks may be sufficient for dev environments.)
<!-- - `weaviateAuthType`: We recommend not running Weaviate with anonymous access. We suggest setting it to `apikey` and setting a key, for example by excuting `pwgen -A -s 32` to generate a random string. -->

:::

Once you are at the deployment page, you should see a set of options.

You will need to:
1. Select a GKE cluster to deploy Weaviate to.
    - You can create a cluster here and then select it.
1. Set the `namespace` (for dividing cluster resources) and a unique `app instance name` for identifying the application.
1. Set the service account for billing.
1. Set Weaviate parameters, such as `number of nodes`, `global query limit`, `modules` and `storage size`.
    <!-- - Weaviate authentication parameters. -->
1. If you agree, accept the terms of service and click <kbd>Deploy</kbd>.

Once you have done so, Weaviate will be deployed to the selected cluster. This should take a few minutes.

## Accessing the cluster

Once the application has been created, you can access the cluster using [`kubectl`](https://kubernetes.io/docs/tasks/tools/), and Weaviate itself using the load balancer. We show examples below.

### Interaction using `kubectl`

You can run the following command which will update or create a kubeconfig file for the Weaviate cluster:

```
gcloud container clusters get-credentials [YOUR_CLUSTER_NAME] --zone [YOUR_GCP_ZONE] --project [YOUR_GCP_PROJECT]
```

:::tip How to find the kubectl command
The exact command can be found in the Kubernetes Engine page, by clicking on the vertical ellipsis ( <i class="fa-solid fa-ellipsis-vertical"></i> ) for your cluster, and clicking <kbd>Connect</kbd>.
:::

Once that's set up, you can run `kubectl` commands as usual. For example
- `kubectl get pods -n default` to list all pods in the `default` namespace (or whatever namespace you specified).
- `kubectl get svc --all-namespaces` to list all services in all namespaces.

### Finding the Weaviate URL

Once the application has been created, you can access Weaviate via the load balancer URL.

You can find the Weaviate endpoint URL by any of:
- Going to the `Kubernetes Engine` section of Google Cloud, under `Service & Ingress`. Find the load balancer, and look for the `Endpoints` column.
- Running `kubectl get svc -n [YOUR_NAMESPACE_NAME]` and looking for the `EXTERNAL-IP` of the `weaviate` service.
The load balancer URL (e.g. `34.38.6.240`) will be the Weaviate URL (e.g. `http://34.38.6.240`).

## Removing Weaviate and the cluster

:::caution
Please make sure that all unused resources are deleted. You will continue to incur costs for any remaining resources.
:::

### Removing Weaviate

To remove Weaviate and the associated services, go to the `Applications` section of `Kubernetes Engine` in Google Cloud, and delete the Weaviate deployment.

Review the `Services & Ingress` section as well as the `Storage` section to ensure that all associated services and storage are removed. You may need to delete any remaining resources manually.

### Removing the cluster

If you no longer require the cluster (e.g. if you created a new cluster for Weaviate), you can delete the cluster by going to the `Applications` section of `Kubernetes Engine` in Google Cloud. Delete the cluster by selecting it from the list, clicking <kbd>DELETE</kbd>, and following the prompts.

## Billing

You will be charged for Weaviate and associated resources directly by Google Cloud.

This will, for example, include the compute instances, volumes, and any other resources used by the cluster.

## More Resources

import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />

