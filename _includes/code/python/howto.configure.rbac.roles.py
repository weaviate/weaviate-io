import weaviate

# START-ANY
from weaviate.classes.rbac import Permissions
# END-ANY

# START AdminClient 
from weaviate.classes.init import Auth

# Connect to Weaviate as Admin
admin_client = weaviate.connect_to_local(auth_credentials=Auth.api_key("admin-key"))
# END AdminClient

# START CreateRole

admin_client.roles.create(
    role_name="devrel", permissions=<LIST-OF-PERMISSIONS>
)
# END CreateRole

# START AddRoleAtCreate

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
permissions = [
    Permissions.data(collection="Test_DevRel", read=True, create=True),
    Permissions.data(collection="Test_*", read=True, create=False)
]

admin_client.roles.add_permissions(permissions=permissions, role_name="devrel")
# END AddRoles

# START ManageRoles
permissions = [
    Permissions.roles(role_names="devrel", read=True, manage=True),
    Permissions.roles(role_names="devrel-*", read=True, manage=False)
]

admin_client.roles.create(role_name="devrel-admin", permissions=permissions)
# END ManageRoles

# START ClusterAndNodePermissions
permissions = [
    Permissions.cluster(read=True),
    Permissions.nodes(collection="Test_DevRel", verbosity="verbose", read=True)
]

admin_client.roles.add_permissions(permissions=permissions, role_name="devrel-admin")
# END ClusterAndNodePermissions


# START AssignRole
admin_client.roles.assign_to_user(role_names="devrel", user="jane-doe")
# END AssignRole

# START ListUserRoles

admin_client.roles.of_current_user()
admin_client.roles.roles.by_user(user="jane-doe")
# END ListUserRoles

# START CheckRoleExists

admin_client.roles.exists(role_name="devrel")
# END CheckRoleExists