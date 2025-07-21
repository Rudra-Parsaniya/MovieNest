import React from 'react';
import { X, Star, Clock, Calendar, Heart, Bookmark } from 'lucide-react';
import { Movie } from '../types/movie';
import { useAuth } from '../contexts/AuthContext';

interface MovieModalProps {
  movie: Movie | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToWatchlist?: (movieId: number) => void;
  onAddToFavorites?: (movieId: number) => void;
  onRemoveFromWatchlist?: (movieId: number) => void;
  onRemoveFromFavorites?: (movieId: number) => void;
  isInWatchlist?: boolean;
  isInFavorites?: boolean;
}

export const MovieModal: React.FC<MovieModalProps> = ({
  movie,
  isOpen,
  onClose,
  onAddToWatchlist,
  onAddToFavorites,
  onRemoveFromWatchlist,
  onRemoveFromFavorites,
  isInWatchlist = false,
  isInFavorites = false,
}) => {
  const { isAuthenticated } = useAuth();

  if (!isOpen || !movie) return null;

  const handleWatchlistClick = () => {
    if (isInWatchlist && onRemoveFromWatchlist) {
      onRemoveFromWatchlist(movie.movieId);
    } else if (!isInWatchlist && onAddToWatchlist) {
      onAddToWatchlist(movie.movieId);
    }
  };

  const handleFavoritesClick = () => {
    if (isInFavorites && onRemoveFromFavorites) {
      onRemoveFromFavorites(movie.movieId);
    } else if (!isInFavorites && onAddToFavorites) {
      onAddToFavorites(movie.movieId);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden rounded-t-2xl">
            <img
              src={movie.imgUrl || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'}
              alt={movie.movieTitle}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            
            {/* Movie Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-white mb-4">{movie.movieTitle}</h1>
                  
                  <div className="flex items-center space-x-6 text-gray-300 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="font-medium">{movie.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-5 h-5" />
                      <span>{movie.releaseYear}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-5 h-5" />
                      <span>{movie.duration} min</span>
                    </div>
                    <span className="bg-gray-700 px-3 py-1 rounded-full text-sm">
                      {movie.movieGenre}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4">
                    {isAuthenticated && (
                      <>
                        <button
                          onClick={handleWatchlistClick}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            isInWatchlist
                              ? 'bg-blue-600 border-blue-600 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-blue-600 hover:text-blue-400'
                          }`}
                          title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        >
                          <Bookmark className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handleFavoritesClick}
                          className={`p-3 rounded-lg border-2 transition-colors ${
                            isInFavorites
                              ? 'bg-red-600 border-red-600 text-white'
                              : 'border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-400'
                          }`}
                          title={isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
                        >
                          <Heart className="w-5 h-5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-white mb-4">Overview</h2>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {movie.description}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Movie Details</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Genre:</span>
                      <span className="text-white">{movie.movieGenre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Release Year:</span>
                      <span className="text-white">{movie.releaseYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-white">{movie.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white">{movie.rating}/10</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};