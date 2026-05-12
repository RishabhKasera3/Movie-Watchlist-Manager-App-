import React, { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Clapperboard, CheckCircle, Eye, Heart, Search, Trash2, Star, Plus } from 'lucide-react';
import { DashboardCard } from '../components/DashboardCard';
import clsx from 'clsx';
import toast from 'react-hot-toast';

const GENRES = [
  'Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Sci-Fi', 'Horror', 'Romance', 
  'Thriller', 'Documentary', 'Animation', 'Other'
];

export function Dashboard() {
  const { movies, setMovies } = useOutletContext();
  
  // Local state for Add Movie Form
  const [formData, setFormData] = useState({
    name: '',
    genre: '',
    year: '',
    rating: '',
    status: 'Unwatched'
  });

  // Local state for movie list
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('All');

  // Stats
  const totalMovies = movies.length;
  const watchedMovies = movies.filter(m => m.isWatched).length;
  const unwatchedMovies = totalMovies - watchedMovies;
  const favoriteMovies = movies.filter(m => m.isFavorite).length;

  const stats = [
    { title: 'Total Movies', value: totalMovies, subtitle: 'All movies in collection', icon: Clapperboard, bgClass: 'bg-stat1' },
    { title: 'Watched Movies', value: watchedMovies, subtitle: 'Movies you have watched', icon: CheckCircle, bgClass: 'bg-stat2' },
    { title: 'Unwatched Movies', value: unwatchedMovies, subtitle: 'Movies remaining', icon: Eye, bgClass: 'bg-stat3' },
    { title: 'Favorite Movies', value: favoriteMovies, subtitle: 'Your favorite movies', icon: Heart, bgClass: 'bg-stat4' },
  ];

  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.genre || !formData.year || !formData.rating) {
      toast.error('Please fill all fields');
      return;
    }

    const movie = {
      ...formData,
      id: Date.now().toString(),
      isWatched: formData.status === 'Watched',
      isFavorite: false,
      addedAt: Date.now(),
      year: parseInt(formData.year),
      rating: parseFloat(formData.rating)
    };
    
    setMovies(prev => [...prev, movie]);
    setFormData({ name: '', genre: '', year: '', rating: '', status: 'Unwatched' });
    toast.success('Movie added successfully!');
  };

  const handleToggleFavorite = (id) => {
    setMovies(prev => prev.map(m => 
      m.id === id ? { ...m, isFavorite: !m.isFavorite } : m
    ));
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
    return result.sort((a, b) => b.addedAt - a.addedAt);
  }, [movies, searchQuery, filter]);

  const generatePlaceholderPoster = (title) => {
    const encoded = encodeURIComponent(title.charAt(0));
    return `https://ui-avatars.com/api/?name=${encoded}&background=202f66&color=fff&size=150&font-size=0.5`;
  };

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <DashboardCard key={stat.title} {...stat} />
        ))}
      </div>
      
      {/* Main Content Layout */}
      <div className="flex flex-col xl:flex-row gap-6">
        
        {/* Left Area: All Movies */}
        <div className="flex-1 card p-6 flex flex-col">
          {/* Header & Filters */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Clapperboard className="text-primary w-6 h-6" />
              All Movies
            </h2>
            
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex bg-themeBg rounded-full p-1 border border-themeBorder">
                {['All', 'Watched', 'Unwatched', 'Favorites'].map(f => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={clsx(
                      "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                      filter === f ? "bg-primary text-white" : "text-themeTextMuted hover:text-themeText"
                    )}
                  >
                    {f}
                  </button>
                ))}
              </div>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Search movies..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 bg-themeBg border border-themeBorder rounded-full text-sm w-48 focus:outline-none focus:border-primary text-themeText"
                />
              </div>
            </div>
          </div>
          
          {/* Movie List */}
          <div className="space-y-3 flex-1 overflow-y-auto pr-2 custom-scrollbar">
            {filteredMovies.length > 0 ? filteredMovies.map(movie => (
              <div key={movie.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-themeBorder transition-all group">
                <img 
                  src={movie.posterUrl || generatePlaceholderPoster(movie.name)} 
                  alt={movie.name} 
                  className="w-12 h-16 object-cover rounded-md shadow-md bg-gray-200 dark:bg-gray-800 shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-themeText truncate">{movie.name}</h3>
                  <p className="text-xs text-primary truncate mt-0.5">{movie.genre}</p>
                  <p className="text-xs text-themeTextMuted mt-1">{movie.year}</p>
                </div>
                
                <div className="flex items-center gap-6 shrink-0">
                  <div className="flex items-center gap-1.5 w-16">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="font-bold text-sm">{movie.rating.toFixed(1)}</span>
                  </div>
                  
                  <div className="w-24 flex justify-center">
                    <span className={clsx(
                      "px-3 py-1 rounded-full text-xs font-semibold",
                      movie.isWatched 
                        ? "bg-green-500/10 text-green-500" 
                        : "bg-amber-500/10 text-amber-500"
                    )}>
                      {movie.isWatched ? 'Watched' : 'Unwatched'}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3 w-16 justify-end">
                    <button 
                      onClick={() => handleToggleFavorite(movie.id)}
                      className="text-gray-500 hover:text-red-500 transition-colors focus:outline-none"
                    >
                      <Heart className={clsx("w-5 h-5", movie.isFavorite && "fill-red-500 text-red-500")} />
                    </button>
                    <button 
                      onClick={() => handleDelete(movie.id)}
                      className="text-gray-500 hover:text-gray-300 transition-colors focus:outline-none opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            )) : (
              <div className="h-full flex flex-col items-center justify-center text-gray-500 py-12">
                <Clapperboard className="w-12 h-12 mb-3 opacity-20" />
                <p>No movies found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Area: Add Movie Form */}
        <div className="w-full xl:w-80 card p-6 shrink-0 flex flex-col h-fit">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-6">
            <Clapperboard className="text-primary w-6 h-6" />
            Add New Movie
          </h2>
          
          <form onSubmit={handleAddMovie} className="space-y-4">
            <div>
              <label className="label-text">Movie Name</label>
              <input 
                type="text" 
                placeholder="Enter movie name" 
                className="input-field"
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div>
              <label className="label-text">Genre</label>
              <select 
                className="input-field appearance-none"
                value={formData.genre}
                onChange={e => setFormData({...formData, genre: e.target.value})}
              >
                <option value="" disabled>Select genre</option>
                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            
            <div>
              <label className="label-text">Release Year</label>
              <input 
                type="number" 
                placeholder="Enter year" 
                className="input-field"
                value={formData.year}
                onChange={e => setFormData({...formData, year: e.target.value})}
              />
            </div>
            
            <div>
              <label className="label-text">Rating (0 - 10)</label>
              <input 
                type="number" 
                step="0.1" 
                placeholder="Enter rating" 
                className="input-field"
                value={formData.rating}
                onChange={e => setFormData({...formData, rating: e.target.value})}
              />
            </div>
            
            <div>
              <label className="label-text">Watch Status</label>
              <select 
                className="input-field appearance-none"
                value={formData.status}
                onChange={e => setFormData({...formData, status: e.target.value})}
              >
                <option value="Unwatched">Unwatched</option>
                <option value="Watched">Watched</option>
              </select>
            </div>
            
            <button type="submit" className="btn-primary w-full mt-2 py-3">
              <Plus className="w-5 h-5" />
              Add Movie
            </button>
          </form>
        </div>
        
      </div>
    </div>
  );
}
