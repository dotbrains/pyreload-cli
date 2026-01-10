"""Tests for the Monitor class."""

import argparse
from unittest.mock import Mock, patch

from watchdog.observers import Observer
from watchdog.observers.polling import PollingObserver

from pyreload.monitor import Monitor


class TestMonitor:
    """Test cases for Monitor class."""

    def test_parse_watch_path_simple_pattern(self):
        """Test parsing simple pattern like *.py"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        directory, pattern = monitor._parse_watch_path("*.py")
        assert directory == "."
        assert pattern == "*.py"

    def test_parse_watch_path_with_directory(self):
        """Test parsing pattern with directory like src/*.py"""
        args = argparse.Namespace(
            command="app.py",
            watch=["src/*.py"],
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        directory, pattern = monitor._parse_watch_path("src/*.py")
        assert directory == "src"
        assert pattern == "*.py"

    def test_parse_watch_path_nested_directory(self):
        """Test parsing pattern with nested directory"""
        args = argparse.Namespace(
            command="app.py",
            watch=["src/lib/*.py"],
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        directory, pattern = monitor._parse_watch_path("src/lib/*.py")
        assert directory == "src/lib"
        assert pattern == "*.py"

    def test_parse_watch_path_recursive_pattern(self):
        """Test parsing recursive pattern like src/**/*.py"""
        args = argparse.Namespace(
            command="app.py",
            watch=["src/**/*.py"],
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        directory, pattern = monitor._parse_watch_path("src/**/*.py")
        assert directory == "src"
        assert pattern == "**/*.py"

    def test_parse_watch_path_directory_only(self):
        """Test parsing directory without pattern"""
        args = argparse.Namespace(
            command="app.py",
            watch=["src"],
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        directory, pattern = monitor._parse_watch_path("src")
        assert directory == "src"
        assert pattern == "*"

    def test_matches_pattern_basic(self):
        """Test basic pattern matching"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        assert monitor._matches_pattern("test.py", "*.py") is True
        assert monitor._matches_pattern("test.js", "*.py") is False

    def test_matches_pattern_with_ignore(self):
        """Test pattern matching with ignore patterns"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=["*__pycache__*", "*.log"],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        assert monitor._matches_pattern("src/__pycache__/test.pyc", "*.pyc") is False
        assert monitor._matches_pattern("debug.log", "*.log") is False
        assert monitor._matches_pattern("app.py", "*.py") is True

    def test_initialization_default_observer(self):
        """Test that Monitor uses Observer by default"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        with patch.object(Observer, "start"), patch.object(Observer, "schedule"):
            monitor.start()
            assert len(monitor.observers) > 0
            # Verify Observer was used (not PollingObserver)
            assert all(isinstance(obs, Observer) for obs in monitor.observers)

    def test_initialization_polling_observer(self):
        """Test that Monitor uses PollingObserver when polling=True"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=True,
        )
        monitor = Monitor(args)

        with patch.object(PollingObserver, "start"), patch.object(PollingObserver, "schedule"):
            monitor.start()
            assert len(monitor.observers) > 0
            # Verify PollingObserver was used
            assert all(isinstance(obs, PollingObserver) for obs in monitor.observers)

    def test_watch_items_creation(self):
        """Test that watch items are properly created"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py", "config/*.json"],
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        assert len(monitor.watch_items) == 2
        assert (".", "*.py") in monitor.watch_items
        assert ("config", "*.json") in monitor.watch_items

    @patch("pyreload.monitor.subprocess.Popen")
    def test_start_process_python_file(self, mock_popen):
        """Test starting a Python file"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        monitor.start_process()
        mock_popen.assert_called_once()

    @patch("pyreload.monitor.subprocess.Popen")
    def test_start_process_exec_mode(self, mock_popen):
        """Test starting a shell command in exec mode"""
        args = argparse.Namespace(
            command="npm run dev",
            watch=["*.js"],
            ignore=[],
            debug=False,
            clean=True,
            exec=True,
            polling=False,
        )
        monitor = Monitor(args)
        monitor.start_process()
        mock_popen.assert_called_once_with("npm run dev", shell=True)

    @patch("pyreload.monitor.subprocess.Popen")
    def test_restart_process(self, mock_popen):
        """Test process restart"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Start initial process
        mock_process = Mock()
        mock_popen.return_value = mock_process
        monitor.start_process()

        # Restart
        monitor.restart_process()

        # Verify old process was terminated
        mock_process.terminate.assert_called_once()
        # Verify new process was started (Popen called twice)
        assert mock_popen.call_count == 2

    @patch("pyreload.monitor.subprocess.Popen")
    def test_stop_process(self, mock_popen):
        """Test stopping a process"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        mock_process = Mock()
        mock_popen.return_value = mock_process
        monitor.start_process()

        # Stop process
        monitor.stop_process()

        # Verify terminate was called
        mock_process.terminate.assert_called_once()
        mock_process.wait.assert_called_once()

    @patch("pyreload.monitor.subprocess.Popen")
    def test_stop_process_timeout(self, mock_popen):
        """Test stopping a process that times out"""
        import subprocess

        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        mock_process = Mock()
        mock_process.wait.side_effect = [subprocess.TimeoutExpired("cmd", 5), None]
        mock_popen.return_value = mock_process
        monitor.start_process()

        # Stop process
        monitor.stop_process()

        # Verify terminate, then kill was called
        mock_process.terminate.assert_called_once()
        mock_process.kill.assert_called_once()
        assert mock_process.wait.call_count == 2

    def test_handle_event_directory_ignored(self):
        """Test that directory events are ignored"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Create mock directory event
        event = Mock()
        event.is_directory = True
        event.src_path = "some_directory"

        # Should not restart
        with patch.object(monitor, "restart_process") as mock_restart:
            monitor._handle_event(event)
            mock_restart.assert_not_called()

    def test_handle_event_ignored_pattern(self):
        """Test that events matching ignore patterns are ignored"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=["*__pycache__*", "*.log"],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Create mock file event with ignored path
        event = Mock()
        event.is_directory = False
        event.src_path = "src/__pycache__/test.pyc"

        # Should not restart
        with patch.object(monitor, "restart_process") as mock_restart:
            monitor._handle_event(event)
            mock_restart.assert_not_called()

    def test_handle_event_triggers_restart(self):
        """Test that valid file events trigger restart"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Create mock file event
        event = Mock()
        event.is_directory = False
        event.src_path = "src/test.py"

        # Should restart
        with patch.object(monitor, "restart_process") as mock_restart:
            monitor._handle_event(event)
            mock_restart.assert_called_once()

    def test_handle_event_with_debug(self):
        """Test that debug mode logs file changes"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=True,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Create mock file event
        event = Mock()
        event.is_directory = False
        event.src_path = "src/test.py"

        # Should log and restart
        with patch("pyreload.monitor.log") as mock_log, patch.object(
            monitor, "restart_process"
        ) as mock_restart:
            monitor._handle_event(event)
            mock_log.assert_called()
            mock_restart.assert_called_once()

    def test_stop_monitor(self):
        """Test stopping the monitor"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Mock observers
        mock_observer1 = Mock()
        mock_observer2 = Mock()
        monitor.observers = [mock_observer1, mock_observer2]

        # Mock process
        mock_process = Mock()
        monitor.process = mock_process

        # Stop
        monitor.stop()

        # Verify observers were stopped
        mock_observer1.stop.assert_called_once()
        mock_observer2.stop.assert_called_once()
        mock_observer1.join.assert_called_once()
        mock_observer2.join.assert_called_once()

        # Verify process was terminated
        mock_process.terminate.assert_called_once()
        # Process should be None after stop
        assert monitor.process is None

    def test_parse_watch_path_with_windows_separators(self):
        """Test parsing pattern with Windows path separators"""
        args = argparse.Namespace(
            command="app.py",
            watch=[r"src\*.py"],
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        directory, pattern = monitor._parse_watch_path(r"src\*.py")
        assert directory == "src"
        assert pattern == "*.py"

    def test_parse_watch_path_starting_with_wildcard(self):
        """Test parsing pattern that starts with wildcard like */*.py"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*/*.py"],
            ignore=[],
            debug=False,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        directory, pattern = monitor._parse_watch_path("*/*.py")
        assert directory == "."
        assert pattern == "*/*.py"

    @patch("pyreload.monitor.subprocess.Popen")
    def test_start_process_without_py_extension(self, mock_popen):
        """Test starting a Python file without .py extension"""
        args = argparse.Namespace(
            command="app",  # No .py extension
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=True,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)
        monitor.start_process()
        # Should add .py extension
        mock_popen.assert_called_once()
        call_args = mock_popen.call_args[0][0]
        assert call_args[-1] == "app.py"

    def test_handle_event_not_clean_mode(self):
        """Test that non-clean mode logs restart message"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=False,  # Not clean mode
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Create mock file event
        event = Mock()
        event.is_directory = False
        event.src_path = "src/test.py"

        # Should log restart message
        with patch("pyreload.monitor.log") as mock_log, patch.object(
            monitor, "restart_process"
        ) as mock_restart:
            monitor._handle_event(event)
            mock_log.assert_called()
            mock_restart.assert_called_once()

    def test_stop_monitor_with_logging(self):
        """Test stopping the monitor with logging enabled"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=False,  # Logging enabled
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Mock observers
        mock_observer = Mock()
        monitor.observers = [mock_observer]

        # Mock process
        mock_process = Mock()
        monitor.process = mock_process

        # Stop with logging
        with patch("pyreload.monitor.log") as mock_log:
            monitor.stop()
            mock_log.assert_called()

    def test_matches_pattern_with_debug_ignore(self):
        """Test pattern matching with debug mode for ignored files"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=["*__pycache__*"],
            debug=True,  # Debug mode
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Should log when ignoring
        with patch("pyreload.monitor.log") as mock_log:
            result = monitor._matches_pattern("src/__pycache__/test.pyc", "*.pyc")
            assert result is False
            mock_log.assert_called()

    def test_handle_event_debug_ignored_pattern(self):
        """Test that debug mode logs ignored patterns in event handler"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=["*.log"],
            debug=True,
            clean=False,
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        # Create mock file event with ignored path
        event = Mock()
        event.is_directory = False
        event.src_path = "debug.log"

        # Should log the ignore
        with patch("pyreload.monitor.log") as mock_log, patch.object(
            monitor, "restart_process"
        ) as mock_restart:
            monitor._handle_event(event)
            mock_log.assert_called()
            mock_restart.assert_not_called()

    @patch("pyreload.monitor.subprocess.Popen")
    def test_start_with_logging_and_ignore_patterns(self, mock_popen):
        """Test start method with logging and ignore patterns"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py", "config/*.yaml"],
            ignore=["*.log", "*__pycache__*"],
            debug=False,
            clean=False,  # Logging enabled
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        with patch("pyreload.monitor.log") as mock_log, patch.object(
            Observer, "start"
        ), patch.object(Observer, "schedule"):
            monitor.start()
            # Should log startup messages
            assert mock_log.call_count >= 3  # Multiple log calls

    @patch("pyreload.monitor.subprocess.Popen")
    def test_start_polling_with_logging(self, mock_popen):
        """Test start method in polling mode with logging"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=False,  # Logging enabled
            exec=False,
            polling=True,  # Polling mode
        )
        monitor = Monitor(args)

        with patch("pyreload.monitor.log") as mock_log, patch.object(
            PollingObserver, "start"
        ), patch.object(PollingObserver, "schedule"):
            monitor.start()
            # Should log startup messages including polling mode
            assert mock_log.call_count >= 2

    @patch("pyreload.monitor.subprocess.Popen")
    def test_start_process_exec_mode_with_logging(self, mock_popen):
        """Test starting a shell command in exec mode with logging"""
        args = argparse.Namespace(
            command="npm run dev",
            watch=["*.js"],
            ignore=[],
            debug=False,
            clean=False,  # Logging enabled
            exec=True,
            polling=False,
        )
        monitor = Monitor(args)

        with patch("pyreload.monitor.log") as mock_log:
            monitor.start_process()
            mock_log.assert_called()
            mock_popen.assert_called_once_with("npm run dev", shell=True)

    @patch("pyreload.monitor.subprocess.Popen")
    def test_start_process_python_with_logging(self, mock_popen):
        """Test starting a Python file with logging"""
        args = argparse.Namespace(
            command="app.py",
            watch=["*.py"],
            ignore=[],
            debug=False,
            clean=False,  # Logging enabled
            exec=False,
            polling=False,
        )
        monitor = Monitor(args)

        with patch("pyreload.monitor.log") as mock_log:
            monitor.start_process()
            mock_log.assert_called()
            mock_popen.assert_called_once()
