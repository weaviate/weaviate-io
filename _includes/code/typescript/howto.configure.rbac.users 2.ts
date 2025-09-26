import assert from 'assert'
import weaviate, { type WeaviateClient } from 'weaviate-client'
// START AdminClient

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
// START CreateUser
let userApiKey 
// END CreateUser

userApiKey = await client.users.db.delete("custom-user")

// START CreateUser
userApiKey = await client.users.db.create("custom-user")
console.log(userApiKey)
// END CreateUser
assert.equal((userApiKey.length > 0), true)

// START RotateApiKey
let newApiKey
newApiKey = await client.users.db.rotateKey("custom-user")
console.log(newApiKey)
// END RotateApiKey
assert.equal( (newApiKey.length > 0) && (newApiKey != userApiKey), true)

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
        create: true}),
]

await client.roles.delete("testRole")
await client.roles.create("testRole", collectionPermissions)

// START AssignRole
await client.users.db.assignRoles(["testRole", "viewer"], "custom-user")
// END AssignRole

assert.equal((Object.keys(await client.users.getAssignedRoles("custom-user")).some(
    role => role == "testRole"
)), true)

assert.equal((Object.keys(await client.users.getAssignedRoles("custom-user")).some(
    role => role == "viewer"
)), true)

// START ListAllUsers
console.log(await client.users.db.listAll())
// END ListAllUsers

// START ListUserRoles
let userRoles = await client.users.db.getAssignedRoles("custom-user")

for (const [role, value] of Object.entries(userRoles)) {
    console.log(role)
}
// END ListUserRoles
assert.equal((Object.keys(await client.users.db.getAssignedRoles("custom-user")).some(
    role => role == "testRole"
)), true)
assert.equal((Object.keys(await client.users.db.getAssignedRoles("custom-user")).some(
    role => role == "viewer"
)), true)

// START RevokeRoles
await client.users.db.revokeRoles("custom-user", "testRole")
// END RevokeRoles
assert.equal((Object.keys(await client.users.db.getAssignedRoles("custom-user")).some(
    role => role == "testRole"
)), false)

// START DeleteUser
await client.users.db.delete("custom-user")
// END DeleteUser
assert(
    !(await client.users.db.listAll()).some(user => user.id === "custom-user"),
    "custom-user not deleted"
  )

client.close()
