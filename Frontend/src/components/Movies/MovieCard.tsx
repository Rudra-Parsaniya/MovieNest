  import React, { useState } from 'react';
  import { Star, Plus, Check, Trash2, Edit } from 'lucide-react';
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
    onAddRecommended?: (movieId: number) => void;
    isRecommended?: boolean;
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
    onAddRecommended,
    isRecommended = false,
  }) => {
    const { user } = useAuth();
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

    // Color badge for genre
    const genreColor =
      movie.movieGenre.toLowerCase().includes('action') ? 'bg-blue-600' :
      movie.movieGenre.toLowerCase().includes('comedy') ? 'bg-yellow-600' :
      movie.movieGenre.toLowerCase().includes('drama') ? 'bg-purple-600' :
      movie.movieGenre.toLowerCase().includes('sci') ? 'bg-green-600' :
      'bg-gray-700';

    return (
      <div
        className="group relative card-red bg-black rounded-2xl overflow-hidden shadow-xl cursor-pointer transition-all duration-500 transform hover:scale-110 hover-glow animate-scale-in"
        onClick={() => onClick?.(movie)}
      >
        {/* Movie Poster */}
        <div className="relative aspect-[2/3] overflow-hidden">
          <img
            src={movie.imgUrl || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'}
            alt={movie.movieTitle}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-125"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';
            }}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none" />
          
          {/* Admin Action Buttons - Horizontal line on bottom right */}
          {!showActions && (
            <div className="absolute bottom-2 right-2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
              {/* Add to Recommended Button */}
              {user?.role === 'admin' && !isRecommended && onAddRecommended && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onAddRecommended(movie.movieId);
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/30"
                  title="Add to Recommended"
                >
                  <Star className="w-5 h-5" />
                </button>
              )}
              {/* Edit Button
              {onClick && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onClick(movie);
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/30"
                  title="Edit Movie"
                >
                  <Edit className="w-5 h-5" />
                </button>
              )} */}
              {/* Delete Button */}
              {onDelete && (
                <button
                  onClick={e => {
                    e.stopPropagation();
                    onDelete(movie.movieId);
                  }}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white shadow-lg backdrop-blur-md border border-white/20 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/30"
                  title="Delete Movie"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
            </div>
          )}
          
          {/* Regular Action Buttons - icons only (for non-admin sections) */}
          {showActions && (
            <div className="absolute top-2 right-2 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-500 z-20">
              <button
                onClick={handleWatchlistClick}
                className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none ${
                  isInWatchlist 
                    ? 'bg-blue-600 text-white hover-glow' 
                    : 'bg-gray-800/80 hover:bg-blue-600 text-white focus:ring-2 focus:ring-blue-400'
                }`}
                title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                disabled={addedToWatchlist}
              >
                {addedToWatchlist || isInWatchlist ? <Check className="w-5 h-5 text-green-400" /> : <Plus className="w-5 h-5" />}
              </button>
              <button
                onClick={handleFavoritesClick}
                className={`flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none ${
                  isInFavorites 
                    ? 'bg-red-600 text-white hover-glow' 
                    : 'bg-gray-800/80 hover:bg-red-600 text-white focus:ring-2 focus:ring-red-400'
                }`}
                title={isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
                disabled={addedToFavorites}
              >
                {addedToFavorites || isInFavorites ? <Check className="w-5 h-5 text-green-400" /> : <Star className="w-5 h-5" />}
              </button>
            </div>
          )}
          
          {/* Rating Badge */}
          <div className="absolute top-2 left-2 glass-effect rounded-lg px-3 py-1 flex items-center space-x-1 z-10 shadow-lg">
            <Star className="w-3 h-3 text-yellow-300 fill-current" />
            <span className="text-white text-sm font-bold">{movie.rating}</span>
          </div>
        </div>
        {/* Movie Info */}
        <div className="p-5 bg-gradient-to-t from-black to-black">
          <h3 className="text-white font-bold text-lg mb-3 line-clamp-2 group-hover:text-red-400 transition-all duration-300">
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
            <span className="glass-effect text-gray-200 px-3 py-1 rounded-lg text-xs font-bold shadow-lg">
              {movie.movieGenre}
            </span>
          </div>
          <p className="text-gray-400 text-sm mt-3 line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
            {movie.description}
          </p>
        </div>
      </div>
    );
  };