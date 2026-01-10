"""Tests for configuration loading and merging."""

import argparse
import json

from pyreload.main import load_config, merge_config


class TestConfig:
    """Test cases for configuration handling."""

    def test_load_config_no_file(self, monkeypatch, tmp_path):
        """Test loading config when no config file exists"""
        monkeypatch.chdir(tmp_path)
        config, filename = load_config()
        assert config == {}
        assert filename is None

    def test_load_config_pyreloadrc(self, monkeypatch, tmp_path):
        """Test loading config from .pyreloadrc"""
        monkeypatch.chdir(tmp_path)
        config_path = tmp_path / ".pyreloadrc"
        test_config = {
            "watch": ["*.py", "*.yaml"],
            "ignore": ["*.log"],
            "debug": True,
            "polling": True,
        }
        config_path.write_text(json.dumps(test_config))

        config, filename = load_config()
        assert config == test_config
        assert filename == ".pyreloadrc"

    def test_load_config_pyreload_json(self, monkeypatch, tmp_path):
        """Test loading config from pyreload.json"""
        monkeypatch.chdir(tmp_path)
        config_path = tmp_path / "pyreload.json"
        test_config = {
            "watch": ["src/*.py"],
            "clean": True,
        }
        config_path.write_text(json.dumps(test_config))

        config, filename = load_config()
        assert config == test_config
        assert filename == "pyreload.json"

    def test_load_config_precedence(self, monkeypatch, tmp_path):
        """Test that .pyreloadrc takes precedence over pyreload.json"""
        monkeypatch.chdir(tmp_path)

        # Create both config files
        pyreloadrc_path = tmp_path / ".pyreloadrc"
        pyreloadrc_config = {"watch": ["*.py"]}
        pyreloadrc_path.write_text(json.dumps(pyreloadrc_config))

        pyreload_json_path = tmp_path / "pyreload.json"
        pyreload_json_config = {"watch": ["*.js"]}
        pyreload_json_path.write_text(json.dumps(pyreload_json_config))

        config, filename = load_config()
        assert config == pyreloadrc_config
        assert filename == ".pyreloadrc"

    def test_merge_config_cli_precedence(self):
        """Test that CLI args take precedence over config file"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.js"],  # Explicitly set via CLI
            ignore=[],
            debug=True,  # Explicitly set via CLI
            clean=False,
            exec=False,
            polling=False,
        )
        config = {
            "watch": ["*.py"],  # Should be overridden
            "debug": False,  # Should be overridden
            "polling": True,  # Should be used
        }

        merged = merge_config(args, config)
        assert merged.watch == ["*.js"]  # CLI wins
        assert merged.debug is True  # CLI wins
        assert merged.polling is True  # Config file used

    def test_merge_config_defaults(self):
        """Test that config provides defaults when CLI args not set"""
        args = argparse.Namespace(
            command="app.py",
            watch=None,  # Not set
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        config = {
            "watch": ["*.py", "*.yaml"],
            "ignore": ["*.log", "*__pycache__*"],
            "debug": True,
        }

        merged = merge_config(args, config)
        assert merged.watch == ["*.py", "*.yaml"]
        assert merged.ignore == ["*.log", "*__pycache__*"]
        assert merged.debug is True

    def test_merge_config_empty_config(self):
        """Test merging with empty config uses hardcoded defaults"""
        args = argparse.Namespace(
            command="app.py",
            watch=None,
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        config = {}

        merged = merge_config(args, config)
        assert merged.watch == ["*.py"]  # Default
        assert merged.ignore == []
        assert merged.debug is False
        assert merged.polling is False

    def test_load_config_invalid_json(self, monkeypatch, tmp_path):
        """Test loading config with invalid JSON"""
        monkeypatch.chdir(tmp_path)
        config_path = tmp_path / ".pyreloadrc"
        config_path.write_text("{invalid json}")

        config, filename = load_config()
        assert config == {}
        assert filename is None

    def test_load_config_io_error(self, monkeypatch, tmp_path):
        """Test loading config with IO error"""
        from unittest.mock import mock_open, patch

        monkeypatch.chdir(tmp_path)
        config_path = tmp_path / ".pyreloadrc"
        config_path.write_text('{"watch": ["*.py"]}')

        with patch("builtins.open", mock_open()) as mock_file:
            mock_file.side_effect = OSError("Permission denied")
            config, filename = load_config()
            assert config == {}
            assert filename is None
