---
title: Kubernetes
sidebar_position: 3
image: og/docs/installation.jpg
# tags: ['installation', 'Kubernetes']
---


:::note Important: Set the correct Weaviate version
Make sure to set your desired Weaviate version.

This can be done through either explicitly setting it as part of the `values.yaml` or through overwriting the default as outlined in the [deployment step](#deploy-install-the-helm-chart) below.
:::

:::tip End-to-end guide
If you are looking for a complete end-to-end tutorial on the topic, please the [Weaviate Academy course on Weaviate on Kubernetes](../../academy/deployment/k8s/index.md). The tutorial covers an end-to-end scenario of deploying Weaviate on Kubernetes with Minikube.
:::

## Requirements

* A recent Kubernetes Cluster (at least version 1.23).
  * If you are in a development environment, consider using the kubernetes cluster that is built into Docker desktop. For more information, see the [Docker documentation](https://docs.docker.com/desktop/kubernetes/).
* The cluster needs to be able to provision `PersistentVolumes` through
  `PersistentVolumeClaims`.
* No special file systems are required. Any file system that has a `ReadWriteOnce` access mode is sufficient.
* Helm. To use Helm chart version `"v||site.helm_version||"`, you must have Helm v3 or higher.

## Weaviate Helm chart

To obtain and install the Weaviate chart on your Kubernetes cluster, take the following steps:

### Verify tool setup and cluster access

```bash
# Check if helm is installed
helm version
# Make sure `kubectl` is configured correctly and you can access the cluster.
# For example, try listing the pods in the currently configured namespace.
kubectl get pods
```

### Obtain the Helm Chart

Add the Weaviate helm repo that contains the Weaviate helm chart

```bash
helm repo add weaviate https://weaviate.github.io/weaviate-helm
```

Get the default `values.yaml` configuration file from the Weaviate helm chart:
```bash
helm show values weaviate/weaviate > values.yaml
```

### Modify values.yaml (as necessary)

:::note May not be needed
The default values in `values.yaml` may be sufficient. However, we recommend reviewing:

- The Weaviate version
- Modules to enable
- gRPC service configuration
:::

In the [`values.yaml`](https://github.com/weaviate/weaviate-helm/blob/master/weaviate/values.yaml)
file you can tweak the configuration to align it with your
setup. The yaml file is extensively documented to help you align the
configuration with your setup.

Out of the box, the configuration file is setup for:

- 1 Weaviate replica.
- Local models, such as `text2vec-transformers`, `qna-transformers` or
  `img2vec-neural` are disabled by default. They can be enabled by setting the
  respective `enabled` flag to `true`.
- `grpcService` is disabled by default. If you want to use the gRPC API, set the
  `enabled` flag to `true` and the `type` to the required type, such as `LoadBalancer`. This decision to disable the gRPC service by default is made for backward compatibility, and as different setups might require different configurations.

See the resource requests and limits in the example `values.yaml`. You can
adjust them based on your expected load and the resources available on the
cluster.

#### Authentication and authorization

An example configuration for authentication is shown below.

```yaml
authentication:
  apikey:
    enabled: true
    allowed_keys:
      - readonly-key
      - secr3tk3y
    users:
      - readonly@example.com
      - admin@example.com
  anonymous_access:
    enabled: false
  oidc:
    enabled: true
    issuer: https://auth.wcs.api.weaviate.io/auth/realms/SeMI
    username_claim: email
    groups_claim: groups
    client_id: wcs
authorization:
  admin_list:
    enabled: true
    users:
      - someuser@weaviate.io
      - admin@example.com
    readonly_users:
      - readonly@example.com
```

In this example, the key `readonly-key` will authenticate a user as the `readonly@example.com` identity, and `secr3tk3y` will authenticate a user as `admin@example.com`.

OIDC authentication is also enabled, with WCS as the token issuer/identity provider. Thus, users with WCS accounts could be authenticated. This configuration sets `someuser@weaviate.io` as an admin user, so if `someuser@weaviate.io` were to authenticate, they will be given full (read and write) privileges.

For further, general documentation on authentication and authorization configuration, see:
- [Authentication](../configuration/authentication.md)
- [Authorization](../configuration/authorization.md)

### Deploy (install the Helm chart)

You can deploy the helm charts as follows:

```bash
# Create a Weaviate namespace
kubectl create namespace weaviate

# Deploy
helm upgrade --install \
  "weaviate" \
  weaviate/weaviate \
  --namespace "weaviate" \
  --values ./values.yaml
```

The above assumes that you have permissions to create a new namespace. If you
have only namespace-level permissions, you can skip creating a new
namespace and adjust the namespace argument on `helm upgrade` according to the
name of your pre-configured namespace.

Optionally, you can provide the `--create-namespace` parameter which will create the namespace if not present.

### Updating the installation after the initial deployment

The above command (`helm upgrade...`) is idempotent, you can run it again, for
example after adjusting your desired configuration.

## Additional Configuration Help

- [Cannot list resource "configmaps" in API group when deploying Weaviate k8s setup on GCP](https://stackoverflow.com/questions/58501558/cannot-list-resource-configmaps-in-api-group-when-deploying-weaviate-k8s-setup)
- [Error: UPGRADE FAILED: configmaps is forbidden](https://stackoverflow.com/questions/58501558/cannot-list-resource-configmaps-in-api-group-when-deploying-weaviate-k8s-setup)

### Using EFS with Weaviate

In some circumstances, you may wish, or need, to use EFS (Amazon Elastic File System) with Weaviate. And we note in the case of AWS Fargate, you must create the [PV (persistent volume)](https://kubernetes.io/docs/concepts/storage/persistent-volumes/) manually, as the PVC will NOT create a PV for you.

To use EFS with Weaviate, you need to:

- Create an EFS file system.
- Create an EFS access point for every Weaviate replica.
    - All of the Access Points must have a different root-directory so that Pods do not share the data, otherwise it will fail.
- Create EFS mount targets for each subnet of the VPC where Weaviate is deployed.
- Create StorageClass in Kubernetes using EFS.
- Create Weaviate Volumes, where each volume has a different AccessPoint for VolumeHandle(as mentioned above).
- Deploy Weaviate.

This code is an example of a PV for `weaviate-0` Pod:

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: weaviate-0
spec:
  capacity:
    storage: 8Gi
  volumeMode: Filesystem
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Delete
  storageClassName: "efs-sc"
  csi:
    driver: efs.csi.aws.com
    volumeHandle: <FileSystemId>::<AccessPointId-for-weaviate-0-Pod>
  claimRef:
    namespace: <namespace where Weaviate is/going to be deployed>
    name: weaviate-data-weaviate-0
```

For more, general information on running EFS with Fargate, we recommend reading [this AWS blog](https://aws.amazon.com/blogs/containers/running-stateful-workloads-with-amazon-eks-on-aws-fargate-using-amazon-efs/).

## Troubleshooting

- If you see `No private IP address found, and explicit IP not provided`, set the pod subnet to be in an valid ip address range of the following:

    ```
    10.0.0.0/8
    100.64.0.0/10
    172.16.0.0/12
    192.168.0.0/16
    198.19.0.0/16
    ```


import DocsMoreResources from '/_includes/more-resources-docs.md';

<DocsMoreResources />
