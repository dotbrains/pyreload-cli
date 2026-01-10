'use client';

import { DollarSign, Clock, TrendingUp } from 'lucide-react';
import { useState } from 'react';

function SavingsCard({ 
  period, 
  hours, 
  cost, 
  icon 
}: { 
  period: string; 
  hours: string; 
  cost: string; 
  icon: React.ReactNode;
}) {
  return (
    <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 hover:border-cyan-500/50 transition">
      <div className="flex items-center gap-3 mb-3">
        <div className="text-cyan-400">{icon}</div>
        <h3 className="text-lg font-semibold">{period}</h3>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Time Saved</span>
          <span className="text-cyan-400 font-semibold">{hours}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-slate-400 text-sm">Cost Savings</span>
          <span className="text-green-400 font-semibold">${cost}</span>
        </div>
      </div>
    </div>
  );
}

export function TimeSavings() {
  const [restartsPerDay, setRestartsPerDay] = useState(30);
  const [secondsPerRestart, setSecondsPerRestart] = useState(10);
  const [hourlyRate, setHourlyRate] = useState(75);

  // Calculate savings
  const secondsSavedPerDay = restartsPerDay * secondsPerRestart;
  const minutesSavedPerDay = secondsSavedPerDay / 60;
  const hoursSavedPerDay = minutesSavedPerDay / 60;

  const hoursSavedPerWeek = hoursSavedPerDay * 5; // 5 work days
  const hoursSavedPerMonth = hoursSavedPerDay * 22; // ~22 work days
  const hoursSavedPerYear = hoursSavedPerDay * 252; // ~252 work days

  const costSavedPerDay = hoursSavedPerDay * hourlyRate;
  const costSavedPerWeek = hoursSavedPerWeek * hourlyRate;
  const costSavedPerMonth = hoursSavedPerMonth * hourlyRate;
  const costSavedPerYear = hoursSavedPerYear * hourlyRate;

  const formatHours = (hours: number) => {
    if (hours < 1) {
      return `${Math.round(hours * 60)}m`;
    }
    return `${hours.toFixed(1)}h`;
  };

  const formatCost = (cost: number) => {
    return cost.toLocaleString('en-US', { maximumFractionDigits: 0 });
  };

  return (
    <section id="savings" className="py-16 sm:py-20 px-4 sm:px-6 bg-slate-900/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Calculate Your <span className="gradient-text">Time & Cost Savings</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Eliminate manual restarts and context switching. See how much time and money Pyreload saves your team.
          </p>
        </div>

        {/* Calculator Inputs */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-6 sm:p-8 mb-8 max-w-3xl mx-auto">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
            Customize Your Scenario
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Restarts per day</span>
                <span className="text-cyan-400 font-mono">{restartsPerDay}</span>
              </label>
              <input
                type="range"
                min="10"
                max="100"
                value={restartsPerDay}
                onChange={(e) => setRestartsPerDay(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>10</span>
                <span>100</span>
              </div>
            </div>

            <div>
              <label className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Seconds wasted per manual restart</span>
                <span className="text-cyan-400 font-mono">{secondsPerRestart}s</span>
              </label>
              <input
                type="range"
                min="5"
                max="30"
                value={secondsPerRestart}
                onChange={(e) => setSecondsPerRestart(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>5s</span>
                <span>30s</span>
              </div>
            </div>

            <div>
              <label className="flex justify-between text-sm text-slate-300 mb-2">
                <span>Developer hourly rate (USD)</span>
                <span className="text-cyan-400 font-mono">${hourlyRate}</span>
              </label>
              <input
                type="range"
                min="25"
                max="200"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>$25</span>
                <span>$200</span>
              </div>
            </div>
          </div>
        </div>

        {/* Savings Display */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <SavingsCard
            period="Per Day"
            hours={formatHours(hoursSavedPerDay)}
            cost={formatCost(costSavedPerDay)}
            icon={<Clock className="w-5 h-5" />}
          />
          <SavingsCard
            period="Per Week"
            hours={formatHours(hoursSavedPerWeek)}
            cost={formatCost(costSavedPerWeek)}
            icon={<Clock className="w-5 h-5" />}
          />
          <SavingsCard
            period="Per Month"
            hours={formatHours(hoursSavedPerMonth)}
            cost={formatCost(costSavedPerMonth)}
            icon={<DollarSign className="w-5 h-5" />}
          />
          <SavingsCard
            period="Per Year"
            hours={formatHours(hoursSavedPerYear)}
            cost={formatCost(costSavedPerYear)}
            icon={<DollarSign className="w-5 h-5" />}
          />
        </div>

        {/* Additional Context */}
        <div className="mt-8 text-center">
          <p className="text-slate-400 text-sm max-w-2xl mx-auto">
            These calculations account for manual restart time, context switching overhead, and developer productivity loss. 
            Actual savings may vary based on your workflow and project complexity.
          </p>
        </div>
      </div>
    </section>
  );
}
