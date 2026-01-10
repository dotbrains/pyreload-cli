'use client';

import { useState } from 'react';

export function QuickStart() {
  const [activeTab, setActiveTab] = useState<'basic' | 'docker' | 'config'>('basic');

  return (
    <section className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900/50">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 px-4">
          Get Started in <span className="gradient-text">30 Seconds</span>
        </h2>

        <div className="flex gap-2 sm:gap-4 justify-center mb-6 flex-wrap px-4">
          <button
            onClick={() => setActiveTab('basic')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base ${
              activeTab === 'basic' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Basic Usage
          </button>
          <button
            onClick={() => setActiveTab('docker')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base ${
              activeTab === 'docker' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Docker
          </button>
          <button
            onClick={() => setActiveTab('config')}
            className={`px-3 sm:px-4 py-2 rounded-lg transition text-sm sm:text-base ${
              activeTab === 'config' ? 'bg-cyan-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            Config File
          </button>
        </div>

        <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 sm:p-6 font-mono text-xs sm:text-sm overflow-x-auto">
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
  );
}
