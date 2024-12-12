import weaviate

# START-ANY
from weaviate.classes.rbac import Permissions

# END-ANY
from weaviate.classes.init import Auth

admin_client = weaviate.connect_to_local(
    # Use custom port defined in tests/docker-compose-rbac.yml (without showing the user)
    port=8580,
    grpc_port=50551,
    auth_credentials=Auth.api_key("admin-key")
)

def reset_user(user: str):
    # Clean slate
    current_roles = admin_client.roles.by_user(user)  # check if user exists
    for k in current_roles.keys():
        admin_client.roles.revoke_from_user(role_names=k, user=user)  # revoke all roles

# =================================================================
# =============== EXAMPLE: READ + WRITE PERMISSIONS
# =================================================================

# Clean slate
reset_user("other-user")
admin_client.roles.delete("rw_role_target_collections")  # delete if exists

# START ReadWritePermissionDefinition
# Define permissions (example confers read+write rights to collections starting with "TargetCollection_")
admin_permissions = [
    Permissions.collections(
        collection="TargetCollection_*",
        create_collection=True,
        read_config=True,
        update_config=True,
        delete_collection=True,
    ),
    Permissions.data(
        collection="TargetCollection_*",
        create=True,
        read=True,
        update=True,
        delete=True
    ),
    Permissions.backup(collection="TargetCollection_*", manage=True),
    Permissions.nodes(collection="TargetCollection_*", read=True),
    Permissions.cluster(read=True),
]

# Create a new role and assign it to a user
admin_client.roles.create(role_name="rw_role_target_collections", permissions=admin_permissions)
admin_client.roles.assign_to_user(role_names="rw_role_target_collections", user="other-user")
# END ReadWritePermissionDefinition

# ===== TEST ===== basic checks to see if the role was created
user_permissions = admin_client.roles.by_user("other-user")

assert "rw_role_target_collections" in user_permissions.keys()
assert user_permissions["rw_role_target_collections"].collections_permissions[0].collection == "TargetCollection_*"
assert user_permissions["rw_role_target_collections"].name == "rw_role_target_collections"

# =================================================================
# =============== EXAMPLE: VIEWER PERMISSIONS
# =================================================================

# Clean slate
reset_user("other-user")
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
admin_client.roles.assign_to_user(role_names="viewer_role_target_collections", user="other-user")
# END ViewerPermissionDefinition

# ===== TEST ===== basic checks to see if the role was created
user_permissions = admin_client.roles.by_user("other-user")

assert "viewer_role_target_collections" in user_permissions.keys()
assert user_permissions["viewer_role_target_collections"].collections_permissions[0].collection == "TargetCollection_*"
assert user_permissions["viewer_role_target_collections"].name == "viewer_role_target_collections"

admin_client.close()
