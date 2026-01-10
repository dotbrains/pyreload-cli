'use client';

import { Github, ExternalLink, Menu, X } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="border-b border-slate-800 bg-slate-950/95 backdrop-blur supports-[backdrop-filter]:bg-slate-950/60 fixed w-full z-50">
      <div className="container mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
        <a href="/" className="flex items-center gap-2 sm:gap-3 hover:opacity-80 transition-opacity">
          <Image src="/favicon.svg" alt="Pyreload" width={32} height={32} className="w-7 h-7 sm:w-8 sm:h-8" />
          <span className="text-lg sm:text-xl font-bold gradient-text">Pyreload CLI</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          <a href="#features" className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium">
            Features
          </a>
          <a href="#use-cases" className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium">
            Use Cases
          </a>
          <a href="https://dotbrains.github.io/pyreload-cli" className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium inline-flex items-center gap-1.5" target="_blank" rel="noopener noreferrer">
            Docs
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
          <div className="flex items-center gap-3 ml-2">
            <a href="https://github.com/dotbrains/pyreload-cli" className="inline-flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 text-slate-200 rounded-lg transition text-sm font-medium" target="_blank" rel="noopener noreferrer">
              <Github className="w-4 h-4" />
              Star
            </a>
            <a href="https://pypi.org/project/pyreload-cli/" className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2 rounded-lg shadow-lg shadow-cyan-500/30 text-sm font-semibold transition-all" target="_blank" rel="noopener noreferrer">
              Get Started
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-slate-300 hover:text-cyan-400 transition"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-slate-800 bg-slate-950/98 backdrop-blur">
          <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="#features"
              className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a
              href="#use-cases"
              className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Use Cases
            </a>
            <a
              href="https://dotbrains.github.io/pyreload-cli"
              className="text-slate-300 hover:text-cyan-400 transition text-sm font-medium inline-flex items-center gap-1.5 py-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              Docs
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <div className="flex flex-col gap-3 pt-2">
              <a
                href="https://github.com/dotbrains/pyreload-cli"
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 text-slate-200 rounded-lg transition text-sm font-medium"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-4 h-4" />
                Star on GitHub
              </a>
              <a
                href="https://pypi.org/project/pyreload-cli/"
                className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white px-6 py-2.5 rounded-lg shadow-lg shadow-cyan-500/30 text-sm font-semibold transition-all text-center"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
