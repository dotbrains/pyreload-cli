# Config Reference

Complete reference for Pyreload configuration files.

## Configuration Formats

Pyreload supports three formats:

- **YAML**: `.pyreload.yml`, `.pyreload.yaml`, `pyreload.yml`, `pyreload.yaml`
- **JSON**: `.pyreload.json`, `pyreload.json`
- **TOML**: `.pyreload.toml`, `pyreload.toml`

## Schema

### watch

**Type**: `array of strings`  
**Default**: `["."]`

Paths to watch for file changes.

```yaml
watch:
  - src
  - config
  - tests
```

```json
{
  "watch": ["src", "config", "tests"]
}
```

```toml
watch = ["src", "config", "tests"]
```

### extensions

**Type**: `array of strings`  
**Default**: `["py"]`

File extensions to watch (without dots).

```yaml
extensions:
  - py
  - yaml
  - json
  - txt
```

```json
{
  "extensions": ["py", "yaml", "json", "txt"]
}
```

```toml
extensions = ["py", "yaml", "json", "txt"]
```

### ignore

**Type**: `array of strings (glob patterns)`  
**Default**: Common patterns (see below)

Patterns to ignore when watching files.

```yaml
ignore:
  - "**/__pycache__/**"
  - "**/*.pyc"
  - "tests/**"
  - "*.log"
```

```json
{
  "ignore": [
    "**/__pycache__/**",
    "**/*.pyc",
    "tests/**",
    "*.log"
  ]
}
```

```toml
ignore = [
  "**/__pycache__/**",
  "**/*.pyc",
  "tests/**",
  "*.log"
]
```

**Default ignore patterns**:
- `.git/**`
- `**/__pycache__/**`
- `**/*.pyc`
- `**/*.pyo`
- `.venv/**`
- `venv/**`
- `node_modules/**`
- `.tox/**`
- `**/*.egg-info/**`

### polling

**Type**: `boolean`  
**Default**: `false`

Use polling instead of native file system events.

```yaml
polling: true
```

```json
{
  "polling": true
}
```

```toml
polling = true
```

### poll_interval

**Type**: `number` (seconds)  
**Default**: `1.0`

Polling interval when `polling` is enabled.

```yaml
polling: true
poll_interval: 0.5
```

```json
{
  "polling": true,
  "poll_interval": 0.5
}
```

```toml
polling = true
poll_interval = 0.5
```

### delay

**Type**: `number` (seconds)  
**Default**: `1.0`

Delay before restarting after detecting changes.

```yaml
delay: 2.0
```

```json
{
  "delay": 2.0
}
```

```toml
delay = 2.0
```

### clean

**Type**: `boolean`  
**Default**: `false`

Clear terminal screen before each restart.

```yaml
clean: true
```

```json
{
  "clean": true
}
```

```toml
clean = true
```

### verbose

**Type**: `boolean`  
**Default**: `false`

Enable verbose output.

```yaml
verbose: true
```

```json
{
  "verbose": true
}
```

```toml
verbose = true
```

### quiet

**Type**: `boolean`  
**Default**: `false`

Suppress Pyreload output (show only application output).

```yaml
quiet: true
```

```json
{
  "quiet": true
}
```

```toml
quiet = true
```

### exec

**Type**: `boolean`  
**Default**: `false`

Use exec mode (replace process instead of spawning child).

```yaml
exec: true
```

```json
{
  "exec": true
}
```

```toml
exec = true
```

⚠️ Warning: Exec mode disables file watching.

### no_interactive

**Type**: `boolean`  
**Default**: `false`

Disable interactive keyboard commands.

```yaml
no_interactive: true
```

```json
{
  "no_interactive": true
}
```

```toml
no_interactive = true
```

## Complete Examples

### Development Configuration

```yaml
# .pyreload.yml
watch:
  - src
  - config
  - tests

extensions:
  - py
  - yaml
  - json

ignore:
  - "**/__pycache__/**"
  - "**/*.pyc"
  - ".pytest_cache/**"

clean: true
verbose: true
delay: 1.0
```

### Production Configuration

```yaml
# .pyreload.prod.yml
watch:
  - src
  - config

extensions:
  - py
  - yaml

ignore:
  - "**/__pycache__/**"
  - "tests/**"
  - "docs/**"

polling: true
poll_interval: 2.0
quiet: true
no_interactive: true
```

### Docker Configuration

```yaml
# .pyreload.docker.yml
watch:
  - /app/src

extensions:
  - py

polling: true
poll_interval: 1.0

ignore:
  - "**/__pycache__/**"
  - ".git/**"

clean: true
```

### Minimal Configuration

```yaml
# Minimal valid config
watch:
  - src
```

## Configuration Precedence

Configuration is loaded in this order (later overrides earlier):

1. Default values
2. Configuration file
3. Environment variables
4. Command-line arguments

### Example

```yaml
# config.yml
watch:
  - src
verbose: false
```

```bash
# Command overrides config
pyreload -c config.yml -v -w tests app.py

# Result:
# - watch: ["src", "tests"]
# - verbose: true
```

## Validation

Pyreload validates configuration and reports errors:

### Unknown Option

```yaml
watches: ["src"]  # Wrong key
```

```
Error: Unknown configuration option 'watches'. Did you mean 'watch'?
```

### Invalid Type

```yaml
delay: "one second"  # Should be number
```

```
Error: Invalid value for 'delay': expected number, got string
```

### Invalid Pattern

```yaml
ignore:
  - "[invalid"  # Invalid glob pattern
```

```
Error: Invalid glob pattern in 'ignore': [invalid
```

## Environment-Specific Configs

### Development

```yaml
# .pyreload.dev.yml
watch:
  - src
  - tests
verbose: true
clean: true
delay: 0.5
```

### Staging

```yaml
# .pyreload.staging.yml
watch:
  - src
polling: true
poll_interval: 1.0
verbose: false
```

### Production

```yaml
# .pyreload.prod.yml
watch:
  - src
polling: true
poll_interval: 2.0
quiet: true
no_interactive: true
```

### Usage

```bash
# Development
pyreload -c .pyreload.dev.yml app.py

# Staging
pyreload -c .pyreload.staging.yml app.py

# Production
pyreload -c .pyreload.prod.yml app.py
```

## Best Practices

1. **Version control**: Commit config files to share settings
2. **Environment files**: Use separate configs for different environments
3. **Comments**: Document non-obvious options (YAML/TOML only)
4. **Validation**: Test configs with `--verbose` flag
5. **Minimal**: Start with minimal config and expand as needed

## See Also

- [CLI Reference](cli-reference.md)
- [Config Files Guide](../user-guide/config-files.md)
- [Watch Patterns](../user-guide/watch-patterns.md)
