import React from 'react';
import { 
  Home, 
  Star, 
  Bookmark, 
  TrendingUp, 
  User, 
  Film,
  LogOut,
  Settings,
  Shield,
  Users
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

  // Different menu items for admin vs user
  const getMenuItems = () => {
    if (user?.role === 'admin') {
      return [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'recommended', label: 'Recommended', icon: TrendingUp },
        { id: 'movies', label: 'Movies', icon: Film },
        { id: 'users', label: 'Users', icon: Users },
      ];
    } else {
      return [
        { id: 'home', label: 'Home', icon: Home },
        { id: 'recommended', label: 'Recommended', icon: TrendingUp },
        { id: 'favorites', label: 'Favorites', icon: Star, count: favoriteCount },
        { id: 'watchlist', label: 'Watchlist', icon: Bookmark, count: watchlistCount },
        { id: 'user', label: 'User', icon: User },
      ];
    }
  };

  const menuItems = getMenuItems();

  return (
    <div className="w-64 bg-black border-r border-gray-900 flex flex-col h-screen sticky top-0">
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
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-left font-medium transition-all duration-200
                ${currentView === item.id
                  ? 'bg-blue-900/60 text-white shadow-lg border-l-4 border-blue-700 backdrop-blur-lg bg-clip-padding border border-blue-700/30'
                  : 'text-gray-300 hover:bg-gray-900 hover:text-white'}
              `}
            >
              <div className="flex items-center space-x-3">
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && (
                <span className={`px-2 py-1 text-xs rounded-full font-bold
                  ${currentView === item.id
                    ? 'bg-blue-700/80 text-white'
                    : 'bg-gray-800 text-gray-300'}
                `}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* User Section */}
      <div className="p-4">
        {isAuthenticated && user ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 px-4 py-3 bg-gray-800/60 rounded-lg backdrop-blur-lg bg-clip-padding border border-gray-700/30">
              <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                {user.role === 'admin' ? (
                  <Shield className="w-5 h-5 text-white" />
                ) : (
                  <User className="w-5 h-5 text-white" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate">{user.fullName}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-gray-400 text-sm truncate">@{user.username}</p>
                  <span className={`inline-flex px-2 py-0.5 text-xs font-semibold rounded-full ${
                    user.role === 'admin' 
                      ? 'bg-red-600/20 text-red-400 border border-red-600/30' 
                      : 'bg-blue-600/20 text-blue-400 border border-blue-600/30'
                  }`}>
                    {user.role}
                  </span>
                </div>
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