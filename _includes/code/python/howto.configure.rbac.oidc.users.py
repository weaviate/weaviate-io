# TODO[g-despot]: OIDC testing not yet implemented
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

from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.collections(
        collection="TargetCollection*", read_config=True, create_collection=True
    ),
    Permissions.data(collection="TargetCollection*", read=True, create=True),
]

client.roles.delete(role_name="testRole")
client.roles.create(role_name="testRole", permissions=permissions)

# START AssignOidcUserRole
client.users.oidc.assign_roles(user_id="custom-user", role_names=["testRole", "viewer"])
# END AssignOidcUserRole
assert "testRole" in client.users.oidc.get_assigned_roles("custom-user")
assert "viewer" in client.users.oidc.get_assigned_roles("custom-user")

# START ListOidcUserRoles
user_roles = client.users.oidc.get_assigned_roles("custom-user")

for role in user_roles:
    print(role)
# END ListOidcUserRoles
assert "testRole" in user_roles
assert "viewer" in user_roles

# START RevokeOidcUserRoles
client.users.oidc.revoke_roles(user_id="custom-user", role_names="testRole")
# END RevokeOidcUserRoles
assert "testRole" not in client.users.oidc.get_assigned_roles("custom-user")

client.close()
