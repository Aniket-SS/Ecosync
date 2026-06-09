import React from 'react';
import { 
  Leaf, 
  Moon, 
  Sun,
  ArrowRight, 
  LineChart, 
  Gauge, 
  MessageSquare, 
  ShieldCheck, 
  Zap 
} from 'lucide-react';

export default function Home({ setActiveTab, isDark, toggleTheme }) {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0a] text-slate-900 dark:text-gray-100 font-sans selection:bg-indigo-500/30 transition-colors duration-300">
      {/* Background Dot Pattern (Adapts to Light/Dark) */}
      <div 
        className="fixed inset-0 z-0 pointer-events-none opacity-[0.05] dark:opacity-[0.15]"
        style={{
          backgroundImage: 'radial-gradient(circle at center, currentColor 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Navigation */}
        <nav className="flex items-center justify-between px-6 py-4 max-w-7xl w-full mx-auto">
          <div className="flex items-center space-x-2">
            <div className="p-1.5 bg-indigo-500/10 rounded-md border border-indigo-500/20">
              <Leaf className="w-5 h-5 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">EcoSync</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-500 dark:text-gray-400">
            <button onClick={() => setActiveTab('methodology')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">Methodology</button>
            <button onClick={() => setActiveTab('about')} className="hover:text-indigo-600 dark:hover:text-white transition-colors">About</button>
          </div>

          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-white/5 rounded-full transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
            </button>
            <button 
              onClick={() => setActiveTab('dashboard')} 
              className="px-4 py-2 text-sm font-semibold text-white dark:text-black bg-indigo-600 dark:bg-indigo-400 hover:bg-indigo-700 dark:hover:bg-indigo-500 rounded-md transition-colors shadow-sm"
            >
              Open app
            </button>
          </div>
        </nav>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center text-center px-4 pt-20 pb-32">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs font-medium mb-8">
            <Zap className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Personal carbon intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white max-w-4xl mb-6 leading-[1.1]">
            Understand your footprint.<br />
            Then actually shrink it.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mb-10 leading-relaxed">
            EcoSync turns your everyday choices into a clear, measured picture — and gives you specific, data-grounded ways to do better.
          </p>

          <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="group flex items-center px-6 py-3 text-base font-semibold text-white dark:text-black bg-indigo-600 dark:bg-indigo-400 hover:bg-indigo-700 dark:hover:bg-indigo-500 rounded-lg transition-all shadow-md"
            >
              Start tracking
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
            <a 
              href="#how-it-works"
              className="px-6 py-3 text-base font-semibold text-slate-700 dark:text-white bg-white dark:bg-transparent border border-slate-300 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 rounded-lg transition-colors shadow-sm dark:shadow-none"
            >
              How it works
            </a>
          </div>
        </main>

        {/* Features Grid */}
        <section id="how-it-works" className="px-6 py-24 bg-white dark:bg-[#050505] border-t border-slate-200 dark:border-white/5 transition-colors duration-300">
          <div className="max-w-6xl mx-auto">
            <p className="text-sm font-medium text-slate-500 dark:text-gray-400 mb-12 max-w-2xl">
              The intelligence is deterministic and auditable. The assistant is a narrator on top — it explains your real numbers in plain language.
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6">
                  <LineChart className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">A precise breakdown</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Every activity is converted to CO2e using documented emission factors, then broken down by category so you see exactly where your footprint comes from.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6">
                  <Gauge className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Logical, quantified guidance</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  A deterministic engine analyzes your data and ranks the highest-impact changes — each with a concrete estimate of the CO2e you'd save.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6">
                  <MessageSquare className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">An assistant that knows your data</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Ask questions in plain language. The assistant answers using your real logged footprint — it narrates your numbers, it doesn't invent them.
                </p>
              </div>

              <div className="p-8 rounded-2xl bg-slate-50 dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 hover:border-indigo-500/30 dark:hover:border-white/10 transition-colors shadow-sm dark:shadow-none">
                <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-indigo-400" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Private by default</h3>
                <p className="text-slate-600 dark:text-gray-400 leading-relaxed">
                  Your activity log lives in your browser. No account, no tracking. It only leaves your device when you choose to ask the assistant a question.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="px-6 py-32 max-w-6xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-16">Three steps to a clearer picture.</h2>
          
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-indigo-600 dark:text-indigo-400 font-mono text-sm mb-4 font-semibold">01</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Log what you do</h3>
              <p className="text-slate-600 dark:text-gray-400">Add trips, meals, energy use, and purchases in their natural units.</p>
            </div>
            <div>
              <div className="text-indigo-600 dark:text-indigo-400 font-mono text-sm mb-4 font-semibold">02</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">See your footprint</h3>
              <p className="text-slate-600 dark:text-gray-400">Get an instant breakdown, daily average, and trend over time.</p>
            </div>
            <div>
              <div className="text-indigo-600 dark:text-indigo-400 font-mono text-sm mb-4 font-semibold">03</div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">Act on the insights</h3>
              <p className="text-slate-600 dark:text-gray-400">Follow ranked, quantified suggestions and ask the assistant for help.</p>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-6 pb-32 max-w-4xl mx-auto w-full text-center">
          <div className="p-12 rounded-3xl bg-white dark:bg-[#0f0f0f] border border-slate-200 dark:border-white/5 shadow-xl dark:shadow-none transition-colors duration-300">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">Your first insight is one activity away.</h2>
            <p className="text-slate-600 dark:text-gray-400 mb-8">No sign-up. Start logging and watch your footprint take shape.</p>
            <button 
              onClick={() => setActiveTab('dashboard')}
              className="inline-flex items-center px-6 py-3 text-base font-semibold text-white dark:text-black bg-indigo-600 dark:bg-indigo-400 hover:bg-indigo-700 dark:hover:bg-indigo-500 rounded-lg transition-colors shadow-md"
            >
              Open the app
              <ArrowRight className="w-4 h-4 ml-2" aria-hidden="true" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}