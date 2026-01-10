"""Logger utility for pyreload with colored output."""

from colorama import Fore, Style


class Color:
    """Color constants for console output."""

    GREEN = Fore.GREEN
    YELLOW = Fore.YELLOW + Style.BRIGHT
    RED = Fore.RED
    CYAN = Fore.CYAN
    BLUE = Fore.BLUE


def log(colour, message):
    """Log a message with color.

    Args:
        colour: Color constant from Color class
        message: Message to log
    """
    print(f"{colour}[pyreload] {message}{Style.RESET_ALL}")
