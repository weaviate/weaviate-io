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
    auth_credentials=Auth.api_key("root-user-key"),
)
# END AdminClient

user_api_key = client.users.db.delete(user_id="custom-user")

# START CreateUser
user_api_key = client.users.db.create(user_id="custom-user")
print(user_api_key)
# END CreateUser
assert len(user_api_key) > 0

# START RotateApiKey
new_api_key = client.users.db.rotate_key(user_id="custom-user")
print(new_api_key)
# END RotateApiKey
assert len(new_api_key) > 0 and new_api_key != user_api_key

from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.collections(
        collection="TargetCollection*", read_config=True, create_collection=True
    ),
    Permissions.data(collection="TargetCollection*", read=True, create=True),
]

client.roles.delete(role_name="testRole")
client.roles.create(role_name="testRole", permissions=permissions)

# START AssignRole
client.users.db.assign_roles(user_id="custom-user", role_names=["testRole", "viewer"])
# END AssignRole
assert "testRole" in client.users.db.get_assigned_roles("custom-user")
assert "viewer" in client.users.db.get_assigned_roles("custom-user")

# START ListAllUsers
print(client.users.db.list_all())
# END ListAllUsers

# START ListUserRoles
user_roles = client.users.db.get_assigned_roles("custom-user")

for role in user_roles:
    print(role)
# END ListUserRoles
assert "testRole" in user_roles
assert "viewer" in user_roles

# START RevokeRoles
client.users.db.revoke_roles(user_id="custom-user", role_names="testRole")
# END RevokeRoles
assert "testRole" not in client.users.db.get_assigned_roles("custom-user")

# START DeleteUser
client.users.db.delete(user_id="custom-user")
# END DeleteUser
assert all(
    user.user_id != "custom-user" for user in client.users.db.list_all()
), "custom-user not deleted"

client.close()
