---
title: Tenant Offloading
sidebar_position: 5
image: og/docs/configuration.jpg
---

Tenants can be offloaded to cold storage to reduce memory and disk usage, and onloaded back when needed.

## Tenant offload modules

import OffloadingLimitation from '/_includes/offloading-limitation.mdx';

<OffloadingLimitation/>

To configure tenant offloading in Weaviate, you need to add an offloading module to the list of [enabled modules](./modules.md).

## `offload-s3` module

The `offload-s3` module enables you to [offload or onload tenants](../manage-data/tenant-states.mdx#offload-tenant) to/from an S3 bucket.

To use the `offload-s3` module, add `offload-s3` to the `ENABLE_MODULES` in your docker-compose or kubernetes config.

```yaml
services:
  weaviate:
    environment:
      # highlight-start
      ENABLE_MODULES: 'offload-s3' # plus other modules you may need
      OFFLOAD_S3_BUCKET: 'weaviate-offload' # the name of the S3 bucket
      OFFLOAD_S3_BUCKET_AUTO_CREATE: 'true' # create the bucket if it does not exist
      # highlight-end
```

If the target S3 bucket does not exist, the `OFFLOAD_S3_BUCKET_AUTO_CREATE` must be set to `true` so that Weaviate can create the bucket automatically.

### Environment variables

The `offload-s3` module reads the following environment variables:

| Env Var | Description | Default Value |
|---|---|---|
| `OFFLOAD_S3_BUCKET` | The destination S3 bucket to offload tenants. | `weaviate-offload` |
| `OFFLOAD_S3_BUCKET_AUTO_CREATE` | When `true`, Weaviate automatically creates an S3 bucket if it does not exist. | `false` |
| `OFFLOAD_S3_CONCURRENCY` | The number of concurrent offload operations. | `25` |
| `OFFLOAD_TIMEOUT` | The timeout for offloading operations (create bucket, upload, download). | `120` (in seconds) |

:::info Timeout

- Offload operations are asynchronous. As a result, the timeout is for the operation to start, not to complete.
- Each operation will retry up to 10 times on timeouts, except on authentication/authorization errors.

:::

### AWS permissions

:::tip Requirements
The Weaviate instance must have the [necessary permissions to access the S3 bucket](https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-policy-language-overview.html).
- The provided AWS identity must be able to write to the bucket.
- If `OFFLOAD_S3_BUCKET_AUTO_CREATE` is set to `true`, the AWS identity must have permission to create the bucket.
:::

In addition to the vendor-agnostic configuration from above, you can set AWS-specific configuration for authentication. You can choose between access-key or ARN-based authentication:

#### Option 1: With IAM and ARN roles

The backup module will first try to authenticate itself using AWS IAM. If the authentication fails then it will try to authenticate with `Option 2`.

#### Option 2: With access key and secret access key

| Environment variable | Description |
| --- | --- |
| `AWS_ACCESS_KEY_ID` | The id of the AWS access key for the desired account. |
| `AWS_SECRET_ACCESS_KEY` | The secret AWS access key for the desired account. |
| `AWS_REGION` | (Optional) The AWS Region. If not provided, the module will try to parse `AWS_DEFAULT_REGION`. |

## Related pages
- [Configure: Modules](./modules.md)
- [How-to: Manage tenant states](../manage-data/tenant-states.mdx)
- [Guide: Manage tenant states](../starter-guides/managing-resources/tenant-states.mdx)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
