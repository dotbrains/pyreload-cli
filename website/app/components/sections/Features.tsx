import { Container, Zap, Settings, Play, RefreshCw, Clock } from 'lucide-react';

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition">
      <div className="text-cyan-400 mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

export function Features() {
  return (
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
  );
}
