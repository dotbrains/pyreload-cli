'use client';

import { Github, Terminal, Container, Zap, Settings, Play, RefreshCw, Clock, CheckCircle, ExternalLink, RotateCcw, Package, Rocket, Cog, BarChart3, X, Check, Heart, Ship, Database } from 'lucide-react';
import { useState } from 'react';
import Image from 'next/image';

export default function HomePage() {
  const [activeTab, setActiveTab] = useState<'basic' | 'docker' | 'config'>('basic');

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 fixed w-full z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <a href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <Image src="/favicon.svg" alt="Pyreload" width={32} height={32} className="w-8 h-8" />
            <span className="text-xl font-bold gradient-text">Pyreload</span>
          </a>
          <div className="flex items-center gap-8">
            <a href="#features" className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium">
              Features
            </a>
            <a href="#use-cases" className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium">
              Use Cases
            </a>
            <a href="https://dotbrains.github.io/pyreload" className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
              Docs
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex items-center gap-3 ml-2">
              <a href="https://github.com/dotbrains/pyreload-cli" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 text-slate-200 rounded-lg transition text-sm font-medium" target="_blank" rel="noopener noreferrer">
                <Github className="w-4 h-4" />
                Star
              </a>
              <a href="https://pypi.org/project/pyreload/" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2 rounded-lg shadow-lg shadow-cyan-500/30 text-sm font-semibold transition-all" target="_blank" rel="noopener noreferrer">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-sm">
            <RotateCcw className="w-4 h-4" />
            Python File Monitoring with Polling Support
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="gradient-text">Auto-Restart</span> Your Python Apps
          </h1>
          <p className="text-xl text-slate-400 mb-8 max-w-3xl mx-auto">
            Automatically restart Python applications when file changes are detected. 
            <span className="text-cyan-400 font-semibold"> Full support for Docker, Vagrant, and mounted filesystems</span> via polling mode.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://dotbrains.github.io/pyreload" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
              Get Started
            </a>
            <a href="https://github.com/dotbrains/pyreload-cli" className="px-8 py-3 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition flex items-center gap-2">
              <Github className="w-5 h-5" />
              View on GitHub
            </a>
          </div>
          
          {/* Quick stats */}
          <div className="flex gap-8 justify-center mt-12 flex-wrap text-sm">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-cyan-400">Python 3.8+</span>
              <span className="text-slate-500">Cross-platform</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-cyan-400">Zero Config</span>
              <span className="text-slate-500">Works instantly</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-cyan-400">Polling Mode</span>
              <span className="text-slate-500">For containers</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Example */}
      <section className="py-20 px-6 bg-slate-900/50">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Get Started in <span className="gradient-text">30 Seconds</span>
          </h2>
          
          <div className="flex gap-4 justify-center mb-6">
            <button
              onClick={() => setActiveTab('basic')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'basic' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Basic Usage
            </button>
            <button
              onClick={() => setActiveTab('docker')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'docker' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Docker
            </button>
            <button
              onClick={() => setActiveTab('config')}
              className={`px-4 py-2 rounded-lg transition ${
                activeTab === 'config' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Config File
            </button>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-lg p-6 font-mono text-sm">
            {activeTab === 'basic' && (
              <pre className="text-slate-300">
                <span className="text-slate-500"># Install</span>{'\n'}
                <span className="text-cyan-400">pip install pyreload-cli</span>{'\n\n'}
                <span className="text-slate-500"># Run</span>{'\n'}
                <span className="text-cyan-400">pyreload app.py</span>{'\n\n'}
                <span className="text-green-400"># ✓ That's it! Auto-restart on file changes</span>
              </pre>
            )}
            {activeTab === 'docker' && (
              <pre className="text-slate-300">
                <span className="text-slate-500"># Dockerfile</span>{'\n'}
                <span className="text-purple-400">FROM</span> python:3.11-slim{'\n'}
                <span className="text-purple-400">WORKDIR</span> /app{'\n'}
                <span className="text-purple-400">COPY</span> requirements.txt .{'\n'}
                <span className="text-purple-400">RUN</span> pip install -r requirements.txt{'\n'}
                <span className="text-purple-400">CMD</span> [<span className="text-green-400">"pyreload"</span>, <span className="text-green-400">"app.py"</span>, <span className="text-green-400">"--polling"</span>]{'\n\n'}
                <span className="text-green-400"># ✓ Works with Docker volume mounts!</span>
              </pre>
            )}
            {activeTab === 'config' && (
              <pre className="text-slate-300">
                <span className="text-slate-500">// .pyreloadrc</span>{'\n'}
                {'{\n'}
                  {'  '}<span className="text-cyan-400">"watch"</span>: [<span className="text-green-400">"*.py"</span>, <span className="text-green-400">"config/*.yaml"</span>],{'\n'}
                  {'  '}<span className="text-cyan-400">"ignore"</span>: [<span className="text-green-400">"*__pycache__*"</span>],{'\n'}
                  {'  '}<span className="text-cyan-400">"polling"</span>: <span className="text-orange-400">true</span>{'\n'}
                {'}\n\n'}
                <span className="text-green-400"># ✓ Team-shareable configuration</span>
              </pre>
            )}
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why <span className="gradient-text">Pyreload</span>?
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={<Container className="w-6 h-6" />}
              title="Polling Mode"
              description="Works with Docker volumes, Vagrant, CIFS, and NFS. Solves the mounted filesystem limitation."
            />
            <FeatureCard
              icon={<Zap className="w-6 h-6" />}
              title="Zero Config"
              description="Works out of the box with sensible defaults. Just run 'pyreload app.py' and you're done."
            />
            <FeatureCard
              icon={<Settings className="w-6 h-6" />}
              title="Config Files"
              description="Share settings with your team via .pyreloadrc or pyreload.json. CLI args override config."
            />
            <FeatureCard
              icon={<Play className="w-6 h-6" />}
              title="Exec Mode"
              description="Run any shell command, not just Python files. Perfect for npm scripts or custom tools."
            />
            <FeatureCard
              icon={<RefreshCw className="w-6 h-6" />}
              title="Manual Restart"
              description="Type 'rs' to manually restart, 'stop' to exit. Full interactive control."
            />
            <FeatureCard
              icon={<Clock className="w-6 h-6" />}
              title="Watch Patterns"
              description="Flexible glob patterns for watching and ignoring files. Watch multiple file types."
            />
          </div>
        </div>
      </section>

      {/* Polling Highlight */}
      <section className="py-20 px-6 bg-gradient-to-b from-cyan-950/20 to-slate-950">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              The <span className="gradient-text">Polling</span> Advantage
            </h2>
            <p className="text-slate-400 text-lg">
              Standard file watching doesn't work in containers. Pyreload's polling mode solves this.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-900/50 border border-red-500/20 rounded-lg p-6">
              <div className="text-red-400 font-semibold mb-2 flex items-center gap-2">
                <X className="w-5 h-5" />
                Without Polling
              </div>
              <p className="text-slate-400 text-sm mb-4">
                OS events (inotify) don't propagate through mounted volumes. File changes are missed.
              </p>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-slate-500">
                Host: Edit app.py → Container: No event → ❌ No restart
              </div>
            </div>

            <div className="bg-slate-900/50 border border-green-500/20 rounded-lg p-6">
              <div className="text-green-400 font-semibold mb-2 flex items-center gap-2">
                <Check className="w-5 h-5" />
                With Polling
              </div>
              <p className="text-slate-400 text-sm mb-4">
                Directly checks file modification times. Works everywhere, regardless of mount type.
              </p>
              <div className="bg-slate-950 rounded p-3 font-mono text-xs text-green-400">
                Host: Edit app.py → Pyreload polls → ✅ Restart detected
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">
            Perfect For <span className="gradient-text">Modern Development</span>
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <UseCaseCard
              icon={<Container className="w-5 h-5" />}
              title="Docker Development"
              description="Hot reload in containers with volume mounts. Essential for containerized development workflows."
            />
            <UseCaseCard
              icon={<Package className="w-5 h-5" />}
              title="Vagrant Workflows"
              description="Develop in VMs with synced folders. Perfect for Kubernetes operator development."
            />
            <UseCaseCard
              icon={<Rocket className="w-5 h-5" />}
              title="Microservices"
              description="Auto-restart multiple services during development. Works with docker-compose."
            />
            <UseCaseCard
              icon={<Cog className="w-5 h-5" />}
              title="API Development"
              description="Flask, FastAPI, or Django. Disable framework reloaders and let Pyreload handle it."
            />
            <UseCaseCard
              icon={<RefreshCw className="w-5 h-5" />}
              title="CI/CD Testing"
              description="Test deployment scripts with automatic restarts. Use clean mode for quiet operation."
            />
            <UseCaseCard
              icon={<BarChart3 className="w-5 h-5" />}
              title="Data Pipelines"
              description="Restart ETL scripts on code changes. Watch config files and data schemas."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 bg-gradient-to-t from-cyan-950/20 to-slate-950">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to <span className="gradient-text">Boost</span> Your Workflow?
          </h2>
          <p className="text-xl text-slate-400 mb-8">
            Join developers using Pyreload for seamless Python development
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="https://pypi.org/project/pyreload/" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition inline-flex items-center gap-2">
              Install from PyPI
              <ExternalLink className="w-4 h-4" />
            </a>
            <a href="https://dotbrains.github.io/pyreload" className="px-8 py-3 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition">
              Read Documentation
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-16 px-6">
        <div className="container mx-auto max-w-7xl">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/favicon.svg" alt="Pyreload" width={32} height={32} className="w-8 h-8" />
                <span className="text-xl font-bold text-white">Pyreload</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Auto-restart Python applications with polling support for Docker, Vagrant, and mounted filesystems. Open source and free to use.
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://github.com/dotbrains/pyreload-cli"
                  className="text-slate-400 hover:text-cyan-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Product</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://dotbrains.github.io/pyreload" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    Documentation
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://pypi.org/project/pyreload/" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    PyPI Package
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Resources</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://dotbrains.github.io/pyreload" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    Getting Started
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/dotbrains/pyreload-cli#readme" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    Examples
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Community</h4>
              <ul className="space-y-3">
                <li>
                  <a href="https://github.com/dotbrains/pyreload-cli" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    GitHub Repository
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/dotbrains/pyreload-cli/issues" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    Report Issues
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="https://github.com/dotbrains/pyreload-cli/discussions" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                    Discussions
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-400 text-sm">
              © {new Date().getFullYear()} Pyreload. All rights reserved.
            </p>
            <p className="text-slate-500 text-xs">
              Open source software licensed under MIT
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition">
      <div className="text-cyan-400 mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

function UseCaseCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/30 transition">
      <div className="text-cyan-400 mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}
