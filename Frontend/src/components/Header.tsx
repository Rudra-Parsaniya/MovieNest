import React, { useState } from 'react';
import { Search, User, Heart, Bookmark, LogOut, Film, Filter, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface HeaderProps {
  onSearch: (query: string) => void;
  onAdvancedSearch: (title?: string, genre?: string, year?: number) => void;
  onShowFavorites: () => void;
  onShowWatchlist: () => void;
  onShowAuth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onAdvancedSearch,
  onShowFavorites,
  onShowWatchlist,
  onShowAuth,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState({
    title: '',
    genre: '',
    year: ''
  });
  const { user, isAuthenticated, logout } = useAuth();

  const genres = [
    'Action', 'Adventure', 'Animation', 'Biography', 'Comedy', 'Crime', 'Documentary',
    'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance',
    'Sci-Fi', 'Sport', 'Thriller', 'War', 'Western'
  ];

  const handleSimpleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleAdvancedSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const { title, genre, year } = advancedSearch;
    const yearNum = year ? parseInt(year) : undefined;
    
    if (title || genre || year) {
      onAdvancedSearch(
        title || undefined,
        genre || undefined,
        yearNum
      );
    }
  };

  const clearAdvancedSearch = () => {
    setAdvancedSearch({ title: '', genre: '', year: '' });
    onAdvancedSearch();
  };

  const handleInputChange = (field: string, value: string) => {
    setAdvancedSearch(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-8">
            {/* Simple Search */}
            {!showAdvancedSearch && (
              <form onSubmit={handleSimpleSearch} className="flex items-center space-x-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search movies by title..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdvancedSearch(true)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                  title="Advanced Search"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* Advanced Search */}
            {showAdvancedSearch && (
              <form onSubmit={handleAdvancedSearch} className="space-y-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Movie title..."
                      value={advancedSearch.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <select
                      value={advancedSearch.genre}
                      onChange={(e) => handleInputChange('genre', e.target.value)}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    >
                      <option value="">All Genres</option>
                      {genres.map(genre => (
                        <option key={genre} value={genre}>{genre}</option>
                      ))}
                    </select>
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Year"
                      value={advancedSearch.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      min="1900"
                      max={new Date().getFullYear() + 5}
                      className="w-full bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-700 focus:border-red-500 focus:outline-none focus:ring-1 focus:ring-red-500 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={clearAdvancedSearch}
                    className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    title="Clear Search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedSearch(false)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                    title="Simple Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

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