"""File monitoring and process management with polling support for mounted filesystems."""

import fnmatch
import os
import subprocess
import sys

from watchdog.events import PatternMatchingEventHandler
from watchdog.observers import Observer
from watchdog.observers.polling import PollingObserver

from .logger import Color, log


class Monitor:
    """Monitors files for changes and restarts processes."""

    def __init__(self, arguments):
        """Initialize the monitor with command line arguments.

        Args:
            arguments: Parsed command line arguments containing:
                - command: Command or file to run
                - watch: List of watch patterns
                - ignore: List of ignore patterns
                - debug: Enable debug logging
                - clean: Enable clean mode (no logs)
                - exec: Execute as shell command
                - polling: Use polling-based file watching
        """
        self.command = arguments.command
        self.watch_patterns = arguments.watch if arguments.watch else ["*.py"]
        self.ignore_patterns = arguments.ignore if arguments.ignore else []
        self.debug = arguments.debug
        self.clean = arguments.clean
        self.exec_mode = arguments.exec
        self.polling = arguments.polling
        self.process = None
        self.observers = []

        # Parse watch patterns into (directory, pattern) tuples
        self.watch_items = [self._parse_watch_path(pattern) for pattern in self.watch_patterns]

        # Set up event handler
        patterns = [pattern for _, pattern in self.watch_items]
        self.event_handler = PatternMatchingEventHandler(
            patterns=patterns,
            ignore_patterns=self.ignore_patterns,
            ignore_directories=False,
            case_sensitive=True,
        )
        self.event_handler.on_any_event = self._handle_event

    def _parse_watch_path(self, path_pattern):
        """Parse a watch path pattern into directory and file pattern.

        Args:
            path_pattern: Path pattern like 'src/*.py' or '*.py'

        Returns:
            Tuple of (directory, pattern)
        """
        # Check if pattern contains wildcards
        if any(char in path_pattern for char in ["*", "?", "["]):
            # Has wildcards - split into directory and pattern
            if "/" in path_pattern or "\\" in path_pattern:
                # Has directory component
                # Split on first non-wildcard directory separator
                parts = path_pattern.replace("\\", "/").split("/")

                # Find first part with wildcard
                first_wildcard_idx = 0
                for i, part in enumerate(parts):
                    if any(char in part for char in ["*", "?", "["]):
                        first_wildcard_idx = i
                        break

                # Directory is everything before the first wildcard
                directory = "/".join(parts[:first_wildcard_idx]) if first_wildcard_idx > 0 else "."

                # Pattern is everything from the first wildcard onwards
                pattern = "/".join(parts[first_wildcard_idx:])
            else:
                # No directory, just pattern
                directory = "."
                pattern = path_pattern
        else:
            # No wildcards - treat as directory
            directory = path_pattern if path_pattern else "."
            pattern = "*"

        return (directory, pattern)

    def _matches_pattern(self, file_path, pattern):
        """Check if a file path matches a pattern.

        Args:
            file_path: Path to check
            pattern: Pattern to match against

        Returns:
            True if matches, False otherwise
        """
        # Handle ignore patterns first
        for ignore_pattern in self.ignore_patterns:
            if fnmatch.fnmatch(file_path, ignore_pattern):
                if self.debug:
                    log(Color.YELLOW, f"Ignoring change in {file_path}")
                return False

        # Check if matches watch pattern
        return fnmatch.fnmatch(os.path.basename(file_path), pattern)

    def _handle_event(self, event):
        """Handle file system events.

        Args:
            event: Watchdog event object
        """
        # Ignore directory events
        if event.is_directory:
            return

        # Check if file should be ignored
        for ignore_pattern in self.ignore_patterns:
            if fnmatch.fnmatch(event.src_path, ignore_pattern):
                if self.debug:
                    log(Color.YELLOW, f"Ignoring change in {event.src_path}")
                return

        if self.debug:
            log(Color.CYAN, f"Detected change in {event.src_path}")

        if not self.clean:
            log(Color.GREEN, "Restarting due to file changes...")

        self.restart_process()

    def start(self):
        """Start monitoring and the process."""
        # Select observer class based on polling flag
        observer_class = PollingObserver if self.polling else Observer

        if not self.clean:
            mode_str = "polling mode" if self.polling else "event-based mode"
            log(Color.CYAN, f"Starting pyreload in {mode_str}")
            log(Color.CYAN, f"Watching patterns: {', '.join(self.watch_patterns)}")

            if self.ignore_patterns:
                log(Color.CYAN, f"Ignoring patterns: {', '.join(self.ignore_patterns)}")

            log(Color.CYAN, f"Watching directories: {', '.join([d for d, _ in self.watch_items])}")

            if not self.clean:
                log(Color.YELLOW, "Type 'rs' to manually restart, 'stop' to exit")

        # Create observers for each watch item
        for directory, _pattern in self.watch_items:
            observer = observer_class()
            observer.schedule(self.event_handler, directory, recursive=True)
            self.observers.append(observer)
            observer.start()

        self.start_process()

    def start_process(self):
        """Start the monitored process."""
        if self.exec_mode:
            # Execute as shell command
            if not self.clean:
                log(Color.GREEN, f"Starting: {self.command}")
            self.process = subprocess.Popen(self.command, shell=True)
        else:
            # Execute as Python file
            py_command = self.command if self.command.endswith(".py") else f"{self.command}.py"

            if not self.clean:
                log(Color.GREEN, f"Starting: python {py_command}")

            executable = sys.executable
            self.process = subprocess.Popen([executable, py_command])

    def stop_process(self):
        """Stop the currently running process."""
        if self.process:
            self.process.terminate()
            try:
                self.process.wait(timeout=5)
            except subprocess.TimeoutExpired:
                self.process.kill()
                self.process.wait()
            self.process = None

    def restart_process(self):
        """Restart the monitored process."""
        self.stop_process()
        self.start_process()

    def stop(self):
        """Stop monitoring and the process."""
        if not self.clean:
            log(Color.RED, "Stopping pyreload...")

        self.stop_process()

        for observer in self.observers:
            observer.stop()

        for observer in self.observers:
            observer.join()

        if not self.clean:
            log(Color.GREEN, "Stopped")
