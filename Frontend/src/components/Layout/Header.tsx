import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Search } from 'lucide-react';

interface HeaderProps {
  onSearch: (query: string) => void;
  onShowAuth: () => void;
  title: string;
}

export const Header: React.FC<HeaderProps> = ({
  onSearch,
  onShowAuth,
  title,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, logout } = useAuth();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <header className="bg-gray-950 border-b border-gray-800 px-6 py-4 sticky top-0 z-50">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">{title}</h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Auth Button */}
          <button
            onClick={() => {
              if (isAuthenticated) {
                logout();
              } else {
                onShowAuth();
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            {isAuthenticated ? 'Logout' : 'Sign In'}
          </button>
        </div>
      </div>
    </header>
  );
};