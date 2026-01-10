# CLI Reference

Complete reference for Pyreload command-line interface.

## Synopsis

```bash
pyreload [OPTIONS] SCRIPT [-- SCRIPT_ARGS]
```

## Arguments

### SCRIPT

The Python script to run and monitor.

```bash
pyreload app.py
```

### SCRIPT_ARGS

Arguments to pass to your script (after `--`):

```bash
pyreload app.py -- --port 8000 --debug
```

## Options

### Watch Options

#### `-w, --watch PATH`

Add a path to watch for changes. Can be specified multiple times.

```bash
pyreload -w src -w config app.py
```

Default: Current directory (`.`)

#### `-e, --extension EXT`

File extensions to watch. Can be specified multiple times.

```bash
pyreload -e py -e yaml -e json app.py
```

Default: `py`

#### `-i, --ignore PATTERN`

Patterns to ignore. Supports glob syntax.

```bash
pyreload -i "tests/**" -i "*.log" app.py
```

Common ignores are applied by default (`.git`, `__pycache__`, etc.)

### Polling Options

#### `--polling`

Use polling instead of native file system events.

```bash
pyreload --polling app.py
```

Useful for:

- Network file systems
- Docker volumes
- Vagrant synced folders
- Systems with limited inotify watches

#### `--poll-interval SECONDS`

Polling interval in seconds (default: 1.0).

```bash
pyreload --polling --poll-interval 2.0 app.py
```

### Behavior Options

#### `--clean`

Clear screen before each restart.

```bash
pyreload --clean app.py
```

#### `--delay SECONDS`

Delay in seconds before restarting after changes (default: 1.0).

```bash
pyreload --delay 2.0 app.py
```

#### `--exec`

Use exec mode (replace process instead of spawning child).

```bash
pyreload --exec app.py
```

⚠️ Warning: Exec mode disables file watching.

#### `--no-interactive`

Disable interactive keyboard commands.

```bash
pyreload --no-interactive app.py
```

Useful in CI/CD or non-interactive environments.

### Output Options

#### `-v, --verbose`

Enable verbose output.

```bash
pyreload -v app.py
```

Shows:
- Watched paths
- Detected changes
- Process lifecycle events

#### `-q, --quiet`

Suppress Pyreload output (only show application output).

```bash
pyreload -q app.py
```

#### `--debug`

Enable debug-level logging.

```bash
pyreload --debug app.py
```

### Configuration Options

#### `-c, --config FILE`

Path to configuration file.

```bash
pyreload -c config.yml app.py
```

Supports formats:
- YAML (`.yml`, `.yaml`)
- JSON (`.json`)
- TOML (`.toml`)

#### `--no-config`

Don't load any configuration file.

```bash
pyreload --no-config app.py
```

### Information Options

#### `-h, --help`

Show help message and exit.

```bash
pyreload --help
```

#### `--version`

Show version and exit.

```bash
pyreload --version
```

## Interactive Commands

While Pyreload is running, press:

- **`r`** - Manually restart
- **`q`** - Quit
- **`h`** - Show help
- **`c`** - Clear screen

## Exit Codes

- **0** - Normal exit
- **1** - General error
- **2** - Configuration error
- **130** - Interrupted (Ctrl+C)

## Examples

### Basic Usage

```bash
# Watch current directory
pyreload app.py

# Watch specific directories
pyreload -w src -w config app.py

# Watch multiple file types
pyreload -e py -e yaml app.py
```

### With Configuration

```bash
# Use config file
pyreload -c .pyreload.yml app.py

# Override config options
pyreload -c config.yml -v -w extra app.py
```

### Advanced

```bash
# Polling with custom interval
pyreload --polling --poll-interval 0.5 app.py

# Clean screen, verbose, with delay
pyreload --clean -v --delay 2 app.py

# Pass arguments to script
pyreload app.py -- --host 0.0.0.0 --port 8000
```

### Production

```bash
# Non-interactive with quiet output
pyreload --no-interactive -q app.py

# Exec mode for containers
pyreload --exec app.py
```

## Environment Variables

Pyreload respects these environment variables:

### PYRELOAD_CONFIG

Default configuration file path:

```bash
export PYRELOAD_CONFIG=~/.pyreload.yml
pyreload app.py
```

### PYTHONUNBUFFERED

Force unbuffered output (recommended):

```bash
export PYTHONUNBUFFERED=1
pyreload app.py
```

### NO_COLOR

Disable colored output:

```bash
export NO_COLOR=1
pyreload app.py
```

## Shell Integration

### Bash

```bash
# .bashrc
alias pm='pyreload'
alias pmc='pyreload --clean'
```

### Zsh

```bash
# .zshrc
alias pm='pyreload'
alias pmc='pyreload --clean'
```

### Fish

```fish
# config.fish
alias pm 'pyreload'
alias pmc 'pyreload --clean'
```

## See Also

- [Config Reference](config-reference.md)
- [Basic Usage](../getting-started/basic-usage.md)
- [Interactive Commands](../user-guide/commands.md)
