import React from 'react';

export function DashboardCard({ title, value, icon: Icon, bgClass, subtitle }) {
  return (
    <div className={`rounded-xl p-5 border border-themeBorder relative overflow-hidden group ${bgClass}`}>
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex items-start gap-4">
        <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center shrink-0 shadow-inner backdrop-blur-sm">
          <Icon className="w-7 h-7 text-white" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-white/90 truncate">{title}</h3>
          <p className="text-3xl font-bold text-white mt-0.5 tracking-tight">{value}</p>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-white/20 relative z-10">
        <p className="text-xs text-white/80 truncate">{subtitle}</p>
      </div>
    </div>
  );
}
