# Pyreload Documentation

Documentation for Pyreload built with [MkDocs](https://www.mkdocs.org/) and [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/).

## Development

### Quick Start

The easiest way to serve the docs locally:

```bash
./serve.sh
```

This script will:
1. Create a virtual environment at `docs/.venv` (if it doesn't exist)
2. Install mkdocs-material
3. Find an available port (starting at 8000)
4. Start the MkDocs development server

### Manual Setup

If you prefer to set up manually:

```bash
# Create and activate virtual environment
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Serve documentation
mkdocs serve -f mkdocs.yml
```

Visit http://localhost:8000 to view the documentation.

## Project Structure

```
docs/
├── mkdocs.yml           # MkDocs configuration
├── requirements.txt     # Python dependencies
├── serve.sh            # Development server script
├── src/                # Documentation source files
│   ├── index.md        # Homepage
│   ├── getting-started/
│   ├── user-guide/
│   ├── advanced/
│   ├── use-cases/
│   └── api/
└── .venv/              # Virtual environment (gitignored)
```

## Adding Documentation

1. Create or edit markdown files in `src/`
2. Update `mkdocs.yml` navigation if adding new pages
3. Test locally with `./serve.sh`
4. Commit and push changes

## Building for Production

```bash
source .venv/bin/activate
mkdocs build -f mkdocs.yml
```

The static site will be generated in `../site/` directory.

## Deployment

Documentation is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the `main` branch.

See `.github/workflows/docs.yml` for the deployment configuration.

## Writing Guidelines

- Use clear, concise language
- Include code examples where applicable
- Use admonitions for notes, tips, and warnings
- Test all code examples
- Keep line length reasonable for readability

### Admonitions

```markdown
!!! note
    This is a note

!!! tip
    This is a tip

!!! warning
    This is a warning
```

### Code Blocks

Use syntax highlighting:

````markdown
```python
import pyreload
```
````

### Tabbed Content

```markdown
=== "Tab 1"
    Content for tab 1

=== "Tab 2"
    Content for tab 2
```

## Theme

We use Material for MkDocs with:
- Dark/light mode toggle
- Cyan primary color
- Blue accent color
- Code copy buttons
- Search functionality
