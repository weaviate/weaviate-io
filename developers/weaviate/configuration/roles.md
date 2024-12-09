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
To manage roles, first we must connect to the client with an API key that has access to do so, such as an admin API key.

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

### Add permissions to a role
There are two ways to add permissions to a role:
1. You can add them while creating the role.
2. You can add them later, with `add_permissions()`

**Scenario 1: Create new role with Permissions**

Let's change the example above by providing a list of permissions to the "devrel" role while creating it. In this example, we're allowing "devrel" to reaad all collections starting with the word "Test_". But we are also additionaly allowing them to delete and create the collection "Test_DevRel".

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

**Scenario 2: Grant additional data permissions**

Next, let's grant additional permissions to the "devrel". In this example, we're now giving the role "devrel" to read data in all collections that start with "Test_" but they can additionally create new data in "Test_DevRel" too.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START AddRoles"
      endMarker="# END AddRols"
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

**Scenario 3: Grant permission for role management**

In some situations, we may have to provide some users with access to manage a certain group of roles. 
For example, we may create a new role calle "devrel-admin" who could have the permission to manage the role "devrel", but only read any other role starting with `devrel-".

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START ManageRoles"
      endMarker="# END ManageRoles"
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

**Scenario 3: Grant permission for Cluster and Node Inspection**

Finally, let's add some extra permissions around inspecting the Cluster and Nodes to the "devrel-admin". In this case, we would like them to be able to insepct the Nodes for "Test_DevRel", and to be able to inspect the configuration of the cluster.

<Tabs groupId="languages">

  <TabItem value="py" label="Python Client v4">
    <FilteredTextBlock
      text={RolePyCode}
      startMarker="# START ClusterAndNodePermissions"
      endMarker="# END ClusterAndNodePermissions"
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

### Assign a role to a user
When connected to weaviate as an admin, we can assign one or more roles to a given user. For example, let's assign the "devrel" role to "jane-doe"

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

### List a user's roles and permissions
There are two ways you can get a user's roles and permissions:
1. You can get the roles `of_current_user`, which lists the roles and permissions of the current client.
2. You can list the roles and permissions `by_user`, if you have access to read that users roles and permissions.

For example, the `admin_client` below is first listing its own roles, then, of the user "jane-doe" specicifically.

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

### List all roles

### List users with a role

### Delete a role

### Revoke a role from a user

### Remove a permission from a role
