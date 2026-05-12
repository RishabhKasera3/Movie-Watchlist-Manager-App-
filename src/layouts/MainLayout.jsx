import React, { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';
import { Search, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function MainLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/movies': return 'Movies';
      case '/favorites': return 'Favorites';
      default: return 'Dashboard';
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-themeBg text-themeText">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 px-8 flex items-center justify-between shrink-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{getPageTitle()}</h1>
            <p className="text-themeTextMuted text-sm mt-0.5">Welcome back, Movie Lover! 🎬</p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="relative hidden md:block w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-themeTextMuted" />
              </div>
              <input
                type="text"
                placeholder="Search movies..."
                className="w-full pl-9 pr-4 py-2 bg-themeCard border border-themeBorder rounded-full text-sm focus:outline-none focus:border-primary transition-colors text-themeText"
              />
            </div>
            
            <button
              onClick={toggleTheme}
              className="text-themeTextMuted hover:text-themeText transition-colors"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center font-bold shadow-md cursor-pointer overflow-hidden border-2 border-cardBg">
              <img src="https://ui-avatars.com/api/?name=User&background=random" alt="User" />
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-y-auto px-8 pb-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
