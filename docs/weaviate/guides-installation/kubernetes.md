---
title: Kubernetes
sidebar_position: 3
# layout: layout-documentation
# solution: weaviate
# sub-menu: Installation
# intro: We recommend using Kubernetes to deploy Weaviate for any long-running deployments or those with specific availability expectations, such as production use cases. For local development or personal evaluation, using <a href="./docker-compose.html">Docker Compose</a> will most likely be sufficient.
# description: Kubernetes setup for Weaviate
# tags: ['installation', 'Kubernetes']
# open-graph-type: article
# toc: true
---

# Requirements

* A Kuberentes Cluster with a recent version (e.g. between 1.14 and 1.19)
* The cluster needs to be able to provision `PersistentVolumes` through
  `PersistentVolumeClaims`. No special file systems are required. Any default
  file system capable of `ReadWriteOnce` access mode is sufficient.
* Helm (only v3 is compatible from Helm version `"v{{ site.helm_version }}"`)

# Weaviate Helm chart

To obtain and install the Weaviate chart on your Kubernetes cluster, take the following steps:

## Verify tool setup and cluster access

```bash
# Check if helm is installed
$ helm version
# Make sure `kubectl` is configured correctly and you can access the cluster. 
# For example, try listing the pods in the currently configured namespace.
$ kubectl get pods
```

## Obtain the Helm Chart

Get the Helm chart and `values.yml` configuration file.

```bash
# Set the Weaviate chart version
export CHART_VERSION="v{{ site.helm_version }}"
# Download the Weaviate Helm chart
wget https://github.com/semi-technologies/weaviate-helm/releases/download/$CHART_VERSION/weaviate.tgz
# Download an example values.yml (with the default configuration)
wget https://raw.githubusercontent.com/semi-technologies/weaviate-helm/$CHART_VERSION/weaviate/values.yaml
```

## Adjust the configuration in the values.yml (Optional)

_Note: You can skip this step and run with all default values. In any case,
make sure that you set the correct Weaviate version. This may either be through
explicitly setting it as part of the `values.yaml` or through overwriting the
default as outlined in the deploy step below._

In the [`values.yaml`](https://github.com/semi-technologies/weaviate-helm/blob/master/weaviate/values.yaml)
file you can tweak the configuration to align it with your
setup. The yaml file is extensively documented to help you align the
configuration with your setup.

Out of the box, the configuration file is setup for:

- 1 Weaviate replica. (This cannot be changed at the moment, [see below](#limitations))
- The `text2vec-contextionary` module is enabled and running with 1 replica.
  (This can be adjusted based on the expected load).
- Other modules, such as `text2vec-transformers`, `qna-transformers` or
  `img2vec-neural` are disabled by default. They can be enabled by setting the
  respective `enabled` flag to `true`.

See the resource requests and limits in the example `values.yml`. You can
adjust them based on your expected load and the resources available on the
cluster.

## Deploy (install the Helm chart)

You can deploy the helm charts as follows:

```bash
# Create a Weaviate namespace
$ kubectl create namespace weaviate

# set the desired Weaviate version
export WEAVIATE_VERSION="{{ site.weaviate_version | remove_first: "v" }}"

# Deploy
$ helm upgrade \
  "weaviate" \
  weaviate.tgz \
  --install \
  --namespace "weaviate" \
  --values ./values.yaml \
  --set "image.tag=$WEAVIATE_VERSION"
```

The above assumes that you have permissions to create a new namespace. If you
have only namespace-level permissions, you can skip creating a new
namespace and adjust the namespace argument on `helm upgrade` according to the
name of your pre-configured namespage.

## Updating the installation after the initial deployment

The above command (`helm upgrade...`) is idempotent, you can run it again, for
example after adjusting your desired configuration.

# Additional Configuration Help

- [Cannot list resource “configmaps” in API group when deploying Weaviate k8s setup on GCP](https://stackoverflow.com/questions/58501558/cannot-list-resource-configmaps-in-api-group-when-deploying-weaviate-k8s-setup)
- [Error: UPGRADE FAILED: configmaps is forbidden](https://stackoverflow.com/questions/58501558/cannot-list-resource-configmaps-in-api-group-when-deploying-weaviate-k8s-setup)

# More Resources

{% include docs-support-links.html %}
