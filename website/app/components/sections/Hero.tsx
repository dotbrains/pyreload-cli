import { Github, RotateCcw } from 'lucide-react';

export function Hero() {
  return (
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
          <a href="https://dotbrains.github.io/pyreload-cli" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition">
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
  );
}
