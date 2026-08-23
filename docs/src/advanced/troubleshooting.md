# Troubleshooting

Solutions to common issues when using Pyreload.

## File Watching Issues

### Changes Not Detected

**Symptoms**: File changes don't trigger restarts

**Solutions**:

1. **Enable verbose mode** to see what's being watched:
   ```bash
   pyreload -v app.py
   ```

2. **Check ignore patterns**:
   ```bash
   pyreload -v -i "tests/**" app.py
   # Verify your files aren't being ignored
   ```

3. **Try polling mode**:
   ```bash
   pyreload --polling app.py
   ```

4. **Check file system events**:
   ```bash
   # On Linux
   cat /proc/sys/fs/inotify/max_user_watches

   # Increase if needed
   echo 524288 | sudo tee /proc/sys/fs/inotify/max_user_watches
   ```

### Too Many File Changes Detected

**Symptoms**: Application restarts constantly

**Solutions**:

1. **Add ignore patterns**:
   ```yaml
   ignore:
     - "**/__pycache__/**"
     - "**/*.pyc"
     - "**/*.log"
     - ".git/**"
   ```

2. **Increase restart delay**:
   ```bash
   pyreload --delay 2 app.py
   ```

3. **Watch specific directories**:
   ```bash
   pyreload -w src -w config app.py
   ```

### File System Limit Errors

**Error**: `OSError: inotify watch limit reached`

**Solution** (Linux):

```bash
# Temporary fix
sudo sysctl fs.inotify.max_user_watches=524288

# Permanent fix
echo "fs.inotify.max_user_watches=524288" | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## Process Issues

### Application Doesn't Start

**Symptoms**: Pyreload runs but application fails to start

**Solutions**:

1. **Check Python path**:
   ```bash
   which python
   pyreload --verbose app.py
   ```

2. **Verify script syntax**:
   ```bash
   python -m py_compile app.py
   ```

3. **Check file permissions**:
   ```bash
   ls -l app.py
   chmod +x app.py
   ```

4. **Try exec mode**:
   ```bash
   pyreload --exec app.py
   ```

### Application Doesn't Stop Cleanly

**Symptoms**: Process hangs when restarting

**Solutions**:

1. **Check signal handling**:
   ```python
   import signal
   import sys

   def signal_handler(signum, frame):
       # Clean up resources
       sys.exit(0)

   signal.signal(signal.SIGTERM, signal_handler)
   ```

2. **Increase shutdown timeout**:
   ```bash
   pyreload --shutdown-timeout 10 app.py
   ```

3. **Use exec mode**:
   ```bash
   pyreload --exec app.py
   ```

### Zombie Processes

**Symptoms**: Old processes remain after restart

**Solutions**:

1. **Find and kill zombies**:
   ```bash
   ps aux | grep python
   pkill -9 python
   ```

2. **Check process cleanup**:
   ```bash
   pyreload -v app.py
   # Look for "stopping" messages
   ```

3. **Use proper signal handling** in your application

## Configuration Issues

### Config File Not Found

**Error**: `Configuration file not found: config.yml`

**Solutions**:

1. **Check file location**:
   ```bash
   ls -la .pyreload.yml pyreload.yml
   ```

2. **Use absolute path**:
   ```bash
   pyreload -c /absolute/path/to/config.yml app.py
   ```

3. **Verify file format**:
   ```bash
   # Test YAML syntax
   python -c "import yaml; yaml.safe_load(open('.pyreload.yml'))"
   ```

### Invalid Config Options

**Error**: `Unknown configuration option: 'watches'`

**Solution**: Check spelling in config file:

```yaml
# Wrong
watches:
  - src

# Correct
watch:
  - src
```

## Platform-Specific Issues

### macOS

#### Code Signing Issues

**Error**: `"pyreload" cannot be opened because the developer cannot be verified`

**Solution**:

```bash
xattr -d com.apple.quarantine $(which pyreload)
```

#### FSEvents Latency

**Symptom**: Slow change detection

**Solution**: Use polling mode:

```bash
pyreload --polling --poll-interval 0.5 app.py
```

### Linux

#### Inotify Limits

See "File System Limit Errors" above.

#### Permission Errors

**Error**: `PermissionError: [Errno 13] Permission denied`

**Solutions**:

```bash
# Fix file permissions
chmod 644 config.yml
chmod 755 app.py

# Or run with appropriate permissions
sudo pyreload app.py  # Not recommended
```

### Windows

#### Path Separators

**Issue**: Paths with backslashes in config

**Solution**: Use forward slashes or escape:

```yaml
# Good
watch:
  - src/app
  - config/settings

# Also works
watch:
  - src\\app
  - config\\settings
```

#### Long Paths

**Error**: `FileNotFoundError` for long paths

**Solution**: Enable long path support in Windows:

```powershell
New-ItemProperty -Path "HKLM:\SYSTEM\CurrentControlSet\Control\FileSystem" -Name "LongPathsEnabled" -Value 1 -PropertyType DWORD -Force
```

## Performance Issues

### High CPU Usage

**Solutions**:

1. **Reduce watched files**:
   ```yaml
   watch:
     - src  # Only watch necessary directories
   ignore:
     - "**/__pycache__/**"
     - "node_modules/**"
   ```

2. **Increase poll interval**:
   ```bash
   pyreload --polling --poll-interval 2 app.py
   ```

3. **Use native file watching** (not polling):
   ```bash
   pyreload app.py  # Without --polling
   ```

### Slow Restarts

**Solutions**:

1. **Reduce startup time** in your application

2. **Use clean mode**:
   ```bash
   pyreload --clean app.py
   ```

3. **Optimize imports**:
   ```python
   # Lazy import heavy modules
   def heavy_function():
       import pandas as pd
       # use pandas
   ```

### Memory Leaks

**Solutions**:

1. **Check application for leaks**:
   ```python
   import tracemalloc
   tracemalloc.start()
   ```

2. **Restart Pyreload periodically** in long-running development sessions

3. **Use resource limits**:
   ```bash
   ulimit -v 1000000  # Limit virtual memory
   pyreload app.py
   ```

## Debugging

### Enable Verbose Mode

```bash
pyreload -v app.py
```

Shows:

- Watched files and directories
- Ignore patterns being applied
- File changes detected
- Process lifecycle events

### Debug Config Loading

```bash
pyreload -v -c config.yml app.py
```

Shows:

- Config file location
- Parsed configuration
- Applied settings

### Trace File Events

```bash
pyreload --debug app.py 2>&1 | tee pyreload-debug.log
```

Creates detailed log for analysis.

## Getting Help

If you're still stuck:

1. **Check GitHub Issues**: [github.com/smeltery/pyreload-cli/issues](https://github.com/smeltery/pyreload-cli/issues)

2. **Create an issue** with:
   - Pyreload version: `pyreload --version`
   - Operating system
   - Python version: `python --version`
   - Full error message
   - Steps to reproduce

3. **Include debug output**:
   ```bash
   pyreload -v --debug app.py 2>&1 | tee debug.log
   ```

## See Also

- [Configuration Files](../user-guide/config-files.md)
- [Watch Patterns](../user-guide/watch-patterns.md)
- [Polling Mode](../user-guide/polling-mode.md)
