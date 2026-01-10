#!/usr/bin/env bash
# Development environment setup script for Pyreload

set -e

echo "Setting up Pyreload development environment..."

# Check Python version
if ! command -v python3 &> /dev/null; then
    echo "Error: python3 is not installed"
    exit 1
fi

PYTHON_VERSION=$(python3 --version | cut -d' ' -f2 | cut -d'.' -f1,2)
echo "Found Python $PYTHON_VERSION"

# Create virtual environment
if [ -d ".venv" ]; then
    echo "Virtual environment already exists at .venv"
    read -p "Remove and recreate? (y/N): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        rm -rf .venv
        echo "Removed existing .venv"
    else
        echo "Using existing .venv"
    fi
fi

if [ ! -d ".venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv .venv
    echo "✓ Virtual environment created"
fi

# Activate virtual environment
echo "Activating virtual environment..."
source .venv/bin/activate

# Upgrade pip
echo "Upgrading pip..."
pip install --upgrade pip > /dev/null

# Install package in editable mode with dev dependencies
echo "Installing pyreload in editable mode with dev dependencies..."
pip install -e ".[dev]"

echo ""
echo "✓ Setup complete!"
echo ""
echo "To activate the virtual environment, run:"
echo "  source .venv/bin/activate"
echo ""
echo "To run tests:"
echo "  pytest"
echo ""
echo "To format code:"
echo "  black pyreload tests"
echo "  ruff check --fix pyreload tests"
