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
- Access levels (read, write, update, delete, manage)
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

import RolePyCode from '!!raw-loader!/_includes/code/python/howto.configure.rbac.roles.py';

## Role management
To manage roles, the authenticated user must have appropriate `role` resource permissions.
The example below that the admin key is associated with an admin user. For more information check out the [Authentication](./authentication.md) and [Authorization](./authorization.md) docs.

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### Create a role
To create a role, we provide the `role_name` and a list of permissions.
For example, below we are creating a role called "devrel". 

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START CreateRole"
      endMarker="# END CreateRole"
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

### Create new role with Permissions

This creates a "devrel" role with permissions to:
- Reaad all collections starting with the word "Test_".
- Delete or create the collection "Test_DevRel"

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddRoleAtCreate"
      endMarker="# END AddRoleAtCreate"
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

### Grant additional permissions

This adds to the "devrel" role permissions to:
- Read data in all collections that start with "Test_".
- Create new data in "Test_DevRel".

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### Remove permissions from a role

The example below, removes the permissions to:
- Read the data from collections that start with "Test-"
- Create and delete collections called "Test_DevRel" 

from the "devrel" role.

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

If the permission is the last one available for a given role, this will delete the role.

### Assign a role to a user
The example below assigns the "devrel" role to "jane-doe".

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### Gete the current user's roles and permissions

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### Gete a user's roles and permissions

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### Inspect a role

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### List all Roles

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### List users with a role

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### Delete a role

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>

### Revoke a role from a user
You can revoke one or more roles from a specific user. Below, we are revoking "role-1" and "role-2" from the user "jane-doe".

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
    TBD
  </TabItem>

  <TabItem value="go" label="Go">
    TBD
  </TabItem>

  <TabItem value="java" label="Java">
    TBD
  </TabItem>

</Tabs>
