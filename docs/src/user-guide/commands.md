# Interactive Commands

Control Pyreload while it's running using interactive keyboard commands.

## Available Commands

While Pyreload is monitoring your application, press:

- **`r`** - Manually restart your application
- **`q`** - Quit Pyreload
- **`h`** - Show help with available commands
- **`c`** - Clear the console output

## Usage Examples

### Manual Restart

Press `r` to force a restart without waiting for file changes:

```
[pyreload] watching: src/**/*.py
[pyreload] starting: python app.py
Application started on port 8000

r  <-- Press 'r'

[pyreload] restarting due to manual trigger
[pyreload] stopping: python app.py
[pyreload] starting: python app.py
Application started on port 8000
```

### Clean Exit

Press `q` to stop both Pyreload and your application:

```
[pyreload] watching: src/**/*.py
[pyreload] starting: python app.py
Application started on port 8000

q  <-- Press 'q'

[pyreload] received quit signal
[pyreload] stopping: python app.py
[pyreload] exiting
```

### Clear Screen

Press `c` to clear console output:

```
[pyreload] watching: src/**/*.py
[lots of output...]

c  <-- Press 'c'

[screen cleared]
[pyreload] watching: src/**/*.py
```

## Non-Interactive Mode

To disable interactive commands (useful in CI/CD or containers):

```bash
pyreload --no-interactive app.py
```

## Signal Handling

Pyreload responds to system signals:

### SIGINT (Ctrl+C)

Gracefully stops the application and exits:

```bash
^C
[pyreload] received interrupt signal
[pyreload] stopping: python app.py
[pyreload] exiting
```

### SIGTERM

Gracefully stops the application and exits (sent by system shutdown):

```bash
[pyreload] received termination signal
[pyreload] stopping: python app.py
[pyreload] exiting
```

### SIGHUP

Restarts the application without exiting Pyreload:

```bash
kill -HUP <pyreload_pid>
[pyreload] received hangup signal
[pyreload] restarting due to signal
```

## Programmatic Control

### Using Process Signals

Send signals to control Pyreload programmatically:

```bash
# Find Pyreload process
ps aux | grep pyreload

# Send restart signal
kill -HUP <pid>

# Send stop signal
kill -TERM <pid>
```

### Example Script

```bash
#!/bin/bash
# restart-app.sh

PYRELOAD_PID=$(pgrep -f "pyreload app.py")
if [ -n "$PYRELOAD_PID" ]; then
    kill -HUP $PYRELOAD_PID
    echo "Sent restart signal to Pyreload (PID: $PYRELOAD_PID)"
else
    echo "Pyreload is not running"
fi
```

## Best Practices

1. **Use `r` for testing**: Quickly test changes without modifying files
2. **Use `q` for clean shutdown**: Ensures proper cleanup
3. **Use `c` for readability**: Clear cluttered output during development
4. **Disable interactive in CI**: Use `--no-interactive` in automated environments

## Troubleshooting

### Commands Not Responding

If interactive commands don't work:

1. Check if stdin is available:
   ```bash
   pyreload app.py < /dev/null  # This disables interactive mode
   ```

2. Ensure terminal is in interactive mode:
   ```bash
   # Good - terminal is attached
   pyreload app.py

   # Bad - no terminal
   nohup pyreload app.py &
   ```

3. Use verbose mode to debug:
   ```bash
   pyreload -v app.py
   ```

### Signal Not Received

If signals don't work:

1. Verify Pyreload is running:
   ```bash
   ps aux | grep pyreload
   ```

2. Check process permissions:
   ```bash
   kill -0 <pid>  # Test if you can send signals
   ```

3. Use correct signal names:
   ```bash
   kill -SIGHUP <pid>  # Not just 'HUP'
   ```

## See Also

- [Basic Usage](../getting-started/basic-usage.md)
- [Troubleshooting](../advanced/troubleshooting.md)
- [CLI Reference](../api/cli-reference.md)
