import React from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { MainLayout } from './layouts/MainLayout';
import { Dashboard } from './pages/Dashboard';
import { Movies } from './pages/Movies';
import { Favorites } from './pages/Favorites';
import { useLocalStorage } from './hooks/useLocalStorage';

// A wrapper to provide context to the outlet
function OutletWrapper() {
  const [movies, setMovies] = useLocalStorage('movies', []);
  return <Outlet context={{ movies, setMovies }} />;
}

function App() {
  return (
    <BrowserRouter>
      <Toaster 
        position="bottom-right"
        toastOptions={{
          className: 'dark:bg-gray-800 dark:text-white',
          style: {
            borderRadius: '10px',
            background: 'var(--toast-bg)',
            color: 'var(--toast-color)',
          },
        }} 
      />
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route element={<OutletWrapper />}>
            <Route index element={<Dashboard />} />
            <Route path="movies" element={<Movies />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
