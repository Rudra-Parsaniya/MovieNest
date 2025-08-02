import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search, User, Heart, Bookmark, LogOut, Film, Filter, X, Shield, Wifi, WifiOff } from 'lucide-react';
import { apiService } from '../../services/api';
import { MultiSelect } from '../Movies/MultiSelect';

interface HeaderProps {
  onSearch: (query: string) => void;
  onAdvancedSearch: (title?: string, genre?: string | string[], year?: number) => void;
  onShowAuth: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onAdvancedSearch,
  onShowAuth,
  title,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [advancedSearch, setAdvancedSearch] = useState({
    title: '',
    year: ''
  });
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
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
    const { title, year } = advancedSearch;
    const yearNum = year ? parseInt(year) : undefined;
    
    if (title || selectedGenres.length > 0 || year) {
      onAdvancedSearch(
        title || undefined,
        selectedGenres.length > 0 ? selectedGenres : undefined,
        yearNum
      );
    }
  };

  const clearAdvancedSearch = () => {
    setAdvancedSearch({ title: '', year: '' });
    setSelectedGenres([]);
    onAdvancedSearch();
  };

  const handleInputChange = (field: string, value: string) => {
    setAdvancedSearch(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <header className="bg-black/95 backdrop-blur-sm border-b border-gray-900 sticky top-0 z-50 animate-slide-in-right">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4 animate-fade-in">
            <h2 className="text-xl font-semibold text-gradient">{title}</h2>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-8 animate-fade-in animate-delay-200">
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
                    className="w-full input-dark pl-10 pr-4 py-2 transition-all duration-300 focus:scale-105"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setShowAdvancedSearch(true)}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 transform hover:scale-110"
                  title="Advanced Search"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </form>
            )}

            {/* Advanced Search */}
            {showAdvancedSearch && (
              <form onSubmit={handleAdvancedSearch} className="space-y-2 animate-scale-in">
                <div className="flex items-center space-x-2">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="Movie title..."
                      value={advancedSearch.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full input-dark px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <MultiSelect
                      options={genres}
                      value={selectedGenres}
                      onChange={setSelectedGenres}
                      placeholder="Select genres..."
                      className="w-full"
                    />
                  </div>
                  <div className="w-24">
                    <input
                      type="number"
                      placeholder="Year"
                      value={advancedSearch.year}
                      onChange={(e) => handleInputChange('year', e.target.value)}
                      min="1900"
                      max={new Date().getFullYear() + 5}
                      className="w-full input-dark px-3 py-2 text-sm"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn-primary px-4 py-2 text-sm"
                  >
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={clearAdvancedSearch}
                    className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 transform hover:scale-110"
                    title="Clear Search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAdvancedSearch(false)}
                    className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 transform hover:scale-110"
                    title="Simple Search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4 animate-fade-in animate-delay-300">
            {isAuthenticated ? (
              <>
                <button
                  onClick={logout}
                  className="p-2 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 transform hover:scale-110"
                  title="Logout"
                >
                  <LogOut className="w-5 h-5" />
                </button>
                {/* Admin indicator */}
                {user?.role === 'admin' && (
                  <div className="flex items-center space-x-2 text-red-400 animate-pulse-subtle">
                    <Shield className="w-4 h-4" />
                    <span className="text-sm">Admin</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <button
                  onClick={onShowAuth}
                  className="btn-primary"
                >
                  Sign In
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};