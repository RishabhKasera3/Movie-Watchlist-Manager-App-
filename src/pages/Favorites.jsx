import React from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import toast from 'react-hot-toast';

export function Favorites() {
  const { movies, setMovies } = useOutletContext();
  const navigate = useNavigate();

  const favoriteMovies = movies.filter(m => m.isFavorite);

  const handleToggleFavorite = (id) => {
    setMovies(prev => prev.map(m => 
      m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
    ));
    toast.success('Removed from favorites.');
  };

  const handleToggleWatched = (id) => {
    setMovies(prev => prev.map(m => 
      m.id === id ? { ...m, isWatched: !m.isWatched } : m
    ));
    const movie = movies.find(m => m.id === id);
    if (!movie.isWatched) {
      toast.success('Marked as watched!');
    }
  };

  const handleDelete = (id) => {
    setMovies(prev => prev.filter(m => m.id !== id));
    toast.success('Movie deleted.');
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white flex items-center gap-3">
            Favorites
            <span className="text-sm font-medium px-3 py-1 bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 rounded-full">
              {favoriteMovies.length}
            </span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Your most loved movies</p>
        </div>
      </div>

      {favoriteMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {favoriteMovies.map((movie) => (
            <MovieCard 
              key={movie.id} 
              movie={movie}
              onToggleFavorite={handleToggleFavorite}
              onToggleWatched={handleToggleWatched}
              onDelete={handleDelete}
            />
          ))}
        </div>
      ) : (
        <div className="card p-12 flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 mb-6 rounded-full bg-red-50 dark:bg-red-500/10 flex items-center justify-center">
            <Heart className="w-12 h-12 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No favorites yet</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            You haven't marked any movies as favorite yet. Go to your movies collection and click the heart icon!
          </p>
          <button onClick={() => navigate('/movies')} className="btn-primary">
            Browse Movies
          </button>
        </div>
      )}
    </div>
  );
}
