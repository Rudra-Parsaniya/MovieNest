import React from 'react';
import { 
  Home, 
  Star, 
  Bookmark, 
  TrendingUp, 
  User, 
  Film,
  LogOut,
  Settings
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onShowAuth: () => void;
  onShowProfile: () => void;
  favoriteCount: number;
  watchlistCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onViewChange,
  onShowAuth,
  onShowProfile,
  favoriteCount,
  watchlistCount,
}) => {
  const { user, isAuthenticated, logout } = useAuth();

  const menuItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'recommended', label: 'Recommended', icon: TrendingUp },
    { id: 'favorites', label: 'Favorites', icon: Star, count: favoriteCount },
    { id: 'watchlist', label: 'Watchlist', icon: Bookmark, count: watchlistCount },
    { id: 'user', label: 'User', icon: User },
  ];

  return (
    <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Film className="w-8 h-8 text-red-600" />
          <h1 className="text-xl font-bold text-white">MovieNest</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onViewChange(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left transition-colors ${
                currentView === item.id
                  ? 'bg-gradient-to-r from-blue-950 via-blue-900 to-blue-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  currentView === item.id
                    ? 'bg-white/20 text-white'
                    : 'bg-gray-700 text-gray-300'
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-800">
        {isAuthenticated && user ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-800 rounded-lg">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user.fullName}</p>
                <p className="text-gray-400 text-sm truncate">@{user.username}</p>
              </div>
            </div>
            
            <div className="space-y-1">
              <button
                onClick={onShowProfile}
                className="w-full flex items-center space-x-3 px-4 py-2 text-gray-300 hover:bg-gray-800 hover:text-white rounded-lg transition-colors"
              >
                <Settings className="w-4 h-4" />
                <span>Profile Settings</span>
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};