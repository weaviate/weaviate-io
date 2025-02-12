from weaviate.classes.rbac import Permissions

# START AdminClient
import weaviate
from weaviate.classes.init import Auth

# Connect to Weaviate as Admin
admin_client = weaviate.connect_to_local(
    # END AdminClient
    # Use custom port defined in tests/docker-compose-rbac.yml (without showing the user)
    port=8580,
    grpc_port=50551,
    # START AdminClient
    auth_credentials=Auth.api_key("user-a-key")
)
# END AdminClient

custom_user_client = weaviate.connect_to_local(
    port=8580, grpc_port=50551, auth_credentials=Auth.api_key("user-b-key")
)

admin_client.roles.delete("devrel")
admin_client.roles.delete("devrel-admin")

# # START CreateRole
# admin_client.roles.create(role_name="devrel")
# # END CreateRole

# START AddRoleAtCreate
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.collections(
      collection="Test_*",
      read_config=True,
      create_collection=False,
      delete_collection=False,
  ),
    Permissions.collections(
      collection="Test_DevRel",
      read_config=True,
      create_collection=True,
      delete_collection=True,
  ),
]

admin_client.roles.create(
    role_name="devrel", permissions=permissions
)
# END AddRoleAtCreate
assert "devrel" in admin_client.roles.list_all().keys()

# START AddRoles
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.data(collection="Test_DevRel", read=True, create=True),
    Permissions.data(collection="Test_*", read=True, create=False)
]

admin_client.roles.add_permissions(permissions=permissions, role_name="devrel")
# END AddRoles

# START ManageRoles
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.data(collection="Test_DevRel", read=True, create=True, update=True, delete=True),
    #Permissions.roles(role="devrel", read=True, manage=True),
    #Permissions.roles(role="devrel-*", read=True, manage=False)
]

admin_client.roles.create(role_name="devrel-admin", permissions=permissions)
# END ManageRoles

# START ClusterAndNodePermissions
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.cluster(read=True),
    Permissions.nodes(collection="Test_DevRel", verbosity="verbose", read=True)
]

admin_client.roles.add_permissions(permissions=permissions, role_name="devrel-admin")
# END ClusterAndNodePermissions


# START AssignRole
admin_client.users.assign_roles(user_id="user-b", role_names=["devrel", "viewer"])
# END AssignRole
assert "devrel" in admin_client.users.get_assigned_roles("user-b")
assert "viewer" in admin_client.users.get_assigned_roles("user-b")

# START ListCurrentUserRoles
print(admin_client.users.get_my_user())
# END ListCurrentUserRoles

# START ListUserRoles
user_roles = admin_client.users.get_assigned_roles("user-b")

for role in user_roles:
    print(role)
# END ListUserRoles
assert any(permission.collection == "Test_DevRel" for permission in user_roles["devrel"].collections_permissions)

# START CheckRoleExists
print(admin_client.roles.exists(role_name="devrel"))  # Returns True or False
# END CheckRoleExists

# START InspectRole
devrel_role = admin_client.roles.get(role_name="devrel")

print(devrel_role)
print(devrel_role.collections_permissions)
print(devrel_role.data_permissions)
# END InspectRole

# START AssignedUsers
assigned_users = admin_client.roles.get_assigned_user_ids(role_name="devrel")

for user in assigned_users:
    print(user)
# END AssignedUsers
assert "user-b" in assigned_users

# START ListAllRoles
all_roles = admin_client.roles.list_all()

for role_name, role in all_roles.items():
    print(role_name, role)
# END ListAllRoles

# START RemovePermissions
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.collections(
      collection="Test_DevRel",
      read_config=True,
      create_collection=True,
      delete_collection=True,
  ),
  Permissions.data(collection="Test_*", read=True, create=False)
]

admin_client.roles.remove_permissions(
    role_name="devrel", permissions=permissions
)
# END RemovePermissions

# START RevokeRoles
admin_client.users.revoke_roles(user_id="user-b", role_names="devrel")
# END RevokeRoles
assert "devrel" not in admin_client.users.get_assigned_roles("user-b")

# START DeleteRole
admin_client.roles.delete(role_name="devrel")
# END DeleteRole

admin_client.close()
custom_user_client.close()
