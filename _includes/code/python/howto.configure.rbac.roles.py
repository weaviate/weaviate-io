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

# TODO: Remove if not used
custom_user_client = weaviate.connect_to_local(
    port=8580, grpc_port=50551, auth_credentials=Auth.api_key("user-b-key")
)

all_roles = client.roles.list_all()
for role_name, _ in all_roles.items():
    if role_name not in ["viewer", "root", "admin"]:
        client.roles.delete(role_name=role_name)

# # START CreateRole
# client.roles.create(role_name="testRole")
# # END CreateRole

# START AddManageRolesPermission
from weaviate.classes.rbac import Permissions, RoleScope

permissions = [
    Permissions.roles(
        role="testRole*",  # Applies to all roles starting with "testRole"
        create=True,  # Allow creating roles
        read=True,  # Allow reading roles
        update=True,  # Allow updating roles
        delete=True,  # Allow deleting roles
        scope=RoleScope.MATCH,  # Only allow role management with the current user's permission level
        # scope=RoleScope.ALL   # Allow role management with all permissions
    )
]

client.roles.create(role_name="testRole", permissions=permissions)
# END AddManageRolesPermission

assert "testRole" in client.roles.list_all().keys()

client.roles.delete("testRole")

# START AddCollectionsPermission
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.collections(
        collection="TargetCollection*",  # Applies to all collections starting with "TargetCollection"
        create_collection=True,  # Allow creating new collections
        read_config=True,  # Allow reading collection info/metadata
        update_config=True,  # Allow updating collection configuration, i.e. update schema properties, when inserting data with new properties
        delete_collection=True,  # Allow deleting collections
    ),
]

client.roles.create(role_name="testRole", permissions=permissions)
# END AddCollectionsPermission
permissions = client.roles.get(role_name="testRole")
assert any(
    permission.collection == "TargetCollection*"
    for permission in permissions.collections_permissions
)

client.roles.delete("testRole")

# START AddTenantPermission
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.collections(
        collection="TargetCollection*",
        create_collection=True,
        read_config=True,
        update_config=True,
        delete_collection=True,
    ),
    Permissions.tenants(
        collection="TargetCollection*",  # Applies to all collections starting with "TargetCollection"
        create=True,  # Allow creating new tenants
        read=True,  # Allow reading tenant info/metadata
        update=True,  # Allow updating tenant states
        delete=True,  # Allow deleting tenants
    ),
]

client.roles.create(role_name="testRole", permissions=permissions)
# END AddTenantPermission
permissions = client.roles.get(role_name="testRole")
assert any(
    permission.collection == "TargetCollection*"
    for permission in permissions.collections_permissions
)

client.roles.delete("testRole")

# START AddDataObjectPermission
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.data(
        collection="TargetCollection*",  # Applies to all collections starting with "TargetCollection"
        create=True,  # Allow data inserts
        read=True,  # Allow query and fetch operations
        update=True,  # Allow data updates
        delete=False,  # Allow data deletes
    ),
]

client.roles.create(role_name="testRole", permissions=permissions)
# END AddDataObjectPermission
permissions = client.roles.get(role_name="testRole")
assert any(
    permission.collection == "TargetCollection*"
    for permission in permissions.data_permissions
)

client.roles.delete("testRole")

# START AddBackupPermission
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.backup(
        collection="TargetCollection*",  # Applies to all collections starting with "TargetCollection"
        manage=True,  # Allow managing backups
    ),
]

client.roles.create(role_name="testRole", permissions=permissions)
# END AddBackupPermission
permissions = client.roles.get(role_name="testRole")
assert any(
    permission.collection == "TargetCollection*"
    for permission in permissions.backups_permissions
)

client.roles.delete("testRole")

# START AddClusterPermission
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.cluster(read=True),  # Allow reading cluster data
]

client.roles.create(role_name="testRole", permissions=permissions)
# END AddClusterPermission
permissions = client.roles.get(role_name="testRole")
assert permissions.cluster_permissions

client.roles.delete("testRole")

# START AddNodesPermission
from weaviate.classes.rbac import Permissions

verbose_permissions = [
    Permissions.Nodes.verbose(
        collection="TargetCollection*",  # Applies to all collections starting with "TargetCollection"
        read=True,  # Allow reading node metadata
    ),
]

# The `minimal` verbosity level applies to all collections unlike
# the `verbose` level where you specify the collection name filter
minimal_permissions = [
    Permissions.Nodes.minimal(
        read=True,  # Allow reading node metadata
    ),
]

client.roles.create(role_name="testRole", permissions=verbose_permissions)  # or `minimal_permissions`
# END AddNodesPermission

permissions = client.roles.get(role_name="testRole")
print("ivan ", permissions)
assert any(
    permission.collection == "TargetCollection*"
    for permission in permissions.nodes_permissions
)


client.roles.delete("testRole")

permissions = [
    Permissions.collections(
        collection="TargetCollection*",
        read_config=True,
    ),
]

client.roles.create(role_name="testRole", permissions=permissions)

# START AddRoles
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.data(collection="TargetCollection*", read=True, create=True),
    Permissions.data(collection="TargetCollection*", read=True, create=False),
]

client.roles.add_permissions(permissions=permissions, role_name="testRole")
# END AddRoles

# START AssignRole
client.users.assign_roles(user_id="user-b", role_names=["testRole", "viewer"])
# END AssignRole
assert "testRole" in client.users.get_assigned_roles("user-b")
assert "viewer" in client.users.get_assigned_roles("user-b")

# START ListCurrentUserRoles
print(client.users.get_my_user())
# END ListCurrentUserRoles

# START ListUserRoles
user_roles = client.users.get_assigned_roles("user-b")

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

# START CheckRoleExists
print(client.roles.exists(role_name="testRole"))  # Returns True or False
# END CheckRoleExists

# START InspectRole
test_role = client.roles.get(role_name="testRole")

print(test_role)
print(test_role.collections_permissions)
print(test_role.data_permissions)
# END InspectRole

# START AssignedUsers
assigned_users = client.roles.get_assigned_user_ids(role_name="testRole")

for user in assigned_users:
    print(user)
# END AssignedUsers
assert "user-b" in assigned_users

# START ListAllRoles
all_roles = client.roles.list_all()

for role_name, role in all_roles.items():
    print(role_name, role)
# END ListAllRoles

# START RemovePermissions
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.collections(
        collection="TargetCollection*",
        read_config=True,
        create_collection=True,
        delete_collection=True,
    ),
    Permissions.data(collection="TargetCollection*", read=True, create=False),
]

client.roles.remove_permissions(role_name="testRole", permissions=permissions)
# END RemovePermissions

# START RevokeRoles
client.users.revoke_roles(user_id="user-b", role_names="testRole")
# END RevokeRoles
assert "testRole" not in client.users.get_assigned_roles("user-b")

# START DeleteRole
client.roles.delete(role_name="testRole")
# END DeleteRole

client.close()
custom_user_client.close()
