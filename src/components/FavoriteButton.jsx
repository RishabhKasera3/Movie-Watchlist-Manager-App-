import React from 'react';
import { Heart } from 'lucide-react';
import clsx from 'clsx';

export function FavoriteButton({ isFavorite, onClick, className }) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={clsx(
        "p-2 rounded-full transition-all duration-300 transform active:scale-75",
        isFavorite 
          ? "bg-red-100 text-red-500 hover:bg-red-200 dark:bg-red-500/20 dark:hover:bg-red-500/30" 
          : "bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-red-400 dark:bg-gray-800 dark:hover:bg-gray-700",
        className
      )}
      title={isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    >
      <Heart className={clsx("w-5 h-5 transition-transform", isFavorite && "fill-current scale-110")} />
    </button>
  );
}
