import React from 'react';
import { Star, Calendar, Trash2, CheckCircle, Circle } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';
import clsx from 'clsx';

export function MovieCard({ movie, onToggleFavorite, onToggleWatched, onDelete }) {
  return (
    <div className={clsx(
      "card relative group overflow-hidden border-2 transition-all duration-300",
      movie.isWatched 
        ? "border-green-500/20 dark:border-green-500/20 opacity-80" 
        : "border-transparent hover:-translate-y-1"
    )}>
      {/* Decorative gradient blur */}
      <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative z-10 p-5 flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1 pr-2">
            <h3 className="text-xl font-bold text-gray-800 dark:text-white line-clamp-1" title={movie.name}>
              {movie.name}
            </h3>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-300">
              {movie.genre}
            </span>
          </div>
          <FavoriteButton 
            isFavorite={movie.isFavorite} 
            onClick={() => onToggleFavorite(movie.id)} 
          />
        </div>
        
        <div className="flex flex-col gap-2 mt-auto mb-4 text-sm text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{movie.year}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-medium text-gray-800 dark:text-gray-200">{movie.rating} / 10</span>
          </div>
        </div>
        
        <div className="pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between gap-2">
          <button
            onClick={() => onToggleWatched(movie.id)}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors",
              movie.isWatched
                ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/30"
                : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            )}
          >
            {movie.isWatched ? (
              <><CheckCircle className="w-4 h-4" /> Watched</>
            ) : (
              <><Circle className="w-4 h-4" /> Unwatched</>
            )}
          </button>
          
          <button
            onClick={() => onDelete(movie.id)}
            className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
            title="Delete Movie"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
