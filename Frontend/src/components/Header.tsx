import React, { useState } from 'react';
import { Search, User, Heart, Bookmark, LogOut, Film } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onShowFavorites: () => void;
  onShowWatchlist: () => void;
  onShowAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onShowFavorites,
  onShowWatchlist,
  onShowAuth,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { user, isAuthenticated, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-red-600" />
            <h1 className="text-2xl font-bold text-white">MovieDB</h1>
          </div>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          </form>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <button
                  onClick={onShowWatchlist}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  title="Watchlist"
                >
                  <Bookmark className="w-5 h-5" />
                </button>
                <button
                  onClick={onShowFavorites}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  title="Favorites"
                >
                  <Heart className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2 text-white">
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user?.fullName || user?.username}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <button
                onClick={onShowAuth}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};