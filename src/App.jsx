import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Leaf, LayoutDashboard, PlusCircle, Lightbulb, ArrowUpRight, Moon, Sun } from 'lucide-react';

import SidebarItem from './components/SidebarItem';
import Dashboard from './pages/Dashboard';
import LogActivity from './pages/LogActivity';
import Insights from './pages/Insights';
import Methodology from './pages/Methodology';
import About from './pages/About';
import Home from './pages/Home';
import { BENCHMARKS } from './data/constants';

// AppContent contains all the logic and hooks that require the Router context
function AppContent() {
  const [isDark, setIsDark] = useState(true);
  const [logs, setLogs] = useState([]);
  const [dailyTarget, setDailyTarget] = useState(4); 

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // CODE QUALITY FIX: Robust localStorage fetching to prevent JSON parse crashes
    try {
      const savedLogs = localStorage.getItem('ecosync_logs');
      if (savedLogs) setLogs(JSON.parse(savedLogs));
    } catch (error) {
      console.error("Failed to parse logs from local storage. Resetting.", error);
      localStorage.removeItem('ecosync_logs');
    }

    try {
      const savedTarget = localStorage.getItem('ecosync_target');
      if (savedTarget && !isNaN(parseFloat(savedTarget))) {
        setDailyTarget(parseFloat(savedTarget));
      }
    } catch (error) {
      console.error("Failed to parse target from local storage.", error);
    }

    try {
      const savedTheme = localStorage.getItem('ecosync_theme');
      if (savedTheme) setIsDark(savedTheme === 'dark');
    } catch (error) {
      console.error("Failed to parse theme from local storage.", error);
    }
  }, []);

  useEffect(() => {
    // CODE QUALITY FIX: Robust localStorage setting to handle QuotaExceeded errors
    try {
      localStorage.setItem('ecosync_logs', JSON.stringify(logs));
      localStorage.setItem('ecosync_target', dailyTarget.toString());
      localStorage.setItem('ecosync_theme', isDark ? 'dark' : 'light');
    } catch (error) {
      console.error("Failed to save data to local storage.", error);
    }
  }, [logs, dailyTarget, isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  // CODE QUALITY FIX: Wrapped in useMemo to prevent unnecessary recalculations
  const totalEmissions = useMemo(() => {
    return logs.reduce((sum, log) => sum + log.co2e, 0);
  }, [logs]);

  const uniqueDays = useMemo(() => {
    const dates = [...new Set(logs.map(l => l.date))];
    return dates.length || 1;
  }, [logs]);

  const dailyAverage = (totalEmissions / uniqueDays);
  const globalAvgComparison = ((dailyAverage / BENCHMARKS.GLOBAL_AVG_DAILY) * 100).toFixed(1);

  // Derive activeTab from the current URL route for styling
  const currentPath = location.pathname.replace('/', '');
  const activeTab = currentPath === '' ? 'home' : currentPath;

  // If the active tab is home, render the Home component without the sidebar wrapper
  if (activeTab === 'home') {
    return (
      <div className={`${isDark ? 'dark' : ''}`}>
        <Home 
          // Shim to allow Home.jsx to use router navigation without modification
          setActiveTab={(tab) => navigate(tab === 'home' ? '/' : `/${tab}`)} 
          isDark={isDark} 
          toggleTheme={toggleTheme} 
        />
      </div>
    );
  }

  return (
    <div className={`${isDark ? 'dark' : ''}`}>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex font-sans selection:bg-indigo-500/30 transition-colors duration-300">
        
        {/* Sidebar */}
        <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 flex flex-col fixed h-screen z-10 hidden md:flex">
          <div className="p-6 flex items-center justify-between">
            {/* PROBLEM ALIGNMENT FIX: Clicking logo redirects to home */}
            <button 
              className="flex items-center gap-3 cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1 -ml-1 text-left"
              onClick={() => navigate('/')}
              aria-label="Go to home page"
            >
              <div className="p-1.5 bg-indigo-500/10 rounded-lg text-indigo-500">
                <Leaf className="w-5 h-5" aria-hidden="true" />
              </div>
              <span className="font-bold text-lg tracking-tight">EcoSync</span>
            </button>
            <button onClick={toggleTheme} aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-900 rounded-full text-slate-500 dark:text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500">
              {isDark ? <Sun className="w-4 h-4" aria-hidden="true"/> : <Moon className="w-4 h-4" aria-hidden="true"/>}
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1 mt-4">
            <SidebarItem icon={LayoutDashboard} label="Dashboard" isActive={activeTab === 'dashboard'} onClick={() => navigate('/dashboard')} />
            <SidebarItem icon={PlusCircle} label="Log activity" isActive={activeTab === 'log'} onClick={() => navigate('/log')} />
            <SidebarItem icon={Lightbulb} label="Insights" isActive={activeTab === 'insights'} onClick={() => navigate('/insights')} />
          </nav>

          <div className="p-4 space-y-1 mb-4 border-t border-slate-200 dark:border-slate-800">
            <SidebarItem icon={ArrowUpRight} label="Methodology" isActive={activeTab === 'methodology'} onClick={() => navigate('/methodology')} isLink />
            <SidebarItem icon={ArrowUpRight} label="About" isActive={activeTab === 'about'} onClick={() => navigate('/about')} isLink />
          </div>
        </aside>

        {/* Mobile Header */}
        <div className="md:hidden fixed top-0 w-full bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 p-4 flex justify-between items-center z-20">
          <button 
            onClick={() => navigate('/')}
            aria-label="Go to home page"
            className="flex items-center gap-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded p-1"
          >
             <Leaf className="w-5 h-5 text-indigo-500" aria-hidden="true" />
             <span className="font-bold">EcoSync</span>
          </button>

          <div className="flex gap-2 items-center">
             <button 
               onClick={toggleTheme} 
               aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
               className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-500 dark:text-slate-400"
             >
               {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
             </button>

             <select 
               value={activeTab} 
               onChange={(e) => navigate(e.target.value === 'home' ? '/' : `/${e.target.value}`)} 
               aria-label="Mobile navigation menu"
               className="bg-transparent text-sm font-medium outline-none p-1 rounded focus:ring-2 focus:ring-indigo-500 dark:bg-slate-900"
             >
               <option value="dashboard" className="text-black dark:text-white">Dashboard</option>
               <option value="log" className="text-black dark:text-white">Log Activity</option>
               <option value="insights" className="text-black dark:text-white">Insights</option>
             </select>
          </div>
        </div>

        {/* Main Content Area Routing */}
        <main className="flex-1 md:ml-64 p-6 pt-24 md:pt-10 max-w-6xl mx-auto w-full">
          <Routes>
            <Route path="/dashboard" element={<Dashboard logs={logs} dailyAverage={dailyAverage} dailyTarget={dailyTarget} totalEmissions={totalEmissions} globalAvgComparison={globalAvgComparison} />} />
            <Route path="/log" element={<LogActivity logs={logs} setLogs={setLogs} dailyTarget={dailyTarget} setDailyTarget={setDailyTarget} isDark={isDark} />} />
            <Route path="/insights" element={<Insights logs={logs} dailyAverage={dailyAverage} dailyTarget={dailyTarget} />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/about" element={<About />} />
            {/* Catch-all fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>

      </div>
    </div>
  );
}

// Wrap the app in the Router Provider
export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}