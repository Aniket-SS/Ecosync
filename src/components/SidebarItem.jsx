import React from 'react';

export default function SidebarItem({ icon: Icon, label, isActive, onClick, isLink }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
        isActive 
          ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
          : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4" />
        {label}
      </div>
      {isLink && <Icon className="w-3.5 h-3.5 opacity-50" />}
    </button>
  );
}