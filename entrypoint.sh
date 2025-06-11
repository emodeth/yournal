#!/usr/bin/env bash

set -e

echo "Running database migrations..."
if [ ! -d "/app/migrations" ]; then
  flask db init
fi

flask db migrate
flask db upgrade

echo "Starting the Flask app with Gunicorn..."
gunicorn 'app.wsgi' \
    --bind=0.0.0.0:5000 \
    --workers=4 \
    --threads=2 \
    --worker-class=gthread \
    --access-logfile=- \
    --error-logfile=-
