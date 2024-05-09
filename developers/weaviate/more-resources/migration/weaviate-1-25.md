---
title: 1.25 (For Kubernetes users)
sidebar_position: 10
image: og/docs/more-resources.jpg
# tags: ['migration']
---

# Weaviate 1.25 migration guide for Kubernetes users

## Assumptions & requirements

This migration guide assumes that you have:

- A working knowledge of kubernetes, helm and shell commands.
- Deployed Weaviate on kubernetes, in the `weaviate` namespace
- Access to your helm configuration file e.g. (`values.yaml`).

## Migration overview

Weaviate `1.25` introduces [RAFT](https://raft.github.io/) as the consensus algorithm for its database schema, in order to improve its fault tolerance. This change requires a migration of the entire schema.

As a result, to migrate from a pre-`1.25` version of Weaviate to `1.25` on kubernetes, you must follow these steps:

- Delete the deployed [`StatefulSet`](https://kubernetes.io/docs/concepts/workloads/controllers/statefulset/)
- Update the helm chart to version `17.0.0` or higher
- Re-deploy Weaviate
- Wait for schema migration to complete

For more details, refer to the [upgrade instructions](#upgrade-instructions) below.

To downgrade from `1.25` to a pre-`1.25` version, you must perform a `POST` request to the `v1/cluster/schema-v1` endpoint to downgrade the schema. Then, you must similarly delete the deployed `StatefulSet` and downgrade Weaviate to the desired version.

For more details, refer to the [downgrade instructions](#downgrade-instructions) below.

:::caution Cluster downtime

Please note that as this upgrade requires the entire schema to be migrated, some downtime is required for the cluster. The length of the downtime will depend on the size of the database.
<br/>

We suggest performing this upgrade at a least disruptive time, or even provisioning a secondary cluster while the main cluster is being restarted.

:::

## Upgrade instructions

:::note namespace

If your deployment is on another namespace, modify the instructions below accordingly, where it follows `-n`. For example, if your deployment is on `my_namespace` , the first command will become `kubectl delete sts weaviate -n my_namespace`.

:::

### (Optional) Backup

Before proceeding with the upgrade, we recommend making a [backup](/developers/weaviate/configuration/backups.md) of your Weaviate database. If a backup is not possible, you can explore other options, such as manually [exporting your data](/developers/weaviate/manage-data/migrate.mdx)

### 1. Delete StatefulSet

First, delete the existing StatefulSet. This will delete all the pods in the namespace.

```bash
kubectl delete sts weaviate -n weaviate
```

You should see an output like this:

```bash
statefulset.apps "weaviate" deleted
```

Once the StatefulSet is deleted, you should not see any pods in the namespace.

```bash
kubectl get pods -n weaviate
```

### 2. Update Helm Chart

Then, update the repository to fetch the latest changes:

```bash
helm repo update weaviate
```

Check the helm chart version as shown below. (It should be at least `17.0.0`.)

```bash
helm search repo weaviate
```

### 3. Deploy Weaviate

Then, re-deploy Weaviate as shown below. This will apply your existing configuration file `values.yaml`, and allow the Weaviate cluster to restart anew under the new consensus algorithm (RAFT).

Here, the image tag is overridden to `1.25.0`. You can also modify this value directly in the `values.yaml` file.

```bash
helm upgrade weaviate weaviate/weaviate \
  --namespace weaviate \
  --values ./values.yaml \
  --set image.tag="1.25.0" \
```

### 4. Verify update

The pods may take a little bit of time to get up and running again. To confirm that the cluster is up and running, you can view the `v1/cluster/statistics` endpoint.

For example, you can use `curl` (and `jq` for pretty printing) to check the status of the cluster. (Remember to replace `localhost:8080` with the correct URL & port.)

```bash
curl -s localhost:8080/v1/cluster/statistics | jq
```

If successful, you should see a response similar to this:

```json
{
  "statistics": [
    {
      // ...
      "leaderAddress": "10.244.2.3:8300",
      "leaderId": "weaviate-0",
      "name": "weaviate-0",
      "open": true,
      "raft": {},
      "ready": true,
      "status": "HEALTHY"
    },
    {
      // ...
      "leaderAddress": "10.244.1.3:8300",
      "leaderId": "weaviate-1",
      "name": "weaviate-1",
      "open": true,
      "raft": {},
      "ready": true,
      "status": "HEALTHY"
    },
    {
      // ...
      "leaderAddress": "10.244.0.4:8300",
      "leaderId": "weaviate-2",
      "name": "weaviate-2",
      "open": true,
      "raft": {},
      "ready": true,
      "status": "HEALTHY"
    }
  ],
  // highlight-start
  "synchronized": true
  // highlight-end
}
```

If the number of objects under `statistics` matches the number of replicas you have set in your `values.yaml` file, and the `synchronized` flag is `true`, then the cluster is up and running.

## Downgrade instructions

If you need to downgrade from `1.25` to a pre-`1.25` version, you must perform a `POST` request to the `v1/cluster/schema-v1` (a payload is not required) to downgrade the schema.

### 1. Downgrade schema

Perform the following request to downgrade the schema. This will prepare the cluster for a downgrade to a pre-`1.25` version. (Remember to replace `localhost:8080` with the correct URL & port.)

```bash
curl -X POST -s -o /dev/null -w "%{http_code}" localhost:8080/v1/cluster/schema-v1
```

This should return a `200` status code.

### 2. Delete StatefulSet

After downgrading the schema, delete the existing StatefulSet. This will delete all the pods in the namespace.

```bash
kubectl delete sts weaviate -n weaviate
```

### 3. Downgrade Weaviate

Now, proceed with the downgrade of Weaviate. Run the following command, for example, to downgrade to version `1.24.10`.

```bash
helm upgrade weaviate weaviate/weaviate \
  --namespace weaviate \
  --values ./values.yaml \
  --set image.tag="1.24.10"
```

This should bring the cluster back to your specified pre-`1.25` version.

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
