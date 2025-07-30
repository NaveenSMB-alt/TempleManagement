FROM python:3.13-slim

# Install cron
RUN apt-get update && apt-get install -y cron

# Copy backup script and crontab schedule
COPY Docker/cron/backup.sh /backup.sh
COPY Docker/cron/crontab.txt /etc/cron.d/media-cron

# Permissions
RUN chmod +x /backup.sh && chmod 0644 /etc/cron.d/media-cron && crontab /etc/cron.d/media-cron

# Run cron in foreground
CMD ["cron", "-f"]