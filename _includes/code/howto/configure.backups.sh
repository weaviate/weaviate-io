# How-to: Configure -> Backups - cur examples

# START CreateBackup
curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
         "id": "my-very-first-backup",
         "include": ["Article", "Publication"]
        }' \
    http://localhost:8080/v1/backups/filesystem
# END CreateBackup

# START StatusCreateBackup
curl http://localhost:8080/v1/backups/filesystem/my-very-first-backup
# END StatusCreateBackup

# START RestoreBackup
curl \
    -X POST \
    -H "Content-Type: application/json" \
    -d '{
         "id": "my-very-first-backup",
         "exclude": ["Article"]
        }' \
    http://localhost:8080/v1/backups/filesystem/my-very-first-backup/restore
# END RestoreBackup


# START StatusRestoreBackup
curl http://localhost:8080/v1/backups/filesystem/my-very-first-backup/restore
# END StatusRestoreBackup
