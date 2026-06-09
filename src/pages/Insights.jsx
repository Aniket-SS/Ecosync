import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import Card from '../components/Card';

export default function Insights({ logs = [], dailyAverage = 0, dailyTarget = 4 }) {
  const [insight, setInsight] = useState('');
  const [loading, setLoading] = useState(false);

  const generateInsight = async () => {
    if (logs.length === 0) {
      setInsight("Start logging your activities first. I need deterministic data to analyze.");
      return;
    }

    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      if (!apiKey) throw new Error("No API key");

      const transportTotal = logs.filter(l => l.category === 'Transport').reduce((sum, l) => sum + l.co2e, 0);
      const dietTotal = logs.filter(l => l.category === 'Diet').reduce((sum, l) => sum + l.co2e, 0);
      
      const context = `
        User Daily Average: ${dailyAverage} kg CO2e. Target: ${dailyTarget} kg.
        Totals: Transport (${transportTotal.toFixed(1)}kg), Diet (${dietTotal.toFixed(1)}kg).
        Logs: ${logs.slice(0, 5).map(l => `${l.quantity} ${l.unit} ${l.label} = ${l.co2e.toFixed(1)}kg`).join(', ')}.
      `;

      const prompt = `You are an AI contextualizer. Read this local deterministic carbon data: ${context}. 
      Provide a 3-sentence analytical summary. Do not invent numbers. Compare their daily average to the target. Identify the largest emission source. Be objective and educational.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await response.json();
      setInsight(data.candidates[0].content.parts[0].text);
    } catch (e) {
      setInsight("AI service requires a valid API key in your .env file to generate insights.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl animate-in fade-in duration-500">
       <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Data Insights</h1>
        <p className="text-slate-500 dark:text-slate-400">Generate on-demand, contextual analysis of your deterministic logs.</p>
      </div>

      <Card>
        <div className="flex flex-col items-center text-center p-6">
           <div className="w-16 h-16 bg-indigo-500/10 rounded-full flex items-center justify-center mb-6">
              <Sparkles className="w-8 h-8 text-indigo-500" />
           </div>
           <h2 className="text-xl font-bold mb-2">Analyze my data</h2>
           <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
             Our AI contextualizer reads your local logs and creates a personalized summary. It never overrides your computed numbers.
           </p>
           
           <button 
             onClick={generateInsight} 
             disabled={loading}
             className="px-6 py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold rounded-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
           >
             {loading ? 'Analyzing local database...' : 'Generate Insight'}
           </button>

           {insight && (
             <div className="mt-8 p-6 bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 rounded-xl text-left w-full">
               <h3 className="font-bold text-sm text-indigo-500 uppercase tracking-wider mb-2">AI Summary</h3>
               <p className="text-slate-700 dark:text-slate-300 leading-relaxed">{insight}</p>
             </div>
           )}
        </div>
      </Card>
    </div>
  );
}