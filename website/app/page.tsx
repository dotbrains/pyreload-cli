import { Navigation } from './components/sections/Navigation';
import { Hero } from './components/sections/Hero';
import { QuickStart } from './components/sections/QuickStart';
import { Features } from './components/sections/Features';
import { PollingHighlight } from './components/sections/PollingHighlight';
import { TimeSavings } from './components/sections/TimeSavings';
import { UseCases } from './components/sections/UseCases';
import { CTA } from './components/sections/CTA';
import { Footer } from './components/sections/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <Navigation />
      <Hero />
      <QuickStart />
      <Features />
      <PollingHighlight />
      <TimeSavings />
      <UseCases />
      <CTA />
      <Footer />
    </div>
  );
}
