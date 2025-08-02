import React, { useState, useEffect } from 'react';
import { X, User, Mail, Calendar, Edit2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    age: '',
    password: '', // Add password field
  });

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        age: user.age.toString(),
        password: '', // Reset password field
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {

      
      // Validate form data
      if (!formData.username.trim() || !formData.fullName.trim() || !formData.email.trim()) {
        throw new Error('Please fill in all required fields');
      }
      
      const age = parseInt(formData.age);
      if (isNaN(age) || age < 1 || age > 150) {
        throw new Error('Please enter a valid age between 1 and 150');
      }
      
      const updatePayload: any = {
        username: formData.username.trim(),
        fullName: formData.fullName.trim(),
        email: formData.email.trim(),
        age: age,
      };
      
      // Only include password if it's not empty
      if (formData.password.trim()) {
        updatePayload.password = formData.password;
      }
      
      await updateUser(updatePayload);
      setSuccess('Profile updated successfully!');
      setIsEditing(false);
      // Clear password field after successful update
      setFormData(prev => ({ ...prev, password: '' }));
    } catch (err: any) {
      console.error('ProfileModal: Update failed:', err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };



  if (!isOpen || !user) return null;

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
          <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gradient">Profile Settings</h2>
          <p className="text-gray-400">Manage your account information</p>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in animate-delay-200">
            {error && (
              <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg text-sm animate-scale-in">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-600/20 border border-green-600 text-green-400 px-4 py-3 rounded-lg text-sm animate-scale-in">
                {success}
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
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                className="w-full input-dark px-4 py-3"
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
                required
                className="w-full input-dark px-4 py-3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Password (leave blank to keep current)
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full input-dark px-4 py-3"
                autoComplete="new-password"
                placeholder="New password"
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
                required
                min="13"
                max="120"
                className="w-full input-dark px-4 py-3"
              />
            </div>

            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary disabled:opacity-50 disabled:transform-none"
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 animate-fade-in animate-delay-200">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 glass-effect rounded-lg transition-all duration-300 hover:bg-gray-800/50">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-400 text-sm">Username</p>
                  <p className="text-gradient font-medium">{user.username}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 glass-effect rounded-lg transition-all duration-300 hover:bg-gray-800/50">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-400 text-sm">Full Name</p>
                  <p className="text-gradient font-medium">{user.fullName}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 glass-effect rounded-lg transition-all duration-300 hover:bg-gray-800/50">
                <Mail className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-gradient font-medium">{user.email}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 glass-effect rounded-lg transition-all duration-300 hover:bg-gray-800/50">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-400 text-sm">Age</p>
                  <p className="text-gradient font-medium">{user.age} years old</p>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 glass-effect rounded-lg transition-all duration-300 hover:bg-gray-800/50">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-gray-400 text-sm">Member Since</p>
                  <p className="text-gradient font-medium">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsEditing(true)}
              className="w-full btn-primary py-3 flex items-center justify-center space-x-2"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
            

          </div>
        )}
      </div>
    </div>
  );
};