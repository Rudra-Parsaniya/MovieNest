import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserDetailsPage: React.FC = () => {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-300">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: 'url(https://c4.wallpaperflare.com/wallpaper/862/449/162/jack-reacher-star-wars-interstellar-movie-john-wick-wallpaper-thumb.jpg)' }}>
      <div className="max-w-lg w-full mx-auto bg-gray-900/90 p-6 rounded-xl border border-gray-800 text-white space-y-4 backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4">User Details</h2>
        <div className="space-y-2">
          <p><span className="text-gray-400">Username:</span> {user.username}</p>
          <p><span className="text-gray-400">Full Name:</span> {user.fullName}</p>
          {user.age !== undefined && (
            <p><span className="text-gray-400">Age:</span> {user.age}</p>
          )}
          <p><span className="text-gray-400">Email:</span> {user.email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
