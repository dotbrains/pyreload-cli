# Clean Mode

Clear the terminal screen before each restart for a cleaner development experience.

## What is Clean Mode?

Clean mode clears the terminal screen every time your application restarts, providing a fresh view of the output.

## Usage

### Command Line

```bash
pyreload --clean app.py
```

Or use the short flag:

```bash
pyreload -c app.py
```

### Config File

```yaml
clean: true
```

## How It Works

### Without Clean Mode (Default)

```
[pyreload] starting: python app.py
Server running on port 8000
Request: GET /api/users

[pyreload] restarting due to changes in: src/app.py
[pyreload] starting: python app.py
Server running on port 8000
Request: GET /api/users
```

Output accumulates, making it harder to see current state.

### With Clean Mode

```
[screen clears]
[pyreload] restarting due to changes in: src/app.py
[pyreload] starting: python app.py
Server running on port 8000
```

Each restart shows only new output.

## When to Use Clean Mode

### Good Use Cases

1. **Development servers**: Web applications with startup messages
2. **Single-run scripts**: Scripts that produce complete output each run
3. **Status dashboards**: Applications that display current state
4. **Clean logs**: When you only care about the latest execution

### Not Recommended For

1. **Debugging**: When you need to see previous error messages
2. **Cumulative output**: When tracking changes across restarts
3. **Log aggregation**: When collecting historical output
4. **CI/CD**: Automated environments where history matters

## Examples

### Flask Development

```bash
pyreload --clean app.py
```

Output shows only current server state:

```
[pyreload] starting: python app.py
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

### Django Development

```bash
pyreload --clean manage.py runserver
```

Clean output on each reload:

```
[pyreload] starting: python manage.py runserver
Starting development server at http://127.0.0.1:8000/
Quit the server with CONTROL-C.
```

### CLI Application

```bash
pyreload --clean script.py
```

Shows only latest run results:

```
[pyreload] starting: python script.py
Processing 100 records...
✓ Success: All records processed
Time: 2.3s
```

## Combined with Other Options

### With Verbose Mode

```bash
pyreload --clean --verbose app.py
```

Shows Pyreload details with clean restarts:

```
[pyreload] watching: src/**/*.py
[pyreload] changes detected in: src/app.py
[pyreload] restarting...
[pyreload] starting: python app.py
Server running on port 8000
```

### With Delay

```bash
pyreload --clean --delay 2 app.py
```

Clears screen after delay period.

### With Config File

```yaml
clean: true
verbose: true
delay: 1.0
watch:
  - src
extensions:
  - py
```

## Interactive Clear

You can also manually clear the screen while Pyreload is running:

Press `c` to clear without restarting:

```
[lots of output...]

c  <-- Press 'c'

[screen cleared, app continues running]
```

## Terminal Compatibility

Clean mode works on most terminals:

- ✅ Linux (bash, zsh, fish)
- ✅ macOS (Terminal.app, iTerm2)
- ✅ Windows (PowerShell, CMD, Windows Terminal)
- ✅ CI/CD environments

Pyreload uses ANSI escape codes or `clear`/`cls` commands depending on the platform.

## Alternatives

### Manual Clear Command

Instead of clean mode:

```bash
pyreload app.py
```

Press `c` when you want to clear.

### Logging to File

Keep history while having clean screen:

```bash
pyreload --clean app.py 2>&1 | tee app.log
```

Screen stays clean, logs saved to `app.log`.

### Terminal Scrollback

Use terminal's scrollback buffer:

- Most terminals: `Shift + PageUp`
- tmux: `Ctrl+b` then `[`
- iTerm2: `Cmd+Shift+h`

## Best Practices

1. **Development**: Use clean mode for cleaner output
2. **Debugging**: Disable clean mode to see error history
3. **Presentations**: Enable clean mode for demos
4. **Production**: Don't use in production monitoring

## Troubleshooting

### "Screen doesn't clear"

Check terminal compatibility:

```bash
# Test if clear command works
clear
```

If this doesn't work, your terminal may not support clearing.

### "Need to see previous output"

Disable clean mode:

```bash
pyreload app.py  # without --clean
```

Or use logging:

```bash
pyreload --clean app.py 2>&1 | tee output.log
```

### "Clear is too aggressive"

Use manual clear instead:

```bash
pyreload app.py
# Press 'c' only when needed
```

## See Also

- [Interactive Commands](../user-guide/commands.md)
- [Exec Mode](exec-mode.md)
- [CLI Reference](../api/cli-reference.md)
