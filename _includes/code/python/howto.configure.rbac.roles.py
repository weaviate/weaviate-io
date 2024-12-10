import weaviate

# START AdminClient 
from weaviate.classes.init import Auth

# Connect to Weaviate as Admin
admin_client = weaviate.connect_to_local(auth_credentials=Auth.api_key("admin-key"))
# END AdminClient

permissions_to_add = [
   Permissions.data(collection="Testing_*", read=True, create=True)
]

# START CreateRole
from weaviate.classes.rbac import Permissions

admin_client.roles.create(
    role_name="devrel", permissions=permissions_to_add
)
# END CreateRole

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
    Permissions.roles(role_names="devrel", read=True, manage=True),
    Permissions.roles(role_names="devrel-*", read=True, manage=False)
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
admin_client.roles.assign_to_user(role_names="devrel", user="jane-doe")
# END AssignRole

# START ListCurrentUserRoles
print(admin_client.roles.of_current_user())
# END ListCurrentUserRoles

# START ListUserRoles
user_roles = admin_client.roles.roles.by_user(user="jane-doe")
for role in user_roles:
    print(role)
# END ListUserRoles

# START CheckRoleExists
admin_client.roles.exists(role_name="role-name")
# END CheckRoleExists

# START InspectRole
print(admin_client.roles.by_name(role_name="role-name"))
# END InspectRole

# START AssignedUsers
assigned_users = admin_client.roles.assigned_users(role_name="role-name")

for user in assigned_users:
    print(user)
# END AssignedUsers

# START ListAllRoles
all_roles = admin_client.roles.list_all()

for role_name, role in all_roles.items():
    print(role_name, role)
# END ListAllRoles


# START DeleteRole
admin_client.roles.delete(role_name="role-name")
# END DeleteRole

# START RevokeRoles
admin_client.roles.revoke_from_user(role_names=["role-1", "role-2"], user="jane-doe")
# END RevokeRoles


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