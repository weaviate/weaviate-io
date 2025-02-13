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

:::info Available from `v1.29`
Role-based access control (RBAC) was added in Weaviate version `v1.29`.
:::

Weaviate provides differentiated access through [authorization](./authorization.md) levels, based on the [authenticated](./authentication.md) user identity.

If role-based access control (RBAC) is enabled, access can be further restricted based on the roles of users. In Weaviate, RBAC allows you to define roles and assign permissions to those roles. Users can then be assigned to roles, and inherit the permissions associated with those roles.

Roles and permissions can be managed through Weaviate API (e.g. via REST API directly, or through a client library).

Refer to the client library examples below or [the REST API documentation](../api/rest.md) for concrete examples on how to manage roles and permissions.

## Roles

### Predefined roles

Weaviate comes with a set of predefined roles. These roles are:

- `root`: The root role has **full access** to all resources in Weaviate.
- `viewer`: The viewer role has **read-only access** to all resources in Weaviate.

The `root` role can be assigned through the Weaviate configuration file using the [`AUTHORIZATION_RBAC_ROOT_USERS`](/developers/weaviate/config-refs/env-vars#rbac-authorization) environment variable. A predefined role cannot be modified. The user can, however, be assigned additional roles through the Weaviate API.

All roles can also be assigned through the Weaviate API, including the predefined role. The predefined roles cannot be modified, but they can be assigned to or revoked from users.

Refer to the [authorization](./authorization.md) page for more information on how to assign predefined roles to users.

### Custom roles

Any authenticated user that is not assigned a predefined role has no roles or permissions by default.

These users' permissions can be modified through Weaviate by those with the appropriate permissions for **managing roles**. This allows for the creation of custom roles, which can be assigned to users as needed.

Role management requires appropriate `role` resource permissions through a predefined `root` role or a role with [`manage_roles` permission](#role-management).

:::caution Role Management Permissions
Be careful when assigning permissions to roles that manage roles. These permissions can be used to escalate privileges by assigning additional roles to users. Only assign these permissions to trusted users.
:::

## Permissions

Permissions in Weaviate define what actions users can perform on specific resources. Each permission consists of:

- A resource type (e.g., collections, objects)
- Access levels (read, write, update, delete, manage)
- Optional resource-specific constraints

### Available permissions

Permissions can be defined for the following resources:

1. [**Role Management**](#role-management)
    - Read roles
    - Manage roles

1. [**Collections**](#role-management-collections) (collection definitions only, data object permissions are separate)
    - Create, read, update, and delete collection definitions

1. [**Tenants**](#role-management-tenants)
    - Create, read, update, and delete tenants

1. [**Data Objects**](#role-management-data)
    - Read, write, update, and delete objects

1. [**Backup**](#role-management-backup)
    - Manage backups

1. [**Cluster Data Access**](#role-management-clusters)
    - Read cluster metadata

1. [**Node Data Access**](#role-management-nodes)
    - Read node metadata at a specified verbosity level

### Permission behavior

When defining permissions, setting a permission to `False` indicates that the permission is *not set*, rather than explicitly denying access. This means that if a user has multiple roles, and one role grants a permission while another sets it to `False`, the user will still have that permission through the role that grants it.

For example, if a user has two roles:
- Role A sets `read` to `False` for Collection X
- Role B sets `read` to `True` for Collection X

The user will have read access to Collection X because Role B grants the permission, while Role A's `False` value simply indicates no permission is set rather than blocking access.

#### Wildcards in permissions

Many permissions require a collection name filter, to specify which collections the permission applies to.

In this case, `"*"` acts as a multi-character wildcard. As an example, setting a permission with `"Test_*"` as the collection filter would apply that permission to all collections that start with `Test_`. Or, setting a permission with `"*"` as the collection filter would apply that permission to all available collections.

### Collection and tenant permissions

A collection permission is independent of tenant permissions.

To have permissions to operate on a tenant that belongs to a collection, the user must have the appropriate tenant-level permissions for that collection. Collection-level permissions, such as that to create collections, do not grant the equivalent tenant-level permissions, such as that to create tenants for that collection.

For example, to create a tenant in a collection called `Test_Collection`, the user must have permission to "create" tenants in that collection. This is separate from the permission to create a collection called `Test_Collection`.

## Example permission sets

### Read and write permissions

This grants read and write permissions for collections starting with `TargetCollection_`, and read permissions to nodes and cluster metadata.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START ReadWritePermissionDefinition"
      endMarker="# END ReadWritePermissionDefinition"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Viewer permissions

This grants viewer permissions for collections starting with `TargetCollection_`.

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

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Example tenant permissions

This grants permissions to manage collections starting with `TargetCollection_`, and to create, read, and update tenants in the same collection.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={PyCode}
      startMarker="# START MTPermissionsExample"
      endMarker="# END MTPermissionsExample"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

import RolePyCode from '!!raw-loader!/_includes/code/python/howto.configure.rbac.roles.py';

## RBAC role management

Role management requires appropriate `role` resource permissions through a predefined `root` role or a role with `manage_roles` permission.

For more information see the [Authentication](./authentication.md) and [Authorization](./authorization.md) pages.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AdminClient"
      endMarker="# END AdminClient"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Create new roles with permissions

#### Create a role with `Role Management` permissions {#role-management}

This example creates a role called `devrel` with permissions to:
- Manage all roles starting with `TargetRole_`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddManageRolesPermission"
      endMarker="# END AddManageRolesPermission"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

#### Create a role with `Collections` permissions {#role-management-collections}

This example creates a role called `devrel` with permissions to:
- Create, read, update and delete all collections starting with `TargetCollection_`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddCollectionsPermission"
      endMarker="# END AddCollectionsPermission"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

#### Create a role with `Tenant` permissions {#role-management-tenants}

This example creates a role called `devrel` with permissions to:
- Create, read, update and delete tenants in collections starting with `TargetCollection_`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddTenantPermission"
      endMarker="# END AddTenantPermission"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

#### Create a role with `Data Objects` permissions {#role-management-data}

This example creates a role called `devrel` with permissions to:
- Create, read, update and delete data from collections starting with `TargetCollection_`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddDataObjectPermission"
      endMarker="# END AddDataObjectPermission"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

#### Create a role with `Backup` permissions {#role-management-backups}

This example creates a role called `devrel` with permissions to:
- Manage backups for collections starting with `TargetCollection_`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddBackupPermission"
      endMarker="# END AddBackupPermission"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

#### Create a role with `Cluster Data Access` permissions {#role-management-clusters}

This example creates a role called `devrel` with permissions to:
- Read cluster metadata.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddClusterPermission"
      endMarker="# END AddClusterPermission"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

#### Create a role with `Node Data Access` permissions {#role-management-nodes}

This example creates a role called `devrel` with permissions to:
- Read node metadata at the specified verbosity level for collections starting with `TargetCollection_`.

<Tabs groupId="languages">
  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddNodesPermission"
      endMarker="# END AddNodesPermission"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>
</Tabs>

### Grant additional permissions

Additional permissions can be granted to a role at any time. The role must already exist.

This example grants additional permissions to the `devrel` role to:

- Read data in all collections that start with `Test_`.
- Create new data in `Test_DevRel`.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddRoles"
      endMarker="# END AddRoles"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Remove permissions from a role

Permissions can be removed from a role at any time. Removing all permissions from a role will not delete the role itself.

This example removes from the `devrel` role permissions to:

- Read the data from collections that start with `Test_`
- Create and delete collections called `Test_DevRel`

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START RemovePermissions"
      endMarker="# END RemovePermissions"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Assign a role to a user

A custom user can have any number of roles assigned to them (including none). The role can be a predefined role (e.g. `viewer`) or a custom role.

This example assigns the custom `devrel` role and predefined `viewer` role to `user-b`.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AssignRole"
      endMarker="# END AssignRole"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Get the current user's roles and permissions

Retrieve the role and permission information for the currently authenticated user.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START ListCurrentUserRoles"
      endMarker="# END ListCurrentUserRoles"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Get a user's roles and permissions

Retrieve the role and permission information for any user.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START ListUserRoles"
      endMarker="# END ListUserRoles"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Check if a role exists

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START CheckRoleExists"
      endMarker="# END CheckRoleExists"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Inspect a role

View the permissions assigned to a role.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START InspectRole"
      endMarker="# END InspectRole"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### List all roles

View all roles in the system and their permissions.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START ListAllRoles"
      endMarker="# END ListAllRoles"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### List users with a role

List all users who have the role `devrel`. 

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AssignedUsers"
      endMarker="# END AssignedUsers"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Delete a role

Deleting a role will remove it from the system, and revoke the associated permissions from all users who had this role.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START DeleteRole"
      endMarker="# END DeleteRole"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

### Revoke a role from a user

You can revoke one or more roles from a specific user.

This example revokes the `devrel` role from the user `user-b`.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START RevokeRoles"
      endMarker="# END RevokeRoles"
      language="py"
    />
  </TabItem>

  <TabItem value="js" label="JS/TS Client v3">

```ts
// TS support coming soon
```

  </TabItem>

  <TabItem value="go" label="Go">

```go
// Go support coming soon
```

  </TabItem>

  <TabItem value="java" label="Java">

```java
// Java support coming soon
```

  </TabItem>

</Tabs>

## Further resources

- [Configuration: Authentication](./authentication.md)
- [Configuration: Authorization and RBAC](./authorization.md)

## Questions and feedback

import DocsFeedback from '/_includes/docs-feedback.mdx';

<DocsFeedback/>
