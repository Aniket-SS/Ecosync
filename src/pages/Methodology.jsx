import React from 'react';
import Card from '../components/Card';
import { ACTIVITIES } from '../data/constants';

export default function Methodology() {
  return (
    <div className="max-w-3xl animate-in fade-in duration-500">
       <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Methodology</h1>
        <p className="text-slate-500 dark:text-slate-400">How the numbers are calculated.</p>
      </div>
      <Card className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400">
        <p className="leading-relaxed">EcoSync is built on a simple principle: the intelligence is deterministic and auditable. Every figure you see traces back to a documented emission factor — nothing is invented.</p>
        
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">The calculation</h3>
        <p className="leading-relaxed">Each activity you log is multiplied by an emission factor expressed in kilograms of CO2-equivalent per unit.</p>
        <div className="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg font-mono text-sm text-indigo-600 dark:text-indigo-400 my-4 border border-slate-200 dark:border-slate-700">
          emissions (kg CO2e) = quantity × factor[activity]
        </div>

        <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">Emission factors</h3>
        <ul className="space-y-2 list-disc pl-5">
          {ACTIVITIES.map(a => (
            <li key={a.id}><strong className="text-slate-800 dark:text-slate-200">{a.label}:</strong> {a.factor} kg / {a.unit} <span className="opacity-70">({a.category})</span></li>
          ))}
        </ul>
      </Card>
    </div>
  );
}