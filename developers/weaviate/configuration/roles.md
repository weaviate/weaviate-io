---
title: RBAC Roles
sidebar_position: 38
image: og/docs/configuration.jpg
# tags: ['rbac', 'roles', 'configuration', 'authorization']
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import FilteredTextBlock from '@site/src/components/Documentation/FilteredTextBlock';
import PyCode from '!!raw-loader!/_includes/code/python/howto.configure.rbac.permissions.py';

Weaviate provides differentiated access through [authorization](./authorization.md) levels, based on the [authenticated](./authentication.md) user identity.

If role-based access control (RBAC) is enabled, access can be further restricted based the roles of users. In Weaviate, RBAC allows you to define roles and assign permissions to those roles. Users can then be assigned to roles, and inherit the permissions associated with those roles.

Roles and permissions can be managed through Weaviate, directly through the REST API or through the client libraries.

Refer to the client library examples below, or [the REST API documentation](../api/rest.md) for concrete examples on how to manage roles.

## Roles

### Predefined roles

Weaviate comes with a set of predefined roles. These roles are:

- `admin`: The admin role has full access to all resources in Weaviate.
- `viewer`: The viewer role has read-only access to all resources in Weaviate.

They are assigned to users based on the Weaviate configuration file. Once a user is assigned a predefined role, their permissions are set accordingly. These roles cannot be modified, and these users cannot have additional roles assigned to them.

Refer to the [authorization](./authorization.md) page for more information on how to assign predefined roles to users.

### Custom roles

Any authenticated user that is not assigned a predefined role has no roles or permissions by default.

These users' permissions can be modified through Weaviate by those with the appropriate permissions. This allows for the creation of custom roles, which can be assigned to users as needed.

## Permissions

Permissions in Weaviate define what actions users can perform on specific resources. Each permission consists of:

- A resource type (e.g., collections, objects)
- Access levels (read, write, update, delete)
- Optional resource-specific constraints

### Available permissions

Permissions can be defined for the following resources:

1. **Role Management**
    - Read roles
    - Manage roles (confers all permissions)

1. **Collections** (collection definitions only, data object permissions are separate)
    - Create, read, update, and delete collection definitions
    - Manage collections (confers all permissions)

1. **Data Objects**
    - Read, write, update, and delete objects
    - Manage collections (confers all permissions)

1. **Backup**
    - Manage backups (confers all permissions)

1. **Cluster Data Access**
    - Read cluster metadata

1. **Node Data Access**
    - Read node metadata at a specified verbosity level

:::caution Role Management Permissions
Be careful when assigning permissions to roles that manage roles. These permissions can be used to escalate privileges by assigning additional roles to users. Only assign these permissions to trusted users.
:::

## Define permissions

Some example permission definitions are shown below:

### Administrative permissions example

This example confers administrative permissions to a user for collections starting with `TargetCollection_`, and read permissions to nodes and cluster metadata.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START AdminPermissionDefinition"
      endMarker="# END AdminPermissionDefinition"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### Viewer permissions example

This example confers viewer permissions to a user for collections starting with `TargetCollection_`.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ViewerPermissionDefinition"
      endMarker="# END ViewerPermissionDefinition"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

## Role management

### Create a role

### Add permissions to a role

### Assign a role to a user

### Get the current user's roles

### Check if a role exists

### Inspect a role

### List a user's roles

### List all roles

### List users with a role

### Delete a role

### Revoke a role from a user

### Remove a permission from a role
