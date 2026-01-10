import { ExternalLink } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 px-6 bg-gradient-to-t from-cyan-950/20 to-slate-950">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-bold mb-6">
          Ready to <span className="gradient-text">Boost</span> Your Workflow?
        </h2>
        <p className="text-xl text-slate-400 mb-8">
          Join developers using Pyreload for seamless Python development
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a href="https://pypi.org/project/pyreload-cli/" className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg font-semibold hover:shadow-lg hover:shadow-cyan-500/50 transition inline-flex items-center gap-2">
            Install from PyPI
            <ExternalLink className="w-4 h-4" />
          </a>
          <a href="https://dotbrains.github.io/pyreload-cli" className="px-8 py-3 bg-slate-800 rounded-lg font-semibold hover:bg-slate-700 transition">
            Read Documentation
          </a>
        </div>
      </div>
    </section>
  );
}
