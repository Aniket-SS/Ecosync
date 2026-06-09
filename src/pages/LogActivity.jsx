import React, { useState } from 'react';
import { Trash2, Target as TargetIcon, PlusCircle, LayoutDashboard, Car, Zap, Utensils, ShoppingBag } from 'lucide-react';
import Card from '../components/Card';
import { ACTIVITIES } from '../data/constants';

export default function LogActivity({ logs = [], setLogs = () => {}, dailyTarget = 4, setDailyTarget = () => {}, isDark }) {
  const [selectedActivity, setSelectedActivity] = useState(ACTIVITIES[0].id);
  const [amount, setAmount] = useState('');
  const today = new Date().toISOString().split('T')[0];
  const [date, setDate] = useState(today);
  const [targetInput, setTargetInput] = useState(dailyTarget);

  const activeItem = ACTIVITIES.find(a => a.id === selectedActivity);

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount < 0) return;

    const co2e = parseFloat(amount) * activeItem.factor;
    const newLog = {
      id: Date.now(),
      activityId: activeItem.id,
      category: activeItem.category,
      quantity: parseFloat(amount),
      unit: activeItem.unit,
      co2e,
      date
    };

    setLogs([newLog, ...logs]);
    setAmount('');
  };

  const handleSaveTarget = () => {
    if (targetInput && !isNaN(targetInput)) setDailyTarget(parseFloat(targetInput));
  };

  const handleClearTarget = () => {
    setTargetInput(4);
    setDailyTarget(4);
  };

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Log an activity</h1>
          <p className="text-slate-500 dark:text-slate-400">Record the things you do — we convert them to CO2e using documented emission factors.</p>
        </div>
        <button onClick={() => setLogs([])} className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium text-red-500 bg-red-500/10 hover:bg-red-500/20 transition-colors">
          <Trash2 className="w-4 h-4" /> Clear all
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <Card className="lg:col-span-2">
          <form onSubmit={handleAddLog}>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Activity</label>
              <select 
                value={selectedActivity} 
                onChange={(e) => setSelectedActivity(e.target.value)}
                className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:border-indigo-500 dark:focus:border-indigo-500 transition-colors"
              >
                {ACTIVITIES.map(a => (
                  <option key={a.id} value={a.id}>{a.label} ({a.category})</option>
                ))}
              </select>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">{activeItem.desc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-sm font-semibold mb-2">Amount ({activeItem.unit})</label>
                <input 
                  type="number" step="0.1" min="0" required 
                  value={amount} onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 12"
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2">Date</label>
                <input 
                  type="date" required 
                  max={today}
                  value={date} onChange={(e) => setDate(e.target.value)}
                  style={{ colorScheme: isDark ? 'dark' : 'light' }}
                  className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-500">
                {amount ? `Preview: ${(amount * activeItem.factor).toFixed(2)} kg CO2e` : 'Enter an amount to preview'}
              </span>
              <button type="submit" className="px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-medium rounded-lg text-sm transition-colors flex items-center gap-2">
                <PlusCircle className="w-4 h-4" /> Add to log
              </button>
            </div>
          </form>
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-2">
             <TargetIcon className="w-5 h-5 text-indigo-500" />
             <h3 className="font-bold">Daily target</h3>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">Set a goal to track against.</p>

          <label className="block text-sm font-semibold mb-2">Target (kg CO2e per day)</label>
          <input 
            type="number" step="0.1" min="0.1"
            value={targetInput} onChange={(e) => setTargetInput(e.target.value)}
            className="w-full p-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 rounded-lg text-sm outline-none mb-2"
          />
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Climate-friendly target ≈ 5.48 kg/day</p>

          <div className="flex gap-3">
             <button onClick={handleSaveTarget} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg text-sm font-medium transition-colors">Save goal</button>
             <button onClick={handleClearTarget} className="px-4 py-2 bg-transparent hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-sm font-medium transition-colors">Clear</button>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-2 mb-1">
          <LayoutDashboard className="w-5 h-5 text-slate-400" />
          <h3 className="font-bold text-lg">History</h3>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{logs.length} logged activities.</p>

        <div className="space-y-2">
          {logs.map(log => {
             const activityInfo = ACTIVITIES.find(a => a.id === log.activityId) || ACTIVITIES[0];
             const Icon = activityInfo.icon;
             return (
              <div key={log.id} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group">
                <div className="flex items-center gap-4">
                  <div className={`p-2.5 rounded-lg bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">{activityInfo.label}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{log.quantity} {log.unit} • {log.category} • {log.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-bold text-lg">{log.co2e.toFixed(1)} kg</span>
                  <button onClick={() => setLogs(logs.filter(l => l.id !== log.id))} className="p-2 text-slate-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
             )
          })}
        </div>
      </Card>
    </div>
  );
}