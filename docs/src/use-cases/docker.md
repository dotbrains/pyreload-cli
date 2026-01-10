# Docker Development

Pyreload is perfect for Docker-based development workflows with volume mounts. This guide shows you how to set up hot-reloading in Docker containers.

## The Challenge

When developing with Docker, you typically:

1. Edit code on your **host machine**
2. Mount code into the **container** via volumes
3. Want the app to **auto-restart** inside the container

Standard file watching doesn't work because OS events don't propagate through Docker volumes. **Pyreload's polling mode solves this**.

## Quick Start

### Dockerfile

```dockerfile
FROM python:3.11-slim

WORKDIR /app

# Install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Use pyreload with polling for development
CMD ["pyreload", "app.py", "--polling"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    volumes:
      - .:/app  # Mount current directory
    ports:
      - "8000:8000"
    environment:
      - PYTHONUNBUFFERED=1
```

### requirements.txt

```txt
pyreload>=1.0.0
flask>=2.0.0  # or your framework
```

## Complete Example: Flask API

### Project Structure

```
my-api/
├── app.py
├── requirements.txt
├── Dockerfile
└── docker-compose.yml
```

### app.py

```python
from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/')
def hello():
    return jsonify({"message": "Hello from Pyreload!"})

@app.route('/health')
def health():
    return jsonify({"status": "healthy"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000, debug=False)
```

!!! note "Why `debug=False`?"
    Flask's built-in reloader conflicts with pyreload. Disable it and let pyreload handle restarts.

### Run the Application

```bash
# Build and start
docker-compose up --build

# Now edit app.py on your host
# The container will automatically restart!
```

## Multi-Container Setup

### docker-compose.yml with Multiple Services

```yaml
version: '3.8'

services:
  api:
    build: ./api
    volumes:
      - ./api:/app
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/myapp
    command: pyreload app.py --polling
    depends_on:
      - db

  worker:
    build: ./worker
    volumes:
      - ./worker:/app
    environment:
      - CELERY_BROKER_URL=redis://redis:6379/0
    command: pyreload worker.py --polling -w "*.py" -w "tasks/*.py"
    depends_on:
      - redis

  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_PASSWORD: password
      POSTGRES_DB: myapp
    volumes:
      - postgres_data:/var/lib/postgresql/data

  redis:
    image: redis:7-alpine

volumes:
  postgres_data:
```

## Development vs Production

Use different commands for dev and production:

### docker-compose.dev.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    volumes:
      - .:/app
    command: pyreload app.py --polling --debug
    environment:
      - ENV=development
```

### docker-compose.prod.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    # No volumes in production
    command: python app.py  # No pyreload
    environment:
      - ENV=production
```

Run with:

```bash
# Development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

# Production
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

## Watch Specific Files

Watch multiple file types:

```dockerfile
CMD ["pyreload", "app.py", "--polling", \
     "-w", "*.py", \
     "-w", "config/*.yaml", \
     "-w", "templates/*.html"]
```

## Ignore Patterns

Ignore generated files and caches:

```dockerfile
CMD ["pyreload", "app.py", "--polling", \
     "-i", "*__pycache__*", \
     "-i", "*.pyc", \
     "-i", ".git/*", \
     "-i", "*.log"]
```

## Using .pyreloadrc

Create a `.pyreloadrc` in your project:

```json
{
  "watch": ["*.py", "config/*.yaml"],
  "ignore": ["*__pycache__*", "*.log", ".pytest_cache/*"],
  "polling": true,
  "debug": false
}
```

Then simplify your Dockerfile:

```dockerfile
CMD ["pyreload", "app.py"]  # Config loaded automatically
```

## Debugging

### See What Pyreload is Doing

```bash
docker-compose run app pyreload app.py --polling --debug
```

### Check Logs

```bash
# Follow logs
docker-compose logs -f app

# You'll see:
# [pyreload] Starting pyreload in polling mode
# [pyreload] Detected change in ./app.py
# [pyreload] Restarting due to file changes...
```

## Performance Tips

### Use .dockerignore

Create a `.dockerignore` to speed up builds:

```
__pycache__/
*.pyc
*.pyo
*.pyd
.Python
.git/
.pytest_cache/
.coverage
htmlcov/
dist/
build/
*.egg-info/
.venv/
venv/
```

### Multi-Stage Builds

Separate development and production images:

```dockerfile
# Development stage
FROM python:3.11-slim as development
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt && pip install pyreload-cli
CMD ["pyreload", "app.py", "--polling"]

# Production stage
FROM python:3.11-slim as production
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
CMD ["python", "app.py"]
```

Build for development:

```bash
docker build --target development -t myapp:dev .
docker run -v $(pwd):/app myapp:dev
```

## Common Issues

### Changes Not Detected

**Problem**: File changes don't trigger restarts.

**Solution**: Make sure you're using `--polling`:

```yaml
command: pyreload app.py --polling  # ← Important!
```

### High CPU Usage

**Problem**: Container uses excessive CPU.

**Solution**: This is rare with polling, but check you're not watching too many files. Add ignore patterns:

```bash
pyreload app.py --polling -i "node_modules/*" -i "*.log"
```

### Permission Issues

**Problem**: Permission denied errors in container.

**Solution**: Match user IDs in Dockerfile:

```dockerfile
ARG USER_ID=1000
ARG GROUP_ID=1000

RUN groupadd -g ${GROUP_ID} appuser && \
    useradd -u ${USER_ID} -g appuser -m appuser

USER appuser
```

Build with your user ID:

```bash
docker build --build-arg USER_ID=$(id -u) --build-arg GROUP_ID=$(id -g) -t myapp .
```

## Next Steps

- Learn about [Vagrant workflows](vagrant.md)
- Read about [polling mode internals](../user-guide/polling-mode.md)
