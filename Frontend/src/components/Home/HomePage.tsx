import React from 'react';
import { Film, Star, Bookmark, Users, WifiOff } from 'lucide-react';

interface HomePageProps {
  favoriteCount: number;
  watchlistCount: number;
  totalMovies: number;
  totalUsers: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  favoriteCount,
  watchlistCount,
  totalMovies,
  totalUsers,

}) => {

  return (
    <div className="min-h-screen bg-black py-10 px-2 md:px-8 lg:px-16 flex flex-col gap-12 relative overflow-hidden">
      {/* Decorative Accent - Watermark Icon */}
      <Film className="absolute -top-10 -right-10 w-96 h-96 text-red-900 opacity-10 pointer-events-none select-none z-0" />


      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-4">Welcome to MovieNest</h1>
          <p className="text-gray-400 text-lg">
            Discover, track, and manage your favorite movies
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center space-x-3">
              <Film className="w-8 h-8 text-red-500" />
              <div>
                <p className="text-gray-400 text-sm">Total Movies</p>
                <p className="text-2xl font-bold text-white">{totalMovies}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center space-x-3">
              <Star className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-gray-400 text-sm">Your Favorites</p>
                <p className="text-2xl font-bold text-white">{favoriteCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center space-x-3">
              <Bookmark className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-gray-400 text-sm">Watchlist</p>
                <p className="text-2xl font-bold text-white">{watchlistCount}</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-2xl font-bold text-white">{totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-2">Browse Movies</h3>
              <p className="text-gray-400">
                Explore our collection of movies and discover new favorites
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-2">Create Lists</h3>
              <p className="text-gray-400">
                Add movies to your favorites and watchlist for easy access
              </p>
            </div>
            <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
              <h3 className="text-lg font-semibold text-white mb-2">Stay Updated</h3>
              <p className="text-gray-400">
                Get recommendations and stay informed about new releases
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
