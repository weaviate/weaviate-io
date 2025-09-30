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

// START ReadWritePermissionDefinition // START MTPermissionsExample
const { permissions } = weaviate
// END ReadWritePermissionDefinition // END MTPermissionsExample

// START ReadWritePermissionDefinition

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

assert.equal("rw_role", Object.keys(userPermissions))
assert.equal(userPermissions["rw_role"].collectionsPermissions[0].collection, "TargetCollection*")
assert.equal(userPermissions["rw_role"].name, "rw_role")

// =================================================================
// =============== EXAMPLE: VIEWER PERMISSIONS
// =================================================================

// Clean slate
await client.roles.delete("viewer_role")  // delete if exists

// START ViewerPermissionDefinition

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

const tenantPermissions = [
    permissions.tenants({
        collection: "TargetCollection*",  // Applies to all collections starting with "TargetCollection"
        tenant: "TargetTenant*",  // Applies to all tenants starting with "TargetTenant"
        create: true,  // Allow creating new tenants
        read: true,  // Allow reading tenant info/metadata
        update: true,  // Allow updating tenant states
        delete: true,  // Allow deleting tenants
    }),
    permissions.data({
        collection: "TargetCollection*",  //  Applies to all collections starting with "TargetCollection"
        tenant: "TargetTenant*",  // Applies to all tenants starting with "TargetTenant"
        create: true,  // Allow data inserts
        read: true,  // Allow query and fetch operations
        update: true,  // Allow data updates
        delete: true,  // Allow data deletes
    })
]

// Create a new role
await client.roles.create("tenant_manager", tenantPermissions)
// END MTPermissionsExample
// START MTPermissionsAssignment
// Assign the role to a user
client.users.assignRoles("user-b", "tenant_manager")
// END MTPermissionsAssignment

// ===== TEST ===== basic checks to see if the role was created
const testUserPermissions = await client.users.getAssignedRoles("user-b")

assert.equal((Object.keys(await client.users.getAssignedRoles("user-b")).some(
    role => role == "viewer_role"
)), true)
assert.equal(
    testUserPermissions["viewer_role"].collectionsPermissions[0].collection
    ,"TargetCollection*"
)
assert.equal(testUserPermissions["viewer_role"].name, "viewer_role")

client.close()
