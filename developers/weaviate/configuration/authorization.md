---
title: Authorization
sidebar_position: 35
image: og/docs/configuration.jpg
# tags: ['authorization']
---

The authorization plugin allows Weaviate to provide differentiated access to users based on their [authentication](./authentication.md) status. Along with allowing or disallowing anonymous access, Weaviate can differentiate between a user who is in the admin list, or on the read-only list.

## Admin list

The admin list relies on the configured `Authentication Schema` to correctly identify
the user. On each request, a check against a pre-configured admin list is done.
If the user is contained in this list, they get all permissions. If they aren't,
they get none. It is not currently possible to assign only some rights to a specific user.

## Read-only list

Other than a list of admins, it is also possible to specify a list of read-only users.
Those users have permissions on all `get` and `list` operations, but no other
permissions.

If a subject is present on both the admin and read-only list, Weaviate will
throw an error on startup due to the invalid configuration.

## Usage

:::info Using Kubernetes?
See [this page](../installation/kubernetes.md#authentication-and-authorization) for how to set up `values.yaml` for authentication & authorization.
:::

Configure the admin plugin in the configuration yaml like so:

```yaml
services:
  weaviate:
    ...
    environment:
      ...
      AUTHORIZATION_ADMINLIST_ENABLED: 'true'
      AUTHORIZATION_ADMINLIST_USERS: 'jane@doe.com,john@doe.com'
      AUTHORIZATION_ADMINLIST_READONLY_USERS: 'ian-smith,roberta@doe.com'
```

The above would enable the plugin and make users `jane@doe.com` and
`john@doe.com` admins. Additionally, users `ian-smith` and `roberta@doe.com` will have read-only permissions.

:::note User identifier
As shown in the above example, any string can be used to identify the user. This depends on what you configured in the authentication settings. For example, OIDC users may be identified by their email address by setting `AUTHENTICATION_OIDC_USERNAME_CLAIM` as `email`, whereas API key-authenticated users may be identified as a plain string such as `ian-smith`.
:::

## RBAC

More fine-grained Role-Based Access Control (RBAC) coming soon. As of now the
only possible distinction is between Admins (CRUD), Read-Only Users and
entirely unauthorized users.


## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
