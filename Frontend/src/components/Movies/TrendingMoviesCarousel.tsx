import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Calendar, Clock, TrendingUp } from 'lucide-react';
import { useTrendingMovies, TrendingMovie } from '../../hooks/useTrendingMovies';

interface TrendingMoviesCarouselProps {
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

export const TrendingMoviesCarousel: React.FC<TrendingMoviesCarouselProps> = ({
  autoPlay = true,
  autoPlayInterval = 5000,
}) => {
  const { trendingMovies, loading, error } = useTrendingMovies();
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || trendingMovies.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === trendingMovies.length - 1 ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, trendingMovies.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? trendingMovies.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === trendingMovies.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  if (loading) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-xl flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-xl flex items-center justify-center">
        <p className="text-red-400">Failed to load trending movies</p>
      </div>
    );
  }

  if (trendingMovies.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-xl flex items-center justify-center">
        <p className="text-gray-400">No trending movies available</p>
      </div>
    );
  }

  const currentTrendingMovie = trendingMovies[currentIndex];
  const currentMovie = currentTrendingMovie.movie;

  if (!currentMovie) {
    return (
      <div className="w-full h-96 bg-gray-800 rounded-xl flex items-center justify-center">
        <p className="text-gray-400">Movie data not available</p>
      </div>
    );
  }

  return (
    <div className="w-full relative group">
      {/* Main Carousel Container */}
      <div className="relative w-full h-96 md:h-[500px] lg:h-[600px] overflow-hidden rounded-xl">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${currentMovie.imgUrl || '/public/background.jpg.jpg'})`,
          }}
        >
          {/* Movie Details Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 text-white">
            <div className="max-w-2xl">
              {/* Trending Score Badge */}
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5 text-yellow-400" />
                <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
                  Trending Score: {currentTrendingMovie.trendingScore?.toFixed(1) || 'N/A'}
                </span>
              </div>

              {/* Movie Title */}
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-4 text-shadow">
                {currentMovie.movieTitle}
              </h2>
              
              {/* Movie Info Row */}
              <div className="flex flex-wrap items-center gap-4 mb-4 text-sm md:text-base">
                {currentMovie.releaseYear && (
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{currentMovie.releaseYear}</span>
                  </div>
                )}
                
                {currentMovie.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{currentMovie.duration} min</span>
                  </div>
                )}
                
                {currentMovie.movieGenre && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span>{currentMovie.movieGenre}</span>
                  </div>
                )}

                {currentMovie.rating && (
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span>{currentMovie.rating}/10</span>
                  </div>
                )}
              </div>

              {/* Description */}
              {currentMovie.description && (
                <p className="text-gray-200 text-sm md:text-base mb-4 line-clamp-2">
                  {currentMovie.description}
                </p>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors duration-200">
                  <Star className="w-4 h-4" />
                  Add to Watchlist
                </button>
                
                <button className="flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-lg transition-colors duration-200 backdrop-blur-sm">
                  <Star className="w-4 h-4" />
                  Add to Favorites
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        {trendingMovies.length > 1 && (
          <>
            {/* Previous Button */}
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Next Button */}
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Dots Indicator */}
      {trendingMovies.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {trendingMovies.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentIndex 
                  ? 'bg-yellow-500 scale-110' 
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
            />
          ))}
        </div>
      )}

      {/* Progress Bar */}
      {autoPlay && trendingMovies.length > 1 && (
        <div className="w-full bg-gray-700 h-1 mt-4 rounded-full overflow-hidden">
          <div 
            className="bg-yellow-500 h-full transition-all duration-100 ease-linear"
            style={{
              width: `${((currentIndex + 1) / trendingMovies.length) * 100}%`
            }}
          />
        </div>
      )}
    </div>
  );
};

export default TrendingMoviesCarousel; 