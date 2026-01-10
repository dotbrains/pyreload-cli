# Publishing Guide

This document describes the publishing process for Pyreload and the GitHub Actions workflows used for automation.

## Prerequisites

### Required Secrets

The following GitHub Actions secrets must be configured in the repository:

- **`PYPI_API_TOKEN`** - API token for publishing to PyPI
- **`TEST_PYPI_API_TOKEN`** - API token for publishing to TestPyPI

### Setting Secrets

#### Via GitHub Web Interface

1. Go to https://github.com/dotbrains/pyreload-cli
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the secret name and value
5. Click **Add secret**

#### Via GitHub CLI

```bash
# Set PyPI token
gh secret set PYPI_API_TOKEN

# Set TestPyPI token
gh secret set TEST_PYPI_API_TOKEN
```

The command will prompt you to paste the token value.

### Obtaining API Tokens

- **PyPI**: https://pypi.org/manage/account/token/
- **TestPyPI**: https://test.pypi.org/manage/account/token/

When creating tokens, set the scope to the `pyreload` project (or "entire account" if the project doesn't exist yet).

## Publishing Workflows

### 1. Tests Workflow

**File**: `.github/workflows/tests.yml`

**Triggers**:
- Push to `master`, `main`, or `develop` branches
- Pull requests to `master`, `main`, or `develop` branches

**What it does**:
- Runs tests across multiple OS (Ubuntu, macOS, Windows)
- Tests Python versions 3.8 through 3.12
- Runs linting with `ruff`
- Checks code formatting with `black`
- Generates coverage reports
- Uploads coverage to Codecov (Ubuntu + Python 3.11 only)

**Manual trigger**: Not available

### 2. Documentation Workflow

**File**: `.github/workflows/docs.yml`

**Triggers**:
- Push to `master` or `main` branches (when `docs/**` or workflow file changes)
- Manual workflow dispatch

**What it does**:
- Builds MkDocs documentation
- Deploys to GitHub Pages

**Manual trigger**:
```bash
gh workflow run docs.yml
```

Or via GitHub web interface: **Actions** → **Deploy Documentation** → **Run workflow**

### 3. Publishing Workflow

**File**: `.github/workflows/publish.yml`

**Triggers**:
- Release published on GitHub
- Manual workflow dispatch

**What it does**:
- Checks out code
- Sets up Python 3.11
- Installs build tools (`build`, `twine`)
- Builds distribution packages (wheel and sdist)
- Validates packages with `twine check`
- Publishes to PyPI (on release) or TestPyPI (manual trigger with option)

**Manual trigger**:

Test on TestPyPI first:
```bash
gh workflow run publish.yml -f test_pypi=true
```

Or via GitHub web interface:
1. Go to **Actions** → **Publish to PyPI**
2. Click **Run workflow**
3. Check "Publish to Test PyPI instead of PyPI"
4. Click **Run workflow**

## Publishing Process

### 1. Prepare Release

```bash
# Ensure you're on master and up to date
git checkout master
git pull

# Update version in pyreload/__init__.py
# Update version in pyproject.toml
# Update CHANGELOG.md

# Commit version bump
git add pyreload/__init__.py pyproject.toml CHANGELOG.md
git commit -m "Bump version to X.Y.Z"
git push
```

### 2. Test on TestPyPI (Optional but Recommended)

```bash
# Trigger TestPyPI publish
gh workflow run publish.yml -f test_pypi=true

# Wait for workflow to complete, then test installation
pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ pyreload
```

### 3. Create GitHub Release

```bash
# Create and push tag
git tag vX.Y.Z
git push origin vX.Y.Z

# Create release via GitHub CLI
gh release create vX.Y.Z \
  --title "vX.Y.Z" \
  --notes "See CHANGELOG.md for details"
```

Or create release via GitHub web interface:
1. Go to https://github.com/dotbrains/pyreload-cli/releases
2. Click **Draft a new release**
3. Choose the tag you created
4. Fill in release title and notes
5. Click **Publish release**

### 4. Verify Publication

The workflow will automatically publish to PyPI when a release is published.

Check publication status:
```bash
# View workflow runs
gh run list --workflow=publish.yml

# View specific run logs
gh run view <run-id>
```

Verify on PyPI:
- https://pypi.org/project/pyreload-cli

Test installation:
```bash
pip install --upgrade pyreload
pyreload --version
```

## Troubleshooting

### Workflow Failures

View recent workflow runs:
```bash
gh run list --limit 5
```

View logs for a failed run:
```bash
gh run view <run-id> --log-failed
```

### Common Issues

**Secret not found**:
- Verify secrets are set: `gh secret list`
- Ensure secret names match exactly: `PYPI_API_TOKEN`, `TEST_PYPI_API_TOKEN`

**Version conflict on PyPI**:
- You cannot republish the same version
- Bump the version and create a new release

**Build failures**:
- Ensure `pyproject.toml` is valid
- Check that all required files are included in source distribution
- Run local build test: `python -m build`

**TestPyPI installation fails**:
- Use both TestPyPI and PyPI indexes (TestPyPI doesn't mirror dependencies)
- Command: `pip install --index-url https://test.pypi.org/simple/ --extra-index-url https://pypi.org/simple/ pyreload`

## Manual Publishing (Fallback)

If GitHub Actions is unavailable, you can publish manually:

```bash
# Install build tools
pip install build twine

# Build distributions
python -m build

# Check built packages
twine check dist/*

# Upload to TestPyPI (optional)
twine upload --repository testpypi dist/*

# Upload to PyPI
twine upload dist/*
```

## Related Documentation

- [CONTRIBUTING.md](CONTRIBUTING.md) - Development setup and contribution guidelines
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [PyPI Publishing Guide](https://packaging.python.org/en/latest/guides/publishing-package-distribution-releases-using-github-actions-ci-cd-workflows/)
