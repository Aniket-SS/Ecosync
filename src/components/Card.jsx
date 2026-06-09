import React from 'react';

export default function Card({ children, className = "" }) {
  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}