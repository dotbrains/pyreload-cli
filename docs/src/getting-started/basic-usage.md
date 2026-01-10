# Basic Usage

Learn the fundamentals of using Pyreload to monitor and restart your Python applications.

## Running Pyreload

The basic syntax is:

```bash
pyreload [OPTIONS] SCRIPT [-- SCRIPT_ARGS]
```

## Common Patterns

### Watch Current Directory

```bash
pyreload app.py
```

### Watch Specific Directories

```bash
pyreload -w src -w config app.py
```

### Custom Extensions

```bash
pyreload -e py -e yaml -e json app.py
```

## Interactive Commands

While Pyreload is running, you can use these commands:

- **`r`** - Manual restart
- **`q`** - Quit Pyreload
- **`h`** - Show help

## Configuration File

Instead of command-line options, you can use a config file:

```yaml
# pyreload.yml
watch:
  - src
  - config
extensions:
  - py
  - yaml
ignore:
  - "**/__pycache__/**"
  - "**/.git/**"
```

Then run:

```bash
pyreload -c pyreload.yml app.py
```

## Environment Variables

Pyreload passes all environment variables to your script:

```bash
DEBUG=true PORT=8000 pyreload app.py
```

## Next Steps

- Configure [Watch Patterns](../user-guide/watch-patterns.md)
- Learn about [Ignore Patterns](../user-guide/ignore-patterns.md)
- Explore [Advanced Features](../advanced/exec-mode.md)
