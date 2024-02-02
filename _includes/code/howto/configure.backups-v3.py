# How-to: Configure -> Backups - Python examples

# ================================
# ===== INSTANTIATION-COMMON =====
# ================================

# START CreateBackup
import weaviate

client = weaviate.Client("http://localhost:8080")
# END CreateBackup

# Create the classes, whether they exist or not
client.data_object.create({"title": "Dummy"}, class_name="Article")
client.data_object.create({"title": "Dummy"}, class_name="Publication")
# START CreateBackup
result = client.backup.create(
  backup_id="my-very-first-backup",
  backend="filesystem",
  include_classes=["Article", "Publication"],
  wait_for_completion=True,
)

print(result)
# END CreateBackup

# Test
assert result["status"] == "SUCCESS"


# ==============================================
# ===== Check status while creating backup =====
# ==============================================

# START StatusCreateBackup
result = client.backup.get_create_status(
  backup_id="my-very-first-backup",
  backend="filesystem",
)

print(result)
# END StatusCreateBackup

# Test
assert result["status"] == "SUCCESS"


# ==========================
# ===== Restore backup =====
# ==========================

client.schema.delete_class("Publication")
# START RestoreBackup
result = client.backup.restore(
  backup_id="my-very-first-backup",
  backend="filesystem",
  exclude_classes="Article",
  wait_for_completion=True,
)

print(result)
# END RestoreBackup

# Test
assert result["status"] == "SUCCESS"


# ==============================================
# ===== Check status while restoring backup =====
# ==============================================

# START StatusRestoreBackup
result = client.backup.get_restore_status(
  backup_id="my-very-first-backup",
  backend="filesystem",
)

print(result)
# END StatusRestoreBackup

# Test
assert result["status"] == "SUCCESS"
