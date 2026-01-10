# Exec Mode

Use exec mode to replace the Pyreload process with your application, useful for specific deployment scenarios.

## What is Exec Mode?

In exec mode, Pyreload uses `os.exec()` to replace itself with your application process instead of spawning it as a child process.

## When to Use Exec Mode

Exec mode is useful when:

1. **Container environments**: PID 1 must be your application
2. **Signal handling**: Your app needs direct signal handling
3. **Resource constraints**: Minimize process overhead
4. **Process monitoring**: External tools expect a specific process

## Limitations

⚠️ **Important**: Exec mode has significant limitations:

- **No file watching**: Pyreload exits after starting your app
- **No auto-restart**: File changes won't trigger restarts
- **Single start**: Your app runs once and Pyreload terminates

Exec mode is essentially a process launcher, not a development tool.

## Usage

### Command Line

```bash
pyreload --exec app.py
```

### Config File

```yaml
exec: true
```

## How It Works

### Normal Mode (Default)

```
Parent: Pyreload
  └─ Child: Your Application
```

When files change:

1. Pyreload stops child process
2. Pyreload starts new child process
3. Pyreload continues watching

### Exec Mode

```
Pyreload → Your Application (process replacement)
```

Execution flow:

1. Pyreload performs initial setup
2. Pyreload replaces itself with your application
3. No watching or restarting occurs

## Examples

### Docker Container

```dockerfile
FROM python:3.11
WORKDIR /app
COPY . .
RUN pip install pyreload

# Use exec mode as PID 1
CMD ["pyreload", "--exec", "app.py"]
```

This ensures your application is PID 1 in the container.

### Systemd Service

```ini
[Unit]
Description=My Python Application
After=network.target

[Service]
Type=simple
ExecStart=/usr/local/bin/pyreload --exec /opt/app/main.py
Restart=always
RestartSec=10

[Install]
WantedBy=multi-user.target
```

### Process Supervision

When using process supervisors like `supervisord`:

```ini
[program:myapp]
command=pyreload --exec /app/main.py
directory=/app
autostart=true
autorestart=true
redirect_stderr=true
```

## Development vs Production

### Development (Normal Mode)

Use normal mode for development:

```bash
pyreload app.py
```

Benefits:

- Auto-restart on changes
- File watching
- Interactive commands

### Production (Exec Mode)

Use exec mode in production if needed:

```bash
pyreload --exec app.py
```

Benefits:

- Cleaner process tree
- Direct signal handling
- Minimal overhead

## Alternatives to Exec Mode

Consider these alternatives before using exec mode:

### 1. Run Application Directly

If you don't need Pyreload's features:

```bash
python app.py
```

### 2. Use Normal Mode with Proper Signal Handling

For containers:

```dockerfile
CMD ["pyreload", "app.py"]
```

Pyreload forwards signals to your application.

### 3. Use Dedicated Process Manager

For production:

- **Systemd**: Built-in service management
- **Supervisor**: Python-based process control
- **PM2**: Advanced process manager

## Signal Handling in Exec Mode

Exec mode passes control to your application:

```python
# Your application handles signals directly
import signal
import sys

def signal_handler(signum, frame):
    print(f"Received signal {signum}")
    sys.exit(0)

signal.signal(signal.SIGTERM, signal_handler)
signal.signal(signal.SIGINT, signal_handler)
```

## Troubleshooting

### "Exec mode disables file watching"

This is expected. Exec mode is a one-time launcher.

**Solution**: Use normal mode for development.

### "Process doesn't restart on changes"

Exec mode doesn't watch files.

**Solution**: Remove `--exec` flag.

### "Need PID 1 in container"

Use exec mode or run application directly:

```dockerfile
# Option 1: Exec mode
CMD ["pyreload", "--exec", "app.py"]

# Option 2: Direct execution
CMD ["python", "app.py"]
```

## Best Practices

1. **Development**: Use normal mode
2. **Production**: Consider alternatives to exec mode
3. **Containers**: Only use exec mode if PID 1 is required
4. **Testing**: Test signal handling when using exec mode

## See Also

- [Clean Mode](clean-mode.md)
- [Troubleshooting](troubleshooting.md)
- [Docker Use Cases](../use-cases/docker.md)
