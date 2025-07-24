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
    <div className="min-h-screen bg-black py-10 px-2 md:px-8 lg:px-16 flex flex-col gap-12 relative overflow-hidden">
      {/* Decorative Accent - Watermark Icon */}
      <Film className="absolute -top-10 -right-10 w-96 h-96 text-red-900 opacity-10 pointer-events-none select-none z-0" />
      {/* Welcome Section */}
      <section className="w-full max-w-5xl mx-auto relative z-10 bg-black border border-black  rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 backdrop-blur-2xl before:content-[''] before:absolute before:inset-0 before:rounded-3xl before:bg-gradient-to-br before:from-black before:to-black before:z-[-1] transition-transform duration-300 hover:scale-[1.025] ">
        <div className="flex-1 space-y-4">
          <h1 className="text-5xl font-extrabold text-white tracking-tight leading-tight mb-2 drop-shadow-lg">
            Welcome to <span className="text-red-600">MovieNest</span>
          </h1>
          {isAuthenticated && user && (
            <span className="block text-2xl font-normal text-gray-300 mb-2">
              Hello, <span className="text-red-400 font-semibold">{user.fullName}</span>!
            </span>
          )}
          <p className="text-lg text-gray-300 mb-4">
            Discover and organize your favorite movies. Build your personal collection with our comprehensive movie database featuring thousands of titles across all genres.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-lg shadow-md">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span className="text-gray-200">Personalized Recommendations</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-800/80 px-4 py-2 rounded-lg shadow-md">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-gray-200">Curated Collections</span>
            </div>
          </div>
        </div>
        <div className="hidden md:block flex-shrink-0">
          <Film className="w-40 h-40 text-red-600 opacity-80 drop-shadow-2xl" />
        </div>
      </section>

      {/* Statistics Grid */}
      <section className="w-full max-w-5xl mx-auto">
        <div className="bg-black rounded-3xl p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-black border border-black rounded-2xl shadow-xl p-6 flex items-center gap-4 transition-transform duration-300 hover:scale-[1.05] "
              >
                <div className={`${stat.color} p-4 rounded-xl flex items-center justify-center`}>
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm font-medium">{stat.title}</p>
                  <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-5xl mx-auto">
        <div className="bg-black rounded-3xl p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-black border border-black rounded-2xl shadow-xl p-6 flex flex-col items-start transition-all duration-300 hover:scale-[1.04] ">
            <div className="bg-red-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Film className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Vast Movie Library</h3>
            <p className="text-gray-300">
              Explore thousands of movies across all genres, from classic films to the latest releases.
            </p>
          </div>
          <div className="bg-black border border-black rounded-2xl shadow-xl p-6 flex flex-col items-start transition-all duration-300 hover:scale-[1.04]">
            <div className="bg-yellow-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Star className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Personal Favorites</h3>
            <p className="text-gray-300">
              Mark your favorite movies and build a personalized collection that reflects your taste.
            </p>
          </div>
          <div className="bg-black border border-black rounded-2xl shadow-xl p-6 flex flex-col items-start transition-all duration-300 hover:scale-[1.04]">
            <div className="bg-green-600 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Bookmark className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Watch Later</h3>
            <p className="text-gray-300">
              Save movies to your watchlist and never forget about films you want to see.
            </p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="w-full max-w-5xl mx-auto">
        <div className="bg-black rounded-3xl p-8 transition-transform duration-300 hover:scale-[1.025] hover:shadow-[0_12px_48px_0_rgba(255,0,80,0.10)">
          <h2 className="text-2xl font-bold text-white mb-6">About MovieNest</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
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
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="bg-red-600 w-3 h-3 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-medium">Comprehensive Database</h4>
                  <p className="text-gray-400 text-sm">Access detailed information about thousands of movies</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-600 w-3 h-3 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-medium">Personal Collections</h4>
                  <p className="text-gray-400 text-sm">Create and manage your own movie lists</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-red-600 w-3 h-3 rounded-full mt-2"></div>
                <div>
                  <h4 className="text-white font-medium">Smart Recommendations</h4>
                  <p className="text-gray-400 text-sm">Discover new movies based on your preferences</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
