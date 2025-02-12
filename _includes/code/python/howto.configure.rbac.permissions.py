import weaviate
from weaviate import WeaviateClient

# START-ANY
from weaviate.classes.rbac import Permissions

# END-ANY
from weaviate.classes.init import Auth

admin_client = weaviate.connect_to_local(
    # Use custom port defined in tests/docker-compose-rbac.yml (without showing the user)
    port=8580,
    grpc_port=50551,
    auth_credentials=Auth.api_key("user-a-key")
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
reset_user("user-b", client=admin_client)
admin_client.roles.delete("rw_role_target_collections")  # delete if exists

# START ReadWritePermissionDefinition
# Define permissions (example confers read+write rights to collections starting with "TargetCollection_")
admin_permissions = [
    # Collection level permissions
    Permissions.collections(
        collection="TargetCollection_*",
        create_collection=True, # Allow creating new collections
        read_config=True,       # Allow reading collection info/metadata
        update_config=True,     # Allow updating collection configuration, i.e. update schema properties, when inserting data with new properties
        delete_collection=True  # Allow deleting collections
    ),
    # Collection data level permissions
    Permissions.data(
        collection="TargetCollection_*",
        create=True,            # Allow data inserts
        read=True,              # Allow query and fetch operations
        update=True,            # Allow data updates
        delete=False,           # Allow data deletes
    ),
    Permissions.backup(collection="TargetCollection_*", manage=True),
    Permissions.nodes(collection="TargetCollection_*", read=True),
    Permissions.cluster(read=True),
]

# Create a new role and assign it to a user
admin_client.roles.create(role_name="rw_role_target_collections", permissions=admin_permissions)
admin_client.users.assign_roles(user_id="user-b", role_names=["rw_role_target_collections"])
# END ReadWritePermissionDefinition

# ===== TEST ===== basic checks to see if the role was created
user_permissions = admin_client.users.get_assigned_roles("user-b")

assert "rw_role_target_collections" in user_permissions.keys()
assert user_permissions["rw_role_target_collections"].collections_permissions[0].collection == "TargetCollection_*"
assert user_permissions["rw_role_target_collections"].name == "rw_role_target_collections"

# =================================================================
# =============== EXAMPLE: VIEWER PERMISSIONS
# =================================================================

# Clean slate
reset_user("user-b", client=admin_client)
admin_client.roles.delete("viewer_role_target_collections")  # delete if exists

# START ViewerPermissionDefinition
# Define permissions (example confers viewer rights to collections starting with "TargetCollection_")
viewer_permissions = [
    Permissions.collections(
        collection="TargetCollection_*",
        read_config=True,
    ),
    Permissions.data(collection="TargetCollection_*", read=True),
]

# Create a new role and assign it to a user
admin_client.roles.create(role_name="viewer_role_target_collections", permissions=viewer_permissions)
admin_client.users.assign_roles(user_id="user-b", role_names="viewer_role_target_collections")
# END ViewerPermissionDefinition

# Clean slate - delete `tenant_manager` role if exists
admin_client.roles.delete("tenant_manager")

# START MTPermissionsExample
permissions = [
    Permissions.collections(
        collection="TargetCollection_*",
        create_collection=True,
        read_config=True,
        update_config=True,
        delete_collection=True
    ),
    # Without the below permission, the user would not
    # be able to create tenants in collections starting with "TargetCollection_"
    Permissions.tenants(
        collection="TargetCollection_*",
        create=True,
        read=True,
        update=True,
        delete=False
    )
]

admin_client.roles.create(
    role_name="tenant_manager", permissions=permissions
)

admin_client.users.assign_roles(user_id="user-b", role_names="tenant_manager")
# END MTPermissionsExample

# ===== TEST ===== basic checks to see if the role was created
user_permissions = admin_client.users.get_assigned_roles("user-b")

assert "viewer_role_target_collections" in user_permissions.keys()
assert user_permissions["viewer_role_target_collections"].collections_permissions[0].collection == "TargetCollection_*"
assert user_permissions["viewer_role_target_collections"].name == "viewer_role_target_collections"

admin_client.close()
