#!/usr/bin/env bash
set -e

echo "Running database migrations..."

# Apply existing migrations only (don't re-init or re-migrate in production)
flask db upgrade

echo "Starting the Flask app with Gunicorn..."
gunicorn 'app.wsgi' \
    --bind=0.0.0.0:5000 \
    --workers=4 \
    --threads=2 \
    --worker-class=gthread \
    --access-logfile=- \
    --error-logfile=-