# Ignore Patterns

Configure which files and directories Pyreload should ignore when watching for changes.

## Default Ignored Paths

Pyreload automatically ignores common paths:
- `.git/`
- `__pycache__/`
- `*.pyc`
- `.venv/`, `venv/`
- `node_modules/`
- `.tox/`
- `*.egg-info/`

## Custom Ignore Patterns

### Command Line

```bash
pyreload -i "tests/*" -i "*.log" -i "build/*" app.py
```

### Config File

```yaml
ignore:
  - "tests/**"
  - "**/*.log"
  - "build/**"
  - "dist/**"
```

## Pattern Syntax

Pyreload uses glob pattern matching:

- `*` - Matches any characters except `/`
- `**` - Matches any characters including `/`
- `?` - Matches a single character
- `[abc]` - Matches any character in brackets

## Examples

### Ignore Test Files

```bash
pyreload -i "tests/**" -i "**/*_test.py" app.py
```

### Ignore Build Artifacts

```yaml
ignore:
  - "**/__pycache__/**"
  - "**/*.pyc"
  - "**/*.pyo"
  - "build/**"
  - "dist/**"
  - "*.egg-info/**"
```

### Ignore Logs and Temp Files

```yaml
ignore:
  - "**/*.log"
  - "**/*.tmp"
  - "**/temp/**"
  - "**/.DS_Store"
```

### Ignore Documentation

```bash
pyreload -i "docs/**" -i "*.md" -i "*.rst" app.py
```

## Precedence Rules

1. Default ignore patterns are always applied
2. Custom ignore patterns are added to defaults
3. More specific patterns override general ones

## Debugging Ignore Patterns

Use verbose mode to see what's being watched:

```bash
pyreload -v -i "tests/**" app.py
```

This shows:
- Which files are being watched
- Which files are being ignored
- Why files are ignored

## Common Use Cases

### Python Package

```yaml
ignore:
  - "tests/**"
  - "**/__pycache__/**"
  - "**/*.pyc"
  - ".pytest_cache/**"
  - "htmlcov/**"
  - ".coverage"
```

### Django Project

```yaml
ignore:
  - "staticfiles/**"
  - "media/**"
  - "**/*.log"
  - "db.sqlite3"
  - "**/__pycache__/**"
```

### Flask Application

```yaml
ignore:
  - "instance/**"
  - "**/__pycache__/**"
  - "**/*.pyc"
  - ".flask_session/**"
```

## Performance Tips

1. **Ignore large directories**: Exclude `node_modules`, `.venv`, etc.
2. **Be specific**: Use precise patterns to avoid unnecessary scanning
3. **Test patterns**: Verify ignored files with verbose mode

## See Also

- [Watch Patterns](watch-patterns.md)
- [Config Files](config-files.md)
- [Troubleshooting](../advanced/troubleshooting.md)
