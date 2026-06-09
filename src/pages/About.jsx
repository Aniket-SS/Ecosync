import React from 'react';
import Card from '../components/Card';

export default function About() {
  return (
    <div className="max-w-3xl animate-in fade-in duration-500">
       <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">About</h1>
        <p className="text-slate-500 dark:text-slate-400">Project details and architecture.</p>
      </div>
      <Card>
        <h2 className="text-xl font-bold mb-4">Carbon Footprint Awareness Platform</h2>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
          EcoSync is a deterministic, offline-first carbon tracker built as a single-page React application. It uses browser local storage to maintain absolute privacy over user data.
        </p>
        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
          The AI integration is purely additive—it exists on a separate "Insights" tab to provide context to the hard data, ensuring the math is never overridden by LLM hallucinations.
        </p>
      </Card>
    </div>
  );
}