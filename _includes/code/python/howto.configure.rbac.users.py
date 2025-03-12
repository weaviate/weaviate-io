from weaviate.classes.rbac import Permissions

# START AdminClient
import weaviate
from weaviate.classes.init import Auth

# Connect to Weaviate as root user
client = weaviate.connect_to_local(
    # END AdminClient
    # Use custom port defined in tests/docker-compose-rbac.yml (without showing the user)
    port=8580,
    grpc_port=50551,
    # START AdminClient
    auth_credentials=Auth.api_key("user-a-key"),
)
# END AdminClient

# START CreateUser
client.users.db.create(user_id="user-c")
# END CreateUser

# START RotateApiKey
apiKeyNew = client.users.db.rotate_key(user_id="user-b")
# END RotateApiKey

# START DeleteUser
client.users.db.delete(user_id="user-c")
# END DeleteUser

from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.data(collection="TargetCollection*", read=True, create=True),
    Permissions.data(collection="TargetCollection*", read=True, create=False),
]

client.roles.add_permissions(permissions=permissions, role_name="testRole")

# START AssignRole
client.users.assign_roles(user_id="user-b", role_names=["testRole", "viewer"])
# END AssignRole
assert "testRole" in client.users.db.get_assigned_roles("user-b")
assert "viewer" in client.users.db.get_assigned_roles("user-b")

# START ListCurrentUserRoles
print(client.users.get_my_user())
# END ListCurrentUserRoles

# START ListAllUsers
print(client.users.db.list_all())
# END ListAllUsers

# START ListUserRoles
user_roles = client.users.db.get_assigned_roles("user-b")

for role in user_roles:
    print(role)
# END ListUserRoles
assert any(
    permission.collection == "TargetCollection*"
    for permission in user_roles["testRole"].collections_permissions
)
assert any(
    permission.collection == "TargetCollection*"
    for permission in user_roles["testRole"].data_permissions
)

# START RevokeRoles
client.users.revoke_roles(user_id="user-b", role_names="testRole")
# END RevokeRoles
assert "testRole" not in client.users.db.get_assigned_roles("user-b")


client.close()
