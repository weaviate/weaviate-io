---
title: Enable and configure RBAC
sidebar_label: Enable RBAC
sidebar_position: 1
image: og/docs/configuration.jpg
# tags: ['rbac', 'roles', 'configuration', 'authorization']
---

:::info Added in `v1.29`
Role-based access control (RBAC) is generally available in Weaviate from version `v1.29`.
:::

Role-based access control (RBAC) is a method of restricting access to resources based on the roles of users. In Weaviate, RBAC allows you to **[define roles and assign permissions](/developers/weaviate/configuration/rbac/manage-roles.mdx)** to those roles. Users can then be assigned to roles and inherit the permissions associated with those roles.

Weaviate comes with a set of predefined roles. These roles are:

- `root`: The root role has full access to all resources in Weaviate.
- `viewer`: The viewer role has read-only access to all resources in Weaviate.

The `root` role can be assigned through the Weaviate configuration file. A predefined role cannot be modified. The user can, however, be assigned additional roles through the Weaviate API.

:::tip Root user requirement in older versions
In Weaviate versions `v1.30.6` and `v1.31.0` or below, if RBAC is enabled, you must configure at least one user with the built-in root role. Otherwise, Weaviate will not start. This requirement was removed in versions `v1.30.7` and `v1.31.1`.
:::

## Docker <i class="fa-brands fa-docker"></i> {#docker}

RBAC authorization can be configured using environment variables. In Docker Compose, set them in the configuration file (`docker-compose.yml`) such as in the following example:

```yaml
services:
  weaviate:
    ...
    environment:
      ...
      # Example authentication configuration using API keys
      # OIDC access can also be used with RBAC
      AUTHENTICATION_ANONYMOUS_ACCESS_ENABLED: 'false'
      AUTHENTICATION_APIKEY_ENABLED: 'true'
      AUTHENTICATION_APIKEY_ALLOWED_KEYS: 'root-user-key'
      AUTHENTICATION_APIKEY_USERS: 'root-user'

      # Authorization configuration
      # Enable RBAC
      AUTHORIZATION_RBAC_ENABLED: 'true'

      # Provide pre-configured roles to users
      # This assumes that the relevant user has been authenticated and identified

      # You MUST define at least one root user
      AUTHORIZATION_RBAC_ROOT_USERS: 'root-user'
      # Enable the runtime user management
      AUTHENTICATION_DB_USERS_ENABLED: 'true'
```

This configuration:
- Enables RBAC
- Configures `root-user` as a user with built-in admin permissions

You can connect to your instance with the root user in order to [create new users](./manage-users.mdx) which can be assigned custom roles and permissions using the [REST API](/developers/weaviate/api/rest#tag/authz) or [programmatically using a client library](./manage-roles.mdx).

import DynamicUserManagement from '/_includes/configuration/dynamic-user-management.mdx';

<DynamicUserManagement />

:::caution Changes in environment variables
As of Weaviate version `v1.29` these environment variables have changed:
- `AUTHORIZATION_VIEWER_USERS` and `AUTHORIZATION_ADMIN_USERS` were removed
- `AUTHORIZATION_ADMIN_USERS` has been replaced with `AUTHORIZATION_RBAC_ROOT_USERS`
:::

## Kubernetes <i class="fa fa-cubes"></i> {#kubernetes}

For Kubernetes deployments using Helm, API key authentication can be configured in the `values.yaml` file under the `authorization` section. Here's an example configuration:

```yaml
# Example authentication configuration using API keys
authentication:
  anonymous_access:
    enabled: false
  apikey:
    enabled: true
    allowed_keys:
      - root-user-key
    users:
      - root-user

# Authorization configuration
authorization:
  rbac:
    # Enable RBAC
    enabled: true
    # Provide pre-configured roles to users
    # This assumes that the relevant user has been authenticated and identified
    #
    # You MUST define at least one root user
    root_users:
    - root-user
```

This configuration:
- Enables RBAC
- Configures `root-user` as a user with built-in admin permissions

You can connect to your instance with the root user in order to [create new users](./manage-users.mdx) which can be assigned custom roles and permissions using the [REST API](/developers/weaviate/api/rest#tag/authz) or [programmatically using a client library](./manage-roles.mdx).

## RBAC and performance

RBAC is a powerful feature that allows you to define fine-grained access control policies. However, it can also have an impact on performance as each operation must be checked against the user's permissions.

The exact performance impact will depend on your setup and use case. In our internal testing, the most significant performance impact was seen for object creation operations.

We did not observe additional performance penalties for using custom roles over the built-in roles.

Here are some tips to optimize performance when using RBAC:
- Monitor object creation performance
- Use a high availability (i.e. 3+ nodes) setup to distribute the load

## Further resources

- [RBAC: Overview](./index.mdx)
- [RBAC: Manage roles](./manage-roles.mdx)
- [RBAC: Manage users](./manage-users.mdx)
- [RBAC: Tutorial](../../tutorials/rbac.mdx)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
