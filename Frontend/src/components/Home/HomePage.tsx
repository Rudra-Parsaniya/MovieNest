import React from 'react';
import { Film, Star, Bookmark, TrendingUp, Users } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

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
  const { user, isAuthenticated } = useAuth();

  const stats = [
    {
      title: 'Total Movies',
      value: totalMovies,
      icon: Film,
      color: 'bg-blue-600',
    },
    {
      title: 'My Favorites',
      value: favoriteCount,
      icon: Star,
      color: 'bg-yellow-600',
    },
    {
      title: 'My Watchlist',
      value: watchlistCount,
      icon: Bookmark,
      color: 'bg-green-600',
    },
    {
      title: 'Total Users',
      value: totalUsers,
      icon: Users,
      color: 'bg-purple-600',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-950 to-blue-800 rounded-2xl p-8 text-white">
        <div className="max-w-3xl">
          <div className="space-y-2 mb-4">
            <h1 className="text-3xl font-bold text-gray-300">
              Welcome to Jurassic Park
            </h1>
            <h1 className="text-3xl font-bold text-gray-300">
              Welcome to Fight Club
            </h1>
            <h1 className="text-5xl font-bold">
              Welcome to Movie Nest
            </h1>
            {isAuthenticated && user && (
              <span className="block text-2xl font-normal mt-2 text-red-100">
                Hello, {user.fullName}!
              </span>
            )}
          </div>
          <p className="text-xl text-red-100 mb-6">
            Discover and organize your favorite movies. Build your personal collection with our comprehensive movie database featuring thousands of titles across all genres.
          </p>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Personalized Recommendations</span>
            </div>
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5" />
              <span>Curated Collections</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                <p className="text-3xl font-bold text-white mt-2">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Features Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Film className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Vast Movie Library</h3>
          <p className="text-gray-400">
            Explore thousands of movies across all genres, from classic films to the latest releases.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Personal Favorites</h3>
          <p className="text-gray-400">
            Mark your favorite movies and build a personalized collection that reflects your taste.
          </p>
        </div>

        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
            <Bookmark className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold text-white mb-2">Watch Later</h3>
          <p className="text-gray-400">
            Save movies to your watchlist and never forget about films you want to see.
          </p>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
        <h2 className="text-2xl font-bold text-white mb-4">About MovieNest</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <p className="text-gray-300 mb-4">
              MovieNest is your ultimate destination for discovering and organizing movies. 
              Our platform offers a comprehensive database of films with detailed information, 
              ratings, and user reviews.
            </p>
            <p className="text-gray-300">
              Whether you're a casual movie watcher or a dedicated cinephile, MovieNest 
              provides the tools you need to track your viewing history, discover new 
              favorites, and connect with other movie enthusiasts.
            </p>
          </div>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="bg-red-600 w-2 h-2 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium">Comprehensive Database</h4>
                <p className="text-gray-400 text-sm">Access detailed information about thousands of movies</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-red-600 w-2 h-2 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium">Personal Collections</h4>
                <p className="text-gray-400 text-sm">Create and manage your own movie lists</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="bg-red-600 w-2 h-2 rounded-full mt-2"></div>
              <div>
                <h4 className="text-white font-medium">Smart Recommendations</h4>
                <p className="text-gray-400 text-sm">Discover new movies based on your preferences</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};