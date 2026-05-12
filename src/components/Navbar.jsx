import React from 'react';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function Navbar({ setIsSidebarOpen }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 bg-white/80 dark:bg-[#1e293b]/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 sticky top-0 z-30 flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <Menu size={24} />
        </button>
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 lg:hidden">
          WatchManager
        </h2>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold text-sm shadow-md cursor-pointer hover:opacity-90 transition-opacity">
          U
        </div>
      </div>
    </header>
  );
}
