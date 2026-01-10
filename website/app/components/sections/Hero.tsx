import { Github, RotateCcw } from 'lucide-react';

export function Hero() {
  return (
    <section className="pt-24 sm:pt-32 pb-16 sm:pb-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 mb-4 px-3 sm:px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs sm:text-sm">
          <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Python File Monitoring with Polling Support</span>
          <span className="sm:hidden">Python File Monitoring</span>
        </div>
        <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold mb-4 sm:mb-6 px-2">
          <span className="gradient-text">Auto-Restart</span> Your Python Apps
        </h1>
        <p className="text-base sm:text-xl text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
          Automatically restart Python applications when file changes are detected.
          <span className="text-cyan-400 font-semibold"> Full support for Docker, Vagrant, and mounted filesystems</span> via polling mode.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
          <a href="https://dotbrains.github.io/pyreload-cli" className="px-6 sm:px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition text-sm sm:text-base">
            Get Started
          </a>
          <a href="https://github.com/dotbrains/pyreload-cli" className="px-6 sm:px-8 py-3 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition flex items-center justify-center gap-2 text-sm sm:text-base">
            <Github className="w-4 h-4 sm:w-5 sm:h-5" />
            View on GitHub
          </a>
        </div>

        {/* Quick stats */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center mt-10 sm:mt-12 text-sm px-4">
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-cyan-400">Python 3.8+</span>
            <span className="text-slate-500 text-xs sm:text-sm">Cross-platform</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-cyan-400">Zero Config</span>
            <span className="text-slate-500 text-xs sm:text-sm">Works instantly</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xl sm:text-2xl font-bold text-cyan-400">Polling Mode</span>
            <span className="text-slate-500 text-xs sm:text-sm">For containers</span>
          </div>
        </div>
      </div>
    </section>
  );
}
