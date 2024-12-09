import weaviate

# START-ANY
from weaviate.classes.rbac import Permissions

# END-ANY
from weaviate.classes.init import Auth

admin_client = weaviate.connect_to_local(auth_credentials=Auth.api_key("admin-key"))

def reset_user(user: str):
    # Clean slate
    current_roles = admin_client.roles.by_user(user)  # check if user exists
    for k in current_roles.keys():
        admin_client.roles.revoke(role_names=k, user=user)  # revoke all roles

# =================================================================
# =============== EXAMPLE: ADMIN PERMISSIONS
# =================================================================

# Clean slate
reset_user("other-user")
admin_client.roles.delete("admin_role_target_collections")  # delete if exists

# START AdminPermissionDefinition
# Define permissions (example confers administrative rights to collections starting with "TargetCollection_")
admin_permissions = [
    Permissions.collections(
        collection="TargetCollection_*",
        manage_collection=True,
    ),
    Permissions.data(collection="TargetCollection_*", manage=True),
    Permissions.backup(collection="TargetCollection_*", manage=True),
    Permissions.nodes(collection="TargetCollection_*", read=True),
    Permissions.cluster(read=True),
]

# Create a new role and assign it to a user
admin_client.roles.create(role_name="admin_role_target_collections", permissions=admin_permissions)
admin_client.roles.assign(role_names="admin_role_target_collections", user="other-user")
# END AdminPermissionDefinition

# ===== TEST ===== basic checks to see if the role was created
user_permissions = admin_client.roles.by_user("other-user")

assert "admin_role_target_collections" in user_permissions.keys()
assert user_permissions["admin_role_target_collections"].collections_permissions[0].collection == "TargetCollection_*"
assert user_permissions["admin_role_target_collections"].name == "admin_role_target_collections"

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
admin_client.roles.assign(role_names="viewer_role_target_collections", user="other-user")
# END ViewerPermissionDefinition

# ===== TEST ===== basic checks to see if the role was created
user_permissions = admin_client.roles.by_user("other-user")

assert "admin_role_target_collections" in user_permissions.keys()
assert user_permissions["viewer_role_target_collections"].collections_permissions[0].collection == "TargetCollection_*"
assert user_permissions["viewer_role_target_collections"].name == "viewer_role_target_collections"

admin_client.close()
