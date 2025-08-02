import React from 'react';
import { X, Star, Clock, Calendar, Heart, Bookmark } from 'lucide-react';
import { Movie } from '../../types/movie';
import { useAuth } from '../../contexts/AuthContext';

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
    <div className="fixed inset-0 bg-black/95 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="card-dark rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto animate-scale-in">
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-90"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Hero Section */}
          <div className="relative h-96 overflow-hidden rounded-t-2xl">
            <img
              src={movie.imgUrl || 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg'}
              alt={movie.movieTitle}
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-transparent" />
            
            {/* Movie Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 animate-slide-in-left animate-delay-200">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h1 className="text-5xl font-bold text-gradient mb-6 animate-fade-in">{movie.movieTitle}</h1>
                  
                  <div className="flex items-center space-x-6 text-gray-300 mb-6 animate-fade-in animate-delay-300">
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
                    <span className="glass-effect px-4 py-2 rounded-full text-sm font-semibold">
                      {movie.movieGenre}
                    </span>
                  </div>

                  <div className="flex items-center space-x-4 animate-fade-in animate-delay-400">
                    {isAuthenticated && (
                      <>
                        <button
                          onClick={handleWatchlistClick}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${
                            isInWatchlist
                              ? 'bg-blue-600 border-blue-600 text-white hover-glow'
                              : 'border-gray-600 text-gray-300 hover:border-blue-600 hover:text-blue-400 hover:bg-blue-600/20'
                          }`}
                          title={isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                        >
                          <Bookmark className="w-6 h-6" />
                        </button>
                        <button
                          onClick={handleFavoritesClick}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-110 ${
                            isInFavorites
                              ? 'bg-red-600 border-red-600 text-white hover-glow'
                              : 'border-gray-600 text-gray-300 hover:border-red-600 hover:text-red-400 hover:bg-red-600/20'
                          }`}
                          title={isInFavorites ? 'Remove from Favorites' : 'Add to Favorites'}
                        >
                          <Heart className="w-6 h-6" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Section */}
          <div className="p-8 animate-fade-in animate-delay-500">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gradient mb-6">Overview</h2>
                <p className="text-gray-300 text-xl leading-relaxed">
                  {movie.description}
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gradient mb-4">Movie Details</h3>
                  <div className="space-y-2 text-gray-300">
                    <div className="flex justify-between">
                      <span>Genre:</span>
                      <span className="text-gradient font-semibold">{movie.movieGenre}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Release Year:</span>
                      <span className="text-gradient font-semibold">{movie.releaseYear}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Duration:</span>
                      <span className="text-gradient font-semibold">{movie.duration} minutes</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Rating:</span>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gradient font-semibold">{movie.rating}/10</span>
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