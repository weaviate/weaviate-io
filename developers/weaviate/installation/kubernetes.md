---
title: Kubernetes
sidebar_position: 3
image: og/docs/installation.jpg
# tags: ['installation', 'Kubernetes']
---

:::tip End-to-end guide
For a tutorial on how to use MiniKube to deploy Weaviate on Kubernetes, see the Weaviate Academy course, [Weaviate on Kubernetes](../../academy/deployment/k8s/index.md).
:::

## Requirements

* A recent Kubernetes Cluster (at least version 1.23). If you are in a development environment, consider using the kubernetes cluster that is built into Docker desktop. For more information, see the [Docker documentation](https://docs.docker.com/desktop/kubernetes/).
* The cluster needs to be able to provision `PersistentVolumes` through `PersistentVolumeClaims`.
* A file system that can be mounted read-write by a single node to allow Kubernetes' `ReadWriteOnce` access mode.
* Helm version v3 or higher. The current Helm chart is version `||site.helm_version||`.

## Weaviate Helm chart

:::note Important: Set the correct Weaviate version
As a best practice, explicitly set the Weaviate version in the Helm chart.<br/><br/>

Set the version in your `values.yaml` file or [overwrite the default value](#deploy-install-the-helm-chart) during deployment.
:::

To install the Weaviate chart on your Kubernetes cluster, follow these steps:

### Verify tool setup and cluster access

```bash
# Check if helm is installed
helm version
# Make sure `kubectl` is configured correctly and you can access the cluster.
# For example, try listing the pods in the currently configured namespace.
kubectl get pods
```

### Get the Helm Chart

Add the Weaviate helm repo that contains the Weaviate helm chart.

```bash
helm repo add weaviate https://weaviate.github.io/weaviate-helm
```

Get the default `values.yaml` configuration file from the Weaviate helm chart:
```bash
helm show values weaviate/weaviate > values.yaml
```

### Modify values.yaml

To customize the Helm chart for your environment, edit the [`values.yaml`](https://github.com/weaviate/weaviate-helm/blob/master/weaviate/values.yaml)
file. The default `yaml` file is extensively documented to help you configure your system.

#### Replication

The default configuration defines one Weaviate replica cluster.

#### Local models

Local models, such as `text2vec-transformers`, `qna-transformers`, and  `img2vec-neural` are disabled by default. To enable a model, set the model's
`enabled` flag to `true`.

#### Resource limits

Starting in Helm chart version 17.0.1, constraints on module resources are commented out to improve performance. To constrain resources for specific modules, add the constraints in your `values.yaml` file.

#### gRPC service configuration

Starting in Helm chart version 17.0.0, the gRPC service is enabled by default. If you use an older Helm chart, edit your `values.yaml` file to enable gRPC.

Check that the `enabled` field is set to `true` and the `type` field to `LoadBalancer`. These settings allow you to access the [gRPC API](/blog/grpc-performance-improvements) from outside the Kubernetes cluster.

```yaml
grpcService:
  enabled: true  # ⬅️ Make sure this is set to true
  name: weaviate-grpc
  ports:
    - name: grpc
      protocol: TCP
      port: 50051
  type: LoadBalancer  # ⬅️ Set this to LoadBalancer (from NodePort)
```

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

OIDC authentication is also enabled, with WCD as the token issuer/identity provider. Thus, users with WCD accounts could be authenticated. This configuration sets `someuser@weaviate.io` as an admin user, so if `someuser@weaviate.io` were to authenticate, they will be given full (read and write) privileges.

For further, general documentation on authentication and authorization configuration, see:
- [Authentication](../configuration/authentication.md)
- [Authorization](../configuration/authorization.md)

#### Run as non-root user

By default, weaviate runs as the root user. To run as a non-privileged user, edit the settings in the `containerSecurityContext` section.

The `init` container always runs as root to configure the node. Once the system is started, it run a non-privileged user if you have one configured.

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

The above command (`helm upgrade...`) is idempotent. In other words, you can run it multiple times after adjusting your desired configuration without causing any unintended changes or side effects.

### Upgrading to `1.25` or higher from pre-`1.25`

:::caution Important
:::

To upgrade to `1.25` or higher from a pre-`1.25` version, you must delete the deployed `StatefulSet`, update the helm chart to version `17.0.0` or higher, and re-deploy Weaviate.

See the [1.25 migration guide for Kubernetes](../more-resources/migration/weaviate-1-25.md) for more details.

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

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
