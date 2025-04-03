import assert from "assert"
// START AdminClient
import weaviate, { WeaviateClient } from 'weaviate-client'

// Connect to Weaviate as root user
const client: WeaviateClient = await weaviate.connectToLocal({
    // END AdminClient
    // Use custom port defined in tests/docker-compose-rbac.yml (without showing the user)
    port: 8580,
    grpcPort: 50551,
    // START AdminClient
    authCredentials: new weaviate.ApiKey("user-a-key")
})
// END AdminClient

// TODO: Remove if not used
const customUserClient: WeaviateClient = await weaviate.connectToLocal({
    port: 8580,
    grpcPort: 50551,
    authCredentials: new weaviate.ApiKey("user-b-key")
})

const allRolesCheck = await client.roles.listAll()

for await (const [key, value] of Object.entries(allRolesCheck)) {
    if (!["viewer", "root", "admin"].includes(key)) {
        await client.roles.delete(key)
    }
}

// Todo: This will be added in upcoming release
// START CreateRole
await client.roles.create("testRole")
// END CreateRole

// START AddClusterPermission // START AddManageRolesPermission // START AddCollectionsPermission // START AddTenantPermission // START AddDataObjectPermission // START AddBackupPermission // START AddNodesPermission // START AddRoles // START RemovePermissions
const { permissions } = weaviate
// END AddClusterPermission // END AddManageRolesPermission // END AddCollectionsPermission // END AddTenantPermission // END AddDataObjectPermission // END AddBackupPermission // END AddNodesPermission // END AddRoles // END RemovePermissions

// todo add scope when tommy adds it
// START AddManageRolesPermission

const rolePermission = permissions.roles({
    role: "testRole",
    create: true,
    read: true,
    update: true,
    delete: true,
})

await client.roles.create("testRole", rolePermission)
// END AddManageRolesPermission

assert(Object.keys(await client.roles.listAll()).includes('testRole'));

await client.roles.delete("testRole")

// START AddCollectionsPermission

const collectionPermissions = [
    permissions.collections({
        collection: "TargetCollection*",  // Applies to all collections starting with "TargetCollection"
        create_collection: true,  // Allow creating new collections
        read_config: true,  // Allow reading collection info/metadata
        update_config: true,  // Allow updating collection configuration, i.e. update schema properties, when inserting data with new properties
        delete_collection: true,  // Allow deleting collections
    }),
]

await client.roles.create("testRole", collectionPermissions)

// END AddCollectionsPermission
const getCollectionPermissions = await client.roles.byName("testRole")

if (getCollectionPermissions) {
    assert.equal((getCollectionPermissions.dataPermissions.some(
        permission => permission.collection == "TargetCollection*"
    )), true)
}

await client.roles.delete("testRole")

// START AddTenantPermission

const AddTenantPermissions = [
    permissions.tenants({
        collection: "TargetCollection*",  // Applies to all collections starting with "TargetCollection"
        tenant: "TargetTenant*",  // Applies to all tenants starting with "TargetTenant"
        create: true,  // Allow creating new tenants
        read: true,  // Allow reading tenant info/metadata
        update: true,  // Allow updating tenant states
        delete: true,  // Allow deleting tenants
    }),
]

await client.roles.create("testRole", AddTenantPermissions)
// END AddTenantPermission
const getTenantCollection = await client.roles.byName("testRole")

if (getTenantCollection) {
    assert.equal((getTenantCollection.dataPermissions.some(
        permission => permission.collection == "TargetCollection*"
    )), true)
}

client.roles.delete("testRole")

// START AddDataObjectPermission

const dataPermissions = [
    permissions.data({
        collection: "TargetCollection*",  // Applies to all collections starting with "TargetCollection"
        tenant: "TargetTenant*",  // Applies to all tenants starting with "TargetTenant"
        create: true,  // Allow data inserts
        read: true,  // Allow query and fetch operations
        update: true,  // Allow data updates
        delete: false,  // Allow data deletes
    }),
]

await client.roles.create("testRole", dataPermissions)

// END AddDataObjectPermission
const getDataPermissions = await client.roles.byName("testRole")

if (getDataPermissions) {
    assert.equal((getDataPermissions.dataPermissions.some(
        permission => permission.collection == "TargetCollection*"
    )), true)
}

await client.roles.delete("testRole")

// START AddBackupPermission

const backupsPermissions = [
    permissions.backup({
        collection: "TargetCollection*",  // Applies to all collections starting with "TargetCollection"
        manage: true,  // Allow managing backups
    }),
]

await client.roles.create("testRole", backupsPermissions)
// END AddBackupPermission

const getBackupsPermissions = await client.roles.byName("testRole")

if (getBackupsPermissions) {
    assert.equal((getBackupsPermissions.dataPermissions.some(
        permission => permission.collection == "TargetCollection*"
    )), true)
}

await client.roles.delete("testRole")

// START AddClusterPermission

const clusterPermissions = [
    permissions.cluster({
        read: true // Allow reading cluster data
    }),
]

await client.roles.create("testRole", clusterPermissions)
// END AddClusterPermission

const getClusterPermissions = await client.roles.byName("testRole")
// assert permissions.cluster_permissions

await client.roles.delete("testRole")

// START AddNodesPermission

const verboseNodePermissions = [
    permissions.nodes.verbose({
        collection: "TargetCollection*",  // Applies to all collections starting with "TargetCollection"
        read: true,  // Allow reading node metadata
    }),
]

// The `minimal` verbosity level applies to all collections unlike
// the `verbose` level where you specify the collection name filter
const minimalNodePermissions = [
    permissions.nodes.minimal({
        read: true,  // Allow reading node metadata
    }),
]

await client.roles.create("testRole", verboseNodePermissions)  // or `minimalNodePermissions`
// END AddNodesPermission

const getNodePermissions = await client.roles.byName("testRole")

if (getNodePermissions) {
    assert.equal((getNodePermissions.dataPermissions.some(
        permission => permission.collection == "TargetCollection*"
    )), true)
}


await client.roles.delete("testRole")

// This is to add additional permission to below
const dummyPermission = [
    permissions.collections({
        collection: "TargetCollection*",
        read_config: true,
    }),
]

await client.roles.create("testRole", dummyPermission)

// START AddRoles

const additionalDataPermissions = [
    permissions.data({
        collection: "TargetCollection*",
        read: true,
        create: true
    }),
    permissions.data({
        collection: "TargetCollection*",
        read: true,
        create: false
    }),
]

client.roles.addPermissions("testRole", additionalDataPermissions)
// END AddRoles

// START AssignRole
await client.users.assignRoles(["testRole", "viewer"], "user-b")
// END AssignRole
assert.equal((Object.keys(await client.users.getAssignedRoles("user-b")).some(
    role => role == "viewer*"
)), true)

assert.equal((Object.keys(await client.users.getAssignedRoles("user-b")).some(
    role => role == "testRole"
)), true)

// START ListCurrentUserRoles
console.log(await client.users.getMyUser())
// END ListCurrentUserRoles

// START ListUserRoles
const userRoles = await client.users.getAssignedRoles("user-b")

for (const [role, value] of Object.entries(userRoles)) {
    console.log(role)
}
// END ListUserRoles

assert.equal((userRoles["testRole"].collectionsPermissions.some(
    permission => permission.collection == "TargetCollection*"
)), true)

assert.equal((userRoles["testRole"].dataPermissions.some(
    permission => permission.collection == "TargetCollection*"
)), true)

// START CheckRoleExists
console.log(await client.roles.exists("testRole"))  // Returns true or false
// END CheckRoleExists

// START InspectRole 
const testRole = await client.roles.byName("testRole")

console.log(testRole)
console.log(testRole?.collectionsPermissions)
console.log(testRole?.dataPermissions)
// END InspectRole

// START AssignedUsers
const assignedUsers = await client.roles.assignedUserIds("testRole")

for (const users of assignedUsers) {
    console.log(users)
}
// END AssignedUsers
assert.equal(assignedUsers.some(
    role => role == "viewer*"
), true)

// START ListAllRoles
const allRoles = await client.roles.listAll()

for (const [key, value] of Object.entries(allRoles)) {
    console.log(key)
}
// END ListAllRoles

// START RemovePermissions

const permissionsToRemove = [
    permissions.collections({
        collection: "TargetCollection*",
        read_config: true,
        create_collection: true,
        delete_collection: true,
    }),
    permissions.data({
        collection: "TargetCollection*",
        read: true,
        create: false
    }),
]

await client.roles.removePermissions("testRole", permissionsToRemove)
// END RemovePermissions

// START RevokeRoles
await client.users.revokeRoles("user-b", "testRole")
// END RevokeRoles
assert.equal((Object.keys(await client.users.getAssignedRoles("user-b")).some(
    role => role == "testRole"
)), false)

// START DeleteRole
await client.roles.delete("testRole")
// END DeleteRole

client.close()
customUserClient.close()
