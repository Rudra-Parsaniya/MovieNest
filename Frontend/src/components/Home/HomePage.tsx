import React from 'react';
import { Film, Star, Bookmark, Users, WifiOff, TrendingUp, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface HomePageProps {
  favoriteCount: number;
  watchlistCount: number;
  totalMovies: number;
  totalUsers: number;
  recommendedMoviesCount?: number;
  totalAdminsCount?: number;
}

export const HomePage: React.FC<HomePageProps> = ({
  favoriteCount,
  watchlistCount,
  totalMovies,
  totalUsers,
  recommendedMoviesCount = 0,
  totalAdminsCount = 0,
}) => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="min-h-screen container-dark section-padding flex flex-col gap-12 relative overflow-hidden">
      {/* Decorative Accent - Watermark Icon */}
      <Film className="absolute -top-10 -right-10 w-96 h-96 text-red-900/20 opacity-20 pointer-events-none select-none z-0 animate-pulse-subtle" />


      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl font-bold text-gradient mb-6 animate-scale-in">Welcome to MovieNest</h1>
          <p className="text-gray-400 text-xl animate-fade-in animate-delay-200">
            {isAdmin ? 'Admin Dashboard - Manage movies and users' : 'Discover, track, and manage your favorite movies'}
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 ${isAdmin ? 'lg:grid-cols-4' : 'lg:grid-cols-4'} gap-6 animate-fade-in animate-delay-300`}>
          <div className="card-dark rounded-xl p-6 animate-scale-in animate-delay-100 hover-glow">
            <div className="flex items-center space-x-3">
              <Film className="w-8 h-8 text-red-500 animate-pulse-subtle" />
              <div>
                <p className="text-gray-400 text-sm">Total Movies</p>
                <p className="text-3xl font-bold text-gradient">{totalMovies}</p>
              </div>
            </div>
          </div>

          {!isAdmin && (
            <div className="card-dark rounded-xl p-6 animate-scale-in animate-delay-200 hover-glow">
              <div className="flex items-center space-x-3">
                <Star className="w-8 h-8 text-yellow-500 animate-pulse-subtle" />
                <div>
                  <p className="text-gray-400 text-sm">Your Favorites</p>
                  <p className="text-3xl font-bold text-gradient">{favoriteCount}</p>
                </div>
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="card-dark rounded-xl p-6 animate-scale-in animate-delay-200 hover-glow">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-8 h-8 text-purple-500 animate-pulse-subtle" />
                <div>
                  <p className="text-gray-400 text-sm">Recommended Movies</p>
                  <p className="text-3xl font-bold text-gradient">{recommendedMoviesCount}</p>
                </div>
              </div>
            </div>
          )}

          {!isAdmin && (
            <div className="card-dark rounded-xl p-6 animate-scale-in animate-delay-300 hover-glow">
              <div className="flex items-center space-x-3">
                <Bookmark className="w-8 h-8 text-blue-500 animate-pulse-subtle" />
                <div>
                  <p className="text-gray-400 text-sm">Watchlist</p>
                  <p className="text-3xl font-bold text-gradient">{watchlistCount}</p>
                </div>
              </div>
            </div>
          )}

          {isAdmin && (
            <div className="card-dark rounded-xl p-6 animate-scale-in animate-delay-300 hover-glow">
              <div className="flex items-center space-x-3">
                <Shield className="w-8 h-8 text-orange-500 animate-pulse-subtle" />
                <div>
                  <p className="text-gray-400 text-sm">Total Admins</p>
                  <p className="text-3xl font-bold text-gradient">{totalAdminsCount}</p>
                </div>
              </div>
            </div>
          )}

          <div className="card-dark rounded-xl p-6 animate-scale-in animate-delay-400 hover-glow">
            <div className="flex items-center space-x-3">
              <Users className="w-8 h-8 text-green-500 animate-pulse-subtle" />
              <div>
                <p className="text-gray-400 text-sm">Total Users</p>
                <p className="text-3xl font-bold text-gradient">{totalUsers}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 text-center animate-fade-in animate-delay-500">
          <h2 className="text-3xl font-bold text-gradient mb-8">
            {isAdmin ? 'Admin Features' : 'Getting Started'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {isAdmin ? (
              <>
                <div className="card-dark rounded-xl p-8 animate-scale-in animate-delay-100 hover-glow">
                  <h3 className="text-xl font-semibold text-gradient mb-4">Manage Movies</h3>
                  <p className="text-gray-400">
                    Add, edit, and remove movies from the database
                  </p>
                </div>
                <div className="card-dark rounded-xl p-8 animate-scale-in animate-delay-200 hover-glow">
                  <h3 className="text-xl font-semibold text-gradient mb-4">User Management</h3>
                  <p className="text-gray-400">
                    View and manage user accounts and permissions
                  </p>
                </div>
                <div className="card-dark rounded-xl p-8 animate-scale-in animate-delay-300 hover-glow">
                  <h3 className="text-xl font-semibold text-gradient mb-4">Analytics</h3>
                  <p className="text-gray-400">
                    Monitor platform usage and user engagement
                  </p>
                </div>
              </>
            ) : (
              <>
                <div className="card-dark rounded-xl p-8 animate-scale-in animate-delay-100 hover-glow">
                  <h3 className="text-xl font-semibold text-gradient mb-4">Browse Movies</h3>
                  <p className="text-gray-400">
                    Explore our collection of movies and discover new favorites
                  </p>
                </div>
                <div className="card-dark rounded-xl p-8 animate-scale-in animate-delay-200 hover-glow">
                  <h3 className="text-xl font-semibold text-gradient mb-4">Create Lists</h3>
                  <p className="text-gray-400">
                    Add movies to your favorites and watchlist for easy access
                  </p>
                </div>
                <div className="card-dark rounded-xl p-8 animate-scale-in animate-delay-300 hover-glow">
                  <h3 className="text-xl font-semibold text-gradient mb-4">Stay Updated</h3>
                  <p className="text-gray-400">
                    Get recommendations and stay informed about new releases
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
