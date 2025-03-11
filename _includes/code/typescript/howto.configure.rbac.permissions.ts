import weaviate, { WeaviateClient } from 'weaviate-client'
import assert from 'assert'


const client: WeaviateClient = await weaviate.connectToLocal({
    // Use custom port defined in tests/docker-compose-rbac.yml (without showing the user)
        port: 8580,
        grpcPort: 50551, 
        authCredentials: new weaviate.ApiKey("user-a-key")
})


async function resetUser(user: string, client: WeaviateClient) {
    // Clean slate
    const currentRoles = await client.users.getAssignedRoles(user)  // check if user exists
    for await (const [role, value] of Object.entries(currentRoles)) {
        await client.users.revokeRoles(role, user)  // revoke all roles
    }
}
// =================================================================
// =============== EXAMPLE: READ + WRITE PERMISSIONS
// =================================================================

// Clean slate
resetUser("user-b", client)
await client.roles.delete("rw_role")  // delete if exists

// START ReadWritePermissionDefinition
const { permissions } = weaviate

// Define permissions (example confers read+write rights to collections starting with "TargetCollection")
const allPermissions = [
    // Collection level permissions
    permissions.collections({
        collection: "TargetCollection*",
        create_collection:  true,  // Allow creating new collections
        read_config: true,  // Allow reading collection info/metadata
        update_config: true,  // Allow updating collection configuration, i.e. update schema properties, when inserting data with new properties
        delete_collection: true,  // Allow deleting collections
   } ),
    // Collection data level permissions
    permissions.data({
        collection: "TargetCollection*",
        create: true,  // Allow data inserts
        read: true,  // Allow query and fetch operations
        update: true,  // Allow data updates
        delete: false,  // Allow data deletes
    }),
    permissions.backup({
        collection:"TargetCollection*", 
        manage: true
    }),
    permissions.nodes.verbose({
        collection: "TargetCollection*", 
        read: true
    }),
    permissions.cluster({
        read: true
    }),
]

// Create a new role
await client.roles.create("rw_role", allPermissions)
// END ReadWritePermissionDefinition
// START ReadWritePermissionAssignment
// Assign the role to a user
await client.users.assignRoles(["rw_role"], "user-b",)
// END ReadWritePermissionAssignment

// ===== TEST ===== basic checks to see if the role was created
const userPermissions = await client.users.getAssignedRoles("user-b")

// assert.equal("rw_role", user_permissions.keys())
// assert (
//     user_permissions["rw_role"].collections_permissions[0].collection
//     == "TargetCollection*"
// )
// assert user_permissions["rw_role"].name == "rw_role"

// =================================================================
// =============== EXAMPLE: VIEWER PERMISSIONS
// =================================================================

// Clean slate
await client.roles.delete("viewer_role")  // delete if exists

// START ViewerPermissionDefinition
// from weaviate.classes.rbac import Permissions

// Define permissions (example confers viewer rights to collections starting with "TargetCollection")
const newPermissions = [
    permissions.collections({
        collection: "TargetCollection*",
        read_config: true,
    }),
    permissions.data({
        collection: "TargetCollection*", 
        read: true}),
]

// Create a new role
await client.roles.create("viewer_role", newPermissions)
// END ViewerPermissionDefinition
// START ViewerPermissionAssignment
// Assign the role to a user
await client.users.assignRoles("user-b", "viewer_role")
// END ViewerPermissionAssignment

// =================================================================
// =============== EXAMPLE: VIEWER PERMISSIONS
// =================================================================

// Clean slate
client.roles.delete("tenant_manager")

// START MTPermissionsExample
// from weaviate.classes.rbac import Permissions

const mtenantPermissions = [
    permissions.collections({
        collection: "TargetCollection*",
        create_collection: true,
        read_config: true,
        update_config: true,
        delete_collection: true,
    }),
    // Without the below permission, the user would not
    // be able to create tenants in collections starting with "TargetCollection"
    permissions.tenants({
        collection: "TargetCollection*",  // Applies to all collections starting with "TargetCollection"
        create: true,  // Allow creating new tenants
        read: true,  // Allow reading tenant info/metadata
        update: true,  // Allow updating tenant states
        delete: false,  // Don't allow deleting tenants
    }),
]

// Create a new role
await client.roles.create("tenant_manager", mtenantPermissions)
// END MTPermissionsExample
// START MTPermissionsAssignment
// Assign the role to a user
client.users.assignRoles("user-b", "tenant_manager")
// END MTPermissionsAssignment

// ===== TEST ===== basic checks to see if the role was created
const testUserPermissions = client.users.getAssignedRoles("user-b")

// assert.equal("viewer_role" in user_permissions.keys())
// assert.equal(
//     user_permissions["viewer_role"].collections_permissions[0].collection
//     ,"TargetCollection*"
// )
// assert.equal(user_permissions["viewer_role"].name, "viewer_role")

client.close()
