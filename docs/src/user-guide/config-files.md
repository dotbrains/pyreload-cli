# Config Files

Use configuration files to manage Pyreload settings across your projects.

## Configuration File Formats

Pyreload supports multiple formats:

- YAML (`.yml`, `.yaml`)
- JSON (`.json`)
- TOML (`.toml`)

## Default Locations

Pyreload automatically searches for config files in this order:

1. `.pyreload.yml`
2. `.pyreload.yaml`
3. `.pyreload.json`
4. `.pyreload.toml`
5. `pyreload.yml`
6. `pyreload.yaml`
7. `pyreload.json`
8. `pyreload.toml`

## Configuration Options

### YAML Format

```yaml
# Watch paths
watch:
  - src
  - config
  - tests

# File extensions to watch
extensions:
  - py
  - yaml
  - json

# Patterns to ignore
ignore:
  - "**/__pycache__/**"
  - "**/*.pyc"
  - ".git/**"

# Use polling instead of native file watching
polling: false

# Polling interval in seconds (if polling is true)
poll_interval: 1.0

# Verbose output
verbose: false

# Enable exec mode (replace process instead of spawning)
exec: false

# Clean mode (clear screen on restart)
clean: false

# Delay before restarting (in seconds)
delay: 1.0
```

### JSON Format

```json
{
  "watch": ["src", "config"],
  "extensions": ["py", "yaml"],
  "ignore": ["**/__pycache__/**", "**/*.pyc"],
  "polling": false,
  "verbose": false,
  "exec": false,
  "clean": false,
  "delay": 1.0
}
```

### TOML Format

```toml
watch = ["src", "config"]
extensions = ["py", "yaml"]
ignore = ["**/__pycache__/**", "**/*.pyc"]
polling = false
verbose = false
exec = false
clean = false
delay = 1.0
```

## Using Config Files

### Automatic Discovery

Place a config file in your project root:

```bash
pyreload app.py
```

### Explicit Config

Specify a config file:

```bash
pyreload -c myconfig.yml app.py
```

### Override Config Options

Command-line options override config file settings:

```bash
pyreload -c config.yml -v -w extra_dir app.py
```

## Complete Example

### Project Structure

```
myproject/
├── .pyreload.yml
├── src/
│   └── app.py
├── config/
│   └── settings.yaml
└── tests/
    └── test_app.py
```

### .pyreload.yml

```yaml
watch:
  - src
  - config

extensions:
  - py
  - yaml

ignore:
  - "tests/**"
  - "**/__pycache__/**"
  - "**/*.pyc"
  - ".pytest_cache/**"

clean: true
delay: 0.5
verbose: false
```

### Running

```bash
cd myproject
pyreload src/app.py
```

## Environment-Specific Configs

### Development

```yaml
# .pyreload.dev.yml
watch:
  - src
  - config
  - tests
verbose: true
clean: true
```

### Production

```yaml
# .pyreload.prod.yml
watch:
  - src
  - config
verbose: false
polling: true
poll_interval: 2.0
```

### Usage

```bash
# Development
pyreload -c .pyreload.dev.yml app.py

# Production
pyreload -c .pyreload.prod.yml app.py
```

## Best Practices

1. **Use version control**: Commit config files to share settings
2. **Environment files**: Create separate configs for dev/prod
3. **Document settings**: Add comments explaining non-obvious options
4. **Start simple**: Begin with basic settings and expand as needed

## Config Validation

Pyreload validates config files and reports errors:

```bash
pyreload -c invalid.yml app.py
# Error: Invalid configuration: unknown option 'watches' (did you mean 'watch'?)
```

## See Also

- [Watch Patterns](watch-patterns.md)
- [Ignore Patterns](ignore-patterns.md)
- [CLI Reference](../api/cli-reference.md)
