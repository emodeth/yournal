#!/usr/bin/env bash

set -e

echo "Running database migrations..."
# Check if the migrations folder exists before running db init
if [ ! -d "/app/migrations" ]; then
  flask db init
fi

flask db migrate
flask db upgrade

# Start the Flask app with Gunicorn (in the background)
echo "Starting the Flask app with Gunicorn..."
gunicorn 'app.wsgi' --bind=0.0.0.0:5000 --workers=4 --threads=2 &

# Wait for the Gunicorn process to finish
wait