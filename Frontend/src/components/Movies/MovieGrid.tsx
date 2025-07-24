import React from 'react';
import { MovieCard } from './MovieCard';
import { Movie } from '../../types/movie';

interface MovieGridProps {
  movies: Movie[];
  title?: string;
  onAddToWatchlist?: (movieId: number) => void;
  onAddToFavorites?: (movieId: number) => void;
  onRemoveFromWatchlist?: (movieId: number) => void;
  onRemoveFromFavorites?: (movieId: number) => void;
  watchlistMovieIds?: number[];
  favoriteMovieIds?: number[];
  onMovieClick?: (movie: Movie) => void;
  onEditMovie?: (movie: Movie) => void;
  onDeleteMovie?: (movieId: number) => void;
  isLoading?: boolean;
  showActions?: boolean;
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  title,
  onAddToWatchlist,
  onAddToFavorites,
  onRemoveFromWatchlist,
  onRemoveFromFavorites,
  watchlistMovieIds = [],
  favoriteMovieIds = [],
  onMovieClick,
  onEditMovie,
  onDeleteMovie,
  isLoading = false,
  showActions = true,
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 bg-gray-900/80 p-4 rounded-2xl shadow-xl">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-800 aspect-[2/3] rounded-xl mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-3 bg-gray-800 rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-12 bg-gray-900/80 rounded-2xl shadow-lg">
        <div className="text-gray-400 text-lg">No movies found</div>
        {title && title.toLowerCase().includes('recommend') && (
          <p className="text-gray-500 mt-2">
            There are currently no recommended movies. Please check back later!
          </p>
        )}
        {title && !title.toLowerCase().includes('recommend') && (
          <p className="text-gray-500 mt-2">
            {title.includes('Search') ? 'Try adjusting your search terms' : 'Start adding movies to see them here'}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && <h2 className="text-2xl font-bold text-white">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 bg-black p-4 rounded-2xl shadow-xl">
        {movies.map((movie) => (
          <MovieCard
            key={movie.movieId}
            movie={movie}
            onAddToWatchlist={onAddToWatchlist}
            onAddToFavorites={onAddToFavorites}
            onRemoveFromWatchlist={onRemoveFromWatchlist}
            onRemoveFromFavorites={onRemoveFromFavorites}
            isInWatchlist={watchlistMovieIds.includes(movie.movieId)}
            isInFavorites={favoriteMovieIds.includes(movie.movieId)}
            onClick={onMovieClick}
            onDelete={onDeleteMovie}
            showActions={showActions}
          />
        ))}
      </div>
    </div>
  );
};