// TODO[g-despot]: OIDC testing not yet implemented
import assert from 'assert'

// START AdminClient
import weaviate, { type WeaviateClient } from 'weaviate-client'

// Connect to Weaviate as root user
const client: WeaviateClient = await weaviate.connectToLocal({
    // END AdminClient
    // Use custom port defined in tests/docker-compose-rbac.yml (without showing the user)
        port: 8580,
        grpcPort: 50551, 
        // START AdminClient
        authCredentials: new weaviate.ApiKey("root-user-key")
})
// END AdminClient

const { permissions } = weaviate

const collectionPermissions = [
    permissions.collections({
        collection: "TargetCollection*", 
        read_config: true, 
        create_collection: true
    }),
    permissions.data({
        collection: "TargetCollection*", 
        read: true, 
        create: true}
        ),
]

await client.roles.delete("testRole")
await client.roles.create("testRole", collectionPermissions)

// START AssignOidcUserRole
await client.users.oidc.assignRoles(["testRole", "viewer"], "custom-user",)
// END AssignOidcUserRole
assert.equal((Object.keys(await client.users.getAssignedRoles("custom-user")).some(
    role => role == "testRole"
)), true)

assert.equal((Object.keys(await client.users.getAssignedRoles("custom-user")).some(
    role => role == "viewer"
)), true)

// START ListOidcUserRoles
const userRoles = await client.users.oidc.getAssignedRoles("custom-user")

for (const [role, value] of Object.entries(userRoles)) {
    console.log(role)
}
// END ListOidcUserRoles
assert.equal((Object.keys(await client.users.db.getAssignedRoles("custom-user")).some(
    role => role == "testRole"
)), true)
assert.equal((Object.keys(await client.users.db.getAssignedRoles("custom-user")).some(
    role => role == "viewer"
)), true)

// START RevokeOidcUserRoles
await client.users.oidc.revokeRoles("testRole","custom-user")
// END RevokeOidcUserRoles
assert.equal((Object.keys(await client.users.db.getAssignedRoles("custom-user")).some(
    role => role == "testRole"
)), false)

client.close()
