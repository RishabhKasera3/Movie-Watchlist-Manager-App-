import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Film, Heart, Clapperboard } from 'lucide-react';
import clsx from 'clsx';

const navItems = [
  { path: '/', name: 'Dashboard', icon: LayoutDashboard },
  { path: '/movies', name: 'Movies', icon: Film },
  { path: '/favorites', name: 'Favorites', icon: Heart },
];

export function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={clsx(
        "fixed top-0 left-0 z-50 h-screen w-64 bg-themeCard border-r border-themeBorder transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center h-20 px-6 shrink-0">
          <h1 className="text-lg font-bold text-themeText flex items-center gap-3">
            <Clapperboard className="text-primary w-7 h-7" />
            <span className="leading-tight">
              Movie & <br />
              <span className="text-pink-500 font-medium">Watchlist</span> Manager
            </span>
          </h1>
        </div>
        
        <nav className="px-4 py-6 space-y-2 flex-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) => clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium",
                isActive 
                  ? "bg-primary text-white shadow-lg shadow-primary/20" 
                  : "text-themeTextMuted hover:text-themeText hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              <item.icon size={20} />
              {item.name}
            </NavLink>
          ))}
        </nav>
        
        {/* Popcorn Illustration Area */}
        <div className="p-6 mt-auto shrink-0 flex flex-col items-center text-center">
          <div className="w-32 h-32 mb-4 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-themeCard z-10"></div>
            {/* Using an emoji/svg placeholder for the illustration */}
            <div className="text-6xl flex items-center justify-center h-full opacity-80 mix-blend-luminosity">🍿</div>
          </div>
          <p className="text-xs text-themeTextMuted italic max-w-[140px]">
            "Movies are the perfect escape."
          </p>
        </div>
      </aside>
    </>
  );
}
