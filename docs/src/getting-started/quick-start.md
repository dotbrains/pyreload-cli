# Quick Start

Get started with Pyreload in minutes.

## Basic Command

The simplest way to use Pyreload:

```bash
pyreload myapp.py
```

This will:
- Watch the current directory for changes
- Restart `myapp.py` whenever a `.py` file changes
- Show restart notifications

## Common Options

### Watch Specific Files

```bash
pyreload -w "*.py" -w "config/*.yaml" myapp.py
```

### Ignore Patterns

```bash
pyreload -i "tests/*" -i "__pycache__/*" myapp.py
```

### Pass Arguments to Your Script

```bash
pyreload myapp.py -- --port 8000 --debug
```

## Next Steps

- Learn about [Watch Patterns](../user-guide/watch-patterns.md)
- Explore [Config Files](../user-guide/config-files.md)
- Check out [Use Cases](../use-cases/docker.md)
