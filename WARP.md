# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Pyreload is a Python package for automatically restarting Python applications when file changes are detected. It provides polling-based file watching to solve mounted filesystem limitations (Docker, Vagrant, CIFS/NFS).

**Key Features:**
- Zero-config reloading for Python files
- Polling mode for Docker/Vagrant/mounted filesystems
- Flexible glob patterns for watching and ignoring files
- Config file support (`.pyreloadrc` or `pyreload.json`)
- Clean mode for production-like testing
- Exec mode to run shell commands

## Development Commands

### Setup
```bash
# Quick setup with automated script
./setup-dev.sh

# Manual setup
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -e ".[dev]"
```

### Testing
```bash
# Run all tests with coverage
pytest

# Run specific test file
pytest tests/test_monitor.py

# Run specific test
pytest tests/test_monitor.py::TestMonitor::test_polling_mode

# Run without coverage
pytest --no-cov
```

### Code Quality
```bash
# Format code (always run before committing)
black pyreload tests

# Check formatting without changes
black --check pyreload tests

# Lint and fix issues
ruff check --fix pyreload tests

# Lint only (no fixes)
ruff check pyreload tests
```

### Documentation
```bash
# Serve docs locally with auto-reload
cd docs && ./serve.sh

# Manual docs serving
cd docs
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
mkdocs serve -a 127.0.0.1:8000
```

### Testing the Tool
```bash
# Test basic functionality
pyreload tests/fixtures/example_app.py

# Test with polling (for Docker/Vagrant testing)
pyreload tests/fixtures/example_app.py --polling

# Test with debug mode
pyreload tests/fixtures/example_app.py --debug

# Test exec mode
pyreload -x "echo 'Hello, World!'"
```

## Architecture

### Core Components

**`pyreload/main.py`** - CLI entry point
- `create_parser()`: Defines CLI arguments and help text
- `load_config()`: Loads `.pyreloadrc` or `pyreload.json` configuration files
- `merge_config()`: Merges CLI arguments with config file (CLI takes precedence)
- `main()`: Main loop handling user input (`rs` to restart, `stop` to exit)

**`pyreload/monitor.py`** - File monitoring and process management
- `Monitor` class: Core monitoring logic
  - `_parse_watch_path()`: Converts watch patterns (e.g., `src/*.py`) into (directory, pattern) tuples
  - `_handle_event()`: Processes file system events and triggers restarts
  - `start()`: Initializes `Observer` or `PollingObserver` based on `--polling` flag
  - `start_process()`: Spawns subprocess for Python file or shell command
  - `stop_process()`: Gracefully terminates subprocess (5s timeout, then SIGKILL)
  - `restart_process()`: Stops and restarts the monitored process

**`pyreload/logger.py`** - Colored console output
- `Color` class: Defines color constants using `colorama`
- `log()`: Outputs colored `[pyreload]` prefixed messages

### File Watching Architecture

The project uses `watchdog` library for file system monitoring:

1. **Event-based mode (default)**: Uses `watchdog.observers.Observer` which relies on OS-level file events (`inotify` on Linux, `FSEvents` on macOS, `ReadDirectoryChangesW` on Windows)

2. **Polling mode (`--polling` flag)**: Uses `watchdog.observers.polling.PollingObserver` which periodically checks file modification times instead of relying on OS events
   - **Critical for mounted filesystems**: Docker volumes, Vagrant synced folders, CIFS/NFS mounts don't propagate OS-level file events
   - Trade-off: Higher CPU usage but works universally

3. **Pattern matching**: Uses `PatternMatchingEventHandler` with glob patterns for both watch and ignore lists

### Configuration Precedence

1. Command-line arguments (highest priority)
2. Config file (`.pyreloadrc` or `pyreload.json`)
3. Built-in defaults (lowest priority)

Default watch pattern: `*.py`

### Process Management

- Uses `subprocess.Popen` to spawn child processes
- Graceful shutdown: `terminate()` → 5s wait → `kill()` if still running
- Two execution modes:
  - **Python mode**: Runs Python files using `sys.executable`
  - **Exec mode (`-x`)**: Runs arbitrary shell commands with `shell=True`

## Testing

Tests use `pytest` with coverage reporting configured in `pyproject.toml`:
- Coverage target: `pyreload` package
- Test discovery: `tests/` directory, `test_*.py` files
- Coverage report: Terminal output with missing lines

Key test files:
- `tests/test_monitor.py`: Tests `Monitor` class functionality
- `tests/test_config.py`: Tests config file loading and merging

## Code Style

Configured in `pyproject.toml`:
- **Black**: Line length 100, targets Python 3.8-3.12
- **Ruff**: Line length 100, Python 3.8 baseline, selects rules: E, F, W, I, N, UP, B, A, C4, SIM

## Configuration Files

Users can create `.pyreloadrc` or `pyreload.json` in project root:
```json
{
  "watch": ["*.py", "config/*.yaml"],
  "ignore": ["*__pycache__*", "*.log", ".git/*"],
  "debug": false,
  "clean": false,
  "exec": false,
  "polling": false
}
```

See `.pyreloadrc.example` for reference.

## Common Workflows

### Adding a New CLI Flag

1. Add argument in `pyreload/main.py::create_parser()`
2. Update `merge_config()` to handle config file setting
3. Modify `Monitor.__init__()` to accept the parameter
4. Implement feature in `Monitor` class
5. Add tests in `tests/test_monitor.py`
6. Update README.md and docs

### Debugging File Watching Issues

1. Use `--debug` flag to see detected file changes
2. For mounted filesystems, always use `--polling`
3. Check ignore patterns aren't too broad
4. Verify watch patterns match intended files

### Release Process

1. Update version in `pyreload/__init__.py` and `pyproject.toml`
2. Update `CHANGELOG.md`
3. Run full test suite: `pytest`
4. Format and lint: `black . && ruff check --fix .`
5. Build: `python -m build`
6. Publish: `twine upload dist/*`
