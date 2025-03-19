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

from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.data(collection="TargetCollection*", read=True, create=True),
    Permissions.data(collection="TargetCollection*", read=True, create=False),
]

client.roles.add_permissions(permissions=permissions, role_name="testRole")

# START AssignOidcUserRole
client.users.oidc.assign_roles(user_id="user-b", role_names=["testRole", "viewer"])
# END AssignOidcUserRole
assert "testRole" in client.users.oidc.get_assigned_roles("user-b")
assert "viewer" in client.users.oidc.get_assigned_roles("user-b")

# START ListOidcUserRoles
user_roles = client.users.oidc.get_assigned_roles("user-b")

for role in user_roles:
    print(role)
# END ListOidcUserRoles
assert any(
    permission.collection == "TargetCollection*"
    for permission in user_roles["testRole"].collections_permissions
)
assert any(
    permission.collection == "TargetCollection*"
    for permission in user_roles["testRole"].data_permissions
)

# START RevokeOidcUserRoles
client.users.oidc.revoke_roles(user_id="user-b", role_names="testRole")
# END RevokeOidcUserRoles
assert "testRole" not in client.users.oidc.get_assigned_roles("user-b")


client.close()
