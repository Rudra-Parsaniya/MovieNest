import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const UserDetailsPage: React.FC = () => {
  React.useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  const { user } = useAuth();

  if (!user) {
    return (
      <div className="p-6 text-center text-gray-300">
        Please sign in to view your profile.
      </div>
    );
  }

  return (
    <div className="h-screen flex items-center justify-center overflow-hidden relative animate-fade-in">
      <img
        src="/own1.jpg"
        alt="Background"
        className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-700 hover:scale-105"
      />
      <div className="absolute inset-0 bg-black/60 z-10" />
      <div className="max-w-lg w-full mx-auto glass-effect p-8 rounded-2xl text-slate-100 space-y-6 shadow-2xl relative z-20 transform -translate-y-20 animate-scale-in hover-glow">
        <h2 className="text-3xl font-bold mb-6 text-gradient text-center">User Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
            <span className="text-gray-400">Username:</span>
            <span className="text-white font-semibold">{user.username}</span>
          </div>
          <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
            <span className="text-gray-400">Full Name:</span>
            <span className="text-white font-semibold">{user.fullName}</span>
          </div>
          {user.age !== undefined && (
            <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
              <span className="text-gray-400">Age:</span>
              <span className="text-white font-semibold">{user.age}</span>
            </div>
          )}
          <div className="flex justify-between items-center p-3 bg-black/20 rounded-lg">
            <span className="text-gray-400">Email:</span>
            <span className="text-white font-semibold">{user.email}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetailsPage;
