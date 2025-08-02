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
  onAddRecommended?: (movieId: number) => void;
  recommendedMovieIds?: number[];
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
  onAddRecommended,
  recommendedMovieIds = [],
}) => {
  if (isLoading) {
    return (
      <div className="space-y-6">
        {title && <h2 className="text-3xl font-bold text-gradient animate-fade-in">{title}</h2>}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 card-dark p-6 rounded-2xl">
          {Array.from({ length: 12 }).map((_, index) => (
            <div key={index} className="animate-pulse animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="shimmer aspect-[2/3] rounded-xl mb-4"></div>
              <div className="space-y-2">
                <div className="h-4 shimmer rounded w-3/4"></div>
                <div className="h-3 shimmer rounded w-1/2"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-16 card-dark rounded-2xl animate-fade-in">
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
    <div className="space-y-8 animate-fade-in">
      {title && <h2 className="text-3xl font-bold text-gradient animate-slide-in-left">{title}</h2>}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-8 container-dark p-6 rounded-2xl">
        {movies.map((movie, index) => (
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
            onAddRecommended={onAddRecommended}
            isRecommended={recommendedMovieIds.includes(movie.movieId)}
            style={{ animationDelay: `${index * 0.05}s` }}
          />
        ))}
      </div>
    </div>
  );
};