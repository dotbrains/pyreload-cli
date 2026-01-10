"""Tests for main.py CLI and entry point."""

from unittest.mock import Mock, patch

from pyreload.main import create_parser, main


class TestCreateParser:
    """Test cases for CLI argument parser."""

    def test_parser_basic_command(self):
        """Test parser with just a command"""
        parser = create_parser()
        args = parser.parse_args(["app.py"])
        assert args.command == "app.py"
        assert args.watch is None
        assert args.ignore == []
        assert args.debug is False
        assert args.clean is False
        assert args.exec is False
        assert args.polling is False

    def test_parser_with_watch_patterns(self):
        """Test parser with multiple watch patterns"""
        parser = create_parser()
        args = parser.parse_args(["app.py", "-w", "*.py", "-w", "*.yaml"])
        assert args.command == "app.py"
        assert args.watch == ["*.py", "*.yaml"]

    def test_parser_with_ignore_patterns(self):
        """Test parser with multiple ignore patterns"""
        parser = create_parser()
        args = parser.parse_args(["app.py", "-i", "*.log", "-i", "*__pycache__*"])
        assert args.command == "app.py"
        assert args.ignore == ["*.log", "*__pycache__*"]

    def test_parser_with_polling_flag(self):
        """Test parser with polling flag"""
        parser = create_parser()
        args = parser.parse_args(["app.py", "--polling"])
        assert args.polling is True

    def test_parser_with_debug_flag(self):
        """Test parser with debug flag"""
        parser = create_parser()
        args = parser.parse_args(["app.py", "--debug"])
        assert args.debug is True

    def test_parser_with_clean_flag(self):
        """Test parser with clean flag"""
        parser = create_parser()
        args = parser.parse_args(["app.py", "--clean"])
        assert args.clean is True

    def test_parser_with_exec_flag(self):
        """Test parser with exec flag"""
        parser = create_parser()
        args = parser.parse_args(["npm run dev", "--exec"])
        assert args.exec is True

    def test_parser_short_flags(self):
        """Test parser with short flag versions"""
        parser = create_parser()
        args = parser.parse_args(["app.py", "-p", "-d", "-c", "-x"])
        assert args.polling is True
        assert args.debug is True
        assert args.clean is True
        assert args.exec is True

    def test_parser_combined_flags(self):
        """Test parser with all flags combined"""
        parser = create_parser()
        args = parser.parse_args(
            [
                "app.py",
                "-w",
                "*.py",
                "-w",
                "config/*.yaml",
                "-i",
                "*.log",
                "--polling",
                "--debug",
            ]
        )
        assert args.command == "app.py"
        assert args.watch == ["*.py", "config/*.yaml"]
        assert args.ignore == ["*.log"]
        assert args.polling is True
        assert args.debug is True


class TestMain:
    """Test cases for main entry point."""

    @patch("pyreload.main.Monitor")
    @patch("pyreload.main.load_config")
    @patch("builtins.input")
    @patch("sys.argv", ["pyreload", "app.py"])
    def test_main_basic_execution(self, mock_input, mock_load_config, mock_monitor_class):
        """Test basic main execution without config file"""
        mock_load_config.return_value = ({}, None)
        mock_monitor = Mock()
        mock_monitor_class.return_value = mock_monitor

        # Simulate immediate KeyboardInterrupt after start
        mock_input.side_effect = KeyboardInterrupt()

        main()

        mock_monitor_class.assert_called_once()
        mock_monitor.start.assert_called_once()
        mock_monitor.stop.assert_called_once()

    @patch("pyreload.main.Monitor")
    @patch("pyreload.main.load_config")
    @patch("pyreload.main.log")
    @patch("builtins.input")
    @patch("sys.argv", ["pyreload", "app.py"])
    def test_main_with_config_file(
        self, mock_input, mock_log, mock_load_config, mock_monitor_class
    ):
        """Test main execution with config file"""
        mock_load_config.return_value = ({"watch": ["*.py"]}, ".pyreloadrc")
        mock_monitor = Mock()
        mock_monitor_class.return_value = mock_monitor

        # Simulate immediate KeyboardInterrupt
        mock_input.side_effect = KeyboardInterrupt()

        main()

        # Should log config file usage
        mock_log.assert_called()
        mock_monitor_class.assert_called_once()
        mock_monitor.start.assert_called_once()
        mock_monitor.stop.assert_called_once()

    @patch("pyreload.main.Monitor")
    @patch("pyreload.main.load_config")
    @patch("builtins.input")
    @patch("sys.argv", ["pyreload", "app.py"])
    def test_main_restart_command(self, mock_input, mock_load_config, mock_monitor_class):
        """Test main with 'rs' restart command"""
        mock_load_config.return_value = ({}, None)
        mock_monitor = Mock()
        mock_monitor_class.return_value = mock_monitor

        # Simulate user input: 'rs' then 'stop'
        mock_input.side_effect = ["rs", "stop"]

        main()

        mock_monitor.restart_process.assert_called_once()
        mock_monitor.stop.assert_called_once()

    @patch("pyreload.main.Monitor")
    @patch("pyreload.main.load_config")
    @patch("builtins.input")
    @patch("sys.argv", ["pyreload", "app.py"])
    def test_main_stop_command(self, mock_input, mock_load_config, mock_monitor_class):
        """Test main with 'stop' command"""
        mock_load_config.return_value = ({}, None)
        mock_monitor = Mock()
        mock_monitor_class.return_value = mock_monitor

        # Simulate user input: 'stop'
        mock_input.side_effect = ["stop"]

        main()

        mock_monitor.stop.assert_called_once()

    @patch("pyreload.main.Monitor")
    @patch("pyreload.main.load_config")
    @patch("builtins.input")
    @patch("sys.argv", ["pyreload", "app.py"])
    def test_main_eof_handling(self, mock_input, mock_load_config, mock_monitor_class):
        """Test main handles EOF (Ctrl+D) gracefully"""
        mock_load_config.return_value = ({}, None)
        mock_monitor = Mock()
        mock_monitor_class.return_value = mock_monitor

        # Simulate EOF
        mock_input.side_effect = EOFError()

        main()

        mock_monitor.start.assert_called_once()
        # Should not call stop on EOF, just exit cleanly

    @patch("pyreload.main.Monitor")
    @patch("pyreload.main.load_config")
    @patch("pyreload.main.time.sleep")
    @patch("sys.argv", ["pyreload", "app.py", "--clean"])
    def test_main_clean_mode(self, mock_sleep, mock_load_config, mock_monitor_class):
        """Test main in clean mode with no input"""
        mock_load_config.return_value = ({}, None)
        mock_monitor = Mock()
        mock_monitor_class.return_value = mock_monitor

        # Simulate KeyboardInterrupt after first sleep
        mock_sleep.side_effect = KeyboardInterrupt()

        main()

        mock_sleep.assert_called_once_with(1)
        mock_monitor.stop.assert_called_once()

    @patch("pyreload.main.Monitor")
    @patch("pyreload.main.load_config")
    @patch("pyreload.main.time.sleep")
    @patch("sys.argv", ["pyreload", "app.py", "--clean"])
    def test_main_clean_mode_no_config_logging(
        self, mock_sleep, mock_load_config, mock_monitor_class
    ):
        """Test main in clean mode doesn't log config file"""
        mock_load_config.return_value = ({"watch": ["*.py"]}, ".pyreloadrc")
        mock_monitor = Mock()
        mock_monitor_class.return_value = mock_monitor

        # Simulate immediate KeyboardInterrupt
        mock_sleep.side_effect = KeyboardInterrupt()

        with patch("pyreload.main.log") as mock_log:
            main()
            # Should not log in clean mode even with config file
            mock_log.assert_not_called()

    @patch("pyreload.main.Monitor")
    @patch("pyreload.main.load_config")
    @patch("builtins.input")
    @patch("sys.argv", ["pyreload", "app.py"])
    def test_main_unknown_command_ignored(self, mock_input, mock_load_config, mock_monitor_class):
        """Test main ignores unknown commands"""
        mock_load_config.return_value = ({}, None)
        mock_monitor = Mock()
        mock_monitor_class.return_value = mock_monitor

        # Simulate user input: unknown command then 'stop'
        mock_input.side_effect = ["unknown", "stop"]

        main()

        # Should not restart on unknown command
        mock_monitor.restart_process.assert_not_called()
        mock_monitor.stop.assert_called_once()
