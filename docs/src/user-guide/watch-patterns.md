# Watch Patterns

Configure which files and directories Pyreload should monitor for changes.

## Default Behavior

By default, Pyreload watches:

- The current directory (recursively)
- Only `.py` files

## Specifying Watch Paths

### Command Line

```bash
pyreload -w src -w config -w data app.py
```

### Config File

```yaml
watch:
  - src
  - config
  - data
```

## File Extensions

### Watch Multiple Extensions

```bash
pyreload -e py -e yaml -e json -e txt app.py
```

### Config File

```yaml
extensions:
  - py
  - yaml
  - json
  - txt
```

## Pattern Matching

Pyreload supports glob patterns:

```bash
pyreload -w "src/**/*.py" -w "config/*.yaml" app.py
```

## Watch All Files

To watch all files regardless of extension:

```bash
pyreload -w . --no-extension-filter app.py
```

## Combining with Ignore Patterns

Watch everything but exclude specific paths:

```bash
pyreload -w . -i "tests/*" -i "*.log" app.py
```

## Best Practices

1. **Be specific**: Watch only the directories you need
2. **Use ignore patterns**: Exclude build artifacts and caches
3. **Consider performance**: Watching too many files can slow down detection
4. **Test patterns**: Use `-v` for verbose output to see what's being watched

## Examples

### Python Package Development

```yaml
watch:
  - src/mypackage
  - tests
extensions:
  - py
ignore:
  - "**/__pycache__/**"
  - "**/*.pyc"
```

### Full-Stack Application

```yaml
watch:
  - backend
  - config
  - templates
extensions:
  - py
  - yaml
  - html
  - css
```

### Data Science Project

```yaml
watch:
  - notebooks
  - scripts
  - data
extensions:
  - py
  - ipynb
  - csv
  - json
```

## See Also

- [Ignore Patterns](ignore-patterns.md)
- [Config Files](config-files.md)
- [Polling Mode](polling-mode.md)
