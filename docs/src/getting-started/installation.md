# Installation

Pyreload requires Python 3.8 or higher.

## Installation Methods

=== "pip"

    ```bash
    pip install pyreload-cli
    ```

=== "pipx (Recommended)"

    Install pyreload globally using [pipx](https://pypa.github.io/pipx/):

    ```bash
    pipx install pyreload
    ```

    This installs pyreload in an isolated environment, making it available system-wide.

=== "Poetry"

    Add to your development dependencies:

    ```bash
    poetry add --group dev pyreload
    ```

=== "From Source"

    Clone and install from GitHub:

    ```bash
    git clone https://github.com/dotbrains/pyreload-cli.git
    cd pyreload
    pip install -e ".[dev]"
    ```

## Verify Installation

Check that pyreload is installed correctly:

```bash
pyreload --version
```

You should see output like:

```
pyreload 1.0.0
```

## Dependencies

Pyreload has only two runtime dependencies:

- **watchdog** (>=2.0.0) - File system event monitoring
- **colorama** (>=0.4.4) - Cross-platform colored terminal output

These are automatically installed when you install pyreload.

## Upgrading

To upgrade to the latest version:

=== "pip"

    ```bash
    pip install --upgrade pyreload
    ```

=== "pipx"

    ```bash
    pipx upgrade pyreload
    ```

=== "Poetry"

    ```bash
    poetry update pyreload
    ```

## Platform Support

Pyreload works on all major platforms:

- ✅ **Linux** (all distributions)
- ✅ **macOS** (Intel and Apple Silicon)
- ✅ **Windows** (PowerShell, CMD, Git Bash)

## Next Steps

Now that pyreload is installed, head to the [Quick Start](quick-start.md) guide to start using it!
