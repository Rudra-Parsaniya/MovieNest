import React from 'react';
import { Compass, Calendar, Star, TrendingUp } from 'lucide-react';
import UpcomingMoviesCarousel from '../Movies/UpcomingMoviesCarousel';

interface ExplorePageProps {
  favoriteCount: number;
  watchlistCount: number;
  totalMovies: number;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  favoriteCount,
  watchlistCount,
  totalMovies,
}) => {
  return (
    <div className="min-h-screen container-dark section-padding flex flex-col gap-12 relative overflow-hidden">
      {/* Decorative Accent - Compass Icon */}
      <Compass className="absolute -top-10 -right-10 w-96 h-96 text-red-900/20 opacity-20 pointer-events-none select-none z-0 animate-pulse-subtle" />

      <div className="max-w-6xl mx-auto">
        {/* Header */}
        

        {/* Upcoming Movies Carousel */}
        <div className="mb-16 animate-fade-in animate-delay-300">
          <div className="flex items-center gap-3 mb-8">
            <Calendar className="w-8 h-8 text-red-500" />
            <h2 className="text-3xl font-bold text-gradient">Coming Soon</h2>
          </div>
          <UpcomingMoviesCarousel autoPlay={true} autoPlayInterval={6000} />
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-fade-in animate-delay-400 mb-16">
          <div className="card-dark rounded-xl p-6 animate-scale-in animate-delay-100 hover-glow">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-yellow-500 animate-pulse-subtle" />
              <div>
                <p className="text-gray-400 text-sm">Your Favorites</p>
                <p className="text-3xl font-bold text-gradient">{favoriteCount}</p>
              </div>
            </div>
          </div>

          <div className="card-dark rounded-xl p-6 animate-scale-in animate-delay-200 hover-glow">
            <div className="flex items-center space-x-3">
              <Calendar className="w-8 h-8 text-blue-500 animate-pulse-subtle" />
              <div>
                <p className="text-gray-400 text-sm">Watchlist</p>
                <p className="text-3xl font-bold text-gradient">{watchlistCount}</p>
              </div>
            </div>
          </div>

          <div className="card-dark rounded-xl p-6 animate-scale-in animate-delay-300 hover-glow">
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-8 h-8 text-green-500 animate-pulse-subtle" />
              <div>
                <p className="text-gray-400 text-sm">Total Movies</p>
                <p className="text-3xl font-bold text-gradient">{totalMovies}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-16 text-center animate-fade-in animate-delay-500">
          <h2 className="text-3xl font-bold text-gradient mb-8">Explore Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-dark rounded-xl p-8 animate-scale-in animate-delay-100 hover-glow">
              <Compass className="w-12 h-12 text-red-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gradient mb-4">Discover New Releases</h3>
              <p className="text-gray-400">
                Stay updated with the latest upcoming movies and their release dates
              </p>
            </div>
            <div className="card-dark rounded-xl p-8 animate-scale-in animate-delay-200 hover-glow">
              <TrendingUp className="w-12 h-12 text-purple-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gradient mb-4">Trending Content</h3>
              <p className="text-gray-400">
                Explore trending movies and see what's popular among users
              </p>
            </div>
            <div className="card-dark rounded-xl p-8 animate-scale-in animate-delay-300 hover-glow">
              <Star className="w-12 h-12 text-yellow-500 mb-4 mx-auto" />
              <h3 className="text-xl font-semibold text-gradient mb-4">Personalized Lists</h3>
              <p className="text-gray-400">
                Build your own collections with favorites and watchlist
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExplorePage; 