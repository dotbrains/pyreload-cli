import { Github, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export function Footer() {
  return (
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
                <a href="https://dotbrains.github.io/pyreload-cli" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
                  Documentation
                  <ExternalLink className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://pypi.org/project/pyreload-cli-cli/" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
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
                <a href="https://dotbrains.github.io/pyreload-cli" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
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
  );
}
