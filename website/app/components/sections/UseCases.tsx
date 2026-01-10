import { Container, Package, Rocket, Cog, RefreshCw, BarChart3 } from 'lucide-react';

function UseCaseCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/30 transition">
      <div className="text-cyan-400 mb-3">{icon}</div>
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-slate-400 text-sm">{description}</p>
    </div>
  );
}

export function UseCases() {
  return (
    <section id="use-cases" className="py-16 sm:py-20 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 px-4">
          Perfect For <span className="gradient-text">Modern Development</span>
        </h2>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
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
  );
}
