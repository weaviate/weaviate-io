import weaviate
from weaviate import WeaviateClient
from weaviate.classes.init import Auth

client = weaviate.connect_to_local(
    # Use custom port defined in tests/docker-compose-rbac.yml (without showing the user)
    port=8580,
    grpc_port=50551,
    auth_credentials=Auth.api_key("root-user-key"),
)


def reset_user(user: str, client: WeaviateClient):
    # Clean slate
    current_roles = client.users.get_assigned_roles(user)  # check if user exists
    for k in current_roles.keys():
        client.users.revoke_roles(user_id=user, role_names=k)  # revoke all roles


# =================================================================
# =============== EXAMPLE: READ + WRITE PERMISSIONS
# =================================================================

# Clean slate
reset_user("custom-user", client=client)
client.roles.delete("rw_role")  # delete if exists

# START ReadWritePermissionDefinition
from weaviate.classes.rbac import Permissions

# Define permissions (example confers read+write rights to collections starting with "TargetCollection")
permissions = [
    # Collection level permissions
    Permissions.collections(
        collection="TargetCollection*",
        create_collection=True,  # Allow creating new collections
        read_config=True,  # Allow reading collection info/metadata
        update_config=True,  # Allow updating collection configuration, i.e. update schema properties, when inserting data with new properties
        delete_collection=True,  # Allow deleting collections
    ),
    # Collection data level permissions
    Permissions.data(
        collection="TargetCollection*",
        create=True,  # Allow data inserts
        read=True,  # Allow query and fetch operations
        update=True,  # Allow data updates
        delete=False,  # Allow data deletes
    ),
    Permissions.backup(collection="TargetCollection*", manage=True),
    Permissions.Nodes.verbose(collection="TargetCollection*", read=True),
    Permissions.cluster(read=True),
]

# Create a new role
client.roles.create(role_name="rw_role", permissions=permissions)
# END ReadWritePermissionDefinition
# START ReadWritePermissionAssignment
# Assign the role to a user
client.users.assign_roles(user_id="custom-user", role_names=["rw_role"])
# END ReadWritePermissionAssignment

# ===== TEST ===== basic checks to see if the role was created
user_permissions = client.users.get_assigned_roles("custom-user")

assert "rw_role" in user_permissions.keys()
assert (
    user_permissions["rw_role"].collections_permissions[0].collection
    == "TargetCollection*"
)
assert user_permissions["rw_role"].name == "rw_role"

# =================================================================
# =============== EXAMPLE: VIEWER PERMISSIONS
# =================================================================

# Clean slate
client.roles.delete("viewer_role")  # delete if exists

# START ViewerPermissionDefinition
from weaviate.classes.rbac import Permissions

# Define permissions (example confers viewer rights to collections starting with "TargetCollection")
permissions = [
    Permissions.collections(
        collection="TargetCollection*",
        read_config=True,
    ),
    Permissions.data(collection="TargetCollection*", read=True),
]

# Create a new role
client.roles.create(role_name="viewer_role", permissions=permissions)
# END ViewerPermissionDefinition
# START ViewerPermissionAssignment
# Assign the role to a user
client.users.assign_roles(user_id="custom-user", role_names="viewer_role")
# END ViewerPermissionAssignment

# =================================================================
# =============== EXAMPLE: VIEWER PERMISSIONS
# =================================================================

# Clean slate
client.roles.delete("tenant_manager")

# START MTPermissionsExample
from weaviate.classes.rbac import Permissions

permissions = [
    Permissions.tenants(
        collection="TargetCollection*",  # Applies to all collections starting with "TargetCollection"
        tenant="TargetTenant*",  # Applies to all tenants starting with "TargetTenant"
        create=True,  # Allow creating new tenants
        read=True,  # Allow reading tenant info/metadata
        update=True,  # Allow updating tenant states
        delete=True,  # Allow deleting tenants
    ),
    Permissions.data(
        collection="TargetCollection*",  # Applies to all collections starting with "TargetCollection"
        tenant="TargetTenant*",  # Applies to all tenants starting with "TargetTenant"
        create=True,  # Allow data inserts
        read=True,  # Allow query and fetch operations
        update=True,  # Allow data updates
        delete=True,  # Allow data deletes
    ),
]

# Create a new role
client.roles.create(role_name="tenant_manager", permissions=permissions)
# END MTPermissionsExample
# START MTPermissionsAssignment
# Assign the role to a user
client.users.assign_roles(user_id="custom-user", role_names="tenant_manager")
# END MTPermissionsAssignment

# ===== TEST ===== basic checks to see if the role was created
user_permissions = client.users.get_assigned_roles("custom-user")

assert "viewer_role" in user_permissions.keys()
assert (
    user_permissions["viewer_role"].collections_permissions[0].collection
    == "TargetCollection*"
)
assert user_permissions["viewer_role"].name == "viewer_role"

client.close()
