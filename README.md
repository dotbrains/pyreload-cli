# Pyreload CLI 🔄

![Pyreload](https://raw.githubusercontent.com/dotbrains/pyreload/master/assets/og-image.svg)

[![PyPI version](https://img.shields.io/pypi/v/pyreload-cli.svg?color=3776AB&logo=python)](https://pypi.org/project/pyreload-cli/)
[![Python versions](https://img.shields.io/pypi/pyversions/pyreload-cli.svg?color=3776AB&logo=python)](https://pypi.org/project/pyreload-cli/)
[![License](https://img.shields.io/github/license/dotbrains/pyreload-cli.svg)](https://github.com/dotbrains/pyreload-cli/blob/master/LICENSE)
[![Coverage](https://img.shields.io/badge/coverage-99%25-brightgreen.svg)](https://github.com/dotbrains/pyreload-cli-cli)

![Python](https://img.shields.io/badge/-Python-3776AB?style=flat-square&logo=python&logoColor=white)
![Watchdog](https://img.shields.io/badge/-Watchdog-FF6B6B?style=flat-square&logo=python&logoColor=white)
![Docker](https://img.shields.io/badge/-Docker-2496ED?style=flat-square&logo=docker&logoColor=white)
![Vagrant](https://img.shields.io/badge/-Vagrant-1563FF?style=flat-square&logo=vagrant&logoColor=white)
![Pytest](https://img.shields.io/badge/-Pytest-0A9EDC?style=flat-square&logo=pytest&logoColor=white)
![Black](https://img.shields.io/badge/-Black-000000?style=flat-square&logo=python&logoColor=white)

A modern, easy-to-use package to automatically restart Python applications when file changes are detected. Perfect for development workflows with **full support for Docker, Vagrant, and mounted filesystems** via polling mode.

## ✨ Features

- 🚀 **Zero-config reloading** - Works with Python files by default
- 📂 **Polling mode** - Solves mounted filesystem limitations (Docker, Vagrant, CIFS/NFS)
- 🎯 **Flexible patterns** - Watch and ignore patterns with glob support
- ⚙️ **Config file support** - `.pyreloadrc` or `pyreload.json` for team settings
- 🧹 **Clean mode** - No logs, no prompts for production-like testing
- 🔧 **Exec mode** - Run any shell command, not just Python files
- ⌨️ **Manual control** - Type `rs` to restart, `stop` to exit

## 🚀 Quickstart (30 seconds)

```bash
pip install pyreload-cli
pyreload app.py
```

That's it! Your app will restart automatically when Python files change.

### Using with Docker/Vagrant

If you're developing inside Docker, Vagrant, or using mounted filesystems:

```bash
pyreload app.py --polling
```

The `--polling` flag enables filesystem polling, which works reliably with mounted volumes where OS-level file events don't propagate.

## 📖 Usage

### Basic Examples

```bash
# Watch Python files (default)
pyreload app.py

# Watch multiple patterns
pyreload app.py -w "*.py" -w "*.yaml" -w "config/*.json"

# Ignore patterns
pyreload app.py -i "*__pycache__*" -i "*.log" -i ".git/*"

# Use polling for Docker/Vagrant
pyreload app.py --polling

# Execute shell command instead
pyreload -x "npm run dev"

# Debug mode - see file changes
pyreload app.py --debug

# Clean mode - no logs
pyreload app.py --clean
```

### Interactive Commands

When pyreload is running, you can use these commands:

- Type `rs` and press Enter to manually restart
- Type `stop` and press Enter to exit
- Press `Ctrl+C` to exit immediately

### Configuration File

Create a `.pyreloadrc` or `pyreload.json` in your project root:

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

Command-line arguments always override config file settings.

## 🐳 Docker & Vagrant Workflows

### Why Polling Mode?

Standard file watching uses OS-level events (like `inotify` on Linux). These events **don't propagate through mounted volumes**. When you edit a file on your host machine and it syncs to a Docker container or Vagrant VM, the kernel inside the container/VM never receives the file change event.

**Polling mode** solves this by directly checking file modification times at regular intervals instead of relying on OS events.

### Docker Example

```dockerfile
# Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["pyreload", "app.py", "--polling"]
```

```yaml
# docker-compose.yml
services:
  app:
    build: .
    volumes:
      - .:/app
    command: pyreload app.py --polling
```

### Vagrant Example

```ruby
# Vagrantfile
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/jammy64"
  config.vm.synced_folder ".", "/vagrant"

  config.vm.provision "shell", inline: <<-SHELL
    pip install pyreload
    cd /vagrant
    pyreload app.py --polling
  SHELL
end
```

## 📋 Command-Line Options

| Option | Short | Description | Default |
|--------|-------|-------------|---------|
| `--version` | `-V` | Show version and exit | - |
| `--watch <pattern>` | `-w` | Path/pattern to watch (can be used multiple times) | `*.py` |
| `--ignore <pattern>` | `-i` | Pattern to ignore (can be used multiple times) | - |
| `--polling` | `-p` | Use polling-based file watching | `false` |
| `--debug` | `-d` | Log detected file changes | `false` |
| `--clean` | `-c` | No logs, no commands (quiet mode) | `false` |
| `--exec` | `-x` | Execute shell command instead of Python file | `false` |

## 🔍 Pattern Matching

Pyreload uses glob patterns for matching files:

- `*.py` - All Python files in current directory
- `src/*.py` - Python files in src directory
- `src/**/*.py` - Python files in src and subdirectories
- `config/*.{yaml,yml,json}` - Config files (use multiple `-w` flags)
- `*__pycache__*` - Ignore Python cache (use with `-i`)

## 🆚 Comparison with Similar Tools

| Feature | Pyreload | py-mon | nodemon |
|---------|-------|--------|---------|
| Python-native | ✅ | ✅ | ❌ |
| Polling mode | ✅ | ❌ | ✅ |
| Config file | ✅ | ✅ | ✅ |
| Docker/Vagrant support | ✅ | ⚠️ Limited | ✅ |
| Zero dependencies* | ✅ | ✅ | ✅ |
| Exec mode | ✅ | ✅ | ✅ |

*Excluding `watchdog` and `colorama`

## 🤝 Contributing

Contributions are welcome! This project is open source.

### Development Setup

```bash
git clone https://github.com/dotbrains/pyreload-cli-cli.git
cd pyreload-cli

# Quick setup (installs pre-commit hooks)
./setup-dev.sh

# Or manual setup
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -e ".[dev]"
pre-commit install
```

### Run Tests

```bash
pytest
```

### Format Code

Pre-commit hooks will automatically format on commit. To run manually:

```bash
pre-commit run --all-files
# Or manually:
black .
ruff check --fix .
```

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

## 🔗 Links

- **Documentation**: https://dotbrains.github.io/pyreload-cli
- **PyPI**: https://pypi.org/project/pyreload-cli
- **GitHub**: https://github.com/dotbrains/pyreload-cli
- **Issues**: https://github.com/dotbrains/pyreload-cli/issues

## 💡 Inspiration

Inspired by [py-mon](https://github.com/kevinjosethomas/py-mon) and [nodemon](https://nodemon.io/), built to solve the mounted filesystem limitation with polling support.

---

**Made with ❤️ by dotbrains**
