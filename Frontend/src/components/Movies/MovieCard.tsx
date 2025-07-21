import React, { useState } from 'react';
import { Star, Plus, Check, Trash2 } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useAuth } from '../../contexts/AuthContext';

interface MovieCardProps {
  movie: Movie;
  onAddToWatchlist?: (movieId: number) => void;
  onAddToFavorites?: (movieId: number) => void;
  onRemoveFromWatchlist?: (movieId: number) => void;
  onRemoveFromFavorites?: (movieId: number) => void;
  isInWatchlist?: boolean;
  isInFavorites?: boolean;
  onClick?: (movie: Movie) => void;
  showActions?: boolean;
  onDelete?: (movieId: number) => void;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onAddToWatchlist,
  onAddToFavorites,
  onRemoveFromWatchlist,
  onRemoveFromFavorites,
  isInWatchlist = false,
  isInFavorites = false,
  onClick,
  showActions = true,
  onDelete,
}) => {
  // const { isAuthenticated } = useAuth();
  const [addedToWatchlist, setAddedToWatchlist] = useState(false);
  const [addedToFavorites, setAddedToFavorites] = useState(false);

  const handleWatchlistClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInWatchlist && onRemoveFromWatchlist) {
      await onRemoveFromWatchlist(movie.movieId);
    } else if (!isInWatchlist && onAddToWatchlist) {
      await onAddToWatchlist(movie.movieId);
      setAddedToWatchlist(true);
      setTimeout(() => setAddedToWatchlist(false), 1200);
    }
  };

  const handleFavoritesClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInFavorites && onRemoveFromFavorites) {
      await onRemoveFromFavorites(movie.movieId);
    } else if (!isInFavorites && onAddToFavorites) {
      await onAddToFavorites(movie.movieId);
      setAddedToFavorites(true);
      setTimeout(() => setAddedToFavorites(false), 1200);
    }
  };

  return (
    <div
      className="group relative bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
      onClick={() => onClick?.(movie)}
    >
      {/* Movie Poster */}
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.imgUrl || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'}
          alt={movie.movieTitle}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';
          }}
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
        {/* Delete Button (Favorites section only) */}
        {onDelete && (
          <button
            onClick={e => {
              e.stopPropagation();
              onDelete(movie.movieId);
            }}
            className="absolute top-2 right-2 flex items-center justify-center w-9 h-9 rounded-full bg-red-600 hover:bg-red-700 text-white shadow z-20 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            title="Remove from Favorites"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        )}
        {/* New Action Buttons - icons only */}
        {showActions && (
          <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
            <button
              onClick={handleWatchlistClick}
              className={`flex items-center justify-center w-9 h-9 rounded-full shadow transition-colors focus:outline-none ${
                isInWatchlist 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-800 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-400'
              }`}
              title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
              disabled={addedToWatchlist}
            >
              {addedToWatchlist || isInWatchlist ? <Check className="w-5 h-5 text-green-400" /> : <Plus className="w-5 h-5" />}
            </button>
            <button
              onClick={handleFavoritesClick}
              className={`flex items-center justify-center w-9 h-9 rounded-full shadow transition-colors focus:outline-none ${
                isInFavorites 
                  ? 'bg-yellow-600 text-white' 
                  : 'bg-gray-800 hover:bg-yellow-600 text-white focus:ring-2 focus:ring-yellow-400'
              }`}
              title={isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
              disabled={addedToFavorites}
            >
              {addedToFavorites || isInFavorites ? <Check className="w-5 h-5 text-green-400" /> : <Star className="w-5 h-5" />}
            </button>
          </div>
        )}
        {/* Rating Badge */}
        <div className="absolute top-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center space-x-1 z-10">
          <Star className="w-3 h-3 text-yellow-400 fill-current" />
          <span className="text-white text-xs font-medium">{movie.rating}</span>
        </div>
      </div>
      {/* Movie Info */}
      <div className="p-4">
        <h3 className="text-white font-semibold text-lg mb-2 line-clamp-2 group-hover:text-red-400 transition-colors">
          {movie.movieTitle}
        </h3>
        <div className="flex items-center justify-between text-gray-400 text-sm mb-2">
          <div className="flex items-center space-x-1">
            <span>{movie.releaseYear}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>{movie.duration} min</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
            {movie.movieGenre}
          </span>
        </div>
        <p className="text-gray-400 text-sm mt-2 line-clamp-2">
          {movie.description}
        </p>
      </div>
    </div>
  );
};