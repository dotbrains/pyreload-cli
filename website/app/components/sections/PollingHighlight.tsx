import { X, Check } from 'lucide-react';

export function PollingHighlight() {
  return (
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
  );
}
