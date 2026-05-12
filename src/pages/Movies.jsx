import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { MovieCard } from '../components/MovieCard';
import { Modal } from '../components/Modal';
import { MovieForm } from '../components/MovieForm';
import { SearchBar } from '../components/SearchBar';
import toast from 'react-hot-toast';

export function Movies() {
  const { movies, setMovies } = useOutletContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  const handleAddMovie = (newMovie) => {
    const movie = {
      ...newMovie,
      id: Date.now().toString(),
      isWatched: false,
      isFavorite: false,
      addedAt: Date.now(),
    };
    setMovies(prev => [...prev, movie]);
    setIsModalOpen(false);
    toast.success('Movie added successfully!');
  };

  const handleToggleFavorite = (id) => {
    setMovies(prev => prev.map(m => 
      m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
    ));
    const movie = movies.find(m => m.id === id);
    if (!movie.isFavorite) {
      toast.success('Added to favorites!');
    } else {
      toast.success('Removed from favorites.');
    }
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

  const filteredMovies = useMemo(() => {
    let result = movies.filter(m => 
      m.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (filter === 'Watched') result = result.filter(m => m.isWatched);
    if (filter === 'Unwatched') result = result.filter(m => !m.isWatched);
    if (filter === 'Favorites') result = result.filter(m => m.isFavorite);

    result.sort((a, b) => {
      if (sortBy === 'Newest') return b.addedAt - a.addedAt;
      if (sortBy === 'Rating') return b.rating - a.rating;
      if (sortBy === 'Year') return b.year - a.year;
      return 0;
    });

    return result;
  }, [movies, searchQuery, filter, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Movies</h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">Manage your movie collection</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="btn-primary whitespace-nowrap w-full md:w-auto"
        >
          <Plus size={20} />
          Add Movie
        </button>
      </div>

      <div className="card p-4 flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar value={searchQuery} onChange={setSearchQuery} />
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="input-field min-w-[120px]"
          >
            <option value="All">All Movies</option>
            <option value="Watched">Watched</option>
            <option value="Unwatched">Unwatched</option>
            <option value="Favorites">Favorites</option>
          </select>
          
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field min-w-[140px]"
          >
            <option value="Newest">Sort by: Newest</option>
            <option value="Rating">Sort by: Rating</option>
            <option value="Year">Sort by: Year</option>
          </select>
        </div>
      </div>

      {filteredMovies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMovies.map((movie) => (
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
          <div className="w-24 h-24 mb-6 rounded-full bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
            <Plus className="w-12 h-12 text-indigo-400" />
          </div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">No movies found</h3>
          <p className="text-gray-500 dark:text-gray-400 max-w-sm mb-6">
            {searchQuery || filter !== 'All' 
              ? "We couldn't find any movies matching your current filters."
              : "Your movie collection is empty. Start by adding your first movie!"}
          </p>
          {!searchQuery && filter === 'All' && (
            <button onClick={() => setIsModalOpen(true)} className="btn-primary">
              Add Your First Movie
            </button>
          )}
        </div>
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Movie">
        <MovieForm 
          onSubmit={handleAddMovie} 
          onCancel={() => setIsModalOpen(false)} 
        />
      </Modal>
    </div>
  );
}
