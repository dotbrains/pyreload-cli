# Vagrant Development

Use Pyreload in Vagrant virtual machines for consistent development environments.

## Why Pyreload with Vagrant?

Vagrant provides:

- Consistent development environments
- Isolated system dependencies
- Team-wide reproducibility

Pyreload enhances Vagrant workflows by:

- Auto-restarting applications on file changes
- Watching files across host/guest boundaries
- Enabling rapid development iteration

## Setup

### Install Pyreload in Guest

Add to your `Vagrantfile` provisioning:

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"

  config.vm.network "forwarded_port", guest: 8000, host: 8000

  config.vm.synced_folder ".", "/vagrant"

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y python3 python3-pip
    pip3 install pyreload
  SHELL
end
```

### Alternative: Install in Project

```ruby
config.vm.provision "shell", inline: <<-SHELL
  cd /vagrant
  pip3 install -e .
  pip3 install pyreload
SHELL
```

## File Watching with Synced Folders

### Use Polling Mode

Native file watching doesn't work well across synced folders. Use polling:

```yaml
# .pyreload.yml
polling: true
poll_interval: 1.0

watch:
  - /vagrant/src
  - /vagrant/config

ignore:
  - "**/__pycache__/**"
  - ".vagrant/**"
```

### Start Pyreload

```bash
vagrant ssh
cd /vagrant
pyreload --polling app.py
```

## Example: Flask Application

### Project Structure

```
myproject/
├── Vagrantfile
├── .pyreload.yml
├── app.py
├── requirements.txt
└── templates/
    └── index.html
```

### Vagrantfile

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"

  # Forward Flask port
  config.vm.network "forwarded_port", guest: 5000, host: 5000

  # Mount project directory
  config.vm.synced_folder ".", "/vagrant",
    type: "virtualbox",
    owner: "vagrant",
    group: "vagrant"

  # Provision
  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y python3 python3-pip
    pip3 install -r /vagrant/requirements.txt
    pip3 install pyreload
  SHELL

  # Auto-start application
  config.vm.provision "shell", run: "always", inline: <<-SHELL
    cd /vagrant
    nohup pyreload --polling app.py > /vagrant/pyreload.log 2>&1 &
  SHELL
end
```

### .pyreload.yml

```yaml
polling: true
poll_interval: 1.0

watch:
  - /vagrant

extensions:
  - py
  - html
  - css

ignore:
  - ".vagrant/**"
  - "**/__pycache__/**"
  - "**/*.pyc"

clean: true
```

### Start Development

```bash
# Start VM
vagrant up

# SSH into VM
vagrant ssh

# Start Pyreload (if not auto-started)
cd /vagrant
pyreload app.py

# Edit files on host, see changes in VM
```

## Example: Django Project

### Vagrantfile

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"

  config.vm.network "forwarded_port", guest: 8000, host: 8000
  config.vm.synced_folder ".", "/vagrant"

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y python3-pip postgresql
    pip3 install Django pyreload psycopg2-binary
  SHELL
end
```

### .pyreload.yml

```yaml
polling: true
poll_interval: 1.5

watch:
  - /vagrant/mysite
  - /vagrant/templates
  - /vagrant/static

extensions:
  - py
  - html
  - css
  - js

ignore:
  - ".vagrant/**"
  - "staticfiles/**"
  - "**/__pycache__/**"
```

### Run Django

```bash
vagrant ssh
cd /vagrant
pyreload manage.py runserver 0.0.0.0:8000
```

## Performance Optimization

### Reduce Synced Folder Overhead

Use NFS for better performance:

```ruby
config.vm.synced_folder ".", "/vagrant",
  type: "nfs",
  nfs_udp: false
```

### Adjust Poll Interval

Balance responsiveness vs. CPU usage:

```yaml
# Fast (more CPU)
poll_interval: 0.5

# Normal
poll_interval: 1.0

# Slow (less CPU)
poll_interval: 2.0
```

### Exclude Large Directories

```yaml
ignore:
  - ".vagrant/**"
  - "node_modules/**"
  - ".venv/**"
  - "**/__pycache__/**"
```

## Multi-VM Setup

### Vagrantfile

```ruby
Vagrant.configure("2") do |config|
  # API Server
  config.vm.define "api" do |api|
    api.vm.box = "ubuntu/focal64"
    api.vm.network "forwarded_port", guest: 5000, host: 5000
    api.vm.network "private_network", ip: "192.168.50.4"

    api.vm.synced_folder "./api", "/vagrant"

    api.vm.provision "shell", inline: <<-SHELL
      pip3 install pyreload flask
    SHELL
  end

  # Worker
  config.vm.define "worker" do |worker|
    worker.vm.box = "ubuntu/focal64"
    worker.vm.network "private_network", ip: "192.168.50.5"

    worker.vm.synced_folder "./worker", "/vagrant"

    worker.vm.provision "shell", inline: <<-SHELL
      pip3 install pyreload celery
    SHELL
  end
end
```

### Start Services

```bash
# Terminal 1: API server
vagrant ssh api
cd /vagrant
pyreload --polling app.py

# Terminal 2: Worker
vagrant ssh worker
cd /vagrant
pyreload --polling worker.py
```

## Troubleshooting

### File Changes Not Detected

Use polling mode:

```bash
pyreload --polling app.py
```

### High CPU Usage

Increase poll interval:

```yaml
polling: true
poll_interval: 2.0
```

### Permission Errors

Fix synced folder permissions:

```ruby
config.vm.synced_folder ".", "/vagrant",
  owner: "vagrant",
  group: "vagrant"
```

### Slow Syncing

Use NFS or rsync:

```ruby
config.vm.synced_folder ".", "/vagrant",
  type: "rsync",
  rsync__exclude: [".git/", "__pycache__/"]
```

## Best Practices

1. **Always use polling**: Native watching doesn't work with synced folders
2. **Optimize poll interval**: Balance speed and CPU usage
3. **Exclude unnecessary files**: Ignore build artifacts and dependencies
4. **Use NFS**: Faster than VirtualBox shared folders
5. **Forward ports**: Make services accessible from host

## Complete Example

### Directory Structure

```
myproject/
├── Vagrantfile
├── .pyreload.yml
├── requirements.txt
├── src/
│   ├── app.py
│   └── config.py
└── tests/
    └── test_app.py
```

### Vagrantfile

```ruby
Vagrant.configure("2") do |config|
  config.vm.box = "ubuntu/focal64"
  config.vm.network "forwarded_port", guest: 8000, host: 8000

  config.vm.synced_folder ".", "/vagrant", type: "nfs"

  config.vm.provider "virtualbox" do |vb|
    vb.memory = "2048"
    vb.cpus = 2
  end

  config.vm.provision "shell", inline: <<-SHELL
    apt-get update
    apt-get install -y python3-pip
    pip3 install -r /vagrant/requirements.txt
    pip3 install pyreload
  SHELL
end
```

### .pyreload.yml

```yaml
polling: true
poll_interval: 1.0

watch:
  - /vagrant/src
  - /vagrant/config

extensions:
  - py
  - yaml

ignore:
  - ".vagrant/**"
  - "tests/**"
  - "**/__pycache__/**"

clean: true
verbose: false
```

### Workflow

```bash
# Start VM
vagrant up

# SSH and start development
vagrant ssh
cd /vagrant
pyreload src/app.py

# Edit files on host machine
# See changes automatically reflected in VM
```

## See Also

- [Docker Development](docker.md)
- [Polling Mode](../user-guide/polling-mode.md)
