# Contributing to Pyreload

Thank you for your interest in contributing to Pyreload! This guide will help you get started.

## Development Setup

### Prerequisites

- Python 3.8 or higher
- pip or pipx
- Git

### Clone and Install

```bash
git clone https://github.com/dotbrains/pyreload.git
cd pyreload

# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install in editable mode with dev dependencies
pip install -e ".[dev]"
```

This creates a virtual environment and installs Pyreload in editable mode with all development dependencies.

## Running Tests

```bash
# Run all tests
pytest

# Run with coverage
pytest --cov=pyreload --cov-report=term-missing

# Run specific test file
pytest tests/test_monitor.py

# Run specific test
pytest tests/test_monitor.py::TestMonitor::test_polling_mode
```

## Code Style

We use:

- **Black** for code formatting
- **Ruff** for linting

Format your code:

```bash
# Format code
black pyreload tests

# Check formatting
black --check pyreload tests

# Lint code
ruff check pyreload tests

# Fix linting issues
ruff check --fix pyreload tests
```

## Documentation

### Local Development

```bash
cd docs
./serve.sh
```

This starts a local MkDocs server with auto-reload.

### Adding Documentation

1. Add markdown files to `docs/src/`
2. Update `docs/mkdocs.yml` navigation
3. Test locally with `./serve.sh`
4. Submit PR

## Website Development

```bash
cd website
pnpm install
pnpm run dev
```

Visit http://localhost:3004

## Making Changes

### Branch Naming

- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation changes
- `refactor/description` - Code refactoring

### Commit Messages

Use clear, descriptive commit messages:

```
Add polling support for Docker volumes

- Implement PollingObserver selection
- Add --polling CLI flag
- Update documentation
```

## Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch
3. **Make** your changes
4. **Test** your changes (run pytest)
5. **Format** your code (black + ruff)
6. **Update** documentation if needed
7. **Push** to your fork
8. **Open** a pull request

### PR Guidelines

- Describe what your PR does
- Reference any related issues
- Include tests for new features
- Update documentation if needed
- Ensure all CI checks pass

## Adding New Features

### Checklist

- [ ] Write tests
- [ ] Add documentation
- [ ] Update CHANGELOG.md
- [ ] Run test suite
- [ ] Check code formatting
- [ ] Update README if needed

### Example: Adding a New CLI Flag

1. Add argument to `pyreload/main.py::create_parser()`
2. Update `Monitor.__init__()` to accept the new parameter
3. Implement the feature
4. Write tests in `tests/`
5. Document in `docs/src/api/cli-reference.md`
6. Update README.md examples if relevant

## Reporting Bugs

Use GitHub Issues: https://github.com/dotbrains/pyreload/issues

Include:

- Pyreload version (`pyreload --version`)
- Python version
- Operating system
- Steps to reproduce
- Expected vs actual behavior
- Error messages or logs

## Suggesting Features

Open a GitHub issue with:

- Clear description of the feature
- Use case / motivation
- Example usage
- Potential implementation approach (optional)

## Code of Conduct

Be respectful, inclusive, and constructive. We're all here to make Pyreload better!

## Questions?

- Open a [GitHub Discussion](https://github.com/dotbrains/pyreload/discussions)
- File an [Issue](https://github.com/dotbrains/pyreload/issues)
- Check the [Documentation](https://dotbrains.github.io/pyreload)

## License

By contributing, you agree that your contributions will be licensed under the MIT License.
