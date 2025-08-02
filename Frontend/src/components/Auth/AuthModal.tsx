import React, { useState } from 'react';
import { X, Eye, EyeOff, Film, Shield, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    fullName: '',
    age: '',
    email: '',
    role: 'user' as 'user' | 'admin',
  });

  const { login, register } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login({
          username: formData.username,
          password: formData.password,
        });
      } else {
        const regData: any = {
          username: formData.username,
          password: formData.password,
          role: formData.role,
        };
        if (formData.fullName) regData.fullName = formData.fullName;
        if (formData.email) regData.email = formData.email;
        if (formData.age && !isNaN(parseInt(formData.age))) regData.age = parseInt(formData.age);
        await register(regData);
      }
      onClose();
      setFormData({
        username: '',
        password: '',
        fullName: '',
        age: '',
        email: '',
        role: 'user',
      });
    } catch (err: any) {
      setError(err.message || 'Authentication failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-lg flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="card-dark rounded-2xl w-full max-w-md p-8 relative animate-scale-in hover-glow">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:rotate-90"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Film className="w-8 h-8 text-red-600 animate-pulse-subtle" />
            <h2 className="text-2xl font-bold text-gradient">MovieNest</h2>
          </div>
          <p className="text-gray-400">
            {isLogin ? 'Welcome back!' : 'Join MovieDB today'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in animate-delay-200">
          {error && (
            <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg text-sm animate-scale-in">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
              className="w-full input-dark px-4 py-3"
              placeholder="Enter your username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full input-dark px-4 py-3 pr-12"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 hover:scale-110"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {!isLogin && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full input-dark px-4 py-3"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full input-dark px-4 py-3"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Age
                </label>
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleInputChange}
                  min="13"
                  max="120"
                  className="w-full input-dark px-4 py-3"
                  placeholder="Enter your age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    formData.role === 'user' 
                      ? 'border-blue-500 bg-blue-500/20 hover-glow' 
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="role"
                      value="user"
                      checked={formData.role === 'user'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <User className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">User</div>
                      <div className="text-gray-400 text-sm">Browse movies & manage lists</div>
                    </div>
                  </label>
                  
                  <label className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                    formData.role === 'admin' 
                      ? 'border-red-500 bg-red-500/20 hover-glow' 
                      : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                  }`}>
                    <input
                      type="radio"
                      name="role"
                      value="admin"
                      checked={formData.role === 'admin'}
                      onChange={handleInputChange}
                      className="sr-only"
                    />
                    <Shield className="w-5 h-5 text-red-400" />
                    <div>
                      <div className="text-white font-medium">Admin</div>
                      <div className="text-gray-400 text-sm">Manage movies & users</div>
                    </div>
                  </label>
                </div>
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 disabled:opacity-50 disabled:transform-none"
          >
            {isLoading ? 'Please wait...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-6 text-center animate-fade-in animate-delay-400">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
          >
            {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </button>
        </div>
      </div>
    </div>
  );
};