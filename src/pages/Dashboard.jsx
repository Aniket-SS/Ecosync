import React from 'react';
import { Cloud, Gauge, Target, ArrowUpRight, Car, Zap, Utensils, ShoppingBag } from 'lucide-react';
import Card from '../components/Card';
import { BENCHMARKS, ACTIVITIES } from '../data/constants';

export default function Dashboard({ logs, dailyAverage, dailyTarget, totalEmissions, globalAvgComparison }) {
  const getCategoryTotal = (catName) => logs.filter(l => l.category === catName).reduce((sum, l) => sum + l.co2e, 0);
  
  const categories = [
    { name: 'Transport', icon: Car, color: 'bg-sky-500', total: getCategoryTotal('Transport') },
    { name: 'Home energy', icon: Zap, color: 'bg-amber-500', total: getCategoryTotal('Home energy') },
    { name: 'Diet', icon: Utensils, color: 'bg-emerald-500', total: getCategoryTotal('Diet') },
    { name: 'Shopping', icon: ShoppingBag, color: 'bg-purple-500', total: getCategoryTotal('Shopping') }
  ];

  const goalPercentage = Math.min((dailyAverage / dailyTarget) * 100, 100) || 0;

  // Aggregate logs by date for the bar chart
  const emissionsByDate = logs.reduce((acc, log) => {
    acc[log.date] = (acc[log.date] || 0) + log.co2e;
    return acc;
  }, {});
  
  const sortedDates = Object.keys(emissionsByDate).sort((a,b) => new Date(a) - new Date(b));
  const chartData = sortedDates.map(date => ({ date, value: emissionsByDate[date] }));
  const maxEmission = chartData.length ? Math.max(...chartData.map(d => d.value)) : 1;

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Total logged</h3>
            <Cloud className="w-4 h-4 text-slate-400 dark:text-slate-600" />
          </div>
          <div className="mb-1">
            <span className="text-4xl font-bold">{totalEmissions.toFixed(1)}</span>
            <span className="text-lg text-slate-500 dark:text-slate-400 ml-1">kg <span className="text-sm">CO2e</span></span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500">Across {logs.length} activities</p>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Daily average</h3>
            <Gauge className="w-4 h-4 text-slate-400 dark:text-slate-600" />
          </div>
          <div className="mb-1">
            <span className="text-4xl font-bold">{dailyAverage.toFixed(1)}</span>
            <span className="text-lg text-slate-500 dark:text-slate-400 ml-1">kg <span className="text-sm">CO2e</span></span>
          </div>
          <p className={`text-sm ${dailyAverage <= BENCHMARKS.GLOBAL_AVG_DAILY ? 'text-indigo-500' : 'text-red-500'}`}>
            {dailyAverage <= BENCHMARKS.GLOBAL_AVG_DAILY ? '↓' : '↑'} {globalAvgComparison}% vs. global average
          </p>
        </Card>

        <Card>
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-sm font-medium text-slate-500 dark:text-slate-400">Sustainable target</h3>
            <Target className="w-4 h-4 text-slate-400 dark:text-slate-600" />
          </div>
          <div className="mb-1">
            <span className="text-4xl font-bold">{dailyTarget}</span>
            <span className="text-lg text-slate-500 dark:text-slate-400 ml-1">kg/day</span>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-500">
            {dailyAverage <= dailyTarget ? "You're on track" : "Over target"}
          </p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2 flex flex-col">
          <h3 className="text-lg font-bold mb-1">Daily emissions</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Your logged footprint over time.</p>
          
          <div className="flex-1 flex items-center justify-center border-b border-slate-100 dark:border-slate-800 pb-4 relative w-full pt-4">
             {chartData.length === 0 ? (
               <p className="text-sm text-slate-500">Log activities to see your chart.</p>
             ) : (
               <div className="w-full h-40 flex items-end justify-around gap-2 mt-4">
                 {chartData.map((d, i) => {
                   // Ensure the bar has at least a tiny bit of height so it's visible
                   const heightPct = Math.max((d.value / maxEmission) * 100, 2);
                   return (
                     <div key={i} className="relative flex flex-col items-center flex-1 group h-full justify-end">
                       {/* Hover Tooltip */}
                       <div className="absolute -top-10 bg-slate-800 dark:bg-white dark:text-slate-900 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none shadow-lg">
                         <span className="font-bold">{d.value.toFixed(1)} kg</span>
                         <span className="block text-[10px] opacity-80">{d.date}</span>
                       </div>
                       
                       {/* Bar */}
                       <div 
                         className="w-full max-w-[40px] bg-indigo-500 dark:bg-indigo-400 rounded-t-md transition-all duration-500 hover:bg-indigo-400 dark:hover:bg-indigo-300"
                         style={{ height: `${heightPct}%` }}
                       ></div>
                     </div>
                   );
                 })}
               </div>
             )}
          </div>
        </Card>

        <Card className="flex flex-col items-center justify-center text-center">
          <div className="w-full text-left mb-4">
            <h3 className="text-lg font-bold mb-1">Goal progress</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Daily average vs. target.</p>
          </div>
          
          <div className="relative w-40 h-40 flex items-center justify-center mb-4">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path className="text-slate-100 dark:text-slate-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" />
              <path className="text-indigo-500 transition-all duration-1000 ease-out" strokeDasharray={`${goalPercentage}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-2xl font-bold">{goalPercentage.toFixed(0)}%</span>
              <span className="text-xs text-slate-500 dark:text-slate-400">of target</span>
            </div>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">{dailyAverage.toFixed(1)} kg of {dailyTarget} kg/day</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h3 className="text-lg font-bold mb-1">By category</h3>
          <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">Where your emissions come from.</p>
          
          <div className="space-y-4">
            {categories.map((cat, i) => {
              const pct = totalEmissions === 0 ? 0 : (cat.total / totalEmissions) * 100;
              return (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-32 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                    <cat.icon className="w-4 h-4 opacity-70" /> {cat.name}
                  </div>
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full ${cat.color} rounded-full`} style={{ width: `${pct}%` }}></div>
                  </div>
                  <div className="w-20 text-right">
                    <span className="font-bold text-sm">{cat.total.toFixed(1)} kg</span>
                    <span className="text-xs text-slate-400 ml-2">{pct.toFixed(0)}%</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card>
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-bold mb-1">Recent activity</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400">Your latest entries.</p>
            </div>
          </div>

          <div className="space-y-3">
            {logs.length === 0 ? (
              <p className="text-sm text-slate-500">No recent activity.</p>
            ) : (
              logs.slice(0, 4).map(log => {
                const activityInfo = ACTIVITIES.find(a => a.id === log.activityId) || ACTIVITIES[0];
                const Icon = activityInfo.icon;
                return (
                  <div key={log.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-md bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-800 dark:text-slate-200">{activityInfo.label}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{log.quantity} {log.unit} • {log.category} • {log.date}</p>
                      </div>
                    </div>
                    <span className="font-bold text-sm">{log.co2e.toFixed(1)} kg</span>
                  </div>
                );
              })
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}