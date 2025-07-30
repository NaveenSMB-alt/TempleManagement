#!/bin/bash

# Set date and backup dir
DATE=$(date +"%Y-%m-%d_%H-%M-%S")
BACKUP_DIR="/backup/media/$DATE"
mkdir -p "$BACKUP_DIR"

# Copy media files
cp -r /app/media/* "$BACKUP_DIR"

# Remove backups older than 3 days
find /backup/media/* -maxdepth 0 -type d -mtime +3 -exec rm -rf {} \;
