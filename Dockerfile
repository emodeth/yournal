# syntax=docker/dockerfile:1

ARG PYTHON_VERSION=3.10.6
FROM python:${PYTHON_VERSION}-slim as base

# Prevent .pyc files & disable output buffering
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set working directory
WORKDIR /app

# Install required system dependencies
RUN apt-get update && apt-get install -y \
    build-essential gcc libpq-dev curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Add a non-privileged user
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

# Cache dependencies install step
RUN --mount=type=cache,target=/root/.cache/pip \
    --mount=type=bind,source=requirements.txt,target=requirements.txt \
    pip install --no-cache-dir -r requirements.txt

# Copy source code
COPY . .

# Ensure entrypoint is executable
RUN chmod u+x ./entrypoint.sh

# Fix permission issues for migrations, etc.
RUN chown -R appuser /app

# Switch to non-root user
USER appuser

# Expose port used by Gunicorn
EXPOSE 5000

ENTRYPOINT ["./entrypoint.sh"]
